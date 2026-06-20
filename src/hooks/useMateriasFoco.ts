import { useState, useEffect } from 'react';

const STORAGE_KEY = '@escola-tiago:materias-foco';

// Slugs que SEMPRE aparecem na Mesa de Estudos, sem precisar de interação do usuário.
const PINNED_FOREVER: string[] = ['founder-solo-masterclass'];

export function useMateriasFoco() {
  const [foco, setFoco] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const saved: string[] = stored ? JSON.parse(stored) : [];
      // Garante que PINNED_FOREVER sempre esteja presente, mesmo que o usuário remova.
      const merged = [...new Set([...PINNED_FOREVER, ...saved])];
      return merged;
    } catch {
      return [...PINNED_FOREVER];
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
    // PINNED_FOREVER slugs não podem ser removidos da mesa.
    if (PINNED_FOREVER.includes(slug)) return;
    setFoco(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  const isFocado = (slug: string) => foco.includes(slug);

  return { foco, toggleFoco, isFocado };
}
