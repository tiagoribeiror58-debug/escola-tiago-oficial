import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TopicoEmergente {
  id: number;
  materia_slug: string;
  titulo: string;
  descricao: string | null;
  fonte_url: string | null;
  session_key: string | null;
  created_at: string;
}

// Hook que busca tópicos emergentes gerados pela IA para uma matéria específica.
// Esses tópicos são criados automaticamente durante as sessões de estudo quando
// a busca em tempo real (Tavily) traz conteúdo novo não coberto pela ementa estática.
export function useTopicosEmergentes(materiaSlug: string | undefined) {
  return useQuery({
    queryKey: ['topicos-emergentes', materiaSlug],
    enabled: !!materiaSlug,
    // Atualiza a cada 60 segundos para capturar novos tópicos gerados durante a sessão
    refetchInterval: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('topicos_emergentes')
        .select('*')
        .eq('materia_slug', materiaSlug!)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return (data || []) as TopicoEmergente[];
    },
  });
}
