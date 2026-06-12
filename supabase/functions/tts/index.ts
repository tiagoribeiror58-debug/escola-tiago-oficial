import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, speed = 1.0, voice = "pt-BR-Neural2-B" } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "Missing text" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GOOGLE_TTS_KEY = Deno.env.get("GOOGLE_TTS_KEY");
    if (!GOOGLE_TTS_KEY) {
      throw new Error("GOOGLE_TTS_KEY not configured");
    }

    const SUPABASE_URL          = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY     = Deno.env.get("SUPABASE_ANON_KEY");
    const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    // Google TTS custa $16/1M caracteres (Neural2).
    // Estimativa BRL: ~R$ 0.10 por 1000 caracteres.
    const PRICE_PER_1K_CHARS = parseFloat(Deno.env.get("PRICE_PER_1K_CHARS") ?? "0.10");

    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader && SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_SERVICE_ROLE) {
      try {
        const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
          headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": authHeader },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          userId = userData.id ?? null;
        }

        if (userId) {
          const balanceRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_user_balance`, {
            method: "POST",
            headers: {
              "apikey":        SUPABASE_SERVICE_ROLE,
              "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE}`,
              "Content-Type":  "application/json",
            },
            body: JSON.stringify({ p_user_id: userId }),
          });
          const balance = await balanceRes.json();
          const balanceBrl = Number(balance ?? 0);

          if (balanceBrl <= 0) {
            return new Response(
              JSON.stringify({
                error: "saldo_insuficiente",
                message: "Seu saldo acabou! Adicione créditos para continuar estudando.",
              }),
              { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
        }
      } catch (err) {
        console.warn("[tts] Erro ao verificar saldo (non-blocking):", err);
      }
    }

    // Google TTS: limite de 5000 bytes por request
    const truncated = text.length > 4800 ? text.slice(0, 4800) : text;

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text: truncated },
          voice: {
            languageCode: "pt-BR",
            name: voice,
            ssmlGender: "MALE",
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: Math.max(0.25, Math.min(4.0, speed)),
            pitch: -2.0,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[tts] Google API error ${response.status}:`, errText);
      throw new Error(`Google TTS failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Debitar Caracteres (TTS)
    if (userId && SUPABASE_URL && SUPABASE_SERVICE_ROLE) {
      (async () => {
        try {
          const chars = truncated.length;
          const costBrl = (chars / 1000) * PRICE_PER_1K_CHARS;
          await fetch(`${SUPABASE_URL}/rest/v1/credit_transactions`, {
            method: "POST",
            headers: {
              "apikey":        SUPABASE_SERVICE_ROLE,
              "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE}`,
              "Content-Type":  "application/json",
              "Prefer":        "return=minimal",
            },
            body: JSON.stringify({
              user_id:     userId,
              type:        "USAGE",
              amount_brl:  -Math.abs(costBrl).toFixed(4),
              tokens:      chars,
              description: `Áudio (TTS) — ~${chars} caracteres`,
            }),
          });
        } catch (e) { console.warn("Erro debitando TTS", e); }
      })();
    }

    return new Response(
      JSON.stringify({ audioContent: data.audioContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("[tts] error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
