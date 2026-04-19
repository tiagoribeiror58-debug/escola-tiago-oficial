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

// Calcula quantos dias faltam (ou atrasaram) para a próxima revisão SM-2
// Retorna negativo se a revisão já passou (atrasada), positivo se ainda falta
function calcularDiasAteRevisao(proxima_revisao: string | null): number | null {
  if (!proxima_revisao) return null;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const revisao = new Date(proxima_revisao);
  const diff = Math.floor((revisao.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function useMateriasEstado() {
  const { data: sessoes, isLoading, error } = useSessoes();

  const estados: MateriaEstado[] = MATERIAS.map(config => {
    const sessoesMateria = (sessoes || []).filter(s => s.materia === config.slug);
    const ultimaSessao = sessoesMateria.length > 0 ? sessoesMateria[0] : null;
    const diasParada = ultimaSessao ? calcularDiasParada(ultimaSessao.data) : null;
    const diasAteRevisao = ultimaSessao ? calcularDiasAteRevisao(ultimaSessao.proxima_revisao) : null;

    return {
      config,
      ultimaSessao,
      totalSessoes: sessoesMateria.length,
      diasParada,
      diasAteRevisao,
    };
  });

  // Ordenação SM-2: matérias com revisão mais atrasada primeiro
  // Sem sessão (nova) vai para o final
  // Dentro das com sessão: ordena por diasAteRevisao crescente (mais negativo = mais atrasada)
  estados.sort((a, b) => {
    if (a.diasAteRevisao === null && b.diasAteRevisao === null) return 0;
    if (a.diasAteRevisao === null) return 1;  // nova vai para o fim
    if (b.diasAteRevisao === null) return -1;
    return a.diasAteRevisao - b.diasAteRevisao; // mais atrasada primeiro
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

