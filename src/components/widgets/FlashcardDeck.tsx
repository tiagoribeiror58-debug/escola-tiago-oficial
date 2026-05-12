import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Languages, ChevronRight, ChevronLeft, Volume2 } from 'lucide-react';
import { useWidgetStore } from '@/hooks/useWidgetStore';
import { useEffect } from 'react';

const cards = [
  { id: 1, front: 'To entail', back: 'Acarretar, envolver (como consequência)', context: 'This job entails a lot of travel.' },
  { id: 2, front: 'To leverage', back: 'Aproveitar, usar algo para obter vantagem', context: 'We need to leverage our existing network to find new clients.' },
  { id: 3, front: 'To pivot', back: 'Mudar de direção (especialmente em negócios)', context: 'The startup had to pivot when their initial product failed.' },
  { id: 4, front: 'At stake', back: 'Em jogo, em risco', context: 'There is a lot of money at stake in this negotiation.' },
];

export function FlashcardDeck() {
  const globalFlashcards = useWidgetStore(state => state.flashcards);
  const activeCards = globalFlashcards && globalFlashcards.length > 0 ? globalFlashcards : cards;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const currentCard = activeCards[currentIndex % activeCards.length];

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background border-l border-border p-6 overflow-hidden items-center justify-center relative">
      <div className="absolute top-6 left-6 shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Languages className="w-6 h-6 text-pink-500" />
          Flashcards
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Prática de Vocabulário Espaçado
        </p>
      </div>

      <div className="w-full max-w-sm mt-12">
        <div className="flex justify-between items-center mb-4 text-sm font-medium text-muted-foreground">
          <span>Card {currentIndex + 1} de {activeCards.length}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => playTTS(currentCard.front)}>
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Perspectiva para o efeito 3D */}
        <div className="relative w-full h-80 perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
          <div 
            className={`w-full h-full relative transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <Card className="absolute w-full h-full flex items-center justify-center backface-hidden bg-card border-border/50 hover:border-primary/50 transition-colors shadow-lg" style={{ backfaceVisibility: 'hidden' }}>
              <CardContent className="p-6 text-center">
                <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4 block">Inglês</span>
                <h3 className="text-4xl font-bold text-foreground">{currentCard.front}</h3>
                <p className="text-xs text-muted-foreground mt-8 animate-pulse">Clique para revelar</p>
              </CardContent>
            </Card>

            {/* Back */}
            <Card 
              className="absolute w-full h-full flex flex-col items-center justify-center backface-hidden bg-primary/5 border-primary/20 shadow-lg" 
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <CardContent className="p-6 text-center w-full">
                <span className="text-sm font-medium uppercase tracking-widest text-primary mb-2 block">Português</span>
                <h3 className="text-2xl font-bold text-foreground mb-6">{currentCard.back}</h3>
                
                <div className="w-full bg-background/50 rounded-md p-4 border border-border/50 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Exemplo de uso:</span>
                  <p className="text-sm text-foreground italic">"{currentCard.context}"</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" size="icon" onClick={prevCard} className="rounded-full w-12 h-12">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextCard} className="rounded-full w-12 h-12">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
