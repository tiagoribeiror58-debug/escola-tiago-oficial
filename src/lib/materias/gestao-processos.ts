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
    },
    {
      slug: 'engenharia-producao',
      nome: 'Engenharia de Produção',
      emoji: '🏭',
      parent: 'gestao-sistemas',
      whyStart: 'Engenharia de Produção é a ciência de fazer mais com menos, sem abrir mão da qualidade. Quem domina isso consegue enxergar gargalos e oportunidades que outros simplesmente não veem.',
      descricao: 'Do chão de fábrica à cadeia global: como projetar, operar e melhorar sistemas produtivos com rigor e método.',
      contexto: 'O aluno busca compreensão conceitual da Engenharia de Produção sem a carga de cálculo acadêmico pesado. Foco em modelos mentais, ferramentas aplicáveis e lógica de otimização. Quando citar autores ou frameworks, diga de onde vieram (ex: Taiichi Ohno, Toyota Production System, 1978).',
      fases: [
        {
          nome: 'Fase 1 — Fundamentos: Como Sistemas Produtivos Funcionam',
          topicos: [
            'O que é Engenharia de Produção — escopo, diferença de outras engenharias e onde atua',
            'Sistema de Produção: definição de inputs, processos, outputs e feedback',
            'Tipos de layout industrial: linha, célula, job shop e por projeto — quando usar cada um',
            'Produção Discreta vs. Contínua — diferença prática entre fabricar carros e refinar petróleo',
            'Capacidade produtiva: o que é, como calcular e por que é sempre menor que o teórico',
            'Tempo de ciclo, Takt Time e Lead Time — os três relógios de qualquer operação',
            'Gargalo (Bottleneck): identificando o ponto que dita a velocidade de todo o sistema',
            'Teoria das Restrições (TOC) — Eliyahu Goldratt e os 5 passos de focalização',
            'Estoque: por que ele existe, o que esconde e qual o seu custo real',
            'Introdução à Qualidade: o que significa qualidade em produção (conformidade vs. valor percebido)'
          ]
        },
        {
          nome: 'Fase 2 — Intermediário: Ferramentas e Métodos de Otimização',
          topicos: [
            'Sistema Toyota de Produção (TPS) — Taiichi Ohno e os pilares Just-in-Time e Jidoka',
            'Lean Manufacturing: os 7 desperdícios (Muda) que destroem produtividade',
            'Value Stream Mapping (VSM): mapear o fluxo de valor para enxergar onde o tempo some',
            '5S: organização do ambiente como pré-requisito para qualquer melhoria sustentável',
            'Kaizen: melhoria contínua incremental vs. inovação radical — quando usar cada um',
            'Controle Estatístico do Processo (CEP): como usar dados para prever defeitos antes de ocorrerem',
            'Seis Sigma (Six Sigma): o método DMAIC e o que significa "3,4 defeitos por milhão"',
            'Manutenção Produtiva Total (TPM) e o indicador OEE (Eficiência Global do Equipamento)',
            'Planejamento e Controle da Produção (PCP): MRP, MRP II e a lógica dos planos de produção',
            'Gestão de Estoques: modelos EOQ, ponto de reposição e o custo do excesso vs. da falta',
            'Arranjo Físico e Fluxo: como o layout impacta diretamente o tempo e o custo de fabricação',
            'Ergonomia e Estudo do Trabalho: tempo padrão, folga e o método de cronoanálise'
          ]
        },
        {
          nome: 'Fase 3 — Avançado: Cadeia de Suprimentos, Qualidade e Estratégia',
          topicos: [
            'Supply Chain Management (SCM): da matéria-prima ao cliente final como um único sistema',
            'O Efeito Chicote (Bullwhip Effect): por que pequenas variações no varejo criam caos nas fábricas',
            'Logística e Distribuição: modais, roteirização e o trade-off entre custo e velocidade de entrega',
            'Compras e Gestão de Fornecedores: desenvolvimento, qualificação e riscos de dependência',
            'Normas ISO 9001 e a lógica de Sistemas de Gestão da Qualidade (SGQ)',
            'FMEA (Análise dos Modos de Falha e seus Efeitos): prevenindo falhas antes de acontecerem',
            'Pesquisa Operacional aplicada: Programação Linear e o problema de alocação de recursos',
            'Simulação de Sistemas: como modelar uma operação antes de construí-la',
            'Indústria 4.0: IoT, gêmeos digitais, automação e o que muda na lógica de produção',
            'Sustentabilidade em Operações: logística reversa, economia circular e pressão ESG',
            'Estratégia de Operações: como decisões de produção criam (ou destroem) vantagem competitiva'
          ]
        }
      ]
    }
  ]
};
