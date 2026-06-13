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

    const { materiasAtuais, temaEspecifico, todasMaterias, temasRecentes } = await req.json().catch(() => ({ materiasAtuais: [], temaEspecifico: null, todasMaterias: [], temasRecentes: [] }));

    const isSpecific = !!temaEspecifico;
    const listaParaAleatorio = todasMaterias?.length > 0 ? todasMaterias.join(", ") : 'Tecnologia, Negócios, Psicologia, Filosofia, Marketing, Inteligência Artificial';
    const historicoRecente = temasRecentes?.length > 0 ? `\nAVOID REPEATING these recently shown themes: ${temasRecentes.slice(0, 10).join(", ")}. Generate something DIFFERENT.` : '';
    
    const systemPrompt = isSpecific 
    ? `You are a high-performance creative educational curator. 
Your task is to generate a "Did you know?" (Você Sabia?) curiosity that is extremely interesting, surprising, and educational.
The curiosity MUST BE STRICTLY RELATED TO THIS SPECIFIC SUBJECT: ${temaEspecifico}.
DO NOT generate facts about any other subject.${historicoRecente}
CRITICAL: The output MUST be written entirely in Brazilian Portuguese (pt-BR).
Respond ONLY with a valid JSON object.
Expected format:
{
  "tema": "${temaEspecifico}",
  "texto": "The text of the curiosity in Portuguese, written in an engaging, direct, and easy-to-understand way. It must be a very curious and non-obvious fact (about 2 to 3 sentences)."
}`
    : `You are a high-performance creative educational curator. 
Your task is to generate a "Did you know?" (Você Sabia?) curiosity that is extremely interesting, surprising, and educational.
The curiosity MUST BE STRICTLY RELATED TO ONE OF THESE SPECIFIC SUBJECTS from the user's study app: ${listaParaAleatorio}.
Pick ONE of these subjects randomly and generate a surprising fact about it. DO NOT generate facts about Astrophysics, Marine Biology, Astronomy, Astrology, Cosmology or any subject NOT in the list above.${historicoRecente}
CRITICAL: The output MUST be written entirely in Brazilian Portuguese (pt-BR).
Respond ONLY with a valid JSON object.
Expected format:
{
  "tema": "The theme from the list above in Portuguese. Ex: Neurociência",
  "texto": "The text of the curiosity in Portuguese, written in an engaging, direct, and easy-to-understand way. It must be a very curious and non-obvious fact (about 2 to 3 sentences)."
}`;

    const userMessage = isSpecific
      ? `Tell me an incredible new 'Did you know?' right now about ${temaEspecifico}. It must be a DIFFERENT fact from what was already shown. Remember to translate to Brazilian Portuguese. Return only the JSON.`
      : `Tell me an incredible new 'Did you know?' right now about ONE subject randomly chosen from this list: ${listaParaAleatorio}. Do NOT invent subjects outside this list. It must be a DIFFERENT subject and fact from what was recently shown. Remember to translate to Brazilian Portuguese. Return only the JSON.`;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${geminiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        temperature: 1.1, // maior criatividade e aleatoriedade
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
