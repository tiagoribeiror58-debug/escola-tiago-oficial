import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EXTRACT_PROMPT = `Analise o histórico desta sessão de estudo e retorne APENAS um JSON válido,
sem texto adicional, sem markdown, sem explicação.

{
  "topico": "string — tópico principal exato que foi ensinado nesta sessão",
  "erros": number — total de erros cometidos pelo aluno (0 se nenhum),
  "dificuldade": "baixa" | "media" | "alta",
  "nivel": number — nível de domínio ao final (1, 2 ou 3),
  "decisao_proxima": "string — decisão de progressão baseada nas regras",
  "observacoes": "string — observação objetiva sobre o desempenho do aluno"
}

Regras de progressão para decisao_proxima:
- erros=0 e dificuldade baixa → "Avança para nível X" ou "Abre próximo tópico"
- erros=0 e dificuldade media → "Repete nível com nova abordagem"
- erros>0 e dificuldade alta → "Mini-revisão + reforço antes de avançar"
- erros>1 → "Exercício dedicado obrigatório"`;

/**
 * Calcula deterministicamente o próximo tópico com base na ementa e no tópico atual.
 * A IA NÃO decide isso — é lógica de negócio pura.
 *
 * Analogia: é como um índice de livro. Se você leu o capítulo 3, o próximo é o 4.
 * Não perguntamos ao autor qual capítulo você deve ler a seguir — o sistema já sabe.
 */
function calcularProximoTopico(ementa: string[], topicoAtual: string): string {
  if (!ementa || ementa.length === 0 || !topicoAtual) return "";

  const normalize = (s: string) => s.toLowerCase().trim();
  const topicoNorm = normalize(topicoAtual);

  // Busca por correspondência exata ou parcial (match fuzzy simples)
  const idx = ementa.findIndex(
    (step) =>
      normalize(step).includes(topicoNorm) ||
      topicoNorm.includes(normalize(step))
  );

  if (idx === -1) return ementa[0]; // tópico não encontrado → ancora no início
  if (idx + 1 >= ementa.length) return ""; // último tópico → ementa concluída

  return ementa[idx + 1];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, materia, nivel_atual, ementa, topico_atual } =
      await req.json();

    if (!messages || !Array.isArray(messages) || !materia) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: messages, materia" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY");
    if (!DEEPSEEK_API_KEY) {
      throw new Error("DEEPSEEK_API_KEY is not configured");
    }

    const chatHistory = messages
      .map(
        (m: { role: string; content: string }) =>
          `${m.role === "user" ? "Aluno" : "Professor"}: ${m.content}`
      )
      .join("\n\n");

    const systemMessage = `${EXTRACT_PROMPT}\n\nMatéria: ${materia}\nNível atual do aluno: ${
      nivel_atual || 1
    }`;

    let content = "";
    try {
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-v4-flash",
          messages: [
            {
              role: "system",
              content: systemMessage,
            },
            {
              role: "user",
              content: `Aja como o avaliador silêncioso e extraia os dados. Histórico da sessão:\n\n${chatHistory}`,
            },
          ],
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        const t = await response.text();
        console.error("Gemini API error:", response.status, t);
        // Não lança erro — vai usar defaults abaixo
      } else {
        const data = await response.json();
        content = data.choices?.[0]?.message?.content || "";
      }
    } catch (fetchErr) {
      console.error("Gemini fetch failed:", fetchErr);
      // Continua com content vazio → vai usar defaults
    }

    // Limpa markdown code fences que o Gemini às vezes adiciona (```json ... ```)
    content = content.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();

    // DEFAULTS seguros — se a IA falhar, a sessão AINDA É SALVA com dados razoáveis
    const safeDefaults = {
      topico: topico_atual || materia,
      erros: 0,
      dificuldade: "media",
      nivel: nivel_atual || 1,
      decisao_proxima: "A definir",
      observacoes: "Extração automática indisponível — dados padrão aplicados.",
    };

    let extracted;
    try {
      if (content && content.includes("{")) {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          extracted = JSON.parse(jsonMatch[0]);
        } else {
          extracted = safeDefaults;
        }
      } else {
        extracted = safeDefaults;
      }
    } catch {
      console.warn("[extract] JSON parse failed, using safe defaults. Raw content:", content.substring(0, 200));
      extracted = safeDefaults;
    }

    // ✅ CÁLCULO DETERMINÍSTICO: o proximo_topico é calculado pelo código,
    // não pelo LLM. O Gemini extrai apenas métricas de desempenho (erros, dificuldade, nivel).
    // A progressão no roadmap é responsabilidade do sistema, não da IA.
    const proximoTopicoDeterministico = calcularProximoTopico(
      ementa || [],
      topico_atual || extracted.topico || ""
    );

    extracted.proximo_topico = proximoTopicoDeterministico;

    console.log(
      `[extract] topico_atual="${topico_atual}" → proximo="${proximoTopicoDeterministico}" (ementa size: ${
        (ementa || []).length
      })`
    );

    return new Response(JSON.stringify(extracted), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("extract error:", e);
    
    // ÚLTIMO RECURSO: mesmo se tudo falhar, retorna um JSON válido para o frontend não quebrar
    const emergencyDefaults = {
      topico: "Sessão de estudos",
      erros: 0,
      dificuldade: "media",
      nivel: 1,
      proximo_topico: "",
      decisao_proxima: "A definir",
      observacoes: "Falha na extração — dados de emergência aplicados.",
    };

    return new Response(
      JSON.stringify(emergencyDefaults),
      {
        status: 200, // Retorna 200 mesmo em falha para que o frontend salve a sessão!
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
