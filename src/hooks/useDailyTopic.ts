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

export function useDailyTopic() {
  const { data: completed, isLoading } = useAllCompletedTopics();
  const [dailyTopic, setDailyTopic] = useState<DailyTopic | null>(null);

  useEffect(() => {
    // Only run when data is loaded
    if (isLoading || !completed) return;

    // Build flat list of all topics in the curriculum
    const allTopics = extractAllTopics(MATERIAS);

    // Create a Set of completed topics for fast O(1) lookup
    const completedSet = new Set(completed.map(c => `${c.materia_slug}::${c.topico}`));

    // Filter uncompleted
    const uncompleted = allTopics.filter(t => !completedSet.has(`${t.materiaSlug}::${t.topico}`));

    if (uncompleted.length > 0) {
      // Pick random uncompleted topic (executed once on mount due to completed dependency)
      const randomIdx = Math.floor(Math.random() * uncompleted.length);
      setDailyTopic(uncompleted[randomIdx]);
    } else {
      setDailyTopic(null); // Everything is completed!
    }

  }, [completed, isLoading]);

  return { dailyTopic, isLoading };
}
