import { MateriaConfig } from '@/types';

export const tecnologiaHub: MateriaConfig = {
  slug: 'tecnologia-hub',
  nome: 'Ciência da Computação & Tecnologia',
  emoji: '💻',
  isCategory: true,
  descricao: 'A ciência de construir o futuro. Da arquitetura de computadores à Inteligência Artificial avançada, uma trilha completa para arquitetos de software e produtos.',
  children: [
    {
      slug: 'computacao-fundamentos',
      nome: 'Fundamentos da Computação',
      emoji: '⚙️',
      isCategory: true,
      parent: 'tecnologia-hub',
      whyStart: 'Você não pode inovar com IA sem antes entender como os computadores pensam, como a internet funciona e como os dados são estruturados. Esta é a fundação inegociável.',
      descricao: 'Engenharia de Software, Cloud e estruturação de dados.',
      children: [
        {
          slug: 'programacao',
          nome: 'Engenharia de Software',
          emoji: '<>',
          parent: 'computacao-fundamentos',
          whyStart: 'A base de tudo digital. Mesmo que não vá codar profissionalmente, entender raciocínio computacional muda como você pensa e resolve problemas — e elimina dependência de outros para construir.',
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
          slug: 'cloud-devops',
          nome: 'Cloud Computing & DevOps',
          emoji: '☁️',
          parent: 'computacao-fundamentos',
          whyStart: 'Produto funcionando para 10 usuários é diferente de funcionar para 1 milhão. Esta etapa ensina a escalar infraestrutura com confiabilidade — e entregar software rápido sem quebrar produção.',
          descricao: 'Arquitetura de servidores, CI/CD, Docker e escalabilidade.',
          contexto: `Foco: infraestrutura e segurança da informação. Abordagem técnica para quem quer atuar como Tech Lead ou CTO, garantindo que o software funcione para milhões de usuários.`,
          ementa: [
            'Introdução à Nuvem (AWS, GCP, Azure)',
            'Virtualização e Containers (Docker, K8s)',
            'Integração e Entrega Contínua (CI/CD)',
            'Arquitetura de Microserviços vs Monolitos',
            'Segurança da Informação e CyberSecurity'
          ]
        },
        {
          slug: 'dados-analytics',
          nome: 'Engenharia de Dados & Analytics',
          emoji: '📊',
          parent: 'computacao-fundamentos',
          whyStart: 'Com infraestrutura no ar, os dados começam a fluir. Antes de treinar IAs complexas, você precisa saber capturar, limpar e armazenar esses dados em escala (ETL, Data Lakes, SQL).',
          descricao: 'Pipelines de dados, Business Intelligence e infraestrutura analítica.',
          contexto: `Foco: transformar dados brutos em repositórios prontos para análise. Explique o fluxo de ETL (Extração, Transformação, Carga) e a diferença entre data lake e data warehouse.`,
          ementa: [
            'O Pipeline de Dados (ETL/ELT)',
            'Data Warehouses vs Data Lakes',
            'SQL para Análise de Dados',
            'Modelagem Dimensional (Star Schema)',
            'Visualização de Dados e Dashboards'
          ]
        }
      ]
    },
    {
      slug: 'inteligencia-artificial',
      nome: 'Inteligência Artificial',
      emoji: '🤖',
      isCategory: true,
      parent: 'tecnologia-hub',
      whyStart: 'Com a base computacional sólida, você avança para a fronteira algorítmica. Aqui você deixa de apenas codar regras para ensinar sistemas a aprenderem.',
      descricao: 'Machine Learning Clássico, MLOps, LLMs e IA Multimodal.',
      children: [
        {
          slug: 'ia-operacional',
          nome: 'IA Operacional & Eficiência',
          emoji: '👷',
          parent: 'inteligencia-artificial',
          whyStart: 'Antes de entender os pesos matemáticos de um modelo, aprenda a usá-lo como ferramenta. A engenharia de prompts te dá intuição de como as IAs atuais "pensam".',
          descricao: 'Uso diário para ganho massivo de eficiência pessoal. Fluxos de trabalho, GPT, Claude.',
          contexto: `Foco: táticas brutais de eficiência pessoal e fluxos de trabalho do dia a dia.
O aluno é um "Pedreiro de Prompt", quer resolver tarefas rapidamente, de forma pragmática.
Abordagem obrigatória:
- Mostre hacks reais para contornar a preguiça dos modelos (ex: penalização de estilo, constraint prompting).
- Explique como quebrar tarefas complexas em prompts iterativos (chaining).
- O foco aqui é produtividade brutal, não teoria profunda sobre pesos ou matrizes.`,
          fases: [
            {
              nome: 'Fase 1: O Operador Eficiente',
              topicos: [
                'O Mindset do Operador Centauro',
                'Anatomia de um Prompt de Alta Precisão (Role, Context, Constraints)',
                'Iteração e Refinamento de Contexto (Chaining)',
                'Automatizando Tarefas Repetitivas (Copywriting, Resumos, Emails)'
              ]
            },
            {
              nome: 'Fase 2: Automações Complexas',
              topicos: [
                'Análise de Dados Avançada via Agentes (Code Interpreter)',
                'Automações No-Code conectadas a IA (Zapier/Make + OpenAI)',
                'Criação de Prompts Dinâmicos (Templates)',
                'Sistemas Multi-Agente Básicos'
              ]
            }
          ]
        },
        {
          slug: 'ciencia-dados-preditiva',
          nome: 'Machine Learning Clássico & Preditivo',
          emoji: '📈',
          parent: 'inteligencia-artificial',
          whyStart: 'LLMs são só uma fatia da IA. Dados tabulares, regressões e árvores de decisão ainda resolvem 80% dos problemas reais de negócio — muitas vezes melhor e mais barato que um modelo generativo.',
          descricao: 'Análise de dados estatística, regressões, clusterização e árvores de decisão.',
          contexto: `Foco: extração de valor estatístico de dados tabulares. Nem tudo precisa de um LLM.
O aluno quer prever churn, analisar fraudes ou segmentar clientes.
Abordagem obrigatória:
- Mostre por que usar XGBoost ou Random Forest muitas vezes é melhor que Deep Learning para tabelas.
- Explique Overfitting e Underfitting estruturalmente antes de corrigir o modelo.`,
          fases: [
            {
              nome: 'Fase 1: Estatística e Preparação',
              topicos: [
                'Limpeza de Dados e Feature Engineering',
                'Regressão Linear e Logística (Os Fundamentos)',
                'Árvores de Decisão e Random Forests',
                'Clusterização e Segmentação (K-Means)'
              ]
            },
            {
              nome: 'Fase 2: Modelagem Avançada',
              topicos: [
                'Gradient Boosting (XGBoost, LightGBM)',
                'Séries Temporais e Previsão de Demanda',
                'Detecção de Anomalias (Fraudes e Risco)',
                'Interpretabilidade de Modelos (SHAP Values)'
              ]
            }
          ]
        },
        {
          slug: 'arquitetura-solucoes-ia',
          nome: 'Arquitetura de Sistemas Híbridos (RAG/LLM)',
          emoji: '🏗️',
          parent: 'inteligencia-artificial',
          whyStart: 'Modelos base são úteis, mas sistemas arquitetados com contexto (RAG) são transformacionais. Aprenda a conectar bancos vetoriais, LLMs e APIs tradicionais.',
          descricao: 'Design de sistemas distribuídos, RAG, Bancos Vetoriais e Fine-Tuning.',
          contexto: `Foco: fundamentos da engenharia de software aplicada a Modelos Fundacionais.
O aluno quer construir os sistemas. Ele é (ou será) um Arquiteto de IA ou AI Engineer.
Abordagem obrigatória:
- Explique o mecanismo de RAG e bancos vetoriais (embeddings, cosine similarity) estruturalmente.
- Debata a diferença entre Fine-Tuning e In-Context Learning (RAG), e quando usar cada um.
- Latência, custo de inferência e limites de tokens são as restrições principais; ensine a otimizar ao redor delas.`,
          fases: [
            {
              nome: 'Fase 1: Fundamentos da Inferência',
              topicos: [
                'A Anatomia de um LLM: Transformers e Atenção',
                'Tokenização e Cálculo de Custos de Inferência',
                'Engenharia de Prompting Avançada (Few-Shot, CoT)',
                'Limites Cognitivos dos LLMs (Alucinação e Janela de Contexto)'
              ]
            },
            {
              nome: 'Fase 2: Arquitetura e RAG',
              topicos: [
                'Embeddings e Representação Vetorial de Dados',
                'Construindo Pipelines RAG (Retrieval-Augmented Generation)',
                'Fine-Tuning vs In-Context Learning: Trade-offs',
                'Tool Calling e Orquestração de Agentes (LangChain/LlamaIndex)'
              ]
            }
          ]
        },
        {
          slug: 'mlops-engenharia-modelos',
          nome: 'MLOps & Engenharia de Modelos',
          emoji: '⚙️',
          parent: 'inteligencia-artificial',
          whyStart: 'Saber treinar um modelo não é suficiente — você precisa colocá-lo em produção de forma confiável, escalável e barata sem destruir os cofres da empresa.',
          descricao: 'Treinamento, Fine-Tuning, Deploy escalável e monitoramento de modelos em produção.',
          contexto: `Foco: infraestrutura e engenharia pesada de Machine Learning.
O aluno quer colocar modelos em produção com segurança, escala e baixo custo de inferência.
Abordagem obrigatória:
- Explique os gargalos de memória (VRAM) e técnicas de quantização (LoRA, QLoRA) estruturalmente.
- O foco é pipeline: como o dado entra, é processado, treina o modelo, e como o modelo serve previsões.`,
          fases: [
            {
              nome: 'Fase 1: Preparação e Treinamento',
              topicos: [
                'Pipelines de Dados para Treinamento',
                'Técnicas de Fine-Tuning (SFT, RLHF)',
                'Quantização e Otimização de Pesos (LoRA, GGML)',
                'Avaliação de Modelos (Benchmarks e Evals)'
              ]
            },
            {
              nome: 'Fase 2: Infraestrutura e Produção',
              topicos: [
                'Deploy de Modelos (HuggingFace, vLLM, TensorRT)',
                'Monitoramento de Data Drift e Model Decay',
                'Orquestração de GPUs e Custos de Nuvem',
                'Segurança em APIs de Modelos Abertos'
              ]
            }
          ]
        },
        {
          slug: 'ia-multimodal',
          nome: 'IA Generativa Multimodal',
          emoji: '🎨',
          parent: 'inteligencia-artificial',
          whyStart: 'Com as fundações teóricas prontas, explore a fronteira da geração visual, auditiva e 3D. A visão computacional e o áudio são tão transformadores quanto o texto.',
          descricao: 'Domínio sobre geração de Imagem, Áudio, Vídeo e 3D usando modelos fundacionais.',
          contexto: `Foco: a fronteira criativa e sensorial da inteligência artificial.
Abordagem obrigatória:
- Explique o modelo de difusão (Diffusion Models) e espaços latentes antes de dar prompts de imagem.
- Mostre como controlar a geração (ControlNet, Seed, CFG Scale).`,
          fases: [
            {
              nome: 'Fase 1: Síntese Visual',
              topicos: [
                'Como funcionam os Modelos de Difusão',
                'Engenharia de Imagem Avançada (Midjourney, Stable Diffusion)',
                'Controle e Consistência (ControlNet, IP-Adapter)',
                'Geração de Vídeo e Interpolação (Runway, Sora, Pika)'
              ]
            },
            {
              nome: 'Fase 2: Áudio e Espacial',
              topicos: [
                'Clonagem de Voz e Síntese de Fala (TTS)',
                'Geração Musical e Sound Design (Suno, Udio)',
                'Modelos de Geração 3D e NeRFs',
                'Visão Computacional Aplicada a Negócios'
              ]
            }
          ]
        },
        {
          slug: 'ia-para-founders',
          nome: 'Estratégia Corporativa de IA',
          emoji: '♟️',
          parent: 'inteligencia-artificial',
          whyStart: 'Saber como funciona é diferente de saber quando usar. Aqui você foca em ROI, defesa competitiva contra gigantes tech e alinhamento do negócio com a IA.',
          descricao: 'Estratégia corporativa, ROI de IA e liderança de times AI-first.',
          contexto: `Foco: visão estratégica e econômica da IA. 
O aluno é um founder, executivo ou líder. Não ensine a codar LLMs aqui; ensine como a IA corta custos, escala operações e cria novos modelos de negócios.
Abordagem obrigatória:
- Toda automação deve ser justificada por um ROI (Retorno sobre Investimento) ou ganho de eficiência estrutural.
- Explique os riscos de dependência de fornecedores (OpenAI vs Open Source) na visão de negócios.
- Ensine a avaliar o impacto da IA na cadeia de valor da empresa.`,
          fases: [
            {
              nome: 'Fase 1: O Custo Cognitivo e a Automação',
              topicos: [
                'O Paradigma da Empresa AI-First',
                'Mapeamento de Gargalos Cognitivos na Operação',
                'ROI de Automação: Quando usar humanos vs agentes',
                'Riscos Estratégicos: Lock-in de Plataforma e Privacidade'
              ]
            },
            {
              nome: 'Fase 2: Estruturação de Times e Processos',
              topicos: [
                'Contratando e Gerenciando "AI Engineers" e Pedreiros de Prompt',
                'Redesenho de Processos (BPR) com Agentes Autônomos',
                'Defesa Competitiva na Era dos Modelos de Código Aberto',
                'Implementação Cultural: Vencendo a resistência interna'
              ]
            }
          ]
        },
        {
          slug: 'etica-seguranca-ia',
          nome: 'Segurança, Ética & Alinhamento',
          emoji: '🛡️',
          parent: 'inteligencia-artificial',
          whyStart: 'A fronteira final. Construir inteligência traz responsabilidade cibernética e ética extrema. Modelos alucinando ou enviesados destroem a empresa — proteja-os.',
          descricao: 'AI Safety, regulamentação, mitigação de viés e defesa contra ataques adversariais.',
          contexto: `Foco: as grades de proteção da inteligência artificial.
O aluno precisa garantir que a IA não cause danos legais, sociais ou operacionais.
Abordagem obrigatória:
- Explique o problema de alinhamento (Alignment Problem) estruturalmente.
- Ensine Red Teaming: como invadir modelos para protegê-los.`,
          fases: [
            {
              nome: 'Fase 1: Vulnerabilidades Técnicas',
              topicos: [
                'Prompt Injection e Jailbreaks',
                'Data Poisoning e Ataques Adversariais',
                'Vazamento de Dados Pessoais (PII) em LLMs',
                'Práticas de Red Teaming em IA'
              ]
            },
            {
              nome: 'Fase 2: Governança e Ética',
              topicos: [
                'O Problema do Alinhamento (Alignment Problem)',
                'Mitigação de Viés e Fairness',
                'Regulamentação e Compliance (AI Act, LGPD/GDPR aplicadas à IA)',
                'Direitos Autorais e Propriedade Intelectual Sintética'
              ]
            }
          ]
        }
      ]
    },
    {
      slug: 'produto-inovacao',
      nome: 'Produto & Inovação Digital',
      emoji: '📦',
      isCategory: true,
      parent: 'tecnologia-hub',
      whyStart: 'Código rodando e IA prevendo o futuro não servem de nada se não resolvem dores humanas reais. Aqui você une engenharia e pessoas para criar e inovar produtos desejados.',
      descricao: 'Product Management, UX/UI e descentralização Web3.',
      children: [
        {
          slug: 'product-management',
          nome: 'Gestão de Produto Digital (PM)',
          emoji: '🎯',
          parent: 'produto-inovacao',
          layout: 'split',
          widget: 'UserStoryBuilder',
          whyStart: 'Com engenharia e design como base, você aprende a decidir O QUE construir. PM é a ponte entre negócio, tecnologia e usuário — evitando a construção de ferramentas irrelevantes.',
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
          slug: 'design',
          nome: 'Design Visual & UX',
          emoji: '◑',
          parent: 'produto-inovacao',
          whyStart: 'O melhor algoritmo do mundo fracassa se a interface do usuário (UX) for ruim. Compreenda hierarquia, gestalt e como modelar a percepção do usuário sobre sua aplicação.',
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
          slug: 'web3-cripto',
          nome: 'Cripto & Web3',
          emoji: '⛓️',
          parent: 'produto-inovacao',
          whyStart: 'A fronteira da descentralização. Com a stack tecnológica dominada, você explora o paradigma que muda a relação entre software, dinheiro e confiança. Foco no mecanismo — não na especulação.',
          descricao: 'Criptografia, Blockchain, DeFi e contratos inteligentes.',
          contexto: `Foco: os fundamentos técnicos da descentralização. Evite o viés de investimento e especulação; foque no mecanismo do consenso e da imutabilidade.`,
          ementa: [
            'O Problema do Gasto Duplo e o Bitcoin',
            'Algoritmos de Consenso (PoW vs PoS)',
            'Ethereum e Smart Contracts',
            'DeFi (Finanças Descentralizadas)',
            'Tokenomics e Governança'
          ]
        }
      ]
    }
  ]
};
