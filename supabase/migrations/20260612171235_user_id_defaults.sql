-- Define o valor padrão para auth.uid() para todas as tabelas que agora dependem do usuário
ALTER TABLE public.sessoes ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.chat_messages ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.ementa_concluida ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.topicos_emergentes ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.study_notes ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.materias_geradas ALTER COLUMN user_id SET DEFAULT auth.uid();
