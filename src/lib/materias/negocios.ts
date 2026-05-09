import { MateriaConfig } from '@/types';

export const tecnologiaNegocios: MateriaConfig = {
  slug: 'tecnologia-negocios',
  nome: 'Negócios & Tecnologia',
  emoji: '🚀',
  isCategory: true,
  descricao: 'Desenvolvimento de software, inteligência artificial, scale-ups e alocação de capital.',
  children: [
    {
      slug: 'business-growth',
      nome: 'Business & Growth',
      emoji: '💼',
      isCategory: true,
      parent: 'tecnologia-negocios',
      descricao: 'A arte de construir, escalar e gerir empresas. Do zero ao equity.',
      children: [
        {
          slug: 'empreendedorismo',
          nome: 'Fundação & Startups',
          emoji: '🏗️',
          parent: 'business-growth',
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
            'Gestão de Produtos e Roadmaps'
          ]
        },
        {
          slug: 'financas-equity',
          nome: 'Finanças & Equity',
          emoji: '📈',
          parent: 'business-growth',
          descricao: 'Valuation, estrutura de capital e modelagem financeira.',
          contexto: `Foco: fundamentos financeiros reais — fluxo de caixa, valuation, estrutura de capital.

Abordagem obrigatória:
- Explique o mecanismo financeiro antes de qualquer aplicação ou estudo de caso. O aluno precisa entender a lógica antes de ver o exemplo.
- Para valuation: explique por que determinado método funciona e onde falha antes de aplicar em empresa real.
- Se o aluno perguntar "onde investir": responda com o framework de análise de risco/retorno que justifica qualquer decisão — nunca com dicas de ativos.
- Estudos de caso só depois que o mecanismo conceitual estiver sólido.`,
          ementa: [
            'A Matemática do Juros Composto',
            'Unit Economics: CAC, LTV, Payback',
            'Valuation: Múltiplos vs Fluxo de Caixa Descontado',
            'Tipos de Equity e Cap Tables (Venture Capital)',
            'Ciclos Macroeconômicos'
          ]
        },
        {
          slug: 'financas-corporativas',
          nome: 'Finanças Corporativas',
          emoji: '🏦',
          parent: 'business-growth',
          descricao: 'Controladoria, demonstrações financeiras, M&A e tesouraria empresarial.',
          contexto: `Foco: a mecânica financeira interna das grandes empresas (Corporate Finance). Prepare o aluno para atuar como analista financeiro, banker ou CFO.

Abordagem obrigatória:
- Explique o mecanismo de contabilidade antes de ensinar a ler os relatórios. O aluno deve entender por que "Débito" e "Crédito" existem estruturalmente.
- DRE, Balanço Patrimonial e DFC não são apenas tabelas; ensine como eles conversam entre si (o lucro não é o caixa).
- Para modelagem e M&A: explique as premissas e os trade-offs estruturais da dívida (WACC) antes de calcular.
- Use estudos de caso de empresas tradicionais (falências por falta de caixa, não por falta de lucro).`,
          ementa: [
            'A Tríade Contábil: DRE, Balanço Patrimonial e DFC',
            'Análise de Índices (Liquidez, ROE, ROA, Margem)',
            'Capital de Giro (Working Capital) e Ciclo Financeiro',
            'Custo de Capital (WACC) e Estrutura de Dívida',
            'Orçamento e Forecasting (Budgeting)',
            'Fusões e Aquisições (M&A) e Due Diligence'
          ]
        },
        {
          slug: 'marketing-estrategico',
          nome: 'Marketing & Growth',
          emoji: '🎯',
          parent: 'business-growth',
          descricao: 'Geração de demanda, funis de conversão e aquisição escalável.',
          contexto: `Foco: engenharia de aquisição e psicologia de consumo. Marketing é matemática e comportamento humano aplicado. Ensine a estrutura do funil antes de táticas isoladas.`,
          ementa: [
            'A Anatomia de um Funil de Vendas',
            'Tráfego Pago vs Orgânico (Custo e Escala)',
            'SEO e Mecanismos de Busca',
            'Canais de Aquisição (Go-To-Market)',
            'Growth Hacking e Loops Virais'
          ]
        },
        {
          slug: 'vendas-b2b',
          nome: 'Vendas & Negociação Comercial',
          emoji: '🤝',
          parent: 'business-growth',
          descricao: 'Vendas B2B, fechamento, spin selling e previsibilidade de receita.',
          contexto: `Foco: processos de vendas repetíveis e previsíveis. Ensine metodologias estruturadas (SPIN, BANT) pelo motivo de sua existência, não como scripts robóticos.`,
          ementa: [
            'Vendas B2B vs B2C (Ciclos e Decisores)',
            'SPIN Selling e Perfil de Cliente Ideal (ICP)',
            'Qualificação de Leads (BANT, MEDDIC)',
            'Contorno de Objeções Estrutural',
            'Previsibilidade e Máquina de Vendas'
          ],
          layout: 'narrative'
        },
        {
          slug: 'gestao-lideranca',
          nome: 'Gestão & Cultura',
          emoji: '👑',
          parent: 'business-growth',
          descricao: 'Liderança, OKRs, contratação e cultura organizacional.',
          contexto: `Foco: alinhamento de incentivos e engenharia organizacional. Cultura é o que acontece quando o líder não está na sala.`,
          ementa: [
            'Cultura Organizacional (Design de Comportamentos)',
            'Metodologias Ágeis e OKRs',
            'Processos de Contratação e Demissão',
            'Delegação e Microgerenciamento',
            'Resolução de Conflitos Corporativos'
          ]
        },
        {
          slug: 'direito-empresarial',
          nome: 'Direito Empresarial & Tributário',
          emoji: '⚖️',
          parent: 'business-growth',
          descricao: 'Contratos, blindagem patrimonial, compliance e eficiência tributária.',
          contexto: `Foco: as regras do jogo do mundo corporativo. Prepare o aluno para entender o arcabouço jurídico sem o juridiquês teórico; foco em sobrevivência e otimização.`,
          ementa: [
            'Tipos Societários (Ltda, S.A) e Responsabilidade Limitada',
            'Acordos de Sócios (Vesting, Cliff, Tag/Drag Along)',
            'Propriedade Intelectual e Marcas',
            'Noções de Direito Trabalhista e Terceirização (PJ)',
            'Regimes Tributários e Elisão Fiscal Legal'
          ],
          layout: 'split',
          widget: 'LegalViewer'
        },
        {
          slug: 'operacoes-supply-chain',
          nome: 'Operações & Supply Chain',
          emoji: '⚙️',
          parent: 'business-growth',
          descricao: 'Logística, teoria das restrições e eficiência operacional.',
          contexto: `Foco: a máquina girando. Ensine como otimizar processos, identificar gargalos e reduzir custos sem perder qualidade. Foco prático para futuros COOs e gerentes de projeto.`,
          ementa: [
            'Gestão de Processos e Mapeamento de Fluxos',
            'Teoria das Restrições (Gargalos)',
            'Supply Chain: Fornecedores e Logística',
            'Lean Manufacturing e Gestão de Qualidade',
            'Matriz de Riscos e Contingência Operacional'
          ]
        },
        {
          slug: 'private-equity-vc',
          nome: 'Investimento Anjo & Venture Capital',
          emoji: '🦄',
          parent: 'business-growth',
          descricao: 'Investimento direto em empresas reais, startups e equity-crowdfunding.',
          contexto: `Foco: a dinâmica do investidor que senta à mesa com o founder. Ensine a avaliar teses, founders e o mecanismo de saída (exit).
          
Abordagem obrigatória:
- Explique o conceito de "Skin in the Game" e alinhamento de interesses antes de falar de taxas.
- Diferencie Investimento Anjo, VC e Private Equity pelo mecanismo de risco e maturidade da empresa.
- Ensine a avaliar o "Founders-Market Fit" — por que ESSAS pessoas são as certas para ESSA dor?
- Due Diligence não é só papelada; é ver se o mecanismo de crescimento é real ou sustentado por fumaça.`,
          ementa: [
            'Teses de Investimento: Onde e por que colocar dinheiro',
            'Análise de Founders e Time (Soft Skills Hardcoded)',
            'Deal Flow: Como encontrar e filtrar boas oportunidades',
            'Term Sheets: Cláusulas de controle e proteção (Veto, Board)',
            'Métricas de Performance Pós-Investimento',
            'Estratégias de Exit: IPO, M&A e Secondary'
          ],
          layout: 'split',
          widget: 'FinanceLab'
        }
      ]
    },
    {
      slug: 'tecnologia-ia',
      nome: 'Tecnologia & Produtos',
      emoji: '💻',
      isCategory: true,
      parent: 'tecnologia-negocios',
      descricao: 'Desenvolvimento de software, arquitetura de sistemas e inteligência artificial.',
      children: [
        {
          slug: 'programacao',
          nome: 'Engenharia de Software',
          emoji: '<>',
          parent: 'tecnologia-ia',
          descricao: 'Da lógica de base à arquitetura de sistemas distribuídos.',
          contexto: `Foco: raciocínio computacional — lógica, estruturas, arquitetura.

Abordagem obrigatória:
- Explique o conceito ou padrão antes de apresentar o problema. O aluno precisa entender o que está sendo aplicado.
- Para bugs: não corrija. Faça perguntas que levem o aluno ao mecanismo do erro — não à solução direta.
- Código vem depois de compreensão do padrão, não antes. Nunca use código como diagnóstico inicial sem base conceitual.
- Exija que o aluno explique o raciocínio da solução — não apenas que ela funcione.`,
          ementa: [
            'Lógica de Programação e Algoritmos',
            'Estruturas de Dados Básicas',
            'Arquitetura Frontend (React/SPA)',
            'Arquitetura Backend (APIs, REST)',
            'Bancos de Dados Relacionais vs NoSQL',
            'Design Patterns e Clean Code'
          ],
          layout: 'split',
          widget: 'CodeLab'
        },
        {
          slug: 'inteligencia-artificial',
          nome: 'Inteligência Artificial',
          emoji: '🤖',
          parent: 'tecnologia-ia',
          descricao: 'Mecânicas de LLMs, Engenharia de Prompt e Agentes Autônomos.',
          contexto: `Foco: fundamentos reais de IA generativa — Transformer, tokenização, limites de arquitetura.

Abordagem obrigatória:
- Explique o mecanismo técnico antes de qualquer aplicação prática. O aluno precisa entender o que acontece dentro do modelo antes de saber como usá-lo.
- Para prompting: explique por que determinada estrutura funciona (o mecanismo de atenção, contexto, etc.) antes de pedir que o aluno escreva um prompt.
- Só depois de compreensão do mecanismo: peça que o aluno aplique em um problema técnico específico.
- Critique prompts com base no mecanismo — não apenas "isso funciona melhor", mas por quê estruturalmente.`,
          ementa: [
            'Fundamentos de Transformers e Tokens',
            'Zero-shot, One-shot e Few-shot Prompting',
            'Chain of Thought & Step-by-Step',
            'Arquitetura RAG (Bancos Vetoriais)',
            'Agentes Autônomos e Tool Calling'
          ]
        },
        {
          slug: 'design',
          nome: 'Design Visual & UX',
          emoji: '◑',
          parent: 'tecnologia-ia',
          descricao: 'Hierarquia, tipografia, gestalt e design centrado no usuário.',
          contexto: `Foco: princípios estruturais do design — hierarquia, gestalt, percepção visual.

Abordagem obrigatória:
- Explique o princípio perceptivo ou cognitivo por trás de cada decisão de design antes de analisar exemplos.
- Só depois de explicar o mecanismo: peça que o aluno critique um design real com base naquele princípio.
- Nunca peça análise de design sem antes estabelecer o critério de análise.`,
          ementa: [
            'Leis da Gestalt Aplicadas a Interfaces',
            'Teoria das Cores e Contraste',
            'Tipografia e Escala Tipográfica',
            'Espaçamento e Hierarquia Visual',
            'UI vs UX: A Experiência do Usuário',
            'Heurísticas de Nielsen'
          ],
          layout: 'canvas',
          widget: 'DesignPreview'
        },
        {
          slug: 'dados-analytics',
          nome: 'Ciência de Dados & Analytics',
          emoji: '📊',
          parent: 'tecnologia-ia',
          descricao: 'Pipelines de dados, Business Intelligence e modelagem estatística aplicada.',
          contexto: `Foco: transformar dados brutos em decisões de negócios. Explique o fluxo de ETL (Extração, Transformação, Carga) e a diferença entre análise descritiva e preditiva.`,
          ementa: [
            'O Pipeline de Dados (ETL/ELT)',
            'Data Warehouses vs Data Lakes',
            'SQL para Análise de Dados',
            'Modelagem Dimensional (Star Schema)',
            'Visualização de Dados e Dashboards'
          ]
        },
        {
          slug: 'web3-cripto',
          nome: 'Cripto & Web3',
          emoji: '⛓️',
          parent: 'tecnologia-ia',
          descricao: 'Criptografia, Blockchain, DeFi e contratos inteligentes.',
          contexto: `Foco: os fundamentos técnicos da descentralização. Evite o viés de investimento e especulação; foque no mecanismo do consenso e da imutabilidade.`,
          ementa: [
            'O Problema do Gasto Duplo e o Bitcoin',
            'Algoritmos de Consenso (PoW vs PoS)',
            'Ethereum e Smart Contracts',
            'DeFi (Finanças Descentralizadas)',
            'Tokenomics e Governança'
          ]
        },
        {
          slug: 'product-management',
          nome: 'Gestão de Produto Digital (PM)',
          emoji: '📦',
          parent: 'tecnologia-ia',
          descricao: 'Descoberta de produto, priorização de backlog e métricas de engajamento.',
          contexto: `Foco: a ponte entre engenharia, negócios e design. Ensine como decidir O QUE construir antes de COMO construir.`,
          ementa: [
            'O Papel do PM: Engenharia, UX e Negócios',
            'Product Discovery e Entrevistas de Usuário',
            'Frameworks de Priorização (RICE, Kano)',
            'Gestão de Backlog e Roadmap',
            'Métricas de Produto (AARRR, Cohorts, Churn)'
          ]
        },
        {
          slug: 'cloud-devops',
          nome: 'Cloud Computing & DevOps',
          emoji: '☁️',
          parent: 'tecnologia-ia',
          descricao: 'Arquitetura de servidores, CI/CD, Docker e escalabilidade.',
          contexto: `Foco: infraestrutura e segurança da informação. Abordagem técnica para quem quer atuar como Tech Lead ou CTO, garantindo que o software funcione para milhões de usuários.`,
          ementa: [
            'Introdução à Nuvem (AWS, GCP, Azure)',
            'Virtualização e Containers (Docker, K8s)',
            'Integração e Entrega Contínua (CI/CD)',
            'Arquitetura de Microserviços vs Monolitos',
            'Segurança da Informação e CyberSecurity'
          ]
        }
      ]
    }
  ]
};
