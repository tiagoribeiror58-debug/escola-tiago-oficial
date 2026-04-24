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
| `dificuldade` | `text` | `'fácil'`, `'médio'`, `'difícil'` |
| `duracao_min` | `int4` | Duração em minutos |
| `observacoes` | `text` | Notas internas da IA (não visível ao usuário) |
| `proximo_topico` | `text` | Sugestão da IA para a próxima sessão |
| `nivel` | `int4` | Nível interno de proficiência (não visível ao usuário) |
| `decisao_proxima` | `text` | `'avançar'` ou `'reforçar'` |
| `proxima_revisao` | `date` | Data calculada por SM-2 para revisão |
| `session_key` | `uuid` | Chave única da sessão de chat (para associar mensagens) |
| `messages_json` | `jsonb` | Snapshot completo da conversa ao encerrar |
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

---

## Migrations

| Arquivo | O que faz |
|---|---|
| `20260416153226_*.sql` | Schema inicial: tabelas `sessoes` e `chat_messages` |
| `20260419170000_add_sm2_proxima_revisao.sql` | Adiciona `proxima_revisao` e `nivel` para SM-2 |
| `20260420180400_sessoes_session_key.sql` | Adiciona `session_key` em `sessoes` |

> **Nota:** A coluna `messages_json` foi adicionada via migration inline durante o desenvolvimento. Verificar o estado atual em: `supabase/migrations/`.

---

## Algoritmo SM-2 (Espaçamento de Revisão)

Calculado na **Edge Function `/extract`** ao encerrar a sessão:

- `dificuldade: 'fácil'` → próxima revisão em `nivel * 3` dias
- `dificuldade: 'médio'` → próxima revisão em `nivel * 2` dias  
- `dificuldade: 'difícil'` → próxima revisão em `nivel * 1` dias (mínimo 1)

O `nivel` sobe +1 a cada sessão com dificuldade fácil, fica igual no médio, e desce -1 no difícil (mínimo 1).

---

## Row Level Security (RLS)

> **Atenção:** Verificar se RLS está habilitado nas tabelas via Supabase Dashboard. Atualmente o projeto não tem autenticação multi-usuário — está configurado para uso pessoal (single-user).
