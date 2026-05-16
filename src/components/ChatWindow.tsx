import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, MateriaConfig, Sessao } from '@/types';
import { buildSystemPrompt } from '@/lib/buildPrompt';
import { useSaveChatMessage } from '@/hooks/useChatMessages';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { ArrowUp, Loader2, Zap, ZapOff, History, Volume2, VolumeX, Music2 } from 'lucide-react';
import { playPopSound, playThinkingDoneSound, playSuccessSound } from '@/lib/audioUtils';
import confetti from 'canvas-confetti';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

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
  ementaConcluida?: string[];        // tópicos já concluídos (fonte de verdade do progresso)
  sessoesRecentes?: Sessao[];        // histórico de performance para a IA calibrar
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export default function ChatWindow({ materia, ultimaSessao, onMessagesChange, onTopicComplete, sessionKey, initialMessages, historyMessages, sub, modo, ementaConcluida, sessoesRecentes }: Props) {
  const isContinuation = initialMessages !== undefined;
  const systemPrompt = buildSystemPrompt(materia, ultimaSessao, isContinuation, sub, modo, ementaConcluida, sessoesRecentes);
  const saveMutation = useSaveChatMessage();

  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages || []
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chipsEnabled, setChipsEnabled] = useState(true);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const autoStartFiredRef = useRef(false); // guard contra double auto-start (StrictMode)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [ttsRate, setTtsRate] = useState(1.0);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);



  // Para o áudio TTS ao desmontar o componente
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Initialize ambient music player
  useEffect(() => {
    const audio = new Audio('/ruido-branco.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    musicRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Remove markdown antes de enviar ao TTS
  const stripMarkdown = (text: string) =>
    text
      .replace(/```[\s\S]*?```/g, 'bloco de código.')
      .replace(/`[^`]+`/g, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/__(.+?)__/g, '$1')
      .replace(/_(.+?)_/g, '$1')
      .replace(/#{1,6}\s+/g, '')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
      .replace(/>\s*/g, '')
      .replace(/^[-*+]\s+/gm, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{2,}/g, '. ')
      .replace(/\n/g, ' ')
      .trim();

  // TTS via Google Cloud Neural2 (Edge Function /tts)
  // Substitui a Web Speech API do navegador por voz neural real em pt-BR.
  const toggleTTS = async (text: string) => {
    // Se já está tocando, para
    if (isSpeaking) {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.src = '';
      setIsSpeaking(false);
      return;
    }

    setIsTtsLoading(true);
    try {
      const clean = stripMarkdown(text);
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: clean, speed: ttsRate }),
        }
      );
      if (!resp.ok) throw new Error('TTS request failed');
      const { audioContent } = await resp.json();
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      audioRef.current = audio;
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      audio.play();
    } catch (err) {
      console.error('TTS error:', err);
      setIsSpeaking(false);
    } finally {
      setIsTtsLoading(false);
    }
  };

  const toggleMusic = () => {
    if (!musicRef.current) return;
    if (isMusicPlaying) {
      musicRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      musicRef.current.play().catch(() => {});
      setIsMusicPlaying(true);
    }
  };

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

  // Focus input on mount for better UX
  useEffect(() => {
    if (window.innerWidth > 768) {
      inputRef.current?.focus();
    }
  }, []);

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
          // Enviamos o histórico completo da sessão atual.
          // Cada sessão cobre 1 micro-tópico — o histórico não cresce o suficiente para ser problema.
          // Janela deslizante removida: a IA nunca perde contexto de nada que foi dito nesta sessão.
          messages: newMessagesForAI.map(({ role, content }) => ({ role, content })), 
          systemPrompt 
        }),
      });

      if (!resp.ok || !resp.body) {
        const errorText = await resp.text();
        console.error("Stream failed with response:", errorText);
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
            
            // Detecta erros embutidos no stream do Anthropic (ex: overloaded_error)
            // A Anthropic às vezes retorna HTTP 200 mas embute o erro no próprio stream SSE.
            if (parsed.type === 'error') {
              const errType = parsed.error?.type || '';
              if (errType === 'overloaded_error') {
                throw new Error('OVERLOADED');
              }
              throw new Error(parsed.error?.message || 'Stream error');
            }
            
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
          } catch (streamErr) {
            // Re-lança erros conhecidos (overloaded, stream error)
            if (streamErr instanceof Error && (streamErr.message === 'OVERLOADED' || streamErr.message !== 'partial JSON')) {
              throw streamErr;
            }
            // Ignora JSON parcial (aguarda mais dados)
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
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#3b82f6', '#eab308'],
          disableForReducedMotion: true
        });
        playSuccessSound();
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
      const isOverloaded = e instanceof Error && e.message === 'OVERLOADED';
      const errorMsg = isOverloaded
        ? '⏳ Os servidores da IA estão sobrecarregados agora. Aguarde alguns segundos e tente novamente.'
        : 'Desculpe, houve um erro. Tente novamente.';
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

  // Auto-start: dispara apenas em sessões NOVAS (não resume).
  // isContinuation é true quando há resumeKey — nesses casos o usuário escolhe quando começar.
  useEffect(() => {
    if (isContinuation || autoStartFiredRef.current) return;
    autoStartFiredRef.current = true;
    handleSend('Inicie a sessão.', true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intencional: dispara só no mount

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
      <div className="flex-1 overflow-y-auto w-full">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 w-full">

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
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 whitespace-pre-wrap break-words relative group">
                      <button 
                        onClick={() => toggleTTS(mainContent)}
                        disabled={isTtsLoading}
                        className={cn(
                          'absolute -right-2 -top-2 p-1.5 rounded-md bg-background/80 transition-opacity hover:text-foreground',
                          isSpeaking || isTtsLoading
                            ? 'opacity-100 text-primary'
                            : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                        )}
                        title={isSpeaking ? 'Pausar narração' : isTtsLoading ? 'Gerando áudio...' : 'Ouvir com voz neural'}
                      >
                        {isTtsLoading
                          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          : isSpeaking
                          ? <VolumeX className="w-3.5 h-3.5" />
                          : <Volume2 className="w-3.5 h-3.5" />
                        }
                      </button>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Tabelas — renderizadas como card com bordas e hover
                          table: ({ children }) => (
                            <div className="overflow-x-auto my-3 rounded-xl border border-border/50 bg-muted/20">
                              <table className="w-full text-xs border-collapse">{children}</table>
                            </div>
                          ),
                          thead: ({ children }) => (
                            <thead className="bg-muted/50 border-b border-border/50">{children}</thead>
                          ),
                          tbody: ({ children }) => (
                            <tbody>{children}</tbody>
                          ),
                          tr: ({ children }) => (
                            <tr className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">{children}</tr>
                          ),
                          th: ({ children }) => (
                            <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-foreground/80 tracking-wide uppercase">{children}</th>
                          ),
                          td: ({ children }) => (
                            <td className="px-3 py-2 text-foreground/70 leading-relaxed">{children}</td>
                          ),
                          code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                {...props}
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-md my-2 text-xs"
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code {...props} className={cn("bg-muted px-1.5 py-0.5 rounded text-xs font-mono", className)}>
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {mainContent}
                      </ReactMarkdown>
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
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2 max-w-3xl mx-auto flex-col w-full">
          {/* Quick Action Chips + Speed Controls + Toggle — linha superior */}
          {(() => {
            const showChipsRow =
              !isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === 'assistant';
            const lastMsg = showChipsRow ? messages[messages.length - 1] : null;
            const match = lastMsg?.content.match(/<chips>([\s\S]*?)<\/chips>/i);
            const dynamicChips = match ? match[1].split('|').map(c => c.trim()).filter(Boolean) : [];
            const hasTTS = 'speechSynthesis' in window;
            if (!showChipsRow && !hasTTS) return null;
            return (
              <div className="flex items-center gap-2 mb-2 w-full flex-wrap">
                {/* Chips visíveis apenas se enabled e se há chips */}
                {showChipsRow && chipsEnabled && dynamicChips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                    {dynamicChips.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playPopSound();
                          handleSend(action);
                        }}
                        className="text-[11px] md:text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-colors active:scale-95 whitespace-nowrap"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
                {/* Spacer quando chips estão desabilitados */}
                {showChipsRow && !chipsEnabled && <div className="flex-1" />}

                {/* Grupo direito: toggle chips */}
                <div className="flex items-center gap-1.5 ml-auto shrink-0">
                  {/* Toggle chips */}
                  {showChipsRow && (dynamicChips.length > 0 || !chipsEnabled) && (
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
                  )}
                </div>
              </div>
            );
          })()}

          {/* Barra de velocidade do narrador — aparece APENAS quando está narrando */}
          {(isSpeaking || isTtsLoading) && (
            <div className="flex items-center gap-1 mb-1 w-full justify-center animate-in fade-in-0 slide-in-from-bottom-1 duration-200">
              <span className="text-[9px] text-muted-foreground/50 uppercase tracking-widest mr-1">velocidade</span>
              {([0.75, 1, 1.25, 1.5] as const).map(speed => (
                <button
                  key={speed}
                  onClick={() => setTtsRate(speed)}
                  className={cn(
                    'text-[10px] font-mono px-2 py-0.5 rounded-full transition-all',
                    ttsRate === speed
                      ? 'bg-foreground text-background font-bold'
                      : 'text-muted-foreground/60 hover:text-muted-foreground'
                  )}
                >
                  {speed}×
                </button>
              ))}
            </div>
          )}

          {/* Linha do input — apenas textarea + botões de ação */}
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

            {/* Botão de ruído branco ambiente */}
            <button
              onClick={toggleMusic}
              className={cn(
                'flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-all',
                isMusicPlaying
                  ? 'bg-emerald-500/20 text-emerald-400 animate-pulse'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              )}
              title={isMusicPlaying ? 'Pausar ruído branco' : 'Tocar ruído branco para foco'}
            >
              <Music2 className="w-4 h-4" />
            </button>


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
