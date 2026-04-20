import { MateriaEstado } from '@/types';
import { urgencia } from '@/lib/materias';
import { cn } from '@/lib/utils';

interface Props {
  estado: MateriaEstado;
  onClick: () => void;
}

export default function MateriaCard({ estado, onClick }: Props) {
  const { config, ultimaSessao, totalSessoes, diasParada } = estado;
  const urg = urgencia(diasParada);

  const nivelDots = ultimaSessao?.nivel || 0;

  const urgenciaLabel: Record<string, string> = {
    nova: 'Nova',
    ok: `${diasParada}d atrás`,
    atencao: `${diasParada}d atrás`,
    urgente: `${diasParada}d atrás`,
  };

  const urgenciaBg: Record<string, string> = {
    nova: 'bg-muted text-muted-foreground',
    ok: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    atencao: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    urgente: 'bg-red-500/10 text-red-600 dark:text-red-400',
  };

  const urgenciaBorder: Record<string, string> = {
    nova: 'border-border',
    ok: 'border-border',
    atencao: 'border-amber-500/20',
    urgente: 'border-red-500/20',
  };

  const displayTopic = ultimaSessao?.proximo_topico || ultimaSessao?.topico;
  const topicLabel = ultimaSessao?.proximo_topico ? 'Próximo' : 'Último';

  return (
    <div
      className={cn(
        'group relative flex flex-col items-start gap-3 rounded-2xl border bg-card p-5',
        'transition-all duration-200 ease-out',
        'hover:shadow-md hover:border-foreground/10 hover:-translate-y-0.5',
        'text-left w-full',
        urgenciaBorder[urg]
      )}
    >
      <div 
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        className="absolute inset-0 z-0 rounded-2xl cursor-pointer"
      />

      <div className="flex items-center gap-3 w-full relative z-10 pointer-events-none">
        <span className="text-2xl leading-none select-none">{config.emoji}</span>
        <span className="text-sm font-medium text-foreground">{config.nome}</span>
        <span className={cn(
          'ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full',
          urgenciaBg[urg]
        )}>
          {urgenciaLabel[urg]}
        </span>
      </div>

      {ultimaSessao && (
        <div className="flex flex-wrap items-center gap-2 w-full relative z-10 pointer-events-none">
          <span className={cn(
            'text-[11px] font-medium px-2 py-0.5 rounded-full',
            ultimaSessao.nivel === 3 ? 'bg-emerald-500/10 text-emerald-500' :
            ultimaSessao.nivel === 2 ? 'bg-amber-500/10 text-amber-500' :
            'bg-foreground/10 text-foreground'
          )}>
            {ultimaSessao.nivel === 3 ? 'Conhecimento sólido' :
             ultimaSessao.nivel === 2 ? 'Avançando' : 'Iniciando'}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {totalSessoes} {totalSessoes === 1 ? 'sessão' : 'sessões'}
          </span>
          {ultimaSessao.decisao_proxima === 'reforcar' && (
            <span className="text-[11px] text-amber-500 font-medium ml-auto">⟳ reforço pendente</span>
          )}
        </div>
      )}

      {ultimaSessao && displayTopic && (
        <div className="flex items-center justify-between gap-3 w-full relative z-10 mt-1">
          <p className="text-[12px] text-muted-foreground truncate flex-1 pointer-events-none">
            <span className="text-muted-foreground/60">{topicLabel}:</span>{' '}
            {displayTopic}
          </p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.location.href = `/historico/${config.slug}`;
            }}
            className="flex items-center text-[11px] font-medium text-foreground/60 hover:text-foreground bg-muted/50 hover:bg-muted px-2 py-1 rounded-md transition-colors whitespace-nowrap"
          >
            Histórico
          </button>
        </div>
      )}
    </div>
  );
}
