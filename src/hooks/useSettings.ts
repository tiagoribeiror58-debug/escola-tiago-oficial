import { useState, useEffect } from 'react';

export function useSettings() {
  const [disableFogOfWar, setDisableFogOfWar] = useState(() => {
    return localStorage.getItem('disableFogOfWar') === 'true';
  });

  const toggleFogOfWar = (value?: boolean) => {
    setDisableFogOfWar((prev) => {
      const next = value !== undefined ? value : !prev;
      localStorage.setItem('disableFogOfWar', next.toString());
      return next;
    });
  };

  return { disableFogOfWar, toggleFogOfWar };
}
