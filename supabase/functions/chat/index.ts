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
    const { messages, systemPrompt, materiaSlug, sessionKey } = await req.json();

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

    const TAVILY_API_KEY = Deno.env.get("TAVILY_API_KEY");
    let finalSystemPrompt = systemPrompt || "You are a helpful assistant.";

    // --- 1. ROTEAMENTO DE INTENÇÃO (INTENT ROUTER) ---
    // Extrai a última mensagem do usuário do array de mensagens
    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user')?.content;

    if (lastUserMessage && TAVILY_API_KEY && ANTHROPIC_API_KEY) {
      try {
        console.log(`[chat] Verificando intenção para: "${String(lastUserMessage).substring(0, 50)}..."`);
        
        // Chamada ultra-rápida pro Haiku
        const intentResponse = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            system: "Você é um classificador de intenção de busca. O usuário fez uma pergunta que exija dados em tempo real, eventos após 2023, anos específicos recentes ou futuros (2024, 2025, 2026+), notícias atuais, clima, cotações ou atualidades geopolíticas para ser respondida com precisão? Se houver dúvida ou menção a anos recentes, priorize 'SIM'. Responda APENAS com a palavra 'SIM' ou 'NAO'. Não adicione pontuação.",
            messages: [{ role: "user", content: lastUserMessage }],
            max_tokens: 5,
            temperature: 0.0, // Garantir zero alucinação
          }),
        });

        if (intentResponse.ok) {
          const intentData = await intentResponse.json();
          const decision = intentData.content?.[0]?.text?.trim().toUpperCase();
          console.log(`[chat] Decisão de Busca (Haiku): ${decision}`);

          // --- 2. BUSCA NA TAVILY (SOMENTE SE 'SIM') ---
          if (decision === 'SIM' || decision?.includes('SIM')) {
            console.log(`[chat] Acionando busca em tempo real na Tavily API...`);
            
            const tavilyResponse = await fetch("https://api.tavily.com/search", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                api_key: TAVILY_API_KEY,
                query: lastUserMessage,
                search_depth: "basic",
                include_images: false,
                include_answer: false,
                max_results: 3,
              }),
            });

            if (tavilyResponse.ok) {
              const tavilyData = await tavilyResponse.json();
              const results: any[] = tavilyData.results || [];
              const snippets = results.map((r: any) => `[${r.title || 'Referência'}](${r.url}):\n${r.content}`).join("\n\n");
              
              if (snippets) {
                // Injeta no System Prompt original
                finalSystemPrompt += `\n\n<contexto_tempo_real>\nOs seguintes dados de tempo real foram recuperados da web agora (usando a ferramenta de busca). Use essas informações para responder com precisão atualizada.\n\n${snippets}\n</contexto_tempo_real>`;
                console.log(`[chat] Contexto dinâmico injetado com sucesso!`);

                // --- CURRÍCULO VIVO: Detectar e salvar tópico emergente ---
                // Só roda se tivermos o slug da matéria para vincular o tópico
                if (materiaSlug && ANTHROPIC_API_KEY) {
                  // Fire-and-forget: não bloqueia o streaming da resposta principal
                  (async () => {
                    try {
                      const topicDetectResp = await fetch("https://api.anthropic.com/v1/messages", {
                        method: "POST",
                        headers: {
                          "x-api-key": ANTHROPIC_API_KEY,
                          "anthropic-version": "2023-06-01",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          model: "claude-haiku-4-5-20251001",
                          system: `Você é um curador de currículo educacional. Analise o conteúdo de busca fornecido e determine se ele contém UM tópico de estudo concreto e específico que seria valioso para um aluno que estuda '${materiaSlug}'. Se sim, retorne um JSON com exatamente este formato: {\"titulo\": \"Título conciso do tópico\", \"descricao\": \"Uma frase explicando o que o aluno aprenderá\", \"fonte_url\": \"URL mais relevante\"}. Se NÃO houver tópico novo relevante, retorne apenas: null`,
                          messages: [{ role: "user", content: `Conteúdo da busca:\n${snippets.substring(0, 2000)}` }],
                          max_tokens: 200,
                          temperature: 0.1,
                        }),
                      });

                      if (topicDetectResp.ok) {
                        const topicData = await topicDetectResp.json();
                        const rawText = topicData.content?.[0]?.text?.trim() || '';
                        
                        if (rawText && rawText !== 'null' && rawText.includes('{')) {
                          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
                          if (jsonMatch) {
                            const topicJson = JSON.parse(jsonMatch[0]);
                            
                            if (topicJson?.titulo) {
                              // Salva no Supabase via REST API (service_role disponível automaticamente)
                              const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
                              const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
                              
                              if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
                                await fetch(`${SUPABASE_URL}/rest/v1/topicos_emergentes`, {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                    "apikey": SUPABASE_SERVICE_KEY,
                                    "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
                                    "Prefer": "return=minimal",
                                  },
                                  body: JSON.stringify({
                                    materia_slug: materiaSlug,
                                    titulo: topicJson.titulo,
                                    descricao: topicJson.descricao || null,
                                    fonte_url: topicJson.fonte_url || results[0]?.url || null,
                                    session_key: sessionKey || null,
                                  }),
                                });
                                console.log(`[chat] 🌐 Tópico emergente salvo: "${topicJson.titulo}" para ${materiaSlug}`);
                              }
                            }
                          }
                        }
                      }
                    } catch (err) {
                      console.warn('[chat] Falha não crítica na detecção de tópico emergente:', err);
                    }
                  })();
                }
              }
            } else {
               console.warn(`[chat] Falha na Tavily API:`, await tavilyResponse.text());
            }
          }
        }
      } catch (err) {
        console.error(`[chat] Erro não crítico no Intent Router (ignorado):`, err);
        // O fluxo principal continua normalmente se a busca der timeout ou quebrar
      }
    }

    // --- 3. STREAMING PRINCIPAL ---
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
          system: finalSystemPrompt,
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
