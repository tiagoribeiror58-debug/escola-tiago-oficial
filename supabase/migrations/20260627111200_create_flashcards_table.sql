create table if not exists public.flashcards (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null default auth.uid(),
    materia_slug text not null,
    topico text,
    front text not null,
    back text not null,
    interval real default 0,
    ease_factor real default 2.5,
    next_review_date timestamp with time zone default now(),
    created_at timestamp with time zone default now()
);

-- Habilitar RLS
alter table public.flashcards enable row level security;

-- Política de RLS: o usuário só vê os seus flashcards
create policy "Users can view their own flashcards"
    on public.flashcards for select
    using (auth.uid() = user_id);

create policy "Users can insert their own flashcards"
    on public.flashcards for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own flashcards"
    on public.flashcards for update
    using (auth.uid() = user_id);

create policy "Users can delete their own flashcards"
    on public.flashcards for delete
    using (auth.uid() = user_id);
