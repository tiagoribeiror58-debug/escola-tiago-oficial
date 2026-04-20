import { useParams, useNavigate } from 'react-router-dom';
import { useSessoes } from '@/hooks/useSessoes';
import { getMateriaBySlug } from '@/lib/materias';
import { ArrowLeft, Clock, MessageCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Historico() {
  const { materia: slug } = useParams<{ materia: string }>();
  const navigate = useNavigate();
  const { data: sessoes, isLoading } = useSessoes();
  const materiaConfig = getMateriaBySlug(slug || '');

  if (!materiaConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Matéria não encontrada.</p>
      </div>
    );
  }

  const sessoesMateria = (sessoes || [])
    .filter(s => s.materia === slug)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center gap-3 px-4 py-4 border-b border-border bg-card sticky top-0 z-10">
        <button
          onClick={() => navigate('/')}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-semibold flex items-center gap-2">
            <span className="text-xl leading-none">{materiaConfig.emoji}</span>
            Histórico: {materiaConfig.nome}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {sessoesMateria.length} sessões registradas
          </p>
        </div>
      </header>

      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          </div>
        ) : sessoesMateria.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
            <Clock className="w-8 h-8 mb-3 opacity-20" />
            <p>Nenhuma sessão salva ainda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessoesMateria.map((sessao) => (
              <div 
                key={sessao.id} 
                className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 transition-colors hover:border-foreground/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-foreground">{sessao.topico}</h3>
                    <p className="text-xs text-muted-foreground mt-1 capitalize">
                      {format(new Date(sessao.data), "eeee, d 'de' MMMM", { locale: ptBR })}
                    </p>
                  </div>
                  
                  {sessao.nivel && (
                    <span className={cn(
                      'text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md shrink-0',
                      sessao.nivel === 3 ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
                      sessao.nivel === 2 ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                      'bg-muted text-muted-foreground'
                    )}>
                      Nível {sessao.nivel}
                    </span>
                  )}
                </div>

                {sessao.observacoes && (
                  <div className="bg-muted/50 rounded-lg p-3 text-sm text-foreground/80 leading-relaxed border border-border/50">
                    {sessao.observacoes}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-1 pt-1">
                  {sessao.session_key ? (
                    <button
                      onClick={() => navigate(`/sessao/${slug}?resume=${sessao.session_key}`)}
                      className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity bg-blue-500/10 px-3 py-1.5 rounded-full"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Retomar Bate-papo
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground opacity-60">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Chat não foi mantido
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
