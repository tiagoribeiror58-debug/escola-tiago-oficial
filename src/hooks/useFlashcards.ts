import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Flashcard {
  id: string;
  materia_slug: string;
  topico: string;
  front: string;
  back: string;
  interval: number;
  ease_factor: number;
  next_review_date: string;
}

export function usePendingFlashcards(materiaSlug?: string, topico?: string) {
  return useQuery({
    queryKey: ['pending-flashcards', materiaSlug, topico],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      let query = supabase
        .from('flashcards')
        .select('*')
        .eq('user_id', user.id)
        .lte('next_review_date', new Date().toISOString())
        .order('next_review_date', { ascending: true })
        .limit(50);

      if (materiaSlug && materiaSlug !== 'all') {
        query = query.eq('materia_slug', materiaSlug);
      }
      if (topico && topico !== 'all') {
        query = query.eq('topico', topico);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Flashcard[];
    }
  });
}

export function useReviewFlashcard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, rating, currentInterval, currentEase }: { id: string, rating: 'errado' | 'dificil' | 'bom' | 'facil', currentInterval: number, currentEase: number }) => {
      let newInterval = 1;
      let newEase = currentEase;

      // SM-2: Progressão padrão dos primeiros acertos é 1d -> 6d -> intervalo * ease
      // Sem isso, o aluno revisa demais no início (over-reviewing)
      if (rating === 'errado') {
        newInterval = 1;
        newEase = Math.max(1.3, currentEase - 0.2);
      } else if (rating === 'dificil') {
        newInterval = Math.max(1, currentInterval * 1.2);
        newEase = Math.max(1.3, currentEase - 0.15);
      } else if (rating === 'bom') {
        if (currentInterval <= 1) {
          newInterval = 6; // Primeiro acerto: pula pra 6 dias
        } else {
          newInterval = Math.max(1, currentInterval * currentEase);
        }
      } else if (rating === 'facil') {
        if (currentInterval <= 1) {
          newInterval = 10; // Primeiro acerto fácil: pula mais
        } else {
          newInterval = Math.max(1, currentInterval * currentEase * 1.3);
        }
        newEase = currentEase + 0.15;
      }

      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + Math.round(newInterval));

      const { error } = await supabase
        .from('flashcards')
        .update({
          interval: newInterval,
          ease_factor: newEase,
          next_review_date: nextDate.toISOString()
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-flashcards'] });
    }
  });
}
