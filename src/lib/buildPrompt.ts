import { Sessao, MateriaConfig } from '@/types';

export function buildSystemPrompt(materia: MateriaConfig, ultimaSessao: Sessao | null): string {
  const base = `Você é um professor particular paciente e encorajador. Seu aluno é o Tiago.

Regras:
- Seja direto e claro. Nada de enrolação.
- Use linguagem simples e acessível.
- Quando o aluno errar, explique o porquê do erro antes de dar a resposta.
- Faça perguntas para verificar entendimento.
- Dê exemplos concretos.
- Elogie progresso real, não esforço vazio.
- Se o aluno parecer travado, simplifique e dê um passo menor.

Matéria: ${materia.nome}`;

  let contexto = '';
  if (materia.contexto) {
    contexto = `\n\nContexto especial para ${materia.nome}:\n${materia.contexto}`;
  }

  let historico = '';
  if (ultimaSessao) {
    historico = `\n\nÚltima sessão:
- Tópico: ${ultimaSessao.topico}
- Nível: ${ultimaSessao.nivel}/3
- Erros: ${ultimaSessao.erros}
- Dificuldade: ${ultimaSessao.dificuldade}
- Próximo tópico sugerido: ${ultimaSessao.proximo_topico || 'não definido'}
- Decisão: ${ultimaSessao.decisao_proxima || 'não definida'}
- Observações: ${ultimaSessao.observacoes || 'nenhuma'}

${ultimaSessao.decisao_proxima === 'reforcar' ? 'O aluno precisa reforçar o tópico anterior antes de avançar.' : 'Continue a partir do próximo tópico sugerido.'}`;
  } else {
    historico = `\n\nEsta é a PRIMEIRA sessão de ${materia.nome}. Faça uma avaliação diagnóstica breve e amigável para entender o nível do aluno. Comece com perguntas simples e vá aumentando a dificuldade.`;
  }

  return base + contexto + historico;
}

export function buildFirstMessage(materia: MateriaConfig, ultimaSessao: Sessao | null): string {
  if (!ultimaSessao) {
    return `Olá Tiago! Vamos começar ${materia.nome}. Vou fazer algumas perguntas rápidas para entender seu nível. Pronto?`;
  }

  if (ultimaSessao.decisao_proxima === 'reforcar') {
    return `Olá Tiago! Na última sessão trabalhamos "${ultimaSessao.topico}" e vi que teve algumas dificuldades. Vamos reforçar esse conteúdo antes de seguir em frente. Tudo bem?`;
  }

  const proximo = ultimaSessao.proximo_topico || ultimaSessao.topico;
  return `Olá Tiago! Continuando de onde paramos — vamos trabalhar "${proximo}". Lembra do que vimos na última sessão?`;
}
