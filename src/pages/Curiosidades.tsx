import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Loader2, RefreshCw, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CuriosidadeChatCard } from '@/components/CuriosidadeChatCard';
import { useToast } from '@/hooks/use-toast';
import { MATERIAS } from '@/lib/materias';
import { Input } from "@/components/ui/input";

interface CuriosidadeData {
  tema: string;
  texto: string;
}

function collectNomes(m: typeof MATERIAS[number]): string[] {
  if (!m.children || m.children.length === 0) return [m.nome];
  return [m.nome, ...m.children.flatMap(collectNomes)];
}

const ALL_SUBJECTS = Array.from(new Set(
  MATERIAS.flatMap(collectNomes)
)).sort();

export default function Curiosidades() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [curiosidades, setCuriosidades] = useState<CuriosidadeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [temaEspecifico, setTemaEspecifico] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("todos");
  const [batchSize, setBatchSize] = useState<number>(3);

  const fetchCuriosidades = async (count: number, overrideTema?: string, currentList: CuriosidadeData[] = curiosidades) => {
    try {
      const temaToSend = (overrideTema || activeSearch) === "todos" || !(overrideTema || activeSearch).trim() ? null : (overrideTema || activeSearch);
      const temasRecentes = currentList.map(c => c.tema);
      
      const { data, error } = await supabase.functions.invoke('curiosidade-dia', {
        body: { 
          count,
          temaEspecifico: temaToSend,
          temasRecentes
        }
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

  const loadInitial = async (qtd: number) => {
    setIsLoading(true);
    setBatchSize(qtd);
    await fetchCuriosidades(qtd, "todos", []);
    setIsLoading(false);
  };

  const loadMore = async (qtd: number) => {
    setIsLoadingMore(true);
    setBatchSize(qtd);
    await fetchCuriosidades(qtd);
    setIsLoadingMore(false);
  };

  const handleSearch = async () => {
    const searchVal = temaEspecifico.trim() || "todos";
    setActiveSearch(searchVal);
    setCuriosidades([]);
    if (curiosidades.length > 0 || isLoading) {
      setIsLoading(true);
      await fetchCuriosidades(batchSize, searchVal, []);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    // Não carrega mais automaticamente no início
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-indigo-500/20">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold tracking-wide text-foreground/90 hidden sm:flex items-center gap-2">
              Explorar Curiosidades
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 max-w-[200px] sm:max-w-[300px] w-full">
            <div className="flex items-center gap-2 w-full relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
              <Input
                value={temaEspecifico}
                onChange={e => setTemaEspecifico(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Pesquisar tema..."
                className="pl-9 pr-10 h-9 w-full bg-muted/30 border-border/50"
              />
              {temaEspecifico && (
                <button
                  onClick={handleSearch}
                  className="absolute right-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Buscar
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-8">
        {curiosidades.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground/90 mb-3">
              Quantos cartões você quer gerar agora?
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              Selecione a quantidade para começarmos a garimpar fatos incríveis e desconhecidos sobre {activeSearch === 'todos' ? 'diversos temas' : `"${activeSearch}"`}.
            </p>
            <div className="flex items-center gap-4">
              {[1, 2, 3, 5].map((qtd) => (
                <button
                  key={qtd}
                  onClick={() => loadInitial(qtd)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted/30 border border-border/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center text-lg sm:text-xl font-semibold text-foreground/70"
                >
                  {qtd}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curiosidades.map((c, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full" style={{ animationDelay: `${(i % 3) * 100}ms` }}>
                <CuriosidadeChatCard curiosidade={c} />
              </div>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground/50 gap-4 w-full">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-xs font-medium uppercase tracking-widest">Garimpando fatos...</span>
          </div>
        ) : curiosidades.length > 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center p-8 bg-muted/10 border border-border/50 rounded-3xl w-full">
            <h3 className="text-sm font-semibold text-foreground/80 mb-4 uppercase tracking-wider">Quantos mais você quer ver agora?</h3>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 5].map((qtd) => (
                <button
                  key={qtd}
                  onClick={() => loadMore(qtd)}
                  disabled={isLoadingMore}
                  className="w-12 h-12 rounded-2xl bg-muted/30 border border-border/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center font-medium text-foreground/70 disabled:opacity-50"
                >
                  {qtd}
                </button>
              ))}
            </div>
            {isLoadingMore && (
               <div className="mt-4 text-xs flex items-center gap-2 text-muted-foreground">
                 <Loader2 className="w-3 h-3 animate-spin" /> Carregando...
               </div>
            )}
          </div>
        ) : null}
      </main>
    </div>
  );
}
