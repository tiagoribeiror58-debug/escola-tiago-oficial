import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bookmark, Loader2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';

interface StudyNote {
  id: string;
  topico: string;
  user_reflection: string;
  ai_complement: string;
  created_at: string;
}

export function SavedCardsDrawer({ type }: { type: 'curiosidades' | 'resumos' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState<StudyNote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCards();
    }
  }, [isOpen]);

  const loadCards = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      let query = supabase
        .from('study_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (type === 'curiosidades') {
        query = query.eq('materia_slug', 'curiosidades');
      } else {
        query = query.neq('materia_slug', 'curiosidades');
      }

      const { data, error } = await query;
        
      if (error) throw error;
      setCards(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/50 shadow-sm text-sm font-medium">
          <Bookmark className="w-4 h-4" />
          <span className="hidden sm:inline">Cartões Salvos</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl">
        <SheetHeader className="p-6 border-b border-border/50 bg-muted/10 sticky top-0 z-10">
          <SheetTitle className="flex items-center gap-2 text-foreground/90 font-semibold tracking-tight">
            <Bookmark className="w-5 h-5 text-indigo-500" />
            Seu Histórico de Cartões
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-6">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground/50" />
            </div>
          ) : cards.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum cartão salvo ainda.
            </div>
          ) : (
            <div className="space-y-6 pb-20">
              {cards.map(card => (
                  <div key={card.id} className="group relative rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-border">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50" />
                    <div className="p-4 sm:p-5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center justify-between">
                        <span>{card.topico}</span>
                      </div>
                      
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-foreground/90 font-medium">
                        <ReactMarkdown>{card.ai_complement}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
