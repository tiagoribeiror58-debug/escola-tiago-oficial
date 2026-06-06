import { MateriaConfig } from '@/types';

export const economia: MateriaConfig = {
  id: 'economia-1',
  nome: 'Economia',
  slug: 'economia',
  cor: 'bg-emerald-500',
  icone: 'LineChart',
  descricao: 'Entenda como o mundo gira: de micro decisões individuais até a macroeconomia das nações.',
  contexto: 'Economia é a ciência da escassez e da escolha. O aluno é autodidata e busca compreensão conceitual profunda com foco em leitura de mundo, modelos mentais, mercados e políticas, sem a sobrecarga pesada do cálculo exigido em pós-graduação acadêmica.',
  fases: [
    {
      nome: 'Fase 1 - Fundamentos',
      topicos: [
        'O que é economia - escassez, escolha e custo de oportunidade',
        'Vantagem comparativa e ganhos de troca - por que as pessoas e países comercializam',
        'Oferta e demanda - os motores básicos da economia',
        'Elasticidade - como preço afeta quantidade comprada/vendida',
        'Como os preços se formam no mercado (Equilíbrio de mercado)',
        'Excedente do consumidor e do produtor - entendendo a eficiência do mercado',
        'Falhas de mercado - monopólio, externalidades e bens públicos',
        'Bens comuns e a Tragédia dos Comuns - esgotamento de recursos compartilhados',
        'O que é PIB, inflação e desemprego - os grandes indicadores',
        'Diferença entre micro e macroeconomia'
      ]
    },
    {
      nome: 'Fase 2 - Intermediário',
      topicos: [
        'Micro: Comportamento do consumidor - utilidade e preferências',
        'Micro: Restrição orçamentária e a matemática das escolhas',
        'Micro: Teoria da firma - custos (fixos/variáveis), receita e lucro',
        'Micro: Estruturas de mercado - concorrência perfeita, monopólio, oligopólio',
        'Micro: Concorrência monopolística e diferenciação de produtos',
        'Micro: Mercado de trabalho - formação de salários e emprego',
        'Micro: Desigualdade, pobreza e distribuição de renda',
        'Macro: O sistema financeiro e a criação do dinheiro - papel dos bancos',
        'Macro: Política fiscal - gastos públicos, impostos e dívida do governo',
        'Macro: Política monetária - taxa de juros (Selic), inflação e o Banco Central',
        'Macro: Câmbio - como funciona, regimes cambiais e por que a moeda oscila',
        'Macro: Ciclos econômicos - crescimento, superaquecimento, crise e recessão',
        'Macro: Crescimento econômico a longo prazo - capital, tecnologia e instituições'
      ]
    },
    {
      nome: 'Fase 3 - Avançado e Aplicações',
      topicos: [
        'História do pensamento econômico - Clássicos, Marx, Keynes, Escola Austríaca',
        'Teoria dos Jogos e Estratégia - Dilema do Prisioneiro e Equilíbrio de Nash',
        'Economia da Informação - assimetria, seleção adversa e risco moral',
        'Economia comportamental - heurísticas, vieses cognitivos e Nudges',
        'Finanças Públicas e Tributação - eficiência dos impostos, peso morto e Curva de Laffer',
        'Economia internacional - protecionismo, tarifas e balanço de pagamentos',
        'Econometria básica - como provar (ou refutar) teorias com dados reais',
        'Economia brasileira - Era da hiperinflação, Plano Real, e desafios estruturais atuais'
      ]
    }
  ]
};
