-- Migration: SM-2 Spaced Repetition
-- Adiciona coluna proxima_revisao calculada automaticamente pelo banco
-- baseada na dificuldade da sessão (algoritmo SM-2 simplificado):
--   dificuldade alta  → revisão em 1 dia
--   dificuldade media → revisão em 3 dias
--   dificuldade baixa → revisão em 7 dias

ALTER TABLE public.sessoes
  ADD COLUMN IF NOT EXISTS proxima_revisao date
    GENERATED ALWAYS AS (
      data + CASE
        WHEN dificuldade = 'alta'  THEN 1
        WHEN dificuldade = 'media' THEN 3
        WHEN dificuldade = 'baixa' THEN 7
        ELSE 3
      END
    ) STORED;

-- Índice para o dashboard consultar matérias com revisão pendente
CREATE INDEX IF NOT EXISTS idx_sessoes_proxima_revisao
  ON public.sessoes (materia, proxima_revisao);
