import { useState } from 'react';
import { Loader2, BookOpen, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Props {
  materiaSlug: string;
  topico: string;
  initialValue?: string;
  onComplete: () => void;
  onCancel?: () => void;
}

export default function ReflectionModal({ materiaSlug, topico, initialValue = '', onComplete, onCancel }: Props) {
  const [reflection, setReflection] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reflection.trim()) {
      onComplete();
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('review_note', {
        body: { materia_slug: materiaSlug, topico, reflection },
      });

      if (error) throw new Error(error.message || 'Erro ao processar reflexão');
      if (data?.error) throw new Error(data.error);

      toast.success('Nota de estudo salva com sucesso! 🎉');
      onComplete();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Falha ao salvar a anotação.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">O que você aprendeu?</h2>
              <p className="text-xs text-muted-foreground">Técnica de Feynman (Opcional)</p>
            </div>
          </div>
          {onCancel && !isSubmitting && (
            <button onClick={onCancel} className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-foreground/80 leading-relaxed">
            Escreva um breve resumo do que você entendeu sobre <strong>{topico}</strong>. A IA vai revisar sua nota e salvá-la no seu caderno de estudos.
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            disabled={isSubmitting}
            placeholder="Ex: Eu entendi que esse conceito funciona assim..."
            className="w-full h-32 p-3 bg-muted/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none disabled:opacity-50"
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border bg-muted/10 flex items-center justify-between gap-3">
          <button
            onClick={onComplete}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            Pular e Encerrar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !reflection.trim()}
            className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processando...
              </>
            ) : (
              'Salvar Nota'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
