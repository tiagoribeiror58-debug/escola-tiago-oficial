import { MateriaEstado } from '@/types';
import { urgencia } from '@/lib/materias';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface Props {
  estado: MateriaEstado;
  onClick: () => void;
  ordem?: number;
}

export default function MateriaCard({ estado, onClick, ordem }: Props) {
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

  // Calcula posição no roadmap (para matérias com ementa)
  const ementa = config.ementa;
  const totalPassos = ementa?.length ?? 0;
  const proximoTopico = ultimaSessao?.proximo_topico || ultimaSessao?.topico;

  // "Passo X de Y" = sessões concluídas + 1 (passo atual)
  // Usa totalSessoes como proxy de passos concluídos, limitado ao tamanho da ementa
  const passoAtual = totalPassos > 0
    ? Math.min(estado.totalSessoes + 1, totalPassos)
    : null;

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
        <div className="flex flex-col">
          {ordem !== undefined && (
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
              Etapa {ordem}
            </span>
          )}
          <span className="text-sm font-medium text-foreground">{config.nome}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
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

      {/* Linha de contexto do roadmap */}
      <div className="w-full relative z-10 pointer-events-none">
        {ultimaSessao && proximoTopico ? (
          <p className="text-[12px] text-muted-foreground truncate">
            {passoAtual && totalPassos > 0
              ? `Passo ${passoAtual} de ${totalPassos} · ${proximoTopico}`
              : proximoTopico}
          </p>
        ) : (
          <p className="text-[12px] text-muted-foreground/50 italic">
            {totalPassos > 0 ? `${totalPassos} passos · Nunca iniciada` : 'Toque para começar'}
          </p>
        )}
      </div>
    </div>
  );
}
