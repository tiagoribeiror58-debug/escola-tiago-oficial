-- Backfill: vincula todos os dados existentes (user_id = NULL) ao usuário dono do sistema
-- Email: tiagoribeiror58@gmail.com
-- UUID: ba10b3a5-82ae-485b-969d-0bd0a9adf8d2

DO $$
DECLARE
  tiago_id UUID := 'ba10b3a5-82ae-485b-969d-0bd0a9adf8d2';
BEGIN
  -- Sessões de estudo
  UPDATE public.sessoes
  SET user_id = tiago_id
  WHERE user_id IS NULL;

  -- Mensagens do chat
  UPDATE public.chat_messages
  SET user_id = tiago_id
  WHERE user_id IS NULL;

  -- Progresso da ementa (tópicos concluídos)
  UPDATE public.ementa_concluida
  SET user_id = tiago_id
  WHERE user_id IS NULL;

  -- Tópicos emergentes descobertos pela IA
  UPDATE public.topicos_emergentes
  SET user_id = tiago_id
  WHERE user_id IS NULL;

  -- Notas de estudo
  UPDATE public.study_notes
  SET user_id = tiago_id
  WHERE user_id IS NULL;

  -- Matérias geradas pela IA
  UPDATE public.materias_geradas
  SET user_id = tiago_id
  WHERE user_id IS NULL;

  RAISE NOTICE 'Backfill concluído! Todos os dados foram vinculados ao usuário: %', tiago_id;
END $$;
