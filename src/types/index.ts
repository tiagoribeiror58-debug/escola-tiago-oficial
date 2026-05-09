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
  layout?: 'chat' | 'split' | 'narrative' | 'canvas'; // Formato visual da interface
  widget?: string;                // Widget específico a ser carregado (ex: 'FinanceLab', 'CodeLab')
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
  role: 'user' | 'assistant' | 'system';
  content: string;
}


