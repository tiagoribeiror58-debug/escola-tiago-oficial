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
      whyStart: 'Comece pela influência ao vivo. Antes de escrever ou falar em público, você precisa entender o que move as pessoas em tempo real.',
      descricao: 'Inteligência social, negociação, sedução e subcomunicação.',
      children: [
        {
          slug: 'retorica',
          nome: 'Retórica & Argumentação',
          emoji: '⚖️',
          parent: 'influencia-persuasao',
          layout: 'split',
          widget: 'ArgumentMap',
          whyStart: 'A gramática de todo discurso persuasivo. Antes de negociar, seduzir ou falar em público, você precisa entender como argumentos são construídos e desmontados.',
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
            'Dialética: A Arte de Debater',
            'O Triângulo Aristotélico na Prática Moderna',
            'Pressupostos Ocultos: O que não é dito',
            'Argumento por Analogia e seus Limites',
            'Retórica de Crise: Comunicar em Situações de Risco',
            'Framing: Como o Enquadramento Define a Percepção',
            'A Arte da Pergunta Socrática',
            'Retórica Digital: Argumentar em Texto e Vídeo',
            'Lógica Informal e Heurísticas de Julgamento',
            'Debate Estruturado: Regras e Estratégias'
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
          descricao: 'Princípios e táticas de negociação baseados em Harvard e FBI.',
          contexto: `Foco: mecanismos de influência mútua — o que gera acordo, o que gera impasse, e por quê.

Abordagem obrigatória:
- Explique o princípio estrutural antes de qualquer tática.
- Para BATNA e zona de acordo: ensine a mecânica de poder antes de aplicar em cenários.
- Diferencie negociação distributiva de integrativa pelo mecanismo.`,
          ementa: [
            'O Framework de Harvard (Fisher & Ury)',
            'BATNA: Seu Poder Real na Mesa',
            'Ancoragem e Psicologia das Concessões',
            'Negociação Distributiva vs Integrativa',
            'Escuta Tática (Técnicas do FBI)',
            'Comunicação Não-Violenta',
            'ZOPA: Zona de Possível Acordo',
            'Negociação Salarial: Táticas Específicas',
            'Negociação Multicultural: Diferenças Estruturais',
            'Poder, Tempo e Informação nas Negociações',
            'Tática do Deadlock: Quando Parar de Negociar',
            'Coalização e Negociação em Grupos',
            'Negociação por E-mail e Texto: Diferenças Chave',
            'Mediação e Arbitragem como Alternativa',
            'Negociação de Alto Risco: Reféns e Crises'
          ]
        },
        {
          slug: 'oratoria',
          nome: 'Oratória & Apresentação',
          emoji: '🎤',
          parent: 'influencia-persuasao',
          whyStart: 'Você já sabe construir argumentos e negociar. Agora escala isso para uma audiência. Oratória é persuasão em performance.',
          descricao: 'Gatilhos de atenção, storytelling e presença de palco.',
          contexto: `Foco: mecanismos de atenção e persuasão oral — estrutura, ritmo, presença.

Abordagem obrigatória:
- Explique por que determinada técnica funciona antes de pedir que o aluno aplique.
- Para estrutura narrativa: explique o mecanismo de atenção que ela sustenta.`,
          ementa: [
            'Superando o Medo de Falar em Público',
            'O Hook e a Estrutura Narrativa',
            'Modulação de Voz e Pausas',
            'Storytelling e a Jornada do Herói',
            'Linguagem Corporal de Palco',
            'O Método TED: 18 Minutos que Mudam o Mundo',
            'Slide Design para Apresentações de Impacto',
            'Improviso e Resposta a Perguntas Difíceis',
            'Apresentações Virtuais: Câmera, Luz e Energia',
            'Pitch de Negócios: A Arte do Elevator Pitch',
            'Retórica de Liderança: Falar como CEO',
            'Humor na Oratória: Quando e Como Usar',
            'Gerenciando Nervosismo Fisiológico',
            'Debate Ao Vivo e Agilidade Verbal',
            'Retrospecto e Feedback de Apresentações'
          ]
        },
      ]
    },
    {
      slug: 'idiomas-escrita',
      nome: 'Idiomas & Escrita',
      emoji: '✍️',
      isCategory: true,
      parent: 'dinamicas-comunicacao',
      whyStart: 'A comunicação escrita e multilíngue. Este bloco trata do que fica — textos que persuadem, idiomas que abrem portas.',
      descricao: 'A arte da escrita persuasiva e a imersão em idiomas globais.',
      children: [
        {
          slug: 'redacao',
          nome: 'Copywriting & Escrita',
          emoji: '✎',
          parent: 'idiomas-escrita',
          whyStart: 'A escrita como ferramenta de persuasão. Domine a estrutura do texto eficaz na sua própria língua primeiro.',
          descricao: 'Escrita persuasiva e clareza de pensamento traduzida em texto.',
          contexto: `Foco: mecanismos de persuasão e clareza na escrita — estrutura, argumento, coesão.

Abordagem obrigatória:
- Explique o mecanismo retórico ou lógico por trás de cada técnica antes de qualquer exercício.
- Nunca escreva o texto pelo aluno. Critique com base no mecanismo.`,
          ementa: [
            'A Regra do 1: Uma Ideia por Texto',
            'Anatomia de um Headline Magnético',
            'Fórmulas de Copy: AIDA e PAS',
            'Arquitetura da Argumentação Lógica',
            'Revisão Extrema (Cortar a Gordura)',
            'Escrita para Web: Escaneabilidade e Hierarquia',
            'O Lide Jornalístico e a Pirâmide Invertida',
            'Voz e Tom: Desenvolvendo seu Estilo Próprio',
            'Email Marketing: Assunto, Corpo e CTA',
            'Escrita Longa vs Curta: Quando usar cada uma',
            'O Paradoxo da Especificidade: Detalhes que Persuadem',
            'Storytelling em Texto: Arco Narrativo e Tensão',
            'SEO Writing: Escrever para Humanos e Buscadores',
            'Ghostwriting e Adaptação de Voz',
            'Edição Implacável: Revisando como um Profissional'
          ]
        },
        {
          slug: 'ingles',
          nome: 'Inglês',
          emoji: 'EN',
          parent: 'idiomas-escrita',
          layout: 'split',
          widget: 'FlashcardDeck',
          whyStart: 'O idioma global obrigatório. Inglês não é opcional — é o passaporte para 90% do conhecimento técnico e oportunidades digitais.',
          descricao: 'Imersão no idioma global. Foco em produção de frases reais.',
          contexto: `Toda a dinâmica será uma simulação de comunicação real por texto. 

Abordagem obrigatória:
- NÃO ensine regras gramaticais.
- Simule um diálogo imersivo com o aluno, como se estivessem conversando no dia a dia.
- Corrija erros sutilmente reformulando a frase de forma correta, sem aulas de gramática.`,
          ementa: [
            'O Verbo To Be (Muito Além do Básico)',
            'Simple Present e Rotina Diária',
            'Present Continuous',
            'Phrasal Verbs Mais Usados',
            'Preposições Complicadas (In, On, At)',
            'Past Simple e Contando Histórias',
            'Present Perfect (Desmistificado)',
            'Future: Will vs Going To',
            'Verbos Modais (Can, Could, Should, Must)',
            'Condicionais: If Zero, First e Second',
            'Passive Voice: Quando e Como Usar',
            'Reported Speech: Contando o que Alguém Disse',
            'Articles: A, An, The (e quando omitir)',
            'Relative Clauses: Who, Which, That',
            'Conectores e Coesão Textual',
            'Business English: E-mails e Reuniões',
            'Inglês para Entrevistas de Emprego',
            'Sotaques e Compreensão Auditiva',
            'Vocabulário Acadêmico (Academic Word List)',
            'C1 Advanced: Nuances e Expressões Idiomáticas'
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
          descricao: 'Prática contínua e imersão progressiva.',
          contexto: `Toda a dinâmica será uma simulação de comunicação real por texto.

Abordagem obrigatória:
- NÃO ensine regras gramaticais.
- Simule um diálogo imersivo com o aluno, como se estivessem conversando no dia a dia.
- Conduza partes crescentes da sessão diretamente em espanhol conforme o aluno avança, focando na fluência natural e não na teoria.`,
          ementa: [
            'Pronomes e Apresentações Básicas',
            'O Verbo Ser/Estar e Ser/Tener',
            'Falsos Cognatos Frequentes',
            'Verbos no Presente do Indicativo',
            'Vocabulário Cotidiano',
            'Pretérito Perfeito vs Indefinido',
            'Verbos Reflexivos e Pronomes Clíticos',
            'Futuro Simples e Perifrástico',
            'Subjuntivo Presente: Expressar Desejo e Dúvida',
            'Por vs Para: A Distinção Essencial',
            'Imperativo: Dar Ordens e Sugestões',
            'Vocabulário de Negócios em Espanhol',
            'Diferenças entre Espanhol Peninsular e Latino-americano',
            'Expressões Idiomáticas Essenciais',
            'Compreensão Auditiva: Diferentes Sotaques',
            'Produção Escrita: Cartas e E-mails Formais',
            'Espanhol para Viagens e Situações Reais',
            'Nível B2: Expressão de Opinião e Debate'
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
          descricao: 'Fundamentos de fonética e estrutura do idioma.',
          contexto: `Toda a dinâmica será uma simulação de comunicação real por texto.

Abordagem obrigatória:
- NÃO ensine regras gramaticais.
- Simule um diálogo imersivo com o aluno, incorporando o francês naturalmente.
- Ensine fonética indiretamente por meio da correção sutil da escrita e uso prático no diálogo.`,
          ementa: [
            'Fonética e as Vogais Nasais',
            'Verbos Être e Avoir',
            'Artigos e Gêneros',
            'Estrutura de Frases Negativas (Ne...Pas)',
            'Passé Composé Básicos',
            'Liaison e Enchaînement (A Música do Francês)',
            'Verbos do Grupo ER no Presente',
            'Verbos Irregulares Essenciais (Aller, Faire, Vouloir)',
            'Números, Datas e Horas',
            'Partitivos: Du, De la, Des',
            'Imparfait vs Passé Composé',
            'Pronomes Complemento (Me, Te, Le, La)',
            'Futur Simple e Conditionnel',
            'Vocabulário de Gastronomia e Cultura',
            'Francês Profissional: Reuniões e E-mails',
            'Subjonctif Présent: Expressão de Sentimentos'
          ]
        }
      ]
    }
  ]
};
