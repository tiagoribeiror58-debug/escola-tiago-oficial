import React from 'react';
import { Copy, Highlighter, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface Position {
  top: number;
  left: number;
}

interface Props {
  position: Position;
  selectedText: string;
  onAction: (action: 'copy' | 'highlight' | 'save') => void;
}

export default function FloatingSelectionMenu({ position, selectedText, onAction }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText);
    toast.success('Texto copiado!');
    onAction('copy');
  };

  return (
    <div
      className="fixed z-50 animate-in fade-in zoom-in-95 duration-150"
      style={{
        top: position.top - 48, // Posiciona um pouco acima do texto
        left: position.left,
        transform: 'translateX(-50%)', // Centraliza em relação ao X fornecido
      }}
    >
      <div className="flex items-center gap-1 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-2 py-1.5 rounded-lg shadow-xl border border-border/10">
        
        <button
          onClick={() => onAction('save')}
          className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-md transition-colors text-sm font-medium text-emerald-400 dark:text-emerald-600"
          title="Salvar como Nota"
        >
          <BookOpen className="w-4 h-4" />
          <span className="inline">Salvar Nota</span>
        </button>

      </div>
      
      {/* Setinha apontando pra baixo */}
      <div 
        className="absolute w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45"
        style={{
          bottom: -4,
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
        }}
      />
    </div>
  );
}
