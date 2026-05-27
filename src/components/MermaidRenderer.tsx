import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

interface Props {
  code: string;
}

export default function MermaidRenderer({ code }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      if (!code || !isExpanded) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Gera um ID único para o diagrama evitar conflitos no DOM
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(id, code);
        
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err: any) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setError(err?.message || 'Erro ao gerar diagrama');
          toast.error('O diagrama gerado pela IA continha erros de sintaxe, mas você pode ver o código bruto.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    renderDiagram();
    
    return () => {
      isMounted = false;
    };
  }, [code, isExpanded]);

  if (!isExpanded) {
    return (
      <button 
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-2 my-3 px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors w-full md:w-auto"
      >
        <span className="text-lg">📊</span>
        <span className="text-sm font-semibold">Visualizar Diagrama Gerado</span>
      </button>
    );
  }

  return (
    <div className="my-4 rounded-xl border border-border/50 bg-muted/20 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border/50">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Diagrama Lógico</span>
        <button 
          onClick={() => setIsExpanded(false)}
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          Ocultar
        </button>
      </div>
      
      <div className="p-4 relative min-h-[100px] flex items-center justify-center overflow-x-auto">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}
        
        {error ? (
          <div className="w-full text-xs text-muted-foreground bg-muted p-3 rounded-lg font-mono whitespace-pre-wrap overflow-auto">
            <p className="text-red-400 mb-2 font-sans font-medium">⚠️ Diagrama não pôde ser renderizado:</p>
            {code}
          </div>
        ) : svgContent ? (
          <div 
            ref={containerRef} 
            className="mermaid-container w-full max-w-full flex justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        ) : null}
      </div>
    </div>
  );
}
