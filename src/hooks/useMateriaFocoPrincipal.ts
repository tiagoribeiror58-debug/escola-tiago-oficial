import { useState, useEffect } from 'react';

const STORAGE_KEY = '@escola-tiago:materia-foco-principal';

export function useMateriaFocoPrincipal() {
  const [focosPrincipais, setFocosPrincipais] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      // Migração: se ainda era string única, converte para array
      if (typeof parsed === 'string') return [parsed];
      if (Array.isArray(parsed)) return parsed;
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(focosPrincipais));
      window.dispatchEvent(new Event('materia-foco-principal-updated'));
    } catch (e) {
      console.error('Falha ao salvar o foco principal', e);
    }
  }, [focosPrincipais]);

  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (typeof parsed === 'string') setFocosPrincipais([parsed]);
          else if (Array.isArray(parsed)) setFocosPrincipais(parsed);
        }
      } catch {}
    };
    window.addEventListener('materia-foco-principal-updated', handleSync);
    return () => window.removeEventListener('materia-foco-principal-updated', handleSync);
  }, []);

  const toggleFocoPrincipal = (slug: string) => {
    setFocosPrincipais(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const isFocoPrincipal = (slug: string) => focosPrincipais.includes(slug);

  // Compatibilidade retroativa: focoPrincipal = primeiro da lista (ou null)
  const focoPrincipal = focosPrincipais[0] ?? null;

  return { focoPrincipal, focosPrincipais, toggleFocoPrincipal, isFocoPrincipal };
}
