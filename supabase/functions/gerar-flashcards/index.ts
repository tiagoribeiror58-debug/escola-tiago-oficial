import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const geminiKey = Deno.env.get("DEEPSEEK_API_KEY");
    if (!geminiKey) {
      throw new Error("Missing DEEPSEEK_API_KEY");
    }

    const { materia_slug, topico, texto_fonte } = await req.json();

    if (!texto_fonte) {
       throw new Error("Missing texto_fonte");
    }

    const systemPrompt = `Você é um gerador de Flashcards ultra-eficiente focado no estilo Anki (Active Recall).
Abaixo, há um trecho de texto (resumo, anotação ou curiosidade) sobre o tópico "${topico || 'Geral'}" da matéria "${materia_slug || 'Geral'}".
Sua tarefa é extrair as ideias mais valiosas e transformá-las em 2 a 5 Flashcards.

Regras:
1. "front" deve ser uma pergunta curta e instigante.
2. "back" deve ser a resposta cirúrgica e técnica.
3. Responda APENAS com um array JSON válido. NUNCA adicione crases (\`\`\`) ou texto antes/depois.

Exemplo de formato esperado:
[
  { "front": "Qual é a...", "back": "É o processo de..." },
  { "front": "O que significa...", "back": "Significa que..." }
]`;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${geminiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `TEXTO FONTE:\n\n${texto_fonte}` }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Deepseek error:", errorText);
      throw new Error("Failed to fetch from AI");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "[]";

    let flashcards = [];
    try {
      const parsed = JSON.parse(content);
      // A IA pode retornar { flashcards: [...] } ou diretamente [...]
      flashcards = Array.isArray(parsed) ? parsed : (parsed.flashcards || []);
    } catch (e) {
      console.error("Erro ao fazer parse do JSON de flashcards:", content);
      throw new Error("IA não retornou um JSON válido");
    }

    return new Response(JSON.stringify({ flashcards }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in gerar-flashcards:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
