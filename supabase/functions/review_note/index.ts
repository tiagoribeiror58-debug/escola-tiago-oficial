
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

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) throw new Error('OPENAI_API_KEY não configurada');

    const prompt = `Você é um tutor revisando uma anotação de um aluno sobre o tópico "${topico}" da matéria "${materia_slug}".
Anotação do aluno:
"""
${reflection}
"""

Sua tarefa:
Revise a anotação do aluno. Corrija se houver algum erro conceitual grave. Em seguida, expanda ou complemente a anotação com 1 a 2 parágrafos no máximo, adicionando algo valioso que reforce o aprendizado (pode ser uma analogia, um fato interessante, ou o conceito chave que falta).
Mantenha o tom encorajador e direto. Retorne APENAS a sua revisão/complemento.`;

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const openAiData = await openAiResponse.json();
    if (openAiData.error) throw new Error(openAiData.error.message);

    const ai_complement = openAiData.choices[0].message.content.trim();

    // Salvar no Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
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
