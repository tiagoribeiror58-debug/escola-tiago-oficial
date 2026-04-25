# 🧠 Regras de Negócio e Arquitetura — Escola Tiago

Este documento centraliza todas as regras de negócio, fluxos de experiência do usuário (UX) e princípios de inteligência artificial que regem o aplicativo **Escola Tiago**.

---

## 1. Princípios de Design e Experiência (LX - Learning Experience)

- **Fricção Zero:** O aplicativo deve minimizar cliques. Não existem modais de confirmação desnecessários. Quando o aluno encerra uma sessão, a interface salva e o redireciona imediatamente (com feedback sonoro) para a Home.
- **Anti-Sobrecarga:** O aluno entra, foca, resolve e sai. A interface oculta complexidades. Históricos profundos ficam em modais de segundo nível. O Hero (Top 1) na Home indica exatamente o que o aluno deve fazer no momento.
- **Invisible Syllabus (Ementa Invisível):** Com exceção das áreas com ementa explícita (`config.ementa`), o aluno não vê uma lista exaustiva de tópicos. A IA guia a jornada baseando-se no que ele já sabe, ocultando a ansiedade de "quanto falta para acabar".

---

## 2. O Motor de Sessões e a IA (Micro-Learning Estrito)

- **A Regra Inviolável do Tópico Único:** A IA de Estudo está rigidamente instruída a ensinar apenas **1 micro-tópico por sessão**. O objetivo não é aulas de 50 minutos, mas *pílulas* de conhecimento.
- **Detecção de Entendimento:** Assim que o aluno demonstra ter absorvido o conceito daquele único tópico (através de Active Recall), a IA emite uma tag oculta `<session_done/>`.
- **Gatilho de Encerramento:** O botão "Encerrar" permanece oculto (`hidden`) até que a IA decrete que a sessão acabou (tag `<session_done/>`). Isso evita que o aluno feche a aba sem concluir o loop de aprendizado.
- **Chips Dinâmicos:** A IA sugere respostas rápidas enviando a tag `<chips>opção 1|opção 2</chips>`, permitindo interação com apenas um clique, o que aumenta a retenção mobile.

---

## 3. Extração e Memória do Aluno (Background AI)

- Quando uma sessão inédita é encerrada, o chat completo é enviado para uma segunda IA (Extratora).
- A Extratora analisa a conversa e salva no banco de dados (`sessoes`):
  1. O tópico estudado.
  2. A quantidade de erros cometidos.
  3. A dificuldade percebida (Baixa, Média, Alta).
  4. Qual deve ser o próximo tópico abordado.
- Esse resumo é o que alimenta o contexto da próxima sessão, evitando que a IA repita assuntos e permitindo focar nas dificuldades reais do aluno.

---

## 4. Sistema de Foco e Urgência

### Hero Card (Top 1)
O sistema lê todo o histórico do banco de dados e identifica qual matéria/área possui a maior quantidade de sessões realizadas. Essa se torna a **Matéria de Foco** e vai para o topo da página inicial com um *Call To Action* gigante para incentivar o fluxo contínuo.

### Urgência por Tempo (Decay)
Baseado na data da última sessão de uma matéria, o sistema colore as bordas e define o status:
- **Até 3 dias:** OK (Verde)
- **Até 7 dias:** Atenção (Amarelo)
- **Mais de 7 dias:** Urgente (Vermelho)

---

## 5. Gamificação: Caminho de Maestria e Avaliação (TIA-58 e TIA-59)

A gamificação não usa "moedas" ou "fogo de ofensiva", usa provas de maestria de conhecimento.

- **Portão de Maestria:** A cada 10 sessões feitas em uma mesma matéria, o aluno chega no Portão de Maestria (indicador visual na Home e nos cards, ex: `9/10 Prova`).
- **Trigger:** Ao bater 10/10, o botão "Continuar Estudando" se converte em **"Fazer Desafio de Maestria"**.
- **A IA Implacável:** No Desafio de Maestria, a IA deixa de ser "Professora" e assume a persona de "Avaliadora".
- **Estratégia 70/30:**
  - 70% das perguntas testam o "Big Picture" (o cenário geral dos últimos 10 tópicos).
  - 30% das perguntas forçam nas fraquezas (tópicos em que a Extratora marcou que o aluno errou antes).
- **Aprovação e Recuperação:** 
  - Se o aluno passa no teste, a IA lança `<mastery_passed/>`. O contador da área zera (para iniciar um novo ciclo de aprendizado) e o aluno conquista a área.
  - Se o aluno falha feio, a sessão termina sem aprovação, indicando que ele precisará de mais estudo antes de ser testado de novo.

---

## 6. Visualização do Histórico e "Modo LLM"

- O histórico completo do aluno não interfere nas sessões ativas de estudo.
- Dentro do modal de detalhes da matéria, o aluno pode clicar em **"Abrir Conversa"**.
- O sistema recupera a `session_key` antiga e carrega os `messages_json` na interface.
- O aluno pode rolar, ler ou **continuar conversando com a IA** dentro desse chat antigo para tirar novas dúvidas. Como se trata de uma `session_key` recuperada, sair dessa tela não re-escreve o resumo nem cria uma "nova" sessão oficial de estudo, atuando puramente como uma interface de LLM utilitária.

---

## 7. Múltiplos Progressos

O sistema possui duas métricas de avanço coexistentes:
1. **O Sprint (A Prova):** Ciclos de 10 sessões (N/10) que geram urgência e liberam exames de validação.
2. **A Maratona (O Currículo):** Quando uma matéria possui uma ementa declarada rigidamente (ex: `violao-acordes` tem 6 tópicos), o Card também exibe `(N / 6 Tóp.)`, informando ao aluno que, diferentemente de conversas abstratas, ali existe uma linha de chegada técnica definitiva.
