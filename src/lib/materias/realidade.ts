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
      fases: [
        {
          nome: 'Fase 1: A Máquina Preditiva',
          topicos: [
            'Processamento Preditivo: Seu cérebro adivinha o futuro a cada milissegundo',
            'A Realidade como uma "Alucinação Controlada" (Anil Seth)',
            'Princípio da Energia Livre (Karl Friston) e Sobrevivência'
          ]
        },
        {
          nome: 'Fase 2: Filtros Perceptivos',
          topicos: [
            'Como as Crenças alteram o Processamento Visual Top-Down',
            'Neuroplasticidade Autodirigida: Remodelagem da Sinapse',
            'A Ilusão do Eu: Consciência como Construto Evolutivo'
          ]
        }
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
      fases: [
        {
          nome: 'Fase 1: O Micro',
          topicos: [
            'O Problema da Medição e o Colapso da Função de Onda',
            'Interpretação de Copenhague vs Muitos Mundos (Everett)',
            'Entrelaçamento Quântico e a Não-Localidade'
          ]
        },
        {
          nome: 'Fase 2: O Macro e o Caos',
          topicos: [
            'Entropia e a Seta do Tempo (Segunda Lei da Termodinâmica)',
            'Teoria do Caos e o Efeito Borboleta em Sistemas Não-Lineares',
            'Cibernética e Loops de Feedback Positivo/Negativo',
            'Emergência: Como a soma das partes gera algo totalmente novo'
          ]
        }
      ]
    }
  ]
};
