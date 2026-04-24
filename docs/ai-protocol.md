# Protocolo da IA (`buildPrompt.ts`)

**Arquivo:** `src/lib/buildPrompt.ts`

---

## Responsabilidade

Constrói o `systemPrompt` completo que é enviado para a IA a cada sessão. Centraliza toda a lógica de comportamento do professor.

---

## Estrutura do Prompt

```
[BASE — Regras obrigatórias do professor]
    + [CONTEXTO DA MATÉRIA — específico do MateriaConfig.contexto]
    + [EMENTA INVISÍVEL — se MateriaConfig.ementa existir]
    + [HISTÓRICO DA ÚLTIMA SESSÃO — tópico, dificuldade, próximo passo]
    + [MODO — nova sessão vs. continuação]
```

---

## Regras Críticas (invioláveis)

| Regra | Comportamento |
|---|---|
| **Anti-Frustração** | Se o aluno pedir para começar → IA começa imediatamente, sem mais perguntas |
| **Micro-Learning Estrito** | Se confuso → máximo 1-2 parágrafos curtos, sem sobrecarregar |
| **Anti-Sobrecarga** | Um conceito por vez. Proibido misturar dois termos complexos na mesma resposta |
| **Sem Teste Cego** | Proibido pedir que o aluno explique algo sem ter ensinado antes |
| **Acknowledge & Pause** | Se aluno disser "entendi" → perguntar se quer exemplo ou prefere avançar |
| **1 Tópico por Sessão** | Ensinar exatamente 1 micro-tópico. Ao concluir, não introduzir conteúdo novo |
| **Sinal de Conclusão** | Ao encerrar, obrigatório incluir `<session_done/>` na última linha |
| **Chips Dinâmicos** | Incluir `<chips>opção 1|opção 2|opção 3</chips>` na última linha (exceto na mensagem de encerramento) |

---

## Tags especiais no output da IA

### `<session_done/>`
- Emitida pela IA quando o tópico foi completamente ensinado e absorvido
- O `ChatWindow.tsx` detecta via regex, **remove do texto exibido** e chama `onTopicComplete()`
- O botão "Encerrar" ganha destaque visual verde pulsante

### `<chips>opção 1|opção 2</chips>`
- Renderizadas como botões clicáveis abaixo do input
- O conteúdo é **removido do texto salvo** no banco
- Máximo 4 opções, separadas por `|`
- O usuário pode desativar via toggle `⚡` no chat

---

## Ementa Invisível

Se `materia.ementa` existir, o prompt recebe:

```
EMENTA RIGOROSA (Passo a Passo):
Esta matéria possui uma ementa estrita. Você não pode pular passos.
Baseando-se no histórico, identifique em qual passo o aluno parou
e ensine EXATAMENTE O PRÓXIMO PASSO. Não improvise tópicos fora desta lista.
- 1. Postura da mão esquerda
- 2. Acorde Em
- ...
```

---

## Contexto da última sessão

Quando há sessão prévia, o prompt recebe:

```
Contexto da última sessão (uso interno — não mencione estes dados):
- Tópico trabalhado: Acorde Em
- Desempenho: médio dificuldade, 2 erros
- Próximo tópico sugerido: Acorde Am
- Decisão: avançar

INÍCIO DA SESSÃO — MODO ESTUDO: Cumprimente o aluno e comece a ensinar
"Acorde Am". ATENÇÃO: se este tópico for igual ao anterior, escolha
o próximo passo lógico. NUNCA repita uma aula.
```

---

## Trigger silencioso de início

A primeira mensagem enviada pelo frontend é sempre:
```
"Inicie a sessão."
```
Esta mensagem é enviada de forma silenciosa (`isSilentTrigger = true`) — **não aparece no chat do usuário**.
