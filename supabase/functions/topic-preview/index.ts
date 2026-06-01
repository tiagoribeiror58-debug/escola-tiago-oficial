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
    const { materiaName, topicName, descricaoMateria } = await req.json();

    if (!materiaName || !topicName) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const geminiKey = Deno.env.get("DEEPSEEK_API_KEY");
    if (!geminiKey) {
      throw new Error("Missing DEEPSEEK_API_KEY");
    }

    const systemPrompt = `Você é um curador educacional de alta performance. 
Sua tarefa é ler a matéria e o tópico que o aluno selecionou e retornar um JSON estritamente formatado com materiais complementares.
Responda APENAS com um objeto JSON válido.
Formato esperado:
{
  "preview": "Uma frase curta (máx 15 palavras) ultra-pragmática descrevendo o que será aprendido",
  "youtube_queries": ["Termo de busca exato para o YouTube (ex: Como funciona X)"],
  "reading_links": [
    {
      "title": "Título legível para leitura (ex: Artigo na Wikipedia sobre X)",
      "url": "URL completa e real (ex: https://pt.wikipedia.org/wiki/X)"
    }
  ]
}
Atenção: em youtube_queries gere apenas 1 string ideal. em reading_links gere 1 a 2 links.

Contexto da matéria: ${materiaName} - ${descricaoMateria || ''}`;

    const userMessage = `Tópico a ser estudado: "${topicName}"\nRetorne o JSON.`;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${geminiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.5,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini error:", errorText);
      throw new Error("Failed to fetch from Gemini");
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content?.trim() || "{}";
    
    // Remove possible markdown formatting from Gemini
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
      parsed = { preview: "Iniciar sessão de estudos para este tópico." };
    }

    // Try to fetch YouTube data if YOUTUBE_API_KEY is available
    const youtubeKey = Deno.env.get("YOUTUBE_API_KEY");
    let youtube_videos: any[] = [];
    
    if (youtubeKey && parsed.youtube_queries && parsed.youtube_queries.length > 0) {
      try {
        const query = parsed.youtube_queries[0];
        const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${youtubeKey}`);
        if (ytRes.ok) {
          const ytData = await ytRes.json();
          if (ytData.items && ytData.items.length > 0) {
            const item = ytData.items[0];
            youtube_videos.push({
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
              url: `https://www.youtube.com/watch?v=${item.id.videoId}`
            });
          }
        } else {
          console.error("YouTube API response not OK:", await ytRes.text());
        }
      } catch (err) {
        console.error("YouTube fetch error:", err);
      }
    }

    const finalPayload = {
      preview: parsed.preview || "Iniciar sessão de estudos para este tópico.",
      youtube_queries: parsed.youtube_queries || [],
      youtube_videos: youtube_videos,
      reading_links: parsed.reading_links || []
    };

    return new Response(JSON.stringify(finalPayload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in topic-preview:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
