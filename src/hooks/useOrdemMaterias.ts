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

const STORAGE_KEY_HUBS = '@escola-tiago:ordem-hubs';

export function useOrdemHubs() {
  const [ordemHubs, setOrdemHubs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HUBS);
      if (stored) return JSON.parse(stored);
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HUBS, JSON.stringify(ordemHubs));
    } catch (e) {
      console.error('Falha ao salvar a ordem dos hubs', e);
    }
  }, [ordemHubs]);

  const atualizarOrdemHubs = (novaOrdem: string[]) => {
    setOrdemHubs(novaOrdem);
  };

  return { ordemHubs, atualizarOrdemHubs };
}
