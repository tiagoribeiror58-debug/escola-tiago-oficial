import { useState } from 'react';
import { Loader2, Image as ImageIcon, ExternalLink, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  searchTerm: string;
}

export default function UnsplashChip({ searchTerm }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string | null>(null);
  const [authorUrl, setAuthorUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoadImage = async () => {
    setIsExpanded(true);
    if (imageUrl || isLoading || error) return; // já carregou ou está carregando
    
    setIsLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('unsplash-search', {
        body: { query: searchTerm }
      });
      
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      
      if (data?.imageUrl) {
        setImageUrl(data.imageUrl);
        setAuthorName(data.authorName);
        setAuthorUrl(data.authorUrl);
      } else {
        throw new Error('Nenhuma imagem encontrada');
      }
    } catch (err: any) {
      console.error('Unsplash load error:', err);
      setError(true);
      toast.error('Não foi possível carregar a imagem, mas o chat continua funcionando perfeitamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isExpanded) {
    return (
      <button 
        onClick={handleLoadImage}
        className="flex items-center gap-2 my-3 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-colors w-full md:w-auto"
      >
        <ImageIcon className="w-5 h-5" />
        <span className="text-sm font-semibold">Visualizar Foto: {searchTerm}</span>
      </button>
    );
  }

  return (
    <div className="my-4 rounded-xl border border-border/50 bg-muted/20 overflow-hidden flex flex-col max-w-sm">
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border/50">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Foto Real</span>
        <button 
          onClick={() => setIsExpanded(false)}
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          Ocultar
        </button>
      </div>
      
      <div className="relative min-h-[150px] flex flex-col items-center justify-center bg-black/5">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        )}
        
        {error && (
          <div className="p-6 text-center flex flex-col items-center text-muted-foreground">
            <AlertTriangle className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-xs">Imagem indisponível no momento.</p>
          </div>
        )}

        {imageUrl && !isLoading && (
          <>
            <img 
              src={imageUrl} 
              alt={searchTerm}
              className="w-full h-auto max-h-[300px] object-cover"
              onLoad={() => setIsLoading(false)}
            />
            {/* Attribution Required by Unsplash API Guidelines */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-left">
              <span className="text-[9px] text-white/80">
                Foto por <a href={`${authorUrl}?utm_source=escola_tiago&utm_medium=referral`} target="_blank" rel="noreferrer" className="underline hover:text-white">{authorName}</a> no <a href="https://unsplash.com/?utm_source=escola_tiago&utm_medium=referral" target="_blank" rel="noreferrer" className="underline hover:text-white">Unsplash</a>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
