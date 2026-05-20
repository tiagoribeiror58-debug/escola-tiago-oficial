import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '.env') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

async function check() {
  console.log("Verificando sessoes apagadas/existentes para 'comportamento-masculino'...");
  
  // Buscar sessoes
  const { data: sessoes, error: errSessoes } = await supabase
    .from('sessoes')
    .select('id, topico, created_at, session_key, messages_json')
    .eq('materia', 'comportamento-masculino-alita');
    
  if (errSessoes) {
    console.error("Erro sessoes:", errSessoes);
    return;
  }
  
  console.log(`\nEncontradas ${sessoes.length} sessões na tabela 'sessoes':`);
  console.log(sessoes.map(s => `${s.id} - ${s.topico} (Key: ${s.session_key}) [History: ${s.messages_json ? s.messages_json.length + ' msgs' : 'VAZIO'}]`).join('\n'));

  // Buscar chat_messages para essas sessões (se houver)
  for (const s of sessoes) {
    if (s.session_key) {
      const { count } = await supabase
        .from('chat_messages')
        .select('*', { count: 'exact', head: true })
        .eq('session_key', s.session_key);
        
      console.log(`Sessão ${s.id} tem ${count || 0} mensagens não salvas na tabela 'chat_messages'`);
    }
  }
}

check().catch(console.error);
