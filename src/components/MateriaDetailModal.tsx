import { useState, useEffect } from 'react';
import { MateriaEstado, ChatMessage } from '@/types';
import { urgencia, getMateriaBySlug } from '@/lib/materias';
import { useSessoes } from '@/hooks/useSessoes';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, BookOpen, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
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
  const { data: todasSessoes } = useSessoes();

  useEffect(() => {
    if (open) {
      setSelectedSub(null);
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
    if (selectedSub) url += `?sub=${selectedSub}`;
    navigate(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-2xl max-h-[90vh] flex flex-col">
        <DialogTitle className="sr-only">{config.nome}</DialogTitle>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 shrink-0">
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

          {/* Introdução / Contexto */}
          {config.contexto && (
            <div className="mb-4 text-sm text-muted-foreground/90 bg-muted/30 p-3 rounded-xl border border-border/50">
              <p className="line-clamp-3 hover:line-clamp-none transition-all cursor-default">
                {config.contexto}
              </p>
            </div>
          )}

          {/* Tópico anterior + próximo */}
          {ultimaSessao && (
            <div className="flex gap-2">
              {/* Anterior */}
              {ultimaSessao.topico && (
                <div className="flex-1 px-3 py-2 rounded-xl bg-muted/30 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Anterior</p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5 line-clamp-2">
                    {ultimaSessao.topico}
                  </p>
                </div>
              )}
              {/* Seta */}
              {ultimaSessao.topico && ultimaSessao.proximo_topico && (
                <div className="flex items-center shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                </div>
              )}
              {/* Próximo */}
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

        {/* Sub-tópicos */}
        {config.subTopicos && config.subTopicos.length > 0 && (
          <div className="px-6 pb-2 shrink-0">
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
        <div className="border-t border-border shrink-0" />

        {/* Action */}
        <div className="px-4 py-3 shrink-0">
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

        {/* Histórico de Sessões */}
        {sessoesMateria.length > 0 && (
          <>
            <div className="border-t border-border shrink-0" />
            <div className="px-4 py-3 overflow-y-auto">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                Sessões anteriores
              </p>
              <div className="space-y-2">
                {sessoesMateria.map(sessao => {
                  const hasChat = sessao.messages_json && sessao.messages_json.length > 0;
                  return (
                    <div
                      key={sessao.id}
                      className="bg-muted/30 rounded-xl border border-border overflow-hidden"
                    >
                      <div
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5",
                          hasChat && sessao.session_key && "cursor-pointer hover:bg-muted/50 transition-colors"
                        )}
                        onClick={() => {
                          if (hasChat && sessao.session_key) {
                            playPopSound();
                            onOpenChange(false);
                            navigate(`/sessao/${config.slug}?resume=${sessao.session_key}`);
                          }
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{sessao.topico}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">
                            {format(new Date(sessao.created_at || sessao.data), "d 'de' MMM", { locale: ptBR })}
                          </p>
                        </div>
                        {hasChat && sessao.session_key && (
                          <div className="text-muted-foreground shrink-0 ml-2">
                            <span className="text-[10px] font-medium px-2 py-1 bg-background rounded-md border border-border">
                              Abrir Conversa
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
