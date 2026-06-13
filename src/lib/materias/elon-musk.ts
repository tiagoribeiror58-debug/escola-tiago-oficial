import { MateriaConfig } from '@/types';

export const elonMuskHub: MateriaConfig = {
  slug: 'elon-musk-engineering',
  nome: 'Elon Musk Engineering',
  emoji: '🚀',
  isCategory: true,
  descricao: 'In-depth study of the mental processes, radical management, and first principles that drive the most productive man in the world.',
  children: [
    {
      slug: 'musk-primeiros-principios',
      nome: 'First Principles Thinking',
      emoji: '🧠',
      parent: 'elon-musk-engineering',
      whyStart: 'The intellectual foundation of Musk. Without this, you are just iterating on the past.',
      descricao: 'Deconstruction of reality down to its fundamental truths.',
      contexto: `Focus: Musk's mental methodology for disruptive innovation. Avoid self-help clichés. Address physics, logic, and market paradigm shifts.`,
      ementa: [
        'O que é o Raciocínio por Primeiros Princípios (First Principles)',
        'Raciocínio por Analogia vs. Primeiros Princípios',
        'Desconstruindo Custos: O Caso da SpaceX e Foguetes Reutilizáveis',
        'A Física como Limite: Se não viola as leis da física, é possível',
        'Identificando Falsos Axiomas no Mercado Tradicional',
        'A Algoritmização do Pensamento: "The Algorithm" de Musk',
        'Step 1: Questione os Requisitos (Eles são estúpidos)',
        'Step 2: Delete Partes e Processos',
        'Step 3: Simplifique e Otimize',
        'Step 4: Acelere o Tempo de Ciclo',
        'Step 5: Automatize (Apenas no final)'
      ]
    },
    {
      slug: 'musk-hardcore-management',
      nome: 'Radical & Hardcore Management',
      emoji: '⚔️',
      parent: 'elon-musk-engineering',
      whyStart: 'How to lead small teams to build trillion-dollar companies.',
      descricao: 'Surgical micromanagement, elimination of bureaucracy, and insane pacing.',
      contexto: `Focus: Musk's approach to leadership and business execution. Focus on extreme pragmatism, useless meetings, and a culture of urgency.`,
      ementa: [
        'A Regra de Ouro das Reuniões: Saia se não estiver agregando valor',
        'Hierarquia Achatada e Comunicação Direta (Zero Cadeia de Comando)',
        'A Expectativa Hardcore: Longas Horas, Alta Intensidade',
        'O Engenheiro-Chefe: Por que o CEO DEVE saber de engenharia',
        'Contratando Excepcionais: O teste prático e a cultura de excelência',
        'Demissão Rápida: Eliminando detratores e conformistas',
        'O "Idiot Index": Calculando o custo dos componentes vs. matéria-prima',
        'Cultura de Propósito Extremo: Missões Interplanetárias e Salvação Humana',
        'Prazos Impossíveis (Elon Time) e Compressão de Cronogramas',
        'Trabalhando no Chão de Fábrica (Liderança pelo Exemplo)'
      ]
    },
    {
      slug: 'musk-risco-alocacao',
      nome: 'Risk, Capital & Survival',
      emoji: '💰',
      parent: 'elon-musk-engineering',
      whyStart: 'Musk almost went broke several times. How does he manage the risk of ruin?',
      descricao: 'Betting the whole company, fundraising, and survival on the edge.',
      contexto: `Focus: Musk's extreme risk psychology, how he survives corporate near-death experiences, and funds the impossible.`,
      ementa: [
        'Apostando Tudo: O Natal de 2008 (Tesla e SpaceX à beira da falência)',
        'A Ilusão do Risco Pessoal: Por que não ter medo de voltar à estaca zero',
        'Financiando o Impossível: O Papel dos Subsídios e Contratos do Governo',
        'Economia de Escala Absoluta (A Lógica das Gigafactories)',
        'O Modelo de Receita Atípico (Venda de Créditos de Carbono)',
        'Verticalização Extrema: Fazendo tudo in-house para cortar dependência',
        'A Alavancagem do Twitter/X: Mídia Própria vs. Relações Públicas Tradicionais'
      ]
    }
  ]
};
