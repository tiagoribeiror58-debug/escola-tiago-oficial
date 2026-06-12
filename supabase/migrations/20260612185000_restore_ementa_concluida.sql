INSERT INTO public.ementa_concluida (user_id, materia, topico) 
SELECT DISTINCT user_id, materia, topico 
FROM public.sessoes 
WHERE decisao_proxima IS DISTINCT FROM 'Pausada' 
  AND user_id IS NOT NULL 
ON CONFLICT (user_id, materia, topico) DO NOTHING;
