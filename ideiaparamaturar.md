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

Uma questão central para a evolução da Escola Tiago é como a IA deve "aprender" para ensinar de forma atualizada.

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
Educação Multimodal: Em 2026, o texto não é suficiente. A estrutura da Escola Tiago já prevê widgets (ex: CodeLab, LegalViewer). Recomendo a criação de um "Lab de Simulação", onde o aluno possa testar conceitos de física ou finanças em um ambiente interativo dentro do chat.

2.
Micro-Certificações Dinâmicas: Em vez de certificados estáticos, o sistema poderia gerar "Badges de Competência" baseados no progresso real detectado pela ementa invisível, validados em tempo real pela IA.

3.
Interface de Baixa Fricção: O uso de arquivos .md para ementas é brilhante pela simplicidade. No entanto, para escalar a personalização, esses arquivos poderiam ser transformados em um grafo de conhecimento, permitindo que a IA pule tópicos que o aluno já demonstra domínio em outros hubs.

4.
Soberania de Dados do Aluno: Garantir que o progresso do aluno seja exportável e privado, utilizando a estrutura do Supabase já presente no projeto para criptografia de ponta a ponta.




Este parecer serve como base estratégica para as próximas etapas de desenvolvimento, garantindo que a Escola Tiago não seja apenas uma plataforma de ensino, mas um ecossistema de inteligência atualizado e pertinente ao seu tempo.

