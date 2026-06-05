import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface QuizQuestion {
  topico: string;
  text: string;
}

export interface QuizEvaluation {
  status: 'correto' | 'errado' | 'parcial';
  feedback: string;
}

export function useUserSettings() {
  return useQuery({
    queryKey: ['user-settings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { daily_quiz_limit: 5 };

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return { daily_quiz_limit: 5 }; // default fallback
      }
      return data;
    },
  });
}

export function useUpdateUserSettings() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (limit: number) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      const { error } = await supabase
        .from('user_settings')
        .upsert({ user_id: user.id, daily_quiz_limit: limit });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-settings'] });
    }
  });
}

export function useCreateQuizSession() {
  return useMutation({
    mutationFn: async (maxQuestions: number) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      const { data, error } = await supabase
        .from('quiz_sessions')
        .insert({ user_id: user.id, max_questions: maxQuestions })
        .select()
        .single();

      if (error) throw error;
      return data as { id: string, max_questions: number, completed: boolean };
    }
  });
}

export function useSaveQuizAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (answer: {
      session_id: string;
      materia_slug: string;
      topico: string;
      question_text: string;
      user_answer: string;
      status: string;
      feedback: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      const { error } = await supabase
        .from('quiz_answers')
        .insert({ ...answer, user_id: user.id });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['today-quiz-count'] });
    }
  });
}

export function useCompleteQuizSession() {
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { error } = await supabase
        .from('quiz_sessions')
        .update({ completed: true })
        .eq('id', sessionId);
      if (error) throw error;
    }
  });
}

// Check how many questions answered today
export function useTodayQuizCount() {
  return useQuery({
    queryKey: ['today-quiz-count'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const { count, error } = await supabase
        .from('quiz_answers')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', startOfDay.toISOString());

      if (error) throw error;
      return count || 0;
    }
  });
}

// Fetch the actual answers for history
export function useQuizHistory(filter: 'today' | 'all' = 'today') {
  return useQuery({
    queryKey: ['quiz-history', filter],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      let query = supabase
        .from('quiz_answers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (filter === 'today') {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        query = query.gte('created_at', startOfDay.toISOString());
      } else {
        query = query.limit(100); // hard limit for performance
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });
}

export function useWrongTopics() {
  return useQuery({
    queryKey: ['wrong-topics'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('quiz_answers')
        .select('topico')
        .eq('user_id', user.id)
        .eq('status', 'errado');

      if (error) throw error;
      
      // Get unique topics
      const uniqueTopics = Array.from(new Set(data.map(d => d.topico)));
      return uniqueTopics;
    }
  });
}

export type TopicDateFilter = 'all' | 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'custom';

export function useAllCompletedTopics(
  filter: TopicDateFilter = 'all', 
  customStart?: Date, 
  customEnd?: Date
) {
  return useQuery({
    queryKey: ['all-completed-topics', filter, customStart?.toISOString(), customEnd?.toISOString()],
    queryFn: async () => {
      let query = supabase
        .from('ementa_concluida')
        .select('materia, topico');

      if (filter === 'today') {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        query = query.gte('created_at', startOfDay.toISOString());
      } else if (filter === 'yesterday') {
        const startOfYesterday = new Date();
        startOfYesterday.setDate(startOfYesterday.getDate() - 1);
        startOfYesterday.setHours(0, 0, 0, 0);
        
        const endOfYesterday = new Date();
        endOfYesterday.setDate(endOfYesterday.getDate() - 1);
        endOfYesterday.setHours(23, 59, 59, 999);
        
        query = query.gte('created_at', startOfYesterday.toISOString()).lte('created_at', endOfYesterday.toISOString());
      } else if (filter === 'last_7_days') {
        const startOf7 = new Date();
        startOf7.setDate(startOf7.getDate() - 7);
        startOf7.setHours(0, 0, 0, 0);
        query = query.gte('created_at', startOf7.toISOString());
      } else if (filter === 'last_30_days') {
        const startOf30 = new Date();
        startOf30.setDate(startOf30.getDate() - 30);
        startOf30.setHours(0, 0, 0, 0);
        query = query.gte('created_at', startOf30.toISOString());
      } else if (filter === 'custom' && customStart && customEnd) {
        const start = new Date(customStart);
        start.setHours(0, 0, 0, 0);
        const end = new Date(customEnd);
        end.setHours(23, 59, 59, 999);
        query = query.gte('created_at', start.toISOString()).lte('created_at', end.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      
      return (data || []).map(d => ({
        materia_slug: d.materia,
        topico: d.topico
      }));
    }
  });
}
