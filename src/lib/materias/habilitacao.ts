import { MateriaConfig } from '@/types';

export const habilitacaoHub: MateriaConfig = {
  slug: 'habilitacao-transito',
  nome: 'Habilitação & Trânsito',
  emoji: '🚗',
  isCategory: true,
  descricao: 'Domine a lógica por trás das leis de trânsito. Não decore placas, entenda o sistema para passar na prova da CNH e dirigir com segurança.',
  children: [
    {
      slug: 'legislacao-regras',
      nome: 'Legislação & Regras',
      emoji: '📜',
      parent: 'habilitacao-transito',
      whyStart: 'A base do sistema. Entender a lei não é decorar artigos, mas compreender por que a regra foi criada para organizar o caos urbano.',
      descricao: 'Sinalização, normas de circulação, infrações e o Código de Trânsito Brasileiro.',
      contexto: `Foco: compreender a lógica da legislação, e não apenas a decoreba.
Abordagem obrigatória:
- Sempre explique O PORQUÊ da regra existir (ex: por que a preferência na rotatória é de quem está nela? É sobre fluidez e evitar travamentos).
- Traga analogias do dia a dia para explicar normas de circulação (ex: vias de trânsito funcionando como encanamentos e válvulas).
- Mostre a diferença entre infrações pela gravidade da consequência gerada.`,
      ementa: [
        'A Lógica do Sistema Nacional de Trânsito',
        'Vias Urbanas e Rurais: Hierarquia e Velocidades',
        'Normas de Circulação e Conduta (A Regra do Jogo)',
        'Preferência vs Prioridade: Quem passa primeiro?',
        'Sinalização Vertical e Horizontal (Lendo as ruas)',
        'Classificação das Infrações (Leve, Média, Grave, Gravíssima)',
        'Penalidades e Medidas Administrativas',
        'Crimes de Trânsito (Quando a multa vira cadeia)',
        'Documentação do Veículo e do Condutor (CNH e CRLV)',
        'O Processo de Habilitação (O caminho até a CNH)'
      ]
    },
    {
      slug: 'direcao-defensiva',
      nome: 'Direção Defensiva',
      emoji: '🛡️',
      parent: 'habilitacao-transito',
      whyStart: 'Saber a lei não impede o acidente se você não souber prever o erro dos outros. A direção defensiva é a antecipação.',
      descricao: 'Como antecipar riscos, reagir a adversidades e evitar acidentes.',
      contexto: `Foco: antecipação, física básica do movimento e comportamento humano ao volante.
Abordagem obrigatória:
- Explique a física da direção (ex: inércia em frenagens, força centrífuga em curvas) de forma simples.
- Ensine a "ler" o ambiente (como prever que um pedestre vai atravessar de forma repentina).
- Dê ênfase ao tempo de reação humano vs o tempo de frenagem mecânica.`,
      ementa: [
        'Os Fundamentos da Direção Defensiva (CHAA)',
        'Física no Trânsito: Aderência, Aquaplanagem e Forças',
        'Tempo de Reação, Distância de Seguimento e Frenagem',
        'Condições Adversas (Luz, Tempo, Via, Trânsito, Veículo, Condutor)',
        'O Ponto Cego e a Visão Periférica',
        'Como Evitar Colisões (Traseira, Frontal, Cruzamentos)',
        'Condução em Situações de Emergência',
        'O Fator Humano: Cansaço, Álcool e Distrações',
        'Comportamento Preventivo com Motociclistas e Ciclistas',
        'Ergonomia e Postura: O Controle da Máquina'
      ]
    },
    {
      slug: 'primeiros-socorros-cidadania',
      nome: 'Socorros & Cidadania',
      emoji: '🚑',
      parent: 'habilitacao-transito',
      whyStart: 'Quando o sistema falha, vidas dependem da sua reação inicial. E a cidadania garante que o trânsito seja um espaço habitável.',
      descricao: 'O que fazer (e não fazer) em acidentes e a ética coletiva no trânsito.',
      contexto: `Foco: preservação da vida, ação sob pressão e respeito ao coletivo.
Abordagem obrigatória:
- Em socorros, destaque veementemente o que NÃO FAZER (ex: mover a vítima, remover capacete) e explique os riscos medulares.
- Explique a ordem de prioridades lógica: sinalizar para evitar novo acidente, pedir ajuda, avaliar vítimas.
- Em cidadania, faça a ponte entre o comportamento individual egoísta e o colapso do sistema viário.`,
      ementa: [
        'A Ordem de Segurança (Sinalização e Acionamento de Resgate)',
        'Avaliação Inicial da Vítima (O que olhar primeiro)',
        'O Que NUNCA Fazer em um Acidente',
        'Lidando com Hemorragias e Fraturas Básicas',
        'Reanimação Cardiopulmonar Básica (Visão Geral Prática)',
        'O Cinto de Segurança e a Física do Impacto Múltiplo',
        'Meio Ambiente e Trânsito: Poluição Sonora e do Ar',
        'O Indivíduo vs O Coletivo: A Ética de Trânsito',
        'Acessibilidade e Respeito a Pedestres e Vulneráveis'
      ]
    },
    {
      slug: 'mecanica-basica',
      nome: 'Mecânica Básica',
      emoji: '⚙️',
      parent: 'habilitacao-transito',
      whyStart: 'Você está operando uma máquina pesada e letal. Conhecer o básico evita panes perigosas em vias rápidas e prejuízos enormes.',
      descricao: 'Sistemas essenciais do veículo, manutenção preventiva e leitura do painel de instrumentos.',
      contexto: `Foco: entendimento dos sistemas do carro de forma interligada, sem decoreba chata.
Abordagem obrigatória:
- Use analogias anatômicas (ex: motor = coração, óleo = sangue, bateria = sistema nervoso).
- Foco absoluto na usabilidade das luzes do painel (ex: luzes vermelhas indicam perigo imediato, amarelas são aviso).
- Destaque a matemática financeira da manutenção preventiva vs manutenção corretiva.`,
      ementa: [
        'O Sistema de Alimentação e Combustão (O Motor)',
        'O Sistema de Lubrificação e Arrefecimento (Não deixe ferver)',
        'O Sistema Elétrico e a Bateria (O Cérebro Eletrônico)',
        'O Sistema de Transmissão e Embreagem (A Força para as Rodas)',
        'O Sistema de Freios (A Segurança Principal)',
        'Suspensão e Pneus (O Contato com o Chão)',
        'Lendo o Painel de Instrumentos (As Cores das Luzes)',
        'Inspeção Visual e Manutenção Preventiva Básica',
        'A Troca do Pneu Furado: Passo a Passo Seguro e Lógico'
      ]
    }
  ]
};
