import { MateriaConfig } from '@/types';

export const tecnologiaNegocios: MateriaConfig = {
  slug: 'tecnologia-negocios',
  nome: 'Business & Entrepreneurship',
  emoji: '🚀',
  isCategory: true,
  descricao: 'Business development, growth, scale-ups, and capital allocation.',
  children: [
    {
      slug: 'empreendedorismo',
      nome: 'Foundations & Startups',
      emoji: '🏗️',
      parent: 'tecnologia-negocios',
      whyStart: 'The zero point. Before selling, hiring, or investing, you need to understand how a company is born — validation, real pain, and the only metric that matters: Product-Market Fit.',
      descricao: 'Product-Market Fit, ideation, and scalable product management.',
      contexto: `Focus: real fundamentals of building businesses — validation, distribution, scale.

Mandatory approach:
- For each model (Canvas, Lean, etc.): explain the problem it solves and where it fails before any application.
- Only after understanding the mechanism: ask for application to a real idea.
- Question romanticism based on mechanism — "what structurally could kill this idea?" — not as a hollow provocation.
- Never ask for a pitch or plan without first establishing the fundamentals that should support them.`,
      ementa: [
        'A Anatomia de uma Startup',
        'Ideação e Identificação de Dores Reais',
        'MVP (Minimum Viable Product)',
        'Product-Market Fit (A única métrica que importa)',
        'Gestão de Produtos e Roadmaps',
        'Business Model Canvas: O mapa do negócio',
        'Lean Startup e o Ciclo Build-Measure-Learn',
        'Distribuição: O Canal que Mata ou Salva um Produto',
        'Estratégia de Precificação (Pricing)',
        'Contratando os Primeiros Funcionários',
        'Cultura do Zero: Como os Fundadores Moldam o DNA da Empresa',
        'Pivoting: Quando e Como Mudar de Direção',
        'Fundraising Pré-Seed: Bootstrapping vs Capital Externo',
        'Churn, Retenção e o Vazamento no Balde',
        'Construindo para Escala vs Construindo para Validação',
        'Solo Founder vs Co-Founder: Trade-offs Estruturais',
        'Bootstrapping Lucrativo: Crescendo sem Investimento Externo',
        'Network Effects: Quando o Produto Melhora com Mais Usuários',
        'Marketplace Dynamics: Problema do Ovo e da Galinha',
        'Due Diligence do Investidor: O que Olham Além dos Números'
      ]
    },
    {
      slug: 'financas-equity',
      nome: 'Finance & Equity',
      emoji: '📈',
      parent: 'tecnologia-negocios',
      whyStart: 'With revenue coming in, you need to understand the money. Valuation, compound interest, and unit economics — here you learn to read the numbers and decide with financial intelligence.',
      descricao: 'Valuation, capital structure, and financial modeling.',
      contexto: `Focus: real financial fundamentals — cash flow, valuation, capital structure.

Mandatory approach:
- Explain the financial mechanism before any application or case study.
- For valuation: explain why a certain method works and where it fails before applying.
- If the student asks "where to invest": respond with the risk/return analysis framework.
- Case studies only after the conceptual mechanism is solid.`,
      ementa: [
        'A Matemática do Juros Composto',
        'Unit Economics: CAC, LTV, Payback',
        'Valuation: Múltiplos vs Fluxo de Caixa Descontado',
        'Tipos de Equity e Cap Tables (Venture Capital)',
        'Ciclos Macroeconômicos',
        'EBITDA: O que é e por que todo investidor olha isso',
        'Modelos Financeiros: Premissas, Sensibilidade e Cenários',
        'Dívida vs Equity: O Custo de Cada Capital',
        'Convertible Notes e SAFEs: Instrumentos de Rodadas Seed',
        'Participações Preferenciais (Preferred vs Common Shares)',
        'Anti-Diluição: Como Fundadores se Protegem',
        'Matemática do Vesting (Cliff e Carve-outs)',
        'Rendimentos Compostos vs Simples na Prática',
        'Análise de Sensibilidade: E Se o Cenário Mudar?',
        'Retorno Esperado e Gestão de Portfólio Pessoal',
        'Burn Rate e Runway: Quanto Tempo Você Tem?',
        'Bridge Rounds e Financiamentos Emergenciais',
        'Revenue-Based Financing: Alternativa ao Equity',
        'Modelagem de Cenários com Monte Carlo'
      ]
    },
    {
      slug: 'financas-corporativas',
      nome: 'Corporate Finance',
      emoji: '🏦',
      parent: 'tecnologia-negocios',
      whyStart: 'When the business grows, financial complexity grows with it. Income statements, balance sheets, and M&A are for those who go beyond startups and enter structured companies.',
      descricao: 'Controlling, financial statements, M&A, and corporate treasury.',
      contexto: `Focus: the internal financial mechanics of large companies. Prepare the student to act as a financial analyst, banker, or CFO.

Mandatory approach:
- Explain the accounting mechanism before teaching how to read the reports.
- Income statements (DRE), Balance Sheets, and Cash Flow Statements (DFC) are not just tables; teach how they talk to each other.
- For modelage and M&A: explain the assumptions and structural trade-offs before calculating.`,
      ementa: [
        'A Tríade Contábil: DRE, Balanço Patrimonial e DFC',
        'Análise de Índices (Liquidez, ROE, ROA, Margem)',
        'Capital de Giro (Working Capital) e Ciclo Financeiro',
        'Custo de Capital (WACC) e Estrutura de Dívida',
        'Orçamento e Forecasting (Budgeting)',
        'Fusões e Aquisições (M&A) e Due Diligence',
        'LBO (Leveraged Buyout): A Mecânica do Private Equity',
        'Contabilidade de Competência vs Regime de Caixa',
        'Demonstração de Fluxo de Caixa Livre (Free Cash Flow)',
        'Análise de Empresas Públicas: Como Ler um Relatório 10-K',
        'Gestão de Tesouraria e Hedge Cambial',
        'Reestruturação Financeira e Turnaround',
        'IPO: O Processo de Abertura de Capital',
        'IFRS vs GAAP: As Linguagens Contábeis do Mundo',
        'Corporate Governance: Conselho, Auditoria e Compliance',
        'Transfer Pricing: Preços de Transferência entre Subsidiárias',
        'Spin-offs e Carve-outs Estratégicos',
        'ESG e Relatórios de Sustentabilidade Corporativa',
        'Forensic Accounting: Detectando Fraudes Contábeis'
      ]
    },
    {
      slug: 'gestao-lideranca',
      nome: 'Management & Culture',
      emoji: '👑',
      parent: 'tecnologia-negocios',
      whyStart: 'With the business running, you need to scale people. Leadership, OKRs, and culture determine whether the company grows with you — or depends on you.',
      descricao: 'Leadership, OKRs, hiring, and organizational culture.',
      contexto: `Focus: alignment of incentives and organizational engineering. Culture is what happens when the leader is not in the room.`,
      ementa: [
        'Cultura Organizacional (Design de Comportamentos)',
        'Metodologias Ágeis e OKRs',
        'Processos de Contratação e Demissão',
        'Delegação e Microgerenciamento',
        'Resolução de Conflitos Corporativos',
        'Feedback Estruturado: O Modelo SBI e Radical Candor',
        'Performance Management: PIPs e Reviews',
        'Estilos de Liderança: Situacional vs Servant Leadership',
        'Gestão de Equipes Remotas e Assíncronas',
        'Onboarding: Como Integrar Novos Talentos',
        'Sucessão e Planejamento de Carreira da Equipe',
        'Comunicação Interna em Escala (All-Hands, 1:1s)',
        'Remuneração Estratégica e Equity para Funcionários',
        'Liderança em Crise: Tomada de Decisão sob Pressão',
        'Construindo Times de Alta Performance',
        'Gestão de Times com IA: Automação de Rotinas Operacionais',
        'Diversidade e Inclusão como Vantagem Competitiva',
        'Employer Branding: Atraindo Talento pela Marca',
        'Gestão de Mudança Organizacional (Change Management)'
      ]
    },
    {
      slug: 'direito-empresarial',
      nome: 'Business & Tax Law',
      emoji: '⚖️',
      parent: 'tecnologia-negocios',
      whyStart: 'Ignoring the legal framework is an entrepreneur\'s most expensive mistake. This step is not about becoming a lawyer — it is about knowing when you are at risk.',
      descricao: 'Contracts, asset protection, compliance, and tax efficiency.',
      contexto: `Focus: the rules of the game of the corporate world. Prepare the student to understand the legal framework without the theoretical legalese.`,
      ementa: [
        'Tipos Societários (Ltda, S.A) e Responsabilidade Limitada',
        'Acordos de Sócios (Vesting, Cliff, Tag/Drag Along)',
        'Propriedade Intelectual e Marcas',
        'Noções de Direito Trabalhista e Terceirização (PJ)',
        'Regimes Tributários e Elisão Fiscal Legal',
        'LGPD e GDPR: Proteção de Dados na Prática',
        'Contratos Comerciais: Cláusulas que Protegem',
        'NDA (Non-Disclosure Agreement) e Confidencialidade',
        'Blindagem Patrimonial: Separando PF de PJ',
        'Compliance e Governança Corporativa',
        'Licenças de Software e Open Source',
        'Relações com Investidores: Due Diligence Jurídica',
        'Dissolução e Liquidação Societária',
        'Tributação Internacional para Empresas Digitais',
        'Resolução de Disputas: Arbitragem vs Litígio',
        'Regulamentação de IA: Implicações Jurídicas para Startups',
        'Contratos de SaaS: MRR, ARR e Cláusulas de Renovação',
        'Marco Legal das Criptomoedas e Ativos Digitais'
      ],
      layout: 'split',
      widget: 'LegalViewer'
    },
    {
      slug: 'private-equity-vc',
      nome: 'Angel Investing & Venture Capital',
      emoji: '🦄',
      parent: 'tecnologia-negocios',
      whyStart: 'The founder\'s final stage: sitting on the other side of the table. With the business built, you learn to evaluate others, allocate capital, and generate return as an investor.',
      descricao: 'Direct investment in real companies, startups, and equity crowdfunding.',
      contexto: `Focus: the dynamics of the investor who sits at the table with the founder. Teach how to evaluate theses, founders, and the exit mechanism.
          
Mandatory approach:
- Explain the concept of "Skin in the Game" and alignment of interests before talking about fees.
- Differentiate Angel Investing, VC, and Private Equity by risk mechanism and company maturity.
- Teach how to evaluate "Founders-Market Fit" — why THESE people are the right ones for THIS pain?
- Due Diligence is not just paperwork; it is seeing if the growth mechanism is real.`,
      ementa: [
        'Teses de Investimento: Onde e por que colocar dinheiro',
        'Análise de Founders e Time (Soft Skills Hardcoded)',
        'Deal Flow: Como encontrar e filtrar boas oportunidades',
        'Term Sheets: Cláusulas de controle e proteção (Veto, Board)',
        'Métricas de Performance Pós-Investimento',
        'Estratégias de Exit: IPO, M&A e Secondary',
        'Cap Table Avançado: Diluição Round-over-Round',
        'Valuations de Startups: Pre-money vs Post-money na prática',
        'Instrumentos de Investimento: SAFEs, Convertibles e Equity Direto',
        'Acordos de Acionistas: Drag-Along, Tag-Along e Anti-Diluição',
        'Gestão de Portfólio: Como Apoiar sem Sufocar',
        'Follow-On e Direito de Pro-Rata: Protegendo sua Participação',
        'Estrutura de Fundos VC: LP/GP, Carried Interest e Management Fee',
        'Secondary Transactions e Liquidez Antecipada',
        'Análise de Setores: Como Avaliar Mercados Emergentes',
        'Geopolítica e Teses Macro para Alocação de Capital',
        'Construindo Reputação como Investidor Anjo',
        'Ética e Responsabilidade no Investimento de Impacto'
      ],
      layout: 'split',
      widget: 'FinanceLab'
    }
  ]
};
