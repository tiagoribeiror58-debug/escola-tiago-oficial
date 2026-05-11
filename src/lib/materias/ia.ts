import { MateriaConfig } from '@/types';

export const iaHub: MateriaConfig = {
  slug: 'ia-hub',
  nome: 'Inteligência Artificial',
  emoji: '🤖',
  isCategory: true,
  descricao: 'Hub central para o domínio da IA. Estratégia, arquitetura de sistemas e operação diária.',
  children: [
    {
      slug: 'ia-operacional',
      nome: 'IA Operacional (Pedreiro de Prompt)',
      emoji: '👷',
      parent: 'ia-hub',
      whyStart: 'Comece aqui. Sem teoria prévia, você já ganha produtividade real na primeira semana. É o atalho mais curto entre zero e resultado concreto — e vai te dar vocabulário prático para entender tudo que vem depois.',
      descricao: 'Uso diário para ganho massivo de eficiência pessoal. Fluxos de trabalho, GPT, Claude, Midjourney.',
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
          nome: 'Fase 2: Multimodal e Fluxos Complexos',
          topicos: [
            'Geração de Imagens e Consistência (Midjourney/DALL-E)',
            'Análise de Dados Avançada (Code Interpreter)',
            'Automações No-Code conectadas a IA (Zapier/Make + OpenAI)',
            'Criação de Prompts Dinâmicos (Templates)'
          ]
        }
      ]
    },
    {
      slug: 'ia-para-founders',
      nome: 'IA para Founders',
      emoji: '♟️',
      parent: 'ia-hub',
      whyStart: 'Depois de operar a IA no dia a dia, o próximo passo é entender o jogo estratégico: onde a IA cria vantagem competitiva real, onde ela é hype, e como tomar decisões de negócio baseadas nisso — não em modismo.',
      descricao: 'Estratégia, automação corporativa, ROI de IA e liderança de times AI-first.',
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
      slug: 'arquitetura-solucoes-ia',
      nome: 'Arquitetura de Soluções com IA',
      emoji: '🏗️',
      parent: 'ia-hub',
      whyStart: 'Agora você entende a estratégia. É hora de aprender a construir os sistemas. Esta etapa transforma você de usuário de IA em arquiteto — alguém que projeta como modelos, dados e pipelines se conectam.',
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
          nome: 'Fase 2: Arquitetura de Sistemas Híbridos',
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
      slug: 'ciencia-dados-preditiva',
      nome: 'Machine Learning Clássico & Preditivo',
      emoji: '📊',
      parent: 'ia-hub',
      whyStart: 'LLMs são só uma fatia da IA. Dados tabulares, regressões e árvores de decisão ainda resolvem 80% dos problemas reais de negócio — muitas vezes melhor e mais barato que um modelo generativo. Aqui você aprende a escolher a ferramenta certa.',
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
      slug: 'mlops-engenharia-modelos',
      nome: 'MLOps & Engenharia de Modelos',
      emoji: '⚙️',
      parent: 'ia-hub',
      whyStart: 'Saber construir um modelo não é suficiente — você precisa colocá-lo em produção de forma confiável, escalável e barata. Esta etapa é onde a maioria dos projetos de IA fracassam: na hora de entregar.',
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
      parent: 'ia-hub',
      whyStart: 'Com infra e modelos dominados, você expande para a fronteira criativa: imagem, vídeo, áudio e 3D. Esta etapa é onde IA vira superpoder para criadores, diretores de arte e desenvolvedores de mídia.',
      descricao: 'Domínio sobre geração de Imagem, Áudio, Vídeo e 3D usando modelos fundacionais.',
      contexto: `Foco: a fronteira criativa da inteligência artificial.
O aluno é um criador, diretor de arte ou desenvolvedor de mídia sintética.
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
            'Avatares e Sincronia Labial (Lip-sync)'
          ]
        }
      ]
    },
    {
      slug: 'etica-seguranca-ia',
      nome: 'Segurança, Ética & Alinhamento',
      emoji: '🛡️',
      parent: 'ia-hub',
      whyStart: 'Esta é a etapa final — e não é opcional. Quem constrói sistemas de IA sem entender seus riscos cria bombas-relógio legais, reputacionais e técnicas. Você termina o hub sabendo como proteger o que construiu.',
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
            'Regulamentação e Compliance (AI Act, GDPR)',
            'Direitos Autorais e Propriedade Intelectual Sintética'
          ]
        }
      ]
    }
  ]
};
