import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export function FinanceLab() {
  const [preMoney, setPreMoney] = useState<number>(4000000); // 4M
  const [investment, setInvestment] = useState<number>(1000000); // 1M
  const [esopTarget, setEsopTarget] = useState<number>(10); // 10%

  const metrics = useMemo(() => {
    const postMoney = preMoney + investment;
    
    // Diluição do investidor é simples: Investimento / Post-Money
    const investorEquity = investment / postMoney;
    
    // O ESOP Target é calculado sobre o Post-Money (Total do bolo)
    const esopEquity = esopTarget / 100;
    
    // O que sobra é dos founders
    const founderEquity = 1 - investorEquity - esopEquity;

    return {
      postMoney,
      investorEquity: investorEquity * 100,
      esopEquity: esopEquity * 100,
      founderEquity: founderEquity * 100,
    };
  }, [preMoney, investment, esopTarget]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="flex flex-col h-full w-full bg-background border-l border-border p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Finance Lab</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Cap Table & Valuation Simulator
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Entradas (Inputs)</CardTitle>
            <CardDescription>Defina os termos da rodada de investimento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Valuation Pre-Money (R$)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                <Input 
                  type="number" 
                  value={preMoney}
                  onChange={(e) => setPreMoney(Number(e.target.value))}
                  className="pl-9 font-mono bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Investimento / Aporte (R$)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                <Input 
                  type="number" 
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="pl-9 font-mono bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Option Pool (ESOP)</Label>
                <span className="font-mono text-sm">{esopTarget}%</span>
              </div>
              <Slider
                value={[esopTarget]}
                min={0}
                max={20}
                step={1}
                onValueChange={(val) => setEsopTarget(val[0])}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground">
                % reservada para futuros funcionários no Post-Money.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Saídas (Cap Table)</CardTitle>
            <CardDescription>
              Valuation Post-Money: <strong className="text-foreground">{formatCurrency(metrics.postMoney)}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Gráfico de Barras Proporcional */}
            <div className="h-6 w-full flex rounded-md overflow-hidden mb-6 shadow-inner ring-1 ring-inset ring-border/20">
              <div 
                style={{ width: `${Math.max(0, metrics.founderEquity)}%` }} 
                className="bg-blue-500 h-full transition-all duration-500 ease-in-out"
                title={`Founders: ${formatPercent(metrics.founderEquity)}`}
              />
              <div 
                style={{ width: `${metrics.investorEquity}%` }} 
                className="bg-emerald-500 h-full transition-all duration-500 ease-in-out"
                title={`Investidores: ${formatPercent(metrics.investorEquity)}`}
              />
              <div 
                style={{ width: `${metrics.esopEquity}%` }} 
                className="bg-purple-500 h-full transition-all duration-500 ease-in-out"
                title={`ESOP: ${formatPercent(metrics.esopEquity)}`}
              />
            </div>

            {/* Legenda Dinâmica */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="font-medium">Founders</span>
                </div>
                <span className="font-mono">{formatPercent(metrics.founderEquity)}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="font-medium">Investidores</span>
                </div>
                <span className="font-mono">{formatPercent(metrics.investorEquity)}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="font-medium">Option Pool (ESOP)</span>
                </div>
                <span className="font-mono">{formatPercent(metrics.esopEquity)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
