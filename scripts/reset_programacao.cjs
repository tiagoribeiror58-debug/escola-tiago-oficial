const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...value] = line.split('=');
    if (key && value.length > 0) {
      env[key.trim()] = value.join('=').trim().replace(/(^"|"$)/g, '');
    }
  }
});

const supabase = createClient(
  env['VITE_SUPABASE_URL'],
  env['VITE_SUPABASE_PUBLISHABLE_KEY']
);

async function run() {
  const materiaSlug = 'programacao';
  
  console.log(`Buscando sessoes para a materia: ${materiaSlug}`);
  
  const { data: sessoes, error } = await supabase
    .from('sessoes')
    .select('id, session_key')
    .eq('materia', materiaSlug);

  if (error) {
    console.error('Erro buscando sessoes:', error);
    return;
  }

  if (sessoes && sessoes.length > 0) {
    const ids = sessoes.map(s => s.id);
    const keys = sessoes.map(s => s.session_key).filter(k => k);

    if (keys.length > 0) {
      console.log(`Apagando ${keys.length} historicos de chat_messages...`);
      const { error: msgError } = await supabase
        .from('chat_messages')
        .delete()
        .in('session_id', keys);
      console.log('Mensagens apagadas:', msgError ? msgError : 'OK');
    }

    console.log(`Apagando ${ids.length} sessoes...`);
    const { error: delError } = await supabase
      .from('sessoes')
      .delete()
      .in('id', ids);
    console.log('Sessoes apagadas:', delError ? delError : 'OK');
  } else {
    console.log('Nenhuma sessao encontrada.');
  }

  console.log('Apagando status de conclusao (ementa_concluida)...');
  const { error: ementaError } = await supabase
    .from('ementa_concluida')
    .delete()
    .eq('materia', materiaSlug);
  
  console.log('Ementa apagada:', ementaError ? ementaError : 'OK');
  
  console.log('Reset finalizado com sucesso!');
}

run();
