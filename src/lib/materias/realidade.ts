import { MateriaConfig } from '@/types';

export const realidadeHub: MateriaConfig = {
  slug: 'realidade-hub',
  nome: 'Ontologia & Mecânica da Realidade',
  emoji: '🌌',
  isCategory: true,
  descricao: 'Física fundamental, neurociência da percepção e a cibernética da ação. A mecânica exata de como a realidade é construída e como o observador pode moldá-la matematicamente.',
  children: [
    {
      slug: 'fisica-ontologia',
      nome: 'Física, Caos e Sistemas Complexos',
      emoji: '⚛️',
      isCategory: false,
      parent: 'realidade-hub',
      whyStart: 'Antes de interagir com a realidade, você precisa entender as regras materiais absolutas que governam o universo.',
      descricao: 'As leis fundamentais do universo, dos limites da mecânica quântica até a entropia e o caos.',
      contexto: 'Ensine a física de forma dura e precisa. Destrua mitos pseudocientíficos. O objetivo é causar deslumbramento através do rigor científico (como Carl Sagan ou Richard Feynman). Mostre a beleza matemática do caos e da probabilidade.',
      fases: [
        {
          nome: 'Nível 1: Fundamentos da Matéria e Mecânica Clássica',
          topicos: [
            'O Método Científico e as Leis de Newton (O universo como relógio)',
            'Termodinâmica e Entropia (A seta do tempo e a inevitabilidade da degradação)',
            'Eletromagnetismo Básico: Luz e Informação'
          ]
        },
        {
          nome: 'Nível 2: O Estranho Mundo Quântico',
          topicos: [
            'O Modelo Padrão de Partículas: Quarks, Léptons e Bósons',
            'Dualidade Onda-Partícula e o Experimento da Fenda Dupla',
            'O Problema da Medição e a Interpretação de Copenhague (Bohr)',
            'O Gato de Schrödinger: Superposição e Decoerência Quântica',
            'O Multiverso Quântico: Interpretação de Muitos Mundos (Hugh Everett)',
            'Entrelaçamento Quântico e a Não-Localidade (O Paradoxo EPR)'
          ]
        },
        {
          nome: 'Nível 3: O Tecido do Espaço-Tempo',
          topicos: [
            'Relatividade Restrita: Dilatação do Tempo e a Constante "c"',
            'Relatividade Geral: A Gravidade como Curvatura',
            'Buracos Negros e Singularidades: Onde a física quebra'
          ]
        },
        {
          nome: 'Nível 4: Caos, Incerteza e Sistemas Não Lineares',
          topicos: [
            'Princípio da Incerteza de Heisenberg: Os limites rígidos do conhecimento',
            'Teoria do Caos e o Efeito Borboleta na Prática',
            'Atratores Estranhos e Sistemas Dinâmicos Não-Lineares',
            'A Matemática da Natureza: Fractalidade e Auto-Semelhança',
            'O Teorema da Incompletude de Gödel e os limites da própria lógica'
          ]
        },
        {
          nome: 'Nível 5: Teorias Emergentes e o Todo',
          topicos: [
            'Emergência: Como regras simples geram complexidade incompreensível',
            'Reducionismo vs Holismo: Os limites de quebrar as coisas em partes',
            'Teoria da Informação de Shannon e o Universo como Computação',
            'Princípio Holográfico: O Universo como projeção de informação'
          ]
        }
      ]
    },
    {
      slug: 'neuro-percepcao',
      nome: 'Neurociência da Percepção',
      emoji: '👁️',
      isCategory: false,
      parent: 'realidade-hub',
      whyStart: 'Você nunca experimentou a realidade base. Tudo o que você vive é uma simulação gerada pelo seu cérebro dentro de uma caixa escura.',
      descricao: 'O processamento preditivo, a ilusão do "Eu" e como o cérebro renderiza o mundo em tempo real.',
      contexto: 'Foco na neurociência cognitiva contemporânea (Anil Seth, Karl Friston). Ensine que vemos com o cérebro, não com os olhos. O foco é provar que a experiência humana é uma alucinação controlada, abrindo espaço para a reprogramação cognitiva.',
      fases: [
        {
          nome: 'Nível 1: O "Hardware" Sensorial',
          topicos: [
            'Anatomia do Processamento Sensorial: Da física à biologia',
            'O Atraso Neural: Por que você vive permanentemente no passado',
            'Vias de Processamento Visual: Como o cérebro enxerga o que os olhos não veem'
          ]
        },
        {
          nome: 'Nível 2: O Cérebro Preditivo (Predictive Coding)',
          topicos: [
            'O Cérebro como Máquina de Inferência Bayesiana',
            'Processamento Top-Down vs Bottom-Up na Percepção Diária',
            'A Realidade como uma "Alucinação Controlada" (Anil Seth)',
            'O Princípio da Energia Livre e a Minimização da Surpresa (Karl Friston)'
          ]
        },
        {
          nome: 'Nível 3: Filtros e Viéses Evolutivos',
          topicos: [
            'O Sistema Ativador Reticular Ascendente (SARA) e a Filtragem da Atenção',
            'Viéses Evolutivos: A máquina de detectar padrões (mesmo onde não existem)',
            'Ilusões de Ótica e Falhas Auditivas como Provas Algorítmicas',
            'Modelos Mentais como Algoritmos de Compressão da Realidade'
          ]
        },
        {
          nome: 'Nível 4: A Ilusão do Eu (O Observador)',
          topicos: [
            'A Rede de Modo Padrão (DMN): Onde habita a ansiedade e a ruminação',
            'A Ilusão da Identidade: O Ego como uma ferramenta evolutiva',
            'O Problema Difícil da Consciência (Qualia) e o Abismo Explicativo',
            'A Teoria do Espaço de Trabalho Global (Bernard Baars)'
          ]
        },
        {
          nome: 'Nível 5: Hackeando a Percepção',
          topicos: [
            'Neuroplasticidade Autodirigida: A mecânica de reescrever sinapses',
            'Estados Alterados e a Inibição do DMN (Dissolução Temporária do Ego)',
            'Linguagem como Limite Perceptivo (O Paradigma de Sapir-Whorf forte e fraco)'
          ]
        }
      ]
    },
    {
      slug: 'engenharia-realidade',
      nome: 'Cibernética da Ação ("Co-criação")',
      emoji: '⚙️',
      isCategory: false,
      parent: 'realidade-hub',
      whyStart: 'A união entre a física do ambiente e a neurociência da percepção resulta na capacidade pragmática de dobrar a probabilidade a seu favor.',
      descricao: 'A desmistificação científica da "Lei da Atração". Como operar como um observador ativo utilizando cibernética, foco e inércia.',
      contexto: 'Este é o ápice do Hub. Seja agressivo contra pseudociências e "O Segredo". Ensine "Lei da Atração" através da lente da Cibernética, Viés de Confirmação, Filtros de Atenção e Manipulação de Condições Iniciais no Teoria do Caos.',
      fases: [
        {
          nome: 'Nível 1: Desconstruindo o Misticismo',
          topicos: [
            'O Mito de "O Segredo" vs Mecânica Real da Intenção',
            'Física Quântica não é Magia (Onde os esotéricos erram)',
            'Viés de Confirmação e Atenção Seletiva disfarçados de "Atração"'
          ]
        },
        {
          nome: 'Nível 2: O Operador Cibernético',
          topicos: [
            'O Conceito de "Frame" (Moldura) como a principal interface com o mundo',
            'Cibernética de Primeira e Segunda Ordem: O observador dentro do sistema',
            'Loops de Feedback Positivo e Negativo na construção de realidades diárias',
            'Autopoiese (Maturana e Varela): O indivíduo como um sistema que recria a si mesmo'
          ]
        },
        {
          nome: 'Nível 3: Lidando com a Inércia (A Física da Ação)',
          topicos: [
            'Homeostase Ambiental: Por que o universo e as pessoas lutam contra a mudança',
            'A Física da Ação: Vencendo a inércia e lidando com o atrito sistêmico',
            'O Paradoxo da Rendição: Como parar de resistir à entropia permite redirecioná-la',
            'A Mecânica do Desapego: Reduzindo a fricção e o comportamento de escassez'
          ]
        },
        {
          nome: 'Nível 4: Engenharia de Probabilidade e Atratores',
          topicos: [
            'Alinhamento do SARA: O poder neurobiológico da atenção concentrada obsessiva',
            'Engenharia de Condições Iniciais: Mudanças diárias que causam Efeitos Borboleta',
            'Engenharia de Atratores de Probabilidade: Como inclinar o caos a seu favor',
            'Sincronicidade Científica: A interseção da preparação extrema com a variação estatística'
          ]
        },
        {
          nome: 'Nível 5: Manutenção Sistêmica Avançada',
          topicos: [
            'Visualização Ativa: Ensaio mental e o engajamento do córtex pré-motor',
            'O Colapso da Possibilidade: O ato da decisão irreversível como ponto de inflexão neural',
            'Epistemologia Pragmática: Avaliando suas crenças pela utilidade, não pela precisão absoluta'
          ]
        }
      ]
    }
  ]
};
