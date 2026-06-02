import { useState, useRef, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ChatMessage, MateriaConfig, Sessao } from '@/types';
import { buildSystemPrompt } from '@/lib/buildPrompt';
import { useSaveChatMessage } from '@/hooks/useChatMessages';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { ArrowUp, Loader2, Zap, ZapOff, History, Volume2, VolumeX, Music2, X, Square } from 'lucide-react';
import { playPopSound, playThinkingDoneSound, playSuccessSound } from '@/lib/audioUtils';
import confetti from 'canvas-confetti';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import MermaidRenderer from './MermaidRenderer';
import UnsplashChip from './UnsplashChip';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import FloatingSelectionMenu from './FloatingSelectionMenu';
import ReflectionModal from './ReflectionModal';

interface Props {
  materia: MateriaConfig;
  ultimaSessao: Sessao | null;
  onMessagesChange?: (messages: ChatMessage[]) => void;
  onTopicComplete?: () => void;
  onMetricScore?: (score: number) => void;
  sessionKey: string;
  initialMessages?: ChatMessage[];   // retomada real (resume)
  historyMessages?: ChatMessage[];   // histórico anterior (display-only, contexto visual)
  sub?: string | null;
  modo?: string | null;
  ementaConcluida?: string[];        // tópicos já concluídos (fonte de verdade do progresso)
  sessoesRecentes?: Sessao[];        // histórico de performance para a IA calibrar
  systemPromptOverride?: string;     // se passado, ignora o buildSystemPrompt e usa este
  onRequestEncerrar?: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const markdownComponents = {
  // Tabelas — renderizadas como card com bordas e hover
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-3 rounded-xl border border-border/50 bg-muted/20">
      <table className="w-full text-xs border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-muted/50 border-b border-border/50">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">{children}</tr>
  ),
  th: ({ children }: any) => (
    <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-foreground/80 tracking-wide uppercase">{children}</th>
  ),
  td: ({ children }: any) => (
    <td className="px-3 py-2 text-foreground/70 leading-relaxed">{children}</td>
  ),
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    if (!inline && match && match[1] === 'mermaid') {
      return <MermaidRenderer code={String(children).replace(/\n$/, '')} />;
    }
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
};

export default function ChatWindow({ materia, ultimaSessao, onMessagesChange, onTopicComplete, onMetricScore, sessionKey, initialMessages, historyMessages, sub, modo, ementaConcluida, sessoesRecentes, systemPromptOverride, onRequestEncerrar }: Props) {
  const isContinuation = initialMessages !== undefined;
  const systemPrompt = systemPromptOverride ?? buildSystemPrompt(materia, ultimaSessao, isContinuation, sub, modo, ementaConcluida, sessoesRecentes);
  const saveMutation = useSaveChatMessage();

  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages || []
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chipsEnabled, setChipsEnabled] = useState(true);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [showEndButton, setShowEndButton] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const autoStartFiredRef = useRef(false); // guard contra double auto-start (StrictMode)
  const autoTtsEnabledRef = useRef(false); // rastreia se o usuário ativou o áudio para manter auto-play
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [loadingChip, setLoadingChip] = useState<string | null>(null);


  // Text selection state
  const [selectionRect, setSelectionRect] = useState<{ top: number, left: number } | null>(null);
  const [selectedText, setSelectedText] = useState('');

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [ttsRate, setTtsRate] = useState(1.0);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Instancia um ÚNICO elemento de áudio na montagem para driblar o bloqueio de Autoplay do navegador
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const [isNearBottom, setIsNearBottom] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsNearBottom(distanceToBottom < 100);
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
      .replace(/\[FOTO:.*?\]/gi, '')
      .replace(/\n{2,}/g, '. ')
      .replace(/\n/g, ' ')
      .trim();

  // Chamada interna para o TTS (usada tanto pelo botão quanto pelo auto-play)
  const fetchAndPlayTTS = async (text: string) => {
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
          body: JSON.stringify({ text: clean, speed: 1.0 }),
        }
      );
      if (!resp.ok) throw new Error('TTS request failed');
      const { audioContent } = await resp.json();
      
      if (!audioRef.current) audioRef.current = new Audio();
      const audio = audioRef.current;
      
      audio.src = `data:audio/mp3;base64,${audioContent}`;
      audio.playbackRate = ttsRate;
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      
      await audio.play();
    } catch (err) {
      console.error('TTS error:', err);
      setIsSpeaking(false);
    } finally {
      setIsTtsLoading(false);
    }
  };

  // TTS via Google Cloud Neural2 (Edge Function /tts)
  // Substitui a Web Speech API do navegador por voz neural real em pt-BR.
  const toggleTTS = async (text: string) => {
    // Se já está tocando, para
    if (isSpeaking) {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.src = '';
      setIsSpeaking(false);
      autoTtsEnabledRef.current = false; // Usuário pausou, desativa o auto-play
      return;
    }

    // Tática Sênior: destravamos o elemento de áudio sincronicamente durante o clique do usuário!
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.play().catch(() => {});

    autoTtsEnabledRef.current = true; // Usuário deu play, ativa auto-play para as próximas mensagens
    await fetchAndPlayTTS(text);
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
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    onMessagesChange?.(messages);
  }, [messages, onMessagesChange, isNearBottom]);

  // Handle text selection
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setSelectionRect(null);
        setSelectedText('');
        return;
      }
      
      const text = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Position the menu slightly above the center of the selection
      setSelectionRect({
        top: rect.top,
        left: rect.left + rect.width / 2
      });
      setSelectedText(text);
    };



    const handleMouseUp = () => {
      setTimeout(handleSelectionChange, 10);
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const handleSelectionAction = async (action: 'copy' | 'highlight' | 'save') => {
    if (action === 'save') {
      const topico = ultimaSessao?.topico || 'Trecho Selecionado';
      
      const promise = supabase
        .from('study_notes')
        .insert({
          materia_slug: materia.slug,
          topico: topico,
          user_reflection: selectedText,
          ai_complement: ''
        })
        .then(({ error }) => {
          if (error) throw new Error(error.message);
          queryClient.invalidateQueries({ queryKey: ['study_notes'] });
        });
        
      toast.promise(promise, {
        loading: 'Salvando nota no caderno...',
        success: 'Nota salva com sucesso! 🎉',
        error: 'Falha ao salvar a anotação.',
      });

      window.getSelection()?.removeAllRanges();
      setSelectionRect(null);
    } else if (action === 'copy') {
      // handled inside FloatingSelectionMenu via clipboard API
      window.getSelection()?.removeAllRanges();
      setSelectionRect(null);
    } else if (action === 'highlight') {
      // Temporário: apenas manter o visual ou feedback
      toast.success('Trecho destacado na sessão atual!');
      window.getSelection()?.removeAllRanges();
      setSelectionRect(null);
    }
  };

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
    let topicAlreadyCreated = false; // Guard: evita criar o mesmo tópico 2x durante o streaming

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
          systemPrompt,
          // Currículo Vivo: passa o slug da matéria e a chave da sessão para que a Edge Function
          // possa detectar tópicos emergentes e vinculá-los a esta matéria no banco de dados.
          materiaSlug: materia?.slug,
          sessionKey,
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
            
            // NOVO: Renderiza a intenção de busca em tempo real injetando o texto no fluxo
            if (parsed.type === 'search_intent') {
              delta = `> 🔍 Buscando na web por: \`${parsed.query?.replace(/`/g, '') || 'busca'}\`...\n\n`;
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
              
              // Detectar e extrair [CRIAR_TOPICO: Titulo | Descricao] ou [CRIAR_TÓPICO: Titulo]
              // Aceita com/sem acento, com/sem descrição separada por pipe
              const topicRegex = /\[CRIAR_T[OÓ]PICO:\s*([^\]|]+?)(?:\s*\|\s*([^\]]+?))?\]/i;
              const topicMatch = assistantContent.match(topicRegex);
              if (topicMatch && !topicAlreadyCreated) {
                 topicAlreadyCreated = true; // Impede duplicação durante o streaming
                 const titulo = topicMatch[1].trim();
                 const descricao = (topicMatch[2] || titulo).trim();
                 // Remove a tag do texto para sempre para não piscar na tela
                 assistantContent = assistantContent.replace(topicMatch[0], '');
                 
                 // Dispara a inserção no banco silenciosamente
                 if (materia?.slug) {
                   supabase.from('topicos_emergentes').insert({
                     materia_slug: materia.slug,
                     titulo,
                     descricao,
                     session_key: sessionKey
                   }).then(({ error }) => {
                     if (!error) {
                       toast.success(`Tópico "${titulo}" criado no Roadmap!`);
                       playPopSound();
                       // Invalida o cache para que o MateriaDetailModal exiba o tópico imediatamente
                       queryClient.invalidateQueries({ queryKey: ['topicos-emergentes', materia.slug] });
                     } else {
                       console.error('Erro ao criar tópico emergente:', error);
                     }
                   });
                 }
              } else if (topicMatch && topicAlreadyCreated) {
                 // Mesmo com guard, remove a tag que pode aparecer de novo no acumulador
                 assistantContent = assistantContent.replace(topicMatch[0], '');
              }
              
              // Evitamos closures instáveis guardando o conteúdo atual
              const currentContent = assistantContent; 
              
              // Smart scroll: scroll only if user is already at the bottom
              const wasNearBottom = isNearBottom;
              
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.id === messageId) {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: currentContent } : m);
                } else {
                  return [...prev, { id: messageId, role: 'assistant', content: currentContent }];
                }
              });

              if (wasNearBottom) {
                setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
              }
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
        
        const metricMatch = assistantContent.match(/<metric\s+score="(\d+)"\s*\/>/i);
        if (metricMatch) {
          const score = parseInt(metricMatch[1], 10);
          if (!isNaN(score)) {
            onMetricScore?.(score);
          }
          assistantContent = assistantContent.replace(/<metric\s+score="\d+"\s*\/>/gi, '').trimEnd();
        }

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
        setShowEndButton(true);
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

      // Fallback: se o usuário pediu para criar tópico (via chip) mas a IA não gerou a tag,
      // extrai o título diretamente da mensagem do usuário e cria o tópico.
      if (!topicAlreadyCreated && materia?.slug) {
        const criarMatch = text.match(/cri(?:e|ar)\s+(?:um\s+)?t[oó]pico\s+(?:sobre\s+)?(.+?)(?:\s+para\s+(?:eu\s+)?aprofundar)?$/i);
        if (criarMatch) {
          const tituloFallback = criarMatch[1].trim().replace(/^["']|["']$/g, '');
          if (tituloFallback.length > 2) {
            topicAlreadyCreated = true;
            supabase.from('topicos_emergentes').insert({
              materia_slug: materia.slug,
              titulo: tituloFallback,
              descricao: tituloFallback,
              session_key: sessionKey
            }).then(({ error }) => {
              if (!error) {
                toast.success(`Tópico "${tituloFallback}" criado no Roadmap!`);
                playPopSound();
                queryClient.invalidateQueries({ queryKey: ['topicos-emergentes', materia.slug] });
              } else {
                console.error('Erro ao criar tópico emergente (fallback):', error);
              }
            });
          }
        }
      }

      // Dispara o TTS automático caso o usuário tenha ativado o áudio
      if (autoTtsEnabledRef.current && contentToSave) {
        fetchAndPlayTTS(contentToSave);
      }
    } catch (e) {
      console.error(e);
      const isOverloaded = e instanceof Error && e.message === 'OVERLOADED';
      let errorMsg = 'Desculpe, houve um erro. Tente novamente.';
      
      if (isOverloaded) {
        errorMsg = '⏳ Os servidores da IA estão sobrecarregados agora. Aguarde alguns segundos e tente novamente.';
      } else if (e instanceof Error && e.message && e.message !== 'Stream error' && e.message !== 'Unknown error') {
        errorMsg = `Erro técnico: ${e.message}`;
      }
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
  }, [input, isLoading, messages, systemPrompt, materia.slug, sessionKey, saveMutation, isNearBottom]);

  // Auto-start: dispara quando a sessão está vazia (nova ou retomada sem mensagens).
  useEffect(() => {
    // Assistente global não tem start automático ("remova a resposta automatica")
    if (materia?.slug === 'global-assistant') return; 

    if (autoStartFiredRef.current || messages.length > 0) return;
    autoStartFiredRef.current = true;
    handleSend('Inicie a sessão.', true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materia?.slug]);

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
      <div className="flex-1 overflow-y-auto w-full" onScroll={handleScroll} ref={containerRef}>
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
              const mainContentRaw = contentWithoutChips.replace(/<details><summary>Raciocínio da IA<\/summary>[\s\S]*?(?:<\/details>|$)/i, '').trim();
              
              // Extract Unsplash Photo tag
              const photoMatch = mainContentRaw.match(/\[FOTO:\s*(.*?)\]/i);
              const photoTerm = photoMatch ? photoMatch[1].trim() : null;
              const mainContent = mainContentRaw.replace(/\[FOTO:\s*.*?\]/i, '').trim();

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
                        components={markdownComponents}
                      >
                        {mainContent}
                      </ReactMarkdown>
                      {photoTerm && <UnsplashChip searchTerm={photoTerm} />}
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

        {showEndButton && (
          <div className="flex flex-col items-center justify-center my-6 animate-in fade-in zoom-in duration-300">
            <div className="relative group">
              <button
                onClick={() => {
                  playPopSound();
                  setShowEndButton(false);
                }}
                className="absolute -top-3 -right-3 w-6 h-6 bg-muted text-muted-foreground hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm z-10 opacity-0 group-hover:opacity-100"
                title="Fechar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  playPopSound();
                  onRequestEncerrar?.();
                }}
                className="px-8 py-3 bg-[hsl(var(--success))] text-white font-semibold rounded-xl shadow-lg shadow-[hsl(var(--success)/0.25)] ring-2 ring-[hsl(var(--success)/0.4)] animate-pulse hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <Square className="w-4 h-4 fill-current" />
                Encerrar Sessão
              </button>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
        </div>
      </div>

      {/* Floating Selection Menu */}
      {selectionRect && selectedText && (
        <FloatingSelectionMenu
          position={selectionRect}
          selectedText={selectedText}
          onAction={handleSelectionAction}
        />
      )}



      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2 max-w-3xl mx-auto flex-col w-full">
          {/* Quick Action Chips + Speed Controls + Toggle — linha superior */}
          {(() => {
            const showChipsRow =
              !isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === 'assistant';
            const lastMsg = showChipsRow ? messages[messages.length - 1] : null;
            const match = lastMsg?.content.match(/<chips>([\s\S]*?)(?:<\/chips>|$)/i);
            const dynamicChips = match ? match[1].split('|').map(c => c.trim().replace(/<\/?chips>/gi, '')).filter(Boolean) : [];
            const hasTTS = 'speechSynthesis' in window;
            if (!showChipsRow && !hasTTS) return null;
            return (
              <div className="flex items-center gap-2 mb-2 w-full flex-wrap">
                {showChipsRow && chipsEnabled && dynamicChips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                    {dynamicChips.map((action, idx) => {
                      const isTopicChip = action.match(/cri(?:e|ar)\s+(?:um\s+)?t[oó]pico\s+(?:sobre\s+)?(.+?)(?:\s+para\s+(?:eu\s+)?aprofundar)?$/i);
                      const isLoadingChip = loadingChip === action;

                      return (
                      <button
                        key={idx}
                        disabled={isLoadingChip}
                        onClick={() => {
                          playPopSound();
                          handleSend(action);
                        }}
                        className="text-[11px] md:text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-colors active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1.5"
                      >
                        {isLoadingChip && <Loader2 className="w-3 h-3 animate-spin" />}
                        {action}
                      </button>
                    )})}
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
                      className="shrink-0 p-2 rounded-full text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted transition-all active:scale-95"
                    >
                      {chipsEnabled
                        ? <Zap className="w-4 h-4" />
                        : <ZapOff className="w-4 h-4" />
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
                  onClick={() => {
                    setTtsRate(speed);
                    if (audioRef.current) {
                      audioRef.current.playbackRate = speed;
                    }
                  }}
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
