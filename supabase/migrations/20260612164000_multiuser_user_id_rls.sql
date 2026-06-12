-- ============================================================
-- MIGRAÇÃO: Tornar o app multi-usuário
-- Estratégia:
--   1. Adicionar user_id em todas as tabelas que não têm
--   2. Remover policies falsas (allow all)
--   3. Criar policies corretas baseadas em auth.uid()
--   4. Preservar dados existentes atribuindo ao primeiro user logado
--      (ou deixar NULL temporariamente — sem dados críticos ainda)
-- ============================================================

-- ──────────────────────────────────────────────────────────────
-- 1. TABELA: sessoes
-- ──────────────────────────────────────────────────────────────

-- Adiciona coluna user_id (nullable para não quebrar dados existentes)
ALTER TABLE public.sessoes
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Índice para queries rápidas por usuário
CREATE INDEX IF NOT EXISTS idx_sessoes_user_id ON public.sessoes (user_id);

-- Ativa RLS (pode já estar ativa, IF NOT EXISTS é seguro)
ALTER TABLE public.sessoes ENABLE ROW LEVEL SECURITY;

-- Remove policies antigas "allow all" se existirem
DROP POLICY IF EXISTS "Allow all operations on sessoes" ON public.sessoes;
DROP POLICY IF EXISTS "Permitir todas as operações" ON public.sessoes;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.sessoes;

-- Cria policies por user_id
CREATE POLICY "sessoes_select_own"
  ON public.sessoes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "sessoes_insert_own"
  ON public.sessoes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "sessoes_update_own"
  ON public.sessoes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "sessoes_delete_own"
  ON public.sessoes FOR DELETE
  USING (auth.uid() = user_id);


-- ──────────────────────────────────────────────────────────────
-- 2. TABELA: chat_messages
-- ──────────────────────────────────────────────────────────────

ALTER TABLE public.chat_messages
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON public.chat_messages (user_id);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Remove policy falsa existente
DROP POLICY IF EXISTS "Allow all operations on chat_messages" ON public.chat_messages;

CREATE POLICY "chat_messages_select_own"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "chat_messages_insert_own"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "chat_messages_delete_own"
  ON public.chat_messages FOR DELETE
  USING (auth.uid() = user_id);


-- ──────────────────────────────────────────────────────────────
-- 3. TABELA: ementa_concluida
-- ──────────────────────────────────────────────────────────────

-- Adiciona coluna user_id
ALTER TABLE public.ementa_concluida
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- IMPORTANTE: Deleta dados órfãos (sem user_id) antes de criar a PK.
-- Esses dados são do período pré-autenticação e não podem ser atribuídos a nenhum usuário.
DELETE FROM public.ementa_concluida WHERE user_id IS NULL;

-- Remove a PK antiga simples (materia, topico)
ALTER TABLE public.ementa_concluida
  DROP CONSTRAINT IF EXISTS ementa_concluida_pkey;

-- Cria nova PK composta incluindo user_id (agora sem nulls)
ALTER TABLE public.ementa_concluida
  ADD PRIMARY KEY (user_id, materia, topico);

CREATE INDEX IF NOT EXISTS idx_ementa_concluida_user_id ON public.ementa_concluida (user_id);

ALTER TABLE public.ementa_concluida ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable all access for all users" ON public.ementa_concluida;

CREATE POLICY "ementa_concluida_select_own"
  ON public.ementa_concluida FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "ementa_concluida_insert_own"
  ON public.ementa_concluida FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ementa_concluida_delete_own"
  ON public.ementa_concluida FOR DELETE
  USING (auth.uid() = user_id);


-- ──────────────────────────────────────────────────────────────
-- 4. TABELA: topicos_emergentes
-- ──────────────────────────────────────────────────────────────

ALTER TABLE public.topicos_emergentes
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_topicos_emergentes_user_id ON public.topicos_emergentes (user_id);

ALTER TABLE public.topicos_emergentes ENABLE ROW LEVEL SECURITY;

-- Remove policies antigas (das migrations anteriores que tentaram fazer isso)
DROP POLICY IF EXISTS "Allow all operations on topicos_emergentes" ON public.topicos_emergentes;
DROP POLICY IF EXISTS "Authenticated users can view their own topics" ON public.topicos_emergentes;
DROP POLICY IF EXISTS "Authenticated users can insert their own topics" ON public.topicos_emergentes;
DROP POLICY IF EXISTS "Authenticated users can delete their own topics" ON public.topicos_emergentes;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.topicos_emergentes;

CREATE POLICY "topicos_emergentes_select_own"
  ON public.topicos_emergentes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "topicos_emergentes_insert_own"
  ON public.topicos_emergentes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "topicos_emergentes_delete_own"
  ON public.topicos_emergentes FOR DELETE
  USING (auth.uid() = user_id);


-- ──────────────────────────────────────────────────────────────
-- 5. TABELA: study_notes
-- ──────────────────────────────────────────────────────────────

ALTER TABLE public.study_notes
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_study_notes_user_id ON public.study_notes (user_id);

ALTER TABLE public.study_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable all access for all users" ON public.study_notes;

CREATE POLICY "study_notes_select_own"
  ON public.study_notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "study_notes_insert_own"
  ON public.study_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "study_notes_update_own"
  ON public.study_notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "study_notes_delete_own"
  ON public.study_notes FOR DELETE
  USING (auth.uid() = user_id);


-- ──────────────────────────────────────────────────────────────
-- 6. TABELA: materias_geradas
-- ──────────────────────────────────────────────────────────────
-- Matérias geradas por IA devem ser por usuário (cada um tem seu currículo personalizado)

ALTER TABLE public.materias_geradas
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Remover UNIQUE em slug pois agora pode haver o mesmo slug para usuários diferentes
ALTER TABLE public.materias_geradas
  DROP CONSTRAINT IF EXISTS materias_geradas_slug_key;

-- Nova constraint única: mesmo usuário não pode ter dois slugs iguais
CREATE UNIQUE INDEX IF NOT EXISTS idx_materias_geradas_user_slug
  ON public.materias_geradas (user_id, slug);

CREATE INDEX IF NOT EXISTS idx_materias_geradas_user_id ON public.materias_geradas (user_id);

ALTER TABLE public.materias_geradas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura pública" ON public.materias_geradas;
DROP POLICY IF EXISTS "Permitir leitura publica" ON public.materias_geradas;

CREATE POLICY "materias_geradas_select_own"
  ON public.materias_geradas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "materias_geradas_insert_own"
  ON public.materias_geradas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "materias_geradas_update_own"
  ON public.materias_geradas FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "materias_geradas_delete_own"
  ON public.materias_geradas FOR DELETE
  USING (auth.uid() = user_id);
