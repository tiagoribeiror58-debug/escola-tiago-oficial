create table materias_fixadas (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  slug text not null,
  created_at timestamptz default now(),
  unique(user_id, slug)
);

alter table materias_fixadas enable row level security;

create policy "Users can view their own fixed materias"
  on materias_fixadas for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own fixed materias"
  on materias_fixadas for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own fixed materias"
  on materias_fixadas for delete
  using ( auth.uid() = user_id );
