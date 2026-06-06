import { useState, useEffect } from 'react';
import { useAllCompletedTopics } from './useQuiz';
import { MATERIAS } from '@/lib/materias';
import { MateriaConfig } from '@/types';

export interface DailyTopic {
  materiaSlug: string;
  materiaNome: string;
  emoji: string;
  topico: string;
}

function extractAllTopics(materias: MateriaConfig[]): DailyTopic[] {
  let all: DailyTopic[] = [];

  for (const m of materias) {
    if (m.children && m.children.length > 0) {
      all = all.concat(extractAllTopics(m.children));
    } else {
      const topicos: string[] = [];
      if (m.ementa) {
        topicos.push(...m.ementa);
      }
      if (m.fases) {
        m.fases.forEach(f => {
          if (f.topicos) topicos.push(...f.topicos);
        });
      }

      for (const t of topicos) {
        all.push({
          materiaSlug: m.slug,
          materiaNome: m.nome,
          emoji: m.emoji,
          topico: t
        });
      }
    }
  }

  return all;
}

export function useDailyTopic(filterMateriaSlug?: string) {
  const { data: completed, isLoading } = useAllCompletedTopics();
  const [dailyTopic, setDailyTopic] = useState<DailyTopic | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [availableMaterias, setAvailableMaterias] = useState<{slug: string, nome: string}[]>([]);

  const refresh = () => setRefreshCount(c => c + 1);

  useEffect(() => {
    if (isLoading || !completed) return;

    let allTopics = extractAllTopics(MATERIAS);
    const completedSet = new Set(completed.map(c => `${c.materia_slug}::${c.topico}`));
    const uncompleted = allTopics.filter(t => !completedSet.has(`${t.materiaSlug}::${t.topico}`));

    // Extrair matérias únicas que possuem tópicos não concluídos
    const uniqueMateriasMap = new Map<string, string>();
    uncompleted.forEach(t => {
      if (!uniqueMateriasMap.has(t.materiaSlug)) {
        uniqueMateriasMap.set(t.materiaSlug, t.materiaNome);
      }
    });
    setAvailableMaterias(Array.from(uniqueMateriasMap.entries()).map(([slug, nome]) => ({ slug, nome })));

    let filteredUncompleted = uncompleted;
    if (filterMateriaSlug && filterMateriaSlug !== 'all') {
      filteredUncompleted = uncompleted.filter(t => t.materiaSlug === filterMateriaSlug);
    }

    if (filteredUncompleted.length > 0) {
      // Pega um tópico aleatório de qualquer matéria
      const randomIndex = Math.floor(Math.random() * filteredUncompleted.length);
      setDailyTopic(filteredUncompleted[randomIndex]);
    } else {
      setDailyTopic(null);
    }
  }, [completed, isLoading, filterMateriaSlug, refreshCount]);

  return { dailyTopic, isLoading, refresh, availableMaterias };
}
