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
        .select('id, materia, topico, data, erros, dificuldade, duracao_min, observacoes, proximo_topico, created_at, nivel, decisao_proxima, proxima_revisao, session_key')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Sessao[];
    },
  });
}

export function calcularOfensiva(sessoes: Sessao[]): number {
  if (!sessoes || sessoes.length === 0) return 0;
  
  // Extrai datas únicas (formato YYYY-MM-DD ajustado para o timezone local do usuário)
  const datasUnicas = [...new Set(sessoes.map(s => {
    const d = new Date(s.data);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  }))].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (datasUnicas.length === 0) return 0;

  const getLocalIso = (date: Date) => new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  
  const hojeIso = getLocalIso(new Date());
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);
  const ontemIso = getLocalIso(ontem);

  const ultimaData = datasUnicas[0];
  
  // Se a última sessão não foi hoje nem ontem, ofensiva quebrou.
  if (ultimaData !== hojeIso && ultimaData !== ontemIso) {
    return 0;
  }

  let ofensiva = 1;
  for (let i = 0; i < datasUnicas.length - 1; i++) {
    const atual = new Date(datasUnicas[i] + 'T12:00:00Z');
    const anterior = new Date(datasUnicas[i+1] + 'T12:00:00Z');
    
    const diff = Math.round((atual.getTime() - anterior.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 1) {
      ofensiva++;
    } else {
      break;
    }
  }

  return ofensiva;
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

export function buildMateriaEstado(config: MateriaConfig, sessoes: Sessao[]): MateriaEstado {
  // Para categorias (isCategory), agrega sessões de todos os filhos recursivamente
  const slugsAlvo = config.isCategory ? getAllLeafSlugs(config) : [config.slug];
  const sessoesMateria = (sessoes || []).filter(s => slugsAlvo.includes(s.materia));
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
}

export function useMateriasEstado() {
  const { data: sessoes, isLoading, error } = useSessoes();

  const estados: MateriaEstado[] = MATERIAS.map(config => buildMateriaEstado(config, sessoes || []));

  // Ordenação: matérias mais acessadas (maior total de sessões) primeiro
  estados.sort((a, b) => {
    return b.totalSessoes - a.totalSessoes;
  });

  return { estados, isLoading, error };
}

export function useFolhasEstado() {
  const { data: sessoes, isLoading, error } = useSessoes();

  const todasFolhas: MateriaConfig[] = [];
  const extrairFolhas = (lista: MateriaConfig[]) => {
    lista.forEach(m => {
      if (m.children && m.children.length > 0) extrairFolhas(m.children);
      else todasFolhas.push(m);
    });
  };
  extrairFolhas(MATERIAS);

  const estados: MateriaEstado[] = todasFolhas.map(config => buildMateriaEstado(config, sessoes || []));

  estados.sort((a, b) => b.totalSessoes - a.totalSessoes);

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

export function useSessionByKey(sessionKey: string | null) {
  return useQuery({
    queryKey: ['sessao-by-key', sessionKey],
    enabled: !!sessionKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessoes')
        .select('*')
        .eq('session_key', sessionKey)
        .maybeSingle();

      if (error) throw error;
      return data as Sessao | null;
    },
  });
}

export function useRecentSessoes(materia: string, limit = 6) {
  return useQuery({
    queryKey: ['recent-sessoes', materia, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessoes')
        .select('id, topico, dificuldade, erros, nivel, data, created_at, proximo_topico, observacoes')
        .eq('materia', materia)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data || []) as Sessao[];
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
