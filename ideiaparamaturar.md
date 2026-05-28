IDEIA PRA MATURAR: A Ideia: "Escola On-Demand"
A plataforma deixa de ter apenas matérias fixas e passa a ser capaz de criar trilhas de estudo personalizadas para qualquer necessidade do usuário. A inteligência do sistema atua como um arquiteto pedagógico que transforma um objetivo vago ou um documento complexo em uma rota de aprendizado estruturada e pronta para ser estudada.

O Fluxo do Usuário (Como acontece)
A Solicitação: O usuário inicia uma conversa ou anexa documentos (como editais, PDFs ou apostilas). Ele diz o que precisa: "Quero estudar para a prova X" ou "Me ensine sobre Y focando apenas no que é avançado".
O Planejamento: Através apenas da conversa (ou da análise dos anexos), a inteligência mapeia o que deve ser aprendido e propõe uma estrutura de curso dividida em fases e tópicos.
O Ajuste: O usuário interage com essa proposta: "Gostei, mas remova o básico e adicione mais exercícios práticos no final". A rota é recalculada até que o usuário esteja satisfeito.
A Ativação: Com um clique, essa rota personalizada é "instalada" no painel do usuário.
O Estudo: O usuário começa a estudar imediatamente. O sistema agora usa essa nova rota personalizada para conduzir as sessões de chat, fazer perguntas e acompanhar o progresso, exatamente como faz nas matérias oficiais.


Viewed captura-ideas:1-12
Edited captura-ideas

Para essa feature ser "Steve Jobs/Jony Ive level", ela não pode parecer um formulário de cadastro. Ela deve ser uma **experiência de co-criação**. 

Aqui está como ela se materializaria na interface:

### 1. O Ponto de Partida: "O Card Vazio"
No Dashboard, ao lado das suas matérias fixas, existe um card com um estilo levemente diferente — talvez com uma borda em degradê animado bem sutil ou um vidro fosco (glassmorphism).
*   **Texto:** `[ + ] Criar Nova Trilha`
*   **Ação:** Ao clicar, o fundo da tela escurece e o "Arquiteto" desliza para o centro.

### 2. A Interface de Criação: "O Blueprint"
Imagine uma tela dividida (ou um chat centralizado que expande):
*   **Esquerda (Chat):** Uma conversa minimalista. O campo de input tem um ícone de clipe (anexos) e um de microfone.
*   **Direita (O Mapa Vivo):** Conforme você fala ou sobe um arquivo, um **Mapa Mental ou Linha do Tempo** começa a ser desenhado em tempo real. Não é um texto estático, são blocos que "nascem" na tela.
    *   Se a IA diz: *"Vou adicionar Fundamentos de SQL"*, um bloco aparece no mapa com um ícone de banco de dados.

### 3. A Interação Direta no Mapa
O usuário não precisa apenas digitar. Ele pode interagir com o "Blueprint":
*   **Remover:** Ele clica num "X" em um tópico do mapa e a IA responde: *"Entendido, removendo esse tópico e ajustando a carga horária dos outros"*.
*   **Reordenar:** Ele arrasta um tópico para depois do outro.

### 4. O Momento da "Materialização"
Quando o usuário está satisfeito, o botão inferior (que estava desabilitado) brilha.
*   **Botão:** `[ Gerar Minha Escola ]`
*   **Efeito Visual:** O mapa que estava sendo desenhado se "contrai" e se transforma no card oficial da matéria, voando direto para a galeria do usuário. 

### 5. Detalhes de Micro-interação (O "Toque Apple")
*   **Feedback de Upload:** Ao soltar um edital (PDF), ele não mostra apenas uma barra de progresso. Ele mostra o documento sendo "escaneado" por uma luz sutil, enquanto a IA comenta: *"Lendo os 45 tópicos do seu edital... estou priorizando os que têm maior peso na prova"*.
*   **Tipografia:** Uso de fontes pesadas e modernas para os títulos e muito espaço em branco para não sobrecarregar o usuário.

---

### Resumo da UI para o Dev:
*"É uma interface de 'Split Screen' ou 'Modal de Foco'. De um lado, um chat de comando; do outro, uma visualização dinâmica (Blueprint) que reflete o que está sendo discutido no chat. O objetivo é que o usuário sinta que está 'esculpindo' o curso dele junto com a IA."*

**O que pode estar impreciso aqui:**
- O comportamento em telas pequenas (mobile) precisa ser bem pensado: talvez o mapa fique "atrás" do chat e você alterne entre eles com um gesto de slide.

**Esse visual "Blueprint" (mapa que cresce enquanto conversa) bate com o que você imaginou?**

Essa é a fase onde separamos um "produto comum" de uma **"plataforma de elite"**. Vamos dissecar essas dúvidas cruciais:

### 1. Tempo Real e Atualização (A IA como "Rastreadora")
Para a IA pegar tudo atualizado em tempo real, ela precisa de **Conectores (Ferramentas de Pesquisa)**. 
- **Como funciona:** Se o usuário diz *"Vou fazer a prova da OAB 2026"*, a IA não deve confiar no que ela "sabe" (que pode estar desatualizado). Ela deve usar uma ferramenta de busca para ler o edital oficial no site da FGV e *então* construir a rota. 
- **O Diferencial:** Isso garante que o usuário nunca estude algo que já saiu do edital. O sistema se torna uma fonte de verdade, não apenas um repositório.

### 2. A Quantidade de Tópicos (20, 50 ou 100?)
A quantidade de tópicos deve ser um **equilíbrio entre a densidade da matéria e a psicologia do usuário**.
- **A Flexibilidade:** A IA pode sim gerar 100 tópicos, mas para a UX não ser esmagadora, ela deve usar **"Agrupamento Dinâmico"**. 
- **Exemplo:** Ela gera 100 itens, mas os organiza em 10 grandes "Fases". Assim, o usuário vê 10 passos à frente, e não 100. A quantidade depende da complexidade do que foi pedido. Se for uma prova de pós-doutorado, terá 200 tópicos; se for um curso de "Como fazer café", terá 5.

### 3. De quem depende a interação: Da Matéria ou do System Prompt?
Aqui está o segredo da arquitetura: **É uma hierarquia.**
1.  **O System Prompt (A Persona):** Ele é o "Professor Socrático". Ele define **COMO** falar (não dar respostas prontas, desafiar o aluno, usar analogias). Isso é universal para todo o sistema.
2.  **O Contexto da Matéria (O Conhecimento):** Ele define **O QUE** falar. Quando a IA gera uma matéria on-demand, ela gera uma "Base de Conhecimento" específica para aquela rota.
- **Conclusão:** A interação é um casamento. O System Prompt dita o comportamento (professor) e a Matéria dita o assunto (Cálculo, Direito, Rust).

---

### Outras Dúvidas Pertinentes para Maturar:

#### **A. Profundidade vs. Superficialidade**
Como evitar que a IA crie uma rota rasa? 
*   **A Maturação:** Precisamos que o sistema force a IA a identificar **"Conceitos de Limiar"** (aqueles que, se você não entender, não entende mais nada adiante). A rota não deve ser apenas uma lista de nomes, mas uma sequência lógica de pré-requisitos.

#### **B. O Filtro do "Eu já sei disso"**
O usuário deve poder fornecer o que ele já sabe antes de gerar a rota.
*   **A Maturação:** Um pequeno "Pre-test" ou uma simples declaração do usuário: *"Já sou programador Sênior, mas quero aprender IA"*. A IA deve "deletar" os tópicos de lógica básica da rota gerada automaticamente.

#### **C. A Validação da Fonte**
Se o usuário anexa um documento, como garantir que a IA não inventou algo (alucinou) que não estava lá?
*   **A Maturação:** O sistema deve permitir que, durante o estudo, o usuário veja de qual página do PDF original aquela explicação foi extraída. Isso gera **confiança extrema** no sistema.

#### **D. A Recalibragem da Rota**
E se no meio do caminho o usuário sentir que a rota está difícil demais?
*   **A Maturação:** A "Escola On-Demand" não pode ser rígida. Deve haver um botão de *"IA, recalibre: este tópico está muito avançado para mim"*. O sistema então gera 3 sub-tópicos de base para ajudar o usuário a subir aquele degrau.

---

**Resumindo para o seu Desenvolvedor:**
*"A inteligência do sistema deve atuar em dois níveis: um nível comportamental fixo (o professor) e um nível de conteúdo dinâmico (a matéria gerada). O sistema precisa ser elástico para suportar desde micro-cursos de 10 minutos até trilhas de meses, sempre baseando a geração em dados reais e atualizados via pesquisa externa ou documentos do usuário."*

**Fez sentido essa distinção entre o "Como falar" e o "O que falar"?**




2. IA Educacional: Ferramentas de Dados vs. API Normal

Uma questão central para a evolução da Ybernator é como a IA deve "aprender" para ensinar de forma atualizada.

Análise Comparativa


Conclusão: Para uma escola que se propõe a ser de vanguarda, a IA deve possuir ferramentas (Tools/Functions) que permitam a busca de dados recentes.

•
API Normal (Conhecimento Estático): É excelente para fundamentos (Lógica, História, Matemática), mas falha miseravelmente em Tecnologia, Geopolítica e tendências de Mercado que mudam semanalmente.

•
IA com Ferramentas de Busca (RAG/Web Search): Permite que o "Professor IA" cite notícias do dia, atualize ementas de programação conforme novas versões de frameworks são lançadas e discuta eventos globais em tempo real.

Recomendação: Implementar uma camada de RAG (Retrieval-Augmented Generation) que consulte os arquivos do projeto (docs/materias.md) e, se necessário, ferramentas de pesquisa externa para validar fatos recentes.




3. Pontos Pertinentes e Observações Estratégicas

Ao analisar o código e a estrutura do projeto, identifiquei pontos que julgo cruciais para o próximo nível da plataforma:

1.
Educação Multimodal: Em 2026, o texto não é suficiente. A estrutura da Ybernator já prevê widgets (ex: CodeLab, LegalViewer). Recomendo a criação de um "Lab de Simulação", onde o aluno possa testar conceitos de física ou finanças em um ambiente interativo dentro do chat.

2.
Micro-Certificações Dinâmicas: Em vez de certificados estáticos, o sistema poderia gerar "Badges de Competência" baseados no progresso real detectado pela ementa invisível, validados em tempo real pela IA.

3.
Interface de Baixa Fricção: O uso de arquivos .md para ementas é brilhante pela simplicidade. No entanto, para escalar a personalização, esses arquivos poderiam ser transformados em um grafo de conhecimento, permitindo que a IA pule tópicos que o aluno já demonstra domínio em outros hubs.

4.
Soberania de Dados do Aluno: Garantir que o progresso do aluno seja exportável e privado, utilizando a estrutura do Supabase já presente no projeto para criptografia de ponta a ponta.




Este parecer serve como base estratégica para as próximas etapas de desenvolvimento, garantindo que a Ybernator não seja apenas uma plataforma de ensino, mas um ecossistema de inteligência atualizado e pertinente ao seu tempo.

O Gráfico de Conhecimento (Knowledge Graph) é o que transforma o seu sistema de um "Chat que responde" em um "Cérebro que entende".

Se você quer vencer as Big Techs, você não compete no processamento (elas têm mais servidores), você compete na especificidade do dado.

1. O que é isso (Explicando para uma criança)
Imagine que o conhecimento do aluno é como um conjunto de Lego.

No Chat comum: O aluno monta um carrinho, depois desmonta e joga as peças numa caixa. No dia seguinte, ele começa do zero. A caixa não sabe que ele já sabe fazer rodas.
No Gráfico de Conhecimento: Cada vez que o aluno aprende algo (ex: "Juros Compostos"), nós pregamos essa peça numa placa na parede. Se amanhã ele for aprender "Investimentos", nós puxamos uma linha de lã ligando o "Investimento" ao "Juros Compostos".
Com o tempo, a parede está cheia de peças conectadas. O sistema não vê apenas "texto", ele vê um Mapa Mental do que está dentro da cabeça do usuário.

2. Como isso funcionaria na prática (Técnico)
Hoje, nossa Sessao.tsx salva mensagens. No Gráfico de Conhecimento, teríamos uma camada extra.

O Fluxo Técnico:

Extração: Ao final de cada sessão, uma função de IA analisa a conversa e diz: "O usuário demonstrou domínio sobre [Conceito A] e [Conceito B]".
Associação: O sistema olha no banco de dados e vê: "[Conceito A] é um pré-requisito para [Conceito C]".
Personalização (O "Fosso"): Na próxima vez que o usuário abrir o app, o buildPrompt.ts vai receber:
"O aluno já domina 80% de Macroeconomia, mas ainda não entende a conexão entre Inflação e Taxa de Juros. Foque nisso."

3. Visualização do Gráfico (Exemplo)
Imagine uma tela no seu app onde o aluno vê isso:

mermaid
graph TD
    A[Juros Compostos] -->|Conecta com| B[Aposentadoria]
    A -->|Base para| C[Análise de Ações]
    D[Inflação] -->|Afeta| A
    E[Psicologia Comportamental] -->|Influencia| B
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style D fill:#dfd,stroke:#333
As bolas brilhantes são o que ele já domina. As cinzas são o que ele ainda vai aprender.

4. Por que isso é "Anti-Big Tech"?
O ChatGPT não sabe quem você é: Ele esquece o que você falou 3 dias atrás ou mistura com outros contextos.
O Gráfico é Privado e Único: É o "Curriculum Vitae" intelectual do usuário. Se ele sair da sua plataforma, ele perde o mapa do próprio cérebro. Isso gera retenção.
Boas Práticas (Onde o "Professor" te orienta):
Fazer isso manualmente no banco de dados (SQL puro) é um pesadelo. A dica técnica: Use uma estrutura de JSONB no seu banco atual ou uma tabela de conhecimentos_adquiridos que ligue o user_id a um id_do_topico_da_ementa.

O que pode estar impreciso aqui e por quê:

A complexidade: Implementar um Gráfico de Conhecimento real (com bancos de dados de grafos como Neo4j) é caro e complexo. No começo, recomendo simular isso usando metadados simples no seu banco de dados atual.
Quer que eu tente rascunhar como seria a estrutura de dados (uma nova tabela ou campo) para começarmos a "marcar" o que o aluno aprendeu? Isso daria um "tapa" de maturidade brutal no projeto.

8:07 PM

Viewed MateriaDetailModal.tsx:586-610

Imagine que você está sentado em uma cafeteria com um amigo que entende muito sobre um assunto difícil. Para te explicar, ele pega um guardanapo de papel, tira uma caneta do bolso e começa a conversar com você. 

Enquanto ele fala com aquela voz calma e próxima, ele vai rabiscando esquemas, desenhando balões de pensamento e conectando ideias com flechas bem na sua frente.

Essa é a essência dessa ideia. Ela une duas forças poderosas para o aprendizado humano:

### 1. O Ritmo do Desenho (Prender a Atenção)
Quando você vê um desenho aparecendo linha por linha na tela, seus olhos seguem naturalmente a ponta da caneta. O cérebro humano adora movimento e mistério. Você não vê uma imagem pronta de uma vez; você acompanha a criação dela. Isso gera uma gostosa sensação de curiosidade: *"O que essa linha vai virar?"*. Esse suspense sutil impede que sua mente se distraia ou fique com sono.

### 2. A Voz do Tutor (Trazer Conexão)
A voz não parece uma leitura de um livro de regras. Ela é natural, tem pausas para respirar, muda de entonação quando fala algo importante e parece falar diretamente com você. Ela dá o contexto emocional e o ritmo para o que está sendo ilustrado.

### 3. A Sincronia Perfeita (Dupla Gravação no Cérebro)
A mágica acontece quando o som e o traço se encontram. No exato milésimo de segundo em que o tutor diz a palavra *"Conectados"*, a caneta desenha uma linha unindo dois corações ou duas engrenagens. 

A psicologia explica que isso ativa a **Teoria da Dupla Codificação** (proposta pelo psicólogo Allan Paivio em 1971). Em termos simples: seu cérebro cria duas gavetas para a mesma informação — uma gaveta para o som que você ouviu e outra para a imagem que você viu sendo desenhada. Se no futuro você esquecer o som, a imagem no guardanapo mental te ajuda a lembrar de tudo.

---

### O que pode estar impreciso aqui e por quê?

*   **Universalidade do Aprendizado:** Embora a teoria da dupla codificação de Allan Paivio (1971) seja cientificamente reconhecida e mostre que a associação visual-auditiva melhora a retenção na maioria das pessoas, o nível de eficácia exato varia de indivíduo para indivíduo (alguns alunos assimilam muito melhor apenas ouvindo, enquanto outros necessitam de escrita ativa própria e não apenas de observação passiva do desenho alheio).

Vou montar isso como uma jornada — o aluno do primeiro acesso até meses depois.

---

# A Experiência do Aluno na Ybernator

---

## Dia 1 — Primeiro Acesso

O aluno abre a plataforma. Não cai numa lista de matérias. Cai numa pergunta simples:

> *"O que você quer aprender ou conquistar?"*

Ele digita ou fala: *"Quero passar no concurso da Receita Federal."*

A plataforma responde como um professor que acabou de sentar na mesa com ele. Faz duas ou três perguntas rápidas:

- *"Você já estudou algo sobre isso antes?"*
- *"Tem uma data de prova em mente?"*
- *"Prefere estudar mais teoria ou exercícios?"*

Enquanto ele responde, do lado direito da tela um mapa começa a se formar — blocos aparecendo um a um, como se alguém estivesse montando um quebra-cabeça na sua frente. Cada bloco é um módulo do curso dele.

Ao final, o aluno vê algo assim:

```
Fase 1 — Base (3 semanas)
Fase 2 — Raciocínio Lógico (2 semanas)  
Fase 3 — Direito Tributário (4 semanas)
Fase 4 — Simulados (2 semanas)
```

Ele pode arrastar, remover, pedir pra IA ajustar. Quando estiver satisfeito, clica num botão. O mapa "voa" para o painel dele e vira o curso dele.

---

## Dia 2 em diante — Estudando

Ele abre a primeira aula. Não é um vídeo gravado. É uma conversa ao vivo com o professor IA.

Três modos disponíveis:

**Modo Leitura + Desenho**
O professor explica o conceito enquanto um quadro branco ao lado vai sendo preenchido — texto aparecendo palavra por palavra, diagramas sendo desenhados em tempo real. Como aqueles vídeos do YouTube, mas gerado na hora, pra aquele conteúdo específico.

**Modo Voz**
O aluno fala, o professor responde falando. Como uma ligação. Pode interromper, pode perguntar no meio, pode pedir pra repetir mais devagar.

**Modo Chat**
Texto simples, pra quem prefere ler e escrever.

---

## Durante a Aula — Como o Professor Age

O professor não entrega resposta pronta. Ele pergunta primeiro.

> Aluno: *"Não entendi o que é fato gerador."*
> 
> Professor: *"Me diz uma coisa — quando você compra algo numa loja, o que acontece que obriga você a pagar imposto? Tenta me explicar com suas palavras."*

Se o aluno acerta, o professor avança. Se erra, o professor não corrige direto — dá uma pista, uma analogia, um exemplo do cotidiano.

Isso não é estilo — é arquitetura. O sistema foi construído pra nunca entregar a resposta antes do aluno tentar.

---

## Semanas depois — A Plataforma Já Te Conhece

Aqui acontece algo que nenhuma plataforma comum faz.

O sistema foi marcando silenciosamente o que o aluno demonstrou que sabe. Não pelo que ele disse que sabe — pelo que ele mostrou nas respostas.

Quando ele abre uma nova sessão, o professor já sabe:

> *"Esse aluno domina lógica básica, mas trava em questões de sequência. Começa por aí."*

O aluno não precisa repetir o que já aprendeu. O curso se ajusta sozinho.

Se ele travar num tópico difícil, pode clicar em **"Tá difícil demais"** — e o sistema quebra aquele bloco em três menores, mais simples, antes de voltar ao original.

---

## O Que o Aluno Nunca Vê

- Nenhuma lista de vídeos pra assistir passivamente
- Nenhum PDF de 80 páginas jogado na tela
- Nenhum quiz genérico de múltipla escolha no final

---

## Resumo Visual da Jornada

```
Chega sem saber o que quer
        ↓
Conversa com a IA → curso montado na hora
        ↓
Estuda por voz, desenho ou chat
        ↓
Professor nunca entrega — sempre provoca
        ↓
Plataforma aprende o que ele sabe
        ↓
Curso se ajusta sozinho com o tempo
```

---

## BACKLOG DE IMPLEMENTAÇÃO: Player de Roteiro Dinâmico (Animações Interativas)

Este item do backlog descreve a especificação técnica para implementar animações no estilo "motion graphics" (estilo vídeos explicativos do YouTube) no chat de estudos, de forma barata, rápida e interativa.

### 📋 Especificação Técnica

#### 1. O Protocolo de Transmissão (Edge Function / Gemini)
A Edge Function `/chat` (Gemini API) será instruída (via `systemPrompt`) a emitir uma tag especial `<animation>` contendo a especificação JSON da animação quando um conceito requerer explicação visual.

Exemplo de formato de saída da IA:
```xml
Aqui está como a divisão de uma célula funciona na prática:
<animation>
{
  "tema": "divisao-celular",
  "estilo": "dark-glassmorphism",
  "passos": [
    {
      "tempo": 0,
      "audio_texto": "Esta é a célula mãe em repouso.",
      "animacao": { "tipo": "criar", "objeto": "celula_mae", "forma": "circulo", "posicao": "centro", "cor": "emerald" }
    },
    {
      "tempo": 5,
      "audio_texto": "O núcleo começa a se duplicar e os polos se separam.",
      "animacao": { "tipo": "dividir_nucleo", "objeto": "celula_mae", "duracao": 3000 }
    },
    {
      "tempo": 10,
      "audio_texto": "Finalmente, a membrana se rompe, gerando duas células filhas idênticas.",
      "animacao": { "tipo": "separar_total", "duracao": 2000 }
    }
  ]
}
</animation>
<chips>Entendi|Ficou alguma dúvida?|Quero ver de novo</chips>
```

#### 2. O Frontend (`VisualExplainerPlayer.tsx`)
Criar um novo componente no frontend para ler e interpretar o JSON acima.
* **Tecnologia:** React + Framer Motion (para transições físicas fluidas a 60fps) + Lucide Icons + Tailwind.
* **Componente de Sandbox:** Utilizar `react-runner` encapsulado em um `iframe` seguro com o atributo `sandbox="allow-scripts"` para renderizar o player de forma isolada, protegendo a sessão do usuário.
* **Sincronização de Áudio:** O player consome a Web Speech API local (gratuita) ou a API da ElevenLabs para sintetizar e sincronizar a voz do tutor com os passos da animação.

---

### 🛠️ Tarefas do Backlog (Prontas para o Sprint)

#### [TASK-01] Especificação do Prompt do Professor (`src/lib/buildPrompt.ts`)
*   **Descrição:** Atualizar o `systemPrompt` para ensinar a IA a formatar e injetar a tag `<animation>` apenas quando explicar processos mecânicos, fluxos ou códigos.
*   **Critério de Aceitação:** A IA não deve inventar tags inválidas ou quebrar o JSON sob risco de erro de renderização.

#### [TASK-02] Criação do Componente Player de Animação (`src/components/VisualExplainerPlayer.tsx`)
*   **Descrição:** Criar a UI do player (com controles de play, pause, progresso e volume). Deve seguir o design system (glassmorphism escuro, gradientes suaves, tipografia Outfit/Inter).
*   **Critério de Aceitação:** O player deve ler o JSON da tag `<animation>` e renderizar os elementos gráficos com transições suaves (Framer Motion).

#### [TASK-03] Integração no Chat (`src/components/FloatingChatWidget.tsx` / `Sessao.tsx`)
*   **Descrição:** Configurar a renderização condicional do chat. Quando uma mensagem contiver `<animation>`, o player deve ser renderizado ao lado ou substituindo o histórico no momento da explicação.
*   **Critério de Aceitação:** Transição suave entre o modo texto e o modo visual do player.

#### [TASK-04] Canal de Voz Sincronizado (Web Speech & ElevenLabs)
*   **Descrição:** Implementar o player de áudio integrado que narra o campo `audio_texto` de cada passo no tempo (`tempo`) exato da animação.
*   **Critério de Aceitação:** O áudio e a movimentação das imagens devem estar em perfeita harmonia (dupla codificação).

---

**O que pode estar impreciso aqui e por quê:**
*   **Gargalo de Token:** Adicionar especificações de JSON complexas ao output do Gemini consome mais tokens de saída, o que aumenta a latência de geração do chat. É preciso monitorar se o tempo de resposta inicial da Edge Function `/chat` não aumentará muito.