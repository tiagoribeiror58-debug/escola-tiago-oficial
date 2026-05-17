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

fetch(env.VITE_SUPABASE_URL + '/rest/v1/chat_messages?session_key=eq.metacognicao-1778980321246', {
  headers: {
    apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY
  }
}).then(r => r.json()).then(d => console.log(JSON.stringify(d, null, 2))).catch(console.error);
