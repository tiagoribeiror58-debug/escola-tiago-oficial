import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MateriaGerada {
  id: number;
  slug: string;
  nome: string;
  emoji: string | null;
  descricao: string | null;
  ementa: string[];
  created_at: string;
}

// Hook responsável por buscar e manter em cache as matérias que a Inteligência Artificial gerou.
export function useMateriasGeradas() {
  return useQuery({
    // A queryKey funciona como o "nome da gaveta" no cache do React Query.
    queryKey: ['materias-geradas'],
    queryFn: async () => {
      // Bate na porta do Supabase e pede (select *) todas as matérias criadas
      const { data, error } = await supabase
        .from('materias_geradas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Erro ao buscar matérias geradas:", error);
        throw error;
      }
      
      return (data || []) as MateriaGerada[];
    },
    // staleTime define por quanto tempo essa informação é considerada "fresca".
    // Isso evita que o app fique batendo no banco a cada troca de tela à toa.
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}
