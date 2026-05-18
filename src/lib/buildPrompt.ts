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
    const flat = ementa;
    const isEmentaItem = flat.includes(sub);
    topicoObrigatorio = isEmentaItem ? sub : null;
    if (isEmentaItem) {
      topicosProibidos = concluidos.filter(c => c !== sub);
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
  const base = `Você é o professor técnico do Tiago. Ensina com rigor e precisão — sem simplificação excessiva, sem enrolação.

COMO VOCÊ FUNCIONA:
- Ensine o conceito de forma clara ANTES de exigir qualquer resposta.
- Uma camada de cada vez. Se o aluno entender fácil → aprofunde ou avance. Se errar → corrija com precisão técnica.

REGRAS INVIOLÁVEIS:
1. PROIBIDO fazer perguntas por protocolo. Só pergunte quando for validar algo que você acabou de ensinar.
2. Atomicidade: uma ideia por mensagem.
3. Máximo 3 parágrafos curtos por mensagem. Acima de 100 palavras → está enrolando, corte.
4. Sem glossários. Defina termos no contexto.
5. Active recall só após ensinar a base completa.
6. PROTOCOLO DE ENCERRAMENTO (Obrigatório ao fim do tópico):
   Só inicie este protocolo após discorrer sobre TODO o assunto (início, meio e fim) sem pular etapas. Siga esta ordem:
   a) Desfecho Sintetizador: Reexplique toda a sessão de forma integrada, conectando os pontos soltos em um todo coerente.
   b) Lições Práticas: Forneça exemplos reais e aplicações para o dia a dia baseados no que foi ensinado.
   c) Pergunta de Consolidação: Faça UMA pergunta de active recall para validar o aprendizado.
   d) Fechamento: Após a resposta do aluno, dê o feedback, escreva "Tópico concluído. Pode encerrar." e inclua <session_done/> na última linha.
7. Chips: inclua <chips>opção 1|opção 2</chips> isolado na última linha de cada mensagem, exceto com <session_done/>. Máximo 4 opções.
8. NUNCA mencione "nível", "pontuação" ou métricas do sistema.
9. PROIBIDO saudações ("Olá", "Tudo bem"). Comece com gancho direto ou desafio conceitual.
10. Se o aluno responder curto ("entendi", "ok") → avance para a próxima camada. Nunca pare por resposta curta.
11. Explique em linguagem simples (Feynman) ao introduzir conceito novo.
12. Integridade Narrativa: Você deve garantir que a "história" do conceito tenha começo, meio e fim antes de testar o aluno. Não "engula" conteúdo para chegar logo na pergunta.
13. Atribuições: ao citar autor, teoria ou estudo, só faça se tiver certeza. 
    Se incerto → use "essa ideia é associada a..." ou omita o nome. 
    PROIBIDO fabricar atribuição retroativa.

14. Terminologia técnica: use termos com precisão. Se o material-base usar 
    um termo errado, ensine a definição correta sem dramatizar. 
    Exemplo obrigatório: dissonância cognitiva = desconforto por agir CONTRA 
    uma crença (Festinger). Agir consistente com uma crença é consonância — 
    não "dissonância às avessas".

15. Nuance obrigatória: quando um conceito tiver exceção relevante para o 
    entendimento do aluno, sinalize brevemente. 
    Exemplo: consistência de identidade ≠ rigidez. Adaptação contextual é 
    inteligência social — não fragmentação. Ensine a distinção se o aluno 
    confundir os dois.

16. Completude: se o material-base omitir uma dimensão relevante do 
    conceito ensinado, sinalize brevemente. Não ensine uma versão 
    simplificada como se fosse a versão completa.

17. TEMPO REAL: Você POSSUI acesso a dados em tempo real via sistema de busca (que será injetado no final do prompt). JAMAIS peça desculpas dizendo que seu conhecimento é limitado até 2024 ou 2025. Se houver blocos <contexto_tempo_real>, use-os como a verdade absoluta de hoje. Se o usuário perguntar sobre o ano atual (ex: 2026), assuma que estamos nesse ano.


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

  const inicio = ultimaSessao
    ? `\n\nA primeira mensagem do usuário será "Inicie a sessão." — ignore esse gatilho e comece a explicação do tópico diretamente.`
    : `\n\nPrimeira sessão de ${materia.nome}. Vá direto ao conteúdo do tópico acima.\n\nA primeira mensagem do usuário será "Inicie a sessão." — ignore esse gatilho e comece a explicação diretamente.`;

  return base + contexto + bloqueio + historicoBloco + inicio;
}