import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface WeakSpot {
  materia_slug: string;
  topico: string;
  total: number;
  erros: number;
  taxa_erro: number; // 0–100
}

export function useWeakSpots() {
  return useQuery({
    queryKey: ['weak-spots'],
    queryFn: async (): Promise<WeakSpot[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('quiz_answers')
        .select('materia_slug, topico, status')
        .eq('user_id', user.id);

      if (error) throw error;
      if (!data || data.length === 0) return [];

      // Agrupa por materia_slug + topico
      const map = new Map<string, { total: number; erros: number; materia_slug: string; topico: string }>();

      for (const row of data) {
        const key = `${row.materia_slug}||${row.topico}`;
        const existing = map.get(key) ?? { total: 0, erros: 0, materia_slug: row.materia_slug, topico: row.topico };
        existing.total += 1;
        if (row.status === 'errado') existing.erros += 1;
        map.set(key, existing);
      }

      // Filtra tópicos com pelo menos 2 tentativas e ordena pela maior taxa de erro
      return Array.from(map.values())
        .filter(s => s.total >= 2)
        .map(s => ({ ...s, taxa_erro: Math.round((s.erros / s.total) * 100) }))
        .filter(s => s.taxa_erro > 0)
        .sort((a, b) => b.taxa_erro - a.taxa_erro);
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}
