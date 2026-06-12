import { MateriaConfig } from '@/types';

export const founderSolo: MateriaConfig = {
  slug: 'founder-solo',
  nome: 'Hub do Founder Solo',
  emoji: '🦅',
  isCategory: true,
  descricao: 'Desenvolvimento integral para fundadores solo: de engenharia a vendas, IA nativa e alavancagem máxima em 2026.',
  children: [
    {
      slug: 'ia-operacional',
      nome: 'IA Operacional & Eficiência',
      emoji: '👷',
      parent: 'founder-solo',
      whyStart: 'Antes de entender os pesos matemáticos de um modelo, aprenda a usá-lo como ferramenta. E para um founder solo, IA não é luxo, é a equipe inteira.',
      descricao: 'Uso diário para ganho massivo de eficiência pessoal. Fluxos de trabalho, GPT, Claude, MCP e automações.',
      contexto: `Foco: táticas brutais de eficiência pessoal e fluxos de trabalho do dia a dia.
O aluno é um "Pedreiro de Prompt" evoluindo para um maestro de agentes, querendo resolver tarefas rapidamente, de forma pragmática.`,
      fases: [
        {
          nome: 'Fundamentos do Operador Centauro',
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
          nome: 'Estratégias Cognitivas e Prompting Avançado',
          topicos: [
            'Few-Shot Prompting: Guiando o Modelo com Exemplos Cirúrgicos',
            'Chain-of-Thought: Fazendo a IA Pensar Passo a Passo em Voz Alta',
            'Tree-of-Thought: Explorando Múltiplas Ramificações de Raciocínio Simultaneamente',
            'Meta-Prompting: Usando uma IA para Gerar o Prompt Perfeito para Outra',
            'Prompt Caching: Otimizando Latência e Custo em Contextos Longos',
            'Raciocínio Estendido (Modelos o1, R1): Quando e Como Usar Pensamento Lento'
          ]
        },
        {
          nome: 'Produtividade, Conteúdo e Operações Diárias',
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
          nome: 'Ecossistema, APIs e Customização',
          topicos: [
            'Construindo GPTs Customizados para Funções Específicas da Sua Empresa',
            'A Primeira Integração com a API da OpenAI ou Anthropic',
            'Automações No-Code com IA (Make, Zapier, n8n + LLMs)',
            'Workflows Compostos: Encadeando Múltiplas Chamadas de IA no Backend',
            'Artifacts (Claude) e Canvas (ChatGPT): IAs que Geram Interfaces e Docs ao Vivo'
          ]
        },
        {
          nome: 'Conectividade Avançada: O Poder do MCP',
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
          nome: 'Vibe Coding, Agentes Autônomos e Terminal',
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
      slug: 'founder-marketing-distribuicao',
      nome: 'Marketing, Posicionamento & Distribuição',
      emoji: '📣',
      parent: 'founder-solo',
      whyStart: 'O maior erro de founders técnicos: construir um produto incrível que ninguém sabe que existe. Distribuição não é o que você faz depois de construir — é o que você planeja antes. Sem um canal de aquisição que funciona sem você, o negócio é um emprego disfarçado.',
      descricao: 'Da psicologia do consumidor ao motor de crescimento: posicionamento, branding, canais orgânicos, growth loops e distribuição escalável para founders solo em 2026.',
      contexto: `Foco: construção de demanda e audiência como ativos permanentes, não campanhas pontuais.

Abordagem obrigatória:
- Sempre parta do mecanismo: "por que as pessoas compram?" antes de falar de ferramenta ou canal.
- JTBD, Kahneman, Cialdini: explique o princípio psicológico antes da aplicação.
- Diferencie estratégia de conteúdo (o mapa) de produção de conteúdo (a execução).
- Para cada canal: explique o custo, o teto de crescimento e quando parar.
- Growth Hacking: desmistifique. É experimentação barata e rápida — ensine o método, não o mito.
- Questione romantismos: "Building in Public funciona para todo tipo de produto? Por quê não?"`,
      fases: [
        {
          nome: 'Por Que as Pessoas Compram: Psicologia e Mecanismo de Decisão',
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
            'Comportamento do Consumidor na Era Digital: Atenção Fragmentada, Ciclos de Decisão Curtos e o Doom Scroll',
          ]
        },
        {
          nome: 'Posicionamento, Branding e Construção de Categoria',
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
            'Arquitetura de Marca Solo: Quando Separar Marca Pessoal e Marca de Produto',
          ]
        },
        {
          nome: 'Canais Orgânicos e Distribuição Assíncrona',
          topicos: [
            'Content Marketing Estratégico: A Diferença entre Ter uma Estratégia de Conteúdo e Produzir Conteúdo',
            'SEO Técnico e de Conteúdo para SaaS: Como Funciona um Mecanismo de Busca Antes de Falar em Palavras-chave',
            'SEO Conversacional e AEO (Answer Engine Optimization) para Perplexity, ChatGPT e Google AI Overviews',
            'Building in Public: Quando Transparência Radical Vira Canal de Aquisição — e Quando Não Funciona',
            'Newsletter como Ativo de Distribuição: Do Zero a 10k Leitores Sem Pagar por Isso',
            'Podcast como Canal de Autoridade: Como Começar Sem Estrutura de Rádio',
            'LinkedIn como Canal de Aquisição B2B: O Algoritmo, o Formato e o Que Engaja de Fato',
            'Twitter/X: Construindo Audiência Técnica — A Diferença entre Viralizar e Acumular',
            'YouTube e Vídeo Longo para SaaS: SEO em Vídeo e Conteúdo que Não Envelhece',
            'Vídeo Curto (Reels, Shorts, TikTok): Como Adaptar Conteúdo Técnico para Formato de 60 Segundos',
            'UGC (User Generated Content): Quando o Próprio Cliente Vira Criador e Distribuidor',
            'Presença em Marketplaces: AppSumo, Capterra, G2 e Product Hunt — O Guia Definitivo 2026',
          ]
        },
        {
          nome: 'Growth, Loops Virais e Escala Orgânica',
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
            'Marketing Analytics para Founders: Como Montar um Dashboard de Aquisição Sem se Perder em Métricas de Vaidade',
          ]
        }
      ]
    },
    {
      slug: 'founder-vendas-receita',
      nome: 'Vendas, Receita & Precificação',
      emoji: '💰',
      parent: 'founder-solo',
      whyStart: 'Se não gera receita, é um hobby. Cobrar desde o dia 1 é o teste mais honesto de se você resolve um problema real. O founder que não sabe vender depende do acaso — e o acaso tem uma taxa de churn muito alta.',
      descricao: 'Da primeira conversa ao pipeline escalável: The Mom Test, metodologia de vendas, precificação estratégica e construção de receita recorrente saudável para o founder solo.',
      contexto: `Foco: receita real — como cobrar, quanto cobrar e como vender sendo o único vendedor (às vezes introvertido).

Abordagem obrigatória:
- Comece pelo The Mom Test: o erro mais caro do founder é confundir elogio com intenção de compra.
- Para cada metodologia (SPIN, BANT, MEDDIC): explique o problema que ela resolve antes de aplicar o script.
- Seja honesto sobre rejeição: não é pessoal, é dado. Reformule o jogo mentalmente.
- Pricing não é só número: é posicionamento, sinalização de valor e filtragem de cliente errado.
- PLG e Sales-Led não são rivais — ensine quando cada abordagem faz sentido e como combinar.`,
      fases: [
        {
          nome: 'A Primeira Venda: Validando que Alguém Paga de Verdade',
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
            'Proposta Comercial que Fecha: Estrutura, Linguagem e o Que Nunca Incluir no PDF',
          ]
        },
        {
          nome: 'Metodologia de Vendas e Pipeline Repetível',
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
            'Análise Win/Loss: Por Que Você Perdeu (ou Ganhou) e o Que Esse Dado Diz sobre Posicionamento e ICP',
          ]
        },
        {
          nome: 'Precificação Estratégica e Modelos de Receita',
          topicos: [
            'A Psicologia do Preço: Por que o Número que Você Escolhe Comunica Antes de Ser Calculado',
            'Value-Based Pricing: Cobrar pelo Valor Gerado pelo Cliente, Não pelo Custo de Produção',
            'Freemium vs Trial vs Pago Desde o Dia 1: a Lógica Econômica por Trás de Cada Modelo',
            'Usage-Based Pricing: Cobrar pelo Uso como AWS — Quando Funciona e Quando Destrói a Previsibilidade',
            'Annual Plans: Como Convencer o Cliente a Pagar o Ano Todo (e o Impacto no Fluxo de Caixa)',
            'Pricing Pages que Convertem: Hierarquia de Planos, Ancoragem de Valor e o Efeito Decoy na Prática',
            'Quando e Como Aumentar o Preço Sem Perder a Base de Clientes',
            'PLG vs Sales-Led: Quando Deixar o Produto Vender e Quando Você Precisa Ser o Vendedor',
            'Bundling e Unbundling: A Arte de Empacotar Features para Maximizar Receita Percebida',
          ]
        },
        {
          nome: 'Receita Recorrente, Retenção e Expansão',
          topicos: [
            'MRR, ARR e a Matemática Real do SaaS: O Que Cada Número Esconde e Revela',
            'Churn Rate: Por Que Crescer Sem Reter é Encher um Balde Furado — e Como Calcular o Teto do Negócio',
            'Net Revenue Retention (NRR) Acima de 100%: A Única Métrica que Prova que o Produto Funciona de Verdade',
            'Upselling e Cross-selling: Expansão de Receita Sem Custo de Aquisição',
            'Customer Success como Prevenção de Churn: A Diferença entre Suporte Reativo e CS Proativo',
            'Recuperação de Churn: Como Reativar Clientes que Cancelaram — Win-Back Campaigns e Timing',
            'Cohort Analysis de Receita: Lendo a Saúde Financeira Longitudinal, Não Só o MRR do Mês',
            'Expansão para Enterprise: Contratos Anuais, SLAs e o Que Muda no Processo de Vendas',
            'Vendas por Indicação (Referral): O Canal que Não Envelhece e Tem CAC Próximo de Zero',
            'Construindo um Modelo de Receita Previsível: Combinando PLG, Sales e Expansão em Sistema',
          ]
        }
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
    },
    {
      slug: 'marketing-conceitual',
      nome: 'Marketing & Psicologia do Consumidor',
      emoji: '📣',
      parent: 'founder-solo',
      whyStart: 'Antes de qualquer ferramenta ou tática, você precisa entender o mecanismo: por que as pessoas compram. Quem pula essa etapa aprende a apertar botões sem saber o que está fazendo — e quando a campanha falha, não sabe por quê.',
      descricao: 'Fundamentos do marketing: psicologia de consumo, posicionamento e a lógica por trás de toda decisão de compra.',
      contexto: `Foco: os modelos mentais fundamentais do marketing. Ensine o PORQUÊ antes do COMO.

Abordagem obrigatória:
- Para cada framework (4 Ps, JTBD, etc.): explique o problema que ele resolve e onde falha antes de aplicar.
- Psicologia do consumidor não é manipulação — ensine com ética e mecanismo real.
- Branding não é estética; é gestão de percepção. Ensine a diferença.`,
      fases: [
        {
          nome: 'O Mecanismo da Decisão de Compra',
          topicos: [
            'Marketing vs Publicidade vs Propaganda: Distinções que Importam para Founders',
            'Jobs To Be Done (JTBD): O Cliente Compra Progresso, Não Produto',
            'Psicologia do Consumidor: Os Gatilhos Neurais que Antecedem a Compra',
            'Sistema 1 e Sistema 2 de Kahneman: Como a Decisão Acontece Antes da Razão',
            'Percepção de Valor vs Preço: Por que o Barato Parece Suspeito',
            'O Paradoxo da Escolha: Menos Opções Vendem Mais (Barry Schwartz)',
            'Economia Comportamental Aplicada a Preços: Ancoragem, Decoy e Framing',
            'A Psicologia da Prova Social e da Autoridade (Cialdini)',
          ]
        },
        {
          nome: 'Posicionamento e Construção de Marca',
          topicos: [
            'Posicionamento de Mercado: Diferenciação e Ocupação de Categoria Mental',
            'Branding: Posicionamento, Identidade e Gestão de Percepção',
            'Estratégia de Oceano Azul: Criando Mercados Sem Competição (Kim & Mauborgne)',
            'Os 4 Ps do Marketing: O Framework Original, Suas Limitações e o que Vem Depois',
            'Storytelling Estrutural: Por que Histórias Vendem Mais que Argumentos Lógicos',
            'O Efeito Halo: Como a Primeira Impressão Contamina Todo o Resto',
            'Neuromarketing: A Neurociência Por Trás do Consumo (o que o dado diz de verdade)',
            'Gestão de Crise de Imagem para Founders: O Que Fazer Quando Tudo Dá Errado',
          ]
        },
        {
          nome: 'Distribuição e Growth para Founders',
          topicos: [
            'A Anatomia de um Funil de Aquisição para Founders Solo',
            'Product-Led Growth (PLG): Deixando o Produto Ser o Principal Canal',
            'North Star Metric: A Única Métrica que Resume o Valor Entregue',
            'Canais Orgânicos: SEO, Conteúdo e Audiência como Ativos Acumuláveis',
            'Building in Public: Transparência como Estratégia de Distribuição',
            'Cold Email com Personalização por IA: O Que Funciona em 2026',
            'Comportamento do Consumidor na Era Digital: Atenção Fragmentada e Ciclos Curtos',
          ]
        }
      ]
    },
    {
      slug: 'founder-vendas',
      nome: 'Vendas & Negociação para Founders',
      emoji: '🤝',
      parent: 'founder-solo',
      whyStart: 'Se não gera receita, é um hobby. Cobrar desde o dia 1 é o teste mais honesto de se você está resolvendo um problema real. Founder que não sabe vender depende do acaso para sobreviver.',
      descricao: 'Processo de vendas repetível para founders solo: do primeiro cliente ao pipeline escalável.',
      contexto: `Foco: vender sendo o único vendedor — sem equipe, sem script pronto, às vezes sendo introvertido.

Abordagem obrigatória:
- Comece sempre pelo The Mom Test: o erro mais caro do founder é achar que está vendendo quando está só sendo elogiado.
- Para cada metodologia (SPIN, BANT): explique o problema que ela resolve antes de aplicar.
- Seja honesto sobre a rejeição: não é pessoal, é informação. Reformule o jogo.`,
      fases: [
        {
          nome: 'A Primeira Venda: Validando que Alguém Paga',
          topicos: [
            'The Mom Test (Rob Fitzpatrick): Como Fazer Perguntas que Não Mentem para Você',
            'A Diferença Entre Interesse e Intenção de Compra: Como Distinguir em Tempo Real',
            'Perfil de Cliente Ideal (ICP): Quem É e Quem Definitivamente Não É',
            'Como Fazer a Primeira Venda Sendo Founder (Sem Equipe, Sem Script)',
            'Demonstrações de Produto que Convertem: Estrutura e o Que Nunca Fazer',
            'Copywriting de Conversão para Landing Pages e Emails de Founder',
            'Lidando com Rejeições: Reformulando como Dado, Não como Derrota',
          ]
        },
        {
          nome: 'Processo e Metodologia de Vendas',
          topicos: [
            'SPIN Selling: Situação, Problema, Implicação e Necessidade de Solução',
            'Qualificação de Leads: BANT e MEDDIC na Prática de Solo Founders',
            'O Processo de Discovery: Fazendo as Perguntas Certas Antes de Apresentar Qualquer Coisa',
            'Contorno de Objeções: As 8 Mais Comuns e Como Quebrar Cada Uma',
            'Negociação de Contratos: Como Não Dar Desconto e Fechar Igualmente',
            'Proposta de Valor: Como Apresentar o ROI Sem Soar como Vendedor de Feirão',
            'Pipeline de Vendas com CRM Solo: Notion, Linear ou Pipedrive para Times de 1',
          ]
        },
        {
          nome: 'Escala e Receita Recorrente',
          topicos: [
            'PLG vs Sales-Led: Quando Deixar o Produto Vender e Quando Você Precisa Vender',
            'Value-Based Pricing: Cobrar pelo Valor Gerado, Não pelo Custo',
            'Annual Plans: Como Convencer o Cliente a Pagar o Ano Todo',
            'Upselling e Cross-selling: Receita sem Esforço Adicional',
            'MRR, ARR e Churn: Entendendo a Saúde Real da Receita',
            'Net Revenue Retention Acima de 100%: A Métrica que Prova que o Produto Funciona',
            'Recuperação de Churn: Como Reativar Clientes que Cancelaram',
            'Análise Win/Loss: Por Que Você Perdeu e O Que Fazer Com Esse Dado',
          ]
        }
      ]
    },
    {
      slug: 'visao-estrategica-inovacao',
      nome: 'Visão Estratégica & Inovação',
      emoji: '🔭',
      parent: 'founder-solo',
      whyStart: 'Operar bem uma empresa é necessário, mas insuficiente. Os founders que mudam o jogo não competem — eles criam categorias. Esta matéria é sobre enxergar o que ainda não existe e ter a coragem intelectual de construir.',
      descricao: 'De Zero to One a Antifragilidade: os modelos mentais dos inovadores de fronteira que constroem monopólios, criam categorias e moldam o futuro.',
      contexto: `Foco: estratégia não-linear e pensamento de primeiros princípios aplicado a negócios de fronteira.

Abordagem obrigatória:
- Sempre parta do mecanismo antes da aplicação: "por que competição reduz lucro?" antes de citar Thiel.
- Conecte cada modelo mental a uma decisão real que o aluno pode tomar hoje.
- Seja cético: ensine as limitações de cada framework (Zero to One não funciona para todo tipo de negócio).
- Pergunte sempre: "o que você sabe que poucas pessoas sabem?" — esse é o coração de toda inovação real.
- Nunca romantize o empreendedorismo: inovação real é rara, arriscada e cara. Ensine a calcular o risco.`,
      fases: [
        {
          nome: 'Por que Inovação é Diferente de Melhoria',
          topicos: [
            'A Distinção Fundamental: Inovação Incremental vs Inovação de Categoria (Zero to One)',
            'Por que Competição é para Perdedores: O Argumento Central de Peter Thiel',
            'Pensamento de Primeiros Princípios: Como Elon Musk Desmonta Verdades Aceitas',
            'O Paradigma da Inovação Disruptiva: Clayton Christensen e a Teoria dos Jobs-to-be-Done',
            'Segredos e Verdades Contraintuitivas: O Que Você Sabe que Ninguém Mais Sabe?',
            'O Problema do Crescimento Incremental: Horizonte 1, 2 e 3 de McKinsey',
            'Viés de Confirmação na Estratégia: Por que Líderes de Mercado Ignoram Ameaças Óbvias',
            'A Diferença entre Ser Pioneiro e Ser Fundador de Categoria',
          ]
        },
        {
          nome: 'Construindo Vantagens Injustas',
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
            'O Paradoxo do Sucesso: Como o Que Te Trouxe Aqui Pode Te Impedir de Avançar',
          ]
        },
        {
          nome: 'Pensamento de Fronteira e a Era da IA',
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
            'Síntese: Mapeando Sua Tese de Inovação — O Que Você Está Apostando e Por Quê',
          ]
        }
      ]
    },
    {
      slug: 'recrutamento-talentos',
      nome: 'Recrutamento & Gestão de Talentos',
      emoji: '🎯',
      isCategory: false,
      parent: 'founder-solo',
      whyStart: 'Uma empresa é tão boa quanto as pessoas que consegue atrair e manter. Recrutar mal é o erro mais caro que existe.',
      descricao: 'Como identificar, atrair e reter pessoas excepcionais.',
      contexto: `Foco: recrutamento como vantagem competitiva — sem papo de RH corporativo.

Abordagem obrigatória:
- Baseie-se em práticas de empresas de alta performance (Netflix, Stripe, SpaceX).
- Sem teoria de gestão de pessoas genérica. Foco em decisões difíceis e trade-offs reais.`,
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
      nome: 'Liderança & Execução',
      emoji: '⚡',
      isCategory: false,
      parent: 'founder-solo',
      whyStart: 'Visão sem execução é alucinação. Liderar é fazer o time entregar resultados consistentes, não dar discursos inspiradores.',
      descricao: 'Como liderar na prática: delegação, decisões difíceis e accountability.',
      contexto: `Foco: liderança operacional — o dia a dia de quem gerencia pessoas e precisa entregar resultados.

Abordagem obrigatória:
- Cada conceito deve ter um cenário real de aplicação ("você tem um dev que entrega atrasado, o que faz?").
- Sem teoria motivacional vazia. Foco em decisões, trade-offs e consequências.`,
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
      nome: 'Cultura & Arquitetura Organizacional',
      emoji: '🏗️',
      isCategory: false,
      parent: 'founder-solo',
      whyStart: 'Cultura não é o que está no mural. É o que acontece quando o CEO não está olhando. Você projeta ou ela aparece sozinha — e geralmente ruim.',
      descricao: 'Como projetar cultura organizacional de alta performance com intenção.',
      contexto: `Foco: cultura como sistema operacional da empresa, não como decoração.

Abordagem obrigatória:
- Use cases reais (Netflix Culture Deck, Valve Handbook, Spotify Model).
- Mostre os trade-offs de cada modelo cultural. Não existe cultura perfeita.`,
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
