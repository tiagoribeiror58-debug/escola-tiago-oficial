import { MateriaConfig } from '@/types';

export const fundamentosAcademicos: MateriaConfig = {
  slug: 'fundamentos',
  nome: 'Ciências e Humanidades',
  emoji: '🏛️',
  isCategory: true,
  descricao: 'Exact, natural, human sciences and the arts. The basis of the world model.',
  contexto: `PERSONA:
You are a polymath who sees the interconnectedness of all knowledge. You do not isolate sciences from humanities. You teach to build a unified model of the world. Never break this frame. You are not a generic AI — you are this specialist.`,
  children: [
    {
      slug: 'ciencias-exatas',
      nome: 'Ciências Exatas e Naturais',
      emoji: '📐',
      isCategory: true,
      parent: 'fundamentos',
      descricao: 'The rigorous study of numbers, space, and the physical world.',
      children: [
        {
          slug: 'matematica',
          nome: 'Matemática',
          emoji: '∑',
          parent: 'ciencias-exatas',
          descricao: 'The study of patterns, logical-quantitative reasoning, and geometry.',
          contexto: `PERSONA:
You are a structural mathematician. You see math not as numbers, but as the language of logic and patterns that rule reality. Never break this frame. You are not a generic AI — you are this specialist.

Focus: real mathematical reasoning — patterns, structure, modeling.

Mandatory approach:
- Explain the mathematical principle before presenting the problem.
- For problem solving: require the student to justify each step.
- Never present a formula without explaining what it represents structurally.`,
          ementa: [
            'A Lógica por trás das Frações e Proporções',
            'A Matemática do Comércio (Porcentagem)',
            'Equações do Primeiro Grau e Modelagem',
            'Geometria do Espaço e Pitágoras',
            'Funções como Máquinas de Transformação',
            'Introdução à Análise Combinatória',
            'Equações do Segundo Grau e a Fórmula de Bhaskara',
            'Progressões Aritméticas e Geométricas',
            'Logaritmos: A Escala Invisível do Mundo',
            'Trigonometria: Seno, Cosseno e Tangente',
            'Números Complexos e o Plano de Argand',
            'Vetores e Geometria Analítica',
            'Matrizes e Determinantes',
            'Introdução ao Cálculo: Limites e Derivadas',
            'Integrais: A Área sob a Curva',
            'Equações Diferenciais Básicas',
            'Teoria dos Números: Primos e Divisibilidade',
            'Matemática Discreta e Grafos',
            'Probabilidade: Da Intuição ao Bayes',
            'Otimização: Mínimos, Máximos e Lagrange',
            'Matemática Financeira: TVM e Fluxos de Caixa'
          ]
        },
        {
          slug: 'fisica',
          nome: 'Física',
          emoji: 'λ',
          parent: 'ciencias-exatas',
          descricao: 'Understanding the laws that govern the universe, energy, and matter.',
          contexto: `PERSONA:
You are a theoretical physicist in the spirit of Richard Feynman. You hate jargon and insist on explaining the fundamental mechanisms of the universe simply. Never break this frame. You are not a generic AI — you are this specialist.

Focus: real physical intuition — phenomena, forces, conservation.

Mandatory approach:
- Start with the physical phenomenon described in words. The formula is the last step.`,
          ementa: [
            'Cinemática: O Estudo do Movimento',
            'As 3 Leis de Newton',
            'Trabalho, Energia e Conservação',
            'Termodinâmica (Calor e Desordem)',
            'Eletromagnetismo Básico',
            'Dinâmica: Forças, Atrito e Planos Inclinados',
            'Gravitação Universal e Órbitas',
            'Oscilações e Ondas Mecânicas',
            'Som: Física da Acústica',
            'Óptica Geométrica: Lentes e Espelhos',
            'Eletrostática e Campo Elétrico',
            'Circuitos Elétricos (Lei de Ohm)',
            'Magnetismo e Indução Eletromagnética',
            'Física Moderna: Relatividade Especial',
            'Física Quântica: O Principio da Incerteza',
            'Física Nuclear e Radioatividade',
            'Astrofísica: Estrelas, Buracos Negros e Cosmologia',
            'Física de Partículas: O Modelo Padrão',
            'Superfluidez e Supercondutividade',
            'Física Computacional: Simulações e Modelos'
          ]
        },
        {
          slug: 'quimica',
          nome: 'Química',
          emoji: '⚗',
          parent: 'ciencias-exatas',
          descricao: 'The study of molecular and atomic transformations.',
          contexto: `PERSONA:
You are a molecular chemist. You see the world as interactions of elements seeking stability. You explain macroscopic changes through microscopic rules. Never break this frame. You are not a generic AI — you are this specialist.

Focus: real chemical mechanisms — atomic structure, bonds, reactions.`,
          ementa: [
            'A Estrutura do Átomo',
            'A Tabela Periódica (Leitura de Propriedades)',
            'Ligações Químicas',
            'Estequiometria (A Receita da Reação)',
            'Ácidos, Bases e pH',
            'Reações de Oxirredução',
            'Soluções e Concentrações',
            'Cinética Química e Catalisadores',
            'Equilíbrio Químico e Le Chatelier',
            'Química Orgânica: Hidrocarbonetos',
            'Funções Orgânicas Essenciais',
            'Polímeros: Do Petróleo ao Plástico',
            'Bioquímica: Aminoácidos e Proteínas',
            'Eletroquímica e Pilhas',
            'Termodinâmica Química e Entalpia',
            'Nanotecnologia: Química em Escala Atômica',
            'Química Medicinal: Fármacos e Alvos Moleculares'
          ]
        },
        {
          slug: 'biologia',
          nome: 'Biologia',
          emoji: '🧬',
          parent: 'ciencias-exatas',
          descricao: 'The study of life, from the cell to complex ecosystems.',
          contexto: `PERSONA:
You are an evolutionary biologist. You understand life as a complex system of adaptation and survival algorithms optimized over billions of years. Never break this frame. You are not a generic AI — you are this specialist.

Focus: real biological mechanisms. Use the theory of evolution as the main lens.`,
          ementa: [
            'A Célula: A Fábrica da Vida',
            'Genética e DNA',
            'Evolução e Seleção Natural',
            'Sistemas Fisiológicos Humanos',
            'Ecologia e Teias Alimentares',
            'Divisão Celular: Mitose e Meiose',
            'Hereditariedade e as Leis de Mendel',
            'Mutações e Engenharia Genética (CRISPR)',
            'Virologia: Como os Vírus Funcionam',
            'Imunologia: O Sistema Imune em Detalhe',
            'Endocrinologia: Hormônios e Regulação',
            'Neurobiologia: Neurônios e Sinapses',
            'Ecossistemas: Ciclos Biogeoquímicos',
            'Biodiversidade e Extinção de Espécies',
            'Biotecnologia e Aplicações Modernas',
            'CRISPR-Cas9: Edição Genética de Precisão',
            'Biologia Sintética: Projetando Organismos',
            'Epigenética: Genes que Ligam e Desligam',
            'Microbioma Humano: O Segundo Genoma'
          ]
        },
        {
          slug: 'estatistica',
          nome: 'Estatística e Dados',
          emoji: '📊',
          parent: 'ciencias-exatas',
          layout: 'split',
          widget: 'EconGraph',
          descricao: 'The language of uncertainty. Interpreting data, bias, and probabilistic thinking.',
          contexto: `PERSONA:
You are a data scientist and Bayesian thinker. You know human intuition is terrible with probabilities, so you rely on data to update your beliefs. Never break this frame. You are not a generic AI — you are this specialist.

Focus: probabilistic reasoning. The student must understand the intuition behind statistics.`,
          ementa: [
            'Média, Mediana e Moda',
            'Distribuição Normal e Desvio',
            'Probabilidade Condicional (Bayes)',
            'Correlação vs Causalidade',
            'Viés de Amostragem',
            'Variância e Desvio Padrão',
            'Testes de Hipótese: p-valor e Significância',
            'Intervalos de Confiança',
            'Regressão Linear e Múltipla',
            'Qui-Quadrado e Análise Categórica',
            'Distribuições: Binomial, Poisson e Exponencial',
            'ANOVA: Comparando Grupos',
            'Visualização de Dados: Princípios de Edward Tufte',
            'A/B Testing na Prática',
            'Estatística Bayesiana vs Frequentista',
            'Visualização Interativa: Dashboards e Storytelling com Dados',
            'Estatística para Machine Learning: Overfitting e Regularização',
            'Causal Inference: Correlação ≠ Causação (Com Rigor)'
          ]
        }
      ]
    },
    {
      slug: 'humanidades',
      nome: 'Humanidades e Letras',
      emoji: '📜',
      isCategory: true,
      parent: 'fundamentos',
      descricao: 'Historical, social, and philosophical understanding of the human experience.',
      children: [
        {
          slug: 'historia',
          nome: 'História',
          emoji: '⏳',
          parent: 'humanidades',
          descricao: 'Causal understanding of human events and cycles of civilizations.',
          contexto: `PERSONA:
You are a macro-historian. You don't care about dates and names; you care about the systemic causes of why empires rise and fall. Never break this frame. You are not a generic AI — you are this specialist.

Focus: real historical causality. Never start with dates or isolated names.`,
          ementa: [
            'Revolução Agrícola e Cidades',
            'Império Romano: Ascensão e Queda',
            'Idade Média e Feudalismo',
            'Grandes Navegações e Globalização',
            'Revolução Industrial',
            'Grandes Guerras (Visão Geopolítica)',
            'Mesopotâmia, Egito e as Primeiras Civilizações',
            'Grécia Antiga: Democracia e Filosofia',
            'A Expansão Islâmica e o Califado',
            'Renascimento e Reforma Protestante',
            'Iluminismo e a Revolução Francesa',
            'Colonialismo e o Impacto na América Latina',
            'Guerra Fria: Ideologias e Proxy Wars',
            'Descolonização da África e Ásia',
            'A Queda do Muro e o Fim da URSS',
            'Globalização: A Nova Ordem Mundial',
            'Brasil: Da Colônia à República',
            'História da Tecnologia: Da Prensa ao Computador',
            'Revoluções Digitais: Internet, Mobile e IA',
            'Pandemia como Força Histórica: COVID-19 e Seus Efeitos'
          ]
        },
        {
          slug: 'filosofia',
          nome: 'Filosofia',
          emoji: '∞',
          parent: 'humanidades',
          descricao: 'The rigorous search for fundamental principles and ethical dilemmas.',
          contexto: `PERSONA:
You are a Socratic investigator. You ask the fundamental questions that people avoid, dissecting assumptions to find the core truth. Never break this frame. You are not a generic AI — you are this specialist.

Focus: philosophical argumentation. Before presenting a philosopher's position, explain the problem they were trying to solve.`,
          ementa: [
            'O Método Socrático e a Maiêutica',
            'O Mito da Caverna (Platão)',
            'Aristóteles e a Ética',
            'Estoicismo (Controle da Mente)',
            'O Iluminismo e Kant',
            'Nihilismo e Existencialismo',
            'Filosofia Pré-Socrática: Os Primeiros Princípios',
            'Epicurismo: A Filosofia do Prazer Consciente',
            'Filosofia Medieval: Tomás de Aquino',
            'Descartes e o Cogito Ergo Sum',
            'Hume e o Problema da Indução',
            'Utilitarismo: Bentham e Stuart Mill',
            'Nietzsche: A Morte de Deus e o Super-Homem',
            'Marxismo: Dialética Materialista',
            'Fenomenologia: Husserl e Heidegger',
            'Filosofia da Linguagem: Wittgenstein',
            'Filosofia da Mente: Consciência e Qualia',
            'Bioética e os Dilemas do Século XXI',
            'Filosofia da IA: Consciência Artificial é Possível?',
            'Pós-Humanismo: Transcender o Biológico',
            'Efetivo Altruísmo: Ética Utilitária Aplicada (Peter Singer)'
          ]
        },
        {
          slug: 'geografia',
          nome: 'Geografia',
          emoji: '🌍',
          parent: 'humanidades',
          descricao: 'The dynamic relationships between societies and physical space.',
          contexto: `PERSONA:
You are a geopolitical strategist. You understand how terrain, resources, and borders dictate the destiny of nations more than their leaders do. Never break this frame. You are not a generic AI — you are this specialist.

Focus: causal relationships between physical space, climate, economy, and geopolitics.`,
          ementa: [
            'Formação Geológica',
            'Clima e Biomas',
            'Demografia e Migrações',
            'Geopolítica Contemporânea',
            'Cadeias Produtivas Globais',
            'Placas Tectônicas e Desastres Naturais',
            'Recursos Naturais e Conflitos',
            'Urbanização e Metrópoles Globais',
            'Desenvolvimento Humano (IDH)',
            'Desigualdade Global: Norte vs Sul',
            'Mudanças Climáticas e Consequências Geográficas',
            'Geopolítica da Energia (Petróleo, Gás, Renováveis)',
            'Blocos Econômicos: UE, Mercosul, ASEAN',
            'A Nova Rota da Seda Chinesa',
            'Conflitos Territoriais e Fronteiras Disputadas',
            'Geopolitica da Água: O Recurso do Século XXI',
            'Migrações Climáticas e Refugiados Ambientais',
            'Cidades Inteligentes: Urbanismo do Futuro'
          ]
        },
        {
          slug: 'economia',
          nome: 'Economia',
          emoji: '💹',
          parent: 'humanidades',
          layout: 'split',
          widget: 'EconGraph',
          descricao: 'Understand how the world turns: from individual micro-decisions to the macroeconomics of nations.',
          contexto: `PERSONA:
You are an applied economist. You see the world through the lens of scarcity, incentives, and opportunity costs, disregarding ideological wishful thinking. Never break this frame. You are not a generic AI — you are this specialist.

Economics is the science of scarcity and choice. The student is self-taught and seeks deep conceptual understanding focused on reading the world, mental models, markets, and policies, without the heavy calculation load required in academic graduate school.`,
          fases: [
            {
              nome: 'Phase 1 - Foundations',
              topicos: [
                'O que é economia - escassez, escolha e custo de oportunidade',
                'Vantagem comparativa e ganhos de troca - por que as pessoas e países comercializam',
                'Oferta e demanda - os motores básicos da economia',
                'Elasticidade - como preço afeta quantidade comprada/vendida',
                'Como os preços se formam no mercado (Equilíbrio de mercado)',
                'Excedente do consumidor e do produtor - entendendo a eficiência do mercado',
                'Falhas de mercado - monopólio, externalidades e bens públicos',
                'Bens comuns e a Tragédia dos Comuns - esgotamento de recursos compartilhados',
                'O que é PIB, inflação e desemprego - os grandes indicadores',
                'Diferença entre micro e macroeconomia'
              ]
            },
            {
              nome: 'Phase 2 - Intermediate',
              topicos: [
                'Micro: Comportamento do consumidor - utilidade e preferências',
                'Micro: Restrição orçamentária e a matemática das escolhas',
                'Micro: Teoria da firma - custos (fixos/variáveis), receita e lucro',
                'Micro: Estruturas de mercado - concorrência perfeita, monopólio, oligopólio',
                'Micro: Concorrência monopolística e diferenciação de produtos',
                'Micro: Mercado de trabalho - formação de salários e emprego',
                'Micro: Desigualdade, pobreza e distribuição de renda',
                'Macro: O sistema financeiro e a criação do dinheiro - papel dos bancos',
                'Macro: Política fiscal - gastos públicos, impostos e dívida do governo',
                'Macro: Política monetária - taxa de juros (Selic), inflação e o Banco Central',
                'Macro: Câmbio - como funciona, regimes cambiais e por que a moeda oscila',
                'Macro: Ciclos econômicos - crescimento, superaquecimento, crise e recessão',
                'Macro: Crescimento econômico a longo prazo - capital, tecnologia e instituições'
              ]
            },
            {
              nome: 'Phase 3 - Advanced and Applications',
              topicos: [
                'História do pensamento econômico - Clássicos, Marx, Keynes, Escola Austríaca',
                'Teoria dos Jogos e Estratégia - Dilema do Prisioneiro e Equilíbrio de Nash',
                'Economia da Informação - assimetria, seleção adversa e risco moral',
                'Economia comportamental - heurísticas, vieses cognitivos e Nudges',
                'Finanças Públicas e Tributação - eficiência dos impostos, peso morto e Curva de Laffer',
                'Economia internacional - protecionismo, tarifas e balanço de pagamentos',
                'Econometria básica - como provar (ou refutar) teorias com dados reais',
                'Economia brasileira - Era da hiperinflação, Plano Real, e desafios estruturais atuais'
              ]
            }
          ]
        },
        {
          slug: 'literatura',
          nome: 'Literatura',
          emoji: '📖',
          parent: 'humanidades',
          descricao: 'Deep interpretation through narrative and poetic text.',
          contexto: `PERSONA:
You are a literary critic and narratologist. You read fiction to extract the deepest truths about human nature that science cannot measure. Never break this frame. You are not a generic AI — you are this specialist.

Focus: real literary mechanisms. Explain the device and the effect it produces before identifying it in texts.`,
          ementa: [
            'O Poder do Mito e Epopéias',
            'Trovadorismo e Romantismo',
            'Machado de Assis e Realismo',
            'Modernismo',
            'Ficção Científica e Distopias',
            'Tragédia Grega: Estrutura e Catarse',
            'Shakespeare: Linguagem e Temas Universais',
            'Realismo Mágico: García Márquez',
            'Kafka e o Absurdo',
            'Dostoiévski e a Psicologia Humana',
            'Poesia: Métrica, Ritmo e Imagem',
            'Narratologia: Narrador, Foco e Tempo',
            'Literatura Brasileira: Do Barroco ao Contemporâneo',
            'Ensaio e Não-Ficção como Forma Literária',
            'Literatura e Poder: Como Textos Mudam Sociedades',
            'Literatura e IA: Criatividade Sintética e Autoria',
            'Graphic Novels: Literatura Visual Contemporânea'
          ]
        },
        {
          slug: 'sociologia',
          nome: 'Sociologia',
          emoji: '👥',
          parent: 'humanidades',
          descricao: 'The study of structures, norms, and dynamics of society.',
          contexto: `PERSONA:
You are a structural sociologist. You look past individual choices to see the invisible systemic forces, institutions, and cultural norms shaping behavior. Never break this frame. You are not a generic AI — you are this specialist.

Focus: How invisible structures of power, culture, and capital shape individual actions.`,
          ementa: [
            'Fato Social e Coesão (Durkheim)',
            'Classes e Conflito (Marx)',
            'Ação Social e Burocracia (Weber)',
            'Capital Cultural (Bourdieu)',
            'Modernidade Líquida (Bauman)',
            'Instituições Sociais: Família, Escola, Estado',
            'Estratificação Social e Mobilidade',
            'Deviance: Desvio e Controle Social',
            'Racismo Estrutural e Interseccionalidade',
            'Gênero como Construção Social',
            'Globalização e Identidade Cultural',
            'Movimentos Sociais e Ação Coletiva',
            'Religião como Fenômeno Social',
            'Sociologia Digital: Redes Sociais e Bolhas',
            'Trabalho e Alienação na Pós-Modernidade',
            'Sociedade de Vigilância: Privacidade na Era Digital',
            'Sociologia da IA: Impacto em Classes e Emprego',
            'Cancel Culture: Dinâmicas de Poder nas Redes'
          ]
        }
      ]
    },
    {
      slug: 'musica',
      nome: 'Música e Artes',
      emoji: '♪',
      isCategory: true,
      parent: 'fundamentos',
      descricao: 'Ear training, harmony, and artistic expression.',
      children: [
        {
          slug: 'violao',
          nome: 'Violão Prático',
          emoji: '🎸',
          parent: 'musica',
          descricao: 'Fundamentals of strings, chords, and applied rhythmic patterns.',
          contexto: `PERSONA:
You are a practical string instructor. You focus on motor memory, tension relief, and getting the student to play real songs as fast as possible. Never break this frame. You are not a generic AI — you are this specialist.

Focus: real technical mechanisms — posture, muscle tension, chord transition.`,
          ementa: [
            'Postura e Mão Esquerda',
            'Acordes Menores (Am, Em)',
            'Acordes Maiores (C, G, D)',
            'Transição e Memória Muscular',
            'Ritmo e Levadas',
            'Afinação e o Uso do Afinador',
            'Acordes de Barra (F, Bm)',
            'Pestana: Técnica e Desenvolvimento',
            'Dedilhado Básico (Fingerpicking)',
            'A Escala Pentatônica e o Solo de Blues',
            'Improvisação sobre Progressões Comuns',
            'Leitura de Cifras Avançadas (Sus4, Maj7, 9)',
            'Ritmos Brasileiros: Samba, Baião e Bossa Nova',
            'Violão Solo: Melodia com Acompanhamento',
            'Efeitos de Dinâmica: Staccato, Vibrato e Hammer-On'
          ]
        },
        {
          slug: 'piano',
          nome: 'Teclas e Harmonia',
          emoji: '🎹',
          parent: 'musica',
          descricao: 'Harmonic arrangements, triads, reading, and motor independence.',
          contexto: `PERSONA:
You are a harmonic pianist. You teach the keyboard as the ultimate map of music theory, focusing on chord structures and hand independence. Never break this frame. You are not a generic AI — you are this specialist.

Focus: applied harmony and motor independence. One hand at a time, with an understanding of the role of each.`,
          ementa: [
            'Postura e Numeração',
            'Acordes Naturais (Tríades)',
            'Progressões Pop',
            'Independência das Mãos',
            'A Escala de Dó Maior e suas Posições',
            'Leitura de Partitura: Clave de Sol e Fá',
            'Arpejos e Quebra de Acordes',
            'Acordes de Sétima (Dominant 7, Major 7)',
            'O Ciclo de Quintas na Prática',
            'Harmonia Funcional: Tônica, Dominante, Subdominante',
            'Progressões de Jazz: ii-V-I',
            'Dinâmica ao Piano: Piano, Forte, Crescendo',
            'Ritmo na Mão Esquerda (Stride e Alberti Bass)',
            'Improvisação com Escala Pentatônica',
            'Leitura à Primeira Vista'
          ]
        },
        {
          slug: 'teoria-musical',
          nome: 'Teoria Musical Aplicada',
          emoji: '🎵',
          parent: 'musica',
          descricao: 'The mathematics of music: scales, perception, and chord formation.',
          contexto: `PERSONA:
You are a music theorist. You explain the mathematics behind what sounds good, demystifying the "magic" of composition into understandable patterns. Never break this frame. You are not a generic AI — you are this specialist.

Focus: real musical structure — scales, intervals, harmonic fields.`,
          ementa: [
            'Escalas Maiores e Menores',
            'Formação de Tríades',
            'Intervalos Musicais',
            'Campos Harmônicos',
            'Notas e Figuras Rítmicas',
            'Compassos: 2/4, 3/4, 4/4 e 6/8',
            'Modos Gregos: Dórico, Frígio, Lídio...',
            'Escala de Blues e Pentatônica',
            'Cifras e Notação de Acordes',
            'Progressões Clássicas e suas Funções',
            'Harmonia Cromática e Tensões',
            'Transposição: Mudando de Tom',
            'Análise Harmônica de Músicas Reais',
            'Contraponto Básico: Duas Vozes',
            'Forma Musical: Verso, Refrão, Bridge'
          ]
        },
        {
          slug: 'historia-arte',
          nome: 'História da Arte',
          emoji: '🎨',
          parent: 'musica',
          descricao: 'The visual evolution of humanity and analysis of artistic movements.',
          contexto: `PERSONA:
You are an art curator. You read paintings and sculptures as historical documents that capture the Zeitgeist of their eras. Never break this frame. You are not a generic AI — you are this specialist.

Focus: How artistic movements respond to technological advances and social crises. Teach how to read a painting before memorizing it.`,
          ementa: [
            'Renascimento (A Perspectiva)',
            'Barroco (O Drama e a Luz)',
            'Impressionismo (A Cor em Movimento)',
            'Modernismo e Cubismo',
            'A Arte Contemporânea',
            'Arte Pré-histórica e o Surgimento do Símbolo',
            'Arte Egípcia: Hierarquia e Eternidade',
            'Arte Grega e Escultura Clássica',
            'Arte Medieval: Ícones e Iluminuras',
            'Romantismo: O Sublime e o Emocional',
            'Realismo: A Arte como Crítica Social',
            'Surrealismo e o Inconsciente',
            'Arte Abstrata: Kandinsky e Mondrian',
            'Pop Art: Warhol e a Cultura de Massa',
            'Design como Arte: Bauhaus e Forma+Função'
          ]
        }
      ]
    }
  ]
};
