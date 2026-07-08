import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface WarmupQuestion {
  question: string;
  hint: string;
}

export interface WarmupCache {
  id: string;
  user_id: string;
  materia_slug: string;
  topico: string;
  questions: WarmupQuestion[];
  mermaid_diagram?: string;
  created_at: string;
}

export function useWarmupCache(materiaSlug: string, topico: string) {
  return useQuery({
    queryKey: ['warmup-cache', materiaSlug, topico],
    queryFn: async () => {
      if (!materiaSlug || !topico) return null;
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('topico_warmup_cache')
        .select('*')
        .eq('user_id', user.id)
        .eq('materia_slug', materiaSlug)
        .eq('topico', topico)
        .maybeSingle();

      if (error) throw error;
      return data as WarmupCache | null;
    },
    enabled: !!materiaSlug && !!topico
  });
}

export function useSaveWarmupCache() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { materia_slug: string; topico: string; questions: WarmupQuestion[]; mermaid_diagram?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      const { error } = await supabase
        .from('topico_warmup_cache')
        .upsert(
          {
            user_id: user.id,
            materia_slug: payload.materia_slug,
            topico: payload.topico,
            questions: payload.questions,
            mermaid_diagram: payload.mermaid_diagram || null
          },
          { onConflict: 'user_id,materia_slug,topico' }
        );

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['warmup-cache', variables.materia_slug, variables.topico] });
    }
  });
}
