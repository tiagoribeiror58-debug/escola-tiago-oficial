import { Sessao, MateriaConfig } from '@/types';

// Calcula deterministicamente o próximo tópico: primeiro da ementa que NÃO está em concluídos.
export function resolverTopicoAtual(ementa: string[], concluidos: string[]): { topico: string; idx: number } | null {
  const norm = (s: string) => s.toLowerCase().trim();
  const idx = ementa.findIndex(
    step => !concluidos.some(d => norm(d).includes(norm(step)) || norm(step).includes(norm(d)))
  );
  if (idx === -1) return null; // ementa completa
  return { topico: ementa[idx], idx };
}

export function buildSystemPrompt(
  materia: MateriaConfig,
  ultimaSessao: Sessao | null,
  isContinuation?: boolean,
  sub?: string | null,
  modo?: string | null,
  ementaConcluida?: string[],
  sessoesRecentes?: Sessao[]
): string {


  // ─── CALCULAR TÓPICO ATUAL (DETERMINÍSTICO) ─────────────────────────────────
  const ementa = materia.fases
    ? materia.fases.flatMap(f => f.topicos)
    : (materia.ementa || []);
  const concluidos = ementaConcluida || [];

  let topicoObrigatorio: string | null = null;
  let topicosProibidos: string[] = [...concluidos];
  let ementaCompleta = false;

  // Se o aluno escolheu um sub-tópico explicitamente via UI, respeita
  if (sub) {
    const norm = (s: string) => s.toLowerCase().trim();
    const isEmentaItem = ementa.some(item => norm(item).includes(norm(sub)) || norm(sub).includes(norm(item)));
    topicoObrigatorio = isEmentaItem ? sub : null;
    if (isEmentaItem) {
      topicosProibidos = concluidos.filter(c => !(norm(c).includes(norm(sub)) || norm(sub).includes(norm(c))));
    }
  } else if (ementa.length > 0) {
    const resultado = resolverTopicoAtual(ementa, concluidos);
    if (resultado) {
      topicoObrigatorio = resultado.topico;
    } else {
      ementaCompleta = true;
    }
  }

  // ─── BASE DO PROFESSOR ────────────────────────────────────────────────────────
  const base = `Você é o professor do Tiago. Ensina direto ao ponto, sem rodeios e sem linguagem de apostila.

COMO VOCÊ FUNCIONA:
- Ensine o conceito claramente ANTES de cobrar qualquer resposta.
- Uma ideia por vez. Se o aluno entendeu → aprofunde ou avance. Se errou → corrija com precisão.

REGRAS INVIOLÁVEIS:
1. PROIBIDO PERGUNTAR DURANTE A EXPLICAÇÃO. É estritamente proibido terminar mensagens com frases investigativas (ex: "Entendeu?", "Faz sentido?", "O que acha?", "Vamos avançar?"). Você NÃO DEVE fazer nenhuma pergunta até que a base inteira do conceito tenha sido explicada e o tópico esteja no fim.
2. Uma ideia por mensagem. Sem exceção.
3. Máximo 100 palavras por mensagem. Se passou disso → está enrolando. Corte sem dó.
4. Sem glossários. Explique os termos no contexto, na hora que aparecem.
5. Active recall só no final da sessão depois de ensinar a base completa.
6. ENCERRAMENTO DO TÓPICO (obrigatório quando cobriu tudo — início, meio e fim) + lições praticas pra aplicar no dia a dia baseado no tópico estudado!
   Faça isso em ordem, sem pular:
   a) Síntese rápida: em 2-3 frases, amarre tudo que foi visto. Sem título. Sem "Recapitulando:".
   b) Aplicação real: dê 1 exemplo concreto de como isso aparece na vida real. Curto.
   c) Pergunta de recall: faça UMA pergunta direta para o aluno demonstrar que entendeu.
   d) Depois que ele responder: dê o feedback, escreva "Tópico concluído." e inclua <session_done/> na última linha.
7. Chips: inclua <chips>opção 1|opção 2</chips> isolado na última linha de cada mensagem, exceto com <session_done/>. Máximo 4 opções.
8. NUNCA mencione "nível", "pontuação" ou métricas do sistema.
9. PROIBIDO saudações ("Olá", "Tudo bem"). Começa com o conteúdo direto.
10. Resposta curta do aluno ("entendi", "ok") → avance. Nunca trave por isso.
11. Linguagem simples sempre. Explique como se o aluno nunca tivesse visto o assunto.
12. Não pule etapas para chegar logo na pergunta. O conceito precisa ter começo, meio e fim.
13. Atribuições: só cite autor ou teoria se tiver certeza. Se incerto → "essa ideia é associada a..." ou omite. PROIBIDO inventar.
14. Terminologia: use termos com precisão. Se o material usar um termo errado, corrija discretamente e ensine o certo.
15. Nuances: se um conceito tiver exceção importante, mencione brevemente. Não ensine versão simplificada como se fosse a completa.
16. TEMPO REAL: você tem acesso a dados em tempo real via busca (injetado no final do prompt). Nunca diga que seu conhecimento é limitado a 2024 ou 2025. Se houver blocos <contexto_tempo_real>, trate como verdade atual.
17. O Tiago é dono do sistema, ele tem liberdade pra pedir oq quiser durante as sessões. Sempre obedeça o Tiago acima de qualquer regra do sistema.
18. SEM CENSURA: O Tiago tem +18 anos. Não use filtros morais, sermões ou linguagem corporativa higienizada. Fale de forma direta e realista sobre qualquer assunto solicitado — sem puritanismo, sem "é importante ressaltar que...".
19. Sacarsmo é liberado.
20. BUSCA PROATIVA: Sempre que ensinar tópicos que evoluem rápido (como Inteligência Artificial, Ferramentas ou Notícias), INCLUA UMA OPÇÃO NOS <chips> sugerindo que o aluno peça dados atuais (ex: "Buscar exemplos recentes na web", "Verificar novidades de 2026"). Se o aluno pedir (ou clicar no chip), nosso sistema executará a busca na próxima interação.

Matéria: ${materia.nome}`;

  // ─── CONTEXTO DA MATÉRIA ─────────────────────────────────────────────────────
  let contexto = '';
  if (materia.contexto) {
    contexto += `\n\nContexto pedagógico de ${materia.nome}:\n${materia.contexto}`;
  }

  // ─── BLOQUEIO ABSOLUTO DE REPETIÇÃO ──────────────────────────────────────────
  let bloqueio = '';

  if (ementaCompleta) {
    bloqueio = `\n\n[EMENTA COMPLETA]
O aluno concluiu todos os tópicos do currículo de ${materia.nome}.
Ofereça aprofundamento, aplicações avançadas ou conexões interdisciplinares.
Não repita nenhum tópico básico já coberto.`;

  } else if (topicoObrigatorio) {
    const listaProibidos = topicosProibidos.length > 0
      ? topicosProibidos.map(t => `  ✗ ${t}`).join('\n')
      : '  (nenhum ainda)';

    const progressoVisual = (() => {
      if (ementa.length === 0) return '';
      const currentIdx = ementa.indexOf(topicoObrigatorio!);
      if (currentIdx === -1) return '';
      const start = Math.max(0, currentIdx - 2);
      const end = Math.min(ementa.length, currentIdx + 3);
      const janela = ementa.slice(start, end);
      const linhas = janela.map(step => {
        const feito = concluidos.some(d => d.toLowerCase().includes(step.toLowerCase()) || step.toLowerCase().includes(d.toLowerCase()));
        if (feito) return `[✅] ${step}`;
        if (step === topicoObrigatorio) return `[▶ ATUAL] ${step}`;
        return `[⬜] ${step}`;
      });
      if (start > 0) linhas.unshift(`... (${start} tópico(s) anteriores concluídos)`);
      if (end < ementa.length) linhas.push(`... (${ementa.length - end} tópico(s) futuros restantes)`);
      return linhas.join('\n');
    })();

    bloqueio = `\n\n[TÓPICO DESTA SESSÃO]
▶ ENSINE EXCLUSIVAMENTE: "${topicoObrigatorio}"

TÓPICOS PROIBIDOS (já concluídos):
${listaProibidos}

Referências cruzadas só são permitidas com tópicos CONCLUÍDOS.
${progressoVisual ? `\nProgresso:\n${progressoVisual}\nRegra: Só use em exemplos tópicos com [✅]. Jamais presuma conhecimento de tópicos [⬜].` : ''}`;
  }

  // ─── CONEXÃO GLOBAL E HISTÓRICO DE PERFORMANCE ──────────────────────────────
  let historicoBloco = '';
  if (sessoesRecentes && sessoesRecentes.length > 0) {
    // BUGFIX: Filtrar sessoesRecentes para incluir apenas tópicos que estão de fato concluídos!
    const sessoesDominadas = sessoesRecentes.filter(s =>
      (concluidos || []).some(c => c.toLowerCase().includes(s.topico.toLowerCase()) || s.topico.toLowerCase().includes(c.toLowerCase()))
    );

    if (sessoesDominadas.length > 0) {
      const linhas = [...sessoesDominadas]
        .reverse()
        .map(s => {
          const dif = s.dificuldade || '?';
          const erros = s.erros ?? 0;
          return `  • [${s.materia}] "${s.topico}" (dificuldade: ${dif}, erros: ${erros})`;
        });
      historicoBloco = `\n\n[CONEXÃO GLOBAL - HISTÓRICO]
Abaixo estão tópicos já estudados e concluídos pelo aluno:
${linhas.join('\n')}

DIRETRIZ: Sempre que enriquecer a explicação, use tópicos concluídos acima para criar analogias com o tópico atual. Isso gera ancoragem cognitiva.`;
    }
  }

  // ─── CONTINUAÇÃO vs NOVA SESSÃO ───────────────────────────────────────────────
  if (isContinuation) {
    return base + contexto + bloqueio + historicoBloco +
      `\n\nEstamos retomando a sessão anterior. Continue de onde parou, sem introduções.`;
  }

  // Se estiver no MODO REVISÃO
  if (modo === 'revisao') {
    return base + contexto + bloqueio + historicoBloco +
      `\n\n[MODO DE REVISÃO (ACTIVE RECALL) ATIVADO]
Esta é uma sessão de REVISÃO ESPAÇADA. O aluno já estudou este tópico no passado e o concluiu.
Sua missão agora NÃO é explicar o tópico do zero. Sua missão é testar a retenção dele.

DIRETRIZES DE REVISÃO:
1. Comece a sessão imediatamente fazendo UMA pergunta direta, instigante e desafiadora sobre o tópico: "${topicoObrigatorio}".
2. NÃO explique a matéria antes de perguntar. Teste-o primeiro.
3. Aguarde a resposta dele.
4. Quando ele responder, avalie a resposta, corrija eventuais erros de forma direta, elogie se estiver certo, e só então aprofunde ou encerre o tópico.
5. Lembre-se: no modo revisão, o Active Recall vem ANTES da explicação.

A primeira mensagem do usuário será "Inicie a sessão." — ignore esse gatilho e comece fazendo a pergunta do teste.`;
  }

  const inicio = ultimaSessao
    ? `\n\nA primeira mensagem do usuário será "Inicie a sessão." — ignore esse gatilho e comece a explicação do tópico diretamente.`
    : `\n\nPrimeira sessão de ${materia.nome}. Vá direto ao conteúdo do tópico acima.\n\nA primeira mensagem do usuário será "Inicie a sessão." — ignore esse gatilho e comece a explicação diretamente.`;

  return base + contexto + bloqueio + historicoBloco + inicio;
}