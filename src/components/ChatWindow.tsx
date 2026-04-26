import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, MateriaConfig, Sessao } from '@/types';
import { buildSystemPrompt } from '@/lib/buildPrompt';
import { useSaveChatMessage } from '@/hooks/useChatMessages';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { ArrowUp, Loader2, Zap, ZapOff, History } from 'lucide-react';
import { playPopSound, playThinkingDoneSound } from '@/lib/audioUtils';

interface Props {
  materia: MateriaConfig;
  ultimaSessao: Sessao | null;
  onMessagesChange?: (messages: ChatMessage[]) => void;
  onTopicComplete?: () => void;
  sessionKey: string;
  initialMessages?: ChatMessage[];   // retomada real (resume)
  historyMessages?: ChatMessage[];   // histórico anterior (display-only, contexto visual)
  sub?: string | null;
  modo?: string | null;
  sessoesRecentes?: Sessao[];
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export default function ChatWindow({ materia, ultimaSessao, onMessagesChange, onTopicComplete, sessionKey, initialMessages, historyMessages, sub, modo, sessoesRecentes }: Props) {
  const isContinuation = !!(initialMessages && initialMessages.length > 0);
  const systemPrompt = buildSystemPrompt(materia, ultimaSessao, isContinuation, sub, modo, sessoesRecentes);
  const saveMutation = useSaveChatMessage();

  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages && initialMessages.length > 0
      ? initialMessages
      : []
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chipsEnabled, setChipsEnabled] = useState(true);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  const handleSend = useCallback(async (textToSubmit?: string, isSilentTrigger = false) => {
    const text = typeof textToSubmit === 'string' ? textToSubmit.trim() : input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    
    // Se for silent, não adiciona a mensagem do usuário no state, mas manda pra IA
    const newMessagesForAI = [...messages, userMsg];
    
    if (!isSilentTrigger) {
      setMessages(newMessagesForAI);
      setInput('');
      
      // Save user message to DB
      saveMutation.mutate({
        sessao_materia: materia.slug,
        session_key: sessionKey,
        role: 'user',
        content: text,
      });
    }

    setIsLoading(true);

    let assistantContent = '';
    const messageId = Math.random().toString(36).substring(7);

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: newMessagesForAI.map(({ role, content }) => ({ role, content })), 
          systemPrompt 
        }),
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
            let delta = '';
            
            // Suporte OpenAI
            if (parsed.choices?.[0]?.delta?.content) {
              delta = parsed.choices[0].delta.content;
            }
            
            // Suporte para Anthropic Claude Stream & Thinking
            if (parsed.type === 'content_block_start') {
              if (parsed.content_block?.type === 'thinking' || parsed.content_block?.type === 'redacted_thinking') {
                delta = '<details><summary>Raciocínio da IA</summary>\n\n';
              }
            } else if (parsed.type === 'content_block_delta') {
              if (parsed.delta?.type === 'text_delta') {
                delta = parsed.delta.text;
              } else if (parsed.delta?.type === 'thinking_delta') {
                delta = parsed.delta.thinking;
              }
            } else if (parsed.type === 'content_block_stop') {
              if (parsed.index === 0 && assistantContent.includes('<details')) {
                delta = '\n\n</details>\n\n';
                playThinkingDoneSound(); // Sound effect when thinking finishes
              }
            }

            if (delta) {
              assistantContent += delta;
              
              // Evitamos closures instáveis guardando o conteúdo atual
              const currentContent = assistantContent; 
              
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.id === messageId) {
                  // Se a última mensagem for a nossa mensagem da stream atual, atualiza o conteúdo
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: currentContent } : m);
                } else {
                  // Se não for, cria a nova mensagem usando o messageId único
                  return [...prev, { id: messageId, role: 'assistant', content: currentContent }];
                }
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

      // Detect session_done signal — strips tag and notifies parent
      if (assistantContent.includes('<session_done/>')) {
        assistantContent = assistantContent.replace(/<session_done\/>/gi, '').trimEnd();
        setMessages(prev => prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, content: assistantContent } : m
        ));
        onTopicComplete?.();
      }

      // Detect mastery_passed signal
      if (assistantContent.includes('<mastery_passed/>')) {
        assistantContent = assistantContent.replace(/<mastery_passed\/>/gi, '').trimEnd();
        setMessages(prev => prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, content: assistantContent } : m
        ));
        onTopicComplete?.();
      }

      const contentToSave = assistantContent
        .replace(/<details[\s\S]*?<\/details>/ig, '')
        .replace(/<chips>[\s\S]*?(?:<\/chips>|$)/ig, '')
        .trim();

      // Save assistant message to DB
      saveMutation.mutate({
        sessao_materia: materia.slug,
        session_key: sessionKey,
        role: 'assistant',
        content: contentToSave,
      });
    } catch (e) {
      console.error(e);
      const errorMsg = 'Desculpe, houve um erro. Tente novamente.';
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.id === messageId) {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: errorMsg } : m);
        } else {
          return [...prev, { id: messageId, role: 'assistant', content: errorMsg }];
        }
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading, messages, systemPrompt, materia.slug, sessionKey, saveMutation]);

  // Auto-start removido: o agente só fala quando o usuário escrever primeiro.
  // O contexto da sessão anterior já está no systemPrompt (tópico, próximo tópico).

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasHistory = !!(historyMessages && historyMessages.length > 0);
  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Histórico da sessão anterior — display-only, não vai para IA */}
        {hasHistory && (
          <div className="mb-2">
            <button
              onClick={() => setHistoryExpanded(v => !v)}
              className="flex items-center gap-2 w-full py-2 px-3 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <History className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
              <span className="text-[11px] text-muted-foreground/70 font-medium flex-1 text-left">
                {historyExpanded ? 'Ocultar histórico anterior' : `Ver sessão anterior (${historyMessages!.filter(m => m.role !== 'system').length} mensagens)`}
              </span>
              <span className="text-[10px] text-muted-foreground/40">{historyExpanded ? '▲' : '▼'}</span>
            </button>

            {historyExpanded && (
              <div className="mt-2 space-y-3 max-h-[40vh] overflow-y-auto pr-1 py-2">
                {historyMessages!.filter(m => m.role !== 'system').map((msg, i) => {
                  const cleanContent = msg.content.replace(/<[^>]+>/g, '').trim();
                  if (!cleanContent) return null;
                  return (
                    <div key={i} className={cn('flex opacity-60', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                      <div className={cn(
                        'px-3 py-2 rounded-xl text-[11px] max-w-[85%]',
                        msg.role === 'user'
                          ? 'bg-foreground/20 text-foreground rounded-br-sm'
                          : 'bg-muted/50 text-muted-foreground'
                      )}>
                        <p className="whitespace-pre-wrap">{cleanContent}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Separador: divide histórico da conversa nova */}
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-[10px] text-muted-foreground/50 font-medium uppercase tracking-widest px-2">Nova conversa</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>
          </div>
        )}

        {/* Estado vazio: instrução para o usuário começar */}
        {!hasMessages && !isLoading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
            <span className="text-3xl select-none">{materia.emoji}</span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {ultimaSessao
                  ? `Retomando ${materia.nome}`
                  : `Bem-vindo a ${materia.nome}`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {ultimaSessao?.proximo_topico
                  ? `Próximo: ${ultimaSessao.proximo_topico}`
                  : 'Escreva qualquer coisa para começar'}
              </p>
            </div>
            <p className="text-[11px] text-muted-foreground/50 mt-2">↓ O professor responde quando você escrever</p>
          </div>
        )}

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
            {msg.role === 'assistant' ? (() => {
              const contentWithoutChips = msg.content.replace(/<chips>[\s\S]*?(?:<\/chips>|$)/ig, '');
              
              // Handle both closed and unclosed details tags (for streaming)
              const thinkingMatch = contentWithoutChips.match(/<details><summary>Raciocínio da IA<\/summary>([\s\S]*?)(?:<\/details>|$)/i);
              const hasThinking = !!thinkingMatch;
              const thinkingContent = hasThinking ? thinkingMatch[1].trim() : '';
              
              // Main content is everything after the thinking block (if closed), or empty if still thinking
              const mainContent = contentWithoutChips.replace(/<details><summary>Raciocínio da IA<\/summary>[\s\S]*?(?:<\/details>|$)/i, '').trim();

              return (
                <div className="space-y-3">
                  {hasThinking && (
                    <details className="mb-4 text-[11px] text-muted-foreground bg-muted/30 border border-border p-3 rounded-xl open:pb-4">
                      <summary className="cursor-pointer font-medium opacity-80 hover:opacity-100 outline-none">
                        Raciocínio da IA (Pensando...)
                      </summary>
                      <div className="mt-3 whitespace-pre-wrap font-mono leading-relaxed opacity-70">
                        {thinkingContent}
                      </div>
                    </details>
                  )}
                  {mainContent && (
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 whitespace-pre-wrap break-words">
                      <ReactMarkdown>{mainContent}</ReactMarkdown>
                    </div>
                  )}
                </div>
              );
            })() : (
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
        <div className="flex items-end gap-2 max-w-3xl mx-auto flex-col w-full">
          {/* Quick Action Chips + Toggle */}
          {!isLoading && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (() => {
            const lastMsg = messages[messages.length - 1];
            const match = lastMsg.content.match(/<chips>([\s\S]*?)<\/chips>/i);
            const dynamicChips = match ? match[1].split('|').map(c => c.trim()).filter(Boolean) : [];
            if (dynamicChips.length === 0 && !chipsEnabled) return null;
            return (
              <div className="flex items-center gap-2 mb-2 w-full">
                {/* Chips visíveis apenas se enabled */}
                {chipsEnabled && (
                  <div className="flex flex-wrap gap-2 flex-1">
                    {dynamicChips.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playPopSound();
                          handleSend(action);
                        }}
                        className="text-[11px] md:text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-colors active:scale-95"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
                {!chipsEnabled && <div className="flex-1" />}
                {/* Toggle button */}
                <button
                  onClick={() => setChipsEnabled(v => !v)}
                  title={chipsEnabled ? 'Desativar sugestões' : 'Ativar sugestões'}
                  className="shrink-0 p-1.5 rounded-lg text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted transition-colors"
                >
                  {chipsEnabled
                    ? <Zap className="w-3.5 h-3.5" />
                    : <ZapOff className="w-3.5 h-3.5" />
                  }
                </button>
              </div>
            );
          })()}

          <div className="flex items-end gap-2 w-full">
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
              onClick={() => {
                playPopSound();
                handleSend();
              }}
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
        </div>
        <p className="text-[10px] text-muted-foreground/40 text-center mt-1.5">
          Enter para enviar · Shift+Enter para quebra de linha
        </p>
      </div>
    </div>
  );
}
