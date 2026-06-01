import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Trata requisições CORS preflight (quando o frontend pergunta se pode chamar essa API)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Receber os dados do usuário
    const { objetivo, texto_base } = await req.json();

    if (!objetivo && !texto_base) {
      return new Response(JSON.stringify({ error: "É necessário fornecer um objetivo ou um texto base para criar a matéria." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Chaves de ambiente (nunca expostas pro frontend)
    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
      throw new Error("Chave GEMINI_API_KEY não configurada no Supabase.");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Chaves do Supabase não configuradas no ambiente da Edge Function.");
    }

    // 3. Montar o prompt rígido para o Gemini (System Prompting)
    const systemPrompt = `Você é um curador educacional de alta performance e um especialista na estruturação de matérias de estudo.
Sua tarefa é analisar a requisição do aluno (um objetivo de estudo ou um texto base) e gerar a estrutura de uma matéria completa.

Você DEVE retornar APENAS um JSON válido. Não inclua texto Markdown fora do JSON, responda puramente o objeto JSON.

O JSON deve respeitar ESTRITAMENTE o seguinte contrato:
{
  "nome": "Nome chamativo e claro da Matéria (máximo 50 caracteres)",
  "slug": "nome-da-materia-tudo-minusculo-sem-acentos-com-hifens",
  "emoji": "📚 (Um único emoji que melhor represente a matéria)",
  "descricao": "Um resumo rápido, direto e empolgante do que será aprendido (máx 150 caracteres)",
  "ementa": ["Tópico 1 para estudar", "Tópico 2 para estudar", "Tópico 3 para estudar"]
}

Regras adicionais para a ementa:
- Crie entre 3 a 7 tópicos bem ordenados de forma progressiva (do básico ao avançado).
- Seja pragmático, evite tópicos genéricos.
`;

    const userMessage = objetivo 
      ? `Objetivo de estudo do aluno: ${objetivo}` 
      : `Texto base fornecido pelo aluno: ${texto_base}`;

    // 4. Chamar a API do Gemini
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${geminiKey}`,
      },
      body: JSON.stringify({
        model: "gemini-3.5-flash", // Utilizando a versão mais rápida e otimizada (Flash)
        temperature: 0.7,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        response_format: { type: "json_object" } // Força o Gemini a devolver um JSON estruturado
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro na API do Gemini:", errorText);
      throw new Error("Falha ao comunicar com a inteligência artificial (Gemini).");
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content?.trim() || "{}";
    
    // Tratamento de segurança caso o Gemini ainda tente colocar blocos Markdown ```json
    if (content.startsWith("```json")) {
      content = content.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (content.startsWith("```")) {
      content = content.replace(/^```/, '').replace(/```$/, '').trim();
    }

    // 5. Transformar texto do Gemini em Objeto TypeScript
    let materiaParsed;
    try {
      materiaParsed = JSON.parse(content);
    } catch (e) {
      console.error("Falha ao tentar converter a resposta da IA para JSON:", content);
      throw new Error("A Inteligência Artificial retornou um formato inválido. Tente novamente.");
    }

    // 6. Inserir a nova matéria no banco de dados Supabase (ignorando o RLS com Service Role)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Evitar slugs duplicados adicionando um timestamp se necessário, ou confiando no try/catch do insert
    const { data: insertedData, error: dbError } = await supabase
      .from('materias_geradas')
      .insert({
        nome: materiaParsed.nome,
        slug: materiaParsed.slug,
        emoji: materiaParsed.emoji,
        descricao: materiaParsed.descricao,
        ementa: materiaParsed.ementa,
      })
      .select()
      .single(); // Para retornar apenas o objeto recém-criado

    if (dbError) {
      console.error("Erro ao inserir no Supabase:", dbError);
      
      // Se for erro de slug único duplicado
      if (dbError.code === '23505') {
        throw new Error("Uma matéria com esse slug/nome já foi gerada.");
      }

      throw new Error("Falha ao salvar a matéria gerada no banco de dados.");
    }

    // 7. Devolver a matéria criada para o Frontend
    return new Response(JSON.stringify({ success: true, data: insertedData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Erro na Edge Function criar-materia:", error);
    
    // Retornamos 500 ou 400 dependendo do erro, mas para simplificar, usaremos 400 para erros da regra de negócio
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400, 
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
