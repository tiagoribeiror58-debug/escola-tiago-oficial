import { MateriaConfig } from '@/types';

export const marketingHub: MateriaConfig = {
  slug: 'marketing-hub',
  nome: 'Marketing',
  emoji: '🎯',
  isCategory: true,
  descricao: 'From concept to channel. Marketing is the discipline that connects what you created with who needs it.',
  whyStart:
    'Marketing is what makes the world know you exist. It is not about ads or followers — it is about understanding how people make decisions and how you position your solution in their path. Without this, the best product in the world dies on the shelf.',
  children: [
    // ─────────────────────────────────────────────────────────────
    // 1. MARKETING TÉCNICO
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'marketing-tecnico',
      nome: 'Technical Marketing',
      emoji: '⚙️',
      parent: 'marketing-hub',
      whyStart:
        'Marketing without data is guesswork. Here you learn to operate the tools that turn intuition into evidence-based decisions: tracking, ads, automation, and the correct reading of numbers.',
      descricao: 'SEO, paid media, tracking, automation, and the tools that make the acquisition engine work.',
      contexto: `Focus: the technical mechanics behind digital channels. Teach the mechanism before the interface.

Mandatory approach:
- For SEO: explain how a search engine works before talking about keywords.
- For Ads: explain the auction and Quality Score before creating campaigns.
- For Analytics: explain the data model (event, session, user) before reading metrics.
- Never teach "click here" without explaining what happens underneath.`,
      ementa: [
        'Tráfego Pago vs Orgânico (Custo e Escala)',
        'SEO e Mecanismos de Busca',
        'Email Marketing e Nutrição de Leads',
        'Métricas de Marketing: MQL, SQL, CPL e ROAS',
        'A/B Testing e Otimização de Conversão (CRO)',
        'Dark Social: O Tráfego Invisível de Mensagens Privadas',
        'Attribution Modeling: De Onde Vem o Cliente de Verdade?',
        'Arquitetura de Campanhas no Google Ads e Meta Ads',
        'Tag Manager, Pixel e Rastreamento de Eventos',
        'Google Analytics 4: Eventos, Conversões e Funis',
        'Marketing Automation: Fluxos, Triggers e Segmentação',
        'CRM para Marketing: HubSpot, RD Station e Pipedrive',
        'Landing Pages e CRO na Prática',
        'Remarketing e Audiências Personalizadas',
        'SEO Técnico: Core Web Vitals, Estrutura e Indexação',
        'Mídia Programática: RTB (Real-Time Bidding) e DSPs',
        'Marketing Analytics: Como Montar um Dashboard Executivo',
        'Estratégia de Lances (Bidding Strategies) em Plataformas de Ads',
        'Auditoria Técnica de Sites: Encontrando Gargalos de Conversão',
        'Web Scraping para Inteligência Competitiva de Marketing'
      ]
    },

    // ─────────────────────────────────────────────────────────────
    // 3. CONTEÚDO & INFLUÊNCIA
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'marketing-conteudo',
      nome: 'Content & Influence',
      emoji: '✍️',
      parent: 'marketing-hub',
      whyStart:
        'Ads stop when the money runs out. Content and community are assets that accumulate. This subject teaches how to build own media, partnership with creators, and the language that converts — written and spoken.',
      descricao: 'Copywriting, Content Marketing, Creator Economy, and the art of building audiences that buy.',
      contexto: `Focus: building media assets and the language that converts. Teach craft before volume.

Mandatory approach:
- Copywriting is not "pretty writing" — it is response engineering. Explain the psychological mechanism of each technique.
- Content Marketing: differentiate content strategy (the map) from content production (the execution).
- Creator Economy: teach the business models behind it, not just "how to make a video".
- Storytelling: narrative structure before brand application.`,
      ementa: [
        'Content Marketing e a Estratégia de Conteúdo',
        'Copywriting para Conversão: Headlines, CTAs e Landing Pages',
        'Marketing de Influência e Co-marketing',
        'Creator Economy: Parcerias com Criadores de Conteúdo',
        'Frameworks de Copy: PAS, AIDA, FAB',
        'Storytelling como Estratégia de Marca',
        'UGC (User Generated Content): Quando o Cliente Vira Criador',
        'Roteiro para Vídeos de Vendas e Shorts',
        'Newsletter como Ativo de Mídia Própria',
        'Estratégia de SEO para Conteúdo: Tópicos vs Keywords',
        'Construindo Comunidade no Discord e WhatsApp',
        'Personal Branding: Você como Canal de Distribuição',
        'Marketing de Afiliados: Construindo um Exército de Vendedores',
        'Gestão de Comunidade: Do Zero aos Primeiros 1000 True Fans',
        'A Arte da Entrevista e Mediação (Podcasts de Marca)',
        'O Funil de Conteúdo: Topo (Atenção), Meio (Educação) e Fundo (Conversão)',
        'Copywriting B2B: Vendendo para Empresas vs Pessoas Físicas',
        'Reciclagem de Conteúdo: Multiplicando um Ativo em Vários Formatos'
      ]
    },

    // ─────────────────────────────────────────────────────────────
    // 4. GROWTH & PERFORMANCE
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'marketing-growth',
      nome: 'Growth & Performance',
      emoji: '🚀',
      parent: 'marketing-hub',
      whyStart:
        'Growth is not a job title — it is a mindset of systematic experimentation. Here you learn to assemble the growth engine: the North Star Metric, viral loops, the activation funnel, and the experiments that turn guesswork into scale.',
      descricao: 'Conversion funnels, Growth Hacking, PLG, experimentation, and the metrics that really matter for growth.',
      contexto: `Focus: growth engineering — funnel structure, metrics, and experiments. Teach cause-and-effect logic before tactics.

Mandatory approach:
- Funnel is not just "top, middle, and bottom" — explain user behavior in each stage.
- Growth Hacking: demystify the term. It is cheap and fast experimentation — explain the method.
- PLG: explain why the product is the channel, and what design implication that requires.
- Metrics: for each KPI, explain what it measures and what it can hide.`,
      ementa: [
        'A Anatomia de um Funil de Vendas',
        'Canais de Aquisição (Go-To-Market)',
        'Growth Hacking e Loops Virais',
        'Product-Led Growth (PLG): O Produto como Canal',
        'Expansão Internacional: Go-To-Market em Novos Mercados',
        'Community-Led Growth: Construindo Comunidades que Vendem',
        'North Star Metric: A Única Métrica que Guia o Crescimento',
        'Iceberg da Retenção: Por que Crescer Sem Reter É Baldear Água',
        'Experimentos de Growth: Como Estruturar e Priorizar (ICE Score)',
        'Viral Coefficient (K-factor) e Crescimento Exponencial',
        'Onboarding de Usuários como Alavanca de Ativação',
        'Pricing como Canal de Growth',
        'OKRs de Marketing: Alinhando Esforço e Resultado',
        'Revenue Operations (RevOps): Marketing, Vendas e CS Alinhados',
        'Unit Economics em Marketing: CAC vs LTV na Prática',
        'Efeito de Rede (Network Effects) como Fosso Competitivo',
        'Cohort Analysis: Entendendo o Comportamento do Usuário no Tempo',
        'Growth B2B: Account-Based Marketing (ABM) e Outbound',
        'O Loop de Retenção: Criando Hábitos no Usuário'
      ]
    },

    // ─────────────────────────────────────────────────────────────
    // 5. AI MARKETING & AUTOMAÇÃO AVANÇADA
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'marketing-ia',
      nome: 'AI Marketing & Advanced Automation',
      emoji: '🤖',
      parent: 'marketing-hub',
      whyStart:
        'Marketing in 2026 is not about who writes faster using ChatGPT, but about who orchestrates autonomous agents, optimizes for answer engines (AEO), and uses first-party data to predict user behavior.',
      descricao: 'Autonomous agents, AEO (Answer Engine Optimization), hyperpersonalization, and the state of the art of modern marketing.',
      contexto: `Focus: The infrastructure and strategy of AI-driven marketing. The student must understand how AI shifts operational work so that humans focus on strategy.

Mandatory approach:
- Differentiate shallow use of AI (generic text generation) from structural use (agents, prediction, automation).
- Explain how to train AIs with First-Party Data (the business's own data) to avoid generic answers.
- AEO (Answer Engine Optimization): Explain why optimizing for Perplexity and Google AI Overviews is different from traditional SEO.
- Ethics and transparency are non-negotiable.`,
      ementa: [
        'A Transição do SEO para o AEO (Answer Engine Optimization)',
        'Otimizando Conteúdo para Perplexity, ChatGPT Search e AI Overviews',
        'Agentes Autônomos de Marketing: O Que São e Como Orquestrar',
        'First-Party Data como Ouro: Alimentando Modelos de IA com o Seu CRM',
        'Hiperpersonalização em Escala (1:1): Além do "Olá, [Nome]"',
        'A Fadiga do Sintético: Autenticidade como Maior Diferencial em 2026',
        'AI-Driven Measurement: Medição Preditiva de ROI e Jornada do Cliente',
        'Pod-based Teams: Como a IA Mudou o Organograma do Marketing',
        'Automação de Criativos (Dynamic Creative Optimization) com Brand Guardrails',
        'Análise Preditiva de Churn: Usando Machine Learning para Reter Clientes',
        'Chatbots Cognitivos e Atendimento ao Cliente Focado em Conversão',
        'O Fim do Cookies de Terceiros e o Marketing Pós-Privacy',
        'Marketing Ops com IAs Locais (LLMs Open Source)',
        'Automatizando Fluxos de Trabalho com n8n, Make e Zapier Avançado',
        'Prompt Engineering para Marketers: Indo Além do Básico',
        'Proteção de Marca e Direitos Autorais na Era da Geração de Conteúdo AI'
      ]
    }
  ]
};
