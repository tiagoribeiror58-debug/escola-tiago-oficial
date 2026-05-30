-- Limpa qualquer política antiga que possa estar bloqueando (mesmo com nomes iguais)
DROP POLICY IF EXISTS "Permitir leitura anonima topicos_emergentes" ON topicos_emergentes;
DROP POLICY IF EXISTS "Permitir insercao anonima topicos_emergentes" ON topicos_emergentes;
DROP POLICY IF EXISTS "Permitir update anonimo topicos_emergentes" ON topicos_emergentes;
DROP POLICY IF EXISTS "Permitir delete anonimo topicos_emergentes" ON topicos_emergentes;

-- Recria com acesso total para uso público (anon) e autenticado
CREATE POLICY "Permitir leitura anonima topicos_emergentes" ON topicos_emergentes FOR SELECT USING (true);
CREATE POLICY "Permitir insercao anonima topicos_emergentes" ON topicos_emergentes FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update anonimo topicos_emergentes" ON topicos_emergentes FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Permitir delete anonimo topicos_emergentes" ON topicos_emergentes FOR DELETE USING (true);

-- Força o servidor do Supabase (PostgREST) a limpar o cache e ler as novas políticas agora
NOTIFY pgrst, 'reload schema';
