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

fetch(env.VITE_SUPABASE_URL + '/rest/v1/sessoes?select=id,topico,created_at,materia,session_key,duracao_min&materia=eq.metacognicao&order=created_at.desc&limit=15', {
  headers: {
    apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY
  }
}).then(r => r.json()).then(d => {
  console.log(JSON.stringify(d, null, 2));
}).catch(console.error);
