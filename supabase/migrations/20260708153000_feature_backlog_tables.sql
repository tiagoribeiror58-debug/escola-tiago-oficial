-- ============================================================
-- FEAT-6  Q-SQ3R: tabela de cache para perguntas de warmup
-- FEAT-8  Resumos em Blocos: coluna key_concepts em ai_content_cache
-- ============================================================

-- 1. Criar tabela topico_warmup_cache
CREATE TABLE IF NOT EXISTS public.topico_warmup_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topico TEXT NOT NULL,
    materia_slug TEXT NOT NULL,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    mermaid_diagram TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, materia_slug, topico)
);

-- Habilitar RLS
ALTER TABLE public.topico_warmup_cache ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
CREATE POLICY "Usuários podem ver seus próprios warmups"
    ON public.topico_warmup_cache FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios warmups"
    ON public.topico_warmup_cache FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios warmups"
    ON public.topico_warmup_cache FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios warmups"
    ON public.topico_warmup_cache FOR DELETE
    USING (auth.uid() = user_id);

-- 2. Adicionar coluna key_concepts à tabela ai_content_cache
ALTER TABLE public.ai_content_cache ADD COLUMN IF NOT EXISTS key_concepts JSONB;
