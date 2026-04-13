import { useNavigate } from 'react-router-dom';
import { MateriaEstado } from '@/types';
import { urgencia } from '@/lib/materias';
import { cn } from '@/lib/utils';

interface Props {
  estado: MateriaEstado;
}

export default function MateriaCard({ estado }: Props) {
  const navigate = useNavigate();
  const { config, ultimaSessao, totalSessoes, diasParada } = estado;
  const urg = urgencia(diasParada);

  const nivelDots = ultimaSessao?.nivel || 0;

  const urgenciaLabel: Record<string, string> = {
    nova: 'Nova',
    ok: `${diasParada}d`,
    atencao: `${diasParada}d`,
    urgente: `${diasParada}d`,
  };

  const urgenciaBg: Record<string, string> = {
    nova: 'bg-muted text-muted-foreground',
    ok: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    atencao: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    urgente: 'bg-red-500/10 text-red-600 dark:text-red-400',
  };

  return (
    <button
      onClick={() => navigate(`/sessao/${config.slug}`)}
      className={cn(
        'group relative flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5',
        'transition-all duration-200 ease-out',
        'hover:shadow-md hover:border-foreground/10 hover:-translate-y-0.5',
        'active:translate-y-0 active:shadow-sm',
        'text-left w-full cursor-pointer'
      )}
    >
      {/* Emoji + Name */}
      <div className="flex items-center gap-3 w-full">
        <span className="text-2xl leading-none select-none">{config.emoji}</span>
        <span className="text-sm font-medium text-foreground">{config.nome}</span>
        <span className={cn(
          'ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full',
          urgenciaBg[urg]
        )}>
          {urgenciaLabel[urg]}
        </span>
      </div>

      {/* Level + Sessions */}
      {ultimaSessao && (
        <div className="flex items-center gap-3 w-full">
          {/* Level dots */}
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-colors',
                  i <= nivelDots ? 'bg-foreground' : 'bg-border'
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {totalSessoes} {totalSessoes === 1 ? 'sessão' : 'sessões'}
          </span>
          {ultimaSessao.erros && ultimaSessao.erros > 1 && (
            <span className="text-[11px] text-amber-500 ml-auto">reforço</span>
          )}
        </div>
      )}

      {/* Last topic */}
      {ultimaSessao && (
        <p className="text-[12px] text-muted-foreground truncate w-full">
          {ultimaSessao.topico}
        </p>
      )}
    </button>
  );
}
