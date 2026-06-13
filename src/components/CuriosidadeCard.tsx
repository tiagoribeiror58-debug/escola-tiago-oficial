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

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useTodosEstadosFlat } from '@/hooks/useSessoes';
import { ChevronsUpDown, Check } from 'lucide-react';

const STORAGE_KEY = '@escola-tiago:curiosidade-dia';

export function CuriosidadeCard({ materiasAtuais = [] }: { materiasAtuais?: string[] }) {
  const [curiosidade, setCuriosidade] = useState<CuriosidadeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState<string>('all');
  const { estados } = useTodosEstadosFlat();
  const availableMaterias = estados.map(e => e.config);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loadCuriosidade = async (forceRefresh = false) => {
    const todayStr = new Date().toDateString();
    
    if (!forceRefresh && selectedMateria === 'all') {
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
      const temaEspecifico = selectedMateria === 'all' ? undefined : availableMaterias.find(m => m.slug === selectedMateria)?.nome;
      const { data, error } = await supabase.functions.invoke('curiosidade-dia', {
        body: { materiasAtuais, temaEspecifico }
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
    loadCuriosidade(selectedMateria !== 'all');
  }, [selectedMateria]);

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

  // if (!curiosidade && !isLoading) return null; // Remover isso para a UI sempre ficar visível pra poder trocar o dropdown

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
          
          <div className="flex items-center gap-2">
            <Popover open={open} onOpenChange={setOpen} modal={true}>
              <PopoverTrigger asChild>
                <button
                  role="combobox"
                  aria-expanded={open}
                  className="h-8 bg-background/50 border-border/50 text-xs rounded-lg px-2.5 text-foreground hover:bg-muted transition-colors border shadow-sm flex items-center justify-between min-w-[140px] max-w-[180px]"
                >
                  <span className="truncate mr-2">
                    {selectedMateria === 'all' 
                      ? "Qualquer assunto" 
                      : availableMaterias.find((m) => m.slug === selectedMateria)?.nome || "Selecionar..."}
                  </span>
                  <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="end">
                <Command>
                  <CommandInput placeholder="Buscar matéria..." className="h-9 text-xs" />
                  <CommandList>
                    <CommandEmpty>Nenhuma encontrada.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value="all"
                        onSelect={() => {
                          setSelectedMateria('all');
                          setOpen(false);
                        }}
                        className="text-xs"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-3 w-3",
                            selectedMateria === 'all' ? "opacity-100" : "opacity-0"
                          )}
                        />
                        Qualquer assunto
                      </CommandItem>
                      {availableMaterias.map(m => (
                        <CommandItem
                          key={m.slug}
                          value={m.nome}
                          onSelect={() => {
                            setSelectedMateria(m.slug);
                            setOpen(false);
                          }}
                          className="text-xs"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-3 w-3",
                              selectedMateria === m.slug ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {m.nome}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <button 
              onClick={() => loadCuriosidade(true)}
              disabled={isLoading}
              className="p-2 hover:bg-muted/50 rounded-full transition-colors text-muted-foreground hover:text-foreground disabled:opacity-50"
              title="Gerar nova curiosidade"
            >
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </button>
          </div>
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
