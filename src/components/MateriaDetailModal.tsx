import { useState, useEffect, useRef } from 'react';
import { MateriaEstado } from '@/types';
import { urgencia, getMateriaBySlug } from '@/lib/materias';
import { useSessoes, useEmentaConcluida, useToggleEmenta } from '@/hooks/useSessoes';
import { useSessionMessages } from '@/hooks/useChatMessages';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, BookOpen, ChevronDown, ChevronUp, ArrowRight, Loader2, Map, History } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { playPopSound } from '@/lib/audioUtils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  estado: MateriaEstado | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}



export default function MateriaDetailModal({ estado, open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [expandedSession, setExpandedSession] = useState<number | null>(null);
  const [isExpandedRoadmap, setIsExpandedRoadmap] = useState(false);
  const { data: todasSessoes } = useSessoes();

  // REGRA DOS HOOKS: todos os hooks devem ser chamados ANTES de qualquer early return
  const ementaConcluidaQuery = useEmentaConcluida(estado?.config?.slug || '');
  const ementaConcluida = ementaConcluidaQuery.data || [];
  const toggleEmenta = useToggleEmenta();

  const currentTopicRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setSelectedSub(null);
      setExpandedSession(null);

      // Scroll suave para o tópico atual (no modal externo)
      setTimeout(() => {
        currentTopicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 160);
    }
  }, [open]);

  if (!estado) return null;

  const { config, ultimaSessao, diasParada } = estado;

  // Achata fases[].topicos em um array plano para matérias que usam estrutura de fases
  // Se a matéria tem ementa direta, usa ela. Se tem fases, achata os tópicos de todas as fases.
  const flatEmenta: string[] = config?.ementa && config.ementa.length > 0
    ? config.ementa
    : (config?.fases || []).flatMap(f => f.topicos || []);

  let proximoTopicoReal = ultimaSessao?.proximo_topico || '';
  if (flatEmenta.length > 0 && ultimaSessao) {
    const idxAnt = flatEmenta.findIndex(step => step.toLowerCase().includes(ultimaSessao.topico.toLowerCase()) || ultimaSessao.topico.toLowerCase().includes(step.toLowerCase()));
    const idxProx = proximoTopicoReal ? flatEmenta.findIndex(step => step.toLowerCase().includes(proximoTopicoReal.toLowerCase()) || proximoTopicoReal.toLowerCase().includes(step.toLowerCase())) : -1;
    let currIdx = idxProx >= 0 ? idxProx : (idxAnt >= 0 && idxAnt + 1 < flatEmenta.length ? idxAnt + 1 : 0);
    proximoTopicoReal = flatEmenta[currIdx] || proximoTopicoReal;
  }

  const handleToggleTopico = (e: React.MouseEvent, topico: string, isCompleted: boolean) => {
    e.stopPropagation();
    if (config) {
      toggleEmenta.mutate({ materia: config.slug, topico, isCompleted });
      playPopSound();
    }
  };
  const urg = urgencia(diasParada);

  const urgColors: Record<string, string> = {
    nova: 'text-muted-foreground',
    ok: 'text-[hsl(var(--success))]',
    atencao: 'text-[hsl(var(--warning))]',
    urgente: 'text-[hsl(var(--danger))]',
  };

  // Busca sessões desta matéria ordenadas desc
  const sessoesMateria = (todasSessoes || [])
    .filter(s => s.materia === config.slug)
    .sort((a, b) => new Date(b.created_at || b.data).getTime() - new Date(a.created_at || a.data).getTime());

  const handleNewSession = () => {
    playPopSound();
    onOpenChange(false);
    let url = `/sessao/${config.slug}`;
    if (selectedSub) url += `?sub=${encodeURIComponent(selectedSub)}`;
    navigate(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-2xl max-h-[90vh] flex flex-col">
        <DialogTitle className="sr-only">{config.nome}</DialogTitle>

        {/* Única área de scroll unificada — sem seções com shrink-0 competindo */}
        <div className="overflow-y-auto flex-1">

          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl select-none">{config.emoji}</span>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{config.nome}</h2>
                <p className={cn('text-xs font-medium', urgColors[urg])}>
                  {urg === 'nova' ? 'Nenhuma sessão ainda' :
                    urg === 'ok' ? `Estudada há ${diasParada}d` :
                    urg === 'atencao' ? `${diasParada}d sem estudar` :
                    `${diasParada}d parada`}
                </p>
              </div>
            </div>

            {/* Introdução */}
            <div className="mb-4 text-sm text-muted-foreground/90 bg-muted/30 p-3 rounded-xl border border-border/50">
              <p className="line-clamp-3 hover:line-clamp-none transition-all cursor-default">
                {config.descricao || `Um caminho contínuo de evolução em ${config.nome}, onde você começará do absoluto zero e será guiado organicamente até a maestria avançada.`}
              </p>
            </div>

            {/* Tópico anterior + próximo */}
            {ultimaSessao && (
              <div className="flex gap-2">
                {ultimaSessao.topico && (
                  <div className="flex-1 px-3 py-2 rounded-xl bg-muted/30 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Anterior</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5 line-clamp-2">
                      {ultimaSessao.topico}
                    </p>
                  </div>
                )}
                {ultimaSessao.topico && proximoTopicoReal && (
                  <div className="flex items-center shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </div>
                )}
                {proximoTopicoReal && (
                  <div className="flex-1 px-3 py-2 rounded-xl bg-muted/50 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Próximo</p>
                    <p className="text-xs font-semibold text-foreground mt-0.5 line-clamp-2">
                      {proximoTopicoReal}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Por que estudar agora — visível só se houver whyStart */}
            {config.whyStart && <WhyStartSection text={config.whyStart} />}
          </div>

          <Tabs defaultValue="roadmap" className="w-full flex-1 flex flex-col">
            <div className="px-6 pb-2">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                <TabsTrigger value="history">
                  Sessões Anteriores
                  {sessoesMateria.length > 0 && <span className="ml-2 bg-muted-foreground/20 text-[10px] px-1.5 rounded-full">{sessoesMateria.length}</span>}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="roadmap" className="flex-1 mt-0 outline-none flex flex-col">
              {/* Ementa / Roadmap Timeline */}
          {flatEmenta.length > 0 && (() => {
            const firstUncompletedIdx = flatEmenta.findIndex(t => !ementaConcluida.includes(t));
            const currentIdx = firstUncompletedIdx === -1 ? flatEmenta.length : firstUncompletedIdx;
            const allDone = ementaConcluida.length >= flatEmenta.length;

            return (
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                    Roadmap
                  </p>
                  <span className="text-[10px] font-medium bg-foreground/10 text-foreground px-2 py-0.5 rounded-full">
                    {allDone ? 'Base concluída' : `${ementaConcluida.length} de ${flatEmenta.length}`}
                  </span>
                </div>

                {/* Timeline vertical */}
                <div className="relative">
                  {(() => {
                    const startIdx = isExpandedRoadmap ? 0 : Math.max(0, currentIdx - 1);
                    const endIdx = isExpandedRoadmap ? flatEmenta.length : Math.min(flatEmenta.length, currentIdx + 4);
                    const visibleEmenta = flatEmenta.slice(startIdx, endIdx);
                    
                    return (
                      <>
                        {!isExpandedRoadmap && startIdx > 0 && (
                          <div className="flex gap-3 mb-2 opacity-50">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 flex items-center justify-center shrink-0 text-muted-foreground">⋮</div>
                            </div>
                          </div>
                        )}
                        {visibleEmenta.map((topico, i) => {
                          const idx = startIdx + i;
                          const isCompleted = ementaConcluida.includes(topico);
                          const isCurrent = idx === currentIdx;
                          const isFuture = idx > currentIdx;
                          const isLast = idx === flatEmenta.length - 1;
                          const isPaused = isCurrent && ultimaSessao?.topico === topico;

                          return (
                            <div key={idx} className="flex gap-3">
                              {/* Coluna da linha + nó */}
                              <div className="flex flex-col items-center">
                                {/* Nó */}
                                <button
                                  ref={isCurrent ? currentTopicRef : null}
                                  onClick={(e) => handleToggleTopico(e, topico, isCompleted)}
                                  title={isCompleted ? 'Marcar como não concluído' : 'Marcar como concluído'}
                                  className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border text-[10px] font-bold transition-all duration-200 hover:scale-110 z-10",
                                    isCompleted
                                      ? "bg-[hsl(var(--success)/0.15)] border-[hsl(var(--success)/0.4)] text-[hsl(var(--success))]"
                                      : isPaused
                                      ? "bg-[hsl(var(--warning)/0.15)] border-[hsl(var(--warning)/0.5)] text-[hsl(var(--warning))] ring-2 ring-[hsl(var(--warning)/0.25)] ring-offset-1 ring-offset-background animate-pulse"
                                      : isCurrent
                                      ? "bg-primary/15 border-primary/50 text-primary ring-2 ring-primary/25 ring-offset-1 ring-offset-background animate-pulse"
                                      : "bg-muted/20 border-border/40 text-muted-foreground/50"
                                  )}
                                >
                                  {isCompleted ? '✓' : isPaused ? '⏸' : isCurrent ? '●' : (idx + 1)}
                                </button>
                                {/* Linha conectora (não aparece no último item) */}
                                {!isLast && (
                                  <div className={cn(
                                    "w-px flex-1 min-h-[20px] my-0.5 transition-colors",
                                    isCompleted ? "bg-[hsl(var(--success)/0.3)]" : "bg-border/40"
                                  )} />
                                )}
                              </div>

                              {/* Conteúdo do passo */}
                              <button
                                onClick={() => setSelectedSub(selectedSub === topico ? null : topico)}
                                className={cn(
                                  "flex-1 text-left pb-3 text-sm transition-colors rounded-lg px-2 -mx-2",
                                  isCurrent && "font-semibold text-foreground",
                                  isCompleted && !isCurrent && "text-muted-foreground",
                                  isFuture && "text-muted-foreground/60",
                                  selectedSub === topico && "bg-muted/40"
                                )}
                                style={{ paddingTop: '3px' }}
                              >
                                <span className={cn(
                                  "line-clamp-2",
                                  isCompleted && selectedSub !== topico && "line-through decoration-muted-foreground/30"
                                )}>
                                  {topico}
                                </span>
                                {isCurrent && (
                                  <span className={cn(
                                    "block text-[10px] font-bold uppercase tracking-widest mt-0.5",
                                    isPaused ? "text-[hsl(var(--warning))]" : "text-primary"
                                  )}>
                                    {isPaused ? 'Pausado em andamento' : 'Você está aqui'}
                                  </span>
                                )}
                              </button>
                            </div>
                          );
                        })}
                        {!isExpandedRoadmap && endIdx < flatEmenta.length && (
                          <div className="flex gap-3 mt-1 opacity-50">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 flex items-center justify-center shrink-0 text-muted-foreground">⋮</div>
                            </div>
                          </div>
                        )}
                        {flatEmenta.length > 5 && (
                          <button 
                            onClick={() => setIsExpandedRoadmap(!isExpandedRoadmap)}
                            className="w-full mt-2 py-2 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors border border-transparent hover:border-border/50"
                          >
                            {isExpandedRoadmap ? 'Esconder tópicos' : `Mostrar todos os ${flatEmenta.length} tópicos`}
                          </button>
                        )}
                      </>
                    );
                  })()}

                  {/* Fronteira do conhecimento (quando tudo concluído) */}
                  {allDone && (
                    <div className="flex gap-3 mt-1">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border text-[11px] bg-primary/15 border-primary/50 text-primary">
                          ∞
                        </div>
                      </div>
                      <p className="flex-1 text-sm font-semibold text-foreground pb-2 pt-0.5">
                        Fronteira do Conhecimento
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Sub-tópicos */}
          {config.subTopicos && config.subTopicos.length > 0 && (
            <div className="px-6 pb-4">
              <p className="text-[12px] font-medium text-muted-foreground mb-2">Foco (opcional):</p>
              <div className="flex flex-wrap gap-2">
                {config.subTopicos.map(sub => (
                  <button
                    key={sub.slug}
                    onClick={() => setSelectedSub(selectedSub === sub.slug ? null : sub.slug)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors border",
                      selectedSub === sub.slug
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-muted-foreground border-border hover:bg-muted"
                    )}
                  >
                    {sub.nome}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Action — CTA Começar Sessão */}
          <div className="px-4 py-3 mt-auto">
            {allDone ? (
              <button
                onClick={handleNewSession}
                className={cn(
                  'flex items-center gap-4 w-full p-4 rounded-2xl border',
                  'bg-[hsl(var(--success)/0.1)] border-[hsl(var(--success)/0.3)]',
                  'hover:bg-[hsl(var(--success)/0.15)] transition-all active:scale-[0.98]'
                )}
              >
                <div className="bg-[hsl(var(--success)/0.2)] p-2.5 rounded-xl">
                  <BookOpen className="w-5 h-5 text-[hsl(var(--success))]" />
                </div>
                <div className="text-left flex-1">
                  <span className="block text-[15px] font-semibold text-[hsl(var(--success))]">
                    Revisão / Consolidação
                  </span>
                  <span className="block text-[12px] text-[hsl(var(--success))/0.7] leading-tight mt-0.5">
                    Você já concluiu toda a base. Reforce seu conhecimento.
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[hsl(var(--success))/0.7]" />
              </button>
            ) : (
              <button
                onClick={handleNewSession}
                className={cn(
                  'flex items-center gap-4 w-full p-4 rounded-2xl border',
                  ultimaSessao && proximoTopicoReal === ultimaSessao.topico && !ementaConcluida.includes(ultimaSessao.topico)
                    ? 'bg-[hsl(var(--warning)/0.1)] border-[hsl(var(--warning)/0.3)] hover:bg-[hsl(var(--warning)/0.15)]'
                    : 'bg-foreground/5 border-border hover:bg-foreground/10',
                  'transition-all active:scale-[0.98]'
                )}
              >
                <div className={cn("p-2.5 rounded-xl", 
                  ultimaSessao && proximoTopicoReal === ultimaSessao.topico && !ementaConcluida.includes(ultimaSessao.topico)
                    ? "bg-[hsl(var(--warning)/0.2)] text-[hsl(var(--warning))]"
                    : "bg-foreground/10 text-foreground"
                )}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <span className={cn("block text-[15px] font-semibold",
                    ultimaSessao && proximoTopicoReal === ultimaSessao.topico && !ementaConcluida.includes(ultimaSessao.topico)
                      ? "text-[hsl(var(--warning))]" : "text-foreground"
                  )}>
                    {selectedSub ? `Estudar: ${selectedSub.length > 30 ? selectedSub.slice(0, 30) + '…' : selectedSub}` : 
                     (ultimaSessao && proximoTopicoReal === ultimaSessao.topico && !ementaConcluida.includes(ultimaSessao.topico) ? 'Retomar Sessão Pausada' : 'Começar Sessão')}
                  </span>
                  <span className={cn("block text-[12px] leading-tight mt-0.5",
                    ultimaSessao && proximoTopicoReal === ultimaSessao.topico && !ementaConcluida.includes(ultimaSessao.topico)
                      ? "text-[hsl(var(--warning))/0.7]" : "text-muted-foreground"
                  )}>
                    {ultimaSessao ? `Continua de: ${proximoTopicoReal || ultimaSessao.topico}` : 'Primeira sessão nesta matéria'}
                  </span>
                </div>
                <ChevronRight className={cn("w-4 h-4", 
                  ultimaSessao && proximoTopicoReal === ultimaSessao.topico && !ementaConcluida.includes(ultimaSessao.topico)
                    ? "text-[hsl(var(--warning))/0.7]" : "text-muted-foreground"
                )} />
              </button>
            )}

            {/* Link para Jornada Completa */}
            {flatEmenta.length > 0 && (
              <button
                onClick={() => { playPopSound(); onOpenChange(false); navigate(`/ementa/${config.slug}`); }}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[12px] text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              >
                <Map className="w-3.5 h-3.5" />
                Ver jornada completa ({ementaConcluida.length}/{flatEmenta.length} tópicos)
              </button>
            )}
          </div>

            </TabsContent>

            <TabsContent value="history" className="flex-1 mt-0 outline-none pb-4">
              {/* Histórico de Sessões */}
              {sessoesMateria.length > 0 ? (
                <div className="px-4 py-3">
                  <div className="space-y-2">
                    {sessoesMateria.map(sessao => {
                      const hasChat = !!sessao.session_key;
                      return (
                        <SessaoItem
                          key={sessao.id}
                          sessao={sessao}
                          hasChat={hasChat}
                          isExpanded={expandedSession === sessao.id}
                          onToggle={() => {
                            if (hasChat) {
                              playPopSound();
                              setExpandedSession(expandedSession === sessao.id ? null : sessao.id);
                            }
                          }}
                          onOpenChat={() => {
                            playPopSound();
                            onOpenChange(false);
                            navigate(`/sessao/${config.slug}?resume=${sessao.session_key}`);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                  <History className="w-8 h-8 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-foreground">Nenhuma sessão anterior</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Comece a estudar esta matéria para ver seu histórico aqui.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div> {/* fim do scroll unificado */}
      </DialogContent>
    </Dialog>
  );
}

// Componente separado para cada sessão — o hook lazy só dispara quando isExpanded=true
function SessaoItem({
  sessao,
  hasChat,
  isExpanded,
  onToggle,
  onOpenChat,
}: {
  sessao: { id: number; topico: string; created_at: string | null; data: string; session_key?: string | null };
  hasChat: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenChat: () => void;
}) {
  // BUG-03: só faz fetch quando o usuário expande (enabled = isExpanded)
  const { data: messages, isLoading } = useSessionMessages(isExpanded ? sessao.id : null);

  return (
    <div className="bg-muted/30 rounded-xl border border-border overflow-hidden">
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2.5",
          hasChat && "cursor-pointer hover:bg-muted/50 transition-colors"
        )}
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground truncate">{sessao.topico}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">
            {format(new Date(sessao.created_at || sessao.data), "d 'de' MMM", { locale: ptBR })}
          </p>
        </div>
        {hasChat && (
          <div className="text-muted-foreground shrink-0 ml-2">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        )}
      </div>

      {isExpanded && hasChat && (
        <div className="px-3 pb-3 pt-1 border-t border-border/50 bg-background/50">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {(messages || []).map((msg, idx) => {
                if (msg.role === 'system') return null;
                const cleanContent = msg.content.replace(/<[^>]+>/g, '').trim();
                if (!cleanContent) return null;
                return (
                  <div key={idx} className={cn(
                    "flex",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}>
                    <div className={cn(
                      "px-3 py-2 rounded-xl text-[11px] max-w-[90%]",
                      msg.role === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}>
                      <p className="whitespace-pre-wrap">{cleanContent}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {sessao.session_key && (
            <button
              onClick={(e) => { e.stopPropagation(); onOpenChat(); }}
              className="mt-3 w-full py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground text-[11px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Abrir Tela Completa do Chat
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Componente colapsável para exibir a justificativa pedagógica da matéria
function WhyStartSection({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ChevronRight className={cn(
          "w-3 h-3 transition-transform duration-200",
          open && "rotate-90"
        )} />
        Por que estudar agora?
      </button>

      {open && (
        <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed bg-muted/30 rounded-xl px-3 py-2.5 border border-border/50">
          {text}
        </p>
      )}
    </div>
  );
}
