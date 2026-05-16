import { MateriaConfig } from '@/types';

export const produtoHub: MateriaConfig = {
  slug: 'produto-inovacao',
  nome: 'Produto & Inovação Digital',
  emoji: '📦',
  isCategory: true,
  descricao: 'Código rodando e IA prevendo o futuro não servem de nada se não resolvem dores humanas reais. Aqui você une engenharia e pessoas.',
  children: [
    {
      slug: 'product-management',
      nome: 'Gestão de Produto Digital (PM)',
      emoji: '🎯',
      parent: 'produto-inovacao',
      layout: 'split',
      widget: 'UserStoryBuilder',
      whyStart: 'Com engenharia e design como base, você aprende a decidir O QUE construir.',
      descricao: 'Descoberta de produto, priorização de backlog e métricas de engajamento.',
      contexto: `Foco: a ponte entre engenharia, negócios e design.`,
      ementa: [
        'O Papel do PM: Engenharia, UX e Negócios',
        'Product Discovery e Entrevistas de Usuário',
        'Frameworks de Priorização (RICE, Kano)',
        'Gestão de Backlog e Roadmap',
        'Métricas de Produto (AARRR, Cohorts, Churn)',
        'Jobs-to-be-Done (JTBD): A Teoria por Trás do Produto',
        'OKRs para Produto: Metas Aspiracionais',
        'Inception: Como Alinhar Time no Início de um Produto',
        'Testes de Usabilidade e Pesquisa Qualitativa',
        'Go-to-Market de Novas Features',
        'Dados em Produto: Analytics e Event Tracking',
        'Ciclo de Vida do Produto: Introdução a Declínio',
        'Platform Products vs End-User Products',
        'Produto Internacional: Localização e Adaptação',
        'Ethical Product Design: Dark Patterns e Responsabilidade'
      ]
    },
    {
      slug: 'design',
      nome: 'Design Visual & UX',
      emoji: '◑',
      parent: 'produto-inovacao',
      whyStart: 'O melhor algoritmo do mundo fracassa se a interface do usuário (UX) for ruim.',
      descricao: 'Hierarquia, tipografia, gestalt e design centrado no usuário.',
      contexto: `Foco: princípios estruturais do design — hierarquia, gestalt, percepção visual.

Abordagem obrigatória:
- Explique o princípio perceptivo ou cognitivo por trás de cada decisão de design.
- Só depois: peça que o aluno critique um design real.`,
      ementa: [
        'Leis da Gestalt Aplicadas a Interfaces',
        'Teoria das Cores e Contraste',
        'Tipografia e Escala Tipográfica',
        'Espaçamento e Hierarquia Visual',
        'UI vs UX: A Experiência do Usuário',
        'Heurísticas de Nielsen',
        'Sistemas de Design: Tokens, Componentes e Documentação',
        'Prototipagem: Do Sketch ao Figma Interativo',
        'Testes de Usabilidade: Métodos e Análise',
        'Design Responsivo e Mobile-First',
        'Acessibilidade (WCAG): Design para Todos',
        'Microinterações e Animações de Feedback',
        'Dark Patterns: O que Nunca Fazer',
        'Design de Onboarding: Reduzindo Fricção',
        'Motion Design: Movimento com Propósito'
      ],
      layout: 'canvas',
      widget: 'DesignPreview'
    },
    {
      slug: 'web3-cripto',
      nome: 'Cripto & Web3',
      emoji: '⛓️',
      parent: 'produto-inovacao',
      whyStart: 'A fronteira da descentralização. Foco no mecanismo — não na especulação.',
      descricao: 'Criptografia, Blockchain, DeFi e contratos inteligentes.',
      contexto: `Foco: os fundamentos técnicos da descentralização. Evite o viés de investimento e especulação.`,
      ementa: [
        'O Problema do Gasto Duplo e o Bitcoin',
        'Algoritmos de Consenso (PoW vs PoS)',
        'Ethereum e Smart Contracts',
        'DeFi (Finanças Descentralizadas)',
        'Tokenomics e Governança',
        'Criptografia de Chave Pública: ECDSA e Hash Functions',
        'Merkle Trees e Integridade de Dados',
        'Solidity: Programando Smart Contracts',
        'NFTs: O Mecanismo Técnico (sem especulação)',
        'Layer 2: Rollups e Escalabilidade',
        'DAOs: Organizações Autônomas Descentralizadas',
        'Riscos: Rug Pulls, Hacks e Bugs em Contratos',
        'Regulamentação Cripto Global',
        'CBDCs: Moedas Digitais de Bancos Centrais',
        'ZK Proofs: Privacidade sem Revelar Informação'
      ]
    }
  ]
};
