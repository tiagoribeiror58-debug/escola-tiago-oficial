import { useState, useEffect } from 'react';
import { MateriaEstado } from '@/types';
import { urgencia, getMateriaBySlug } from '@/lib/materias';
import { useSessoes } from '@/hooks/useSessoes';
import { useSessionMessages } from '@/hooks/useChatMessages';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, BookOpen, ChevronDown, ChevronUp, ArrowRight, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { playPopSound } from '@/lib/audioUtils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  estado: MateriaEstado | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}



export default function MateriaDetailModal({ estado, open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [expandedSession, setExpandedSession] = useState<number | null>(null);
  const { data: todasSessoes } = useSessoes();

  useEffect(() => {
    if (open) {
      setSelectedSub(null);
      setExpandedSession(null);
    }
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

  // Busca sessões desta matéria ordenadas desc
  const sessoesMateria = (todasSessoes || [])
    .filter(s => s.materia === config.slug)
    .sort((a, b) => new Date(b.created_at || b.data).getTime() - new Date(a.created_at || a.data).getTime());

  const handleNewSession = () => {
    playPopSound();
    onOpenChange(false);
    let url = `/sessao/${config.slug}`;
    if (selectedSub) url += `?sub=${encodeURIComponent(selectedSub)}`;
    navigate(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-2xl max-h-[90vh] flex flex-col">
        <DialogTitle className="sr-only">{config.nome}</DialogTitle>

        {/* Única área de scroll unificada — sem seções com shrink-0 competindo */}
        <div className="overflow-y-auto flex-1">

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

            {/* Introdução */}
            <div className="mb-4 text-sm text-muted-foreground/90 bg-muted/30 p-3 rounded-xl border border-border/50">
              <p className="line-clamp-3 hover:line-clamp-none transition-all cursor-default">
                {config.descricao || `Um caminho contínuo de evolução em ${config.nome}, onde você começará do absoluto zero e será guiado organicamente até a maestria avançada.`}
              </p>
            </div>

            {/* Tópico anterior + próximo */}
            {ultimaSessao && (
              <div className="flex gap-2">
                {ultimaSessao.topico && (
                  <div className="flex-1 px-3 py-2 rounded-xl bg-muted/30 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Anterior</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5 line-clamp-2">
                      {ultimaSessao.topico}
                    </p>
                  </div>
                )}
                {ultimaSessao.topico && ultimaSessao.proximo_topico && (
                  <div className="flex items-center shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </div>
                )}
                {ultimaSessao.proximo_topico && (
                  <div className="flex-1 px-3 py-2 rounded-xl bg-muted/50 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Próximo</p>
                    <p className="text-xs font-semibold text-foreground mt-0.5 line-clamp-2">
                      {ultimaSessao.proximo_topico}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ementa / Trilha */}
          {config.ementa && config.ementa.length > 0 && (
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Trilha de Conhecimento
                </p>
                <span className="text-[10px] font-medium bg-foreground/10 text-foreground px-2 py-0.5 rounded-full">
                  {Math.min(estado.totalSessoes, config.ementa.length)}/{config.ementa.length}
                </span>
              </div>
              <div className="space-y-1">
                {config.ementa.map((topico, idx) => {
                  const isCompleted = idx < estado.totalSessoes;
                  const isCurrent = idx === estado.totalSessoes;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedSub(selectedSub === topico ? null : topico)}
                      className={cn(
                        "flex items-center gap-3 text-sm w-full text-left p-2 rounded-xl transition-colors",
                        selectedSub === topico ? "bg-muted border border-border" : "hover:bg-muted/50 border border-transparent",
                        isCompleted && selectedSub !== topico ? "text-muted-foreground" : isCurrent || selectedSub === topico ? "text-foreground font-medium" : "text-muted-foreground/50"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center shrink-0 border text-[10px] transition-colors",
                        selectedSub === topico ? "bg-foreground text-background border-foreground shadow-sm" :
                        isCompleted ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" :
                        isCurrent ? "bg-primary/10 border-primary/30 text-primary" :
                        "bg-muted/50 border-border/50 text-muted-foreground/50"
                      )}>
                        {isCompleted && selectedSub !== topico ? "✓" : (idx + 1)}
                      </div>
                      <span className={cn(
                        "line-clamp-1 flex-1",
                        isCompleted && selectedSub !== topico && "line-through decoration-muted-foreground/30"
                      )}>
                        {topico}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sub-tópicos */}
          {config.subTopicos && config.subTopicos.length > 0 && (
            <div className="px-6 pb-4">
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

          {/* Action — CTA Começar Sessão */}
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
                <span className="block text-[15px] font-semibold text-foreground">
                  {selectedSub ? `Estudar: ${selectedSub.length > 30 ? selectedSub.slice(0, 30) + '…' : selectedSub}` : 'Começar Sessão'}
                </span>
                <span className="block text-[12px] text-muted-foreground leading-tight mt-0.5">
                  {ultimaSessao ? `Continua de: ${ultimaSessao.proximo_topico || ultimaSessao.topico}` : 'Primeira sessão nesta matéria'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Histórico de Sessões */}
          {sessoesMateria.length > 0 && (
            <>
              <div className="border-t border-border" />
              <div className="px-4 py-3 pb-6">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  Sessões anteriores
                </p>
                <div className="space-y-2">
                  {sessoesMateria.map(sessao => {
                    const hasChat = !!sessao.session_key;
                    return (
                      <SessaoItem
                        key={sessao.id}
                        sessao={sessao}
                        hasChat={hasChat}
                        isExpanded={expandedSession === sessao.id}
                        onToggle={() => {
                          if (hasChat) {
                            playPopSound();
                            setExpandedSession(expandedSession === sessao.id ? null : sessao.id);
                          }
                        }}
                        onOpenChat={() => {
                          playPopSound();
                          onOpenChange(false);
                          navigate(`/sessao/${config.slug}?resume=${sessao.session_key}`);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}

        </div> {/* fim do scroll unificado */}
      </DialogContent>
    </Dialog>
  );
}

// Componente separado para cada sessão — o hook lazy só dispara quando isExpanded=true
function SessaoItem({
  sessao,
  hasChat,
  isExpanded,
  onToggle,
  onOpenChat,
}: {
  sessao: { id: number; topico: string; created_at: string | null; data: string; session_key?: string | null };
  hasChat: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenChat: () => void;
}) {
  // BUG-03: só faz fetch quando o usuário expande (enabled = isExpanded)
  const { data: messages, isLoading } = useSessionMessages(isExpanded ? sessao.id : null);

  return (
    <div className="bg-muted/30 rounded-xl border border-border overflow-hidden">
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2.5",
          hasChat && "cursor-pointer hover:bg-muted/50 transition-colors"
        )}
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground truncate">{sessao.topico}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">
            {format(new Date(sessao.created_at || sessao.data), "d 'de' MMM", { locale: ptBR })}
          </p>
        </div>
        {hasChat && (
          <div className="text-muted-foreground shrink-0 ml-2">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        )}
      </div>

      {isExpanded && hasChat && (
        <div className="px-3 pb-3 pt-1 border-t border-border/50 bg-background/50">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
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
                      "px-3 py-2 rounded-xl text-[11px] max-w-[90%]",
                      msg.role === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}>
                      <p className="whitespace-pre-wrap">{cleanContent}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {sessao.session_key && (
            <button
              onClick={(e) => { e.stopPropagation(); onOpenChat(); }}
              className="mt-3 w-full py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground text-[11px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Abrir Tela Completa do Chat
            </button>
          )}
        </div>
      )}
    </div>
  );
}
