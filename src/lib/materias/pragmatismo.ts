import { MateriaConfig } from '@/types';

export const pragmatismoHub: MateriaConfig = {
  slug: 'pragmatismo-hub',
  nome: 'Pragmatismo & Jogos de Poder',
  emoji: '♟️',
  isCategory: true,
  descricao: 'As regras não escritas da ascensão: capital social, dinâmicas de poder, percepção, desejo mimético e pragmatismo aplicado. O que a escola nunca ensinou.',
  children: [
    {
      slug: 'capital-social',
      nome: 'Capital Social & Relações Estratégicas',
      emoji: '🤝',
      isCategory: false,
      parent: 'pragmatismo-hub',
      whyStart: 'Sem rede, todo conhecimento técnico morre na gaveta. Capital social é o multiplicador invisível de todas as outras competências — e pode ser construído intencionalmente.',
      descricao: 'A mecânica das redes de poder, transferência de prestígio e acúmulo de capital via terceiros.',
      contexto: `Foco: a teoria sociológica do capital aplicada à ascensão prática.

Abordagem obrigatória:
- Parta sempre de Bourdieu para introduzir os 4 tipos de capital — sem essa base, tudo vira "dica de networking vazio".
- Explique o MECANISMO antes do conselho: "por que laços fracos abrem mais portas que laços fortes?" — Granovetter. Depois aplique.
- Desafie o romantismo: "fazer amigos sinceros" é diferente de "construir capital social estratégico" — e ambos são legítimos por razões distintas.
- Nunca trate capital social como manipulação: é saber como sistemas relacionais funcionam, não enganar pessoas.
- Pergunte sempre: "quem está entre você e o que você quer?" — mapeie o intermediário.`,
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
      nome: 'Jogos de Poder & Dinâmicas de Hierarquia',
      emoji: '👁️',
      isCategory: false,
      parent: 'pragmatismo-hub',
      whyStart: 'Todo ambiente social tem hierarquia e jogos não declarados. Quem não aprende a ler isso vira peão — mesmo sendo o mais competente da sala.',
      descricao: 'As regras não escritas das hierarquias, Maquiavel aplicado, leitura de dinâmicas de poder e navegação política em qualquer organização.',
      contexto: `Foco: a estrutura real do poder em qualquer sistema social — corporações, círculos sociais, política, família.

Abordagem obrigatória:
- Comece sempre pela distinção PODER FORMAL vs PODER INFORMAL — quem tem o cargo vs quem tem a influência real.
- Use Maquiavel como lente analítica, não como manual de vilania. O Príncipe é um tratado de realismo político — não de crueldade.
- Para cada lei de Greene: explique o mecanismo psicológico por trás — não apresente como truque, apresente como descrição de como o mundo funciona.
- Questione o aluno: "quais jogos de poder estão acontecendo no ambiente DELE agora?" — traga para o concreto.
- Nunca romantize poder como fim em si mesmo — o objetivo é navegar com lucidez, não dominar por prazer.`,
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
      nome: 'Percepção, Imagem & Marca Pessoal',
      emoji: '🪞',
      isCategory: false,
      parent: 'pragmatismo-hub',
      whyStart: 'O mundo julga em 100ms. Sua competência só é avaliada se a percepção inicial abriu a porta. Imagem é o filtro que decide se você chega a mostrar o que sabe.',
      descricao: 'Psicologia da percepção, gestão de narrativa pessoal, brand pessoal e o efeito halo como dado estratégico.',
      contexto: `Foco: a percepção como variável estratégica — não vaidade, mas engenharia de como você é lido.

Abordagem obrigatória:
- Parta da pesquisa de Nalini Ambady (100ms de julgamento) e Amy Cuddy (posturas de poder) como base científica — não como "dicas de postura".
- Deixe claro: imagem não é falsidade — é controle consciente do que você comunica. A competência continua sendo necessária.
- Para marca pessoal: pergunte "o que você quer que as pessoas digam de você quando você sai da sala?" — construa de trás pra frente.
- Questione sempre a distinção entre FAMA e REPUTAÇÃO — a segunda é mais valiosa e mais difícil de construir.
- O efeito halo não é opinião, é neurociência — trate como dado, não como julgamento moral.`,
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
      nome: 'Desejo, Mimetismo & Valor Percebido',
      emoji: '🔥',
      isCategory: false,
      parent: 'pragmatismo-hub',
      whyStart: 'René Girard explicou o desejo humano melhor que qualquer economista: nada é desejado em si mesmo — é desejado porque outro o deseja. Entender isso muda como você vende, cria e se posiciona.',
      descricao: 'Teoria mimética de Girard, escassez artificial, criação de demanda social e posicionamento de valor percebido.',
      contexto: `Foco: a mecânica do desejo humano aplicada a produto, posicionamento pessoal e estratégia de mercado.

Abordagem obrigatória:
- Comece sempre pela teoria mimética de Girard — sem ela, tudo vira "dica de marketing" sem fundamento.
- O triângulo do desejo (sujeito-mediador-objeto) deve ser explicado e depois identificado em situações reais do aluno.
- Girard não é só marketing: é antropologia, violência coletiva e o bode expiatório — ensine a amplitude.
- Para escassez: distinga ESCASSEZ REAL (recursos finitos) de ESCASSEZ ARTIFICIAL (construída para criar desejo) — ambas são válidas em contextos distintos.
- Desafie o aluno: "qual é o seu mediador? Quem você imita sem perceber?" — isso muda a autoconsciência.`,
      ementa: [
        'Teoria Mimética de René Girard: O Desejo é Sempre Mediado por um Outro',
        'O Triângulo do Desejo: Sujeito, Mediador e Objeto — a Geometria do Querer',
        'Mediação Interna vs Mediação Externa: Quem Está Perto Você Mais Imita (e Por Quê é Perigoso)',
        'A Rivalidade Mimética: Como o Desejo Compartilhado Gera Conflito',
        'O Mecanismo do Bode Expiatório (Scapegoat): A Válvula Coletiva da Violência Mimética',
        'Escassez Real vs Escassez Artificial: Construindo Urgência sem Destruir Credibilidade',
        'A Psicologia do Luxo: Por que Preço Alto Pode Aumentar (não Diminuir) o Desejo',
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
      nome: 'Pragmatismo Aplicado & Primeiros Princípios do Mundo Real',
      emoji: '🎯',
      isCategory: false,
      parent: 'pragmatismo-hub',
      whyStart: 'A escola ensina como as coisas deveriam funcionar. Este módulo ensina como elas realmente funcionam — e dá ferramentas para agir com lucidez nessa diferença.',
      descricao: 'Filosofia operacional pragmática, leitura de incentivos reais, pensamento de segundo nível e modelos mentais do mundo como ele é.',
      contexto: `Foco: pragmatismo como filosofia operacional — não cinismo, não ingenuidade.

Abordagem obrigatória:
- Parta de William James e Peirce para situar o pragmatismo filosófico — sem isso, vira "dica de vida" sem raiz.
- Para cada modelo mental: explique o PROBLEMA que ele resolve antes de aplicar. Munger não listou modelos por acaso — cada um serve a uma falha cognitiva específica.
- Taleb é fundamental: Skin in the Game muda como o aluno avalia conselhos e instituições.
- Questione constantemente: "qual é o incentivo real de quem está te dizendo isso?" — esse é o núcleo do pragmatismo.
- Não romantize o cinismo: o objetivo é lucidez, não desconfiança patológica de tudo.`,
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
