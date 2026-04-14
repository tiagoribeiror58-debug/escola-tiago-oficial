import { useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (erros: number, dificuldade: string) => void;
  saving: boolean;
}

export default function MiniEncerramentoModal({ open, onClose, onConfirm, saving }: Props) {
  const [erros, setErros] = useState(0);
  const [dificuldade, setDificuldade] = useState('medio');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm bg-card border border-border rounded-2xl shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold">Sessão curta</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Preencha apenas o essencial</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-muted-foreground">Erros</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map(n => (
                <button
                  key={n}
                  onClick={() => setErros(n)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                    erros === n
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  {n === 3 ? '3+' : n}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-muted-foreground">Dificuldade</label>
            <div className="flex gap-2">
              {[
                { value: 'facil', label: 'Fácil' },
                { value: 'medio', label: 'Médio' },
                { value: 'dificil', label: 'Difícil' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setDificuldade(opt.value)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                    dificuldade === opt.value
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border">
          <button
            onClick={() => onConfirm(erros, dificuldade)}
            disabled={saving}
            className={cn(
              'w-full py-2.5 rounded-xl text-sm font-medium',
              'bg-foreground text-background',
              'hover:opacity-90 transition-opacity',
              'disabled:opacity-50'
            )}
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}
