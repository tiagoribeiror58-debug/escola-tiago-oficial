import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EXTRACT_PROMPT = `Analise o histórico desta sessão de estudo e retorne APENAS um JSON válido,
sem texto adicional, sem markdown, sem explicação.

{
  "topico": "string — tópico principal estudado nesta sessão",
  "erros": number — total de erros cometidos pelo aluno (0 se nenhum),
  "dificuldade": "facil" | "medio" | "dificil",
  "nivel": number — nível de domínio ao final (1, 2 ou 3),
  "proximo_topico": "string — próximo tópico lógico a estudar",
  "decisao_proxima": "string — decisão de progressão baseada nas regras",
  "observacoes": "string — observação objetiva sobre o desempenho do aluno"
}

Regras de progressão para decisao_proxima:
- erros=0 e dificuldade facil → "Avança para nível X" ou "Abre próximo tópico"
- erros=0 e dificuldade medio → "Repete nível com nova abordagem"
- erros>0 e dificuldade dificil → "Mini-revisão + reforço antes de avançar"
- erros>1 → "Exercício dedicado obrigatório"`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, materia, nivel_atual } = await req.json();

    if (!messages || !Array.isArray(messages) || !materia) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: messages, materia" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    const chatHistory = messages
      .map((m: { role: string; content: string }) => `${m.role === "user" ? "Aluno" : "Professor"}: ${m.content}`)
      .join("\n\n");

    const systemMessage = `${EXTRACT_PROMPT}\n\nMatéria: ${materia}\nNível atual do aluno: ${nivel_atual || 1}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        system: systemMessage,
        messages: [
          { role: "user", content: `Aja como o avaliador silêncioso e extraia os dados. Histórico da sessão:\n\n${chatHistory}` },
        ],
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("Anthropic API error:", response.status, t);

      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "AI extraction failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || "";

    let extracted;
    try {
      extracted = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extracted = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse extraction response");
      }
    }

    return new Response(JSON.stringify(extracted), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("extract error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
