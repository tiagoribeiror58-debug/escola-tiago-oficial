import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, FileText, Target } from 'lucide-react';

interface PlanejarMateriaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (slug: string) => void;
}

const FUN_LOADING_MESSAGES = [
  "Semeando novos tópicos... 🌱",
  "Desenhando ementa... 📏",
  "Lendo os pensamentos dos maiores autores... 📖",
  "Organizando o conhecimento no cérebro digital... 🧠",
  "Preparando a melhor rota de estudos para você... 🚀",
];

export function PlanejarMateriaModal({ open, onOpenChange, onSuccess }: PlanejarMateriaModalProps) {
  const [activeTab, setActiveTab] = useState<'objetivo' | 'texto'>('objetivo');
  const [objetivo, setObjetivo] = useState('');
  const [textoBase, setTextoBase] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Efeito para ciclar as mensagens divertidas durante a espera ansiosa
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % FUN_LOADING_MESSAGES.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    // Validação rígida: apenas texto, para não travar o frontend com arquivos pesados.
    if (!file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, envie apenas arquivos de texto (.txt) ou Markdown (.md).",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setTextoBase(content);
        toast({
          title: "Arquivo lido instantaneamente!",
          description: "O texto já está acoplado no modal."
        });
      }
    };
    reader.readAsText(file); // Lê o arquivo puro, sem precisar de servidor
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (activeTab === 'objetivo' && !objetivo.trim()) {
      toast({ title: "Campo vazio", description: "Você precisa digitar um objetivo de estudo.", variant: "destructive" });
      return;
    }
    if (activeTab === 'texto' && !textoBase.trim()) {
      toast({ title: "Nenhum texto", description: "Arraste um arquivo válido ou cole um texto base.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setLoadingMsgIndex(0);

    try {
      const payload = activeTab === 'objetivo' ? { objetivo } : { texto_base: textoBase };
      
      // Chamada oficial da Edge Function que construímos no Passo 2
      const { data, error } = await supabase.functions.invoke('criar-materia', {
        body: payload
      });

      if (error) {
        throw new Error(error.message || "A requisição falhou no meio do caminho.");
      }

      if (data?.error) {
        throw new Error(data.error); // Erros customizados da nossa API
      }

      toast({
        title: "Matéria gerada!",
        description: `A IA acabou de estruturar a matéria "${data?.data?.nome || 'Nova'}" para você.`
      });

      // ⚠️ Ponto Crítico de Sincronização: 
      // Avisa o React Query que a gaveta de matérias está velha e ele DEVE buscar a lista nova.
      queryClient.invalidateQueries({ queryKey: ['materias-geradas'] });
      
      setObjetivo('');
      setTextoBase('');
      onOpenChange(false);

      if (onSuccess && data?.data?.slug) {
        onSuccess(data.data.slug);
      }
      
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Ops! Aconteceu algo.",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!isLoading) onOpenChange(val); // Bloqueia o fechar acidental enquanto carrega
    }}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Planejar Nova Matéria com IA 🧠</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Dê as instruções e deixe a inteligência artificial desenhar seu roadmap de ensino.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-14 space-y-5">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            <p className="text-zinc-300 font-medium animate-pulse text-center px-4">
              {FUN_LOADING_MESSAGES[loadingMsgIndex]}
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <Tabs defaultValue="objetivo" onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="grid w-full grid-cols-2 bg-zinc-800 mb-4">
                <TabsTrigger value="objetivo" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                  <Target className="w-4 h-4 mr-2" /> Objetivo
                </TabsTrigger>
                <TabsTrigger value="texto" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                  <FileText className="w-4 h-4 mr-2" /> Documento
                </TabsTrigger>
              </TabsList>

              <TabsContent value="objetivo" className="space-y-4 outline-none">
                <p className="text-sm text-zinc-400">
                  O que você quer dominar hoje?
                </p>
                <Input 
                  placeholder="Ex: Tudo sobre Direito Constitucional Brasileiro"
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  className="bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </TabsContent>

              <TabsContent value="texto" className="space-y-4 outline-none">
                <p className="text-sm text-zinc-400">
                  Arraste a sua ementa de faculdade ou cole o texto base.
                </p>
                
                {/* Zona de Drop para FileReader Nativo */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                    isDragging ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-700 bg-zinc-950 hover:border-zinc-500'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className={`w-8 h-8 mb-2 ${isDragging ? 'text-emerald-500' : 'text-zinc-500'}`} />
                  <p className="text-sm font-medium text-zinc-300">
                    {isDragging ? 'Solte o arquivo aqui...' : 'Arraste um documento ou clique aqui'}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">Formatos aceitos: .txt e .md</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".txt,.md"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-[1px] flex-1 bg-zinc-800"></div>
                  <span className="text-xs font-semibold text-zinc-500 tracking-wider">OU COLE</span>
                  <div className="h-[1px] flex-1 bg-zinc-800"></div>
                </div>

                <Textarea 
                  placeholder="Cole sua ementa detalhada aqui..."
                  value={textoBase}
                  onChange={(e) => setTextoBase(e.target.value)}
                  className="min-h-[120px] bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-500 resize-y"
                />
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => onOpenChange(false)} className="hover:bg-zinc-800">
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                Gerar com IA
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
