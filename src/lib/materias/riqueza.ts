import { MateriaConfig } from '@/types';

export const riquezaHub: MateriaConfig = {
  slug: 'riqueza-hub',
  nome: 'Alocação & Defesa de Capital',
  emoji: '🏦',
  isCategory: true,
  descricao: 'A mecânica de reter, multiplicar e proteger recursos. Compreensão estrutural de dinheiro como energia matemática.',
  children: [
    {
      slug: 'macroeconomia',
      nome: 'Macroeconomia Aplicada',
      emoji: '📉',
      isCategory: false,
      parent: 'riqueza-hub',
      whyStart: 'Você não pode jogar o jogo se não entender as regras do tabuleiro em que a inflação e os juros operam.',
      descricao: 'Ciclos de mercado, políticas monetárias e leitura de cenário global.',
      contexto: 'Foco técnico e não ideológico. Entenda como Bancos Centrais movem o dinheiro e como isso afeta ativos reais.',
      fases: [
        {
          nome: 'Fase 1: O Motor da Economia',
          topicos: [
            'O que é Moeda Fiduciária e Efeito Cantillon',
            'Como os Bancos Centrais Controlam Juros e Liquidez',
            'Inflação vs Deflação: O Verdadeiro Imposto Oculto',
            'Ciclos de Crédito e Expansão Econômica'
          ]
        },
        {
          nome: 'Fase 2: Leitura de Cenários',
          topicos: [
            'Análise de Curva de Juros (Yield Curve)',
            'Relação entre Dólar, Ouro e Ativos de Risco',
            'Como Governos gerenciam Dívida Pública'
          ]
        }
      ]
    },
    {
      slug: 'engenharia-financeira',
      nome: 'Engenharia Financeira & Assimetria',
      emoji: '⚖️',
      isCategory: false,
      parent: 'riqueza-hub',
      whyStart: 'Ganhar dinheiro é diferente de protegê-lo. A verdadeira riqueza está em expor-se a riscos assimétricos positivos.',
      descricao: 'Opções, Hedge, estruturação de portfólio antifrágil e proteção patrimonial.',
      contexto: 'Foco em mitigação de ruína (Nassim Taleb). Como estruturar um portfólio para sobreviver ao caos.',
      fases: [
        {
          nome: 'Fase 1: Matemática do Risco',
          topicos: [
            'Valor Esperado vs Probabilidade de Ruína',
            'A Filosofia Antifrágil (Nassim Taleb) em Portfólios',
            'Estratégia Barbell: Extremo conservadorismo + Extrema agressividade'
          ]
        },
        {
          nome: 'Fase 2: Instrumentos de Defesa',
          topicos: [
            'Derivativos e Opções para Seguro de Portfólio (Hedge)',
            'Diversificação Geográfica e Descorrelação de Ativos',
            'Engenharia Tributária: Fundos Exclusivos e Estruturação Offshore Básica'
          ]
        }
      ]
    }
  ]
};
