import { useState, useEffect, useRef } from 'react';
import { MateriaEstado } from '@/types';
import { urgencia, getMateriaBySlug } from '@/lib/materias';
import { useSessoes, useEmentaConcluida, useToggleEmenta, useExcluirHistoricoTopico } from '@/hooks/useSessoes';
import { useSessionMessages } from '@/hooks/useChatMessages';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, BookOpen, ChevronDown, ChevronUp, ArrowRight, Loader2, Map as MapIcon, History, Trash2, Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { playPopSound } from '@/lib/audioUtils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { useTopicosEmergentes } from '@/hooks/useTopicosEmergentes';
import { useFloatingChat } from '@/contexts/FloatingChatContext';


interface Props {
  estado: MateriaEstado | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}



export default function MateriaDetailModal({ estado, open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [expandedSession, setExpandedSession] = useState<number | null>(null);
  const [expandedCount, setExpandedCount] = useState(0);
  const [unhiddenTopics, setUnhiddenTopics] = useState<Set<string>>(new Set());

  // Preview do tópico via IA — com cache em memória para não chamar a API 2x pelo mesmo tópico
  const [topicPreview, setTopicPreview] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const previewCacheRef = useRef<Map<string, string>>(new Map());


  const { data: todasSessoes } = useSessoes();

  // REGRA DOS HOOKS: todos os hooks devem ser chamados ANTES de qualquer early return
  const ementaConcluidaQuery = useEmentaConcluida(estado?.config?.slug || '');
  const ementaConcluida = ementaConcluidaQuery.data || [];
  const toggleEmenta = useToggleEmenta();
  const excluirTopico = useExcluirHistoricoTopico();
  const { data: topicosEmergentes } = useTopicosEmergentes(estado?.config?.slug);
  const { openChat } = useFloatingChat();

  const currentTopicRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setSelectedSub(null);
      setExpandedSession(null);
      setExpandedCount(0);

      // Scroll suave para o tópico atual (no modal externo)
      setTimeout(() => {
        currentTopicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 160);
    }
  }, [open]);

  // Busca prévia do tópico — usa cache para não repetir chamada pelo mesmo tópico
  useEffect(() => {
    if (!selectedSub || !estado) {
      setTopicPreview(null);
      return;
    }

    // Cache hit: já buscou esse tópico antes, não chama a API de novo
    if (previewCacheRef.current.has(selectedSub)) {
      setTopicPreview(previewCacheRef.current.get(selectedSub)!);
      return;
    }

    let cancelled = false;
    setIsPreviewLoading(true);
    setTopicPreview(null);

    supabase.functions.invoke('topic-preview', {
      body: {
        materiaName: estado.config.nome,
        topicName: selectedSub,
        descricaoMateria: estado.config.descricao,
      },
    }).then(({ data, error }) => {
      if (cancelled) return;
      const preview = (!error && data?.preview) ? data.preview : 'Iniciar uma nova sessão de estudos';
      previewCacheRef.current.set(selectedSub, preview); // salva no cache
      setTopicPreview(preview);
    }).finally(() => {
      if (!cancelled) setIsPreviewLoading(false);
    });

    return () => { cancelled = true; };
  }, [selectedSub, estado]);


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

  const firstUncompletedIdx = flatEmenta.findIndex(t => !ementaConcluida.includes(t));
  const currentIdx = firstUncompletedIdx === -1 ? flatEmenta.length : firstUncompletedIdx;
  const allDone = flatEmenta.length > 0 && ementaConcluida.length >= flatEmenta.length;

  const allHiddenTopics = flatEmenta.filter((t, i) => i !== currentIdx);
  const areAllRevealed = unhiddenTopics.size > 0 && allHiddenTopics.every(t => unhiddenTopics.has(t));

  const toggleRevealAll = () => {
    playPopSound();
    if (areAllRevealed) {
      setUnhiddenTopics(new Set());
    } else {
      setUnhiddenTopics(new Set(allHiddenTopics));
    }
  };

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
    
  // Identifica se o tópico selecionado está pausado.
  // Regra original: tem sessão neste tópico e ele ainda não está na ementa_concluida.
  const norm = (s?: string | null) => (s || '').toLowerCase().trim();
  const sessaoDesteTopico = sessoesMateria.find(s =>
    selectedSub != null &&
    !ementaConcluida.includes(selectedSub) &&
    (norm(s.topico).includes(norm(selectedSub)) || norm(selectedSub).includes(norm(s.topico)))
  );
  const isSelectedSubPaused = !!(selectedSub && sessaoDesteTopico);

  const isSelectedSubCompleted = !!(selectedSub && ementaConcluida.includes(selectedSub));
  // BUGFIX: Filtra sessões que realmente possuem chave de chat (session_key), priorizando a de maior duração ou mais recente.
  const sessaoConcluidaDesteTopico = sessoesMateria
    .filter(s => s.topico === selectedSub && !!s.session_key)
    .sort((a, b) => {
      if ((b.duracao_min || 0) !== (a.duracao_min || 0)) {
        return (b.duracao_min || 0) - (a.duracao_min || 0);
      }
      return new Date(b.created_at || b.data).getTime() - new Date(a.created_at || a.data).getTime();
    })[0];

  const ctaUrl = (() => {
    let url = `/sessao/${config.slug}`;
    if (selectedSub) {
      if (isSelectedSubCompleted && sessaoConcluidaDesteTopico?.session_key) {
        url += `?resume=${sessaoConcluidaDesteTopico.session_key}`;
      } else {
        url += `?sub=${encodeURIComponent(selectedSub)}`;
        if (isSelectedSubPaused) {
          url += `&resume=${sessaoDesteTopico.session_key}`;
        }
      }
    }
    return url;
  })();

  const handleNewSessionClick = () => {
    playPopSound();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden rounded-2xl max-h-[90vh] flex flex-col">
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
                  <div className="flex-1 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20">
                    <p className="text-[10px] text-primary uppercase tracking-wide font-medium">Próximo</p>
                    <p className="text-xs font-medium text-foreground mt-0.5 line-clamp-2">
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
            return (
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                    Roadmap
                  </p>
                  <div className="flex items-center gap-3">
                    {flatEmenta.length > 0 && allHiddenTopics.length > 0 && (
                      <button
                        onClick={toggleRevealAll}
                        className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded bg-muted/20 hover:bg-muted/50 border border-border/50"
                      >
                        {areAllRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        {areAllRevealed ? "Ocultar" : "Revelar"}
                      </button>
                    )}
                    <span className="text-[10px] font-medium bg-foreground/10 text-foreground px-2 py-0.5 rounded-full">
                      {allDone ? 'Base concluída' : `${ementaConcluida.length} de ${flatEmenta.length}`}
                    </span>
                  </div>
                </div>

                {/* Timeline vertical */}
                <div className="relative">
                  {(() => {
                    const startIdx = areAllRevealed ? 0 : Math.max(0, currentIdx - 2);
                    const endIdx = areAllRevealed ? flatEmenta.length : Math.min(flatEmenta.length, currentIdx + 4 + expandedCount);
                    const visibleEmenta = flatEmenta.slice(startIdx, endIdx);
                    
                    return (
                      <>
                        {startIdx > 0 && (
                          <div className="flex gap-3 mb-2 opacity-50">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 flex items-center justify-center shrink-0 text-muted-foreground">⋮</div>
                            </div>
                          </div>
                        )}
                        {visibleEmenta.map((step, i) => {
                          const idx = startIdx + i;
                          const norm = (s: string) => s.toLowerCase().trim();
                          const normLocal = (s?: string | null) => (s || '').toLowerCase().trim();
                          const isCompleted = ementaConcluida.some(d => normLocal(d).includes(normLocal(step)) || normLocal(step).includes(normLocal(d)));
                          const isCurrent = currentIdx === idx;
                          // Regra correta: só marca como pausado se existir sessão com decisao_proxima='Pausada'
                          // para este tópico. Evita falsos positivos com sessões já encerradas.
                          const isPaused = !isCompleted && sessoesMateria.some(s =>
                            s.decisao_proxima === 'Pausada' &&
                            (normLocal(s.topico).includes(normLocal(step)) || normLocal(step).includes(normLocal(s.topico)))
                          );
                          const isLast = idx === flatEmenta.length - 1;
                          const isVisible = areAllRevealed || isCurrent || unhiddenTopics.has(step);

                          const stepSessions = sessoesMateria.filter(s => normLocal(s.topico).includes(normLocal(step)) || normLocal(step).includes(normLocal(s.topico)));
                          const emergentTopicsForStep = (topicosEmergentes || []).filter(te => stepSessions.some(s => s.session_key === te.session_key));

                          const currentPhase = config.fases?.find(f => f.topicos.includes(step));
                          const prevTopic = idx > 0 ? flatEmenta[idx - 1] : null;
                          const prevPhase = prevTopic ? config.fases?.find(f => f.topicos.includes(prevTopic)) : null;
                          const showPhaseHeader = currentPhase && currentPhase !== prevPhase;

                          return (
                            <div key={idx} className="flex flex-col w-full">
                              {showPhaseHeader && currentPhase.nome && (
                                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-3 mt-4">
                                  {currentPhase.nome}
                                </h3>
                              )}
                              <div className={cn(
                                "flex gap-3 relative group transition-opacity",
                                !isCompleted && !isCurrent && !isPaused && "opacity-40"
                              )}>
                                {/* Indicador Visual */}
                                <div className="flex flex-col items-center">
                                  <button 
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (!isVisible) return;
                                      playPopSound();
                                      onOpenChange(false);
                                      
                                      let url = `/sessao/${config.slug}?sub=${encodeURIComponent(step)}`;
                                      if (isPaused) {
                                        const sessaoPausada = sessoesMateria.find(s => s.decisao_proxima === 'Pausada' && (normLocal(s.topico).includes(normLocal(step)) || normLocal(step).includes(normLocal(s.topico))));
                                        if (sessaoPausada?.session_key) url = `/sessao/${config.slug}?resume=${sessaoPausada.session_key}`;
                                      } else if (isCompleted) {
                                        const sessaoConc = sessoesMateria.find(s => !!s.session_key && (normLocal(s.topico).includes(normLocal(step)) || normLocal(step).includes(normLocal(s.topico))));
                                        if (sessaoConc?.session_key) url = `/sessao/${config.slug}?resume=${sessaoConc.session_key}`;
                                      }
                                      navigate(url);
                                    }}
                                    className={cn(
                                      "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border text-[10px] font-bold transition-all duration-200 z-10",
                                      isVisible && "hover:scale-110",
                                      !isVisible && "opacity-40 grayscale cursor-default",
                                      isCompleted
                                        ? "bg-[hsl(var(--success)/0.15)] border-[hsl(var(--success)/0.4)] text-[hsl(var(--success))]"
                                        : isPaused
                                        ? "bg-[hsl(var(--warning)/0.15)] border-[hsl(var(--warning)/0.5)] text-[hsl(var(--warning))] ring-2 ring-[hsl(var(--warning)/0.25)] ring-offset-1 ring-offset-background"
                                        : isCurrent
                                        ? "bg-primary/15 border-primary/50 text-primary ring-2 ring-primary/25 ring-offset-1 ring-offset-background"
                                        : "bg-muted/20 border-border/40 text-muted-foreground/50"
                                    )}
                                  >
                                    {isCompleted ? '✓' : isCurrent ? '●' : (idx + 1)}
                                  </button>
                                  {/* Linha conectora (não aparece no último item, a menos que tenha subtópicos emergentes) */}
                                  {(!isLast || emergentTopicsForStep.length > 0) && (
                                    <div className={cn(
                                      "w-px h-full min-h-[1.5rem] mt-1 -mb-1 transition-opacity",
                                      !isVisible && "opacity-40",
                                      isCompleted ? "bg-[hsl(var(--success)/0.4)]" : "bg-border/50"
                                    )} />
                                  )}
                                </div>

                              {/* Conteúdo */}
                              <div className="flex-1 pb-4 flex gap-2 items-start">
                                <div className="flex-1 min-w-0 transition-all duration-500">
                                  <button 
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (!isVisible) return;
                                      playPopSound();
                                      setSelectedSub(step);
                                    }}
                                    className={cn(
                                      "text-sm font-medium text-left leading-tight transition-all duration-300 w-full",
                                      isVisible ? "hover:text-primary cursor-pointer" : "cursor-default",
                                      !isVisible && "blur-sm select-none opacity-50",
                                      isCompleted ? "text-foreground" : isCurrent || isPaused ? "text-foreground" : "text-muted-foreground"
                                    )}
                                  >
                                    {step}
                                  </button>
                                  {isPaused && (
                                    <p className={cn("text-[10px] text-[hsl(var(--warning))] font-medium uppercase mt-1 tracking-wider transition-all duration-300", !isVisible && "blur-[2px] opacity-50")}>
                                      Sessão pausada
                                    </p>
                                  )}
                                  {isCurrent && !isPaused && (
                                    <p className="text-[10px] text-primary font-medium uppercase mt-1 tracking-wider">
                                      Próximo tópico
                                    </p>
                                  )}
                                  {isCompleted && (
                                    <p className={cn("text-[10px] text-[hsl(var(--success))] font-medium uppercase mt-1 tracking-wider transition-all duration-300", !isVisible && "blur-[2px] opacity-50")}>
                                      Concluído
                                    </p>
                                  )}
                                </div>

                                {/* Eye Toggle */}
                                {!isCurrent && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setUnhiddenTopics(prev => {
                                        const newSet = new Set(prev);
                                        if (newSet.has(step)) {
                                          newSet.delete(step);
                                          if (selectedSub === step) setSelectedSub(null);
                                        } else {
                                          newSet.add(step);
                                        }
                                        return newSet;
                                      });
                                      playPopSound();
                                    }}
                                    className={cn(
                                      "p-1.5 rounded-full transition-all shrink-0 mt-[-2px]",
                                      isVisible ? "text-primary hover:bg-primary/10" : "text-muted-foreground hover:bg-muted/50 opacity-30 hover:opacity-100"
                                    )}
                                    title={isVisible ? "Ocultar tópico" : "Ver tópico"}
                                  >
                                    {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </button>
                                )}
                              </div>
                              </div>

                              {isVisible && emergentTopicsForStep.length > 0 && emergentTopicsForStep.map((et, etIdx) => (
                                <div key={et.id} className="flex gap-3 relative group transition-opacity mb-4">
                                  {/* Indicador Visual Tópico Emergente */}
                                  <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold z-10 shadow-sm">
                                      ✦
                                    </div>
                                    {/* Linha conectora caso não seja o último do último */}
                                    {!(isLast && etIdx === emergentTopicsForStep.length - 1) && (
                                      <div className="w-px h-full min-h-[1.5rem] mt-1 -mb-1 bg-border/50" />
                                    )}
                                  </div>
                                  
                                  {/* Conteúdo Tópico Emergente */}
                                  <div 
                                    className="flex-1 flex gap-2 items-start bg-primary/5 border border-primary/15 rounded-xl p-3 cursor-pointer hover:bg-primary/10 transition-colors shadow-sm"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      playPopSound();
                                      onOpenChange(false);
                                      if (et.session_key) {
                                        navigate(`/sessao/${config.slug}?resume=${et.session_key}`);
                                      }
                                    }}
                                  >
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-foreground leading-tight">
                                        {et.titulo}
                                      </p>
                                      {et.descricao && (
                                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                                          {et.descricao}
                                        </p>
                                      )}
                                      <p className="text-[10px] text-primary font-medium uppercase mt-2 tracking-wider">
                                        Gerado pela IA (Pré-requisito)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}

                            </div>
                          );
                        })}

                        {endIdx < flatEmenta.length && (
                          <div className="flex gap-3 opacity-50 mt-2">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 flex items-center justify-center shrink-0 text-muted-foreground">⋮</div>
                            </div>
                            <div className="flex-1 pb-4">
                              <button 
                                onClick={() => setExpandedCount(prev => prev + 5)}
                                className="text-xs font-medium text-primary hover:underline"
                              >
                                Ver próximos {Math.min(5, flatEmenta.length - endIdx)} tópicos
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}


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
                ))}</div>
            </div>
          )}

          {/* Tópicos Emergentes — gerados automaticamente pela IA durante as sessões */}
          {(() => {
            const unmatchedEmergentTopics = topicosEmergentes?.filter(te => {
              const isMatched = sessoesMateria.some(s => s.session_key === te.session_key && flatEmenta.some(step => {
                const n1 = (s.topico || '').toLowerCase().trim();
                const n2 = (step || '').toLowerCase().trim();
                return n1.includes(n2) || n2.includes(n1);
              }));
              return !isMatched;
            });
            
            if (!unmatchedEmergentTopics || unmatchedEmergentTopics.length === 0) return null;
            
            return (
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                    🌐 Descobertos pela IA (Outros)
                  </p>
                  <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {unmatchedEmergentTopics.length} novo{unmatchedEmergentTopics.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-2">
                  {unmatchedEmergentTopics.map((topico) => (
                    <div
                      key={topico.id}
                      className="flex gap-3 p-3 rounded-xl bg-primary/5 border border-primary/15 group cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        playPopSound();
                        onOpenChange(false);
                        if (topico.session_key) {
                          navigate(`/sessao/${config.slug}?resume=${topico.session_key}`);
                        }
                      }}
                    >
                      <span className="text-primary mt-0.5 shrink-0 text-xs">✦</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground leading-tight">
                          {topico.titulo}
                        </p>
                        {topico.descricao && (
                          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                            {topico.descricao}
                          </p>
                        )}
                        {topico.fonte_url && (
                          <a
                            href={topico.fonte_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-primary/60 hover:text-primary mt-1 block truncate transition-colors z-10 relative"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {topico.fonte_url.replace(/^https?:\/\//, '').split('/')[0]}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Spacer para o sticky footer não cobrir o conteúdo do final do scroll */}
          <div className="h-56 sm:h-64 shrink-0" />

          {/* Sticky Footer Area */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border z-10 sm:rounded-b-3xl p-4 shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.3)]">
            {(!selectedSub && !allDone) ? (
              <div className="flex flex-col items-center text-center">
                 <p className="text-[13px] font-medium text-foreground mb-1">Selecione um tópico</p>
                 <p className="text-[11px] text-muted-foreground mb-3 max-w-xs mx-auto">
                   Clique em qualquer item do roadmap acima para começar a estudar.
                 </p>
              </div>
            ) : (
              <>
              {allDone && !selectedSub ? (
                <Link
                  to={ctaUrl}
                  onClick={handleNewSessionClick}
                  className={cn(
                    'flex items-center gap-4 w-full p-4 rounded-2xl border',
                    'bg-[hsl(var(--success)/0.1)] border-[hsl(var(--success)/0.3)] hover:bg-[hsl(var(--success)/0.15)]',
                    'transition-all active:scale-[0.98]'
                  )}
                >
                  <div className="p-2.5 rounded-xl bg-[hsl(var(--success)/0.2)] text-[hsl(var(--success))]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <span className="block text-[15px] font-semibold line-clamp-3 text-[hsl(var(--success))]">
                      Revisão / Consolidação
                    </span>
                    <span className="block text-[12px] leading-tight mt-0.5 text-[hsl(var(--success))/0.7]">
                      Você concluiu a base. Reforce seu conhecimento.
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[hsl(var(--success))/0.7]" />
                </Link>
              ) : (
                <>
                <Link
                  to={ctaUrl}
                  onClick={handleNewSessionClick}
                  className={cn(
                    'flex items-center gap-4 w-full p-4 rounded-2xl border',
                    isSelectedSubPaused
                      ? 'bg-[hsl(var(--warning)/0.1)] border-[hsl(var(--warning)/0.3)] hover:bg-[hsl(var(--warning)/0.15)]'
                      : isSelectedSubCompleted
                      ? 'bg-[hsl(var(--success)/0.1)] border-[hsl(var(--success)/0.3)] hover:bg-[hsl(var(--success)/0.15)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10',
                    'transition-all active:scale-[0.98] shadow-lg'
                  )}
                >
                  <div className={cn("p-2.5 rounded-xl", 
                    isSelectedSubPaused
                      ? "bg-[hsl(var(--warning)/0.2)] text-[hsl(var(--warning))]"
                      : isSelectedSubCompleted
                      ? "bg-[hsl(var(--success)/0.2)] text-[hsl(var(--success))]"
                      : "bg-white/10 text-white"
                  )}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <span className={cn("block text-[15px] font-semibold line-clamp-3",
                      isSelectedSubPaused
                        ? "text-[hsl(var(--warning))]" 
                        : isSelectedSubCompleted
                        ? "text-[hsl(var(--success))]"
                        : "text-white"
                    )}>
                      {isSelectedSubPaused 
                        ? `Retomar: ${selectedSub}` 
                        : isSelectedSubCompleted
                        ? `Ver Histórico: ${selectedSub}`
                        : `Estudar: ${selectedSub}`}
                    </span>
                    <span className={cn("block text-[12px] leading-tight mt-0.5",
                      isSelectedSubPaused
                        ? "text-[hsl(var(--warning))/0.7]" 
                        : isSelectedSubCompleted
                        ? "text-[hsl(var(--success))/0.7]"
                        : "text-white/60"
                    )}>
                      {isSelectedSubPaused
                        ? 'Sessão pausada em andamento' 
                        : isSelectedSubCompleted
                        ? (sessaoConcluidaDesteTopico?.session_key ? 'Abrir conversa anterior desta sessão' : 'Iniciar revisão deste tópico')
                        : isPreviewLoading
                          ? 'Gerando prévia...'
                          : (topicPreview || 'Iniciar uma nova sessão de estudos')
                      }
                    </span>
                  </div>
                  <ChevronRight className={cn("w-4 h-4", 
                    isSelectedSubPaused
                      ? "text-[hsl(var(--warning))/0.7]" 
                      : isSelectedSubCompleted
                      ? "text-[hsl(var(--success))/0.7]"
                      : "text-white/40"
                  )} />
                </Link>
                {selectedSub && (isSelectedSubCompleted || isSelectedSubPaused) && (
                  <div className="flex gap-2 mt-2 w-full">
                    {isSelectedSubCompleted && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (config && selectedSub) {
                            playPopSound();
                            onOpenChange(false);
                            navigate(`/sessao/${config.slug}?sub=${encodeURIComponent(selectedSub)}&modo=revisao`);
                          }
                        }}
                        className="flex-1 py-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/30 hover:bg-blue-500/20 font-semibold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                      >
                        Revisar (Active Recall)
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Tem certeza que deseja apagar todo o histórico de sessões do tópico '${selectedSub}'?`)) {
                          excluirTopico.mutate({ materia: config.slug, topico: selectedSub });
                          playPopSound();
                        }
                      }}
                      className="px-4 py-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive font-semibold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-destructive/20"
                      title="Apagar histórico deste tópico"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
                </>
              )}
              </>
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
                          chatUrl={`/sessao/${config.slug}?resume=${sessao.session_key}`}
                          onOpenChat={() => {
                            playPopSound();
                            onOpenChange(false);
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
  chatUrl,
  onOpenChat,
}: {
  sessao: { id: number; topico: string; created_at: string | null; data: string; session_key?: string | null; decisao_proxima?: string | null };
  hasChat: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  chatUrl?: string;
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
          {sessao.decisao_proxima === 'Pausada' ? (
            <p className="text-[10px] text-[hsl(var(--warning))] font-medium uppercase tracking-wider mt-0.5">
              Sessão pausada
            </p>
          ) : (
            <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">
              {format(new Date(sessao.created_at || sessao.data), "d 'de' MMM", { locale: ptBR })}
            </p>
          )}
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
                if (msg.role === 'system' || !msg.content) return null;
                const cleanContent = String(msg.content).replace(/<[^>]+>/g, '').trim();
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
          {sessao.session_key && chatUrl && (
            <Link
              to={chatUrl}
              onClick={(e) => { e.stopPropagation(); onOpenChat(); }}
              className="mt-3 w-full py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground text-[11px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Abrir Tela Completa do Chat
            </Link>
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
