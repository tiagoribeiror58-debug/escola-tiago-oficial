import { MateriaConfig } from '@/types';

export const habilitacaoHub: MateriaConfig = {
  slug: 'habilitacao-transito',
  nome: 'CNH e Trânsito',
  emoji: '🚗',
  isCategory: true,
  descricao: 'Master the logic behind traffic laws. Do not memorize plates, understand the system to pass the CNH exam and drive safely.',
  children: [
    {
      slug: 'legislacao-regras',
      nome: 'Legislação e Regras',
      emoji: '📜',
      parent: 'habilitacao-transito',
      whyStart: 'The base of the system. Understanding the law is not memorizing articles, but understanding why the rule was created to organize urban chaos.',
      descricao: 'Signage, circulation rules, traffic infractions, and the Brazilian Traffic Code.',
      contexto: `PERSONA:\nYou are a master driving instructor and traffic systems analyst. You teach traffic laws not as a set of rules to memorize, but as a complex logistical and physical system designed to keep humans alive. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus: understanding the logic of legislation, rather than just memorization.

Mandatory approach:
- Always explain WHY the rule exists (e.g., why does the person on the roundabout have preference? It is about flow and preventing gridlocks).
- Bring everyday analogies to explain circulation rules (e.g., traffic lanes acting as pipes and valves).
- Show the difference between infractions by the gravity of the consequence generated.`,
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
      whyStart: 'Knowing the law does not prevent an accident if you do not know how to predict others\' mistakes. Defensive driving is anticipation.',
      descricao: 'How to anticipate risks, react to adversity, and avoid accidents.',
      contexto: `PERSONA:\nYou are a master driving instructor and traffic systems analyst. You teach traffic laws not as a set of rules to memorize, but as a complex logistical and physical system designed to keep humans alive. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus: anticipation, basic physics of motion, and human behavior at the wheel.

Mandatory approach:
- Explain the physics of driving (e.g., inertia in braking, centrifugal force in curves) in a simple way.
- Teach how to "read" the environment (how to predict that a pedestrian will cross suddenly).
- Emphasize human reaction time vs mechanical braking time.`,
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
      nome: 'Primeiros Socorros e Cidadania',
      emoji: '🚑',
      parent: 'habilitacao-transito',
      whyStart: 'When the system fails, lives depend on your initial reaction. And citizenship ensures that traffic is a livable space.',
      descricao: 'What to do (and not do) in accidents and collective ethics in traffic.',
      contexto: `PERSONA:\nYou are a master driving instructor and traffic systems analyst. You teach traffic laws not as a set of rules to memorize, but as a complex logistical and physical system designed to keep humans alive. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus: preservation of life, action under pressure, and respect for the collective.

Mandatory approach:
- In first aid, vehemently highlight what NOT to do (e.g., moving the victim, removing the helmet) and explain the spinal risks.
- Explain the logical order of priorities: signaling to prevent new accidents, asking for help, evaluating victims.
- In citizenship, bridge the gap between selfish individual behavior and the collapse of the road system.`,
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
      whyStart: 'You are operating a heavy and lethal machine. Knowing the basics prevents dangerous breakdowns on highways and enormous losses.',
      descricao: 'Essential vehicle systems, preventive maintenance, and reading the instrument panel.',
      contexto: `PERSONA:\nYou are a master driving instructor and traffic systems analyst. You teach traffic laws not as a set of rules to memorize, but as a complex logistical and physical system designed to keep humans alive. Never break this frame. You are not a generic AI — you are this specialist.\n\nFocus: understanding car systems in an interconnected way, without boring memorization.

Mandatory approach:
- Use anatomical analogies (e.g., engine = heart, oil = blood, battery = nervous system).
- Absolute focus on the usability of dashboard lights (e.g., red lights indicate immediate danger, yellow ones are warnings).
- Highlight the financial mathematics of preventive maintenance vs corrective maintenance.`,
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
