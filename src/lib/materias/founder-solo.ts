import { MateriaConfig } from '@/types';

export const founderSolo: MateriaConfig = {
  slug: 'founder-solo',
  nome: 'Hub do Founder Solo',
  emoji: '🦅',
  isCategory: true,
  descricao: 'Desenvolvimento integral para fundadores solo: de engenharia a vendas, IA nativa e alavancagem máxima em 2026.',
  children: [
    {
      slug: 'founder-ia-automacao',
      nome: 'IA & Automação para Founders',
      emoji: '🤖',
      parent: 'founder-solo',
      whyStart: 'Em 2026, um founder solo com IA bem configurada compete com times de 10 pessoas. Quem não domina IA como alavanca está correndo com chumbo nos pés.',
      descricao: 'LLMs, AI Agents, automação de processos e construção de produtos nativos de IA para o founder de 1 pessoa.',
      contexto: `Foco: IA como multiplicador de força operacional e como produto.
Abordagem obrigatória:
- Como usar LLMs (GPT-4o, Claude, Gemini) como copiloto de decisões.
- Construção de AI Agents para automatizar fluxos internos.
- Produtos nativos de IA: o que é e o que não é uma boa ideia.`,
      ementa: [
        'O Stack de IA do Founder Solo em 2026: Um Mapa Completo',
        'Prompt Engineering Avançado para Tarefas de Negócios',
        'AI Agents com LangChain e CrewAI: Conceitos Fundamentais',
        'Automação de Outreach e CRM com IA (Clay, Apollo + GPT)',
        'Construindo Produtos com a API da OpenAI e Anthropic',
        'RAG (Retrieval-Augmented Generation): Bases de Conhecimento Privadas',
        'Vibe Coding: Usando Cursor e GitHub Copilot para Ser 10x Mais Rápido',
        'AI para Atendimento ao Cliente: Zaps, n8n e Chatbots Inteligentes',
        'Fine-tuning vs Prompting: Quando Vale a Pena Cada Abordagem',
        'Automatizando Marketing de Conteúdo com IA (sem parecer robô)',
        'Ferramentas de IA para Análise Financeira e Previsão de Churn',
        'Privacidade de Dados ao Usar LLMs de Terceiros (LGPD + IA)',
        'Make (Integromat) e n8n: Automações Sem Código Para Crescimento',
        'Monitorando e Avaliando a Qualidade das Suas Pipelines de IA',
        'O Founder Aumentado: Quando Delegar para IA vs Para Humanos'
      ]
    },
    {
      slug: 'founder-marketing-growth',
      nome: 'Marketing & Distribuição',
      emoji: '📣',
      parent: 'founder-solo',
      whyStart: 'Sem distribuição, seu produto invisível morre. Founders solo precisam construir audiência e canais antes mesmo do código.',
      descricao: 'Estratégias de Growth, SEO, Comunidade e Marketing de Conteúdo para founders em 2026.',
      contexto: `Foco: Distribuição eficiente para times de 1 pessoa.
Abordagem obrigatória:
- Como alavancar canais orgânicos sem gasto massivo em Ads.
- Building in Public e construção de autoridade.
- Distribuição assíncrona via conteúdo perene.`,
      ementa: [
        'Building in Public: Estratégia de Transparência Radical',
        'SEO Técnico e de Conteúdo para SaaS em 2026',
        'Cold Email Estruturado e Escalonável com Personalização por IA',
        'Criação de Comunidades (Discord, Circle, WhatsApp Premium)',
        'Lançamentos no Product Hunt: O Guia Definitivo 2026',
        'Marketing de Conteúdo: Artigos e Vídeos Técnicos que Convertem',
        'Parcerias e Co-Marketing para Solo Founders',
        'LinkedIn como Canal de Aquisição B2B: Táticas que Funcionam',
        'Twitter/X: Como Construir Audiência Técnica do Zero',
        'Newsletter como Ativo de Distribuição: Do Zero a 10k Leitores',
        'SEO Conversacional e Otimização para AI Search (SGE, Perplexity)',
        'Affiliate Marketing e Programas de Referência Automatizados',
        'Vídeo Curto para SaaS: TikTok, Reels e Shorts que Geram Trial',
        'Podcast como Canal de Autoridade: Como Começar Sem Estrutura',
        'Virality Loop: Projetando Crescimento Orgânico no Produto',
        'Retargeting de Baixo Custo: Google e Meta com Orçamento Micro',
        'Presença em Marketplaces: AppSumo, Capterra, G2 e Alternativas',
        'Press e PR Orgânica: Como Conseguir Mídia Sem Assessoria'
      ]
    },
    {
      slug: 'founder-dev-arquitetura',
      nome: 'Desenvolvimento & Arquitetura',
      emoji: '⚙️',
      parent: 'founder-solo',
      whyStart: 'Velocidade de iteração é sua única vantagem competitiva contra grandes corporações. Arquitetura simples vence arquitetura complexa.',
      descricao: 'Decisões técnicas otimizadas para velocidade, manutenção baixa e escalabilidade barata em 2026.',
      contexto: `Foco: Engenharia pragmática. Ferramentas que reduzem o atrito.
Abordagem obrigatória:
- Monolitos vs Microserviços: Escolha o pragmatismo.
- BaaS (Supabase/Firebase) como multiplicador de força.
- Vibe Coding e IA como copiloto de desenvolvimento.`,
      ementa: [
        'A Arquitetura do Solo Founder (Monolitos e BaaS)',
        'Escolhendo o Tech Stack: Produtividade vs Hype em 2026',
        'CI/CD e Deploy Contínuo Sem Fricção (GitHub Actions + Vercel)',
        'Gestão de Banco de Dados e Migrations Simplificadas',
        'Automação de Infraestrutura com Vercel, Railway e Fly.io',
        'Testes Automatizados: O Que Realmente Importa para 1 Dev',
        'Lidando com Débito Técnico Quando Você é o Único Dev',
        'Supabase do Zero ao Avançado: Auth, RLS, Storage e Edge Functions',
        'Serverless e Edge Computing: Quando Usar e Quando Evitar',
        'Observabilidade Barata: Logs, Alertas e Tracing para SaaS Solo',
        'Segurança de Aplicação: O Checklist Mínimo Não Negociável',
        'API Design para Produtos que Vão Escalar (REST vs tRPC vs GraphQL)',
        'WebSockets e Tempo Real: Quando o Usuário Precisa de Feedback Vivo',
        'Monorepos com Turborepo: Gerenciando Múltiplos Produtos Solo',
        'Feature Flags: Lançamentos Seguros e Rollbacks Imediatos',
        'Billing e Pagamentos: Stripe do Zero, Webhooks e Gestão de Assinatura',
        'Multi-tenancy: Arquitetura para SaaS que Atende Múltiplos Clientes',
        'Cache Inteligente: Redis, CDN e Estratégias Para Escalar Sem Custo'
      ]
    },
    {
      slug: 'founder-produto-ux',
      nome: 'Produto, UX & Design',
      emoji: '🎨',
      parent: 'founder-solo',
      whyStart: 'O usuário não vê seu código, ele vê a interface. UX excelente constrói confiança imediata e reduz churn.',
      descricao: 'Design intuitivo, onboarding perfeito e desenvolvimento guiado pelo feedback real em 2026.',
      contexto: `Foco: UI/UX pragmático e design systems.
Abordagem obrigatória:
- Como desenhar interfaces que parecem profissionais usando bibliotecas e Tailwind.
- A regra do "Menos é Mais" em features.
- Dados quantitativos + qualitativos para decisão de produto.`,
      ementa: [
        'Design Systems e Tailwind: Consistência Visual Rápida',
        'Onboarding: Engenharia do Momento Aha!',
        'A Arte de Dizer Não a Novas Features (e Convencer o Cliente)',
        'Entrevistas com Usuários: Como Fazer as Perguntas Certas',
        'Wireframing e Prototipagem Rápida com Figma e v0.dev',
        'Métricas de Engajamento e Retenção de Produto',
        'Micro-Interações que Encantam o Usuário',
        'Jobs to Be Done (JTBD): Entendendo o Que o Usuário Realmente Quer',
        'Heatmaps e Session Recordings: Microsoft Clarity e Hotjar Gratuitos',
        'A/B Testing de Baixo Custo para Solo Founders',
        'Design Responsivo e Mobile-First: Não É Opcional em 2026',
        'Acessibilidade (a11y): O Mínimo Que Todo Produto Precisa',
        'Churn Analysis: Por Que os Usuários Somem e Como Prever',
        'Gamificação Sutil: Streaks, Badges e Loops de Engajamento',
        'Modo Escuro, Animações e Glassmorphism: Design Premium Para SaaS',
        'Internacionalização (i18n): Preparando o Produto para o Mercado Global',
        'NPS e CSAT: Como Medir e Interpretar Satisfação do Cliente',
        'Product Roadmap Solo: Como Priorizar com Um Backlog Infinito'
      ]
    },
    {
      slug: 'founder-vendas-monetizacao',
      nome: 'Vendas & Monetização',
      emoji: '💰',
      parent: 'founder-solo',
      whyStart: 'Se não gera receita, é um hobby. Cobrar desde o dia 1 é essencial para validar se você está resolvendo um problema real.',
      descricao: 'Estratégias de precificação, funis de conversão e fechamento de vendas para o founder solo.',
      contexto: `Foco: Receita real. Como cobrar, quanto cobrar e como vender sendo introvertido.
Abordagem obrigatória:
- PLG (Product-Led Growth) vs Sales-Led.
- Modelagem de preços para produtos digitais em 2026.`,
      ementa: [
        'Estratégias de Precificação: Freemium vs Trial vs Pago',
        'Como Fazer a Primeira Venda (The Mom Test na Prática)',
        'Copywriting de Conversão para Landing Pages de SaaS',
        'Lidando com Rejeições Comerciais: Resiliência e Reframe',
        'Demonstrações de Produto (Demos) que Convertem',
        'Upselling e Cross-selling Automatizados',
        'MRR, ARR, Churn: Entendendo a Saúde da Receita',
        'PLG (Product-Led Growth): Deixando o Produto Vender por Você',
        'Value-Based Pricing: Cobrar pelo Valor, Não pelo Custo',
        'Annual Plans: Como Convencer o Cliente a Pagar o Ano Todo',
        'Gestão de Objeções: As 10 Desculpas Mais Comuns e Como Quebrar',
        'Sales CRM Solo: Noção, Linear e Pipedrive para Times de 1',
        'Proposta Comercial que Fecha: Estrutura e Linguagem',
        'O Funil de Conversão de SaaS: Da Visita ao MRR',
        'Recuperação de Churn: Como Recuperar Clientes que Cancelaram',
        'Expansão de Receita (Net Revenue Retention) Acima de 100%',
        'Vendas Enterprise como Solo: Quando e Como Entrar no Upmarket',
        'Contratos Anuais vs Mensais: Gestão de Risco e Previsibilidade'
      ]
    },
    {
      slug: 'founder-financas-fundraising',
      nome: 'Finanças & Fundraising',
      emoji: '🏦',
      parent: 'founder-solo',
      whyStart: 'Falta de caixa mata startups. Saber quando fazer bootstrapping e quando captar dinheiro é uma decisão fundamental.',
      descricao: 'Gestão de caixa para founders, Bootstrapping vs VC, modelagem financeira e fundraising estratégico.',
      contexto: `Foco: Sobrevivência financeira e alocação de capital inteligente.
Abordagem obrigatória:
- Unit Economics e Burn Rate.
- O mito do VC vs a realidade do Bootstrapping em 2026.`,
      ementa: [
        'Bootstrapping vs Capital de Risco (VC): Prós, Contras e Trade-offs',
        'Calculando o Runway e Gerenciando o Burn Rate',
        'Unit Economics Essenciais: CAC, LTV e Payback Period',
        'Como Preparar um Pitch Deck Preciso e Honesto',
        'A Matemática do Equity e Diluição em Rodadas de Captação',
        'Bolsões de Liquidez e Gestão de Risco Pessoal do Founder',
        'Financiamento Baseado em Receita (Revenue-Based Financing)',
        'Grants e Editais para Startups: Dinheiro Sem Diluição',
        'Aceleradoras: YC, Distrito e Outras — Vale a Pena Aplicar?',
        'Modelagem Financeira Básica: P&L, Fluxo de Caixa e Projeções',
        'Impostos para Founders: PJ Simples Nacional vs Lucro Presumido',
        'Separando Finanças Pessoais e Empresariais (e Por Que é Crítico)',
        'Renegociação de Contratos com Fornecedores em Momentos de Crise',
        'Precificando para Escalar: Quando Aumentar o Preço e Como Fazer',
        'Crowdfunding e Pré-venda como Estratégia de Validação e Caixa',
        'SAFE e Notas Conversíveis: Instrumentos de Captação Moderna',
        'Due Diligence do Investidor: O Que Ele Vai Pedir e Como Preparar'
      ]
    },
    {
      slug: 'founder-gestao-produtividade',
      nome: 'Gestão de Tempo & Produtividade',
      emoji: '⏱️',
      parent: 'founder-solo',
      whyStart: 'Você tem as mesmas 24h que grandes equipes. Onde você foca determina se a empresa avança ou gira em falso.',
      descricao: 'Frameworks de produtividade extrema, saúde mental e foco para o founder solo em 2026.',
      contexto: `Foco: Autogerenciamento. A psicologia de ser o único responsável pelo sucesso e fracasso.
Abordagem obrigatória:
- Como evitar burnout estrutural.
- Priorização impiedosa (Matriz de Eisenhower, Timeboxing).
- IA como delegação de baixo custo.`,
      ementa: [
        'Timeboxing e Trabalho Profundo (Deep Work) na Prática',
        'A Arte da Priorização Impiedosa: O que Só Você Pode Fazer?',
        'Delegação de Baixo Custo: Assistentes Virtuais, Freelancers e IA',
        'Lidando com o Isolamento e a Solidão do Solo Founder',
        'Prevenção de Burnout: Rotinas Não-Negociáveis e Limites Saudáveis',
        'Métricas de Vaidade vs Métricas de Ação: Onde Focar a Energia',
        'Context Switching: O Inimigo Silencioso da Produtividade',
        'O Sistema de Notas do Founder: Obsidian, Notion e Second Brain',
        'Gestão de E-mail e Comunicação Assíncrona para Não Ser Escravo',
        'Semana Ideal do Founder: Como Estruturar Blocos de Tempo por Energia',
        'Tomada de Decisão Rápida com Dados Incompletos (Good Enough)',
        'OKRs Pessoais: Como Definir e Acompanhar as Metas Trimestrais',
        'Processo de Review Semanal e Mensal: Rituais de Alta Performance',
        'Terceirização de Tarefas de Alto Custo Cognitivo Baixo com IA',
        'Dopamine Detox e Foco Sustentável em Mundo de Notificações',
        'Journaling Estratégico para Founders: Clareza Mental e Direção',
        'Sono, Exercício e Cognição: A Ciência por Trás da Alta Performance'
      ]
    },
    {
      slug: 'founder-juridico-lgpd',
      nome: 'Jurídico, LGPD & Contratos',
      emoji: '⚖️',
      parent: 'founder-solo',
      whyStart: 'Um processo pode destruir tudo o que você construiu. O básico jurídico é sua armadura.',
      descricao: 'Conformidade legal simplificada, proteção de propriedade intelectual e termos de uso em 2026.',
      contexto: `Foco: Mitigação de riscos jurídicos sem complicação desnecessária.
Abordagem obrigatória:
- LGPD na prática para SaaS.
- Termos de Uso e Políticas de Privacidade que protegem o founder.`,
      ementa: [
        'O Básico da LGPD para Desenvolvedores e Founders',
        'Termos de Uso e Política de Privacidade Impermeáveis',
        'Registro de Marcas e Propriedade Intelectual: Como e Quando Fazer',
        'Contratos com Freelancers: Garantindo os Direitos sobre o Trabalho',
        'Criação de Entidade Jurídica: CNPJ, LLC, LDA e Opções Globais',
        'Recebimento de Pagamentos Internacionais e Tributação',
        'Blindagem Patrimonial Básica para Founders',
        'GDPR para Founders Brasileiros com Clientes Europeus',
        'Acordo de Confidencialidade (NDA): Quando Exigir e Como Redigir',
        'Gestão de Cookies e Consentimento: Plugin vs Solução Customizada',
        'Propriedade Intelectual em Contratos de Trabalho e Freelance',
        'Política de Reembolso e Chargeback: Prevenção e Gestão de Disputas',
        'Open Source: Licenças, Riscos e Como Usar Sem Se Prejudicar',
        'Responsabilidade Limitada e Quando o Véu Societário Não Protege',
        'Arbitragem vs Judicial: Resolvendo Disputas Sem Processo Longo'
      ]
    },
    {
      slug: 'founder-mindset-psicologia',
      nome: 'Mindset & Psicologia do Founder',
      emoji: '🧠',
      parent: 'founder-solo',
      whyStart: 'O maior obstáculo do founder solo não é o mercado, o código ou o dinheiro — é a mente. Dominar a psicologia é o meta-skill de tudo.',
      descricao: 'A psicologia, as crenças e os padrões mentais que separam founders que chegam lá dos que desistem.',
      contexto: `Foco: A dimensão interna do empreendedorismo.
Abordagem obrigatória:
- Síndrome do Impostor e como superar.
- Pensamento de longo prazo vs gratificação imediata.
- Aprender com fracasso sem destruir a autoestima.`,
      ementa: [
        'Síndrome do Impostor: Por Que Todo Founder Sente e Como Gerenciar',
        'Mentalidade de Crescimento (Growth Mindset) na Prática Diária',
        'Tomando Decisões com Vieses Cognitivos: Como Reconhecer e Mitigar',
        'O Ciclo Emocional do Founder: Euforia, Vale da Morte e Recuperação',
        'Stoicismo Aplicado ao Empreendedorismo: Marcus Aurelius como Mentor',
        'Pensamento Probabilístico: Como Founders de Sucesso Avaliam Risco',
        'Identidade e o Perigo de Ser o Seu Negócio (Identity Enmeshment)',
        'Como Lidar com Fracasso Público e Aprender Sem Vergonha',
        'Ambição Calibrada: Como Sonhar Grande e Agir no Plano Real',
        'Comparação e FOMO: Como Não Se Destruir Vendo o Sucesso Alheio',
        'Perseverança vs Teimosia: Como Saber a Diferença em Tempo Real',
        'Comunidades de Founders: A Importância de Não Estar Sozinho',
        'Separando o Trabalho da Identidade: Hobbies, Família e Saúde Mental',
        'Terapia e Coaching para Founders: Investimento, Não Fraqueza',
        'O Papel do Ego no Empreendedorismo: Combustível ou Sabotador?'
      ]
    }
  ]
};
