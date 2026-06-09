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
            'Estratégias para Estudar Matérias Difíceis',
            'IA como Parceira de Estudo: Usando LLMs para Aprender Melhor',
            'Técnica Pomodoro vs Time Blocking: Quando Usar Cada',
            'Digital Detox: Recuperando Atenção na Era das Notificações',
            'Curva do Esquecimento de Ebbinghaus: A Matemática da Memória',
            'Mapas Mentais e Visual Thinking para Retenção'
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
            'Antifragilidade Emocional: Transformando Estresse em Crescimento',
            'Dopamine Detox: Restaurando o Circuito de Recompensa',
            'Psicologia da Procrastinação: Raízes e Soluções',
            'Flow States: Psicologia do Desempenho Ótimo',
            'Síndrome do Impostor: Mecanismo e Superação'
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
            'Estoicismo Digital: Equilíbrio em Mercados Voláteis',
            'Eco-Ansiedade e Incerteza Existencial na Era da IA',
            'Limites Saudáveis com Tecnologia e Redes Sociais',
            'Solitude Produtiva: O Poder de Estar Só',
            'Terapia Baseada em Evidências: Quando Procurar Ajuda'
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
            'Comer para Longevidade: Azul Blue Zones',
            'GLP-1 e Semaglutida: A Ciência por Trás da Revolução',
            'Nutrigenômica: Dieta Personalizada por DNA',
            'Ultra-Processados: O Impacto Neurológico da Comida Industrial',
            'Suplementação Estratégica: O Stack Baseado em Evidências'
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
            'Monitoramento de Performance: RPE, HRV e Métricas',
            'Exercícios Isométricos e Excêntricos para Tendões',
            'Treinamento Funcional vs Bodybuilding: Trade-offs',
            'Longevidade Física: O Protocolo de Peter Attia',
            'Rucking e Zone 2: O Cardio mais Eficiente que Existe'
          ]
        }
      ]
    }
  ]
};
