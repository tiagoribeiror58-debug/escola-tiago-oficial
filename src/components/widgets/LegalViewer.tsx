import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronRight, FileText, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

interface Clause {
  id: string;
  title: string;
  content: string;
  explanation: string;
  risk: 'low' | 'medium' | 'high';
}

const termSheetClauses: Clause[] = [
  {
    id: 'valuation',
    title: '1. Valuation (Avaliação)',
    content: 'O investimento de R$ 2.000.000,00 será feito com base em um Valuation Pre-Money de R$ 8.000.000,00, resultando em um Valuation Post-Money de R$ 10.000.000,00. O Investidor receberá 20% de participação societária.',
    explanation: 'Define o valor da empresa antes (pre-money) e depois (post-money) do investimento. A diferença define o percentual que o investidor leva.',
    risk: 'medium'
  },
  {
    id: 'liquidation',
    title: '2. Liquidation Preference (Preferência de Liquidação)',
    content: 'Em caso de evento de liquidez (venda da empresa), o Investidor terá direito a receber o valor investido corrigido (1x non-participating) antes da distribuição aos demais acionistas.',
    explanation: 'Protege o investidor se a empresa for vendida por um valor menor que o esperado. 1x non-participating significa que ele escolhe entre pegar o dinheiro dele de volta OU o percentual que ele tem da venda.',
    risk: 'high'
  },
  {
    id: 'drag-along',
    title: '3. Drag Along (Obrigação de Venda Conjunta)',
    content: 'Caso acionistas que representem mais de 50% do capital social decidam vender suas ações para um terceiro, eles poderão obrigar os demais acionistas a venderem suas ações nas mesmas condições.',
    explanation: 'Permite que a maioria force a minoria a vender a empresa. Facilita a venda da startup inteira para um comprador que exija 100% das ações.',
    risk: 'medium'
  },
  {
    id: 'tag-along',
    title: '4. Tag Along (Direito de Venda Conjunta)',
    content: 'Caso os Fundadores recebam uma oferta para vender o controle da empresa, o Investidor terá o direito de incluir suas ações na venda, sob as mesmas condições e preço.',
    explanation: 'Protege os investidores minoritários. Se os fundadores "pularem fora" vendendo sua parte, o investidor pode vender junto.',
    risk: 'low'
  },
  {
    id: 'vesting',
    title: '5. Vesting dos Fundadores',
    content: 'As ações dos fundadores estarão sujeitas a um período de vesting de 4 anos, com um cliff de 1 ano. Em caso de saída antecipada (bad leaver), a empresa tem o direito de recompra por valor nominal.',
    explanation: 'Garante que os fundadores continuem na empresa. Se saírem antes de 4 anos, perdem parte de suas ações.',
    risk: 'high'
  }
];

export function LegalViewer() {
  const [openClauses, setOpenClauses] = useState<Record<string, boolean>>({ valuation: true });

  const toggleClause = (id: string) => {
    setOpenClauses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'low': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background border-l border-border p-6 overflow-hidden">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          Legal Viewer
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Análise interativa de documentos jurídicos (Term Sheet)
        </p>
      </div>

      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-4 pb-8">
          {termSheetClauses.map((clause) => (
            <Card key={clause.id} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30">
              <Collapsible
                open={openClauses[clause.id]}
                onOpenChange={() => toggleClause(clause.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer pb-4 flex flex-row items-center justify-between hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground">
                        {openClauses[clause.id] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                      </div>
                      <CardTitle className="text-base">{clause.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className={`${getRiskColor(clause.risk)} uppercase text-[10px] font-bold tracking-wider`}>
                      Risco: {clause.risk === 'high' ? 'Alto' : clause.risk === 'medium' ? 'Médio' : 'Baixo'}
                    </Badge>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4 pt-0">
                    <div className="p-4 rounded-md bg-muted/50 border border-border/50 font-serif text-foreground/90 leading-relaxed text-sm">
                      "{clause.content}"
                    </div>
                    
                    <div className="flex gap-3 p-4 rounded-md bg-primary/5 border border-primary/10">
                      <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">Tradução Prática</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {clause.explanation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
