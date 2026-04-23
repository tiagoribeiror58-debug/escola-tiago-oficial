import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSessoes } from '@/hooks/useSessoes';
import { getMateriaBySlug } from '@/lib/materias';
import { ChatMessage } from '@/types';
import { ArrowLeft, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function ChatBubbles({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="mt-3 space-y-2 max-h-96 overflow-y-auto pr-1">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={cn(
            'flex',
            msg.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          <div className={cn(
            'max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed',
            msg.role === 'user'
              ? 'bg-foreground text-background rounded-br-sm'
              : 'bg-muted text-foreground rounded-bl-sm'
          )}>
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Historico() {
  const { materia: slug } = useParams<{ materia: string }>();
  const navigate = useNavigate();
  const { data: sessoes, isLoading } = useSessoes();
  const materiaConfig = getMateriaBySlug(slug || '');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (!materiaConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Matéria não encontrada.</p>
      </div>
    );
  }

  const sessoesMateria = (sessoes || [])
    .filter(s => s.materia === slug)
    .sort((a, b) => new Date(b.created_at || b.data).getTime() - new Date(a.created_at || a.data).getTime());

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center gap-3 px-4 py-4 border-b border-border bg-card sticky top-0 z-10">
        <button
          onClick={() => navigate('/')}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-semibold flex items-center gap-2">
            <span className="text-xl leading-none">{materiaConfig.emoji}</span>
            {materiaConfig.nome}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {sessoesMateria.length} {sessoesMateria.length === 1 ? 'sessão' : 'sessões'}
          </p>
        </div>
      </header>

      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          </div>
        ) : sessoesMateria.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
            <Clock className="w-8 h-8 mb-3 opacity-20" />
            <p>Nenhuma sessão salva ainda.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessoesMateria.map((sessao) => {
              const isExpanded = expandedId === sessao.id;
              const hasChat = sessao.messages_json && sessao.messages_json.length > 0;

              return (
                <div
                  key={sessao.id}
                  className="bg-card border border-border rounded-xl overflow-hidden transition-colors hover:border-foreground/20"
                >
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-foreground">{sessao.topico}</h3>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">
                          {format(new Date(sessao.created_at || sessao.data), "eeee, d 'de' MMMM", { locale: ptBR })}
                        </p>
                      </div>
                      {hasChat && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : sessao.id)}
                          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted px-2.5 py-1.5 rounded-lg transition-colors shrink-0"
                        >
                          {isExpanded ? (
                            <>Fechar <ChevronUp className="w-3.5 h-3.5" /></>
                          ) : (
                            <>Ver conversa <ChevronDown className="w-3.5 h-3.5" /></>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {isExpanded && hasChat && (
                    <div className="border-t border-border px-4 pb-4">
                      <ChatBubbles messages={sessao.messages_json as ChatMessage[]} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
