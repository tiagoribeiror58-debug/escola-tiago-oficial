import { MateriaConfig } from '@/types';

export const fundamentosAcademicos: MateriaConfig = {
  slug: 'fundamentos',
  nome: 'Ciências & Humanidades',
  emoji: '🏛️',
  isCategory: true,
  descricao: 'As ciências exatas, naturais, humanas e as artes. A base do modelo de mundo.',
  children: [
    {
      slug: 'ciencias-exatas',
      nome: 'Exatas & Naturais',
      emoji: '📐',
      isCategory: true,
      parent: 'fundamentos',
      descricao: 'O estudo rigoroso dos números, do espaço e do mundo físico.',
      children: [
        {
          slug: 'matematica',
          nome: 'Matemática',
          emoji: '∑',
          parent: 'ciencias-exatas',
          descricao: 'O estudo dos padrões, do raciocínio lógico-quantitativo e geometria.',
          contexto: `Foco: raciocínio matemático real — padrões, estrutura, modelagem.

Abordagem obrigatória:
- Explique o princípio matemático antes de apresentar o problema. O aluno precisa entender o que está sendo aplicado.
- Para resolução de problemas: exija que o aluno justifique cada passo com base no princípio.
- Nunca apresente fórmula sem explicar o que ela representa estruturalmente e de onde vem.`,
          ementa: [
            'A Lógica por trás das Frações e Proporções',
            'A Matemática do Comércio (Porcentagem)',
            'Equações do Primeiro Grau e Modelagem',
            'Geometria do Espaço e Pitágoras',
            'Funções como Máquinas de Transformação',
            'Introdução à Análise Combinatória'
          ]
        },
        {
          slug: 'fisica',
          nome: 'Física',
          emoji: 'λ',
          parent: 'ciencias-exatas',
          descricao: 'Compreensão das leis que regem o universo, energia e matéria.',
          contexto: `Foco: intuição física real — fenômenos, forças, conservação.

Abordagem obrigatória:
- Comece pelo fenômeno físico descrito em palavras. Explique o mecanismo intuitivo antes de qualquer equação.
- A fórmula é a última etapa — ela formaliza o que o aluno já deve ter compreendido conceitualmente.`,
          ementa: [
            'Cinemática: O Estudo do Movimento',
            'As 3 Leis de Newton',
            'Trabalho, Energia e Conservação',
            'Termodinâmica (Calor e Desordem)',
            'Eletromagnetismo Básico'
          ]
        },
        {
          slug: 'quimica',
          nome: 'Química',
          emoji: '⚗',
          parent: 'ciencias-exatas',
          descricao: 'O estudo das transformações moleculares e atômicas.',
          contexto: `Foco: mecanismos químicos reais — estrutura atômica, ligações, reações.`,
          ementa: [
            'A Estrutura do Átomo',
            'A Tabela Periódica (Leitura de Propriedades)',
            'Ligações Químicas',
            'Estequiometria (A Receita da Reação)',
            'Ácidos, Bases e pH'
          ]
        },
        {
          slug: 'biologia',
          nome: 'Biologia',
          emoji: '🧬',
          parent: 'ciencias-exatas',
          descricao: 'O estudo da vida, da célula aos ecossistemas complexos.',
          contexto: `Foco: mecanismos biológicos reais. Use a teoria da evolução como lente principal: "qual pressão seletiva produziu isso?"`,
          ementa: [
            'A Célula: A Fábrica da Vida',
            'Genética e DNA',
            'Evolução e Seleção Natural',
            'Sistemas Fisiológicos Humanos',
            'Ecologia e Teias Alimentares'
          ]
        },
        {
          slug: 'estatistica',
          nome: 'Estatística & Dados',
          emoji: '📊',
          parent: 'ciencias-exatas',
          layout: 'split',
          widget: 'EconGraph',
          descricao: 'A linguagem da incerteza. Interpretar dados, viés e pensamento probabilístico.',
          contexto: `Foco: raciocínio probabilístico. O aluno deve entender a intuição por trás da estatística para não ser enganado por números mal utilizados.`,
          ementa: [
            'Média, Mediana e Moda',
            'Distribuição Normal e Desvio',
            'Probabilidade Condicional (Bayes)',
            'Correlação vs Causalidade',
            'Viés de Amostragem'
          ]
        }
      ]
    },
    {
      slug: 'humanidades',
      nome: 'Humanidades & Letras',
      emoji: '📜',
      isCategory: true,
      parent: 'fundamentos',
      descricao: 'Compreensão histórica, social e filosófica da experiência humana.',
      children: [
        {
          slug: 'historia',
          nome: 'História',
          emoji: '⏳',
          parent: 'humanidades',
          descricao: 'Compreensão causal de eventos humanos e ciclos de civilizações.',
          contexto: `Foco: causalidade histórica real. Nunca comece por datas ou nomes isolados. Comece pelas condições estruturais que tornaram um evento possível.`,
          ementa: [
            'Revolução Agrícola e Cidades',
            'Império Romano: Ascensão e Queda',
            'Idade Média e Feudalismo',
            'Grandes Navegações e Globalização',
            'Revolução Industrial',
            'Grandes Guerras (Visão Geopolítica)'
          ]
        },
        {
          slug: 'filosofia',
          nome: 'Filosofia',
          emoji: '∞',
          parent: 'humanidades',
          descricao: 'A busca rigorosa por princípios fundamentais e dilemas éticos.',
          contexto: `Foco: argumentação filosófica. Antes de apresentar a posição de um filósofo, explique o problema que ele tentava resolver.`,
          ementa: [
            'O Método Socrático e a Maiêutica',
            'O Mito da Caverna (Platão)',
            'Aristóteles e a Ética',
            'Estoicismo (Controle da Mente)',
            'O Iluminismo e Kant',
            'Nihilismo e Existencialismo'
          ]
        },
        {
          slug: 'geografia',
          nome: 'Geografia',
          emoji: '🌍',
          parent: 'humanidades',
          descricao: 'As relações dinâmicas entre as sociedades e o espaço físico.',
          contexto: `Foco: relações causais entre espaço físico, clima, economia e geopolítica.`,
          ementa: [
            'Formação Geológica',
            'Clima e Biomas',
            'Demografia e Migrações',
            'Geopolítica Contemporânea',
            'Cadeias Produtivas Globais'
          ]
        },
        {
          slug: 'economia',
          nome: 'Economia',
          emoji: '💹',
          parent: 'humanidades',
          layout: 'split',
          widget: 'EconGraph',
          descricao: 'Como mercados, governos e incentivos moldam o comportamento humano.',
          contexto: `Foco: mecanismos econômicos reais — incentivos, trade-offs. Economia não tem lado, tem consequências.`,
          ementa: [
            'Oferta, Demanda e Preços',
            'Incentivos e Consequências',
            'Custo de Oportunidade',
            'Inflação e Política Monetária',
            'Comércio Internacional',
            'Ciclos Econômicos'
          ]
        },
        {
          slug: 'literatura',
          nome: 'Literatura',
          emoji: '📖',
          parent: 'humanidades',
          descricao: 'Interpretação profunda através do texto narrativo e poético.',
          contexto: `Foco: mecanismos literários reais. Explique o recurso e o efeito que ele produz antes de identificá-lo em textos.`,
          ementa: [
            'O Poder do Mito e Epopéias',
            'Trovadorismo e Romantismo',
            'Machado de Assis e Realismo',
            'Modernismo',
            'Ficção Científica e Distopias'
          ]
        },
        {
          slug: 'sociologia',
          nome: 'Sociologia',
          emoji: '👥',
          parent: 'humanidades',
          descricao: 'O estudo das estruturas, normas e dinâmicas da sociedade.',
          contexto: `Foco: Como estruturas invisíveis de poder, cultura e capital moldam as ações individuais. Ensine Weber, Marx e Durkheim pelas lentes de seus mecanismos explicativos.`,
          ementa: [
            'Fato Social e Coesão (Durkheim)',
            'Classes e Conflito (Marx)',
            'Ação Social e Burocracia (Weber)',
            'Capital Cultural (Bourdieu)',
            'Modernidade Líquida (Bauman)'
          ]
        }
      ]
    },
    {
      slug: 'musica',
      nome: 'Música & Artes',
      emoji: '♪',
      isCategory: true,
      parent: 'fundamentos',
      descricao: 'Treinamento de percepção auditiva, harmonia e expressão artística.',
      children: [
        {
          slug: 'violao',
          nome: 'Violão Prático',
          emoji: '🎸',
          parent: 'musica',
          descricao: 'Fundamentos de cordas, cifras e levadas rítmicas aplicadas.',
          contexto: `Foco: mecanismos técnicos reais — postura, tensão muscular, transição de acordes.`,
          ementa: [
            'Postura e Mão Esquerda',
            'Acordes Menores (Am, Em)',
            'Acordes Maiores (C, G, D)',
            'Transição e Memória Muscular',
            'Ritmo e Levadas'
          ]
        },
        {
          slug: 'piano',
          nome: 'Teclas & Harmonia',
          emoji: '🎹',
          parent: 'musica',
          descricao: 'Arranjos harmônicos, tríades, leitura e independência motora.',
          contexto: `Foco: harmonia aplicada e independência motora. Uma mão de cada vez, com compreensão do papel de cada uma.`,
          ementa: [
            'Postura e Numeração',
            'Acordes Naturais (Tríades)',
            'Progressões Pop',
            'Independência das Mãos'
          ]
        },
        {
          slug: 'teoria-musical',
          nome: 'Teoria Musical Aplicada',
          emoji: '🎵',
          parent: 'musica',
          descricao: 'A matemática da música: escalas, percepção e formação de acordes.',
          contexto: `Foco: estrutura musical real — escalas, intervalos, campos harmônicos.`,
          ementa: [
            'Escalas Maiores e Menores',
            'Formação de Tríades',
            'Intervalos Musicais',
            'Campos Harmônicos'
          ]
        },
        {
          slug: 'historia-arte',
          nome: 'História da Arte',
          emoji: '🎨',
          parent: 'musica',
          descricao: 'A evolução visual da humanidade e análise de movimentos artísticos.',
          contexto: `Foco: Como as correntes artísticas respondem aos avanços tecnológicos e crises sociais da sua época. Ensine a ler uma pintura antes de decorá-la.`,
          ementa: [
            'Renascimento (A Perspectiva)',
            'Barroco (O Drama e a Luz)',
            'Impressionismo (A Cor em Movimento)',
            'Modernismo e Cubismo',
            'A Arte Contemporânea'
          ]
        }
      ]
    }
  ]
};
