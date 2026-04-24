# Edge Functions

Duas funções serverless rodando no Supabase (Deno runtime).

---

## `/chat` — Proxy de Streaming para IA

**Arquivo:** `supabase/functions/chat/index.ts`

### Responsabilidade
Recebe o histórico de mensagens + system prompt do frontend e faz o proxy do stream SSE para a API da IA (Anthropic Claude ou OpenAI).

### Por que Edge Function e não direto do frontend?
- **Segurança:** A API key da IA nunca fica exposta no bundle do cliente.
- **Flexibilidade:** Permite trocar o provedor de IA (Claude ↔ OpenAI) sem alterar o frontend.

### Request
```json
POST /functions/v1/chat
Authorization: Bearer <SUPABASE_PUBLISHABLE_KEY>
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "Inicie a sessão." },
    { "role": "assistant", "content": "..." }
  ],
  "systemPrompt": "Você é um professor particular..."
}
```

### Response
Stream SSE (Server-Sent Events) com chunks no formato:
```
data: {"choices":[{"delta":{"content":"..."}}]}
data: [DONE]
```

---

## `/extract` — Extração de Metadados da Sessão

**Arquivo:** `supabase/functions/extract/index.ts`

### Responsabilidade
Analisa a conversa completa e extrai metadados estruturados para salvar na tabela `sessoes`:
- `topico` — o que foi ensinado
- `proximo_topico` — sugestão para próxima sessão
- `dificuldade` — percepção de dificuldade
- `erros` — quantidade de erros
- `decisao_proxima` — avançar ou reforçar
- `observacoes` — notas internas da IA

### Request
```json
POST /functions/v1/extract
Authorization: Bearer <SUPABASE_PUBLISHABLE_KEY>
Content-Type: application/json

{
  "messages": [...],
  "materia": "violao-acordes"
}
```

### Response
```json
{
  "topico": "Transição entre Em e Am",
  "proximo_topico": "Acorde Sol Maior (G)",
  "dificuldade": "médio",
  "erros": 2,
  "decisao_proxima": "avançar",
  "observacoes": "Aluno teve dificuldade na transição mas melhorou no final."
}
```

---

## Deploy das Edge Functions

```bash
# Via Supabase CLI
supabase functions deploy chat
supabase functions deploy extract
```

Ou via **MCP do Supabase** (`deploy_edge_function`) direto do agente de IA.
