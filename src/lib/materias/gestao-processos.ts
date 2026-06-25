import { MateriaConfig } from '@/types';

export const gestaoSistemasHub: MateriaConfig = {
  slug: 'gestao-sistemas',
  nome: 'Gestão, Processos & Sistemas',
  emoji: '⚙️',
  isCategory: true,
  descricao: 'Não aprenda ferramentas, aprenda os fundamentos universais. Como organizar empresas, equipes e a própria vida criando sistemas que funcionam sozinhos.',
  contexto: `PERSONA:
You are a systems consultant who has redesigned operations in 30+ companies — from factory floors to software startups. You think in flows, bottlenecks, and leverage points. You have seen too many companies confuse activity with progress and motion with results. You never prescribe a tool before you understand the system. Never break this frame. You are not a generic AI — you are this specialist.`,
  children: [
    {
      slug: 'sistemas-fundamentos',
      nome: 'Fundamentos de Sistemas & Gestão',
      emoji: '🔄',
      parent: 'gestao-sistemas',
      whyStart: 'Se você foca em metas, você ganha uma vez. Se você foca em sistemas, você ganha para sempre.',
      descricao: 'O canivete suíço de operações: processos, dados, projetos e automações em um único fluxo de aprendizado.',
      contexto: `PERSONA:
You are a process engineer trained in systems dynamics who spent 10 years applying Goldratt's Theory of Constraints in real environments — manufacturing plants, logistics companies, software teams. You do not believe in best practices. You believe in understanding the constraints of a specific system and acting on the one thing that is actually the bottleneck. Never break this frame. You are not a generic AI — you are this specialist.

Foco: Ensinar o aluno a enxergar tudo como um sistema, mapear fluxos, organizar dados e criar automações sólidas.`,
      fases: [
        {
          nome: 'Fase 1 — O Motor Lógico (Systems Thinking & Modelos Mentais)',
          topicos: [
            'Sistemas vs. Metas: A filosofia estrutural aplicada à gestão',
            'Inputs, Processamento, Outputs e Feedback Loops: A anatomia de qualquer sistema',
            'Pensamento Sistêmico (Systems Thinking) na Prática: Enxergando o todo antes das partes',
            'A Dinâmica de Sistemas (System Dynamics) e o Efeito Cascata',
            'Alavancagem (Leverage Points): Como pequenas mudanças estruturais geram resultados exponenciais',
            'A Lei das Consequências Não Intencionais (Second-order Thinking)',
            'Sistemas Fechados vs Sistemas Abertos: Adaptação e Entropia Organizacional'
          ]
        },
        {
          nome: 'Fase 2 — Gestão de Projetos e Execução',
          topicos: [
            'Projetos vs. Processos (Operações contínuas vs. Esforço temporário com fim claro)',
            'A Tríplice Restrição do Gerenciamento de Projetos: Escopo, Tempo e Custo',
            'Quebra de Escopo (WBS/EAP): Como fatiar o elefante em tarefas acionáveis',
            'Gerenciamento Cascata (Waterfall) vs Metodologias Ágeis: Quando usar cada um',
            'O Framework Scrum na Prática: Papéis (PO, SM, Dev), Cerimônias e Artefatos',
            'Gestão de Sprints, Daily Stand-ups e Revisões de Entrega',
            'Gestão de Risco em Projetos: Como antecipar o que vai dar errado (Pré-mortem)',
            'Gestão de Stakeholders: Comunicação assíncrona vs síncrona em projetos complexos'
          ]
        },
        {
          nome: 'Fase 3 — Operações e Engenharia de Processos',
          topicos: [
            'BPMN (Business Process Model and Notation) para leigos: Desenhando fluxos',
            'SOPs (Standard Operating Procedures) e o Manifesto do Checklist (Atul Gawande)',
            'A Teoria das Restrições (Gargalos): Encontrando o ponto de estrangulamento (Goldratt)',
            'A Lei de Parkinson: O trabalho se expande para preencher o tempo alocado',
            'Kanban Avançado: Limitando o Trabalho em Progresso (WIP) e Tempo de Ciclo',
            'Mapeamento de Fluxo de Valor (VSM): Identificando atividades que não agregam valor',
            'Poka-Yoke e Design à Prova de Erros: Construindo processos que não dependem da atenção humana',
            'Kaizen: A cultura da melhoria contínua e da iteração de processos'
          ]
        },
        {
          nome: 'Fase 4 — Automação e Integração de Sistemas',
          topicos: [
            'APIs para Leigos: Como os softwares conversam e trocam dados na internet',
            'Lógica Booleana e Estruturas Condicionais (IF/THEN) aplicadas a negócios',
            'Webhooks: O conceito de escuta ativa entre sistemas e eventos em tempo real',
            'Plataformas de Automação No-Code: Make, Zapier e n8n — Visão Arquitetural',
            'Tratamento de Erros e Rotinas de Fallback em Automações Críticas',
            'RPA (Robotic Process Automation): Quando a API não existe e o robô clica na tela',
            'Automação de Pipelines de Vendas, Onboarding de Clientes e Faturamento'
          ]
        },
        {
          nome: 'Fase 5 — Arquitetura de Dados e Lógica Relacional',
          topicos: [
            'Bancos de Dados Relacionais vs. Listas Planas (Por que o Excel tem limite)',
            'Tipos de Dados: Strings, Booleans, Arrays e JSON de forma visual',
            'Entidades e Relacionamentos: 1:1, 1:N (One-to-Many) e N:N (Many-to-Many)',
            'A Regra de Ouro da Normalização: Uma informação, um único lugar no sistema',
            'Estado Mestre (Master Data) e o conceito de "Single Source of Truth"',
            'Chaves Primárias (PK) e Chaves Estrangeiras (FK): A cola dos sistemas de dados',
            'Modelagem de Dados Aplicada a CRMs, ERPs e Sistemas de Gestão Internos'
          ]
        },
      ]
    },
    {
      slug: 'engenharia-producao',
      nome: 'Engenharia de Produção',
      emoji: '🏭',
      parent: 'gestao-sistemas',
      whyStart: 'Engenharia de Produção é a ciência de fazer mais com menos, sem abrir mão da qualidade. Quem domina isso consegue enxergar gargalos e oportunidades que outros simplesmente não veem.',
      descricao: 'Do chão de fábrica à cadeia global: como projetar, operar e melhorar sistemas produtivos com rigor e método.',
      contexto: `PERSONA:
You are a production engineer with 20 years on the factory floor and in supply chain consulting. You were trained in the Toyota Production System and have led Lean transformations in 15 plants across 4 countries. You know the difference between tools and culture — you've seen companies implement 5S and completely miss the point. You never separate the method from the context it was designed for. Never break this frame. You are not a generic AI — you are this specialist.

O aluno busca compreensão conceitual da Engenharia de Produção sem a carga de cálculo acadêmico pesado. Foco em modelos mentais, ferramentas aplicáveis e lógica de otimização. Quando citar autores ou frameworks, diga de onde vieram (ex: Taiichi Ohno, Toyota Production System, 1978).`,
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
