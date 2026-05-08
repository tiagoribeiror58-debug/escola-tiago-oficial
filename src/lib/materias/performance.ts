import { MateriaConfig } from '@/types';

export const performanceIntelecto: MateriaConfig = {
  slug: 'performance-intelecto',
  nome: 'Performance & Intelecto',
  emoji: '🧠',
  isCategory: true,
  descricao: 'A base do autodomínio. Aprenda a hackear seu corpo, sua mente e seus sistemas de aprendizado.',
  children: [
    {
      slug: 'mente-cognicao',
      nome: 'Mente & Cognição',
      emoji: '🧘',
      isCategory: true,
      parent: 'performance-intelecto',
      descricao: 'Psicologia, viéses e a arte de aprender a aprender.',
      children: [
        {
          slug: 'metacognicao',
          nome: 'Metacognição',
          emoji: '👁️',
          parent: 'mente-cognicao',
          descricao: 'A ciência de aprender a aprender. Domine a retenção de leitura, sistemas de notas e deep work.',
          contexto: `Foco: aprender a aprender. Sistemas reais — Zettelkasten, Leitura Analítica de Adler, Recuperação Ativa, Repetição Espaçada.

Abordagem obrigatória:
- Antes de qualquer exercício, explique o mecanismo por trás do sistema — por que funciona, o que ele resolve, onde falha.
- Só depois de compreensão estabelecida: peça que o aluno identifique como aquilo se aplica à sua rotina.
- Questione métodos ineficientes (releitura passiva, grifo) explicando o mecanismo do fracasso — não apenas afirmando que são ruins.
- Nunca peça "crie um plano prático" sem antes ter explicado o fundamento que justifica aquele plano.`,
          ementa: [
            'Leitura Inspecional e Leitura Analítica',
            'A Ilusão da Fluência (Por que reler não funciona)',
            'Sistemas de Anotação Inteligente (Zettelkasten)',
            'Gestão de Carga Cognitiva e Foco (Deep Work)',
            'Feynman Technique: Explicar para entender',
            'Modelos Mentais de Primeiro Princípio'
          ]
        },
        {
          slug: 'psicologia',
          nome: 'Psicologia',
          emoji: '🪞',
          parent: 'mente-cognicao',
          descricao: 'Vieses cognitivos, regulação emocional e padrões comportamentais subconscientes.',
          contexto: `Foco: mecanismos psicológicos reais — vieses, regulação emocional, padrões de comportamento.

Abordagem obrigatória:
- Explique o mecanismo do viés ou padrão antes de dar exemplos. O aluno precisa entender a estrutura, não só reconhecer casos.
- Só depois de explicar o mecanismo: conecte com situações reais.
- Para regulação emocional: explique o processo fisiológico e cognitivo envolvido antes de qualquer estratégia prática.
- Peça avaliação crítica de teorias apenas depois que o aluno compreendeu os fundamentos — nunca como diagnóstico inicial.`,
          ementa: [
            'A Estrutura da Psique (Consciente vs Inconsciente)',
            'Vieses Cognitivos Fundamentais (Confirmação, Ancoragem)',
            'Teoria do Apego e Relacionamentos',
            'Inteligência Emocional e Regulação de Afeto',
            'Terapia Cognitivo-Comportamental (Práticas)',
            'Arquétipos e o Inconsciente Coletivo'
          ]
        },
        {
          slug: 'logica',
          nome: 'Lógica',
          emoji: '⊢',
          parent: 'mente-cognicao',
          descricao: 'Argumentação, falácias e pensamento rigoroso sem viés.',
          contexto: `Foco: estrutura lógica de argumentos — dedução, indução, falácias.

Abordagem obrigatória:
- Explique a estrutura formal do conceito antes de apresentar exemplos em linguagem natural.
- Para falácias: explique por que a estrutura falha logicamente antes de nomear e exemplificar.
- Problemas práticos só depois que o mecanismo lógico estiver estabelecido. Nunca use puzzles como diagnóstico inicial.
- Exija resolução passo a passo com justificativa — não apenas a resposta correta.`,
          ementa: [
            'Proposições e Valores Verdade',
            'Operadores Lógicos (E, OU, NÃO, SE)',
            'Argumentos Dedutivos vs Indutivos',
            'Falácias Formais e Informais',
            'Viés de Sobrevivência e Causalidade vs Correlação',
            'Modelagem de Problemas Complexos'
          ]
        },
        {
          slug: 'saude-mental',
          nome: 'Saúde Mental & Resiliência',
          emoji: '🛡️',
          parent: 'mente-cognicao',
          descricao: 'Gestão de ansiedade, burnout e antifragilidade psicológica.',
          contexto: `Foco: mecanismos clínicos e práticos de resiliência. Explique a biologia e a psicologia do estresse antes de propor técnicas de enfrentamento.`,
          ementa: [
            'A Biologia do Estresse (Cortisol e Amígdala)',
            'Burnout vs Cansaço (Diferenças Estruturais)',
            'Antifragilidade (Crescendo com a Pressão)',
            'Reestruturação Cognitiva (TCC Aplicada)',
            'Gestão de Ansiedade e Gatilhos'
          ]
        }
      ]
    },
    {
      slug: 'corpo-biologia',
      nome: 'Corpo & Biologia',
      emoji: '🧬',
      isCategory: true,
      parent: 'performance-intelecto',
      descricao: 'Otimização da máquina biológica para máxima performance.',
      children: [
        {
          slug: 'biohacking',
          nome: 'Biohacking',
          emoji: '🧪',
          parent: 'corpo-biologia',
          descricao: 'Protocolos baseados em ciência para otimizar sono, energia, foco e longevidade.',
          contexto: `Foco: otimização de performance humana — sono, nutrição, suplementação, exercício, estresse.

Abordagem obrigatória:
- Explique o mecanismo fisiológico antes de qualquer protocolo. O aluno precisa entender por que aquilo funciona antes de saber o que fazer.
- Seja transparente sobre nível de evidência: separe o que tem ensaio clínico sólido do que é anedotal. Nunca misture os dois sem marcar a diferença.
- Só depois de compreensão do mecanismo: discuta aplicação prática.
- Nunca apresente protocolo como receita sem antes explicar a biologia por trás.`,
          ementa: [
            'Ritmo Circadiano e Luz Solar Matinal',
            'Arquitetura do Sono (REM e Deep Sleep)',
            'Termogênese e Cold Exposure',
            'Janela Alimentar e Otimização Metabólica',
            'Neurotransmissores e Nutrição (Dopamina Base)'
          ]
        },
        {
          slug: 'neurociencia',
          nome: 'Neurociência',
          emoji: '🧬',
          parent: 'corpo-biologia',
          descricao: 'Entenda os mecanismos mecânicos do seu cérebro por trás de hábitos e vícios.',
          contexto: `Foco: mecanismos cerebrais reais — LTP, neuroplasticidade, consolidação de memória.

Abordagem obrigatória:
- Comece sempre pelo mecanismo biológico. Só depois conecte com comportamento observável.
- Nunca parta do comportamento ("você procrastina porque...") sem antes ter explicado o substrato neural que o sustenta.
- Desmistifique neuromitos explicando por que o mito existe e onde o mecanismo real diverge dele.
- Exercícios de compreensão só após o mecanismo estar claro — nunca antes.`,
          ementa: [
            'Neuroplasticidade Hebbiana',
            'O Circuito de Recompensa (Dopamina)',
            'Córtex Pré-Frontal vs Amígdala',
            'Consolidação de Memória (LTP)',
            'Neurogênese Adulta e Exercício'
          ]
        },
        {
          slug: 'nutricao-otimizada',
          nome: 'Nutrição Otimizada',
          emoji: '🥑',
          parent: 'corpo-biologia',
          descricao: 'Macronutrientes, micronutrientes e impacto metabólico.',
          contexto: `Foco: metabolismo e bioquímica nutricional. Explique como o corpo processa alimentos antes de sugerir dietas ou restrições. Diferencie correlação de causalidade em estudos nutricionais.`,
          ementa: [
            'O Mecanismo da Insulina e Glicemia',
            'Macronutrientes: Proteínas, Carboidratos e Gorduras',
            'Jejum Intermitente e Autofagia',
            'Microbioma Intestinal e Eixo Intestino-Cérebro',
            'Suplementação Baseada em Evidências'
          ]
        },
        {
          slug: 'fisiologia-esporte',
          nome: 'Fisiologia & Treino',
          emoji: '🏋️',
          parent: 'corpo-biologia',
          descricao: 'Hipertrofia, capacidade cardiovascular e recuperação.',
          contexto: `Foco: vias de sinalização muscular e adaptação biológica. A hipertrofia e a resistência são respostas de sobrevivência; ensine sob essa ótica evolutiva.`,
          ementa: [
            'Vias de Sinalização (mTOR) e Hipertrofia',
            'Sistemas Energéticos (ATP-CP, Glicolítico, Oxidativo)',
            'Sobrecarga Progressiva (O Motor do Crescimento)',
            'VO2 Max e Saúde Mitocondrial',
            'Recuperação Muscular e Prevenção de Lesões'
          ]
        }
      ]
    }
  ]
};
