import { useState, useEffect } from 'react';

const STORAGE_KEY = '@escola-tiago:materia-foco-principal';

export function useMateriaFocoPrincipal() {
  const [focoPrincipal, setFocoPrincipal] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(focoPrincipal));
      window.dispatchEvent(new Event('materia-foco-principal-updated'));
    } catch (e) {
      console.error('Falha ao salvar o foco principal', e);
    }
  }, [focoPrincipal]);

  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setFocoPrincipal(JSON.parse(stored));
      } catch {}
    };
    window.addEventListener('materia-foco-principal-updated', handleSync);
    return () => window.removeEventListener('materia-foco-principal-updated', handleSync);
  }, []);

  const toggleFocoPrincipal = (slug: string) => {
    setFocoPrincipal(prev => prev === slug ? null : slug);
  };

  const isFocoPrincipal = (slug: string) => focoPrincipal === slug;

  return { focoPrincipal, toggleFocoPrincipal, isFocoPrincipal };
}
