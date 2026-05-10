import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMateriaBySlug } from '@/lib/materias';
import { useEmentaConcluida, useToggleEmenta } from '@/hooks/useSessoes';
import { playPopSound } from '@/lib/audioUtils';
import { cn } from '@/lib/utils';
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Zap, ChevronDown } from 'lucide-react';

export default function EmentaPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

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
          const isSelected = expandedTopic === topico;

          return (
            <div
              key={idx}
              onClick={() => { playPopSound(); setExpandedTopic(isSelected ? null : topico); }}
              className={cn(
                'w-full flex flex-col p-4 rounded-2xl border text-left transition-all cursor-pointer hover:bg-muted/20 active:scale-[0.98]',
                isSelected 
                  ? 'bg-primary/10 border-primary/40 ring-1 ring-primary/20' 
                  : isCurrent
                  ? 'bg-primary/5 border-primary/20'
                  : isCompleted
                  ? 'bg-muted/10 border-border/40'
                  : 'bg-muted/5 border-border/30'
              )}
            >
              {/* Cabeçalho do Cartão */}
              <div className="w-full flex items-center gap-4">
                {/* Ícone / Toggle */}
                <div
                  onClick={(e) => handleToggle(e, topico, isCompleted)}
                  className={cn(
                    'shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110',
                    isSelected
                      ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                      : isCurrent
                      ? 'bg-primary/10 border-primary/40 text-primary'
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
                    isCompleted && !isSelected ? 'text-muted-foreground line-through decoration-muted-foreground/30' : 'text-foreground'
                  )}>
                    {topico}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Tópico {idx + 1} de {total}</p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-3 shrink-0">
                  {isCurrent && !isSelected && (
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-full animate-pulse">
                      Atual
                    </span>
                  )}
                  {isCompleted && !isSelected && (
                    <span className="text-[10px] font-medium text-[hsl(var(--success))] opacity-70">
                      ✓
                    </span>
                  )}
                </div>
              </div>

              {/* Conteúdo Expansível (Sub-tópicos e Botão) */}
              {isSelected && (
                <div className="w-full mt-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
                  <p className="text-[13px] text-muted-foreground mb-4">
                    Selecione um foco opcional ou inicie a sessão padrão para este tópico.
                  </p>
                  
                  {config.subTopicos && config.subTopicos.length > 0 && (
                    <div className="mb-4">
                      <p className="text-[11px] font-medium text-muted-foreground mb-2">Foco opcional da matéria:</p>
                      <div className="flex flex-wrap gap-2">
                        {config.subTopicos.map(sub => (
                          <span key={sub.slug} className="px-2 py-1 text-[11px] rounded-full border border-border bg-muted/30 text-muted-foreground">
                            {sub.nome}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={(e) => { e.stopPropagation(); handleStartSession(topico); }}
                    className="w-full py-3 rounded-xl bg-foreground text-background font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    Estudar este tópico
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Fim da trilha */}
        {total > 0 && concluidos >= total && (
          <div className="flex items-center gap-3 text-sm w-full text-left p-2 rounded-xl text-foreground font-medium mt-2 opacity-90">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border text-[10px] transition-colors bg-primary/10 border-primary/30 text-primary">
              ∞
            </div>
            <span className="line-clamp-1 flex-1">
              Fronteira do Conhecimento
            </span>
          </div>
        )}
      </div>

      {/* CTA flutuante — Começar sessão */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => handleStartSession(expandedTopic || (currentIdx < total ? ementa[currentIdx] : ementa[0]))}
            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-foreground text-background hover:opacity-90 transition-all active:scale-[0.98] font-semibold"
          >
            <BookOpen className="w-5 h-5 shrink-0" />
            <div className="text-left flex-1">
              <span className="block text-sm">
                {expandedTopic ? `Estudar: ${expandedTopic.length > 30 ? expandedTopic.slice(0, 30) + '…' : expandedTopic}` : currentIdx < total ? 'Estudar tópico atual' : 'Revisar matéria'}
              </span>
              <span className="block text-[11px] opacity-60 font-normal truncate">
                {expandedTopic || (currentIdx < total ? ementa[currentIdx] : 'Trilha concluída')}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
