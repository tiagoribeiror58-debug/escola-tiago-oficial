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
  proxima_revisao: string | null; // calculado pelo banco via SM-2
  session_key?: string | null;
}

export interface MateriaConfig {
  slug: string;
  nome: string;
  emoji: string;
  contexto?: string;
  subTopicos?: { slug: string; nome: string }[];
}

export interface MateriaEstado {
  config: MateriaConfig;
  ultimaSessao: Sessao | null;
  totalSessoes: number;
  diasParada: number | null;
  diasAteRevisao: number | null; // negativo = revisão atrasada, positivo = dias restantes
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
