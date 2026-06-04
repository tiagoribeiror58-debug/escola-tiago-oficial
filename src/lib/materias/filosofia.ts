import { MateriaConfig } from '@/types';

export const filosofiaHub: MateriaConfig = {
  slug: 'filosofia-hub',
  nome: 'Filosofia & Epistemologia Aplicada',
  emoji: '🦉',
  isCategory: true,
  descricao: 'Como você sabe o que sabe? Ferramentas para pensar com rigor, detectar falácias e não ser enganado por argumentos bonitos.',
  children: [
    {
      slug: 'epistemologia-aplicada',
      nome: 'Epistemologia & Teoria do Conhecimento',
      emoji: '🔍',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'Antes de aprender qualquer coisa, você precisa saber como o conhecimento funciona. Senão você só acumula crenças disfarçadas de fatos.',
      descricao: 'Como distinguir conhecimento real de opinião, crença e ilusão.',
      contexto: `Foco: epistemologia prática — como avaliar se algo é verdade antes de agir com base nisso.

Abordagem obrigatória:
- Sempre ancore em exemplos do dia a dia, não em abstrações filosóficas puras.
- Conecte cada conceito a uma decisão real que alguém tomaria melhor sabendo isso.
- Sem jargão acadêmico desnecessário. Filosofia é ferramenta, não decoração.`,
      ementa: [
        // NÍVEL 1 — FUNDAMENTOS
        'O que é Epistemologia',
        'A diferença entre crença, opinião e conhecimento',
        'Fontes do conhecimento: sentidos, razão, intuição, autoridade',
        'O problema do ceticismo (posso estar errado sobre tudo?)',
        'Ceticismo Pirrônico: Suspender o Julgamento Quando a Evidência é Fraca',
        'Verdade: o que significa algo ser verdadeiro',
        'O Problema do Conhecimento Tácito (Michael Polanyi)',
        'O Mapa Não é o Território (Korzybski e a Semântica Geral)',

        // NÍVEL 2 — CORRENTES CLÁSSICAS
        'Racionalismo — Descartes, Leibniz, Spinoza',
        'Empirismo — Locke, Hume, Berkeley',
        'Empirismo vs Racionalismo: De Onde Vem o Que Você Sabe?',
        'Kant — a síntese entre razão e experiência',
        'O problema da indução (Hume) - Por Que o Passado Não Garante o Futuro',
        'Ceticismo clássico vs. ceticismo moderno',

        // NÍVEL 3 — EPISTEMOLOGIA CONTEMPORÂNEA
        'O que é Conhecimento? (Crença Verdadeira Justificada e o Problema de Gettier)',
        'Fundacionalismo vs. Coerentismo vs. Confiabilismo',
        'Epistemologia social — conhecimento coletivo e testemunho',
        'Epistemologia do Testemunho: Quando Acreditar nos Outros',
        'Epistemologia Reformada (Plantinga)',
        'Naturalismo epistemológico (Quine)',

        // NÍVEL 4 — FILOSOFIA DA CIÊNCIA
        'O método científico e seus limites',
        'O Problema da Demarcação: Ciência vs Pseudociência',
        'Falsificacionismo (Popper): O Que Faz Uma Ideia Ser Científica',
        'Paradigmas e Revoluções Científicas (Thomas Kuhn)',
        'Programa de pesquisa — Lakatos',
        'Anarquismo epistemológico — Feyerabend',
        'Realismo vs. Antirrealismo científico',
        'Navalha de Ockham: A Explicação Mais Simples é Provavelmente a Certa',
        'A Diferença entre Correlação e Causalidade (na Prática)',

        // NÍVEL 5 — AVANÇADO E APLICAÇÕES PRÁTICAS
        'Epistemologia Virtue (Sosa, Zagzebski)',
        'Conhecimento a priori vs. a posteriori — debates atuais',
        'Epistemologia feminista e standpoint theory',
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
    },
    {
      slug: 'logica-argumentacao',
      nome: 'Lógica & Detecção de Falácias',
      emoji: '⚖️',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'Se você não sabe identificar um argumento ruim, vai ser manipulado por qualquer pessoa que fale com confiança. A lógica é o filtro que separa o válido do inválido.',
      descricao: 'Lógica formal, informal, vieses e raciocínio estruturado para blindar seu pensamento contra enganos.',
      contexto: `Foco: estrutura lógica de argumentos e defesa intelectual. O aluno precisa sair conseguindo desmontar falácias em tempo real e estruturar modelos válidos.

Abordagem obrigatória:
- Explique a estrutura formal do conceito antes de apresentar os exemplos práticos.
- Todo conceito precisa de um exemplo de argumento real (política, mídia, vendas) onde a falácia aparece.
- Não ensine lógica apenas como matemática abstrata. Ensine como detecção de bullshit e modelagem de problemas.`,
      ementa: [
        // NÍVEL 1 — FUNDAMENTOS
        'O que é Lógica e para que serve',
        'Anatomia de um Argumento: Premissas, Conclusão e Validade vs Verdade',
        'Dedução vs Indução vs Abdução: Três Formas de Raciocinar',
        'Pensamento Crítico Básico',
        'Falácias Formais e Informais',
        'Falácia do Espantalho: Atacar Uma Versão Distorcida do Argumento',
        'Falácia Ad Hominem: Atacar a Pessoa em Vez da Ideia',
        'Falácia de Apelo à Autoridade',
        'Apelo à Emoção: Quando o Sentimento Substitui a Evidência',
        'Falso Dilema: Criar Duas Opções Quando Existem Mais',
        'Ladeira Escorregadia (Slippery Slope): Prever Catástrofe Sem Justificativa',
        'Falácia do Custo Irrecuperável: Insistir Porque Já Investiu',
        'Apelo à Natureza: "Se é Natural, é Bom" (Não é)',
        'Falácia da Composição e da Divisão: Parte ≠ Todo',
        'Cherry Picking: Selecionar Só os Dados Que Confirmam',
        'Petição de Princípio (Raciocínio Circular): Concluir o Que Pressupôs',
        'Tu Quoque: "Você Também Faz" Não É Defesa',
        'Falácia do Jogador (Gambler\'s Fallacy): Probabilidades Não Têm Memória',
        'Argumento da Incredulidade Pessoal: "Não Consigo Imaginar, Logo é Falso"',
        'Viés de Sobrevivência e Causalidade vs Correlação',
        'Viés Narrativo: Quando Histórias Enganam a Lógica',

        // NÍVEL 2 — LÓGICA CLÁSSICA
        'Lógica Aristotélica — silogismos',
        'Modus Ponens, Modus Tollens e Silogismos Básicos',
        'Silogismos: Validade vs Solidez',
        'Lógica Proposicional — conectivos (e, ou, não, se...então)',
        'Proposições e Valores Verdade',
        'Operadores Lógicos (E, OU, NÃO, SE)',
        'Tabelas-Verdade: O Esqueleto da Lógica Proposicional',
        'Equivalências lógicas',
        'Argumentos válidos e inválidos formalmente',

        // NÍVEL 3 — LÓGICA DE PREDICADOS
        'Lógica de Predicados: Quantificadores (Todo, Algum, Nenhum)',
        'Predicados e variáveis',
        'Formalização de argumentos do cotidiano',
        'Introdução às provas formais',

        // NÍVEL 4 — LÓGICAS NÃO-CLÁSSICAS
        'Lógica Modal Básica: Necessidade vs Possibilidade',
        'Lógica Deôntica — obrigação e permissão',
        'Lógica Paraconsistente — contradições sem explosão',
        'Lógica Fuzzy — verdades graduais (nem 0 nem 1)',
        'Lógica Temporal',

        // NÍVEL 5 — LÓGICA MATEMÁTICA E METAMATEMÁTICA
        'Teoria dos Conjuntos básica',
        'Indução matemática',
        'Limites do Raciocínio Formal: Teoremas de Completude e Incompletude (Gödel)',
        'Decidibilidade e computabilidade — Turing',
        'Lógica e linguagem formal',

        // NÍVEL 6 — APLICAÇÕES AVANÇADAS
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
    },
    {
      slug: 'etica-dilemas',
      nome: 'Ética & Tomada de Decisão Moral',
      emoji: '🧭',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'Toda decisão importante é uma decisão ética disfarçada. Se você não tem framework, vai decidir por impulso e se arrepender.',
      descricao: 'Frameworks éticos práticos para decisões difíceis no mundo real.',
      contexto: `Foco: ética aplicada a decisões reais — negócios, tecnologia, relacionamentos.

Abordagem obrigatória:
- Cada framework ético deve ser apresentado com um dilema real onde ele seria aplicado.
- Nunca diga qual é a resposta "certa". Mostre os trade-offs de cada framework.`,
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
