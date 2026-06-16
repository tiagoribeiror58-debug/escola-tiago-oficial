import { MateriaConfig } from '@/types';

export const gestaoSistemasHub: MateriaConfig = {
  slug: 'gestao-sistemas',
  nome: 'Gestão, Processos & Sistemas',
  emoji: '⚙️',
  isCategory: true,
  descricao: 'Não aprenda ferramentas, aprenda os fundamentos universais. Como organizar empresas, equipes e a própria vida criando sistemas que funcionam sozinhos.',
  children: [
    {
      slug: 'sistemas-fundamentos',
      nome: 'Fundamentos de Sistemas & Gestão',
      emoji: '🔄',
      parent: 'gestao-sistemas',
      whyStart: 'Se você foca em metas, você ganha uma vez. Se você foca em sistemas, você ganha para sempre.',
      descricao: 'O canivete suíço de operações: processos, dados, projetos e automações em um único fluxo de aprendizado.',
      contexto: `Foco: Ensinar o aluno a enxergar tudo como um sistema, mapear fluxos, organizar dados e criar automações sólidas.`,
      fases: [
        {
          nome: 'Fase 1 — O Motor Lógico (Systems Thinking & Projetos)',
          topicos: [
            'Sistemas vs. Metas: A filosofia aplicada à gestão',
            'Inputs, Outputs e Feedback Loops: A anatomia de qualquer processo',
            'Projetos vs. Processos (Operações contínuas vs. Esforço temporário)',
            'A Tríplice Restrição: Escopo, Tempo e Custo',
            'Quebra de Escopo (WBS/EAP): Como fatiar o elefante',
            'Scrum na Prática: Papéis, Cerimônias e Artefatos',
            'Gestão de Sprints e Daily Stand-ups'
          ]
        },
        {
          nome: 'Fase 2 — A Engrenagem (Processos e Automação)',
          topicos: [
            'SOPs (Standard Operating Procedures) e o Manifesto do Checklist',
            'A Teoria das Restrições (Gargalos) e a Lei de Parkinson',
            'Kanban Avançado: Limitando WIP e Métricas de Fluxo',
            'APIs para Leigos: Como os softwares conversam na internet',
            'Gatilhos, Ações e Webhooks na Automação (Make/Zapier)',
            'Design de Sistemas à prova de falhas humanas (Poka-Yoke)'
          ]
        },
        {
          nome: 'Fase 3 — O Cérebro (Dados e Gestão do Conhecimento)',
          topicos: [
            'Bancos de Dados Relacionais vs. Listas Planas',
            'A Regra de Ouro da Normalização: Uma informação, um único lugar',
            'Estado Mestre e o conceito de "Single Source of Truth"',
            'O Método P.A.R.A: Projetos, Áreas, Recursos e Arquivos',
            'Progressive Summarization e Zettelkasten',
            'Alavancagem (Leverage): Resultados exponenciais e Manutenção de Sistemas'
          ]
        }
      ]
    },
    {
      slug: 'engenharia-producao',
      nome: 'Engenharia de Produção',
      emoji: '🏭',
      parent: 'gestao-sistemas',
      whyStart: 'Engenharia de Produção é a ciência de fazer mais com menos, sem abrir mão da qualidade. Quem domina isso consegue enxergar gargalos e oportunidades que outros simplesmente não veem.',
      descricao: 'Do chão de fábrica à cadeia global: como projetar, operar e melhorar sistemas produtivos com rigor e método.',
      contexto: 'O aluno busca compreensão conceitual da Engenharia de Produção sem a carga de cálculo acadêmico pesado. Foco em modelos mentais, ferramentas aplicáveis e lógica de otimização. Quando citar autores ou frameworks, diga de onde vieram (ex: Taiichi Ohno, Toyota Production System, 1978).',
      fases: [
        {
          nome: 'Fase 1 — Fundamentos: Como Sistemas Produtivos Funcionam',
          topicos: [
            'O que é Engenharia de Produção — escopo, diferença de outras engenharias e onde atua',
            'Sistema de Produção: definição de inputs, processos, outputs e feedback',
            'Tipos de layout industrial: linha, célula, job shop e por projeto — quando usar cada um',
            'Produção Discreta vs. Contínua — diferença prática entre fabricar carros e refinar petróleo',
            'Capacidade produtiva: o que é, como calcular e por que é sempre menor que o teórico',
            'Tempo de ciclo, Takt Time e Lead Time — os três relógios de qualquer operação',
            'Gargalo (Bottleneck): identificando o ponto que dita a velocidade de todo o sistema',
            'Teoria das Restrições (TOC) — Eliyahu Goldratt e os 5 passos de focalização',
            'Estoque: por que ele existe, o que esconde e qual o seu custo real',
            'Introdução à Qualidade: o que significa qualidade em produção (conformidade vs. valor percebido)'
          ]
        },
        {
          nome: 'Fase 2 — Intermediário: Ferramentas e Métodos de Otimização',
          topicos: [
            'Sistema Toyota de Produção (TPS) — Taiichi Ohno e os pilares Just-in-Time e Jidoka',
            'Lean Manufacturing: os 7 desperdícios (Muda) que destroem produtividade',
            'Value Stream Mapping (VSM): mapear o fluxo de valor para enxergar onde o tempo some',
            '5S: organização do ambiente como pré-requisito para qualquer melhoria sustentável',
            'Kaizen: melhoria contínua incremental vs. inovação radical — quando usar cada um',
            'Controle Estatístico do Processo (CEP): como usar dados para prever defeitos antes de ocorrerem',
            'Seis Sigma (Six Sigma): o método DMAIC e o que significa "3,4 defeitos por milhão"',
            'Manutenção Produtiva Total (TPM) e o indicador OEE (Eficiência Global do Equipamento)',
            'Planejamento e Controle da Produção (PCP): MRP, MRP II e a lógica dos planos de produção',
            'Gestão de Estoques: modelos EOQ, ponto de reposição e o custo do excesso vs. da falta',
            'Arranjo Físico e Fluxo: como o layout impacta diretamente o tempo e o custo de fabricação',
            'Ergonomia e Estudo do Trabalho: tempo padrão, folga e o método de cronoanálise'
          ]
        },
        {
          nome: 'Fase 3 — Avançado: Cadeia de Suprimentos, Qualidade e Estratégia',
          topicos: [
            'Supply Chain Management (SCM): da matéria-prima ao cliente final como um único sistema',
            'O Efeito Chicote (Bullwhip Effect): por que pequenas variações no varejo criam caos nas fábricas',
            'Logística e Distribuição: modais, roteirização e o trade-off entre custo e velocidade de entrega',
            'Compras e Gestão de Fornecedores: desenvolvimento, qualificação e riscos de dependência',
            'Normas ISO 9001 e a lógica de Sistemas de Gestão da Qualidade (SGQ)',
            'FMEA (Análise dos Modos de Falha e seus Efeitos): prevenindo falhas antes de acontecerem',
            'Pesquisa Operacional aplicada: Programação Linear e o problema de alocação de recursos',
            'Simulação de Sistemas: como modelar uma operação antes de construí-la',
            'Indústria 4.0: IoT, gêmeos digitais, automação e o que muda na lógica de produção',
            'Sustentabilidade em Operações: logística reversa, economia circular e pressão ESG',
            'Estratégia de Operações: como decisões de produção criam (ou destroem) vantagem competitiva'
          ]
        }
      ]
    }
  ]
};
