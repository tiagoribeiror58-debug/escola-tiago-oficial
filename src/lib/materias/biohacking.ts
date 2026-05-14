import { MateriaConfig } from '@/types';

export const biohackingHub: MateriaConfig = {
  slug: 'biohacking-hub',
  nome: 'Bio-Engenharia & Antifragilidade',
  emoji: '🧬',
  isCategory: true,
  descricao: 'Otimização implacável do hardware humano. Neurologia, longevidade e resistência a estresse extremo.',
  children: [
    {
      slug: 'fisiologia-extrema',
      nome: 'Mecânica do Hardware Humano',
      emoji: '🔋',
      isCategory: false,
      parent: 'biohacking-hub',
      whyStart: 'Seu cérebro roda em um servidor biológico. Se o servidor capengar, seu intelecto não importa.',
      descricao: 'Otimização de sono, ritmo circadiano e vias metabólicas (mTOR, AMPK).',
      contexto: 'Foco científico puro (Huberman, Peter Attia). Sem pseudociência. Explique a via metabólica antes de falar o que fazer.',
      fases: [
        {
          nome: 'Fase 1: O Ciclo de Restauração',
          topicos: [
            'Arquitetura do Sono (REM, Slow-Wave) e Pressão de Adenosina',
            'O Ritmo Circadiano e os Fótons no Olho',
            'Cronobiologia e Picos de Cortisol'
          ]
        },
        {
          nome: 'Fase 2: Vias Metabólicas & Longevidade',
          topicos: [
            'A Via mTOR: Crescimento celular vs Envelhecimento',
            'AMPK e Autofagia: Reciclagem Celular pelo Jejum',
            'Sensibilidade à Insulina e Energia Mitocondrial',
            'Zona 2 de Cardio: A base da resistência física'
          ]
        }
      ]
    },
    {
      slug: 'neuroquimica-foco',
      nome: 'Protocolos de Neuroquímica',
      emoji: '⚡',
      isCategory: false,
      parent: 'biohacking-hub',
      whyStart: 'Motivação é um mito; o que existe é balanço de dopamina. Domine a química e você domina o comportamento.',
      descricao: 'Gestão de Dopamina, estado de Flow e resistência a estresse agudo.',
      contexto: 'Foco na engenharia de neurotransmissores. Tratamento do corpo como máquina de outputs.',
      fases: [
        {
          nome: 'Fase 1: Os Circuitos Base',
          topicos: [
            'O Erro de Previsão de Recompensa (Mecânica da Dopamina)',
            'Serotonina vs Dopamina: Saciedade vs Busca',
            'Reset de Receptores: "Jejum" de Dopamina'
          ]
        },
        {
          nome: 'Fase 2: Performance sob Fogo',
          topicos: [
            'O Sistema Nervoso Autônomo (Simpático vs Parassimpático)',
            'Controle de Estresse Agudo via Respiração (Physiological Sigh)',
            'Neuroplasticidade Dirigida: Como forçar o cérebro a aprender'
          ]
        }
      ]
    }
  ]
};
