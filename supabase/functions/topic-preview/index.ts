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

    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) {
      throw new Error("Missing ANTHROPIC_API_KEY");
    }

    const systemPrompt = `Você é um curador educacional de alta performance. 
Sua tarefa é ler a matéria e o tópico que o aluno selecionou e retornar EXATAMENTE UMA FRASE CURTA (máximo de 15 palavras) que descreva o que ele vai aprender ou qual problema esse tópico resolve.
Não use saudações. Não use aspas. Seja ultra-pragmático e inspirador.

Contexto da matéria: ${materiaName} - ${descricaoMateria || ''}`;

    const userMessage = `Tópico a ser estudado: "${topicName}"\nRetorne apenas a frase descritiva curta.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 50,
        temperature: 0.5,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic error:", errorText);
      throw new Error("Failed to fetch from Anthropic");
    }

    const data = await response.json();
    const previewText = data.content?.[0]?.text?.trim() || "Iniciar sessão de estudos para este tópico.";

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
