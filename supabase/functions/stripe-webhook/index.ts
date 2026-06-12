import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe@14";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

// Mapeia o price_id do Stripe → valor em BRL e descrição
// Esses IDs serão criados no Dashboard do Stripe e salvos como env vars
const PRICE_MAP: Record<string, { amount_brl: number; description: string }> = {
  // Os price_ids reais serão injetados via variáveis de ambiente
  // Fallback para desenvolvimento: os valores fixos por enquanto
  [Deno.env.get("STRIPE_PRICE_ID_10") ?? "price_10brl"]:  { amount_brl: 10,  description: "Recarga R$10"  },
  [Deno.env.get("STRIPE_PRICE_ID_30") ?? "price_30brl"]:  { amount_brl: 30,  description: "Recarga R$30"  },
  [Deno.env.get("STRIPE_PRICE_ID_100") ?? "price_100brl"]: { amount_brl: 100, description: "Recarga R$100" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const STRIPE_SECRET_KEY     = Deno.env.get("STRIPE_SECRET_KEY");
  const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const SUPABASE_URL          = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    console.error("[stripe-webhook] Variáveis de ambiente ausentes.");
    return new Response("Configuração incompleta", { status: 500 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

  // 1. Verificar assinatura do Stripe
  // Isso é CRÍTICO: sem verificar, qualquer pessoa poderia chamar esse endpoint
  // e creditar saldo falso no banco de dados!
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Assinatura ausente", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const rawBody = await req.text();
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe-webhook] Assinatura inválida:", err);
    return new Response("Assinatura inválida", { status: 400 });
  }

  console.log(`[stripe-webhook] Evento recebido: ${event.type}`);

  // 2. Processar apenas o evento que nos interessa
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Só processa se o pagamento foi de fato confirmado
    if (session.payment_status !== "paid") {
      return new Response("OK - pagamento não confirmado, ignorando", { status: 200 });
    }

    const stripeCustomerId  = session.customer as string;
    const paymentIntentId   = session.payment_intent as string;
    const priceId           = session.metadata?.price_id ?? "";
    const priceInfo         = PRICE_MAP[priceId];

    if (!priceInfo) {
      console.error(`[stripe-webhook] price_id desconhecido: ${priceId}`);
      return new Response("price_id desconhecido", { status: 400 });
    }

    // 3. Buscar o user_id pelo stripe_customer_id na nossa tabela user_billing
    const billingRes = await fetch(
      `${SUPABASE_URL}/rest/v1/user_billing?stripe_customer_id=eq.${stripeCustomerId}&select=user_id`,
      {
        headers: {
          "apikey": SUPABASE_SERVICE_ROLE,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE}`,
          "Content-Type": "application/json",
        },
      }
    );

    const billingData = await billingRes.json();
    if (!billingData || billingData.length === 0) {
      console.error(`[stripe-webhook] Nenhum usuário encontrado para customer: ${stripeCustomerId}`);
      return new Response("Usuário não encontrado", { status: 404 });
    }

    const userId = billingData[0].user_id;

    // 4. Inserir transação positiva no ledger (idempotência via ON CONFLICT)
    // Se o Stripe reenviar o mesmo evento (o que acontece com falha de rede),
    // o ON CONFLICT garante que não vamos creditar duas vezes.
    const insertRes = await fetch(
      `${SUPABASE_URL}/rest/v1/credit_transactions`,
      {
        method: "POST",
        headers: {
          "apikey": SUPABASE_SERVICE_ROLE,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=ignore-duplicates",
        },
        body: JSON.stringify({
          user_id:                   userId,
          type:                      "TOP_UP",
          amount_brl:                priceInfo.amount_brl,
          description:               priceInfo.description,
          stripe_payment_intent_id:  paymentIntentId,
        }),
      }
    );

    if (!insertRes.ok) {
      const err = await insertRes.text();
      console.error("[stripe-webhook] Erro ao inserir transação:", err);
      return new Response("Erro ao creditar saldo", { status: 500 });
    }

    console.log(`[stripe-webhook] ✅ Saldo creditado: R$${priceInfo.amount_brl} para user ${userId}`);
  }

  // Sempre retornar 200 para o Stripe saber que recebemos o evento
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
