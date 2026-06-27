import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BrainCircuit, CheckCircle2, XCircle, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { usePendingFlashcards, useReviewFlashcard } from '@/hooks/useFlashcards';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export default function FlashcardsReview() {
  const navigate = useNavigate();
  const { data: flashcards, isLoading } = usePendingFlashcards();
  const reviewMutation = useReviewFlashcard();
  
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!flashcards || flashcards.length === 0 || currentIndex >= flashcards.length) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
          <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-500 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Tudo Limpo!</h1>
        <p className="text-muted-foreground text-center max-w-sm mb-8 text-lg">
          Você não tem mais nenhum flashcard pendente de revisão para hoje. Sua memória está em dia!
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-foreground text-background rounded-2xl font-semibold hover:opacity-90 active:scale-95 transition-all text-lg"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  const handleReview = async (rating: 'errado' | 'dificil' | 'bom' | 'facil') => {
    await reviewMutation.mutateAsync({
      id: currentCard.id,
      rating,
      currentInterval: currentCard.interval,
      currentEase: currentCard.ease_factor
    });
    
    setShowAnswer(false);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <header className="p-4 border-b border-border/50 flex items-center justify-between sticky top-0 bg-background z-10">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 font-medium">
          <BrainCircuit className="w-5 h-5 text-primary" />
          <span>Memória Ativa ({flashcards.length - currentIndex} pendentes)</span>
        </div>
        <div className="w-9" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full gap-8">
        
        <div className="w-full relative">
          <div className="w-full bg-card border-2 border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.05)] rounded-[2rem] p-8 sm:p-12 transition-all duration-500 min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
            
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-sm text-muted-foreground font-medium uppercase tracking-widest">
              <span>{currentCard.materia_slug}</span>
              <span>{currentCard.topico || 'Geral'}</span>
            </div>

            <div className="w-full mt-8 animate-in fade-in zoom-in duration-300">
               <h2 className="text-2xl sm:text-4xl font-bold leading-tight mb-8 text-foreground">
                 {currentCard.front}
               </h2>
               
               {showAnswer && (
                 <div className="animate-in slide-in-from-top-4 fade-in duration-300">
                   <div className="w-16 h-1 bg-border/50 mx-auto rounded-full mb-8" />
                   <div className="text-lg sm:text-xl text-foreground/90 font-medium leading-relaxed prose prose-invert max-w-none prose-p:my-0">
                     <ReactMarkdown>{currentCard.back}</ReactMarkdown>
                   </div>
                 </div>
               )}
            </div>
            
          </div>
        </div>

        <div className="w-full max-w-xl mx-auto h-[80px]">
          {!showAnswer ? (
            <button 
              onClick={() => setShowAnswer(true)}
              className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(var(--primary),0.2)]"
            >
              Revelar Resposta
            </button>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in slide-in-from-bottom-4 fade-in duration-300 h-full">
              <button 
                onClick={() => handleReview('errado')}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl transition-all active:scale-95"
              >
                <XCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">Errei</span>
                <span className="text-[10px] opacity-70">&lt; 1 dia</span>
              </button>
              
              <button 
                onClick={() => handleReview('dificil')}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-xl transition-all active:scale-95"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">Difícil</span>
                <span className="text-[10px] opacity-70">
                   ~{Math.max(1, Math.round(currentCard.interval * 1.2))} d
                </span>
              </button>

              <button 
                onClick={() => handleReview('bom')}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/30 rounded-xl transition-all active:scale-95"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold text-sm">Bom</span>
                <span className="text-[10px] opacity-70">
                   ~{Math.max(1, Math.round((currentCard.interval || 1) * currentCard.ease_factor))} d
                </span>
              </button>

              <button 
                onClick={() => handleReview('facil')}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/30 rounded-xl transition-all active:scale-95"
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold text-sm">Fácil</span>
                <span className="text-[10px] opacity-70">
                   ~{Math.max(1, Math.round((currentCard.interval || 1) * currentCard.ease_factor * 1.3))} d
                </span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
