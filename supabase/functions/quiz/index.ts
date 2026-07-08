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
    const { action, materiaSlug, completedTopics, n, questionText, userAnswer, topico, forceAnswer, topicos, materias, userConclusion, debateHistory } = await req.json();

    const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY");
    if (!DEEPSEEK_API_KEY) {
      throw new Error("Missing API Key");
    }

    const SUPABASE_URL          = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY     = Deno.env.get("SUPABASE_ANON_KEY");
    const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const PRICE_PER_1K_TOKENS = parseFloat(Deno.env.get("PRICE_PER_1K_TOKENS") ?? "0.003");

    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader && SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_SERVICE_ROLE) {
      try {
        const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
          headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": authHeader },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          userId = userData.id ?? null;
        }

        if (userId) {
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
            return new Response(
              JSON.stringify({
                error: "saldo_insuficiente",
                message: "Seu saldo acabou! Adicione créditos para continuar estudando.",
              }),
              { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
        }
      } catch (err) {
        console.warn("[quiz] Erro ao verificar saldo (non-blocking):", err);
      }
    }

    if (action === "generate") {
      const prompt = `Gere ${n || 5} perguntas curtas de revisão sobre os seguintes tópicos que o aluno já estudou da matéria '${materiaSlug || 'Geral'}':
[${(completedTopics || []).join(', ')}]

O objetivo é Active Recall (Retrieval Practice). As perguntas devem ser diretas, focando na essência do que foi aprendido.
Retorne APENAS um JSON válido seguindo este array de objetos:
[
  { 
    "topico": "Nome exato do tópico de onde a pergunta foi extraída", 
    "text": "A pergunta em si",
    "dica": "Uma dica sutil que ajude o aluno a lembrar, mas sem dar a resposta direta"
  }
]
NÃO retorne markdown, nem \`\`\`json, nem explicações. Apenas o array JSON puro, sem formatação.`;

      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
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
      const regrasFeedback = forceAnswer 
        ? `REGRAS PARA O FEEDBACK: O aluno desistiu/pediu a resposta. Forneça uma explicação profunda, detalhada e altamente didática (Técnica Feynman). Descreva os mecanismos, o "porquê" das coisas, e conecte os conceitos de forma lógica em um parágrafo rico e claro.`
        : `REGRAS PARA O FEEDBACK:
1. Em TODAS as suas intervenções, aja como um mentor brilhante. Nunca dê respostas curtas ou superficiais. Use a Técnica Feynman para explicar.
2. Se o status for "correto": Confirme o acerto e expanda o conceito com uma explicação rica, mostrando a lógica profunda por trás do assunto.
3. Se o status for "errado" ou "parcial": Explique os mecanismos e a lógica real por trás da parte que o aluno errou de forma detalhada e didática (em um parágrafo robusto, como faria um grande professor). Ensine o aluno. Após a explicação profunda, finalize com uma pergunta instigante ou dica para que ele aplique a lógica na próxima tentativa. Nunca diga apenas "continue revisando".`;


      const prompt = `O aluno está respondendo a uma pergunta de revisão de Active Recall.
Tópico: ${topico}
Pergunta: ${questionText}
Resposta do aluno: ${userAnswer}

Avalie a resposta do aluno e retorne um JSON puro seguindo este objeto:
{
  "status": "correto" | "errado" | "parcial",
  "feedback": "..."
}

${regrasFeedback}

NÃO retorne markdown, nem \`\`\`json. Apenas o JSON puro, sem formatação extra.`;

      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
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

    // --- FEAT-4: Método Feynman - Explicação Simplificada ---
    if (action === "feynman_explain") {
      const prompt = `Você é um mentor aplicando o Método Feynman. Explique o tópico "${topico}" da matéria "${materiaSlug || 'Geral'}" como se estivesse ensinando para uma criança de 10 anos.

REGRAS:
1. Use linguagem ultra-simples, sem jargões técnicos
2. Use analogias do cotidiano (comida, brinquedos, escola, futebol)
3. Máximo 120 palavras
4. Quebre em 2-3 parágrafos curtos
5. No final, NÃO faça perguntas. Apenas explique.

Retorne APENAS um JSON:
{"explanation": "sua explicação simplificada aqui"}

NÃO retorne markdown, nem \`\`\`json. Apenas o JSON puro.`;

      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
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

    // --- FEAT-4: Método Feynman - Avaliação da Reexplicação ---
    if (action === "feynman_evaluate") {
      const prompt = `O aluno está praticando o Método Feynman. Ele leu uma explicação simplificada sobre "${topico}" e agora tentou reexplicar com suas próprias palavras.

Reexplicação do aluno: ${userAnswer}

Avalie se o aluno demonstrou compreensão real do conceito. Retorne um JSON:
{
  "status": "correto" | "parcial" | "errado",
  "feedback": "..."
}

REGRAS:
1. "correto": O aluno capturou a essência do conceito, mesmo com palavras diferentes
2. "parcial": O aluno entendeu parte, mas há lacunas importantes. Aponte qual lacuna específica
3. "errado": O aluno não demonstrou compreensão. Reexplique de forma ainda mais simples
4. Feedback sempre didático, com analogias simples, máx 100 palavras

NÃO retorne markdown, nem \`\`\`json. Apenas o JSON puro.`;

      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
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

    // --- FEAT-5: Quiz Interleaving - Perguntas Mistas ---
    if (action === "generate_mixed") {
      const topicsList = topicos || completedTopics || [];
      const materiasList = materias || [materiaSlug || 'Geral'];
      const totalQuestions = n || 6;
      const perMateria = Math.ceil(totalQuestions / materiasList.length);

      const prompt = `Gere exatamente ${totalQuestions} perguntas de revisão (Active Recall) distribuídas igualmente entre estas matérias/tópicos:

${materiasList.map((m: string, i: number) => `Matéria ${i+1}: "${m}" - Tópicos: [${topicsList.filter((_: string, idx: number) => idx % materiasList.length === i).join(', ') || 'qualquer tópico da matéria'}]`).join('\n')}

Gere ~${perMateria} perguntas por matéria. As perguntas devem ser diretas, focando na essência.
Retorne APENAS um JSON válido:
[
  { "materia": "nome da matéria", "topico": "tópico específico", "text": "a pergunta", "dica": "dica sutil" }
]
NÃO retorne markdown, nem \`\`\`json. Apenas o array JSON puro.`;

      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
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

    // --- FEAT-6: Warmup Questions (Q-SQ3R) ---
    if (action === "warmup_questions") {
      const prompt = `Gere 4 perguntas-guia para um aluno que está prestes a estudar o tópico "${topico}" da matéria "${materiaSlug || 'Geral'}".

Essas perguntas devem:
1. Preparar a mente do aluno para o que ele vai aprender
2. Direcionar a atenção para os conceitos mais importantes
3. Ser perguntas que o conteúdo do tópico vai responder
4. Usar linguagem simples e direta

Retorne APENAS um JSON:
[
  {"question": "pergunta 1", "hint": "por que essa pergunta é importante"},
  {"question": "pergunta 2", "hint": "..."},
  {"question": "pergunta 3", "hint": "..."},
  {"question": "pergunta 4", "hint": "..."}
]
NÃO retorne markdown, nem \`\`\`json. Apenas o array JSON puro.`;

      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.6,
        }),
      });

      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      let content = data.choices[0].message.content.trim();
      if (content.startsWith('```json')) content = content.replace(/```json/g, '').replace(/```/g, '').trim();

      return new Response(content, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // --- FEAT-10: Modo Adversarial (IA te Contesta) ---
    if (action === "adversarial") {
      const conclusion = userConclusion || userAnswer;
      const history = debateHistory || [];
      const round = history.length + 1;

      let prompt = '';
      if (round === 1) {
        prompt = `O aluno está estudando "${topico}" da matéria "${materiaSlug || 'Geral'}" e apresentou esta conclusão:

"${conclusion}"

Você é um debatedor intelectual rigoroso. Seu trabalho é ATACAR essa conclusão com o contra-argumento mais forte possível. Encontre falhas lógicas, exceções, ou perspectivas opostas.

REGRAS:
1. Seja respeitoso mas incisivo
2. Apresente UM contra-argumento forte e bem fundamentado
3. Máximo 100 palavras
4. Termine com uma pergunta desafiadora para o aluno rebater

Retorne APENAS um JSON:
{"counterargument": "seu contra-argumento aqui", "challenge_question": "pergunta para o aluno rebater"}
NÃO retorne markdown, nem \`\`\`json. Apenas o JSON puro.`;
      } else if (round <= 3) {
        const historyStr = history.map((h: any, i: number) => `Rodada ${i+1}: Aluno: "${h.user}" | IA: "${h.ai}"`).join('\n');
        prompt = `Debate sobre "${topico}". Histórico:
${historyStr}

Nova resposta do aluno: "${conclusion}"

${round === 3 ? 'Esta é a ÚLTIMA rodada. Dê seu VEREDITO FINAL.' : 'Continue o debate com outro contra-argumento.'}

${round === 3 ? `Retorne JSON: {"counterargument": "análise final", "verdict": "resistiu" | "falhou", "verdict_explanation": "explicação do veredito em 1 frase"}` : `Retorne JSON: {"counterargument": "contra-argumento", "challenge_question": "pergunta"}`}
NÃO retorne markdown, nem \`\`\`json. Apenas o JSON puro.`;
      }

      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.5,
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
