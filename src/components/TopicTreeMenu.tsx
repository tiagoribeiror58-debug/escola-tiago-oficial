import { useState, useMemo, useEffect } from 'react';
import { ALL_TOPICS } from '@/lib/materias';
import { ChevronRight, ChevronDown, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useFavoriteHubs, useToggleFavoriteHub } from '@/hooks/useFavoriteHubs';

interface TopicTreeMenuProps {
  onSelectTopic: (materiaSlug: string, topico: string) => void;
  tipo: 'resumo' | 'curiosidade';
  selectedTopico?: string | null;
}

export function TopicTreeMenu({ onSelectTopic, tipo, selectedTopico }: TopicTreeMenuProps) {
  const [expandedHubs, setExpandedHubs] = useState<Set<string>>(new Set());
  const [expandedMaterias, setExpandedMaterias] = useState<Set<string>>(new Set());
  const [cachedTopics, setCachedTopics] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: favoriteHubs = [] } = useFavoriteHubs();
  const toggleFavorite = useToggleFavoriteHub();

  // Fetch cached topics
  useEffect(() => {
    const fetchCache = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data: cacheData } = await supabase
        .from('ai_content_cache')
        .select('materia_slug, topico')
        .eq('tipo', tipo)
        .eq('user_id', session.user.id);
      
      if (cacheData) {
        const cacheSet = new Set(cacheData.map(d => `${d.materia_slug}:${d.topico}`));
        setCachedTopics(cacheSet);
      }

      if (cacheData) {
        const cacheSet = new Set(cacheData.map(d => `${d.materia_slug}:${d.topico}`));
        setCachedTopics(cacheSet);
      }
    };

    fetchCache();

    // Setup real-time listener to update the checkmarks if a new one is generated
    const channel = supabase
      .channel('ai_cache_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ai_content_cache',
          filter: `tipo=eq.${tipo}`
        },
        (payload) => {
          const newRow = payload.new as { materia_slug: string, topico: string };
          setCachedTopics(prev => {
            const next = new Set(prev);
            next.add(`${newRow.materia_slug}:${newRow.topico}`);
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tipo]);

  const hubs = useMemo(() => {
    const hubMap = new Map<string, { nome: string, materias: Map<string, { nome: string, slug: string, topicos: typeof ALL_TOPICS }> }>();
    
    ALL_TOPICS.forEach(t => {
      const hub = t.hubNomes[0];
      if (!hubMap.has(hub)) {
        hubMap.set(hub, { nome: hub, materias: new Map() });
      }
      
      const hubData = hubMap.get(hub)!;
      if (!hubData.materias.has(t.materia)) {
        hubData.materias.set(t.materia, { nome: t.materia, slug: t.materiaSlug, topicos: [] });
      }
      
      hubData.materias.get(t.materia)!.topicos.push(t);
    });
    
    return Array.from(hubMap.values()).sort((a, b) => {
      const aFav = favoriteHubs.includes(a.nome);
      const bFav = favoriteHubs.includes(b.nome);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return a.nome.localeCompare(b.nome);
    });
  }, [favoriteHubs]);

  const filteredTopicsList = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return ALL_TOPICS.filter(t => 
      t.topico.toLowerCase().includes(query) || 
      t.materia.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleHub = (hub: string) => {
    setExpandedHubs(prev => {
      const next = new Set(prev);
      if (next.has(hub)) next.delete(hub);
      else next.add(hub);
      return next;
    });
  };

  const handleToggleFavoriteHub = (hubName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFavorite = favoriteHubs.includes(hubName);
    toggleFavorite.mutate({ hubName, isFavorite });
  };

  const toggleMateria = (materia: string) => {
    setExpandedMaterias(prev => {
      const next = new Set(prev);
      if (next.has(materia)) next.delete(materia);
      else next.add(materia);
      return next;
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="px-2">
        <input
          type="text"
          placeholder="Pesquisar tópicos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 rounded-md border border-border/50 bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {searchQuery.trim() ? (
          <div className="space-y-1">
            {filteredTopicsList.length === 0 ? (
              <p className="text-xs text-muted-foreground p-2 text-center">Nenhum tópico encontrado.</p>
            ) : (
              filteredTopicsList.map(t => {
                const isCached = cachedTopics.has(`${t.materiaSlug}:${t.topico}`);
                const isSelected = selectedTopico === t.topico;
                return (
                  <button
                    key={`${t.materiaSlug}-${t.topico}`}
                    onClick={() => onSelectTopic(t.materiaSlug, t.topico)}
                    className={cn(
                      "flex items-center justify-between w-full p-2 text-sm rounded-md transition-colors text-left group",
                      isSelected ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div>
                      <div className="font-medium text-foreground truncate max-w-[220px]">{t.topico}</div>
                      <div className="text-[10px] text-muted-foreground truncate max-w-[220px]">{t.materia}</div>
                    </div>
                    {isCached ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 opacity-80" />
                    ) : (
                      <Sparkles className="w-3 h-3 text-muted-foreground/50 shrink-0 group-hover:text-primary/50" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {hubs.map(hub => {
              const isHubExpanded = expandedHubs.has(hub.nome);
              const isFavorite = favoriteHubs.includes(hub.nome);
              const materiasList = Array.from(hub.materias.values()).sort((a, b) => a.nome.localeCompare(b.nome));
              
              return (
                <div key={hub.nome} className="mb-2">
                  <div
                    onClick={() => toggleHub(hub.nome)}
                    className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-md text-left transition-colors font-semibold cursor-pointer group/hub"
                  >
                    <div className="flex items-center">
                      {isHubExpanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                      {hub.nome}
                    </div>
                    <button
                      onClick={(e) => handleToggleFavoriteHub(hub.nome, e)}
                      className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-all shrink-0"
                    >
                      <Star
                        className={cn(
                          "w-3.5 h-3.5 transition-all",
                          isFavorite 
                            ? "fill-yellow-500 text-yellow-500 scale-110" 
                            : "opacity-0 group-hover/hub:opacity-100 hover:text-yellow-500"
                        )}
                      />
                    </button>
                  </div>
                  
                  {isHubExpanded && (
                    <div className="pl-4 mt-1 border-l ml-2 space-y-1 border-border/50">
                      {materiasList.map(materia => {
                        const isMateriaExpanded = expandedMaterias.has(materia.nome);
                        
                        return (
                          <div key={materia.nome}>
                            <button
                              onClick={() => toggleMateria(materia.nome)}
                              className="flex items-center w-full p-2 hover:bg-accent rounded-md text-left transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
                            >
                              {isMateriaExpanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                              {materia.nome}
                            </button>
                            
                            {isMateriaExpanded && (
                              <div className="pl-6 mt-1 space-y-1">
                                {materia.topicos.map(t => {
                                  const isCached = cachedTopics.has(`${t.materiaSlug}:${t.topico}`);
                                  const isSelected = selectedTopico === t.topico;
                                  
                                  return (
                                    <button
                                      key={`${t.materiaSlug}-${t.topico}`}
                                      onClick={() => onSelectTopic(t.materiaSlug, t.topico)}
                                      className={cn(
                                        "flex items-center justify-between w-full p-2 text-sm rounded-md transition-colors text-left group",
                                        isSelected ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                                      )}
                                    >
                                      <span className="truncate pr-2">{t.topico}</span>
                                      {isCached ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 opacity-80" />
                                      ) : (
                                        <Sparkles className="w-3 h-3 text-muted-foreground/50 shrink-0 group-hover:text-primary/50" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
