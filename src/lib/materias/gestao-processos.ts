import { MateriaConfig } from '@/types';

export const gestaoSistemasHub: MateriaConfig = {
  slug: 'gestao-sistemas',
  nome: 'Gestão, Processos & Sistemas',
  emoji: '⚙️',
  isCategory: true,
  descricao: 'Não aprenda ferramentas, aprenda os fundamentos universais. Como organizar empresas, equipes e a própria vida criando sistemas que funcionam sozinhos.',
  children: [
    {
      slug: 'sistemas-fundamentos',
      nome: 'Systems Thinking (Pensamento Sistêmico)',
      emoji: '🔄',
      parent: 'gestao-sistemas',
      whyStart: 'Se você foca em metas, você ganha uma vez. Se você foca em sistemas, você ganha para sempre.',
      descricao: 'A diferença entre esforço bruto e alavancagem através de sistemas.',
      contexto: `Foco: Ensinar o aluno a enxergar tudo como um sistema (Inputs, Processos, Outputs e Feedback Loops). Ignore as ferramentas (Notion, ClickUp) e foque na física de como o trabalho flui.`,
      ementa: [
        'Sistemas vs. Metas: A filosofia de James Clear aplicada à gestão',
        'Inputs, Outputs e Feedback Loops: A anatomia de qualquer processo',
        'A Teoria das Restrições (Gargalos): Onde a velocidade real é definida',
        'Alavancagem (Leverage): Esforço linear vs. Resultados exponenciais',
        'Design de Sistemas à prova de falhas humanas (Poka-Yoke)',
        'Fricção: A física de como os hábitos e processos morrem',
        'Manutenção de Sistemas: A entropia natural de qualquer organização'
      ]
    },
    {
      slug: 'processos-operacionais',
      nome: 'Processos e Fluxos de Trabalho',
      emoji: '📋',
      parent: 'gestao-sistemas',
      whyStart: 'Processos ruins quebram boas pessoas. Você precisa saber desenhar caminhos óbvios.',
      descricao: 'Como mapear o trabalho, criar procedimentos padrão e eliminar gargalos.',
      contexto: `Foco: O design de processos empresariais e pessoais. Não fale de botões de software. Fale sobre como a informação viaja, como responsabilidades são passadas adiante e como evitar retrabalho.`,
      ementa: [
        'SOPs (Standard Operating Procedures): Como documentar o óbvio',
        'O Manifesto do Checklist: Reduzindo erros catastróficos',
        'Mapeamento de Fluxo de Valor (Value Stream Mapping)',
        'Kanban Pessoal e Empresarial: Limitando o Work in Progress (WIP)',
        'Push vs. Pull: Como o trabalho deve ser distribuído',
        'A Lei de Parkinson no trabalho: Tempo e Escopo',
        'Comunicação Assíncrona vs. Síncrona: Quando usar cada uma',
        'Triagem: A diferença vital entre Urgente, Importante e Ruído'
      ]
    },
    {
      slug: 'arquitetura-informacao',
      nome: 'Arquitetura de Dados & Ferramentas',
      emoji: '🗄️',
      parent: 'gestao-sistemas',
      whyStart: 'Planilhas, Notion ou ClickUp são apenas bancos de dados disfarçados. Entenda a lógica por trás.',
      descricao: 'A teoria dos bancos de dados relacionais aplicada à produtividade e gestão.',
      contexto: `Foco: Fundamentos de bancos de dados relacionais para leigos. Ensine o conceito de tabelas, relações e views, para que o aluno consiga montar sua gestão no Excel, Notion, Coda ou num pedaço de papel.`,
      ementa: [
        'Listas Planas vs. Bancos de Dados Relacionais',
        'Tipos de Dados Essenciais: Strings, Datas, Status e Relações',
        'A Regra de Ouro da Normalização: Uma informação, um único lugar',
        'Rollups e Lookups: Como fazer bancos de dados conversarem',
        'A Separação entre Dados e Visualização (Tabelas vs. Boards/Views)',
        'Taxonomias e Nomenclatura: Como não perder arquivos na nuvem',
        'Estado Mestre: O conceito de "Single Source of Truth"',
        'Por que a maioria dos sistemas de Notion viram cemitérios de dados'
      ]
    },
    {
      slug: 'gestao-conhecimento',
      nome: 'Gestão do Conhecimento (Second Brain)',
      emoji: '🧠',
      parent: 'gestao-sistemas',
      whyStart: 'Sua mente foi feita para ter ideias, não para guardá-las.',
      descricao: 'Como capturar, organizar e recuperar informações usando princípios universais.',
      contexto: `Foco: Metodologias agnósticas (PARA, Zettelkasten) para organizar o conhecimento. O foco é em 'Retrieval' (recuperação) e não apenas em acumular lixo digital.`,
      ementa: [
        'O Método P.A.R.A: Projetos, Áreas, Recursos e Arquivos',
        'Zettelkasten: Interligando ideias como neurônios',
        'Captura Universal: O funil de entrada zero fricção',
        'Organização Orientada à Ação: Pastas baseadas no "Quando" e não no "O Que"',
        'A Regra do Destilamento (Progressive Summarization)',
        'O Mito da Organização Perfeita: Tolerância à bagunça produtiva',
        'Revisão Semanal: A manutenção essencial do seu Second Brain'
      ]
    }
  ]
};
