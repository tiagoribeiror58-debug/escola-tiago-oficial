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

  // Bug guard: categorias não têm ementa própria — redireciona para a página de categoria
  if (config.isCategory) {
    navigate(`/categoria/${config.slug}`, { replace: true });
    return null;
  }

  const fases = config.fases || (config.ementa ? [{ nome: '', topicos: config.ementa }] : []);
  const flatEmenta = fases.flatMap(f => f.topicos);

  const total = flatEmenta.length;
  const concluidos = ementaConcluida.length;
  const progresso = total > 0 ? Math.round((concluidos / total) * 100) : 0;
  const norm = (s: string) => s.toLowerCase().trim();
  const isConcluido = (topico: string) => ementaConcluida.some(c => norm(c).includes(norm(topico)) || norm(topico).includes(norm(c)));
  const firstUncompletedIdx = flatEmenta.findIndex(t => !isConcluido(t));
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
              <h1 className="font-semibold text-sm truncate">{config.nome}</h1>
              <p className="text-[11px] text-muted-foreground truncate">Jornada Completa</p>
            </div>
          </div>
        </div>
        
        {/* Progress Bar Giga */}
        <div className="h-1 bg-muted w-full overflow-hidden relative">
          <div 
            className="h-full bg-primary transition-all duration-1000 ease-out relative"
            style={{ width: `${progresso}%` }}
          >
            {progresso > 0 && progresso < 100 && (
              <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-white/40 animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <div className="bg-muted/10 border border-border/50 rounded-2xl p-5 mb-2">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{config.descricao}</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{concluidos}</span>
                <span className="text-sm text-muted-foreground">de {total} tópicos concluídos</span>
              </div>
            </div>
            {progresso === 100 && (
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))] flex items-center justify-center shrink-0 border border-[hsl(var(--success)/0.2)]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {flatEmenta.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-sm">
            Esta matéria ainda não tem ementa configurada.
          </div>
        )}

        {fases.map((fase, fIdx) => (
          <div key={fIdx} className="mb-6 space-y-2">
            {fase.nome && (
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 mb-3 mt-6">
                {fase.nome}
              </h3>
            )}
            
            {fase.topicos.map((topico) => {
              const idx = flatEmenta.indexOf(topico);
              const isCompleted = isConcluido(topico);
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
                      ? 'bg-[hsl(var(--success)/0.03)] border-[hsl(var(--success)/0.15)] shadow-sm'
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
                        'text-sm font-medium leading-snug transition-colors',
                        isCompleted && !isSelected ? 'text-[hsl(var(--success))] opacity-80' : 'text-foreground'
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
          </div>
        ))}

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
            onClick={() => handleStartSession(expandedTopic || (currentIdx < total ? flatEmenta[currentIdx] : flatEmenta[0]))}
            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-foreground text-background hover:opacity-90 transition-all active:scale-[0.98] font-semibold"
          >
            <BookOpen className="w-5 h-5 shrink-0" />
            <div className="text-left flex-1">
              <span className="block text-sm">
                {expandedTopic ? `Estudar: ${expandedTopic.length > 30 ? expandedTopic.slice(0, 30) + '…' : expandedTopic}` : currentIdx < total ? 'Estudar tópico atual' : 'Revisar matéria'}
              </span>
              <span className="block text-[11px] opacity-60 font-normal truncate">
                {expandedTopic || (currentIdx < total ? flatEmenta[currentIdx] : 'Trilha concluída')}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
