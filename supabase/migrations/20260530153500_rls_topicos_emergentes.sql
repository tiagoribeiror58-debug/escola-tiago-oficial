-- Concede permissões básicas para as roles da API pública do Supabase
GRANT ALL ON topicos_emergentes TO anon, authenticated;
GRANT USAGE ON SEQUENCE topicos_emergentes_id_seq TO anon, authenticated;

-- Ativa o RLS (Boas práticas de segurança)
ALTER TABLE topicos_emergentes ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  -- Permite leitura
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Permitir leitura anonima topicos_emergentes' AND tablename = 'topicos_emergentes') THEN
    CREATE POLICY "Permitir leitura anonima topicos_emergentes" ON topicos_emergentes FOR SELECT USING (true);
  END IF;

  -- Permite inserção
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Permitir insercao anonima topicos_emergentes' AND tablename = 'topicos_emergentes') THEN
    CREATE POLICY "Permitir insercao anonima topicos_emergentes" ON topicos_emergentes FOR INSERT WITH CHECK (true);
  END IF;
END $$;
