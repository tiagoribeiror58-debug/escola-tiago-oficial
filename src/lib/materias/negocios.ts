import { MateriaConfig } from '@/types';

export const tecnologiaNegocios: MateriaConfig = {
  slug: 'tecnologia-negocios',
  nome: 'Negócios & Empreendedorismo',
  emoji: '🚀',
  isCategory: true,
  descricao: 'Desenvolvimento de negócios, growth, scale-ups e alocação de capital.',
  children: [
    {
      slug: 'business-growth',
      nome: 'Business & Growth',
      emoji: '💼',
      isCategory: true,
      parent: 'tecnologia-negocios',
      whyStart: 'Comece pelo negócio, não pela tecnologia. Entender como empresas nascem, crescem e sobrevivem é o filtro que determina quais ferramentas técnicas valem a pena aprender — e para quê.',
      descricao: 'A arte de construir, escalar e gerir empresas. Do zero ao equity.',
      children: [
        {
          slug: 'empreendedorismo',
          nome: 'Fundação & Startups',
          emoji: '🏗️',
          parent: 'business-growth',
          whyStart: 'O ponto zero. Antes de vender, contratar ou investir, você precisa entender como uma empresa nasce — validação, dor real e o único número que importa: Product-Market Fit.',
          descricao: 'Product-Market Fit, ideação e gestão de produtos escaláveis.',
          contexto: `Foco: fundamentos reais de construção de negócios — validação, distribuição, escala.

Abordagem obrigatória:
- Para cada modelo (Canvas, Lean, etc.): explique o problema que ele resolve e onde falha antes de qualquer aplicação.
- Só depois de entender o mecanismo: peça aplicação a uma ideia real.
- Questione romantismos com base em mecanismo — "o que estruturalmente poderia matar essa ideia?" — não como provocação vazia.
- Nunca peça pitch ou plano sem antes ter estabelecido os fundamentos que deveriam sustentá-los.`,
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
            'Construindo para Escala vs Construindo para Validação'
          ]
        },
        {
          slug: 'financas-equity',
          nome: 'Finanças & Equity',
          emoji: '📈',
          parent: 'business-growth',
          whyStart: 'Com receita entrando, você precisa entender o dinheiro. Valuation, juros compostos e unit economics — aqui você aprende a ler os números e decidir com inteligência financeira.',
          descricao: 'Valuation, estrutura de capital e modelagem financeira.',
          contexto: `Foco: fundamentos financeiros reais — fluxo de caixa, valuation, estrutura de capital.

Abordagem obrigatória:
- Explique o mecanismo financeiro antes de qualquer aplicação ou estudo de caso.
- Para valuation: explique por que determinado método funciona e onde falha antes de aplicar.
- Se o aluno perguntar "onde investir": responda com o framework de análise de risco/retorno.
- Estudos de caso só depois que o mecanismo conceitual estiver sólido.`,
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
            'Retorno Esperado e Gestão de Portfólio Pessoal'
          ]
        },
        {
          slug: 'financas-corporativas',
          nome: 'Finanças Corporativas',
          emoji: '🏦',
          parent: 'business-growth',
          whyStart: 'Quando o negócio cresce, a complexidade financeira cresce junto. DRE, balanço e M&A são para quem vai além da startup e entra em empresas estruturadas.',
          descricao: 'Controladoria, demonstrações financeiras, M&A e tesouraria empresarial.',
          contexto: `Foco: a mecânica financeira interna das grandes empresas. Prepare o aluno para atuar como analista financeiro, banker ou CFO.

Abordagem obrigatória:
- Explique o mecanismo de contabilidade antes de ensinar a ler os relatórios.
- DRE, Balanço Patrimonial e DFC não são apenas tabelas; ensine como eles conversam entre si.
- Para modelagem e M&A: explique as premissas e os trade-offs estruturais antes de calcular.`,
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
            'Corporate Governance: Conselho, Auditoria e Compliance'
          ]
        },
        {
          slug: 'marketing-estrategico',
          nome: 'Marketing & Growth',
          emoji: '🎯',
          parent: 'business-growth',
          whyStart: 'Sem clientes, não existe negócio. Com a ideia validada, o próximo passo é gerar demanda. Marketing é matemática e comportamento humano.',
          descricao: 'Geração de demanda, funis de conversão e aquisição escalável.',
          contexto: `Foco: engenharia de aquisição e psicologia de consumo. Ensine a estrutura do funil antes de táticas isoladas.`,
          ementa: [
            'A Anatomia de um Funil de Vendas',
            'Tráfego Pago vs Orgânico (Custo e Escala)',
            'SEO e Mecanismos de Busca',
            'Canais de Aquisição (Go-To-Market)',
            'Growth Hacking e Loops Virais',
            'Branding: Posicionamento, Identidade e Percepção',
            'Content Marketing e a Estratégia de Conteúdo',
            'Email Marketing e Nutrição de Leads',
            'Copywriting para Conversão: Headlines, CTAs e Landing Pages',
            'Psicologia do Consumidor: Gatilhos Mentais de Compra',
            'Marketing de Influência e Co-marketing',
            'Métricas de Marketing: MQL, SQL, CPL e ROAS',
            'A/B Testing e Otimização de Conversão (CRO)',
            'Product-Led Growth (PLG): O Produto como Canal',
            'Expansão Internacional: Go-To-Market em Novos Mercados'
          ]
        },
        {
          slug: 'vendas-b2b',
          nome: 'Vendas & Negociação Comercial',
          emoji: '🤝',
          parent: 'business-growth',
          whyStart: 'Marketing gera leads. Vendas converte. Esta etapa fecha o ciclo de aquisição — transformando interesse em receita com processos repetíveis.',
          descricao: 'Vendas B2B, fechamento, spin selling e previsibilidade de receita.',
          contexto: `Foco: processos de vendas repetíveis e previsíveis. Ensine metodologias estruturadas (SPIN, BANT) pelo motivo de sua existência.`,
          ementa: [
            'Vendas B2B vs B2C (Ciclos e Decisores)',
            'SPIN Selling e Perfil de Cliente Ideal (ICP)',
            'Qualificação de Leads (BANT, MEDDIC)',
            'Contorno de Objeções Estrutural',
            'Previsibilidade e Máquina de Vendas',
            'Account-Based Selling (ABS): Caçando Grandes Contas',
            'O Processo de Discovery: Fazendo as Perguntas Certas',
            'Proposta de Valor: Como Apresentar o ROI ao Cliente',
            'Negociação de Contratos e Desconto Estratégico',
            'CRM: Gestão de Pipeline e Funil de Vendas',
            'SDR vs AE: Divisão de Trabalho em Times de Vendas',
            'Vendas por Indicação (Referral) e Expansão de Conta',
            'Gestão de Cota e Comissionamento',
            'Análise Win/Loss: Por que você perdeu e o que fazer',
            'Customer Success: A Venda que Nunca Termina'
          ],
          layout: 'narrative'
        },
        {
          slug: 'gestao-lideranca',
          nome: 'Gestão & Cultura',
          emoji: '👑',
          parent: 'business-growth',
          whyStart: 'Com o negócio rodando, você precisa escalar pessoas. Liderança, OKRs e cultura determinam se a empresa cresce com você — ou depende de você.',
          descricao: 'Liderança, OKRs, contratação e cultura organizacional.',
          contexto: `Foco: alinhamento de incentivos e engenharia organizacional. Cultura é o que acontece quando o líder não está na sala.`,
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
            'Construindo Times de Alta Performance'
          ]
        },
        {
          slug: 'direito-empresarial',
          nome: 'Direito Empresarial & Tributário',
          emoji: '⚖️',
          parent: 'business-growth',
          whyStart: 'Ignorar o arcabouço jurídico é o erro mais caro de um empreendedor. Esta etapa não é sobre virar advogado — é sobre saber quando você está em risco.',
          descricao: 'Contratos, blindagem patrimonial, compliance e eficiência tributária.',
          contexto: `Foco: as regras do jogo do mundo corporativo. Prepare o aluno para entender o arcabouço jurídico sem o juridiquês teórico.`,
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
            'Resolução de Disputas: Arbitragem vs Litígio'
          ],
          layout: 'split',
          widget: 'LegalViewer'
        },
        {
          slug: 'operacoes-supply-chain',
          nome: 'Operações & Supply Chain',
          emoji: '⚙️',
          parent: 'business-growth',
          whyStart: 'Uma empresa lucrativa pode morrer por ineficiência operacional. Esta etapa ensina a fazer a máquina girar com menos desperdício.',
          descricao: 'Logística, teoria das restrições e eficiência operacional.',
          contexto: `Foco: a máquina girando. Ensine como otimizar processos, identificar gargalos e reduzir custos sem perder qualidade.`,
          ementa: [
            'Gestão de Processos e Mapeamento de Fluxos',
            'Teoria das Restrições (Gargalos)',
            'Supply Chain: Fornecedores e Logística',
            'Lean Manufacturing e Gestão de Qualidade',
            'Matriz de Riscos e Contingência Operacional',
            'Six Sigma: Eliminação de Defeitos Estrutural',
            'OEE (Overall Equipment Effectiveness) e Produtividade',
            'Gestão de Estoque: JIT, Kanban e EOQ',
            'Negociação com Fornecedores: Estratégia e Poder',
            'SLA e KPIs Operacionais',
            'Automação de Processos (RPA e Fluxos Digitais)',
            'Planejamento de Demanda e S&OP',
            'Logística Reversa e Sustentabilidade',
            'Gestão de Projetos: PMBOK e Metodologias Ágeis',
            'Business Continuity Planning (BCP)'
          ]
        },
        {
          slug: 'private-equity-vc',
          nome: 'Investimento Anjo & Venture Capital',
          emoji: '🦄',
          parent: 'business-growth',
          whyStart: 'A etapa final do founder: sentar do outro lado da mesa. Com o negócio construído, você aprende a avaliar outros, alocar capital e gerar retorno como investidor.',
          descricao: 'Investimento direto em empresas reais, startups e equity-crowdfunding.',
          contexto: `Foco: a dinâmica do investidor que senta à mesa com o founder. Ensine a avaliar teses, founders e o mecanismo de saída (exit).
          
Abordagem obrigatória:
- Explique o conceito de "Skin in the Game" e alinhamento de interesses antes de falar de taxas.
- Diferencie Investimento Anjo, VC e Private Equity pelo mecanismo de risco e maturidade da empresa.
- Ensine a avaliar o "Founders-Market Fit" — por que ESSAS pessoas são as certas para ESSA dor?
- Due Diligence não é só papelada; é ver se o mecanismo de crescimento é real.`,
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
    }
  ]
};
