---
trigger: always_on
---

# Regras do Agente — Escola Tiago

Estas regras são obrigatórias para qualquer implementação de feature neste projeto.
O agente deve consultá-las antes de qualquer decisão de arquitetura ou design.

---

## Regra 1 — Hierarquia de Categorias (3 Níveis)

Matérias com múltiplas sub-áreas **DEVEM** usar estrutura hierárquica de 3 níveis:

```
Nível 1: Categoria principal  → /categoria/:slug
         (ex: Música, Programação, Idiomas)

Nível 2: Sub-área             → /categoria/:slug/:sub
         (ex: Violão, React, Espanhol)

Nível 3: Sessão de estudo     → /sessao/:slug?sub=:subtopico
         (ex: Acordes Básicos, Hooks, Gramática B1)
```

### Quando usar hierarquia
- Matéria com **mais de 3 sub-áreas distintas** → obrigatório usar 3 níveis
- Matéria simples (sem ramificações) → vai direto para sessão (sem categoria)

### Regra de navegação
- O usuário **nunca** vê todos os níveis ao mesmo tempo
- Cada tela mostra exatamente **1 nível** de profundidade
- Sempre existe um **breadcrumb** simples para voltar: `← Música / Violão`

### Implementação no código
- `MateriaConfig` usa `isCategory: true` e `children: MateriaConfig[]` para categorias
- Cards com `isCategory: true` navegam para `/categoria/:slug` (não abrem modal)
- Cards folha (sem filhos) abrem o modal normal de sessão

---

## Regra 2 — Fricção Zero (Princípio Steve Jobs)

> "Se você pode esconder, esconde. Só mostre o que é absolutamente necessário naquele momento."

### O que fazer
- Cada tela deve ter **no máximo 1 ação principal** em destaque
- Features avançadas são descobertas progressivamente — nunca despejadas
- Dúvida entre mostrar ou esconder → **ESCONDE**

### O que NUNCA fazer
- Exibir dados técnicos internos ao usuário (níveis numéricos, pontuação, decisões da IA)
- Criar menus com mais de 2 opções na mesma tela
- Mostrar loading states desnecessários em operações < 300ms
- Usar badges ou tags para informação que o usuário não pediu

### Exemplos práticos
| ❌ Errado | ✅ Correto |
|---|---|
| Badge "Sementes Plantadas" | Ocultar o sistema de nível |
| Botão "Estudar" + Botão "Revisar" | Apenas "Começar Sessão" |
| Exibir `observacoes` da IA | Dado interno — nunca visível |
| "Retomar Bate-papo" no modal | Fluxo simplificado: sempre nova sessão |

---

## Regra 3 — Design System (Consistência Absoluta)

### Cores
- **NUNCA** hardcodar cores: ~~`#333`~~, ~~`text-gray-500`~~, ~~`color: red`~~
- **SEMPRE** usar variáveis semânticas do Shadcn/ui:
  - `--foreground`, `--muted-foreground`
  - `--background`, `--muted`
  - `--border`, `--ring`, `--card`

### Animações
- Micro-animações **apenas** quando têm função:
  - ✅ Feedback de clique (active:scale-95)
  - ✅ Indicador de carregamento (animate-spin)
  - ✅ Sinal de conclusão (animate-pulse quando sessão termina)
  - ❌ Animações decorativas que atrasam a interação

### Componentes
- Priorizar componentes já existentes no Shadcn/ui
- Não criar componentes novos para coisas que o Shadcn já resolve
- Tipografia: sempre herdar da classe base, nunca definir `font-family` inline

---

## Regra 4 — Estado e Dados

- **React Query para tudo** que vem do Supabase — proibido `useState` para dados remotos
- Após salvar sessão → invalidar `['sessoes']` e `['chat-sessions', slug]`
- Snapshots de conversa salvos em `sessoes.messages_json` (JSONB) — não em tabela separada
- Nada de dados sensíveis em `localStorage`

---

## Regra 5 — IA e Sessões

- A IA ensina **exatamente 1 micro-tópico** por sessão
- Quando o tópico conclui, a IA emite `<session_done/>` — o frontend detecta e muda a UI
- A tag `<session_done/>` nunca é exibida ao usuário
- O botão "Encerrar" ganha indicador visual (anel pulsante verde) após `<session_done/>`
- Se o usuário tentar encerrar antes do sinal: dialog de confirmação (nunca bloquear completamente)


OBS ESSA REGRA NÃO DEVE SER SEGUIDA COMO DOGMA E PODE SER IGNORADA QUANDO CRITICAMENTE NECESSARIO E ABRIR MÃO DO PRINCIPIO FOR MELHOR PARA EVOLUÇÃO DO PROJETO!
