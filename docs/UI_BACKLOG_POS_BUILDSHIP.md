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

> Estes bugs já existem e não dependem do BuildShip. Podem ser resolvidos em paralelo.

### 🐛 TASK-07: Modal de Reflexão ao Encerrar Tópico (TIA-84)
**Arquivo:** `src/pages/Sessao.tsx`
**O que fazer:** Quando `topicComplete = true` (IA sinalizou fim de tópico), exibir um modal antes de chamar `doEncerrar()`. O modal deve perguntar ao aluno: *"O que você aprendeu hoje?"* e salvar a resposta antes de encerrar.
**Componente a criar:** `ReflectionModal.tsx` (já existe, verificar se está conectado corretamente)

---

### 🐛 TASK-08: Botão "Encerrar" Centralizado (TIA-85)
**Arquivo:** `src/pages/Sessao.tsx` + CSS correspondente
**O que fazer:** Mover o botão de encerramento da sessão para o centro do rodapé do chat, em vez de aparecer desalinhado.

---

## FASE 2 — Novas Features de UI

> Estas features dependem do BuildShip estar no ar.

### ✨ TASK-09: Botão de Upload de PDF / Arquivo (TIA-77 parcial)
**Arquivo novo a criar:** `src/components/FileUploadButton.tsx`
**Onde colocar:** Na página `Biblioteca.tsx` e/ou dentro do modal de detalhes da matéria (`MateriaDetailModal.tsx`)
**O que fazer:**
1. Renderizar um botão "📎 Importar material" 
2. Ao clicar, abrir seletor de arquivo (`<input type="file" accept=".pdf,.txt,.md">`)
3. Fazer upload do arquivo para o Supabase Storage (criar bucket `materiais`)
4. Chamar `VITE_BUILDSHIP_EXTRACT_URL` com a URL pública do arquivo
5. O BuildShip extrai os tópicos e os salva na tabela `topicos_emergentes`
6. Mostrar toast "Analisando material..." → "X tópicos criados! 🎉"
7. Invalidar query `['topicos-emergentes', materia.slug]`

---

### ✨ TASK-10: Tela de Configuração BYOK (TIA-81)
**Arquivo novo a criar:** `src/pages/Configuracoes.tsx` (nova rota `/configuracoes`)
**O que fazer:**
1. Campo de texto para o usuário colar sua chave da IA (OpenAI / Anthropic / Gemini)
2. Botão "Salvar" → salva no `localStorage` como `user_api_key`
3. Indicador visual se a chave está configurada ou não
4. Botão "Remover chave" → limpa do localStorage

> 💡 **Por que localStorage e não banco?** Segurança. A chave nunca deve sair do dispositivo do usuário. O BuildShip recebe ela no body da requisição e usa apenas durante aquele request, sem armazenar.

---

### ✨ TASK-11: Trilha por IA — Geração de Roadmap por Objetivo (TIA-77)
**Arquivo:** `src/components/MateriaDetailModal.tsx` e possivelmente nova rota
**O que fazer:**
1. Adicionar campo de texto: *"Qual é seu objetivo com esta matéria?"* (ex: "Passar na prova de residência em 3 meses")
2. Botão "Gerar trilha personalizada"
3. Chamar BuildShip com o objetivo → IA gera uma lista de tópicos priorizados
4. Exibir a trilha gerada no modal como pré-visualização
5. Botão "Adotar esta trilha" → salva os tópicos em `topicos_emergentes`

---

### ✨ TASK-12: Menu Flutuante de Notas Notion-style (TIA-86)
**Arquivo:** `src/components/ChatWindow.tsx`
**O que fazer:**
1. Adicionar listener `onMouseUp` na área de mensagens do chat
2. Detectar quando o usuário selecionou texto (`window.getSelection()`)
3. Calcular a posição da seleção na tela
4. Renderizar o componente `FloatingSelectionMenu.tsx` (já existe) próximo à seleção
5. Ao clicar "Salvar Nota", fazer `supabase.from('study_notes').insert(...)` com o texto selecionado e o contexto da sessão

---

### ✨ TASK-13: Histórico Global Drawer — Melhorias
**Arquivo:** `src/components/HistoricoGlobalDrawer.tsx`
**O que fazer:** (verificar issues no Linear — o drawer já existe, identificar o que está incompleto)

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

| Prioridade | Task | Depende de |
|---|---|---|
| 🔴 Crítico | TASK-01 a 06 | BuildShip deployado |
| 🟠 Alto | TASK-07, 08 | Nada (podem ser feitos agora) |
| 🟡 Médio | TASK-09, 10, 11 | BuildShip + TASK-01 a 06 |
| 🟡 Médio | TASK-12, 13 | Nada (podem ser feitos agora) |
| 🟢 Final | TASK-14, 15, 16 | Tudo acima |
