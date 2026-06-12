import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe@14";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Pacotes de crédito pré-definidos (fixos para evitar paralisia de análise)
// Valores em centavos para o Stripe (R$10 = 1000 centavos)
const CREDIT_PACKAGES = [
  {
    key:         "10brl",
    amount_brl:  10,
    amount_cents: 1000,
    label:        "Iniciante",
    description:  "~100 sessões de estudo",
    price_env:    "STRIPE_PRICE_ID_10",
  },
  {
    key:          "30brl",
    amount_brl:   30,
    amount_cents:  3000,
    label:        "Frequente",
    description:  "~300 sessões de estudo",
    price_env:    "STRIPE_PRICE_ID_30",
  },
  {
    key:          "100brl",
    amount_brl:   100,
    amount_cents:  10000,
    label:        "Power User",
    description:  "~1000 sessões de estudo",
    price_env:    "STRIPE_PRICE_ID_100",
  },
] as const;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // 1. Autenticar o usuário pelo JWT do Supabase
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Não autenticado" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const STRIPE_SECRET_KEY  = Deno.env.get("STRIPE_SECRET_KEY");
  const SUPABASE_URL        = Deno.env.get("SUPABASE_URL");
  const SUPABASE_ANON_KEY   = Deno.env.get("SUPABASE_ANON_KEY");
  const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const APP_URL             = Deno.env.get("APP_URL") ?? "https://escola-do-tiago.vercel.app";

  if (!STRIPE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE) {
    return new Response(JSON.stringify({ error: "Configuração incompleta" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

  // 2. Buscar o usuário logado pelo JWT
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": authHeader,
    },
  });

  if (!userRes.ok) {
    return new Response(JSON.stringify({ error: "Token inválido" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { id: userId, email } = await userRes.json();

  // 3. Validar o pacote escolhido
  const { package_key } = await req.json();
  const pkg = CREDIT_PACKAGES.find((p) => p.key === package_key);
  if (!pkg) {
    return new Response(JSON.stringify({ error: "Pacote inválido" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // 4. Buscar ou criar o Customer no Stripe (lazy: cria só quando necessário)
  let stripeCustomerId: string;

  const billingRes = await fetch(
    `${SUPABASE_URL}/rest/v1/user_billing?user_id=eq.${userId}&select=stripe_customer_id`,
    {
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE}`,
      },
    }
  );

  const billingData = await billingRes.json();

  if (billingData && billingData.length > 0) {
    // Já tem customer — reutiliza
    stripeCustomerId = billingData[0].stripe_customer_id;
    console.log(`[billing-checkout] Customer existente: ${stripeCustomerId}`);
  } else {
    // Cria novo Customer no Stripe
    const customer = await stripe.customers.create({
      email: email,
      metadata: { supabase_user_id: userId },
    });
    stripeCustomerId = customer.id;

    // Salva no banco
    await fetch(`${SUPABASE_URL}/rest/v1/user_billing`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        user_id:            userId,
        stripe_customer_id: stripeCustomerId,
      }),
    });
    console.log(`[billing-checkout] Novo Customer criado: ${stripeCustomerId}`);
  }

  // 5. Criar sessão de Checkout no Stripe (one-time payment)
  const session = await stripe.checkout.sessions.create({
    customer:    stripeCustomerId,
    mode:        "payment",
    currency:    "brl",
    line_items: [
      {
        quantity:    1,
        price_data: {
          currency:     "brl",
          unit_amount:  pkg.amount_cents,
          product_data: {
            name:        `Créditos - ${pkg.label}`,
            description: pkg.description,
          },
        },
      },
    ],
    // Metadados repassados para o webhook identificar o pacote
    metadata: {
      price_id:   pkg.key,
      user_id:    userId,
    },
    payment_intent_data: {
      metadata: {
        price_id: pkg.key,
        user_id:  userId,
      },
    },
    success_url: `${APP_URL}?billing=success`,
    cancel_url:  `${APP_URL}?billing=cancelled`,
  });

  console.log(`[billing-checkout] Sessão criada: ${session.id} para user ${userId}`);

  return new Response(JSON.stringify({ checkout_url: session.url }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
