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

// Restore ID 240
fetch(env.VITE_SUPABASE_URL + '/rest/v1/sessoes?id=eq.240', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY
  },
  body: JSON.stringify({ topico: 'Viagens e Experiências como Capital Social' })
}).then(() => console.log('Restaurado ID 240')).catch(console.error);

// Buscando todas as sessões para procurar a de IA
fetch(env.VITE_SUPABASE_URL + '/rest/v1/sessoes?select=id,topico,materia', {
  headers: {
    apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY
  }
}).then(r => r.json()).then(d => {
  fs.writeFileSync('all_sessoes.json', JSON.stringify(d, null, 2));
  console.log('Salvo em all_sessoes.json');
}).catch(console.error);
