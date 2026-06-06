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
      nome: 'Product Manager — Do Zero ao Avançado',
      emoji: '🎯',
      parent: 'founder-solo',
      whyStart: 'O PM é o CEO do produto. Ele não coda, não desenha, não vende — mas é responsável por tudo. Quem domina PM consegue transformar qualquer ideia em produto que pessoas pagam para usar.',
      descricao: 'Descoberta, priorização, métricas, UX/design e estratégia de produto — da ideia ao produto que escala.',
      contexto: 'O aluno é founder solo que precisa acumular a função de PM. Foco na ponte entre usuário, negócio e engenharia. Quando citar frameworks, indique de onde vieram (ex: Teresa Torres, "Continuous Discovery Habits", 2021).',
      fases: [
        {
          nome: 'Fase 1 — Fundamentos: O Que é Produto e Qual é o Papel do PM',
          topicos: [
            'O Papel do PM: a ponte entre Engenharia, UX e Negócios — sem autoridade formal',
            'O que é um produto digital — diferença entre produto, feature e projeto',
            'Product Discovery vs Product Delivery — onde a maioria das empresas erra',
            'Jobs-to-be-Done (JTBD): entender o que o usuário realmente "contrata" o produto para fazer',
            'Entrevistas de Usuário: como fazer as perguntas certas sem contaminar a resposta',
            'O Problema com Soluções Prematuras — o viés de confirmação em Product Management',
            'Personas vs Jobs: quando cada modelo ajuda e quando atrapalha',
            'Ciclo de Vida do Produto: Introdução, Crescimento, Maturidade e Declínio',
            'Platform Products vs End-User Products — lógica e dinâmicas diferentes',
            'O Documento de Visão de Produto (PRD simplificado): o que precisa ter',
            'Inception: como alinhar toda a equipe no começo de um produto',
            'MVP: o que é, o que não é, e por que a maioria faz errado'
          ]
        },
        {
          nome: 'Fase 2 — Intermediário: Priorização, Métricas e Ciclo de Produto',
          topicos: [
            'Frameworks de Priorização: RICE, Kano, MoSCoW — quando usar cada um',
            'Gestão de Backlog: a diferença entre um backlog vivo e um cemitério de ideias',
            'Roadmap Estratégico: Now/Next/Later vs Roadmap Baseado em Datas',
            'North Star Metric: encontrando a única métrica que resume o valor entregue',
            'AARRR (Pirate Metrics): Aquisição, Ativação, Retenção, Receita e Referência',
            'Cohort Analysis e Churn: como ler a saúde real do produto nos dados',
            'Testes A/B e Experimentação Contínua: hipóteses, amostras e significância',
            'Opportunity Solution Tree (Teresa Torres, 2021): mapeando oportunidades sem viés',
            'Continuous Discovery Habits: rotina de pesquisa semanal com usuários reais',
            'OKRs para Produto: metas aspiracionais vs tarefas operacionais',
            'Stakeholder Management: alinhando liderança, vendas e engenharia sem guerras',
            'Go-to-Market de Novas Features: como lançar sem gerar confusão',
            'Heatmaps e Session Recordings: lendo o comportamento silencioso do usuário',
            'Feedback Loops: NPS, CSAT e CES — o que cada um mede de fato',
            'Dados quantitativos + qualitativos: por que nenhum dos dois sozinho resolve',
            'Unit Economics aplicados a produto: CAC, LTV e Payback Period'
          ]
        },
        {
          nome: 'Fase 3 — Avançado: UX, Design e Estratégia de Produto em 2026',
          topicos: [
            'Product-Led Growth (PLG): deixar o produto ser o principal canal de aquisição',
            'Growth Loops: construindo ciclos virais sustentáveis — viral, paid e content loops',
            'Pricing Strategy: Freemium, Usage-Based, Value-Based — a lógica de cada modelo',
            'Product Ops: escalando a função de produto quando o time cresce',
            'Wireframing e Prototipagem Rápida com Figma e v0.dev',
            'Design Systems: tokens, componentes e consistência visual como vantagem competitiva',
            'Heurísticas de Nielsen: os 10 princípios que todo PM precisa saber avaliar',
            'Onboarding: engenharia do Momento "Aha!" — reduzindo fricção na ativação',
            'Micro-interações e Animações de Feedback: quando UX encanta e quando distrai',
            'Acessibilidade (a11y e WCAG): o mínimo não negociável em qualidade de produto',
            'Dark Patterns: o que nunca fazer e como identificar na concorrência',
            'A Arte de Dizer Não: como recusar features sem perder aliados',
            'AI-First Product Management: gerenciando features de IA não-determinísticas',
            'Evaluation-Driven PM: como medir qualidade de output de modelos de linguagem',
            'Agentes como Produto: UX para sistemas autônomos e interações com AI Agents',
            'Competitive Analysis: frameworks para mapear concorrentes sem viés',
            'API as a Product: quando desenvolvedores são seus clientes principais',
            'Produto Internacional: localização, adaptação cultural e armadilhas de i18n',
            'Ethical Product Design: responsabilidade do PM sobre impacto social e Dark Patterns',
            'Churn Analysis: por que usuários somem e como antecipar antes de perder'
          ]
        }
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
    },
    {
      slug: 'design',
      nome: 'Design Visual & UX',
      emoji: '◑',
      parent: 'founder-solo',
      layout: 'canvas',
      widget: 'DesignPreview',
      whyStart: 'O melhor algoritmo do mundo fracassa se a interface do usuário (UX) for ruim. Design não é estética — é a lógica de como humanos percebem e interagem com sistemas.',
      descricao: 'Hierarquia, tipografia, gestalt e design centrado no usuário — dos fundamentos perceptivos ao design nativo de IA.',
      contexto: 'Foco: princípios estruturais do design — hierarquia, gestalt, percepção visual. Abordagem obrigatória: explique o princípio perceptivo ou cognitivo por trás de cada decisão de design. Só depois: peça que o aluno critique um design real.',
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
        'Motion Design: Movimento com Propósito',
        'Design para IA: Interfaces Conversacionais e Probabilísticas',
        'Machine Experience (MX): Otimizando para Humanos e Agentes',
        'Explainable UX: Transparência em Decisões de IA',
        'Adaptive UI: Interfaces que se Ajustam ao Contexto do Usuário',
        'Design Multimodal: Voz, Gesto e Toque Integrados',
        'Calm Design: Reduzindo Sobrecarga Cognitiva',
        'Design Emocional: Microcopies que Geram Conexão',
        'UX Writing: Escrevendo para Interfaces',
        'Information Architecture: Organizando Conteúdo Complexo',
        'Design Sprint: Prototipando em 5 Dias (Google Ventures)',
        'Atomic Design: Átomos, Moléculas e Organismos',
        'Psicologia Cognitiva Aplicada a UX: Hick, Fitts e Miller',
        'Design de Dashboards e Visualização de Dados',
        'Design de Formulários: Reduzindo Abandono',
        'Sustentabilidade Digital: Design Eco-Consciente'
      ]
    }
  ]
};
