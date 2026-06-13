import { MateriaConfig } from '@/types';

export const comunicacaoInfluencia: MateriaConfig = {
  slug: 'dinamicas-comunicacao',
  nome: 'Communication & Language',
  emoji: '🍷',
  isCategory: true,
  descricao: 'Persuade, write, speak, and think clearly. Mastering language is the greatest multiplier of human influence.',
  children: [
    // ── SUB-HUB 1: INFLUÊNCIA & PERSUASÃO ──────────────────────────────
    {
      slug: 'influencia-persuasao',
      nome: 'Influence & Persuasion',
      emoji: '🎭',
      isCategory: true,
      parent: 'dinamicas-comunicacao',
      whyStart: 'Everything else — writing, languages, public speaking — is amplified or canceled by your ability to influence live. Start with the engine.',
      descricao: 'Rhetoric, negotiation, public speaking, and high-impact social dynamics.',
      children: [
        {
          slug: 'retorica',
          nome: 'Rhetoric & Argumentation',
          emoji: '⚖️',
          parent: 'influencia-persuasao',
          layout: 'split',
          widget: 'ArgumentMap',
          whyStart: 'The grammar of all persuasive discourse. Before negotiating, seducing, or speaking in public, you need to understand how arguments are constructed and dismantled.',
          descricao: 'The art of constructing, deconstructing, and defending arguments with rigor and impact.',
          contexto: `Focus: real argumentative structure — premises, conclusions, hidden assumptions, and persuasion.

Mandatory approach:
- Explain the logical structure of each type of argument before analyzing real examples.
- For rhetorical fallacies: explain the mechanism by which they deceive before asking for identification.
- Clearly differentiate rhetoric (persuasion) from formal logic (validity).
- Each technique must be shown with a real example: a famous speech, public debate, or negotiation.`,
          fases: [
            {
              nome: 'Phase 1: Foundations — The Anatomy of the Argument',
              topicos: [
                'Anatomia de um Argumento: Premissa, Conclusão e Inferência',
                'O Triângulo de Aristóteles: Ethos, Pathos e Logos',
                'Argumento Dedutivo vs Indutivo: Validade e Solidez',
                'O Ônus da Prova: Quem Afirma é Quem Deve Provar',
                'Pressupostos Ocultos: O Que Não É Dito Mas Determina Tudo',
                'Concessão Estratégica: Admitir um Ponto Fraco para Ganhar Credibilidade',
                'Estrutura Clássica: Tese, Antítese e Síntese',
                'A Regra de Três: Por Que 3 Pontos São Mais Memoráveis Que 5',
                'Analogias Poderosas: Explicar o Complexo Pelo Simples',
                'O Teste da Navalha de Occam no Argumento Persuasivo'
              ]
            },
            {
              nome: 'Phase 2: Fallacies and Logical Traps',
              topicos: [
                'Ad Hominem: Atacar a Pessoa em Vez do Argumento',
                'Hombre de Paja (Straw Man): Distorcer Para Destruir Mais Fácil',
                'Apelo à Autoridade Indevida: Quando "Especialista" Não Basta',
                'Falsa Dicotomia: A Armadilha do "Ou A ou B"',
                'Escorregão Escorregadio (Slippery Slope): A Catástrofe Imaginária',
                'Apelo à Maioria (Ad Populum): "Todos Fazem Isso"',
                'Post Hoc Ergo Propter Hoc: Confusão de Correlação e Causalidade',
                'Apelo à Ignorância: "Não Foi Provado que É Falso, Logo É Verdade"',
                'Generalização Apressada: Conclusão Grande a Partir de Amostra Pequena',
                'Técnica do Espantalho vs Steel Man: Desmontando e Fortalecendo'
              ]
            },
            {
              nome: 'Phase 3: Applied Persuasion and Framing',
              topicos: [
                'Framing: O Mesmo Fato, Duas Histórias Completamente Diferentes',
                'Priming: Como a Exposição Anterior Altera o Julgamento',
                'Reciprocidade e Compromisso (Cialdini) na Argumentação',
                'Storytelling Argumentativo: Narrativa Como Veículo de Prova',
                'Retórica de Liderança: Estrutura de Discurso de CEO e Político',
                'Retórica de Crise: Comunicar em Situações de Risco Alto',
                'Apelo à Consequência: Mostrar o Que Acontece Se Ninguém Agir',
                'Silêncio Estratégico: O Poder de Não Responder Imediatamente',
                'Refutação ABC: Acknowledge → Bridge → Counter',
                'Fechamento de Argumento: A Última Frase é a Que Fica'
              ]
            },
            {
              nome: 'Phase 4: Advanced Rhetoric and Debate',
              topicos: [
                'Retórica Socrática: Perguntar Até o Outro Se Contradizer',
                'A Arte da Pergunta: Tipos, Timing e Intenção',
                'Dialética: O Debate Como Método de Descoberta da Verdade',
                'Debate Estruturado: Regras, Papéis e Estratégias',
                'Debate Produtivo: Como Discordar Sem Destruir a Relação',
                'Retórica Digital: Argumentar em Threads, Posts e Vídeos',
                'Pensamento Crítico: Desconstruindo Narrativas Midiáticas',
                'Comunicação Intercultural: Adaptando Argumentos ao Contexto',
                'Retórica em Redes Sociais: Viralidade e Persuasão Algorítmica',
                'Lógica Informal e Heurísticas de Julgamento no Cotidiano'
              ]
            }
          ]
        },
        {
          slug: 'negociacao',
          nome: 'Negotiation',
          emoji: '🤝',
          parent: 'influencia-persuasao',
          layout: 'split',
          widget: 'NegotiationBoard',
          whyStart: 'With rhetoric as a base, you apply persuasion where there is a real conflict of interest.',
          descricao: 'Principles and tactics of negotiation based on Harvard, FBI, and game theory.',
          contexto: `Focus: mechanisms of mutual influence — what generates agreement, what generates deadlock, and why.

Mandatory approach:
- Explain the structural principle before any tactic.
- For BATNA and agreement zone: teach the mechanics of power before applying to scenarios.
- Differentiate distributive from integrative negotiation by mechanism.`,
          fases: [
            {
              nome: 'Phase 1: Foundations of Negotiation',
              topicos: [
                'O Framework de Harvard (Fisher & Ury): 4 Princípios',
                'BATNA: Sua Alternativa Determina Seu Poder Real na Mesa',
                'ZOPA: Zona de Possível Acordo e Como Calculá-la',
                'Negociação Distributiva vs Integrativa: Diferença de Mecanismo',
                'Ancoragem: A Primeira Oferta Como Âncora Mental',
                'Escuta Tática: A Técnica do FBI (Chris Voss)',
                'Espelhamento e Validação Emocional na Negociação',
                'Comunicação Não-Violenta (CNV) de Marshall Rosenberg',
                'Poder, Tempo e Informação: Os 3 Pilares Ocultos',
                'O Mapa de Interesses vs Posições: O Que Você Quer vs O Que Você Diz'
              ]
            },
            {
              nome: 'Phase 2: Tactics and Psychology',
              topicos: [
                'A Psicologia das Concessões: Quando e Como Ceder',
                'Tática do "Homem Mau": Dividir a Autoridade Para Ganhar Espaço',
                'Deadline Real vs Falso: Usando o Tempo Como Arma',
                'Blefe e Credibilidade: Quando Blefar Destrói Seu Poder',
                'Coalização e Negociação em Grupos: Quórum e Isolamento',
                'Tática do Deadlock: Quando Parar de Negociar é a Melhor Jogada',
                'Gestão de Conflitos em Times: Facilitação Estruturada',
                'Assimetria de Informação: Quem Sabe Mais Controla Mais',
                'Negociação Multicultural: Diferenças Estruturais (EUA vs Japão vs Brasil)',
                'Neutralizando Táticas Antiéticas do Outro Lado'
              ]
            },
            {
              nome: 'Phase 3: Applied Negotiation by Scenario',
              topicos: [
                'Negociação Salarial: Script Completo e Psicologia do Recrutador',
                'Negociação de Contratos de Serviço (B2B e Freelance)',
                'Negociação por E-mail e Texto: Diferenças Chave do Presencial',
                'Negociação de Alto Risco: Reféns, Crises e Gestão de Pânico',
                'Negociação de Partnerships e M&A: A Mesa Complexa',
                'Mediação e Arbitragem Como Alternativa ao Deadlock',
                'Negociação com IA: Usando Modelos para Simular Cenários',
                'Negociação Salarial para Tech e Startups: Stock Options e Equity',
                'A Arte da Saída: Como Encerrar Negociações Mantendo Relacionamentos',
                'Teoria dos Jogos Básica: Nash, Dilema do Prisioneiro e Cooperação'
              ]
            }
          ]
        },
        {
          slug: 'oratoria',
          nome: 'Public Speaking & Presentation',
          emoji: '🎤',
          parent: 'influencia-persuasao',
          whyStart: 'You already know how to build arguments and negotiate. Now scale that to an audience. Public speaking is persuasion in performance.',
          descricao: 'Attention triggers, storytelling, stage presence, and video communication.',
          contexto: `Focus: mechanisms of attention and oral persuasion — structure, rhythm, presence.

Mandatory approach:
- Explain why a certain technique works before asking the student to apply it.
- For narrative structure: explain the attention mechanism it sustains.`,
          fases: [
            {
              nome: 'Phase 1: Physiological and Mental Foundations',
              topicos: [
                'A Neurociência do Medo de Falar em Público (Cortisol vs Testosterona)',
                'Regulação Fisiológica do Nervosinmo: Respiração, Postura e Voz',
                'Presença: O Que É e Como Se Constrói (Amy Cuddy e Além)',
                'Contato Visual: Duração, Distribuição e Intenção',
                'Modulação de Voz: Ritmo, Pausas, Volume e Tonalidade',
                'Linguagem Corporal de Palco: Gestos, Espaço e Movimento',
                'O Hook: Como Prender a Atenção nos Primeiros 30 Segundos',
                'Gerenciando Perguntas Difíceis e Interrupções',
                'Lendo a Audiência: Sinais de Engajamento e Perda de Atenção',
                'Análise de Grandes Oradores: Obama, Jobs, Churchill'
              ]
            },
            {
              nome: 'Phase 2: Narrative Structure and Content',
              topicos: [
                'A Jornada do Herói Aplicada a Apresentações',
                'O Método TED: 18 Minutos e Uma Ideia Vale Espalhando',
                'Estrutura de Pitch de Negócios: Problema → Solução → Tração → Ask',
                'Storytelling e Emoção: Por Que Histórias Vencem Dados',
                'A Regra de 3: Estruturas Que o Cérebro Retém',
                'Slide Design para Impacto: Menos É Mais (Princípio Garr Reynolds)',
                'Apresentações para Diferentes Audiências: C-Level, Time e Investidor',
                'Humor na Oratória: Quando e Como Usar Sem Parecer Forçado',
                'Citações e Dados: Como Usar Para Credibilidade Sem Entediar',
                'Fechamento Poderoso: A Última Frase Define o Que Fica'
              ]
            },
            {
              nome: 'Phase 3: Digital and Advanced Formats',
              topicos: [
                'Apresentações Virtuais: Câmera, Luz, Energia e Engajamento Online',
                'Podcast: Estrutura, Ritmo e Como Manter a Voz por Horas',
                'YouTube e Vídeo: Roteiro, Corte Dinâmico e Retenção de Audiência',
                'Live Streaming: Engajando Audiência em Tempo Real com Chat Ativo',
                'Improviso Estruturado: Como Falar Bem Sem Roteiro (Método UCB)',
                'Debate Ao Vivo e Agilidade Verbal Sob Pressão',
                'Retórica de Liderança: Falar Como CEO em Situações de Crise',
                'Oratória Intercultural: Adaptando Tom e Estrutura para Diferentes Culturas',
                'Retrospecto e Feedback de Apresentações: Método de Análise Pós-Palco',
                'Usando IA para Estruturar, Roteirizar e Revisar Apresentações'
              ]
            }
          ]
        }
      ]
    },

    // ── SUB-HUB 2: ESCRITA & PENSAMENTO ──────────────────────────────────
    {
      slug: 'escrita-pensamento',
      nome: 'Writing & Structured Thinking',
      emoji: '✍️',
      isCategory: true,
      parent: 'dinamicas-comunicacao',
      whyStart: 'Writing well is thinking well externalized. Writing and mental frameworks are the most underestimated tools of those who produce ideas.',
      descricao: 'Professional writing, argumentative clarity, and high-impact thinking frameworks.',
      children: [
        {
          slug: 'escrita-clara',
          nome: 'Clear & Persuasive Writing',
          emoji: '📝',
          parent: 'escrita-pensamento',
          whyStart: 'If you cannot explain something in writing simply, you do not really understand it. Writing is the stress test of thinking.',
          descricao: 'Principles of clarity, conciseness, and impact in professional and persuasive writing.',
          contexto: `Focus: writing as a tool of thought and influence — emails, documents, threads, proposals, copy.

Mandatory approach:
- Each concept needs a before/after example (bad phrase vs re-written phrase).
- Do not teach school grammar. Teach principles of clarity used by professional writers.
- References: William Zinsser (On Writing Well), George Orwell (Politics and the English Language), Steven Pinker (The Sense of Style).`,
          fases: [
            {
              nome: 'Phase 1: Foundations of Clarity',
              topicos: [
                'A Maldição do Conhecimento: Por Que Especialistas Escrevem Mal',
                'A Regra de Ouro de Orwell: 6 Princípios Para Nunca Escrever Mal',
                'Voz Ativa vs Voz Passiva: Quando e Por Que Cada Uma Funciona',
                'Eliminar Palavras Mortas: Advérbios, Jargão e Enchimento Vazio',
                'A Frase Curta: Ritmo, Impacto e Como o Cérebro Processa Texto',
                'Parágrafos Como Unidades de Pensamento (Uma Ideia = Um Parágrafo)',
                'Carga Cognitiva na Leitura: O Esforço do Leitor É Seu Problema',
                'O Teste da Avó: Se Ela Não Entenderia, Simplifique Imediatamente',
                'Vocabulário Preciso: Evitando Ambiguidade e Jargões Vazios',
                'Editar é Reescrever: O Draft Zero Nunca é o Final'
              ]
            },
            {
              nome: 'Phase 2: Structure and Text Architecture',
              topicos: [
                'A Pirâmide de Minto: BLUF — Conclusão Primeiro, Sempre',
                'Lead & Hook: Como Prender o Leitor na Primeira Frase',
                'Escaneabilidade: Tópicos, Subtítulos e Hierarquia Visual',
                'Arquitetura de Informação em Textos Longos (Relatórios e Propostas)',
                'O Princípio da Síntese: Escrever Menos Para Dizer Mais',
                'Como Estruturar E-mails que São Lidos e Respondidos',
                'Escrita Assíncrona: Regras de Ouro Para Trabalho Remoto e Distribuído',
                'Escrevendo "One-Pagers" Para Tomada de Decisão (Modelo Amazon)',
                'Como Documentar Processos e Decisões de Forma Eficaz e Duradoura',
                'Voz e Tom Profissional: Autoridade Sem Arrogância'
              ]
            },
            {
              nome: 'Phase 3: Persuasive Writing and Copywriting',
              topicos: [
                'Escrita Persuasiva AIDA: Atenção, Interesse, Desejo, Ação',
                'Copywriting vs Escrita Informativa: Quando Vender e Quando Educar',
                'A Carta de Vendas: Estrutura Clássica Que Ainda Funciona',
                'Email Marketing: Linha de Assunto, Abertura e CTA Irresistível',
                'Thread Writing: Como Estruturar Argumentos em Formato Digital',
                'Storytelling Escrito: Narrativa Como Veículo de Persuasão',
                'Tone of Voice: Como Adaptar Registro Sem Perder Autenticidade',
                'Gatilhos Emocionais na Escrita: Urgência, Escassez e Identidade',
                'Como Fornecer Feedback Difícil Por Escrito Sem Destruir Relações',
                'Revisão Extrema: Como Cortar 30% do Texto Sem Perder Sentido'
              ]
            },
            {
              nome: 'Phase 4: Writing in the Digital Era and AI',
              topicos: [
                'Escrita Para SEO: Estrutura, Palavras-Chave e Intenção de Busca',
                'Roteiro Para Vídeo e Podcast: Diferenças do Texto para Fala',
                'Escrita de Newsletter: Consistência, Voz e Retenção de Assinantes',
                'Como Usar IA Como Editor (Sem Perder Autenticidade e Voz Própria)',
                'Prompt Engineering Para Escrita: Como Solicitar e Iterar com IA',
                'O Mito do "Bloqueio Criativo" e Como Escrever Todo Dia Com Sistema',
                'Construindo um Corpo de Trabalho Escrito (Personal Canon)',
                'Ghostwriting: Escrever na Voz de Outra Pessoa Com Qualidade',
                'Escrita Técnica: Documentação, APIs e Guias de Usuário',
                'Publicar ou Não Publicar: Critérios Para Decidir o Que Vale a Exposição'
              ]
            }
          ]
        },
        {
          slug: 'pensamento-estruturado',
          nome: 'Thinking Frameworks',
          emoji: '🧩',
          parent: 'escrita-pensamento',
          whyStart: 'You have too much information and too little structure. Frameworks transform mental chaos into operational clarity — and determine the quality of what you write and decide.',
          descricao: 'Mental models and frameworks to organize thought, make decisions, and solve complex problems.',
          contexto: `Focus: practical mental models that a professional applies day-to-day to think with more rigor.

Mandatory approach:
- Each framework needs a real application scenario (business, career, personal life).
- Do not list mental models as a catalog. Teach when and why to use each one.`,
          fases: [
            {
              nome: 'Phase 1: First-Order Thinking',
              topicos: [
                'First Principles Thinking: Desmontar Até o Fundamento Irredutível',
                'Inversão (Charlie Munger): Pensar Pelo Avesso Para Evitar Erros',
                'A Matriz de Eisenhower: Urgente vs Importante (E Como Não Confundir)',
                'Mapas de Causa e Efeito: Encontrar a Raiz Real do Problema',
                'MECE (McKinsey): Mutuamente Exclusivo, Coletivamente Exaustivo',
                'O Princípio de Pareto (80/20) Aplicado com Rigor e Honestidade',
                'Pensamento de Sistema vs Pensamento Linear: A Diferença Crítica',
                'O Dilema do Boneco de Palha vs Steel Man: Como Pensar Sobre o Oponente',
                'Occam\'s Razor: Simplicidade Como Virtude Epistêmica',
                'O Mapa Não é o Território: Modelos São Úteis, Não Verdadeiros'
              ]
            },
            {
              nome: 'Phase 2: Second-Order and Systems Thinking',
              topicos: [
                'Pensamento de Segunda Ordem: "E Depois Disso, O Que Acontece?"',
                'Loops de Feedback: Reforço Positivo e Negativo em Sistemas Complexos',
                'Teoria dos Constrangimentos (Goldratt): O Gargalo Define o Fluxo',
                'Pensamento Probabilístico: Substituir Certezas por Distribuições',
                'Árvores de Decisão: Mapear Cenários com Probabilidades e Payoffs Reais',
                'Pré-Mortem: Imaginar o Fracasso Para Preveni-lo Antes de Começar',
                'O Framework de Bezos: Decisões Tipo 1 (Irreversíveis) vs Tipo 2 (Reversíveis)',
                'Regret Minimization Framework: O Que Você Lamentaria aos 80?',
                'Teoria da Complexidade: Sistemas Caóticos vs Complicados',
                'Black Swan Thinking (Nassim Taleb): Preparar Para o Improvável'
              ]
            },
            {
              nome: 'Phase 3: Decision Frameworks and Stakeholders',
              topicos: [
                'Mapa de Stakeholders: Quem Ganha, Quem Perde, Quem Decide',
                'Análise SWOT com Rigor: Além do Quadrantinho da Faculdade',
                'Framework ICE: Impact, Confidence, Ease Para Priorização',
                'Custos Afundados (Sunk Cost): O Viés Que Mais Destrói Empresas',
                'O Princípio da Oportunidade: Todo Sim é um Não Para Outra Coisa',
                'Framework de Avaliação de Risco: Probabilidade × Impacto',
                'A Estrutura de Minhas e Suas Premissas: Que Premissas Sustentam Esta Crença?',
                'Análise de Consequências de Segunda e Terceira Ordem',
                'Checklist de Munger: 25 Cognitive Biases Que Destroem Decisões',
                'Tomada de Decisão em Ambiguidade: Heurísticas Para Quando os Dados Faltam'
              ]
            },
            {
              nome: 'Phase 4: Creative Thinking and Synthesis',
              topicos: [
                'Design Thinking: Empatia → Definição → Ideação → Prototipagem → Teste',
                'Brainstorming Com Rigor: Técnicas Para Gerar Ideias Não-Óbvias',
                'SCAMPER: 7 Operações Para Inovar a Partir do Existente',
                'Mapas Mentais: Quando Usar e Quando São Enrolação Visual',
                'Vídeo de Resumo: A Habilidade de Juntar Peças em Uma Narrativa Coerente',
                'Aprendizado Acelerado (Ultralearning): Princípios de Scott Young',
                'A Mente do Iniciante (Shoshin): Desinicializar Para Enxergar Mais',
                'Pensamento Lateral de De Bono: Os 6 Chapéus do Pensamento',
                'Zooming In vs Zooming Out: Quando Detalhar e Quando Elevar',
                'Como Construir Seu Próprio Sistema de Pensamento Pessoal'
              ]
            }
          ]
        }
      ]
    },

    // ── SUB-HUB 3: IDIOMAS ────────────────────────────────────────────────
    {
      slug: 'idiomas-escrita',
      nome: 'Languages',
      emoji: '🌐',
      isCategory: true,
      parent: 'dinamicas-comunicacao',
      whyStart: 'Languages are portals. Each language you master multiplies the universe of ideas, people, and markets you can access.',
      descricao: 'English, Spanish, and French with progressive immersion by real fluency phases.',
      children: [
        {
          slug: 'ingles',
          nome: 'English',
          emoji: 'EN',
          parent: 'idiomas-escrita',
          layout: 'split',
          widget: 'FlashcardDeck',
          whyStart: 'The mandatory global language. English is not optional — it is the passport to 90% of technical knowledge and digital opportunities.',
          descricao: 'From A1 to C2: progressive immersion with a focus on real language production.',
          contexto: `All dynamics will be a simulation of real communication by text.

Abordagem obrigatória:
- Do NOT teach grammar rules.
- Simulate an immersive dialogue with the student, as if chatting day-to-day.
- Correct mistakes subtly by rephrasing the sentence correctly, without grammar classes.
- The student's native language is portugues BR.`,
          fases: [
            {
              nome: 'Phase 1 — A1 Level: Absolute Bases',
              topicos: [
                'Greetings & Introductions: Me, Myself and I',
                'O Verbo To Be: Além do "Sou/Estou" (Identidade, Descrição, Localização)',
                'Simple Present: Rotina, Hábitos e Fatos Universais',
                'Números, Horas e Dinheiro: O Inglês Prático do Dia a Dia',
                'Vocabulário Essencial: Casa, Família e Objetos Cotidianos',
                'Questions & Answers: Estrutura Básica de Diálogo',
                'Artigos A, An, The: A Lógica Por Trás da Escolha',
                'Preposições de Lugar: In, On, At, Under, Next To',
                'Vocabulário de Comida, Cores e Adjetivos Descritivos',
                'Possessivos: My, Your, His, Her, Its, Our, Their'
              ]
            },
            {
              nome: 'Phase 2 — A2 Level: Functional Communication',
              topicos: [
                'Present Continuous: Ações Acontecendo Agora Mesmo',
                'Past Simple: Contar Histórias e Falar de Experiências Passadas',
                'Past Continuous: A Cena e a Interrupção',
                'Futuro: Will (Decisão Espontânea) vs Going To (Plano)',
                'Comparativos e Superlativos: Bigger, Smaller, The Best',
                'Preposições de Tempo: In (mês/ano), On (dia), At (hora)',
                'Pedindo e Dando Direções: Vocabulário e Estruturas',
                'Vocabulário de Viagens, Aeroportos e Hotéis',
                'Verbos Modais Básicos: Can, Could, Should, Must, Have To',
                'Vocabulário de Saúde: Relatando Sintomas e Consultando Médico'
              ]
            },
            {
              nome: 'Phase 3 — B1 Level: Progressive Fluency',
              topicos: [
                'Present Perfect: O Passado que Conecta ao Presente',
                'Present Perfect vs Past Simple: A Distinção Que Separa o B1',
                'Present Perfect Continuous: Foco na Duração da Ação',
                'Verbos Modais de Dedução: Might, May, Must Be, Can\'t Be',
                'First Conditional: Possibilidades Reais (If + will)',
                'Second Conditional: Situações Hipotéticas (If + would)',
                'Passive Voice: Quando o Sujeito Não Importa ou é Desconhecido',
                'Reported Speech: Contando o Que Alguém Disse',
                'Reported Speech com Perguntas, Ordens e Pedidos',
                'Vocabulário Profissional: Reuniões, E-mails e Entrevistas de Emprego'
              ]
            },
            {
              nome: 'Phase 4 — B2 Level: Communicative Independence',
              topicos: [
                'Third Conditional: Arrependimentos e Situações no Passado Hipotético',
                'Mixed Conditionals: O Passado Afetando o Presente e Vice-Versa',
                'Past Perfect: O Passado Antes do Passado',
                'Relative Clauses: Defining e Non-Defining (Who, Which, That, Whose)',
                'Gerúndio vs Infinitivo: Regras, Exceções e Nuances de Significado',
                'Phrasal Verbs Mais Usados: Separáveis e Inseparáveis',
                'Phrasal Verbs de Negócios (Business English): Core Set',
                'Inglês Para Reuniões: Concordar, Discordar, Interromper e Sumarizar',
                'Inglês Para Negociações e Apresentações Executivas',
                'Conectores e Coesão Textual: Therefore, However, Nevertheless, Thus'
              ]
            },
            {
              nome: 'Phase 5 — C1/C2 Level: Mastery and Nuance',
              topicos: [
                'Expressões Idiomáticas (Idioms) Essenciais: Top 50 de Alta Frequência',
                'Gírias Nativas (Slangs): Registro e Contexto Cultural (EUA vs UK vs AUS)',
                'Sotaques e Compreensão Auditiva: American, British, Australian',
                'Collocations: Palavras que Sempre Andam Juntas',
                'Inversão Estrutural Para Ênfase: "Hardly had I arrived when..."',
                'Cleft Sentences: "It was John who..." Destacando Informação',
                'Vocabulário Acadêmico (AWL): As 570 Famílias de Palavras Essenciais',
                'Nuances de Significado: Synonyms, Antonyms e Register',
                'Ironia, Sarcasmo e Humor em Inglês: O Que Nenhuma Aula Ensina',
                'Pensando Diretamente em Inglês: Técnicas de Imersão Mental',
                'Inglês Para Tech: Cloud, APIs, DevOps, Machine Learning',
                'Inglês Literário: Analisando Prosa Complexa e Estilo de Autores'
              ]
            }
          ]
        },
        {
          slug: 'espanhol',
          nome: 'Spanish',
          emoji: 'ES',
          parent: 'idiomas-escrita',
          layout: 'split',
          widget: 'FlashcardDeck',
          whyStart: 'The second largest language in the Americas — and the closest to Portuguese. It opens markets in Latin America and Europe.',
          descricao: 'Progressive immersion from A1 to B2, focusing on natural oral and written production.',
          contexto: `Toda a dinâmica será uma simulação de comunicação real por texto.

Abordagem obrigatória:
- NÃO ensine regras gramaticais.
- Simule um diálogo imersivo com o aluno, como se estivessem conversando no dia a dia.
- Conduza partes crescentes da sessão diretamente em espanhol conforme o aluno avança, focando na fluência natural e não na teoria.`,
          fases: [
            {
              nome: 'Phase 1 — A1 Level: Bases and Daily Life',
              topicos: [
                'Pronomes e Primeiras Apresentações',
                'Ser vs Estar: A Distinção Fundamental (Identidade vs Estado)',
                'Tener vs Haber: Posse vs Existência',
                'Presente do Indicativo: Verbos Regulares -AR, -ER, -IR',
                'Falsos Cognatos Frequentes: As Armadilhas do Português',
                'Vocabulário Cotidiano: Casa, Família, Comida e Rotina',
                'Artigos e Gêneros: El, La, Los, Las (e Exceções)',
                'Números, Horas e Datas',
                'Preposições Básicas: A, De, En, Con, Por, Para',
                'Expressões de Cortesia e Saudações Formais e Informais'
              ]
            },
            {
              nome: 'Phase 2 — A2/B1 Level: Progressive Communication',
              topicos: [
                'Pretérito Perfecto: Experiências Recentes e Hoje',
                'Pretérito Indefinido: Passado Completo com Data Definida',
                'Pretérito Imperfecto: Descrever Passado e Hábitos Antigos',
                'Futuro Simples e Futuro Perifrástico (Ir + Infinitivo)',
                'Por vs Para: A Distinção Que Mais Confunde Brasileiros',
                'Verbos Reflexivos: Levantarse, Ducharse, Vestirse',
                'Pronomes Clíticos: Me, Te, Le, Lo, La, Nos',
                'Imperativo Afirmativo e Negativo: Dar Ordens e Sugestões',
                'Verbos Irregulares de Alta Frequência: Ser, Ir, Tener, Querer, Poder',
                'Vocabulário de Viagens, Aeroportos e Situações Reais'
              ]
            },
            {
              nome: 'Phase 3 — B1/B2 Level: Independence and Expression',
              topicos: [
                'Subjuntivo Presente: Expressar Desejo, Dúvida e Emoção',
                'Subjuntivo Imperfecto: Hipóteses e Situações no Passado',
                'Condicional Simple e Compuesto: Situações Hipotéticas',
                'Pronomes Relativos: Que, Quien, Cuyo, El Cual',
                'Vocabulário de Negócios: Reuniões, Contratos e Apresentações',
                'Expressões Idiomáticas Essenciais: Top 30 de Alta Frequência',
                'Diferenças entre Espanhol Peninsular e Latino-Americano',
                'Expressão de Opinião e Debate: Estruturas para Argumentar',
                'Compreensão Auditiva: Sotaques da Argentina, México, Espanha',
                'Espanhol Para Tech: Vocabulário de TI, Startups e Inovação'
              ]
            }
          ]
        },
        {
          slug: 'frances',
          nome: 'French',
          emoji: 'FR',
          parent: 'idiomas-escrita',
          layout: 'split',
          widget: 'FlashcardDeck',
          whyStart: 'The language of diplomacy, high culture, and 29 countries. Phonetics is the biggest challenge — and it starts here.',
          descricao: 'From A1 to B1: phonetics, structure, and progressive immersion in the language of Molière.',
          contexto: `Toda a dinâmica será uma simulação de comunicação real por texto.

Abordagem obrigatória:
- NÃO ensine regras gramaticais.
- Simule um diálogo imersivo com o aluno, incorporando o francês naturalmente.
- Ensine fonética indiretamente por meio da correção sutil da escrita e uso prático no diálogo.`,
          fases: [
            {
              nome: 'Phase 1 — A1 Level: Phonetics and First Steps',
              topicos: [
                'A Fonética Francesa: Vogais Nasais (an, en, in, on, un)',
                'Liaison e Enchaînement: A Música Conectada do Francês',
                'Être (Ser/Estar) e Avoir (Ter): Os Dois Verbos-Pilares',
                'Artigos Definidos e Indefinidos: Le, La, Les, Un, Une, Des',
                'Gênero dos Substantivos: Masculino e Feminino',
                'Estrutura de Frases Negativas: Ne...Pas e Variantes',
                'Pronomes Pessoais: Je, Tu, Il, Elle, Nous, Vous, Ils, Elles',
                'Verbos do Grupo -ER no Presente: Parler, Manger, Étudier',
                'Números, Datas e Horas em Francês',
                'Expressões de Cortesia: Bonjour, Merci, S\'il Vous Plaît, Pardon'
              ]
            },
            {
              nome: 'Phase 2 — A2 Level: Structure and Daily Life',
              topicos: [
                'Verbos Irregulares Essenciais: Aller, Faire, Vouloir, Pouvoir, Savoir',
                'Passé Composé: Formação com Avoir e Être',
                'L\'Imparfait: Descrever Situações Passadas e Hábitos',
                'Passé Composé vs Imparfait: Quando Usar Cada Um',
                'Partitivos: Du, De La, De L\', Des e a Negação',
                'Pronomes Complemento: Me, Te, Le, La, Lui, Leur',
                'Adjetivos: Posição, Concordância e Formas Irregulares',
                'Preposições de Lugar e Movimento: À, En, Dans, Sur, Sous',
                'Vocabulário de Gastronomia, Cultura e Estilo de Vida Francês',
                'Futur Proche (Aller + Infinitif): Planos Imediatos'
              ]
            },
            {
              nome: 'Phase 3 — B1 Level: Fluency and Personal Expression',
              topicos: [
                'Futur Simple: Previsões e Comprometimentos Formais',
                'Conditionnel Présent: Hipóteses e Educação Formal (Je voudrais)',
                'Subjonctif Présent: Expressão de Emoção, Desejo e Necessidade',
                'Pronomes Relatifs: Qui, Que, Dont, Où',
                'Discours Indirect: Reported Speech em Francês',
                'Vocabulário Profissional: Reuniões, E-mails e Apresentações',
                'Francês para Cultura: Cinema, Música, Filosofia e Culinária',
                'Expressões Idiomáticas Essenciais em Francês',
                'Compreensão Auditiva: Francês Falado vs Escrito',
                'Diferenças Culturais: França vs Québec vs África Francófona'
              ]
            }
          ]
        }
      ]
    }
  ]
};
