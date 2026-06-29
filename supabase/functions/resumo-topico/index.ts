import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

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

    const { materia, topico, messages, forceGenerate, materiaSlug } = await req.json();

    if (!materia || !topico) {
       throw new Error("Missing materia or topico");
    }

    const isChat = messages && Array.isArray(messages) && messages.length > 0;

    const systemPrompt = `Você é um mentor técnico sênior ultra conciso do aplicativo Escola Tiago.
Seu objetivo é explicar ou tirar dúvidas sobre o tópico "${topico}" da matéria "${materia}".
Regras absolutas:
1. Responda APENAS em Português (pt-BR).
2. Vá direto ao ponto, sem introduções (ex: evite dizer "Olá" ou "Claro").
3. Use no máximo 150 palavras.
4. Foco total em explicar o conceito de forma direta e prática. Use SEMPRE analogias cotidianas simples para facilitar o entendimento (NUNCA analogias de programação, a menos que o tema seja puramente de programação).
5. Se o usuário fizer uma pergunta, responda de forma cirúrgica. Se for o primeiro contato, crie um resumo poderoso do conceito.
6. CRÍTICO VISUAL: NUNCA crie um parágrafo massivo único. Separe blocos de ideias e parágrafos EXPLICITAMENTE usando duas quebras de linha reais (\\n\\n). Isso é mandatório para legibilidade.
`;

    let finalMessages = [];

    if (!isChat) {
       finalMessages = [
         { role: "system", content: systemPrompt },
         { role: "user", content: `Gere o resumo inicial altamente condensado e didático (máx 150 palavras) sobre o que é "${topico}" no contexto de "${materia}".` }
       ];
    } else {
       finalMessages = [
         { role: "system", content: systemPrompt },
         ...messages
       ];
    }

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${geminiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.7, 
        messages: finalMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Deepseek error:", errorText);
      throw new Error("Failed to fetch from AI");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "";

    // Salvar no cache do banco de dados apenas se for o resumo inicial (não um chat)
    if (!isChat && materiaSlug) {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
      );

      const { data: userData } = await supabaseClient.auth.getUser();
      if (userData?.user) {
        await supabaseClient
          .from('ai_content_cache')
          .upsert(
            { 
              user_id: userData.user.id,
              materia_slug: materiaSlug,
              topico: topico,
              tipo: 'resumo',
              content: content 
            },
            { onConflict: 'user_id, materia_slug, topico, tipo' }
          );
      }
    }

    return new Response(JSON.stringify({ texto: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in resumo-topico:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
