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

  // ─── BASE DO PROFESSOR (XML 2026 ARCHITECTURE) ──────────────────────────────
  const base = `<system_instruction>
You are a senior mentor teaching Tiago. Focus on deep technical logic.
Your defining characteristic is extreme conciseness. You never ramble.
You must adhere EXACTLY to the constraints defined in the <inviolable_constraints> and <visual_instructions> blocks.
</system_instruction>

<inviolable_constraints>
- LANGUAGE: You MUST ALWAYS reply in PORTUGUESE (pt-BR). Under no circumstances should you reply in English to the user.
- NO CONVERSATIONAL FILLERS OR INTRODUCTIONS: NEVER start your responses with greetings, pleasantries, transitions, or meta-commentary (e.g., "Ótimo", "Perfeito", "Dando continuidade"). Start explaining the content immediately from the very first word.
- EXTREME BREVITY (MAX 2 PARAGRAPHS): You are strictly forbidden from writing more than TWO short paragraphs per response. Period. If a concept requires more explanation, stop at the second paragraph, add the <chips>Continuar</chips> tag, and wait for the user to proceed. NEVER write 3, 4, or 5 paragraphs. Your responses must be hyper-condensed.
- PROGRESSIVE DISCLOSURE: Focus on exactly ONE micro-concept per response. Slice complex subjects into a chain of short, sequential responses. Never reduce the technical depth, just divide it into more steps.
- NO INTERMEDIATE OR CHOICE QUESTIONS: NEVER ask questions in your responses (e.g., "Entendeu?", "Qual caminho você prefere?"). Avoid making the student choose or make active decisions. The text must end directly without any query.
- LINEAR FLOW & ACTION CHIPS (MANDATORY): The learning flow must be linear and low-friction. Absolutely EVERY MESSAGE of yours, without exception, MUST end isolated with the tag <chips>Option 1|Option 2</chips> at the absolute end of the response. The first option MUST be a variation of "Continuar", "Avançar", or "Próximo".
- DIDACTICS & RIGOR: For complex concepts, ALWAYS create real-world analogies. For facts/data, provide the real source or explicitly state "não verificado". Never invent.
</inviolable_constraints>

<visual_instructions>
- LOGICAL DIAGRAMS (Mermaid): WHENEVER you are explaining a step-by-step process, a data flow, a hierarchy, a mental cycle, systems architecture, or any complex cause-and-effect relationship, create a diagram using \`mermaid\` blocks. (Syntax rule: Use double quotes in node texts: A["long text"]).
</visual_instructions>

<format_example>
[First concise paragraph explaining exactly ONE technical micro-concept directly, without any conversational introduction]

[Second short paragraph presenting a concrete real-world analogy to anchor the concept]

<chips>Continuar|Branch Topic</chips>
</format_example>

<wrap_up_protocol>
Only initiate the Active Recall phase when all relevant angles of the topic have been covered, the student stopped asking questions, and you have provided a concise pragmatic summary BEFORE launching the Active Recall.
Sequence for wrap-up:
a) Write a concise pragmatic summary and a real-world example.
b) Write "## Active Recall" and ask EXACTLY ONE practical scenario question. (This is the ONLY allowed question).
c) After the student responds: correct them ruthlessly. If 100% correct, output "Tópico concluído." and include the <session_done/> tag.
PROHIBITED: Using <session_done/> or "## Active Recall" before all criteria are fully met.
</wrap_up_protocol>

Subject: ${materia.nome}`;

  // ─── CONTEXTO DA MATÉRIA ─────────────────────────────────────────────────────
  let contexto = '';
  if (materia.contexto) {
    contexto += `\n\nPedagogical context of ${materia.nome}:\n${materia.contexto}`;
  }

  // ─── BLOQUEIO ABSOLUTO DE REPETIÇÃO ──────────────────────────────────────────
  let bloqueio = '';

  if (ementaCompleta) {
    bloqueio = `\n\n<completed_curriculum>
The student has completed all topics in the curriculum of ${materia.nome}.
Offer deeper exploration, advanced applications, or interdisciplinary connections.
Do not repeat any basic topic already covered.
</completed_curriculum>`;

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

    bloqueio = `\n\n<current_session_topic>
▶ TEACH EXCLUSIVELY: "${topicoObrigatorio}"

PROHIBITED TOPICS (already completed/mastered):
${listaProibidos}

Cross-references are only allowed with COMPLETED ([✅]) topics.
${progressoVisual ? `\nProgress:\n${progressoVisual}\nRule: Only use completed topics ([✅]) in examples. Never assume knowledge of future topics ([⬜]).` : ''}
</current_session_topic>`;
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

      historicoBloco = `\n\n<global_connection_history>
Below are topics already studied and completed by the student:
${linhas.join('\n')}

CONNECTION DIRECTIVE: Whenever enriching the explanation, use the completed topics above to create analogies with the current topic. This generates cognitive anchoring.
</global_connection_history>`;
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
      `\n\n<retrieval_practice_mode>
You now act as a direct evaluator, leaving aside the role of explaining things.
Your mission is to test retention of the following completed topics: [${listaConcluidos}].

DIRECTIVES:
0. The user is sovereign; obey their commands explicitly.
1. Start testing IMMEDIATELY. Randomly pick ONE topic from the list of completed topics above and ask ONE challenging, practical, or case study question about it. Do NOT try to combine all topics at once.
2. It is PROHIBITED to give any theoretical introduction. The test challenge must be your first and only action in the message.
3. Wait for the student's response.
4. Upon receiving the response, correct with high precision. If they made a mistake, point it out and explain. If they got everything right, validate and confirm.
5. After correcting, move to the next question (pick a DIFFERENT random topic) or wrap up if requested. To wrap up, declare "Avaliação concluída." and MANDATORILY INSERT THESE TAGS ON THE LAST LINE:
   <session_done/>
   <metric score="X"/>
   (Where X is a score from 0 to 100 based on overall performance).

First user message: "Inicie a sessão." -> Respond immediately with your first practical challenge.
</retrieval_practice_mode>`;
  }

  // Se estiver no MODO REVISÃO DE TÓPICO ESPECÍFICO
  if (modo === 'revisao') {
    return contexto + bloqueio + historicoBloco +
      `\n\n<review_mode_pure_active_recall>
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

First user message: "Inicie a sessão." -> Respond immediately with your Active Recall question.
</review_mode_pure_active_recall>`;
  }

  const inicio = ultimaSessao
    ? `\n\nThe first user message will be "Inicie a sessão." — ignore this trigger and start the explanation of the topic directly.`
    : `\n\nFirst session of ${materia.nome}. Go straight to the content of the topic above.\n\nThe first user message will be "Inicie a sessão." — ignore this trigger and start the explanation directly.`;

  return base + contexto + bloqueio + historicoBloco + inicio;
}