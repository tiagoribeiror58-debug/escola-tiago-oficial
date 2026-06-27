import { useState, useEffect } from 'react';
import { ArrowLeft, Filter, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResumoCard } from '@/components/ResumoCard';
import { MATERIAS, ALL_TOPICS } from '@/lib/materias';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from '@/integrations/supabase/client';

const ALL_MATERIAS_LIST = Array.from(new Set(ALL_TOPICS.map(t => t.materia))).sort();
const ALL_HUBS_LIST = Array.from(new Set(ALL_TOPICS.flatMap(t => t.hubNomes))).sort();

interface ResumoItem {
  materiaSlug: string;
  topico: string;
  isFlashcardDue?: boolean;
}

// Extrai todos os hubs (nomes) para o filtro
function collectHubNames(m: typeof MATERIAS[number]): string[] {
  if (!m.children || m.children.length === 0) return [m.nome];
  return [m.nome, ...m.children.flatMap(collectHubNames)];
}
const ALL_SUBJECTS = Array.from(new Set(MATERIAS.flatMap(collectHubNames))).sort();


export default function Resumos() {
  const navigate = useNavigate();
  const [resumos, setResumos] = useState<ResumoItem[]>([]);
  const [temaEspecifico, setTemaEspecifico] = useState<string>("todos");
  const [filterMode, setFilterMode] = useState<'materias' | 'hubs'>('materias');
  const [open, setOpen] = useState(false);
  const [batchSize, setBatchSize] = useState<number>(3);
  const [flashcardsInfo, setFlashcardsInfo] = useState<{ all: Set<string>, due: Set<string> }>({ all: new Set(), due: new Set() });

  const getRandomTopics = (count: number, filterTema: string, mode: 'materias' | 'hubs', info = flashcardsInfo) => {
    let pool = ALL_TOPICS;
    if (filterTema !== "todos") {
      if (mode === 'materias') {
        pool = ALL_TOPICS.filter(t => t.materia === filterTema);
      } else {
        pool = ALL_TOPICS.filter(t => t.hubNomes.includes(filterTema));
      }
    }
    
    // Filtro anti-repetição:
    // Remover tópicos que estão nos flashcards, EXCETO se estiverem vencidos (due)
    pool = pool.filter(t => {
      const isSaved = info.all.has(t.topico);
      const isDue = info.due.has(t.topico);
      if (isSaved && !isDue) return false; // Remove os já aprendidos/não vencidos
      return true; // Mantém inéditos e vencidos
    });

    if (pool.length === 0) return [];
    
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length)).map(t => ({
      materiaSlug: t.materiaSlug,
      topico: t.topico,
      isFlashcardDue: info.due.has(t.topico)
    }));
  };

  const loadInitial = (qtd: number) => {
    setBatchSize(qtd);
    setResumos(getRandomTopics(qtd, temaEspecifico));
  };

  const loadMore = (qtd: number) => {
    setBatchSize(qtd);
    setResumos(prev => [...prev, ...getRandomTopics(qtd, temaEspecifico)]);
  };

  const handleSearch = (val: string, mode: 'materias' | 'hubs') => {
    setTemaEspecifico(val);
    setFilterMode(mode);
    if (resumos.length > 0) {
      setResumos(getRandomTopics(batchSize, val, mode));
    } else {
      setResumos([]);
    }
  };

  useEffect(() => {
    const fetchFlashcards = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('flashcards').select('topico, next_review_date').eq('user_id', user.id);
      if (data) {
        const now = new Date().toISOString();
        const all = new Set(data.map(d => d.topico));
        const due = new Set(data.filter(d => d.next_review_date <= now).map(d => d.topico));
        setFlashcardsInfo({ all, due });
      }
    };
    fetchFlashcards();
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

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 max-w-[250px] sm:max-w-[400px] w-full">
            <div className="flex bg-muted/50 rounded-lg p-1 w-full sm:w-auto shrink-0 border border-border/50">
              <button
                onClick={() => { setFilterMode('materias'); setTemaEspecifico('todos'); handleSearch('todos', 'materias'); }}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filterMode === 'materias' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Matérias
              </button>
              <button
                onClick={() => { setFilterMode('hubs'); setTemaEspecifico('todos'); handleSearch('todos', 'hubs'); }}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filterMode === 'hubs' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Hubs
              </button>
            </div>
            
            <div className="flex items-center gap-2 w-full relative">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button
                    role="combobox"
                    aria-expanded={open}
                    className="flex h-9 w-full items-center justify-between rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {temaEspecifico === 'todos' 
                      ? `Todos os ${filterMode === 'materias' ? 'Matérias' : 'Hubs'}` 
                      : temaEspecifico}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] sm:w-[400px] p-0" align="end">
                  <Command>
                    <CommandInput placeholder={`Pesquisar ${filterMode === 'materias' ? 'matéria' : 'hub'}...`} />
                    <CommandList>
                      <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="todos"
                          onSelect={() => {
                            handleSearch('todos', filterMode);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              temaEspecifico === 'todos' ? "opacity-100" : "opacity-0"
                            )}
                          />
                          Todos os {filterMode === 'materias' ? 'Matérias' : 'Hubs'}
                        </CommandItem>
                        {(filterMode === 'materias' ? ALL_MATERIAS_LIST : ALL_HUBS_LIST).map((sub) => (
                          <CommandItem
                            key={sub}
                            value={sub}
                            onSelect={(currentValue) => {
                              // Shadcn Command envia o value em minúsculo por padrão,
                              // então usamos o sub original
                              handleSearch(sub, filterMode);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                temaEspecifico === sub ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {sub}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-8">
        {resumos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground/90 mb-3">
              Quantos resumos você quer estudar agora?
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              Selecione a quantidade para começarmos a gerar resumos de tópicos sobre {temaEspecifico === 'todos' ? (filterMode === 'materias' ? 'diversas matérias' : 'diversos hubs') : `"${temaEspecifico}"`}.
            </p>
            <div className="flex items-center gap-4">
              {[1, 2, 3, 5].map((qtd) => (
                <button
                  key={qtd}
                  onClick={() => loadInitial(qtd)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted/30 border border-border/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-500 transition-all flex items-center justify-center text-lg sm:text-xl font-semibold text-foreground/70"
                >
                  {qtd}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {resumos.map((r, i) => (
              <div key={`${r.materiaSlug}-${r.topico}-${i}`} className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full" style={{ animationDelay: `${(i % 3) * 100}ms` }}>
                <ResumoCard materiaSlug={r.materiaSlug} topico={r.topico} isFlashcardDue={r.isFlashcardDue} />
              </div>
            ))}
          </div>
        )}

        {resumos.length > 0 && (
          <div className="mt-8 flex flex-col items-center justify-center p-8 bg-muted/10 border border-border/50 rounded-3xl w-full">
            <h3 className="text-sm font-semibold text-foreground/80 mb-4 uppercase tracking-wider">Quantos mais você quer ver agora?</h3>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 5].map((qtd) => (
                <button
                  key={qtd}
                  onClick={() => loadMore(qtd)}
                  className="w-12 h-12 rounded-2xl bg-muted/30 border border-border/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-500 transition-all flex items-center justify-center font-medium text-foreground/70"
                >
                  {qtd}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
