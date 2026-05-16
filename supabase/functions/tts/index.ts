import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, speed = 1.0, voice = "pt-BR-Neural2-B" } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "Missing text" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GOOGLE_TTS_KEY = Deno.env.get("GOOGLE_TTS_KEY");
    if (!GOOGLE_TTS_KEY) {
      throw new Error("GOOGLE_TTS_KEY not configured");
    }

    // Google TTS: limite de 5000 bytes por request
    const truncated = text.length > 4800 ? text.slice(0, 4800) : text;

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text: truncated },
          voice: {
            languageCode: "pt-BR",
            name: voice,
            ssmlGender: "MALE",
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: Math.max(0.25, Math.min(4.0, speed)),
            pitch: -2.0,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[tts] Google API error ${response.status}:`, errText);
      throw new Error(`Google TTS failed: ${response.status}`);
    }

    const data = await response.json();
    return new Response(
      JSON.stringify({ audioContent: data.audioContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("[tts] error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
