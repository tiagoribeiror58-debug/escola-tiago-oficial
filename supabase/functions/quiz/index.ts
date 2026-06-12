import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, materiaSlug, completedTopics, n, questionText, userAnswer, topico, forceAnswer } = await req.json();

    const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY");
    if (!DEEPSEEK_API_KEY) {
      throw new Error("Missing API Key");
    }

    const SUPABASE_URL          = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY     = Deno.env.get("SUPABASE_ANON_KEY");
    const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const PRICE_PER_1K_TOKENS = parseFloat(Deno.env.get("PRICE_PER_1K_TOKENS") ?? "0.003");

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
        console.warn("[quiz] Erro ao verificar saldo (non-blocking):", err);
      }
    }

    if (action === "generate") {
      const prompt = `Gere ${n || 5} perguntas curtas de revisão sobre os seguintes tópicos que o aluno já estudou da matéria '${materiaSlug || 'Geral'}':
[${(completedTopics || []).join(', ')}]

O objetivo é Active Recall (Retrieval Practice). As perguntas devem ser diretas, focando na essência do que foi aprendido.
Retorne APENAS um JSON válido seguindo este array de objetos:
[
  { 
    "topico": "Nome exato do tópico de onde a pergunta foi extraída", 
    "text": "A pergunta em si",
    "dica": "Uma dica sutil que ajude o aluno a lembrar, mas sem dar a resposta direta"
  }
]
NÃO retorne markdown, nem \`\`\`json, nem explicações. Apenas o array JSON puro, sem formatação.`;

      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-v4-flash",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      let content = data.choices[0].message.content.trim();
      if (content.startsWith('```json')) content = content.replace(/```json/g, '').replace(/```/g, '').trim();

      return new Response(content, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "evaluate") {
      const regrasFeedback = forceAnswer 
        ? `REGRAS PARA O FEEDBACK: O aluno desistiu/pediu a resposta. Forneça uma explicação profunda, detalhada e altamente didática (Técnica Feynman). Descreva os mecanismos, o "porquê" das coisas, e conecte os conceitos de forma lógica em um parágrafo rico e claro.`
        : `REGRAS PARA O FEEDBACK:
1. Em TODAS as suas intervenções, aja como um mentor brilhante. Nunca dê respostas curtas ou superficiais. Use a Técnica Feynman para explicar.
2. Se o status for "correto": Confirme o acerto e expanda o conceito com uma explicação rica, mostrando a lógica profunda por trás do assunto.
3. Se o status for "errado" ou "parcial": Explique os mecanismos e a lógica real por trás da parte que o aluno errou de forma detalhada e didática (em um parágrafo robusto, como faria um grande professor). Ensine o aluno. Após a explicação profunda, finalize com uma pergunta instigante ou dica para que ele aplique a lógica na próxima tentativa. Nunca diga apenas "continue revisando".`;


      const prompt = `O aluno está respondendo a uma pergunta de revisão de Active Recall.
Tópico: ${topico}
Pergunta: ${questionText}
Resposta do aluno: ${userAnswer}

Avalie a resposta do aluno e retorne um JSON puro seguindo este objeto:
{
  "status": "correto" | "errado" | "parcial",
  "feedback": "..."
}

${regrasFeedback}

NÃO retorne markdown, nem \`\`\`json. Apenas o JSON puro, sem formatação extra.`;

      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-v4-flash",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
        }),
      });

      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      let content = data.choices[0].message.content.trim();
      if (content.startsWith('```json')) content = content.replace(/```json/g, '').replace(/```/g, '').trim();

      return new Response(content, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    throw new Error("Invalid action");

  } catch (e) {
    console.error("quiz error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
