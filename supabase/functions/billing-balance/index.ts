import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Não autenticado" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const SUPABASE_URL          = Deno.env.get("SUPABASE_URL");
  const SUPABASE_ANON_KEY     = Deno.env.get("SUPABASE_ANON_KEY");
  const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE) {
    return new Response(JSON.stringify({ error: "Configuração incompleta" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // 1. Identificar o usuário pelo JWT
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": authHeader },
  });

  if (!userRes.ok) {
    return new Response(JSON.stringify({ error: "Token inválido" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { id: userId } = await userRes.json();

  // 2. Buscar saldo atual pelo SUM do ledger
  // Usamos rpc() para chamar a função SQL get_user_balance que criamos na migração
  const balanceRes = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/get_user_balance`,
    {
      method: "POST",
      headers: {
        "apikey":        SUPABASE_SERVICE_ROLE,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({ p_user_id: userId }),
    }
  );

  const balance = await balanceRes.json();

  // 3. Buscar as últimas 20 transações para o histórico
  const historyRes = await fetch(
    `${SUPABASE_URL}/rest/v1/credit_transactions?user_id=eq.${userId}&order=created_at.desc&limit=20`,
    {
      headers: {
        "apikey":        SUPABASE_SERVICE_ROLE,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE}`,
      },
    }
  );

  const transactions = await historyRes.json();

  return new Response(
    JSON.stringify({
      balance_brl:  Number(balance ?? 0).toFixed(2),
      transactions: transactions ?? [],
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
});
