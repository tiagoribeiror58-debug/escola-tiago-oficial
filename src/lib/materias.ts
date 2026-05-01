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
        contexto: `Foco: aprender a aprender. Sistemas reais — Zettelkasten, Leitura Analítica de Adler, Recuperação Ativa, Repetição Espaçada.

Abordagem obrigatória:
- Antes de qualquer exercício, explique o mecanismo por trás do sistema — por que funciona, o que ele resolve, onde falha.
- Só depois de compreensão estabelecida: peça que o aluno identifique como aquilo se aplica à sua rotina.
- Questione métodos ineficientes (releitura passiva, grifo) explicando o mecanismo do fracasso — não apenas afirmando que são ruins.
- Nunca peça "crie um plano prático" sem antes ter explicado o fundamento que justifica aquele plano.`,
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
        contexto: `Foco: otimização de performance humana — sono, nutrição, suplementação, exercício, estresse.

Abordagem obrigatória:
- Explique o mecanismo fisiológico antes de qualquer protocolo. O aluno precisa entender por que aquilo funciona antes de saber o que fazer.
- Seja transparente sobre nível de evidência: separe o que tem ensaio clínico sólido do que é anedotal. Nunca misture os dois sem marcar a diferença.
- Só depois de compreensão do mecanismo: discuta aplicação prática.
- Nunca apresente protocolo como receita sem antes explicar a biologia por trás.`,
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
        contexto: `Foco: mecanismos cerebrais reais — LTP, neuroplasticidade, consolidação de memória.

Abordagem obrigatória:
- Comece sempre pelo mecanismo biológico. Só depois conecte com comportamento observável.
- Nunca parta do comportamento ("você procrastina porque...") sem antes ter explicado o substrato neural que o sustenta.
- Desmistifique neuromitos explicando por que o mito existe e onde o mecanismo real diverge dele.
- Exercícios de compreensão só após o mecanismo estar claro — nunca antes.`,
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
        contexto: `Foco: mecanismos psicológicos reais — vieses, regulação emocional, padrões de comportamento.

Abordagem obrigatória:
- Explique o mecanismo do viés ou padrão antes de dar exemplos. O aluno precisa entender a estrutura, não só reconhecer casos.
- Só depois de explicar o mecanismo: conecte com situações reais.
- Para regulação emocional: explique o processo fisiológico e cognitivo envolvido antes de qualquer estratégia prática.
- Peça avaliação crítica de teorias apenas depois que o aluno compreendeu os fundamentos — nunca como diagnóstico inicial.`,
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
        contexto: `Foco: estrutura lógica de argumentos — dedução, indução, falácias.

Abordagem obrigatória:
- Explique a estrutura formal do conceito antes de apresentar exemplos em linguagem natural.
- Para falácias: explique por que a estrutura falha logicamente antes de nomear e exemplificar.
- Problemas práticos só depois que o mecanismo lógico estiver estabelecido. Nunca use puzzles como diagnóstico inicial.
- Exija resolução passo a passo com justificativa — não apenas a resposta correta.`,
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
        contexto: `Foco: fundamentos reais de IA generativa — Transformer, tokenização, limites de arquitetura.

Abordagem obrigatória:
- Explique o mecanismo técnico antes de qualquer aplicação prática. O aluno precisa entender o que acontece dentro do modelo antes de saber como usá-lo.
- Para prompting: explique por que determinada estrutura funciona (o mecanismo de atenção, contexto, etc.) antes de pedir que o aluno escreva um prompt.
- Só depois de compreensão do mecanismo: peça que o aluno aplique em um problema técnico específico.
- Critique prompts com base no mecanismo — não apenas "isso funciona melhor", mas por quê estruturalmente.`,
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
        contexto: `Foco: raciocínio computacional — lógica, estruturas, arquitetura.

Abordagem obrigatória:
- Explique o conceito ou padrão antes de apresentar o problema. O aluno precisa entender o que está sendo aplicado.
- Para bugs: não corrija. Faça perguntas que levem o aluno ao mecanismo do erro — não à solução direta.
- Código vem depois de compreensão do padrão, não antes. Nunca use código como diagnóstico inicial sem base conceitual.
- Exija que o aluno explique o raciocínio da solução — não apenas que ela funcione.`,
        subTopicos: [
          { slug: 'frontend', nome: 'Frontend (React/UI)' },
          { slug: 'backend', nome: 'Backend & APIs' },
          { slug: 'arquitetura', nome: 'Arquitetura & Clean Code' }
        ],
        ementa: [
          'Lógica de Programação e Algoritmos Básicos',
          'Variáveis, Tipos de Dados e Operadores',
          'Estruturas de Controle (If/Else, Loops)',
          'Funções e Escopo',
          'Estruturas de Dados Básicas (Arrays, Objetos)',
          'Programação Orientada a Objetos',
          'Tratamento de Erros e Debugging'
        ]
      },
      {
        slug: 'financas-equity',
        nome: 'Finanças & Equity',
        emoji: '📈',
        parent: 'tecnologia-negocios',
        descricao: 'Ciclos de mercado, valuation de negócios e construção de patrimônio.',
        contexto: `Foco: fundamentos financeiros reais — fluxo de caixa, valuation, estrutura de capital.

Abordagem obrigatória:
- Explique o mecanismo financeiro antes de qualquer aplicação ou estudo de caso. O aluno precisa entender a lógica antes de ver o exemplo.
- Para valuation: explique por que determinado método funciona e onde falha antes de aplicar em empresa real.
- Se o aluno perguntar "onde investir": responda com o framework de análise de risco/retorno que justifica qualquer decisão — nunca com dicas de ativos.
- Estudos de caso só depois que o mecanismo conceitual estiver sólido.`,
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
        contexto: `Foco: fundamentos reais de construção de negócios — validação, distribuição, escala.

Abordagem obrigatória:
- Para cada modelo (Canvas, Lean, etc.): explique o problema que ele resolve e onde falha antes de qualquer aplicação.
- Só depois de entender o mecanismo: peça aplicação a uma ideia real.
- Questione romantismos com base em mecanismo — "o que estruturalmente poderia matar essa ideia?" — não como provocação vazia.
- Nunca peça pitch ou plano sem antes ter estabelecido os fundamentos que deveriam sustentá-los.`,
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
        contexto: `Foco: princípios estruturais do design — hierarquia, gestalt, percepção visual.

Abordagem obrigatória:
- Explique o princípio perceptivo ou cognitivo por trás de cada decisão de design antes de analisar exemplos.
- Só depois de explicar o mecanismo: peça que o aluno critique um design real com base naquele princípio.
- Nunca peça análise de design sem antes estabelecer o critério de análise — o que torna algo bom ou ruim e por quê.
- Decisões de design sempre conectadas à intenção e ao mecanismo de percepção humana que as justifica.`,
        ementa: [
          'Leis da Gestalt Aplicadas a Interfaces',
          'Teoria das Cores e Contraste',
          'Tipografia Clássica e Escala Tipográfica',
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
        contexto: `Foco: inteligência social real — leitura de contexto, subcomunicação, calibração.

Abordagem obrigatória:
- Explique o mecanismo psicológico ou social por trás de cada dinâmica antes de qualquer simulação ou aplicação.
- Para atração: explique o que a produz estruturalmente (confiança, consistência, atitude) antes de discutir comportamentos específicos.
- Destrua mitos explicando o mecanismo pelo qual falham — não apenas afirmando que são errados.
- Simulações práticas só depois que o aluno compreendeu o princípio que está sendo aplicado.`,
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
        contexto: `Foco: mecanismos de atenção e persuasão oral — estrutura, ritmo, presença.

Abordagem obrigatória:
- Explique por que determinada técnica funciona (o mecanismo cognitivo ou emocional que ela aciona) antes de pedir que o aluno aplique.
- Para estrutura narrativa: explique o mecanismo de atenção que ela sustenta antes de pedir produção.
- Só depois de compreensão do princípio: peça que o aluno produza um exemplo curto.
- Critique com base no mecanismo — "o gancho falhou porque..." — não apenas "ficou fraco".`,
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
        contexto: `Foco: mecanismos de persuasão e clareza na escrita — estrutura, argumento, coesão.

Abordagem obrigatória:
- Explique o mecanismo retórico ou lógico por trás de cada técnica antes de qualquer exercício de produção.
- Para fórmulas (AIDA, PAS): explique o mecanismo psicológico que cada etapa aciona antes de aplicar.
- Nunca escreva o texto pelo aluno. Critique com base no mecanismo — "o argumento falha aqui porque estruturalmente...".
- Produção de texto só depois que o aluno compreendeu o princípio que deveria guiar aquela escrita.`,
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
        contexto: `Toda comunicação e explicação em PORTUGUÊS. Inglês aparece apenas em exemplos e exercícios.

Abordagem obrigatória:
- Explique o núcleo semântico ou estrutural de cada padrão antes de qualquer exemplo ou exercício. O aluno precisa entender o "porquê" da estrutura, não apenas reconhecer casos.
- Só depois de compreensão do mecanismo: apresente exemplos para confirmar o padrão.
- Exercícios de produção (frases, respostas em inglês) apenas depois que o mecanismo estiver estabelecido.
- Nunca use exercícios de completar lacunas ou escolha entre opções como forma de ensino — isso testa memória, não compreensão.
- Quando o aluno produzir uma frase: corrija explicando o mecanismo que foi violado, não apenas a forma correta.`,
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
        contexto: `Conduza partes crescentes da sessão diretamente em espanhol conforme o aluno avança.

Abordagem obrigatória:
- Explique o mecanismo gramatical ou semântico antes de pedir produção. O aluno precisa entender a estrutura antes de usá-la.
- Para falsos cognatos e diferenças com o português: explique a origem da divergência antes de apenas listar os casos.
- Corrija erros de forma integrada — aponte o mecanismo que foi violado e repita a estrutura correta sem interromper o fluxo.
- Produção em espanhol só depois que o padrão estrutural estiver compreendido.`,
        ementa: [
          'Pronomes e Apresentações Básicas',
          'O Verbo Ser/Estar e Ser/Tener',
          'Falsos Cognatos Frequentes (Embaraçada vs Grávida)',
          'Verbos no Presente do Indicativo',
          'Vocabulário de Viagens e Restaurantes',
          'Pretérito Perfeito vs Indefinido'
        ]
      },
      {
        slug: 'retorica',
        nome: 'Retórica & Argumentação',
        emoji: '⚖️',
        parent: 'dinamicas-comunicacao',
        descricao: 'A arte de construir, desconstruir e avaliar argumentos com rigor lógico e impacto persuasivo.',
        contexto: `Foco: estrutura argumentativa real — premissas, conclusões, pressupostos ocultos e estratégias de persuasão.

Abordagem obrigatória:
- Explique a estrutura lógica de cada tipo de argumento antes de analisar exemplos reais.
- Para falácias retóricas: explique o mecanismo pelo qual enganam antes de pedir identificação.
- Use discursos reais (políticos, publicitários, jurídicos) como material de análise DEPOIS que o aluno dominar a estrutura formal.
- O aluno deve ser capaz de construir um argumento sólido E desmontá-lo identificando seus pontos fracos.
- Diferencie claramente retórica (persuasão) de lógica formal (validade) — são ferramentas distintas.`,
        ementa: [
          'Anatomia de um Argumento (Premissa → Conclusão)',
          'Ethos, Pathos e Logos (Os 3 Pilares de Aristóteles)',
          'Falácias Retóricas vs Falácias Lógicas',
          'Contra-Argumentação e Refutação Estruturada',
          'Retórica Aplicada: Política, Publicidade e Direito',
          'Dialética: A Arte de Debater sem Agredir'
        ]
      },
      {
        slug: 'negociacao',
        nome: 'Negociação',
        emoji: '🤝',
        parent: 'dinamicas-comunicacao',
        descricao: 'Princípios e táticas de negociação baseados em Harvard, FBI e teoria dos jogos.',
        contexto: `Foco: mecanismos de influência mútua — o que gera acordo, o que gera impasse, e por quê.

Abordagem obrigatória:
- Explique o princípio estrutural antes de qualquer tática. O aluno precisa entender POR QUE uma técnica funciona, não apenas memorizá-la.
- Para BATNA e zona de acordo: ensine a mecânica de poder antes de aplicar em cenários.
- Simulações práticas DEPOIS que o aluno compreender o framework sendo usado.
- Diferencie negociação distributiva (soma zero) de integrativa (ganha-ganha) pelo mecanismo, não pelo rótulo.
- Use casos reais (salário, contratos, conflitos) como material de aplicação, não de introdução.`,
        ementa: [
          'O Framework de Harvard (Fisher & Ury)',
          'BATNA: Seu Poder Real na Mesa',
          'Ancoragem e a Psicologia das Concessões',
          'Negociação Distributiva vs Integrativa',
          'Escuta Tática (Técnicas do FBI — Chris Voss)',
          'Comunicação Não-Violenta Aplicada a Conflitos'
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
        contexto: `Foco: raciocínio matemático real — padrões, estrutura, modelagem.

Abordagem obrigatória:
- Explique o princípio matemático antes de apresentar o problema. O aluno precisa entender o que está sendo aplicado antes de tentar resolver.
- Para resolução de problemas: exija que o aluno justifique cada passo com base no princípio — não apenas o resultado.
- Use problemas do mundo real para ilustrar o princípio, não como diagnóstico inicial sem base conceitual.
- Nunca apresente fórmula sem explicar o que ela representa estruturalmente e de onde vem.`,
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
        contexto: `Foco: intuição física real — fenômenos, forças, conservação.

Abordagem obrigatória:
- Comece pelo fenômeno físico descrito em palavras. Explique o mecanismo intuitivo antes de qualquer equação.
- A fórmula é a última etapa — ela formaliza o que o aluno já deve ter compreendido conceitualmente.
- Nunca comece com equação. Se o aluno não consegue descrever o fenômeno sem contas, a equação não serve de nada.
- Problemas numéricos só depois que o mecanismo físico estiver estabelecido conceitualmente.`,
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
        contexto: `Foco: mecanismos químicos reais — estrutura atômica, ligações, reações.

Abordagem obrigatória:
- Parta sempre do fenômeno observável. Explique o que acontece na escala molecular antes de formalizar com nomenclatura ou equações.
- Use analogias de escala para tornar o nível atômico concreto — mas só depois de estabelecer o fenômeno.
- Equações estequiométricas e balanceamento só depois que o aluno compreendeu o que a reação representa fisicamente.
- Nunca apresente nomenclatura química sem antes explicar o que ela descreve estruturalmente.`,
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
        contexto: `Foco: mecanismos biológicos reais — célula, genética, evolução, fisiologia.

Abordagem obrigatória:
- Use a teoria da evolução como lente principal. Antes de explicar qualquer estrutura ou mecanismo, estabeleça: "qual pressão seletiva produziu isso?"
- Explique o mecanismo biológico antes de conectar com comportamento ou saúde humana.
- Nomenclatura e classificação só depois que o aluno compreendeu o que está sendo categorizado e por quê.
- Nunca parta de definição de manual — parta do fenômeno e construa a definição com o aluno.`,
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
        contexto: `Foco: causalidade histórica real — por que eventos acontecem, como se conectam, o que produzem.

Abordagem obrigatória:
- Nunca comece por datas ou nomes isolados. Comece pelas condições estruturais que tornaram um evento possível.
- Explique o mecanismo causal antes de narrar o evento. O aluno precisa entender o "porquê" antes do "o quê".
- Conecte com o presente pelo mecanismo — não como curiosidade, mas como extensão causal do que foi ensinado.
- Análise crítica de eventos só depois que o contexto estrutural estiver estabelecido.`,
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
        contexto: `Foco: relações causais entre espaço físico, clima, economia e geopolítica.

Abordagem obrigatória:
- Explique o mecanismo geográfico ou geopolítico antes de conectar com eventos atuais.
- Para notícias e conflitos: explique as condições estruturais que os produzem antes de analisar o evento em si.
- Raciocínio espacial: o aluno deve ser capaz de deduzir implicações geográficas antes de receber confirmação.
- Nunca apresente dado geográfico isolado — sempre dentro do mecanismo que o torna relevante.`,
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
        contexto: `Foco: argumentação filosófica real — estrutura, pressupostos, implicações.

Abordagem obrigatória:
- Antes de apresentar a posição de um filósofo: explique o problema que ele estava tentando resolver e por que as respostas anteriores eram insuficientes.
- O aluno deve compreender o problema antes de ser apresentado à solução proposta.
- Método socrático aplicado com rigor: o aluno constrói e destrói seus próprios argumentos com base em princípios, não em intuição.
- Só depois de compreender o sistema filosófico: peça avaliação crítica fundamentada.`,
        ementa: [
          'O Método Socrático e a Maiêutica',
          'O Mito da Caverna (Platão)',
          'Aristóteles e a Ética a Nicômaco',
          'Estoicismo: O Controle da Mente (Sêneca/Marco Aurélio)',
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
        contexto: `Foco: mecanismos literários reais — recursos, estrutura narrativa, intenção do autor.

Abordagem obrigatória:
- Explique o recurso literário e o efeito que ele produz antes de identificá-lo em textos.
- O aluno deve compreender o mecanismo (metáfora, ironia, narrador não-confiável) antes de ser capaz de reconhecê-lo ou usá-lo.
- Nunca comece por biografia ou contexto histórico isolado — comece pelo texto e pelo que ele faz.
- Interpretação crítica só depois que os instrumentos de leitura estiverem estabelecidos.`,
        ementa: [
          'O Poder do Mito e Epopéias Antigas',
          'Trovadorismo e Romantismo (Evolução Sentimental)',
          'Machado de Assis e o Realismo Psicológico',
          'Modernismo: A Quebra de Paradigmas',
          'Ficção Científica e Distopias Contemporâneas'
        ]
      },
      {
        slug: 'economia',
        nome: 'Economia',
        emoji: '💹',
        parent: 'fundamentos',
        descricao: 'Como mercados, governos e incentivos moldam o comportamento humano e a distribuição de recursos.',
        contexto: `Foco: mecanismos econômicos reais — incentivos, trade-offs, consequências de segunda ordem.

Abordagem obrigatória:
- Explique o mecanismo econômico (oferta/demanda, incentivos, externalidades) antes de qualquer exemplo histórico ou atual.
- Para políticas públicas: explique os trade-offs estruturais antes de discutir posições ideológicas. Economia não tem lado — tem consequências.
- O aluno deve ser capaz de prever consequências de segunda e terceira ordem de uma decisão econômica antes de receber a resposta.
- Diferencie claramente Economia (ciência dos incentivos) de Finanças (gestão de capital pessoal/empresarial).
- Use exemplos do cotidiano do aluno (preço do pão, aluguel, salário) para ancorar conceitos abstratos.`,
        ementa: [
          'Oferta, Demanda e o Mecanismo de Preços',
          'Incentivos e Consequências Não-Intencionais',
          'Custo de Oportunidade e Trade-offs',
          'Inflação, Juros e Política Monetária',
          'Comércio Internacional e Vantagem Comparativa',
          'Ciclos Econômicos (Boom, Recessão, Recuperação)'
        ]
      },
      {
        slug: 'estatistica',
        nome: 'Estatística & Dados',
        emoji: '📊',
        parent: 'fundamentos',
        descricao: 'A linguagem da incerteza. Interpretar dados, identificar viés e pensar probabilisticamente.',
        contexto: `Foco: raciocínio probabilístico e alfabetização em dados — a capacidade de não ser enganado por números.

Abordagem obrigatória:
- Explique o conceito estatístico usando situações do cotidiano antes de qualquer fórmula. O aluno deve entender a intuição antes da notação.
- Para viés de amostragem e p-value: explique o mecanismo pelo qual conclusões erradas são produzidas antes de ensinar a ferramenta de correção.
- Sempre que apresentar um dado ou gráfico: peça ao aluno para identificar o que pode estar errado ou omitido ANTES de revelar.
- Correlação vs Causalidade deve ser um tema recorrente em toda a ementa, não apenas um tópico isolado.
- Use manchetes de jornal e pesquisas reais como material de análise crítica.`,
        ementa: [
          'Média, Mediana e Moda (Quando Cada Uma Mente)',
          'Distribuição Normal e o Conceito de Desvio',
          'Probabilidade Condicional (Bayes no Cotidiano)',
          'Correlação vs Causalidade (A Armadilha Eterna)',
          'Viés de Amostragem e Representatividade',
          'Como Ler Gráficos Sem Ser Manipulado'
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
            slug: 'violao',
            nome: 'Violão Prático',
            emoji: '🎸',
            parent: 'musica',
            descricao: 'Fundamentos de cordas, cifras e levadas rítmicas aplicadas.',
            contexto: `Foco: mecanismos técnicos reais — postura, tensão muscular, transição de acordes.

Abordagem obrigatória:
- Explique o mecanismo físico e muscular antes de pedir execução. O aluno precisa entender o que o corpo deve fazer e por quê antes de tentar.
- Para transição de acordes: explique o que causa lentidão ou travamento antes de propor exercícios.
- Corrija tensão e postura explicando o mecanismo do problema — não apenas dizendo "relaxa a mão".
- Exercício prático só depois que o princípio técnico estiver estabelecido.`,
            ementa: [
              'Postura e Mão Esquerda',
              'Acordes Menores Iniciais (Am, Em)',
              'Acordes Maiores (C, G, D)',
              'Transição e Memória Muscular',
              'Ritmo e Levadas de Mão Direita'
            ]
          },
          {
            slug: 'piano',
            nome: 'Teclas & Harmonia',
            emoji: '🎹',
            parent: 'musica',
            descricao: 'Arranjos harmônicos, tríades, leitura e independência motora.',
            contexto: `Foco: harmonia aplicada e independência motora — tríades, progressões, coordenação.

Abordagem obrigatória:
- Explique o princípio harmônico antes de pedir execução. O aluno precisa entender por que aquela progressão funciona musicalmente.
- Para independência de mãos: explique o mecanismo cognitivo e muscular do problema antes de propor exercícios.
- Uma mão de cada vez, com compreensão do papel de cada uma antes de integrá-las.
- Nunca peça execução sem antes estabelecer o que o aluno está tentando produzir e por quê.`,
            ementa: [
              'Postura e Numeração de Dedos',
              'Acordes Naturais (Tríades)',
              'Progressões Básicas (Pop)',
              'Independência Mão Esquerda/Direita'
            ]
          },
          {
            slug: 'teoria-musical',
            nome: 'Teoria Musical Aplicada',
            emoji: '🎵',
            parent: 'musica',
            descricao: 'A matemática da música: escalas, percepção e formação de acordes.',
            contexto: `Foco: estrutura musical real — escalas, intervalos, campos harmônicos.

Abordagem obrigatória:
- Explique o princípio acústico ou matemático por trás de cada conceito antes de nomear ou formalizar.
- Para escalas: explique por que aquela sequência de intervalos produz aquele efeito sonoro antes de pedir que o aluno execute.
- Conecte com músicas reais que o aluno conhece para confirmar o mecanismo — não como ponto de partida.
- Solfejo e percepção antes de notação formal — o aluno deve ouvir o conceito antes de lê-lo.`,
            ementa: [
              'Escalas Maiores e Menores',
              'Formação de Tríades',
              'Intervalos Musicais',
              'Campos Harmônicos Simples'
            ]
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