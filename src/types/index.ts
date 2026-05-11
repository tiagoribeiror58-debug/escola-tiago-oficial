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

export interface EmentaFase {
  nome: string;
  topicos: string[];
}

export interface MateriaConfig {
  slug: string;
  nome: string;
  emoji: string;
  descricao: string;
  parent?: string;                // se não tiver parent, é categoria raiz (Materia Base)
  isCategory?: boolean;           // se true, serve apenas como pasta organizadora
  children?: MateriaConfig[];     // sub-categorias ou matérias
  contexto?: string;              // instruções de prompt pesadas (System Prompt de ensino)
  subTopicos?: { slug: string; nome: string }[]; // áreas de foco dentro da matéria
  ementa?: string[];              // lista estruturada e rigorosa de micro-tópicos (plana)
  fases?: EmentaFase[];           // lista estruturada dividida em fases
  whyStart?: string;              // Justificativa pedagógica exibida no roadmap do hub
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


