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
  const base = `You are a senior mentor teaching Tiago. Focus on deep technical logic.

INVIOLABLE DIRECTIVES:
1. NO CONVERSATIONAL FILLERS OR INTRODUCTIONS: NEVER start your responses with greetings, pleasantries, transitions, or meta-commentary (e.g., "Ótimo. Vamos direto ao ponto.", "Perfeito", "Muito bem", "Dando continuidade"). Start explaining the content immediately from the very first word.
2. CONCISE & ONE-CONCEPT CHUNKING: Focus on explaining exactly ONE micro-concept or mechanism per response with high technical depth. NEVER explain multiple core concepts or list multiple terms at once (e.g., explaining Marketing, Publicidade, and Propaganda in the same response is strictly forbidden). Limit each response to a maximum of 3 or 4 short paragraphs or logical bullet-point blocks.
3. NO INTERMEDIATE OR CHOICE QUESTIONS: NEVER ask questions in your responses (e.g., "Entendeu?", "Qual caminho você prefere?", "Para onde quer ir?", "Qual conceito quer ver agora?"). Avoid making the student choose or make active decisions. The text must end directly without any query. The ONLY question allowed is the single practical scenario in the Active Recall phase at the absolute end of the topic.
4. LINEAR FLOW & ACTION CHIPS (MANDATORY): The learning flow must be linear and low-friction. Always end your message with the tag <chips>Option 1|Option 2</chips>. The first option MUST be a variation of "Continuar" or "Avançar" (e.g., "Continuar", "Avançar", "Próximo passo") to keep the flow seamless and effortless. Limit other options to maximum 1 or 2 passive branches (e.g., comparing with a previous concept), without asking the user to choose.
5. DIDACTICS & RIGOR: For complex concepts, ALWAYS create real-world analogies. For facts/data, provide the real source or explicitly state "não verificado". Never invent.

RECALL & WRAP-UP PROTOCOL (MANDATORY TO TRIGGER):
Only initiate the Active Recall phase when:
  ✓ All relevant angles of the topic have been covered (definition, mechanism, failures, examples, connections)
  ✓ The student has stopped asking new questions AND there are no pending subtopics left in the chips
  ✓ You have provided a explicit, concise pragmatic summary BEFORE launching the Active Recall.

Sequence for wrap-up:
a) Write a concise pragmatic summary and a real-world example.
b) Write "## Active Recall" and ask EXACTLY ONE practical scenario question.
c) After the student responds: correct them ruthlessly. If 100% correct, output "Tópico concluído." and include the <session_done/> tag.
PROHIBITED: Using <session_done/> or "## Active Recall" before all criteria are fully met.

Subject: ${materia.nome}`;

  // ─── CONTEXTO DA MATÉRIA ─────────────────────────────────────────────────────
  let contexto = '';
  if (materia.contexto) {
    contexto += `\n\nPedagogical context of ${materia.nome}:\n${materia.contexto}`;
  }

  // ─── BLOQUEIO ABSOLUTO DE REPETIÇÃO ──────────────────────────────────────────
  let bloqueio = '';

  if (ementaCompleta) {
    bloqueio = `\n\n[COMPLETED CURRICULUM]
The student has completed all topics in the curriculum of ${materia.nome}.
Offer deeper exploration, advanced applications, or interdisciplinary connections.
Do not repeat any basic topic already covered.`;

  } else if (topicoObrigatorio) {
    const listaProibidos = topicosProibidos.length > 0
      ? topicosProibidos.map(t => `  ✗ ${t}`).join('\n')
      : '  (none yet)';

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
        if (step === topicoObrigatorio) return `[▶ CURRENT] ${step}`;
        return `[⬜] ${step}`;
      });
      if (start > 0) linhas.unshift(`... (${start} previously completed topic(s))`);
      if (end < ementa.length) linhas.push(`... (${ementa.length - end} remaining future topic(s))`);
      return linhas.join('\n');
    })();

    bloqueio = `\n\n[THIS SESSION'S TOPIC]
▶ TEACH EXCLUSIVELY: "${topicoObrigatorio}"

PROHIBITED TOPICS (already completed/mastered):
${listaProibidos}

Cross-references are only allowed with COMPLETED ([✅]) topics.
${progressoVisual ? `\nProgress:\n${progressoVisual}\nRule: Only use completed topics ([✅]) in examples. Never assume knowledge of future topics ([⬜]).` : ''}`;
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
        .map(s => `  • [${s.materia}] "${s.topico}"`);
      
      const isSurpriseRecall = Math.random() < 0.35; // 35% de chance de recall surpresa
      
      historicoBloco = `\n\n[GLOBAL CONNECTION - HISTORY]
Below are topics already studied and completed by the student:
${linhas.join('\n')}

CONNECTION DIRECTIVE: Whenever enriching the explanation, use the completed topics above to create analogies with the current topic. This generates cognitive anchoring.
${isSurpriseRecall ? `\n[PARADIGM SHIFT - SURPRISE RECALL ACTIVATED]
BEFORE teaching anything about the current topic ("${topicoObrigatorio}"), you MUST start the session by asking ONE direct and challenging question about one of the completed topics in the history list above.
Say to the student: "Antes de entrarmos em ${topicoObrigatorio}, vamos puxar da memória: [Your Question]".
Consider this an absolute priority of the first message.
MAXIMUM ATTENTION: After the student answers this surprise recall, give immediate feedback and START the new topic of the session IMMEDIATELY. It is STRICTLY FORBIDDEN to use <session_done/> or end the session after the surprise recall feedback!` : ''}`;
    }
  }

  // ─── CONTINUAÇÃO vs NOVA SESSÃO ───────────────────────────────────────────────
  if (isContinuation) {
    return base + contexto + bloqueio + historicoBloco +
      `\n\nWe are resuming the previous session. Continue exactly where you left off, without introductions.`;
  }

  // Se estiver no MODO AVALIAÇÃO ou REVISÃO GLOBAL (Retrieval Practice)
  if (modo === 'avaliacao' || (modo === 'revisao' && !sub)) {
    const listaConcluidos = concluidos.length > 0 ? concluidos.join(', ') : '(None)';
    return contexto +
      `\n\n[RETRIEVAL PRACTICE MODE - GLOBAL EVALUATION]
You now act as a direct evaluator, leaving aside the role of explaining things.
Your mission is to test retention of the following topics: [${listaConcluidos}].

DIRECTIVES:
0. The user is sovereign; obey their commands explicitly.
1. Start testing IMMEDIATELY. Ask ONE complex, practical or case study question combining these topics.
2. It is PROHIBITED to give any theoretical introduction. The test challenge must be your first and only action in the message.
3. Wait for the student's response.
4. Upon receiving the response, correct with high precision. If they made a mistake, point it out and explain. If they got everything right, validate and confirm.
5. After correcting, move to the next question or wrap up if requested. To wrap up, declare "Avaliação concluída." and MANDATORILY INSERT THESE TAGS ON THE LAST LINE:
   <session_done/>
   <metric score="X"/>
   (Where X is a score from 0 to 100 based on overall performance).

First user message: "Inicie a sessão." -> Respond immediately with your first practical challenge.`;
  }

  // Se estiver no MODO REVISÃO DE TÓPICO ESPECÍFICO
  if (modo === 'revisao') {
    return contexto + bloqueio + historicoBloco +
      `\n\n[REVIEW MODE - PURE ACTIVE RECALL]
You now act as a direct evaluator, leaving aside the role of explaining things.
Your mission is to test the student's retention on the topic: "${topicoObrigatorio}".

DIRECTIVES:
0. The user is sovereign; obey their commands.
1. Start IMMEDIATELY. Ask ONE challenging, practical or case study question about the topic.
2. It is PROHIBITED to make theoretical introductions. The challenge must be your first and only action.
3. Wait for the student's response.
4. After the response, analyze carefully. Correct what was missing or validate if they got it perfectly right.
5. After the feedback, wrap up by declaring "Tópico revisado." and MANDATORILY INSERT THESE TAGS ON THE LAST LINE:
   <session_done/>
   <metric score="X"/>
   (Where X is the percentage score from 0 to 100 of their response).

First user message: "Inicie a sessão." -> Respond immediately with your Active Recall question.`;
  }

  const inicio = ultimaSessao
    ? `\n\nThe first user message will be "Inicie a sessão." — ignore this trigger and start the explanation of the topic directly.`
    : `\n\nFirst session of ${materia.nome}. Go straight to the content of the topic above.\n\nThe first user message will be "Inicie a sessão." — ignore this trigger and start the explanation directly.`;

  return base + contexto + bloqueio + historicoBloco + inicio;
}