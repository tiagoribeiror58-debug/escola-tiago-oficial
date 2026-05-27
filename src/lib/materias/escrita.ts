import { MateriaConfig } from '@/types';

export const escritaHub: MateriaConfig = {
  slug: 'escrita-hub',
  nome: 'Escrita & Pensamento Estruturado',
  emoji: '✍️',
  isCategory: true,
  descricao: 'Escrever bem é pensar bem externalizado. Clareza, argumentação e síntese para quem produz ideias, não só consome.',
  children: [
    {
      slug: 'escrita-clara',
      nome: 'Escrita Clara & Persuasiva',
      emoji: '📝',
      isCategory: false,
      parent: 'escrita-hub',
      whyStart: 'Se você não consegue explicar algo por escrito de forma simples, você não entende de verdade. Escrita é o teste de estresse do pensamento.',
      descricao: 'Princípios de clareza, concisão e impacto na escrita profissional.',
      contexto: `Foco: escrita como ferramenta de pensamento e influência — emails, documentos, threads, propostas.

Abordagem obrigatória:
- Cada conceito precisa de um exemplo antes/depois (frase ruim vs frase reescrita).
- Não ensine gramática escolar. Ensine princípios de clareza usados por escritores profissionais.
- Referências: William Zinsser (On Writing Well), George Orwell (Politics and the English Language), Steven Pinker (The Sense of Style).`,
      ementa: [
        'A Regra de Ouro de Orwell: 6 Regras Para Nunca Escrever Mal',
        'A Maldição do Conhecimento: Por Que Especialistas Escrevem Mal',
        'Voz Ativa vs Voz Passiva: Quando Usar Cada Uma',
        'Eliminar Palavras Mortas: Advérbios, Jargão e Enchimento',
        'A Estrutura da Pirâmide (Barbara Minto): Conclusão Primeiro',
        'Lead & Hook: Como Prender o Leitor na Primeira Frase',
        'Parágrafos Como Unidades de Pensamento (Uma Ideia = Um Parágrafo)',
        'O Poder da Frase Curta: Ritmo e Impacto',
        'Escrita Persuasiva: AIDA (Atenção, Interesse, Desejo, Ação)',
        'Copywriting vs Escrita Informativa: Quando Vender e Quando Educar',
        'Editar é Reescrever: O Draft Zero Nunca é o Final',
        'Tone of Voice: Como Adaptar Registro Sem Perder Autenticidade',
        'Emails Profissionais: Sujeito Claro, Ask Explícito, Zero Ambiguidade',
        'Thread Writing: Como Estruturar Argumentos em Formato Digital',
        'O Teste da Avó: Se Ela Não Entenderia, Simplifique'
      ]
    },
    {
      slug: 'pensamento-estruturado',
      nome: 'Frameworks de Pensamento',
      emoji: '🧩',
      isCategory: false,
      parent: 'escrita-hub',
      whyStart: 'Você tem informação demais e estrutura de menos. Frameworks transformam caos mental em clareza operacional.',
      descricao: 'Modelos mentais e frameworks para organizar pensamento e tomar decisões.',
      contexto: `Foco: modelos mentais práticos que um profissional aplica no dia a dia para pensar com mais rigor.

Abordagem obrigatória:
- Cada framework precisa de um cenário real de aplicação (negócios, carreira, vida pessoal).
- Não liste modelos mentais como catálogo. Ensine quando e por que usar cada um.`,
      ementa: [
        'First Principles Thinking: Desmontar Até o Fundamento',
        'Inversão (Charlie Munger): Pensar Pelo Avesso',
        'Mapas de Causa e Efeito: Encontrar a Raiz Real do Problema',
        'MECE (McKinsey): Mutuamente Exclusivo, Coletivamente Exaustivo',
        'A Matriz de Eisenhower: Urgente vs Importante',
        'Pensamento de Segunda Ordem: "E Depois Disso, O Que Acontece?"',
        'Pré-Mortem: Imaginar o Fracasso Antes de Começar',
        'O Framework de Bezos: Decisões Tipo 1 (Irreversíveis) vs Tipo 2 (Reversíveis)',
        'Regret Minimization Framework: O Que Você Lamentaria aos 80?',
        'Steel Man: Fortalecer o Argumento do Oponente Antes de Rebater',
        'Mapa de Stakeholders: Quem Ganha, Quem Perde, Quem Decide',
        'Loops de Feedback: Reforço Positivo e Negativo em Sistemas',
        'Teoria dos Constrangimentos (Goldratt): O Gargalo Define o Fluxo',
        'Pensamento Probabilístico: Substituir Certezas por Distribuições',
        'Árvores de Decisão: Mapear Cenários com Probabilidades e Payoffs',
        'O Princípio de Pareto (80/20) Aplicado com Rigor'
      ]
    },
    {
      slug: 'argumentacao-debate',
      nome: 'Argumentação & Retórica',
      emoji: '🎯',
      isCategory: false,
      parent: 'escrita-hub',
      whyStart: 'Ter razão não basta. Se você não sabe construir e defender um argumento, perde para quem fala bonito sem substância.',
      descricao: 'Construção de argumentos sólidos e técnicas retóricas para convencer.',
      contexto: `Foco: retórica clássica + técnicas modernas de debate e persuasão oral/escrita.

Abordagem obrigatória:
- Cada técnica retórica deve ser mostrada com exemplo real (discurso famoso, debate público, negociação).
- Retórica não é manipulação — é comunicação eficaz de ideias verdadeiras.`,
      ementa: [
        'Os 3 Pilares de Aristóteles: Ethos (Credibilidade), Pathos (Emoção), Logos (Lógica)',
        'Estrutura Clássica do Argumento: Tese, Antítese, Síntese',
        'O Ônus da Prova: Quem Afirma é Quem Deve Provar',
        'Concessão Estratégica: Admitir um Ponto Fraco Para Ganhar Credibilidade',
        'A Técnica do Enquadramento (Framing): O Mesmo Fato, Duas Histórias',
        'Analogias Poderosas: Como Explicar o Complexo Pelo Simples',
        'Storytelling Argumentativo: Narrativa Como Veículo de Prova',
        'Refutação Estruturada: Acknowledge → Bridge → Counter (ABC)',
        'A Regra de Três: Por Que 3 Pontos São Mais Memoráveis Que 5',
        'Retórica Socrática: Perguntar Até o Outro Se Contradizer',
        'Técnica do Aço (Steel Manning) vs Técnica do Espantalho',
        'Debate Produtivo: Como Discordar Sem Destruir a Relação',
        'Silêncio Estratégico: O Poder de Não Responder Imediatamente',
        'Apelo à Consequência: Mostrar o Que Acontece Se Ninguém Agir',
        'Fechamento de Argumento: A Última Frase é a Que Fica'
      ]
    }
  ]
};
