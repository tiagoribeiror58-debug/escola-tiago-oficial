import { useState } from 'react';
import { useFolhasEstado } from '@/hooks/useSessoes';
import { useMateriasFoco } from '@/hooks/useMateriasFoco';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Pin, PinOff, ChevronRight } from 'lucide-react';
import { MateriaEstado } from '@/types';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import MateriaDetailModal from '@/components/MateriaDetailModal';
import { MATERIAS, getAllLeafSlugs } from '@/lib/materias';

export default function Biblioteca() {
  const { estados, isLoading } = useFolhasEstado();
  const { foco, toggleFoco, isFocado } = useMateriasFoco();
  const navigate = useNavigate();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<MateriaEstado | null>(null);

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

              return (
                <div key={cat.slug} className="mb-12">
                  {/* Hub header — clicável, navega para a página do hub */}
                  <div
                    onClick={() => navigate(`/categoria/${cat.slug}`)}
                    className="group flex items-start gap-3 mb-5 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-foreground/[0.06] border border-border/40 flex items-center justify-center text-xl shrink-0 mt-0.5 group-hover:bg-foreground/10 transition-colors">
                      {cat.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                          {cat.nome}
                        </h2>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors" />
                      </div>
                      {cat.descricao && (
                        <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                          {cat.descricao}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {catEstados.map((estado, index) => {
                      const pinned = isFocado(estado.config.slug);
                      return (
                        <div 
                          key={estado.config.slug}
                          className={cn(
                            "group relative overflow-hidden rounded-2xl border transition-all cursor-pointer",
                            pinned 
                              ? "border-[hsl(var(--success)/0.4)] bg-[hsl(var(--success)/0.03)]" 
                              : "border-border/50 bg-card hover:border-border/80"
                          )}
                        >
                          {/* Clickable Area for the Card itself */}
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

                          {/* Pin Action (Absolute top right) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFoco(estado.config.slug);
                            }}
                            className={cn(
                              "absolute top-4 right-4 p-2 rounded-xl transition-all",
                              pinned 
                                ? "text-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)] hover:bg-[hsl(var(--success)/0.2)]" 
                                : "text-muted-foreground bg-muted/50 hover:bg-muted opacity-0 group-hover:opacity-100 focus:opacity-100"
                            )}
                            title={pinned ? "Remover do Foco" : "Fixar no Foco"}
                          >
                            {pinned ? <Pin className="w-4 h-4 fill-current" /> : <Pin className="w-4 h-4" />}
                          </button>
                          
                          {/* Session Count info inside Card (bottom) */}
                          <div className="px-5 pb-5 pt-1 pointer-events-none">
                             <span className="text-[11px] font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                                {estado.totalSessoes} {estado.totalSessoes === 1 ? 'sessão' : 'sessões'}
                             </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
