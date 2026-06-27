import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Lightbulb, Bookmark, Loader2, ArrowUp, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Props {
  curiosidade: {
    tema: string;
    texto: string;
  };
}

export function CuriosidadeChatCard({ curiosidade }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingCards, setIsGeneratingCards] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const systemPrompt = `O usuário acabou de ler a seguinte curiosidade sobre o tema "${curiosidade.tema}": "${curiosidade.texto}". 
      Sua missão é responder de forma ultra-concisa (máx 1 ou 2 parágrafos) a qualquer pergunta ou comentário sobre essa curiosidade. Seja um especialista instigante. NUNCA RETORNE <chips>.`;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          messages: newMessages.map(({ role, content }) => ({ role, content })), 
          systemPrompt 
        }),
      });

      if (!response.ok) throw new Error("Falha na chamada de chat");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let assistantContent = '';

      if (reader) {
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
              
              if (parsed.choices?.[0]?.delta?.content) {
                delta = parsed.choices[0].delta.content;
              } else if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
                delta = parsed.delta.text;
              }

              if (delta) {
                assistantContent += delta;
                setMessages(prev => {
                  const last = prev[prev.length - 1];
                  if (last && last.role === 'assistant') {
                    return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                  } else {
                    return [...prev, { role: 'assistant', content: assistantContent }];
                  }
                });
              }
            } catch (err) {
              // Ignore partial JSON
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Erro",
        description: "Não foi possível conectar com a IA agora.",
        variant: "destructive"
      });
      setMessages(prev => [...prev, { role: 'assistant', content: "Desculpe, ocorreu um erro ao gerar a resposta." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const chatTranscript = messages.map(m => `${m.role === 'user' ? '👤 Você' : '🤖 IA'}: ${m.content}`).join('\n\n');
      const aiComplementStr = messages.length > 0 
        ? `*Curiosidade Original:*\n${curiosidade.texto}\n\n*Discussão:*\n${chatTranscript}`
        : curiosidade.texto;

      const userReflectionStr = messages.length > 0 
        ? `Discussão sobre: ${curiosidade.tema}` 
        : `Tema: ${curiosidade.tema}`;

      const { error } = await supabase
        .from('study_notes')
        .insert({
          materia_slug: 'curiosidades',
          topico: 'Você Sabia?',
          user_reflection: userReflectionStr,
          ai_complement: aiComplementStr
        });

      if (error) throw error;

      toast({
        title: "Salvo com sucesso!",
        description: "A curiosidade e a conversa estão no seu Caderno.",
      });
      queryClient.invalidateQueries({ queryKey: ['study_notes'] });
    } catch (e) {
      console.error("Erro ao salvar", e);
      toast({
        title: "Falha ao salvar",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateFlashcards = async () => {
    if (isGeneratingCards) return;
    setIsGeneratingCards(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gerar-flashcards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          materia_slug: 'Curiosidades', 
          topico: curiosidade.tema, 
          texto_fonte: curiosidade.texto
        }),
      });

      if (!response.ok) throw new Error("Falha na geração de flashcards");

      const data = await response.json();
      const flashcards = data.flashcards;

      if (flashcards && flashcards.length > 0) {
        const { data: { user } } = await supabase.auth.getUser();
        
        const inserts = flashcards.map((fc: any) => ({
          user_id: user?.id,
          materia_slug: 'Curiosidades',
          topico: curiosidade.tema,
          front: fc.front,
          back: fc.back,
        }));

        const { error } = await supabase.from('flashcards').insert(inserts);
        if (error) throw error;

        toast({
          title: "Flashcards Extraídos!",
          description: `${flashcards.length} cartões foram enviados para a sua memória de longo prazo.`,
        });
      } else {
        toast({
          title: "Aviso",
          description: "A IA não conseguiu extrair flashcards deste texto.",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Erro",
        description: "Falha ao extrair flashcards.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingCards(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 rounded-[2rem] p-6 shadow-sm flex flex-col gap-4">
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Lightbulb className="w-24 h-24 text-indigo-500" />
      </div>

      <div className="relative z-10 flex flex-col h-full gap-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/20 rounded-xl">
            <Lightbulb className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Você Sabia?</h3>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              {curiosidade.tema}
            </p>
          </div>
        </div>

        {/* Curiosidade Principal */}
        <div className="text-sm sm:text-[15px] leading-relaxed text-foreground/90 font-medium">
          {curiosidade.texto}
        </div>

        {/* Chat Area */}
        {messages.length > 0 && (
          <div className="bg-background/40 rounded-xl p-4 border border-border/50 max-h-[300px] overflow-y-auto space-y-4">
            {messages.map((msg, i) => {
              const cleanContent = msg.content.replace(/<chips>[\s\S]*?(?:<\/chips>|$)/ig, '').trim();
              if (!cleanContent) return null;
              return (
                <div key={i} className={cn("text-xs sm:text-sm", msg.role === 'user' ? "text-right" : "text-left")}>
                  <div className={cn(
                    "inline-block px-3 py-2 rounded-2xl max-w-[85%] text-left",
                    msg.role === 'user' ? "bg-indigo-500 text-white rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"
                  )}>
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0 prose-p:leading-snug">
                      <ReactMarkdown>{cleanContent}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="text-left">
                <div className="inline-block px-3 py-2 rounded-2xl bg-muted text-muted-foreground rounded-bl-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input */}
        <div className="flex items-end gap-2 relative z-10">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Pergunte algo sobre isso..."
            className="flex-1 resize-none bg-background/60 border border-border/50 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[44px] max-h-[100px]"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 transition-colors shrink-0 h-[44px] w-[44px] flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Botões Finais */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-background border border-border/50 hover:bg-muted rounded-xl text-sm font-medium transition-all shadow-sm disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bookmark className="w-4 h-4" />}
            Caderno
          </button>
          <button
            onClick={handleGenerateFlashcards}
            disabled={isGeneratingCards}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-background border border-border/50 hover:bg-muted text-foreground rounded-xl text-sm font-medium transition-all shadow-sm disabled:opacity-50"
          >
            {isGeneratingCards ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
            Flashcards
          </button>
        </div>
      </div>
    </div>
  );
}
