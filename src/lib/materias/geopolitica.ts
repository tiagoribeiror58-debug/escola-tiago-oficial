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
      fases: [
        {
          nome: 'Fase 1: O Tabuleiro Geográfico',
          topicos: [
            'O Determinismo Geográfico: Rios, Montanhas e Oceanos',
            'A Teoria do Heartland (Mackinder) e Rimland (Spykman)',
            'Chokepoints: Estreitos de Ormuz, Malaca e o Poder Naval'
          ]
        },
        {
          nome: 'Fase 2: A Moeda e a Energia',
          topicos: [
            'Petrodólar e a Hegemonia Americana',
            'A Geopolítica da Transição Energética (Lítio, Terras Raras)',
            'Guerra Fria 2.0: Semicondutores e Taiwan'
          ]
        }
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
      fases: [
        {
          nome: 'Fase 1: O Grande Ciclo',
          topicos: [
            'As Fases do Império: Ascensão, Topo e Declínio',
            'Ciclos de Dívida de Longo Prazo e Impressão de Dinheiro',
            'O Surgimento de Conflitos Internos (Desigualdade Extrema)'
          ]
        },
        {
          nome: 'Fase 2: Transição de Poder',
          topicos: [
            'O Império Holandês, Britânico e o Padrão Ouro',
            'O Conflito Externo: Potência Ascendente vs Potência Estabelecida',
            'O Novo Multilateralismo e Blocos Econômicos'
          ]
        }
      ]
    }
  ]
};
