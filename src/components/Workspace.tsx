import { MateriaConfig } from '@/types';
import { cn } from '@/lib/utils';
import { FinanceLab } from '@/components/widgets/FinanceLab';
import { LegalViewer } from '@/components/widgets/LegalViewer';
import { CodeLab } from '@/components/widgets/CodeLab';
import { NegotiationBoard } from '@/components/widgets/NegotiationBoard';
import { ArgumentMap } from '@/components/widgets/ArgumentMap';
import { FlashcardDeck } from '@/components/widgets/FlashcardDeck';
import { EconGraph } from '@/components/widgets/EconGraph';
import { UserStoryBuilder } from '@/components/widgets/UserStoryBuilder';

interface Props {
  materia: MateriaConfig;
  children: React.ReactNode; // O ChatWindow
}

export default function Workspace({ materia, children }: Props) {
  const layout = materia.layout || 'chat';

  // Layout Split: Chat na esquerda, Widget na direita
  if (layout === 'split') {
    return (
      <div className="flex h-full w-full overflow-hidden flex-col md:flex-row">
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-border h-[50%] md:h-full overflow-hidden">
          {children}
        </div>
        <div className="w-full md:w-1/2 bg-muted/10 h-[50%] md:h-full overflow-auto p-0">
           {materia.widget === 'FinanceLab' ? (
             <FinanceLab />
           ) : materia.widget === 'LegalViewer' ? (
             <LegalViewer />
           ) : materia.widget === 'CodeLab' ? (
             <CodeLab />
           ) : materia.widget === 'NegotiationBoard' ? (
             <NegotiationBoard />
           ) : materia.widget === 'ArgumentMap' ? (
             <ArgumentMap />
           ) : materia.widget === 'FlashcardDeck' ? (
             <FlashcardDeck />
           ) : materia.widget === 'EconGraph' ? (
             <EconGraph />
           ) : materia.widget === 'UserStoryBuilder' ? (
             <UserStoryBuilder />
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-4 md:p-8 animate-in fade-in duration-700">
                <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center text-3xl shadow-inner">
                  {materia.emoji}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground/80">{materia.widget || 'Laboratório Ativo'}</h2>
                  <p className="text-xs text-muted-foreground max-w-[240px] mt-2 leading-relaxed">
                    O ambiente interativo de <span className="text-foreground/60 font-medium">{materia.nome}</span> será carregado conforme os tópicos avançarem.
                  </p>
                </div>
                
                {/* Placeholder para o Widget real */}
                <div className="w-full max-w-sm aspect-video rounded-xl border border-dashed border-border/60 flex items-center justify-center bg-background/40">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/30 font-bold">Aguardando Input da IA</span>
                </div>
             </div>
           )}
        </div>
      </div>
    );
  }

  // Layout Narrative: Chat centralizado e focado (estilo storytelling)
  if (layout === 'narrative') {
    return (
      <div className="h-full w-full bg-gradient-to-b from-background to-muted/20 overflow-hidden">
        <div className="h-full w-full max-w-2xl mx-auto px-4 md:px-0">
          {children}
        </div>
      </div>
    );
  }

  // Layout Canvas: Chat flutuante sobre uma área de design/visual
  if (layout === 'canvas') {
     return (
      <div className="relative h-full w-full overflow-hidden bg-background">
        {/* Background Canvas Grid */}
        <div className="absolute inset-0 opacity-40" 
             style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="relative h-full w-full flex items-center justify-center p-4 md:p-12">
            <div className="w-full h-full max-w-5xl bg-card/40 backdrop-blur-sm border border-border/50 rounded-3xl shadow-2xl flex items-center justify-center group overflow-hidden">
                 <div className="text-center space-y-2 opacity-20 group-hover:opacity-40 transition-opacity">
                   <span className="text-5xl block mb-4">{materia.emoji}</span>
                   <span className="text-sm font-medium tracking-tight uppercase text-foreground">Visual Canvas: {materia.nome}</span>
                   <p className="text-[10px] text-muted-foreground">O preview visual será renderizado nesta camada.</p>
                 </div>
            </div>
        </div>

        {/* Floating Chat (Responsive: fullscreen mobile, floating desktop) */}
        <div className="absolute inset-0 md:inset-auto md:right-6 md:bottom-6 md:w-96 md:h-[500px] bg-background md:bg-background/80 md:backdrop-blur-2xl md:border border-border/50 md:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 md:slide-in-from-right-4 duration-500 z-10 flex flex-col">
            {children}
        </div>
      </div>
     );
  }

  // Layout Default: Chat Fullscreen
  return (
    <div className="h-full w-full overflow-hidden bg-background">
      {children}
    </div>
  );
}
