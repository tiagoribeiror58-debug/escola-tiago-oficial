import { MateriaConfig } from '@/types';
import { performanceIntelecto } from './materias/performance';
import { tecnologiaNegocios } from './materias/negocios';
import { comunicacaoInfluencia } from './materias/comunicacao';
import { fundamentosAcademicos } from './materias/fundamentos';

export const MATERIAS: MateriaConfig[] = [
  performanceIntelecto,
  tecnologiaNegocios,
  comunicacaoInfluencia,
  fundamentosAcademicos
];

export function getMateriaBySlug(slug: string, list: MateriaConfig[] = MATERIAS): MateriaConfig | undefined {
  for (const m of list) {
    if (m.slug === slug) return m;
    if (m.children) {
      const found = getMateriaBySlug(slug, m.children);
      if (found) return found;
    }
  }
  return undefined;
}

export function getAllLeafSlugs(config: MateriaConfig): string[] {
  if (!config.children || config.children.length === 0) return [config.slug];
  return config.children.flatMap(child => getAllLeafSlugs(child));
}

export function calcularDiasParada(dataUltimaSessao: string): number {
  const ultima = new Date(dataUltimaSessao);
  const hoje = new Date();
  const diff = Math.floor((hoje.getTime() - ultima.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function urgencia(dias: number | null): 'nova' | 'ok' | 'atencao' | 'urgente' {
  if (dias === null) return 'nova';
  if (dias <= 3) return 'ok';
  if (dias <= 7) return 'atencao';
  return 'urgente';
}