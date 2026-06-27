import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Loader2, ArrowUp, ArrowRight, BrainCircuit, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getMateriaBySlug } from '@/lib/materias';
import { useQueryClient } from '@tanstack/react-query';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Props {
  materiaSlug: string;
  topico: string;
  isFlashcardDue?: boolean;
}

export function ResumoCard({ materiaSlug, topico, isFlashcardDue }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingCards, setIsGeneratingCards] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(!isFlashcardDue);
  const [recallAnswer, setRecallAnswer] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const materia = getMateriaBySlug(materiaSlug);
  const materiaName = materia?.nome || materiaSlug;

  useEffect(() => {
    const fetchInitialSummary = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resumo-topico`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ materia: materiaName, topico }),
        });

        if (!response.ok) throw new Error("Falha na chamada inicial");

        const data = await response.json();
        setSummary(data.texto);
      } catch (e) {
        console.error(e);
        setSummary("Não foi possível carregar o resumo no momento.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialSummary();
  }, [materiaName, topico]);

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

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resumo-topico`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          materia: materiaName,
          topico,
          messages: [
            { role: 'assistant', content: summary },
            ...newMessages.map(({ role, content }) => ({ role, content }))
          ]
        }),
      });

      if (!response.ok) throw new Error("Falha na chamada de chat");

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.texto }]);

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

  const handleStudy = () => {
    navigate(`/?materia=${materiaSlug}&sub=${encodeURIComponent(topico)}`);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const chatTranscript = messages.map(m => `${m.role === 'user' ? '👤 Você' : '🤖 IA'}: ${m.content}`).join('\n\n');
      const aiComplementStr = messages.length > 0 
        ? `*Resumo Original:*\n${summary}\n\n*Discussão:*\n${chatTranscript}`
        : summary;

      const userReflectionStr = messages.length > 0 
        ? `Discussão sobre: ${topico}` 
        : `Tópico: ${topico}`;

      const { error } = await supabase
        .from('study_notes')
        .insert({
          materia_slug: materiaSlug,
          topico: topico,
          user_reflection: userReflectionStr,
          ai_complement: aiComplementStr
        });

      if (error) throw error;

      toast({
        title: "Salvo com sucesso!",
        description: "O resumo do tópico foi salvo no seu Caderno.",
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
    if (!summary || isGeneratingCards) return;
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
          materia_slug: materiaSlug, 
          topico: topico, 
          texto_fonte: summary
        }),
      });

      if (!response.ok) throw new Error("Falha na geração de flashcards");

      const data = await response.json();
      const flashcards = data.flashcards;

      if (flashcards && flashcards.length > 0) {
        const { data: { user } } = await supabase.auth.getUser();
        
        const inserts = flashcards.map((fc: any) => ({
          user_id: user?.id,
          materia_slug: materiaSlug,
          topico: topico,
          front: fc.front,
          back: fc.back,
        }));

        const { error } = await supabase.from('flashcards').insert(inserts);
        if (error) throw error;

        toast({
          title: "Flashcards Extraídos!",
          description: `A IA fatiou o texto e extraiu ${flashcards.length} cartões curtos para sua memória.`,
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
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 rounded-[2rem] p-6 shadow-sm flex flex-col gap-4 h-full">
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <BookOpen className="w-24 h-24 text-emerald-500" />
      </div>

      <div className="relative z-10 flex flex-col h-full gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/20 rounded-xl">
            <BookOpen className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">{topico}</h3>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              {materiaName}
            </p>
          </div>
        </div>

        {!hasRevealed ? (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in duration-500 bg-background/40 p-4 rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground/90">Active Recall!</h4>
                <p className="text-xs text-muted-foreground mt-1">Este tópico está vencido nos seus flashcards. O que você lembra sobre isso antes de ler?</p>
              </div>
            </div>
            <textarea
              value={recallAnswer}
              onChange={e => setRecallAnswer(e.target.value)}
              placeholder="Digite aqui o que você lembra (opcional)..."
              className="resize-none bg-background/60 border border-border/50 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]"
            />
            <button
              onClick={() => {
                setHasRevealed(true);
                if (recallAnswer.trim()) {
                  setMessages([{ role: 'user', content: recallAnswer.trim() }]);
                }
              }}
              disabled={isLoading}
              className="py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Revelar Resumo'}
            </button>
          </div>
        ) : (
          <div className="text-sm sm:text-[15px] leading-relaxed text-foreground/90 font-medium flex-1">
            {summary ? (
              <div className="prose prose-sm dark:prose-invert max-w-none animate-in fade-in duration-500">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            ) : (
               <div className="flex items-center gap-2 text-muted-foreground">
                 <Loader2 className="w-4 h-4 animate-spin" /> Gerando resumo...
               </div>
            )}
          </div>
        )}

        {messages.length > 0 && (
          <div className="bg-background/40 rounded-xl p-4 border border-border/50 max-h-[250px] overflow-y-auto space-y-4 mt-2">
            {messages.map((msg, i) => {
              const cleanContent = msg.content.replace(/<chips>[\s\S]*?(?:<\/chips>|$)/ig, '').trim();
              if (!cleanContent) return null;
              return (
                <div key={i} className={cn("text-xs sm:text-sm", msg.role === 'user' ? "text-right" : "text-left")}>
                  <div className={cn(
                    "inline-block px-3 py-2 rounded-2xl max-w-[85%] text-left",
                    msg.role === 'user' ? "bg-emerald-500 text-white rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"
                  )}>
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0 prose-p:leading-snug">
                      <ReactMarkdown>{cleanContent}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}
            {isLoading && summary && (
              <div className="text-left">
                <div className="inline-block px-3 py-2 rounded-2xl bg-muted text-muted-foreground rounded-bl-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        <div className="flex items-end gap-2 relative z-10 mt-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Tirar dúvida sobre este tópico..."
            disabled={!summary || isLoading}
            className="flex-1 resize-none bg-background/60 border border-border/50 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px] max-h-[100px] disabled:opacity-50"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || !summary}
            className="p-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 transition-colors shrink-0 h-[44px] w-[44px] flex items-center justify-center"
          >
            {isLoading && summary ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleSave}
            disabled={!summary || isSaving}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-background border border-border/50 hover:bg-muted text-foreground rounded-xl text-sm font-medium transition-all shadow-sm disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bookmark className="w-4 h-4" />}
            Caderno
          </button>
          <button
            onClick={handleGenerateFlashcards}
            disabled={!summary || isGeneratingCards}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-background border border-border/50 hover:bg-muted text-foreground rounded-xl text-sm font-medium transition-all shadow-sm disabled:opacity-50"
          >
            {isGeneratingCards ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
            Flashcards
          </button>
        </div>
        <button
          onClick={handleStudy}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-background border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 rounded-xl text-sm font-medium transition-all shadow-sm mt-1"
        >
          Estudo Completo <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
