import { MateriaConfig } from '@/types';

export const MATERIAS: MateriaConfig[] = [
  // ==========================================
  // 1. PERFORMANCE HUMANA & INTELECTO
  // ==========================================
  {
    slug: 'performance-intelecto',
    nome: 'Performance & Intelecto',
    emoji: '🧠',
    isCategory: true,
    descricao: 'A base do autodomínio. Aprenda a hackear seu corpo, sua mente e seus sistemas de aprendizado.',
    children: [
      {
        slug: 'metacognicao',
        nome: 'Metacognição',
        emoji: '👁️',
        parent: 'performance-intelecto',
        descricao: 'A ciência de aprender a aprender. Domine a retenção de leitura, sistemas de notas e deep work.',
        contexto: `Foque nos princípios de aprender a aprender. Ensine sistemas reais: Zettelkasten, Leituras de Mortimer Adler, Recuperação Ativa e Repetição Espaçada. Para cada conceito, peça que o aluno crie um plano prático de 1 linha de como aplicar na vida amanhã. Questione métodos antigos (ex: releitura passiva, grifar textos) mostrando porque são ineficientes segundo a neurociência.`,
        ementa: [
          'Leitura Inspecional e Leitura Analítica',
          'A Ilusão da Fluência (Por que reler não funciona)',
          'Sistemas de Anotação Inteligente (Zettelkasten)',
          'Gestão de Carga Cognitiva e Foco (Deep Work)',
          'Feynman Technique: Explicar para entender',
          'Modelos Mentais de Primeiro Princípio'
        ]
      },
      {
        slug: 'biohacking',
        nome: 'Biohacking',
        emoji: '🧪',
        parent: 'performance-intelecto',
        descricao: 'Protocolos baseados em ciência para otimizar sono, energia, foco e longevidade.',
        contexto: `Foque em otimização de performance humana: sono, nutrição, suplementação, exercício, cold exposure, luz solar, manejo de estresse. Ao apresentar qualquer protocolo, seja transparente sobre o nível de evidência — o que tem RCT sólido vs o que é anedotal. Conecte com aplicações práticas imediatas.`,
        ementa: [
          'Ritmo Circadiano e Luz Solar Matinal',
          'Arquitetura do Sono (REM e Deep Sleep)',
          'Termogênese e Cold Exposure',
          'Janela Alimentar e Otimização Metabólica',
          'Neurotransmissores e Nutrição (Dopamina Base)'
        ]
      },
      {
        slug: 'neurociencia',
        nome: 'Neurociência',
        emoji: '🧬',
        parent: 'performance-intelecto',
        descricao: 'Entenda os mecanismos mecânicos do seu cérebro por trás de hábitos e vícios.',
        contexto: `Ensine como o cérebro funciona e conecte imediatamente com a vida do aluno: "isso explica por que você procrastina". Para memória e aprendizado, ensine os mecanismos (LTP, consolidação, sono). Para neuroplasticidade, use exemplos de hábitos. Desmistifique neuromitos comuns.`,
        ementa: [
          'Neuroplasticidade Hebbiana',
          'O Circuito de Recompensa (Dopamina)',
          'Córtex Pré-Frontal vs Amígdala',
          'Consolidação de Memória (LTP)',
          'Neurogênese Adulta e Exercício'
        ]
      },
      {
        slug: 'psicologia',
        nome: 'Psicologia',
        emoji: '🪞',
        parent: 'performance-intelecto',
        descricao: 'Vieses cognitivos, regulação emocional e padrões comportamentais subconscientes.',
        contexto: `Conecte conceitos psicológicos com situações reais do aluno. Para vieses cognitivos, use exemplos que o aluno viveu. Trabalhe reconhecimento de emoções antes de estratégias de regulação. Peça avaliação crítica de teorias clássicas.`,
        ementa: [
          'A Estrutura da Psique (Consciente vs Inconsciente)',
          'Vieses Cognitivos Fundamentais (Confirmação, Ancoragem)',
          'Teoria do Apego e Relacionamentos',
          'Inteligência Emocional e Regulação de Afeto',
          'Terapia Cognitivo-Comportamental (Práticas)',
          'Arquétipos e o Inconsciente Coletivo'
        ]
      },
      {
        slug: 'logica',
        nome: 'Lógica',
        emoji: '⊢',
        parent: 'performance-intelecto',
        descricao: 'Argumentação, falácias e pensamento rigoroso sem viés.',
        contexto: `Use puzzles e problemas reais antes de notação formal. Comece com linguagem natural. Para falácias, use exemplos de argumentos do cotidiano e política — o aluno deve identificar e nomear. Exija resolução passo a passo.`,
        ementa: [
          'Proposições e Valores Verdade',
          'Operadores Lógicos (E, OU, NÃO, SE)',
          'Argumentos Dedutivos vs Indutivos',
          'Falácias Formais e Informais',
          'Viés de Sobrevivência e Causalidade vs Correlação',
          'Modelagem de Problemas Complexos'
        ]
      }
    ]
  },

  // ==========================================
  // 2. TECNOLOGIA & NEGÓCIOS
  // ==========================================
  {
    slug: 'tecnologia-negocios',
    nome: 'Tecnologia & Negócios',
    emoji: '🚀',
    isCategory: true,
    descricao: 'Desenvolvimento de software, criação de startups, inteligência artificial e alocação de capital.',
    children: [
      {
        slug: 'inteligencia-artificial',
        nome: 'Inteligência Artificial',
        emoji: '🤖',
        parent: 'tecnologia-negocios',
        descricao: 'Mecânicas de LLMs, Engenharia de Prompt avançada e Agentes Autônomos.',
        contexto: `Foque nos fundamentos do que faz uma IA generativa funcionar, não apenas em usar ChatGPT. Ensine os limites do Transformer, a diferença entre Zero-shot e Few-shot, e arquiteturas de RAG (Retrieval-Augmented Generation). NUNCA dê a resposta mastigada; peça para o aluno criar um prompt que resolva um problema técnico específico, depois faça a crítica desse prompt.`,
        ementa: [
          'Fundamentos de Transformers e Tokens',
          'Zero-shot, One-shot e Few-shot Prompting',
          'Chain of Thought & Step-by-Step Razoamento',
          'Arquitetura RAG (Bancos Vetoriais)',
          'Agentes Autônomos e Tool Calling'
        ]
      },
      {
        slug: 'programacao',
        nome: 'Programação',
        emoji: '<>',
        parent: 'tecnologia-negocios',
        descricao: 'Da lógica de base à arquitetura de sistemas distribuídos.',
        contexto: `Abordagem: código primeiro, explicação depois. Apresente um problema pequeno e concreto, peça ao aluno para tentar resolver. Só depois de ele tentar é que você explica. Para bugs, não corrija — faça perguntas que levem o aluno a encontrar o erro.`,
        subTopicos: [
          { slug: 'frontend', nome: 'Frontend (React/UI)' },
          { slug: 'backend', nome: 'Backend & APIs' },
          { slug: 'arquitetura', nome: 'Arquitetura & Clean Code' }
        ]
      },
      {
        slug: 'financas-equity',
        nome: 'Finanças & Equity',
        emoji: '📈',
        parent: 'tecnologia-negocios',
        descricao: 'Ciclos de mercado, valuation de negócios e construção de patrimônio (Skin in the Game).',
        contexto: `Abordagem fria, matemática e anti-fragilidade. Ensine conceitos de fluxo de caixa livre, CAC, LTV, Múltiplos de Mercado e Estruturação de Cap Table. Use estudos de caso de empresas reais (Apple, Nubank, Amazon). Se o aluno perguntar 'onde investir', responda com os frameworks de avaliação de risco/retorno, nunca com dicas de ativos.`,
        ementa: [
          'A Matemática do Juros Composto (O Tempo vs Taxa)',
          'Unit Economics: CAC, LTV, Payback',
          'Valuation: Múltiplos vs Fluxo de Caixa Descontado',
          'Tipos de Equity e Cap Tables (Venture Capital)',
          'Ciclos Macroeconômicos e Alocação Estratégica'
        ]
      },
      {
        slug: 'empreendedorismo',
        nome: 'Empreendedorismo',
        emoji: '💼',
        parent: 'tecnologia-negocios',
        descricao: 'Product-Market Fit, vendas B2B/B2C, liderança e gestão de produtos escaláveis.',
        contexto: `Abordagem prática e cética: para cada modelo (Canvas, Lean), apresente um caso onde funcionou e onde falhou. Peça aplicação a uma ideia real imediatamente. Questione romantismos: 'o que poderia matar essa ideia?'.`,
        ementa: [
          'A Anatomia de uma Startup (Diferença de Negócio Tradicional)',
          'Ideação e Identificação de Dores Reais',
          'MVP (Minimum Viable Product) e Prototipagem',
          'Product-Market Fit (A única métrica que importa)',
          'Canais de Aquisição (Go-To-Market)',
          'Vendas B2B e B2C (A Arte de Fechar)',
          'Liderança e Cultura Organizacional'
        ]
      },
      {
        slug: 'design',
        nome: 'Design Visual & UX',
        emoji: '◑',
        parent: 'tecnologia-negocios',
        descricao: 'Hierarquia, tipografia, gestalt e design centrado no usuário.',
        contexto: `Ensine através da análise visual — mostre (em palavras claras) a diferença de um design bom e ruim. Peça que o aluno critique designs do cotidiano. Conecte decisões com a intenção do designer.`,
        ementa: [
          'Leis da Gestalt Aplicadas a Interfaces',
          'Teoria das Cores e Contraste',
          'Tipografia Clássica e Escala Típografica',
          'Espaçamento (White Space) e Hierarquia Visual',
          'UI vs UX: A Experiência do Usuário',
          'Heurísticas de Nielsen (Avaliação de Interfaces)'
        ]
      }
    ]
  },

  // ==========================================
  // 3. DINÂMICAS SOCIAIS & COMUNICAÇÃO
  // ==========================================
  {
    slug: 'dinamicas-comunicacao',
    nome: 'Comunicação & Sociedade',
    emoji: '🍷',
    isCategory: true,
    descricao: 'Habilidades interpessoais, comunicação persuasiva, oratória e influência.',
    children: [
      {
        slug: 'seducao',
        nome: 'Sedução & Dinâmicas Sociais',
        emoji: '🔥',
        parent: 'dinamicas-comunicacao',
        descricao: 'Inteligência social pura: calibração, tensão, autenticidade e subcomunicação.',
        contexto: `Abordagem focada em inteligência social, comunicação assertiva e desenvolvimento do valor pessoal. Ensine que atração é consequência de confiança e atitude, não de truques. Foque em: leitura corporal, subcomunicação, como flertar com calibração. Crie simulações práticas. Destrua mitos tóxicos da internet.`,
        ementa: [
          'A Base Fisiológica da Atração',
          'Subcomunicação e Linguagem Corporal (Olhar, Postura)',
          'Calibração e Tensão Social',
          'Como Abrir e Sustentar Interações (Sem Script)',
          'Escalada de Conforto e Intimidade',
          'Gestão de Rejeição e Abundância'
        ]
      },
      {
        slug: 'oratoria',
        nome: 'Oratória & Apresentação',
        emoji: '🎤',
        parent: 'dinamicas-comunicacao',
        descricao: 'Gatilhos de atenção, storytelling e projeção de voz para multidões ou 1-a-1.',
        contexto: `Pratique, não só explique. Apresente um conceito (ex: abertura com gancho), depois peça que o aluno produza um exemplo curto imediatamente. Critique objetivamente: o que funcionou, o que não funcionou. Use a estrutura: gancho → contexto → argumento → CTA.`,
        ementa: [
          'Como Superar o Medo de Falar em Público',
          'O Hook (Gancho) e a Estrutura Narrativa',
          'Modulação de Voz e Pausas Dramáticas',
          'Storytelling: A Jornada do Herói Aplicada',
          'Linguagem Corporal de Palco (Ancoragem Espacial)'
        ]
      },
      {
        slug: 'redacao',
        nome: 'Redação & Copywriting',
        emoji: '✎',
        parent: 'dinamicas-comunicacao',
        descricao: 'Escrita persuasiva e clareza de pensamento traduzida em texto.',
        contexto: `NUNCA escreva o texto pelo aluno. Sua função é provocar e criticar. Critique estrutura (tese, argumentos), coesão, e persuasão (os argumentos convencem?). Valorize a voz própria.`,
        ementa: [
          'A Regra do 1: Uma Ideia por Texto',
          'Anatomia de um Headline (Título) Magnético',
          'Fórmula AIDA e PAS',
          'Arquitetura da Argumentação Lógica',
          'Revisão Extrema (Cortar a Gordura)'
        ]
      },
      {
        slug: 'ingles',
        nome: 'Inglês',
        emoji: 'EN',
        parent: 'dinamicas-comunicacao',
        descricao: 'Imersão no idioma global. Foco em produção de frases reais, não apenas gramática abstrata.',
        contexto: `Toda a sua comunicação e explicação DEVE ser em PORTUGUÊS. O idioma inglês deve aparecer APENAS nos exemplos, frases e exigências de exercícios práticos. Peça que o aluno produza frases, deduza padrões e responda desafios em inglês.`,
        ementa: [
          'O Verbo To Be (Muito Além do Básico)',
          'Simple Present e Rotina Diária',
          'Present Continuous (Ação no Agora)',
          'Phrasal Verbs Mais Usados',
          'Preposições Complicadas (In, On, At)',
          'Past Simple e Contando Histórias',
          'Present Perfect (A Dor de Cabeça Resolvida)'
        ]
      },
      {
        slug: 'espanhol',
        nome: 'Espanhol',
        emoji: 'ES',
        parent: 'dinamicas-comunicacao',
        descricao: 'Prática contínua e imersão progressiva sem focar excessivamente em regras engessadas.',
        contexto: `Conduza partes crescentes da sessão diretamente em espanhol. Peça que o aluno forme frases e descreva situações. Corrija erros de forma integrada — repita a frase correta sem interromper o fluxo.`,
        ementa: [
          'Pronomes e Apresentações Básicas',
          'O Verbo Ser/Estar e Ser/Tener',
          'Falsos Cognatos Frequentes (Embaraçada vs Grávida)',
          'Verbos no Presente do Indicativo',
          'Vocabulário de Viagens e Restaurantes',
          'Pretérito Perfeito vs Indefinido'
        ]
      }
    ]
  },

  // ==========================================
  // 4. FUNDAMENTOS ACADÊMICOS
  // ==========================================
  {
    slug: 'fundamentos',
    nome: 'Fundamentos Acadêmicos',
    emoji: '📚',
    isCategory: true,
    descricao: 'As ciências exatas, naturais, humanas e as artes. A base do modelo de mundo.',
    children: [
      {
        slug: 'matematica',
        nome: 'Matemática',
        emoji: '∑',
        parent: 'fundamentos',
        descricao: 'O estudo dos padrões, do raciocínio lógico-quantitativo e geometria.',
        contexto: `Abordagem: problema-primeiro. NUNCA explique a regra antes de apresentar o problema — deixe o aluno tentar primeiro, erre, e só então corrija com a explicação. Use problemas concretos do mundo real.`,
        ementa: [
          'A Lógica por trás das Frações e Proporções',
          'A Matemática do Comércio (Porcentagem)',
          'Equações do Primeiro Grau e Modelagem',
          'A Geometria do Espaço e Teorema de Pitágoras',
          'Funções como Máquinas de Transformação',
          'Introdução à Análise Combinatória (Probabilidade)'
        ]
      },
      {
        slug: 'fisica',
        nome: 'Física',
        emoji: 'λ',
        parent: 'fundamentos',
        descricao: 'Compreensão das leis que regem o universo, energia e matéria.',
        contexto: `Abordagem: intuição antes de fórmula. Nunca comece com equação — comece com o fenômeno físico descrito em palavras e peça ao aluno para raciocinar sobre ele sem contas.`,
        ementa: [
          'Cinemática: O Estudo do Movimento',
          'As 3 Leis de Newton (Inércia e Força)',
          'Trabalho, Energia e Conservação',
          'Termodinâmica (O Calor e a Desordem)',
          'Eletromagnetismo Básico (Cargas e Campos)'
        ]
      },
      {
        slug: 'quimica',
        nome: 'Química',
        emoji: '⚗',
        parent: 'fundamentos',
        descricao: 'O estudo das transformações moleculares e atômicas.',
        contexto: `Parta sempre do fenômeno observável e depois explique o que acontece na escala molecular. Use analogias de tamanho para escala atômica.`,
        ementa: [
          'A Estrutura do Átomo (Bohr a Quântica)',
          'A Tabela Periódica (Como Ler as Propriedades)',
          'Ligações Químicas (Iônica, Covalente, Metálica)',
          'Reações e Estequiometria (A Receita do Bolo)',
          'Ácidos, Bases e o pH'
        ]
      },
      {
        slug: 'biologia',
        nome: 'Biologia',
        emoji: '🧬',
        parent: 'fundamentos',
        descricao: 'O estudo da vida, da célula aos ecossistemas complexos.',
        contexto: `Use a teoria da evolução como lente principal para explicar qualquer fenômeno biológico. "Por que isso evoluiu assim?".`,
        ementa: [
          'A Célula: A Fábrica da Vida',
          'Genética e DNA (O Código Fonte)',
          'Evolução e Seleção Natural (Darwin)',
          'Sistemas Fisiológicos Humanos (Base)',
          'Ecologia e Teias Alimentares'
        ]
      },
      {
        slug: 'historia',
        nome: 'História',
        emoji: '⏳',
        parent: 'fundamentos',
        descricao: 'Compreensão causal de eventos humanos e ciclos de civilizações.',
        contexto: `Foque em causalidade e conexões entre eventos — nunca em memorização de datas isoladas. Pergunte 'por que isso aconteceu?'. Conecte com o presente.`,
        ementa: [
          'A Revolução Agrícola e o Surgimento das Cidades',
          'Império Romano: Ascensão e Queda',
          'Idade Média e o Feudalismo Europeu',
          'As Grandes Navegações e a Globalização 1.0',
          'A Revolução Industrial e o Capitalismo Moderno',
          'As Grandes Guerras (Visão Geopolítica)'
        ]
      },
      {
        slug: 'geografia',
        nome: 'Geografia',
        emoji: '🌍',
        parent: 'fundamentos',
        descricao: 'As relações dinâmicas entre as sociedades e o espaço físico geopolítico.',
        contexto: `Conecte sempre com eventos atuais e cotidianos (clima, economia, conflitos). Para geografia humana, relacione com notícias recentes. Incentive raciocínio espacial.`,
        ementa: [
          'Formação Geológica do Planeta',
          'Clima e Biomas Terrestres',
          'Demografia Humana e Migrações',
          'Geopolítica Contemporânea',
          'Cadeias Produtivas Globais'
        ]
      },
      {
        slug: 'filosofia',
        nome: 'Filosofia',
        emoji: '∞',
        parent: 'fundamentos',
        descricao: 'A busca rigorosa por princípios fundamentais e dilemas éticos.',
        contexto: `Use método socrático: antes de apresentar a posição de um filósofo, pergunte ao aluno o que ele pensa sobre o tema. Peça que o aluno construa e destrua seu próprio argumento.`,
        ementa: [
          'O Método Socrático e a Maiêutica',
          'O Mito da Caverna (Platão)',
          'Aristóteles e a Ética a Nicômaco',
          'Estoqueicismo: O Controle da Mente (Sêneca/Marco Aurélio)',
          'O Iluminismo e Kant (Imperativo Categórico)',
          'Nihilismo e Existencialismo (Nietzsche/Sartre)'
        ]
      },
      {
        slug: 'literatura',
        nome: 'Literatura',
        emoji: '📖',
        parent: 'fundamentos',
        descricao: 'Interpretação profunda da experiência humana através do texto narrativo e poético.',
        contexto: `Foque na experiência do texto, não em biografia ou datas. Pergunte o que o aluno sentiu ou entendeu. Ensine a ver recursos literários como ferramentas de sentido.`,
        ementa: [
          'O Poder do Mito e Epopéias Antigas',
          'Trovadorismo e Romantismo (Evolução Sentimental)',
          'Machado de Assis e o Realismo Psicológico',
          'Modernismo: A Quebra de Paradigmas',
          'Ficção Científica e Distopias Contemporâneas'
        ]
      },
      {
        slug: 'musica',
        nome: 'Música & Instrumentos',
        emoji: '♪',
        parent: 'fundamentos',
        isCategory: true,
        descricao: 'Treinamento de percepção auditiva, teoria harmônica e execução instrumental.',
        children: [
          {
            slug: 'violao', nome: 'Violão Prático', emoji: '🎸', parent: 'musica',
            descricao: 'Fundamentos de cordas, cifras e levadas rítmicas aplicadas.',
            contexto: 'Ensine usando transição fluida entre acordes como foco principal. Corrija tensão nas mãos e postura.',
            ementa: ['Postura e Mão Esquerda', 'Acordes Menores Iniciais (Am, Em)', 'Acordes Maiores (C, G, D)', 'Transição e Memória Muscular', 'Ritmo e Levadas de Mão Direita']
          },
          {
            slug: 'piano', nome: 'Teclas & Harmonia', emoji: '🎹', parent: 'musica',
            descricao: 'Arranjos harmônicos, tríades, leitura e independência motora.',
            contexto: 'Foque em estado fundamental de acordes. I-IV-V-I. Uma mão de cada vez.',
            ementa: ['Postura e Numeração de Dedos', 'Acordes Naturais (Tríades)', 'Progressões Básicas (Pop)', 'Independência Mão Esquerda/Direita']
          },
          {
            slug: 'teoria-musical', nome: 'Teoria Musical Aplicada', emoji: '🎵', parent: 'musica',
            descricao: 'A matemática da música: escalas, percepção e formação de acordes.',
            contexto: 'Ensine a escala maior. Conecte tudo com músicas reais que o aluno conheça. Solfejo antes de notação formal.',
            ementa: ['Escalas Maiores e Menores', 'Formação de Tríades', 'Intervalos Musicais', 'Campos Harmônicos Simples']
          }
        ]
      }
    ]
  }
];

export function getMateriaBySlug(slug: string, list: MateriaConfig[] = MATERIAS): MateriaConfig | undefined {
  for (const m of list) {
    if (m.slug === slug) return m;
    if (m.children) {
      const found = getMateriaBySlug(slug, m.children);
      if (found) return found;
    }
  }
  return undefined;
}

/** Retorna todos os slugs-folha (sem filhos) de uma config, para agregar sessões de categorias */
export function getAllLeafSlugs(config: MateriaConfig): string[] {
  if (!config.children || config.children.length === 0) return [config.slug];
  return config.children.flatMap(child => getAllLeafSlugs(child));
}

export function calcularDiasParada(dataUltimaSessao: string): number {
  const ultima = new Date(dataUltimaSessao);
  const hoje = new Date();
  const diff = Math.floor((hoje.getTime() - ultima.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function urgencia(dias: number | null): 'nova' | 'ok' | 'atencao' | 'urgente' {
  if (dias === null) return 'nova';
  if (dias <= 3) return 'ok';
  if (dias <= 7) return 'atencao';
  return 'urgente';
}
