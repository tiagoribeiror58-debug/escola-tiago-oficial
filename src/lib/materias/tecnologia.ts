import { MateriaConfig } from '@/types';

export const tecnologiaHub: MateriaConfig = {
  slug: 'tecnologia-hub',
  nome: 'Computação & Arquitetura',
  emoji: '💻',
  isCategory: true,
  descricao: 'A ciência de construir o futuro. Da teoria da computação até a arquitetura de sistemas escaláveis.',
  children: [
    {
      slug: 'ciencia-computacao',
      nome: 'Ciência da Computação',
      emoji: '🧮',
      parent: 'tecnologia-hub',
      whyStart: 'Você não pode construir sistemas eficientes sem entender a física da computação. É aqui que você aprende como os computadores pensam e resolvem problemas.',
      descricao: 'Matemática discreta, algoritmos e estruturas de dados fundamentais.',
      contexto: `Foco: raciocínio computacional, teoria e matemática da computação.
O aluno quer aprender os fundamentos teóricos que explicam por que as coisas funcionam.`,
      ementa: [
        'Lógica de Programação e Raciocínio Algorítmico',
        'Matemática Discreta: Álgebra Booleana e Lógica Proposicional',
        'Teoria dos Grafos e Aplicações',
        'Estruturas de Dados Básicas: Arrays, Listas Ligadas, Pilhas, Filas',
        'Estruturas de Dados Avançadas: Árvores Binárias, Heaps, Hash Tables',
        'Análise de Complexidade de Algoritmos (Big O Notation)',
        'Recursão e Estratégias de Divisão e Conquista',
        'Algoritmos de Ordenação e Busca',
        'Programação Dinâmica e Otimização',
        'Arquitetura de Computadores e Sistemas Operacionais (Base)',
        'Redes de Computadores: Modelo OSI, TCP/IP, DNS',
        'Teoria dos Autômatos e Linguagens Formais',
        'Criptografia Básica (Teoria)',
        'Sistemas Numéricos e Representação de Dados em Memória'
      ],
      layout: 'split',
      widget: 'CodeLab'
    },
    {
      slug: 'engenharia-software',
      nome: 'Engenharia de Software',
      emoji: '⚙️',
      parent: 'tecnologia-hub',
      whyStart: 'A teoria se torna inútil se você não consegue construir e manter software no mundo real de forma confiável e em equipe.',
      descricao: 'Processo de construção, testes, Git, Clean Code e ciclo de vida do software.',
      contexto: `Foco: construção de software de forma escalável e colaborativa.
O aluno deve aprender as melhores práticas para que o código seja legível, sustentável e fácil de manter.`,
      ementa: [
        'Versionamento com Git: Branching, Merge Strategies e Rebase',
        'Clean Code e Refatoração',
        'Princípios SOLID e DRY',
        'Paradigmas: Orientação a Objetos vs Programação Funcional',
        'Design Patterns Essenciais (GoF)',
        'Desenvolvimento Guiado por Testes (TDD) e BDD',
        'Testes Automatizados: Unitários, Integração e E2E',
        'Integração e Entrega Contínua (CI/CD) com GitHub Actions/GitLab',
        'Contêineres e Virtualização (Docker, Podman)',
        'Desenvolvimento de APIs RESTful e GraphQL',
        'Segurança no Desenvolvimento: OWASP Top 10, JWT, OAuth',
        'Processos Ágeis: Scrum, Kanban e Ciclo de Vida (SDLC)',
        'Revisão de Código (Code Review) e Pair Programming',
        'Engenharia de Dados Básica (ETL e Pipelines)'
      ]
    },
    {
      slug: 'arquitetura-software',
      nome: 'Arquitetura de Software',
      emoji: '🏛️',
      parent: 'tecnologia-hub',
      whyStart: 'Quando o sistema precisa atender a 1 milhão de usuários simultâneos, o código limpo não é suficiente. Você precisa desenhar onde as peças ficam e como se comunicam.',
      descricao: 'Decisões de alto nível, System Design, Cloud Computing e trade-offs.',
      contexto: `Foco: decisões macroestruturais de sistemas.
O aluno atua como Arquiteto, Tech Lead ou CTO. Ele deve entender os trade-offs entre diferentes escolhas tecnológicas.`,
      ementa: [
        'Arquitetura de Monólitos vs Microsserviços',
        'System Design: Desenhando Sistemas em Grande Escala',
        'Bancos de Dados: Relacional vs NoSQL (Quando usar qual)',
        'Caching, CDNs e Estratégias de Baixa Latência',
        'Mensageria e Event-Driven Architecture (Kafka, RabbitMQ)',
        'Arquiteturas Cloud Native e Serverless',
        'Orquestração de Contêineres (Kubernetes)',
        'Padrões de Resiliência: Circuit Breaker, Retries, Fallbacks',
        'Teorema CAP e Consistência de Dados Distribuídos',
        'Observabilidade: Logs, Métricas (Prometheus) e Tracing (OpenTelemetry)',
        'FinOps e Otimização de Custos em Cloud (AWS/GCP/Azure)',
        'Segurança em Escala: Zero Trust e Identity and Access Management (IAM)',
        'Arquitetura de Front-end (Micro Frontends)',
        'Planejamento de Capacidade (Capacity Planning)'
      ]
    }
  ]
};
