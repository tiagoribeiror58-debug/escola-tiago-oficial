import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Cadeia de fallback: tenta do mais moderno ao mais estável.
// Se um estiver sobrecarregado (overloaded), tenta o próximo automaticamente.
const MODELS = [
  { id: "gemini-3.5-flash", provider: "google" },       // Novo modelo principal: rápido e multimodal
  { id: "claude-haiku-4-5-20251001", provider: "anthropic" }, // Fallback para Anthropic
  { id: "claude-sonnet-4-5-20250929", provider: "anthropic" } // Fallback final
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
    // IMPORTANTE: Nunca coloque chaves hardcoded no código!
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    const TAVILY_API_KEY = Deno.env.get("TAVILY_API_KEY");
    let finalSystemPrompt = systemPrompt || "You are a helpful assistant.";

    // Cria um stream customizado para emitir eventos antes da IA principal
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          // --- 1. ROTEAMENTO DE INTENÇÃO (INTENT ROUTER) E FORMULAÇÃO DE QUERY ---
          const recentMessages = messages.slice(-4);
          const contextStr = recentMessages.map((m: any) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n");
          const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user')?.content;

          if (lastUserMessage && TAVILY_API_KEY && ANTHROPIC_API_KEY) {
            try {
              console.log(`[chat] Verificando intenção de busca...`);
              
              const intentResponse = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                  "x-api-key": ANTHROPIC_API_KEY,
                  "anthropic-version": "2023-06-01",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  model: "claude-haiku-4-5-20251001",
                  system: "Você é um especialista em formular queries de busca. Leia o histórico da conversa. A última mensagem do usuário requer internet em tempo real (notícias, cotações, referências atuais, validação de fontes, anos 2024/2025/2026+)?\nSe NÃO precisar de busca (conhecimento estático), retorne APENAS a palavra: NAO\nSe PRECISAR, formule a melhor query de busca para o Google (curta e direta) que resolva a dúvida. Retorne APENAS a query. Não explique nada.",
                  messages: [{ role: "user", content: `Histórico recente:\n${contextStr}` }],
                  max_tokens: 30,
                  temperature: 0.0,
                }),
              });

              if (intentResponse.ok) {
                const intentData = await intentResponse.json();
                const decision = intentData.content?.[0]?.text?.trim();
                console.log(`[chat] Decisão/Query de Busca (Haiku): ${decision}`);

                // --- 2. BUSCA NA TAVILY ---
                if (decision && decision.toUpperCase() !== 'NAO' && decision.toUpperCase() !== 'NÃO') {
                  const searchQuery = decision;
                  console.log(`[chat] Acionando busca na Tavily com a query: "${searchQuery}"`);
                  
                  // EMITE O EVENTO DE BUSCA PARA O FRONTEND! (Indicador visual em tempo real)
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'search_intent', query: searchQuery })}\n\n`));
                  
                  const tavilyResponse = await fetch("https://api.tavily.com/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      api_key: TAVILY_API_KEY,
                      query: searchQuery,
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
                      finalSystemPrompt += `\n\n<contexto_tempo_real>\nOs seguintes dados de tempo real foram recuperados da web agora (usando a ferramenta de busca). Use essas informações para responder com precisão atualizada.\n\n${snippets}\n</contexto_tempo_real>`;
                      console.log(`[chat] Contexto dinâmico injetado com sucesso!`);

                      // Detectar tópico emergente (fire-and-forget)
                      if (materiaSlug && ANTHROPIC_API_KEY) {
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
              console.error(`[chat] Erro não crítico no Intent Router:`, err);
            }
          }

          // --- 3. STREAMING PRINCIPAL ---
          let success = false;
          for (const modelDef of MODELS) {
            const isGoogle = modelDef.provider === "google";
            
            // Ignora o modelo se não houver chave para ele
            if (isGoogle && !GEMINI_API_KEY) continue;
            if (!isGoogle && !ANTHROPIC_API_KEY) continue;
            
            console.log(`[chat] Tentando modelo: ${modelDef.id} (Provider: ${modelDef.provider})`);

            let url = "";
            let headers: Record<string, string> = { "Content-Type": "application/json" };
            let body: any = { stream: true };

            if (isGoogle) {
              // Usamos a API compatível com OpenAI do Google AI Studio para manter o padrão SSE do frontend!
              url = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
              headers["Authorization"] = `Bearer ${GEMINI_API_KEY}`;
              body.model = modelDef.id;
              body.max_tokens = 2048;
              body.messages = [
                { role: "system", content: finalSystemPrompt },
                ...messages
              ];
            } else {
              url = "https://api.anthropic.com/v1/messages";
              headers["x-api-key"] = ANTHROPIC_API_KEY!;
              headers["anthropic-version"] = "2023-06-01";
              body.model = modelDef.id;
              body.system = finalSystemPrompt;
              body.messages = messages;
              body.max_tokens = 2048;
            }

            const response = await fetch(url, {
              method: "POST",
              headers,
              body: JSON.stringify(body),
            });

            if (!response.ok) {
              const t = await response.text();
              console.error(`[chat] Model ${modelDef.id} error ${response.status}:`, t);
              // Se falhou, tenta o próximo modelo (fallback) se ainda houver.
              // O Google retorna 429 para rate limit, a Anthropic retorna 400 para sem créditos, etc.
              console.warn(`[chat] Falha no modelo ${modelDef.id}. Tentando o próximo...`);
              continue;
            }

            console.log(`[chat] Serving successful with model: ${modelDef.id}`);
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              controller.enqueue(value);
            }
            success = true;
            break; // se o stream completou com sucesso, quebra o loop e não tenta o fallback
          }

          if (!success) {
            // Se chegou aqui, TODOS os modelos do fallback falharam.
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: { message: 'Todas as IAs falharam (limite excedido ou sem créditos). Tente novamente mais tarde.' } })}\n\n`));
          }

        } catch (e) {
          console.error("chat error:", e);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: { message: e instanceof Error ? e.message : 'Unknown error' } })}\n\n`));
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
