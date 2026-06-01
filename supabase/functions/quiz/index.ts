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
    const { action, materiaSlug, completedTopics, n, questionText, userAnswer, topico } = await req.json();

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      throw new Error("Missing API Key");
    }

    if (action === "generate") {
      const prompt = `Gere ${n || 5} perguntas curtas de revisão sobre os seguintes tópicos que o aluno já estudou da matéria '${materiaSlug || 'Geral'}':
[${(completedTopics || []).join(', ')}]

O objetivo é Active Recall (Retrieval Practice). As perguntas devem ser diretas, focando na essência do que foi aprendido.
Retorne APENAS um JSON válido seguindo este array de objetos:
[
  { "topico": "Nome exato do tópico de onde a pergunta foi extraída (use os nomes exatos da lista fornecida)", "text": "A pergunta em si" }
]
NÃO retorne markdown, nem \`\`\`json, nem explicações. Apenas o array JSON puro, sem formatação.`;

      const resp = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
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
      const prompt = `O aluno está respondendo a uma pergunta de revisão de Active Recall.
Tópico: ${topico}
Pergunta: ${questionText}
Resposta do aluno: ${userAnswer}

Avalie a resposta do aluno e retorne um JSON puro seguindo este objeto:
{
  "status": "correto" | "errado" | "parcial",
  "feedback": "Um feedback curto, motivador e direto, complementando a resposta se necessário ou corrigindo o erro de forma didática."
}
NÃO retorne markdown, nem \`\`\`json. Apenas o JSON puro, sem formatação extra.`;

      const resp = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
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
