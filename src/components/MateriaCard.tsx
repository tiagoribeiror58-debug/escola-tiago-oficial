import { MateriaEstado } from '@/types';
import { urgencia } from '@/lib/materias';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface Props {
  estado: MateriaEstado;
  onClick: () => void;
}

export default function MateriaCard({ estado, onClick }: Props) {
  const { config, ultimaSessao, diasParada } = estado;
  const urg = urgencia(diasParada);

  const urgenciaLabel: Record<string, string> = {
    nova: 'Nova',
    ok: `${diasParada}d atrás`,
    atencao: `${diasParada}d atrás`,
    urgente: `${diasParada}d atrás`,
  };

  const urgenciaBg: Record<string, string> = {
    nova: 'bg-muted text-muted-foreground',
    ok: 'bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]',
    atencao: 'bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))]',
    urgente: 'bg-[hsl(var(--danger)/0.1)] text-[hsl(var(--danger))]',
  };

  const urgenciaBorder: Record<string, string> = {
    nova: 'border-border',
    ok: 'border-border',
    atencao: 'border-[hsl(var(--warning)/0.2)]',
    urgente: 'border-[hsl(var(--danger)/0.2)]',
  };

  const displayTopic = ultimaSessao?.proximo_topico || ultimaSessao?.topico;

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
        <div className="ml-auto flex items-center gap-2">
          {config.ementa && config.ementa.length > 0 && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/70">
              {estado.totalSessoes}/{config.ementa.length} Tóp.
            </span>
          )}
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/70">
            {estado.totalSessoes % 11}/10 Prova
          </span>
          <span className={cn(
            'text-[11px] font-medium px-2 py-0.5 rounded-full',
            urgenciaBg[urg]
          )}>
            {urgenciaLabel[urg]}
          </span>
          {config.isCategory && (
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
          )}
        </div>
      </div>

      {ultimaSessao && displayTopic && (
        <div className="flex items-center justify-between gap-3 w-full relative z-10">
          <p className="text-[12px] text-muted-foreground truncate flex-1 pointer-events-none">
            {displayTopic}
          </p>
        </div>
      )}
    </div>
  );
}
