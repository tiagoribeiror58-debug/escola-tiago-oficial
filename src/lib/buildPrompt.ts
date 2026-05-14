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
6. Encerramento: ao concluir o tópico, faça UMA pergunta de consolidação, aguarde resposta, dê UMA aplicação prática em 2 linhas, escreva "Tópico concluído. Pode encerrar." e inclua <session_done/> na última linha.
7. Chips: inclua <chips>opção 1|opção 2</chips> isolado na última linha de cada mensagem, exceto com <session_done/>. Máximo 4 opções.
8. NUNCA mencione "nível", "pontuação" ou métricas do sistema.
9. PROIBIDO saudações ("Olá", "Tudo bem"). Comece com gancho direto ou desafio conceitual.
10. Se o aluno responder curto ("entendi", "ok") → avance para a próxima camada. Nunca pare por resposta curta.
11. Explique em linguagem simples (Feynman) ao introduzir conceito novo.
12. Comece introduzindo o tema e o objetivo principal da sessão.

Matéria: ${materia.nome}`;

  // ─── CONTEXTO DA MATÉRIA ─────────────────────────────────────────────────────
  let contexto = '';
  if (materia.contexto) {
    contexto += `\n\nContexto pedagógico de ${materia.nome}:\n${materia.contexto}`;
  }

  // ─── BLOQUEIO ABSOLUTO DE REPETIÇÃO ──────────────────────────────────────────
  let bloqueio = '';

  if (ementaCompleta) {
    bloqueio = `\n\n═══════════════════════════════════
EMENTA COMPLETA
═══════════════════════════════════
O aluno concluiu todos os tópicos do currículo de ${materia.nome}.
Ofereça aprofundamento, aplicações avançadas ou conexões interdisciplinares.
Não repita nenhum tópico básico já coberto.`;

  } else if (topicoObrigatorio) {
    const listaProibidos = topicosProibidos.length > 0
      ? topicosProibidos.map(t => `  ✗ ${t}`).join('\n')
      : '  (nenhum ainda)';

    const progressoVisual = ementa.length > 0
      ? ementa.map(step => {
          const feito = concluidos.some(d => d.toLowerCase().includes(step.toLowerCase()) || step.toLowerCase().includes(d.toLowerCase()));
          if (feito) return `  ✅ ${step}`;
          if (step === topicoObrigatorio) return `  ▶ ${step}  ← VOCÊ ESTÁ AQUI`;
          return `  ⬜ ${step}`;
        }).join('\n')
      : '';

    bloqueio = `\n\n═══════════════════════════════════
TÓPICO DESTA SESSÃO — REGRA ABSOLUTA
═══════════════════════════════════
▶ VOCÊ DEVE ENSINAR EXCLUSIVAMENTE: "${topicoObrigatorio}"

TÓPICOS PROIBIDOS (já concluídos — NÃO podem ser tema principal):
${listaProibidos}

Esta regra não tem exceção. Referências cruzadas são permitidas, mas a AULA é sobre "${topicoObrigatorio}".${progressoVisual ? `\n\nProgresso na ementa:\n${progressoVisual}` : ''}`;
  }

  // ─── CONEXÃO GLOBAL E HISTÓRICO DE PERFORMANCE ──────────────────────────────
  let historicoBloco = '';
  if (sessoesRecentes && sessoesRecentes.length > 0) {
    const linhas = [...sessoesRecentes]
      .reverse()
      .map(s => {
        const dif = s.dificuldade || '?';
        const erros = s.erros ?? 0;
        return `  • [${s.materia}] "${s.topico}" (dificuldade: ${dif}, erros: ${erros})`;
      });
    if (linhas.length > 0) {
      historicoBloco = `\n\n═══════════════════════════════════
CONEXÃO GLOBAL DE CONCEITOS (HISTÓRICO RECENTE)
═══════════════════════════════════
Abaixo está o histórico recente de tópicos já estudados pelo aluno (incluindo outras matérias):
${linhas.join('\n')}

DIRETRIZ DE ENSINO: Sempre que fizer sentido e enriquecer a explicação, crie analogias cruzadas utilizando os tópicos que o aluno já dominou (acima) para explicar o NOVO tópico atual. Isso gera ancoragem cognitiva e constrói uma teia de conhecimento interdisciplinar poderosa na mente dele.`;
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