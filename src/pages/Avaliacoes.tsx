import { useMateriasEstado } from '@/hooks/useSessoes';
import { useWeakSpots } from '@/hooks/useWeakSpots';
import { getMateriaBySlug } from '@/lib/materias';
import { MateriaEstado } from '@/types';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ScrollText, Skull, TrendingDown, Zap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function Avaliacoes() {
  const { estados, isLoading } = useMateriasEstado();
  const { data: weakSpots, isLoading: isLoadingWeak } = useWeakSpots();
  const navigate = useNavigate();

  const desafiosPendentes: MateriaEstado[] = estados.filter(
    (e) => !e.config.isCategory && e.provasPendentes > 0
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
              <ScrollText className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Avaliações & Pontos Fracos
              </h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-md leading-relaxed">
                Avaliações de proficiência e os tópicos onde você mais erra — ordenados pela taxa de erro.
              </p>
            </div>
          </div>
        </div>

        {/* ── SEÇÃO: PONTOS FRACOS ── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest">Pontos Fracos</h2>
          </div>

          {isLoadingWeak ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[72px] rounded-xl" />
              ))}
            </div>
          ) : !weakSpots || weakSpots.length === 0 ? (
            <div className="py-10 text-center border border-dashed border-border rounded-xl">
              <Skull className="w-8 h-8 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-muted-foreground text-sm">
                Nenhum ponto fraco identificado ainda.
                <br />
                Complete mais quizzes para o sistema mapear suas dificuldades.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {weakSpots.slice(0, 10).map((spot, idx) => {
                const materia = getMateriaBySlug(spot.materia_slug);
                const isAlarmante = spot.taxa_erro >= 60;
                return (
                  <div
                    key={`${spot.materia_slug}-${spot.topico}`}
                    className={cn(
                      'flex items-center justify-between gap-4 px-5 py-4 rounded-xl border bg-card transition-colors hover:border-foreground/20',
                      isAlarmante ? 'border-destructive/40' : 'border-border'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Ranking */}
                      <span className="text-xs font-bold text-muted-foreground w-5 shrink-0">
                        #{idx + 1}
                      </span>
                      {materia && (
                        <span className="text-lg shrink-0">{materia.emoji}</span>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{spot.topico}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {materia?.nome ?? spot.materia_slug} · {spot.total} tentativa{spot.total !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Taxa de erro */}
                      <div className="text-right">
                        <p className={cn(
                          'text-lg font-bold tabular-nums',
                          spot.taxa_erro >= 60 ? 'text-destructive' : spot.taxa_erro >= 40 ? 'text-orange-500' : 'text-yellow-500'
                        )}>
                          {spot.taxa_erro}%
                        </p>
                        <p className="text-[10px] text-muted-foreground">erro</p>
                      </div>

                      {/* Ação */}
                      <button
                        onClick={() => navigate(`/sessao/${spot.materia_slug}?sub=${encodeURIComponent(spot.topico)}`)}
                        className="flex items-center gap-1.5 text-xs font-semibold rounded-lg bg-foreground text-background hover:opacity-90 active:scale-95 transition-all px-3 py-2"
                      >
                        <Zap className="w-3 h-3" />
                        Revisar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="border-t border-border mb-8" />

        {/* ── SEÇÃO: AVALIAÇÕES DE PROFICIÊNCIA ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ScrollText className="w-4 h-4 text-foreground" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest">Avaliações Pendentes</h2>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </div>
          ) : desafiosPendentes.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nenhuma avaliação pendente.
                <br />
                Continue estudando para desbloquear os próximos desafios.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {desafiosPendentes.map((estado) => (
                <DesafioCard
                  key={estado.config.slug}
                  estado={estado}
                  onStart={() => navigate(`/sessao/${estado.config.slug}?modo=avaliacao`)}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

interface DesafioCardProps {
  estado: MateriaEstado;
  onStart: () => void;
}

function DesafioCard({ estado, onStart }: DesafioCardProps) {
  const { config, provasPendentes } = estado;

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-xl shrink-0">{config.emoji}</span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {config.nome}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {provasPendentes === 1
              ? '1 avaliação pendente'
              : `${provasPendentes} avaliações pendentes`}
          </p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="shrink-0 px-4 py-2 text-xs font-semibold rounded-lg bg-foreground text-background hover:opacity-90 active:scale-95 transition-all"
      >
        Fazer Agora
      </button>
    </div>
  );
}
