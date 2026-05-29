create table public.study_notes (
    id uuid default gen_random_uuid() primary key,
    materia_slug text not null,
    topico text not null,
    user_reflection text not null,
    ai_complement text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS (Row Level Security)
alter table public.study_notes enable row level security;

-- Política de acesso público para testes locais (ou ajustar conforme o modelo de auth)
create policy "Enable all access for all users" on public.study_notes
    for all
    using (true)
    with check (true);
