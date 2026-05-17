import { useState, useEffect } from 'react';

const STORAGE_KEY = '@escola-tiago:ordem-materias';

export function useOrdemMaterias() {
  const [ordem, setOrdem] = useState<string[]>(() => {
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ordem));
    } catch (e) {
      console.error('Falha ao salvar a ordem das matérias', e);
    }
  }, [ordem]);

  const atualizarOrdem = (novaOrdem: string[]) => {
    setOrdem(novaOrdem);
  };

  return { ordem, atualizarOrdem };
}
