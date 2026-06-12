import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Cadeia de fallback: tenta do mais moderno ao mais estável.
// Se um estiver sobrecarregado (overloaded), tenta o próximo automaticamente.
const MODELS = [
  { id: "deepseek-v4-flash", provider: "deepseek" },       // Novo modelo principal: rápido e multimodal
  { id: "deepseek-v4-flash", provider: "deepseek" },       // Fallback caso 3.5-flash esteja sobrecarregado (503)
  { id: "claude-haiku-4-5-20251001", provider: "anthropic" }, // Fallback para Anthropic
  { id: "claude-sonnet-4-5-20250929", provider: "anthropic" } // Fallback final
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    const { messages, systemPrompt, materiaSlug, sessionKey } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Missing messages array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ANTHROPIC_API_KEY     = Deno.env.get("ANTHROPIC_API_KEY");
    // IMPORTANTE: Nunca coloque chaves hardcoded no código!
    const DEEPSEEK_API_KEY      = Deno.env.get("DEEPSEEK_API_KEY");
    const TAVILY_API_KEY        = Deno.env.get("TAVILY_API_KEY");
    const SUPABASE_URL          = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY     = Deno.env.get("SUPABASE_ANON_KEY");
    const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // Custo por 1000 tokens em BRL (configurável por env var).
    // Exemplo: R$0.003 por 1.000 tokens ≈ R$3 por 1M tokens.
    const PRICE_PER_1K_TOKENS = parseFloat(Deno.env.get("PRICE_PER_1K_TOKENS") ?? "0.003");

    // --- BILLING: Verificar saldo antes de processar ---
    // Isso é o portão de entrada: sem saldo, sem acesso à IA.
    let userId: string | null = null;
    if (authHeader && SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_SERVICE_ROLE) {
      try {
        // Identificar o usuário pelo JWT
        const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
          headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": authHeader },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          userId = userData.id ?? null;
        }

        if (userId) {
          // Busca saldo atual pelo SUM do ledger de transações
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
            // Saldo zerado: bloqueia o chat e avisa o usuário
            return new Response(
              JSON.stringify({
                error: "saldo_insuficiente",
                message: "Seu saldo acabou! Adicione créditos para continuar estudando.",
              }),
              { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          console.log(`[chat] Saldo do usuário ${userId}: R$${balanceBrl.toFixed(4)} ✅`);
        }
      } catch (err) {
        // Erro de billing não deve bloquear o app em desenvolvimento (log e continua)
        console.warn("[chat] Erro ao verificar saldo (non-blocking):", err);
      }
    }

    let finalSystemPrompt = systemPrompt || "You are a helpful assistant.";

    // --- 0. INSTRUÇÕES VISUAIS (MERMAID & UNSPLASH) ---
    finalSystemPrompt += `

[INSTRUÇÃO VISUAL CRÍTICA]:
Você deve gerar RECURSOS VISUAIS para o aluno usando Diagramas e Fotos Reais. É OBRIGATÓRIO ilustrar conceitos sempre que possível.
1. DIAGRAMAS LÓGICOS (Mermaid): SEMPRE que você estiver explicando um processo passo a passo, um fluxo de dados, uma hierarquia, um ciclo mental, arquitetura de sistemas ou qualquer relação de causa e efeito, você DEVE criar um diagrama usando blocos \`mermaid\`. Faça isso frequentemente para facilitar o mapa mental do aluno! (Regra sintaxe: Use aspas duplas nos textos dos nós: A["texto longo"]).
2. FOTOS REAIS (Unsplash): O Tiago é extremamente visual! Sempre que citar um local histórico, cenário, animal, tecnologia física ou conceito visualizável, você DEVE gerar uma foto inserindo a tag: [FOTO: termo de busca em ingles] em uma linha isolada na sua resposta.
Exemplo prático: [FOTO: modern data center servers] ou [FOTO: ancient rome colosseum]
REGRA: É extremamente encorajado usar [FOTO: ...] em 90% das suas explicações sobre coisas do mundo real.

[REGRA DE OURO]:
Absolutamente TODA MENSAGEM SUA, sem exceção, DEVE terminar isoladamente com a tag <chips>Sugestão 1|Sugestão 2</chips>. Omitir essa tag quebra a interface do sistema!
`;

    // Cria um stream customizado para emitir eventos antes da IA principal
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          // --- 1. ROTEAMENTO DE INTENÇÃO (INTENT ROUTER) E FORMULAÇÃO DE QUERY ---
          const recentMessages = messages.slice(-4);
          const contextStr = recentMessages.map((m: any) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n");
          const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user')?.content;

          if (lastUserMessage && DEEPSEEK_API_KEY) {
            try {
              console.log(`[chat] Verificando intenção de busca com Gemini...`);
              
              const intentResponse = await fetch("https://api.deepseek.com/chat/completions", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  model: "deepseek-v4-flash",
                  messages: [
                    { role: "system", content: "Você é um especialista em formular queries de busca. Leia o histórico da conversa e a última mensagem do usuário.\n\nDecida se é necessário buscar na web. Casos que EXIGEM busca:\n- Notícias, eventos ou dados de 2024/2025/2026+\n- Cotações, preços, métricas ou números de mercado\n- Exemplos reais de empresas específicas (Tesla, TikTok, Apple, etc)\n- Estratégias empresariais, modelos de negócio, cases reais\n- Qualquer dado que pode estar desatualizado ou incompleto no treinamento\n- Quando o usuário pede para 'continuar' em um exemplo específico e há dados verificáveis envolvidos\n\nCasos que NÃO precisam de busca:\n- Conceitos puros de matemática, física, lógica\n- Definições filosóficas e históricas bem estabelecidas\n- O usuário está apenas pedindo para continuar a explicação de um conceito abstrato\n\nSe NÃO precisar de busca, retorne APENAS: NAO\nSe PRECISAR, formule a melhor query de busca (curta e direta em inglês quando possível). Retorne APENAS a query." },
                    { role: "user", content: `Histórico recente:\n${contextStr}` }
                  ],
                  max_tokens: 30,
                  temperature: 0.0,
                }),
              });

              if (intentResponse.ok) {
                const intentData = await intentResponse.json();
                const decision = intentData.choices?.[0]?.message?.content?.trim();
                console.log(`[chat] Decisão/Query de Busca (Gemini): ${decision}`);

                // --- 2. BUSCA NA TAVILY OU FALLBACK ---
                if (decision && decision.toUpperCase() !== 'NAO' && decision.toUpperCase() !== 'NÃO') {
                  const searchQuery = decision;
                  console.log(`[chat] Acionando busca na web com a query: "${searchQuery}"`);
                  
                  // EMITE O EVENTO DE BUSCA PARA O FRONTEND! (Indicador visual em tempo real)
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'search_intent', query: searchQuery })}\n\n`));
                  
                  let snippets = "";
                  let firstUrl = "";

                  if (TAVILY_API_KEY) {
                    try {
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
                        if (results.length > 0) firstUrl = results[0].url;
                        snippets = results.map((r: any) => `[${r.title || 'Referência'}](${r.url}):\n${r.content}`).join("\n\n");
                      } else {
                        console.warn(`[chat] Falha na Tavily API:`, await tavilyResponse.text());
                      }
                    } catch (err) {
                      console.error(`[chat] Erro ao chamar Tavily:`, err);
                    }
                  }

                  if (!snippets) {
                    console.log(`[chat] Tavily indisponível ou sem chave. Usando DuckDuckGo fallback...`);
                    try {
                      const ddg = await import("npm:duck-duck-scrape");
                      const ddgResults = await ddg.search(searchQuery);
                      const results = ddgResults.results || [];
                      if (results.length > 0) firstUrl = results[0].url;
                      snippets = results.slice(0, 3).map((r: any) => `[${r.title}](${r.url}):\n${r.description}`).join("\n\n");
                    } catch (err) {
                      console.error(`[chat] Erro no DuckDuckGo fallback:`, err);
                    }
                  }
                    
                  if (snippets) {
                    finalSystemPrompt += `\n\n<contexto_tempo_real>\nOs seguintes dados de tempo real foram recuperados da web agora (usando a ferramenta de busca). Use essas informações para responder com precisão atualizada.\n\n${snippets}\n</contexto_tempo_real>`;
                    console.log(`[chat] Contexto dinâmico injetado com sucesso!`);

                    // Detectar tópico emergente (fire-and-forget)
                    if (materiaSlug && DEEPSEEK_API_KEY) {
                      (async () => {
                        try {
                          const topicDetectResp = await fetch("https://api.deepseek.com/chat/completions", {
                            method: "POST",
                            headers: {
                              "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              model: "deepseek-v4-flash",
                              messages: [
                                { role: "system", content: `Você é um curador de currículo educacional. Analise o conteúdo de busca fornecido e determine se ele contém UM tópico de estudo concreto e específico que seria valioso para um aluno que estuda '${materiaSlug}'. Se sim, retorne um JSON com exatamente este formato: {\"titulo\": \"Título conciso do tópico\", \"descricao\": \"Uma frase explicando o que o aluno aprenderá\", \"fonte_url\": \"URL mais relevante\"}. Se NÃO houver tópico novo relevante, retorne apenas: null` },
                                { role: "user", content: `Conteúdo da busca:\n${snippets.substring(0, 2000)}` }
                              ],
                              max_tokens: 200,
                              temperature: 0.1,
                            }),
                          });

                          if (topicDetectResp.ok) {
                            const topicData = await topicDetectResp.json();
                            const rawText = topicData.choices?.[0]?.message?.content?.trim() || '';
                            if (rawText && rawText !== 'null' && rawText.includes('{')) {
                              const jsonMatch = rawText.match(/\{[\s\S]*\}/);
                              if (jsonMatch) {
                                const topicJson = JSON.parse(jsonMatch[0]);
                                if (topicJson?.titulo) {
                                  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
                                  if (SUPABASE_URL && authHeader) {
                                    await fetch(`${SUPABASE_URL}/rest/v1/topicos_emergentes`, {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                        "apikey": Deno.env.get("SUPABASE_ANON_KEY") || "",
                                        "Authorization": authHeader,
                                        "Prefer": "return=minimal",
                                      },
                                      body: JSON.stringify({
                                        materia_slug: materiaSlug,
                                        titulo: topicJson.titulo,
                                        descricao: topicJson.descricao || null,
                                        fonte_url: topicJson.fonte_url || firstUrl || null,
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
                }
              }
            } catch (err) {
              console.error(`[chat] Erro não crítico no Intent Router:`, err);
            }
          }

          // --- 3. STREAMING PRINCIPAL ---
          let success = false;
          for (const modelDef of MODELS) {
            const isdeepseek = modelDef.provider === "deepseek";
            
            // Ignora o modelo se não houver chave para ele
            if (isdeepseek && !DEEPSEEK_API_KEY) continue;
            if (!isdeepseek && !ANTHROPIC_API_KEY) continue;
            
            console.log(`[chat] Tentando modelo: ${modelDef.id} (Provider: ${modelDef.provider})`);

            let url = "";
            let headers: Record<string, string> = { "Content-Type": "application/json" };
            let body: any = { stream: true };

            if (isdeepseek) {
              // Usamos a API compatível com OpenAI do deepseek AI Studio para manter o padrão SSE do frontend!
              url = "https://api.deepseek.com/chat/completions";
              headers["Authorization"] = `Bearer ${DEEPSEEK_API_KEY}`;
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
              // O deepseek retorna 429 para rate limit, a Anthropic retorna 400 para sem créditos, etc.
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

          // --- BILLING: Debitar tokens consumidos (fire-and-forget, não bloqueia o stream) ---
          // Estimativa de tokens: ~1 token = 4 caracteres. Calculamos pelos últimos messages + resposta.
          // Para uma implementação exata, a API do Deepseek retorna usage no chunk final.
          if (success && userId && SUPABASE_URL && SUPABASE_SERVICE_ROLE) {
            (async () => {
              try {
                // Estimativa simples de tokens: soma de chars / 4
                const inputChars  = messages.reduce((acc: number, m: any) => acc + (m.content?.length ?? 0), 0);
                const estimatedTokens = Math.ceil((inputChars + 500) / 4); // +500 de output estimado
                const costBrl = (estimatedTokens / 1000) * PRICE_PER_1K_TOKENS;

                await fetch(`${SUPABASE_URL}/rest/v1/credit_transactions`, {
                  method: "POST",
                  headers: {
                    "apikey":        SUPABASE_SERVICE_ROLE,
                    "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE}`,
                    "Content-Type":  "application/json",
                    "Prefer":        "return=minimal",
                  },
                  body: JSON.stringify({
                    user_id:     userId,
                    type:        "USAGE",
                    amount_brl:  -Math.abs(costBrl).toFixed(4),
                    tokens:      estimatedTokens,
                    description: `Chat — ~${estimatedTokens} tokens`,
                  }),
                });
                console.log(`[chat] 💳 Debitado R$${costBrl.toFixed(4)} (~${estimatedTokens} tokens) para user ${userId}`);
              } catch (err) {
                console.warn("[chat] Erro ao debitar tokens (non-blocking):", err);
              }
            })();
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
