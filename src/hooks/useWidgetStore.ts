import { create } from 'zustand';

interface WidgetState {
  codeSnippet: string | null;
  flashcards: any[] | null;
  setCodeSnippet: (code: string) => void;
  setFlashcards: (cards: any[]) => void;
  clearState: () => void;
}

export const useWidgetStore = create<WidgetState>((set) => ({
  codeSnippet: null,
  flashcards: null,
  setCodeSnippet: (code) => set({ codeSnippet: code }),
  setFlashcards: (cards) => set({ flashcards: cards }),
  clearState: () => set({ codeSnippet: null, flashcards: null }),
}));
