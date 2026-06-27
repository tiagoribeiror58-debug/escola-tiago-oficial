import { useState, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ALL_TOPICS } from '@/lib/materias';

interface TopicSelectorProps {
  onSelect: (materiaSlug: string, topico: string) => void;
}

type Level = 'hubs' | 'materias' | 'topicos';

export function TopicSelector({ onSelect }: TopicSelectorProps) {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState<Level>('hubs');
  const [selectedHub, setSelectedHub] = useState<string | null>(null);
  const [selectedMateria, setSelectedMateria] = useState<string | null>(null);

  // Compute lists based on current state
  const hubs = useMemo(() => {
    return Array.from(new Set(ALL_TOPICS.map(t => t.hubNomes[0]))).sort();
  }, []);

  const materias = useMemo(() => {
    if (!selectedHub) return [];
    return Array.from(new Set(
      ALL_TOPICS.filter(t => t.hubNomes[0] === selectedHub).map(t => t.materia)
    )).sort();
  }, [selectedHub]);

  const topics = useMemo(() => {
    if (!selectedMateria) return [];
    return ALL_TOPICS.filter(t => t.materia === selectedMateria);
  }, [selectedMateria]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setLevel('hubs');
        setSelectedHub(null);
        setSelectedMateria(null);
      }, 200);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="flex h-9 w-full items-center justify-between rounded-md border border-border/50 bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          Tópico específico...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] sm:w-[400px] max-h-[80vh] p-0" align="end">
        <Command>
          <CommandInput placeholder="Pesquisar..." />
          <CommandList className="max-h-[60vh] overflow-y-auto">
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            
            {level === 'hubs' && (
              <CommandGroup heading="Selecione um Hub">
                {hubs.map(hub => (
                  <CommandItem
                    key={hub}
                    value={hub}
                    onSelect={() => {
                      setSelectedHub(hub);
                      setLevel('materias');
                    }}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <span>{hub}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {level === 'materias' && (
              <CommandGroup heading={`Hub: ${selectedHub}`}>
                <CommandItem
                  onSelect={() => {
                    setLevel('hubs');
                    setSelectedHub(null);
                  }}
                  className="flex items-center gap-2 cursor-pointer text-muted-foreground mb-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar para Hubs
                </CommandItem>
                {materias.map(materia => (
                  <CommandItem
                    key={materia}
                    value={materia}
                    onSelect={() => {
                      setSelectedMateria(materia);
                      setLevel('topicos');
                    }}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <span>{materia}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {level === 'topicos' && (
              <CommandGroup heading={`Matéria: ${selectedMateria}`}>
                <CommandItem
                  onSelect={() => {
                    setLevel('materias');
                    setSelectedMateria(null);
                  }}
                  className="flex items-center gap-2 cursor-pointer text-muted-foreground mb-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar para Matérias
                </CommandItem>
                {topics.map(t => (
                  <CommandItem
                    key={`${t.materiaSlug}-${t.topico}`}
                    value={t.topico}
                    onSelect={() => {
                      onSelect(t.materiaSlug, t.topico);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    {t.topico}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
