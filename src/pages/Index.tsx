import { useState } from 'react';
import { useMateriasEstado, useSessoes } from '@/hooks/useSessoes';
import MateriaCard from '@/components/MateriaCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, ScrollText, Map } from 'lucide-react';
import { MateriaEstado } from '@/types';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import MateriaDetailModal from '@/components/MateriaDetailModal';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia, Tiago';
  if (h < 18) return 'Boa tarde, Tiago';
  return 'Boa noite, Tiago';
}


export default function Index() {
  const { estados, isLoading } = useMateriasEstado();
  const { data: sessoes } = useSessoes();
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const totalSessoes = sessoes?.length || 0;
  const materiasAtivas = estados.filter(e => e.totalSessoes > 0).length;
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<MateriaEstado | null>(null);

  // Total de provas pendentes em todas as matérias
  const totalProvasPendentes = estados
    .filter(e => !e.config.isCategory)
    .reduce((acc, e) => acc + e.provasPendentes, 0);

  // Hero Card é a matéria de maior acesso
  const heroEstado = estados.length > 0 ? estados[0] : null;

  const handleCardClick = (estado: MateriaEstado) => {
    if (estado.config.isCategory) {
      navigate(`/categoria/${estado.config.slug}`);
      return;
    }
    setSelectedEstado(estado);
    setModalOpen(true);
  };

  const outrosEstados = heroEstado ? estados.filter(e => e.config.slug !== heroEstado.config.slug) : estados;
  const displayedEstados = showAll ? outrosEstados : outrosEstados.slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">{getGreeting()}</h1>
              <p className="text-sm text-muted-foreground mt-0.5 capitalize">{hoje}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Atalho para Trilhas */}
              <button
                onClick={() => navigate('/trilhas')}
                className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
              >
                <Map className="w-3.5 h-3.5" />
                Minhas Trilhas
              </button>

              {/* Atalho para o Portão de Avaliação */}
              <button
                onClick={() => navigate('/avaliacoes')}
                className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
              >
                <ScrollText className="w-3.5 h-3.5" />
                Avaliações
                {totalProvasPendentes > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-foreground text-background text-[10px] font-bold leading-none">
                    {totalProvasPendentes}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        {heroEstado && !isLoading && (() => {
          const sessoesFeitas = heroEstado.totalSessoes % 11;
          const isMasteryReady = sessoesFeitas === 10;
          return (
            <div className="mb-8 relative overflow-hidden rounded-[2rem] border border-border/50 bg-gradient-to-b from-card to-background p-6 sm:p-8 shadow-2xl transition-all hover:border-border/80">
              <div className="absolute inset-0 bg-foreground/5 opacity-50 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                      {heroEstado.config.nome}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm sm:text-base pr-8">
                      {isMasteryReady
                        ? 'Área dominada! Está na hora de provar seus conhecimentos.'
                        : `Sua matéria de maior foco. Faltam ${10 - sessoesFeitas} sessões para o Desafio de Maestria.`}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-foreground/5 flex items-center justify-center text-2xl shrink-0">
                    {heroEstado.config.emoji}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      if (isMasteryReady) {
                        navigate(`/sessao/${heroEstado.config.slug}?modo=desafio`);
                      } else {
                        handleCardClick(heroEstado);
                      }
                    }}
                    className={cn(
                      "w-full sm:w-auto self-start px-8 py-3.5 rounded-xl font-medium transition-all text-sm shadow-xl",
                      isMasteryReady
                        ? "bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-0.5 active:scale-95"
                        : "bg-foreground text-background shadow-foreground/10 hover:opacity-90 active:scale-95"
                    )}
                  >
                    {isMasteryReady 
                      ? `Fazer Desafio de Maestria de ${heroEstado.config.nome}` 
                      : `Continuar Estudando ${heroEstado.config.nome}`}
                  </button>

                  {isMasteryReady && (
                    <button
                      onClick={() => handleCardClick(heroEstado)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline self-start px-1"
                    >
                      Agora não — continuar estudando
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })()}



        {/* Separador de Outras Disciplinas */}
        {outrosEstados.length > 0 && !isLoading && (
          <div className="mt-12 mb-6 border-t border-border pt-8 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Explorar biblioteca
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayedEstados.map(estado => (
              <MateriaCard
                key={estado.config.slug}
                estado={estado}
                onClick={() => handleCardClick(estado)}
              />
            ))}
          </div>
        )}

        {!isLoading && outrosEstados.length > 4 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full mt-6 py-3 px-4 rounded-xl text-[13px] font-medium text-foreground bg-muted/50 hover:bg-muted transition-colors"
          >
            Ver todas as {outrosEstados.length} matérias
          </button>
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
