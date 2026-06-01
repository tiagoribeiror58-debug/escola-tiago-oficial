import { MateriaConfig } from '@/types';

export const elonMuskHub: MateriaConfig = {
  slug: 'elon-musk-engineering',
  nome: 'Engenharia Elon Musk',
  emoji: '🚀',
  isCategory: true,
  descricao: 'Estudo aprofundado dos processos mentais, gestão radical, e primeiros princípios que impulsionam o homem mais produtivo do mundo.',
  children: [
    {
      slug: 'musk-primeiros-principios',
      nome: 'First Principles Thinking',
      emoji: '🧠',
      parent: 'elon-musk-engineering',
      whyStart: 'A fundação intelectual de Musk. Sem isso, você está apenas iterando sobre o passado.',
      descricao: 'Desconstrução da realidade até suas verdades fundamentais.',
      contexto: `Foco: A metodologia mental de Musk para inovação disruptiva. Evite clichês de autoajuda. Aborde física, lógica e quebra de paradigmas de mercado.`,
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
      nome: 'Gestão Radical e Hardcore',
      emoji: '⚔️',
      parent: 'elon-musk-engineering',
      whyStart: 'Como liderar times pequenos para construir empresas de trilhões de dólares.',
      descricao: 'Microgerenciamento cirúrgico, eliminação de burocracia e ritmo insano.',
      contexto: `Foco: A abordagem de Musk para liderança e execução empresarial. Foco no pragmatismo extremo, reuniões inúteis e cultura de urgência.`,
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
      nome: 'Risco, Capital e Sobrevivência',
      emoji: '💰',
      parent: 'elon-musk-engineering',
      whyStart: 'Musk quase quebrou várias vezes. Como ele gerencia o risco da ruína?',
      descricao: 'Apostando a empresa inteira, levantamento de capital e sobrevivência no limite.',
      contexto: `Foco: A psicologia do risco extremo de Musk, como ele sobrevive a "near-death experiences" corporativas e financia o impossível.`,
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
