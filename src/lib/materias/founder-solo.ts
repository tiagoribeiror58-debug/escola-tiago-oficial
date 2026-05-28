import { MateriaConfig } from '@/types';

export const founderSolo: MateriaConfig = {
  slug: 'founder-solo',
  nome: 'Hub do Founder Solo',
  emoji: '🦅',
  isCategory: true,
  descricao: 'Desenvolvimento integral para fundadores solo: de engenharia a vendas, focado em alavancagem máxima.',
  children: [
    {
      slug: 'founder-marketing-growth',
      nome: 'Marketing & Distribuição',
      emoji: '📣',
      parent: 'founder-solo',
      whyStart: 'Sem distribuição, seu produto invisível morre. Founders solo precisam construir audiência e canais antes mesmo do código.',
      descricao: 'Estratégias de Growth, SEO, Comunidade e Marketing de Conteúdo para founders.',
      contexto: `Foco: Distribuição eficiente para times de 1 pessoa.
Abordagem obrigatória:
- Como alavancar canais orgânicos sem gasto massivo em Ads.
- Building in Public e construção de autoridade.`,
      ementa: [
        'Building in Public: Estratégia de Transparência',
        'SEO Técnico e de Conteúdo para SaaS',
        'Cold Email Estruturado e Escalonável',
        'Criação de Comunidades (Discord, Circle)',
        'Lançamentos no Product Hunt: O Guia Definitivo',
        'Marketing de Conteúdo: Artigos e Vídeos Técnicos',
        'Parcerias e Co-Marketing para Solo Founders'
      ]
    },
    {
      slug: 'founder-dev-arquitetura',
      nome: 'Desenvolvimento & Arquitetura',
      emoji: '⚙️',
      parent: 'founder-solo',
      whyStart: 'Velocidade de iteração é sua única vantagem competitiva contra grandes corporações. Arquitetura simples vence arquitetura complexa.',
      descricao: 'Decisões técnicas otimizadas para velocidade, manutenção baixa e escalabilidade barata.',
      contexto: `Foco: Engenharia pragmática. Ferramentas que reduzem o atrito.
Abordagem obrigatória:
- Monolitos vs Microserviços: Escolha o pragmatismo.
- BaaS (Supabase/Firebase) como multiplicador de força.`,
      ementa: [
        'A Arquitetura do Solo Founder (Monolitos e BaaS)',
        'Escolhendo o Tech Stack: Produtividade vs Hype',
        'CI/CD e Deploy Contínuo Sem Fricção',
        'Gestão de Banco de Dados e Migrations Simplificadas',
        'Automação de Infraestrutura com Vercel/Netlify',
        'Testes Automatizados: O Que Realmente Importa',
        'Lidando com Débito Técnico Quando Você é o Único Dev'
      ]
    },
    {
      slug: 'founder-produto-ux',
      nome: 'Produto, UX & Design',
      emoji: '🎨',
      parent: 'founder-solo',
      whyStart: 'O usuário não vê seu código, ele vê a interface. UX excelente constrói confiança imediata.',
      descricao: 'Design intuitivo, onboarding perfeito e desenvolvimento guiado pelo feedback.',
      contexto: `Foco: UI/UX pragmático e design systems.
Abordagem obrigatória:
- Como desenhar interfaces que parecem profissionais usando bibliotecas e Tailwind.
- A regra do "Menos é Mais" em features.`,
      ementa: [
        'Design Systems e Tailwind: Consistência Visual Rápida',
        'Onboarding: O Momento Aha!',
        'A Arte de Dizer Não a Novas Features',
        'Entrevistas com Usuários: Como Fazer as Perguntas Certas',
        'Wireframing e Prototipagem Rápida',
        'Métricas de Engajamento e Retenção de Produto',
        'Micro-Interações que Encantam o Usuário'
      ]
    },
    {
      slug: 'founder-vendas-monetizacao',
      nome: 'Vendas & Monetização',
      emoji: '💰',
      parent: 'founder-solo',
      whyStart: 'Se não gera receita, é um hobby. Cobrar desde o dia 1 é essencial para validar se você está resolvendo um problema real.',
      descricao: 'Estratégias de precificação, funis de conversão e fechamento de vendas.',
      contexto: `Foco: Receita real. Como cobrar, quanto cobrar e como vender sendo introvertido.
Abordagem obrigatória:
- PLG (Product-Led Growth) vs Sales-Led.
- Modelagem de preços para produtos digitais.`,
      ementa: [
        'Estratégias de Precificação: Fremium vs Trial vs Pago',
        'Como Fazer a Primeira Venda (The Mom Test na Prática)',
        'Copywriting de Conversão para Landing Pages',
        'Lidando com Rejeições Comerciais (Resiliência)',
        'Demonstrações de Produto (Demos) que Convertem',
        'Upselling e Cross-selling Automatizados',
        'MRR, ARR, Churn: Entendendo a Saúde da Receita'
      ]
    },
    {
      slug: 'founder-financas-fundraising',
      nome: 'Finanças & Fundraising',
      emoji: '🏦',
      parent: 'founder-solo',
      whyStart: 'Falta de caixa mata startups. Saber quando fazer bootstrapping e quando captar dinheiro é uma decisão fundamental.',
      descricao: 'Gestão de caixa para founders, Bootstrapping vs VC, e modelagem financeira básica.',
      contexto: `Foco: Sobrevivência financeira e alocação de capital inteligente.
Abordagem obrigatória:
- Unit Economics e Burn Rate.
- O mito do VC vs a realidade do Bootstrapping.`,
      ementa: [
        'Bootstrapping vs Capital de Risco (VC): Prós e Contras',
        'Calculando o Runway e Gerenciando o Burn Rate',
        'Unit Economics Essenciais para Solo Founders',
        'Como Preparar um Pitch Deck Preciso',
        'A Matemática do Equity e Diluição',
        'Bolsões de Liquidez e Gestão de Risco Pessoal',
        'Financiamento Baseado em Receita (Revenue-Based Financing)'
      ]
    },
    {
      slug: 'founder-gestao-produtividade',
      nome: 'Gestão de Tempo & Produtividade',
      emoji: '⏱️',
      parent: 'founder-solo',
      whyStart: 'Você tem as mesmas 24h que grandes equipes. Onde você foca determina se a empresa avança ou gira em falso.',
      descricao: 'Frameworks de produtividade extrema, saúde mental e foco.',
      contexto: `Foco: Autogerenciamento. A psicologia de ser o único responsável pelo sucesso e fracasso.
Abordagem obrigatória:
- Como evitar burnout.
- Priorização impiedosa (Matriz de Eisenhower, Timeboxing).`,
      ementa: [
        'Timeboxing e Trabalho Profundo (Deep Work)',
        'A Arte da Priorização Impiedosa',
        'Delegação de Baixo Custo (Assistentes Virtuais e IA)',
        'Lidando com o Isolamento do Solo Founder',
        'Prevenção de Burnout: Rotinas Não-Negociáveis',
        'Métricas de Vaidade vs Métricas de Ação',
        'Context Switching: O Inimigo Silencioso da Produtividade'
      ]
    },
    {
      slug: 'founder-juridico-lgpd',
      nome: 'Jurídico, LGPD & Contratos',
      emoji: '⚖️',
      parent: 'founder-solo',
      whyStart: 'Um processo pode destruir tudo o que você construiu. O básico jurídico é sua armadura.',
      descricao: 'Conformidade legal simplificada, proteção de propriedade intelectual e termos de uso.',
      contexto: `Foco: Mitigação de riscos jurídicos sem complicação desnecessária.
Abordagem obrigatória:
- LGPD na prática para SaaS.
- Termos de Uso e Políticas de Privacidade que protegem o founder.`,
      ementa: [
        'O Básico da LGPD para Desenvolvedores e Founders',
        'Termos de Uso e Política de Privacidade Impermeáveis',
        'Registro de Marcas e Propriedade Intelectual',
        'Contratos com Freelancers: Garantindo os Direitos',
        'Criação de Entidade Jurídica (CNPJ, LLC)',
        'Recebimento de Pagamentos Internacionais e Tributação',
        'Blindagem Patrimonial Básica para Sócios'
      ]
    }
  ]
};
