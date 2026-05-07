# Banco de Dados

Projeto usa Supabase (PostgreSQL). Todas as mudanças de schema são versionadas em `supabase/migrations/`.

---

## Tabelas

### `sessoes`

Tabela principal. Cada linha representa uma sessão de estudo encerrada.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `bigint` PK | Auto-incremento |
| `materia` | `text` | Slug da matéria (ex: `violao-acordes`) |
| `topico` | `text` | Tópico ensinado nesta sessão |
| `data` | `date` | Data da sessão |
| `erros` | `int4` | Número de erros cometidos |
| `dificuldade` | `text` | `'baixa'`, `'media'`, `'alta'` (extraído pela edge function `/extract`) |
| `duracao_min` | `int4` | Duração em minutos |
| `observacoes` | `text` | Notas internas da IA (não visível ao usuário) |
| `proximo_topico` | `text` | Sugestão da IA para a próxima sessão |
| `nivel` | `int4` | Nível interno de proficiência (não visível ao usuário) |
| `decisao_proxima` | `text` | `'avançar'` ou `'reforçar'` |
| `proxima_revisao` | `date` | Data calculada por SM-2 para revisão |
| `session_key` | `uuid` | Chave única da sessão de chat (para associar mensagens) |
| `messages_json` | `jsonb` | Snapshot completo da conversa ao encerrar |
| `is_mastery` | `boolean` | `true` se a sessão foi um Desafio de Maestria (padrão: `false`) |
| `created_at` | `timestamptz` | Timestamp automático |

### `chat_messages`

Tabela temporária. Armazena mensagens durante uma sessão ativa. **Deletada ao encerrar.**

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `bigint` PK | Auto-incremento |
| `session_key` | `uuid` | FK para identificar a sessão |
| `sessao_materia` | `text` | Slug da matéria |
| `role` | `text` | `'user'` ou `'assistant'` |
| `content` | `text` | Conteúdo da mensagem |
| `created_at` | `timestamptz` | Timestamp automático |

### `ementa_concluida`

Rastreia quais tópicos da ementa de cada matéria já foram cobertos em sessões.

| Coluna | Tipo | Descrição |
|---|---|---|
| `materia` | `text` PK | Slug da matéria |
| `topico` | `text` PK | Tópico concluído (chave composta com `materia`) |
| `created_at` | `timestamptz` | Timestamp automático |

---

## Migrations

| Arquivo | O que faz |
|---|---|
| `20260416153226_*.sql` | Schema inicial: tabelas `sessoes` e `chat_messages` |
| `20260419170000_add_sm2_proxima_revisao.sql` | Adiciona `proxima_revisao`, `nivel` e `messages_json` para SM-2 |
| `20260420180400_sessoes_session_key.sql` | Adiciona `session_key` em `sessoes` |
| `20260426133402_add_ementa_concluida.sql` | Cria tabela `ementa_concluida` para rastrear tópicos cobertos |

---

## Algoritmo SM-2 (Espaçamento de Revisão)

Calculado na **Edge Function `/extract`** ao encerrar a sessão:

- `dificuldade: 'baixa'` → próxima revisão em `nivel * 3` dias
- `dificuldade: 'media'` → próxima revisão em `nivel * 2` dias  
- `dificuldade: 'alta'` → próxima revisão em `nivel * 1` dias (mínimo 1)

O `nivel` sobe +1 a cada sessão com dificuldade baixa, fica igual no media, e desce -1 no alta (mínimo 1).

---

## Row Level Security (RLS)

> **Atenção:** Verificar se RLS está habilitado nas tabelas via Supabase Dashboard. Atualmente o projeto não tem autenticação multi-usuário — está configurado para uso pessoal (single-user).
