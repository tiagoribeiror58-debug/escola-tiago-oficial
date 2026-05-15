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
      whyStart: 'Comece pela mente. De nada adianta otimizar o corpo se o software está bugado. Aqui você aprende a aprender — e isso multiplica tudo que vem depois.',
      descricao: 'Psicologia, viéses e a arte de aprender a aprender.',
      children: [
        {
          slug: 'metacognicao',
          nome: 'Metacognição',
          emoji: '👁️',
          parent: 'mente-cognicao',
          whyStart: 'Este é o meta-skill. Aprender como aprender transforma qualquer outro estudo em 3x mais eficiente.',
          descricao: 'A ciência de aprender a aprender. Domine a retenção de leitura, sistemas de notas e deep work.',
          contexto: `Foco: aprender a aprender. Sistemas reais — Zettelkasten, Leitura Analítica de Adler, Recuperação Ativa, Repetição Espaçada.

Abordagem obrigatória:
- Antes de qualquer exercício, explique o mecanismo por trás do sistema.
- Só depois de compreensão estabelecida: peça que o aluno identifique como aquilo se aplica à sua rotina.
- Questione métodos ineficientes explicando o mecanismo do fracasso.
- Nunca peça "crie um plano prático" sem antes ter explicado o fundamento.`,
          ementa: [
            'Leitura Inspecional e Leitura Analítica',
            'A Ilusão da Fluência (Por que reler não funciona)',
            'Sistemas de Anotação Inteligente (Zettelkasten)',
            'Gestão de Carga Cognitiva e Foco (Deep Work)',
            'Feynman Technique: Explicar para entender',
            'Modelos Mentais de Primeiro Princípio',
            'Repetição Espaçada (Spaced Repetition e Anki)',
            'Recuperação Ativa: Testes como Ferramenta de Estudo',
            'O Efeito Geração e a Elaboração Ativa',
            'Interleaving: Alternando Tópicos para Reter Mais',
            'Como Criar um Sistema de Notas Permanentes',
            'Chunking: Agrupando Informação para Memória de Longo Prazo',
            'Sleep Learning: O Papel do Sono na Consolidação',
            'Calibração de Conhecimento: Saber o Que Você Não Sabe',
            'Construindo um Segundo Cérebro (PKM System)',
            'Produtividade Profunda: Cal Newport na Prática',
            'Estratégias para Estudar Matérias Difíceis'
          ]
        },
        {
          slug: 'logica',
          nome: 'Lógica',
          emoji: '⊢',
          parent: 'mente-cognicao',
          whyStart: 'Com a metacognição ativa, você precisa do motor do raciocínio rigoroso. Lógica é o filtro que separa argumentos válidos dos inválidos.',
          descricao: 'Argumentação, falácias e pensamento rigoroso sem viés.',
          contexto: `Foco: estrutura lógica de argumentos — dedução, indução, falácias.

Abordagem obrigatória:
- Explique a estrutura formal do conceito antes de apresentar exemplos.
- Para falácias: explique por que a estrutura falha logicamente antes de nomear.
- Problemas práticos só depois que o mecanismo lógico estiver estabelecido.`,
          ementa: [
            'Proposições e Valores Verdade',
            'Operadores Lógicos (E, OU, NÃO, SE)',
            'Argumentos Dedutivos vs Indutivos',
            'Falácias Formais e Informais',
            'Viés de Sobrevivência e Causalidade vs Correlação',
            'Modelagem de Problemas Complexos',
            'Lógica de Predicados: Quantificadores (Todo, Algum)',
            'Silogismos: Validade vs Solidez',
            'Abdução: Raciocínio para a Melhor Explicação',
            'Pensamento Sistêmico e Feedback Loops',
            'Paradoxos Clássicos e o que Eles Ensinam',
            'Teoria dos Jogos: Decisões Interdependentes',
            'Análise de Custo-Benefício e Decisão Racional',
            'Raciocínio Contrafactual (E Se?)',
            'Limites do Raciocínio Formal: O Teorema de Gödel'
          ]
        },
        {
          slug: 'psicologia',
          nome: 'Psicologia',
          emoji: '🪞',
          parent: 'mente-cognicao',
          whyStart: 'Agora que você pensa com mais clareza, é hora de entender o que move as pessoas — inclusive você.',
          descricao: 'Vieses cognitivos, regulação emocional e padrões comportamentais subconscientes.',
          contexto: `Foco: mecanismos psicológicos reais — vieses, regulação emocional, padrões de comportamento.

Abordagem obrigatória:
- Explique o mecanismo do viés ou padrão antes de dar exemplos.
- Para regulação emocional: explique o processo fisiológico e cognitivo antes de qualquer estratégia prática.`,
          ementa: [
            'A Estrutura da Psique (Consciente vs Inconsciente)',
            'Vieses Cognitivos Fundamentais (Confirmação, Ancoragem)',
            'Teoria do Apego e Relacionamentos',
            'Inteligência Emocional e Regulação de Afeto',
            'Terapia Cognitivo-Comportamental (Práticas)',
            'Arquétipos e o Inconsciente Coletivo',
            'Sistemas 1 e 2: O Cérebro Rápido e Lento (Kahneman)',
            'Heurísticas e Atalhos Mentais',
            'Motivação: Teoria da Autodeterminação (Deci & Ryan)',
            'Condicionamento Clássico e Operante (Pavlov e Skinner)',
            'Psicologia do Trauma e Respostas Defensivas',
            'Autoeficácia e Mindset de Crescimento (Dweck)',
            'Personalidade: Big Five e Tipos MBTI',
            'Influência Social: Conformismo e Obediência (Milgram)',
            'Psicologia Positiva e Bem-Estar (Seligman)',
            'Narcisismo, Maquiavelismo e Psicopatia (Dark Triad)',
            'Mecanismos de Defesa e Autoengano',
            'Flexibilidade Cognitiva: Desaprender e Reaprender na Era da IA',
            'Psicologia da Colaboração Humano-IA: Identidade e Valor Próprio',
            'Antifragilidade Emocional: Transformando Estresse em Crescimento'
          ]
        },
        {
          slug: 'saude-mental',
          nome: 'Saúde Mental & Resiliência',
          emoji: '🛡️',
          parent: 'mente-cognicao',
          whyStart: 'A etapa final da mente: a blindagem. Aqui você constrói a antifragilidade que sustenta todo o resto.',
          descricao: 'Gestão de ansiedade, burnout e antifragilidade psicológica.',
          contexto: `Foco: mecanismos clínicos e práticos de resiliência. Explique a biologia e a psicologia do estresse antes de propor técnicas.`,
          ementa: [
            'A Biologia do Estresse (Cortisol e Amígdala)',
            'Burnout vs Cansaço (Diferenças Estruturais)',
            'Antifragilidade (Crescendo com a Pressão)',
            'Reestruturação Cognitiva (TCC Aplicada)',
            'Gestão de Ansiedade e Gatilhos',
            'Regulação do Sistema Nervoso Autônomo (Respiração)',
            'Mindfulness e a Prática da Atenção Plena',
            'Terapia de Aceitação e Compromisso (ACT)',
            'Higiene do Sono para Saúde Mental',
            'Isolamento Social e Saúde Psicológica',
            'Procrastinação: Raízes Emocionais e Soluções',
            'Perfeccionismo Adaptativo vs Desadaptativo',
            'Construindo uma Rotina de Recuperação (Recovery Stack)',
            'Journaling Terapêutico e Processamento de Experiências',
            'Encontrando Propósito: Ikigai e Sentido na Vida',
            'Resiliência em Ambientes de Mudança Exponencial',
            'Gestão de Tecnoestresse e Sobrecarga de Informação',
            'Estoicismo Digital: Equilíbrio em Mercados Voláteis'
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
      whyStart: 'Com a mente calibrada, você otimiza o hardware. Sono, nutrição, neurociência e treino são um sistema integrado.',
      descricao: 'Otimização da máquina biológica para máxima performance.',
      children: [
        {
          slug: 'neurociencia',
          nome: 'Neurociência',
          emoji: '🧬',
          parent: 'corpo-biologia',
          whyStart: 'Comece pelo hardware. Antes de adotar qualquer protocolo de performance, entenda os mecanismos cerebrais que os justificam.',
          descricao: 'Entenda os mecanismos mecânicos do seu cérebro por trás de hábitos e vícios.',
          contexto: `Foco: mecanismos cerebrais reais — LTP, neuroplasticidade, consolidação de memória.

Abordagem obrigatória:
- Comece sempre pelo mecanismo biológico. Só depois conecte com comportamento.
- Nunca parta do comportamento sem antes ter explicado o substrato neural.
- Desmistifique neuromitos explicando onde o mecanismo real diverge.`,
          ementa: [
            'Neuroplasticidade Hebbiana',
            'O Circuito de Recompensa (Dopamina)',
            'Córtex Pré-Frontal vs Amígdala',
            'Consolidação de Memória (LTP)',
            'Neurogênese Adulta e Exercício',
            'Serotonina, Noradrenalina e Humor',
            'O Papel do GABA e Glutamato no Aprendizado',
            'A Rede de Modo Padrão (Default Mode Network)',
            'Neurociência do Hábito: Cue-Routine-Reward',
            'Atenção e o Locus Coeruleus',
            'Plasticidade Dependente de Experiência',
            'Neurodegeneração e Prevenção do Alzheimer',
            'Psilocibina e Neuroplasticidade (Pesquisa Atual)',
            'Sono e Consolidação de Memória (Sistema Glinfático)',
            'Neurociência do Medo e Extinção do Condicionamento'
          ]
        },
        {
          slug: 'biohacking',
          nome: 'Biohacking',
          emoji: '🧪',
          parent: 'corpo-biologia',
          whyStart: 'Agora que você entende o cérebro, você implementa os protocolos com inteligência. Cada protocolo tem um mecanismo.',
          descricao: 'Protocolos baseados em ciência para otimizar sono, energia, foco e longevidade.',
          contexto: `Foco: otimização de performance humana — sono, nutrição, suplementação, exercício, estresse.

Abordagem obrigatória:
- Explique o mecanismo fisiológico antes de qualquer protocolo.
- Seja transparente sobre nível de evidência: separe o que tem ensaio clínico do que é anedotal.`,
          ementa: [
            'Ritmo Circadiano e Luz Solar Matinal',
            'Arquitetura do Sono (REM e Deep Sleep)',
            'Termogênese e Cold Exposure',
            'Janela Alimentar e Otimização Metabólica',
            'Neurotransmissores e Nutrição (Dopamina Base)',
            'Protocolos de Luz: Manhã, Tarde e Noite',
            'Sauna e Heat Shock Proteins',
            'Suplementos com Evidência: Creatina, Magnésio, Vitamina D',
            'HRV (Heart Rate Variability) como Marcador de Recuperação',
            'Zonas de Treino Aeróbico para Longevidade',
            'Modulação de Cortisol ao Longo do Dia',
            'Jejum Prolongado: Benefícios e Riscos Estruturais',
            'Técnicas de Respiração (Wim Hof, Box Breathing)',
            'Monitoring Wearables: O Que Vale Medir',
            'Longevidade: O Protocolo de Bryan Johnson'
          ]
        },
        {
          slug: 'nutricao-otimizada',
          nome: 'Nutrição Otimizada',
          emoji: '🥑',
          parent: 'corpo-biologia',
          whyStart: 'O combustível da máquina. Comida não é só calorias — é sinalização hormonal, inflamação e cognição.',
          descricao: 'Macronutrientes, micronutrientes e impacto metabólico.',
          contexto: `Foco: metabolismo e bioquímica nutricional. Explique como o corpo processa alimentos antes de sugerir dietas. Diferencie correlação de causalidade em estudos nutricionais.`,
          ementa: [
            'O Mecanismo da Insulina e Glicemia',
            'Macronutrientes: Proteínas, Carboidratos e Gorduras',
            'Jejum Intermitente e Autofagia',
            'Microbioma Intestinal e Eixo Intestino-Cérebro',
            'Suplementação Baseada em Evidências',
            'Proteína: Quantidade Ótima e Timing',
            'Gorduras Saturadas vs Insaturadas: O Debate Correto',
            'Carboidratos e Performance: Quando São Aliados',
            'Micronutrientes Críticos: Zinco, Ferro, B12 e Folato',
            'Dieta Cetogênica: Mecanismo, Benefícios e Riscos',
            'Inflamação Crônica e Comida Anti-inflamatória',
            'Hidratação e Eletrólitos na Performance',
            'Leitura de Rótulos: O Que Realmente Importa',
            'Nutrição para Cognição: O Cérebro na Mesa',
            'Comer para Longevidade: Azul Blue Zones'
          ]
        },
        {
          slug: 'fisiologia-esporte',
          nome: 'Fisiologia & Treino',
          emoji: '🏋️',
          parent: 'corpo-biologia',
          whyStart: 'Treino não é castigo — é o maior estimulador de neurogênese e performance cognitiva que existe.',
          descricao: 'Hipertrofia, capacidade cardiovascular e recuperação.',
          contexto: `Foco: vias de sinalização muscular e adaptação biológica. A hipertrofia e a resistência são respostas de sobrevivência.`,
          ementa: [
            'Vias de Sinalização (mTOR) e Hipertrofia',
            'Sistemas Energéticos (ATP-CP, Glicolítico, Oxidativo)',
            'Sobrecarga Progressiva (O Motor do Crescimento)',
            'VO2 Max e Saúde Mitocondrial',
            'Recuperação Muscular e Prevenção de Lesões',
            'Fibras Musculares: Tipo I vs Tipo II',
            'Periodização: Ondulação e Ciclos de Treino',
            'Frequência, Volume e Intensidade: O Triângulo do Treino',
            'Deload: A Importância do Descanso Programado',
            'Cardio para Longevidade vs Cardio para Performance',
            'Zona 2: O Treino Aeróbico que Todo Mundo Ignora',
            'Hormônios e Treino: Testosterona, GH e Cortisol',
            'Mobilidade e Flexibilidade para Longevidade',
            'Nutrição Peri-Treino: O Que Comer e Quando',
            'Monitoramento de Performance: RPE, HRV e Métricas'
          ]
        }
      ]
    }
  ]
};
