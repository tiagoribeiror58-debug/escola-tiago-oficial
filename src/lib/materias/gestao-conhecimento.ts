import { MateriaConfig } from '@/types';

export const gestaoConhecimento: MateriaConfig = {
  slug: 'gestao-conhecimento',
  nome: 'Gestão do Conhecimento & Second Brain',
  emoji: '🧠',
  isCategory: false,
  descricao: 'A ciência de capturar, organizar e conectar o que você aprende — transformando informação em conhecimento acionável. Para um founder solo, o seu sistema de conhecimento é o seu time de P&D.',
  contexto: `Você está ensinando Tiago, um founder solo em 2026.

MANDATO CENTRAL:
- Ensinar o mecanismo por trás de cada sistema — não apenas "use o Notion".
- Todo conceito deve responder: como isso me ajuda a pensar e decidir melhor?
- Conecte sempre ao contexto do founder: pesquisa de mercado, decisões de produto, aprendizado de tecnologia.
- Cite fontes reais: Tiago Forte (Building a Second Brain, 2022), Niklas Luhmann (Zettelkasten), Andy Matuschak (Evergreen Notes).

ANTI-PATTERNS:
- Não reduza à ferramenta ("use o Obsidian"). Ensine o princípio primeiro.
- Não liste sistemas sem explicar por que cada um resolve um problema específico.
- Não ignore a carga cognitiva: organizar mal é pior do que não organizar.`,
  fases: [
    {
      nome: 'Fase 1 — A Economia do Conhecimento e o Problema da Memória',
      topicos: [
        'A Economia do Conhecimento: Por que Não Confiar na Memória Biológica em 2026',
        'Curva do Esquecimento de Ebbinghaus: O Mecanismo Neurológico do Esquecer — e Por Que Tomar Nota Não Basta',
        'Carga Cognitiva (Sweller): Memória de Trabalho vs. Memória de Longo Prazo — o que isso exige de um sistema externo',
        'O Conceito de Extended Mind (Andy Clark): Ferramentas Externas como Parte Real do Seu Processo Cognitivo',
        'Conhecimento Tácito vs. Explícito (Michael Polanyi): O que pode ser documentado e o que só existe na prática',
        'O Custo Real da Informação Sem Estrutura: Por Que Mais Conteúdo Consumido Pode Significar Menos Inteligência Aplicada',
        'PKM (Personal Knowledge Management): Definição, Diferença de GTD e Onde Começa a Confusão'
      ]
    },
    {
      nome: 'Fase 2 — Sistemas de Organização Fundacionais',
      topicos: [
        'O Método P.A.R.A (Tiago Forte — Building a Second Brain, 2022): Projetos, Áreas, Recursos e Arquivos — O Framework Mais Prático do Mercado',
        'A Lógica por Trás do P.A.R.A: Por Que Organizar por Ação (não por Assunto) Muda Tudo',
        'O Método Zettelkasten (Niklas Luhmann): Notas Atômicas, IDs e o Sistema que Gerou 70+ Livros',
        'Notas Atômicas (Atomic Notes): Uma Ideia Por Nota — o Princípio que Rompe com o "Arquivo Pasta"',
        'Evergreen Notes (Andy Matuschak): A Diferença entre Notas que Crescem e Notas que Apodrecem',
        'Fleeting Notes vs. Literature Notes vs. Permanent Notes: A Pipeline de Captura do Zettelkasten',
        'Ontologias e Taxonomias: Como Classificar Informações para o Longo Prazo Sem Criar um Labirinto',
        'Sistemas de Busca vs. Organização em Pastas: O Paradigma Moderno da Recuperação de Dados',
        'Tags vs. Links vs. Pastas: Quando Usar Cada Estratégia de Navegação do Conhecimento'
      ]
    },
    {
      nome: 'Fase 3 — Captura e Processamento de Informação',
      topicos: [
        'Progressive Summarization (Tiago Forte): Como Consumir Conteúdo e Guardar Apenas o que Importa — em 4 Camadas',
        'Ler para Extrair vs. Ler para Entreter: Dois Modos Cognitivos Completamente Diferentes',
        'Highlights, Notas Marginais e o Problema do "Destaque Passivo": Por Que Sublinhar Não Aprende',
        'O Método Cornell: A Arquitetura de uma Nota que Força Processamento Ativo',
        'Inbox Zero do Conhecimento: Como Processar Captura Sem Criar Acúmulo Digital',
        'Captura Frictionless: Ferramentas e Gatilhos para Capturar no Momento de Insight (Não Depois)',
        'Leitura Ativa com IA: Como Usar Claude/GPT para Processar Livros, Papers e Transcrições com Alta Fidelidade',
        'O Problema da Curadoria: Por Que Salvar Tudo é Tão Ruim Quanto Não Salvar Nada'
      ]
    },
    {
      nome: 'Fase 4 — Knowledge Graphs e Pensamento em Rede',
      topicos: [
        'Knowledge Graphs (Grafos de Conhecimento): Visualizando Conexões Entre Ideias (Obsidian, Roam)',
        'A Diferença entre Bancos de Dados e Grafos: Tabelas Relacionais vs. Nós e Arestas',
        'Backlinks e Links Bidirecionais: Como o Zettelkasten Digital Cria "Surpresas Intelectuais"',
        'MOCs (Maps of Content): Como Criar Índices de Navegação Sem Destruir a Estrutura de Rede',
        'Serendipidade Estruturada: Como Sistemas de Notas Ligadas Geram Insights que Você Não Procurava',
        'Sparse Notes vs. Dense Notes: Quando Ter Muitas Notas Rasas é Melhor que Poucas Profundas',
        'Obsidian vs. Roam vs. Logseq vs. Notion: Mapa de Ferramentas por Caso de Uso Real'
      ]
    },
    {
      nome: 'Fase 5 — Revisão Espaçada e Retenção de Longo Prazo',
      topicos: [
        'Spaced Repetition: O Mecanismo Científico por Trás do Anki e da Revisão Espaçada (Ebbinghaus + Leitner)',
        'Active Recall vs. Rereading: Por Que Testar-se é o Método de Retenção Mais Eficaz Comprovado',
        'Flashcards de Alta Qualidade: Como Formular Perguntas que Forçam Recuperação Real (Não Reconhecimento)',
        'Revisão Periódica de Notas: Protocolos Semanais, Mensais e Anuais para Manter o Sistema Vivo',
        'O Problema do "Note Graveyard": Por Que 90% dos Sistemas de Notas Morrem em 6 Meses',
        'Linking Learning to Projects: Como Ativar Conhecimento Teórico Conectando a Projetos Reais Ativos',
        'Testing Effect (Roediger & Karpicke, 2006): A Ciência do "Aprender Testando" — Por Que Quizzes Funcionam'
      ]
    },
    {
      nome: 'Fase 6 — Second Brain como Vantagem Competitiva do Founder Solo',
      topicos: [
        'O Second Brain do Founder: Como Seu Sistema de Conhecimento Substitui uma Equipe de P&D',
        'Research Pipeline: Como Mapear Mercados, Concorrentes e Tendências de Forma Sistemática',
        'Decision Log: Documentando o Raciocínio por Trás de Cada Decisão Estratégica — Para Aprender com Erros Futuros',
        'Meeting Notes → Action Items → Follow-ups: A Pipeline Completa para Não Perder Nenhum Insight Operacional',
        'Knowledge as Moat: Como um Sistema de Conhecimento Profundo Cria Vantagem que Concorrentes Não Conseguem Copiar',
        'IA + Second Brain: Como Usar Claude/GPT como Interface de Query do Seu Sistema de Notas',
        'Documentação como Produto: Por Que Escrever o que Você Sabe é Marketing, Recrutamento e Vendas ao Mesmo Tempo',
        'O Momento de Parar de Organizar e Começar a Criar: O Equilíbrio entre Curadoria e Produção'
      ]
    }
  ]
};
