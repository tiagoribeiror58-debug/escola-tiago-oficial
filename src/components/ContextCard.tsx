import { useState } from 'react';
import { Sessao } from '@/types';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  ultimaSessao: Sessao | null;
}

export default function ContextCard({ ultimaSessao }: Props) {
  const [open, setOpen] = useState(false);

  if (!ultimaSessao) {
    return (
      <div className="px-4 py-3 rounded-xl bg-muted/50 text-sm text-muted-foreground">
        Primeira sessão — vamos descobrir seu nível.
      </div>
    );
  }

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left px-4 py-3 rounded-xl bg-muted/50 transition-colors hover:bg-muted"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Último: <span className="text-foreground font-medium">{ultimaSessao.topico}</span>
          {' · '}Nível {ultimaSessao.nivel}/3
        </span>
        <ChevronDown className={cn(
          'w-4 h-4 text-muted-foreground transition-transform duration-200',
          open && 'rotate-180'
        )} />
      </div>

      {open && (
        <div className="mt-3 pt-3 border-t border-border space-y-1.5 text-[13px] text-muted-foreground">
          {ultimaSessao.proximo_topico && (
            <p>Próximo: <span className="text-foreground">{ultimaSessao.proximo_topico}</span></p>
          )}
          {ultimaSessao.dificuldade && (
            <p>Dificuldade: <span className="text-foreground">{ultimaSessao.dificuldade}</span></p>
          )}
          {ultimaSessao.erros !== null && (
            <p>Erros: <span className="text-foreground">{ultimaSessao.erros}</span></p>
          )}
          {ultimaSessao.observacoes && (
            <p>Obs: <span className="text-foreground">{ultimaSessao.observacoes}</span></p>
          )}
        </div>
      )}
    </button>
  );
}
