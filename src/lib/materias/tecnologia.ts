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
      whyStart: 'Você não pode inovar com IA sem antes entender como os computadores pensam, como a internet funciona e como os dados são estruturados.',
      descricao: 'Engenharia de Software, Cloud e estruturação de dados.',
      children: [
        {
          slug: 'programacao',
          nome: 'Engenharia de Software',
          emoji: '<>',
          parent: 'computacao-fundamentos',
          whyStart: 'A base de tudo digital. Entender raciocínio computacional muda como você pensa e resolve problemas.',
          descricao: 'Da lógica de base à arquitetura de sistemas distribuídos.',
          contexto: `Foco: raciocínio computacional — lógica, estruturas, arquitetura.

Abordagem obrigatória:
- Explique o conceito ou padrão antes de apresentar o problema.
- Para bugs: não corrija. Faça perguntas que levem o aluno ao mecanismo do erro.
- Código vem depois de compreensão do padrão.`,
          ementa: [
            'Lógica de Programação e Algoritmos',
            'Estruturas de Dados Básicas',
            'Arquitetura Frontend (React/SPA)',
            'Arquitetura Backend (APIs, REST)',
            'Bancos de Dados Relacionais vs NoSQL',
            'Design Patterns e Clean Code',
            'Complexidade de Algoritmos (Big O Notation)',
            'Estruturas de Dados Avançadas: Árvores, Grafos, Heaps',
            'Recursão e Programação Dinâmica',
            'Arquitetura de Software: SOLID e DRY',
            'Testes Automatizados: Unit, Integration e E2E',
            'Versionamento com Git: Branching e Merge Strategies',
            'Autenticação e Autorização (JWT, OAuth)',
            'WebSockets e Comunicação em Tempo Real',
            'Segurança Web: SQL Injection, XSS, CSRF',
            'Performance: Caching, CDN e Lazy Loading',
            'Princípios de API Design (REST, GraphQL, gRPC)'
          ],
          layout: 'split',
          widget: 'CodeLab'
        },
        {
          slug: 'cloud-devops',
          nome: 'Cloud Computing & DevOps',
          emoji: '☁️',
          parent: 'computacao-fundamentos',
          whyStart: 'Produto funcionando para 10 usuários é diferente de funcionar para 1 milhão. Esta etapa ensina a escalar infraestrutura com confiabilidade.',
          descricao: 'Arquitetura de servidores, CI/CD, Docker e escalabilidade.',
          contexto: `Foco: infraestrutura e segurança da informação. Abordagem técnica para quem quer atuar como Tech Lead ou CTO.`,
          ementa: [
            'Introdução à Nuvem (AWS, GCP, Azure)',
            'Virtualização e Containers (Docker, K8s)',
            'Integração e Entrega Contínua (CI/CD)',
            'Arquitetura de Microserviços vs Monolitos',
            'Segurança da Informação e CyberSecurity',
            'Infrastructure as Code (Terraform, Pulumi)',
            'Kubernetes: Orquestração de Containers',
            'Observabilidade: Logs, Métricas e Traces',
            'SRE (Site Reliability Engineering)',
            'FinOps: Gerenciando Custos na Nuvem',
            'Disaster Recovery e Alta Disponibilidade',
            'Serverless: Functions as a Service',
            'Service Mesh e API Gateway',
            'Segurança em Cloud: IAM, VPC e Zero Trust',
            'GitOps: Infraestrutura Declarativa'
          ]
        },
        {
          slug: 'dados-analytics',
          nome: 'Engenharia de Dados & Analytics',
          emoji: '📊',
          parent: 'computacao-fundamentos',
          whyStart: 'Com infraestrutura no ar, os dados começam a fluir. Antes de treinar IAs complexas, você precisa saber capturar, limpar e armazenar esses dados em escala.',
          descricao: 'Pipelines de dados, Business Intelligence e infraestrutura analítica.',
          contexto: `Foco: transformar dados brutos em repositórios prontos para análise. Explique o fluxo de ETL e a diferença entre data lake e data warehouse.`,
          ementa: [
            'O Pipeline de Dados (ETL/ELT)',
            'Data Warehouses vs Data Lakes',
            'SQL para Análise de Dados',
            'Modelagem Dimensional (Star Schema)',
            'Visualização de Dados e Dashboards',
            'Ingestão de Dados em Tempo Real (Kafka, Kinesis)',
            'Lakehouse Architecture (Delta Lake, Iceberg)',
            'dbt: Transformações de Dados Declarativas',
            'Orquestração com Airflow',
            'Data Quality e Catalogação',
            'Analytics Engineering: A Ponte entre Dados e Negócio',
            'Streaming Analytics com Apache Flink',
            'Feature Store: Dados Prontos para ML',
            'Governança de Dados e LGPD',
            'Data Mesh: Descentralizando a Propriedade dos Dados'
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
          whyStart: 'Antes de entender os pesos matemáticos de um modelo, aprenda a usá-lo como ferramenta.',
          descricao: 'Uso diário para ganho massivo de eficiência pessoal. Fluxos de trabalho, GPT, Claude.',
          contexto: `Foco: táticas brutais de eficiência pessoal e fluxos de trabalho do dia a dia.
O aluno é um "Pedreiro de Prompt", quer resolver tarefas rapidamente, de forma pragmática.`,
          ementa: [
            'O Mindset do Operador Centauro',
            'Anatomia de um Prompt de Alta Precisão (Role, Context, Constraints)',
            'Iteração e Refinamento de Contexto (Chaining)',
            'Automatizando Tarefas Repetitivas (Copywriting, Resumos, Emails)',
            'Few-Shot Prompting: Guiando com Exemplos',
            'Chain-of-Thought: Fazendo a IA Pensar em Voz Alta',
            'Prompts para Análise de Dados e Planilhas',
            'Usando IA para Pesquisa e Síntese de Informações',
            'Análise de Dados Avançada via Agentes (Code Interpreter)',
            'Automações No-Code conectadas a IA (Zapier/Make + OpenAI)',
            'Criação de Prompts Dinâmicos (Templates)',
            'Sistemas Multi-Agente Básicos',
            'Construindo GPTs Customizados',
            'API da OpenAI/Anthropic: Primeira Integração',
            'Avaliação de Outputs: Como Medir Qualidade da IA',
            'Custo de Token: Otimizando sua Fatura de API'
          ]
        },
        {
          slug: 'ciencia-dados-preditiva',
          nome: 'Machine Learning Clássico & Preditivo',
          emoji: '📈',
          parent: 'inteligencia-artificial',
          whyStart: 'LLMs são só uma fatia da IA. Dados tabulares, regressões e árvores de decisão ainda resolvem 80% dos problemas reais de negócio.',
          descricao: 'Análise de dados estatística, regressões, clusterização e árvores de decisão.',
          contexto: `Foco: extração de valor estatístico de dados tabulares. Nem tudo precisa de um LLM.`,
          ementa: [
            'Limpeza de Dados e Feature Engineering',
            'Regressão Linear e Logística (Os Fundamentos)',
            'Árvores de Decisão e Random Forests',
            'Clusterização e Segmentação (K-Means)',
            'Análise Exploratória de Dados (EDA)',
            'Seleção de Features: Correlação e Importância',
            'Tratamento de Dados Desbalanceados',
            'Encoding de Variáveis Categóricas',
            'Gradient Boosting (XGBoost, LightGBM)',
            'Séries Temporais e Previsão de Demanda',
            'Detecção de Anomalias (Fraudes e Risco)',
            'Interpretabilidade de Modelos (SHAP Values)',
            'AutoML: Automatizando a Seleção de Modelos',
            'Ensemble Methods: Combinando Modelos',
            'Redução de Dimensionalidade (PCA, UMAP)',
            'Sistemas de Recomendação',
            'Métricas de Avaliação: Precision, Recall, F1, AUC',
            'Validação Cruzada e Prevenção de Data Leakage',
            'Deploy de Modelos de ML com FastAPI',
            'Monitoramento de Modelos em Produção'
          ]
        },
        {
          slug: 'arquitetura-solucoes-ia',
          nome: 'Arquitetura de Sistemas Híbridos (RAG/LLM)',
          emoji: '🏗️',
          parent: 'inteligencia-artificial',
          whyStart: 'Modelos base são úteis, mas sistemas arquitetados com contexto (RAG) são transformacionais.',
          descricao: 'Design de sistemas distribuídos, RAG, Bancos Vetoriais e Fine-Tuning.',
          contexto: `Foco: fundamentos da engenharia de software aplicada a Modelos Fundacionais.
O aluno quer construir os sistemas. Ele é (ou será) um Arquiteto de IA ou AI Engineer.`,
          ementa: [
            'A Anatomia de um LLM: Transformers e Atenção',
            'Tokenização e Cálculo de Custos de Inferência',
            'Engenharia de Prompting Avançada (Few-Shot, CoT)',
            'Limites Cognitivos dos LLMs (Alucinação e Janela de Contexto)',
            'Escolhendo o Modelo Certo: Trade-offs de Qualidade/Custo',
            'Streaming de Respostas via SSE',
            'Structured Outputs: JSON Mode e Function Calling',
            'Embeddings e Representação Vetorial de Dados',
            'Construindo Pipelines RAG (Retrieval-Augmented Generation)',
            'Fine-Tuning vs In-Context Learning: Trade-offs',
            'Tool Calling e Orquestração de Agentes (LangChain/LlamaIndex)',
            'Bancos Vetoriais: Pinecone, Weaviate e pgvector',
            'Chunking Strategies para RAG de Alta Precisão',
            'Hybrid Search: Vetorial + BM25',
            'Avaliação de Sistemas RAG (RAGAS)',
            'Arquitetura de Agentes: ReAct, Plan-and-Execute',
            'Memória de Longo Prazo para Agentes',
            'Multi-Agent Systems: Crews e Swarms',
            'Computer Use: Agentes que Controlam Interfaces',
            'Guardrails: Como Conter Agentes Autônomos'
          ]
        },
        {
          slug: 'mlops-engenharia-modelos',
          nome: 'MLOps & Engenharia de Modelos',
          emoji: '⚙️',
          parent: 'inteligencia-artificial',
          whyStart: 'Saber treinar um modelo não é suficiente — você precisa colocá-lo em produção de forma confiável e escalável.',
          descricao: 'Treinamento, Fine-Tuning, Deploy escalável e monitoramento de modelos em produção.',
          contexto: `Foco: infraestrutura e engenharia pesada de Machine Learning.`,
          ementa: [
            'Pipelines de Dados para Treinamento',
            'Técnicas de Fine-Tuning (SFT, RLHF)',
            'Quantização e Otimização de Pesos (LoRA, GGML)',
            'Avaliação de Modelos (Benchmarks e Evals)',
            'DPO (Direct Preference Optimization): Alternativa ao RLHF',
            'Data Curation: Qualidade > Quantidade',
            'Synthetic Data Generation para Fine-Tuning',
            'Experimentos com MLflow e Weights & Biases',
            'Deploy de Modelos (HuggingFace, vLLM, TensorRT)',
            'Monitoramento de Data Drift e Model Decay',
            'Orquestração de GPUs e Custos de Nuvem',
            'Segurança em APIs de Modelos Abertos',
            'Batching de Inferência para Escala',
            'Continuous Training e Retraining Pipelines',
            'A/B Testing de Modelos em Produção',
            'SLAs de IA: Latência, Throughput e Disponibilidade'
          ]
        },
        {
          slug: 'ia-multimodal',
          nome: 'IA Generativa Multimodal',
          emoji: '🎨',
          parent: 'inteligencia-artificial',
          whyStart: 'Com as fundações teóricas prontas, explore a fronteira da geração visual, auditiva e 3D.',
          descricao: 'Domínio sobre geração de Imagem, Áudio, Vídeo e 3D usando modelos fundacionais.',
          contexto: `Foco: a fronteira criativa e sensorial da inteligência artificial.`,
          ementa: [
            'Como funcionam os Modelos de Difusão',
            'Engenharia de Imagem Avançada (Midjourney, Stable Diffusion)',
            'Controle e Consistência (ControlNet, IP-Adapter)',
            'Geração de Vídeo e Interpolação (Runway, Sora, Pika)',
            'Inpainting e Outpainting: Editando com IA',
            'LoRA para Estilos Consistentes',
            'Workflows no ComfyUI',
            'Clonagem de Voz e Síntese de Fala (TTS)',
            'Geração Musical e Sound Design (Suno, Udio)',
            'Modelos de Geração 3D e NeRFs',
            'Visão Computacional Aplicada a Negócios',
            'Modelos Multimodais Nativos (GPT-4o, Gemini)',
            'Real-time IA: Processamento de Stream de Vídeo'
          ]
        },
        {
          slug: 'ia-para-founders',
          nome: 'Estratégia Corporativa de IA',
          emoji: '♟️',
          parent: 'inteligencia-artificial',
          whyStart: 'Saber como funciona é diferente de saber quando usar. Aqui você foca em ROI, defesa competitiva e alinhamento do negócio com a IA.',
          descricao: 'Estratégia corporativa, ROI de IA e liderança de times AI-first.',
          contexto: `Foco: visão estratégica e econômica da IA. O aluno é um founder, executivo ou líder.`,
          ementa: [
            'O Paradigma da Empresa AI-First',
            'Mapeamento de Gargalos Cognitivos na Operação',
            'ROI de Automação: Quando usar humanos vs agentes',
            'Riscos Estratégicos: Lock-in de Plataforma e Privacidade',
            'Open Source vs Proprietário: Análise Estratégica',
            'Construindo um Roadmap de IA para sua Empresa',
            'Avaliando Ferramentas de IA: Critérios e Red Flags',
            'Casos de Uso de Maior ROI por Setor',
            'Contratando e Gerenciando "AI Engineers" e Pedreiros de Prompt',
            'Redesenho de Processos (BPR) com Agentes Autônomos',
            'Defesa Competitiva na Era dos Modelos de Código Aberto',
            'Implementação Cultural: Vencendo a resistência interna',
            'IA como Produto: Construindo Features com LLMs',
            'Métricas de Sucesso para Iniciativas de IA',
            'IA Agêntica: Orquestração de Agentes Autônomos em Escala',
            'Identidade Sintética e Validação de Realidade via Blockchain',
            'Soberania de Dados e IA Local: O Fim da Dependência de APIs'
            'Ética Corporativa na Adoção de IA'
          ]
        },
        {
          slug: 'etica-seguranca-ia',
          nome: 'Segurança, Ética & Alinhamento',
          emoji: '🛡️',
          parent: 'inteligencia-artificial',
          whyStart: 'A fronteira final. Construir inteligência traz responsabilidade cibernética e ética extrema.',
          descricao: 'AI Safety, regulamentação, mitigação de viés e defesa contra ataques adversariais.',
          contexto: `Foco: as grades de proteção da inteligência artificial.`,
          ementa: [
            'Prompt Injection e Jailbreaks',
            'Data Poisoning e Ataques Adversariais',
            'Vazamento de Dados Pessoais (PII) em LLMs',
            'Práticas de Red Teaming em IA',
            'Model Inversion e Membership Inference Attacks',
            'Defesas: Guardrails, Content Filtering e Input Sanitization',
            'Avaliação de Robustez de Modelos',
            'O Problema do Alinhamento (Alignment Problem)',
            'Mitigação de Viés e Fairness',
            'Regulamentação e Compliance (AI Act, LGPD/GDPR aplicadas à IA)',
            'Direitos Autorais e Propriedade Intelectual Sintética',
            'Superinteligência e Risco Existencial: O Debate Sério',
            'Governança de IA nas Empresas: Frameworks Práticos',
            'Transparência e Explicabilidade (XAI)'
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
      whyStart: 'Código rodando e IA prevendo o futuro não servem de nada se não resolvem dores humanas reais. Aqui você une engenharia e pessoas.',
      descricao: 'Product Management, UX/UI e descentralização Web3.',
      children: [
        {
          slug: 'product-management',
          nome: 'Gestão de Produto Digital (PM)',
          emoji: '🎯',
          parent: 'produto-inovacao',
          layout: 'split',
          widget: 'UserStoryBuilder',
          whyStart: 'Com engenharia e design como base, você aprende a decidir O QUE construir.',
          descricao: 'Descoberta de produto, priorização de backlog e métricas de engajamento.',
          contexto: `Foco: a ponte entre engenharia, negócios e design.`,
          ementa: [
            'O Papel do PM: Engenharia, UX e Negócios',
            'Product Discovery e Entrevistas de Usuário',
            'Frameworks de Priorização (RICE, Kano)',
            'Gestão de Backlog e Roadmap',
            'Métricas de Produto (AARRR, Cohorts, Churn)',
            'Jobs-to-be-Done (JTBD): A Teoria por Trás do Produto',
            'OKRs para Produto: Metas Aspiracionais',
            'Inception: Como Alinhar Time no Início de um Produto',
            'Testes de Usabilidade e Pesquisa Qualitativa',
            'Go-to-Market de Novas Features',
            'Dados em Produto: Analytics e Event Tracking',
            'Ciclo de Vida do Produto: Introdução a Declínio',
            'Platform Products vs End-User Products',
            'Produto Internacional: Localização e Adaptação',
            'Ethical Product Design: Dark Patterns e Responsabilidade'
          ]
        },
        {
          slug: 'design',
          nome: 'Design Visual & UX',
          emoji: '◑',
          parent: 'produto-inovacao',
          whyStart: 'O melhor algoritmo do mundo fracassa se a interface do usuário (UX) for ruim.',
          descricao: 'Hierarquia, tipografia, gestalt e design centrado no usuário.',
          contexto: `Foco: princípios estruturais do design — hierarquia, gestalt, percepção visual.

Abordagem obrigatória:
- Explique o princípio perceptivo ou cognitivo por trás de cada decisão de design.
- Só depois: peça que o aluno critique um design real.`,
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
            'Motion Design: Movimento com Propósito'
          ],
          layout: 'canvas',
          widget: 'DesignPreview'
        },
        {
          slug: 'web3-cripto',
          nome: 'Cripto & Web3',
          emoji: '⛓️',
          parent: 'produto-inovacao',
          whyStart: 'A fronteira da descentralização. Foco no mecanismo — não na especulação.',
          descricao: 'Criptografia, Blockchain, DeFi e contratos inteligentes.',
          contexto: `Foco: os fundamentos técnicos da descentralização. Evite o viés de investimento e especulação.`,
          ementa: [
            'O Problema do Gasto Duplo e o Bitcoin',
            'Algoritmos de Consenso (PoW vs PoS)',
            'Ethereum e Smart Contracts',
            'DeFi (Finanças Descentralizadas)',
            'Tokenomics e Governança',
            'Criptografia de Chave Pública: ECDSA e Hash Functions',
            'Merkle Trees e Integridade de Dados',
            'Solidity: Programando Smart Contracts',
            'NFTs: O Mecanismo Técnico (sem especulação)',
            'Layer 2: Rollups e Escalabilidade',
            'DAOs: Organizações Autônomas Descentralizadas',
            'Riscos: Rug Pulls, Hacks e Bugs em Contratos',
            'Regulamentação Cripto Global',
            'CBDCs: Moedas Digitais de Bancos Centrais',
            'ZK Proofs: Privacidade sem Revelar Informação'
          ]
        }
      ]
    }
  ]
};
