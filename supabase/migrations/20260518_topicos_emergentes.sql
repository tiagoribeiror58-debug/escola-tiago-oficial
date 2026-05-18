-- Currículo Vivo: Tabela de Tópicos Emergentes gerados pela IA em tempo real
-- Execute este SQL no painel do Supabase: Dashboard > SQL Editor > New Query

CREATE TABLE IF NOT EXISTS topicos_emergentes (
  id        BIGSERIAL PRIMARY KEY,
  materia_slug TEXT NOT NULL,
  titulo    TEXT NOT NULL,
  descricao TEXT,
  fonte_url TEXT,
  session_key TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para acelerar a busca por matéria
CREATE INDEX IF NOT EXISTS idx_topicos_emergentes_materia ON topicos_emergentes (materia_slug);
