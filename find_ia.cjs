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

fetch(env.VITE_SUPABASE_URL + '/rest/v1/chat_messages?content=ilike.*IA*&select=session_key,content', {
  headers: {
    apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY
  }
}).then(r => r.json()).then(d => {
  const keys = [...new Set(d.map(x => x.session_key))];
  console.log("Sessões com IA no chat:", keys);
}).catch(console.error);
