-- Criar tabela ai_content_cache
CREATE TABLE public.ai_content_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    materia_slug TEXT NOT NULL,
    topico TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('resumo', 'curiosidade')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Constraint para evitar duplicação do mesmo tópico pelo mesmo usuário
    UNIQUE(user_id, materia_slug, topico, tipo)
);

-- Habilitar RLS
ALTER TABLE public.ai_content_cache ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
CREATE POLICY "Usuários podem ver seus próprios caches"
    ON public.ai_content_cache FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios caches"
    ON public.ai_content_cache FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios caches"
    ON public.ai_content_cache FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios caches"
    ON public.ai_content_cache FOR DELETE
    USING (auth.uid() = user_id);
