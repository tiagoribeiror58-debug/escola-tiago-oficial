import { MateriaConfig } from '@/types';

export const seducaoHub: MateriaConfig = {
  slug: 'seducao-hub',
  nome: 'Dinâmica Social & Sedução',
  emoji: '🥂',
  descricao: 'O hub definitivo de maestria social. Da quebra de gelo à gestão de relacionamentos, aprenda a mecânica profunda da atração humana, engenharia emocional e construção de um estilo de vida magnético.',
  isCategory: true,
  children: [
    {
      slug: 'seducao-inner-game',
      nome: 'Inner Game & Confiança',
      emoji: '🧠',
      descricao: 'A base de todo sucesso social. Construa uma autoimagem inabalável, destrua a ansiedade de aproximação e desenvolva a verdadeira independência emocional.',
      parent: 'seducao-hub',
      whyStart: 'Comece aqui ou você vai desperdiçar todas as técnicas. Sem o estado interno correto, cada abordagem vai parecer forçada e vai ser percebida como tal.',
      contexto: 'Foque em psicologia comportamental, estoicismo prático e reestruturação cognitiva. Ensine que a verdadeira confiança não é "saber que vai dar certo", mas "saber que ficará bem independente do resultado".',
      fases: [
        {
          nome: 'NÍVEL 1 — FUNDAÇÃO COGNITIVA (O que está quebrando você por dentro)',
          topicos: [
            'Desconstrução de Crenças Limitantes sobre Atração',
            'Ansiedade de Aproximação (AA): Entendendo a Resposta de Luta/Fuga',
            'Validação Interna vs. Externa (O Fim da Necessidade)',
            'Superando o Nice Guy: Por que agradou demais não funciona'
          ]
        },
        {
          nome: 'NÍVEL 2 — IDENTIDADE E PROPÓSITO (Quem você é)',
          topicos: [
            'Identidade e Auto-Conceito: Quem você é quando ninguém está olhando',
            'Masculinidade e Propósito: A Missão como Âncora',
            'Congruência: Alinhar o que você Pensa, Fala e Faz',
            'Alto Status: O que Realmente Projeta Dominância Social'
          ]
        },
        {
          nome: 'NÍVEL 3 — ESTADO E PRESENÇA (Como você aparece)',
          topicos: [
            'Presença e Grounding (Ancoragem Física)',
            'Estado Emocional: Como Calibrar sua Energia',
            'Controle de Frame: Quem dita a realidade da interação?',
            'Meditação e Mindfulness para Presença Social'
          ]
        },
        {
          nome: 'NÍVEL 4 — ANTIFRAGILIDADE E AÇÃO (Como você se comporta sob pressão)',
          topicos: [
            'Independência de Resultado: O Paradoxo da Atração',
            'Lidando com Rejeição como Feedback Direto',
            'Abundância vs. Escassez na Prática',
            'Desapego do Resultado em Tempo Real',
            'Saindo da Zona de Conforto: O Protocolo de Exposição',
            'Comunidade e Accountability para Inner Game',
            'Construindo uma Rotina de Desenvolvimento Pessoal'
          ]
        }
      ]
    },
    {
      slug: 'seducao-cold-approach',
      nome: 'Cold Approach & Abordagem',
      emoji: '🚶‍♂️',
      descricao: 'A arte de iniciar interações do zero absoluto. Domine a linguagem corporal, as quebras de gelo e as transições rápidas em qualquer ambiente.',
      parent: 'seducao-hub',
      whyStart: 'Com o estado interno calibrado, é hora de agir. Esta etapa desmonta o medo de abordar desconstruindo a mecânica da aproximação.',
      contexto: 'Foque em mecânica pura: ângulos de aproximação, tonalidade de voz, calibração social e transições.',
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
      nome: 'Engenharia Emocional',
      emoji: '🔥',
      descricao: 'A atração não é lógica, é emocional. Aprenda a gerar tensão, quebrar a previsibilidade e criar picos emocionais que ancoram interesse real.',
      parent: 'seducao-hub',
      whyStart: 'Você já sabe abrir. Agora precisa sustentar. Conversas lógicas matam o interesse — esta etapa ensina a criar variação emocional, tensão e mistério.',
      contexto: 'Foque em dinâmicas de conversação avançadas: Push/Pull, qualificação, tensão sexual e storytelling.',
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
      descricao: 'O jogo mudou para as telas. Domine a escalada via WhatsApp/Instagram, como manter o interesse alto e fechar encontros de forma rápida e eficiente.',
      parent: 'seducao-hub',
      whyStart: 'Depois da abordagem, o jogo vai para o celular. O objetivo é único: marcar o encontro.',
      contexto: 'Foque na utilidade do texto: o objetivo do texto é marcar o encontro, não virar amigo por chat.',
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
      nome: 'Lifestyle & Engenharia Social',
      emoji: '🌍',
      descricao: 'Pessoas atraentes têm vidas atraentes. Aprenda a estruturar seus círculos sociais, redes sociais e estilo de vida para que as interações ocorram no automático.',
      parent: 'seducao-hub',
      whyStart: 'Até aqui você aprendeu a jogar o jogo. Agora você muda o tabuleiro.',
      contexto: 'Foque em valor social, pré-seleção, e criação de eventos/comunidades onde o aluno seja o centro (Hub).',
      ementa: [
        'O Paradigma do Organizador (Seja o Conector)',
        'Valor Social Pré-Comunicado (Pré-Seleção)',
        'Efeito Halo: Grooming, Estilo e Primeira Impressão',
        'Como Entrar em Círculos de Alto Valor',
        'Networking Estratégico: Conhecendo as Pessoas Certas',
        'O Estilo como Comunicação Não-Verbal',
        'Fitness como Base de Atração e Confiança',
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
      nome: 'Gestão de Relacionamentos',
      emoji: '👑',
      descricao: 'Atrair é a primeira parte. Aprenda a conduzir o encontro, fazer a manutenção do interesse e estabelecer limites de liderança em relacionamentos longos.',
      parent: 'seducao-hub',
      whyStart: 'O módulo final. Tudo que você aprendeu antes era para chegar aqui. Relacionamentos de longo prazo exigem polaridade, liderança e manutenção da tensão.',
      contexto: 'Foque na liderança masculina pragmática, dinâmica de encontros e definição de limites.',
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
      nome: 'Comportamento Masculino & Realismo',
      emoji: '👁️',
      descricao: 'O estudo da natureza feminina e do comportamento masculino sem ilusões românticas. Desconstrução do idealismo e fortalecimento da força interior e independência emocional.',
      parent: 'seducao-hub',
      whyStart: 'Esta etapa atua como um antídoto contra as ilusões românticas. É essencial para o homem entender as dinâmicas de poder e não ser refém emocional das interações.',
      contexto: 'Foque nos conceitos discorridos por Nessahan Alita e teóricos da praxeologia masculina. Explique a lógica por trás da paixão como fraqueza, as armadilhas emocionais (testes e manipulações) e a busca por autenticidade e fortaleza interior, sempre mantendo o rigor técnico e evitando misoginia barata.',
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
