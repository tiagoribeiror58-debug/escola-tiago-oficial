create table ementa_concluida (
  materia text not null,
  topico text not null,
  created_at timestamptz default now(),
  primary key (materia, topico)
);
