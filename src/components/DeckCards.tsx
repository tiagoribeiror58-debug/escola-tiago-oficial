import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeckCardsProps {
  children: React.ReactNode[];
}

export function DeckCards({ children }: DeckCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Prevent out-of-bounds if children shrink
    if (currentIndex >= children.length && children.length > 0) {
      setCurrentIndex(children.length - 1);
    }
  }, [children.length, currentIndex]);

  const handleNext = () => {
    if (currentIndex < children.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, children.length]);

  if (!children || children.length === 0) return null;

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[700px] sm:h-[750px] flex items-center justify-center">
      {children.map((child, index) => {
        const isCurrent = index === currentIndex;
        const diff = index - currentIndex; 
        const isPast = diff < 0;

        if (isPast) {
          return (
             <div
               key={index}
               className="absolute inset-0 transition-all duration-500 ease-in-out opacity-0 pointer-events-none"
               style={{ transform: 'translateX(-50%) rotate(-5deg)' }}
             >
               {child}
             </div>
          );
        }

        if (diff > 3) return null; // limit DOM nodes for performance

        const scale = 1 - diff * 0.04;
        const translateY = diff * 12; 
        const zIndex = 50 - diff;
        const opacity = 1 - diff * 0.15;

        return (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-all duration-500 ease-in-out",
              !isCurrent && "pointer-events-none"
            )}
            style={{
              transform: `translateY(${translateY}px) scale(${scale})`,
              zIndex,
              opacity
            }}
          >
            {/* O conteúdo principal do card */}
            <div className="w-full h-full bg-background rounded-[2rem] shadow-xl overflow-hidden">
                {child}
            </div>
            
            {/* Controles de navegação integrados de forma sutil */}
            {isCurrent && (
              <div className="absolute inset-y-0 -left-4 -right-4 flex items-center justify-between px-0 pointer-events-none z-50">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="w-10 h-10 rounded-full bg-background/95 border border-border/50 text-foreground flex items-center justify-center shadow-lg hover:bg-background hover:scale-110 transition-all disabled:opacity-0 disabled:pointer-events-none pointer-events-auto"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === children.length - 1}
                  className="w-10 h-10 rounded-full bg-background/95 border border-border/50 text-foreground flex items-center justify-center shadow-lg hover:bg-background hover:scale-110 transition-all disabled:opacity-0 disabled:pointer-events-none pointer-events-auto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Indicador de progresso no baralho */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-muted-foreground bg-muted/50 px-4 py-1.5 rounded-full backdrop-blur-sm border border-border/30">
        {currentIndex + 1} de {children.length}
      </div>
    </div>
  );
}
