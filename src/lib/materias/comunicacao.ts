import { MateriaConfig } from '@/types';

export const comunicacaoInfluencia: MateriaConfig = {
  slug: 'dinamicas-comunicacao',
  nome: 'Comunicação & Influência',
  emoji: '🍷',
  isCategory: true,
  descricao: 'Habilidades interpessoais, comunicação persuasiva, oratória e idiomas.',
  children: [
    {
      slug: 'influencia-persuasao',
      nome: 'Influência & Dinâmicas Sociais',
      emoji: '🎭',
      isCategory: true,
      parent: 'dinamicas-comunicacao',
      descricao: 'Inteligência social, negociação, sedução e subcomunicação.',
      children: [
        {
          slug: 'seducao',
          nome: 'Sedução & Dinâmicas',
          emoji: '🔥',
          parent: 'influencia-persuasao',
          descricao: 'Inteligência social pura: calibração, tensão, autenticidade e subcomunicação.',
          contexto: `Foco: inteligência social real — leitura de contexto, subcomunicação, calibração.

Abordagem obrigatória:
- Explique o mecanismo psicológico ou social por trás de cada dinâmica antes de qualquer simulação ou aplicação.
- Para atração: explique o que a produz estruturalmente (confiança, consistência, atitude) antes de discutir comportamentos específicos.
- Destrua mitos explicando o mecanismo pelo qual falham — não apenas afirmando que são errados.
- Simulações práticas só depois que o aluno compreendeu o princípio que está sendo aplicado.`,
          ementa: [
            'A Base Fisiológica da Atração',
            'Subcomunicação e Linguagem Corporal',
            'Calibração e Tensão Social',
            'Como Abrir e Sustentar Interações',
            'Escalada de Conforto e Intimidade',
            'Gestão de Rejeição'
          ]
        },
        {
          slug: 'negociacao',
          nome: 'Negociação',
          emoji: '🤝',
          parent: 'influencia-persuasao',
          descricao: 'Princípios e táticas de negociação baseados em Harvard e FBI.',
          contexto: `Foco: mecanismos de influência mútua — o que gera acordo, o que gera impasse, e por quê.

Abordagem obrigatória:
- Explique o princípio estrutural antes de qualquer tática. O aluno precisa entender POR QUE uma técnica funciona.
- Para BATNA e zona de acordo: ensine a mecânica de poder antes de aplicar em cenários.
- Diferencie negociação distributiva de integrativa pelo mecanismo.`,
          ementa: [
            'O Framework de Harvard (Fisher & Ury)',
            'BATNA: Seu Poder Real na Mesa',
            'Ancoragem e Psicologia das Concessões',
            'Negociação Distributiva vs Integrativa',
            'Escuta Tática (Técnicas do FBI)',
            'Comunicação Não-Violenta'
          ]
        },
        {
          slug: 'retorica',
          nome: 'Retórica & Argumentação',
          emoji: '⚖️',
          parent: 'influencia-persuasao',
          descricao: 'A arte de construir, desconstruir e avaliar argumentos.',
          contexto: `Foco: estrutura argumentativa real — premissas, conclusões, pressupostos ocultos e persuasão.

Abordagem obrigatória:
- Explique a estrutura lógica de cada tipo de argumento antes de analisar exemplos reais.
- Para falácias retóricas: explique o mecanismo pelo qual enganam antes de pedir identificação.
- Diferencie claramente retórica (persuasão) de lógica formal (validade).`,
          ementa: [
            'Anatomia de um Argumento',
            'Ethos, Pathos e Logos',
            'Falácias Retóricas',
            'Contra-Argumentação e Refutação',
            'Retórica Aplicada (Política e Mídia)',
            'Dialética: A Arte de Debater'
          ]
        },
        {
          slug: 'oratoria',
          nome: 'Oratória & Apresentação',
          emoji: '🎤',
          parent: 'influencia-persuasao',
          descricao: 'Gatilhos de atenção, storytelling e presença de palco.',
          contexto: `Foco: mecanismos de atenção e persuasão oral — estrutura, ritmo, presença.

Abordagem obrigatória:
- Explique por que determinada técnica funciona (o mecanismo cognitivo ou emocional que ela aciona) antes de pedir que o aluno aplique.
- Para estrutura narrativa: explique o mecanismo de atenção que ela sustenta antes de pedir produção.`,
          ementa: [
            'Superando o Medo de Falar em Público',
            'O Hook e a Estrutura Narrativa',
            'Modulação de Voz e Pausas',
            'Storytelling e a Jornada do Herói',
            'Linguagem Corporal de Palco'
          ]
        }
      ]
    },
    {
      slug: 'idiomas-escrita',
      nome: 'Idiomas & Escrita',
      emoji: '✍️',
      isCategory: true,
      parent: 'dinamicas-comunicacao',
      descricao: 'A arte da escrita persuasiva e a imersão em idiomas globais.',
      children: [
        {
          slug: 'redacao',
          nome: 'Copywriting & Escrita',
          emoji: '✎',
          parent: 'idiomas-escrita',
          descricao: 'Escrita persuasiva e clareza de pensamento traduzida em texto.',
          contexto: `Foco: mecanismos de persuasão e clareza na escrita — estrutura, argumento, coesão.

Abordagem obrigatória:
- Explique o mecanismo retórico ou lógico por trás de cada técnica antes de qualquer exercício de produção.
- Nunca escreva o texto pelo aluno. Critique com base no mecanismo — "o argumento falha aqui porque estruturalmente...".`,
          ementa: [
            'A Regra do 1: Uma Ideia por Texto',
            'Anatomia de um Headline Magnético',
            'Fórmulas de Copy: AIDA e PAS',
            'Arquitetura da Argumentação Lógica',
            'Revisão Extrema (Cortar a Gordura)'
          ]
        },
        {
          slug: 'ingles',
          nome: 'Inglês',
          emoji: 'EN',
          parent: 'idiomas-escrita',
          descricao: 'Imersão no idioma global. Foco em produção de frases reais.',
          contexto: `Toda comunicação e explicação em PORTUGUÊS. Inglês aparece apenas em exemplos e exercícios.

Abordagem obrigatória:
- Explique o núcleo semântico ou estrutural de cada padrão antes de qualquer exemplo ou exercício. O aluno precisa entender o "porquê".
- Nunca use exercícios de completar lacunas — exija produção ativa da estrutura.`,
          ementa: [
            'O Verbo To Be (Muito Além do Básico)',
            'Simple Present e Rotina Diária',
            'Present Continuous',
            'Phrasal Verbs Mais Usados',
            'Preposições Complicadas (In, On, At)',
            'Past Simple e Contando Histórias',
            'Present Perfect (Desmistificado)'
          ]
        },
        {
          slug: 'espanhol',
          nome: 'Espanhol',
          emoji: 'ES',
          parent: 'idiomas-escrita',
          descricao: 'Prática contínua e imersão progressiva.',
          contexto: `Conduza partes crescentes da sessão diretamente em espanhol conforme o aluno avança. Foco em estrutura antes de produção.`,
          ementa: [
            'Pronomes e Apresentações Básicas',
            'O Verbo Ser/Estar e Ser/Tener',
            'Falsos Cognatos Frequentes',
            'Verbos no Presente do Indicativo',
            'Vocabulário Cotidiano',
            'Pretérito Perfeito vs Indefinido'
          ]
        },
        {
          slug: 'frances',
          nome: 'Francês',
          emoji: 'FR',
          parent: 'idiomas-escrita',
          descricao: 'Fundamentos de fonética e estrutura do idioma.',
          contexto: `Foco na fonética peculiar do francês e nas similaridades sintáticas com o português.`,
          ementa: [
            'Fonética e as Vogais Nasais',
            'Verbos Être e Avoir',
            'Artigos e Gêneros',
            'Estrutura de Frases Negativas (Ne...Pas)',
            'Passé Composé Básicos'
          ]
        }
      ]
    }
  ]
};
