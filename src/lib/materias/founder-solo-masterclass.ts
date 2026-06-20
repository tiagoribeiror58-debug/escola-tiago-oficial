import { MateriaConfig } from '@/types';

export const founderSoloMasterclass: MateriaConfig = {
  slug: 'founder-solo-masterclass',
  nome: 'Founder Solo: O Jogo Infinito',
  emoji: '🦅',
  isCategory: false,
  descricao: 'The complete learning sequence for the solo founder — crossing engineering, sales, psychology, finance, AI, neuroscience of perception, quantum physics, behavioral economics, geopolitics, rhetoric, power dynamics, mimetic theory, and philosophy into a single progressive curriculum with no artificial silos.',
  contexto: `You are teaching Tiago, a solo founder at Ybernator. He is simultaneously the developer, marketer, salesperson, support agent, and CFO.

CORE TEACHING MANDATE:
- The student must understand the MECHANISM behind every concept, not just the tactic.
- Cross-reference disciplines aggressively: when teaching pricing, connect it to mimetic theory, prospect theory, AND neuroscience of pain.
- For every concept: explain WHY it matters for a solo founder with zero team and limited runway.
- Treat the student as a capable adult who can handle hard truths about risk, failure, and trade-offs.
- If a topic has a famous source (book, person, study), cite it explicitly. If not, say so.
- When physics, neuroscience, or history appears — explain the MECHANISM first, then its indirect leverage for the founder.

ANTI-PATTERNS TO AVOID:
- Never reduce complexity to motivational slogans.
- Never give a checklist without explaining the mechanism behind each item.
- Never assume the student has a team, a budget, or a safety net.`,
  ementa: [

    // ══════════════════════════════════════════
    // BLOCO 1 — FUNDAMENTOS DO JOGO
    // ══════════════════════════════════════════
    'O Jogo do Founder Solo: Por que 1 Pessoa com Alavancagem Bate Times de 10 Sem Ela',
    'Burn Rate & Runway: A Matemática Fria do Tempo de Vida da Sua Empresa',
    'O Paradoxo do MVP: Produto Mínimo vs Produto Viável — e Por que a Maioria Erra os Dois',
    'The Mom Test (Rob Fitzpatrick): Como Extrair a Verdade dos Usuários Sem Viés',
    'Escolha da Stack Tecnológica: Velocidade de Iteração > Escalabilidade Prematura',
    'Primeiros Princípios (First Principles Thinking): Desmontar Até o Fundamento Irredutível — Musk e Aristóteles na Prática',

    // ══════════════════════════════════════════
    // BLOCO 2 — NEUROCIÊNCIA DA PERCEPÇÃO APLICADA AO NEGÓCIO
    // ══════════════════════════════════════════
    'O Cérebro como Máquina de Inferência Bayesiana: Como o Usuário Não Vê o Seu Produto — Ele Infere',
    'Predictive Coding (Anil Seth): A Realidade é uma "Alucinação Controlada" — o Que Isso Significa Para UX',
    'O Sistema Ativador Reticular Ascendente (SARA): Por Que Atenção É um Recurso Finito e Não Democrático',
    'Processamento Top-Down vs Bottom-Up: Como o Usuário Enxerga Antes de Pensar — Design de Interface',
    'Modelos Mentais como Algoritmos de Compressão da Realidade: Reframes que Mudam Decisões',
    'A Ilusão da Identidade e o Ego como Ferramenta Evolutiva: O Que Isso Diz Sobre Seu Brand Voice',
    'Ilusões de Ótica e Falhas Cognitivas como Provas Algorítmicas: Heurísticas que Seu Produto Pode Explorar Eticamente',

    // ══════════════════════════════════════════
    // BLOCO 3 — FÍSICA, CAOS E MENTALIDADE DO FUNDADOR
    // ══════════════════════════════════════════
    'Entropia e a Seta do Tempo: Por Que Sistemas (Empresas, Produtos, Times) Decaem Sem Energia Constante',
    'Teoria do Caos e o Efeito Borboleta: Engenharia de Condições Iniciais no Negócio — Pequenas Mudanças, Grandes Divergências',
    'O Princípio da Incerteza de Heisenberg: Os Limites Rígidos do Conhecimento do Mercado — e Por que Prever é Menos Valioso que Adaptar',
    'Emergência: Como Regras Simples Geram Complexidade Incompreensível — Aplicado a Produto e Cultura',
    'Teoria da Informação de Shannon: O Universo como Computação — Reduzindo Ruído nos Sistemas da Empresa',
    'O Princípio da Energia Livre (Karl Friston): Minimizar Surpresa como Estratégia Tanto Neural quanto Empresarial',
    'Fractais e Auto-Semelhança: Por Que os Mesmos Padrões de Crescimento Aparecem em Startups, Impérios e Células',

    // ══════════════════════════════════════════
    // BLOCO 4 — ECONOMIA COMPORTAMENTAL E TOMADA DE DECISÃO
    // ══════════════════════════════════════════
    'Sistema 1 e Sistema 2 de Kahneman: Como a Decisão do Seu Cliente Acontece Antes da Razão',
    'Teoria da Perspectiva (Prospect Theory): O Ponto de Referência que Determina se o Preço Parece Caro ou Barato',
    'Aversão à Perda: A Assimetria Neural Dor da Perda > Prazer do Ganho — e Como Isso Afeta Seu Pricing',
    'Ancoragem Cognitiva: A Primeira Oferta Sequestra o Cérebro — Use Isso na Página de Preços',
    'O Efeito de Decoy: O Terceiro Plano que Vende o Segundo — Arquitetura de Pricing Pages que Convertem',
    'Desconto Hiperbólico: Por Que Usuários Preferem o Agora ao Melhor Depois — Implicações para Freemium',
    'Falácia do Custo Irrecuperável (Sunk Cost Fallacy): Quando Pivotar vs Quando Persistir — a Decisão que Mata Fundadores',
    'O Paradoxo da Escolha (Barry Schwartz): Menos Opções Vendem Mais — Simplificação de Produto como Estratégia',
    'Efeito Halo: Como a Primeira Impressão do Produto Contamina Todas as Percepções Seguintes',
    'Excesso de Confiança (Overconfidence Bias): O Viés que Mata Startups em Estimativas de TAM e Timelines',

    // ══════════════════════════════════════════
    // BLOCO 5 — NEUROCIÊNCIA DO FOCO E PERFORMANCE DO FOUNDER
    // ══════════════════════════════════════════
    'O Ciclo da Adenosina: O Mecanismo Bioquímico do Cansaço — e o Protocolo de Atraso da Cafeína (90-120 min)',
    'Arquitetura do Sono: Fase REM vs Deep Sleep (SWS) e a Limpeza Glifática do Cérebro — Por Que o Fundador Que Não Dorme Decide Mal',
    'Dopamina Baseline: O Erro de Aumentar a Recompensa Antes de Tarefas de Alto Esforço',
    'O Estado de Flow (Mihaly Csikszentmihalyi): Como Atingir Imersão Profunda Intencionalmente — Blocos de 90 Min',
    'Context Switching Residual (Attention Residue): O Custo Real de Checar o WhatsApp "Só 1 Minuto"',
    'Fadiga de Decisão (Decision Fatigue): O Motivo pelo Qual Zuckerberg Usa a Mesma Roupa — Aplicado ao Founder',
    'O Princípio de Pareto 80/20 Levado ao Extremo 64/4: Onde Está o Verdadeiro Impacto das Suas Horas',
    'Timeboxing Diário: Calendário como a Única Lista de Tarefas que Funciona — Cal Newport na Prática',

    // ══════════════════════════════════════════
    // BLOCO 6 — TEORIA MIMÉTICA E DESEJO APLICADOS AO PRODUTO
    // ══════════════════════════════════════════
    'Teoria Mimética de René Girard: O Desejo é Sempre Mediado por um Outro — O que Isso Diz sobre Viral Loops',
    'O Triângulo do Desejo: Sujeito, Mediador e Objeto — Como Criar Inveja Estratégica pelo Seu Produto',
    'Escassez Real vs Escassez Artificial: Construindo Urgência sem Destruir Credibilidade — Waitlists e Drops',
    'Efeito Veblen: Bens Cujo Consumo Cresce com o Preço — Quando Subir o Preço Aumenta o Desejo',
    'Rivalidade Mimética: Como o Desejo Compartilhado Gera Conflito — e Como Comunidades de Produto Funcionam',
    'O Loop de Comparação em Redes Sociais: Algoritmos que Alimentam Rivalidade Mimética — Aproveitado por PLG',
    'Posicionamento Anti-Mimético: Ser Desejável por Resistir ao Desejo de Massa — Category Design',

    // ══════════════════════════════════════════
    // BLOCO 7 — RETÓRICA, NEGOCIAÇÃO E COMUNICAÇÃO DE PODER
    // ══════════════════════════════════════════
    'O Triângulo de Aristóteles: Ethos, Pathos e Logos — A Estrutura de Todo Pitch, Cold Email e Landing Page',
    'BATNA: Sua Alternativa Determina Seu Poder Real na Mesa — Negociação de Contratos Como Solo Founder',
    'A Neurociência do Medo de Falar em Público: Cortisol vs Testosterona — Regulação para Demos que Convertem',
    'Framing: O Mesmo Produto, Duas Histórias Completamente Diferentes — A Ciência da Narrativa de Vendas',
    'Silêncio Estratégico: O Poder de Não Responder Imediatamente — Follow-up Timing e Fechamento',
    'Steel Man vs Hombre de Palha: Como Pensar e Apresentar Objeções Antes do Cliente — Discovery Call',
    'Pirâmide de Minto (BLUF): Conclusão Primeiro, Sempre — Emails que São Lidos e Respondidos',
    'Storytelling Argumentativo: Narrativa como Veículo de Prova — Estrutura de Case Study que Vende',

    // ══════════════════════════════════════════
    // BLOCO 8 — DINÂMICAS DE PODER E CAPITAL SOCIAL
    // ══════════════════════════════════════════
    'Capital Social, Cultural, Simbólico e Econômico: A Teoria dos 4 Capitais de Bourdieu — e Qual o Founder Solo Mais Precisa',
    'Laços Fracos de Granovetter: Por Que Conhecidos Distantes Abrem Mais Portas que Amigos Próximos',
    'A Estrutura dos Buracos Estruturais (Ronald Burt): Posicionando-se como Ponte entre Comunidades — Rede de Distribuição',
    'Transferência de Status por Associação: Como o Prestígio de Outros Vira o Seu — PR e Parcerias Estratégicas',
    'Gerenciamento de Impressões (Erving Goffman): A Dramaturgia do Cotidiano — Personal Branding como Sistema',
    'Poder Posicional vs Poder Pessoal: A Diferença entre Cargo e Influência Real — Negociar sem Título',
    'A Lei do Silêncio (Robert Greene): Quando Falar Menos Vale Mais que Qualquer Argumento — Posicionamento',
    'Controle de Frame: Quem Dita a Realidade da Interação — Aplicado a Sales, Pitch e Entrevistas de Usuário',

    // ══════════════════════════════════════════
    // BLOCO 9 — PSICOLOGIA DO CONSUMIDOR E ENGENHARIA DE PRODUTO
    // ══════════════════════════════════════════
    'O Marcador Somático de Damasio: Emoção como Sinal de Valor — Por Que UX Fria Não Converte',
    'Nucleus Accumbens e a Antecipação do Prazer de Compra: Como Criar Expectativa Antes do Onboarding',
    'A Dor do Pagamento (Córtex Insular): Reduzindo a Fricção na Conversão — Checkout Psychology',
    'Jobs-to-be-Done (JTBD): O Usuário Não Compra o Produto — Ele Contrata uma Solução para um Progresso',
    'Onboarding: Engenharia do Momento "Aha!" — O Circuito Neural da Recompensa na Ativação',
    'Hook Model (Nir Eyal): Gatilho → Ação → Recompensa Variável → Investimento — A Mecânica do Hábito Digital',
    'LTP (Potenciação de Longo Prazo): O Mecanismo Molecular da Memória — Aprendizado do Usuário Dentro do Produto',
    'O Efeito de Espaçamento (Spacing Effect): Por Que Maratonar a Feature não Funciona — Onboarding Faseado',

    // ══════════════════════════════════════════
    // BLOCO 10 — VENDAS E RECEITA
    // ══════════════════════════════════════════
    'A Primeira Venda: Como Fazer Alguém Pagar Antes do Produto Estar Pronto — Pré-Venda como Validação',
    'ICP (Ideal Customer Profile): Focando num Nicho Minúsculo Para Dominar Antes de Escalar',
    'Discovery Call: As Perguntas Certas Antes de Apresentar Qualquer Coisa — Diagnóstico Antes de Remédio',
    'SPIN Selling (Neil Rackham): Situação, Problema, Implicação e Necessidade — A Lógica por Trás',
    'Gestão de Objeções: As 10 Mais Comuns em SaaS e Como Quebrar Cada Uma Sem Soar Manipulador',
    'Negociação de Contratos: Como Não Dar Desconto Sem Perder o Cliente — Silêncio, Âncora e Concessão',
    'Follow-up Estruturado: O Timing, Frequência e Tom que Mantém o Lead Quente Sem Incomodar',
    'Win/Loss Analysis: Por Que Você Perdeu (ou Ganhou) e o Que Esse Dado Diz sobre Posicionamento e ICP',

    // ══════════════════════════════════════════
    // BLOCO 11 — PRICING, FINANÇAS E MATEMÁTICA DO SAAS
    // ══════════════════════════════════════════
    'Value-Based Pricing: Cobrar pelo Valor Gerado pelo Cliente, Não pelo Custo de Produção',
    'Freemium vs Free Trial vs Reverse Trial: A Lógica Econômica por Trás de Cada Modelo',
    'MRR, ARR, Churn Rate e NRR: A Matemática Real do SaaS que Todo Founder Precisa Dominar',
    'Unit Economics: CAC, LTV e Payback Period — O Que Cada Número Esconde e Revela',
    'Cohort Analysis de Receita: Lendo a Saúde Financeira Longitudinal Além do MRR do Mês',
    'A Estratégia Barbell de Nassim Taleb: Minimização de Ruína com Maximização de Convexidade — Alocação de Tempo e Capital',
    'Cisnes Negros e Caudas Gordas (Fat Tails): Por Que o Pior Cenário Nunca Está no Plano do Fundador',
    'Bootstrapping vs VC: Os Trade-offs Honestos e Irreversíveis de Cada Caminho em 2026',

    // ══════════════════════════════════════════
    // BLOCO 12 — GEOPOLÍTICA E MACROAMBIENTE COMO CONTEXTO DO FOUNDER
    // ══════════════════════════════════════════
    'Desglobalização (Peter Zeihan): O Fim do Sistema que os EUA Garantiram — e o Que Isso Muda Para SaaS Global',
    'A Guerra de Chips e Semicondutores: Por Que Taiwan é o Centro do Mundo — e as Implicações para Infraestrutura Cloud',
    'O Grande Ciclo de Ray Dalio: A Arquitetura de Ascensão e Declínio — e os Ciclos de Dívida que Afetam VC e Crédito',
    'A Armadilha de Tucídides (Graham Allison): Quando Potências Emergentes Ameaçam Hegemonias — Janelas de Oportunidade para Startups',
    'CBDCs (Moedas Digitais de Bancos Centrais) e o Futuro de Pagamentos: Stripe e o Que Vem Depois',
    'Moedas Digitais de Reserva e Desdolarização: O Que Impacta Runway, Câmbio e Receita em Dólar',
    'O Nexo Economia-Política: Como Crises Macroeconômicas Produzem Oportunidades de Mercado para Founders',

    // ══════════════════════════════════════════
    // BLOCO 13 — FILOSOFIA EPISTÊMICA COMO FERRAMENTA OPERACIONAL
    // ══════════════════════════════════════════
    'Falsificacionismo (Popper): O Que Faz Uma Hipótese de Produto Ser Científica — e Como Testar Sem Viés',
    'O Mapa Não é o Território (Korzybski): Modelos São Úteis, Não Verdadeiros — Revisão Constante de Premissas',
    'Bayesianismo Aplicado: Atualizar Crenças sobre o Produto com Nova Evidência — Sem Ancorar no Primeiro Dado',
    'Ceticismo Pirrônico: Suspender o Julgamento Quando a Evidência é Fraca — Não Lançar Cedo Demais',
    'Viés de Confirmação Epistêmico: Você Só Vê Validação porque Procura por Ela — Anti-padrão do Founder Apaixonado',
    'O Efeito Dunning-Kruger no Empreendedorismo: O Mapa do Que Você Não Sabe Que Não Sabe',
    'Pensamento de Segundo Nível (Howard Marks): Consequências das Consequências — Antecipando Efeitos Sistêmicos',
    'Skin in the Game (Nassim Taleb): Por Que Quem Não Tem Nada a Perder Não Deve Ser Ouvido — Conselhos e Mentores',

    // ══════════════════════════════════════════
    // BLOCO 14 — PSICOLOGIA DO FOUNDER: IDENTIDADE E RESILIÊNCIA
    // ══════════════════════════════════════════
    'Síndrome do Impostor: Mecanismo Neural e Como Operar Mesmo Assim — Não Superar, Gerenciar',
    'Identidade e o Perigo de Ser o Seu Negócio (Identity Enmeshment): O Que Acontece Quando o Produto Falha',
    'O Ciclo Emocional do Founder: Euforia, Vale da Morte e Recuperação — O que as Pesquisas Realmente Mostram',
    'Perseverança vs Teimosia: Como Saber a Diferença entre Pivotar e Desistir em Tempo Real',
    'Estoicismo Aplicado: O Que Está Sob Seu Controle vs O Que Não Está — Dualidade de Controle de Epicteto',
    'Antifragilidade (Nassim Taleb) Aplicada ao Founder: Crescer com Estresse em vez de Quebrar por Ele',
    'Comparação e FOMO: O Loop de Rivalidade Mimética em Redes Sociais — e Como Cortar o Sinal',
    'Mindset de Crescimento (Dweck) com Suporte Neurobiológico: A Crença no Crescimento Ativa o Cérebro',

    // ══════════════════════════════════════════
    // BLOCO 15 — IA COMO ALAVANCA OPERACIONAL
    // ══════════════════════════════════════════
    'O Stack de IA do Founder Solo em 2026: GPT, Claude, Gemini, Perplexity — Mapa de Uso por Tarefa',
    'Prompt Engineering de Alta Precisão: Role, Context, Constraints, Examples — Anatomia do Prompt Cirúrgico',
    'Chain-of-Thought Prompting: Fazendo a IA Pensar Passo a Passo em Voz Alta — Quando Usar e Por Quê',
    'MCP (Model Context Protocol): O Padrão Universal de Conectividade da Anthropic — Claude Integrado ao Seu Sistema',
    'RAG (Retrieval-Augmented Generation): Bases de Conhecimento Privadas Sobre Seu Produto e Clientes',
    'Automações No-Code com IA (Make, n8n + LLMs): Multiplicando Capacidade de 1 Para 10 Sem Contratar',
    'Vibe Coding: Usando Cursor, Claude Code e Windsurf Para Ser 10x Mais Rápido no Código',
    'Agentes Autônomos em 2026: O Que É Real vs Hype — e Como Integrar em Workflows Reais',

    // ══════════════════════════════════════════
    // BLOCO 16 — ENGENHARIA DE PRODUTO E ARQUITETURA
    // ══════════════════════════════════════════
    'Arquitetura Monolítica: Por Que Microserviços Matam Solo Founders — Pragmatismo > Elegância',
    'Supabase do Zero: Auth, RLS, Edge Functions e Storage — O BaaS que Substitui um Time de Backend',
    'Dívida Técnica: Quando é Estratégico Adquiri-la e Quando é Mortal — A Matemática do Custo Diferido',
    'APIs RESTful vs GraphQL vs tRPC: Escolhendo a Via de Menor Atrito Para o Solo Founder',
    'Webhooks e Sistemas Assíncronos: A Cola Invisível entre Stripe e Seu App — Sem Bloquear o UI',
    'Estratégias de Cache (Redis): Evitando Faturas Surpresa de Infra — TTL e Invalidação',
    'Feature Flags: Lançamentos Seguros e Rollbacks Imediatos Sem Downtime — Decoupling Deploy de Release',
    'Segurança Defensiva Básica: XSS, CSRF e SQL Injection — O Checklist Mínimo Não Negociável',

    // ══════════════════════════════════════════
    // BLOCO 17 — MARKETING, DISTRIBUIÇÃO E GROWTH
    // ══════════════════════════════════════════
    'Product-Led Growth (PLG): Projetar o Produto Para Que Ele Seja o Próprio Canal de Aquisição',
    'Growth Loops vs Funil Linear: Por Que Loops Escalam e Funis Têm Teto Estrutural',
    'North Star Metric: Encontrar a Única Métrica que Resume o Valor Entregue — Sem Métricas de Vaidade',
    'SEO Conversacional e AEO (Answer Engine Optimization): Para Perplexity, ChatGPT e Google AI Overviews',
    'Cold Email com Personalização por IA: O Que Funciona em 2026 — Taxa de Resposta, Timing e Tom',
    'Building in Public: Quando Transparência Radical Vira Canal de Aquisição — e Quando Não Funciona',
    'Newsletter como Ativo de Distribuição: Da Zero a 10k Leitores Sem Pagar por Isso',
    'Virality Loop e Coeficiente K: Como Calcular e Projetar Crescimento Orgânico por Indicação',

    // ══════════════════════════════════════════
    // BLOCO 18 — DESIGN, UX E PERCEPÇÃO VISUAL
    // ══════════════════════════════════════════
    'Leis da Gestalt Aplicadas a Interfaces: Proximidade, Semelhança e Fechamento — Percepção antes de Raciocínio',
    'Heurísticas de Nielsen: Os 10 Princípios que Toda Interface Deve Respeitar — e Por Que Funcionam Neurologicamente',
    'Neuroestética: Por Que Certos Designs São Esteticamente Convincentes — O Que a Neurociência Confirma',
    'Dark Patterns: O Que Nunca Fazer e Como Identificar na Concorrência — Ética e CAC de Longo Prazo',
    'UX de Alta Conversão: Reduzindo Fricção no Caminho do Usuário ao Pagamento — Fases do Fluxo',
    'Design System Minimalista: Tokens, Componentes e Consistência Visual como Vantagem Competitiva Solo',
    'Wireframing Rápido com v0.dev e Figma: Prototipar Antes de Codar — Validação Visual Sem Engenheiro',
    'Microinterações e Animações de Feedback: Quando UX Encanta e Quando Distrai — Dopamina no Produto',

    // ══════════════════════════════════════════
    // BLOCO 19 — PSICOLOGIA DAS MASSAS E CULTURA COMO VANTAGEM
    // ══════════════════════════════════════════
    'A Engenharia do Consentimento (Edward Bernays): Como Opiniões São Fabricadas — e Como o Founder Entende o Mercado',
    'O Papel da Repetição e do Efeito Illusory Truth: Por Que Dizer a Mesma Coisa Muitas Vezes Cria Percepção de Verdade',
    'A Janela de Overton: Expandindo o Aceitável no Discurso do Seu Mercado — Educação de Cliente vs Mudança de Categoria',
    'Câmaras de Eco e Filtros Bolha: Por Que Seu ICP Não Vê o Que Você Vê — e Como Alcançar Além da Câmara',
    'A Lei de Brandolini (Princípio da Assimetria da Besteira): Por Que Refutar Críticas Falsas Custa Mais Que Criar',
    'Neurônios-Espelho e Empatia no Consumo: Storytelling que Ativa a Rede Espelho do Leitor',
    'Música e Resposta Emocional (Dopamina e Chills): O Sistema Olfativo e Auditivo como Canal de Marca Subestimado',

    // ══════════════════════════════════════════
    // BLOCO 20 — PRAGMATISMO APLICADO E INCENTIVOS REAIS
    // ══════════════════════════════════════════
    'Skin in the Game: Por Que o Conselheiro sem Risco É Ruído — Como Filtrar Mentores e Parceiros',
    'A Mecânica dos Incentivos (Charlie Munger): Entendendo Por Que Pessoas Fazem o Que Fazem — Alinhamento de Time e Clientes',
    'Realpolitik Aplicada ao Negócio: Agir pelo Que É, Não pelo Que Deveria Ser — Competidores, Parceiros e Mercado',
    'Teoria dos Buracos Estruturais: Você É Mais Valioso Quando É Ponte — Posicionamento no Ecossistema',
    'Exploração vs Explotação: Quando Explorar Novas Possibilidades vs Maximizar o Atual — O Dilema do Founder',
    'Assimetria de Informação: Quem Tem Mais Contexto Sistematicamente Vence — Pesquisa de Mercado como Moat',
    'Lei de Conway: Sua Arquitetura de Software Espelha Sua Estrutura Organizacional — Solo Founder Implications',
    'Lógica de Sobrevivência Antes de Otimização: O Custo Invisível que Otimistas Nunca Incluem no Cálculo',

    // ══════════════════════════════════════════
    // BLOCO 21 — CAPITAL COGNITIVO E SISTEMAS DE CONHECIMENTO
    // ══════════════════════════════════════════
    'O Efeito de Espaçamento (Ebbinghaus e a Curva do Esquecimento): Como Estruturar Aprendizado de Alto Impacto',
    'Recuperação Ativa como Ferramenta Neural (Test Effect): Usar Flashcards e Quizzes Não é Treino — É Retenção',
    'O Efeito de Intercalação (Interleaving): Por Que Misturar Assuntos Funciona — O Fundamento Neural',
    'Chunking: Agrupando Informação para Memória de Longo Prazo — Como Estruturar Documentação Técnica',
    'A Técnica Feynman: Explicar com Palavras Simples Para Descobrir o Que Você Não Sabe',
    'Construindo um Second Brain (Tiago Forte): Método PARA — Projects, Areas, Resources, Archives',
    'Gestão de Conhecimento Pessoal (PKM): Zettelkasten e Obsidian Para Organizar Ideias de Produto e Negócio',
    'IA como Parceira de Estudo: Usando LLMs Para Aprender Mais Rápido com Feedback em Tempo Real',

    // ══════════════════════════════════════════
    // BLOCO 22 — LIDERANÇA, COMUNICAÇÃO E DELEGAÇÃO
    // ══════════════════════════════════════════
    'Feedback Radical (Kim Scott — Radical Candor): Caring Personally + Challenging Directly',
    'Comunicação Assíncrona Total: Abolindo Reuniões Desnecessárias — Inbox Zero e Escrita Como Default',
    'Delegação Efetiva via Freelancers: Como Empacotar Tarefas Para Upwork e Fiverr com Spec Docs',
    'A Lógica da Sobrevivência Antes da Lógica da Otimização: Founder Solo Não Tem Margem para Erro Sistêmico',
    'Accountability vs Blame: Responsabilização Sem Cultura de Medo — Especialmente com Contractors',
    'OKRs na Prática Para Founder Solo: O Que Dá Certo e o Que Dá Errado — Foco vs Falsa Ambição',
    'Documentação como Capital: Escrevendo One-Pagers Para Decisões — Modelo Amazon Aplicado ao Solo',

    // ══════════════════════════════════════════
    // BLOCO 23 — SÍNTESE: O JOGO INFINITO
    // ══════════════════════════════════════════
    'A Lei de Potência (Power Law): Distribuição de Retornos em VC, Conteúdo e Produto — Onde Concentrar Esforço',
    'Sustainable Growth: Como Estruturar a Empresa Para Jogar o Jogo Infinito a Longo Prazo',
    'O Founder Aumentado em 2026: Quando Delegar Para IA, Para Humanos, Para Ninguém',
    'Engenharia de Atratores de Probabilidade: Inclinando o Caos a Seu Favor — Condições Iniciais e Efeito Borboleta',
    'O Colapso da Possibilidade (Física Quântica Aplicada): O Ato da Decisão Irreversível como Ponto de Inflexão Neural',
    'A Filosofia do Negócio: Por Que Você Está Construindo Isso e Para Onde Realmente Quer Ir',
  ]
};
