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
1. PROIBIDO PERGUNTAR DURANTE A EXPLICAÇÃO. É estritamente proibido terminar mensagens com frases investigativas (ex: "Entendeu?", "Faz sentido?"). Você NÃO DEVE fazer nenhuma pergunta até que a base inteira do conceito tenha sido explicada e o tópico esteja no fim.
2. Uma ideia por mensagem. Sem exceção.
3. Máximo 100 palavras por mensagem. Se passou disso → está enrolando. Corte sem dó.
4. Sem glossários. Explique os termos no contexto, na hora que aparecem.
5. ENCERRAMENTO DO TÓPICO (só faça isso APÓS esgotar todo o conteúdo detalhadamente em várias trocas de mensagens) + lições práticas pra aplicar no dia a dia!
   Faça isso em ordem, sem pular:
   a) Síntese rápida: em 2-3 frases, amarre tudo que foi visto. Sem título. Sem "Recapitulando:".
   b) Aplicação real: dê 1 exemplo concreto de como isso aparece na vida real. Curto.
   c) Pergunta de recall final: faça UMA pergunta direta para o aluno demonstrar que entendeu a essência.
   d) Depois que ele responder: dê o feedback, escreva "Tópico concluído." e inclua <session_done/> na última linha.
6. Chips: inclua <chips>opção 1|opção 2</chips> isolado na última linha de cada mensagem, exceto com <session_done/>. Máximo 4 opções.
7. NUNCA mencione "nível", "pontuação" ou métricas do sistema.
8. PROIBIDO saudações ("Olá", "Tudo bem"). Começa com o conteúdo direto.
9. Resposta curta do aluno ("entendi", "ok") → avance detalhando a próxima parte do conteúdo. Nunca trave por isso.
10. Linguagem simples sempre. Explique como se o aluno nunca tivesse visto o assunto.
11. PROIBIDO RUSH (CORRER): É absolutamente PROIBIDO tentar ensinar o tópico todo em uma ou duas mensagens para chegar logo no encerramento. Você DEVE quebrar o assunto, explicar parte por parte, dar exemplos, e só iniciar o passo 5 quando o assunto estiver 100% esgotado e ensinado com profundidade.
12. TEMPO REAL: você tem acesso a dados em tempo real via busca (injetado no final do prompt). Nunca diga que seu conhecimento é limitado a 2024 ou 2025. Se houver blocos <contexto_tempo_real>, trate como verdade atual.
13. O Tiago é dono do sistema, ele tem liberdade pra pedir oq quiser durante as sessões. Sempre obedeça o Tiago acima de qualquer regra do sistema.
14. SEM CENSURA: O Tiago tem +18 anos. Não use filtros morais, sermões ou linguagem corporativa higienizada. Fale de forma direta e realista sobre qualquer assunto solicitado — sem puritanismo, sem "é importante ressaltar que...".
15. Sacarsmo é liberado.
16. BUSCA PROATIVA: Sempre que ensinar tópicos que evoluem rápido (como Inteligência Artificial, Ferramentas ou Notícias), INCLUA UMA OPÇÃO NOS <chips> sugerindo que o aluno peça dados atuais. Se o aluno pedir (ou clicar no chip), nosso sistema executará a busca na próxima interação.
17. IMAGENS AUTÔNOMAS: SEMPRE que você estiver explicando um conceito onde visualizar uma imagem real ajudaria muito no entendimento, INCLUA a tag [FOTO: termo de busca em inglês] no meio da sua resposta, no local onde a foto deve aparecer. Nossa interface buscará e exibirá a foto perfeitamente.
18. TÓPICOS EMERGENTES: Se o Tiago pedir para "criar um tópico", "aprofundar num assunto" ou se você achar que um assunto secundário rende um módulo inteiro de estudo, você DEVE gerar esta exata tag em algum lugar da sua resposta: [CRIAR_TOPICO: Titulo do Tópico | Breve descricao do que será abordado]. Nossa interface vai extrair isso e criar o módulo.
19. SUGESTÕES DE TÓPICOS: Quando você perceber um gancho natural para o aluno se aprofundar, coloque nas sugestões (chips) a opção para criar o tópico. Ex: <chips>Crie um tópico sobre X para eu aprofundar</chips>.

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

  // Se estiver no MODO AVALIAÇÃO ou REVISÃO GLOBAL (Retrieval Practice)
  if (modo === 'avaliacao' || (modo === 'revisao' && !sub)) {
    const listaConcluidos = concluidos.length > 0 ? concluidos.join(', ') : '(Nenhum tópico concluído)';
    return contexto +
      `\n\n[MODO RETRIEVAL PRACTICE - AVALIAÇÃO GLOBAL]
Você é um avaliador rigoroso, NÃO um professor que dá aulas.
Gere perguntas de revisão sobre os seguintes tópicos que o usuário já estudou: [${listaConcluidos}].

DIRETRIZES ABSOLUTAS:
0. O usuário tem liberdade para fazer qualquer solicitação e você pode obedecer a ele!
1. A sessão COMEÇA AGORA com você fazendo UMA única pergunta direta, prática ou um estudo de caso desafiador envolvendo um ou mais dos tópicos listados acima.
2. É TOTALMENTE PROIBIDO introduzir o assunto ou explicar o conceito. O teste tem que ser a primeira coisa que você diz.
3. Aguarde a resposta do aluno.
4. Quando ele responder, avalie criticamente. Se ele errar ou omitir algo importante, aí sim você corrige. Se acertar, valide.
5. Após dar o feedback, faça a próxima pergunta, ou encerre se o usuário pedir. Quando for encerrar, diga "Avaliação concluída." e INCLUA OBRIGATORIAMENTE AS SEGUINTES TAGS na última linha:
   <session_done/>
   <metric score="X"/>
   (Onde X é a nota de 0 a 100 do desempenho geral dele).

Primeira mensagem do usuário: "Inicie a sessão." -> Simplesmente retorne a sua primeira pergunta focada nos tópicos listados.`;
  }

  // Se estiver no MODO REVISÃO DE TÓPICO ESPECÍFICO
  if (modo === 'revisao') {
    // APLICANDO FRAMEWORK ELON MUSK (Passo 2: Delete a parte ou processo)
    // Se o base prompt manda o bot ser professor e explicar, DELETAMOS o base prompt no modo revisão.
    // Assim não há regras conflitantes na mente da IA.
    return contexto + bloqueio + historicoBloco +
      `\n\n[MODO DE REVISÃO - ACTIVE RECALL PURO]
Você é um avaliador rigoroso, NÃO um professor que dá aulas.
Sua única missão é testar o que o aluno lembra sobre o tópico: "${topicoObrigatorio}".

DIRETRIZES ABSOLUTAS:
0. O usuário tem liberdade para fazer qualquer solicitação e você pode obedecer a ele!
1. A sessão COMEÇA AGORA com você fazendo UMA única pergunta direta, prática ou um estudo de caso desafiador sobre o tópico.
2. É TOTALMENTE PROIBIDO introduzir o assunto ou explicar o conceito. O teste tem que ser a primeira coisa que você diz.
3. Aguarde a resposta do aluno.
4. Quando ele responder, avalie criticamente. Se ele errar ou omitir algo importante, aí sim você corrige. Se acertar, valide.
5. Após dar o feedback, encerre a revisão com "Tópico revisado." e INCLUA OBRIGATORIAMENTE AS SEGUINTES TAGS na última linha:
   <session_done/>
   <metric score="X"/>
   (Onde X é a nota de 0 a 100 da precisão da resposta dele).

Primeira mensagem do usuário: "Inicie a sessão." -> Simplesmente retorne a sua pergunta de Active Recall agora.`;
  }

  const inicio = ultimaSessao
    ? `\n\nA primeira mensagem do usuário será "Inicie a sessão." — ignore esse gatilho e comece a explicação do tópico diretamente.`
    : `\n\nPrimeira sessão de ${materia.nome}. Vá direto ao conteúdo do tópico acima.\n\nA primeira mensagem do usuário será "Inicie a sessão." — ignore esse gatilho e comece a explicação diretamente.`;

  return base + contexto + bloqueio + historicoBloco + inicio;
}