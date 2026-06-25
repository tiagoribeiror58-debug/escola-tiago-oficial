import { MateriaConfig } from '@/types';

export const iaHub: MateriaConfig = {
  slug: 'ia-hub',
  nome: 'Inteligência Artificial',
  emoji: '🤖',
  isCategory: true,
  descricao: 'With a solid computational foundation, you advance to the algorithmic frontier. Here you stop just coding rules to teach systems to learn.',
  contexto: `PERSONA:
You are a former DeepMind applied ML researcher who published papers on attention mechanisms and is now building real AI products. You separate hype from mechanism — you explain the math under the hood before anyone touches a library. You have seen too many engineers who can call an API but cannot explain why the model fails. Never break this frame. You are not a generic AI — you are this specialist.`,
  children: [

    {
      slug: 'ciencia-dados-preditiva',
      nome: 'Machine Learning Clássico e Preditivo',
      emoji: '📈',
      parent: 'ia-hub',
      whyStart: 'LLMs are only a slice of AI. Tabular data, regressions, and decision trees still solve 80% of real business problems.',
      descricao: 'Statistical data analysis, regressions, clustering, and decision trees.',
      contexto: `PERSONA:
You are a machine learning engineer with 10 years in production ML. You have deployed models that actually run in the real world — not just Jupyter notebooks. You know where academic theory fails in practice: class imbalance that was never in the paper, data drift that kills the model 3 months post-launch, latency constraints that make the elegant solution unusable. Never break this frame. You are not a generic AI — you are this specialist.

Focus: extracting statistical value from tabular data. Not everything needs an LLM.`,
      ementa: [
        // === EXISTENTES ===
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
        'Monitoramento de Modelos em Produção',
        // === NOVOS ===
        'Redes Neurais Introdutórias: Perceptron ao MLP',
        'Support Vector Machines (SVM) e Kernel Trick',
        'Naive Bayes e Classificação de Texto',
        'Processamento de Linguagem Natural Clássico (NLP pré-Transformers)',
        'Análise de Sobrevivência (Survival Analysis)',
        'Bayesian Optimization para Hiperparâmetros',
        'Causal Inference: Correlação vs Causalidade em Dados',
        'Augmented Analytics: IA Automatizando Análise de Dados',
        'Feature Store: Centralizando Features para Reutilização',
        'Teste A/B Estatístico: Power Analysis e Significância'
      ]
    },
    {
      slug: 'deep-learning',
      nome: 'Deep Learning e Redes Neurais',
      emoji: '🧠',
      parent: 'ia-hub',
      whyStart: 'After mastering classical ML, you need to understand the deep neural networks that made LLMs, computer vision, and image generation possible.',
      descricao: 'Convolutional neural networks, recurrent networks, Transformers, and the mathematical foundations of modern AI.',
      contexto: `PERSONA:
You are a machine learning engineer with 10 years in production ML. You have deployed models that actually run in the real world — not just Jupyter notebooks. You understand the gap between a beautiful architecture diagram and a gradient that explodes at batch 4000. You explain gradients visually before writing a single formula. Never break this frame. You are not a generic AI — you are this specialist.

Focus: deep learning foundations for those who want to understand what lies beneath LLMs.
O aluno precisa de álgebra linear e cálculo básico. Explique gradientes de forma visual antes de fórmulas.`,
      ementa: [
        'Neurônio Artificial e Função de Ativação',
        'Redes Feedforward (MLP) e Backpropagation',
        'Gradient Descent: SGD, Adam e Learning Rate Scheduling',
        'Overfitting e Regularização (Dropout, L1/L2, Early Stopping)',
        'Redes Neurais Convolucionais (CNNs) para Imagens',
        'Redes Neurais Recorrentes (RNNs) e LSTMs',
        'Arquitetura Transformer: Atenção é Tudo que Você Precisa',
        'Self-Attention e Multi-Head Attention na Prática',
        'Positional Encoding e Janela de Contexto',
        'Transfer Learning: Reutilizando Modelos Pré-Treinados',
        'Batch Normalization e Técnicas de Treinamento',
        'Autoencoders e Representação Latente',
        'GANs (Generative Adversarial Networks): Conceito e Aplicações',
        'Loss Functions: Cross-Entropy, MSE e Contrastive Loss',
        'Frameworks: PyTorch vs TensorFlow (Quando usar qual)',
        'GPU Computing: CUDA, cuDNN e Aceleração de Treinamento',
        // === 2026 ===
        'Mixture of Experts (MoE): A Arquitetura Dominante dos Grandes Modelos',
        'State Space Models (SSMs) e Mamba: Alternativas ao Transformer',
        'Reward Modeling e RLHF: Alinhando Modelos com Preferências Humanas',
        'Knowledge Distillation: Comprimindo Modelos Grandes em Pequenos'
      ]
    },
    {
      slug: 'arquitetura-solucoes-ia',
      nome: 'Arquitetura de Sistemas Híbridos (RAG/LLM)',
      emoji: '🏗️',
      parent: 'ia-hub',
      whyStart: 'Modelos base são úteis, mas sistemas arquitetados com contexto (RAG) são transformacionais.',
      descricao: 'Design de sistemas distribuídos, RAG, Bancos Vetoriais e Fine-Tuning.',
      contexto: `PERSONA:
You are an AI engineer specializing in LLM applications who built production agent systems before it was mainstream. You know the failure modes by heart: context window overflows, hallucinations that slip through guardrails, retrieval that returns the right documents in the wrong order. You are deeply skeptical of demos and deeply focused on evals. Never break this frame. You are not a generic AI — you are this specialist.

Focus: software engineering foundations applied to Foundational Models.
O aluno quer construir os sistemas. Ele é (ou será) um Arquiteto de IA ou AI Engineer.`,
      ementa: [
        // === EXISTENTES ===
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
        // === NOVOS ===
        'GraphRAG: Combinando Grafos de Conhecimento com Vetores',
        'Agentic RAG: Retrieval Ativo e Adaptativo',
        'Query Routing e Multi-Index Strategies',
        'Reranking: Cross-Encoders e Modelos de Reordenação',
        'Context Window Management: Compressão e Sumarização',
        'LLM-Agnostic Architecture: Evitando Vendor Lock-in',
        'Model Context Protocol (MCP): Padrão Universal de Conectividade',
        'Durable Execution para Agentes (Temporal, Inngest)',
        'Self-Correcting Agents: Reflection e Auto-Avaliação',
        'Human-in-the-Loop: Quando o Agente Precisa de Aprovação',
        'Caching de Inferência: KV Cache e Semantic Cache',
        'Multimodal RAG: Indexando Imagens, PDFs e Vídeo',
        'Evaluation-Driven Development: Evals como Testes Unitários de IA',
        'Arquiteturas de Chat: Histórico, Resumo e Janela Deslizante',
        'Voice Agents: Pipelines de Voz para Agentes (STT + LLM + TTS)',
        // === 2026 ===
        'Computer Use Avançado: Agentes Controlando Browsers (Playwright + Claude)',
        'Roteamento de Intenção Semântica: Classificadores Ultra-Rápidos para Decisão',
        'A2A (Agent-to-Agent Protocol): Comunicação entre Agentes de Diferentes Provedores',
        'Currículo Vivo: Sistemas que Geram Conhecimento Dinâmico via Busca em Tempo Real'
      ]
    },
    {
      slug: 'mlops-engenharia-modelos',
      nome: 'MLOps e Engenharia de Modelos',
      emoji: '⚙️',
      parent: 'ia-hub',
      whyStart: 'Saber treinar um modelo não é suficiente — você precisa colocá-lo em produção de forma confiável e escalável.',
      descricao: 'Training, Fine-Tuning, scalable deployment, and monitoring of models in production.',
      contexto: `PERSONA:
You are a machine learning engineer with 10 years in production ML. You have deployed models that actually run in the real world — not just Jupyter notebooks. You know that training a model is 20% of the work; the other 80% is infrastructure, monitoring, and keeping it alive when the world changes. You build systems, not experiments. Never break this frame. You are not a generic AI — you are this specialist.

Focus: infrastructure and heavy Machine Learning engineering.`,
      ementa: [
        // === EXISTENTES ===
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
        'SLAs de IA: Latência, Throughput e Disponibilidade',
        // === NOVOS ===
        'Distributed Training: Data Parallelism e Model Parallelism',
        'ONNX: Formato Universal para Portabilidade de Modelos',
        'Edge Deployment: Rodando Modelos em Dispositivos (ONNX Runtime, Core ML)',
        'Model Registry: Versionamento e Governança de Modelos',
        'Feature Pipelines em Tempo Real (Feast, Tecton)',
        'Prompt Management em Produção: Versionamento e Rollback',
        'LLMOps: CI/CD Específico para Pipelines de LLM',
        'Cost Management: Otimizando Gastos com GPU e Inferência',
        'Canary Deployments para Modelos de ML',
        'Observabilidade de LLMs: LangSmith, Langfuse, Phoenix',
        // === 2026 ===
        'Inferência Especulativa (Speculative Decoding): Acelerando LLMs 2-4x',
        'Mixture of Agents: Orquestrando Múltiplos LLMs em Cascata',
        'Serverless GPU: Plataformas de Inferência Sob Demanda (Modal, Replicate, Together)'
      ]
    },
    {
      slug: 'ia-multimodal',
      nome: 'IA Generativa Multimodal',
      emoji: '🎨',
      parent: 'ia-hub',
      whyStart: 'With the theoretical foundations ready, explore the frontier of visual, auditory, and 3D generation.',
      descricao: 'Mastery over Image, Audio, Video, and 3D generation using foundational models.',
      contexto: `PERSONA:
You are a machine learning engineer with 10 years in production ML who has specialised in generative and multimodal systems. You understand diffusion at the math level and can explain why ControlNet works by talking about conditioning signals, not magic. You separate what is technically possible from what is stable enough to ship. Never break this frame. You are not a generic AI — you are this specialist.

Focus: the creative and sensory frontier of artificial intelligence.`,
      ementa: [
        // === EXISTENTES ===
        'Como funcionam os Modelos de Difusão',
        'Engenharia de Imagem Avançada (Midjourney, Stable Diffusion)',
        'Controle e Consistência (ControlNet, IP-Adapter)',
        'Geração de Vídeo com IA (Veo 3, Kling AI, Wan2.1, Runway)',
        'Inpainting e Outpainting: Editando com IA',
        'LoRA para Estilos Consistentes',
        'Workflows no ComfyUI',
        'Clonagem de Voz e Síntese de Fala (TTS)',
        'Geração Musical e Sound Design (Suno, Udio)',
        'Modelos de Geração 3D e NeRFs',
        'Visão Computacional Aplicada a Negócios',
        'Modelos Multimodais Nativos (GPT-4o, Gemini)',
        'Real-time IA: Processamento de Stream de Vídeo',
        // === NOVOS ===
        'Flow Matching: A Nova Geração de Modelos Generativos',
        'Consistência de Personagens: Estilos e Identidades em Série',
        'Gaussian Splatting: Alternativa aos NeRFs para 3D',
        'Lip Sync e Avatares Digitais em Tempo Real',
        'Tradução e Dublagem Automática com Preservação de Voz',
        'Document AI: Extração Inteligente de PDFs e Imagens',
        'OCR Avançado com Modelos de Visão (Vision LLMs)',
        'Text-to-CAD e Geração de Modelos Industriais',
        'IA para Motion Capture sem Sensores',
        'Pipelines de Produção Audiovisual com IA'
      ]
    },
    {
      slug: 'ia-para-founders',
      nome: 'Estratégia Corporativa de IA',
      emoji: '♟️',
      parent: 'ia-hub',
      whyStart: 'Knowing how it works is different from knowing when to use it. Here you focus on ROI, competitive defense, and aligning business with IA.',
      descricao: 'Corporate strategy, AI ROI, and leading AI-first teams.',
      contexto: `PERSONA:
You are a former DeepMind applied ML researcher who now advises executives and founders on AI strategy. You have seen the inside of the technology and the inside of the boardroom. You do not oversell. You explain ROI with real numbers, flag the risks that vendors won't mention, and have zero interest in AI for its own sake — only in AI that creates measurable business value. Never break this frame. You are not a generic AI — you are this specialist.

Focus: visão estratégica e econômica da IA. O aluno é um founder, executivo ou líder.`,
      ementa: [
        // === EXISTENTES ===
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
        'Soberania de Dados e IA Local: O Fim da Dependência de APIs',
        'Ética Corporativa na Adoção de IA',
        // === NOVOS ===
        'IA e Margem Bruta: Impacto nos Unit Economics',
        'Build vs Buy vs Fine-Tune: Framework de Decisão',
        'Compliance de IA: EU AI Act, LGPD e Regulação Global',
        'AI Governance Board: Estruturando Comitê Interno de IA',
        'Upskilling: Treinando Equipes Não-Técnicas para Usar IA',
        'IA para Customer Success: Reduzindo Churn com Automação',
        'Competitive Intelligence com IA: Monitoramento de Mercado',
        'Total Cost of Ownership (TCO) de Soluções de IA'
      ]
    },
    {
      slug: 'etica-seguranca-ia',
      nome: 'Segurança, Ética e Alinhamento',
      emoji: '🛡️',
      parent: 'ia-hub',
      whyStart: 'The final frontier. Building intelligence brings cyber responsibility and extreme ethics.',
      descricao: 'AI Safety, regulation, bias mitigation, and defense against adversarial attacks.',
      contexto: `PERSONA:
You are an AI engineer specializing in LLM applications who has made security and alignment your primary focus. You have run red-team exercises, found prompt injection vulnerabilities in production systems, and written the post-mortems. You do not moralize — you identify attack surfaces and mitigation strategies with the same rigor as any other engineering problem. Never break this frame. You are not a generic AI — you are this specialist.

Focus: as grades de proteção da inteligência artificial.`,
      ementa: [
        // === EXISTENTES ===
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
        'Transparência e Explicabilidade (XAI)',
        // === NOVOS ===
        'Deepfakes: Detecção e Mitigação',
        'Watermarking de Conteúdo Gerado por IA',
        'Sandboxing de Agentes: Isolamento e Permissões',
        'Auditoria de Modelos: Testes de Fairness em Escala',
        'Responsible AI by Design: Checklist para Lançamento',
        'Shadow AI: Riscos do Uso Não-Autorizado de IA nas Empresas',
        'Supply Chain Attack em Modelos Open Source',
        'Constitutional AI: Treinando Modelos com Princípios Éticos'
      ]
    }
  ]
};
