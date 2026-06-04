import { useSessoes } from '@/hooks/useSessoes';
import { Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MetaDiariaCard() {
  const { data: sessoes } = useSessoes();
  const metaDiaria = 3;

  const topicosEstudadosHoje = useMemo(() => {
    if (!sessoes) return 0;
    const getLocalIso = (date: Date) => {
      return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    };
    const hojeIso = getLocalIso(new Date());

    const sessoesHoje = sessoes.filter(s => {
      const sessaoIso = getLocalIso(new Date(s.data));
      return sessaoIso === hojeIso;
    });

    const topicosUnicos = new Set(sessoesHoje.map(s => `${s.materia}-${s.topico}`));
    return topicosUnicos.size;
  }, [sessoes]);

  const progresso = Math.min((topicosEstudadosHoje / metaDiaria) * 100, 100);
  const concluido = topicosEstudadosHoje >= metaDiaria;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left mb-6 group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-4 sm:p-5 hover:border-border transition-all shadow-sm">
          {/* Fundo dinâmico */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm",
                concluido ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-primary/5 text-primary border border-primary/10"
              )}>
                {concluido ? <CheckCircle2 className="w-6 h-6" /> : <Target className="w-6 h-6" />}
              </div>
              
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  Meta Diária
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 sm:line-clamp-none pr-2">
                  {concluido 
                    ? "Você bateu sua meta! O conhecimento é sua maior recompensa." 
                    : `Estude mais ${metaDiaria - topicosEstudadosHoje} ${metaDiaria - topicosEstudadosHoje === 1 ? 'tópico' : 'tópicos'} hoje para manter o ritmo.`}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0 flex flex-col items-end">
              <span className="text-sm font-bold text-foreground">
                {topicosEstudadosHoje} <span className="text-muted-foreground text-xs font-medium">/ {metaDiaria}</span>
              </span>
              <div className="w-16 h-1.5 bg-muted rounded-full mt-1.5 overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    concluido ? "bg-emerald-500" : "bg-primary"
                  )}
                  style={{ width: `${progresso}%` }}
                />
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md p-6 rounded-3xl bg-background border border-border">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Por que 3 tópicos?
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            Muitas vezes <strong>não sabemos o quanto e quando estudar por dia</strong>, o que pode gerar ansiedade, sobrecarga ou procrastinação.
          </p>
          <p>
            Definir uma meta pequena e alcançável de <strong>3 tópicos diários</strong> ajuda a manter a constância sem te esgotar. É o suficiente para avançar continuamente, mantendo o aprendizado sustentável.
          </p>
          <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 text-foreground">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Recompensa Intrínseca
            </h4>
            <p className="text-xs text-muted-foreground">
              A verdadeira recompensa não é um troféu virtual ou pontos numa tela, mas sim a <strong>construção do seu próprio hábito e a clareza do seu conhecimento</strong>. Cada tópico concluído é um degrau a mais na sua evolução pessoal, e isso ninguém tira de você.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
