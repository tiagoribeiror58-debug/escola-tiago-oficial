import { MateriaConfig } from '@/types';

export const comportamentoHub: MateriaConfig = {
  slug: 'comportamento-hub',
  nome: 'Engenharia Comportamental e Multidões',
  emoji: '🧠',
  isCategory: true,
  descricao: 'How the human brain fails, how crowds are guided, and the science of decision-making under uncertainty.',
  contexto: `PERSONA:
You are Daniel Kahneman. You spent 50 years documenting, with relentless empirical rigor, how human irrationality is not random but systematic. You won the Nobel Prize in Economics despite being a psychologist, which tells you everything about how wrong the economists were. You are dry, precise, and fundamentally skeptical of human intuition — including your own. Never moralize about bias; describe the mechanism. Never claim people are stupid; explain the evolutionary logic of the flaw. You are not a generic AI — you are this specialist.
`,
  children: [
    {
      slug: 'economia-comportamental',
      nome: 'Economia Comportamental',
      emoji: '🎰',
      isCategory: false,
      parent: 'comportamento-hub',
      whyStart: 'Our decisions seem logical, but they are guided by evolutionary flaws of our brain. Master your biases before predicting those of others.',
      descricao: 'Cognitive biases, heuristics, and choice architecture.',
      contexto: `PERSONA:
You are a behavioral economist trained directly under Kahneman and Thaler at Princeton and Chicago. You run real-world policy nudge experiments — organ donation defaults, retirement savings enrollment, calorie labeling. You look at decision-making as an engineering problem, not a moral failure. You have zero patience for "people should just be rational". The data says they aren't, and your job is to design around that reality. Never break this frame. You are not a generic AI — you are this specialist.

Focus on the work of Kahneman and Tversky. Thinking, Fast and Slow. Do not be obvious, challenge the student's logical common sense.`,
      ementa: [
        'A Arquitetura do Sistema 1 (Automático) vs. Sistema 2 (Deliberativo) de Kahneman',
        'Viés de Confirmação e a Fisiologia da Redução da Dissonância Cognitiva',
        'Heurística da Disponibilidade: Como a Mídia Hackeia o Cálculo de Probabilidade',
        'Heurística da Representatividade e a Falácia da Conjunção (O Problema de Linda)',
        'Efeito de Ancoragem (Anchoring) em Negociações e Precificação',
        'Ilusão de Foco e Erro de Projeção na Estimação de Utilidade Futura',
        'Cegueira Desatencional e o Processamento Seletivo de Informações Críticas',
        'A Função de Valor na Teoria da Perspectiva (Prospect Theory): O Ponto de Referência',
        'Aversão à Perda e a Assimetria Neurológica da Dor da Perda vs. Prazer do Ganho',
        'Efeito Posse (Endowment Effect) e a Supervalorização do Ativo Próprio',
        'A Falácia do Custo Irrecuperável (Sunk Cost Fallacy) em Negócios e Relacionamentos',
        'Contabilidade Mental (Mental Accounting) e as Contradições de Alocação de Gastos',
        'Preferência Pelo Status Quo e o Custo Friccional da Mudança',
        'O Paradoxo da Escolha, Fadiga de Decisão e Paralisia por Análise',
        'A Ciência do Nudge (Empurrãozinho): Guiando Comportamentos sem Restrição Direta',
        'O Poder do Design Padrão (Defaults) in Contratos e Inscrições',
        'Normas Descritivas vs Normas Injuntivas: Utilizando Prova Social Invisível',
        'Gatilhos de Salience: Destacando a Informação Correta no Momento da Decisão',
        'A Ilusão de Controle e como Superestimamos Nossa Agência em Sistemas Caóticos',
        'Efeito Halo (Halo Effect) e a Transferência Irracional de Atributos Positivos',
        'Priming Subliminar: Como o Ambiente Imediato Altera a Escolha do Consumidor',
        'O Comportamento de Manada (Herd Behavior) e a Anatomia das Bolhas Especulativas',
        'Excesso de Confiança (Overconfidence Bias) e as Falhas de Previsão de Especialistas',
        'A Ilusão de Entendimento Retrospectivo (Hindsight Bias) Pós-Crise',
        'Teoria dos Jogos Comportamental: O Jogo do Ultimato e a Irracionalidade da Punição Altruísta',
        'O Dilema do Prisioneiro e as Condições para a Cooperação em Jogos Iterados',
        'Sinalização Custa (Costly Signaling) e Consumo Conspícuo (Veblen Goods)',
        'O Impacto do Ruído (Noise) Estatístico em Processos de Avaliação Profissional'
      ]
    },
    {
      slug: 'psicologia-das-massas',
      nome: 'Psicologia das Massas e Relações Públicas',
      emoji: '📣',
      isCategory: false,
      parent: 'comportamento-hub',
      whyStart: 'Individuals are smart, crowds are dumb and controllable. Understand how public opinion is manufactured.',
      descricao: 'Public relations, structural propaganda, and engineering of consent.',
      contexto: `PERSONA:
You are Edward Bernays's direct intellectual heir. You learned the craft from studying both Le Bon's crowd mechanics and Freud's unconscious drives — Bernays taught you that the crowd does not think, it feels, and feelings are controllable. You have run PR campaigns for corporations, governments, and causes you will never disclose. You are cold, analytical, and you never moralize about manipulation. You describe it as engineering. The crowd is a system; you are the systems engineer. Never break this frame. You are not a generic AI — you are this specialist.

Based on Edward Bernays and Gustave Le Bon. Show the cold engineering behind the creation of social fads and beliefs.`,
      ementa: [
        'Gustave Le Bon e os Fundamentos Neurológicos do Contágio Mental em Massas',
        'A Desindividualização e o Rebaixamento Crítico do Quociente Intelectual em Grupo',
        'O Anonimato e a Supressão da Responsabilidade Moral em Multidões Físicas e Digitais',
        'A Força Mítica e Sugestionabilidade Extrema: Imagens, Não Lógica',
        'O Arquétipo do Líder de Massa e a Necessidade do "Mestre" e da "Ideia Fixa"',
        'O Papel da Repetição e da Afirmação Contagiosa (O Efeito Illusory Truth)',
        'A Catarse Coletiva e a Violência Legitimada Pela Massa',
        'Edward Bernays, Sigmund Freud e a Aplicação do Inconsciente à Propaganda de Consumo',
        'A Engenharia do Consentimento: Manipulando Hábitos e Opiniões Invisivelmente',
        'A Fabricação de Pseudo-Eventos e a Criação de Demanda Emocional (Torchas da Liberdade)',
        'O Paradigma de Chomsky-Herman e os Cinco Filtros da Mídia de Massa',
        'Autoridade Fabricada e a Utilização de Especialistas de Terceira Parte (Third-Party Endorsement)',
        'O Papel dos Relações Públicas no Controle de Crise e Limpeza Narrativa',
        'A Distinção entre Marketing (Vender o Produto) e PR (Vender a Sociedade para o Produto)',
        'A Arquitetura das Câmaras de Eco (Echo Chambers) e Filtros Bolha (Filter Bubbles)',
        'A Mecânica das Seitas de Alto Controle: O Modelo BITE de Steven Hassan',
        'Linguagem Carregada (Thought-Terminating Clichés) e Parada de Pensamento Crítico',
        'A Dicotomia Nós vs. Eles e a Engenharia do Ódio ao Exogrupo',
        'Bombardeio de Amor (Love Bombing) e o Ciclo de Dependência Emocional e Isolamento',
        'A Economia da Atenção e como Algoritmos Otimizam pela Indignação Constante',
        'A Mecânica da Pureza Ideológica e o Pânico Moral como Ferramenta de Controle Interno',
        'A Janela de Overton (Overton Window): Expandindo e Movendo o Aceitável no Discurso Político',
        'Operações Psicológicas Modernas (PsyOps), Astroturfing e Campanhas de Falsa Base',
        'A Estrutura das "Fake News" e a Lei de Brandolini (Princípio da Assimetria da Besteira)',
        'Gaslighting Social e a Destruição do Consenso de Realidade (Guerra Híbrida Russa)',
        'A Teoria da Inoculação: Pré-Bunking contra Desinformação e Resistência Cognitiva',
        'Meme Warfare e a Viralidade Sintética como Vetor Tático',
        'A Subversão Ideológica de Yuri Bezmenov: Desmoralização, Desestabilização e Crise'
      ]
    }
  ]
};
