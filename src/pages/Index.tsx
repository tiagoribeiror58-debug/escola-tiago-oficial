import { useState, useEffect } from 'react';
import { useTodosEstadosFlat, useSessoes, useEmentaConcluida, useMetricasRevisao } from '@/hooks/useSessoes';
import { useMateriasFoco } from '@/hooks/useMateriasFoco';
import { useMateriasFixadas } from '@/hooks/useMateriasFixadas';
import { useMateriaFocoPrincipal, PINNED_FOREVER } from '@/hooks/useMateriaFocoPrincipal';
import MateriaCard from '@/components/MateriaCard';
import { CuriosidadeCard } from '@/components/CuriosidadeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Library, Flame, Play, ChevronRight, ChevronDown, Pin, Star, Rocket } from 'lucide-react';
import { MateriaEstado } from '@/types';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import MateriaDetailModal from '@/components/MateriaDetailModal';
import { PlanejarMateriaModal } from '@/components/PlanejarMateriaModal';
import { Search, History, CalendarCheck, BrainCircuit, Sparkles, Settings, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { HistoricoGlobalDrawer } from '@/components/HistoricoGlobalDrawer';
import { BillingDashboard } from '@/components/BillingDashboard';
import { useSettings } from '@/hooks/useSettings';
import { Switch } from '@/components/ui/switch';
import { useOrdemMaterias, useOrdemHubs } from '@/hooks/useOrdemMaterias';
import { DailyTopicCard } from '@/components/DailyTopicCard';
import { MetaDiariaCard } from '@/components/MetaDiariaCard';
import { MATERIAS, getAllLeafSlugs } from '@/lib/materias';
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
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, estado, onClick, isPinned, onTogglePin, isFocoPrincipal, onToggleFocoPrincipal }: any) {
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
        isFocoPrincipal={isFocoPrincipal}
        onToggleFocoPrincipal={onToggleFocoPrincipal}
        isDragging={isDragging}
        dragListeners={listeners}
      />
    </div>
  );
}

function SortableHubItem({ id, children, isExpanded, toggleCat }: any) {
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
    <div ref={setNodeRef} style={style} className={cn("mb-6 bg-card border border-border/50 rounded-2xl p-4 transition-all hover:border-border/80", isDragging && "opacity-60 ring-2 ring-primary scale-[1.01]")}>
      <div {...attributes} {...listeners} className="cursor-move">
        {children}
      </div>
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
  const { estados, isLoading } = useTodosEstadosFlat();
  const { foco, toggleFoco, isFocado } = useMateriasFoco();
  const { focoPrincipal, focosPrincipais, toggleFocoPrincipal, isFocoPrincipal } = useMateriaFocoPrincipal();
  const { data: sessoes } = useSessoes();
  const { data: metricasRevisao } = useMetricasRevisao();
  const averageRetention = metricasRevisao && metricasRevisao.length > 0
    ? Math.round(metricasRevisao.reduce((acc, m) => acc + m.score, 0) / metricasRevisao.length)
    : 0;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth', { replace: true });
  };

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
  const { ordemHubs, atualizarOrdemHubs } = useOrdemHubs();
  
  const [currentTab, setCurrentTab] = useState<'foco' | 'materias' | 'hubs'>(() => {
    return (localStorage.getItem('@escola-tiago:currentTab') as any) || 'foco';
  });
  const [focoFilterType, setFocoFilterType] = useState<'all' | 'materias' | 'hubs'>(() => {
    return (localStorage.getItem('@escola-tiago:focoFilterType') as any) || 'all';
  });

  useEffect(() => {
    localStorage.setItem('@escola-tiago:currentTab', currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('@escola-tiago:focoFilterType', focoFilterType);
  }, [focoFilterType]);
  const [visibleLimitFocoHubs, setVisibleLimitFocoHubs] = useState(4);
  const [visibleLimitFocoMaterias, setVisibleLimitFocoMaterias] = useState(6);
  const [visibleLimitMaterias, setVisibleLimitMaterias] = useState(6);
  const [visibleLimitHubs, setVisibleLimitHubs] = useState(4);
  
  // Controle das sanfonas dos hubs
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());

  const toggleCat = (slug: string) => {
    const next = new Set(expandedCats);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    setExpandedCats(next);
  };

  // Itens na Mesa de Estudos: o que estiver no Foco manual OU tiver qualquer sessão registrada
  const baseEstadosFoco = estados.filter(e => foco.includes(e.config.slug) || e.totalSessoes > 0);

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const displayedFoco = [...baseEstadosFoco].sort((a, b) => {
    const slugA = a.config.slug;
    const slugB = b.config.slug;
    
    const aFix = isFixada(slugA);
    const bFix = isFixada(slugB);
    
    // 1. Fixadas vêm primeiro de forma absoluta
    if (aFix && !bFix) return -1;
    if (!aFix && bFix) return 1;

    // 2. Ordem customizada (Drag & Drop) — prioridade máxima depois de fixadas
    //    Se o usuário definiu uma ordem, ela PREVALECE sobre sessões e recência.
    const indexA = ordem.indexOf(slugA);
    const indexB = ordem.indexOf(slugB);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // Um está na ordem salva, o outro não → o que está na ordem vai primeiro
    if (indexA !== -1 && indexB === -1) return -1;
    if (indexA === -1 && indexB !== -1) return 1;

    // 3. Fallback para itens nunca arrastados: maior engajamento
    if (b.totalSessoes !== a.totalSessoes) {
      return b.totalSessoes - a.totalSessoes;
    }

    // 4. Fallback final: recência
    const dataA = a.ultimaSessao ? new Date(a.ultimaSessao.data).getTime() : 0;
    const dataB = b.ultimaSessao ? new Date(b.ultimaSessao.data).getTime() : 0;
    return dataB - dataA;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const normalizedQuery = searchQuery.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Buscas inline específicas por seção (dentro da aba Mesa de Estudos)
  const [hubInlineSearch, setHubInlineSearch] = useState('');
  const [materiaInlineSearch, setMateriaInlineSearch] = useState('');
  const normalizedHubInline = hubInlineSearch.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const normalizedMateriaInline = materiaInlineSearch.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // ---- Filtro de busca dentro da Mesa de Estudos (foco) ----
  const filterByQuery = (e: MateriaEstado) => {
    if (!normalizedQuery) return true;
    const nome = e.config.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const desc = e.config.descricao?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') ?? '';
    if (nome.includes(normalizedQuery) || desc.includes(normalizedQuery)) return true;
    if (e.config.ementa?.some(t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery))) return true;
    if (e.config.fases?.some(f => f.topicos?.some(t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery)))) return true;
    return false;
  };

  // Itens filtrados por tipo E por query — aplicado ANTES de qualquer paginação
  const focusedHubs = displayedFoco.filter(e => e.config.isCategory).filter(filterByQuery);
  const focusedMaterias = displayedFoco.filter(e => !e.config.isCategory).filter(filterByQuery);

  // Quando há busca ativa, mostrar todos os resultados sem limite
  const visibleHubsFoco = (focoFilterType === 'all' || focoFilterType === 'hubs')
    ? (normalizedQuery ? focusedHubs : focusedHubs.slice(0, visibleLimitFocoHubs))
    : [];
  const visibleMateriasFoco = (focoFilterType === 'all' || focoFilterType === 'materias')
    ? (normalizedQuery ? focusedMaterias : focusedMaterias.slice(0, visibleLimitFocoMaterias))
    : [];

  // Totais para os botões "ver mais"
  const filteredFocoHubsTotal = focusedHubs.length;
  const filteredFocoMateriasTotal = focusedMaterias.length;
  const showVerMaisHubs = !normalizedQuery && (focoFilterType === 'all' || focoFilterType === 'hubs') && filteredFocoHubsTotal > visibleLimitFocoHubs;
  const showVerMaisMaterias = !normalizedQuery && (focoFilterType === 'all' || focoFilterType === 'materias') && filteredFocoMateriasTotal > visibleLimitFocoMaterias;

  const handleDragEndFoco = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Descobre se o item arrastado é hub ou matéria
    const activeIsHub = displayedFoco.find(e => e.config.slug === activeId)?.config.isCategory ?? false;

    // Opera na lista do tipo correto para calcular os novos índices
    const listaMesmoTipo = displayedFoco.filter(e => e.config.isCategory === activeIsHub);
    const oldIndex = listaMesmoTipo.findIndex(e => e.config.slug === activeId);
    const newIndex = listaMesmoTipo.findIndex(e => e.config.slug === overId);

    if (oldIndex === -1 || newIndex === -1) return;

    // Gera a nova ordem: itens do outro tipo mantêm posição, itens do mesmo tipo recebem nova ordem
    const reordered = arrayMove(listaMesmoTipo, oldIndex, newIndex);
    const outrosItens = displayedFoco.filter(e => e.config.isCategory !== activeIsHub);

    // Salva a ordem mesclando os dois grupos (outros itens mantêm seus slugs na ordem salva)
    const novaOrdemCompleta = [
      ...outrosItens.map(e => e.config.slug),
      ...reordered.map(e => e.config.slug),
    ];
    atualizarOrdem(novaOrdemCompleta);
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

  const handleToggleFocoPrincipal = (slug: string) => {
    // Se ainda não está no foco manual, adiciona automaticamente
    if (!isFocoPrincipal(slug) && !isFocado(slug)) {
      toggleFoco(slug);
    }
    toggleFocoPrincipal(slug);
  };

  // ---- Filtro Aba "Explorar Matérias" ----
  const todasMateriasIsoladas = estados.filter(e => !e.config.isCategory);
  const searchResultsMaterias = normalizedQuery.length > 0
    ? todasMateriasIsoladas.map(e => {
        const matchesNome = e.config.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery);
        const matchesDescricao = e.config.descricao ? e.config.descricao.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery) : false;
        
        let matchedTopics: string[] = [];
        if (e.config.ementa) {
          matchedTopics = [...matchedTopics, ...e.config.ementa.filter(t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery))];
        }
        if (e.config.fases) {
          e.config.fases.forEach(f => {
            if (f.topicos) {
              matchedTopics = [...matchedTopics, ...f.topicos.filter(t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery))];
            }
          });
        }
        const isMatch = matchesNome || matchesDescricao || matchedTopics.length > 0;
        return isMatch ? { estado: e, matchedTopics } : null;
      }).filter(Boolean) as { estado: MateriaEstado, matchedTopics: string[] }[]
    : [];

  // ---- Filtro Aba "Explorar Hubs" ----
  // Resolvendo o BUG do drag and drop: a ordenação base (quando ordemHubs estiver parcial ou vazio)
  // tem que ser estável usando o índice original de MATERIAS.
  const sortedAndFilteredHubs = [...MATERIAS]
    .sort((a, b) => {
      const indexA = ordemHubs.indexOf(a.slug);
      const indexB = ordemHubs.indexOf(b.slug);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      
      // Fallback para ordem original em MATERIAS para manter estabilidade
      const origIndexA = MATERIAS.findIndex(m => m.slug === a.slug);
      const origIndexB = MATERIAS.findIndex(m => m.slug === b.slug);
      return origIndexA - origIndexB;
    })
    .filter(cat => {
      if (!normalizedQuery) return true;
      const catName = cat.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const catDesc = cat.descricao?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (catName.includes(normalizedQuery)) return true;
      if (catDesc?.includes(normalizedQuery)) return true;
      if (cat.children) {
        return cat.children.some(child => {
          const cName = child.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const cDesc = child.descricao?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return cName.includes(normalizedQuery) || cDesc?.includes(normalizedQuery);
        });
      }
      return false;
    });

  const visibleExplorarHubs = normalizedQuery ? sortedAndFilteredHubs : sortedAndFilteredHubs.slice(0, visibleLimitHubs);

  // Renderiza Badges do Header
  const renderBadges = () => (
    <>
      <BillingDashboard />

      <button onClick={() => navigate('/notas')} className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-card hover:bg-muted border-border text-muted-foreground hover:text-foreground text-xs font-medium transition-all shadow-sm">
        Notas
      </button>

      <button onClick={() => navigate('/quiz')} className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-[hsl(var(--primary)/0.1)] border-[hsl(var(--primary)/0.3)] text-primary hover:bg-[hsl(var(--primary)/0.2)] text-xs font-medium transition-all shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        Quiz
      </button>

      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-card hover:bg-muted border-border text-muted-foreground hover:text-foreground text-xs font-medium transition-all shadow-sm">
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

      <button onClick={() => setIsIAModalOpen(true)} className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20 text-xs font-medium transition-all shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        IA
      </button>

      <button onClick={() => setIsHistoricoOpen(true)} className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-card hover:bg-muted border-border text-muted-foreground hover:text-foreground text-xs font-medium transition-all shadow-sm">
        <History className="w-3.5 h-3.5" />
        Histórico
      </button>

      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center justify-center shrink-0 w-8 h-8 rounded-lg border bg-card hover:bg-muted border-border text-muted-foreground hover:text-foreground transition-all shadow-sm" title="Configurações">
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
              <Switch checked={disableFogOfWar} onCheckedChange={toggleFogOfWar} />
            </div>

            <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
              <div className="space-y-1 pr-4">
                <h4 className="text-sm font-medium text-red-500">Sair da Conta</h4>
                <p className="text-xs text-red-500/80 leading-relaxed">
                  Encerrar a sessão atual neste dispositivo.
                </p>
              </div>
              <button onClick={handleLogout} className="flex items-center justify-center shrink-0 p-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all shadow-sm">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{getGreeting()}</h1>
            <p className="text-sm text-muted-foreground mt-0.5 capitalize">{hoje}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {renderBadges()}
          </div>
        </div>

        {/* Badges Mobile */}
        <div className="sm:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-4 -mx-4 px-4 scrollbar-none">
          {renderBadges()}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR (Meta Diária e Curiosidades) */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6 order-1 lg:order-2 lg:sticky lg:top-24">
            <MetaDiariaCard />
            
            {currentTab === 'foco' && !searchQuery && (
              <div className="flex flex-col gap-3">
                <CuriosidadeCard materiasAtuais={displayedFoco.map(e => e.config.nome)} />
                <Link 
                  to="/curiosidades" 
                  className="flex items-center justify-center gap-2 w-full py-3 bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-2xl text-sm font-medium transition-all text-muted-foreground hover:text-foreground shadow-sm"
                >
                  Explorar Feed de Curiosidades
                </Link>
              </div>
            )}
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 lg:col-start-1 flex flex-col order-2 lg:order-1 w-full">

            {/* Tabs de Navegação */}
            {!isLoading && (
          <div className="flex items-center p-1.5 bg-muted/30 rounded-[1.25rem] border border-border/50 self-start sm:self-auto w-full mb-8 overflow-x-auto scrollbar-none">
            <button
              onClick={() => { setCurrentTab('foco'); setSearchQuery(''); }}
              className={cn(
                "flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                currentTab === 'foco' ? "bg-background shadow-md text-foreground ring-1 ring-border" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Mesa de Estudos
            </button>
            <button
              onClick={() => { setCurrentTab('materias'); setSearchQuery(''); }}
              className={cn(
                "flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                currentTab === 'materias' ? "bg-background shadow-md text-foreground ring-1 ring-border" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Explorar Matérias
            </button>
            <button
              onClick={() => { setCurrentTab('hubs'); setSearchQuery(''); }}
              className={cn(
                "flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                currentTab === 'hubs' ? "bg-background shadow-md text-foreground ring-1 ring-border" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Explorar Hubs
            </button>
          </div>
        )}

        {/* Barra de Pesquisa Contextual — aparece em todas as abas */}
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder={
              currentTab === 'foco'
                ? "Pesquisar na mesa de estudos..."
                : currentTab === 'materias'
                ? "Pesquisar todas as matérias..."
                : "Pesquisar hubs e categorias..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-card border border-border/50 rounded-2xl text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all shadow-sm"
          />
        </div>

        {/* Missão Principal Permanente — todos os PINNED_FOREVER */}
        {currentTab === 'foco' && !searchQuery && (
          (() => {
            const missaoEstados = estados.filter(e => PINNED_FOREVER.includes(e.config.slug));
            if (missaoEstados.length === 0) return null;
            return (
              <div className="mb-8">
                <h4 className="text-sm font-bold mb-4 text-orange-500 uppercase tracking-widest flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Missão Principal
                </h4>
                <div className="flex overflow-x-auto gap-3 pb-4 snap-x scrollbar-none w-full mask-linear-fade">
                  {missaoEstados.map(estado => (
                    <div key={estado.config.slug} className="min-w-[280px] sm:min-w-[320px] snap-start shrink-0">
                      <MateriaCard
                        estado={estado}
                        onClick={() => handleCardClick(estado)}
                        isPinned={true}
                        onTogglePin={() => {}}
                        isFocoPrincipal={true}
                        onToggleFocoPrincipal={() => {}}
                        isMissaoPrincipal={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()
        )}

        {/* Focos Principais escolhidos pelo usuário — exclui todos os PINNED_FOREVER */}
        {currentTab === 'foco' && !searchQuery && focosPrincipais.length > 0 && (
          (() => {
            const principaisEstados = estados.filter(
              e => focosPrincipais.includes(e.config.slug) && !PINNED_FOREVER.includes(e.config.slug)
            );
            if (principaisEstados.length === 0) return null;
            return (
              <div className="mb-8">
                <h4 className="text-sm font-bold mb-4 text-amber-500 uppercase tracking-widest flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Objetivo Principal
                </h4>
                <div className="flex overflow-x-auto gap-3 pb-4 snap-x scrollbar-none w-full mask-linear-fade">
                  {principaisEstados.map(estado => (
                    <div key={estado.config.slug} className="min-w-[280px] sm:min-w-[320px] snap-start shrink-0">
                      <MateriaCard
                        estado={estado}
                        onClick={() => handleCardClick(estado)}
                        isPinned={isFixada(estado.config.slug)}
                        onTogglePin={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          toggleFixada(estado.config.slug);
                        }}
                        isFocoPrincipal={true}
                        onToggleFocoPrincipal={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleToggleFocoPrincipal(estado.config.slug);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-8 mb-8">
            
            {/* ABA: MESA DE ESTUDOS */}
            {currentTab === 'foco' && (
              <>
                {displayedFoco.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-12 mt-4 border border-dashed rounded-[2rem] bg-card">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                      <Library className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Mesa de estudos vazia</h2>
                    <p className="text-muted-foreground text-sm max-w-sm mb-8">
                      Sua mesa está limpa para evitar distrações. Explore as matérias ou hubs e fixe o que deseja focar agora.
                    </p>
                    <button
                      onClick={() => setCurrentTab('materias')}
                      className="bg-foreground text-background px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-foreground/10 flex items-center gap-2"
                    >
                      <Library className="w-4 h-4" />
                      Explorar Matérias
                    </button>
                  </div>
                ) : (
                  <>
                    {displayedFoco.length > 0 && (
                      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                        <button
                          onClick={() => { setFocoFilterType('all'); setVisibleLimitFocoHubs(4); setVisibleLimitFocoMaterias(6); }}
                          className={cn(
                            "px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap",
                            focoFilterType === 'all' ? "bg-foreground text-background" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          )}
                        >
                          Tudo
                        </button>
                        <button
                          onClick={() => { setFocoFilterType('materias'); setVisibleLimitFocoMaterias(6); }}
                          className={cn(
                            "px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap",
                            focoFilterType === 'materias' ? "bg-foreground text-background" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          )}
                        >
                          Apenas Matérias
                        </button>
                        <button
                          onClick={() => { setFocoFilterType('hubs'); setVisibleLimitFocoHubs(4); }}
                          className={cn(
                            "px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap",
                            focoFilterType === 'hubs' ? "bg-foreground text-background" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          )}
                        >
                          Apenas Hubs
                        </button>
                      </div>
                    )}
                    {visibleHubsFoco.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <h4 className="text-sm font-medium text-muted-foreground flex-1">Hubs em Foco</h4>
                          <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                            <input
                              type="text"
                              value={hubInlineSearch}
                              onChange={e => setHubInlineSearch(e.target.value)}
                              placeholder="Buscar hub..."
                              className="pl-8 pr-3 py-1.5 text-xs bg-muted/40 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all w-36"
                            />
                          </div>
                        </div>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndFoco}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                            <SortableContext items={visibleHubsFoco.map(e => e.config.slug)} strategy={rectSortingStrategy}>
                              {visibleHubsFoco.filter(e => !focosPrincipais.includes(e.config.slug)).filter(e => {
                                if (!normalizedHubInline) return true;
                                const nome = e.config.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                return nome.includes(normalizedHubInline);
                              }).map(estado => (
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
                                  isFocoPrincipal={isFocoPrincipal(estado.config.slug)}
                                  onToggleFocoPrincipal={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    toggleFocoPrincipal(estado.config.slug);
                                  }}
                                />
                              ))}
                            </SortableContext>
                          </div>
                        </DndContext>
                        {showVerMaisHubs && (
                          <button
                            onClick={() => setVisibleLimitFocoHubs(prev => prev + 4)}
                            className="w-full mb-6 py-2.5 rounded-xl text-[13px] font-medium text-muted-foreground border border-dashed border-border hover:bg-muted transition-colors"
                          >
                            Ver mais hubs ({Math.min(visibleLimitFocoHubs + 4, filteredFocoHubsTotal)} de {filteredFocoHubsTotal})
                          </button>
                        )}
                      </div>
                    )}
                    {visibleMateriasFoco.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <h4 className="text-sm font-medium text-muted-foreground flex-1">Matérias em Foco</h4>
                          <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                            <input
                              type="text"
                              value={materiaInlineSearch}
                              onChange={e => setMateriaInlineSearch(e.target.value)}
                              placeholder="Buscar matéria..."
                              className="pl-8 pr-3 py-1.5 text-xs bg-muted/40 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all w-36"
                            />
                          </div>
                        </div>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndFoco}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                            <SortableContext items={visibleMateriasFoco.map(e => e.config.slug)} strategy={rectSortingStrategy}>
                              {visibleMateriasFoco.filter(e => !focosPrincipais.includes(e.config.slug)).filter(e => {
                                if (!normalizedMateriaInline) return true;
                                const nome = e.config.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                return nome.includes(normalizedMateriaInline);
                              }).map(estado => (
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
                                  isFocoPrincipal={isFocoPrincipal(estado.config.slug)}
                                  onToggleFocoPrincipal={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    toggleFocoPrincipal(estado.config.slug);
                                  }}
                                />
                              ))}
                            </SortableContext>
                          </div>
                        </DndContext>
                        {showVerMaisMaterias && (
                          <button
                            onClick={() => setVisibleLimitFocoMaterias(prev => prev + 6)}
                            className="w-full mb-4 py-2.5 rounded-xl text-[13px] font-medium text-muted-foreground border border-dashed border-border hover:bg-muted transition-colors"
                          >
                            Ver mais matérias ({Math.min(visibleLimitFocoMaterias + 6, filteredFocoMateriasTotal)} de {filteredFocoMateriasTotal})
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* ABA: EXPLORAR MATÉRIAS */}
            {currentTab === 'materias' && (
              <>
                {searchQuery.trim().length > 0 ? (
                  <div className="space-y-6">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">
                      Resultados da busca ({searchResultsMaterias.length})
                    </h3>
                    {searchResultsMaterias.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {searchResultsMaterias.map(result => (
                          <div key={result.estado.config.slug} className="flex flex-col gap-1">
                            <MateriaCard
                              estado={result.estado}
                              onClick={() => handleCardClick(result.estado)}
                              isPinned={isFocado(result.estado.config.slug)}
                              onTogglePin={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                toggleFoco(result.estado.config.slug);
                              }}
                              isFocoPrincipal={isFocoPrincipal(result.estado.config.slug)}
                              onToggleFocoPrincipal={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                handleToggleFocoPrincipal(result.estado.config.slug);
                              }}
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
                        Nenhuma matéria encontrada.
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {todasMateriasIsoladas.slice(0, visibleLimitMaterias).map(estado => (
                        <MateriaCard
                          key={estado.config.slug}
                          estado={estado}
                          onClick={() => handleCardClick(estado)}
                          isPinned={isFocado(estado.config.slug)}
                          onTogglePin={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            toggleFoco(estado.config.slug);
                          }}
                          isFocoPrincipal={isFocoPrincipal(estado.config.slug)}
                          onToggleFocoPrincipal={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleToggleFocoPrincipal(estado.config.slug);
                          }}
                        />
                      ))}
                    </div>
                    {todasMateriasIsoladas.length > visibleLimitMaterias && (
                      <div className="flex items-center gap-2 mb-4">
                        <button
                          onClick={() => setVisibleLimitMaterias(prev => prev + 6)}
                          className="flex-1 py-3 rounded-xl text-[13px] font-medium text-muted-foreground border border-dashed border-border hover:bg-muted transition-colors"
                        >
                          Ver mais matérias ({Math.min(visibleLimitMaterias + 6, todasMateriasIsoladas.length)} de {todasMateriasIsoladas.length})
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* ABA: EXPLORAR HUBS */}
            {currentTab === 'hubs' && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => {
                  const { active, over } = event;
                  if (over && active.id !== over.id) {
                    // Ordenamos o array original MATERIAS exatamente com a lógica estável
                    const sortedHubsOriginal = [...MATERIAS].sort((a, b) => {
                      const indexA = ordemHubs.indexOf(a.slug);
                      const indexB = ordemHubs.indexOf(b.slug);
                      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                      if (indexA !== -1) return -1;
                      if (indexB !== -1) return 1;
                      const origIndexA = MATERIAS.findIndex(m => m.slug === a.slug);
                      const origIndexB = MATERIAS.findIndex(m => m.slug === b.slug);
                      return origIndexA - origIndexB;
                    });

                    const oldIndex = sortedHubsOriginal.findIndex(e => e.slug === active.id);
                    const newIndex = sortedHubsOriginal.findIndex(e => e.slug === over.id);
                    
                    if (oldIndex !== -1 && newIndex !== -1) {
                      const novaOrdem = arrayMove(sortedHubsOriginal, oldIndex, newIndex).map(e => e.slug);
                      atualizarOrdemHubs(novaOrdem);
                    }
                  }
                }}
              >
                <SortableContext
                  items={visibleExplorarHubs.map(cat => cat.slug)}
                  strategy={verticalListSortingStrategy}
                >
                  {visibleExplorarHubs.map(cat => {
                    const leafSlugs = getAllLeafSlugs(cat);
                    const catEstados = leafSlugs
                      .map(slug => estados.find(e => e.config.slug === slug))
                      .filter(Boolean) as typeof estados;
                    
                    if (catEstados.length === 0) return null;

                    const isExpanded = expandedCats.has(cat.slug) || normalizedQuery.length > 0;

                    return (
                      <SortableHubItem key={cat.slug} id={cat.slug}>
                        <div
                          onClick={(e) => toggleCat(cat.slug)}
                          className="group flex items-start gap-3 cursor-pointer select-none"
                        >
                          <div className="w-10 h-10 rounded-xl bg-foreground/[0.06] border border-border/40 flex items-center justify-center text-xl shrink-0 mt-0.5 group-hover:bg-foreground/10 transition-colors">
                            {cat.emoji}
                          </div>
                          <div className="flex-1 min-w-0 pointer-events-none">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <h2 className="text-base font-semibold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                                  {cat.nome}
                                </h2>
                                <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                  {catEstados.length} matérias
                                </span>
                              </div>
                              <div className="flex items-center gap-2 pointer-events-auto">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFoco(cat.slug);
                                  }}
                                  className={cn(
                                    "p-1.5 rounded-lg transition-all",
                                    isFocado(cat.slug) 
                                      ? "text-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)] hover:bg-[hsl(var(--success)/0.2)]" 
                                      : "text-muted-foreground bg-muted/30 hover:bg-muted/50"
                                  )}
                                  title={isFocado(cat.slug) ? "Remover Hub do Foco" : "Fixar Hub no Foco"}
                                >
                                  {isFocado(cat.slug) ? <Pin className="w-4 h-4 fill-current" /> : <Pin className="w-4 h-4" />}
                                </button>
                                <div className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors p-1.5 bg-muted/30 hover:bg-muted/50 rounded-lg cursor-pointer" onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCat(cat.slug);
                                }}>
                                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                </div>
                              </div>
                            </div>
                            {cat.descricao && (
                              <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2 pr-6">
                                {cat.descricao}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-border/50 cursor-default" onPointerDown={e => e.stopPropagation()}>
                            {catEstados
                              .filter(estado => {
                                if (!normalizedQuery) return true;
                                const catName = cat.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                const catDesc = cat.descricao?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                if (catName.includes(normalizedQuery) || catDesc?.includes(normalizedQuery)) return true;
                                
                                const estName = estado.config.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                const estDesc = estado.config.descricao?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                return estName.includes(normalizedQuery) || estDesc?.includes(normalizedQuery);
                              })
                              .map((estado, index) => {
                              const pinned = isFocado(estado.config.slug);
                              return (
                                <div key={estado.config.slug}>
                                  <div 
                                    className={cn(
                                      "group relative overflow-hidden rounded-2xl border transition-all cursor-pointer h-full",
                                      pinned 
                                        ? "border-[hsl(var(--success)/0.4)] bg-[hsl(var(--success)/0.03)]" 
                                        : "border-border/50 bg-card hover:border-border/80"
                                    )}
                                  >
                                    <div 
                                      onClick={() => handleCardClick(estado)}
                                      className="p-5"
                                    >
                                      <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{estado.config.emoji}</span>
                                            <div className="flex flex-col">
                                              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                                                {normalizedQuery ? 'MATÉRIA' : `Etapa ${index + 1}`}
                                              </span>
                                              <h3 className="font-semibold text-foreground tracking-tight leading-tight">
                                                {estado.config.nome}
                                              </h3>
                                            </div>
                                          </div>
                                          <p className="text-[13px] text-muted-foreground line-clamp-2">
                                            {estado.config.descricao}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFoco(estado.config.slug);
                                      }}
                                      className={cn(
                                        "absolute top-4 right-4 p-2 rounded-xl transition-all z-10",
                                        pinned 
                                          ? "text-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)] hover:bg-[hsl(var(--success)/0.2)]" 
                                          : "text-muted-foreground bg-muted/50 hover:bg-muted opacity-0 group-hover:opacity-100 focus:opacity-100"
                                      )}
                                      title={pinned ? "Remover do Foco" : "Fixar no Foco"}
                                    >
                                      {pinned ? <Pin className="w-4 h-4 fill-current" /> : <Pin className="w-4 h-4" />}
                                    </button>
                                    
                                    <div className="px-5 pb-5 pt-1 pointer-events-none">
                                       <span className="text-[11px] font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                                          {estado.totalSessoes} {estado.totalSessoes === 1 ? 'sessão' : 'sessões'}
                                       </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </SortableHubItem>
                    );
                  })}
                </SortableContext>
              </DndContext>
            )}
            
            {currentTab === 'hubs' && !normalizedQuery && sortedAndFilteredHubs.length > visibleLimitHubs && (
              <div className="flex items-center gap-2 mb-8 mt-4">
                <button
                  onClick={() => setVisibleLimitHubs(prev => prev + 4)}
                  className="flex-1 py-3 rounded-xl text-[13px] font-medium text-muted-foreground border border-dashed border-border hover:bg-muted transition-colors"
                >
                  Ver mais Hubs ({Math.min(visibleLimitHubs + 4, sortedAndFilteredHubs.length)} de {sortedAndFilteredHubs.length})
                </button>
              </div>
            )}
            
          </div>
        )}
          </div> {/* Fim da MAIN CONTENT */}
        </div> {/* Fim da GRID */}
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
