import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BrainCircuit, Sparkles, CheckCircle2, XCircle, AlertCircle, Loader2, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  useUserSettings, 
  useAllCompletedTopics, 
  useCreateQuizSession, 
  useSaveQuizAnswer, 
  useCompleteQuizSession, 
  useTodayQuizCount,
  useQuizHistory,
  useWrongTopics,
  TopicDateFilter
} from '@/hooks/useQuiz';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Phase = 'idle' | 'generating' | 'active' | 'evaluating' | 'finished';

interface Question {
  topico: string;
  materiaSlug: string;
  text: string;
  dica?: string;
}

interface HistoryItem {
  question: Question;
  userAnswer: string;
  status: string;
  feedback: string;
}

export default function Quiz() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [topicFilter, setTopicFilter] = useState<TopicDateFilter>('all');
  const [selectedMateria, setSelectedMateria] = useState<string>('');
  const [currentFeedback, setCurrentFeedback] = useState<{ status: string; feedback: string } | null>(null);
  const [giveUpUsed, setGiveUpUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const { data: settings, isLoading: loadingSettings } = useUserSettings();
  const { data: topics, isLoading: loadingTopics } = useAllCompletedTopics(topicFilter);
  const { data: todayCount, isLoading: loadingCount } = useTodayQuizCount();
  const { data: dbHistory, isLoading: loadingHistory } = useQuizHistory('today');
  const { data: wrongTopicsData } = useWrongTopics();

  const createSession = useCreateQuizSession();
  const saveAnswer = useSaveQuizAnswer();
  const completeSession = useCompleteQuizSession();

  // Quantidade dinâmica baseada no número de tópicos do período selecionado
  const filteredTopicsCount = topics?.length || 0;
  let dynamicQuestionLimit = 5;
  if (filteredTopicsCount > 10) dynamicQuestionLimit = 7;
  if (filteredTopicsCount > 20) dynamicQuestionLimit = 10; // Max limit per session

  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (dbHistory) {
      const mappedHistory = dbHistory.map(item => ({
        question: {
          topico: item.topico,
          materiaSlug: item.materia_slug,
          text: item.question_text
        },
        userAnswer: item.user_answer,
        status: item.status,
        feedback: item.feedback
      }));
      setHistory(mappedHistory);
    }
  }, [dbHistory]);



  const handleStart = async (selectedMateriaSlug?: string) => {
    try {
      setPhase('generating');
      const limitForSession = dynamicQuestionLimit;
      
      const session = await createSession.mutateAsync(limitForSession);
      setSessionId(session.id);

      let topicNames: string[] = [];
      let sourceTopics = topics || [];
      
      // Filtra por matéria se o usuário selecionou uma opção
      if (selectedMateriaSlug && typeof selectedMateriaSlug === 'string') {
        const filtered = sourceTopics.filter(t => t.materia_slug === selectedMateriaSlug);
        if (filtered.length > 0) {
          sourceTopics = filtered;
        } else {
          toast.error("Nenhum tópico concluído para essa matéria.");
          setPhase('idle');
          return;
        }
      }

      // Para evitar repetição e focar de forma inteligente: mistura os tópicos concluídos com os errados
      const wrongSet = new Set(wrongTopicsData || []);
      const wrongTopics = sourceTopics.filter(t => wrongSet.has(t.topico));
      // Vamos dar prioridade aos tópicos que ele errou no passado, se houver, misturando-os com os outros
      const prioritizedTopics = [...wrongTopics, ...sourceTopics]; 
      // O Set remove as duplicatas mantendo a ordem (os que ele errou ficam na frente, se quisermos passar para a IA)
      topicNames = Array.from(new Set(prioritizedTopics.map(t => t.topico)));

      const { data, error } = await supabase.functions.invoke('quiz', {
        body: {
          action: 'generate',
          completedTopics: topicNames,
          n: limitForSession
        }
      });

      if (error) throw error;
      
      const generated = data as { topico: string; text: string }[];
      const mappedQuestions = generated.map(q => {
        const match = sourceTopics.find(t => t.topico === q.topico);
        return {
          ...q,
          materiaSlug: match ? match.materia_slug : 'Geral'
        };
      });

      setQuestions(mappedQuestions);
      setCurrentIndex(0);
      setPhase('active');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao gerar perguntas. Verifique a API Key ou conexão.');
      setPhase('idle');
      // DO NOT reset hasStartedRef.current here to prevent infinite auto-start loops!
    }
  };

  const saveAndAdvance = async (status: string, feedback: string, finalAnswer: string) => {
    const currentQ = questions[currentIndex];
    if (sessionId) {
      await saveAnswer.mutateAsync({
        session_id: sessionId,
        materia_slug: currentQ.materiaSlug,
        topico: currentQ.topico,
        question_text: currentQ.text,
        user_answer: finalAnswer,
        status,
        feedback
      });
    }

    setHistory(prev => [
      {
        question: currentQ,
        userAnswer: finalAnswer,
        status,
        feedback
      },
      ...prev
    ]);

    setAnswer('');
    setCurrentFeedback(null);
    setGiveUpUsed(false);
    setShowHint(false);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setPhase('active');
    } else {
      if (sessionId) {
        await completeSession.mutateAsync(sessionId);
      }
      setPhase('finished');
    }
  };

  const handleGiveUp = async () => {
    try {
      setPhase('evaluating');
      const currentQ = questions[currentIndex];

      const { data, error } = await supabase.functions.invoke('quiz', {
        body: {
          action: 'evaluate',
          topico: currentQ.topico,
          questionText: currentQ.text,
          userAnswer: "O usuário desistiu de tentar responder e pediu a resposta.",
          forceAnswer: true
        }
      });

      if (error) throw error;
      const evalData = data as { status: string; feedback: string };
      
      setGiveUpUsed(true);
      await saveAndAdvance('errado', evalData.feedback, answer || "Desistiu");
    } catch (error) {
      console.error(error);
      toast.error('Erro ao pular resposta.');
      setPhase('active');
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;
    
    try {
      setPhase('evaluating');
      const currentQ = questions[currentIndex];

      const { data, error } = await supabase.functions.invoke('quiz', {
        body: {
          action: 'evaluate',
          topico: currentQ.topico,
          questionText: currentQ.text,
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
      toast.error('Erro ao avaliar resposta.');
      setPhase('active');
    }
  };

  if (loadingSettings || loadingTopics || loadingCount) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b border-border/50 flex items-center justify-between sticky top-0 bg-background z-10">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 font-medium">
          <BrainCircuit className="w-5 h-5 text-primary" />
          <span>Revisão Ativa</span>
        </div>
        <div className="w-9" /> {/* Spacer */}
      </header>

      <main className="flex-1 flex flex-col items-center p-6 max-w-3xl mx-auto w-full gap-8">
        
        {/* State: Idle with no topics or no limits */}
        {phase === 'idle' && (
          <div className="w-full max-w-md mx-auto text-center mt-12 animate-in fade-in zoom-in duration-500">
            {(!topics || topics.length === 0) ? (
              <div className="flex flex-col items-center bg-muted/30 border border-border/50 p-8 rounded-3xl">
                <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-bold mb-2">Sua mente está limpa!</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Você ainda não concluiu nenhum tópico no sistema. Explore a biblioteca, estude algo novo e marque como concluído para liberar o modo de Revisão Ativa.
                </p>
                <button
                  onClick={() => navigate('/biblioteca')}
                  className="w-full py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:opacity-90 transition-all active:scale-95 shadow-xl"
                >
                  Explorar Biblioteca
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center bg-card/50 border border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.1)] p-8 rounded-3xl">
                <h2 className="text-2xl font-bold mb-2">Revisão Pendente</h2>
                <p className="text-muted-foreground text-sm mb-8 text-center">
                  Baseado no seu volume de estudos neste período, o sistema gerará <strong className="text-primary">{dynamicQuestionLimit} perguntas</strong>.
                </p>
                <div className="w-full mb-6 text-left border border-border/50 bg-background/50 rounded-2xl p-4">
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                    Revisar é o que consolida o conhecimento na memória de longo prazo. O sistema vai puxar os tópicos que você estudou, focando onde você tem mais dificuldade.
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Você fará <strong>no máximo {dynamicQuestionLimit} perguntas</strong> por sessão para não sobrecarregar sua mente.
                  </p>
                </div>

                <button
                  onClick={() => handleStart(selectedMateria || undefined)}
                  disabled={!topics || topics.length === 0}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {(!topics || topics.length === 0) ? "Nenhum tópico encontrado" : "Gerar Bateria do Dia"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* State: Generating */}
        {phase === 'generating' && (
          <div className="text-center mt-12 animate-in fade-in duration-500">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6" />
            <h2 className="text-xl font-semibold">Criando suas perguntas...</h2>
            <p className="text-muted-foreground mt-2">Vasculhando seu histórico de estudos.</p>
          </div>
        )}

        {/* State: Active Question */}
        {(phase === 'active' || phase === 'evaluating') && questions[currentIndex] && (
          <div className="w-full animate-in slide-in-from-right-8 duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Pergunta {currentIndex + 1} de {questions.length}</span>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div key={i} className={cn("h-1.5 rounded-full transition-all duration-300", i === currentIndex ? "w-6 bg-primary" : i < currentIndex ? "w-2 bg-primary/40" : "w-2 bg-muted")} />
                ))}
              </div>
            </div>

            <div className="bg-card border-2 border-primary/20 shadow-sm rounded-3xl p-6 md:p-8 relative">
              {phase === 'evaluating' && (
                <div className="absolute inset-0 z-10 bg-background/90 rounded-3xl flex flex-col items-center justify-center animate-in fade-in">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
                  <span className="font-medium text-primary">Analisando resposta...</span>
                </div>
              )}

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4">
                <BrainCircuit className="w-3.5 h-3.5" />
                {questions[currentIndex].materiaSlug} • {questions[currentIndex].topico}
              </div>
              <h2 className="text-2xl font-semibold leading-tight mb-6">
                {questions[currentIndex].text}
              </h2>

              {questions[currentIndex].dica && (
                <div className="mb-6">
                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-full"
                    >
                      <Sparkles className="w-4 h-4" />
                      Ver Dica Inicial
                    </button>
                  ) : (
                    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-900 dark:text-amber-200/90 text-sm animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center gap-2 font-medium mb-1 text-amber-600 dark:text-amber-400">
                        <Sparkles className="w-4 h-4" />
                        Dica
                      </div>
                      {questions[currentIndex].dica}
                    </div>
                  )}
                </div>
              )}

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Escreva sua resposta..."
                className="w-full min-h-[120px] p-4 rounded-xl bg-muted/50 border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none mb-4"
                autoFocus
                disabled={phase === 'evaluating' || currentFeedback?.status === 'correto'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                     if (currentFeedback?.status === 'correto') {
                       saveAndAdvance('correto', currentFeedback.feedback, answer);
                     } else {
                       handleSubmitAnswer();
                     }
                  }
                }}
              />

              {currentFeedback && (
                <div className={cn(
                  "mb-6 p-5 rounded-2xl border animate-in fade-in slide-in-from-bottom-2",
                  currentFeedback.status === 'correto' ? "bg-green-500/5 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.05)]" :
                  currentFeedback.status === 'parcial' ? "bg-indigo-500/5 border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.05)]" :
                  "bg-red-500/5 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]"
                )}>
                  <div className={cn(
                    "flex items-center gap-2 mb-2.5 font-semibold",
                    currentFeedback.status === 'correto' ? "text-green-600 dark:text-green-400" :
                    currentFeedback.status === 'parcial' ? "text-indigo-600 dark:text-indigo-400" : 
                    "text-red-600 dark:text-red-400"
                  )}>
                    {currentFeedback.status === 'correto' ? <CheckCircle2 className="w-5 h-5" /> : currentFeedback.status === 'parcial' ? <Sparkles className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="tracking-wide">
                      {currentFeedback.status === 'correto' ? 'Correto!' : currentFeedback.status === 'parcial' ? 'Dica do Mentor' : 'Ainda não é isso'}
                    </span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-foreground/90">{currentFeedback.feedback}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    Pressione <kbd className="font-mono bg-muted px-1 rounded border border-border">Cmd</kbd> + <kbd className="font-mono bg-muted px-1 rounded border border-border">Enter</kbd>
                  </div>
                  {currentFeedback && currentFeedback.status !== 'correto' && !giveUpUsed && (
                    <button 
                      onClick={handleGiveUp}
                      disabled={phase === 'evaluating'}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors underline decoration-border underline-offset-4 font-medium"
                    >
                      Desistir e ver resposta
                    </button>
                  )}
                </div>
                {currentFeedback?.status === 'correto' ? (
                  <button 
                    onClick={() => saveAndAdvance('correto', currentFeedback.feedback, answer)}
                    className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 active:scale-95 transition-all ml-auto flex items-center gap-2"
                  >
                    Próxima Pergunta <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmitAnswer}
                    disabled={!answer.trim() || phase === 'evaluating'}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 ml-auto"
                  >
                    Enviar Resposta
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* State: Finished */}
        {phase === 'finished' && (
          <div className="text-center mt-12 animate-in zoom-in duration-500 bg-card border border-border/50 p-8 rounded-3xl w-full max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Bateria Concluída!</h1>
            <p className="text-muted-foreground mb-6">
              Excelente trabalho. Você completou sua sessão de revisão ativa para hoje.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="w-full py-3 bg-foreground text-background rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all"
            >
              Voltar ao Início
            </button>
          </div>
        )}

        {/* History Section */}
        {history.length > 0 && (
          <div className="w-full space-y-6 mt-4 border-t border-border/50 pt-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xl flex items-center gap-2">
                <History className="w-5 h-5 text-primary" /> Histórico da Sessão
              </h3>
              <div className="flex bg-muted/50 p-1 rounded-lg">
                <button 
                  onClick={() => setHistoryFilter('today')} 
                  className={cn("px-3 py-1 text-sm rounded-md transition-all", historyFilter === 'today' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")}
                >
                  Hoje
                </button>
                <button 
                  onClick={() => setHistoryFilter('all')} 
                  className={cn("px-3 py-1 text-sm rounded-md transition-all", historyFilter === 'all' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")}
                >
                  Tudo
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {history.map((item, idx) => (
                <div key={idx} className={cn(
                  "bg-card border rounded-2xl p-6 overflow-hidden relative",
                  item.status === 'correto' ? "border-green-500/20" :
                  item.status === 'parcial' ? "border-amber-500/20" :
                  "border-red-500/20"
                )}>
                  {/* Visual Indicator Line */}
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-1.5",
                    item.status === 'correto' ? "bg-green-500" :
                    item.status === 'parcial' ? "bg-amber-500" :
                    "bg-red-500"
                  )} />

                  <div className="flex flex-col gap-4 pl-2">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">
                        {item.question.materiaSlug} • {item.question.topico}
                      </div>
                      <h4 className="text-lg font-medium">{item.question.text}</h4>
                    </div>
                    
                    <div className="bg-muted/50 rounded-xl p-4 text-sm text-foreground/90 border border-border/50">
                      <span className="text-xs text-muted-foreground block mb-1 font-medium">Sua Resposta:</span>
                      {item.userAnswer}
                    </div>

                    <div className="flex items-start gap-3 mt-2">
                      <div className={cn(
                        "mt-0.5",
                        item.status === 'correto' ? "text-green-500" :
                        item.status === 'parcial' ? "text-amber-500" :
                        "text-red-500"
                      )}>
                        {item.status === 'correto' && <CheckCircle2 className="w-5 h-5" />}
                        {item.status === 'parcial' && <AlertCircle className="w-5 h-5" />}
                        {item.status === 'errado' && <XCircle className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className={cn(
                          "text-sm font-bold capitalize block mb-1",
                          item.status === 'correto' ? "text-green-600 dark:text-green-400" :
                          item.status === 'parcial' ? "text-amber-600 dark:text-amber-400" :
                          "text-red-600 dark:text-red-400"
                        )}>
                          {item.status}
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.feedback}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
