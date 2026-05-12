import { MateriaConfig } from '@/types';

export const primeirosprincipiosHub: MateriaConfig = {
  slug: 'primeiros-principios',
  nome: 'Primeiros Princípios',
  emoji: '⚛️',
  isCategory: true,
  descricao: 'A trilha científica raiz. Matemática, lógica e arquiteturas que fundamentam toda inteligência artificial — ensinados do átomo até o transformer.',
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
          descricao: 'Vetores, matrizes, transformações lineares e espaços que descrevem dados e pesos.',
          contexto: `Foco: a mecânica real da álgebra linear — não decoreba de fórmulas.

Abordagem obrigatória:
- Comece sempre com a INTUIÇÃO GEOMÉTRICA: um vetor é uma seta no espaço. Uma matriz é uma transformação desse espaço.
- Nunca apresente operação sem antes mostrar O QUE ELA FAZ VISUALMENTE ao espaço.
- Ao ensinar multiplicação de matrizes, explique que é uma COMPOSIÇÃO de transformações.
- Sempre conecte o conceito ao seu papel numa rede neural.`,
          fases: [
            {
              nome: 'Fase 1: Vetores e Espaço',
              topicos: [
                'O que é um Vetor (intuição geométrica e notação)',
                'Operações Vetoriais: Soma, Subtração e Escalonamento',
                'Produto Escalar (Dot Product) e Similaridade',
                'Norma e Distância entre Vetores',
                'Projeção Vetorial e Ortogonalidade',
                'Espaço Vetorial e Subespaços',
                'Combinação Linear e Dependência Linear',
              ]
            },
            {
              nome: 'Fase 2: Matrizes como Transformações',
              topicos: [
                'O que uma Matriz Faz ao Espaço (rotação, escala, reflexão)',
                'Multiplicação de Matrizes como Composição de Transformações',
                'Matriz Transposta e por que ela importa',
                'Matriz Identidade e Inversas',
                'Autovalores e Autovetores (a direção que não muda)',
                'Decomposição Espectral',
                'SVD (Singular Value Decomposition)',
                'Determinante: O Volume da Transformação',
              ]
            },
            {
              nome: 'Fase 3: Aplicações em IA',
              topicos: [
                'Como uma Camada Densa é uma Multiplicação de Matrizes',
                'Embeddings como Vetores em Espaço de Alta Dimensão',
                'Cosine Similarity e Busca Semântica',
                'PCA: Comprimindo Dimensões sem Perder Informação',
                'Batch Processing: Multiplicação de Matrizes em Paralelo',
                'Gradiente como Vetor no Espaço de Parâmetros',
              ]
            }
          ]
        },
        {
          slug: 'calculo-gradiente',
          nome: 'Cálculo & Gradiente',
          emoji: '∂',
          parent: 'matematica-ia',
          whyStart: 'O algoritmo de aprendizado de toda rede neural (backpropagation) é puro cálculo: derivadas em cadeia calculando em qual direção ajustar cada peso.',
          descricao: 'Derivadas, regra da cadeia e gradiente descendente — o motor do aprendizado.',
          contexto: `Foco: intuição do cálculo como linguagem de "mudança" — não resolução mecânica de limites.

Abordagem obrigatória:
- Derivada = taxa de mudança. Comece com exemplos físicos antes de qualquer função abstrata.
- Ao chegar na regra da cadeia, conecte DIRETAMENTE ao backpropagation.
- Gradiente descendente: use a metáfora da montanha com névoa.`,
          fases: [
            {
              nome: 'Fase 1: A Linguagem da Mudança',
              topicos: [
                'O que é uma Derivada (intuição de inclinação e taxa de mudança)',
                'Derivadas de Funções Simples (sem decoreba — com raciocínio)',
                'Derivadas Parciais: mudando uma variável por vez',
                'O Gradiente como Vetor de Inclinação Máxima',
                'A Regra da Cadeia (Chain Rule) — como as derivadas se compõem',
                'Derivadas de Funções de Ativação (ReLU, Sigmoid)',
                'Derivada da Função de Perda',
              ]
            },
            {
              nome: 'Fase 2: O Motor do Aprendizado',
              topicos: [
                'Função de Perda (Loss Function): medindo o erro',
                'Gradiente Descendente: descendo a montanha do erro',
                'Learning Rate: o tamanho do passo e seus riscos',
                'Backpropagation: a regra da cadeia aplicada a redes neurais',
                'Stochastic Gradient Descent (SGD) e Minibatches',
                'Momentum e Aceleração do Gradiente',
                'Adam, RMSProp: Otimizadores Modernos',
              ]
            },
            {
              nome: 'Fase 3: Problemas e Soluções',
              topicos: [
                'Vanishing Gradient: Por que Redes Profundas Param de Aprender',
                'Exploding Gradient e Gradient Clipping',
                'Landscape da Função de Perda: Mínimos Locais e Globais',
                'Visualizando Gradientes com Ferramentas Modernas',
              ]
            }
          ]
        },
        {
          slug: 'probabilidade-bayes',
          nome: 'Probabilidade & Inferência',
          emoji: 'P(x)',
          parent: 'matematica-ia',
          whyStart: 'Modelos de linguagem são distribuições de probabilidade sobre tokens. Para entender por que um LLM "chuta" uma palavra, você precisa entender distribuições.',
          descricao: 'Probabilidade, distribuições, entropia e raciocínio sob incerteza.',
          contexto: `Foco: raciocínio probabilístico real — não decoreba de fórmulas.

Abordagem obrigatória:
- Comece com a intuição de probabilidade como "grau de crença".
- Ao ensinar Bayes, use exemplos concretos cotidianos antes da fórmula.
- Conecte Entropia ao vocabulário de IA.`,
          fases: [
            {
              nome: 'Fase 1: Fundamentos',
              topicos: [
                'Probabilidade como Grau de Crença (intuição, não decoreba)',
                'Probabilidade Condicional: P(A|B)',
                'Teorema de Bayes e Atualização de Crenças',
                'Distribuições: Normal, Bernoulli, Softmax',
                'Esperança Matemática e Variância',
                'Distribuição de Poisson e Eventos Raros',
                'Independência e Correlação de Variáveis Aleatórias',
              ]
            },
            {
              nome: 'Fase 2: Teoria da Informação',
              topicos: [
                'Entropia de Shannon: medindo a surpresa',
                'Cross-Entropy Loss: por que LLMs usam isso',
                'Temperatura em LLMs e o controle de distribuição',
                'Maximum Likelihood Estimation (MLE): como modelos são treinados',
                'KL Divergência: Medindo a Diferença entre Distribuições',
                'Inferência Bayesiana: Atualizando Crenças com Dados',
              ]
            },
            {
              nome: 'Fase 3: Probabilidade em Modelos Reais',
              topicos: [
                'Como um LLM Gera o Próximo Token',
                'Top-K, Top-P e Nucleus Sampling',
                'Calibração de Modelos: Confiança vs Acurácia',
                'Incerteza em Previsões: Epistêmica vs Aleatória',
              ]
            }
          ]
        }
      ]
    },
    {
      slug: 'python-cientifico',
      nome: 'Python Científico',
      emoji: '🐍',
      parent: 'primeiros-principios',
      whyStart: 'Python é o microscópio da ciência de dados. Sem ele, você lê sobre IA mas não consegue verificar nada na prática.',
      descricao: 'Python focado em ciência de dados: NumPy, Pandas, Matplotlib e primeiros modelos.',
      contexto: `Foco: Python como ferramenta de verificação científica — não como desenvolvimento de software.

Abordagem obrigatória:
- Todo código deve ser precedido de UMA PERGUNTA que o aluno quer responder.
- NumPy antes de qualquer biblioteca de ML.
- Conecte cada função a um conceito matemático anterior.
- O aluno deve conseguir escrever uma regressão linear do zero antes de usar bibliotecas de alto nível.`,
      fases: [
        {
          nome: 'Fase 1: Fundamentos',
          topicos: [
            'Ambiente: Por que Python, Jupyter e como instalar sem dor',
            'Lógica Python Básica (variáveis, loops, funções)',
            'NumPy: Arrays como Vetores e Matrizes',
            'Operações Vetorizadas com NumPy (sem loops lentos)',
            'Indexing e Slicing em Arrays',
            'Broadcasting: Operações em Arrays de Tamanhos Diferentes',
            'NumPy e Álgebra Linear: np.dot, np.linalg',
          ]
        },
        {
          nome: 'Fase 2: Dados e Visualização',
          topicos: [
            'Pandas: Tabelas como Estrutura de Dados',
            'Limpeza e Exploração de Dados Reais',
            'Matplotlib & Seaborn: Visualizando Padrões',
            'Calculando Estatísticas Descritivas na Prática',
            'GroupBy e Agregações no Pandas',
            'Merge e Join de DataFrames',
            'Lidando com Dados Faltantes (NaN)',
          ]
        },
        {
          nome: 'Fase 3: Primeiros Modelos',
          topicos: [
            'Regressão Linear do Zero (sem biblioteca)',
            'Implementando Gradiente Descendente manualmente',
            'Introdução ao Scikit-Learn (depois de entender o mecanismo)',
            'Validação e Métricas: Não confunda Treino com Teste',
            'Cross-Validation e Seleção de Hiperparâmetros',
            'Pipeline de Machine Learning do Zero ao Deploy',
          ]
        },
        {
          nome: 'Fase 4: PyTorch e Redes Neurais',
          topicos: [
            'Tensores no PyTorch: NumPy na GPU',
            'Autograd: Diferenciação Automática',
            'Construindo uma Rede Neural Simples em PyTorch',
            'Training Loop: Forward, Loss, Backward, Step',
            'Salvando e Carregando Modelos',
          ]
        }
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
      whyStart: 'Antes de estudar Transformers e LLMs, você precisa entender o que é um neurônio artificial e como uma rede aprende.',
      descricao: 'Do neurônio artificial até redes profundas — o mecanismo real do aprendizado de máquina.',
      children: [
        {
          slug: 'neuronio-artificial',
          nome: 'Do Neurônio à Rede',
          emoji: '○',
          parent: 'redes-neurais-mecanismo',
          whyStart: 'Um neurônio artificial é simples. Uma coleção deles organizada em camadas resolve problemas que nenhum algoritmo clássico consegue.',
          descricao: 'Perceptron, funções de ativação, camadas e o forward pass.',
          contexto: `Foco: o mecanismo físico de um neurônio artificial — não a metáfora biológica vaga.

Abordagem obrigatória:
- Comece com um ÚNICO neurônio: entradas * pesos + bias → função de ativação → saída.
- Explique por que a função de ativação não-linear é OBRIGATÓRIA.
- O forward pass deve ser construído matematicamente pelo aluno.
- Nunca use o termo "magia" — mostre exatamente O QUE muda durante o treinamento.`,
          fases: [
            {
              nome: 'Fase 1: O Neurônio',
              topicos: [
                'O Perceptron: A Unidade Mínima',
                'Pesos (Weights) e Bias: os parâmetros ajustáveis',
                'Funções de Ativação: ReLU, Sigmoid, Tanh e por que existem',
                'Forward Pass: o fluxo de dados por um neurônio',
                'Linear vs Não-Linear: O Papel da Ativação',
                'GELU e SiLU: Ativações Modernas em LLMs',
              ]
            },
            {
              nome: 'Fase 2: A Rede',
              topicos: [
                'Camadas: Entrada, Ocultas e Saída',
                'Forward Pass em uma Rede Completa (passo a passo)',
                'Função de Perda (Loss): medindo o quão errado estamos',
                'Backpropagation: calculando a culpa de cada peso',
                'Treinamento: um loop de forward + backward + atualização',
                'Inicialização de Pesos: Xavier e Kaiming',
                'Batch Normalization: Estabilizando o Treinamento',
              ]
            },
            {
              nome: 'Fase 3: Construindo do Zero',
              topicos: [
                'Implementando um Perceptron em Python puro',
                'Implementando uma MLP (Multi-Layer Perceptron) do zero',
                'Overfitting e Regularização: por que memorizar não é aprender',
                'Dropout: Regularização Estocástica',
                'Introdução ao PyTorch (depois de entender o mecanismo)',
                'Debugando Redes Neurais: Gradientes, NaN e Shapes',
              ]
            },
            {
              nome: 'Fase 4: Arquiteturas Especializadas',
              topicos: [
                'CNNs (Redes Convolucionais): Visão Computacional',
                'RNNs e LSTMs: Sequências e Memória',
                'Limitações das RNNs que Levaram ao Transformer',
                'Graph Neural Networks: Dados Relacionais',
              ]
            }
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
          descricao: 'Embeddings, Atenção Multi-Cabeça, positional encoding e a arquitetura completa.',
          contexto: `Foco: o mecanismo real do Transformer — não a visão de alto nível que qualquer blog já cobre.

Abordagem obrigatória:
- Comece com O PROBLEMA que o Transformer resolve.
- Embeddings: o aluno deve entender que cada token vira um vetor em um espaço aprendido.
- Atenção: ensine a analogia Query/Key/Value com exemplos de busca antes da fórmula.
- A fórmula de Atenção deve ser derivada passo a passo, não entregue pronta.`,
          fases: [
            {
              nome: 'Fase 1: Representação de Linguagem',
              topicos: [
                'Tokenização: como texto vira números',
                'Word Embeddings: semântica em espaço vetorial',
                'Positional Encoding: como o modelo sabe a ordem das palavras',
                'O problema das RNNs que o Transformer resolve',
                'Byte-Pair Encoding (BPE) e Tokenizadores Modernos',
                'Embeddings de Posição Aprendidos vs Fixos',
              ]
            },
            {
              nome: 'Fase 2: O Mecanismo de Atenção',
              topicos: [
                'Atenção como sistema de busca (Query, Key, Value)',
                'Self-Attention: cada token atende a todos os outros',
                'A fórmula completa derivada passo a passo',
                'Multi-Head Attention: múltiplas perspectivas em paralelo',
                'Masked Attention: Por que o decoder não vê o futuro',
                'Cross-Attention: Encoder e Decoder conversando',
                'Flash Attention: Atenção Eficiente em Hardware Real',
              ]
            },
            {
              nome: 'Fase 3: A Arquitetura Completa',
              topicos: [
                'Encoder vs Decoder: diferenças e uso',
                'Feed-Forward Networks dentro do Transformer',
                'Layer Normalization e Residual Connections',
                'Pré-treinamento e Fine-tuning: como um LLM é construído',
                'Lendo o paper original: "Attention is All You Need" (2017)',
                'GPT vs BERT vs T5: Arquiteturas Modernas',
                'Scaling Laws: Mais Parâmetros = Mais Inteligência?',
              ]
            },
            {
              nome: 'Fase 4: LLMs na Prática',
              topicos: [
                'Como o GPT-4 foi Treinado: SFT, RLHF e RLAIF',
                'Mixture of Experts (MoE): Roteamento de Especialistas',
                'KV Cache: Por que Inferência é Cara',
                'Especificidade de Contexto e Janelas Longas (Mamba, RWKV)',
                'O Futuro: Modelos Multimodais Nativos',
              ]
            }
          ],
          layout: 'split',
          widget: 'CodeLab'
        }
      ]
    }
  ]
};
