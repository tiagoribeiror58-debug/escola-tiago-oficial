# Ybernator 2026 — Guia de Construção do Backend (BuildShip)

> **Para quem é este guia:** Para Tiago. Sem jargão técnico desnecessário.
> **Princípio:** Não vamos quebrar nada. Vamos apenas construir a nova "cozinha" e redirecionar a porta de entrada.

---

## O que existe hoje vs. o que vamos fazer

Pensa assim: hoje o seu app tem uma **cozinha improvisada** — código manual escrito em Deno (Edge Functions do Supabase) que faz 3 trabalhos ao mesmo tempo:
1. Chama a IA (Gemini/Claude)
2. Faz a busca na Tavily (tempo real)
3. Detecta e salva tópicos emergentes

Não está errado. Mas é frágil: qualquer mudança exige abrir código, testar, fazer deploy. Demora.

**O que vamos fazer:** Construir a mesma "cozinha" no BuildShip — de forma visual, drag-and-drop — e simplesmente mudar **um endereço** no seu código React para o app passar a usar essa nova cozinha. O código visual (UI) não muda quase nada.

---

## O que está em Backlog (do Linear)

| Issue | O que é | Onde vive |
|---|---|---|
| TIA-81 BYOK | Usuário traz sua própria chave de IA | BuildShip (100%) |
| TIA-77 Trilha por IA | IA monta o roadmap a partir de um objetivo | BuildShip (gera) + UI (exibe) |
| TIA-83 BUG Chip | Clicar no chip de tópico não gera conteúdo | Frontend só (Sessao.tsx) |

> TIA-83 é URGENTE e não depende do BuildShip. Pode ser resolvido primeiro separadamente.

---

## Arquitetura Final

```
[Seu App React]
    |
    |-- CHAT URL ---------> [BuildShip: Workflow "chat"]
    |                            | -> Chama Gemini ou Claude
    |                            | -> Busca Tavily se precisar
    |                            | -> Retorna streaming SSE
    |
    |-- TTS URL ----------> [BuildShip: Workflow "tts"]
    |                            | -> Google Cloud TTS Neural
    |                            | -> Retorna audio MP3 base64
    |
    `-- EXTRACT URL ------> [BuildShip: Workflow "extract"]
                                 | -> Le PDF/anexo via MCP
                                 | -> Extrai topicos com IA
                                 | -> Salva no Supabase
```

O Supabase continua sendo usado APENAS como banco de dados. O BuildShip assume a "cozinha".

---

## PARTE 1 — Construindo o Backend no BuildShip

### Passo 0: Criar conta e entender a tela

1. Acesse buildship.com e crie uma conta gratuita
2. Clique em "New Project" e nomeie: Ybernator Backend
3. Voce vera um canvas vazio — aqui voce "desenha" o que o backend faz

**Analogia Feynman:** Pensa no BuildShip como um fluxograma vivo. Cada "bolinha" e um passo que o computador executa. Voce liga as bolinhas com flechas e isso vira uma API real na internet.

---

### Passo 1: Workflow "chat" (O mais importante)

#### 1.1 — Criar o Workflow
1. Clique em "New Workflow" -> nome: chat
2. No trigger, escolha "REST API Call" — cria uma URL publica que seu React vai chamar
3. Ative a opcao "Streaming" — faz o texto aparecer palavra por palavra no chat

#### 1.2 — Configurar variaveis secretas
Va em Settings -> Environment Variables e adicione:
- GEMINI_API_KEY: sua chave do Google AI Studio
- ANTHROPIC_API_KEY: sua chave da Anthropic (Claude)
- TAVILY_API_KEY: sua chave da Tavily
- SUPABASE_URL: a URL do seu Supabase
- SUPABASE_SERVICE_KEY: chave Service Role (Supabase > Settings > API)

NUNCA coloque essas chaves diretamente no codigo. Se vazar, alguem usa sua cota e voce paga.

#### 1.3 — Montar os nos (blocos) do workflow

**Bloco 1: Script (Formatar a requisicao)**
- Tipo: Script (JavaScript)
- Codigo:

```javascript
const { messages, systemPrompt, materiaSlug, sessionKey, userApiKey } = request.body;
// BYOK: usa chave do usuario se ele trouxer, caso contrario usa a do sistema
const geminiKey = userApiKey || process.env.GEMINI_API_KEY;
return { messages, systemPrompt, materiaSlug, sessionKey, geminiKey };
```

**Bloco 2: HTTP Request (Verificar se precisa buscar na internet)**
- URL: https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
- Method: POST
- Header Authorization: Bearer {{geminiKey}}
- Body:
```json
{
  "model": "gemini-2.0-flash",
  "messages": [
    {"role": "system", "content": "Responda APENAS NAO se a ultima mensagem nao precisar de dados em tempo real. Se precisar, retorne somente a query de busca, sem explicacao."},
    {"role": "user", "content": "{{messages[-1].content}}"}
  ],
  "max_tokens": 30,
  "temperature": 0
}
```

**Bloco 3: Condition (Bifurcacao: buscar ou nao buscar)**
- Condicao: response != NAO
- Se VERDADEIRO: vai para Bloco 4 (Tavily)
- Se FALSO: pula para Bloco 5 (IA direto)

**Bloco 4: HTTP Request (Busca Tavily)**
- URL: https://api.tavily.com/search
- Method: POST
- Body:
```json
{
  "api_key": "{{TAVILY_API_KEY}}",
  "query": "{{decisaoBusca}}",
  "max_results": 3
}
```

**Bloco 5: HTTP Request (Chama a IA com Streaming)**
- URL: https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
- Method: POST
- ATIVE: Stream Response = true
- Body:
```json
{
  "model": "gemini-2.0-flash",
  "stream": true,
  "max_tokens": 2048,
  "messages": [
    {"role": "system", "content": "{{systemPromptFinal}}"}
  ]
}
```

**Bloco 6: Stream Response (Devolve para o React)**
- Tipo: Stream Response
- Conecta na saida do Bloco 5
- Isso retorna o texto em SSE (efeito de "digitacao" no chat)

#### 1.4 — Deploy e URL
Clique em Deploy. O BuildShip gera uma URL tipo:
https://abc123.buildship.run/chat
Guarde essa URL para a Parte 2.

---

### Passo 2: Workflow "tts" (Voz Neural)

1. New Workflow -> nome: tts
2. Trigger: REST API Call (sem streaming)

**Bloco 1: HTTP Request (Google Cloud TTS)**
- URL: https://texttospeech.googleapis.com/v1/text:synthesize
- Adicione GOOGLE_TTS_KEY nas Environment Variables
- Body:
```json
{
  "input": {"text": "{{request.body.text}}"},
  "voice": {"languageCode": "pt-BR", "name": "pt-BR-Neural2-B"},
  "audioConfig": {"audioEncoding": "MP3", "speakingRate": "{{request.body.speed}}"}
}
```

**Bloco 2: Return**
- Retorna: { "audioContent": "{{response.audioContent}}" }

---

### Passo 3: Workflow "extract" (Leitura de PDF via MCP)

1. New Workflow -> nome: extract
2. Trigger: REST API Call

**Bloco 1: MCP / File Reader**
- Busque "MCP" ou "File Reader" no catalogo de nos
- Conecta ao arquivo/URL enviado pelo frontend
- Extrai o texto bruto do documento

**Bloco 2: HTTP Request (IA analisa e gera topicos)**
- Chama Gemini com o texto extraido
- System Prompt:
```
Voce e um curador pedagogico. Analise o conteudo e gere uma lista de topicos de estudo em JSON.
Formato: {"topicos": ["Topico 1", "Topico 2"], "descricao": "Resumo do material"}
Retorne SOMENTE o JSON.
```

**Bloco 3: Supabase Insert Row**
- Selecione o no oficial do Supabase
- Tabela: topicos_emergentes
- Insere os topicos gerados pela IA

---

## PARTE 2 — Ajustes Minimos no Frontend (React)

Esta parte e MINIMA. Voce nao esta reescrevendo nada. Esta apenas trocando o endereco de destino — como mudar o numero da pizzaria sem reformar a cozinha.

### Passo 1: Adicionar variaveis no .env.local

Abra ou crie o arquivo .env.local na raiz do projeto:

```
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_anon

VITE_BUILDSHIP_CHAT_URL=https://SEU_PROJETO.buildship.run/chat
VITE_BUILDSHIP_TTS_URL=https://SEU_PROJETO.buildship.run/tts
VITE_BUILDSHIP_EXTRACT_URL=https://SEU_PROJETO.buildship.run/extract
VITE_BUILDSHIP_SECRET=um_token_secreto_qualquer
```

### Passo 2: 1 linha no ChatWindow.tsx (linha 38)

ANTES:
```typescript
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
```

DEPOIS:
```typescript
const CHAT_URL = import.meta.env.VITE_BUILDSHIP_CHAT_URL;
```

### Passo 3: URL do TTS no ChatWindow.tsx (linha 164)

ANTES:
```typescript
`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts`
```

DEPOIS:
```typescript
import.meta.env.VITE_BUILDSHIP_TTS_URL
```

### Passo 4: URL do Extract em extractSession.ts (linha 13)

ANTES:
```typescript
const EXTRACT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/extract`;
```

DEPOIS:
```typescript
const EXTRACT_URL = import.meta.env.VITE_BUILDSHIP_EXTRACT_URL;
```

### Passo 5: BYOK no ChatWindow.tsx (TIA-81)

No body da requisicao ao BuildShip, adicionar:
```typescript
body: JSON.stringify({
  messages: newMessagesForAI.map(({ role, content }) => ({ role, content })),
  systemPrompt,
  materiaSlug: materia?.slug,
  sessionKey,
  userApiKey: localStorage.getItem('user_api_key') || null,
}),
```

---

## PARTE 3 — Ajustes de UI Pendentes (Nao dependem do BuildShip)

| Issue | Arquivo | O que fazer |
|---|---|---|
| TIA-83 BUG Chip | Sessao.tsx | sub (subtopico) provavelmente chega null ao clicar no chip |
| TIA-84 Modal de reflexao | Sessao.tsx | Modal aparece quando topicComplete=true antes do doEncerrar() |
| TIA-85 Botao Encerrar centralizado | Sessao.tsx + CSS | Mover botao para centro do rodape do chat |
| TIA-86 Menu Notion de notas | ChatWindow.tsx | onMouseUp listener -> detecta selecao -> menu flutuante |

---

## PARTE 4 — Checklist de Producao

### BuildShip
- [ ] 3 workflows com status Deployed (nao so Saved)
- [ ] Testou /chat com Postman — retornou streaming
- [ ] Testou /tts — retornou audio MP3 base64
- [ ] Variaveis de ambiente configuradas no BuildShip
- [ ] Rate Limiting ativado nas configuracoes do Workflow
- [ ] Logs ativados para monitorar erros

### Supabase
- [ ] Row Level Security (RLS) ativo em todas as tabelas
- [ ] SUPABASE_SERVICE_KEY usada SOMENTE no BuildShip (nunca no frontend)
- [ ] Frontend usa SOMENTE a anon key (VITE_SUPABASE_PUBLISHABLE_KEY)

### Frontend
- [ ] .env.local NAO commitado no Git (verificar .gitignore)
- [ ] Variaveis VITE_BUILDSHIP_* configuradas no Vercel/Netlify
- [ ] Testou fluxo completo: mensagem -> streaming -> confete -> encerramento -> banco

### Seguranca
- [ ] BuildShip recebe header x-api-key no frontend:
      "x-api-key": import.meta.env.VITE_BUILDSHIP_SECRET
- [ ] Chave BYOK nunca aparece nos logs do BuildShip
- [ ] CORS configurado no BuildShip: Access-Control-Allow-Origin: *

### O que pode dar errado

| Problema | Causa | Solucao |
|---|---|---|
| Chat sem resposta | URL errada no .env | Verifique VITE_BUILDSHIP_CHAT_URL |
| Texto aparece todo de uma vez | Streaming nao ativo | Ative "Stream Response" no BuildShip |
| CORS error no browser | BuildShip nao liberou CORS | Adicione Access-Control-Allow-Origin: * no Workflow |
| TTS sem audio | Chave Google Cloud TTS invalida | Verifique no Google Cloud Console |

---

## Resumo Final

1. **BuildShip:** Voce constroi 3 workflows visuais (chat, tts, extract) e faz deploy. Cada um vira uma URL publica.
2. **Frontend:** Voce troca 3 linhas de codigo (as URLs) para apontar ao BuildShip em vez do Supabase.
3. **Producao:** Valida o checklist acima, configura os segredos no servico de deploy, e vai ao ar.

Status: Aguardando inicio da execucao.
