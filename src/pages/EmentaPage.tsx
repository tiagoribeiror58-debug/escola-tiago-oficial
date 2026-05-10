import { useParams, useNavigate } from 'react-router-dom';
import { getMateriaBySlug } from '@/lib/materias';
import { useEmentaConcluida, useToggleEmenta } from '@/hooks/useSessoes';
import { playPopSound } from '@/lib/audioUtils';
import { cn } from '@/lib/utils';
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Zap } from 'lucide-react';

export default function EmentaPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const config = slug ? getMateriaBySlug(slug) : null;
  const ementaConcluidaQuery = useEmentaConcluida(slug || '');
  const ementaConcluida = ementaConcluidaQuery.data || [];
  const toggleEmenta = useToggleEmenta();

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Matéria não encontrada.
      </div>
    );
  }

  const ementa = config.ementa || [];
  const total = ementa.length;
  const concluidos = ementaConcluida.length;
  const progresso = total > 0 ? Math.round((concluidos / total) * 100) : 0;
  const firstUncompletedIdx = ementa.findIndex(t => !ementaConcluida.includes(t));
  const currentIdx = firstUncompletedIdx === -1 ? total : firstUncompletedIdx;

  const handleStartSession = (topico: string) => {
    playPopSound();
    navigate(`/sessao/${slug}?sub=${encodeURIComponent(topico)}`);
  };

  const handleToggle = (e: React.MouseEvent, topico: string, isCompleted: boolean) => {
    e.stopPropagation();
    if (config) {
      toggleEmenta.mutate({ materia: config.slug, topico, isCompleted });
      playPopSound();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header fixo */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xl select-none">{config.emoji}</span>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-foreground truncate">{config.nome}</h1>
              <p className="text-[11px] text-muted-foreground">Jornada Completa</p>
            </div>
          </div>
          {/* Contador */}
          <span className="shrink-0 text-[12px] font-semibold tabular-nums text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border">
            {concluidos}/{total}
          </span>
        </div>

        {/* Barra de progresso global */}
        <div className="max-w-2xl mx-auto px-4 pb-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{progresso}% concluído</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-2 pb-24">
        {ementa.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-sm">
            Esta matéria ainda não tem ementa configurada.
          </div>
        )}

        {ementa.map((topico, idx) => {
          const isCompleted = ementaConcluida.includes(topico);
          const isCurrent = idx === currentIdx;
          const isPending = !isCompleted && !isCurrent;

          return (
            <button
              key={idx}
              onClick={() => handleStartSession(topico)}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all active:scale-[0.98]',
                isCurrent
                  ? 'bg-primary/10 border-primary/30 hover:bg-primary/15'
                  : isCompleted
                  ? 'bg-muted/20 border-border/40 hover:bg-muted/40'
                  : 'bg-muted/10 border-border/30 hover:bg-muted/30'
              )}
            >
              {/* Ícone / Toggle */}
              <div
                onClick={(e) => handleToggle(e, topico, isCompleted)}
                className={cn(
                  'shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110',
                  isCurrent
                    ? 'bg-primary/10 border-primary/40 text-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background'
                    : isCompleted
                    ? 'bg-[hsl(var(--success)/0.1)] border-[hsl(var(--success)/0.4)] text-[hsl(var(--success))]'
                    : 'bg-muted/30 border-border/50 text-muted-foreground'
                )}
              >
                {isCompleted
                  ? <CheckCircle2 className="w-4 h-4" />
                  : isCurrent
                  ? <Zap className="w-4 h-4" />
                  : <Circle className="w-4 h-4 opacity-50" />
                }
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'text-sm font-medium leading-snug',
                  isCompleted ? 'text-muted-foreground line-through decoration-muted-foreground/30' : 'text-foreground'
                )}>
                  {topico}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Tópico {idx + 1} de {total}</p>
              </div>

              {/* Badge de estado */}
              {isCurrent && (
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-full animate-pulse">
                  Atual
                </span>
              )}
              {isCompleted && (
                <span className="shrink-0 text-[10px] font-medium text-[hsl(var(--success))] opacity-70">
                  ✓
                </span>
              )}
            </button>
          );
        })}

        {/* Fim da trilha */}
        {total > 0 && concluidos >= total && (
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-primary/20 bg-primary/5 mt-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              ∞
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Fronteira do Conhecimento</p>
              <p className="text-[11px] text-muted-foreground">Você concluiu toda a ementa base.</p>
            </div>
          </div>
        )}
      </div>

      {/* CTA flutuante — Começar sessão no tópico atual */}
      {currentIdx < total && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => handleStartSession(ementa[currentIdx])}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-foreground text-background hover:opacity-90 transition-all active:scale-[0.98] font-semibold"
            >
              <BookOpen className="w-5 h-5 shrink-0" />
              <div className="text-left flex-1">
                <span className="block text-sm">Estudar tópico atual</span>
                <span className="block text-[11px] opacity-60 font-normal truncate">{ementa[currentIdx]}</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
