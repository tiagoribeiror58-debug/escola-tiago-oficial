import { MateriaConfig } from '@/types';

export const marketingHub: MateriaConfig = {
  slug: 'marketing-hub',
  nome: 'Marketing',
  emoji: '🎯',
  isCategory: true,
  descricao: 'Do conceito ao canal. Marketing é a disciplina que conecta o que você criou com quem precisa disso.',
  whyStart:
    'Marketing é o que faz o mundo saber que você existe. Não é sobre anúncios ou seguidores — é sobre entender como as pessoas tomam decisões e como você posiciona sua solução no caminho delas. Sem isso, o melhor produto do mundo morre na prateleira.',
  children: [
    // ─────────────────────────────────────────────────────────────
    // 1. MARKETING TÉCNICO
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'marketing-tecnico',
      nome: 'Marketing Técnico',
      emoji: '⚙️',
      parent: 'marketing-hub',
      whyStart:
        'Marketing sem dados é achismo. Aqui você aprende a operar as ferramentas que transformam intuição em decisão baseada em evidência: rastreamento, anúncios, automação e a leitura correta dos números.',
      descricao: 'SEO, mídia paga, rastreamento, automação e as ferramentas que fazem a máquina de aquisição funcionar.',
      contexto: `Foco: a mecânica técnica por trás dos canais digitais. Ensine o mecanismo antes da interface.

Abordagem obrigatória:
- Para SEO: explique como um mecanismo de busca funciona antes de falar de palavras-chave.
- Para Ads: explique o leilão e o Quality Score antes de criar campanhas.
- Para Analytics: explique o modelo de dados (evento, sessão, usuário) antes de ler métricas.
- Nunca ensine "clique aqui" sem explicar o que acontece por baixo.`,
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
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 3. CONTEÚDO & INFLUÊNCIA
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'marketing-conteudo',
      nome: 'Conteúdo & Influência',
      emoji: '✍️',
      parent: 'marketing-hub',
      whyStart:
        'Anúncios param quando o dinheiro acaba. Conteúdo e comunidade são ativos que se acumulam. Esta disciplina ensina como construir mídia própria, parceria com criadores e a linguagem que converte — escrita e falada.',
      descricao: 'Copywriting, Content Marketing, Creator Economy e a arte de construir audiências que compram.',
      contexto: `Foco: a construção de ativos de mídia e a linguagem que converte. Ensine craft antes de volume.

Abordagem obrigatória:
- Copywriting não é "escrever bonito" — é engenharia de resposta. Explique o mecanismo psicológico de cada técnica.
- Content Marketing: diferencie estratégia de conteúdo (o mapa) de produção de conteúdo (a execução).
- Creator Economy: ensine os modelos de negócio por trás, não só o "como fazer vídeo".
- Storytelling: estrutura narrativa antes de aplicação à marca.`,
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
      ],
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
        'Growth não é um cargo — é uma mentalidade de experimentação sistemática. Aqui você aprende a montar o motor de crescimento: a North Star Metric, os loops virais, o funil de ativação e os experimentos que transformam achismo em escala.',
      descricao: 'Funis de conversão, Growth Hacking, PLG, experimentação e as métricas que realmente importam para crescer.',
      contexto: `Foco: a engenharia de crescimento — estrutura de funil, métricas e experimentos. Ensine a lógica de causa-e-efeito antes das táticas.

Abordagem obrigatória:
- Funil não é só "topo, meio e fundo" — explique o comportamento do usuário em cada etapa.
- Growth Hacking: desmistifique o termo. É experimentação barata e rápida — explique o método.
- PLG: explique por que o produto é o canal, e qual a implicação de design que isso exige.
- Métricas: para cada KPI, explique o que ele mede e o que pode esconder.`,
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
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 5. AI MARKETING & AUTOMAÇÃO AVANÇADA (Novo para 2026)
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'marketing-ia',
      nome: 'AI Marketing & Automação Avançada',
      emoji: '🤖',
      parent: 'marketing-hub',
      whyStart:
        'O marketing em 2026 não é sobre quem escreve mais rápido usando ChatGPT, mas sobre quem orquestra agentes autônomos, otimiza para motores de resposta (AEO) e usa dados primários para prever o comportamento do usuário.',
      descricao: 'Agentes autônomos, AEO (Answer Engine Optimization), hiperpersonalização e o estado da arte do marketing moderno.',
      contexto: `Foco: A infraestrutura e a estratégia do marketing guiado por IA. O aluno deve entender como a IA desloca o trabalho operacional para que o humano foque na estratégia.

Abordagem obrigatória:
- Diferencie uso raso de IA (geração de texto genérico) de uso estrutural (agentes, predição, automação).
- Explique como treinar IAs com First-Party Data (os dados do próprio negócio) para evitar respostas genéricas.
- AEO (Answer Engine Optimization): Explique por que otimizar para Perplexity e Google AI Overviews é diferente de SEO tradicional.
- Ética e transparência são inegociáveis.`,
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
      ],
    }
  ],
};
