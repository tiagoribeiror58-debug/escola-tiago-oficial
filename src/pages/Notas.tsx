import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface StudyNote {
  id: string;
  materia_slug: string;
  topico: string;
  user_reflection: string;
  ai_complement: string;
  created_at: string;
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
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">Caderno de Notas</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : !notas || notas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Nenhuma nota salva</h2>
            <p className="text-muted-foreground max-w-md">
              Ao encerrar uma sessão de estudos, você terá a opção de fazer uma reflexão usando a Técnica de Feynman. Suas notas aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notas.map((nota) => (
              <div key={nota.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors shadow-sm flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md">
                      {nota.materia_slug}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {format(new Date(nota.created_at), "dd 'de' MMM, HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                  <h3 className="text-base font-bold leading-tight mt-2">{nota.topico}</h3>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Sua Reflexão</h4>
                    <p className="text-sm text-foreground/90 italic leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/50">
                      "{nota.user_reflection}"
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-primary font-semibold mb-1 flex items-center gap-1">
                      ✦ Complemento da IA
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed bg-primary/5 p-3 rounded-xl border border-primary/10">
                      {nota.ai_complement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
