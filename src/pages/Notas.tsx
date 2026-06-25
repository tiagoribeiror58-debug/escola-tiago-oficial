import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Loader2, ArrowLeft, ChevronDown, Lightbulb, RefreshCw, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StudyNote {
  id: string;
  materia_slug: string;
  topico: string;
  user_reflection: string;
  ai_complement: string;
  created_at: string;
}

function getNoteTypeInfo(nota: StudyNote) {
  if (nota.topico === 'Você Sabia?' || nota.materia_slug === 'curiosidades') {
    return { icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Curiosidade' };
  }
  if (nota.topico.includes('Revisão') || nota.materia_slug === 'revisao') {
    return { icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Revisão' };
  }
  return { icon: Bookmark, color: 'text-indigo-500', bg: 'bg-indigo-500/10', label: 'Anotação' };
}

function NotaItem({ nota }: { nota: StudyNote }) {
  const [isOpen, setIsOpen] = useState(false);
  const info = getNoteTypeInfo(nota);
  const Icon = info.icon;

  return (
    <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden group transition-all hover:border-border/80">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between text-left transition-colors"
      >
        <div className="flex items-start gap-4 pr-4">
          <div className={cn("p-2.5 rounded-xl shrink-0 mt-1 sm:mt-0", info.bg)}>
            <Icon className={cn("w-5 h-5", info.color)} />
          </div>
          <div>
            <h3 className={cn("text-[15px] sm:text-base font-semibold transition-colors", isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground")}>
              {nota.topico}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={cn("text-[10px] uppercase tracking-wider font-bold", info.color)}>
                {info.label}
              </span>
              <span className="text-muted-foreground/30 text-[10px]">•</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {nota.materia_slug !== 'curiosidades' && nota.materia_slug.replace('-hub', '').replace(/-/g, ' ')}
              </span>
              {nota.materia_slug !== 'curiosidades' && <span className="text-muted-foreground/30 text-[10px]">•</span>}
              <span className="text-[11px] text-muted-foreground">
                {format(new Date(nota.created_at), "dd 'de' MMM, yyyy", { locale: ptBR })}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2 sm:mt-0 p-1.5 rounded-full bg-muted/30 group-hover:bg-muted/80 transition-colors shrink-0">
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
          "grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-muted/10",
          isOpen ? "grid-rows-[1fr] opacity-100 border-t border-border/50" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4 sm:p-5 flex flex-col gap-6">
            {nota.user_reflection && nota.user_reflection.trim() !== 'Trecho destacado:' && (
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2 font-semibold">
                  {info.label === 'Curiosidade' ? 'Contexto / Conversa' : 'Sua Nota'}
                </h4>
                <p className="text-sm sm:text-[15px] text-foreground/80 leading-relaxed font-serif whitespace-pre-wrap">
                  {nota.user_reflection}
                </p>
              </div>
            )}
            
            {nota.ai_complement && (
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-primary/70 mb-2 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                  {info.label === 'Curiosidade' ? 'Curiosidade & IA' : 'Revisão IA'}
                </h4>
                <div className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed font-serif whitespace-pre-wrap bg-background/50 p-4 rounded-xl border border-border/50">
                  {nota.ai_complement}
                </div>
              </div>
            )}
          </div>
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

  const curiosidades = notas?.filter(n => n.topico === 'Você Sabia?' || n.materia_slug === 'curiosidades') || [];
  const revisoes = notas?.filter(n => n.topico.includes('Revisão') || n.materia_slug === 'revisao') || [];
  const outros = notas?.filter(n => n.topico !== 'Você Sabia?' && n.materia_slug !== 'curiosidades' && !n.topico.includes('Revisão') && n.materia_slug !== 'revisao') || [];

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold tracking-wide text-foreground/90">Caderno de Notas</h1>
          <div className="w-9" />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-muted-foreground/50 gap-4">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-xs font-medium uppercase tracking-widest">Sincronizando</span>
          </div>
        ) : !notas || notas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-700">
            <div className="w-16 h-16 rounded-3xl bg-muted/30 flex items-center justify-center mb-6 ring-1 ring-border/50">
              <BookOpen className="w-6 h-6 text-muted-foreground/40" />
            </div>
            <h2 className="text-lg font-semibold text-foreground/80 mb-2">Seu caderno está vazio</h2>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Suas reflexões, revisões da IA e curiosidades salvas aparecerão aqui, organizadas por contexto.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="todos" className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex overflow-x-auto pb-4 mb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
              <TabsList className="bg-muted/40 p-1 border border-border/50 h-auto rounded-2xl w-max">
                <TabsTrigger value="todos" className="rounded-xl px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Todas <span className="ml-2 opacity-50 text-[10px] bg-muted-foreground/10 px-1.5 py-0.5 rounded-full">{notas.length}</span>
                </TabsTrigger>
                <TabsTrigger value="curiosidades" className="rounded-xl px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Você Sabia? <span className="ml-2 opacity-50 text-[10px] bg-muted-foreground/10 px-1.5 py-0.5 rounded-full">{curiosidades.length}</span>
                </TabsTrigger>
                <TabsTrigger value="revisoes" className="rounded-xl px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Revisões <span className="ml-2 opacity-50 text-[10px] bg-muted-foreground/10 px-1.5 py-0.5 rounded-full">{revisoes.length}</span>
                </TabsTrigger>
                <TabsTrigger value="outros" className="rounded-xl px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Caderno <span className="ml-2 opacity-50 text-[10px] bg-muted-foreground/10 px-1.5 py-0.5 rounded-full">{outros.length}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-4">
              <TabsContent value="todos" className="flex flex-col gap-4 outline-none">
                {notas.map(nota => <NotaItem key={nota.id} nota={nota} />)}
              </TabsContent>
              <TabsContent value="curiosidades" className="flex flex-col gap-4 outline-none">
                {curiosidades.map(nota => <NotaItem key={nota.id} nota={nota} />)}
                {curiosidades.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground text-sm">Nenhuma curiosidade salva ainda.</div>
                )}
              </TabsContent>
              <TabsContent value="revisoes" className="flex flex-col gap-4 outline-none">
                {revisoes.map(nota => <NotaItem key={nota.id} nota={nota} />)}
                {revisoes.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground text-sm">Nenhuma revisão salva ainda.</div>
                )}
              </TabsContent>
              <TabsContent value="outros" className="flex flex-col gap-4 outline-none">
                {outros.map(nota => <NotaItem key={nota.id} nota={nota} />)}
                {outros.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground text-sm">Nenhuma anotação manual salva ainda.</div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        )}
      </main>
    </div>
  );
}
