import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CuriosidadeChatCard } from '@/components/CuriosidadeChatCard';
import { TopicTreeMenu } from '@/components/TopicTreeMenu';
import { SavedCardsDrawer } from '@/components/SavedCardsDrawer';

interface SelectedTopic {
  materiaSlug: string;
  topico: string;
}

export default function Curiosidades() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<SelectedTopic | null>(null);

  const handleSelectTopic = (materiaSlug: string, topico: string) => {
    setSelectedTopic({ materiaSlug, topico });
  };

  return (
    <div className="h-screen bg-background flex flex-col selection:bg-indigo-500/20 overflow-hidden">
      <header className="shrink-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold tracking-wide text-foreground/90 hidden sm:flex items-center gap-2">
              Explorar Curiosidades
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <SavedCardsDrawer type="curiosidades" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row">
          
          {/* Painel Esquerdo: Árvore de Tópicos */}
          <div className="w-full md:w-[350px] shrink-0 border-r border-border/30 bg-muted/10 flex flex-col h-[40vh] md:h-full">
            <div className="p-4 border-b border-border/30 bg-background/50">
              <h2 className="font-semibold text-sm text-foreground/80">Selecione um tópico</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Tópicos com <span className="inline-block text-emerald-500 mx-1">✓</span> já estão gerados no seu cache.
              </p>
            </div>
            <div className="flex-1 overflow-hidden p-2">
              <TopicTreeMenu 
                tipo="curiosidade" 
                onSelectTopic={handleSelectTopic} 
                selectedTopico={selectedTopic?.topico} 
              />
            </div>
          </div>

          {/* Painel Direito: Conteúdo (CuriosidadeChatCard) */}
          <div className="flex-1 h-[60vh] md:h-full overflow-y-auto bg-background/50 relative">
            {selectedTopic ? (
              <div className="p-4 md:p-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CuriosidadeChatCard 
                  key={`${selectedTopic.materiaSlug}-${selectedTopic.topico}`}
                  materiaSlug={selectedTopic.materiaSlug}
                  topico={selectedTopic.topico}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-lg font-medium text-foreground">Explorar Curiosidades</h3>
                <p className="text-sm max-w-md">
                  Selecione um tópico no menu à esquerda para descobrir fatos interessantes e surpreendentes (Você Sabia?). 
                  Se você já gerou, carregará instantaneamente do cache.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
