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

fetch(env.VITE_SUPABASE_URL + '/rest/v1/sessoes?id=eq.240', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY
  },
  body: JSON.stringify({
    topico: 'IA como Parceira de Estudo: Usando LLMs para Aprender Melhor'
  })
}).then(r => {
  console.log(r.status, r.statusText);
  return r.text();
}).then(console.log).catch(console.error);
