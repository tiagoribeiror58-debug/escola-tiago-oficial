import { MateriaConfig } from '@/types';

export const seducaoHub: MateriaConfig = {
  slug: 'seducao-hub',
  nome: 'Social Dynamics & Seduction',
  emoji: '🥂',
  descricao: 'The ultimate social mastery hub. From breaking the ice to relationship management, learn the deep mechanics of human attraction, emotional engineering, and building a magnetic lifestyle.',
  isCategory: true,
  children: [
    {
      slug: 'seducao-inner-game',
      nome: 'Inner Game & Confidence',
      emoji: '🧠',
      descricao: 'The foundation of all social success. Build an unshakeable self-image, destroy approach anxiety, and develop true emotional independence.',
      parent: 'seducao-hub',
      whyStart: 'Start here or you will waste all the techniques. Without the correct internal state, every approach will feel forced and will be perceived as such.',
      contexto: 'Focus on behavioral psychology, practical stoicism, and cognitive restructuring. Teach that true confidence is not "knowing it will work out," but "knowing you will be fine regardless of the outcome".',
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
      nome: 'Cold Approach & Approaching',
      emoji: '🚶‍♂️',
      descricao: 'The art of starting interactions from absolute zero. Master body language, icebreakers, and quick transitions in any environment.',
      parent: 'seducao-hub',
      whyStart: 'With the internal state calibrated, it is time to act. This stage dismantles the fear of approaching by deconstructing the mechanics of the approach.',
      contexto: 'Focus on pure mechanics: approach angles, voice tonality, social calibration, and transitions.',
      ementa: [
        'Linguagem Corporal de Alto Status (Postura, Contato Visual)',
        'A Regra dos 3 Segundos',
        'Abridores Diretos vs. Indiretos: Quando usar cada um',
        'O Falso Limite de Tempo (False Time Constraint)',
        'Tonalidade de Voz: Ascendente vs. Descendente',
        'Onde Abordar: Dia vs. Noite, Ambientes e Contextos',
        'O Stack: Encadeando Observações para Manter a Conversa',
        'Assumindo Familiaridade (Assume Rapport)',
        'Transições Naturais: Saindo do Abridor para a Conversa',
        'Calibração Social: Lendo Sinais de Interesse (IOIs)',
        'Como Pedir o Contato de Forma Fluida',
        'A Arte de Interromper e Voltar (False Exit)',
        'Grupo Dinâmico: Abordando Quando Ela Não Está Sozinha',
        'Lidando com Obstáculos (Cockblockers e Amigos)',
        'Desenvolvendo uma Rotina Semanal de Abordagem',
        'Field Reports: Como Analisar suas Saídas',
        'Os 5 Estágios do Aprendizado de Cold Approach',
        'Ambiente Day Game vs Night Game: Diferenças Táticas'
      ]
    },
    {
      slug: 'seducao-emocao',
      nome: 'Emotional Engineering',
      emoji: '🔥',
      descricao: 'Attraction is not logical, it is emotional. Learn to generate tension, break predictability, and create emotional peaks that anchor real interest.',
      parent: 'seducao-hub',
      whyStart: 'You already know how to open. Now you need to sustain it. Logical conversations kill interest — this stage teaches you to create emotional variation, tension, and mystery.',
      contexto: 'Focus on advanced conversation dynamics: Push/Pull, qualification, sexual tension, and storytelling.',
      ementa: [
        'Fuga da Entrevista Lógica: Como Evocar Emoções',
        'A Mecânica do Push e Pull (Afastar e Puxar)',
        'Quebra de Rapport vs. Busca de Rapport',
        'Provocações e Teasing Calibrado',
        'Misoginia vs. Playfulness: A Diferença Crítica',
        'O Olhar e a Comunicação Não-Verbal',
        'Criando Loops Abertos: O Interesse da Antecipação',
        'Qualificação: O Jogo de Fazer a Pessoa Investir',
        'Storytelling Magnético: Estrutura de Boas Histórias',
        'Vulnerabilidade Forte: Conectando Níveis Profundos',
        'Tensão Sexual: Escalação Verbal e Subtexto',
        'Humor Como Ferramenta de Atração',
        'Rapport Profundo: Encontrando Valores Comuns',
        'A Transição do Flerte para a Conexão Real',
        'Fluxo de Estado: Conversando sem Esforço',
        'Improvisação Emocional: Reagindo, não Planejando',
        'Calibração Avançada: Lendo Microexpressões'
      ]
    },
    {
      slug: 'seducao-text-game',
      nome: 'Text Game & Digital',
      emoji: '📱',
      descricao: 'The game has moved to screens. Master escalation via WhatsApp/Instagram, how to keep interest high, and close dates quickly and efficiently.',
      parent: 'seducao-hub',
      whyStart: 'After the approach, the game goes to the phone. The goal is unique: book the date.',
      contexto: 'Focus on text utility: the goal of the text is to book the date, not to become friends via chat.',
      ementa: [
        'A Primeira Mensagem (O Callback Humorístico)',
        'A Regra do Ouro do Texto: Objetivo é o Encontro',
        'Proporção de Investimento (Quem escreve mais?)',
        'Tempo de Resposta Estratégico (Pacing)',
        'Tom e Calibração no Texto vs Ao Vivo',
        'Emojis e Linguagem Informal: Quando usar',
        'Como se Distinguir de 100 Outros Caras no Celular Dela',
        'Shit Tests via Mensagem: Como Desarmar e Inverter',
        'Uso de Áudios e Fotos para Gerar Proximidade',
        'Reengajamento: Ressuscitando Contatos Frios (Ping Texts)',
        'Fechamento Sólido: Extraindo o Sim para o Date',
        'Instagram como Canal de Aquecimento',
        'Quando e Como Ligar (Phone Game)',
        'Gestão de Múltiplas Conversas sem Perder o Fio'
      ]
    },
    {
      slug: 'seducao-lifestyle',
      nome: 'Lifestyle & Social Engineering',
      emoji: '🌍',
      descricao: 'Attractive people have attractive lives. Learn to structure your social circles, social media, and lifestyle so that interactions happen on autopilot.',
      parent: 'seducao-hub',
      whyStart: 'Up to here you learned to play the game. Now you change the board.',
      contexto: 'Focus on social value, pre-selection, and creating events/communities where the student is the center (Hub).',
      ementa: [
        'O Paradigma do Organizador (Seja o Conector)',
        'Valor Social Pré-Comunicado (Pré-Seleção)',
        'Efeito Halo: Grooming, Estilo e Primeira Impressão',
        'Como Entrar em Círculos de Alto Valor',
        'Networking Estratégico: Conhecendo as Pessoas Certas',
        'O Estilo como Comunicação Não-Verbal',
        'Fitness como Base de Atração and Confiança',
        'Vitrine Digital: Otimização Rápida de Instagram',
        'Wingman Dynamics: Como Agir em Dupla na Noite',
        'Hospedando Eventos: O Jogo de Morar Sozinho',
        'Transição de Status: De Conhecido a Convidado VIP',
        'Construindo uma Vida que Atrai sem Esforço Consciente',
        'Missão e Propósito como o Maior Afrodisíaco',
        'Viagens e Experiências como Capital Social'
      ]
    },
    {
      slug: 'seducao-relacionamentos',
      nome: 'Relationship Management',
      emoji: '👑',
      descricao: 'Attraction is the first part. Learn to lead the date, maintain interest, and establish leadership boundaries in long-term relationships.',
      parent: 'seducao-hub',
      whyStart: 'The final module. Everything you learned before was to get here. Long-term relationships require polarity, leadership, and tension maintenance.',
      contexto: 'Focus on pragmatic masculine leadership, date dynamics, and boundary setting.',
      ementa: [
        'A Arquitetura do Encontro Perfeito (Múltiplos Venues)',
        'Liderança Decisiva: "Nós Vamos Ali" vs. "O Que Você Quer?"',
        'Escalada Física (Kino): Fluidez e Consentimento',
        'A Transição para a Logística Final (A Casa)',
        'O Primeiro Date: Objetivos, Duração e Dinâmica',
        'Como Recuperar um Date que Está Esfriando',
        'Pagando a Conta: A Abordagem Estratégica',
        'Estabelecimento de Limites (Boundaries) no Início',
        'Polaridade Sexual: O Papel da Energia Masculina',
        'Lidando com Testes de Congruência em Relacionamentos',
        'Prevenção do Efeito Amigo: Como Manter a Tensão Ativa',
        'Relacionamento Aberto vs. Exclusivo: A Conversa',
        'Ciúme e Possessividade: Gestão Estrutural',
        'Saindo de um Relacionamento sem Dramas',
        'Integrando Tudo: Inner Game + Habilidades Sociais + Lifestyle',
        'Saúde Mental em Relacionamentos Intensos',
        'Quando Parar e Avaliar sua Vida Amorosa'
      ]
    },
    {
      slug: 'comportamento-masculino-alita',
      nome: 'Masculine Behavior & Realism',
      emoji: '👁️',
      descricao: 'The study of feminine nature and masculine behavior without romantic illusions. Deconstruction of idealism and strengthening of inner strength and emotional independence.',
      parent: 'seducao-hub',
      whyStart: 'This stage acts as an antidote to romantic illusions. It is essential for men to understand the power dynamics and not be held emotionally hostage by interactions.',
      contexto: 'Focus on the concepts discussed by Nessahan Alita and theorists of masculine praxeology. Explain the logic behind passion as weakness, emotional traps (tests and manipulations), and the pursuit of authenticity and inner strength, always maintaining technical rigor and avoiding cheap misogyny.',
      ementa: [
        'A Desconstrução do Mito do Amor Romântico',
        'A Ilusão da Alma Gêmea e o Especialismo ("Ela é Diferente")',
        'O Magnetismo da Frieza: Por que a indiferença atrai',
        'O Paradoxo da Paixão: A paixão como fraqueza masculina',
        'A Dinâmica do Desprezo: Invertendo a polaridade de poder',
        'Testes de Congruência: Como e por que as mulheres testam os homens',
        'O Teste da Fidelidade e a Provocação de Ciúmes',
        'A Chantagem Emocional e a Manipulação Sutil',
        'O Jogo da Culpa: Como evitar assumir responsabilidades que não são suas',
        'O Ego Masculino como Ponto Cego e Alvo Fácil',
        'A Síndrome do Cavaleiro Branco: O perigo de tentar "salvar" mulheres',
        'Como a Ansiedade e a Carência Destroem a Atração Real',
        'A Lógica Feminina vs. A Lógica Masculina',
        'Lidando com as Flutuações de Humor e a Instabilidade Emocional',
        'O Silêncio Estratégico: A arma contra as provocações e o drama',
        'O Desapego Verdadeiro vs. O Desapego Falsificado (Atuação)',
        'O Sofrimento Masculino e o Crescimento através da Ruptura',
        'A Postura de Fortaleza: Lidando com a rejeição e a indiferença',
        'Autocontrole Emocional: A Arte do Não Reagir (Non-reaction)',
        'O Perigo da Validação Excessiva e da Bajulação',
        'Compreensão Praxeológica: A Natureza Hipergâmica e a Segurança',
        'A Dinâmica da Reclamação: Por que tentar resolver o problema dela costuma falhar',
        'O Poder do "Não": Estabelecendo limites sem agressividade',
        'Lidando com a "Rebeldia" Feminina sem Perder a Liderança',
        'Como Lidar com a Competição Feminina e as "Amigas" Dela',
        'A Ilusão da Amizade entre Homem e Mulher (Na visão pragmática)',
        'Recuperando o Controle Após Ter Sido Subjugado Emocionalmente',
        'A Necessidade de um Propósito Maior que a Relação',
        'A Desmistificação da "Guerra dos Sexos": Sobrevivendo com inteligência'
      ],
      layout: 'narrative'
    }
  ]
};
