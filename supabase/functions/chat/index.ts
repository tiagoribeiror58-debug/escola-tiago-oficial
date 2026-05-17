import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Cadeia de fallback: tenta do mais moderno ao mais estável.
// Se um estiver sobrecarregado (overloaded), tenta o próximo automaticamente.
const MODELS = [
  "claude-sonnet-4-6",         // Principal — melhor qualidade/velocidade
  "claude-haiku-4-5-20251001", // Rápido — confirmado estável
  "claude-sonnet-4-5-20250929",// Sonnet anterior — muito estável
  "claude-sonnet-4-20250514",  // Emergência — modelo mais antigo e resiliente
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, systemPrompt } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Missing messages array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    for (const model of MODELS) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          system: systemPrompt || "You are a helpful assistant.",
          messages: messages,
          max_tokens: 2048,
          stream: true,
        }),
      });

      if (!response.ok) {
        const t = await response.text();
        console.error(`[chat] Model ${model} error ${response.status}:`, t);

        // Se sobrecarregado, tenta o próximo modelo da lista
        if (response.status === 529 || t.includes("overloaded")) {
          console.log(`[chat] ${model} overloaded, falling back...`);
          continue;
        }

        if (response.status === 429) {
          return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ error: "AI request failed", details: t }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log(`[chat] Serving with model: ${model}`);
      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    // Todos os modelos falharam
    return new Response(JSON.stringify({ error: "Servidores sobrecarregados. Tente em instantes." }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
