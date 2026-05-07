import { useState, useEffect } from 'react';

const STORAGE_KEY = '@escola-tiago:materias-foco';

export function useMateriasFoco() {
  const [foco, setFoco] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      return []; // Por padrão, vazio. Força o usuário a escolher.
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foco));
      // Dispara um evento para syncar entre abas/componentes caso necessitem
      window.dispatchEvent(new Event('materias-foco-updated'));
    } catch (e) {
      console.error('Falha ao salvar o foco', e);
    }
  }, [foco]);

  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setFoco(JSON.parse(stored));
      } catch {}
    };
    window.addEventListener('materias-foco-updated', handleSync);
    return () => window.removeEventListener('materias-foco-updated', handleSync);
  }, []);

  const toggleFoco = (slug: string) => {
    setFoco(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug) 
        : [...prev, slug]
    );
  };

  const isFocado = (slug: string) => foco.includes(slug);

  return { foco, toggleFoco, isFocado };
}
