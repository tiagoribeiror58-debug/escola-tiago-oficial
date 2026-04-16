import { MateriaEstado, Sessao } from '@/types';
import { urgencia } from '@/lib/materias';
import { useChatSessions } from '@/hooks/useChatMessages';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Plus, MessageSquare, Clock, TrendingUp, AlertTriangle, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface Props {
  estado: MateriaEstado | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MateriaDetailModal({ estado, open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const materia = estado?.config.slug || '';
  const { data: chatSessions, isLoading } = useChatSessions(materia);

  if (!estado) return null;

  const { config, ultimaSessao, totalSessoes, diasParada } = estado;
  const urg = urgencia(diasParada);

  const urgColors: Record<string, string> = {
    nova: 'text-muted-foreground',
    ok: 'text-emerald-500',
    atencao: 'text-amber-500',
    urgente: 'text-red-500',
  };

  const handleNewSession = () => {
    onOpenChange(false);
    navigate(`/sessao/${config.slug}`);
  };

  const handleResumeSession = (sessionKey: string) => {
    onOpenChange(false);
    navigate(`/sessao/${config.slug}?resume=${sessionKey}`);
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
                  urg === 'ok' ? `Estudada há ${diasParada}d — em dia ✓` :
                  urg === 'atencao' ? `${diasParada}d sem estudar — retome!` :
                  `${diasParada}d parada — urgente!`}
              </p>
            </div>
          </div>

          {/* Stats row */}
          {ultimaSessao && (
            <div className="grid grid-cols-3 gap-2 mb-1">
              <div className="flex flex-col items-center py-2 rounded-xl bg-muted/50">
                <span className="text-base font-semibold">{totalSessoes}</span>
                <span className="text-[10px] text-muted-foreground">sessões</span>
              </div>
              <div className="flex flex-col items-center py-2 rounded-xl bg-muted/50">
                <span className="text-base font-semibold">{ultimaSessao.nivel || 1}/3</span>
                <span className="text-[10px] text-muted-foreground">nível</span>
              </div>
              <div className="flex flex-col items-center py-2 rounded-xl bg-muted/50">
                <span className="text-base font-semibold">{ultimaSessao.erros ?? 0}</span>
                <span className="text-[10px] text-muted-foreground">erros (últ.)</span>
              </div>
            </div>
          )}

          {/* Context info */}
          {ultimaSessao && (
            <div className="mt-3 space-y-1.5 text-[13px]">
              {ultimaSessao.topico && (
                <p className="text-muted-foreground">
                  Último tópico: <span className="text-foreground font-medium">{ultimaSessao.topico}</span>
                </p>
              )}
              {ultimaSessao.proximo_topico && (
                <p className="text-muted-foreground">
                  Próximo: <span className="text-foreground font-medium">{ultimaSessao.proximo_topico}</span>
                </p>
              )}
              {ultimaSessao.observacoes && (
                <p className="text-muted-foreground text-[12px] italic">
                  "{ultimaSessao.observacoes}"
                </p>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Actions */}
        <div className="px-4 py-3">
          {/* New session button */}
          <button
            onClick={handleNewSession}
            className={cn(
              'flex items-center gap-3 w-full px-4 py-3 rounded-xl',
              'bg-foreground text-background',
              'hover:opacity-90 transition-all active:scale-[0.98]',
              'text-sm font-medium'
            )}
          >
            <Plus className="w-4 h-4" />
            <span className="flex-1 text-left">Nova sessão</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>

          {/* Chat history */}
          {chatSessions && chatSessions.length > 0 && (
            <div className="mt-3">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-2 px-1">
                Conversas em aberto
              </p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {chatSessions.slice(0, 5).map(session => (
                  <button
                    key={session.key}
                    onClick={() => handleResumeSession(session.key)}
                    className={cn(
                      'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl',
                      'bg-muted/50 hover:bg-muted transition-colors',
                      'text-left group'
                    )}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{session.lastMsg || 'Conversa...'}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {session.messageCount} msgs · {new Date(session.startedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center py-4">
              <div className="w-4 h-4 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
