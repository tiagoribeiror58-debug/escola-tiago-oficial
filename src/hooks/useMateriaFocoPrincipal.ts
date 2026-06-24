import { useState, useEffect } from 'react';

const STORAGE_KEY = '@escola-tiago:materia-foco-principal';

// Slugs fixados permanentemente na seção "Objetivo Principal" — sem ação do usuário.
const PINNED_FOREVER: string[] = ['founder-solo-masterclass', 'gestao-conhecimento'];

export function useMateriaFocoPrincipal() {
  const [focosPrincipais, setFocosPrincipais] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [...PINNED_FOREVER];
      const parsed = JSON.parse(stored);
      // Migração: se ainda era string única, converte para array
      const saved: string[] = typeof parsed === 'string' ? [parsed] : Array.isArray(parsed) ? parsed : [];
      // Garante que PINNED_FOREVER está sempre presente.
      return [...new Set([...PINNED_FOREVER, ...saved])];
    } catch {
      return [...PINNED_FOREVER];
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
    // PINNED_FOREVER não pode ser removido do Objetivo Principal.
    if (PINNED_FOREVER.includes(slug)) return;
    setFocosPrincipais(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const isFocoPrincipal = (slug: string) => focosPrincipais.includes(slug);

  // Compatibilidade retroativa: focoPrincipal = primeiro da lista (ou null)
  const focoPrincipal = focosPrincipais[0] ?? null;

  return { focoPrincipal, focosPrincipais, toggleFocoPrincipal, isFocoPrincipal };
}
