import { useState, useEffect } from 'react';
import { useFolhasEstado, useSessoes, useEmentaConcluida, useMetricasRevisao } from '@/hooks/useSessoes';
import { useMateriasFoco } from '@/hooks/useMateriasFoco';
import { useMateriasFixadas } from '@/hooks/useMateriasFixadas';
import MateriaCard from '@/components/MateriaCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Library, Flame, Play } from 'lucide-react';
import { MateriaEstado } from '@/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import MateriaDetailModal from '@/components/MateriaDetailModal';
import { PlanejarMateriaModal } from '@/components/PlanejarMateriaModal';
import { Search, History, CalendarCheck, BrainCircuit, Sparkles, Settings } from 'lucide-react';
import { HistoricoGlobalDrawer } from '@/components/HistoricoGlobalDrawer';
import { useSettings } from '@/hooks/useSettings';
import { Switch } from '@/components/ui/switch';
import { useOrdemMaterias } from '@/hooks/useOrdemMaterias';
import { DailyTopicCard } from '@/components/DailyTopicCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, estado, onClick, isPinned, onTogglePin }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <MateriaCard
        estado={estado}
        onClick={onClick}
        isPinned={isPinned}
        onTogglePin={onTogglePin}
        isDragging={isDragging}
        dragListeners={listeners}
      />
    </div>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia, Tiago';
  if (h < 18) return 'Boa tarde, Tiago';
  return 'Boa noite, Tiago';
}

export default function Index() {
  const { estados, isLoading } = useFolhasEstado();
  const { foco, toggleFoco } = useMateriasFoco();
  const { data: sessoes } = useSessoes();
  const { data: metricasRevisao } = useMetricasRevisao();
  const averageRetention = metricasRevisao && metricasRevisao.length > 0
    ? Math.round(metricasRevisao.reduce((acc, m) => acc + m.score, 0) / metricasRevisao.length)
    : 0;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });


  const [modalOpen, setModalOpen] = useState(false);
  const [isIAModalOpen, setIsIAModalOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<MateriaEstado | null>(null);

  const handleIASuccess = (slug: string) => {
    if (!foco.includes(slug)) {
      toggleFoco(slug);
    }
    setSearchParams(prev => {
      prev.set('materia', slug);
      return prev;
    }, { replace: true });
  };

  useEffect(() => {
    const paramSlug = searchParams.get('materia');
    if (paramSlug && !isLoading && estados.length > 0) {
      const mat = estados.find(e => e.config.slug === paramSlug);
      if (mat && (!modalOpen || selectedEstado?.config.slug !== paramSlug)) {
        setSelectedEstado(mat);
        setModalOpen(true);
      }
    } else if (!paramSlug && modalOpen) {
      setModalOpen(false);
      setTimeout(() => setSelectedEstado(null), 300);
    }
  }, [searchParams, estados, isLoading, modalOpen, selectedEstado]);

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      setSearchParams(prev => {
        prev.delete('materia');
        return prev;
      });
    } else {
      setModalOpen(true);
    }
  };
  const [isHistoricoOpen, setIsHistoricoOpen] = useState(false);
  const { disableFogOfWar, toggleFogOfWar } = useSettings();

  const { fixadas, toggleFixada, isFixada } = useMateriasFixadas();
  const { ordem, atualizarOrdem } = useOrdemMaterias();
  
  const [visibleLimit, setVisibleLimit] = useState(4);

  const estadosFocados = foco.length > 0 
    ? estados.filter(e => foco.includes(e.config.slug))
    : [];

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires a 5px drag before it activates, allows clicks to pass through
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Ordenação: 1º Fixadas, 2º Ordem Customizada (se existir), 3º Mais acessadas, 4º Recência
  const displayedEstados = [...estadosFocados].sort((a, b) => {
    const slugA = a.config.slug;
    const slugB = b.config.slug;
    
    const aFix = isFixada(slugA);
    const bFix = isFixada(slugB);
    
    // 1. Fixadas vêm primeiro
    if (aFix && !bFix) return -1;
    if (!aFix && bFix) return 1;

    // Se ambas forem fixadas OU ambas não-fixadas, caem nas regras normais
    
    // 2. Se a pessoa tem ordem salva
    const indexA = ordem.indexOf(slugA);
    const indexB = ordem.indexOf(slugB);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    if (indexA !== -1 && indexB === -1) return -1; // Com ordem salva ganha de sem ordem
    if (indexA === -1 && indexB !== -1) return 1;

    // 3. Empate técnico sem ordem manual (comportamento padrão)
    if (b.totalSessoes !== a.totalSessoes) {
      return b.totalSessoes - a.totalSessoes;
    }

    const dataA = a.ultimaSessao ? new Date(a.ultimaSessao.data).getTime() : 0;
    const dataB = b.ultimaSessao ? new Date(b.ultimaSessao.data).getTime() : 0;
    return dataB - dataA;
  });

  const visibleEstados = displayedEstados.slice(0, visibleLimit);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = displayedEstados.findIndex(e => e.config.slug === active.id);
      const newIndex = displayedEstados.findIndex(e => e.config.slug === over.id);
      
      const novaOrdemArray = arrayMove(displayedEstados, oldIndex, newIndex).map(e => e.config.slug);
      atualizarOrdem(novaOrdemArray);
    }
  };

  const handleCardClick = (estado: MateriaEstado) => {
    if (estado.config.isCategory) {
      navigate(`/categoria/${estado.config.slug}`);
      return;
    }
    setSearchParams(prev => {
      prev.set('materia', estado.config.slug);
      return prev;
    });
  };



  const [searchQuery, setSearchQuery] = useState('');

  const normalizeString = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const searchResults = searchQuery.trim().length > 0
    ? estados.map(e => {
        const query = normalizeString(searchQuery);
        const matchesNome = normalizeString(e.config.nome).includes(query);
        const matchesDescricao = e.config.descricao ? normalizeString(e.config.descricao).includes(query) : false;
        
        let matchedTopics: string[] = [];
        if (e.config.ementa) {
          matchedTopics = [...matchedTopics, ...e.config.ementa.filter(t => normalizeString(t).includes(query))];
        }
        if (e.config.fases) {
          e.config.fases.forEach(f => {
            if (f.topicos) {
              matchedTopics = [...matchedTopics, ...f.topicos.filter(t => normalizeString(t).includes(query))];
            }
          });
        }
        
        const isMatch = matchesNome || matchesDescricao || matchedTopics.length > 0;
        return isMatch ? { estado: e, matchedTopics } : null;
      }).filter(Boolean) as { estado: MateriaEstado, matchedTopics: string[] }[]
    : [];

  const renderBadges = () => (
    <>
      {/* Botão de Notas */}
      <button
        onClick={() => navigate('/notas')}
        className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-card hover:bg-muted border-border text-muted-foreground hover:text-foreground text-xs font-medium transition-all shadow-sm"
      >
        Notas
      </button>

      {/* Botão de Quiz */}
      <button
        onClick={() => navigate('/quiz')}
        className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-[hsl(var(--primary)/0.1)] border-[hsl(var(--primary)/0.3)] text-primary hover:bg-[hsl(var(--primary)/0.2)] text-xs font-medium transition-all shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Quiz
      </button>

      {/* Botão Sugestão do Dia */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-card hover:bg-muted border-border text-muted-foreground hover:text-foreground text-xs font-medium transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Sugestão
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md p-6 rounded-3xl bg-background border border-border">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-semibold">O que estudar?</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <DailyTopicCard />
          </div>
        </DialogContent>
      </Dialog>

      {/* Botão de Planejar com IA */}
      <button
        onClick={() => setIsIAModalOpen(true)}
        className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20 text-xs font-medium transition-all shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5" />
        IA
      </button>

      {/* Botão do Histórico */}
      <button
        onClick={() => setIsHistoricoOpen(true)}
        className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-card hover:bg-muted border-border text-muted-foreground hover:text-foreground text-xs font-medium transition-all shadow-sm"
      >
        <History className="w-3.5 h-3.5" />
        Histórico
      </button>

      {/* Configurações */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="flex items-center justify-center shrink-0 w-8 h-8 rounded-lg border bg-card hover:bg-muted border-border text-muted-foreground hover:text-foreground transition-all shadow-sm"
            title="Configurações"
          >
            <Settings className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md p-6 rounded-3xl bg-background border border-border">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
              Configurações
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50">
              <div className="space-y-1 pr-4">
                <h4 className="text-sm font-medium text-foreground">Desativar Neblina na Ementa</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Permite ver a ementa inteira revelada e usar o botão "Olhinho" para mostrar e esconder os tópicos futuros.
                </p>
              </div>
              <Switch
                checked={disableFogOfWar}
                onCheckedChange={toggleFogOfWar}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Retenção de Memória */}
      {metricasRevisao && metricasRevisao.length > 0 && (
        <div className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-blue-500/10 border-blue-500/20 text-blue-500 text-xs font-medium transition-all shadow-sm" title={`${metricasRevisao.length} revisões feitas`}>
          <BrainCircuit className="w-3.5 h-3.5" />
          Retenção: {averageRetention}%
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header com Saudação e Ofensiva */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{getGreeting()}</h1>
            <p className="text-sm text-muted-foreground mt-0.5 capitalize">{hoje}</p>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
            {renderBadges()}

          </div>
        </div>

        {/* Badges Mobile - Ocupando uma linha inteira rolável abaixo da saudação */}
        <div className="sm:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-4 -mx-4 px-4 scrollbar-none">
          {renderBadges()}
        </div>

        {/* Barra de Pesquisa */}
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="O que você quer estudar agora?..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-card border border-border/50 rounded-2xl text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all shadow-sm"
          />
        </div>



        {searchQuery.trim().length > 0 ? (
          <div className="space-y-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">
              Resultados da busca ({searchResults.length})
            </h3>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {searchResults.map(result => (
                  <div key={result.estado.config.slug} className="flex flex-col gap-1">
                    <MateriaCard
                      estado={result.estado}
                      onClick={() => handleCardClick(result.estado)}
                    />
                    {result.matchedTopics.length > 0 && (
                      <div className="ml-2 pl-2 border-l-2 border-border text-[11px] text-muted-foreground mt-1 space-y-1">
                        {result.matchedTopics.slice(0, 3).map((topic, i) => (
                          <div key={i} className="line-clamp-1 flex items-center gap-1.5 opacity-80">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/50 shrink-0" />
                            {topic}
                          </div>
                        ))}
                        {result.matchedTopics.length > 3 && (
                          <div className="text-[10px] text-muted-foreground/50 italic pl-2.5">
                            +{result.matchedTopics.length - 3} tópicos
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground bg-muted/30 rounded-2xl border border-dashed border-border/50">
                Nenhuma matéria encontrada com esse nome.
              </div>
            )}
          </div>
        ) : !isLoading && foco.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 mt-12 border border-dashed rounded-[2rem] bg-card">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
              <Library className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Mesa de estudos vazia</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-8">
              Sua tela inicial é restrita para evitar paralisia por análise. Vá até a biblioteca e escolha no que focar agora.
            </p>
            <button
              onClick={() => navigate('/biblioteca')}
              className="bg-foreground text-background px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-foreground/10 flex items-center gap-2"
            >
              <Library className="w-4 h-4" />
              Explorar Biblioteca
            </button>
          </div>
        ) : (
          <>

        {/* Separador de Outras Disciplinas (se necessário, agora pode ser o título principal do grid) */}
        {!isLoading && displayedEstados.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Sua Mesa de Estudos
            </h3>
          </div>
        )}

        {/* Grid Residual */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <SortableContext
                items={visibleEstados.map(e => e.config.slug)}
                strategy={rectSortingStrategy}
              >
                {visibleEstados.map(estado => (
                  <SortableItem
                    key={estado.config.slug}
                    id={estado.config.slug}
                    estado={estado}
                    onClick={() => handleCardClick(estado)}
                    isPinned={isFixada(estado.config.slug)}
                    onTogglePin={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      toggleFixada(estado.config.slug);
                    }}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        )}

        {!isLoading && displayedEstados.length > 4 && (
          <div className="flex items-center gap-2 mb-8">
            {visibleLimit > 4 && (
              <button
                onClick={() => setVisibleLimit(prev => Math.max(4, prev - 4))}
                className="flex-1 py-3 rounded-xl text-[12px] font-medium text-muted-foreground bg-muted/20 hover:bg-muted/50 transition-colors"
              >
                Ver menos (esconder 4)
              </button>
            )}
            
            {visibleLimit < displayedEstados.length && (
              <button
                onClick={() => setVisibleLimit(prev => prev + 4)}
                className="flex-1 py-3 rounded-xl text-[12px] font-medium text-muted-foreground bg-muted/20 hover:bg-muted/50 transition-colors"
              >
                Ver mais (mostrar até {Math.min(visibleLimit + 4, displayedEstados.length)} de {displayedEstados.length})
              </button>
            )}
          </div>
        )}

        {!isLoading && (
          <button
            onClick={() => navigate('/biblioteca')}
            className="w-full mb-12 py-4 px-4 rounded-xl text-[13px] font-medium text-muted-foreground border border-dashed hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <Library className="w-4 h-4" />
            Gerenciar Foco na Biblioteca
          </button>
        )}


        </>
        )}
      </div>

      <MateriaDetailModal 
        estado={selectedEstado} 
        open={modalOpen} 
        onOpenChange={handleModalOpenChange} 
      />

      <HistoricoGlobalDrawer
        open={isHistoricoOpen}
        onOpenChange={setIsHistoricoOpen}
      />

      <PlanejarMateriaModal
        open={isIAModalOpen}
        onOpenChange={setIsIAModalOpen}
        onSuccess={handleIASuccess}
      />
    </div>
  );
}
