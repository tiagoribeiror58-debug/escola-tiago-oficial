import { useState } from 'react';
import { useFolhasEstado } from '@/hooks/useSessoes';
import { useMateriasFoco } from '@/hooks/useMateriasFoco';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Pin, PinOff, ChevronRight, ChevronDown } from 'lucide-react';
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

function SortableBibliotecaItem({ id, estado, index, pinned, onClick, onToggleFoco }: any) {
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
      <div 
        className={cn(
          "group relative overflow-hidden rounded-2xl border transition-all cursor-pointer h-full",
          pinned 
            ? "border-[hsl(var(--success)/0.4)] bg-[hsl(var(--success)/0.03)]" 
            : "border-border/50 bg-card hover:border-border/80",
          isDragging && "opacity-60 ring-2 ring-primary scale-[1.02]"
        )}
      >
        <div 
          onClick={onClick}
          className="p-5"
          {...listeners}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{estado.config.emoji}</span>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                    Etapa {index + 1}
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
            onToggleFoco();
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
}

export default function Biblioteca() {
  const { estados, isLoading } = useFolhasEstado();
  const { foco, toggleFoco, isFocado } = useMateriasFoco();
  const navigate = useNavigate();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<MateriaEstado | null>(null);
  
  // Estado para controlar quais categorias estão abertas (sanfona).
  // Por padrão, deixamos todas fechadas para não poluir a tela.
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

  const { ordem, atualizarOrdem } = useOrdemMaterias();
  
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

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-3xl mx-auto px-4 py-8">
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Foco
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Biblioteca</h1>
          <p className="text-muted-foreground mt-2">
            Escolha no que você quer focar. As matérias fixadas aparecerão na sua tela inicial para evitar distrações.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div>
            {MATERIAS.map(cat => {
              const leafSlugs = getAllLeafSlugs(cat);
              const catEstados = leafSlugs
                .map(slug => estados.find(e => e.config.slug === slug))
                .filter(Boolean) as typeof estados;
              
              if (catEstados.length === 0) return null;

              const isExpanded = expandedCats.has(cat.slug);

              // Ordena catEstados usando a ordem global
              let sortedCatEstados = [...catEstados].sort((a, b) => {
                const indexA = ordem.indexOf(a.config.slug);
                const indexB = ordem.indexOf(b.config.slug);
                if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
                return 0;
              });

              return (
                <div key={cat.slug} className="mb-6 bg-card border border-border/50 rounded-2xl p-4 transition-all hover:border-border/80">
                  {/* Hub header — clicável, expande/recolhe as matérias */}
                  <div
                    onClick={() => toggleCat(cat.slug)}
                    className="group flex items-start gap-3 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-foreground/[0.06] border border-border/40 flex items-center justify-center text-xl shrink-0 mt-0.5 group-hover:bg-foreground/10 transition-colors">
                      {cat.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-semibold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                            {cat.nome}
                          </h2>
                          <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {catEstados.length} matérias
                          </span>
                        </div>
                        <div className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors p-1 bg-muted/30 rounded-lg">
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
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => {
                        const { active, over } = event;
                        if (over && active.id !== over.id) {
                          const oldIndex = sortedCatEstados.findIndex(e => e.config.slug === active.id);
                          const newIndex = sortedCatEstados.findIndex(e => e.config.slug === over.id);
                          
                          if (oldIndex !== -1 && newIndex !== -1) {
                            const novaOrdemLocal = arrayMove(sortedCatEstados, oldIndex, newIndex).map(e => e.config.slug);
                            
                            let currentOrdem = [...ordem];
                            novaOrdemLocal.forEach(slug => {
                              if (!currentOrdem.includes(slug)) {
                                currentOrdem.push(slug);
                              }
                            });
                            
                            const firstIndex = currentOrdem.findIndex(slug => novaOrdemLocal.includes(slug));
                            const remainingGlobal = currentOrdem.filter(slug => !novaOrdemLocal.includes(slug));
                            
                            const finalOrdem = [
                              ...remainingGlobal.slice(0, firstIndex),
                              ...novaOrdemLocal,
                              ...remainingGlobal.slice(firstIndex)
                            ];
                            
                            atualizarOrdem(finalOrdem);
                          }
                        }
                      }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-border/50">
                        <SortableContext
                          items={sortedCatEstados.map(e => e.config.slug)}
                          strategy={rectSortingStrategy}
                        >
                          {sortedCatEstados.map((estado, index) => (
                            <SortableBibliotecaItem
                              key={estado.config.slug}
                              id={estado.config.slug}
                              estado={estado}
                              index={index}
                              pinned={isFocado(estado.config.slug)}
                              onClick={() => handleCardClick(estado)}
                              onToggleFoco={() => toggleFoco(estado.config.slug)}
                            />
                          ))}
                        </SortableContext>
                      </div>
                    </DndContext>
                  )}
                </div>
              );
            })}
          </div>
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
