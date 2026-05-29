import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { useDailyTopic } from '@/hooks/useDailyTopic';
import { Skeleton } from '@/components/ui/skeleton';

export function DailyTopicCard() {
  const { dailyTopic, isLoading } = useDailyTopic();
  const navigate = useNavigate();

  if (isLoading) {
    return <Skeleton className="w-full h-32 rounded-3xl mb-8" />;
  }

  // Fallback: se platinou todos os tópicos disponíveis!
  if (!dailyTopic) {
    return (
      <div className="w-full bg-muted/40 border border-border/50 rounded-3xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🏆</span>
            <h3 className="font-semibold text-foreground">Você platinou o currículo!</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Você já estudou todos os tópicos disponíveis. Que tal fazer uma Revisão Ativa agora?
          </p>
        </div>
        <button
          onClick={() => navigate('/quiz')}
          className="shrink-0 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Ir para o Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-card/30 hover:bg-card/60 border border-border/40 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-6"
      onClick={() => navigate(`/sessao/${dailyTopic.materiaSlug}?sub=${encodeURIComponent(dailyTopic.topico)}`)}
    >
      <div className="space-y-2 flex-1">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
          Sugestão do Dia
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold text-foreground tracking-tight leading-tight mb-1">
            {dailyTopic.topico}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground/80">
            <span>{dailyTopic.emoji}</span>
            <span>{dailyTopic.materiaNome}</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-foreground/5 text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300">
        <ArrowRight className="w-5 h-5 -translate-x-0.5 group-hover:translate-x-0 transition-transform duration-300" />
      </div>
    </div>
  );
}
