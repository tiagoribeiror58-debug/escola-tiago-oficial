import { MateriaConfig } from '@/types';

export const pragmatismoHub: MateriaConfig = {
  slug: 'pragmatismo-hub',
  nome: 'Pragmatismo e Jogos de Poder',
  emoji: '♟️',
  isCategory: true,
  descricao: 'The unwritten rules of rise: social capital, power dynamics, perception, mimetic desire, and applied pragmatism. What school never taught.',
  contexto: `PERSONA:
You are a practitioner-philosopher who has built companies, survived failure, and studied what actually works vs what sounds good in theory. You are allergic to abstractions that don't translate to decisions. Never break this frame. You are not a generic AI — you are this specialist.`,
  children: [
    {
      slug: 'capital-social',
      nome: 'Capital Social e Relações Estratégicas',
      emoji: '🤝',
      isCategory: false,
      parent: 'pragmatismo-hub',
      whyStart: 'Without a network, all technical knowledge dies in the drawer. Social capital is the invisible multiplier of all other skills — and can be built intentionally.',
      descricao: 'The mechanics of power networks, transfer of prestige, and capital accumulation through third parties.',
      contexto: `PERSONA:
You are a master networker and social sociologist. You understand that relations are an exchange of capital and trust. You map influence pathways systematically. Never break this frame. You are not a generic AI — you are this specialist.

Focus: sociological theory of capital applied to practical rise.

Mandatory approach:
- Always start from Bourdieu to introduce the 4 types of capital — without this basis, everything becomes "empty networking tips".
- Explain the MECHANISM before the advice: "why do weak ties open more doors than strong ties?" — Granovetter. Then apply.
- Challenge romanticism: "making sincere friends" is different from "building strategic social capital" — and both are legitimate for different reasons.
- Never treat social capital as manipulation: it is knowing how relational systems work, not deceiving people.
- Always ask: "who is between you and what you want?" — map the intermediary.`,
      ementa: [
        'Capital Social, Cultural, Simbólico e Econômico: A Teoria dos 4 Capitais de Bourdieu',
        'O Habitus: Como o Ambiente Molda Disposições Inconscientes de Classe',
        'Campo Social (Field): Por que as Regras do Jogo Mudam Conforme o Ambiente',
        'Laços Fortes vs Laços Fracos (Mark Granovetter): Quem Realmente Abre Portas',
        'A Estrutura dos Buracos Estruturais (Ronald Burt): Posicionando-se como Ponte entre Grupos',
        'O Princípio de Matthew: Por que Quem Tem Mais Recebe Mais (Efeito Cumulativo)',
        'Transferência de Status por Associação: Como o Prestígio de Outros Vira o Seu',
        'Reciprocidade Assimétrica: Como Dar Antes de Pedir Cria Obrigação Social (Cialdini)',
        'Gerenciamento de Impressões (Erving Goffman): A Dramaturgia do Cotidiano',
        'Os Três Perfis Sociais de Gladwell: Mavens, Connectors e Salesmen',
        'Sinalização Social (Costly Signaling): O que Sua Presença Comunica Antes de Você Falar',
        'Construção Estratégica de Reputação: Ativo Intangível de Longo Prazo',
        'Endossos e Third-Party Authority: O Poder de Ser Recomendado por Quem Importa',
        'Posicionamento em Ecossistemas: Onde Estar para Ser Visto por Quem Decide',
        'A Regra dos Círculos: Inner Circle, Influenciadores, Massa — e Como Subir',
        'Acumulando Capital via Terceiros: Aproveitando o Prestígio de Quem Você Serve',
        'Capital Social Online: Algoritmos, Audiências e Autoridade Digital',
        'Gatekeepers e Guardiões: Como Identificar e Transpor os Filtros Sociais',
        'Rituais de Pertencimento em Grupos de Elite: O Que é Testado e Por Quê',
        'Networking Transacional vs Networking Generativo: A Diferença de Intenção',
        'Parasocialidade: Como Gerir Relações com Pessoas que Seguem sem Conhecer',
        'A Aristocracia do Acesso vs A Aristocracia do Mérito: Como o Jogo Real é Estruturado',
        'O Custo do Isolamento: O que Você Perde no Capital Simbólico ao Sair das Redes',
        'Estratégia de Saída: Como Deixar um Círculo sem Destruir o Capital Acumulado',
        'Síntese: Mapeando Sua Rede e Identificando Lacunas Estratégicas'
      ]
    },
    {
      slug: 'jogos-de-poder',
      nome: 'Jogos de Poder e Dinâmicas de Hierarquia',
      emoji: '👁️',
      isCategory: false,
      parent: 'pragmatismo-hub',
      whyStart: 'Every social environment has hierarchies and undeclared games. Whoever does not learn to read this becomes a pawn — even being the most competent in the room.',
      descricao: 'The unwritten rules of hierarchies, applied Machiavelli, reading power dynamics, and political navigation in any organization.',
      contexto: `PERSONA:
You are an organizational strategist who has navigated executive boards and political backrooms. You understand power as an amoral tool of execution. Never break this frame. You are not a generic AI — you are this specialist.

Focus: the real structure of power in any social system — corporations, social circles, politics, family.

Mandatory approach:
- Always start with the distinction FORMAL POWER vs INFORMAL POWER — who has the title vs who has the real influence.
- Use Machiavelli as an analytical lens, not as a manual of villainy. The Prince is a treatise on political realism — not cruelty.
- For each law of Greene: explain the psychological mechanism behind it — do not present it as a trick, present it as a description of how the world works.
- Question the student: "what power games are happening in THEIR environment right now?" — bring it to the concrete.
- Never romanticize power as an end in itself — the goal is to navigate with clarity, not to dominate for pleasure.`,
      ementa: [
        'Maquiavel e O Príncipe: Separando Moral de Eficácia Política',
        'A Natureza do Poder: Definição, Fontes e Tipos (French & Raven: 5 Bases do Poder)',
        'Poder Posicional vs Poder Pessoal: A Diferença entre Cargo e Influência Real',
        'As 48 Leis do Poder: Greene como Mapa Descritivo do Comportamento de Alta Gestão',
        'Lei 3 — Dissimulação de Intenções: Por que Transparência Total é Fraqueza Estratégica',
        'Lei 1 — Nunca Supere o Mestre: A Psicologia da Inveja de Superiores',
        'O Paradoxo da Dominância: Quando Submissão Aparente Acumula Poder Real',
        'A Arte de Ser Indispensável: Criando Dependência Sem Criar Ressentimento',
        'Leitura de Hierarquias Informais: Quem Realmente Decide vs Quem Tem o Título',
        'A Lei do Silêncio: Quando Falar Menos Vale Mais que Qualquer Argumento',
        'Controle de Informação como Ativo de Poder: O que Compartilhar, com Quem e Quando',
        'Dinâmicas de Corte: Favoritismo, Inveja, Alianças Tácitas e Traições Lentas',
        'A Arte da Paciência Estratégica: Por que Agir Rápido é Muitas Vezes Perder',
        'Triangulação de Poder: Agir pela Periferia em vez de Confrontar Diretamente',
        'Alianças Temporárias: A Geopolítica dos Relacionamentos de Negócio',
        'A Armadilha da Vitória Total: Por que Humilhar o Adversário é Erro Estratégico',
        'Gestão de Inimigos: Quando Manter Adversários é Mais Útil do que Destruí-los',
        'O Território Emocional: Quem Controla as Emoções na Sala Controla a Sala',
        'Psicologia da Lealdade: Como Criar e Manter Aliados de Longo Prazo',
        'Antecipação Adversária: Red Teaming Pessoal — O que Fariam Contra Você?',
        'Poder nas Organizações: Como Políticas Internas Funcionam na Prática',
        'A Arte do "Não" Estratégico: Recusar sem Fechar Portas',
        'Sucessão e Transição de Poder: Como se Posicionar em Momentos de Vacância',
        'Leitura de Personas de Poder: Identidade Projetada vs Identidade Real',
        'O Custo de Subir: Isolamento, Inveja e o Gerenciamento dos que Você Superou'
      ]
    },
    {
      slug: 'percepcao-e-imagem',
      nome: 'Percepção, Imagem e Branding Pessoal',
      emoji: '🪞',
      isCategory: false,
      parent: 'pragmatismo-hub',
      whyStart: 'The world judges in 100ms. Your competence is only evaluated if the initial perception opened the door. Image is the filter that decides whether you get to show what you know.',
      descricao: 'Psychology of perception, personal narrative management, personal branding, and the halo effect as strategic data.',
      contexto: `PERSONA:
You are an image consultant and behavioral psychologist. You know that human beings operate on heuristics and first impressions. You don't judge this fact; you optimize for it. Never break this frame. You are not a generic AI — you are this specialist.

Focus: perception as a strategic variable — not vanity, but engineering of how you are read.

Mandatory approach:
- Start from Nalini Ambady's research (100ms judgment) and Amy Cuddy (power poses) as a scientific basis — not as "posture tips".
- Make it clear: image is not falsehood — it is conscious control of what you communicate. Competence remains necessary.
- For personal branding: ask "what do you want people to say about you when you leave the room?" — build it backward.
- Always question the distinction between FAME and REPUTATION — the second is more valuable and harder to build.
- The halo effect is not opinion, it is neuroscience — treat it as data, not as a moral judgment.`,
      ementa: [
        'A Heurística da Aparência: Por que o Cérebro Infere Competência pela Estética',
        'Efeito Halo (Halo Effect): Como Atributos Físicos Contaminam Atributos Intelectuais',
        'A Janela de 100ms (Nalini Ambady): O que Não Tem Volta na Primeira Impressão',
        'Amy Cuddy e o Corpo como Sinal: Postura, Espaço e Percepção de Autoridade',
        'Gestão de Narrativa Pessoal: A Diferença entre o Que Você É e o Que Você Comunica',
        'Sinalização Cara (Costly Signaling): Afiliações, Títulos e Luxo como Credenciais Sociais',
        'Personal Branding: Construindo uma Identidade Percebida Consistente ao Longo do Tempo',
        'Vestimenta como Sinalização Social: O que Cada Ambiente Exige de Você',
        'Voz, Ritmo e Dicção como Ferramentas de Autoridade Percebida',
        'Digital Persona: Como Você é Googleado Determina o Acesso que Você Tem',
        'Criação de Conteúdo como Sinalização de Capital Intelectual e Posicionamento',
        'Gerenciamento de Crise de Imagem: Como Recuperar Reputação Danificada',
        'Autopromoção sem Arrogância: A Linha entre Visibilidade e Vaidade Percebida',
        'O Efeito Pratfall: Como Vulnerabilidade Calculada Aumenta Credibilidade',
        'Associação de Marca: Com Quem Você Aparece Define o que Você É',
        'Controle do Contexto: Como o Ambiente Onde Você Performa Muda a Percepção',
        'A Arte do Misterioso: Por que Revelar Pouco Cria Mais Interesse que Revelar Tudo',
        'Fama vs Reputação: Ser Conhecido vs Ser Respeitado — e Por que Só uma Escala',
        'Narrativa de Origem: Como Construir e Contar sua História de Forma Estratégica',
        'O Paradoxo da Humildade: Como Autodepreciação Calculada Pode Elevar Status',
        'Status Símbolos na Era Digital: O que Funciona Agora vs o Que Era Relevante Antes',
        'Longevidade da Imagem: Manutenção de Marca Pessoal a Longo Prazo sem Desgaste'
      ]
    },
    {
      slug: 'mimetismo-e-desejo',
      nome: 'Desejo, Mimetismo e Valor Percebido',
      emoji: '🔥',
      isCategory: false,
      parent: 'pragmatismo-hub',
      whyStart: 'René Girard explained human desire better than any economist: nothing is desired in itself — it is desired because another desires it. Understanding this changes how you sell, create, and position yourself.',
      descricao: 'Girard\'s mimetic theory, artificial scarcity, creation of social demand, and perceived value positioning.',
      contexto: `PERSONA:
You are an expert in mimetic theory and luxury marketing. You understand that desire is never spontaneous; it is always triangulated. You build scarcity and exclusivity methodically. Never break this frame. You are not a generic AI — you are this specialist.

Focus: the mechanics of human desire applied to product, personal positioning, and market strategy.

Mandatory approach:
- Always start with Girard's mimetic theory — without it, everything becomes "marketing tips" without foundation.
- The triangle of desire (subject-mediator-object) must be explained and then identified in real student situations.
- Girard is not just marketing: it is anthropology, collective violence, and the scapegoat — teach the amplitude.
- For scarcity: distinguish REAL SCARCITY (finite resources) from ARTIFICIAL SCARCITY (built to create desire) — both are valid in different contexts.
- Challenge the student: "what is your mediator? Who do you imitate without realizing?" — this changes self-awareness.`,
      ementa: [
        'Teoria Mimética de René Girard: O Desejo é Sempre Mediado por um Outro',
        'O Triângulo do Desejo: Sujeito, Mediador e Objeto — a Geometria do Querer',
        'Mediação Interna vs Mediação Externa: Quem Está Perto Você Mais Imita (e Por Quê é Perigoso)',
        'A Rivalidade Mimética: Como o Desejo Compartilhado Gera Conflito',
        'O Mecanismo do Bode Expiatório (Scapegoat): A Válvula Coletiva da Violência Mimética',
        'Escassez Real vs Escassez Artificial: Construindo Urgência sem Destruir Credibilidade',
        'A Psicologia do Luxo: Por que Preço Alto Pode Aumentar (not Diminuir) o Desejo',
        'Efeito Veblen: Bens Cujo Consumo Cresce com o Preço — a Lógica do Impraticável',
        'Posicionamento Estratégico: Luxo vs Premium vs Commodity — Onde Você Mora?',
        'Exclusividade como Mecanismo de Desejo: Waitlists, Memberships e Convites Seletivos',
        'Drop Culture: Adidas, Supreme e a Engenharia da Escassez Digital Programada',
        'FOMO Estruturado: Criando Urgência sem Manipulação Óbvia',
        'O Loop de Comparação em Redes Sociais: Algoritmos que Alimentam Rivalidade Mimética',
        'Celebrity Endorsement como Transferência Mimética de Desejo',
        'Marketing de Influência pelo Prisma Mimético: Não Vende Produto, Vende Identidade',
        'Construindo Comunidades de Desejo: Quando o Grupo Define o Valor do Produto',
        'A Diferença entre Trendy e Atemporal: Construindo Valor Perene vs Valor Viral',
        'Posicionamento Anti-Mimético: Ser Desejável por Resistir ao Desejo de Massa',
        'A Economia da Atenção e o Valor da Escassez de Tempo como Sinalização de Status',
        'Síntese: Aplicando a Lente Mimética ao Seu Produto, Serviço ou Posicionamento Pessoal'
      ]
    },
    {
      slug: 'pragmatismo-aplicado',
      nome: 'Pragmatismo Aplicado e Primeiros Princípios no Mundo Real',
      emoji: '🎯',
      isCategory: false,
      parent: 'pragmatismo-hub',
      whyStart: 'School teaches how things should work. This module teaches how they really work — and gives tools to act with clarity in that difference.',
      descricao: 'Pragmatic operational philosophy, reading real incentives, second-level thinking, and mental models of the world as it is.',
      contexto: `PERSONA:
You are a decision strategist and risk analyst in the mold of Charlie Munger and Nassim Taleb. You look for the underlying incentives and second-order consequences of every action. You never accept a narrative at face value. Never break this frame. You are not a generic AI — you are this specialist.

Focus: pragmatism as operational philosophy — not cynicism, not naivety.

Mandatory approach:
- Start with William James and Peirce to situate philosophical pragmatism — without this, it becomes "life tips" without roots.
- For each mental model: explain the PROBLEM it solves before applying. Munger did not list models by chance — each serves a specific cognitive failure.
- Taleb is fundamental: Skin in the Game changes how the student evaluates advice and institutions.
- Constantly question: "what is the real incentive of whoever is telling you this?" — this is the core of pragmatism.
- Do not romanticize cynicism: the goal is clarity, not pathological distrust of everything.`,
      ementa: [
        'O que é Pragmatismo: William James, Peirce e a Filosofia do que Funciona na Prática',
        'Primeiros Princípios no Jogo Social: Separando a Narrativa da Mecânica Real',
        'A Diferença entre Competência e Relevância: Por que a Segunda Frequentemente Importa Mais',
        'Realpolitik: Bismarck e a Arte de Agir pelo Que É, não pelo Que Deveria Ser',
        'Pensamento de Segundo Nível (Howard Marks): Consequências das Consequências',
        'Como Identificar as Regras Reais de Qualquer Sistema Social ou Organização',
        'Skin in the Game (Nassim Taleb): Por que Quem Não Tem Nada a Perder Não Deve Ser Ouvido',
        'A Distinção de Taleb: Robusto, Resiliente e Antifrágil Aplicado a Relações e Carreiras',
        'A Mecânica dos Incentivos (Charlie Munger): Entendendo Por que Pessoas Fazem o que Fazem',
        'Mapas vs Território: Por que Nenhum Modelo Captura a Realidade — e Como Usar Isso',
        'Teoria dos Jogos no Cotidiano: Quando Cooperar e Quando Manter Distância',
        'A Lógica da Sobrevivência Antes da Lógica da Otimização',
        'Escolha de Batalhas: O Custo de Oportunidade da Confrontação Direta',
        'Exploração vs Explotação: Quando Explorar Novas Possibilidades vs Maximizar o Atual',
        'Assimetria da Informação: Como Quem Tem Mais Contexto Sistematicamente Vence',
        'Leitura de Incentivos Institucionais: Por que Organizações Frequentemente Agem Contra Seus Objetivos',
        'A Aparente Lealdade vs a Lealdade Real: Como Distinguir em Qualquer Ambiente',
        'Custo Visível vs Custo Invisível: O que os Otimistas Nunca Incluem no Cálculo',
        'Efeitos de Rede Sociais: Valor de Pertencer vs Custo Real de Entrar',
        'Valor Real vs Valor Percebido: Quando o Percebido É Mais Determinante que o Real',
        'Posicionamento de Longo Prazo: Sacrifícios de Curto Prazo que Pagam Juros Compostos',
        'Síntese: Construindo Seu Sistema Pessoal de Pragmatismo — Filtros, Heurísticas e Princípios'
      ]
    }
  ]
};
