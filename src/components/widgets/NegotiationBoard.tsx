import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function NegotiationBoard() {
  const [sellerMin, setSellerMin] = useState<number>(50000);
  const [sellerAnchor, setSellerAnchor] = useState<number>(80000);
  const [buyerMax, setBuyerMax] = useState<number>(65000);
  const [buyerAnchor, setBuyerAnchor] = useState<number>(40000);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const minVal = Math.min(sellerMin, buyerAnchor);
  const maxVal = Math.max(sellerAnchor, buyerMax);
  const range = maxVal - minVal || 1; // prevent divide by zero

  const getPosition = (val: number) => {
    return ((val - minVal) / range) * 100;
  };

  const hasZopa = buyerMax >= sellerMin;
  const zopaStart = hasZopa ? getPosition(sellerMin) : 0;
  const zopaWidth = hasZopa ? getPosition(buyerMax) - getPosition(sellerMin) : 0;

  return (
    <div className="flex flex-col h-full w-full bg-background border-l border-border p-6 overflow-y-auto">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Negotiation Board</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Visualizador de ZOPA (Zona de Possível Acordo) e BATNA
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Parâmetros (R$)</CardTitle>
            <CardDescription>Defina os limites de cada lado da negociação.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-blue-500 border-b border-border pb-2">Comprador</h3>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Âncora (Primeira Oferta)</Label>
                <Input 
                  type="number" 
                  value={buyerAnchor}
                  onChange={(e) => setBuyerAnchor(Number(e.target.value))}
                  className="font-mono h-8 bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium text-foreground">Preço Máximo (BATNA)</Label>
                <Input 
                  type="number" 
                  value={buyerMax}
                  onChange={(e) => setBuyerMax(Number(e.target.value))}
                  className="font-mono h-8 bg-background/50 border-blue-500/50"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-orange-500 border-b border-border pb-2">Vendedor</h3>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium text-foreground">Preço Mínimo (BATNA)</Label>
                <Input 
                  type="number" 
                  value={sellerMin}
                  onChange={(e) => setSellerMin(Number(e.target.value))}
                  className="font-mono h-8 bg-background/50 border-orange-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Âncora (Preço Pedido)</Label>
                <Input 
                  type="number" 
                  value={sellerAnchor}
                  onChange={(e) => setSellerAnchor(Number(e.target.value))}
                  className="font-mono h-8 bg-background/50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">ZOPA: Zona de Acordo</CardTitle>
            <CardDescription>
              {hasZopa 
                ? `Há uma zona de acordo de ${formatCurrency(buyerMax - sellerMin)}.` 
                : <span className="text-destructive font-medium">Não há ZOPA. O mínimo do vendedor é maior que o máximo do comprador.</span>
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 pb-12">
            <div className="relative h-12 w-full bg-muted/30 rounded-md border border-border">
              {/* Comprador Range */}
              <div 
                className="absolute top-0 h-1/2 bg-blue-500/20 border-b border-blue-500/50"
                style={{ left: `${getPosition(buyerAnchor)}%`, width: `${getPosition(buyerMax) - getPosition(buyerAnchor)}%` }}
              />
              {/* Vendedor Range */}
              <div 
                className="absolute bottom-0 h-1/2 bg-orange-500/20 border-t border-orange-500/50"
                style={{ left: `${getPosition(sellerMin)}%`, width: `${getPosition(sellerAnchor) - getPosition(sellerMin)}%` }}
              />

              {/* ZOPA Highlight */}
              {hasZopa && (
                <div 
                  className="absolute top-0 h-full bg-emerald-500/30 border-x-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  style={{ left: `${zopaStart}%`, width: `${zopaWidth}%` }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    ZOPA
                  </div>
                </div>
              )}

              {/* Markers */}
              <Marker position={getPosition(buyerAnchor)} label="Oferta Comprador" value={buyerAnchor} color="text-blue-500" />
              <Marker position={getPosition(buyerMax)} label="Máx Comprador" value={buyerMax} color="text-blue-500 font-bold" />
              <Marker position={getPosition(sellerMin)} label="Mín Vendedor" value={sellerMin} color="text-orange-500 font-bold" />
              <Marker position={getPosition(sellerAnchor)} label="Oferta Vendedor" value={sellerAnchor} color="text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Marker({ position, label, value, color }: { position: number, label: string, value: number, color: string }) {
  // Ensure position is within bounds
  const clampedPos = Math.max(0, Math.min(100, position));
  
  return (
    <div 
      className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{ left: `${clampedPos}%` }}
    >
      <div className="w-0.5 h-14 bg-foreground/20 absolute -z-10" />
      <div className="w-3 h-3 rounded-full bg-background border-2 border-foreground shadow-sm z-10" />
      <div className={`absolute top-8 whitespace-nowrap text-xs text-center ${color}`}>
        <div>{label}</div>
        <div className="font-mono">{new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(value)}</div>
      </div>
    </div>
  );
}
