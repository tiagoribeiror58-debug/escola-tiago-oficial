import { MateriaConfig } from '@/types';

export const realidadeHub: MateriaConfig = {
  slug: 'realidade-hub',
  nome: 'Ontologia & Mecânica da Realidade',
  emoji: '🌌',
  isCategory: true,
  descricao: 'Física quântica interpretativa, neurociência da percepção e teoria dos sistemas complexos. A ciência profunda por trás do que molda a realidade.',
  children: [
    {
      slug: 'percepcao-sistemas',
      nome: 'Neurociência da Percepção',
      emoji: '👁️',
      isCategory: false,
      parent: 'realidade-hub',
      whyStart: 'Antes de querer "co-criar" algo, você precisa entender que a realidade que você vê já é uma construção simulada pelo seu cérebro.',
      descricao: 'O processamento preditivo do cérebro, alucinação controlada e os limites empíricos da visão.',
      contexto: 'Foco científico rígido (Anil Seth, Karl Friston). Destrua qualquer noção de autoajuda. Mostre como o cérebro adivinha o mundo antes de percebê-lo.',
      ementa: [
        'Processamento Preditivo: Seu cérebro adivinha o futuro a cada milissegundo',
        'A Realidade como uma "Alucinação Controlada" (Anil Seth)',
        'Princípio da Energia Livre (Karl Friston) e Sobrevivência',
        'Como as Crenças alteram o Processamento Visual Top-Down',
        'Neuroplasticidade Autodirigida: Remodelagem da Sinapse',
        'A Ilusão do Eu: Consciência como Construto Evolutivo',
        'Qualia: O Problema Difícil da Consciência (David Chalmers)',
        'O Espaço de Trabalho Global (Baars) e a Atenção',
        'Estados Alterados e a Dissolução do Ego (Mecânica Neurológica)',
        'Reestruturação Cognitiva: O poder de mudar o Frame',
        'Modelos Mentais como Algoritmos de Compressão da Realidade',
        'Linguagem e o Paradigma de Sapir-Whorf'
      ]
    },
    {
      slug: 'sistemas-quanticos',
      nome: 'Física e Sistemas Complexos',
      emoji: '⚛️',
      isCategory: false,
      parent: 'realidade-hub',
      whyStart: 'Entenda os limites físicos e matemáticos do universo para não cair em charlatanismo de "física quântica para riqueza".',
      descricao: 'As interpretações da mecânica quântica, entropia, teoria do caos e sistemas cibernéticos.',
      contexto: 'Ensine a incerteza estatística. O Princípio de Heisenberg não significa que pensamento vira matéria. Ensine a física real de forma que gere deslumbramento filosófico.',
      ementa: [
        'O Problema da Medição e o Colapso da Função de Onda',
        'Interpretação de Copenhague vs Muitos Mundos (Everett)',
        'Entrelaçamento Quântico e a Não-Localidade',
        'Entropia e a Seta do Tempo (Segunda Lei da Termodinâmica)',
        'Teoria do Caos e o Efeito Borboleta em Sistemas Não-Lineares',
        'Cibernética e Loops de Feedback Positivo/Negativo',
        'Emergência: Como a soma das partes gera algo totalmente novo',
        'Segunda Ordem da Cibernética: O Observador no Sistema',
        'Homeostase e Atratores Estranhos (Sistemas Dinâmicos)',
        'Autopoiese: A mecânica da vida (Maturana e Varela)',
        'Determinismo de Laplace vs Livre Arbítrio Estatístico',
        'Teorema da Incompletude de Gödel (Os Limites da Lógica)',
        'Reducionismo vs Holismo Pragmático'
      ]
    }
  ]
};
