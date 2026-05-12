import { ChatMessage } from '@/types';

export interface ExtractedSession {
  topico: string;
  erros: number;
  dificuldade: string;
  nivel: number;
  proximo_topico: string;
  decisao_proxima: string;
  observacoes: string;
}

const EXTRACT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/extract`;

export async function extractSession(
  messages: ChatMessage[],
  materia: string,
  nivelAtual: number,
  ementa?: string[],
  topicoAtual?: string
): Promise<ExtractedSession> {
  const res = await fetch(EXTRACT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({
      messages,
      materia,
      nivel_atual: nivelAtual,
      ementa: ementa || [],
      topico_atual: topicoAtual || '',
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Extraction failed' }));
    console.error("Extraction error details:", err);
    throw new Error(err.error || 'Failed to extract session data');
  }

  return res.json();
}
