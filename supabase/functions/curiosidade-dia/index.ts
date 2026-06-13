import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Trata CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const geminiKey = Deno.env.get("DEEPSEEK_API_KEY");
    if (!geminiKey) {
      throw new Error("Missing DEEPSEEK_API_KEY");
    }

    const { materiasAtuais } = await req.json().catch(() => ({ materiasAtuais: [] }));

    const systemPrompt = `Você é um curador educacional criativo de alta performance. 
Sua tarefa é gerar uma CURIOSIDADE do tipo "Você Sabia?" extremamente interessante, surpreendente e educativa.
Pode ser sobre um mecanismo, fato histórico ou conceito incrível, preferencialmente ligada a essas áreas que o usuário estuda: ${materiasAtuais?.join(", ") || 'Ciências, História, Tecnologia, Biologia'}.
Responda APENAS com um objeto JSON válido.
Formato esperado:
{
  "tema": "O tema ou área do conhecimento da curiosidade. Ex: Astrofísica",
  "texto": "O texto da curiosidade, escrito de forma engajadora, direta e fácil de entender. Deve ser um fato muito curioso e não óbvio (cerca de 2 a 3 frases)."
}`;

    const userMessage = "Me conte um 'Você Sabia?' incrível novo agora mesmo. Retorne apenas o JSON.";

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${geminiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        temperature: 0.8, // maior criatividade
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Deepseek error:", errorText);
      throw new Error("Failed to fetch from AI");
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content?.trim() || "{}";
    
    if (content.startsWith("\`\`\`json")) {
      content = content.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
    } else if (content.startsWith("\`\`\`")) {
      content = content.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
    }

    let parsed: any = {};
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse JSON:", content);
      parsed = { 
        tema: "Neurociência",
        texto: "Você sabia que o cérebro humano pode gerar energia elétrica suficiente para acender uma pequena lâmpada de LED? E isso acontece o tempo todo, mesmo quando você está dormindo!"
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in curiosidade-dia:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
