import React, { createContext, useContext, useState, ReactNode } from 'react';

type FloatingChatState = {
  isOpen: boolean;
  isMinimized: boolean;
  materiaSlug: string | null;
  topico: string | null;
  sessionKey: string | null;
};

type FloatingChatContextType = {
  state: FloatingChatState;
  openChat: (materiaSlug: string, topico: string) => void;
  closeChat: () => void;
  minimizeChat: () => void;
  restoreChat: () => void;
};

const FloatingChatContext = createContext<FloatingChatContextType | undefined>(undefined);

export function FloatingChatProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FloatingChatState>({
    isOpen: true,
    isMinimized: true,
    materiaSlug: null,
    topico: null,
    sessionKey: `global-floating-${Date.now()}`,
  });

  const openChat = (materiaSlug: string, topico: string) => {
    setState({
      isOpen: true,
      isMinimized: false,
      materiaSlug,
      topico,
      sessionKey: `${materiaSlug}-${Date.now()}-floating`,
    });
  };

  const closeChat = () => {
    setState({
      isOpen: true,
      isMinimized: true,
      materiaSlug: null,
      topico: null,
      sessionKey: `global-floating-${Date.now()}`,
    });
  };

  const minimizeChat = () => {
    setState(prev => ({ ...prev, isMinimized: true }));
  };

  const restoreChat = () => {
    setState(prev => ({ ...prev, isMinimized: false }));
  };

  return (
    <FloatingChatContext.Provider value={{ state, openChat, closeChat, minimizeChat, restoreChat }}>
      {children}
    </FloatingChatContext.Provider>
  );
}

export function useFloatingChat() {
  const context = useContext(FloatingChatContext);
  if (context === undefined) {
    throw new Error('useFloatingChat must be used within a FloatingChatProvider');
  }
  return context;
}
