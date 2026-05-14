import { MateriaConfig } from '@/types';

export const comportamentoHub: MateriaConfig = {
  slug: 'comportamento-hub',
  nome: 'Engenharia Comportamental & Massas',
  emoji: '🧠',
  isCategory: true,
  descricao: 'Como o cérebro humano falha, como as multidões são guiadas e a ciência da tomada de decisão sob incerteza.',
  children: [
    {
      slug: 'economia-comportamental',
      nome: 'Economia Comportamental',
      emoji: '🎰',
      isCategory: false,
      parent: 'comportamento-hub',
      whyStart: 'Nossas decisões parecem lógicas, mas são guiadas por falhas evolutivas do nosso cérebro. Domine seus vieses antes de prever o dos outros.',
      descricao: 'Vieses cognitivos, heurísticas e arquitetura de escolhas.',
      contexto: 'Foco no trabalho de Kahneman e Tversky. Rápido e Devagar. Não seja óbvio, desafie o senso comum lógico do aluno.',
      fases: [
        {
          nome: 'Fase 1: O Sistema 1 e Sistema 2',
          topicos: [
            'Pensamento Rápido vs Devagar: Anatomia da Decisão',
            'Viés de Confirmação e a Cegueira Induzida',
            'Aversão à Perda: A matemática de não querer perder',
            'Heurística de Disponibilidade e Ancoragem'
          ]
        },
        {
          nome: 'Fase 2: Arquitetura de Escolha (Nudge)',
          topicos: [
            'Como desenhar sistemas que induzem ações (Nudge)',
            'Efeito Halo e Dissonância Cognitiva',
            'O Paradoxo da Escolha: Menos é Mais'
          ]
        }
      ]
    },
    {
      slug: 'psicologia-das-massas',
      nome: 'Psicologia das Multidões & PR',
      emoji: '📣',
      isCategory: false,
      parent: 'comportamento-hub',
      whyStart: 'Indivíduos são espertos, multidões são burras e controláveis. Entenda como a opinião pública é fabricada.',
      descricao: 'Relações públicas, propaganda estrutural e engenharia de consentimento.',
      contexto: 'Base em Edward Bernays e Gustave Le Bon. Mostre a engenharia fria por trás da criação de modas e crenças sociais.',
      fases: [
        {
          nome: 'Fase 1: A Mente da Multidão',
          topicos: [
            'Gustave Le Bon e a Alma das Multidões',
            'Contágio Mental e Comportamento de Manada',
            'Desindividualização em Massa'
          ]
        },
        {
          nome: 'Fase 2: Engenharia de Consentimento',
          topicos: [
            'Edward Bernays e o Nascimento do PR Moderno',
            'A Estrutura da Propaganda Invisível',
            'Autoridade Fabricada e o Papel do Porta-Voz'
          ]
        }
      ]
    }
  ]
};
