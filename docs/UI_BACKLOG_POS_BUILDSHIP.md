# 🖥️ UI Backlog — O que fazer no Antigravity após o BuildShip estar pronto

> **Quando usar este arquivo:** Após o BuildShip ter os 3 workflows deployados (`/chat`, `/tts`, `/extract`) e testados via Postman.
> **Ordem recomendada:** Execute as tarefas de cima para baixo. As primeiras desbloqueiam as seguintes.

---

## FASE 0 — Virar a Chave (Conexão com BuildShip)

> Estas são as únicas alterações **obrigatórias** para que o app passe a usar o novo backend.

### ✅ TASK-01: Variáveis de ambiente no `.env.local`
**Arquivo:** `.env.local` (raiz do projeto)

Adicionar as novas variáveis:
```
VITE_BUILDSHIP_CHAT_URL=https://SEU_PROJETO.buildship.run/chat
VITE_BUILDSHIP_TTS_URL=https://SEU_PROJETO.buildship.run/tts
VITE_BUILDSHIP_EXTRACT_URL=https://SEU_PROJETO.buildship.run/extract
VITE_BUILDSHIP_SECRET=um_token_secreto_qualquer
```
> ⚠️ Depois, configurar essas mesmas variáveis no painel do Vercel/Netlify (deploy de produção).

---

### ✅ TASK-02: Trocar a URL do Chat
**Arquivo:** `src/components/ChatWindow.tsx` (linha ~38)

```diff
- const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
+ const CHAT_URL = import.meta.env.VITE_BUILDSHIP_CHAT_URL;
```

---

### ✅ TASK-03: Trocar a URL do TTS
**Arquivo:** `src/components/ChatWindow.tsx` (linha ~164)

```diff
- `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts`
+ import.meta.env.VITE_BUILDSHIP_TTS_URL
```

---

### ✅ TASK-04: Trocar a URL do Extract
**Arquivo:** `src/lib/extractSession.ts` (linha ~13)

```diff
- const EXTRACT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/extract`;
+ const EXTRACT_URL = import.meta.env.VITE_BUILDSHIP_EXTRACT_URL;
```

---

### ✅ TASK-05: Adicionar token de segurança nos headers
**Arquivo:** `src/components/ChatWindow.tsx` — na função `fetch` do chat

Adicionar ao header de todas as requisições ao BuildShip:
```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${session.access_token}`,
  'x-api-key': import.meta.env.VITE_BUILDSHIP_SECRET,
}
```

---

### ✅ TASK-06: BYOK — Enviar chave da IA no body (TIA-81)
**Arquivo:** `src/components/ChatWindow.tsx` — no body do `fetch`

```typescript
body: JSON.stringify({
  messages: newMessagesForAI,
  systemPrompt,
  materiaSlug: materia?.slug,
  sessionKey,
  userApiKey: localStorage.getItem('user_api_key') || null, // ← ADICIONAR ESTA LINHA
}),
```

---

## FASE 1 — Bugs e Correções Existentes

> ✅ Todas as issues desta fase estão **Done** no Linear.

### ~~🐛 TASK-07: Modal de Reflexão ao Encerrar Tópico (TIA-84)~~ ✅ CONCLUÍDO

### ~~🐛 TASK-08: Botão "Encerrar" Centralizado (TIA-85)~~ ✅ CONCLUÍDO

---

## FASE 2 — Novas Features de UI

> As únicas features desta fase **ainda em Backlog no Linear** são TIA-81 e TIA-77.
> TIA-86 (menu de notas) já está ✅ Done.

### ~~✨ TASK-09: Menu Flutuante de Notas Notion-style (TIA-86)~~ ✅ CONCLUÍDO

---

### 🔴 TASK-10: Tela de Configuração BYOK (TIA-81) — BACKLOG
**Arquivo novo a criar:** `src/pages/Configuracoes.tsx` (nova rota `/configuracoes`)
**O que fazer:**
1. Campo de texto para o usuário colar sua chave da IA (OpenAI / Anthropic / Gemini)
2. Botão "Salvar" → salva no `localStorage` como `user_api_key`
3. Indicador visual se a chave está configurada ou não
4. Botão "Remover chave" → limpa do localStorage
5. Adicionar link para `/configuracoes` no menu/navbar

> 💡 **Por que localStorage e não banco?** Segurança. A chave nunca deve sair do dispositivo do usuário. O BuildShip recebe ela no body da requisição e usa apenas durante aquele request, sem armazenar.

---

### 🔴 TASK-11: Trilha por IA — Geração de Roadmap por Objetivo (TIA-77) — BACKLOG
**Depende de:** BuildShip `/extract` estar no ar e TASK-01 a 06 concluídas
**Arquivo:** `src/components/MateriaDetailModal.tsx`
**O que fazer:**
1. Adicionar aba ou seção "Gerar trilha" no modal da matéria
2. Campo de texto: *"Qual é seu objetivo?"* (ex: "Passar na residência em 3 meses")
3. Botão "Gerar trilha personalizada" → chama BuildShip com o objetivo
4. IA retorna lista de tópicos priorizados em JSON
5. Exibir os tópicos gerados como pré-visualização no modal
6. Botão "Adotar esta trilha" → insere em `topicos_emergentes` via Supabase
7. Invalida query para atualizar o roadmap na tela

---

### 🔴 TASK-12: Botão de Upload de PDF / Material (TIA-77 parcial)
**Depende de:** BuildShip `/extract` estar no ar
**Arquivo novo:** `src/components/FileUploadButton.tsx`
**Onde colocar:** `MateriaDetailModal.tsx` e/ou `Biblioteca.tsx`
**O que fazer:**
1. Renderizar botão "📎 Importar material"
2. Ao clicar, abrir seletor de arquivo (`<input type="file" accept=".pdf,.txt,.md">`)
3. Fazer upload do arquivo para Supabase Storage (criar bucket `materiais`)
4. Chamar `VITE_BUILDSHIP_EXTRACT_URL` com a URL pública do arquivo
5. BuildShip extrai os tópicos e salva em `topicos_emergentes`
6. Toast: "Analisando material..." → "X tópicos criados! 🎉"
7. Invalidar query `['topicos-emergentes', materia.slug]`

---

## FASE 3 — Produção e Deploy

> Só executar quando as Fases 0, 1 e 2 estiverem concluídas e aprovadas pelo QA.

### 🚀 TASK-14: Configurar variáveis no provedor de deploy
**Onde:** Painel do Vercel ou Netlify (não no código)
- Copiar todas as variáveis do `.env.local` para as variáveis de ambiente do projeto de produção
- **NUNCA commitar o `.env.local` no Git**

### 🚀 TASK-15: Verificar `.gitignore`
**O que checar:**
```
.env
.env.local
.env.*.local
```
Essas linhas devem existir no `.gitignore`. Se não existirem, adicionar antes de qualquer push.

### 🚀 TASK-16: Smoke Test Final de Produção
Após o deploy, testar manualmente em produção:
- [ ] Login funciona
- [ ] Chat com streaming funciona
- [ ] TTS toca áudio
- [ ] Criação de tópico via chip funciona
- [ ] Upload de PDF cria tópicos emergentes

---

## Resumo por Prioridade

| Status | Task | Depende de |
|---|---|---|
| 🔴 Próximo | TASK-01 a 06 (Virar a chave) | BuildShip deployado |
| 🔴 Próximo | TASK-10 (BYOK - TIA-81) | BuildShip + TASK-01 a 06 |
| 🔴 Próximo | TASK-11 (Trilha IA - TIA-77) | BuildShip + TASK-01 a 06 |
| 🔴 Próximo | TASK-12 (Upload PDF) | BuildShip `/extract` ativo |
| ✅ Done | TASK-07 (TIA-84 Modal reflexão) | — |
| ✅ Done | TASK-08 (TIA-85 Botão encerrar) | — |
| ✅ Done | TASK-09 (TIA-86 Menu notas) | — |
| 🟢 Final | TASK-13, 14, 15 (Deploy) | Tudo acima |
