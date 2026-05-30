
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { materia_slug, topico, reflection } = await req.json();

    if (!materia_slug || !topico || !reflection) {
      return new Response(
        JSON.stringify({ error: 'Faltam parâmetros obrigatórios' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) throw new Error('GEMINI_API_KEY não configurada');

    const isHighlight = reflection.startsWith('Trecho destacado:');
    
    let prompt = '';
    
    if (isHighlight) {
      prompt = `O aluno destacou um trecho importante do material de estudo sobre o tópico "${topico}" da matéria "${materia_slug}".
Trecho destacado:
"""
${reflection.replace('Trecho destacado:\n', '')}
"""

Sua tarefa:
O aluno salvou esse trecho porque o achou fundamental. Forneça um complemento valioso a este trecho. Não avalie, nem elogie o aluno, pois ele não é o autor do texto.
Apenas expanda o conceito com 1 a 2 parágrafos no máximo, adicionando algo útil que reforce o aprendizado (pode ser uma analogia, um fato histórico, um exemplo prático ou o conceito chave subjacente).
Retorne APENAS o seu complemento diretamente.`;
    } else {
      prompt = `Você é um tutor revisando uma reflexão escrita por um aluno sobre o tópico "${topico}" da matéria "${materia_slug}".
Anotação do aluno:
"""
${reflection}
"""

Sua tarefa:
Revise a anotação do aluno. Corrija se houver algum erro conceitual grave. Em seguida, expanda ou complemente a anotação com 1 a 2 parágrafos no máximo, adicionando algo valioso que reforce o aprendizado (pode ser uma analogia, um fato interessante, ou o conceito chave que falta).
Mantenha o tom encorajador e direto. Retorne APENAS a sua revisão/complemento.`;
    }

    const aiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${geminiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemini-3.5-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const aiData = await aiResponse.json();
    if (aiData.error) throw new Error(aiData.error.message);

    const ai_complement = aiData.choices[0].message.content.trim();

    // Salvar no Supabase
    const authHeader = req.headers.get('Authorization');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      authHeader ? { global: { headers: { Authorization: authHeader } } } : undefined
    );

    const { data: insertedData, error: dbError } = await supabaseClient
      .from('study_notes')
      .insert({
        materia_slug,
        topico,
        user_reflection: reflection,
        ai_complement,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({ success: true, note: insertedData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
