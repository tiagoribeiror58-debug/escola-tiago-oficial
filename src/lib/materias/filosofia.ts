import { MateriaConfig } from '@/types';

export const filosofiaHub: MateriaConfig = {
  slug: 'filosofia-hub',
  nome: 'Philosophy & Applied Epistemology',
  emoji: '🦉',
  isCategory: true,
  descricao: 'How do you know what you know? Tools to think with rigor, detect fallacies, and not be fooled by beautiful arguments.',
  children: [
    {
      slug: 'epistemologia-aplicada',
      nome: 'Epistemology & Theory of Knowledge',
      emoji: '🔍',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'Before learning anything, you need to know how knowledge works. Otherwise, you only accumulate beliefs disguised as facts.',
      descricao: 'How to distinguish real knowledge from opinion, belief, and illusion.',
      contexto: `Focus: practical epistemology — how to evaluate if something is true before acting on it.

Mandatory approach:
- Always anchor in everyday examples, not pure philosophical abstractions.
- Connect each concept to a real decision someone would make better knowing this.
- No unnecessary academic jargon. Philosophy is a tool, not a decoration.`,
      fases: [
        {
          nome: 'LEVEL 1 — FOUNDATIONS',
          topicos: [
            'O que é Epistemologia',
            'A diferença entre crença, opinião e conhecimento',
            'Fontes do conhecimento: sentidos, razão, intuição, autoridade',
            'O problema do ceticismo (posso estar errado sobre tudo?)',
            'Ceticismo Pirrônico: Suspender o Julgamento Quando a Evidência é Fraca',
            'Verdade: o que significa algo ser verdadeiro',
            'O Problema do Conhecimento Tácito (Michael Polanyi)',
            'O Mapa Não é o Território (Korzybski e a Semântica Geral)'
          ]
        },
        {
          nome: 'LEVEL 2 — CLASSICAL CURRENTS',
          topicos: [
            'Racionalismo — Descartes, Leibniz, Spinoza',
            'Empirismo — Locke, Hume, Berkeley',
            'Empirismo vs Racionalismo: De Onde Vem o Que Você Sabe?',
            'Kant — a síntese entre razão e experiência',
            'O problema da indução (Hume) - Por Que o Passado Não Garante o Futuro',
            'Ceticismo clássico vs. ceticismo moderno'
          ]
        },
        {
          nome: 'LEVEL 3 — CONTEMPORARY EPISTEMOLOGY',
          topicos: [
            'O que é Conhecimento? (Crença Verdadeira Justificada e o Problema de Gettier)',
            'Fundacionalismo vs. Coerentismo vs. Confiabilismo',
            'Epistemologia social — conhecimento coletivo e testemunho',
            'Epistemologia do Testemunho: Quando Acreditar nos Outros',
            'Epistemologia Reformada (Plantinga)',
            'Naturalismo epistemológico (Quine)'
          ]
        },
        {
          nome: 'LEVEL 4 — PHILOSOPHY OF SCIENCE',
          topicos: [
            'O método científico e seus limites',
            'O Problema da Demarcação: Ciência vs Pseudociência',
            'Falsificacionismo (Popper): O Que Faz Uma Ideia Ser Científica',
            'Paradigmas e Revoluções Científicas (Thomas Kuhn)',
            'Programa de pesquisa — Lakatos',
            'Anarquismo epistemológico — Feyerabend',
            'Realismo vs. Antirrealismo científico',
            'Navalha de Ockham: A Explicação Mais Simples é Provavelmente a Certa',
            'A Diferença entre Correlação e Causalidade (na Prática)'
          ]
        },
        {
          nome: 'LEVEL 5 — ADVANCED AND PRACTICAL APPLICATIONS',
          topicos: [
            'Epistemologia Virtue (Sosa, Zagzebski)',
            'Conhecimento a priori vs. a posteriori — debates atuais',
            'Epistemologia feminist e standpoint theory',
            'Fake news, desinformação e epistemologia aplicada',
            'Argumento de Autoridade: Quando Confiar e Quando Desconfiar',
            'Viés de Confirmação Epistêmico: Você Só Vê o Que Já Acredita',
            'O Efeito Dunning-Kruger e a Cegueira do Especialista',
            'Metacognição Epistêmica: Saber o Que Você Não Sabe',
            'Heurísticas de Julgamento (Kahneman): Atalhos Que Enganam',
            'Bayesianismo: Atualizar Crenças com Nova Evidência',
            'IA e conhecimento — máquinas podem saber?',
            'Metaepistemologia — podemos conhecer os limites do conhecimento?'
          ]
        }
      ]
    },
    {
      slug: 'falacias-argumentacao',
      nome: 'Catalog of Fallacies & Biases',
      emoji: '🎭',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'You are being manipulated every day by arguments that seem logical, but are not. Learn to defend yourself.',
      descricao: 'Detection of fallacies and argumentation biases in the real world.',
      contexto: `Focus: detecting fallacies in practice.
      
Mandatory approach:
- Present a real example (politics, sales, internet debates) where the fallacy is used.
- Teach the person to respond to or dismantle this fallacy in an elegant and logical way.`,
      fases: [
        {
          nome: 'LEVEL 1 — THE MOST COMMON (ATTACKS AND EMOTIONS)',
          topicos: [
            'O que são Falácias Formais e Informais',
            'Falácia do Espantalho: Atacar Uma Versão Distorcida do Argumento',
            'Falácia Ad Hominem: Atacar a Pessoa em Vez da Ideia',
            'Falácia de Apelo à Autoridade',
            'Apelo à Emoção: Quando o Sentimento Substitui a Evidência',
            'Tu Quoque: "Você Também Faz" Não É Defesa'
          ]
        },
        {
          nome: 'LEVEL 2 — LOGICAL AND PROBABILISTIC DISTORTIONS',
          topicos: [
            'Falso Dilema: Criar Duas Opções Quando Existem Mais',
            'Ladeira Escorregadia (Slippery Slope): Prever Catástrofe Sem Justificativa',
            'Falácia da Composição e da Divisão: Parte ≠ Todo',
            'Petição de Princípio (Raciocínio Circular): Concluir o Que Pressupôs',
            "Falácia do Jogador (Gambler's Fallacy): Probabilidades Não Têm Memória",
            'Argumento da Incredulidade Pessoal: "Não Consigo Imaginar, Logo é Falso"'
          ]
        },
        {
          nome: 'LEVEL 3 — BIASES AND DATA SELECTION',
          topicos: [
            'Falácia do Custo Irrecuperável: Insistir Porque Já Investiu',
            'Apelo à Natureza: "Se é Natural, é Bom" (Não é)',
            'Cherry Picking: Selecionar Só os Dados Que Confirmam',
            'Viés de Sobrevivência e Causalidade vs Correlação',
            'Viés Narrativo: Quando Histórias Enganam a Lógica'
          ]
        }
      ]
    },
    {
      slug: 'logica-argumentacao',
      nome: 'Logic & Structured Reasoning',
      emoji: '⚖️',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'If you do not understand the rules of reasoning, you cannot model reality correctly. Logic is the basis of mathematics, programming, and valid argumentation.',
      descricao: 'Classical logic, predicates, and mathematical-structural reasoning.',
      contexto: `Focus: logical structure of arguments and reasoning.
      
Mandatory approach:
- Explain the formal structure of the concept.
- Do not teach logic only as abstract mathematics. Teach it as problem modeling.`,
      fases: [
        {
          nome: 'LEVEL 1 — FOUNDATIONS',
          topicos: [
            'O que é Lógica e para que serve',
            'Anatomia de um Argumento: Premissas, Conclusão e Validade vs Verdade',
            'Dedução vs Indução vs Abdução: Três Formas de Raciocinar',
            'Pensamento Crítico Básico'
          ]
        },
        {
          nome: 'LEVEL 2 — CLASSICAL LOGIC',
          topicos: [
            'Lógica Aristotélica — silogismos',
            'Modus Ponens, Modus Tollens e Silogismos Básicos',
            'Silogismos: Validade vs Solidez',
            'Lógica Proposicional — conectivos (e, ou, não, se...então)',
            'Proposições e Valores Verdade',
            'Operadores Lógicos (E, OU, NÃO, SE)',
            'Tabelas-Verdade: O Esqueleto da Lógica Proposicional',
            'Equivalências lógicas',
            'Argumentos válidos e inválidos formalmente'
          ]
        },
        {
          nome: 'LEVEL 3 — PREDICATE LOGIC',
          topicos: [
            'Lógica de Predicados: Quantificadores (Todo, Algum, Nenhum)',
            'Predicados e variáveis',
            'Formalização de argumentos do cotidiano',
            'Introdução às provas formais'
          ]
        },
        {
          nome: 'LEVEL 4 — NON-CLASSICAL LOGICS',
          topicos: [
            'Lógica Modal Básica: Necessidade vs Possibilidade',
            'Lógica Deôntica — obrigação e permissão',
            'Lógica Paraconsistente — contradições sem explosão',
            'Lógica Fuzzy — verdades graduais (nem 0 nem 1)',
            'Lógica Temporal'
          ]
        },
        {
          nome: 'LEVEL 5 — MATHEMATICAL LOGIC AND METAMATHEMATICS',
          topicos: [
            'Teoria dos Conjuntos básica',
            'Indução matemática',
            'Limites do Raciocínio Formal: Teoremas de Completude e Incompletude (Gödel)',
            'Decidibilidade e computabilidade — Turing',
            'Lógica e linguagem formal'
          ]
        },
        {
          nome: 'LEVEL 6 — ADVANCED APPLICATIONS',
          topicos: [
            'Lógica e Inteligência Artificial',
            'Lógica Jurídica e argumentação',
            'Lógica e Linguística — semântica formal',
            'Lógica Epistêmica — raciocínio sobre conhecimento',
            'Paradoxos Clássicos (Mentiroso, Sorites, Russell) e o que Eles Ensinam',
            'Modelagem de Problemas Complexos',
            'Pensamento Sistêmico e Feedback Loops',
            'Teoria dos Jogos: Decisões Interdependentes',
            'Análise de Custo-Benefício e Decisão Racional',
            'Raciocínio Contrafactual (E Se?)',
            'Lógica Bayesiana: Atualizando Crenças com Evidências',
            'Argumentação Probabilística vs Determinística'
          ]
        }
      ]
    },
    {
      slug: 'etica-dilemas',
      nome: 'Ethics & Moral Decision-Making',
      emoji: '🧭',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'Every important decision is a disguised ethical decision. If you have no framework, you will decide by impulse and regret it.',
      descricao: 'Practical ethical frameworks for difficult decisions in the real world.',
      contexto: `Focus: applied ethics to real decisions — business, technology, relationships.

Mandatory approach:
- Each ethical framework must be presented with a real dilemma where it would be applied.
- Never say which answer is the "right" one. Show the trade-offs of each framework.`,
      ementa: [
        'Utilitarismo de Bentham: O Maior Bem Para o Maior Número',
        'O Problema do Bonde (Trolley Problem) e Suas Variações',
        'Ética Deontológica de Kant: Regras Absolutas vs Consequências',
        'O Imperativo Categórico: "E Se Todo Mundo Fizesse Isso?"',
        'Ética das Virtudes de Aristóteles: Ser Bom vs Fazer o Bem',
        'Contratualismo (Rawls): O Véu da Ignorância na Hora de Decidir',
        'Ética de Nietzsche: Moral dos Senhores vs Moral dos Escravos',
        'Dilemas Éticos em IA: Viés Algorítmico e Responsabilidade',
        'Ética nos Negócios: Lucro vs Responsabilidade Social (Friedman vs Stakeholder)',
        'O Paradoxo da Tolerância (Karl Popper): Quando Tolerar a Intolerância?',
        'Ética da Informação: Privacidade, Vigilância e Direito ao Esquecimento',
        'Falácia Naturalista na Moral: "Sempre Foi Assim" Não Justifica Nada',
        'Consequências de Segunda e Terceira Ordem: Efeitos Não Intencionais',
        'O Problema do Free Rider e a Tragédia dos Comuns',
        'Ética Estoica Aplicada: O Que Está Sob Seu Controle?'
      ]
    }
  ]
};
