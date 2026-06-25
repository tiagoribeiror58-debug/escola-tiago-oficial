import { MateriaConfig } from '@/types';

export const primeirosprincipiosHub: MateriaConfig = {
  slug: 'primeiros-principios',
  nome: 'Primeiros Princípios',
  emoji: '⚛️',
  isCategory: true,
  descricao: 'The root scientific path. Mathematics, logic, and architectures that ground all artificial intelligence — taught from the atom to the transformer.',
  children: [
    {
      slug: 'matematica-ia',
      nome: 'Matemática da Inteligência Artificial',
      emoji: '∑',
      isCategory: true,
      parent: 'primeiros-principios',
      whyStart: 'A IA não é magia — é álgebra linear e cálculo executados bilhões de vezes. Sem entender o mecanismo matemático, você nunca saberá por que um modelo falha ou aprende.',
      descricao: 'Os três pilares matemáticos que sustentam todo modelo de machine learning.',
      children: [
        {
          slug: 'algebra-linear',
          nome: 'Álgebra Linear',
          emoji: '▦',
          parent: 'matematica-ia',
          whyStart: 'Cada camada de uma rede neural é uma multiplicação de matrizes. Vetores, transformações lineares e espaços dimensionais são o vocabulário básico da IA.',
          descricao: 'Vectors, matrices, linear transformations, and spaces that describe data and weights.',
          contexto: `PERSONA:\nYou are a theoretical computer scientist and mathematician who builds AI from scratch. You teach the absolute root fundamentals: from the physics of computation up to the architecture of large language models. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus: the real mechanics of linear algebra — not memorizing formulas.

Mandatory approach:
- Always start with GEOMETRIC INTUITION: a vector is an arrow in space. A matrix is a transformation of that space.
- Never present an operation without first showing WHAT IT DOES VISUALLY to the space.
- When teaching matrix multiplication, explain that it is a COMPOSITION of transformations.
- Always connect the concept to its role in a neural network.`,
          ementa: [
            'O que é um Vetor (intuição geométrica e notação)',
            'Operações Vetoriais: Soma, Subtração e Escalonamento',
            'Produto Escalar (Dot Product) e Similaridade',
            'Norma e Distância entre Vetores',
            'Projeção Vetorial e Ortogonalidade',
            'Espaço Vetorial e Subespaços',
            'Combinação Linear e Dependência Linear',
            'O que uma Matriz Faz ao Espaço (rotação, escala, reflexão)',
            'Multiplicação de Matrizes como Composição de Transformações',
            'Matriz Transposta e por que ela importa',
            'Matriz Identidade e Inversas',
            'Autovalores e Autovetores (a direção que não muda)',
            'Decomposição Espectral',
            'SVD (Singular Value Decomposition)',
            'Determinante: O Volume da Transformação',
            'Como uma Camada Densa é uma Multiplicação de Matrizes',
            'Embeddings como Vetores em Espaço de Alta Dimensão',
            'Cosine Similarity e Busca Semântica',
            'PCA: Comprimindo Dimensões sem Perder Informação',
            'Batch Processing: Multiplicação de Matrizes em Paralelo',
            'Gradiente como Vetor no Espaço de Parâmetros'
          ]
        },
        {
          slug: 'calculo-gradiente',
          nome: 'Cálculo e Gradiente',
          emoji: '∂',
          parent: 'matematica-ia',
          whyStart: 'O algoritmo de aprendizado de toda rede neural (backpropagation) é puro cálculo: derivadas em cadeia calculando em qual direção ajustar cada peso.',
          descricao: 'Derivatives, chain rule, and gradient descent — the engine of learning.',
          contexto: `PERSONA:\nYou are a theoretical computer scientist and mathematician who builds AI from scratch. You teach the absolute root fundamentals: from the physics of computation up to the architecture of large language models. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus: intuition of calculus as a language of "change" — not mechanical resolution of limits.

Mandatory approach:
- Derivative = rate of change. Start with physical examples before any abstract function.
- Upon reaching the chain rule, connect DIRECTLY to backpropagation.
- Gradient descent: use the metaphor of a mountain with fog.`,
          ementa: [
            'O que é uma Derivada (intuição de inclinação e taxa de mudança)',
            'Derivadas de Funções Simples (sem decoreba — com raciocínio)',
            'Derivadas Parciais: mudando uma variável por vez',
            'O Gradiente como Vetor de Inclinação Máxima',
            'A Regra da Cadeia (Chain Rule) — como as derivadas se compõem',
            'Derivadas de Funções de Ativação (ReLU, Sigmoid)',
            'Derivada da Função de Perda',
            'Função de Perda (Loss Function): medindo o erro',
            'Gradiente Descendente: descendo a montanha do erro',
            'Learning Rate: o tamanho do passo e seus riscos',
            'Backpropagation: a regra da cadeia aplicada a redes neurais',
            'Stochastic Gradient Descent (SGD) e Minibatches',
            'Momentum e Aceleração do Gradiente',
            'Adam, RMSProp: Otimizadores Modernos',
            'Vanishing Gradient: Por que Redes Profundas Param de Aprender',
            'Exploding Gradient e Gradient Clipping',
            'Landscape da Função de Perda: Mínimos Locais e Globais',
            'Visualizando Gradientes com Ferramentas Modernas'
          ]
        },
        {
          slug: 'probabilidade-bayes',
          nome: 'Probabilidade e Inferência',
          emoji: 'P(x)',
          parent: 'matematica-ia',
          whyStart: 'Modelos de linguagem são distribuições de probabilidade sobre tokens. Para entender por que um LLM "chuta" uma palavra, você precisa entender distribuições.',
          descricao: 'Probability, distributions, entropy, and reasoning under uncertainty.',
          contexto: `PERSONA:\nYou are a theoretical computer scientist and mathematician who builds AI from scratch. You teach the absolute root fundamentals: from the physics of computation up to the architecture of large language models. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus: real probabilistic reasoning — not memorizing formulas.

Mandatory approach:
- Start with the intuition of probability as "degree of belief".
- When teaching Bayes, use concrete everyday examples before the formula.
- Connect Entropy to the vocabulary of AI.`,
          ementa: [
            'Probabilidade como Grau de Crença (intuição, não decoreba)',
            'Probabilidade Condicional: P(A|B)',
            'Teorema de Bayes e Atualização de Crenças',
            'Distribuições: Normal, Bernoulli, Softmax',
            'Esperança Matemática e Variância',
            'Distribuição de Poisson e Eventos Raros',
            'Independência e Correlação de Variáveis Aleatórias',
            'Entropia de Shannon: medindo a surpresa',
            'Cross-Entropy Loss: por que LLMs usam isso',
            'Temperatura em LLMs e o controle de distribuição',
            'Maximum Likelihood Estimation (MLE): como modelos são treinados',
            'KL Divergência: Medindo a Diferença entre Distribuições',
            'Inferência Bayesiana: Atualizando Crenças com Dados',
            'Como um LLM Gera o Próximo Token',
            'Top-K, Top-P e Nucleus Sampling',
            'Calibração de Modelos: Confiança vs Acurácia',
            'Incerteza em Previsões: Epistêmica vs Aleatória'
          ]
        }
      ]
    },
    {
      slug: 'python-cientifico',
      nome: 'Python Científico',
      emoji: '🐍',
      parent: 'primeiros-principios',
      whyStart: 'Python is the microscope of data science. Without it, you read about AI but cannot verify anything in practice.',
      descricao: 'Python focused on data science: NumPy, Pandas, Matplotlib, and first models.',
      contexto: `PERSONA:\nYou are a theoretical computer scientist and mathematician who builds AI from scratch. You teach the absolute root fundamentals: from the physics of computation up to the architecture of large language models. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus: Python as a tool for scientific verification — not as software development.

Mandatory approach:
- Every code must be preceded by A QUESTION that the student wants to answer.
- NumPy before any ML library.
- Connect each function to a previous mathematical concept.
- The student must be able to write a linear regression from scratch before using high-level libraries.`,
      ementa: [
        'Ambiente: Por que Python, Jupyter e como instalar sem dor',
        'Lógica Python Básica (variáveis, loops, funções)',
        'NumPy: Arrays como Vetores e Matrizes',
        'Operações Vetorizadas com NumPy (sem loops lentos)',
        'Indexing e Slicing em Arrays',
        'Broadcasting: Operações em Arrays de Tamanhos Diferentes',
        'NumPy e Álgebra Linear: np.dot, np.linalg',
        'Pandas: Tabelas como Estrutura de Dados',
        'Limpeza e Exploração de Dados Reais',
        'Matplotlib & Seaborn: Visualizando Padrões',
        'Calculando Estatísticas Descritivas na Prática',
        'GroupBy e Agregações no Pandas',
        'Merge e Join de DataFrames',
        'Lidando com Dados Faltantes (NaN)',
        'Regressão Linear do Zero (sem biblioteca)',
        'Implementando Gradiente Descendente manualmente',
        'Introdução ao Scikit-Learn (depois de entender o mecanismo)',
        'Validação e Métricas: Não confunda Treino com Teste',
        'Cross-Validation e Seleção de Hiperparâmetros',
        'Pipeline de Machine Learning do Zero ao Deploy',
        'Tensores no PyTorch: NumPy na GPU',
        'Autograd: Diferenciação Automática',
        'Construindo uma Rede Neural Simples em PyTorch',
        'Training Loop: Forward, Loss, Backward, Step',
        'Salvando e Carregando Modelos'
      ],
      layout: 'split',
      widget: 'CodeLab'
    },
    {
      slug: 'redes-neurais-mecanismo',
      nome: 'Redes Neurais: O Mecanismo',
      emoji: '🧠',
      isCategory: true,
      parent: 'primeiros-principios',
      whyStart: 'Before studying Transformers and LLMs, you need to understand what an artificial neuron is and how a network learns.',
      descricao: 'From the artificial neuron to deep networks — the real mechanism of machine learning.',
      children: [
        {
          slug: 'neuronio-artificial',
          nome: 'Do Neurônio à Rede',
          emoji: '○',
          parent: 'redes-neurais-mecanismo',
          whyStart: 'Um neurônio artificial é simples. Uma coleção deles organizada em camadas resolve problemas que nenhum algoritmo clássico consegue.',
          descricao: 'Perceptron, activation functions, layers, and the forward pass.',
          contexto: `PERSONA:\nYou are a theoretical computer scientist and mathematician who builds AI from scratch. You teach the absolute root fundamentals: from the physics of computation up to the architecture of large language models. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus: the physical mechanism of an artificial neuron — not the vague biological metaphor.

Mandatory approach:
- Start with a SINGLE neuron: inputs * weights + bias → activation function → output.
- Explain why the non-linear activation function is MANDATORY.
- The forward pass must be mathematically constructed by the student.
- Never use the term "magic" — show exactly WHAT changes during training.`,
          ementa: [
            'O Perceptron: A Unidade Mínima',
            'Pesos (Weights) e Bias: os parâmetros ajustáveis',
            'Funções de Ativação: ReLU, Sigmoid, Tanh e por que existem',
            'Forward Pass: o fluxo de dados por um neurônio',
            'Linear vs Não-Linear: O Papel da Ativação',
            'GELU e SiLU: Ativações Modernas em LLMs',
            'Camadas: Entrada, Ocultas e Saída',
            'Forward Pass em uma Rede Completa (passo a passo)',
            'Função de Perda (Loss): medindo o quão errado estamos',
            'Backpropagation: calculando a culpa de cada peso',
            'Treinamento: um loop de forward + backward + atualização',
            'Inicialização de Pesos: Xavier e Kaiming',
            'Batch Normalization: Estabilizando o Treinamento',
            'Implementando um Perceptron em Python puro',
            'Implementando uma MLP (Multi-Layer Perceptron) do zero',
            'Overfitting e Regularização: por que memorizar não é aprender',
            'Dropout: Regularização Estocástica',
            'Introdução ao PyTorch (depois de entender o mecanismo)',
            'Debugando Redes Neurais: Gradientes, NaN e Shapes',
            'CNNs (Redes Convolucionais): Visão Computacional',
            'RNNs e LSTMs: Sequências e Memória',
            'Limitações das RNNs que Levaram ao Transformer',
            'Graph Neural Networks: Dados Relacionais'
          ],
          layout: 'split',
          widget: 'CodeLab'
        },
        {
          slug: 'transformer-anatomia',
          nome: 'A Anatomia do Transformer',
          emoji: '🔬',
          parent: 'redes-neurais-mecanismo',
          whyStart: 'O Transformer (paper "Attention is All You Need", 2017) mudou tudo. Entender sua arquitetura é o que separa quem usa IA de quem entende IA.',
          descricao: 'Embeddings, Multi-Head Attention, positional encoding, and the complete architecture.',
          contexto: `PERSONA:\nYou are a theoretical computer scientist and mathematician who builds AI from scratch. You teach the absolute root fundamentals: from the physics of computation up to the architecture of large language models. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus: the real mechanism of the Transformer — not the high-level view that any blog already covers.

Mandatory approach:
- Start with THE PROBLEM that the Transformer solves.
- Embeddings: the student must understand that each token becomes a vector in a learned space.
- Attention: teach the Query/Key/Value analogy with search examples before the formula.
- The Attention formula must be derived step-by-step, not delivered ready-made.`,
          ementa: [
            'Tokenização: como texto vira números',
            'Word Embeddings: semântica em espaço vetorial',
            'Positional Encoding: como o modelo sabe a ordem das palavras',
            'O problema das RNNs que o Transformer resolve',
            'Byte-Pair Encoding (BPE) e Tokenizadores Modernos',
            'Embeddings de Posição Aprendidos vs Fixos',
            'Atenção como sistema de busca (Query, Key, Value)',
            'Self-Attention: cada token atende a todos os outros',
            'A fórmula completa derivada passo a passo',
            'Multi-Head Attention: múltiplas perspectivas em paralelo',
            'Masked Attention: Por que o decoder não vê o futuro',
            'Cross-Attention: Encoder e Decoder conversando',
            'Flash Attention: Atenção Eficiente em Hardware Real',
            'Encoder vs Decoder: diferenças e uso',
            'Feed-Forward Networks dentro do Transformer',
            'Layer Normalization e Residual Connections',
            'Pré-treinamento e Fine-tuning: como um LLM é construído',
            'Lendo o paper original: "Attention is All You Need" (2017)',
            'GPT vs BERT vs T5: Arquiteturas Modernas',
            'Scaling Laws: Mais Parâmetros = Mais Inteligência?',
            'Como o GPT-4 foi Treinado: SFT, RLHF e RLAIF',
            'Mixture of Experts (MoE): Roteamento de Especialistas',
            'KV Cache: Por que Inferência é Cara',
            'Especificidade de Contexto e Janelas Longas (Mamba, RWKV)',
            'O Futuro: Modelos Multimodais Nativos'
          ],
          layout: 'split',
          widget: 'CodeLab'
        }
      ]
    }
  ]
};
