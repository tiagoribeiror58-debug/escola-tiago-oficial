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

    const { materiasAtuais, temaEspecifico, todasMaterias, temasRecentes, count = 1 } = await req.json().catch(() => ({ materiasAtuais: [], temaEspecifico: null, todasMaterias: [], temasRecentes: [], count: 1 }));

    const isSpecific = !!temaEspecifico;
    const isBatch = count > 1;
    const listaParaAleatorio = todasMaterias?.length > 0 ? todasMaterias.join(", ") : 'Tecnologia, Negócios, Psicologia, Filosofia, Marketing, Inteligência Artificial, História, Economia, Neurociência, Biologia, Física';
    const historicoRecente = temasRecentes?.length > 0 ? `\nAVOID REPEATING these recently shown themes: ${temasRecentes.slice(0, 10).join(", ")}. Generate something DIFFERENT.` : '';
    
    const antiCliche = `\nCRITICAL ANTI-CLICHE RULE: DO NOT use famous, basic, pop-science or cliché curiosities. You are strictly forbidden from generating the most obvious facts about any given subject. Provide ONLY extremely obscure, advanced, niche, or lesser-known facts that even an expert might not know.`;

    const expectedFormat = isBatch
      ? `{\n  "curiosidades": [\n    {\n      "tema": "${isSpecific ? temaEspecifico : "Theme 1"}",\n      "texto": "Curiosity 1..."\n    },\n    {\n      "tema": "${isSpecific ? temaEspecifico : "Theme 2"}",\n      "texto": "Curiosity 2..."\n    }\n  ]\n}`
      : `{\n  "tema": "${isSpecific ? temaEspecifico : "Theme"}",\n  "texto": "The text..."\n}`;

    const systemPrompt = isSpecific 
    ? `You are a high-performance creative educational curator. 
Your task is to generate ${count} "Did you know?" (Você Sabia?) curiosit${count > 1 ? 'ies' : 'y'} that ${count > 1 ? 'are' : 'is'} extremely interesting, surprising, and educational.
The curiosit${count > 1 ? 'ies' : 'y'} MUST BE STRICTLY RELATED TO THIS SPECIFIC SUBJECT: ${temaEspecifico}.
DO NOT generate facts about any other subject.${historicoRecente}${antiCliche}
CRITICAL FORMATTING RULE: The "texto" field MUST NOT be a single massive block of text. You MUST separate ideas into paragraphs using explicit double newlines (\\n\\n) for readability.
CRITICAL: The output MUST be written entirely in Brazilian Portuguese (pt-BR).
Respond ONLY with a valid JSON object${isBatch ? ', with the curiosities inside a "curiosidades" array' : ''}.
Expected format:\n${expectedFormat}`
    : `You are a high-performance creative educational curator. 
Your task is to generate ${count} "Did you know?" (Você Sabia?) curiosit${count > 1 ? 'ies' : 'y'} that ${count > 1 ? 'are' : 'is'} extremely interesting, surprising, and educational.
The curiosit${count > 1 ? 'ies' : 'y'} MUST BE STRICTLY RELATED TO ONE OF THESE SPECIFIC SUBJECTS from the user's study app: ${listaParaAleatorio}.
Pick ${count > 1 ? count + ' DIFFERENT SUBJECTS' : 'ONE subject'} randomly from the list. DO NOT generate facts about Astrophysics, Marine Biology, Astronomy, Astrology, Cosmology or any subject NOT in the list above.${historicoRecente}${antiCliche}
CRITICAL FORMATTING RULE: The "texto" field MUST NOT be a single massive block of text. You MUST separate ideas into paragraphs using explicit double newlines (\\n\\n) for readability.
CRITICAL RULES:
1. The output MUST be written entirely in Brazilian Portuguese (pt-BR).
${count > 1 ? '2. EACH ITEM IN THE "curiosidades" ARRAY MUST BE FROM A COMPLETELY DIFFERENT SUBJECT. NEVER REPEAT THE SAME SUBJECT TWICE. EXTREMELY IMPORTANT!' : ''}
Respond ONLY with a valid JSON object${isBatch ? ', with the curiosities inside a "curiosidades" array' : ''}. You MUST generate exactly ${count} item${count > 1 ? 's' : ''}, never fewer.
Expected format:\n${expectedFormat}`;

    const userMessage = isSpecific
      ? `Tell me ${count} incredible new 'Did you know?' right now about ${temaEspecifico}. ${count > 1 ? 'They' : 'It'} must be DIFFERENT from what was already shown. Remember to translate to Brazilian Portuguese. Return only the JSON.`
      : `Tell me ${count} incredible new 'Did you know?' right now about subjects randomly chosen from this list: ${listaParaAleatorio}. Do NOT invent subjects outside this list. Must be DIFFERENT from what was recently shown. Remember to translate to Brazilian Portuguese. Return only the JSON.`;

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
      if (isBatch) {
        parsed = Array.isArray(parsed) ? parsed : (parsed.curiosidades || []);
      }
    } catch (e) {
      console.error("Failed to parse JSON:", content);
      const defaultFallback = {
        tema: "Neurociência",
        texto: "Você sabia que o cérebro humano pode gerar energia elétrica suficiente para acender uma pequena lâmpada de LED? E isso acontece o tempo todo, mesmo quando você está dormindo!"
      };
      parsed = isBatch ? [defaultFallback] : defaultFallback;
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
