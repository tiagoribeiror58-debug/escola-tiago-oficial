import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string
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
