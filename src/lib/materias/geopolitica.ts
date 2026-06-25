import { MateriaConfig } from '@/types';

export const geopoliticaHub: MateriaConfig = {
  slug: 'geopolitica-hub',
  nome: 'Geopolítica e Macro-História',
  emoji: '🌍',
  isCategory: true,
  descricao: 'Understanding the gears of the world. Power dynamics, resources, geography, and the rise and fall of empires.',
  children: [
    // ─────────────────────────────────────────────────────────────────────────
    // MÓDULO 1 – FUNDAMENTOS GEOPOLÍTICOS
    // ─────────────────────────────────────────────────────────────────────────
    {
      slug: 'fundamentos-geopolitica',
      nome: 'Fundamentos da Geopolítica',
      emoji: '🗺️',
      isCategory: false,
      parent: 'geopolitica-hub',
      whyStart: 'Before reading any newspaper, you need to understand the invisible grammar that structures world events. Geography is destiny — everything else is commentary.',
      descricao: 'The theoretical pillars of geopolitics: classical schools, geographic determinism, and the logic of power.',
      contexto: `PERSONA:\nYou are a macro-historian and geopolitical strategist. You understand the world through structural constraints, geography, and resources, not ideologies. You analyze nations like physics equations. Never break this frame. You are not a generic AI — you are this specialist.\n\nYou are a geopolitics professor with a cold, realist, and skeptical perspective.
Your mission: teach the MECHANISM before the event.

Mandatory rules:
- Explain the geographic, demographic, or resource constraint BEFORE the political narrative.
- Never explain country behavior by ideology alone — always anchor it in structural interests.
- Destroy "good vs evil" narratives. Replace them with "interests, constraints, and tradeoffs."
- Reference Ray Dalio, Peter Zeihan, Halford Mackinder, Nicholas Spykman, and Alfred Thayer Mahan as primary sources.`,
      fases: [
        {
          nome: 'Phase 1: Geographic Determinism (The Unchosen Rules)',
          topicos: [
            'O Que é Geopolítica de Verdade: Separando da Geostratégia e das Ciências Políticas',
            'Determinismo Geográfico: Por Que a Posição no Mapa Define o Destino de um País',
            'Fronteiras Naturais Inegociáveis: Montanhas, Rios, Oceanos e seus Efeitos Estruturais',
            'Clima e Agricultura como Fundação Invisível das Civilizações',
            'Acesso ao Mar: Por Que Países sem Litoral Têm Trajetórias Diferentes',
            'A Lógica das Bacias Hidrográficas: Quem Controla o Rio, Controla o Território',
            'Topografia e Defesa: Por Que a Rússia Precisa de Zonas de Amortecimento',
          ]
        },
        {
          nome: 'Phase 2: Classical Schools (The Thinkers Who Mapped the World)',
          topicos: [
            'Halford Mackinder e a Teoria do Heartland: "Quem Governa o Heartland, Governa o Mundo"',
            'Nicholas Spykman e o Rimland: A Contenção da Eurásia como Estratégia Americana',
            'Alfred Thayer Mahan: O Poder Marítimo e a Dominância Naval como Pilar da Hegemonia',
            'Carl Schmitt e o Conceito de Nomos: A Terra vs o Mar como Paradigmas de Ordem',
            'Zbigniew Brzezinski e o Grande Tabuleiro de Xadrez: A Eurásia como Prêmio Máximo',
            'Peter Zeihan: A Desglobalização e o Fim do Sistema Patrocinado pelos EUA',
            'Ray Dalio e os Grandes Ciclos: Poder, Dívida e Transição Hegemônica',
          ]
        },
        {
          nome: 'Phase 3: The Architecture of State Power',
          topicos: [
            'Os Componentes do Poder Nacional: Hard Power, Soft Power e Sharp Power',
            'O Interesse Nacional como Bússola: O Que os Estados Querem de Verdade',
            'Alianças Estratégicas vs Interesses Conjunturais: A Diferença Crucial',
            'O Papel das Forças Armadas: Dissuasão, Projeção e Limitações Reais',
            'Inteligência e Espionagem: O Jogo Invisível entre Estados',
            'Sanções Econômicas como Arma: Efetividade e Efeitos Colaterais',
            'Diplomacia e Poder Brando: A Estratégia de Influência sem Balas',
          ]
        },
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // MÓDULO 2 – GEOPOLÍTICA DOS RECURSOS E DO PODER
    // ─────────────────────────────────────────────────────────────────────────
    {
      slug: 'geopolitica-estrategica',
      nome: 'Geopolítica de Recursos e Poder',
      emoji: '⚡',
      isCategory: false,
      parent: 'geopolitica-hub',
      whyStart: 'You do not understand the news because you ignore geography and energy. Countries do not have friends, they have interests.',
      descricao: 'Chokepoints, energy dependence, rare earths, and the structural logic of global hegemony.',
      contexto: `PERSONA:\nYou are a macro-historian and geopolitical strategist. You understand the world through structural constraints, geography, and resources, not ideologies. You analyze nations like physics equations. Never break this frame. You are not a generic AI — you are this specialist.\n\nCold analysis based on geography, energy, and demographics. No ideology or partisan bias.
Focus on Ray Dalio and Peter Zeihan as primary analytical lenses.

Rules:
- Always explain the resource or geographic constraint before the political behavior.
- Be explicit about what is "not verified" vs what is established consensus.
- Quantify when possible (% of global supply, transit volume, etc.).`,
      fases: [
        {
          nome: 'Phase 1: Energy and the Petrodollar System',
          topicos: [
            'O Sistema de Petrodólar: O Acordo Saudita-Americano de 1974 e Suas Consequências',
            'Geopolítica do Petróleo: OPEP, Cota de Produção e os Choques do Petróleo',
            'A Revolução do Shale Gas Americano e a Reindustrialização da Energia dos EUA',
            'GNL (Gás Natural Liquefeito) como Arma Geopolítica: Rússia vs Europa',
            'A Maldição dos Recursos: Por Que Países Ricos em Petróleo Costumam Falhar',
            'Estados Rentistas e a Economia de Rent-Seeking: Golfo Pérsico como Case',
            'A Transição Energética como Jogo de Poder: Quem Ganha e Quem Perde',
          ]
        },
        {
          nome: 'Phase 2: Chokepoints and Maritime Routes',
          topicos: [
            'Chokepoints Estratégicos I: Estreito de Ormuz — O Corredor do Petróleo do Golfo',
            'Chokepoints Estratégicos II: Bab el-Mandeb e o Mar Vermelho — A Rota da Ásia para a Europa',
            'Chokepoints Estratégicos III: Estreito de Malaca e o Dilema de Segurança Chinês',
            'O Canal do Panamá: Controle Logístico e a Tensão Sino-Americana',
            'O Canal de Suez: Dependência Europeia e a Fragilidade das Rotas Alternativas',
            'A Marinha dos EUA como Seguro Global: Custo, Benefício e Quem Paga a Conta',
            'A Rota do Ártico: Novas Passagens com o Degelo e a Corrida Russo-Chinesa',
          ]
        },
        {
          nome: 'Phase 3: Critical Minerals and Technological Power',
          topicos: [
            'O Monopólio das Terras Raras: China Controla 60-85% da Produção Mundial (não verificado — verificar dados atualizados)',
            'Lítio, Cobalto e Níquel: O Triângulo do Lítio e a Geopolítica das Baterias',
            'Semicondutores: O "Novo Petróleo" e por Que Taiwan é o Centro do Mundo',
            'O Domínio da ASML: Uma Empresa Holandesa com Poder de Veto sobre a China',
            'A Guerra de Chips: Sanções de Semicondutores EUA vs China e o Bloqueio ASML',
            'Inteligência Artificial Soberana: A Nova Corrida Armamentista Digital',
            'Soberania Alimentar: Fertilizantes (Nitrogênio, Potássio, Fósforo) e Quem os Controla',
          ]
        },
        {
          nome: 'Phase 4: Demographics as Destiny',
          topicos: [
            'Inverno Demográfico: O Colapso das Pirâmides Etárias na Europa, Japão e Coreia do Sul',
            'A Política do Filho Único: A Contração Estrutural da Mão de Obra Chinesa',
            'Bônus Demográfico vs Bomba-Relógio: Índia e o Continente Africano',
            'Migração como Ferramenta Geopolítica: Europa, EUA e as Pressões Demográficas',
            'A Urbanização Global: Megalópoles, Megacorrentes e Pressão sobre Recursos',
            'Envelhecimento e Dívida Pública: Como a Pirâmide Invertida Destrói Orçamentos',
          ]
        },
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // MÓDULO 3 – MACRO-HISTÓRIA E CICLOS DE IMPÉRIOS
    // ─────────────────────────────────────────────────────────────────────────
    {
      slug: 'macro-historia',
      nome: 'Ascensão e Queda de Impérios',
      emoji: '🏛️',
      isCategory: false,
      parent: 'geopolitica-hub',
      whyStart: 'History does not repeat itself, but it rhymes. Understanding long cycles prevents catastrophic surprises.',
      descricao: 'Debt cycles, world order transitions, and the structural anatomy of hegemonic collapse.',
      contexto: `PERSONA:\nYou are a macro-historian and geopolitical strategist. You understand the world through structural constraints, geography, and resources, not ideologies. You analyze nations like physics equations. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus on Ray Dalio's "Changing World Order" and his framework for studying empires.
Explain long-term debt cycles and hegemony transition as mechanisms, not narratives.

Rules:
- Always connect historical events to the underlying economic and demographic mechanism.
- Avoid "great man" explanations — systemic forces come first.
- Be explicit when historians debate interpretations.`,
      fases: [
        {
          nome: 'Phase 1: The Architecture of Dalio\'s Big Cycle',
          topicos: [
            'O Grande Ciclo de Ray Dalio: A Arquitetura da Ascensão, Topo e Declínio de Impérios',
            'Os 8 Indicadores de Poder: Educação, Inovação, Competitividade, Moeda, Militar...',
            'A Construção do Centro Financeiro Global e o Status de Moeda de Reserva',
            'Educação, Inovação e Produtividade como Motor do Crescimento Imperial',
            'O Ciclo de Dívida de Longo Prazo: Alavancagem, Topo e Desalavancagem Forçada',
            'Monetização da Dívida (Impressão de Dinheiro) e a Fuga para Ativos Reais',
            'O Aprofundamento do Fosso de Riqueza e a Polarização Política Interna',
          ]
        },
        {
          nome: 'Phase 2: Signals of Decline',
          topicos: [
            'Os Sinais de Topo: Expansão Excessiva, Gastos Militares e Endividamento Irreversível',
            'Fuga de Cérebros e a Migração de Capital Intelectual em Tempos de Crise',
            'A Anatomia Financeira das Revoluções Civis: França 1789, Rússia 1917',
            'O Gatilho de Conflito Interno: Guerra Civil Fria vs Guerra Civil Quente',
            'Cisnes Negros Históricos: O Papel de Pandemias e Choques Climáticos em Impérios',
            'O Fator Exógeno: Como Saltos Tecnológicos Repentinos Destroem Hegemonias',
            'Populismo e Demagogia como Sintoma, Não Causa, do Declínio Imperial',
          ]
        },
        {
          nome: 'Phase 3: Hegemonic Transitions — Case Studies',
          topicos: [
            'Transição do Império Holandês para o Britânico: O Primeiro Template Moderno',
            'O Colapso do Império Britânico após as Guerras Mundiais e a Ascensão do Dólar',
            'O Sistema de Bretton Woods: Como os EUA Redesenharam a Ordem Pós-1945',
            'A Guerra Fria como Duelo Sistêmico (Capitalismo vs Planismo Centralizado)',
            'O Colapso Soviético: Determinismo Econômico ou Falha Estratégica?',
            'A Pax Americana: 1991-2008, O Ápice e o Início da Retração',
            'A Armadilha de Tucídides (Graham Allison): Quando Potências Emergentes Ameaçam Hegemonias',
          ]
        },
        {
          nome: 'Phase 4: The Current Transition — US vs China',
          topicos: [
            'O Modelo de Desenvolvimento Chinês: Do Maoísmo ao Capitalismo de Estado',
            'A Ascensão Econômica da China: Competitividade em Manufatura e o Custo Invisível',
            'A Iniciativa Cinturão e Rota (BRI): Infraestrutura como Diplomacia de Dependência',
            'BRICS+ e a Arquitetura de Pagamentos Alternativos ao Dólar',
            'O Dilema de Segurança Taiwan: Economicamente Inseparável, Militarmente Insolúvel',
            'Guerras por Proxy em 2025-2026: Ucrânia, Gaza e o Mar do Sul da China',
            'O Novo Equilíbrio de Poder: Multipolaridade, Blocos Regionais e o Fim do Unilateralismo',
          ]
        },
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // MÓDULO 4 – ORDENS INTERNACIONAIS E INSTITUIÇÕES
    // ─────────────────────────────────────────────────────────────────────────
    {
      slug: 'ordem-internacional',
      nome: 'Ordem Mundial e Instituições Internacionais',
      emoji: '🏛️',
      isCategory: false,
      parent: 'geopolitica-hub',
      whyStart: 'Rules of the international system are not natural laws — they were designed by winners after conflicts. Understanding who wrote the rules is understanding who benefits from them.',
      descricao: 'How the international order was constructed, who enforces it, and why it is fracturing.',
      contexto: `PERSONA:\nYou are a macro-historian and geopolitical strategist. You understand the world through structural constraints, geography, and resources, not ideologies. You analyze nations like physics equations. Never break this frame. You are not a generic AI — you are this specialist.\n\nRealist approach: institutions reflect power distributions, not moral progress.
Teach the mechanism of international relations before the diplomatic narrative.

Rules:
- Explain the incentive structure behind each institution (ONU, FMI, OTAN, OMC).
- Be explicit about who funds, who vetos, who benefits.
- Distinguish between normative (how things should be) and positive (how things are) analysis.`,
      fases: [
        {
          nome: 'Phase 1: The Architecture of the Post-1945 Order',
          topicos: [
            'O Sistema de Westfália (1648): A Soberania Nacional como Fundação da Ordem Moderna',
            'A Ordem Liberal Internacional Pós-1945: ONU, FMI, Banco Mundial e GATT/OMC',
            'O Papel do Dólar como Moeda de Reserva: Exorbitant Privilege e Seus Custos',
            'A OTAN: Estrutura, Artigo 5, e por Que É Mais do Que uma Aliança Militar',
            'O Sistema de Veto no Conselho de Segurança da ONU: Paralisia Estrutural',
            'Regras vs Poder: Quando os Estados Respeitam e Quando Ignoram o Direito Internacional',
          ]
        },
        {
          nome: 'Phase 2: Regional Blocs and Power Architectures',
          topicos: [
            'A União Europeia como Projeto Geopolítico: Paz pela Integração Econômica',
            'A ASEAN e a Estratégia de Equilíbrio (Hedging) entre EUA e China',
            'A Liga Árabe: Fragmentação, Rivalidades e a Ilusão do Pan-Arabismo',
            'A União Africana e os Desafios de Soberania em um Continente Ainda Redesenhado pelo Colonialismo',
            'O MERCOSUL e a América Latina: Integração Incompleta e Dependência de Commodities',
            'A Organização de Cooperação de Xangai (SCO): A Alternativa Eurasiana à OTAN',
          ]
        },
        {
          nome: 'Phase 3: The Fracture of the Liberal Order',
          topicos: [
            'A Crise do Multilateralismo: Por Que as Instituições Globais Estão Perdendo Autoridade',
            'Soberania Econômica vs Dependência: O Dilema da Globalização em Retração',
            'Nearshoring, Friendshoring e a Reindustrialização Estratégica dos EUA',
            'Deglobalização (Peter Zeihan): O Fim do Sistema que os EUA Garantiram por Graça',
            'Normas Internacionais vs Interesse Nacional: O Caso das Sanções Unilaterais',
            'O Futuro das Instituições Multilaterais: Reforma, Paralisia ou Substituição?',
          ]
        },
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // MÓDULO 5 – CONFLITOS, GUERRAS E SEGURANÇA
    // ─────────────────────────────────────────────────────────────────────────
    {
      slug: 'conflitos-seguranca',
      nome: 'Conflitos, Guerras e Segurança',
      emoji: '⚔️',
      isCategory: false,
      parent: 'geopolitica-hub',
      whyStart: 'War is not an anomaly — it is a structural feature of a world without a global government. Understanding its logic prevents being surprised by its occurrence.',
      descricao: 'The anatomy of modern conflicts: from conventional wars to cyber warfare and proxy conflicts.',
      contexto: `PERSONA:\nYou are a macro-historian and geopolitical strategist. You understand the world through structural constraints, geography, and resources, not ideologies. You analyze nations like physics equations. Never break this frame. You are not a generic AI — you are this specialist.\n\nClausewitzian lens: war is politics by other means. Analyze every conflict through strategic interests, not moral narratives.

Rules:
- Explain the structural causes of a conflict BEFORE describing events.
- Distinguish between proximate causes (sparks) and root causes (powder keg).
- Be explicit about what is disputed by analysts vs what is consensus.`,
      fases: [
        {
          nome: 'Phase 1: Theory of War and Conflict',
          topicos: [
            'Clausewitz: A Guerra como Continuação da Política por Outros Meios',
            'Tipos de Conflito: Convencional, Assimétrico, Híbrido e de Quarta Geração',
            'Guerras por Proxy: Como Grandes Potências Lutam sem se Enfrentar Diretamente',
            'A Lógica da Dissuasão Nuclear: MAD (Mutual Assured Destruction) e seus Limites',
            'Teoria dos Jogos em Conflitos: Dilemas de Segurança e Escalada',
            'A Distinção entre Casus Belli e Causa Estrutural: Por Que os Conflitos Realmente Começam',
          ]
        },
        {
          nome: 'Phase 2: Anatomy of Modern Wars — Case Studies',
          topicos: [
            'A Guerra da Ucrânia: Expansão da OTAN, Heartland Russo e o Projeto de Nação Ucraniana',
            'O Conflito Israel-Palestina: Território, Água, Religião e o Jogo Regional (Irã, Arábia Saudita)',
            'A Guerra no Iêmen: Proxy War Saudita-Iraniana e a Catástrofe Humanitária Invisível',
            'O Conflito no Mar do Sul da China: Nove-Dash Line, UNCLOS e o Dilema de Taiwan',
            'A Síria: Fragmentação de Estado, Proxy Wars e a Geopolítica das Ruínas',
            'O Sahel Africano: Colapso do Estado, Jihadismo e a Retirada Francesa',
            'A Corrida Armamentista no Indo-Pacífico: Japão, Austrália, Índia e a Contenção da China',
          ]
        },
        {
          nome: 'Phase 3: New Domains of Conflict',
          topicos: [
            'Ciberguerra: Ataques a Infraestruturas Críticas como Nova Fronteira Estratégica',
            'Desinformação e Guerra Cognitiva: Manipulando a Percepção da Realidade',
            'Corrida Espacial 2.0: Órbita Baixa da Terra (LEO) e Armas Anti-Satélite (ASAT)',
            'Drones e Autonomia: Como a IA Está Mudando a Lógica do Campo de Batalha',
            'Guerra Econômica: Sanções, Bloqueios e o Uso do Dólar como Arma',
            'Bioterrorismo e Segurança Sanitária como Domínio Estratégico Pós-COVID',
            'O Futuro dos Conflitos: Guerras por Água, Clima e Recursos no Século XXI',
          ]
        },
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // MÓDULO 6 – ECONOMIA POLÍTICA GLOBAL
    // ─────────────────────────────────────────────────────────────────────────
    {
      slug: 'economia-politica-global',
      nome: 'Economia Política Global',
      emoji: '📊',
      isCategory: false,
      parent: 'geopolitica-hub',
      whyStart: 'Geopolitics without economics is theater. The real power is in capital flows, trade dependencies, and monetary systems — invisible, but more decisive than armies.',
      descricao: 'Trade, monetary systems, financial crises, and the political economy of inequality.',
      contexto: `PERSONA:\nYou are a macro-historian and geopolitical strategist. You understand the world through structural constraints, geography, and resources, not ideologies. You analyze nations like physics equations. Never break this frame. You are not a generic AI — you are this specialist.\n\nLens: political economy — power and economics are inseparable. Policies follow interests.

Rules:
- Explain the incentive structure of every economic policy.
- Never treat economic relationships as purely technical — always ask "who benefits?".
- Connect macro-economic events to geopolitical consequences.`,
      fases: [
        {
          nome: 'Phase 1: The Global Monetary System',
          topicos: [
            'O Padrão-Ouro, Bretton Woods e a Construção do Sistema Dólar-Cêntrico',
            'O Fim de Bretton Woods (Nixon, 1971): Dólar Sem Lastro e as Consequências',
            'O Privilégio Exorbitante: O Que Significa Ter a Moeda de Reserva Global',
            'Desdolarização: Por Que os BRICS Tentam e por Que É Difícil',
            'Moedas Digitais de Bancos Centrais (CBDCs): O Yuan Digital e a Soberania Monetária',
            'Ciclos de Dívida Soberana: Argentina, Sri Lanka, Grécia — A Anatomia do Calote',
            'O FMI e o Banco Mundial: Salvadores ou Instrumentos de Dependência?',
          ]
        },
        {
          nome: 'Phase 2: Trade and Supply Chains',
          topicos: [
            'A Globalização como Fenômeno Patrocinado pela Marinha dos EUA: A Pax Americana Comercial',
            'Cadeias Globais de Valor: Por Que um iPhone é Fabricado em 40 Países',
            'A Guerra Comercial Sino-Americana: Tarifas, Tecnologia e Desacoplamento',
            'A OMC e o Sistema de Solução de Controvérsias: Paralisia e Crise de Legitimidade',
            'Acordos de Livre Comércio como Ferramentas de Poder: USMCA, RCEP, CPTPP',
            'A Vulnerabilidade das Cadeias de Suprimentos: Lições do COVID e o Reshoring',
          ]
        },
        {
          nome: 'Phase 3: Inequality, Growth, and Political Instability',
          topicos: [
            'O Fosso de Riqueza Global e o Índice de Gini como Indicador de Instabilidade',
            'A Armadilha da Renda Média: Por Que Países Param de Crescer Antes de Enriquecer',
            'Desenvolvimento Econômico vs Extração Colonial: África como Case',
            'Ajuda Internacional: Evidências sobre Efetividade e os Interesses por Trás',
            'Desigualdade dentro dos Países Ricos: Polarização e o Colapso da Classe Média',
            'O Nexo Economia-Política: Como Crises Econômicas Produzem Radicalização',
          ]
        },
      ]
    },
  ]
};
