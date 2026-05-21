import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Trata CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { materiaName, topicName, descricaoMateria } = await req.json();

    if (!materiaName || !topicName) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const systemPrompt = `Você é um curador educacional de alta performance. 
Sua tarefa é ler a matéria e o tópico que o aluno selecionou e retornar EXATAMENTE UMA FRASE CURTA (máximo de 15 palavras) que descreva o que ele vai aprender ou qual problema esse tópico resolve.
Não use saudações. Não use aspas. Seja ultra-pragmático e inspirador.

Contexto da matéria: ${materiaName} - ${descricaoMateria || ''}`;

    const userMessage = `Tópico a ser estudado: "${topicName}"\nRetorne apenas a frase descritiva curta.`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${geminiKey}`,
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
        temperature: 0.5,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini error:", errorText);
      throw new Error("Failed to fetch from Gemini");
    }

    const data = await response.json();
    const previewText = data.choices?.[0]?.message?.content?.trim() || "Iniciar sessão de estudos para este tópico.";

    return new Response(JSON.stringify({ preview: previewText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in topic-preview:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
