import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EXTRACT_PROMPT = `Analise o histórico desta sessão de estudo e retorne APENAS um JSON válido, sem texto adicional, sem markdown, sem explicação.

{
  "topico": "string — tópico principal estudado nesta sessão",
  "erros": number — total de erros cometidos pelo aluno (0 se nenhum),
  "dificuldade": "baixa" | "media" | "alta",
  "nivel": number — nível de domínio ao final (1, 2 ou 3),
  "proximo_topico": "string — próximo tópico lógico a estudar",
  "decisao_proxima": "string — decisão de progressão baseada nas regras",
  "observacoes": "string — observação objetiva sobre o desempenho do aluno"
}

Regras de progressão para decisao_proxima:
- erros=0 e dificuldade baixa → "Avança para nível X" ou "Abre próximo tópico"
- erros=0 e dificuldade média → "Repete nível com nova abordagem"
- erros>0 e dificuldade alta → "Mini-revisão + reforço antes de avançar"
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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const chatHistory = messages
      .map((m: { role: string; content: string }) => `${m.role === "user" ? "Aluno" : "Professor"}: ${m.content}`)
      .join("\n\n");

    const systemMessage = `${EXTRACT_PROMPT}\n\nMatéria: ${materia}\nNível atual do aluno: ${nivel_atual || 1}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: `Histórico da sessão:\n\n${chatHistory}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_session",
              description: "Extract structured session data from chat history",
              parameters: {
                type: "object",
                properties: {
                  topico: { type: "string" },
                  erros: { type: "number" },
                  dificuldade: { type: "string", enum: ["baixa", "media", "alta"] },
                  nivel: { type: "number", enum: [1, 2, 3] },
                  proximo_topico: { type: "string" },
                  decisao_proxima: { type: "string" },
                  observacoes: { type: "string" },
                },
                required: ["topico", "erros", "dificuldade", "nivel", "proximo_topico", "decisao_proxima", "observacoes"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "extract_session" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI extraction failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    
    // Extract from tool call response
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    let extracted;
    
    if (toolCall?.function?.arguments) {
      extracted = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: try to parse content directly
      const content = data.choices?.[0]?.message?.content || "";
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extracted = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not extract session data from AI response");
      }
    }

    // Map dificuldade values
    const dificuldadeMap: Record<string, string> = {
      baixa: "facil",
      media: "medio",
      alta: "dificil",
    };
    extracted.dificuldade = dificuldadeMap[extracted.dificuldade] || extracted.dificuldade;

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
