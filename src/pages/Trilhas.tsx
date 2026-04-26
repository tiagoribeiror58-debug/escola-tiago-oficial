import { useMateriasEstado } from '@/hooks/useSessoes';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ScrollText, Map } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function Trilhas() {
  const { estados, isLoading } = useMateriasEstado();
  const navigate = useNavigate();

  // Apenas matérias que têm ementa e onde o usuário já concluiu pelo menos 1 sessão
  const materiasEmProgresso = estados.filter(
    (e) => !e.config.isCategory && e.config.ementa && e.totalSessoes > 0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-muted border border-border mt-0.5">
              <Map className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Suas Trilhas
              </h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-md leading-relaxed">
                Aqui você visualiza todo o caminho de conhecimento que já percorreu.
                Cada passo concluído constrói sua base de maestria.
              </p>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-border mb-8" />

        {/* Lista de Trilhas */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : materiasEmProgresso.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Você ainda não começou nenhuma trilha.
              <br />
              Volte para a tela inicial e inicie seus estudos!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {materiasEmProgresso.map((estado) => {
              const { config, totalSessoes } = estado;
              const ementa = config.ementa || [];
              
              return (
                <div key={config.slug} className="rounded-2xl border border-border bg-card overflow-hidden">
                  <div className="p-5 border-b border-border bg-muted/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{config.emoji}</span>
                        <h2 className="font-semibold text-foreground">{config.nome}</h2>
                      </div>
                      <span className="text-[10px] font-medium bg-foreground/10 text-foreground px-2 py-0.5 rounded-full">
                        {totalSessoes >= ementa.length 
                          ? `Base concluída ${totalSessoes > ementa.length ? `(+${totalSessoes - ementa.length})` : ''}` 
                          : `${totalSessoes}/${ementa.length}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-2">
                    {ementa.map((topico, idx) => {
                      const isCompleted = idx < totalSessoes;
                      const isCurrent = idx === totalSessoes;
                      
                      // Só mostra o que já foi concluído e o atual
                      if (!isCompleted && !isCurrent) return null;

                      return (
                        <div
                          key={idx}
                          className={cn(
                            "flex items-center gap-3 text-sm w-full text-left p-2 rounded-xl transition-colors",
                            isCompleted ? "text-muted-foreground" : "text-foreground font-medium"
                          )}
                        >
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0 border text-[10px] transition-colors",
                            isCompleted ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" :
                            "bg-primary/10 border-primary/30 text-primary"
                          )}>
                            {isCompleted ? "✓" : (idx + 1)}
                          </div>
                          <span className={cn(
                            "line-clamp-1 flex-1",
                            isCompleted && "line-through decoration-muted-foreground/30"
                          )}>
                            {topico}
                          </span>
                        </div>
                      );
                    })}

                    {totalSessoes >= ementa.length && (
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
