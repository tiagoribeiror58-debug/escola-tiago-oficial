import { useState, useEffect } from 'react';
import { ArrowLeft, Filter, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResumoCard } from '@/components/ResumoCard';
import { MATERIAS } from '@/lib/materias';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResumoItem {
  materiaSlug: string;
  topico: string;
}

// Extrai todos os hubs (nomes) para o filtro
function collectHubNames(m: typeof MATERIAS[number]): string[] {
  if (!m.children || m.children.length === 0) return [m.nome];
  return [m.nome, ...m.children.flatMap(collectHubNames)];
}
const ALL_SUBJECTS = Array.from(new Set(MATERIAS.flatMap(collectHubNames))).sort();

// Extrai todos os tópicos (folhas) para seleção aleatória
function getAllTopicsFromMateria(m: typeof MATERIAS[number]): { materiaSlug: string, topico: string, hubNomes: string[] }[] {
  if (!m.children || m.children.length === 0) {
    let topicos: string[] = [];
    if (m.ementa) {
      topicos = [...m.ementa];
    }
    if (m.fases) {
      m.fases.forEach(f => {
        if (f.topicos) topicos = [...topicos, ...f.topicos];
      });
    }
    return topicos.map(t => ({ materiaSlug: m.slug, topico: t, hubNomes: [m.nome] }));
  }
  return m.children.flatMap(c => {
    const childTopics = getAllTopicsFromMateria(c);
    // Propaga o nome do hub pai para facilitar o filtro
    return childTopics.map(ct => ({ ...ct, hubNomes: [m.nome, ...ct.hubNomes] }));
  });
}

const ALL_TOPICS = MATERIAS.flatMap(m => getAllTopicsFromMateria(m));

export default function Resumos() {
  const navigate = useNavigate();
  const [resumos, setResumos] = useState<ResumoItem[]>([]);
  const [temaEspecifico, setTemaEspecifico] = useState<string>("todos");

  const getRandomTopics = (count: number, filterTema: string) => {
    let pool = ALL_TOPICS;
    if (filterTema !== "todos") {
      pool = ALL_TOPICS.filter(t => t.hubNomes.includes(filterTema));
    }
    if (pool.length === 0) return [];
    
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length)).map(t => ({
      materiaSlug: t.materiaSlug,
      topico: t.topico
    }));
  };

  const loadInitial = () => {
    setResumos(getRandomTopics(3, temaEspecifico));
  };

  const loadMore = () => {
    setResumos(prev => [...prev, ...getRandomTopics(3, temaEspecifico)]);
  };

  const handleTemaChange = (val: string) => {
    setTemaEspecifico(val);
    setResumos(getRandomTopics(3, val));
  };

  useEffect(() => {
    loadInitial();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-emerald-500/20">
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
              Explorar Resumos
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {resumos.map((r, i) => (
            <div key={`${r.materiaSlug}-${r.topico}-${i}`} className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full" style={{ animationDelay: `${(i % 3) * 100}ms` }}>
              <ResumoCard materiaSlug={r.materiaSlug} topico={r.topico} />
            </div>
          ))}
        </div>

        {resumos.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-12 text-muted-foreground/50 gap-4">
             <span className="text-sm font-medium">Nenhum tópico encontrado para este filtro.</span>
           </div>
        ) : (
          <button
            onClick={loadMore}
            className="mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-full text-sm font-medium transition-all text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4" />
            Carregar Mais
          </button>
        )}
      </main>
    </div>
  );
}
