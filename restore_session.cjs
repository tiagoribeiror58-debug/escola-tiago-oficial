const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Restaurando a sessão 'Calibração de Conhecimento'...");
  const sessionKey = "metacognicao-1778686460995";
  const { data, error } = await supabase.from('sessoes').insert({
    session_key: sessionKey,
    materia: 'metacognicao',
    topico: 'Calibração de Conhecimento',
    data: new Date().toISOString().split('T')[0],
    erros: 0,
    dificuldade: 'media',
    nivel: 1,
    duracao_min: 1,
    messages_json: []
  });
  
  if (error) {
    if (error.code === '23505') {
       console.log("A sessão já estava parcialmente salva (duplicada).");
    } else {
       console.error("Erro ao inserir:", error);
    }
  } else {
    console.log("Sessão resgatada com sucesso! Vai aparecer na UI como Pausada.");
  }
}
run();
