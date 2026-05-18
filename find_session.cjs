const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Searching for 'calibração de conhecimento' in sessoes...");
  const { data: sessoes, error: err1 } = await supabase
    .from('sessoes')
    .select('*')
    .ilike('topico', '%calibra%')
    .order('data', { ascending: false });
    
  if (err1) console.error("Error fetching sessoes:", err1);
  else console.log("Sessoes found:", JSON.stringify(sessoes, null, 2));

  console.log("Searching in chat_messages...");
  const { data: msgs, error: err2 } = await supabase
    .from('chat_messages')
    .select('session_key, content, created_at')
    .ilike('content', '%calibra%')
    .order('created_at', { ascending: false })
    .limit(10);

  if (err2) console.error("Error fetching messages:", err2);
  else console.log("Messages found:", JSON.stringify(msgs, null, 2));
}

run();
