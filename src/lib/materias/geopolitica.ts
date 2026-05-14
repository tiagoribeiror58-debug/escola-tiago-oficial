import { MateriaConfig } from '@/types';

export const geopoliticaHub: MateriaConfig = {
  slug: 'geopolitica-hub',
  nome: 'Geopolítica & Macro-História',
  emoji: '🌍',
  isCategory: true,
  descricao: 'Compreensão das engrenagens do mundo. Dinâmicas de poder, recursos, geografia e ascensão e queda de impérios.',
  children: [
    {
      slug: 'geopolitica-estrategica',
      nome: 'Geopolítica de Recursos e Poder',
      emoji: '🗺️',
      isCategory: false,
      parent: 'geopolitica-hub',
      whyStart: 'Você não entende o noticiário porque ignora a geografia e a energia. Países não têm amigos, têm interesses.',
      descricao: 'Teoria do Heartland, rotas marítimas, dependência energética e hegemonia global.',
      contexto: 'Análise fria baseada em geografia, energia e demografia. Nada de ideologia ou viés partidário. Foco em Ray Dalio e Peter Zeihan.',
      ementa: [
        'O Determinismo Geográfico e as Fronteiras Naturais Insuperáveis',
        'A Teoria do Heartland (Halford Mackinder) e o Controle da Ilha Mundial',
        'A Teoria do Rimland (Nicholas Spykman) e o Contenção Naval',
        'Poder Marítimo (Alfred Thayer Mahan) vs. Poder Terrestre',
        'Chokepoints Estratégicos I: Estreito de Ormuz, Bab el-Mandeb e o Mar Vermelho',
        'Chokepoints Estratégicos II: Estreito de Malaca e o Dilema de Segurança Chinês',
        'O Canal do Panamá, Canal de Suez e o Controle Logístico Global',
        'A Doutrina Monroe e o Hemisfério Ocidental Incontestável',
        'Geopolítica da Água Potável e os Conflitos Ribeirinhos (Nilo, Tigre-Eufrates)',
        'O Sistema de Petrodólar: O Acordo Saudita-Americano de 1974',
        'A Maldição dos Recursos e a Economia de Rent-Seeking (Estados Rentistas)',
        'Segurança Energética e a Transição (Metais de Bateria, Lítio, Cobalto)',
        'O Monopólio das Terras Raras e a Guerra Comercial Sino-Americana',
        'Inverno Demográfico: O Colapso das Pirâmides Etárias na Europa e Japão',
        'A Política do Filho Único e a Contração Estrutural da Mão de Obra Chinesa',
        'Bônus Demográfico vs. Bomba Relógio: Índia e o Continente Africano',
        'A Globalização como Fenômeno Patrocinado pela Marinha dos EUA (Bretton Woods)',
        'Deglobalização (Peter Zeihan) e a Balcanização das Cadeias de Suprimentos',
        'Nearshoring, Friendshoring e a Reindustrialização Estratégica',
        'Semicondutores: O "Novo Petróleo" e o Escudo de Silício de Taiwan',
        'O Domínio da ASML e a Estrangulação Tecnológica (Chokeholds de Patentes)',
        'Inteligência Artificial Soberana: A Nova Corrida Armamentista Digital',
        'Ciberespaço e as Vulnerabilidades de Infraestruturas Críticas',
        'Corrida Espacial 2.0: Órbita Baixa da Terra (LEO) e Armas Anti-Satélite'
      ]
    },
    {
      slug: 'macro-historia',
      nome: 'Ascensão e Queda de Impérios',
      emoji: '🏛️',
      isCategory: false,
      parent: 'geopolitica-hub',
      whyStart: 'A história não se repete, mas ela rima. Entender os ciclos longos previne surpresas catastróficas.',
      descricao: 'Ciclos de dívida, ordem mundial e revoluções estruturais.',
      contexto: 'Foco na obra "Changing World Order" de Ray Dalio. Explique os ciclos de dívida de longo prazo e a transição de hegemonia.',
      ementa: [
        'O Grande Ciclo de Ray Dalio: Arquitetura da Ascensão, Topo e Declínio de Impérios',
        'A Relação entre Educação, Inovação Tecnológica e Competitividade Comercial',
        'A Construção do Centro Financeiro Global e o Status de Moeda de Reserva',
        'Os Sinais de Topo: Expansão Excessiva, Gastos Militares e Endividamento Irreversível',
        'O Ciclo de Dívida de Longo Prazo e a Alavancagem Terminal do Estado',
        'Monetização da Dívida (Impressão de Dinheiro) e a Fuga para Ativos Reais',
        'O Aprofundamento do Fosso de Riqueza e a Polarização Política Interna',
        'O Gatilho de Conflito Interno: Guerra Civil Fria vs. Guerra Civil Quente',
        'Transição de Poder Hegemônico: O Paradigma Holandês vs Britânico',
        'O Colapso do Império Britânico após as Guerras Mundiais e a Ascensão do Dólar',
        'O Conflito Externo: Armadilha de Tucídides e a Paridade de Potências',
        'Guerras por Proxy (Procuração) e a Batalha nas Margens dos Impérios',
        'A Estruturação de Novos Blocos Econômicos e Multilateralismo Defensivo',
        'A Anatomia Financeira das Revoluções Civis (França 1789, Rússia 1917)',
        'Fuga de Cérebros e a Migração de Capital Intelectual em Tempos de Crise',
        'Refúgios Geográficos Seguros e as Jurisdições Neutras',
        'Cisnes Negros Históricos: O Papel de Pandemias e Choques Climáticos',
        'O Fator Exógeno: Como Saltos Tecnológicos Repentinos Alteram a Hegemonia',
        'O Novo Equilíbrio de Poder e as Regras da Próxima Ordem Mundial'
      ]
    }
  ]
};
