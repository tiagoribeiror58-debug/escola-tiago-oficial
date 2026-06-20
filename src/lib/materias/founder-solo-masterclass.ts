import { MateriaConfig } from '@/types';

export const founderSoloMasterclass: MateriaConfig = {
  slug: 'founder-solo-masterclass',
  nome: 'Founder Solo: O Jogo Infinito',
  emoji: '🦅',
  isCategory: false,
  descricao: 'The complete learning sequence for the solo founder — mixing engineering, sales, psychology, finance, AI, marketing, and law into a single progressive curriculum with no artificial silos.',
  contexto: `You are teaching Tiago, a solo founder at Ybernator. He is simultaneously the developer, marketer, salesperson, support agent, and CFO.

CORE TEACHING MANDATE:
- The student must understand the MECHANISM behind every concept, not just the tactic.
- Always cross-reference disciplines: when teaching pricing, connect it to psychology AND engineering AND cash flow.
- For every concept: explain WHY it matters for a solo founder with zero team and limited runway.
- Treat the student as a capable adult who can handle hard truths about risk, failure, and trade-offs.
- If a topic has a famous source (book, person, study), cite it explicitly. If not, say so.

ANTI-PATTERNS TO AVOID:
- Never reduce complexity to motivational slogans.
- Never give a checklist without explaining the mechanism behind each item.
- Never assume the student has a team, a budget, or a safety net.`,
  ementa: [
    // FOUNDATIONS OF LEVERAGE
    'O Jogo do Founder Solo: Por que 1 Pessoa com Alavancagem Bate Times de 10 sem Ela',
    'Burn Rate & Runway: A Matemática Fria do Tempo de Vida da Sua Empresa',
    'O Paradoxo do MVP: Produto Mínimo vs Produto Viável (e Por que a Maioria Erra os Dois)',
    'The Mom Test (Rob Fitzpatrick): Como Extrair a Verdade dos Usuários Sem Viés',
    'Escolha da Stack Tecnológica: Velocidade de Iteração > Escalabilidade Prematura',
    'Mindset do Operador Centauro: Humano + Máquina em Sinergia Máxima',

    // SALES & REVENUE
    'A Primeira Venda: Como Fazer Alguém Pagar Antes do Produto Estar Pronto',
    'ICP (Ideal Customer Profile): Focando num Nicho Minúsculo Para Dominar Antes de Escalar',
    'Copywriting de Landing Page: Foco Implacável na Dor, Não na Feature',
    'Discovery Call: As Perguntas Certas Antes de Apresentar Qualquer Coisa',

    // ENGINEERING PRAGMATICS
    'Arquitetura Monolítica: Por Que Microserviços Matam Solo Founders',
    'Supabase do Zero: Auth, RLS, Edge Functions e Storage em Uma Plataforma',
    'CI/CD Simplificado: Deploy Automático para Focar em Produto, Não em Infra',
    'Dívida Técnica: Quando É Estratégico Adquiri-la e Quando É Mortal',
    'Programação Defensiva: Tratamento de Erros que Salvam Madrugadas de Suporte',

    // PSYCHOLOGY & DECISION
    'Síndrome do Impostor: Por Que Todo Founder Sente e Como Operar Mesmo Assim',
    'Dopamina Baseline: O Erro de Aumentar a Recompensa Antes de Tarefas de Alto Esforço',
    'Tomada de Decisão Sob Incerteza: Raciocínio Probabilístico vs Análise Paralisante',
    'O Ciclo Emocional do Founder: Euforia, Vale da Morte e Recuperação',
    'Custo de Oportunidade: O Algoritmo Para Avaliar Qual Bug Corrigir Primeiro',

    // MARKETING & DISTRIBUTION
    'Product-Led Growth (PLG): Projetar o Produto Para Que Ele Seja o Próprio Canal de Aquisição',
    'SEO On-Page: Fundamentos Pragmáticos Para Tráfego Orgânico no Dia Zero',
    'Cold Email com Personalização por IA: O Que Funciona em 2026 e Por Quê',
    'North Star Metric: Encontrar a Única Métrica que Resume o Valor Entregue',
    'Building in Public: Quando Transparência Radical Vira Canal de Aquisição — e Quando Não',

    // PRICING & FINANCE
    'Precificação Baseada em Valor vs Baseada em Custo: A Diferença que Define o Teto do Negócio',
    'Freemium vs Free Trial vs Reverse Trial: A Lógica Econômica por Trás de Cada Modelo',
    'MRR, ARR e Churn: A Matemática Real do SaaS que Todo Founder Precisa Dominar',
    'Unit Economics: CAC, LTV e Payback Period no Dia Zero',
    'Modelagem Financeira Básica: P&L e Fluxo de Caixa para Quem Não É CFO',

    // AI AS LEVERAGE
    'O Stack de IA do Founder Solo em 2026: Um Mapa Completo de Ferramentas',
    'Prompt Engineering Avançado: Anatomia de um Prompt de Alta Precisão',
    'Automações No-Code com IA (Make, n8n + LLMs): Multiplicando Capacidade Sem Contratar',
    'RAG (Retrieval-Augmented Generation): Bases de Conhecimento Privadas Sobre Seu Produto',
    'Vibe Coding: Usando Cursor e Claude Code Para Ser 10x Mais Rápido no Código',

    // PRODUCT MANAGEMENT
    'Product Discovery vs Product Delivery: Onde a Maioria das Empresas Erra',
    'Jobs-to-be-Done (JTBD): O Usuário Não Compra o Produto — Ele Contrata uma Solução',
    'Frameworks de Priorização: RICE, Kano e MoSCoW — Quando Usar Cada Um',
    'Feature Creep: A Arte de Dizer Não Para Novas Funcionalidades',
    'North Star vs Métricas de Vaidade: Como Saber se Você Está Indo Para Frente ou Rodando',

    // USER RETENTION
    'Onboarding: Engenharia do Momento "Aha!" — Reduzindo Fricção na Ativação',
    'Churn Involuntário vs Voluntário: Diagnóstico Técnico e de Negócios',
    'Suporte ao Cliente como Ferramenta Primária de Vendas e Produto',
    'A Ciência do Hábito (Hook Model, Nir Eyal): Programando Loops de Engajamento',
    'Net Revenue Retention (NRR) Acima de 100%: A Métrica que Prova que o Produto Funciona',

    // DEEP WORK & PRODUCTIVITY
    'Ciclos Ultradianos: A Biologia Dita que o Foco Funciona em Blocos de 90 Minutos',
    'Deep Work (Cal Newport) vs Trabalho Superficial: Protegendo o Ativo Mais Escasso',
    'Context Switching Residual (Attention Residue): O Custo Real de Checar o WhatsApp "Só 1 Min"',
    'Timeboxing Diário: Calendário como a Única Lista de Tarefas que Funciona',
    'Fadiga de Decisão (Decision Fatigue): Como Simplificar o Input Cognitivo Diário',

    // LEGAL & COMPLIANCE
    'O Básico da LGPD para Founders: O Que Você Precisa Fazer Antes de Lançar',
    'Termos de Uso e Política de Privacidade Impermeáveis: O Mínimo Viável Jurídico',
    'Stripe, Chargebacks e Reembolsos: Prevenção e Gestão de Disputas no Código',
    'Registro de Marca e Propriedade Intelectual: Como e Quando Fazer',
    'CNPJ, Simples Nacional e Separação de Finanças Pessoais e Empresariais',

    // GROWTH ENGINEERING
    'Growth Loops vs Funil Linear: Por Que Loops Escalam e Funis Têm Teto',
    'Virality Loop e Coeficiente K: Como Calcular e Projetar Crescimento Orgânico',
    'SEO Programático (Programmatic SEO): Geração em Massa de Conteúdo Indexável',
    'Retargeting de Baixo Custo: Google e Meta com Orçamento Micro',
    'Analytics Essencial: Configurando Rastreamento do Core Action (PostHog/Mixpanel)',

    // ADVANCED ENGINEERING
    'APIs RESTful vs GraphQL vs tRPC: Escolhendo a Via de Menor Atrito Para o Solo Founder',
    'Webhooks e Sistemas Assíncronos: A Cola Invisível Entre Stripe e Seu App',
    'Background Jobs e Filas (Message Queues): Como Não Travar a Interface do Usuário',
    'Estratégias de Cache no Backend (Redis): Evitando Faturas Surpresa de Infra',
    'Segurança Defensiva Básica: XSS, CSRF e SQL Injection — O Checklist Mínimo',

    // POSITIONING & BRAND
    'Posicionamento Estratégico: Ocupar uma Categoria Mental Antes de Competir em Preço',
    'Personal Branding: O Founder como Canal Principal de Aquisição',
    'Storytelling Estrutural (Donald Miller StoryBrand): Como Aplicar ao SaaS',
    'A Psicologia da Prova Social e da Autoridade (Cialdini): O Mecanismo Neural por Trás',
    'Category Design: Inventar uma Categoria vs Competir em Uma Existente',

    // SALES METHODOLOGY
    'SPIN Selling (Neil Rackham): Situação, Problema, Implicação e Necessidade de Solução',
    'Gestão de Objeções: As 10 Desculpas Mais Comuns em SaaS e Como Quebrar Cada Uma',
    'Negociação de Contratos: Como Não Dar Desconto Sem Perder o Cliente',
    'Follow-up Estruturado: O Timing e o Tom que Mantém o Lead Quente Sem Incomodar',
    'Annual Plans: Como Convencer o Cliente a Pagar o Ano Todo e o Impacto no Caixa',

    // ADVANCED AI
    'Chain-of-Thought: Fazendo a IA Pensar Passo a Passo em Voz Alta',
    'MCP (Model Context Protocol): O Padrão Universal de Conectividade da Anthropic',
    'Workflows Compostos: Encadeando Múltiplas Chamadas de IA no Backend',
    'Fine-tuning vs Prompting: Quando Vale a Pena Cada Abordagem',
    'Agentes Autônomos (Claude Code, Devin): O Que É Real e o Que É Hype em 2026',

    // COGNITIVE SCIENCE APPLIED
    'Sistema 1 e Sistema 2 de Kahneman: Como a Decisão Acontece Antes da Razão',
    'Ancoragem, Decoy e Framing: Como a Apresentação do Preço Altera a Percepção de Valor',
    'O Princípio de Pareto 80/20 Levado ao Extremo 64/4: Onde Está o Verdadeiro Impacto',
    'Estoicismo Aplicado ao Empreendedorismo: Marcus Aurelius como Mentor do Founder',
    'Perseverança vs Teimosia: Como Saber a Diferença Entre Pivotar e Desistir',

    // DESIGN & UX
    'Design System Minimalista: Tailwind e Componentes Prontos Para Não Perder Tempo',
    'Heurísticas de Nielsen: Os 10 Princípios que Todo PM Precisa Saber Avaliar',
    'UX de Alta Conversão: Reduzindo Fricção no Caminho do Usuário ao Pagamento',
    'Dark Patterns: O Que Nunca Fazer e Como Identificar na Concorrência',
    'Wireframing Rápido com Figma e v0.dev: Prototipar Antes de Codar',

    // ADVANCED FINANCE
    'Bootstrapping vs VC: Os Trade-offs Honestos de Cada Caminho em 2026',
    'SAFE e Notas Conversíveis: Instrumentos Modernos de Captação Sem Diluição Imediata',
    'Revenue-Based Financing: Captação por Receita Futura Sem Dar Equity',
    'Cohort Analysis de Receita: Lendo a Saúde Financeira Longitudinal Além do MRR Mensal',
    'Expansão Para Enterprise: Contratos Anuais, SLAs e o Que Muda no Processo de Vendas',

    // CONTENT & COMMUNITY
    'Newsletter como Canal de Distribuição: Da Zero a 10k Leitores Sem Pagar Por Isso',
    'LinkedIn como Canal de Aquisição B2B: O Algoritmo e o Que Realmente Engaja',
    'Criação de Comunidades Digitais (Discord, Circle): Quando Comunidade é Moat — e Quando é Distração',
    'UGC (User Generated Content): Quando o Próprio Cliente Vira Distribuidor',
    'Press e PR Orgânica: Como Conseguir Mídia Sem Assessoria de Imprensa',

    // OPERATIONAL EXCELLENCE
    'Delegação Efetiva via Freelancers: Como Empacotar Tarefas Para Upwork e Fiverr',
    'Comunicação Assíncrona Total: Abolindo Reuniões Desnecessárias e Inbox Zero',
    'Automação de Backoffice No-Code (Zapier/Make) Conectada ao Seu Banco de Dados',
    'Observabilidade Barata: Logs, Alertas e Tracing Para Depuração Eficiente',
    'Gestão de Crise Técnica: Downtime, Vazamento de Dados e Comunicação de Falhas',

    // ADVANCED PRODUCT
    'Opportunity Solution Tree (Teresa Torres, 2021): Mapeando Oportunidades Sem Viés',
    'Testes A/B e Experimentação Contínua: Hipóteses, Amostras e Significância',
    'Continuous Discovery: Rotina de Pesquisa Semanal com Usuários Reais',
    'API as a Product: Quando Desenvolvedores São Seus Clientes Principais',
    'Internacionalização (i18n): Preparando a Arquitetura Para o Mercado Global',

    // ADVANCED GROWTH
    'SEO Conversacional e AEO (Answer Engine Optimization) Para Perplexity e Google AI',
    'Parcerias Estratégicas B2B: Alavancando a Audiência de Terceiros',
    'Affiliate Marketing e Programas de Referência Automatizados',
    'Análise de Atribuição de Marketing: Como Saber de Onde Veio a Venda',
    'Marketing de Guerrilha: Táticas B2B de Custo Zero e Alta Conversão',

    // ADVANCED ENGINEERING II
    'Multi-tenancy: Arquitetura Para SaaS que Atende Múltiplos Clientes',
    'Feature Flags: Lançamentos Seguros e Rollbacks Imediatos Sem Downtime',
    'Testes E2E (Playwright/Cypress) vs Unitários: Onde Aplicar o Esforço de QA',
    'Zero-Downtime Deployments: Migrations de Banco de Dados Sem Parar o Serviço',
    'Performance Web: Core Web Vitals e o Impacto Mensurável nas Conversões',

    // ADVANCED PSYCHOLOGY
    'Identidade e o Perigo de Ser o Seu Negócio (Identity Enmeshment)',
    'Comparação e FOMO: Como Não Se Destruir Vendo o Sucesso Alheio',
    'O Ciclo da Adenosina: O Mecanismo Bioquímico do Cansaço e da Pressão de Sono',
    'Jejum Intermitente e Cetose Leve Como Ferramentas de Clareza Mental',
    'Construindo um Second Brain (Tiago Forte): Método PARA Para Organizar o Caos',

    // ADVANCED SALES & REVENUE
    'Pricing Dinâmico (Dynamic Pricing) Baseado em Limite de Recursos e Consumo',
    'Win/Loss Analysis: Por Que Você Perdeu (ou Ganhou) e o Que Esse Dado Diz',
    'Customer Success vs Customer Support: Passividade vs Proatividade Sistemática',
    'Upselling e Cross-selling: Expansão de Receita Sem Custo de Aquisição',
    'Gamificação: Mecânicas de Jogos Aplicadas a Interfaces Utilitárias Para Reter Usuários',

    // ORGANIZATION & LEADERSHIP
    'Lei de Conway: Sua Arquitetura de Software Espelha Sua Estrutura Organizacional',
    'OKRs na Prática: O Que Dá Certo e o Que Dá Errado (Com Lições Reais)',
    'Segurança Psicológica (Amy Edmondson): O Fator #1 de Times de Alta Performance',
    'Documentação Técnica vs Tradição Oral: Como Escalar Conhecimento Tácito',
    'O Conceito de "Disagree and Commit" (Bezos): Como Tomar Decisões Sem Consenso',

    // MASTER SYNTHESIS
    'Análise de Sentimento: Escutando o Usuário Onde Ele Não Acha que Você Está Olhando',
    'Modelagem de Dados: Normalização vs Desnormalização Para Leitura Rápida',
    'Sustainable Growth: Como Estruturar a Empresa Para Jogar o Jogo Infinito a Longo Prazo',
    'O Founder Aumentado: Quando Delegar Para IA vs Para Humanos vs Para Ninguém',
    'A Filosofia do Negócio: Por Que Você Está Construindo Isso e Para Onde Realmente Quer Ir',
  ]
};
