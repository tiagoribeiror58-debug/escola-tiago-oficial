# 🏗️ Ybernator — Arquitetura do Sistema

> **Versão:** 2026.06 | **Status:** Definitivo (Backend de IA consolidado em Supabase Edge Functions)

---

## 1. Visão Geral

O Ybernator é uma **plataforma de estudos orientada por IA** para estudantes de medicina/concursos. O aluno interage com uma IA tutora que adapta o conteúdo ao seu ritmo, registra sessões e gera relatórios de progresso.

A arquitetura é dividida em **2 camadas principais integrada por serviços de nuvem:**

```
┌─────────────────────────────────────────────────────────────────┐
│                     CAMADA DE APRESENTAÇÃO                      │
│              React + Vite + React Router + React Query          │
│                  (Hospedagem: Vercel/Netlify)                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
              ┌─────────────┴──────────────┐
              │                            │
              ▼                            ▼
┌─────────────────────────┐   ┌────────────────────────────────────┐
│    CAMADA DE BACKEND    │   │       CAMADA DE DADOS & AUTH       │
│ Supabase Edge Functions │   │       Supabase (PostgreSQL)        │
│ ─────────────────────── │   │  ─────────────────────────────     │
│ • /chat (IA tutora)     │──▶│  • sessoes                         │
│ • /tts (Google TTS)     │   │  • topicos_emergentes              │
│ • /extract (PDF extract)│   │  • ementa_concluida                │
│ • /topic-preview        │   │  • study_notes                     │
│ • /quiz (SM-2 generator)│   │  • quiz_questions                  │
│ • /review_note          │   │  • quiz_results                    │
│                         │   │  • users (auth.users)              │
│ (Deno / TypeScript)     │   │                                    │
│                         │   │  Auth: Supabase Auth (JWT)         │
│                         │   │  RLS: Row Level Security ativo     │
└─────────────────────────┘   └────────────────────────────────────┘
```

---

## 2. Frontend — Estrutura de Páginas e Rotas

| Rota | Componente | Proteção | Descrição |
|---|---|---|---|
| `/auth` | `Auth.tsx` | Pública | Login/Signup com Supabase Auth |
| `/` | `Index.tsx` | ✅ Auth | Dashboard principal com cards de matérias |
| `/sessao/:materia` | `Sessao.tsx` | ✅ Auth | Chat com IA tutora para uma matéria |
| `/historico/:materia` | `Historico.tsx` | ✅ Auth | Histórico de sessões de uma matéria |
| `/categoria/:slug` | `Categoria.tsx` | ✅ Auth | Listagem de matérias por categoria |
| `/biblioteca` | `Biblioteca.tsx` | ✅ Auth | Acervo de materiais e PDFs |
| `/quiz` | `Quiz.tsx` | ✅ Auth | Sistema de questões (SM-2) |
| `/notas` | `Notas.tsx` | ✅ Auth | Notas contextuais (Notion-style) |

### Componentes Chave

| Componente | Responsabilidade |
|---|---|
| `ChatWindow.tsx` | Motor do chat — streaming SSE, chips dinâmicos, TTS, salvamento de sessão |
| `FloatingChatWidget.tsx` | Chat flutuante global (disponível em todas as páginas) |
| `MateriaDetailModal.tsx` | Modal do roadmap de tópicos de uma matéria |
| `MateriaCard.tsx` | Card do dashboard com urgência de estudo |

### Gerenciamento de Estado

- **React Query (`@tanstack/react-query`):** Cache e sincronização de dados remotos (sessões, tópicos, notas).
- **Context API (`FloatingChatContext`):** Estado global do chat flutuante (aberto/fechado, matéria ativa).
- **useState/useRef local:** Estado de UI do chat (streaming, loading, áudio, chips).

---

## 3. Backend — Camada de Inteligência

O backend de IA do Ybernator é totalmente construído sobre **Supabase Edge Functions** executadas em ambiente Deno com TypeScript. Esta arquitetura descentralizada elimina a necessidade de servidores dedicados de backend adicionais e garante baixa latência de execução.

| Função | Endpoint | O que faz |
|---|---|---|
| `chat` | `/functions/v1/chat` | Orquestra a conversa com o LLM (Gemini), extrai tópicos emergentes e atualiza o histórico de sessões. |
| `tts` | `/functions/v1/tts` | Realiza a síntese de voz (Google TTS) para permitir escuta de mensagens. |
| `extract` | `/functions/v1/extract` | Lê arquivos PDFs/URLs fornecidos pelo usuário e extrai tópicos de estudo. |
| `topic-preview` | `/functions/v1/topic-preview` | Gera a prévia inicial e busca links do YouTube correspondentes. |
| `quiz` | `/functions/v1/quiz` | Gera as questões baseadas nas notas de estudo usando os pesos do algoritmo de repetição espaçada SM-2. |
| `review_note` | `/functions/v1/review_note` | Analisa, enriquece e gera insights de fixação sobre as notas de estudo tomadas pelo usuário. |

---

## 4. Banco de Dados — Tabelas Principais

### `sessoes`
Registra cada conversa com a IA tutora.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK → auth.users |
| `materia` | text | Slug da matéria (ex: `anatomia`) |
| `topico` | text | Tópico estudado nesta sessão |
| `session_key` | text | Chave única para retomar o chat |
| `duracao_min` | int | Duração em minutos |
| `decisao_proxima` | text | `Continuar`, `Pausada`, `Concluída` |
| `proximo_topico` | text | Sugestão da IA para próxima sessão |
| `created_at` | timestamptz | Data da sessão |

### `topicos_emergentes`
Tópicos criados pela IA ou pelo aluno durante sessões.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK → auth.users |
| `materia_slug` | text | Slug da matéria |
| `titulo` | text | Nome do tópico emergente |
| `descricao` | text | Breve descrição |
| `session_key` | text | Sessão que originou o tópico |
| `fonte_url` | text | URL de origem (opcional) |

### `ementa_concluida`
Rastreia quais tópicos do roadmap foram marcados como concluídos.

### `study_notes`
Notas contextuais criadas pelo aluno (Notion-style, via seleção de texto).

### `quiz_questions` e `quiz_results`
Questões geradas por IA e resultados do aluno pelo algoritmo SM-2.

---

## 5. Fluxo de Autenticação

```
Usuário acessa qualquer rota protegida
        │
        ▼
ProtectedRoute verifica session Supabase Auth (JWT)
        │
        ├── Sessão válida ──▶ Renderiza a página
        │
        └── Sem sessão ──▶ Redireciona /auth
                                │
                                ▼
                        Auth.tsx (Login/Signup)
                                │
                                ▼
                        Supabase retorna JWT
                                │
                                ▼
                        Redireciona para /
```

---

## 6. Diagrama de Dependências de Variáveis de Ambiente

```
.env.local
├── VITE_SUPABASE_URL              → Cliente Supabase (Conexão e roteamento de Edge Functions)
└── VITE_SUPABASE_PUBLISHABLE_KEY  → Autenticação anônima do frontend (NUNCA a service key no cliente)
```

> ⚠️ O arquivo `.env.local` NUNCA deve ser commitado no Git. Verifique o `.gitignore`.

---

## 7. Stack Tecnológica Completa

| Camada | Tecnologia | Versão |
|---|---|---|
| UI Framework | React | 18 |
| Build | Vite | 5 |
| Roteamento | React Router | 6 |
| Cache de Dados | TanStack React Query | 5 |
| Componentes UI | shadcn/ui + Radix | — |
| Estilização | Tailwind CSS | 3 |
| Ícones | Lucide React | — |
| Banco de Dados | Supabase (PostgreSQL) | — |
| Auth | Supabase Auth | — |
| Backend IA | Supabase Edge Functions (Deno / TypeScript) | Definitivo |
| Deploy | Vercel / Netlify | — |
