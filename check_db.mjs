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

async function checkAndRemove() {
  console.log("Procurando mensagens com a alucinação...");
  
  // Buscar mensagens
  const { data: msgs, error: errMsgs } = await supabase
    .from('chat_messages')
    .select('id, session_key, content, created_at')
    .like('content', '%preciso corrigir minha própria trajetória%');
    
  if (errMsgs) {
    console.error("Erro msgs:", errMsgs);
    return;
  }
  
  console.log(`\nEncontradas ${msgs.length} mensagens alucinadas:`);
  console.log(msgs);

  // Deletar as mensagens encontradas
  for (const msg of msgs) {
    console.log(`Deletando mensagem ${msg.id}...`);
    const { error: delErr } = await supabase
      .from('chat_messages')
      .delete()
      .eq('id', msg.id);
      
    if (delErr) {
      console.error("Erro ao deletar:", delErr);
    } else {
      console.log("Deletado com sucesso!");
    }
  }
}

checkAndRemove().catch(console.error);
