import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronsUpDown, Check, ListTree, Loader2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CuriosidadeChatCard } from '@/components/CuriosidadeChatCard';
import { ALL_TOPICS, MATERIAS } from '@/lib/materias';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { supabase } from '@/integrations/supabase/client';
import { DeckCards } from '@/components/DeckCards';
import { SavedCardsDrawer } from '@/components/SavedCardsDrawer';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TopicTreeMenu } from '@/components/TopicTreeMenu';
import { useToast } from '@/hooks/use-toast';

const ALL_MATERIAS_LIST = Array.from(new Set(ALL_TOPICS.map(t => t.materia)));
const ALL_HUBS_LIST = Array.from(new Set(ALL_TOPICS.flatMap(t => t.hubNomes)));

interface CuriosidadeItem {
  materiaSlug: string;
  topico: string;
}

export default function Curiosidades() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [curiosidades, setCuriosidades] = useState<CuriosidadeItem[]>(() => {
    try {
      const saved = localStorage.getItem('active_curiosidades_session');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [temaEspecifico, setTemaEspecifico] = useState<string>("todos");
  const [filterMode, setFilterMode] = useState<'materias' | 'hubs'>('materias');
  const [ordenacao, setOrdenacao] = useState<'aleatorio' | 'sequencial'>('aleatorio');
  const [open, setOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [batchSize, setBatchSize] = useState<number>(3);
  const [cachedTopics, setCachedTopics] = useState<Set<string>>(new Set());

  useEffect(() => {
    localStorage.setItem('active_curiosidades_session', JSON.stringify(curiosidades));
  }, [curiosidades]);

  useEffect(() => {
    const fetchCache = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data } = await supabase
        .from('ai_content_cache')
        .select('topico')
        .eq('tipo', 'curiosidade')
        .eq('user_id', session.user.id);
      
      if (data) {
        setCachedTopics(new Set(data.map(d => d.topico)));
      }
    };

    fetchCache();

    const channel = supabase
      .channel('curiosidades_cache_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'ai_content_cache', filter: "tipo=eq.curiosidade" },
        (payload) => {
          const newRow = payload.new as { topico: string };
          setCachedTopics(prev => {
            const next = new Set(prev);
            next.add(newRow.topico);
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getAvailableTopicsPool = (filterTema: string, mode: 'materias' | 'hubs', vistos = cachedTopics) => {
    let pool = ALL_TOPICS;
    if (filterTema !== "todos") {
      if (mode === 'materias') {
        pool = ALL_TOPICS.filter(t => t.materia === filterTema);
      } else {
        pool = ALL_TOPICS.filter(t => t.hubNomes.includes(filterTema));
      }
    }
    
    pool = pool.filter(t => !vistos.has(t.topico));
    return pool;
  };

  const getTopics = (count: number, filterTema: string, mode: 'materias' | 'hubs', ord = ordenacao, currentCuriosidades: CuriosidadeItem[] = []) => {
    let pool = getAvailableTopicsPool(filterTema, mode);

    if (pool.length === 0) return [];
    
    const alreadyShown = new Set(currentCuriosidades.map(c => c.topico));
    pool = pool.filter(p => !alreadyShown.has(p.topico));
    
    let resultList = pool;
    if (ord === 'aleatorio') {
      resultList = [...pool].sort(() => 0.5 - Math.random());
    }
    
    const selectedTopics = resultList.slice(0, Math.min(count, resultList.length));

    return selectedTopics.map(t => ({
      materiaSlug: t.materiaSlug,
      topico: t.topico
    }));
  };

  const loadInitial = (qtd: number) => {
    setBatchSize(qtd);
    setCuriosidades(getTopics(qtd, temaEspecifico, filterMode, ordenacao, []));
  };

  const loadMore = (qtd: number) => {
    setBatchSize(qtd);
    setCuriosidades(prev => [...prev, ...getTopics(qtd, temaEspecifico, filterMode, ordenacao, prev)]);
  };

  const loadSpecificTopic = (materiaSlug: string, topico: string) => {
    setCuriosidades(prev => {
      if (prev.some(p => p.topico === topico)) return prev;
      return [...prev, { materiaSlug, topico }];
    });
    setSheetOpen(false);
  };

  const handleNextSequential = (materiaSlug: string, topicoAtual: string) => {
    const pool = ALL_TOPICS.filter(t => t.materiaSlug === materiaSlug);
    const currIdx = pool.findIndex(t => t.topico === topicoAtual);
    if (currIdx >= 0 && currIdx < pool.length - 1) {
      const nextTopic = pool[currIdx + 1];

      setCuriosidades(prev => {
        if (prev.some(p => p.topico === nextTopic.topico)) {
          toast({ title: "Aviso", description: "O próximo tópico já está no seu baralho atual!" });
          return prev;
        }
        return [...prev, { materiaSlug: nextTopic.materiaSlug, topico: nextTopic.topico }];
      });
      
      toast({ title: "Tópico adicionado", description: `"${nextTopic.topico}" adicionado à fila.` });
    } else {
      toast({ title: "Fim da Matéria", description: "Não há mais tópicos disponíveis nesta matéria." });
    }
  };

  const handleSearch = (val: string, mode: 'materias' | 'hubs') => {
    setTemaEspecifico(val);
    setFilterMode(mode);
    if (curiosidades.length > 0) {
      setCuriosidades(getTopics(batchSize, val, mode, ordenacao, []));
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-indigo-500/20 pb-20">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold tracking-wide text-foreground/90 hidden sm:flex items-center gap-2">
              Explorar Curiosidades
            </h1>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  title="Abrir ementa e árvore de tópicos"
                  className="p-2 rounded-full hover:bg-muted/50 text-muted-foreground transition-colors ml-2"
                >
                  <ListTree className="w-5 h-5 text-indigo-500" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[340px] sm:w-[400px] p-0 flex flex-col">
                <SheetHeader className="p-4 border-b border-border/30 bg-muted/10 shrink-0">
                  <SheetTitle className="text-sm font-semibold">Tópicos e Ementa</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-hidden p-3">
                  <TopicTreeMenu
                    tipo="curiosidade"
                    onSelectTopic={loadSpecificTopic}
                    selectedTopico={curiosidades.length === 1 ? curiosidades[0].topico : null}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <div className="ml-1 hidden sm:block">
              <SavedCardsDrawer type="curiosidades" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 max-w-[250px] sm:max-w-[420px] w-full">
            {curiosidades.length > 0 && (
               <div className="hidden lg:flex bg-muted/50 rounded-lg p-1 mr-2 border border-border/50 items-center">
                 <span className="text-[10px] uppercase font-bold text-muted-foreground px-2">Gerar</span>
                 {[1, 2, 3].map((qtd) => (
                   <button
                     key={qtd}
                     onClick={() => loadMore(qtd)}
                     className="w-7 h-7 rounded-md hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors flex items-center justify-center text-xs font-semibold text-foreground/70"
                   >
                     +{qtd}
                   </button>
                 ))}
               </div>
            )}

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

            <div className="flex bg-muted/50 rounded-lg p-1 w-full sm:w-auto shrink-0 border border-border/50">
              <button
                onClick={() => setOrdenacao('aleatorio')}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-all ${ordenacao === 'aleatorio' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Aleatório
              </button>
              <button
                onClick={() => setOrdenacao('sequencial')}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-all ${ordenacao === 'sequencial' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Sequencial
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
                            onSelect={() => {
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
        {curiosidades.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground/90 mb-3">
              Quantas curiosidades você quer gerar agora?
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              Selecione a quantidade para começarmos a garimpar curiosidades surpreendentes sobre {temaEspecifico === 'todos' ? (filterMode === 'materias' ? 'diversas matérias' : 'diversos hubs') : `"${temaEspecifico}"`}.
            </p>
            <div className="flex items-center gap-4">
              {[1, 2, 3, 5].map((qtd) => (
                <button
                  key={qtd}
                  onClick={() => loadInitial(qtd)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted/30 border border-border/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:text-indigo-500 transition-all flex items-center justify-center text-lg sm:text-xl font-semibold text-foreground/70 shadow-sm hover:scale-105"
                >
                  {qtd}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <DeckCards>
            {curiosidades.map((c, i) => (
              <CuriosidadeChatCard 
                key={`${c.materiaSlug}-${c.topico}-${i}`} 
                materiaSlug={c.materiaSlug} 
                topico={c.topico} 
                onNextSequentialTopic={() => handleNextSequential(c.materiaSlug, c.topico)}
              />
            ))}
          </DeckCards>
        )}

        {/* Floating Action Bar para Mobile/Desktop */}
        {curiosidades.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-background/90 backdrop-blur-md border border-border/50 shadow-2xl rounded-full px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-10">
             <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Adicionar +</span>
             <div className="flex items-center gap-2">
              {[1, 2, 3].map((qtd) => (
                <button
                  key={qtd}
                  onClick={() => loadMore(qtd)}
                  className="w-10 h-10 rounded-full bg-muted border border-border/50 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all flex items-center justify-center font-bold text-foreground shadow-sm"
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
