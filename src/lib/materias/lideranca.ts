import { MateriaConfig } from '@/types';

export const liderancaHub: MateriaConfig = {
  slug: 'lideranca-hub',
  nome: 'Liderança & Construção de Times',
  emoji: '👑',
  isCategory: true,
  descricao: 'A parte dura de liderar. Recrutar quem é melhor que você, gerenciar sem microgerenciar e criar cultura sem slides motivacionais.',
  children: [
    {
      slug: 'recrutamento-talentos',
      nome: 'Recrutamento & Gestão de Talentos',
      emoji: '🎯',
      isCategory: false,
      parent: 'lideranca-hub',
      whyStart: 'Uma empresa é tão boa quanto as pessoas que consegue atrair e manter. Recrutar mal é o erro mais caro que existe.',
      descricao: 'Como identificar, atrair e reter pessoas excepcionais.',
      contexto: `Foco: recrutamento como vantagem competitiva — sem papo de RH corporativo.

Abordagem obrigatória:
- Baseie-se em práticas de empresas de alta performance (Netflix, Stripe, SpaceX).
- Sem teoria de gestão de pessoas genérica. Foco em decisões difíceis e trade-offs reais.`,
      ementa: [
        'O Custo Real de Uma Contratação Errada (Impacto Exponencial)',
        'A-Players vs B-Players: A Diferença Não É Linear, É Exponencial',
        'O Princípio de Steve Jobs: A-Players Contratam A-Players, B-Players Contratam C-Players',
        'Entrevistas Estruturadas vs Entrevistas de "Feeling" (O Que a Ciência Diz)',
        'Work Samples e Case Studies: Testar Performance Real, Não Retórica',
        'Reference Checks Que Funcionam: As Perguntas Que Ninguém Faz',
        'Hire Slow, Fire Fast: O Custo de Hesitar nas Duas Pontas',
        'O Conceito de "Bar Raiser" (Amazon): Nunca Baixar o Padrão',
        'Culture Fit vs Culture Add: O Perigo da Homogeneidade',
        'Retenção de Talentos: Autonomia, Maestria, Propósito (Daniel Pink)',
        'Compensation Philosophy: Pagar Acima do Mercado vs Equity',
        'A Conversa de Demissão: Como Fazer Com Respeito e Dignidade',
        'Gestão de Performance Contínua vs Avaliação Anual Inútil',
        'O Pipeline de Talentos: Recrutar Antes de Precisar'
      ]
    },
    {
      slug: 'lideranca-execucao',
      nome: 'Liderança & Execução',
      emoji: '⚡',
      isCategory: false,
      parent: 'lideranca-hub',
      whyStart: 'Visão sem execução é alucinação. Liderar é fazer o time entregar resultados consistentes, não dar discursos inspiradores.',
      descricao: 'Como liderar na prática: delegação, decisões difíceis e accountability.',
      contexto: `Foco: liderança operacional — o dia a dia de quem gerencia pessoas e precisa entregar resultados.

Abordagem obrigatória:
- Cada conceito deve ter um cenário real de aplicação ("você tem um dev que entrega atrasado, o que faz?").
- Sem teoria motivacional vazia. Foco em decisões, trade-offs e consequências.`,
      ementa: [
        'Delegação Efetiva: O Que Delegar, Como Delegar, Quando Não Delegar',
        'O Problema do Microgerenciamento: Sinais de Que Você Está Fazendo',
        'Accountability vs Blame: Responsabilização Sem Cultura de Medo',
        'One-on-Ones Que Funcionam: Estrutura e Frequência Ideal',
        'Feedback Radical (Kim Scott): Caring Personally + Challenging Directly',
        'A Matriz de Skill vs Will: 4 Tipos de Liderados, 4 Abordagens',
        'Liderança Situacional (Hersey-Blanchard): Adaptar o Estilo ao Contexto',
        'Tomada de Decisão em Grupo: Consenso vs Comando vs Consultivo',
        'O Conceito de "Disagree and Commit" (Bezos): Discordar e Executar',
        'Gestão de Conflitos: Confrontar a Tensão Antes Que Ela Exploda',
        'OKRs na Prática: O Que Dá Certo e O Que Dá Errado (Lições Reais)',
        'Comunicação Para Cima (Managing Up): Como Gerenciar Seu Chefe',
        'Rituais de Time: Stand-ups, Retrospectivas e Town Halls Que Não São Perda de Tempo',
        'Liderança Remota: Confiança, Assincronicidade e Cultura Distribuída',
        'Burnout do Líder: Reconhecer e Prevenir Antes de Quebrar'
      ]
    },
    {
      slug: 'cultura-organizacional',
      nome: 'Cultura & Arquitetura Organizacional',
      emoji: '🏗️',
      isCategory: false,
      parent: 'lideranca-hub',
      whyStart: 'Cultura não é o que está no mural. É o que acontece quando o CEO não está olhando. Você projeta ou ela aparece sozinha — e geralmente ruim.',
      descricao: 'Como projetar cultura organizacional de alta performance com intenção.',
      contexto: `Foco: cultura como sistema operacional da empresa, não como decoração.

Abordagem obrigatória:
- Use cases reais (Netflix Culture Deck, Valve Handbook, Spotify Model).
- Mostre os trade-offs de cada modelo cultural. Não existe cultura perfeita.`,
      ementa: [
        'O Que É Cultura Realmente: Valores Declarados vs Valores Praticados',
        'O Netflix Culture Deck: Liberdade e Responsabilidade (Com Trade-offs)',
        'Cultura de Alta Performance vs Cultura Tóxica de Alta Performance',
        'Princípios de Liderança da Amazon: Os 16 Mandamentos (E o Que Funciona)',
        'Segurança Psicológica (Amy Edmondson): O Fator #1 de Times de Alta Performance',
        'O Paradoxo da Transparência: Radical Transparency (Bridgewater) e Seus Limites',
        'Organizações Planas vs Hierárquicas: Quando Cada Uma Funciona',
        'Velocidade de Decisão vs Qualidade de Decisão: O Trade-off Central',
        'Onboarding Como Ritual de Iniciação: Os Primeiros 90 Dias',
        'Documentação vs Tradição Oral: Como Escalar Conhecimento Tácito',
        'Sinais de Decadência Cultural: Burocracia, Política e Teatro de Performance',
        'A Lei de Conway: Sua Arquitetura de Software Espelha Sua Organização',
        'Scaling Culture: O Que Muda Quando Você Vai de 10 para 100 Pessoas',
        'Ritos de Passagem Corporativos: Promoção, Demissão e Celebração',
        'Antipadrões Culturais: O Que Nunca Fazer (Com Exemplos Reais)'
      ]
    }
  ]
};
