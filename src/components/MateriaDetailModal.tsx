import { useState, useEffect } from 'react';
import { MateriaEstado } from '@/types';
import { urgencia } from '@/lib/materias';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Plus, ChevronRight, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { playPopSound } from '@/lib/audioUtils';

interface Props {
  estado: MateriaEstado | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MateriaDetailModal({ estado, open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  useEffect(() => {
    if (open) setSelectedSub(null);
  }, [open]);

  if (!estado) return null;

  const { config, ultimaSessao, diasParada } = estado;
  const urg = urgencia(diasParada);

  const urgColors: Record<string, string> = {
    nova: 'text-muted-foreground',
    ok: 'text-emerald-500',
    atencao: 'text-amber-500',
    urgente: 'text-red-500',
  };

  const handleNewSession = () => {
    playPopSound();
    onOpenChange(false);
    let url = `/sessao/${config.slug}`;
    if (selectedSub) url += `?sub=${selectedSub}`;
    navigate(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">{config.nome}</DialogTitle>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl select-none">{config.emoji}</span>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{config.nome}</h2>
              <p className={cn('text-xs font-medium', urgColors[urg])}>
                {urg === 'nova' ? 'Nenhuma sessão ainda' :
                  urg === 'ok' ? `Estudada há ${diasParada}d` :
                  urg === 'atencao' ? `${diasParada}d sem estudar` :
                  `${diasParada}d parada`}
              </p>
            </div>
          </div>

          {/* Próximo tópico */}
          {ultimaSessao?.proximo_topico && (
            <div className="mt-2 px-3 py-2 rounded-xl bg-muted/50 border border-border">
              <p className="text-[12px] text-muted-foreground">Próximo</p>
              <p className="text-sm font-medium text-foreground mt-0.5">
                {ultimaSessao.proximo_topico}
              </p>
            </div>
          )}
        </div>

        {/* Sub-tópicos */}
        {config.subTopicos && config.subTopicos.length > 0 && (
          <div className="px-6 pb-2">
            <p className="text-[12px] font-medium text-muted-foreground mb-2">Foco (opcional):</p>
            <div className="flex flex-wrap gap-2">
              {config.subTopicos.map(sub => (
                <button
                  key={sub.slug}
                  onClick={() => setSelectedSub(selectedSub === sub.slug ? null : sub.slug)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors border",
                    selectedSub === sub.slug
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border hover:bg-muted"
                  )}
                >
                  {sub.nome}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Action */}
        <div className="px-4 py-3">
          <button
            onClick={handleNewSession}
            className={cn(
              'flex items-center gap-4 w-full p-4 rounded-2xl border',
              'bg-foreground/5 border-border',
              'hover:bg-foreground/10 transition-all active:scale-[0.98]'
            )}
          >
            <div className="bg-foreground/10 p-2.5 rounded-xl">
              <BookOpen className="w-5 h-5 text-foreground" />
            </div>
            <div className="text-left flex-1">
              <span className="block text-[15px] font-semibold text-foreground">Começar Sessão</span>
              <span className="block text-[12px] text-muted-foreground leading-tight mt-0.5">
                {ultimaSessao ? `Continua de: ${ultimaSessao.proximo_topico || ultimaSessao.topico}` : 'Primeira sessão nesta matéria'}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
