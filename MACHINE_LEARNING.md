# Estratégia de Machine Learning — Escola Tiago

Este documento detalha as decisões técnicas, a arquitetura e o roadmap para a implementação de Machine Learning (ML) no projeto.

## 1. Filosofia: Heurística vs. Machine Learning

Atualmente, o sistema utiliza **Heurísticas** (regras manuais inteligentes em Typescript). O ML real será implementado apenas quando houver dados suficientes para justificar a complexidade.

- **Fase Atual (Data Collection):** Foco em coletar metadados de comportamento (tempo de resposta, taxa de erro, engajamento).
- **Fase Futura (Inference):** Transição de regras estáticas para um modelo preditivo dinâmico.

## 2. Otimização para TDAH (O Diferencial)

O objetivo principal do ML na Escola Tiago não é apenas ensinar o conteúdo, mas gerenciar o **estímulo dopaminérgico** do aluno através do conceito **INCUP** (Interesse, Novidade, Desafio, Urgência e Paixão).

- **Interrupção Estratégica:** O modelo deve aprender o "ponto de fadiga" do aluno e interromper o fluxo teórico com desafios antes que o foco se perca.
- **Detecção de Autopiloto:** Identificar padrões de resposta que indicam falta de absorção e forçar uma quebra de padrão (Pattern Interrupt).

## 3. Arquitetura Técnica Proposta

O ML não rodará dentro do frontend ou das Edge Functions atuais devido a limitações de performance e ecossistema.

### Stack Recomendada:
- **Linguagem:** Python (O padrão da indústria para Ciência de Dados).
- **Bibliotecas:** Pandas (Tratamento), Scikit-Learn / PyTorch (Modelagem).
- **Bridge API:** FastAPI (Para servir o modelo via HTTP).
- **Database:** Supabase (PostgreSQL) servindo como fonte de dados para treinamento.

### Fluxo de Dados:
1. **Frontend (React):** Captura o tempo entre a mensagem da IA e a resposta do aluno.
2. **Backend (Edge Functions):** Salva esse tempo e o "sentimento" da resposta no Supabase.
3. **ML Service (Python):** Consome os logs do Supabase, treina o modelo e expõe um endpoint de "estratégia".
4. **Prompt Engine:** O `buildPrompt.ts` consulta o serviço de ML para decidir *como* o professor deve se comportar na sessão atual.

## 4. Roadmap de Implementação

- [ ] **Step 1:** Adicionar coluna `metadata_json` na tabela `chat_messages` para rastrear tempo de resposta.
- [ ] **Step 2:** Acumular dados de pelo menos 100 sessões completas.
- [ ] **Step 3:** Criar o repositório `escola-tiago-ml` (Python) para análise exploratória.
- [ ] **Step 4:** Implementar modelo de classificação de engajamento.
- [ ] **Step 5:** Integrar a API de ML no fluxo do `buildPrompt.ts`.

---

**Nota:** Machine Learning sem dados é apenas adivinhação computacional. Até o Step 2 ser concluído, manteremos a inteligência via Heurísticas no Prompt.
