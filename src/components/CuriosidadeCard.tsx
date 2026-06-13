import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Lightbulb, RefreshCw, Bookmark, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface CuriosidadeData {
  tema: string;
  texto: string;
  dateStr: string;
}

const STORAGE_KEY = '@escola-tiago:curiosidade-dia';

export function CuriosidadeCard({ materiasAtuais = [] }: { materiasAtuais?: string[] }) {
  const [curiosidade, setCuriosidade] = useState<CuriosidadeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loadCuriosidade = async (forceRefresh = false) => {
    const todayStr = new Date().toDateString();
    
    if (!forceRefresh) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as CuriosidadeData;
          if (parsed.dateStr === todayStr) {
            setCuriosidade(parsed);
            return;
          }
        }
      } catch (e) {
        console.error("Erro ao ler curiosidade local", e);
      }
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('curiosidade-dia', {
        body: { materiasAtuais }
      });

      if (error) throw error;
      
      const newCuriosidade: CuriosidadeData = {
        tema: data.tema || "Curiosidade",
        texto: data.texto || "O universo é cheio de surpresas incríveis prontas para serem descobertas.",
        dateStr: todayStr
      };

      setCuriosidade(newCuriosidade);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCuriosidade));
    } catch (e) {
      console.error("Falha ao buscar curiosidade", e);
      toast({
        title: "Ops!",
        description: "Não foi possível carregar a curiosidade agora.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCuriosidade();
  }, []);

  const handleSave = async () => {
    if (!curiosidade) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('study_notes')
        .insert({
          materia_slug: 'curiosidades',
          topico: 'Você Sabia?',
          user_reflection: `Tema: ${curiosidade.tema}`,
          ai_complement: curiosidade.texto
        });

      if (error) throw error;

      toast({
        title: "Curiosidade salva!",
        description: "Você pode revisá-la no seu Caderno de notas.",
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

  if (!curiosidade && !isLoading) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 rounded-[2rem] p-6 shadow-sm">
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Lightbulb className="w-24 h-24 text-indigo-500" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/20 rounded-xl">
              <Lightbulb className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Você Sabia?</h3>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {isLoading ? 'Gerando...' : curiosidade?.tema}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => loadCuriosidade(true)}
            disabled={isLoading}
            className="p-2 hover:bg-muted/50 rounded-full transition-colors text-muted-foreground hover:text-foreground disabled:opacity-50"
            title="Gerar nova curiosidade"
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </button>
        </div>

        <div className="flex-1 min-h-[4rem] flex items-center mb-6">
          {isLoading ? (
            <div className="flex items-center justify-center w-full gap-2 text-muted-foreground/60">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Buscando um fato incrível...</span>
            </div>
          ) : (
            <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/90 font-medium">
              {curiosidade?.texto}
            </p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading || isSaving}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-background border border-border/50 hover:bg-muted rounded-xl text-sm font-medium transition-all shadow-sm disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bookmark className="w-4 h-4" />}
          Salvar no Caderno
        </button>
      </div>
    </div>
  );
}
