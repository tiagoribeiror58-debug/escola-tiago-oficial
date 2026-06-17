import { MateriaConfig } from '@/types';

export const founderSolo: MateriaConfig = {
  slug: 'founder-solo',
  nome: 'Solo Founder Hub',
  emoji: '🦅',
  isCategory: true,
  descricao: 'Comprehensive development for solo founders: from engineering to sales, native AI, and maximum leverage in 2026.',
  children: [
    {
      slug: 'ia-operacional',
      nome: 'Operational AI & Efficiency',
      emoji: '👷',
      parent: 'founder-solo',
      whyStart: 'Before understanding the mathematical weights of a model, learn to use it as a tool. And for a solo founder, AI is not a luxury — it is the entire team.',
      descricao: 'Daily use for massive personal efficiency gains. Workflows, GPT, Claude, MCP, and automations.',
      contexto: `Focus: brutal personal efficiency tactics and day-to-day workflows.
The student is a "Prompt Bricklayer" evolving into an agent conductor, wanting to resolve tasks quickly and pragmatically.`,
      fases: [
        {
          nome: 'Foundations of the Centaur Operator',
          topicos: [
            'O Mindset do Operador Centauro: Humano + Máquina em Sinergia',
            'Anatomia de um Prompt de Alta Precisão (Role, Context, Constraints)',
            'System Prompts vs User Prompts: Arquitetura de Instruções',
            'Iteração e Refinamento de Contexto (Chaining)',
            'Comparando Modelos: GPT vs Claude vs Gemini vs Modelos Abertos',
            'Custo de Token: Otimizando a Fatura de API sem Perder Qualidade',
            'Avaliação de Outputs: Como Medir a Qualidade Real da IA'
          ]
        },
        {
          nome: 'Cognitive Strategies and Advanced Prompting',
          topicos: [
            'Few-Shot Prompting: Guiando o Modelo com Exemplos Cirúrgicos',
            'Chain-of-Thought: Fazendo a IA Pensar Passo a Passo em Voz Alta',
            'Tree-of-Thought: Exploring Múltiplas Ramificações de Raciocínio Simultaneamente',
            'Meta-Prompting: Usando uma IA para Gerar o Prompt Perfeito para Outra',
            'Prompt Caching: Otimizando Latência e Custo em Contextos Longos',
            'Raciocínio Estendido (Modelos o1, R1): Quando e Como Usar Pensamento Lento'
          ]
        },
        {
          nome: 'Productivity, Content, and Daily Operations',
          topicos: [
            'Automatizando Tarefas Repetitivas Administrativas (Emails, Reuniões, Resumos)',
            'Usando IA para Pesquisa, Síntese de Livros e Mapeamento de Mercado',
            'IA como Coautor para Criação de Conteúdo (Blog, LinkedIn, X, Newsletters)',
            'Prompts e Code Interpreter para Análise de Dados e Planilhas Financeiras',
            'IA para Gestão de Projetos, Criação de OKRs e Documentação Técnica',
            'Criação de Prompts Dinâmicos e Templates para Uso Contínuo'
          ]
        },
        {
          nome: 'Ecosystem, APIs, and Customization',
          topicos: [
            'Construindo GPTs Customizados para Funções Específicas da Sua Empresa',
            'O Primeira Integração com a API da OpenAI ou Anthropic',
            'Automações No-Code com IA (Make, Zapier, n8n + LLMs)',
            'Workflows Compostos: Encadeando Múltiplas Chamadas de IA no Backend',
            'Artifacts (Claude) e Canvas (ChatGPT): IAs que Geram Interfaces e Docs ao Vivo'
          ]
        },
        {
          nome: 'Advanced Connectivity: The Power of MCP',
          topicos: [
            'MCP (Model Context Protocol): O Padrão Universal de Conectividade da Anthropic',
            'Como Funciona o Claude Desktop + Acesso ao Sistema de Arquivos (Local MCP)',
            'Integrando Claude ao Notion via MCP: A IA Lendo e Editando Seu Cérebro Digital',
            'Conectores MCP Populares: GitHub, Slack, Google Drive e Suas Aplicações',
            'Ferramentas de IA Agêntica e "Tool Use" (Function Calling)',
            'Acessando Bancos de Dados: A IA Consultando SQL e Postgres via MCP Diretamente'
          ]
        },
        {
          nome: 'Vibe Coding, Autonomous Agents, and Terminal',
          topicos: [
            'IA para Programação Básica: Como Pedir Código Sem Saber Programar (Vibe Coding)',
            'Sistemas Multi-Agente Básicos: Dividindo Tarefas Complexas Entre IAs',
            'IDEs Impulsionadas por IA: O Fluxo de Trabalho no Cursor e Windsurf',
            'Claude Code e Terminal Agents: Dando à IA o Controle da Linha de Comando',
            'AI Coding Assistants: Como Revisar, Testar e Validar o Código que a Máquina Gerou',
            'Agentes Autônomos Avançados (Devin, AutoGPT, BabyAGI): O Que é Real e o Que é Hype'
          ]
        }
      ]
    },
    {
      slug: 'founder-ia-automacao',
      nome: 'AI & Automation for Founders',
      emoji: '🤖',
      parent: 'founder-solo',
      whyStart: 'In 2026, a solo founder with a well-configured AI stack competes with 10-person teams. Those who do not master AI as leverage are running with lead in their shoes.',
      descricao: 'LLMs, AI Agents, process automation, and building native AI products for the 1-person founder.',
      contexto: `Focus: AI as an operational force multiplier and as a product.
Mandatory approach:
- How to use LLMs (GPT-4o, Claude, Gemini) as a decision copilot.
- Building AI Agents to automate internal workflows.
- Native AI products: what is and what is not a good idea.`,
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
      slug: 'founder-marketing-distribuicao',
      nome: 'Marketing, Positioning & Distribution',
      emoji: '📣',
      parent: 'founder-solo',
      whyStart: 'The biggest mistake of technical founders: building an amazing product that nobody knows exists. Distribution is not what you do after building — it is what you plan before. Without an acquisition channel that works without you, the business is a disguised job.',
      descricao: 'From consumer psychology to the growth engine: positioning, branding, organic channels, growth loops, and scalable distribution for solo founders in 2026.',
      contexto: `Focus: building demand and audience as permanent assets, not one-off campaigns.

Mandatory approach:
- Always start from the mechanism: "why do people buy?" before talking about tools or channels.
- JTBD, Kahneman, Cialdini: explain the psychological principle before the application.
- Differentiate content strategy (the map) from content production (the execution).
- For each channel: explain the cost, the growth ceiling, and when to stop.
- Growth Hacking: demystify it. It is cheap and fast experimentation — teach the method, not the myth.
- Question romanticisms: "Does Building in Public work for every type of product? Why not?"`,
      fases: [
        {
          nome: 'Why People Buy: Psychology and Decision Mechanisms',
          topicos: [
            'Marketing vs Publicidade vs Propaganda: As Três Coisas que Founders Confundem o Tempo Todo',
            'Jobs To Be Done (JTBD): O Cliente Nunca Compra o Produto — Ele Contrata uma Solução para um Progresso',
            'Sistema 1 e Sistema 2 de Kahneman: Como a Decisão Acontece Emocionalmente Antes de Ser Racionalizada',
            'Psicologia da Prova Social, Autoridade e Reciprocidade (Cialdini): o Mecanismo Neural por Trás',
            'Percepção de Valor vs Preço Real: Por que o Barato Parece Suspeito e o Caro Parece Superior',
            'O Paradoxo da Escolha (Barry Schwartz): Menos Opções Vendem Mais — a Ciência da Decisão por Sobrecarga',
            'Ancoragem, Decoy e Framing: Como a Apresentação do Preço Altera a Percepção do Valor',
            'Efeito Halo: Como a Primeira Impressão de um Produto Contamina Todas as Percepções Seguintes',
            'Neuromarketing: O Que o Dado Real Diz Sobre Consumo (e o Que é Mito de Vendedor)',
            'Comportamento do Consumidor na Era Digital: Atenção Fragmentada, Ciclos de Decisão Curtos e o Doom Scroll'
          ]
        },
        {
          nome: 'Positioning, Branding, and Category Design',
          topicos: [
            'Posicionamento Estratégico: Ocupar uma Categoria Mental Antes de Competir em Preço',
            'Branding para Founders Solo: Não é Logotipo — é Gestão de Percepção Sistemática',
            'Os 4 Ps do Marketing: O Framework Original, Suas Limitações e o Que Substituiu Cada Um',
            'Estratégia de Oceano Azul (Kim & Mauborgne): Como Criar Mercados sem Concorrência Direta',
            'Category Design: Inventar uma Categoria vs Competir em Uma Existente — Quando Cada Um Faz Sentido',
            'Storytelling Estrutural para Founders: Como Joseph Campbell e Donald Miller Aplicam ao SaaS',
            'Copywriting de Conversão: Headlines, CTAs e Landing Pages — Engenharia de Resposta, Não Escrita Bonita',
            'Frameworks de Copy: PAS (Problema-Agitação-Solução), AIDA e FAB — O Mecanismo por Trás de Cada Um',
            'Personal Branding como Canal de Distribuição: Você como Mídia Própria Permanente',
            'Gestão de Crise de Imagem para Founders: O Que Fazer Quando o Twitter Decide que Você Errou',
            'Arquitetura de Marca Solo: Quando Separar Marca Pessoal e Marca de Produto'
          ]
        },
        {
          nome: 'Organic Channels and Asynchronous Distribution',
          topicos: [
            'Content Marketing Estratégico: A Diferença entre Ter uma Estratégia de Conteúdo e Produzir Conteúdo',
            'SEO Técnico e de Conteúdo para SaaS: Como Funciona um Mecanismo de Busca Antes de Falar em Palavras-chave',
            'SEO Conversacional e AEO (Answer Engine Optimization) para Perplexity, ChatGPT e Google AI Overviews',
            'Building in Public: Quando Transparência Radical Vira Canal de Aquisição — e Quando Não Funciona',
            'Newsletter as a Canal de Distribuição: Do Zero a 10k Leitores Sem Pagar por Isso',
            'Podcast como Canal de Autoridade: Como Começar Sem Estrutura de Rádio',
            'LinkedIn como Canal de Aquisição B2B: O Algoritmo, o Formato e o Que Engaja de Fato',
            'Twitter/X: Construindo Audiência Técnica — A Diferença entre Viralizar e Acumular',
            'YouTube e Vídeo Longo para SaaS: SEO em Vídeo e Conteúdo que Não Envelhece',
            'Vídeo Curto (Reels, Shorts, TikTok): Como Adaptar Conteúdo Técnico para Formato de 60 Segundos',
            'UGC (User Generated Content): Quando o Próprio Cliente Vira Criador e Distribuidor',
            'Presença em Marketplaces: AppSumo, Capterra, G2 e Product Hunt — O Guia Definitivo 2026'
          ]
        },
        {
          nome: 'Growth, Viral Loops, and Organic Scale',
          topicos: [
            'A Anatomia de um Funil de Aquisição para Founders Solo: AARRR sem Complexidade de Corporação',
            'Growth Loops vs Funil Linear: Por que Loops Escalam e Funis Têm Teto',
            'Product-Led Growth (PLG): Projetar o Produto Para Que Ele Seja o Próprio Canal de Aquisição',
            'Virality Loop e Coeficiente K: Como Calcular e Projetar Crescimento Orgânico por Indicação',
            'North Star Metric: Encontrar a Única Métrica que Resume o Valor Entregue pelo Produto',
            'Cold Email com Personalização por IA: O Que Ainda Funciona em 2026 e Por Quê',
            'Parcerias e Co-Marketing: Como Dois Founders Solo Multiplicam Audiência um do Outro',
            'Affiliate Marketing e Programas de Referência Automatizados: Exercendo Influência com Alinhamento de Incentivos',
            'Retargeting de Baixo Custo: Google e Meta com Orçamento Micro para Quem Não Tem Verba de Growth',
            'Press e PR Orgânica: Como Conseguir Mídia Sem Assessoria de Imprensa',
            'Construindo Comunidade (Discord, Circle, WhatsApp): Quando Comunidade é Canal — e Quando é Distração',
            'Marketing Analytics para Founders: Como Montar um Dashboard de Aquisição Sem se Perder em Métricas de Vaidade'
          ]
        }
      ]
    },
    {
      slug: 'founder-vendas-receita',
      nome: 'Sales, Revenue & Pricing',
      emoji: '💰',
      parent: 'founder-solo',
      whyStart: 'If it doesn\'t generate revenue, it\'s a hobby. Charging from day 1 is the most honest test of whether you are solving a real problem. The founder who doesn\'t know how to sell depends on luck — and luck has a very high churn rate.',
      descricao: 'From the first conversation to a repeatable pipeline: The Mom Test, sales methodology, strategic pricing, and building healthy recurring revenue for the solo founder.',
      contexto: `Focus: real revenue — how to charge, how much to charge, and how to sell being the sole salesperson (sometimes introverted).

Mandatory approach:
- Start with The Mom Test: the founder's most expensive mistake is confusing flattery with purchase intent.
- For each methodology (SPIN, BANT, MEDDIC): explain the problem it solves before applying the script.
- Be honest about rejection: it is not personal, it is data. Reframe the game mentally.
- Pricing is not just a number: it is positioning, value signaling, and filtering out the wrong customer.
- PLG and Sales-Led are not rivals — teach when each approach makes sense and how to combine them.`,
      fases: [
        {
          nome: 'The First Sale: Validating That Someone Actually Pays',
          topicos: [
            'The Mom Test (Rob Fitzpatrick): Como Fazer Perguntas que Não Mentem para Você — o Livro mais Subestimado de Startups',
            'A Diferença Entre Interesse, Intenção de Compra e Pagamento: Como Distinguir em Tempo Real',
            'Perfil de Cliente Ideal (ICP): Quem É, Quem Definitivamente Não É, e Por Que Recusar Cliente Errado Salva o Negócio',
            'Como Fazer a Primeira Venda Sendo Founder — Sem Equipe, Sem Script, Às Vezes Sem Produto Terminado',
            'Demos que Convertem: Estrutura de Demonstração de Produto, o Que Nunca Fazer e Como Terminar com CTA',
            'Copywriting para Landing Pages, Emails Frios e Propostas Comerciais: Engenharia de Resposta Antes de Palavra Bonita',
            'Funil de Conversão de SaaS: Da Visita ao MRR — Onde os Founders Perdem o Cliente (e Por Quê)',
            'Lidando com Rejeições: Reformulando como Dado Estratégico, Não como Fracasso Pessoal',
            'Discovery Call: As Perguntas Certas Antes de Apresentar Qualquer Coisa — Diagnóstico Antes de Remédio',
            'Proposta Comercial que Fecha: Estrutura, Linguagem e o Que Nunca Incluir no PDF'
          ]
        },
        {
          nome: 'Sales Methodology and Repeatable Pipeline',
          topicos: [
            'SPIN Selling (Neil Rackham): Situação, Problema, Implicação e Necessidade de Solução — a Lógica por Trás',
            'Qualificação de Leads: BANT (Budget, Authority, Need, Timeline) e MEDDIC para o Contexto Solo',
            'Contorno de Objeções: As 10 Mais Comuns em SaaS e Como Quebrar Cada Uma sem Soar Manipulador',
            'Negociação de Contratos: Como Não Dar Desconto sem Perder o Cliente — a Psicologia do Ancor e do Silêncio',
            'Proposta de Valor: Como Apresentar ROI sem Soar como Vendedor de Feirão ou Consultor de PowerPoint',
            'Pipeline de Vendas com CRM Solo: Notion, HubSpot Free ou Pipedrive — Qual Escolher e Como Não Deixar Esfriar',
            'Follow-up Estruturado: O Timing, a Frequência e o Tom que Mantém o Lead Quente sem Incomodar',
            'Vendas Enterprise como Solo Founder: Quando e Como Entrar no Upmarket sem Morrer no Processo',
            'Fechamento: Técnicas de Closing sem Pressão Abusiva — Hard Close, Trial Close e Next Step Close',
            'Análise Win/Loss: Por Que Você Perdeu (ou Ganhou) e o Que Esse Dado Diz sobre Posicionamento e ICP'
          ]
        },
        {
          nome: 'Strategic Pricing and Revenue Models',
          topicos: [
            'A Psicologia do Preço: Por que o Número que Você Escolhe Comunica Antes de Ser Calculado',
            'Value-Based Pricing: Cobrar pelo Valor Gerado pelo Cliente, Não pelo Custo de Produção',
            'Freemium vs Trial vs Pago Desde o Dia 1: a Lógica Econômica por Trás de Cada Modelo',
            'Usage-Based Pricing: Cobrar pelo Uso como AWS — Quando Funciona e Quando Destrói a Previsibilidade',
            'Annual Plans: Como Convencer o Cliente a Pagar o Ano Todo (e o Impacto no Fluxo de Caixa)',
            'Pricing Pages que Convertem: Hierarquia de Planos, Ancoragem de Valor e o Efeito Decoy na Prática',
            'Quando e Como Aumentar o Preço Sem Perder a Base de Clientes',
            'PLG vs Sales-Led: Quando Deixar o Produto Vender e Quando Você Precisa Ser o Vendedor',
            'Bundling e Unbundling: A Arte de Empacotar Features para Maximizar Receita Percebida'
          ]
        },
        {
          nome: 'Recurring Revenue, Retention, and Expansion',
          topicos: [
            'MRR, ARR e a Matemática Real do SaaS: O Que Cada Número Esconde e Revela',
            'Churn Rate: Por Que Crescer Sem Reter é Encher um Balde Furado — e Como Calcular o Teto do Negócio',
            'Net Revenue Retention (NRR) Acima de 100%: A Métrica que Prova que o Produto Funciona de Verdade',
            'Upselling e Cross-selling: Expansão de Receita Sem Custo de Aquisição',
            'Customer Success como Prevenção de Churn: A Diferença entre Suporte Reativo e CS Proativo',
            'Recuperação de Churn: Como Reativar Clientes que Cancelaram — Win-Back Campaigns e Timing',
            'Cohort Analysis de Receita: Lendo a Saúde Financeira Longitudinal, Não Só o MRR do Mês',
            'Expansão para Enterprise: Contratos Anuais, SLAs e o Que Muda no Processo de Vendas',
            'Vendas por Indicação (Referral): O Canal que Não Envelhece e Tem CAC Próximo de Zero',
            'Construindo um Modelo de Receita Previsível: Combinando PLG, Sales e Expansão em Sistema'
          ]
        }
      ]
    },
    {
      slug: 'founder-dev-arquitetura',
      nome: 'Development & Architecture',
      emoji: '⚙️',
      parent: 'founder-solo',
      whyStart: 'Iteration speed is your only competitive advantage against large corporations. Simple architecture beats complex architecture.',
      descricao: 'Technical decisions optimized for speed, low maintenance, and cheap scalability in 2026.',
      contexto: `Focus: Pragmatic engineering. Tools that reduce friction.
Mandatory approach:
- Monoliths vs Microservices: Choose pragmatism.
- BaaS (Supabase/Firebase) as a strength multiplier.
- Vibe Coding and AI as a development copilot.`,
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
      nome: 'Product Manager — From Zero to Advanced',
      emoji: '🎯',
      parent: 'founder-solo',
      whyStart: 'The PM is the CEO of the product. They don\'t code, they don\'t design, they don\'t sell — but they are responsible for everything. Those who master PM can turn any idea into a product that people pay to use.',
      descricao: 'Discovery, prioritization, metrics, UX/design, and product strategy — from idea to scaling product.',
      contexto: 'The student is a solo founder who needs to wear the PM hat. Focus on the bridge between user, business, and engineering. When citing frameworks, indicate where they came from (e.g., Teresa Torres, "Continuous Discovery Habits", 2021).',
      fases: [
        {
          nome: 'Phase 1 — Foundations: What Is Product and What Is the PM\'s Role',
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
          nome: 'Phase 2 — Intermediate: Prioritization, Metrics, and the Product Cycle',
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
          nome: 'Phase 3 — Advanced: UX, Design, and Product Strategy in 2026',
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
      nome: 'Sales & Monetization',
      emoji: '💰',
      parent: 'founder-solo',
      whyStart: 'If it doesn\'t generate revenue, it\'s a hobby. Charging from day 1 is essential to validate if you are solving a real problem.',
      descricao: 'Pricing strategies, conversion funnels, and sales closing for the solo founder.',
      contexto: `Focus: Real revenue. How to charge, how much to charge, and how to sell being introverted.
Mandatory approach:
- PLG (Product-Led Growth) vs Sales-Led.
- Pricing modeling for digital products in 2026.`,
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
        'Sales CRM Solo: Notion, Linear e Pipedrive para Times de 1',
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
      nome: 'Finance & Fundraising',
      emoji: '🏦',
      parent: 'founder-solo',
      whyStart: 'Lack of cash kills startups. Knowing when to bootstrap and when to raise money is a fundamental decision.',
      descricao: 'Cash management for founders, Bootstrapping vs VC, financial modeling, and strategic fundraising.',
      contexto: `Focus: Financial survival and smart capital allocation.
Mandatory approach:
- Unit Economics and Burn Rate.
- The VC myth vs the Bootstrapping reality in 2026.`,
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
      nome: 'Time Management & Productivity',
      emoji: '⏱️',
      parent: 'founder-solo',
      whyStart: 'You have the same 24 hours as large teams. Where you focus determines whether the business moves forward or spins in circles.',
      descricao: 'Extreme productivity frameworks, mental health, and focus for the solo founder in 2026.',
      contexto: `Focus: Self-management. The psychology of being solely responsible for success and failure.
Mandatory approach:
- How to avoid structural burnout.
- Merciless prioritization (Eisenhower Matrix, Timeboxing).
- AI as low-cost delegation.`,
      fases: [
        {
          nome: 'Phase 1: Biohacking and Energy Management',
          topicos: [
            'A Fisiologia da Produtividade: Gerir Tempo sem Gerir Energia é Inútil',
            'Acúmulo de Adenosina: O Mecanismo do Cansaço e a Dinâmica da Cafeína',
            'O Crash da Cafeína: Como Evitar o Colapso da Tarde Atrasando a Primeira Dose',
            'Ciclos Ultradianos: A Regra dos 90/20 para Foco Máximo Sem Burnout',
            'Dopamina Baseline: Como Hábitos de Alta Recompensa Destroem Sua Motivação',
            'Ritmo Circadiano e Cronotipos: Sincronizando Tarefas com o Seu Relógio Genético',
            'Sono, Nutrição e Cognição: A Infraestrutura Não-Negociável da Alta Performance'
          ]
        },
        {
          nome: 'Phase 2: Deep Work and Impassive Prioritization',
          topicos: [
            'Timeboxing e Trabalho Profundo (Deep Work) na Prática Diária',
            'A Arte da Priorização Impiedosa: O que Só Você Pode Fazer?',
            'Context Switching: O Inimigo Invisível que Drena sua Energia Cognitiva',
            'Tomada de Decisão Rápida com Dados Incompletos (A Lógica do "Good Enough")'
          ]
        },
        {
          nome: 'Phase 3: Mental Health and Solo Survival',
          topicos: [
            'Prevenção de Burnout Estrutural: Rotinas Não-Negociáveis e Limites Claros',
            'Lidando com o Isolamento e a Solidão Esmagadora do Solo Founder',
            'Dopamine Detox e Foco Sustentável em um Mundo de Notificações',
            'Métricas de Vaidade vs Métricas de Ação: Onde Não Desperdiçar Energia'
          ]
        },
        {
          nome: 'Phase 4: The Digital Brain (Personal Systems)',
          topicos: [
            'O Sistema de Notas do Founder: Obsidian, Notion e Construção do Second Brain',
            'Gestão de E-mail e Comunicação Assíncrona para Não Ser Escravo da Caixa de Entrada',
            'Journaling Estratégico para Founders: Esvaziando a Mente e Ganhando Direção'
          ]
        },
        {
          nome: 'Phase 5: Rituals, Goals, and Tracking',
          topicos: [
            'Semana Ideal do Founder: Como Estruturar Blocos de Tempo pela Energia (Não Pelo Relógio)',
            'OKRs Pessoais: Como Definir, Fatiar e Acompanhar as Metas Trimestrais',
            'Processo de Review Semanal e Mensal: Rituais de Calibração e Alta Performance'
          ]
        },
        {
          nome: 'Phase 6: Extreme Delegation and Leverage with AI',
          topicos: [
            'Delegação de Baixo Custo: Assistentes Virtuais, Freelancers e Contratos por Escopo',
            'Terceirização de Tarefas de Custo Cognitivo com Agentes e Ferramentas de IA'
          ]
        }
      ]
    },
    {
      slug: 'founder-juridico-lgpd',
      nome: 'Legal, Data Privacy & Contracts',
      emoji: '⚖️',
      parent: 'founder-solo',
      whyStart: 'A lawsuit can destroy everything you have built. The legal basics are your armor.',
      descricao: 'Simplified legal compliance, intellectual property protection, and terms of service in 2026.',
      contexto: `Focus: Legal risk mitigation without unnecessary complication.
Mandatory approach:
- LGPD/GDPR in practice for SaaS.
- Terms of Use and Privacy Policies that protect the founder.`,
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
      nome: 'Mindset & Founder Psychology',
      emoji: '🧠',
      parent: 'founder-solo',
      whyStart: 'The biggest obstacle for a solo founder is not the market, the code, or the money — it is the mind. Mastering psychology is the meta-skill of everything.',
      descricao: 'The psychology, beliefs, and mental patterns that separate founders who make it from those who give up.',
      contexto: `Focus: The internal dimension of entrepreneurship.
Mandatory approach:
- Imposter Syndrome and how to overcome it.
- Long-term thinking vs immediate gratification.
- Learning from failure without destroying self-esteem.`,
      ementa: [
        'Síndrome do Impostor: Por Que Todo Founder Sente e Como Gerenciar',
        'Mentalidade de Crescimento (Growth Mindset) na Prática Diária',
        'Tomando Decisões com Vieses Cognitivos: Como Reconhecer e Mitigar',
        'O Ciclo Emocional do Founder: Euforia, Vale da Morte e Recuperação',
        'Estoicismo Aplicado ao Empreendedorismo: Marcus Aurelius como Mentor',
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
      nome: 'Visual Design & UX',
      emoji: '◑',
      parent: 'founder-solo',
      layout: 'canvas',
      widget: 'DesignPreview',
      whyStart: 'The best algorithm in the world fails if the user interface (UX) is poor. Design is not aesthetics — it is the logic of how humans perceive and interact with systems.',
      descricao: 'Hierarchy, typography, gestalt, and user-centered design — from perceptual foundations to AI-native design.',
      contexto: 'Focus: structural design principles — hierarchy, gestalt, visual perception. Mandatory approach: explain the perceptual or cognitive principle behind each design decision. Only then: ask the student to critique a real design.',
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
        'Design Sprint: Prototando em 5 Dias (Google Ventures)',
        'Atomic Design: Átomos, Moléculas e Organismos',
        'Psicologia Cognitiva Aplicada a UX: Hick, Fitts e Miller',
        'Design de Dashboards e Visualização de Dados',
        'Design de Formulários: Reduzindo Abandono',
        'Sustentabilidade Digital: Design Eco-Consciente'
      ]
    },
    {
      slug: 'marketing-conceitual',
      nome: 'Marketing & Consumer Psychology',
      emoji: '📣',
      parent: 'founder-solo',
      whyStart: 'Before any tool or tactic, you need to understand the mechanism: why people buy. Those who skip this step learn to push buttons without knowing what they are doing — and when the campaign fails, they don\'t know why.',
      descricao: 'Foundations of marketing: consumer psychology, positioning, and the logic behind every purchase decision.',
      contexto: `Focus: the fundamental mental models of marketing. Teach the WHY before the HOW.

Mandatory approach:
- For each framework (4 Ps, JTBD, etc.): explain the problem it solves and where it fails before applying it.
- Consumer psychology is not manipulation — teach with ethics and real mechanisms.
- Branding is not aesthetics; it is perception management. Teach the difference.`,
      fases: [
        {
          nome: 'The Mechanism of the Purchase Decision',
          topicos: [
            'Marketing vs Publicidade vs Propaganda: Distinções que Importam para Founders',
            'Jobs To Be Done (JTBD): O Cliente Compra Progresso, Não Produto',
            'Psicologia do Consumidor: Os Gatilhos Neurais que Antecedem a Compra',
            'Sistema 1 e Sistema 2 de Kahneman: Como a Decisão Acontece Antes da Razão',
            'Percepção de Valor vs Preço: Por que o Barato Parece Suspeito',
            'O Paradoxo da Escolha: Menos Opções Vendem Mais (Barry Schwartz)',
            'Economia Comportamental Aplicada a Preços: Ancoragem, Decoy e Framing',
            'A Psicologia da Prova Social e da Autoridade (Cialdini)'
          ]
        },
        {
          nome: 'Positioning and Brand Building',
          topicos: [
            'Posicionamento de Mercado: Diferenciação e Ocupação de Categoria Mental',
            'Branding: Posicionamento, Identidade e Gestão de Percepção',
            'Estratégia de Oceano Azul: Criando Mercados Sem Competição (Kim & Mauborgne)',
            'Os 4 Ps do Marketing: O Framework Original, Suas Limitações e o que Vem Depois',
            'Storytelling Estrutural: Por que Histórias Vendem Mais que Argumentos Lógicos',
            'O Efeito Halo: Como a Primeira Impressão Contamina Todo o Resto',
            'Neuromarketing: A Neurociência Por Trás do Consumo (o que o dado diz de verdade)',
            'Gestão de Crise de Imagem para Founders: O Que Fazer Quando Tudo Dá Errado'
          ]
        },
        {
          nome: 'Distribution and Growth for Founders',
          topicos: [
            'A Anatomia de um Funil de Aquisição para Founders Solo',
            'Product-Led Growth (PLG): Deixando o Produto Ser o Principal Canal',
            'North Star Metric: A Única Métrica que Resume o Valor Entregue',
            'Canais Orgânicos: SEO, Conteúdo e Audiência como Ativos Acumuláveis',
            'Building in Public: Transparência como Estratégia de Distribuição',
            'Cold Email com Personalização por IA: O Que Funciona em 2026',
            'Comportamento do Consumidor na Era Digital: Atenção Fragmentada e Ciclos Curtos'
          ]
        }
      ]
    },
    {
      slug: 'founder-vendas',
      nome: 'Sales & Negotiation for Founders',
      emoji: '🤝',
      parent: 'founder-solo',
      whyStart: 'If it doesn\'t generate revenue, it\'s a hobby. Charging from day 1 is the most honest test of whether you are solving a real problem. A founder who doesn\'t know how to sell depends on luck to survive.',
      descricao: 'Repeatable sales process for solo founders: from the first customer to a scalable pipeline.',
      contexto: `Focus: selling being the sole salesperson — without a team, without a ready script, sometimes being introverted.

Mandatory approach:
- Always start with The Mom Test: the founder\'s most expensive mistake is thinking they are selling when they are only being flattered.
- For each methodology (SPIN, BANT): explain the problem it solves before applying it.
- Be honest about rejection: it is not personal, it is information. Reframe the game.`,
      fases: [
        {
          nome: 'The First Sale: Validating That Someone Pays',
          topicos: [
            'The Mom Test (Rob Fitzpatrick): Como Fazer Perguntas que Não Mentem para Você',
            'A Diferença Entre Interesse e Intenção de Compra: Como Distinguir em Tempo Real',
            'Perfil de Cliente Ideal (ICP): Quem É e Quem Definitivamente Não É',
            'Como Fazer a Primeira Venda Sendo Founder (Sem Equipe, Sem Script)',
            'Demonstrações de Produto que Convertem: Estrutura e o Que Nunca Fazer',
            'Copywriting de Conversão para Landing Pages e Emails de Founder',
            'Lidando com Rejeições: Reformulando como Dado, Não como Derrota'
          ]
        },
        {
          nome: 'Sales Process and Methodology',
          topicos: [
            'SPIN Selling: Situação, Problema, Implicação e Necessidade de Solução',
            'Qualificação de Leads: BANT e MEDDIC na Prática de Solo Founders',
            'O Processo de Discovery: Fazendo as Perguntas Certas Antes de Apresentar Qualquer Coisa',
            'Contorno de Objeções: As 8 Mais Comuns e Como Quebrar Cada Uma',
            'Negociação de Contratos: Como Não Dar Desconto e Fechar Igualmente',
            'Proposta de Valor: Como Apresentar o ROI Sem Soar como Vendedor de Feirão',
            'Pipeline de Vendas com CRM Solo: Notion, Linear ou Pipedrive para Times de 1'
          ]
        },
        {
          nome: 'Scale and Recurring Revenue',
          topicos: [
            'PLG vs Sales-Led: Quando Deixar o Produto Vender e Quando Você Precisa Vender',
            'Value-Based Pricing: Cobrar pelo Valor Gerado, Não pelo Custo',
            'Annual Plans: Como Convencer o Cliente a Pagar o Ano Todo',
            'Upselling e Cross-selling: Receita sem Esforço Adicional',
            'MRR, ARR e Churn: Entendendo a Saúde Real da Receita',
            'Net Revenue Retention Acima de 100%: A Métrica que Prova que o Produto Funciona',
            'Recuperação de Churn: Como Reativar Clientes que Cancelaram',
            'Análise Win/Loss: Por Que Você Perdeu e O Que Fazer Com Esse Dado'
          ]
        }
      ]
    },
    {
      slug: 'visao-estrategica-inovacao',
      nome: 'Strategic Vision & Innovation',
      emoji: '🔭',
      parent: 'founder-solo',
      whyStart: 'Operating a business well is necessary, but insufficient. The founders who change the game do not compete — they create categories. This subject is about seeing what does not yet exist and having the intellectual courage to build.',
      descricao: 'From Zero to One to Antifragility: the mental models of frontier innovators who build monopolies, create categories, and shape the future.',
      contexto: `Focus: non-linear strategy and first-principles thinking applied to frontier businesses.

Mandatory approach:
- Always start from the mechanism before the application: "why does competition reduce profits?" before citing Thiel.
- Connect each mental model to a real decision the student can make today.
- Be skeptical: teach the limitations of each framework (Zero to One does not work for every type of business).
- Always ask: "what do you know that very few people know?" — this is the heart of all real innovation.
- Never romanticize entrepreneurship: real innovation is rare, risky, and expensive. Teach how to calculate the risk.`,
      fases: [
        {
          nome: 'Why Innovation Is Different From Improvement',
          topicos: [
            'A Distinção Fundamental: Inovação Incremental vs Inovação de Categoria (Zero to One)',
            'Por que Competição é para Perdedores: O Argumento Central de Peter Thiel',
            'Pensamento de Primeiros Princípios: Como Elon Musk Desmonta Verdades Aceitas',
            'O Paradigma da Inovação Disruptiva: Clayton Christensen e a Teoria dos Jobs-to-be-Done',
            'Segredos e Verdades Contraintuitivas: O Que Você Sabe que Ninguém Mais Sabe?',
            'O Problema do Crescimento Incremental: Horizonte 1, 2 e 3 de McKinsey',
            'Viés de Confirmação na Estratégia: Por que Líderes de Mercado Ignoram Ameaças Óbvias',
            'A Diferença entre Ser Pioneiro e Ser Fundador de Categoria'
          ]
        },
        {
          nome: 'Building Unfair Advantages',
          topicos: [
            'Efeitos de Rede (Network Effects) e a Lei de Metcalfe: Valor Cresce Exponencialmente com Usuários',
            'Tipos de Moats: Vantagens Competitivas que o Dinheiro Não Compra Facilmente',
            'Custo Marginal Zero: Por que Software, Mídia e IA são Negócios Únicos na História',
            'Alavancagem de Código e Mídia: Escalando sem Custo Marginal de Replicação (Naval)',
            'O Volante de Crescimento da Amazon (Flywheel): A Lógica dos Sistemas que se Alimentam',
            'Inovação Permissionless: Como Tecnologias Descentralizadas Redistribuem o Poder',
            'A Engenharia do Timing: Por que "Muito Cedo" Mata Tanto quanto "Muito Tarde"',
            'Monopólios de Fato: Como Google, Meta e Stripe Constroem Posições Inalcançáveis',
            'Riqueza vs Status: O Jogo de Soma Positiva vs Soma Zero (Naval Ravikant)',
            'O Paradoxo do Sucesso: Como o Que Te Trouxe Aqui Pode Te Impedir de Avançar'
          ]
        },
        {
          nome: 'Frontier Thinking and the AI Era',
          topicos: [
            'Pensamento Assintótico: Enxergando o Limite Teórico e Trabalhando de Trás Pra Frente',
            'Second-Order Thinking: Consequências das Consequências das Suas Decisões',
            'Antifragilidade Empresarial: Construindo Organizações que Ganham com o Caos (Taleb)',
            'IA como Alavanca de Escala Infinita: O Novo Paradigma de Fundadores com Poucos Recursos',
            'Defensibilidade no Mundo AI-First: O Que Não é Copiável Quando IA Comoditiza Tudo',
            'Categoria Design: A Arte de Criar um Mercado em vez de Competir em Um',
            'A Lógica do Monopólio Tecnológico: Quando Dominar um Nicho é a Estratégia Correta',
            'Geopolítica e Teses Macro: Como Mudanças Estruturais Globais Criam Janelas de Oportunidade',
            'Construindo a Empresa de 1 Pessoa com Impacto de 100: O Founder Aumentado por IA',
            'Síntese: Mapeando Sua Tese de Inovação — O Que Você Está Apostando e Por Quê'
          ]
        }
      ]
    },
    {
      slug: 'recrutamento-talentos',
      nome: 'Recruitment & Talent Management',
      emoji: '🎯',
      isCategory: false,
      parent: 'founder-solo',
      whyStart: 'A company is only as good as the people it can attract and retain. Hiring poorly is the most expensive mistake there is.',
      descricao: 'How to identify, attract, and retain exceptional people.',
      contexto: `Focus: recruitment as a competitive advantage — without corporate HR talk.

Mandatory approach:
- Base it on the practices of high-performance companies (Netflix, Stripe, SpaceX).
- No generic people management theory. Focus on difficult decisions and real trade-offs.`,
      ementa: [
        'O Custo Real de Uma Contratação Errada (Impacto Exponencial)',
        'A-Players vs B-Players: A Diferença Não É Linear, É Exponencial',
        'O Princípio de Steve Jobs: A-Players Contratam A-Players, B-Players Contratam C-Players',
        'Entrevistas Estruturadas vs Entrevistas de "Feeling" (O Que a Ciência Diz)',
        'Work Samples e Case Studies: Testar Performance Real, Não Retórica',
        'Reference Checks Que Funcionam: As Perguntas Que Ninguém Faz',
        'Hire Slow, Fire Fast: O Custo de Hesitar nas Duas Pontas',
        'O Conceito de "Bar Raiser" (Amazon): Nunca Baixar o Padrão',
        'Culture Fit vs Culture Add: O Perigo da Homogeneidade',
        'Retenção de Talentos: Autonomia, Maestria, Propósito (Daniel Pink)',
        'Compensation Philosophy: Pagar Acima do Mercado vs Equity',
        'A Conversa de Demissão: Como Fazer Com Respeito e Dignidade',
        'Gestão de Performance Contínua vs Avaliação Anual Inútil',
        'O Pipeline de Talentos: Recrutar Antes de Precisar'
      ]
    },
    {
      slug: 'lideranca-execucao',
      nome: 'Leadership & Execution',
      emoji: '⚡',
      isCategory: false,
      parent: 'founder-solo',
      whyStart: 'Vision without execution is hallucination. Leading is about getting the team to deliver consistent results, not giving inspiring speeches.',
      descricao: 'How to lead in practice: delegation, difficult decisions, and accountability.',
      contexto: `Focus: operational leadership — the daily life of those managing people who need to deliver results.

Mandatory approach:
- Each concept must have a real application scenario ("you have a dev who delivers late, what do you do?").
- No empty motivational theory. Focus on decisions, trade-offs, and consequences.`,
      ementa: [
        'Delegação Efetiva: O Que Delegar, Como Delegar, Quando Não Delegar',
        'O Problema do Microgerenciamento: Sinais de Que Você Está Fazendo',
        'Accountability vs Blame: Responsabilização Sem Cultura de Medo',
        'One-on-Ones Que Funcionam: Estrutura e Frequência Ideal',
        'Feedback Radical (Kim Scott): Caring Personally + Challenging Directly',
        'A Matriz de Skill vs Will: 4 Tipos de Liderados, 4 Abordagens',
        'Liderança Situacional (Hersey-Blanchard): Adaptar o Estilo ao Contexto',
        'Tomada de Decisão em Grupo: Consenso vs Comando vs Consultivo',
        'O Conceito de "Disagree and Commit" (Bezos): Discordar e Executar',
        'Gestão de Conflitos: Confrontar a Tensão Antes Que Ela Exploda',
        'OKRs na Prática: O Que Dá Certo e O Que Dá Errado (Lições Reais)',
        'Comunicação Para Cima (Managing Up): Como Gerenciar Seu Chefe',
        'Rituais de Time: Stand-ups, Retrospectivas e Town Halls Que Não São Perda de Tempo',
        'Liderança Remota: Confiança, Assincronicidade e Cultura Distribuída',
        'Burnout do Líder: Reconhecer e Prevenir Antes de Quebrar'
      ]
    },
    {
      slug: 'cultura-organizacional',
      nome: 'Culture & Organizational Architecture',
      emoji: '🏗️',
      isCategory: false,
      parent: 'founder-solo',
      whyStart: 'Culture is not what is on the wall. It is what happens when the CEO is not looking. You design it or it appears on its own — and usually bad.',
      descricao: 'How to design a high-performance organizational culture with intent.',
      contexto: `Focus: culture as the operating system of the company, not as decoration.

Mandatory approach:
- Real use cases (Netflix Culture Deck, Valve Handbook, Spotify Model).
- Show the trade-offs of each cultural model. There is no perfect culture.`,
      ementa: [
        'O Que É Cultura Realmente: Valores Declarados vs Valores Praticados',
        'O Netflix Culture Deck: Liberdade e Responsabilidade (Com Trade-offs)',
        'Cultura de Alta Performance vs Cultura Tóxica de Alta Performance',
        'Princípios de Liderança da Amazon: Os 16 Mandamentos (E o Que Funciona)',
        'Segurança Psicológica (Amy Edmondson): O Fator #1 de Times de Alta Performance',
        'O Paradoxo da Transparência: Radical Transparency (Bridgewater) e Seus Limites',
        'Organizações Planas vs Hierárquicas: Quando Cada Uma Funciona',
        'Velocidade de Decisão vs Qualidade de Decisão: O Trade-off Central',
        'Onboarding Como Ritual de Iniciação: Os Primeiros 90 Dias',
        'Documentação vs Tradição Oral: Como Escalar Conhecimento Tácito',
        'Sinais de Decadência Cultural: Burocracia, Política e Teatro de Performance',
        'A Lei de Conway: Sua Arquitetura de Software Espelha Sua Organização',
        'Scaling Culture: O Que Muda Quando Você Vai de 10 para 100 Pessoas',
        'Ritos de Passagem Corporativos: Promoção, Demissão e Celebração',
        'Antipadrões Culturais: O Que Nunca Fazer (Com Exemplos Reais)'
      ]
    }
  ]
};
