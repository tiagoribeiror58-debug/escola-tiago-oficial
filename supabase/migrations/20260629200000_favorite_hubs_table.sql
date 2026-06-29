CREATE TABLE public.favorite_hubs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  hub_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, hub_name)
);

ALTER TABLE public.favorite_hubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorite hubs"
  ON public.favorite_hubs FOR SELECT
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can insert their own favorite hubs"
  ON public.favorite_hubs FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can delete their own favorite hubs"
  ON public.favorite_hubs FOR DELETE
  USING ( auth.uid() = user_id );
