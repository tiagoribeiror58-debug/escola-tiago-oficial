import { useTodosEstadosFlat, useMetricasRevisao } from './useSessoes';
import { useMateriasFoco } from './useMateriasFoco';
import { MateriaEstado } from '@/types';

export type TipoRecomendacao = 'ATRASADA' | 'BAIXA_RETENCAO' | 'ESFRIANDO' | 'FRESCO' | null;

export interface Recomendacao {
  estado: MateriaEstado | null;
  motivo: string;
  tipo: TipoRecomendacao;
}

export function useProximoPassoRecomendado(): Recomendacao {
  const { estados, isLoading: isLoadingEstados } = useTodosEstadosFlat();
  const { foco } = useMateriasFoco();
  const { data: metricasRevisao, isLoading: isLoadingMetricas } = useMetricasRevisao();

  if (isLoadingEstados || isLoadingMetricas || foco.length === 0) {
    return { estado: null, motivo: '', tipo: null };
  }

  // Apenas matérias que o usuário colocou no Foco
  const estadosFoco = estados.filter(e => foco.includes(e.config.slug));
  if (estadosFoco.length === 0) return { estado: null, motivo: '', tipo: null };

  // 1. Matéria com revisão mais atrasada
  const atrasadas = estadosFoco.filter(e => e.diasAteRevisao !== null && e.diasAteRevisao < 0)
    .sort((a, b) => (a.diasAteRevisao as number) - (b.diasAteRevisao as number)); // O mais negativo (mais atrasado) vem primeiro

  if (atrasadas.length > 0) {
    const estado = atrasadas[0];
    const atraso = Math.abs(estado.diasAteRevisao as number);
    return {
      estado,
      motivo: `Sua curva do esquecimento alerta: Revisão atrasada em ${atraso} dia${atraso > 1 ? 's' : ''}.`,
      tipo: 'ATRASADA'
    };
  }

  // 2. Baixa Retenção (< 70%)
  const mediasRetencao = estadosFoco.map(e => {
    // Procura métricas dessa matéria (com match de slug)
    const metricasMat = (metricasRevisao || []).filter(m => m.materia_slug === e.config.slug);
    const media = metricasMat.length > 0 
      ? Math.round(metricasMat.reduce((acc, curr) => acc + curr.score, 0) / metricasMat.length)
      : null;
    return { estado: e, media };
  }).filter(r => r.media !== null && r.media < 70)
    .sort((a, b) => (a.media as number) - (b.media as number)); // Menor retenção primeiro

  if (mediasRetencao.length > 0) {
    const { estado, media } = mediasRetencao[0];
    return {
      estado,
      motivo: `Taxa de retenção crítica (${media}% de acertos). Reforçar esta lacuna tem o maior ROI (Retorno sobre Tempo) agora.`,
      tipo: 'BAIXA_RETENCAO'
    };
  }

  // 3. Esfriando (Há mais dias sem estudar)
  const esfriando = [...estadosFoco].sort((a, b) => {
    // Se nunca foi estudado (null), priorizar com 999
    const diasA = a.diasParada === null ? 999 : a.diasParada;
    const diasB = b.diasParada === null ? 999 : b.diasParada;
    return diasB - diasA; // Maior para o menor
  });

  if (esfriando.length > 0) {
    const estado = esfriando[0];
    if (estado.diasParada === null) {
      return {
        estado,
        motivo: "Você ainda não tem histórico neste tema. Quebrar a inércia agora é o melhor movimento lógico.",
        tipo: 'ESFRIANDO'
      };
    }
    
    if (estado.diasParada > 0) {
      return {
        estado,
        motivo: `Sem contato há ${estado.diasParada} dia${estado.diasParada > 1 ? 's' : ''}. Estude agora antes de evaporar da memória recente.`,
        tipo: 'ESFRIANDO'
      };
    }
  }

  // Fallback se não bater em nada (estudou tudo hoje, tem boa retenção)
  return {
    estado: estadosFoco[0],
    motivo: "Seus indicadores estão excelentes. Pode escolher o que mais gosta ou explorar novos hubs sem culpa.",
    tipo: 'FRESCO'
  };
}
