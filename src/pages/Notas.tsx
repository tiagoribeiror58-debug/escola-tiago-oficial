import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Loader2, ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface StudyNote {
  id: string;
  materia_slug: string;
  topico: string;
  user_reflection: string;
  ai_complement: string;
  created_at: string;
}

function NotaItem({ nota }: { nota: StudyNote }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/30 last:border-0 group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-start sm:items-center justify-between text-left transition-colors px-2 sm:px-4 rounded-xl hover:bg-muted/30 -mx-2 sm:-mx-4"
      >
        <div className="pr-4">
          <h3 className={cn("text-[15px] sm:text-base font-medium transition-colors", isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground")}>
            {nota.topico}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              {nota.materia_slug.replace('-hub', '').replace(/-/g, ' ')}
            </span>
            <span className="text-muted-foreground/30 text-[10px]">•</span>
            <span className="text-[11px] text-muted-foreground">
              {format(new Date(nota.created_at), "dd 'de' MMMM", { locale: ptBR })}
            </span>
          </div>
        </div>
        <div className="mt-1 sm:mt-0 p-1 rounded-full bg-muted/0 group-hover:bg-muted/50 transition-colors">
          <ChevronDown 
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
              isOpen ? "rotate-180" : ""
            )} 
          />
        </div>
      </button>
      
      <div 
        className={cn(
          "grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] px-2 sm:px-4 -mx-2 sm:-mx-4",
          isOpen ? "grid-rows-[1fr] opacity-100 pb-8 pt-2" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden flex flex-col gap-6">
          {nota.user_reflection && nota.user_reflection.trim() !== 'Trecho destacado:' && (
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2 font-semibold">
                Sua Nota
              </h4>
              <p className="text-sm sm:text-[15px] text-foreground/80 leading-relaxed font-serif whitespace-pre-wrap">
                {nota.user_reflection}
              </p>
            </div>
          )}
          
          {nota.ai_complement && (
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-primary/70 mb-2 font-semibold">
                Revisão IA
              </h4>
              <p className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed font-serif whitespace-pre-wrap">
                {nota.ai_complement}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Notas() {
  const navigate = useNavigate();

  const { data: notas, isLoading } = useQuery({
    queryKey: ['study_notes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('study_notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as StudyNote[];
    },
  });

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold tracking-wide text-foreground/90">Caderno</h1>
          <div className="w-9" /> {/* Spacer para centralizar o título */}
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-muted-foreground/50 gap-4">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-xs font-medium uppercase tracking-widest">Sincronizando</span>
          </div>
        ) : !notas || notas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-700">
            <div className="w-12 h-12 rounded-2xl bg-muted/30 flex items-center justify-center mb-6 ring-1 ring-border/50">
              <BookOpen className="w-5 h-5 text-muted-foreground/40" />
            </div>
            <h2 className="text-base font-medium text-foreground/80 mb-2">Página em branco</h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Suas reflexões e notas salvas aparecerão aqui, organizadas por contexto.
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {notas.map((nota) => (
              <NotaItem key={nota.id} nota={nota} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
