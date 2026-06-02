import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useMateriasFixadas() {
  const queryClient = useQueryClient();

  const { data: fixadas = [] } = useQuery({
    queryKey: ['materias-fixadas'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('materias_fixadas')
        .select('slug');

      if (error) {
        console.error('Erro ao buscar matérias fixadas:', error);
        return [];
      }
      return data.map(d => d.slug);
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const toggleMutation = useMutation({
    mutationFn: async (slug: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const isFixada = fixadas.includes(slug);

      if (isFixada) {
        const { error } = await supabase
          .from('materias_fixadas')
          .delete()
          .eq('user_id', user.id)
          .eq('slug', slug);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('materias_fixadas')
          .insert({ user_id: user.id, slug });
        if (error) throw error;
      }
    },
    // Otimização para refletir na UI imediatamente (optimistic update)
    onMutate: async (slug) => {
      await queryClient.cancelQueries({ queryKey: ['materias-fixadas'] });
      const previous = queryClient.getQueryData<string[]>(['materias-fixadas']);
      
      queryClient.setQueryData<string[]>(['materias-fixadas'], old => {
        if (!old) return [slug];
        return old.includes(slug) ? old.filter(s => s !== slug) : [...old, slug];
      });

      return { previous };
    },
    onError: (err, newTodo, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['materias-fixadas'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['materias-fixadas'] });
    }
  });

  const toggleFixada = (slug: string) => {
    toggleMutation.mutate(slug);
  };

  const isFixada = (slug: string) => fixadas.includes(slug);

  return { fixadas, toggleFixada, isFixada };
}
