import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, MateriaConfig, Sessao } from '@/types';
import { buildSystemPrompt, buildFirstMessage } from '@/lib/buildPrompt';
import { useSaveChatMessage } from '@/hooks/useChatMessages';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { ArrowUp, Loader2 } from 'lucide-react';

interface Props {
  materia: MateriaConfig;
  ultimaSessao: Sessao | null;
  onMessagesChange?: (messages: ChatMessage[]) => void;
  sessionKey: string;
  initialMessages?: ChatMessage[];
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export default function ChatWindow({ materia, ultimaSessao, onMessagesChange, sessionKey, initialMessages }: Props) {
  const systemPrompt = buildSystemPrompt(materia, ultimaSessao);
  const firstMsg = buildFirstMessage(materia, ultimaSessao);
  const saveMutation = useSaveChatMessage();

  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages && initialMessages.length > 0
      ? initialMessages
      : [{ role: 'assistant', content: firstMsg }]
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const savedInitial = useRef(false);

  // Save the initial assistant message if it's a new session
  useEffect(() => {
    if (!savedInitial.current && (!initialMessages || initialMessages.length === 0)) {
      savedInitial.current = true;
      saveMutation.mutate({
        sessao_materia: materia.slug,
        session_key: sessionKey,
        role: 'assistant',
        content: firstMsg,
      });
    } else {
      savedInitial.current = true;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    onMessagesChange?.(messages);
  }, [messages, onMessagesChange]);

  const autoResize = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 128) + 'px';
  }, []);

  useEffect(() => {
    autoResize();
  }, [input, autoResize]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Save user message to DB
    saveMutation.mutate({
      sessao_materia: materia.slug,
      session_key: sessionKey,
      role: 'user',
      content: text,
    });

    let assistantContent = '';

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages, systemPrompt }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error('Stream failed');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant' && prev.length > newMessages.length) {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return [...prev.slice(0, newMessages.length), { role: 'assistant', content: assistantContent }];
              });
            }
          } catch {
            // partial JSON, wait for more
          }
        }
      }

      if (!assistantContent) {
        throw new Error('No response received');
      }

      // Save assistant message to DB
      saveMutation.mutate({
        sessao_materia: materia.slug,
        session_key: sessionKey,
        role: 'assistant',
        content: assistantContent,
      });
    } catch {
      const errorMsg = 'Desculpe, houve um erro. Tente novamente.';
      setMessages(prev => {
        const filtered = prev.filter((_, i) => i < newMessages.length);
        return [...filtered, { role: 'assistant', content: errorMsg }];
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading, messages, systemPrompt, materia.slug, sessionKey, saveMutation]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'max-w-[85%] text-sm leading-relaxed animate-in fade-in-0 slide-in-from-bottom-2 duration-300',
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

        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex items-center gap-2 py-2 text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span className="text-xs">Pensando...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

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
              'transition-all duration-150'
            )}
            style={{ minHeight: '40px', maxHeight: '128px' }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || isLoading}
            className={cn(
              'flex items-center justify-center w-9 h-9 rounded-full shrink-0',
              'bg-foreground text-background transition-all',
              'disabled:opacity-30 disabled:scale-95',
              'hover:opacity-80 active:scale-95'
            )}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground/40 text-center mt-1.5">
          Enter para enviar · Shift+Enter para quebra de linha
        </p>
      </div>
    </div>
  );
}
