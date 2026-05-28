# Ybernator — Plataforma de Estudos com IA

Sistema de ensino personalizado com professor de IA, sessões controladas por tópico único, hierarquia de matérias e histórico persistente de conversas.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Estilização | Tailwind CSS + Shadcn/ui |
| Roteamento | React Router v6 |
| Estado remoto | TanStack Query v5 |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage) |
| Edge Functions | Supabase Edge Functions (Deno) |
| IA | Anthropic Claude / OpenAI (via edge function `/chat`) |
| Deploy | Vercel |

---

## Estrutura de pastas

```
escola-tiago-oficial/
├── agents/                  # Regras obrigatórias para o agente de IA (CATEGORIA_RULE.md)
├── docs/                    # Documentação técnica aprofundada
├── src/
│   ├── components/          # Componentes reutilizáveis (ChatWindow, MateriaCard, Modal...)
│   ├── hooks/               # useSessoes, useChatMessages, useMateriasEstado
│   ├── lib/                 # buildPrompt.ts, materias.ts, audioUtils.ts
│   ├── pages/               # Index, Sessao, Historico, Categoria, NotFound
│   └── types/               # index.ts — todas as interfaces centralizadas
├── supabase/
│   ├── functions/
│   │   ├── chat/            # Edge Function: proxy streaming para IA
│   │   └── extract/         # Edge Function: extração de metadados da sessão
│   └── migrations/          # SQL migrations versionadas
├── GEMINI.md                # Diretrizes do projeto para o agente IA
└── vercel.json              # Config de deploy
```

---

## Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | `Index.tsx` | Dashboard — hero card + grid de matérias |
| `/categoria/:slug` | `Categoria.tsx` | Nível 2 da hierarquia (ex: instrumentos dentro de Música) |
| `/categoria/:slug/:sub` | `Categoria.tsx` | Nível 3 (ex: tópicos dentro de Violão) |
| `/sessao/:materia` | `Sessao.tsx` | Sessão de estudo com IA |
| `/historico/:materia` | `Historico.tsx` | Histórico de sessões com bolhas de chat |

---

## Setup local

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.example .env
# Preencher VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY

# 3. Rodar em desenvolvimento
npm run dev

# 4. Build de produção
npm run build
```

---

## Variáveis de ambiente obrigatórias

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

---

## Comandos úteis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run test         # Testes unitários (Vitest)
npm run test:watch   # Testes em modo watch
npm run lint         # ESLint
```

---

## Docs

- [Arquitetura Geral](./docs/architecture.md)
- [Banco de Dados](./docs/database.md)
- [Edge Functions](./docs/edge-functions.md)
- [Sistema de Matérias](./docs/materias.md)
- [Protocolo da IA](./docs/ai-protocol.md)
