import { MateriaConfig } from '@/types';

export const seducaoHub: MateriaConfig = {
  slug: 'seducao-hub',
  nome: 'Dinâmica Social & Sedução',
  emoji: '🥂',
  descricao: 'O hub definitivo de maestria social. Da quebra de gelo à gestão de relacionamentos, aprenda a mecânica profunda da atração humana, engenharia emocional e construção de um estilo de vida magnético.',
  isCategory: true,
  children: [
    {
      slug: 'seducao-inner-game',
      nome: 'Inner Game & Confiança',
      emoji: '🧠',
      descricao: 'A base de todo sucesso social. Construa uma autoimagem inabalável, destrua a ansiedade de aproximação e desenvolva a verdadeira independência emocional.',
      parent: 'seducao-hub',
      whyStart: 'Comece aqui ou você vai desperdiçar todas as técnicas. Sem o estado interno correto, cada abordagem vai parecer forçada e vai ser percebida como tal. Esta é a fundação — nenhum outro módulo funciona sem ela.',
      contexto: 'Foque em psicologia comportamental, estoicismo prático e reestruturação cognitiva. Ensine que a verdadeira confiança não é "saber que vai dar certo", mas "saber que ficará bem independente do resultado". Seja pragmático, não motivacional barato.',
      fases: [
        {
          nome: 'Fase 1: Fundação Mental',
          topicos: [
            'Desconstrução de Crenças Limitantes sobre Atração',
            'Ansiedade de Aproximação (AA): Entendendo a Resposta de Luta/Fuga',
            'Independência de Resultado: O Paradoxo da Atração',
            'Validação Interna vs. Externa (O Fim da Necessidade)'
          ]
        },
        {
          nome: 'Fase 2: Projeção de Realidade',
          topicos: [
            'Controle de Frame: Quem dita a realidade da interação?',
            'Presença e Grounding (Ancoragem Física)',
            'Lidando com Rejeição como Feedback Direto',
            'Abundância vs. Escassez na Prática'
          ]
        }
      ]
    },
    {
      slug: 'seducao-cold-approach',
      nome: 'Cold Approach & Abordagem',
      emoji: '🚶‍♂️',
      descricao: 'A arte de iniciar interações do zero absoluto. Domine a linguagem corporal, as quebras de gelo e as transições rápidas em qualquer ambiente.',
      parent: 'seducao-hub',
      whyStart: 'Com o estado interno calibrado, é hora de agir. Esta etapa desmonta o medo de abordar desconstruindo a mecânica da aproximação — ângulo, tonalidade, primeiros 10 segundos. Sem praticar isso, tudo fica só na teoria.',
      contexto: 'Foque em mecânica pura: ângulos de aproximação, tonalidade de voz, calibração social e transições. Ensine "O Quê" e "Como" fazer, desmistificando a abordagem a frio como uma habilidade sistêmica.',
      fases: [
        {
          nome: 'Fase 1: O Abre-Alas',
          topicos: [
            'Linguagem Corporal de Alto Status (Postura, Contato Visual)',
            'A Regra dos 3 Segundos',
            'Abridores Diretos vs. Indiretos: Quando usar cada um',
            'O Falso Limite de Tempo (False Time Constraint)'
          ]
        },
        {
          nome: 'Fase 2: O Meio-Jogo',
          topicos: [
            'Assumindo Familiaridade (Assume Rapport)',
            'Transições Naturais: Saindo do Abridor para a Conversa',
            'Calibração Social: Lendo Sinais de Interesse (IOIs)',
            'Como Pedir o Contato de Forma Fluida'
          ]
        }
      ]
    },
    {
      slug: 'seducao-emocao',
      nome: 'Engenharia Emocional',
      emoji: '🔥',
      descricao: 'A atração não é lógica, é emocional. Aprenda a gerar tensão, quebrar a previsibilidade e criar picos emocionais que ancoram interesse real.',
      parent: 'seducao-hub',
      whyStart: 'Você já sabe abrir. Agora precisa sustentar. Conversas lógicas matam o interesse — esta etapa ensina a criar variação emocional, tensão e mistério. É o que separa quem fica na zona de amizade de quem gera atração real.',
      contexto: 'Foque em dinâmicas de conversação avançadas: Push/Pull, qualificação, tensão sexual e storytelling. Ensine a evocar emoções em vez de apenas trocar informações lógicas (entrevistas).',
      fases: [
        {
          nome: 'Fase 1: Dinâmicas de Tensão',
          topicos: [
            'Fuga da Entrevista Lógica: Como Evocar Emoções',
            'A Mecânica do Push e Pull (Afastar e Puxar)',
            'Quebra de Rapport vs. Busca de Rapport',
            'Provocações e Teasing Calibrado'
          ]
        },
        {
          nome: 'Fase 2: Conexão e Atração Profunda',
          topicos: [
            'Qualificação: O Jogo de Fazer a Pessoa Investir',
            'Storytelling Magnético: Estrutura de Boas Histórias',
            'Vulnerabilidade Forte: Conectando Níveis Profundos',
            'Tensão Sexual: Escalação Verbal e Subtexto'
          ]
        }
      ]
    },
    {
      slug: 'seducao-text-game',
      nome: 'Text Game & Digital',
      emoji: '📱',
      descricao: 'O jogo mudou para as telas. Domine a escalada via WhatsApp/Instagram, como manter o interesse alto e fechar encontros de forma rápida e eficiente.',
      parent: 'seducao-hub',
      whyStart: 'Depois da abordagem, o jogo vai para o celular. Aqui você aprende a não destruir pelo texto o que construiu pessoalmente — menos é mais, o objetivo é único: marcar o encontro.',
      contexto: 'Foque na utilidade do texto: o objetivo do texto é marcar o encontro, não virar amigo por chat. Ensine economia de palavras, resposta a "shit tests" textuais, uso estratégico de mídias e geração de FOMO.',
      fases: [
        {
          nome: 'Fase 1: Fundamentos Digitais',
          topicos: [
            'A Primeira Mensagem (O Callback Humorístico)',
            'A Regra do Ouro do Texto: Objetivo é o Encontro',
            'Proporção de Investimento (Quem escreve mais?)',
            'Tempo de Resposta Estratégico (Pacing)'
          ]
        },
        {
          nome: 'Fase 2: Escalada e Fechamento',
          topicos: [
            'Shit Tests via Mensagem: Como Desarmar e Inverter',
            'Uso de Áudios e Fotos para Gerar Proximidade',
            'Reengajamento: Ressuscitando Contatos Frios (Ping Texts)',
            'Fechamento Sólido: Extraindo o Sim para o Date'
          ]
        }
      ]
    },
    {
      slug: 'seducao-lifestyle',
      nome: 'Lifestyle & Engenharia Social',
      emoji: '🌍',
      descricao: 'Pessoas atraentes têm vidas atraentes. Aprenda a estruturar seus círculos sociais, redes sociais e estilo de vida para que as interações ocorram no automático.',
      parent: 'seducao-hub',
      whyStart: 'Até aqui você aprendeu a jogar o jogo. Agora você muda o tabuleiro. Esta etapa é sobre construir uma vida que gera atração passivamente — sem precisar de técnica toda vez que encontra alguém interessante.',
      contexto: 'Foque em valor social, pré-seleção, e criação de eventos/comunidades onde o aluno seja o centro (Hub). Aborde também a vitrine digital (Instagram).',
      fases: [
        {
          nome: 'Fase 1: O Círculo de Valor',
          topicos: [
            'O Paradigma do Organizador (Seja o Conector)',
            'Valor Social Pré-Comunicado (Pré-Seleção)',
            'Efeito Halo: Grooming, Estilo e Primeira Impressão',
            'Como Entrar em Círculos de Alto Valor'
          ]
        },
        {
          nome: 'Fase 2: Presença e Posicionamento',
          topicos: [
            'Vitrine Digital: Otimização Rápida de Instagram',
            'Wingman Dynamics: Como Agir em Dupla na Noite',
            'Hospedando Eventos: O Jogo de Morar Sozinho',
            'Transição de Status: De Conhecido a Convidado VIP'
          ]
        }
      ]
    },
    {
      slug: 'seducao-relacionamentos',
      nome: 'Gestão de Relacionamentos',
      emoji: '👑',
      descricao: 'Atrair é a primeira parte. Aprenda a conduzir o encontro, fazer a manutenção do interesse e estabelecer limites de liderança em relacionamentos longos.',
      parent: 'seducao-hub',
      whyStart: 'O módulo final. Tudo que você aprendeu antes era para chegar aqui. Relacionamentos de longo prazo exigem uma camada a mais: polaridade, liderança e manutenção da tensão sem perder a conexão.',
      contexto: 'Foque na liderança masculina pragmática, dinâmica de encontros (locais, transições), e definição de limites. Aborde o conceito de polaridade sexual e como evitar a zona de conforto conjugal.',
      fases: [
        {
          nome: 'Fase 1: A Condução do Date',
          topicos: [
            'A Arquitetura do Encontro Perfeito (Múltiplos Venues)',
            'Liderança Decisiva: "Nós Vamos Ali" vs. "O Que Você Quer?"',
            'Escalada Física (Kino): Fluidez e Consentimento',
            'A Transição para a Logística Final (A Casa)'
          ]
        },
        {
          nome: 'Fase 2: Polaridade e Manutenção',
          topicos: [
            'Estabelecimento de Limites (Boundaries) no Início',
            'Polaridade Sexual: O Papel da Energia Masculina',
            'Lidando com Testes de Congruência em Relacionamentos',
            'Prevenção do Efeito Amigo: Como Manter a Tensão Ativa'
          ]
        }
      ]
    }
  ]
};
