import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BrainCircuit, CheckCircle2, XCircle, AlertCircle, Sparkles, Loader2, Play } from 'lucide-react';
import { usePendingFlashcards, useReviewFlashcard } from '@/hooks/useFlashcards';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { TopicSelector } from '@/components/TopicSelector';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Phase = 'setup' | 'active' | 'evaluating' | 'finished';

export default function FlashcardsReview() {
  const navigate = useNavigate();
  
  const [phase, setPhase] = useState<Phase>('setup');
  const [selectedMateria, setSelectedMateria] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  
  // No modo setup, não passamos os filtros para saber o total geral, 
  // mas aqui vamos passar para já ver quantos flashcards tem pra seleção.
  const { data: allPendingFlashcards, isLoading: isLoadingAll } = usePendingFlashcards();
  
  // Filtramos localmente no setup para não dar re-fetch a cada mudança de combobox,
  // ou passamos pro useQuery. Passando pro useQuery é mais limpo.
  const filteredFlashcards = useMemo(() => {
    if (!allPendingFlashcards) return [];
    return allPendingFlashcards.filter(card => {
      const matchMateria = selectedMateria === 'all' || card.materia_slug === selectedMateria;
      const matchTopic = selectedTopic === 'all' || card.topico === selectedTopic;
      return matchMateria && matchTopic;
    });
  }, [allPendingFlashcards, selectedMateria, selectedTopic]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [currentFeedback, setCurrentFeedback] = useState<{ status: string; feedback: string } | null>(null);
  
  const reviewMutation = useReviewFlashcard();

  if (isLoadingAll) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleStart = () => {
    if (filteredFlashcards.length === 0) {
      toast.error('Nenhum flashcard pendente para essa seleção.');
      return;
    }
    setPhase('active');
    setCurrentIndex(0);
  };

  const currentCard = filteredFlashcards[currentIndex];

  const handleReview = async (rating: 'errado' | 'dificil' | 'bom' | 'facil') => {
    await reviewMutation.mutateAsync({
      id: currentCard.id,
      rating,
      currentInterval: currentCard.interval,
      currentEase: currentCard.ease_factor
    });
    
    setAnswer('');
    setCurrentFeedback(null);
    
    if (currentIndex < filteredFlashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setPhase('active');
    } else {
      setPhase('finished');
    }
  };

  const handleEvaluate = async () => {
    if (!answer.trim()) return;
    
    try {
      setPhase('evaluating');

      const { data, error } = await supabase.functions.invoke('quiz', {
        body: {
          action: 'evaluate',
          topico: currentCard.topico,
          questionText: currentCard.front,
          userAnswer: answer
        }
      });

      if (error) throw error;

      const evalData = data as { status: string; feedback: string };
      const rawStatus = evalData.status?.toLowerCase().trim() || 'errado';
      const status = rawStatus.includes('correto') ? 'correto' : rawStatus.includes('parcial') ? 'parcial' : 'errado';
      
      setCurrentFeedback({ status, feedback: evalData.feedback });
      setPhase('active');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao avaliar resposta. Tente novamente ou decida você mesmo.');
      setPhase('active');
    }
  };

  const handleGiveUp = async () => {
    try {
      setPhase('evaluating');
      const { data, error } = await supabase.functions.invoke('quiz', {
        body: {
          action: 'evaluate',
          topico: currentCard.topico,
          questionText: currentCard.front,
          userAnswer: "O usuário desistiu de responder.",
          forceAnswer: true
        }
      });

      if (error) throw error;
      const evalData = data as { status: string; feedback: string };
      
      setCurrentFeedback({ status: 'errado', feedback: evalData.feedback });
      setPhase('active');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao pular resposta.');
      setPhase('active');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <header className="p-4 border-b border-border/50 flex items-center justify-between sticky top-0 bg-background z-10">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 font-medium">
          <BrainCircuit className="w-5 h-5 text-primary" />
          <span>Flashcards SM-2</span>
        </div>
        <div className="w-9" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full gap-8">
        
        {phase === 'setup' && (
          <div className="w-full max-w-md mx-auto animate-in fade-in zoom-in duration-500">
            {allPendingFlashcards?.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-500 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Tudo Limpo!</h1>
                <p className="text-muted-foreground mb-8 text-lg">
                  Você não tem mais nenhum flashcard pendente de revisão para hoje. Sua memória está em dia!
                </p>
                <button 
                  onClick={() => navigate('/')}
                  className="px-8 py-4 bg-foreground text-background rounded-2xl font-semibold hover:opacity-90 active:scale-95 transition-all text-lg"
                >
                  Voltar ao Início
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center bg-card/50 border border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.1)] p-8 rounded-3xl w-full">
                <h2 className="text-2xl font-bold mb-2 text-center">Revisão Espaçada</h2>
                <p className="text-muted-foreground text-sm mb-6 text-center">
                  Você tem <strong className="text-foreground">{allPendingFlashcards?.length}</strong> flashcards pendentes. Escolha o que deseja revisar.
                </p>
                
                <div className="w-full mb-8">
                  <TopicSelector 
                    onMateriaChange={setSelectedMateria}
                    onTopicChange={setSelectedTopic}
                    selectedMateria={selectedMateria}
                    selectedTopic={selectedTopic}
                  />
                  
                  <div className="mt-4 p-4 bg-muted/50 rounded-xl text-center border border-border/50">
                    <span className="text-sm text-muted-foreground">Flashcards na seleção:</span>
                    <div className="text-3xl font-bold text-primary mt-1">{filteredFlashcards.length}</div>
                  </div>
                </div>

                <button
                  onClick={handleStart}
                  disabled={filteredFlashcards.length === 0}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Iniciar Revisão
                </button>
              </div>
            )}
          </div>
        )}

        {(phase === 'active' || phase === 'evaluating') && currentCard && (
          <div className="w-full animate-in slide-in-from-right-8 duration-300">
             <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Card {currentIndex + 1} de {filteredFlashcards.length}</span>
              <div className="flex gap-1">
                {filteredFlashcards.map((_, i) => (
                  <div key={i} className={cn("h-1.5 rounded-full transition-all duration-300", i === currentIndex ? "w-6 bg-primary" : i < currentIndex ? "w-2 bg-primary/40" : "w-2 bg-muted")} />
                ))}
              </div>
            </div>

            <div className="bg-card border-2 border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.05)] rounded-3xl p-6 md:p-8 relative">
              {phase === 'evaluating' && (
                <div className="absolute inset-0 z-10 bg-background/90 rounded-3xl flex flex-col items-center justify-center animate-in fade-in">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
                  <span className="font-medium text-primary">Avaliando recall...</span>
                </div>
              )}

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-6 uppercase tracking-widest">
                <BrainCircuit className="w-3.5 h-3.5" />
                {currentCard.materia_slug} • {currentCard.topico || 'Geral'}
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-8">
                {currentCard.front}
              </h2>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Qual a resposta? Tente lembrar o máximo de detalhes..."
                className="w-full min-h-[120px] p-4 rounded-xl bg-muted/50 border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none mb-4"
                autoFocus
                disabled={phase === 'evaluating' || currentFeedback?.status === 'correto'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                     if (currentFeedback?.status === 'correto') {
                       handleReview('bom');
                     } else {
                       handleEvaluate();
                     }
                  }
                }}
              />

              {currentFeedback && (
                <div className={cn(
                  "mb-6 p-5 rounded-2xl border animate-in fade-in slide-in-from-bottom-2",
                  currentFeedback.status === 'correto' ? "bg-green-500/5 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.05)]" :
                  currentFeedback.status === 'parcial' ? "bg-amber-500/5 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]" :
                  "bg-red-500/5 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]"
                )}>
                  <div className={cn(
                    "flex items-center gap-2 mb-2.5 font-semibold",
                    currentFeedback.status === 'correto' ? "text-green-600 dark:text-green-400" :
                    currentFeedback.status === 'parcial' ? "text-amber-600 dark:text-amber-400" : 
                    "text-red-600 dark:text-red-400"
                  )}>
                    {currentFeedback.status === 'correto' ? <CheckCircle2 className="w-5 h-5" /> : currentFeedback.status === 'parcial' ? <Sparkles className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="tracking-wide">
                      {currentFeedback.status === 'correto' ? 'Correto!' : currentFeedback.status === 'parcial' ? 'Parcial / Dica' : 'Incorreto'}
                    </span>
                  </div>
                  <div className="text-[15px] leading-relaxed text-foreground/90 prose prose-invert max-w-none">
                    <ReactMarkdown>{currentFeedback.feedback}</ReactMarkdown>
                  </div>
                  
                  {currentFeedback.status !== 'correto' && (
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <p className="text-sm text-muted-foreground mb-3 text-center">Baseado no seu recall e na dica, escolha a nota para o algoritmo SM-2:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button onClick={() => handleReview('errado')} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-lg text-sm font-semibold transition-all">Errei (1d)</button>
                        <button onClick={() => handleReview('dificil')} className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-lg text-sm font-semibold transition-all">Difícil (~{Math.max(1, Math.round(currentCard.interval * 1.2))}d)</button>
                        <button onClick={() => handleReview('bom')} className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/30 rounded-lg text-sm font-semibold transition-all">Bom (~{Math.max(1, Math.round((currentCard.interval || 1) * currentCard.ease_factor))}d)</button>
                        <button onClick={() => handleReview('facil')} className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/30 rounded-lg text-sm font-semibold transition-all">Fácil (~{Math.max(1, Math.round((currentCard.interval || 1) * currentCard.ease_factor * 1.3))}d)</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-4">
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    <kbd className="font-mono bg-muted px-1 rounded border border-border">Cmd</kbd> + <kbd className="font-mono bg-muted px-1 rounded border border-border">Enter</kbd>
                  </div>
                  {!currentFeedback && (
                    <button 
                      onClick={handleGiveUp}
                      disabled={phase === 'evaluating'}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors underline decoration-border underline-offset-4 font-medium"
                    >
                      Não sei (Ver Resposta)
                    </button>
                  )}
                </div>

                {!currentFeedback ? (
                  <button 
                    onClick={handleEvaluate}
                    disabled={!answer.trim() || phase === 'evaluating'}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 ml-auto flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Avaliar com IA
                  </button>
                ) : currentFeedback.status === 'correto' ? (
                  <button 
                    onClick={() => handleReview('bom')}
                    className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 active:scale-95 transition-all ml-auto flex items-center gap-2"
                  >
                    Próxima Carta (Bom) <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {phase === 'finished' && (
          <div className="text-center mt-12 animate-in zoom-in duration-500 bg-card border border-border/50 p-8 rounded-3xl w-full max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Sessão Concluída!</h1>
            <p className="text-muted-foreground mb-6">
              Você completou todos os flashcards pendentes para essa seleção. Continue assim!
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setPhase('setup');
                  setSelectedMateria('all');
                  setSelectedTopic('all');
                }}
                className="w-full py-3 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 active:scale-95 transition-all"
              >
                Revisar Outros
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:brightness-110 active:scale-95 transition-all"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
