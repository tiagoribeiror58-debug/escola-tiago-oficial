const fs = require('fs');
const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const i = line.indexOf('=');
  if (i > 0) {
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    if (v.startsWith("'") && v.endsWith("'")) v = v.slice(1, -1);
    env[k] = v;
  }
});

fetch(env.VITE_SUPABASE_URL + '/rest/v1/sessoes?materia=eq.metacognicao&order=created_at.desc&limit=5', {
  headers: {
    apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY
  }
}).then(r => r.json()).then(async sessoes => {
  for (const s of sessoes) {
    if (!s.session_key) continue;
    const res = await fetch(env.VITE_SUPABASE_URL + '/rest/v1/chat_messages?session_key=eq.' + s.session_key + '&limit=1', {
      headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY }
    });
    const msgs = await res.json();
    console.log("Sessao ID:", s.id, "Topico:", s.topico, "Msg count:", msgs.length, "First msg:", msgs.length > 0 ? msgs[0].content.substring(0, 50) : "none");
  }
}).catch(console.error);
