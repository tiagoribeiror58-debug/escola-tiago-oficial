import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, MateriaConfig, Sessao } from '@/types';
import { buildSystemPrompt, buildFirstMessage } from '@/lib/buildPrompt';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';

interface Props {
  materia: MateriaConfig;
  ultimaSessao: Sessao | null;
  onMessagesChange?: (messages: ChatMessage[]) => void;
}

/**
 * ============================================================
 * INTEGRAÇÃO COM ANTHROPIC API
 * ============================================================
 * Para conectar a API real, substitua a função `sendToAPI` abaixo.
 * Ela recebe o array de mensagens e o system prompt,
 * e deve retornar um ReadableStream ou string com a resposta.
 * 
 * Exemplo com Edge Function:
 * 
 * async function sendToAPI(messages: ChatMessage[], systemPrompt: string) {
 *   const res = await fetch(`https://nzfhsjmcbsigwhxzwfov.supabase.co/functions/v1/chat`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ messages, systemPrompt }),
 *   });
 *   return res.body; // ReadableStream para streaming
 * }
 * ============================================================
 */

// MOCK: simula resposta do professor
async function sendToAPI(_messages: ChatMessage[], _systemPrompt: string): Promise<string> {
  await new Promise(r => setTimeout(r, 800));
  const respostas = [
    'Boa pergunta! Vamos pensar juntos sobre isso.',
    'Exatamente! Você está no caminho certo. Agora tente resolver este próximo exercício.',
    'Hmm, não é bem assim. Veja: o conceito principal aqui é...',
    'Ótimo progresso, Tiago! Vamos para o próximo nível.',
    'Pense assim: se A implica B, e B implica C, então...',
  ];
  return respostas[Math.floor(Math.random() * respostas.length)];
}

export default function ChatWindow({ materia, ultimaSessao, onMessagesChange }: Props) {
  const systemPrompt = buildSystemPrompt(materia, ultimaSessao);
  const firstMsg = buildFirstMessage(materia, ultimaSessao);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: firstMsg },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    onMessagesChange?.(messages);
  }, [messages, onMessagesChange]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendToAPI(newMessages, systemPrompt);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, houve um erro. Tente novamente.' }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading, messages, systemPrompt]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'max-w-[85%] text-sm leading-relaxed',
              msg.role === 'user'
                ? 'ml-auto bg-foreground text-background rounded-2xl rounded-br-md px-4 py-2.5'
                : 'text-foreground'
            )}
          >
            {msg.role === 'assistant' ? (
              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ) : (
              msg.content
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-1 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2 max-w-3xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreva sua resposta..."
            rows={1}
            className={cn(
              'flex-1 resize-none bg-muted/50 rounded-xl px-4 py-2.5 text-sm',
              'placeholder:text-muted-foreground/50',
              'focus:outline-none focus:ring-1 focus:ring-ring',
              'max-h-32'
            )}
            style={{ minHeight: '40px' }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || isLoading}
            className={cn(
              'flex items-center justify-center w-9 h-9 rounded-full',
              'bg-foreground text-background transition-opacity',
              'disabled:opacity-30',
              'hover:opacity-80'
            )}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
