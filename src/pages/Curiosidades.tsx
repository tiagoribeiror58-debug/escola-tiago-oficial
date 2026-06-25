import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Loader2, RefreshCw, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CuriosidadeChatCard } from '@/components/CuriosidadeChatCard';
import { useToast } from '@/hooks/use-toast';
import { MATERIAS } from '@/lib/materias';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CuriosidadeData {
  tema: string;
  texto: string;
}

const ALL_SUBJECTS = Array.from(new Set(
  MATERIAS.flatMap(m => [m.nome, ...(m.subMaterias?.map(sm => sm.nome) || [])])
)).sort();

export default function Curiosidades() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [curiosidades, setCuriosidades] = useState<CuriosidadeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [temaEspecifico, setTemaEspecifico] = useState<string>("todos");

  const fetchCuriosidades = async (count: number = 3, overrideTema?: string, currentList: CuriosidadeData[] = curiosidades) => {
    try {
      const temaToSend = (overrideTema || temaEspecifico) === "todos" ? null : (overrideTema || temaEspecifico);
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

  const loadInitial = async () => {
    setIsLoading(true);
    await fetchCuriosidades(3, "todos", []);
    setIsLoading(false);
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    await fetchCuriosidades(3);
    setIsLoadingMore(false);
  };

  const handleTemaChange = async (val: string) => {
    setTemaEspecifico(val);
    setCuriosidades([]);
    setIsLoading(true);
    await fetchCuriosidades(3, val, []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadInitial();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

          <div className="flex items-center gap-2 max-w-[200px] sm:max-w-[300px] w-full">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <Select value={temaEspecifico} onValueChange={handleTemaChange}>
              <SelectTrigger className="h-9 w-full bg-muted/30 border-border/50">
                <SelectValue placeholder="Filtrar por tema..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Temas</SelectItem>
                {ALL_SUBJECTS.map(sub => (
                  <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curiosidades.map((c, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full" style={{ animationDelay: `${(i % 3) * 100}ms` }}>
              <CuriosidadeChatCard curiosidade={c} />
            </div>
          ))}
        </div>

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
