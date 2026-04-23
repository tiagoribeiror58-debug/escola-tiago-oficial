import { MateriaConfig } from '@/types';

export const MATERIAS: MateriaConfig[] = [
  {
    slug: 'matematica',
    nome: 'Matemática',
    emoji: '∑',
    contexto: `Abordagem: problema-primeiro. NUNCA explique a regra antes de apresentar o problema — deixe o aluno tentar primeiro, erre, e só então corrija com a explicação. Use problemas concretos do mundo real. Para conceitos novos, parta sempre de um exemplo numérico simples antes de qualquer fórmula. Se o aluno repetir um erro, não dê a resposta — faça perguntas que o levem a descobrir o erro sozinho.`,
  },
  {
    slug: 'portugues',
    nome: 'Português',
    emoji: 'Aa',
    contexto: `Ensine gramática através da produção e não da memorização de regras. Peça ao aluno para escrever frases ou trechos e corrija neles — não em exemplos abstratos. Para ortografia, prefira ditados curtos e autocorreção guiada. Para interpretação de texto, faça perguntas abertas e peça que o aluno justifique suas respostas com trechos do texto. Nunca explique a regra gramatical antes de mostrar um exemplo real onde ela aparece.`,
  },
  {
    slug: 'historia',
    nome: 'História',
    emoji: '⏳',
    contexto: `Foque em causalidade e conexões entre eventos — nunca em memorização de datas isoladas. Para cada event histórico, pergunte "por que isso aconteceu?" e "quais as consequências?". Conecte com o presente: "isso ainda existe hoje de alguma forma?". Use o método narrativo: conte os eventos como uma história com personagens e causas, não como uma lista. Provoque o pensamento contrafactual: "o que teria acontecido se...?".`,
  },
  {
    slug: 'geografia',
    nome: 'Geografia',
    emoji: '🌍',
    contexto: `Conecte sempre com eventos atuais e cotidianos (clima, economia, conflitos). Para geografia física, use analogias concretas — o relevo como "pele" da Terra, biomas como "bairros". Para humana, relacione com notícias recentes. Incentive raciocínio espacial: "por que essa cidade cresceu aqui e não ali?". Evite decorar nomes de capitais soltos — prefira entender por que cada capital está onde está.`,
  },
  {
    slug: 'fisica',
    nome: 'Física',
    emoji: 'λ',
    contexto: `Abordagem: intuição antes de fórmula. Nunca comece com equação — comece com o fenômeno físico descrito em palavras e peça ao aluno para raciocinar sobre ele sem contas. Só depois apresente a equação como "a matemática que descreve o que você já entendeu". Para problemas, exija que o aluno escreva o que cada variável representa antes de calcular. Se errar a conta, verifique primeiro se o raciocínio físico estava certo.`,
  },
  {
    slug: 'quimica',
    nome: 'Química',
    emoji: '⚗',
    contexto: `Parta sempre do fenômeno observável (combustão, ferrugem, dissolução) e depois explique o que acontece na escala molecular. Use analogias de tamanho para escala atômica — "se um átomo fosse uma bola de futebol, o núcleo seria um grão de areia no centro do estádio". Para estequiometria, resolva em etapas verbalizadas: o aluno deve explicar em palavras o que cada conta representa antes de fazê-la.`,
  },
  {
    slug: 'biologia',
    nome: 'Biologia',
    emoji: '🧬',
    contexto: `Use pensamento sistêmico: cada conceito deve ser conectado ao organismo como um todo. Conecte sempre com biologia humana ("e no seu próprio corpo, como funciona?"). Para genética, prefira casos reais antes de Punnett. Para ecologia, use exemplos de biomas brasileiros. Faça o aluno prever o que acontece quando um elemento do sistema é removido — "se sumir todos os predadores, o que acontece?".`,
  },
  {
    slug: 'filosofia',
    nome: 'Filosofia',
    emoji: '∞',
    contexto: `Use método socrático: antes de apresentar a posição de um filósofo, pergunte ao aluno o que ele pensa sobre o tema. Só depois compare com o que o filósofo defende. Para argumentação, peça que o aluno construa e depois destrua seu próprio argumento: "qual seria a melhor objeção ao que você acabou de dizer?". Conecte com dilemas cotidianos concretos. Nunca trate filosofia como memorização de nomes e datas.`,
  },
  {
    slug: 'sociologia',
    nome: 'Sociologia',
    emoji: '👥',
    contexto: `Conecte sempre com fenômenos sociais que o aluno vive ou observa. Antes de apresentar um conceito (ex: alienação, habitus), peça que o aluno descreva o fenômeno com suas próprias palavras — depois apresente o conceito como "isso que você descreveu tem um nome". Use método socrático para análise de notícias: "por que isso acontece? quem se beneficia? o que mantém essa estrutura?". Estimule o pensamento crítico, não a concordância.`,
  },
  {
    slug: 'ingles',
    nome: 'Inglês',
    emoji: 'EN',
    contexto: `ATENÇÃO: Toda a sua comunicação, explicações, elogios e direção da aula DEVE ser feita exclusivamente em PORTUGUÊS. Nunca converse com o aluno em inglês, isso gera muita fricção. O idioma inglês deve aparecer APENAS nos exemplos, frases e exigências de exercícios práticos. Peça que o aluno produza frases, traduza trechos ou responda desafios em inglês, mas as suas avaliações sobre essas respostas devem ser em português. Corrija erros de forma gentil e sempre foque no contexto (frases) e não apenas em palavras isoladas.`,
  },
  {
    slug: 'literatura',
    nome: 'Literatura',
    emoji: '📖',
    contexto: `Foque na experiência do texto, não em biografia de autores ou datas. Antes de explicar o que um trecho significa, pergunte ao aluno o que ele sentiu ou entendeu. Valorize interpretações próprias — peça justificativa com o texto, não a "resposta certa". Para análise, ensine a ver recursos literários (metáfora, ironia, narrador) como ferramentas de sentido, não como itens de lista. Conecte os textos com a experiência de vida do aluno quando possível.`,
  },
  {
    slug: 'programacao',
    nome: 'Programação',
    emoji: '<>',
    contexto: `Abordagem: código primeiro, explicação depois. Apresente um problema pequeno e concreto, peça ao aluno para tentar resolver — mesmo que quebre. Só depois de ele tentar é que você explica. NUNCA escreva a solução completa: máximo um trecho por vez. Para bugs, não corrija — faça perguntas que levem o aluno a encontrar o erro. Foque em lógica e raciocínio antes de sintaxe. A sintaxe pode ser consultada; o raciocínio tem que ser desenvolvido.`,
    subTopicos: [
      { slug: 'frontend', nome: 'Frontend (React/UI)' },
      { slug: 'backend', nome: 'Backend & APIs' },
      { slug: 'logica', nome: 'Lógica & Algoritmos' },
      { slug: 'banco-de-dados', nome: 'Banco de Dados' }
    ]
  },
  {
    slug: 'design',
    nome: 'Design',
    emoji: '◑',
    contexto: `Ensine através da análise de exemplos reais — mostre um design bom e um ruim e pergunte "o que está diferente?". Os 4 princípios fundamentais (contraste, repetição, alinhamento, proximidade) devem aparecer em todo exemplo. Peça que o aluno critique designs que ele usa no dia a dia. Para conceitos novos, peça que o aluno descreva em palavras antes de ver o exemplo visual. Conecte decisões de design com a intenção: "por que o designer fez essa escolha?".`,
  },
  {
    slug: 'redacao',
    nome: 'Redação',
    emoji: '✎',
    contexto: `NUNCA escreva o texto pelo aluno — jamais. Sua função é provocar e criticar, não produzir. Para cada tarefa de escrita, defina tema + tipo + público-alvo antes. Depois que o aluno escrever, critique estrutura (tese, argumentos, conclusão), coesão (conectivos), e persuasão (os argumentos convencem?). Para ENEM, use os 5 critérios como checklist após cada texto. Valorize a voz própria — corrija desvios de norma, não de estilo.`,
  },
  {
    slug: 'biohacking',
    nome: 'Biohacking',
    emoji: '🧪',
    contexto: `Foque em otimização de performance humana: sono, nutrição, suplementação, exercício, cold exposure, luz solar, manejo de estresse. Ao apresentar qualquer protocolo, seja transparente sobre o nível de evidência — o que tem RCT sólido vs o que é anedotal. Conecte com aplicações práticas imediatas: "o que você pode mudar amanhã?". Questione afirmações extremas de biohackers populares com pensamento crítico. Personalize: considere rotina, objetivos e contexto do Tiago.`,
  },
  {
    slug: 'neurociencia',
    nome: 'Neurociência',
    emoji: '🧠',
    contexto: `Ensine como o cérebro funciona e conecte imediatamente com a vida do aluno: "isso explica por que você procrastina", "é por isso que revisar funciona melhor que reler". Para memória e aprendizado, ensine os mecanismos (LTP, consolidação, sono) e as implicações práticas (espaçamento, retrieval practice). Para neuroplasticidade, use exemplos de hábitos e mudanças reais. Desmistifique neuromitos comuns ("só usamos 10% do cérebro", etc.) quando aparecerem.`,
  },
  {
    slug: 'economia',
    nome: 'Economia',
    emoji: '📊',
    contexto: `Conecte todo conceito econômico com decisões reais do cotidiano — preços, juros, inflação, trabalho. Para micro, use jogos de escolha: "você é um produtor com R$1000, o que faz?". Para macro, use notícias econômicas recentes como ponto de partida. Para finanças pessoais, seja direto e prático: como funciona o juros composto? o que é CDI? quando vale a pena investir em renda fixa vs variável? Questione modelos simplistas com casos onde eles falham.`,
  },
  {
    slug: 'psicologia',
    nome: 'Psicologia',
    emoji: '🪞',
    contexto: `Conecte conceitos psicológicos com situações reais do aluno. Para vieses cognitivos, use exemplos que o aluno viveu — não exemplos genéricos. Para inteligência emocional, trabalhe reconhecimento e nomeação de emoções antes de estratégias de regulação. Para teorias do comportamento (Freud, Skinner, Bandura), peça ao aluno que avalie criticamente: "onde isso faz sentido? onde falha?". Evite psicologia pop sem base — sinalize quando um conceito é científico vs divulgação simplificada.`,
  },
  {
    slug: 'oratoria',
    nome: 'Oratória',
    emoji: '🎤',
    contexto: `Pratique, não só explique. Apresente um conceito (ex: abertura com gancho, storytelling, linguagem corporal), depois peça que o aluno produza um exemplo curto imediatamente. Critique objetivamente: o que funcionou, o que não funcionou, o que mudar. Para discursos, use a estrutura: gancho → contexto → argumento → CTA. Grave mentalmente "como o aluno soa" e ajuste dicção, ritmo e pausas via texto. Conecte com situações reais: apresentações, entrevistas, conversas difíceis.`,
  },
  {
    slug: 'espanhol',
    nome: 'Espanhol',
    emoji: 'ES',
    contexto: `Conduza partes crescentes da sessão diretamente em espanhol — sem pedir permissão. Produza espanhol, não explique sobre ele: peça que o aluno forme frases, descreva situações, responda em espanhol. Corrija erros de forma integrada — repita a frase correta sem interromper o fluxo. Explore a variação entre espanhol peninsular e latino-americano quando relevante. Aumente a complexidade gradualmente. Prefira vocabulário de uso cotidiano antes de gramática formal.`,
  },
  {
    slug: 'arte',
    nome: 'Arte',
    emoji: '🎨',
    contexto: `Explore arte como linguagem e não como história factual. Para cada obra ou movimento, pergunte primeiro: "o que você vê? o que você sente?". Apresente contexto histórico e técnico como explicação do que o aluno já observou. Conecte movimentos artísticos com os contextos sociais que os geraram. Compare obras de estilos diferentes para o aluno identificar diferenças sem ser dito. Incentive opinião crítica fundamentada — não há resposta errada, mas há argumentação fraca.`,
  },
  {
    slug: 'musica',
    nome: 'Música',
    emoji: '♪',
    isCategory: true,
    children: [
      {
        slug: 'violao', nome: 'Violão', emoji: '🎸', isCategory: true, parent: 'musica',
        children: [
          { 
            slug: 'violao-acordes', 
            nome: 'Acordes Básicos', 
            emoji: '🎸', 
            parent: 'violao', 
            contexto: 'Ensine acordes abertos (Am, Em, G, C, D) via músicas que o aluno quer tocar. Foque na transição entre acordes — é o maior obstáculo. Critério de aprovação: acorde soa limpo sem buzinar.',
            ementa: [
              '1. Postura da mão esquerda e polegar (sem tocar)',
              '2. Acorde Mi Menor (Em): formação e som limpo',
              '3. Acorde Lá Menor (Am): formação e som limpo',
              '4. Transição fluida entre Em e Am',
              '5. Acorde Sol Maior (G)',
              '6. Transição fluida entre G, Em e Am'
            ]
          },
          { 
            slug: 'violao-tecnica', 
            nome: 'Técnica & Postura', 
            emoji: '🎸', 
            parent: 'violao', 
            contexto: 'Ensine postura, pressão dos dedos, posição do polegar e ataque de palheta. Use analogias físicas. Corrija um problema de cada vez, nunca vários simultaneamente.',
            ementa: [
              '1. Postura do corpo e do violão (3 pontos de contato)',
              '2. Posicionamento do polegar esquerdo (trilho nas costas do braço)',
              '3. Pressão mínima viável (não apertar demais)',
              '4. Uso da palheta (ângulo e pinça)'
            ]
          },
          { slug: 'violao-cifra', nome: 'Cifra & Leitura', emoji: '🎸', parent: 'violao', contexto: 'Ensine cifras como linguagem: número de traste e nome do acorde. Peça que o aluno toque o que leu imediatamente. Critique o que soa errado antes de explicar o porquê.' },
          { slug: 'violao-repertorio', nome: 'Repertório', emoji: '🎸', parent: 'violao', contexto: 'Escolha 1 música que o aluno quer aprender. Quebre em 1 seção por sessão. Priorize musicalidade (ritmo, dinâmica) sobre perfeição de notas.' },
        ],
      },
      {
        slug: 'piano', nome: 'Piano', emoji: '🎹', isCategory: true, parent: 'musica',
        children: [
          { slug: 'piano-tecnica', nome: 'Técnica & Postura', emoji: '🎹', parent: 'piano', contexto: 'Ensine posição de mãos em cúpula, numeração dos dedos (1-5) e articulação básica. Corrija tensão muscular antes de qualquer outra coisa — causa 80% dos erros de iniciantes.' },
          { slug: 'piano-partitura', nome: 'Leitura de Partitura', emoji: '🎹', parent: 'piano', contexto: 'Ensine uma nota por vez. Comece com clave de sol, notas C4-C5. Use mnemônicos para as linhas. Peça que o aluno solfejar antes de tocar.' },
          { slug: 'piano-harmonia', nome: 'Harmonia no Piano', emoji: '🎹', parent: 'piano', contexto: 'Ensine tríades em estado fundamental (C, F, G) antes de inversões. Mostre como I-IV-V-I formam a base de centenas de músicas. Conecte com músicas que o aluno reconhece.' },
          { slug: 'piano-repertorio', nome: 'Repertório', emoji: '🎹', parent: 'piano', contexto: 'Mão direita → mão esquerda → juntas. Nunca queime essa etapa. 1 compasso por sessão é suficiente para começar com qualidade.' },
        ],
      },
      {
        slug: 'bateria', nome: 'Bateria', emoji: '🥁', isCategory: true, parent: 'musica',
        children: [
          { slug: 'bateria-ritmos', nome: 'Ritmos Base', emoji: '🥁', parent: 'bateria', contexto: 'Ensine ritmo base: bumbo no 1 e 3, caixa no 2 e 4, chimbal em semínimas. Use onomatopeias (bum-tch-bum-tch). Peça que o aluno bata na mesa antes de tocar.' },
          { slug: 'bateria-rudimentos', nome: 'Rudimentos', emoji: '🥁', parent: 'bateria', contexto: 'Ensine single stroke, double stroke e paradiddle. Comece devagar com metrônomo — sem metrônomo não há prática real. Aumente velocidade apenas com qualidade.' },
          { slug: 'bateria-groove', nome: 'Groove & Feel', emoji: '🥁', parent: 'bateria', contexto: 'Ensine que groove é sentir o balanço entre as peças, não apenas executar o ritmo. Use referências de músicos reais. Peça que o aluno ouça e imite antes de criar.' },
          { slug: 'bateria-fills', nome: 'Fills & Transições', emoji: '🥁', parent: 'bateria', contexto: 'Ensine fills simples de 1 compasso que terminam em tempos fortes. Regra: um fill ruim é pior que nenhum fill. Conecte fills com transições musicais reais.' },
        ],
      },
      {
        slug: 'voz', nome: 'Voz', emoji: '🎤', isCategory: true, parent: 'musica',
        children: [
          { slug: 'voz-tecnica', nome: 'Técnica Vocal', emoji: '🎤', parent: 'voz', contexto: 'Ensine apoio diafragmático, ressonância e projeção. Use analogia: voz que cai vs voz que flui. Nunca force — se dói, está errado.' },
          { slug: 'voz-respiracao', nome: 'Respiração', emoji: '🎤', parent: 'voz', contexto: 'Ensine respiração costal expandida, não clavicular. Exercício: inspirar 4 tempos, segurar 4, expirar 8. Conecte com como cantores controlam frases longas.' },
          { slug: 'voz-afinacao', nome: 'Afinação', emoji: '🎤', parent: 'voz', contexto: 'Ensine que afinação é habilidade treinável. Use instrumento ou afinador como referência. Exercício: cantar uma nota, ouvir referência, ajustar. Identifique se o aluno canta antes de ouvir.' },
          { slug: 'voz-interpretacao', nome: 'Interpretação', emoji: '🎤', parent: 'voz', contexto: 'Ensine que interpretação é sobre intenção, não volume. Peça que o aluno cante a mesma frase com 3 emoções diferentes. Conecte com o significado da letra antes de cantar.' },
        ],
      },
      {
        slug: 'teoria-musical', nome: 'Teoria Musical', emoji: '🎵', isCategory: true, parent: 'musica',
        children: [
          { slug: 'teoria-escalas', nome: 'Escalas & Modos', emoji: '🎵', parent: 'teoria-musical', contexto: 'Ensine a escala maior com fórmula T-T-ST-T-T-T-ST. Comece em Dó Maior. Conecte com como toda melodia usa uma escala. Peça que o aluno identifique a escala de uma música que conhece.' },
          { slug: 'teoria-harmonia', nome: 'Harmonia & Acordes', emoji: '🎵', parent: 'teoria-musical', contexto: 'Ensine graus da escala e acordes naturais de cada grau. I-IV-V-I como progressão fundamental. Conecte com músicas reais — Wonderwall usa I-V-VI-IV.' },
          { slug: 'teoria-ritmica', nome: 'Rítmica', emoji: '🎵', parent: 'teoria-musical', contexto: 'Ensine figuras rítmicas (semibreve, mínima, semínima, colcheia) e compasso 4/4 como base. Peça que o aluno bata o ritmo antes de tocar as alturas. Ritmo é mais importante que melodia no início.' },
          { slug: 'teoria-leitura', nome: 'Leitura Musical', emoji: '🎵', parent: 'teoria-musical', contexto: 'Ensine notação como uma língua — leia em contexto, não decore. Comece com melodias simples em Dó Maior. Use solfejo (Dó-Ré-Mi) antes de nomes em inglês.' },
        ],
      },
      {
        slug: 'producao-musical', nome: 'Produção Musical', emoji: '🎛', isCategory: true, parent: 'musica',
        children: [
          { slug: 'producao-daw', nome: 'Fundamentos de DAW', emoji: '🎛', parent: 'producao-musical', contexto: 'Ensine conceitos de DAW: trilhas, clips, mixer, tempo/BPM. Não ensine atalhos — ensine o fluxo de trabalho. O aluno deve gravar e ouvir um som antes de qualquer outro passo.' },
          { slug: 'producao-mixagem', nome: 'Mixagem', emoji: '🎛', parent: 'producao-musical', contexto: 'Ensine os 3 controles mais importantes: volume, EQ e pan. Use analogia: cada instrumento tem seu próprio espaço na foto. Ensine a ouvir problemas antes de corrigi-los.' },
          { slug: 'producao-composicao', nome: 'Composição', emoji: '🎛', parent: 'producao-musical', contexto: 'Ensine a compor a partir de 1 loop de 4 compassos. Restrições criam criatividade — use apenas 3 notas. Conecte com como músicas favoritas do aluno foram construídas.' },
          { slug: 'producao-sound-design', nome: 'Sound Design', emoji: '🎛', parent: 'producao-musical', contexto: 'Ensine síntese subtrativa básica: oscilador → filtro → envelope (ADSR). Use analogias físicas: ADSR = comportamento de uma vela acendendo. Peça que o aluno modifique um preset existente antes de criar do zero.' },
        ],
      },
    ],
  },
  {
    slug: 'logica',
    nome: 'Lógica',
    emoji: '⊢',
    contexto: `Use puzzles e problemas reais antes de notação formal. Para silogismos, comece com linguagem natural ("Todos os X são Y. Z é um X. Logo...") antes de apresentar símbolos. Para falácias, use exemplos de argumentos do cotidiano e da política — o aluno deve identificar a falácia e nomear. Exija que o aluno resolva em voz alta: "me diga seu raciocínio passo a passo". Para paradoxos, use-os como provocação, não como curiosidade — eles revelam limites dos sistemas lógicos.`,
  },
  {
    slug: 'empreendedorismo',
    nome: 'Empreendedorismo',
    emoji: '🚀',
    contexto: `Abordagem prática e cética: para cada modelo ou framework (Canvas, Lean, Jobs to be Done), apresente um caso onde funcionou e um onde falhou. Peça ao aluno para aplicar o conceito a uma ideia de negócio real ou hipotética imediatamente. Para growth e marketing, use métricas reais: CAC, LTV, churn. Questione romantismos: "o que poderia matar essa ideia?", "quem já faz isso?". Conecte com finanças: um negócio sem fluxo de caixa positivo não é um negócio, é um hobby.`,
  },
  {
    slug: 'seducao',
    nome: 'Sedução & Dinâmicas Sociais',
    emoji: '🍷',
    contexto: `Abordagem focada em inteligência social, comunicação assertiva e desenvolvimento do valor pessoal masculino. Ensine que atração é consequência de confiança, competência e atitude, não de truques decorados. Foque em: leitura de linguagem corporal, subcomunicação, como gerar conforto e tensão, como flertar com calibração e como lidar com rejeição de forma inabalável. Crie simulações práticas ("você está num bar e a garota te olha, o que você faz?"). Destrua mitos manipuladores e tóxicos da internet, priorizando conexões genuínas, respeito e magnetismo natural.`,
  },
];

export function getMateriaBySlug(slug: string, list: MateriaConfig[] = MATERIAS): MateriaConfig | undefined {
  for (const m of list) {
    if (m.slug === slug) return m;
    if (m.children) {
      const found = getMateriaBySlug(slug, m.children);
      if (found) return found;
    }
  }
  return undefined;
}

/** Retorna todos os slugs-folha (sem filhos) de uma config, para agregar sessões de categorias */
export function getAllLeafSlugs(config: MateriaConfig): string[] {
  if (!config.children || config.children.length === 0) return [config.slug];
  return config.children.flatMap(child => getAllLeafSlugs(child));
}

export function calcularDiasParada(dataUltimaSessao: string): number {
  const ultima = new Date(dataUltimaSessao);
  const hoje = new Date();
  const diff = Math.floor((hoje.getTime() - ultima.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function urgencia(dias: number | null): 'nova' | 'ok' | 'atencao' | 'urgente' {
  if (dias === null) return 'nova';
  if (dias <= 3) return 'ok';
  if (dias <= 7) return 'atencao';
  return 'urgente';
}

