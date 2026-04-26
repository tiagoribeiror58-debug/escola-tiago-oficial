import { useMateriasEstado } from '@/hooks/useSessoes';
import { MateriaEstado } from '@/types';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, ScrollText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Avaliacoes() {
  const { estados, isLoading } = useMateriasEstado();
  const navigate = useNavigate();

  // Apenas matérias com provas pendentes (ignora categorias-pai)
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
                Avaliações de Proficiência
              </h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-md leading-relaxed">
                A cada 10 sessões concluídas em uma matéria, você desbloqueia
                um exame de proficiência. Aqui você demonstra o que consolidou — sem atalhos.
              </p>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-border mb-8" />

        {/* Lista de desafios pendentes */}
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
                onStart={() =>
                  navigate(`/sessao/${estado.config.slug}?modo=avaliacao`)
                }
              />
            ))}
          </div>
        )}
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
