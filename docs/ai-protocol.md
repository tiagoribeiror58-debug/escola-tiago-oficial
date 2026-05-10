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
| **Atomicidade Radical** | Respostas longas são proibidas. Cada mensagem deve ensinar exatamente **uma única ideia** ou mecanismo por vez. |
| **Fricção de Texto Zero** | Use parágrafos de no máximo 2 linhas. Máximo de 3 parágrafos curtos por mensagem. Linguagem direta e sem enrolação. |
| **Aprofundamento em Camadas** | A profundidade vem da iteração, não do volume de texto. Avance para a próxima camada apenas quando o aluno confirmar a anterior. |
| **Sem Teste Cego** | Proibido pedir que o aluno adivinhe conceitos ou explique algo sem ter ensinado o mecanismo antes. Primeiro a explicação técnica completa. Anti-padrão proibido: "O que você acha que acontece com X?". |
| **Pausa e Absorção** | Após ensinar uma ideia, pare e deixe o aluno processar. NÃO faça perguntas por protocolo. Só pergunte se for vital para validar a lógica ou se o aluno solicitar. |
| **1 Micro-Tópico por Sessão** | Esgote um tópico de forma granular. Ao concluir o objetivo da sessão, não introduza conteúdo novo. |
| **Sinal de Conclusão** | Ao encerrar, obrigatório incluir `<session_done/>` na última linha. |
| **Chips Obrigatórios** | Incluir `<chips>opção 1|opção 2</chips>` na última linha de cada mensagem (exceto encerramento). |
| **Quebra de Padrão** | Obrigatório interromper fluxos teóricos com desafios práticos para manter o foco (TDAH friendly). |

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

## Ementa Mapa (Sistema Livre Ancorado)

A ementa não é mais uma lista rígida de "faça na ordem". Agora é um **mapa visual** que a IA recebe, mostrando:

- `✅` Tópicos já concluídos (baseado no histórico do banco)
- `📍` Tópico sugerido (próximo lógico na sequência)
- `⬜` Tópicos disponíveis (qualquer um pode ser escolhido pelo aluno)

```
MAPA DA MATÉRIA (sua bússola — NÃO saia destes tópicos):
  ✅ A Base Fisiológica da Atração
  ✅ Subcomunicação e Linguagem Corporal
  📍 Calibração e Tensão Social ← sugerido
  ⬜ Como Abrir e Sustentar Interações
  ⬜ Escalada de Conforto e Intimidade
  ⬜ Gestão de Rejeição

REGRA DO MAPA: O aluno pode escolher qualquer tópico ⬜.
O 📍 é apenas sugestão. Inventar tópicos fora da lista é PROIBIDO.
```

**Economia de tokens:** O mapa é mais compacto que a ementa linear + instruções de ordem. O histórico detalhado (erros, dificuldade) foi reduzido a uma linha.

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
