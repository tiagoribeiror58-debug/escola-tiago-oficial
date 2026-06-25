import { MateriaConfig } from '@/types';

export const seducaoHub: MateriaConfig = {
  slug: 'seducao-hub',
  nome: 'Dinâmicas Sociais e Sedução',
  emoji: '🥂',
  descricao: 'The ultimate social mastery hub. From breaking the ice to relationship management, learn the deep mechanics of human attraction, emotional engineering, and building a magnetic lifestyle.',
  isCategory: true,
  contexto: `PERSONA:
You are the guy who lived everything he teaches — you did not read a book and theorize, you tested in the field and learned from public embarrassment. Today you understand attraction as social physics. Zero romanticism, zero misogyny, brutally honest about how it actually works. Never break this frame. You are not a generic AI — you are this specialist.`,
  children: [
    {
      slug: 'seducao-inner-game',
      nome: 'Jogo Interior e Confiança',
      emoji: '🧠',
      descricao: 'The foundation of all social success. Build an unshakeable self-image, destroy approach anxiety, and develop true emotional independence.',
      parent: 'seducao-hub',
      whyStart: 'Start here or you will waste all the techniques. Without the correct internal state, every approach will feel forced and will be perceived as such.',
      contexto: `PERSONA:
You are a former socially anxious introvert who spent 5 years systematically dismantling his own psychological blocks. Now a behavioral psychology practitioner. You teach that confidence is not "knowing it will work" but "knowing you will be fine regardless". Never break this frame. You are not a generic AI — you are this specialist.

Focus on behavioral psychology, practical stoicism, and cognitive restructuring. Teach that true confidence is not "knowing it will work out," but "knowing you will be fine regardless of the outcome".`,
      fases: [
        {
          nome: 'LEVEL 1 — COGNITIVE FOUNDATION (What is breaking you inside)',
          topicos: [
            'Desconstrução de Crenças Limitantes sobre Atração',
            'Ansiedade de Aproximação (AA): Entendendo a Resposta de Luta/Fuga',
            'Validação Interna vs. Externa (O Fim da Necessidade)',
            'Superando o Nice Guy: Por que agradou demais não funciona',
            'O Mecanismo do Julgamento Social: Por que o Cérebro Antecipa Rejeição',
            'Autocompaixão sem Auto-Sabotagem: A Diferença entre Gentileza e Fraqueza'
          ]
        },
        {
          nome: 'LEVEL 2 — IDENTITY AND PURPOSE (Who you are)',
          topicos: [
            'Identidade e Auto-Conceito: Quem você é quando ninguém está olhando',
            'Masculinidade e Propósito: A Missão como Âncora',
            'Congruência: Alinhar o que você Pensa, Fala e Faz',
            'Alto Status: O que Realmente Projeta Dominância Social',
            'Os 3 Níveis de Identidade: Comportamentos, Hábitos e Crenças Nucleares',
            'Construindo um Sistema de Valores Pessoais Invioláveis',
            'A Persona Social vs. O Verdadeiro Self: Máscara ou Armadura?'
          ]
        },
        {
          nome: 'LEVEL 3 — STATE AND PRESENCE (How you show up)',
          topicos: [
            'Presença e Grounding (Ancoragem Física)',
            'Estado Emocional: Como Calibrar sua Engenharia',
            'Controle de Frame: Quem dita a realidade da interação?',
            'Meditação e Mindfulness para Presença Social',
            'Regulação do Sistema Nervoso Autônomo (Simpático vs Parassimpático)',
            'Voz, Ritmo e Tonalidade: O Impacto Físico da Presença',
            'Contato Visual como Ferramenta de Dominância e Conexão'
          ]
        },
        {
          nome: 'LEVEL 4 — ANTIFRAGILITY AND ACTION (How you behave under pressure)',
          topicos: [
            'Independência de Resultado: O Paradoxo da Atração',
            'Lidando com Rejeição como Feedback Direto',
            'Abundância vs. Escassez na Prática',
            'Desapego do Resultado em Tempo Real',
            'Saindo da Zona de Conforto: O Protocolo de Exposição',
            'Comunidade e Accountability para Inner Game',
            'Construindo uma Rotina de Desenvolvimento Pessoal',
            'Antifragilidade Social: Crescer com a Pressão em vez de Quebrar',
            'Inércia Social: Por que Começar é Sempre o Passo Mais Difícil',
            'Pós-Rejeição: O Protocolo para Não Deixar uma Falha Definir o Padrão'
          ]
        }
      ]
    },
    {
      slug: 'seducao-cold-approach',
      nome: 'Abordagem a Frio e Aproximação',
      emoji: '🚶‍♂️',
      descricao: 'The art of starting interactions from absolute zero. Master body language, icebreakers, and quick transitions in any environment.',
      parent: 'seducao-hub',
      whyStart: 'With the internal state calibrated, it is time to act. This stage dismantles the fear of approaching by deconstructing the mechanics of the approach.',
      contexto: `PERSONA:
You are a social calibration expert who has approached thousands of strangers in every possible environment. You see social interactions as a decipherable matrix of micro-expressions and body language. Never break this frame. You are not a generic AI — you are this specialist.

Focus on pure mechanics: approach angles, voice tonality, social calibration, and transitions.`,
      fases: [
        {
          nome: 'Fase 1 — Fundamentos: A Abertura',
          topicos: [
            'A Regra dos 3 Segundos',
            'Linguagem Corporal de Alto Status (Postura, Contato Visual)',
            'Abridores Diretos vs. Indiretos: Quando usar cada um',
            'Tonalidade de Voz: Ascendente vs. Descendente',
            'O Falso Limite de Tempo (False Time Constraint)'
          ]
        },
        {
          nome: 'Fase 2 — Intermediário: Transição e Calibração',
          topicos: [
            'O Stack: Encadeando Observações para Manter a Conversa',
            'Transições Naturais: Saindo do Abridor para a Conversa',
            'Assumindo Familiaridade (Assume Rapport)',
            'Calibração Social: Lendo Sinais de Interesse (IOIs)',
            'Como Pedir o Contato de Forma Fluida'
          ]
        },
        {
          nome: 'Fase 3 — Avançado: Dinâmicas e Rotina',
          topicos: [
            'A Arte de Interromper e Voltar (False Exit)',
            'Grupo Dinâmico: Abordando Quando Ela Não Está Sozinha',
            'Lidando com Obstáculos (Cockblockers e Amigos)',
            'Onde Abordar: Dia vs. Noite, Ambientes e Contextos',
            'Ambiente Day Game vs Night Game: Diferenças Táticas',
            'Desenvolvendo uma Rotina Semanal de Abordagem',
            'Field Reports: Como Analisar suas Saídas',
            'Os 5 Estágios do Aprendizado de Cold Approach'
          ]
        }
      ]
    },
    {
      slug: 'seducao-emocao',
      nome: 'Engenharia Emocional',
      emoji: '🔥',
      descricao: 'Attraction is not logical, it is emotional. Learn to generate tension, break predictability, and create emotional peaks that anchor real interest.',
      parent: 'seducao-hub',
      whyStart: 'You already know how to open. Now you need to sustain it. Logical conversations kill interest — this stage teaches you to create emotional variation, tension, and mystery.',
      contexto: `PERSONA:
You are a master of emotional dynamics who understands that human connection thrives on tension and unpredictability, not logic. You teach communication as an art of evoking feelings. Never break this frame. You are not a generic AI — you are this specialist.

Focus on advanced conversation dynamics: Push/Pull, qualification, sexual tension, and storytelling.`,
      fases: [
        {
          nome: 'Fase 1 — Fundamentos: Tensão e Puxa-Empurra',
          topicos: [
            'Fuga da Entrevista Lógica: Como Evocar Emoções',
            'A Mecânica do Push e Pull (Afastar e Puxar)',
            'Quebra de Rapport vs. Busca de Rapport',
            'Provocações e Teasing Calibrado',
            'Misoginia vs. Playfulness: A Diferença Crítica'
          ]
        },
        {
          nome: 'Fase 2 — Intermediário: Investimento e Conexão',
          topicos: [
            'Qualificação: O Jogo de Fazer a Pessoa Investir',
            'O Olhar e a Comunicação Não-Verbal',
            'Criando Loops Abertos: O Interesse da Antecipação',
            'Storytelling Magnético: Estrutura de Boas Histórias',
            'Humor Como Ferramenta de Atração'
          ]
        },
        {
          nome: 'Fase 3 — Avançado: Vulnerabilidade e Tensão Sexual',
          topicos: [
            'Tensão Sexual: Escalação Verbal e Subtexto',
            'Vulnerabilidade Forte: Conectando Níveis Profundos',
            'Rapport Profundo: Encontrando Valores Comuns',
            'A Transição do Flerte para a Conexão Real',
            'Fluxo de Estado: Conversando sem Esforço',
            'Improvisação Emocional: Reagindo, não Planejando',
            'Calibração Avançada: Lendo Microexpressões'
          ]
        }
      ]
    },
    {
      slug: 'seducao-text-game',
      nome: 'Text Game e Digital',
      emoji: '📱',
      descricao: 'The game has moved to screens. Master escalation via WhatsApp/Instagram, how to keep interest high, and close dates quickly and efficiently.',
      parent: 'seducao-hub',
      whyStart: 'After the approach, the game goes to the phone. The goal is unique: book the date.',
      contexto: `PERSONA:
You are an expert in digital communication psychology. You know that texting is a tool for logistics, not conversation. You optimize every message for the highest probability of an in-person meeting. Never break this frame. You are not a generic AI — you are this specialist.

Focus on text utility: the goal of the text is to book the date, not to become friends via chat.`,
      fases: [
        {
          nome: 'Fase 1 — Fundamentos: A Lógica do Texto',
          topicos: [
            'A Regra do Ouro do Texto: Objetivo é o Encontro',
            'A Primeira Mensagem (O Callback Humorístico)',
            'Proporção de Investimento (Quem escreve mais?)',
            'Tempo de Resposta Estratégico (Pacing)',
            'Tom e Calibração no Texto vs Ao Vivo'
          ]
        },
        {
          nome: 'Fase 2 — Intermediário: Diferenciação e Testes',
          topicos: [
            'Como se Distinguir de 100 Outros Caras no Celular Dela',
            'Emojis e Linguagem Informal: Quando usar',
            'Shit Tests via Mensagem: Como Desarmar e Inverter',
            'Uso de Áudios e Fotos para Gerar Proximidade',
            'Instagram como Canal de Aquecimento'
          ]
        },
        {
          nome: 'Fase 3 — Avançado: Fechamento e Recuperação',
          topicos: [
            'Fechamento Sólido: Extraindo o Sim para o Date',
            'Reengajamento: Ressuscitando Contatos Frios (Ping Texts)',
            'Quando e Como Ligar (Phone Game)',
            'Gestão de Múltiplas Conversas sem Perder o Fio'
          ]
        }
      ]
    },
    {
      slug: 'seducao-lifestyle',
      nome: 'Estilo de Vida e Engenharia Social',
      emoji: '🌍',
      descricao: 'Attractive people have attractive lives. Learn to structure your social circles, social media, and lifestyle so that interactions happen on autopilot.',
      parent: 'seducao-hub',
      whyStart: 'Up to here you learned to play the game. Now you change the board.',
      contexto: `PERSONA:
You are a social architect. You build your life as a platform where high-value interactions happen naturally. You understand that the environment you curate does 80% of the work for you. Never break this frame. You are not a generic AI — you are this specialist.

Focus on social value, pre-selection, and creating events/communities where the student is the center (Hub).`,
      fases: [
        {
          nome: 'Fase 1 — Fundamentos: Valor Visual e Pessoal',
          topicos: [
            'Efeito Halo: Grooming, Estilo e Primeira Impressão',
            'O Estilo como Comunicação Não-Verbal',
            'Fitness como Base de Atração e Confiança',
            'Vitrine Digital: Otimização Rápida de Instagram',
            'Missão e Propósito como o Maior Afrodisíaco'
          ]
        },
        {
          nome: 'Fase 2 — Intermediário: Engenharia Social',
          topicos: [
            'Valor Social Pré-Comunicado (Pré-Seleção)',
            'O Paradigma do Organizador (Seja o Conector)',
            'Networking Estratégico: Conhecendo as Pessoas Certas',
            'Como Entrar em Círculos de Alto Valor',
            'Wingman Dynamics: Como Agir em Dupla na Noite'
          ]
        },
        {
          nome: 'Fase 3 — Avançado: Estilo de Vida e Status',
          topicos: [
            'Transição de Status: De Conhecido a Convidado VIP',
            'Hospedando Eventos: O Jogo de Morar Sozinho',
            'Viagens e Experiências como Capital Social',
            'Construindo uma Vida que Atrai sem Esforço Consciente'
          ]
        }
      ]
    },
    {
      slug: 'seducao-relacionamentos',
      nome: 'Gestão de Relacionamentos',
      emoji: '👑',
      descricao: 'Attraction is the first part. Learn to lead the date, maintain interest, and establish leadership boundaries in long-term relationships.',
      parent: 'seducao-hub',
      whyStart: 'The final module. Everything you learned before was to get here. Long-term relationships require polarity, leadership, and tension maintenance.',
      contexto: `PERSONA:
You are a couples therapist and relationship strategist. You know that maintaining attraction over time requires polarity, boundaries, and active leadership, far beyond the initial spark. Never break this frame. You are not a generic AI — you are this specialist.

Focus on pragmatic masculine leadership, date dynamics, and boundary setting.`,
      fases: [
        {
          nome: 'Fase 1 — Fundamentos: O Encontro (Date)',
          topicos: [
            'O Primeiro Date: Objetivos, Duração e Dinâmica',
            'A Arquitetura do Encontro Perfeito (Múltiplos Venues)',
            'Liderança Decisiva: "Nós Vamos Ali" vs. "O Que Você Quer?"',
            'Pagando a Conta: A Abordagem Estratégica',
            'Como Recuperar um Date que Está Esfriando'
          ]
        },
        {
          nome: 'Fase 2 — Intermediário: Escalada e Transição',
          topicos: [
            'Escalada Física (Kino): Fluidez e Consentimento',
            'A Transição para a Logística Final (A Casa)',
            'Estabelecimento de Limites (Boundaries) no Início',
            'Polaridade Sexual: O Papel da Energia Masculina',
            'Prevenção do Efeito Amigo: Como Manter a Tensão Ativa'
          ]
        },
        {
          nome: 'Fase 3 — Avançado: Relacionamento e Gestão',
          topicos: [
            'Lidando com Testes de Congruência em Relacionamentos',
            'Relacionamento Aberto vs. Exclusivo: A Conversa',
            'Ciúme e Possessividade: Gestão Estrutural',
            'Saindo de um Relacionamento sem Dramas',
            'Saúde Mental em Relacionamentos Intensos',
            'Quando Parar e Avaliar sua Vida Amorosa',
            'Integrando Tudo: Inner Game + Habilidades Sociais + Lifestyle'
          ]
        }
      ]
    },
    {
      slug: 'comportamento-masculino-alita',
      nome: 'Comportamento Masculino e Realismo',
      emoji: '👁️',
      descricao: 'The study of feminine nature and masculine behavior without romantic illusions. Deconstruction of idealism and strengthening of inner strength and emotional independence.',
      parent: 'seducao-hub',
      whyStart: 'This stage acts as an antidote to romantic illusions. It is essential for men to understand the power dynamics and not be held emotionally hostage by interactions.',
      contexto: `PERSONA:
You are a scholar of praxeology and evolutionary psychology. You deconstruct romantic illusions with cold realism and emphasize male stoicism and independence above all else. Never break this frame. You are not a generic AI — you are this specialist.

Focus on the concepts discussed by Nessahan Alita and theorists of masculine praxeology. Explain the logic behind passion as weakness, emotional traps (tests and manipulations), and the pursuit of authenticity and inner strength, always maintaining technical rigor and avoiding cheap misogyny.`,
      fases: [
        {
          nome: 'Fase 1 — Fundamentos: A Queda das Ilusões',
          topicos: [
            'A Desconstrução do Mito do Amor Romântico',
            'A Ilusão da Alma Gêmea e o Especialismo ("Ela é Diferente")',
            'O Paradoxo da Paixão: A paixão como fraqueza masculina',
            'A Lógica Feminina vs. A Lógica Masculina',
            'A Síndrome do Cavaleiro Branco: O perigo de tentar "salvar" mulheres',
            'Compreensão Praxeológica: A Natureza Hipergâmica e a Segurança'
          ]
        },
        {
          nome: 'Fase 2 — Intermediário: Dinâmicas e Testes',
          topicos: [
            'O Magnetismo da Frieza: Por que a indiferença atrai',
            'A Dinâmica do Desprezo: Invertendo a polaridade de poder',
            'Testes de Congruência: Como e por que as mulheres testam os homens',
            'O Teste da Fidelidade e a Provocação de Ciúmes',
            'A Chantagem Emocional e a Manipulação Sutil',
            'O Jogo da Culpa: Como evitar assumir responsabilidades que não são suas',
            'A Dinâmica da Reclamação: Por que tentar resolver o problema dela costuma falhar',
            'Como Lidar com a Competição Feminina e as "Amigas" Dela'
          ]
        },
        {
          nome: 'Fase 3 — Avançado: Liderança e Estoicismo',
          topicos: [
            'O Silêncio Estratégico: A arma contra as provocações e o drama',
            'Lidando com as Flutuações de Humor e a Instabilidade Emocional',
            'O Desapego Verdadeiro vs. O Desapego Falsificado (Atuação)',
            'Autocontrole Emocional: A Arte do Não Reagir (Non-reaction)',
            'O Poder do "Não": Estabelecendo limites sem agressividade',
            'Lidando com a "Rebeldia" Feminina sem Perder a Liderança',
            'O Ego Masculino como Ponto Cego e Alvo Fácil',
            'Recuperando o Controle Após Ter Sido Subjugado Emocionalmente',
            'A Necessidade de um Propósito Maior que a Relação',
            'A Desmistificação da "Guerra dos Sexos": Sobrevivendo com inteligência'
          ]
        }
      ],
      layout: 'narrative'
    },
    {
      slug: 'seducao-humor',
      nome: 'Humor Natural e Carisma',
      emoji: '🎭',
      descricao: 'A desconstrução mecânica de como ser divertido e magnético sem parecer um "palhaço" ou precisar forçar piadas prontas.',
      parent: 'seducao-hub',
      whyStart: 'Pessoas carismáticas têm uma vantagem injusta na vida. O humor abaixa as defesas, gera atração instantânea e quebra o gelo social em segundos.',
      contexto: `PERSONA:
You are a charismatic conversationalist who understands that humor is just well-timed tension breaking. You don't try to be funny; you find the absurdity in reality and point it out playfully. Never break this frame. You are not a generic AI — you are this specialist.

Foco em como o humor é uma habilidade treinável de quebra de expectativa e state control, e não um dom místico.`,
      fases: [
        {
          nome: 'Fase 1 — Fundamentos: A Mecânica do Riso',
          topicos: [
            'O Paradoxo do Humor: Por que tentar ser engraçado te faz sem graça',
            'Tensão e Alívio: A fórmula matemática por trás de toda piada',
            'O Estado de "Playfulness" (Lúdico): Humor não é texto, é intenção',
            'Auto-Diversão (Amuse Yourself): O segredo para não precisar da validação alheia'
          ]
        },
        {
          nome: 'Fase 2 — Intermediário: Técnicas e Calibração',
          topicos: [
            'Misdirection (Falsa Expectativa): Como quebrar o padrão lógico',
            'Exagero Absurdo e Sarcasmo Calibrado',
            'O Call-back (Ressurgência): Como transformar piadas internas em conexão',
            'Teasing (Provocação): Como rir das pessoas de forma magnética'
          ]
        },
        {
          nome: 'Fase 3 — Avançado: Carisma e Espontaneidade',
          topicos: [
            'Observational Humor: Encontrando o absurdo no ambiente em tempo real',
            'O Risco Social e a Coragem de Ser Absurdo (Vulnerabilidade)',
            'Carisma Físico: Linguagem corporal aberta, sorrisos e uso do silêncio',
            'Como lidar com piadas que falham ("Bombing") com confiança absoluta'
          ]
        }
      ]
    }
  ]
};
