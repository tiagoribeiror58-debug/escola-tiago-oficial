import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isToday, isYesterday, isThisWeek, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSessoes } from '@/hooks/useSessoes';
import { useSessionMessages } from '@/hooks/useChatMessages';
import { getMateriaBySlug } from '@/lib/materias';
import { Sessao } from '@/types';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Loader2, Clock } from 'lucide-react';
import { playPopSound } from '@/lib/audioUtils';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HistoricoGlobalDrawer({ open, onOpenChange }: Props) {
  const { data: sessoes = [] } = useSessoes();
  const [expandedSession, setExpandedSession] = useState<number | null>(null);
  const navigate = useNavigate();

  // Ordena todas as sessões das mais recentes para as mais antigas
  const sessoesOrdenadas = [...sessoes].sort(
    (a, b) => new Date(b.created_at || b.data).getTime() - new Date(a.created_at || a.data).getTime()
  );

  // Função de agrupamento
  const groupedSessions = sessoesOrdenadas.reduce((acc, sessao) => {
    const dataSessao = new Date(sessao.created_at || sessao.data);
    let grupo = 'Anteriores';

    if (isToday(dataSessao)) {
      grupo = 'Hoje';
    } else if (isYesterday(dataSessao)) {
      grupo = 'Ontem';
    } else if (isThisWeek(dataSessao, { weekStartsOn: 0 })) { // Considerando domingo como inicio
      grupo = 'Últimos 7 dias';
    }

    if (!acc[grupo]) acc[grupo] = [];
    acc[grupo].push(sessao);
    return acc;
  }, {} as Record<string, Sessao[]>);

  const order = ['Hoje', 'Ontem', 'Últimos 7 dias', 'Anteriores'];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0 border-l border-border/50 bg-background/95 backdrop-blur-xl">
        <SheetHeader className="p-6 pb-2 sticky top-0 bg-background/95 backdrop-blur-xl z-20 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center border border-border/40">
              <Clock className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <SheetTitle className="text-xl font-semibold tracking-tight text-left">
                Histórico de Sessões
              </SheetTitle>
              <p className="text-xs text-muted-foreground mt-0.5 text-left">
                Todas as suas interações recentes
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-8">
          {sessoesOrdenadas.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">
              Nenhuma sessão encontrada.
            </p>
          ) : (
            order.map((grupo) => {
              const sess = groupedSessions[grupo];
              if (!sess || sess.length === 0) return null;

              return (
                <div key={grupo} className="space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                    {grupo}
                  </h3>
                  <div className="space-y-2">
                    {sess.map((sessao) => {
                      const materia = getMateriaBySlug(sessao.materia);
                      const hasChat = !!sessao.session_key;
                      const isExpanded = expandedSession === sessao.id;

                      return (
                        <div key={sessao.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:border-foreground/10 transition-colors">
                          <div
                            className={cn(
                              "flex items-start gap-3 p-3.5",
                              hasChat && "cursor-pointer hover:bg-muted/50 transition-colors"
                            )}
                            onClick={() => {
                              if (hasChat) {
                                playPopSound();
                                setExpandedSession(isExpanded ? null : sessao.id);
                              }
                            }}
                          >
                            <div className="w-10 h-10 shrink-0 bg-muted/50 rounded-lg flex items-center justify-center text-xl mt-0.5 border border-border/30">
                              {materia?.emoji || '📚'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
                                {sessao.topico}
                              </p>
                              <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-muted-foreground">
                                <span className="font-medium text-foreground/70 truncate">
                                  {materia?.nome || sessao.materia}
                                </span>
                                <span>•</span>
                                <span className="capitalize shrink-0">
                                  {format(new Date(sessao.created_at || sessao.data), "d MMM, HH:mm", { locale: ptBR })}
                                </span>
                              </div>
                            </div>
                            {hasChat && (
                              <div className="text-muted-foreground/50 shrink-0 mt-2 ml-1">
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            )}
                          </div>

                          {/* Expanded Chat View */}
                          {isExpanded && hasChat && (
                            <SessaoExpandedView 
                              sessaoId={sessao.id} 
                              sessionKey={sessao.session_key}
                              materiaSlug={sessao.materia}
                              onOpenChat={() => {
                                playPopSound();
                                onOpenChange(false);
                                navigate(`/sessao/${sessao.materia}?resume=${sessao.session_key}`);
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SessaoExpandedView({ 
  sessaoId, 
  sessionKey, 
  materiaSlug, 
  onOpenChat 
}: { 
  sessaoId: number, 
  sessionKey: string | null | undefined, 
  materiaSlug: string, 
  onOpenChat: () => void 
}) {
  const { data: messages, isLoading } = useSessionMessages(sessaoId);

  return (
    <div className="px-3.5 pb-3.5 pt-2 border-t border-border/50 bg-background/30">
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 mb-3 custom-scrollbar">
          {(messages || []).length === 0 && (
            <p className="text-[11px] text-muted-foreground text-center py-2">
              Nenhuma mensagem registrada.
            </p>
          )}
          {(messages || []).map((msg, idx) => {
            if (msg.role === 'system') return null;
            const cleanContent = msg.content.replace(/<[^>]+>/g, '').trim();
            if (!cleanContent) return null;
            return (
              <div key={idx} className={cn(
                "flex",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}>
                <div className={cn(
                  "px-3 py-2 rounded-xl text-[12px] max-w-[90%] shadow-sm",
                  msg.role === 'user'
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground"
                )}>
                  <p className="whitespace-pre-wrap leading-relaxed">{cleanContent}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {sessionKey && (
        <button
          onClick={(e) => { e.stopPropagation(); onOpenChat(); }}
          className="w-full py-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground text-[12px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-border/50"
        >
          Abrir Sessão Completa
        </button>
      )}
    </div>
  );
}
