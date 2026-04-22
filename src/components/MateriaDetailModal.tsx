import { useState, useEffect } from 'react';
import { MateriaEstado, Sessao } from '@/types';
import { urgencia } from '@/lib/materias';
import { useChatSessions } from '@/hooks/useChatMessages';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Plus, MessageSquare, ChevronRight, BookOpen, BrainCircuit } from 'lucide-react';
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
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSelectedSub(null);
    }
  }, [open]);

  if (!estado) return null;

  const { config, ultimaSessao, totalSessoes, diasParada } = estado;
  const urg = urgencia(diasParada);

  const urgColors: Record<string, string> = {
    nova: 'text-muted-foreground',
    ok: 'text-emerald-500',
    atencao: 'text-amber-500',
    urgente: 'text-red-500',
  };

  const handleNewSession = (mode: 'estudar' | 'revisar') => {
    onOpenChange(false);
    let url = `/sessao/${config.slug}?mode=${mode}`;
    if (selectedSub) {
      url += `&sub=${selectedSub}`;
    }
    navigate(url);
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

          {/* Progresso narrativo */}
          {ultimaSessao && (
            <div className="flex items-center gap-2 mb-1">
              <span className={cn(
                'text-[11px] font-medium px-2.5 py-1 rounded-full',
                urg === 'ok' ? 'bg-emerald-500/10 text-emerald-500' :
                urg === 'atencao' ? 'bg-amber-500/10 text-amber-500' :
                'bg-red-500/10 text-red-500'
              )}>
                {ultimaSessao.nivel === 3 ? 'Conhecimento sólido' :
                 ultimaSessao.nivel === 2 ? 'Avançando' :
                 'Iniciando'}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {totalSessoes} {totalSessoes === 1 ? 'sessão' : 'sessões'}
              </span>
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

        {/* Sub-tópicos */}
        {config.subTopicos && config.subTopicos.length > 0 && (
          <div className="px-6 pb-2">
            <p className="text-[12px] font-medium text-muted-foreground mb-2">Eixo de foco (Opcional):</p>
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

        {/* Actions */}
        <div className="px-4 py-3">
          {/* New session button */}
          {/* Start Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNewSession('estudar')}
              className={cn(
                'flex flex-col items-center justify-center gap-2 p-3 rounded-xl',
                'bg-foreground text-background',
                'hover:opacity-90 transition-all active:scale-[0.98]'
              )}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[13px] font-semibold">Estudar Novo</span>
              <span className="text-[10px] text-background/70 leading-tight">Avançar conteúdo</span>
            </button>
            <button
              onClick={() => handleNewSession('revisar')}
              className={cn(
                'flex flex-col items-center justify-center gap-2 p-3 rounded-xl',
                'bg-muted/50 text-foreground',
                'hover:bg-muted transition-all active:scale-[0.98]'
              )}
            >
              <BrainCircuit className="w-5 h-5 text-emerald-500" />
              <span className="text-[13px] font-semibold">Revisar</span>
              <span className="text-[10px] text-muted-foreground leading-tight">Retrieval practice</span>
            </button>
          </div>

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
