import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Coins, Loader2, Plus, Clock, ArrowUpRight, ArrowDownRight, CreditCard, BrainCircuit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Transaction {
  id: string;
  type: 'TOP_UP' | 'USAGE';
  amount_brl: number;
  tokens: number | null;
  description: string;
  created_at: string;
}

interface BillingData {
  balance_brl: string;
  transactions: Transaction[];
}

export function BillingDashboard() {
  const [data, setData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/billing-balance`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Erro ao buscar saldo:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleCheckout = async (packageKey: string) => {
    try {
      setCheckoutLoading(packageKey);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Não autenticado");

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/billing-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ package_key: packageKey })
      });

      if (!res.ok) throw new Error("Falha ao criar checkout");

      const { checkout_url } = await res.json();
      if (checkout_url) {
        window.location.href = checkout_url;
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível iniciar o pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setCheckoutLoading(null);
    }
  };

  const balance = Number(data?.balance_brl ?? 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button 
          onClick={fetchBalance}
          className={`flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all shadow-sm ${
            balance <= 0 
              ? 'bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20' 
              : 'bg-[hsl(var(--primary)/0.1)] border-[hsl(var(--primary)/0.3)] text-primary hover:bg-[hsl(var(--primary)/0.2)]'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          Saldo
        </button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl bg-background border border-border">
        <div className="p-6 bg-muted/30 border-b border-border">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              Carteira de IA
            </DialogTitle>
          </DialogHeader>

          {loading && !data ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center p-6 bg-background rounded-2xl border border-border shadow-sm">
                <span className="text-sm text-muted-foreground mb-1">Saldo Disponível</span>
                <span className={`text-4xl font-bold tracking-tight ${balance <= 0 ? 'text-red-500' : 'text-foreground'}`}>
                  R$ {balance.toFixed(2)}
                </span>
                {balance <= 0 && (
                  <span className="mt-2 text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded-md font-medium">
                    Sem saldo para estudar
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <ScrollArea className="max-h-[60vh]">
          <div className="p-6 space-y-8">
            {/* Recarga */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <CreditCard className="w-4 h-4 text-primary" />
                Adicionar Créditos
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { key: '10brl', title: 'Iniciante', desc: '~100 sessões de estudo', price: 'R$ 10' },
                  { key: '30brl', title: 'Frequente', desc: '~300 sessões de estudo', price: 'R$ 30' },
                  { key: '100brl', title: 'Power User', desc: '~1000 sessões de estudo', price: 'R$ 100' },
                ].map((pkg) => (
                  <button
                    key={pkg.key}
                    onClick={() => handleCheckout(pkg.key)}
                    disabled={checkoutLoading !== null}
                    className="flex items-center justify-between p-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all text-left"
                  >
                    <div>
                      <div className="font-medium text-sm text-foreground">{pkg.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <BrainCircuit className="w-3 h-3" />
                        {pkg.desc}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm">{pkg.price}</span>
                      {checkoutLoading === pkg.key ? (
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Histórico */}
            {data?.transactions && data.transactions.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Histórico de Uso
                </h4>
                <div className="space-y-2">
                  {data.transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === 'TOP_UP' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                        }`}>
                          {tx.type === 'TOP_UP' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{tx.description}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {new Date(tx.created_at).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                          </p>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold ${tx.type === 'TOP_UP' ? 'text-emerald-500' : 'text-foreground'}`}>
                        {tx.type === 'TOP_UP' ? '+' : ''}{tx.amount_brl}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
