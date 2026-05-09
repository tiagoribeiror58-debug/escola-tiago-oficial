import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GitCommit, GitPullRequest, MessagesSquare } from 'lucide-react';

export function ArgumentMap() {
  return (
    <div className="flex flex-col h-full w-full bg-background border-l border-border p-6 overflow-y-auto">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <MessagesSquare className="w-6 h-6 text-indigo-500" />
          Argument Map
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Estrutura Lógica: Tese, Argumentos e Evidências
        </p>
      </div>

      <div className="flex-1 min-h-0 relative">
        {/* Central Vertical Line */}
        <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-border z-0" />

        <div className="space-y-8 relative z-10">
          {/* Tese Central */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-background z-10" />
            <Card className="ml-12 border-indigo-500/30 bg-indigo-500/5 shadow-sm">
              <CardContent className="p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-1">Tese Central</div>
                <h3 className="font-semibold text-lg text-foreground">
                  A adoção de Inteligência Artificial reduzirá a semana de trabalho para 4 dias em 10 anos.
                </h3>
              </CardContent>
            </Card>
          </div>

          {/* Argumento 1 */}
          <div className="relative">
            <div className="absolute left-[31px] top-6 w-8 h-0.5 bg-border z-10" />
            <div className="absolute left-6 top-6 w-3 h-3 rounded-full bg-muted-foreground ring-4 ring-background z-10" />
            <Card className="ml-16 border-border/50 bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  <GitPullRequest className="w-3 h-3" />
                  Premissa Maior (Produtividade)
                </div>
                <p className="text-sm font-medium text-foreground mb-3">
                  Ganhos massivos de produtividade historicamente se traduzem em redução de jornada de trabalho, não apenas em maior lucro.
                </p>
                
                {/* Evidência */}
                <div className="pl-4 border-l-2 border-emerald-500/30 py-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-0.5 flex items-center gap-1">
                    <GitCommit className="w-3 h-3" />
                    Evidência Empírica
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A Revolução Industrial aumentou a produtividade têxtil e resultou na queda da jornada semanal de 80h para 40h entre 1890 e 1940 (Dados: OIT).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Argumento 2 */}
          <div className="relative">
            <div className="absolute left-[31px] top-6 w-8 h-0.5 bg-border z-10" />
            <div className="absolute left-6 top-6 w-3 h-3 rounded-full bg-muted-foreground ring-4 ring-background z-10" />
            <Card className="ml-16 border-border/50 bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  <GitPullRequest className="w-3 h-3" />
                  Premissa Menor (Capacidade da IA)
                </div>
                <p className="text-sm font-medium text-foreground mb-3">
                  LLMs e agentes autônomos automatizam tarefas cognitivas rotineiras que hoje ocupam 30% do tempo dos knowledge workers.
                </p>
                
                {/* Evidência */}
                <div className="pl-4 border-l-2 border-emerald-500/30 py-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-0.5 flex items-center gap-1">
                    <GitCommit className="w-3 h-3" />
                    Dado Estatístico
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Estudo do MIT (2023) mostra que programadores usando Copilot concluem tarefas 55% mais rápido. Consultores com GPT-4 finalizam análises 25% mais rápido e com 40% mais qualidade.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contra-argumento (Refutação) */}
          <div className="relative">
            <div className="absolute left-[31px] top-6 w-8 h-0.5 bg-border z-10" />
            <div className="absolute left-6 top-6 w-3 h-3 rounded-full bg-destructive/50 ring-4 ring-background z-10" />
            <Card className="ml-16 border-destructive/20 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-destructive mb-1">
                  Antítese / Contra-argumento Frequente
                </div>
                <p className="text-sm font-medium text-foreground mb-3">
                  "A Lei de Parkinson diz que o trabalho se expande para preencher o tempo. Se as pessoas forem mais rápidas, os chefes darão mais trabalho, não mais folga."
                </p>
                
                {/* Resposta */}
                <div className="pl-4 border-l-2 border-indigo-500/30 py-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-0.5">
                    Refutação
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A fadiga cognitiva humana tem um limite físico. O gargalo deixará de ser o tempo de execução (feito pela IA) e passará a ser a capacidade de julgamento e revisão do humano, que esgota rapidamente em menos de 4 dias densos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
