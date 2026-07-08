import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useFavoriteHubs() {
  return useQuery({
    queryKey: ['favorite-hubs'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('favorite_hubs')
        .select('hub_name')
        .eq('user_id', user.id);

      if (error) throw error;
      return data.map(f => f.hub_name) as string[];
    }
  });
}

export function useToggleFavoriteHub() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ hubName, isFavorite }: { hubName: string, isFavorite: boolean }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      if (isFavorite) {
        const { error } = await supabase
          .from('favorite_hubs')
          .delete()
          .match({ user_id: user.id, hub_name: hubName });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('favorite_hubs')
          .insert({ user_id: user.id, hub_name: hubName });
        if (error) throw error;
      }
    },
    onMutate: async ({ hubName, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ['favorite-hubs'] });
      const previousFavs = queryClient.getQueryData<string[]>(['favorite-hubs']);
      
      queryClient.setQueryData<string[]>(['favorite-hubs'], old => {
        if (!old) return [];
        return isFavorite ? old.filter(h => h !== hubName) : [...old, hubName];
      });

      return { previousFavs };
    },
    onError: (err, variables, context) => {
      if (context?.previousFavs) {
        queryClient.setQueryData(['favorite-hubs'], context.previousFavs);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite-hubs'] });
    }
  });
}
