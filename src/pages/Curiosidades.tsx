import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CuriosidadeChatCard } from '@/components/CuriosidadeChatCard';
import { useToast } from '@/hooks/use-toast';

interface CuriosidadeData {
  tema: string;
  texto: string;
}

export default function Curiosidades() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [curiosidades, setCuriosidades] = useState<CuriosidadeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchCuriosidades = async (count: number = 3) => {
    try {
      const { data, error } = await supabase.functions.invoke('curiosidade-dia', {
        body: { count }
      });

      if (error) throw error;
      
      let newItems: CuriosidadeData[] = [];
      if (Array.isArray(data)) {
        newItems = data;
      } else if (data && data.tema) {
        newItems = [data];
      }

      setCuriosidades(prev => [...prev, ...newItems]);
    } catch (e) {
      console.error("Falha ao buscar curiosidades", e);
      toast({
        title: "Ops!",
        description: "Não foi possível carregar as curiosidades agora.",
        variant: "destructive"
      });
    }
  };

  const loadInitial = async () => {
    setIsLoading(true);
    await fetchCuriosidades(3);
    setIsLoading(false);
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    await fetchCuriosidades(3);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    loadInitial();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-indigo-500/20">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold tracking-wide text-foreground/90 flex items-center gap-2">
            <span>Explorar Curiosidades</span>
          </h1>
          <div className="w-9" />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-8">
        {curiosidades.map((c, i) => (
          <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: \`\${i * 100}ms\` }}>
            <CuriosidadeChatCard curiosidade={c} />
          </div>
        ))}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground/50 gap-4">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-xs font-medium uppercase tracking-widest">Garimpando fatos...</span>
          </div>
        ) : (
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-full text-sm font-medium transition-all text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            {isLoadingMore ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Carregar Mais
          </button>
        )}
      </main>
    </div>
  );
}
