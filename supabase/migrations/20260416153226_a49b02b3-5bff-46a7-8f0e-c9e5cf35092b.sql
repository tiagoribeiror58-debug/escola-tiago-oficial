
CREATE TABLE public.chat_messages (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sessao_materia text NOT NULL,
  session_key text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_chat_messages_session ON public.chat_messages (session_key, created_at);
CREATE INDEX idx_chat_messages_materia ON public.chat_messages (sessao_materia, created_at DESC);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on chat_messages"
ON public.chat_messages
FOR ALL
TO public
USING (true)
WITH CHECK (true);
