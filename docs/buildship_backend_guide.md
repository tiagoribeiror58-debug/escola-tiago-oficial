# Ybernator 2026 — Guia de Construção do Backend (Dify)

> **Para quem é este guia:** Para Tiago. Sem jargão técnico desnecessário.
> **Princípio:** Não vamos quebrar nada. Vamos apenas construir a nova "cozinha" e redirecionar a porta de entrada.
> **Por que mudamos:** O BuildShip apresentou instabilidade. O Dify é superior para IA porque o Streaming (texto palavra por palavra) é nativo, sem configuração extra.

---

## O que existe hoje vs. o que vamos fazer

Pensa assim: hoje o seu app tem uma **cozinha improvisada** — código manual escrito em Deno (Edge Functions do Supabase) que faz 3 trabalhos ao mesmo tempo:
1. Chama a IA (Gemini/Claude)
2. Faz a busca na Tavily (tempo real)
3. Detecta e salva tópicos emergentes

Não está errado. Mas é frágil: qualquer mudança exige abrir código, testar, fazer deploy. Demora.

**O que vamos fazer:** Construir a mesma "cozinha" no Dify — de forma visual, drag-and-drop — e simplesmente mudar **um endereço** no seu código React para o app passar a usar essa nova cozinha. O código visual (UI) não muda quase nada.

**Analogia Feynman:** Se ferramentas como Xano ou Fastgen te dão tijolos para você construir um fogão do zero, o Dify te entrega um forno industrial já montado e calibrado para IA, e só te dá o controle da temperatura (a API) para colocar no seu app.

---

## O que está em Backlog (do Linear)

| Issue | O que é | Onde vive |
|---|---|---|
| TIA-81 BYOK | Usuário traz sua própria chave de IA | Dify (100%) |
| TIA-77 Trilha por IA | IA monta o roadmap a partir de um objetivo | Dify (gera) + UI (exibe) |
---

## Arquitetura Final

```
[Seu App React]
    |
    |-- CHAT URL ----------> [Dify: Workflow "chat"]
    |                            | -> Chama Gemini ou Claude
    |                            | -> Busca Tavily se precisar
    |                            | -> Retorna streaming SSE (nativo)
    |
    |-- TTS URL -----------> [Dify: Workflow "tts"]
    |                            | -> Google Cloud TTS Neural
    |                            | -> Retorna audio MP3 base64
    |
    `-- EXTRACT URL -------> [Dify: Workflow "extract"]
                                 | -> Le PDF/anexo
                                 | -> Extrai topicos com IA
                                 | -> Salva no Supabase
```

O Supabase continua sendo usado APENAS como banco de dados. O Dify assume a "cozinha".

---

## PARTE 1 — Construindo o Backend no Dify

### Passo 0: Criar conta e entender a tela

1. Acesse **cloud.dify.ai** e crie uma conta gratuita (login com Google funciona)
2. Clique em **"Create App"** -> escolha **"Workflow"** (não "Chatbot" — queremos uma API, não uma interface pronta)
3. Nomeie: `Ybernator Backend`
4. Voce vera um canvas vazio com um nó de **Start** — aqui voce "desenha" o que o backend faz

**Importante:** O Dify tem dois modos. Use sempre **Workflow** para criar APIs que o seu React vai consumir. O modo "Chatbot" é para você usar no navegador, não para integrar com seu código.

---

### Passo 1: Configurar as chaves secretas (vale para todos os workflows)

Va em **Settings** (canto superior direito do seu workspace) -> **API Keys** ou **Model Providers** e adicione:

- **Gemini:** Google -> cole sua chave do Google AI Studio
- **Anthropic:** Anthropic -> cole sua chave do Claude

Para as demais chaves (Tavily, Supabase, Google TTS), voce vai adicioná-las como variáveis de ambiente dentro de cada Workflow em **"Environment Variables"** no painel lateral.

NUNCA coloque essas chaves diretamente no codigo do frontend. Se vazar, alguem usa sua cota e voce paga.

---

### Passo 2: Workflow "chat" (O mais importante)

#### 2.1 — Criar o Workflow

1. Clique em **"Create App"** -> **Workflow** -> nome: `chat`
2. Na tela de seleção de nó inicial, escolha **"Entrada do Usuário (nó inicial original)"**. O Dify vai criar os nós de Início e Fim.
3. No nó **Start** (Início), defina as variáveis de entrada que o seu React vai enviar:
   - `messages` (Array)
   - `systemPrompt` (String)
   - `materiaSlug` (String)
   - `sessionKey` (String)
   - `userApiKey` (String — para o BYOK, TIA-81)

#### 2.2 — Montar os nós (blocos) do workflow

**Nó 1: Code (Formatar a requisição)**
- Clique em **"+"** -> **Code**
- **Variáveis de Entrada:** crie `messages`, `userApiKey`, `systemPrompt` e vincule-as com as saídas do nó Iniciar.
- **Linguagem:** JavaScript
- **Código:** Apague tudo e cole este código abaixo (agora ele faz o trabalho sujo de montar o JSON para não dar bug na próxima tela!):
```javascript
function main({messages, userApiKey, systemPrompt}) {
    const geminiKey = userApiKey || ""; 
    
    let ultimaMensagem = "";
    if (messages && messages.length > 0) {
        ultimaMensagem = messages[messages.length - 1].content;
    }

    // Para evitar os bugs visuais do Dify, montamos o JSON inteiro direto no código:
    const corpoRequisicao = {
        model: "gemini-3.5-flash",
        messages: [
            {role: "system", content: "Responda APENAS NAO se a ultima mensagem nao precisar de dados em tempo real. Se precisar, retorne somente a query de busca, sem explicacao."},
            {role: "user", content: ultimaMensagem}
        ],
        max_tokens: 30,
        temperature: 0
    };

    return { 
        geminiKey: geminiKey, 
        corpoRequisicaoTexto: JSON.stringify(corpoRequisicao)
    };
}
```
- **Variáveis de Saída (Outputs):** Abaixo do código, crie apenas `geminiKey` (String) e `corpoRequisicaoTexto` (String). *(Você pode apagar as antigas!)*

**Nó 2: HTTP Request (Verificar se precisa buscar na internet)**
- Clique em **"+"** -> **HTTP Request**
- URL: `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`
- Method: POST
- Headers (Cabeçalhos):
  - Chave: `Authorization`
  - Valor: Escreva `Bearer ` (com espaço) e insira a variável `geminiKey` ao lado.
- Body (Corpo):
  - Em vez de JSON, marque a opção **raw** (texto bruto).
  - Na caixa de texto que aparecer, **não digite nada**. Apenas clique no botão para inserir variável (`/` ou `{x}`) e coloque a variável **`corpoRequisicaoTexto`**. Fim! Sem dor de cabeça com aspas ou enter.
```

**Nó 3: IF (Bifurcação: buscar ou não buscar)**
- Clique em **"+"** -> **IF/ELSE**
- Condição: `response != "NAO"`
- Ramo TRUE: vai para o Nó 4 (Tavily)
- Ramo FALSE: pula para o Nó 5 (IA direta)

**Nó 4: HTTP Request (Busca Tavily)**
- URL: `https://api.tavily.com/search`
- Method: POST
- Body:
```json
{
  "api_key": "{{TAVILY_API_KEY}}",
  "query": "{{decisaoBusca}}",
  "max_results": 3
}
```

**Nó 5: LLM (Chama a IA com Streaming — o coração do Dify)**
- Clique em **"+"** -> **LLM**
- Model: selecione `gemini-2.0-flash` (ou `claude-3-5-sonnet`)
- Ative **"Stream"** no painel do nó (é um toggle, nativo do Dify)
- System Prompt: `{{systemPromptFinal}}`
- O Dify automaticamente injeta o histórico de mensagens se você conectar a variável `messages`

**Nó 6: End (Devolve para o React)**
- Conecte a saída do Nó 5 no nó **End**
- Output variable: o conteúdo gerado pelo LLM
- O Dify gera a resposta em SSE automaticamente quando Streaming está ativado

#### 2.3 — Publicar e obter a URL

1. Clique em **"Publish"** (canto superior direito)
2. Va em **"API Access"** no painel lateral
3. O Dify gera uma URL no formato:
   ```
   https://api.dify.ai/v1/workflows/run
   ```
   E um **API Key** específico do seu app (diferente da sua chave de conta)
4. Guarde essa URL e a API Key para a Parte 2

> **Detalhe importante:** No Dify, a URL de execução de Workflow é sempre a mesma (`/v1/workflows/run`). O que diferencia qual workflow você está chamando é o **API Key** do app. Cada app (chat, tts, extract) tem seu próprio API Key.

---

### Passo 3: Workflow "tts" (Voz Neural)

1. **"Create App"** -> **Workflow** -> nome: `tts`
2. No nó **Start**, defina: `text` (String), `speed` (Number)

**Nó 1: HTTP Request (Google Cloud TTS)**
- URL: `https://texttospeech.googleapis.com/v1/text:synthesize?key={{GOOGLE_TTS_KEY}}`
- Method: POST
- Body:
```json
{
  "input": {"text": "{{text}}"},
  "voice": {"languageCode": "pt-BR", "name": "pt-BR-Neural2-B"},
  "audioConfig": {"audioEncoding": "MP3", "speakingRate": "{{speed}}"}
}
```

**Nó 2: End**
- Output: `{ "audioContent": "{{response.audioContent}}" }`

---

### Passo 4: Workflow "extract" (Leitura de PDF)

1. **"Create App"** -> **Workflow** -> nome: `extract`
2. No nó **Start**, defina: `fileUrl` (String)

**Nó 1: HTTP Request (Baixa o conteúdo do arquivo)**
- Faz uma requisição GET na `fileUrl` para obter o texto do documento
- Alternativamente: o Dify possui um nó nativo de **"Document Extractor"** — procure por ele no catálogo de nós, ele lê PDFs sem precisar de código extra

**Nó 2: LLM (IA analisa e gera tópicos)**
- Model: `gemini-2.0-flash`
- System Prompt:
```
Voce e um curador pedagogico. Analise o conteudo e gere uma lista de topicos de estudo em JSON.
Formato: {"topicos": ["Topico 1", "Topico 2"], "descricao": "Resumo do material"}
Retorne SOMENTE o JSON.
```

**Nó 3: HTTP Request (Salva no Supabase)**
- URL: `{{SUPABASE_URL}}/rest/v1/topicos_emergentes`
- Method: POST
- Headers:
  - `apikey: {{SUPABASE_SERVICE_KEY}}`
  - `Authorization: Bearer {{SUPABASE_SERVICE_KEY}}`
  - `Content-Type: application/json`
- Body: o JSON gerado pelo LLM

---

## PARTE 2 — Ajustes Mínimos no Frontend (React)

Esta parte e MINIMA. Voce nao esta reescrevendo nada. Esta apenas trocando o endereco de destino.

### Passo 1: Adicionar variáveis no .env.local

Abra ou crie o arquivo `.env.local` na raiz do projeto:

```
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_anon

# Dify — URL base (a mesma para todos os workflows)
VITE_DIFY_BASE_URL=https://api.dify.ai/v1/workflows/run

# Dify — API Key de cada app (cada workflow tem a sua)
VITE_DIFY_CHAT_KEY=app-xxxxxxxxxxxxxxxxxxxx
VITE_DIFY_TTS_KEY=app-yyyyyyyyyyyyyyyyyy
VITE_DIFY_EXTRACT_KEY=app-zzzzzzzzzzzzzzzzzz
```

> Onde encontrar as API Keys: dentro de cada app no Dify -> **API Access** -> **API Key**

### Passo 2: Como chamar o Dify no ChatWindow.tsx

O Dify usa um formato de body ligeiramente diferente do BuildShip. O campo das variáveis vai dentro de `"inputs"`:

**ANTES (Supabase Edge Function):**
```typescript
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

fetch(CHAT_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages, systemPrompt, materiaSlug, sessionKey })
})
```

**DEPOIS (Dify):**
```typescript
const DIFY_URL = import.meta.env.VITE_DIFY_BASE_URL;
const DIFY_CHAT_KEY = import.meta.env.VITE_DIFY_CHAT_KEY;

fetch(DIFY_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DIFY_CHAT_KEY}`,
  },
  body: JSON.stringify({
    inputs: {                          // <- diferença do Dify: variáveis dentro de "inputs"
      messages,
      systemPrompt,
      materiaSlug,
      sessionKey,
      userApiKey: localStorage.getItem('user_api_key') || '',
    },
    response_mode: 'streaming',        // <- ativa SSE nativo
    user: sessionKey,                  // <- identificador do usuário para logs do Dify
  })
})
```

### Passo 3: URL do TTS (ChatWindow.tsx)

```typescript
fetch(import.meta.env.VITE_DIFY_BASE_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_DIFY_TTS_KEY}`,
  },
  body: JSON.stringify({
    inputs: { text, speed },
    response_mode: 'blocking',
    user: sessionKey,
  })
})
```

### Passo 4: URL do Extract (extractSession.ts)

```typescript
fetch(import.meta.env.VITE_DIFY_BASE_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_DIFY_EXTRACT_KEY}`,
  },
  body: JSON.stringify({
    inputs: { fileUrl },
    response_mode: 'blocking',
    user: 'system',
  })
})
```

---

## PARTE 3 — Ajustes de UI Pendentes (Não dependem do Dify)

| Issue | Arquivo | O que fazer |
|---|---|---|
| TIA-83 BUG Chip | Sessao.tsx | sub (subtopico) provavelmente chega null ao clicar no chip |
| TIA-84 Modal de reflexao | Sessao.tsx | Modal aparece quando topicComplete=true antes do doEncerrar() |
| TIA-85 Botao Encerrar centralizado | Sessao.tsx + CSS | Mover botao para centro do rodape do chat |
| TIA-86 Menu Notion de notas | ChatWindow.tsx | onMouseUp listener -> detecta selecao -> menu flutuante |

---

## PARTE 4 — Checklist de Produção

### Dify
- [ ] 3 apps criados com status Published (não só Draft)
- [ ] Testou o workflow "chat" com `response_mode: "streaming"` — retornou SSE
- [ ] Testou o workflow "tts" com `response_mode: "blocking"` — retornou audioContent
- [ ] Variáveis de ambiente configuradas dentro de cada app no Dify
- [ ] Coletou o API Key de cada app e colocou no .env.local

### Supabase
- [ ] Row Level Security (RLS) ativo em todas as tabelas
- [ ] SUPABASE_SERVICE_KEY usada SOMENTE dentro dos workflows do Dify (nunca no frontend)
- [ ] Frontend usa SOMENTE a anon key (VITE_SUPABASE_PUBLISHABLE_KEY)

### Frontend
- [ ] .env.local NAO commitado no Git (verificar .gitignore)
- [ ] Variáveis VITE_DIFY_* configuradas no Vercel/Netlify
- [ ] Testou fluxo completo: mensagem -> streaming -> confete -> encerramento -> banco

### Segurança
- [ ] As API Keys do Dify ficam nas env vars do servidor de deploy (Vercel), nunca expostas
- [ ] Chave BYOK do usuário nunca aparece nos logs do Dify
- [ ] CORS: o Dify libera por padrão para origens externas — verifique nas configs do app se necessário

### O que pode dar errado

| Problema | Causa | Solução |
|---|---|---|
| Chat sem resposta | API Key errada no header Authorization | Verifique VITE_DIFY_CHAT_KEY |
| Texto aparece todo de uma vez | `response_mode` não está como `"streaming"` | Mude para `response_mode: "streaming"` |
| Erro 401 Unauthorized | API Key do Dify inválida ou do app errado | Pegue a key correta em API Access do app |
| TTS sem audio | Chave Google Cloud TTS inválida | Verifique no Google Cloud Console |
| Extract não salva | SUPABASE_SERVICE_KEY errada no Dify | Verifique em Environment Variables do workflow |

---

## Resumo Final

1. **Dify:** Voce constroi 3 apps (Workflows) visuais — chat, tts, extract — e publica. Cada um gera um API Key único.
2. **Frontend:** Voce troca as URLs e os headers para apontar ao Dify, usando o formato `{ inputs: {...}, response_mode: "streaming" }`.
3. **Producao:** Valida o checklist acima, configura as API Keys do Dify nas env vars do Vercel, e vai ao ar.

Status: Aguardando início da execução.
