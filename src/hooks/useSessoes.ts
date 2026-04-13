import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sessao, MateriaEstado } from '@/types';
import { MATERIAS, calcularDiasParada } from '@/lib/materias';

export function useSessoes() {
  return useQuery({
    queryKey: ['sessoes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessoes')
        .select('*')
        .order('data', { ascending: false });

      if (error) throw error;
      return data as Sessao[];
    },
  });
}

export function useMateriasEstado() {
  const { data: sessoes, isLoading, error } = useSessoes();

  const estados: MateriaEstado[] = MATERIAS.map(config => {
    const sessoesMateria = (sessoes || []).filter(s => s.materia === config.slug);
    const ultimaSessao = sessoesMateria.length > 0 ? sessoesMateria[0] : null;
    const diasParada = ultimaSessao ? calcularDiasParada(ultimaSessao.data) : null;

    return {
      config,
      ultimaSessao,
      totalSessoes: sessoesMateria.length,
      diasParada,
    };
  });

  // Sort: urgente first, then atencao, then ok, then nova
  estados.sort((a, b) => {
    const order = { urgente: 0, atencao: 1, ok: 2, nova: 3 };
    const ua = a.diasParada === null ? 3 : a.diasParada > 7 ? 0 : a.diasParada > 3 ? 1 : 2;
    const ub = b.diasParada === null ? 3 : b.diasParada > 7 ? 0 : b.diasParada > 3 ? 1 : 2;
    return ua - ub;
  });

  return { estados, isLoading, error };
}

export function useUltimaSessao(materia: string) {
  return useQuery({
    queryKey: ['ultima-sessao', materia],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessoes')
        .select('*')
        .eq('materia', materia)
        .order('data', { ascending: false })
        .limit(1);

      if (error) throw error;
      return (data && data.length > 0 ? data[0] : null) as Sessao | null;
    },
  });
}
