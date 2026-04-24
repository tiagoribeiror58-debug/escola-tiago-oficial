# Arquitetura Geral

## Visão Macro

```
[Usuário]
    │
    ▼
[React SPA — Vercel]
    │
    ├── useSessoes / useMateriasEstado  ──► [Supabase DB]
    │
    └── ChatWindow.tsx (streaming)  ──────► [Edge Function /chat]
                                                    │
                                                    └──► [Anthropic / OpenAI API]
                                                    
[Sessao.tsx — ao encerrar]
    │
    ├── snapshot messages_json  ──────────► [Supabase DB: sessoes.messages_json]
    └── DELETE chat_messages  ─────────────► [Supabase DB: chat_messages]
```

---

## Fluxo de uma sessão

```
1. Usuário clica em matéria no Index
       │
       ├── isCategory: true → navega para /categoria/:slug
       └── isCategory: false → abre MateriaDetailModal

2. MateriaDetailModal
       │
       ├── Exibe: tópico anterior, próximo tópico, histórico de sessões
       └── Botão "Começar Sessão" → navega para /sessao/:materia

3. Sessao.tsx monta
       │
       ├── Gera session_key único (UUID)
       ├── Busca última sessão (useUltimaSessao)
       └── Renderiza ChatWindow

4. ChatWindow.tsx
       │
       ├── buildSystemPrompt(materia, ultimaSessao) → prompt completo
       ├── Auto-envia "Inicie a sessão." (trigger silencioso)
       ├── Stream de resposta da IA via SSE
       ├── Detecta <session_done/> → seta topicComplete = true
       └── Detecta <chips>...</chips> → renderiza sugestões clicáveis

5. Usuário encerra sessão
       │
       ├── Dialog de confirmação se topicComplete = false
       ├── Abre formulário de encerramento (EncerramentoForm)
       ├── POST: salva sessão em `sessoes` com messages_json
       ├── DELETE: limpa chat_messages da session_key
       └── Redireciona para / após 1.5s com toast
```

---

## Camadas de estado

| Dado | Onde vive | Por quê |
|---|---|---|
| Lista de sessões | React Query (`['sessoes']`) | Cache remoto, invalidado após salvar |
| Última sessão por matéria | React Query (`['ultima-sessao', slug]`) | Cache independente por matéria |
| Mensagens do chat | `useState` em `ChatWindow` + `messagesRef` | Memória — deletado do DB ao encerrar |
| Snapshot da conversa | `sessoes.messages_json` (JSONB) | Persistência permanente pós-encerramento |
| Estado de topic complete | `useState` em `Sessao.tsx` via callback | Efêmero — só existe durante a sessão |

---

## Princípios arquiteturais

- **Fricção Zero:** Cada tela exibe exatamente 1 profundidade da hierarquia. Nunca mostrar tudo de uma vez.
- **React Query para tudo remoto:** Proibido `useState` para dados do Supabase.
- **Nada sensível em localStorage:** Estado de sessão vive em memória + banco.
- **Tipos centralizados:** Todas as interfaces em `src/types/index.ts`. Proibido duplicar.
