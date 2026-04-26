import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sessao, MateriaEstado } from '@/types';
import { MATERIAS, calcularDiasParada, getAllLeafSlugs } from '@/lib/materias';

export function useSessoes() {
  return useQuery({
    queryKey: ['sessoes'],
    queryFn: async () => {
      // BUG-03: excluindo messages_json da listagem geral (pode ter MBs de dados)
      // Use useSessionMessages(id) para carregar lazy quando necessario
      const { data, error } = await supabase
        .from('sessoes')
        .select('id, materia, topico, data, erros, dificuldade, duracao_min, observacoes, proximo_topico, created_at, nivel, decisao_proxima, proxima_revisao, session_key, is_mastery')
        .order('created_at', { ascending: false });

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
    // Para categorias (isCategory), agrega sessões de todos os filhos recursivamente
    const slugsAlvo = config.isCategory ? getAllLeafSlugs(config) : [config.slug];
    const sessoesMateria = (sessoes || []).filter(s => slugsAlvo.includes(s.materia));
    const ultimaSessao = sessoesMateria.length > 0 ? sessoesMateria[0] : null;
    const diasParada = ultimaSessao ? calcularDiasParada(ultimaSessao.data) : null;
    const diasAteRevisao = ultimaSessao ? calcularDiasAteRevisao(ultimaSessao.proxima_revisao) : null;

    // Cálculo de provas pendentes:
    // Sessões normais = todas que não são desafios
    // A cada 10 sessões normais completas, o aluno "ganhou" 1 prova
    // provasPendentes = ciclosCompletados - provas já realizadas
    const sessoesNormais = sessoesMateria.filter(s => !s.is_mastery).length;
    const provasRealizadas = sessoesMateria.filter(s => s.is_mastery).length;
    const ciclosCompletados = Math.floor(sessoesNormais / 10);
    const provasPendentes = Math.max(0, ciclosCompletados - provasRealizadas);

    return {
      config,
      ultimaSessao,
      totalSessoes: sessoesMateria.length,
      diasParada,
      diasAteRevisao,
      provasPendentes,
    };
  });

  // Ordenação: matérias mais acessadas (maior total de sessões) primeiro
  estados.sort((a, b) => {
    return b.totalSessoes - a.totalSessoes;
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
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      return (data && data.length > 0 ? data[0] : null) as Sessao | null;
    },
  });
}

export function useEmentaConcluida(materia: string) {
  return useQuery({
    queryKey: ['ementa-concluida', materia],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ementa_concluida')
        .select('topico')
        .eq('materia', materia);

      if (error) throw error;
      return data.map(d => d.topico) as string[];
    },
  });
}

export function useToggleEmenta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ materia, topico, isCompleted }: { materia: string, topico: string, isCompleted: boolean }) => {
      if (isCompleted) {
        const { error } = await supabase
          .from('ementa_concluida')
          .delete()
          .eq('materia', materia)
          .eq('topico', topico);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('ementa_concluida')
          .insert({ materia, topico });
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ementa-concluida', variables.materia] });
    }
  });
}
