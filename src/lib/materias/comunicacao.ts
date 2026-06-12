import { MateriaConfig } from '@/types';

export const comunicacaoInfluencia: MateriaConfig = {
  slug: 'dinamicas-comunicacao',
  nome: 'Comunicação & Linguagem',
  emoji: '🍷',
  isCategory: true,
  descricao: 'Persuadir, escrever, falar e pensar com clareza. O domínio da linguagem é o maior multiplicador de influência humana.',
  children: [
    // ── SUB-HUB 1: INFLUÊNCIA & PERSUASÃO ──────────────────────────────
    {
      slug: 'influencia-persuasao',
      nome: 'Influência & Persuasão',
      emoji: '🎭',
      isCategory: true,
      parent: 'dinamicas-comunicacao',
      whyStart: 'Todo o resto — escrita, idiomas, oratória — é amplificado ou anulado pela sua capacidade de influenciar ao vivo. Comece pelo motor.',
      descricao: 'Retórica, negociação, oratória e dinâmicas sociais de alto impacto.',
      children: [
        {
          slug: 'retorica',
          nome: 'Retórica & Argumentação',
          emoji: '⚖️',
          parent: 'influencia-persuasao',
          layout: 'split',
          widget: 'ArgumentMap',
          whyStart: 'A gramática de todo discurso persuasivo. Antes de negociar, seduzir ou falar em público, você precisa entender como argumentos são construídos e desmontados.',
          descricao: 'A arte de construir, desconstruir e defender argumentos com rigor e impacto.',
          contexto: `Foco: estrutura argumentativa real — premissas, conclusões, pressupostos ocultos e persuasão.

Abordagem obrigatória:
- Explique a estrutura lógica de cada tipo de argumento antes de analisar exemplos reais.
- Para falácias retóricas: explique o mecanismo pelo qual enganam antes de pedir identificação.
- Diferencie claramente retórica (persuasão) de lógica formal (validade).
- Cada técnica deve ser mostrada com exemplo real: discurso famoso, debate público ou negociação.`,
          fases: [
            {
              nome: 'Fase 1: Fundamentos — A Anatomia do Argumento',
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
              nome: 'Fase 2: Falácias e Armadilhas Lógicas',
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
              nome: 'Fase 3: Persuasão Aplicada e Framing',
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
              nome: 'Fase 4: Retórica Avançada e Debate',
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
          nome: 'Negociação',
          emoji: '🤝',
          parent: 'influencia-persuasao',
          layout: 'split',
          widget: 'NegotiationBoard',
          whyStart: 'Com a retórica como base, você aplica persuasão onde há conflito de interesse real.',
          descricao: 'Princípios e táticas de negociação baseados em Harvard, FBI e teoria dos jogos.',
          contexto: `Foco: mecanismos de influência mútua — o que gera acordo, o que gera impasse, e por quê.

Abordagem obrigatória:
- Explique o princípio estrutural antes de qualquer tática.
- Para BATNA e zona de acordo: ensine a mecânica de poder antes de aplicar em cenários.
- Diferencie negociação distributiva de integrativa pelo mecanismo.`,
          fases: [
            {
              nome: 'Fase 1: Fundamentos da Negociação',
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
              nome: 'Fase 2: Táticas e Psicologia',
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
              nome: 'Fase 3: Negociação Aplicada por Cenário',
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
          nome: 'Oratória & Apresentação',
          emoji: '🎤',
          parent: 'influencia-persuasao',
          whyStart: 'Você já sabe construir argumentos e negociar. Agora escale isso para uma audiência. Oratória é persuasão em performance.',
          descricao: 'Gatilhos de atenção, storytelling, presença de palco e comunicação em vídeo.',
          contexto: `Foco: mecanismos de atenção e persuasão oral — estrutura, ritmo, presença.

Abordagem obrigatória:
- Explique por que determinada técnica funciona antes de pedir que o aluno aplique.
- Para estrutura narrativa: explique o mecanismo de atenção que ela sustenta.`,
          fases: [
            {
              nome: 'Fase 1: Fundamentos Fisiológicos e Mentais',
              topicos: [
                'A Neurociência do Medo de Falar em Público (Cortisol vs Testosterona)',
                'Regulação Fisiológica do Nervosismo: Respiração, Postura e Voz',
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
              nome: 'Fase 2: Estrutura Narrativa e Conteúdo',
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
              nome: 'Fase 3: Formatos Digitais e Avançados',
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
      nome: 'Escrita & Pensamento Estruturado',
      emoji: '✍️',
      isCategory: true,
      parent: 'dinamicas-comunicacao',
      whyStart: 'Escrever bem é pensar bem externalizado. A escrita e os frameworks mentais são as ferramentas mais subestimadas de quem produz ideias.',
      descricao: 'Escrita profissional, clareza argumentativa e frameworks de pensamento de alto impacto.',
      children: [
        {
          slug: 'escrita-clara',
          nome: 'Escrita Clara & Persuasiva',
          emoji: '📝',
          parent: 'escrita-pensamento',
          whyStart: 'Se você não consegue explicar algo por escrito de forma simples, você não entende de verdade. Escrita é o teste de estresse do pensamento.',
          descricao: 'Princípios de clareza, concisão e impacto na escrita profissional e persuasiva.',
          contexto: `Foco: escrita como ferramenta de pensamento e influência — emails, documentos, threads, propostas, copy.

Abordagem obrigatória:
- Cada conceito precisa de um exemplo antes/depois (frase ruim vs frase reescrita).
- Não ensine gramática escolar. Ensine princípios de clareza usados por escritores profissionais.
- Referências: William Zinsser (On Writing Well), George Orwell (Politics and the English Language), Steven Pinker (The Sense of Style).`,
          fases: [
            {
              nome: 'Fase 1: Fundamentos da Clareza',
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
              nome: 'Fase 2: Estrutura e Arquitetura de Texto',
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
              nome: 'Fase 3: Escrita Persuasiva e Copywriting',
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
              nome: 'Fase 4: Escrita na Era Digital e IA',
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
          nome: 'Frameworks de Pensamento',
          emoji: '🧩',
          parent: 'escrita-pensamento',
          whyStart: 'Você tem informação demais e estrutura de menos. Frameworks transformam caos mental em clareza operacional — e determinam a qualidade do que você escreve e decide.',
          descricao: 'Modelos mentais e frameworks para organizar pensamento, tomar decisões e resolver problemas complexos.',
          contexto: `Foco: modelos mentais práticos que um profissional aplica no dia a dia para pensar com mais rigor.

Abordagem obrigatória:
- Cada framework precisa de um cenário real de aplicação (negócios, carreira, vida pessoal).
- Não liste modelos mentais como catálogo. Ensine quando e por que usar cada um.`,
          fases: [
            {
              nome: 'Fase 1: Pensamento de Primeira Ordem',
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
              nome: 'Fase 2: Pensamento de Segunda Ordem e Sistemas',
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
              nome: 'Fase 3: Frameworks de Decisão e Stakeholders',
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
              nome: 'Fase 4: Pensamento Criativo e Síntese',
              topicos: [
                'Design Thinking: Empatia → Definição → Ideação → Prototipagem → Teste',
                'Brainstorming Com Rigor: Técnicas Para Gerar Ideias Não-Óbvias',
                'SCAMPER: 7 Operações Para Inovar a Partir do Existente',
                'Mapas Mentais: Quando Usar e Quando São Enrolação Visual',
                'Síntese: A Habilidade de Juntar Peças em Uma Narrativa Coerente',
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
      nome: 'Idiomas',
      emoji: '🌐',
      isCategory: true,
      parent: 'dinamicas-comunicacao',
      whyStart: 'Idiomas são portais. Cada língua que você domina multiplica o universo de ideias, pessoas e mercados que você pode acessar.',
      descricao: 'Inglês, Espanhol e Francês com imersão progressiva por fases de fluência real.',
      children: [
        {
          slug: 'ingles',
          nome: 'Inglês',
          emoji: 'EN',
          parent: 'idiomas-escrita',
          layout: 'split',
          widget: 'FlashcardDeck',
          whyStart: 'O idioma global obrigatório. Inglês não é opcional — é o passaporte para 90% do conhecimento técnico e oportunidades digitais.',
          descricao: 'Do A1 ao C2: imersão progressiva com foco em produção real de linguagem.',
          contexto: `Toda a dinâmica será uma simulação de comunicação real por texto. 

Abordagem obrigatória:
- NÃO ensine regras gramaticais.
- Simule um diálogo imersivo com o aluno, como se estivessem conversando no dia a dia.
- Corrija erros sutilmente reformulando a frase de forma correta, sem aulas de gramática.
- O idioma nativo do aluno é portugues BR.`,
          fases: [
            {
              nome: 'Fase 1 — Nível A1: Bases Absolutas',
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
              nome: 'Fase 2 — Nível A2: Comunicação Funcional',
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
              nome: 'Fase 3 — Nível B1: Fluência Progressiva',
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
              nome: 'Fase 4 — Nível B2: Independência Comunicativa',
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
              nome: 'Fase 5 — Nível C1/C2: Domínio e Nuance',
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
          nome: 'Espanhol',
          emoji: 'ES',
          parent: 'idiomas-escrita',
          layout: 'split',
          widget: 'FlashcardDeck',
          whyStart: 'O segundo maior idioma das Américas — e o mais próximo do português. Abre mercados na América Latina e na Europa.',
          descricao: 'Imersão progressiva do A1 ao B2, com foco em produção oral e escrita natural.',
          contexto: `Toda a dinâmica será uma simulação de comunicação real por texto.

Abordagem obrigatória:
- NÃO ensine regras gramaticais.
- Simule um diálogo imersivo com o aluno, como se estivessem conversando no dia a dia.
- Conduza partes crescentes da sessão diretamente em espanhol conforme o aluno avança, focando na fluência natural e não na teoria.`,
          fases: [
            {
              nome: 'Fase 1 — Nível A1: Bases e Cotidiano',
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
              nome: 'Fase 2 — Nível A2/B1: Comunicação Progressiva',
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
              nome: 'Fase 3 — Nível B1/B2: Independência e Expressão',
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
          nome: 'Francês',
          emoji: 'FR',
          parent: 'idiomas-escrita',
          layout: 'split',
          widget: 'FlashcardDeck',
          whyStart: 'O idioma da diplomacia, da alta cultura e de 29 países. A fonética é o maior desafio — e começa aqui.',
          descricao: 'Do A1 ao B1: fonética, estrutura e imersão progressiva no idioma de Molière.',
          contexto: `Toda a dinâmica será uma simulação de comunicação real por texto.

Abordagem obrigatória:
- NÃO ensine regras gramaticais.
- Simule um diálogo imersivo com o aluno, incorporando o francês naturalmente.
- Ensine fonética indiretamente por meio da correção sutil da escrita e uso prático no diálogo.`,
          fases: [
            {
              nome: 'Fase 1 — Nível A1: Fonética e Primeiros Passos',
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
              nome: 'Fase 2 — Nível A2: Estrutura e Cotidiano',
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
              nome: 'Fase 3 — Nível B1: Fluência e Expressão Pessoal',
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
