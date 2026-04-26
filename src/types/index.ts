export interface Sessao {
  id: number;
  materia: string;
  topico: string;
  data: string;
  erros: number | null;
  dificuldade: string | null;
  duracao_min: number | null;
  observacoes: string | null;
  proximo_topico: string | null;
  created_at: string | null;
  nivel: number | null;
  decisao_proxima: string | null;
  proxima_revisao: string | null;
  session_key?: string | null;
  messages_json?: ChatMessage[] | null; // snapshot da conversa salvo ao encerrar
  is_mastery?: boolean | null; // true se esta sessão foi um Desafio de Maestria
}

export interface MateriaConfig {
  slug: string;
  nome: string;
  emoji: string;
  descricao?: string;             // Descrição para a UI (modal)
  contexto?: string;              // System prompt
  subTopicos?: { slug: string; nome: string }[];
  isCategory?: boolean;           // se true, clique navega para /categoria/:slug
  children?: MateriaConfig[];     // sub-matérias dentro desta categoria
  parent?: string;                // slug da categoria pai
  ementa?: string[];              // lista estruturada e rigorosa de micro-tópicos
}

export interface MateriaEstado {
  config: MateriaConfig;
  ultimaSessao: Sessao | null;
  totalSessoes: number;
  diasParada: number | null;
  diasAteRevisao: number | null;
  provasPendentes: number; // quantos Desafios de Maestria o aluno desbloqueou mas não fez
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface EncerramentoForm {
  topico: string;
  data: string;
  duracao_min: number | null;
  erros: number;
  dificuldade: string;
  proximo_topico: string;
  decisao_proxima: string;
  observacoes: string;
  nivel: number;
}
