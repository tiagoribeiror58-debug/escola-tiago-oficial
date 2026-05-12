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
            'Gestão de Produtos e Roadmaps'
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
          whyStart: 'Quando o negócio cresce, a complexidade financeira cresce junto. DRE, balanço e M&A são para quem vai além da startup e entra em empresas estruturadas — onde caixa, não lucro, determina a sobrevivência.',
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
          whyStart: 'Sem clientes, não existe negócio. Com a ideia validada, o próximo passo é gerar demanda. Marketing é matemática e comportamento humano — e quem entende isso cedo sai na frente.',
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
          whyStart: 'Marketing gera leads. Vendas converte. Esta etapa fecha o ciclo de aquisição — transformando interesse em receita com processos repetíveis, não carisma improvisado.',
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
          whyStart: 'Com o negócio rodando, você precisa escalar pessoas. Liderança, OKRs e cultura determinam se a empresa cresce com você — ou se fica dependente de você.',
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
          whyStart: 'Ignorar o arcabouço jurídico é o erro mais caro de um empreendedor. Esta etapa não é sobre virar advogado — é sobre saber quando você está em risco e como se proteger antes de ser tarde.',
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
          whyStart: 'Uma empresa lucrativa pode morrer por ineficiência operacional. Esta etapa ensina a fazer a máquina girar com menos desperdício — gargalos, logística e processos em escala real.',
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
          whyStart: 'A etapa final do founder: sentar do outro lado da mesa. Com o negócio construído, você aprende a avaliar outros, alocar capital e gerar retorno como investidor.',
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
          ]
        }
      ]
    }
  ]
};
