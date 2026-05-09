import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { TrendingUp } from 'lucide-react';

export function EconGraph() {
  const [price, setPrice] = useState(50);

  // Curvas simplificadas (lineares para demonstração)
  // Demanda: Q = 100 - P
  // Oferta: Q = P
  const demandQuantity = 100 - price;
  const supplyQuantity = price;
  const equilibriumPrice = 50;
  const equilibriumQuantity = 50;

  return (
    <div className="flex flex-col h-full w-full bg-background border-l border-border p-6 overflow-y-auto">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-amber-500" />
          Econ Graph
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Oferta, Demanda e Ponto de Equilíbrio
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Gráfico de Mercado</CardTitle>
            <CardDescription>Visualize como o preço afeta as quantidades ofertadas e demandadas.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            
            <div className="relative w-full max-w-[400px] aspect-square border-l-2 border-b-2 border-foreground/50 p-4 mb-8">
              {/* Eixos */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-bold text-muted-foreground">Preço (P)</div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-muted-foreground">Quantidade (Q)</div>

              {/* Grid Lines */}
              <div className="absolute left-0 right-0 top-1/2 h-px bg-border/30 border-dashed border-b" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border/30 border-dashed border-r" />

              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Demanda (Desce da esq pra dir) */}
                <line x1="0" y1="0" x2="100" y2="100" stroke="#3b82f6" strokeWidth="2" />
                <text x="95" y="105" fill="#3b82f6" className="text-[8px] font-bold">D</text>

                {/* Oferta (Sobe da esq pra dir) */}
                <line x1="0" y1="100" x2="100" y2="0" stroke="#f97316" strokeWidth="2" />
                <text x="95" y="-5" fill="#f97316" className="text-[8px] font-bold">S</text>

                {/* Ponto de Equilíbrio */}
                <circle cx="50" cy="50" r="2" fill="#10b981" />
                
                {/* Linha de Preço Atual */}
                <line 
                  x1="0" 
                  y1={100 - price} 
                  x2="100" 
                  y2={100 - price} 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeDasharray="4" 
                  className="text-foreground/30"
                />

                {/* Pontos Atuais */}
                <circle cx={supplyQuantity} cy={100 - price} r="3" fill="#f97316" />
                <circle cx={demandQuantity} cy={100 - price} r="3" fill="#3b82f6" />
              </svg>
            </div>

            <div className="w-full space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Preço de Mercado Ajustável</Label>
                  <span className="font-mono font-bold">R$ {price}</span>
                </div>
                <Slider
                  value={[price]}
                  min={10}
                  max={90}
                  step={1}
                  onValueChange={(val) => setPrice(val[0])}
                  className="py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3 text-center">
                  <div className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-1">Qtd. Demandada</div>
                  <div className="text-2xl font-mono text-foreground">{demandQuantity}</div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-md p-3 text-center">
                  <div className="text-xs text-orange-500 font-bold uppercase tracking-wider mb-1">Qtd. Ofertada</div>
                  <div className="text-2xl font-mono text-foreground">{supplyQuantity}</div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-md p-4 text-sm text-center border border-border">
                {price > equilibriumPrice ? (
                  <span className="text-orange-500 font-medium">Excesso de Oferta (Surplus) de {supplyQuantity - demandQuantity} unidades. O preço tende a cair.</span>
                ) : price < equilibriumPrice ? (
                  <span className="text-blue-500 font-medium">Escassez (Shortage) de {demandQuantity - supplyQuantity} unidades. O preço tende a subir.</span>
                ) : (
                  <span className="text-emerald-500 font-medium">Mercado em Equilíbrio.</span>
                )}
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
