import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from '@/types';

export function useActiveChatSession(materia: string) {
  return useQuery({
    queryKey: ['active-chat', materia],
    queryFn: async () => {
      // Get the latest session_key for this materia
      const { data, error } = await supabase
        .from('chat_messages')
        .select('session_key')
        .eq('sessao_materia', materia)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      return data?.[0]?.session_key || null;
    },
  });
}

export function useChatHistory(materia: string, sessionKey: string | null) {
  return useQuery({
    queryKey: ['chat-history', materia, sessionKey],
    enabled: !!sessionKey,
    queryFn: async () => {
      // 1. Tenta buscar da tabela ativa de chat_messages
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_key', sessionKey!)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      let messages = (data || []).map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })) as ChatMessage[];
      
      // 2. Se não encontrou, pode ser uma sessão antiga já encerrada.
      // Nesse caso, as mensagens estão salvas como JSON em sessoes.messages_json
      if (messages.length === 0) {
        const { data: sessaoData, error: sessaoError } = await supabase
          .from('sessoes')
          .select('messages_json')
          .eq('session_key', sessionKey!)
          .maybeSingle();
          
        if (!sessaoError && sessaoData?.messages_json) {
          // O banco retorna JSONB, garantimos que seja array de ChatMessage
          messages = sessaoData.messages_json as unknown as ChatMessage[];
        }
      }
      
      return messages;
    },
  });
}

export function useSaveChatMessage() {
  return useMutation({
    mutationFn: async (msg: { sessao_materia: string; session_key: string; role: string; content: string }) => {
      const { error } = await supabase.from('chat_messages').insert(msg);
      if (error) throw error;
    },
  });
}

// BUG-03: carrega messages_json de uma sessão específica de forma lazy
// Evita trazer megabytes na listagem geral
export function useSessionMessages(sessionId: number | null) {
  return useQuery({
    queryKey: ['session-messages', sessionId],
    enabled: sessionId !== null,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessoes')
        .select('messages_json')
        .eq('id', sessionId!)
        .single();
      if (error) throw error;
      return (data?.messages_json || []) as import('@/types').ChatMessage[];
    },
  });
}

export function useChatSessions(materia: string) {
  return useQuery({
    queryKey: ['chat-sessions', materia],
    queryFn: async () => {
      // Get all unique session keys with their first and last message
      const { data, error } = await supabase
        .from('chat_messages')
        .select('session_key, created_at, content, role')
        .eq('sessao_materia', materia)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (!data?.length) return [];

      // Group by session_key
      const sessions = new Map<string, { key: string; firstMsg: string; lastMsg: string; startedAt: string; messageCount: number }>();
      for (const row of data) {
        const existing = sessions.get(row.session_key);
        if (!existing) {
          sessions.set(row.session_key, {
            key: row.session_key,
            firstMsg: row.role === 'assistant' ? row.content.slice(0, 100) : '',
            lastMsg: row.content.slice(0, 100),
            startedAt: row.created_at,
            messageCount: 1,
          });
        } else {
          existing.lastMsg = row.content.slice(0, 100);
          existing.messageCount++;
        }
      }

      return Array.from(sessions.values()).reverse();
    },
  });
}

export function useDeleteChatSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sessionKey, materia }: { sessionKey: string; materia: string }) => {
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('session_key', sessionKey);
      if (error) throw error;
      return materia;
    },
    onSuccess: (materia) => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions', materia] });
      queryClient.invalidateQueries({ queryKey: ['active-chat', materia] });
    },
  });
}
