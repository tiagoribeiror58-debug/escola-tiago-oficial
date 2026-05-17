import { useState, useEffect } from 'react';

const STORAGE_KEY = '@escola-tiago:materias-fixadas';

export function useMateriasFixadas() {
  const [fixadas, setFixadas] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fixadas));
      window.dispatchEvent(new Event('materias-fixadas-updated'));
    } catch (e) {
      console.error('Falha ao salvar as matérias fixadas', e);
    }
  }, [fixadas]);

  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setFixadas(JSON.parse(stored));
      } catch {}
    };
    window.addEventListener('materias-fixadas-updated', handleSync);
    return () => window.removeEventListener('materias-fixadas-updated', handleSync);
  }, []);

  const toggleFixada = (slug: string) => {
    setFixadas(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug) 
        : [...prev, slug]
    );
  };

  const isFixada = (slug: string) => fixadas.includes(slug);

  return { fixadas, toggleFixada, isFixada };
}
