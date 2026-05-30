CREATE TABLE materias_geradas (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  emoji TEXT,
  descricao TEXT,
  ementa JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS) para evitar que o frontend seja bloqueado sem a chave Service Role
ALTER TABLE materias_geradas ENABLE ROW LEVEL SECURITY;

-- Criar política permitindo a leitura pública para o frontend
-- Caso você queira restringir apenas para usuários logados, podemos alterar para (auth.uid() IS NOT NULL)
CREATE POLICY "Permitir leitura pública" 
  ON materias_geradas 
  FOR SELECT 
  USING (true);
