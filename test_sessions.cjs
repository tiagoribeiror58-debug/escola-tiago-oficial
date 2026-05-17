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

fetch(env.VITE_SUPABASE_URL + '/rest/v1/sessoes?select=id,topico,session_key,messages_json&order=id.desc&limit=20', {
  headers: {
    apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY
  }
}).then(r => r.json()).then(data => {
  for (const s of data) {
    const isArray = Array.isArray(s.messages_json);
    const length = isArray ? s.messages_json.length : (s.messages_json ? 'not array' : 'null');
    console.log(`ID: ${s.id} | Topico: ${s.topico} | Key: ${s.session_key} | Msgs: ${length}`);
  }
}).catch(console.error);
