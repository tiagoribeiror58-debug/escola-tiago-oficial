import { useState } from 'react';
import { useFolhasEstado } from '@/hooks/useSessoes';
import { useMateriasFoco } from '@/hooks/useMateriasFoco';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ArrowLeft, Pin, PinOff, ChevronRight, ChevronDown } from 'lucide-react';
import { MateriaEstado } from '@/types';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import MateriaDetailModal from '@/components/MateriaDetailModal';
import { MATERIAS, getAllLeafSlugs } from '@/lib/materias';
import { useOrdemMaterias } from '@/hooks/useOrdemMaterias';
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
import { useOrdemHubs } from '@/hooks/useOrdemMaterias';

function SortableHubItem({ id, children, isExpanded }: any) {
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
    <div ref={setNodeRef} style={style} className={cn(
      "bg-card border border-border/50 rounded-2xl p-4 transition-all hover:border-border/80", 
      isDragging && "opacity-60 ring-2 ring-primary scale-[1.01]",
      isExpanded ? "col-span-full h-auto" : "h-full flex flex-col"
    )}>
      <div {...attributes} {...listeners} className={cn("cursor-move", !isExpanded && "flex-1 flex flex-col")}>
        {children}
      </div>
    </div>
  );
}

export default function Biblioteca() {
  const { estados, isLoading } = useFolhasEstado();
  const { foco, toggleFoco, isFocado } = useMateriasFoco();
  const navigate = useNavigate();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<MateriaEstado | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estado para controlar quais categorias estão abertas (sanfona).
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

  const { ordemHubs, atualizarOrdemHubs } = useOrdemHubs();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCardClick = (estado: MateriaEstado) => {
    if (estado.config.isCategory) {
      navigate(`/categoria/${estado.config.slug}`);
      return;
    }
    setSelectedEstado(estado);
    setModalOpen(true);
  };

  const normalizedQuery = searchQuery.toLowerCase().trim();

  const sortedAndFilteredHubs = [...MATERIAS]
    .sort((a, b) => {
      const indexA = ordemHubs.indexOf(a.slug);
      const indexB = ordemHubs.indexOf(b.slug);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    })
    .filter(cat => {
      if (!normalizedQuery) return true;
      if (cat.nome.toLowerCase().includes(normalizedQuery)) return true;
      if (cat.descricao?.toLowerCase().includes(normalizedQuery)) return true;
      if (cat.children) {
        return cat.children.some(child => 
          child.nome.toLowerCase().includes(normalizedQuery) || 
          (child.descricao && child.descricao.toLowerCase().includes(normalizedQuery))
        );
      }
      return false;
    });

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Foco
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Biblioteca</h1>
          <p className="text-muted-foreground mt-2 mb-6">
            Escolha no que você quer focar. As matérias fixadas aparecerão na sua tela inicial para evitar distrações.
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Pesquisar hubs ou matérias..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => {
              const { active, over } = event;
              if (over && active.id !== over.id) {
                // Na reordenação, usamos apenas os itens filtrados ou mexemos no array global?
                // Mexemos no array global para não bugar.
                const sortedHubs = [...MATERIAS].sort((a, b) => {
                  const indexA = ordemHubs.indexOf(a.slug);
                  const indexB = ordemHubs.indexOf(b.slug);
                  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;
                  return 0;
                });

                const oldIndex = sortedHubs.findIndex(e => e.slug === active.id);
                const newIndex = sortedHubs.findIndex(e => e.slug === over.id);
                
                if (oldIndex !== -1 && newIndex !== -1) {
                  const novaOrdem = arrayMove(sortedHubs, oldIndex, newIndex).map(e => e.slug);
                  atualizarOrdemHubs(novaOrdem);
                }
              }
            }}
          >
            <SortableContext
              items={sortedAndFilteredHubs.map(cat => cat.slug)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                {sortedAndFilteredHubs.map(cat => {
                  const leafSlugs = getAllLeafSlugs(cat);
                const catEstados = leafSlugs
                  .map(slug => estados.find(e => e.config.slug === slug))
                  .filter(Boolean) as typeof estados;
                
                if (catEstados.length === 0) return null;

                // Se houver pesquisa, auto-expande os resultados para melhor UX
                const isExpanded = expandedCats.has(cat.slug) || normalizedQuery.length > 0;

                return (
                  <SortableHubItem key={cat.slug} id={cat.slug}>
                    {/* Hub header — clicável, expande/recolhe as matérias */}
                    <div
                      onClick={(e) => {
                        toggleCat(cat.slug);
                      }}
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
                          <div className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors p-1 bg-muted/30 rounded-lg pointer-events-auto cursor-pointer" onClick={(e) => {
                            e.stopPropagation();
                            toggleCat(cat.slug);
                          }}>
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
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
                            // Se a pesquisa bateu com o HUB pai, mostra todas as filhas
                            if (cat.nome.toLowerCase().includes(normalizedQuery) || cat.descricao?.toLowerCase().includes(normalizedQuery)) return true;
                            // Senão, filtra as filhas individualmente
                            return estado.config.nome.toLowerCase().includes(normalizedQuery) || 
                                   (estado.config.descricao && estado.config.descricao.toLowerCase().includes(normalizedQuery));
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
                                            {/* Não mostrar "Etapa X" se estiver filtrando, pois a ordem muda */}
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
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <MateriaDetailModal 
        estado={selectedEstado} 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />
    </div>
  );
}
