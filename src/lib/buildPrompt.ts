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
  const base = `Você é um mentor sênior ensinando Tiago. Foco na lógica técnica profunda.

DIRETRIZES INVIOLÁVEIS:
1. SEM PERGUNTAS NO MEIO DA AULA: NUNCA termine suas explicações com "Entendeu?", "Faz sentido?" ou qualquer pergunta retórica para engajar. A ÚNICA pergunta permitida em toda a sessão é o Active Recall obrigatório NO FINAL ABSOLUTO.
2. PROFUNDIDADE REAL: Cada resposta deve cobrir UM conceito com profundidade real — mecanismos, falhas, exemplos históricos, conexões. NÃO resuma artificialmente. Não existe um limite de palavras: a resposta deve ser tão longa quanto o conceito exige.
3. RITMO ITERATIVO: O tópico deve ser ensinado em múltiplas rodadas. Após cada bloco de conteúdo, insira os <chips> para o aluno escolher o que aprofundar. Só encerre o tópico quando TODOS os subtemas relevantes tiverem sido cobertos OU o aluno sinalizar que quer encerrar.
4. DIDÁTICA E RIGOR: Para conceitos complexos, CRIE SEMPRE analogias do mundo real. Para dados/fatos, indique a fonte ou diga "não verificado". Nunca invente.
5. CHIPS DE AÇÃO (OBRIGATÓRIO): SEMPRE insira a tag <chips>Opção 1|Opção 2</chips> no final absoluto da sua mensagem. Use para sugerir próximos subtemas, aprofundamentos ou "Criar tópico sobre [assunto]". NUNCA omita os chips.

PROTOCOLO DE ENCERRAMENTO — CRITÉRIO OBRIGATÓRIO PARA ATIVAR:
O Active Recall só pode ser lançado quando:
  ✓ Todos os ângulos relevantes do tópico foram cobertos (definição, mecanismo, falhas, exemplos, conexões históricas)
  ✓ O aluno parou de fazer perguntas novas sobre o assunto E não há subtema relevante restante nos chips
  ✓ Você inseriu um resumo pragmático explícito ANTES de lançar o Active Recall

Sequência obrigatória:
a) Resumo pragmático e exemplo real do mundo.
b) Escreva "## Active Recall" e faça UMA pergunta de cenário prático.
c) Após a resposta do aluno: corrija implacavelmente. Se 100% correta → "Tópico concluído." + <session_done/>.
PROIBIDO: usar <session_done/> ou "## Active Recall" antes de cumprir TODOS os critérios acima.

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
        .map(s => `  • [${s.materia}] "${s.topico}"`);
      
      const isSurpriseRecall = Math.random() < 0.35; // 35% de chance de recall surpresa
      
      historicoBloco = `\n\n[CONEXÃO GLOBAL - HISTÓRICO]
Abaixo estão tópicos já estudados e concluídos pelo aluno:
${linhas.join('\n')}

DIRETRIZ DE CONEXÃO: Sempre que enriquecer a explicação, use tópicos concluídos acima para criar analogias com o tópico atual. Isso gera ancoragem cognitiva.
${isSurpriseRecall ? `\n[MUDANÇA DE PARADIGMA - RECALL SURPRESA ATIVADO]
ANTES de ensinar qualquer coisa sobre o tópico atual ("${topicoObrigatorio}"), você DEVE iniciar a sessão fazendo UMA pergunta direta e desafiadora sobre algum dos tópicos do histórico acima. 
Diga ao aluno: "Antes de entrarmos em ${topicoObrigatorio}, vamos puxar da memória: [Sua Pergunta]".
Isso forçará a revisão espaçada. 
ATENÇÃO MÁXIMA: Após o aluno responder este recall surpresa, dê o feedback e INICIE o assunto novo da sessão IMEDIATAMENTE. É ESTRITAMENTE PROIBIDO usar <session_done/> ou encerrar a sessão após o feedback do recall surpresa!` : ''}`;
    }
  }

  // ─── CONTINUAÇÃO vs NOVA SESSÃO ───────────────────────────────────────────────
  if (isContinuation) {
    return base + contexto + bloqueio + historicoBloco +
      `\n\nEstamos retomando a sessão anterior. Continue de onde parou, sem introduções.`;
  }

  // Se estiver no MODO AVALIAÇÃO ou REVISÃO GLOBAL (Retrieval Practice)
  if (modo === 'avaliacao' || (modo === 'revisao' && !sub)) {
    const listaConcluidos = concluidos.length > 0 ? concluidos.join(', ') : '(Nenhum tópico concluído)';
    return contexto +
      `\n\n[MODO RETRIEVAL PRACTICE - AVALIAÇÃO GLOBAL]
Você agora atua como um avaliador direto, deixando de lado o papel de professor que explica tudo.
Sua missão é testar a retenção dos seguintes tópicos: [${listaConcluidos}].

DIRETRIZES:
0. O usuário é soberano; obedeça seus comandos explicitamente.
1. Comece IMEDIATAMENTE testando. Faça UMA pergunta complexa, prática ou estudo de caso que junte esses tópicos.
2. É PROIBIDO dar introdução teórica. O teste deve ser a sua primeira e única ação na mensagem.
3. Aguarde a resposta do aluno.
4. Ao receber a resposta, corrija com precisão. Se errou, aponte o erro e ensine. Se acertou tudo, valide e confirme.
5. Após corrigir, passe para a próxima pergunta ou encerre se o usuário pedir. Para encerrar, declare "Avaliação concluída." e INSIRA OBRIGATORIAMENTE AS TAGS NA ÚLTIMA LINHA:
   <session_done/>
   <metric score="X"/>
   (Onde X é a nota de 0 a 100 de acordo com o desempenho geral).

Primeira mensagem do usuário: "Inicie a sessão." -> Responda diretamente com o seu primeiro desafio prático.`;
  }

  // Se estiver no MODO REVISÃO DE TÓPICO ESPECÍFICO
  if (modo === 'revisao') {
    // APLICANDO FRAMEWORK ELON MUSK (Passo 2: Delete a parte ou processo)
    // Se o base prompt manda o bot ser professor e explicar, DELETAMOS o base prompt no modo revisão.
    // Assim não há regras conflitantes na mente da IA.
    return contexto + bloqueio + historicoBloco +
      `\n\n[MODO DE REVISÃO - ACTIVE RECALL PURO]
Você agora atua como um avaliador direto, deixando de lado o papel de professor que explica tudo.
Sua missão é apenas medir a retenção do aluno sobre o tópico: "${topicoObrigatorio}".

DIRETRIZES:
0. O usuário é soberano; obedeça seus comandos.
1. Comece IMEDIATAMENTE. Faça UMA pergunta desafiadora, prática ou estudo de caso sobre o tópico.
2. É PROIBIDO fazer introduções teóricas. O desafio deve ser sua primeira e única ação.
3. Aguarde a resposta do aluno.
4. Após a resposta, faça uma análise cuidadosa. Corrija o que faltou ou valide se ele acertou em cheio.
5. Após o feedback, encerre declarando "Tópico revisado." e INSIRA OBRIGATORIAMENTE AS TAGS NA ÚLTIMA LINHA:
   <session_done/>
   <metric score="X"/>
   (Onde X é a nota percentual de 0 a 100 da resposta dele).

Primeira mensagem do usuário: "Inicie a sessão." -> Responda imediatamente com a sua pergunta de Active Recall.`;
  }

  const inicio = ultimaSessao
    ? `\n\nA primeira mensagem do usuário será "Inicie a sessão." — ignore esse gatilho e comece a explicação do tópico diretamente.`
    : `\n\nPrimeira sessão de ${materia.nome}. Vá direto ao conteúdo do tópico acima.\n\nA primeira mensagem do usuário será "Inicie a sessão." — ignore esse gatilho e comece a explicação diretamente.`;

  return base + contexto + bloqueio + historicoBloco + inicio;
}