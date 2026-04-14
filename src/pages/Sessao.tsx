import { useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMateriaBySlug } from '@/lib/materias';
import { useUltimaSessao } from '@/hooks/useSessoes';
import ChatWindow from '@/components/ChatWindow';
import ContextCard from '@/components/ContextCard';
import MiniEncerramentoModal from '@/components/MiniEncerramentoModal';
import { ArrowLeft, Square, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { extractSession, MIN_MESSAGES_FOR_EXTRACTION } from '@/lib/extractSession';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function Sessao() {
  const { materia: slug } = useParams<{ materia: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const materiaConfig = getMateriaBySlug(slug || '');
  const { data: ultimaSessao, isLoading } = useUltimaSessao(slug || '');

  const messagesRef = useRef<ChatMessage[]>([]);
  const [saving, setSaving] = useState(false);
  const [showMiniModal, setShowMiniModal] = useState(false);

  const saveSession = useCallback(async (sessionData: {
    topico: string;
    erros: number;
    dificuldade: string;
    nivel: number;
    proximo_topico: string;
    decisao_proxima: string;
    observacoes: string;
  }) => {
    const hoje = new Date().toISOString().split('T')[0];
    const { error } = await supabase.from('sessoes').insert({
      materia: slug!,
      topico: sessionData.topico,
      data: hoje,
      erros: sessionData.erros,
      dificuldade: sessionData.dificuldade,
      nivel: sessionData.nivel,
      proximo_topico: sessionData.proximo_topico || null,
      decisao_proxima: sessionData.decisao_proxima,
      observacoes: sessionData.observacoes || null,
    });

    if (error) throw error;

    queryClient.invalidateQueries({ queryKey: ['sessoes'] });
    toast.success('Sessão salva ✓');
    setTimeout(() => navigate('/'), 1500);
  }, [slug, queryClient, navigate]);

  const handleEncerrar = useCallback(async () => {
    const messages = messagesRef.current;

    // Fallback: short session
    if (messages.length < MIN_MESSAGES_FOR_EXTRACTION) {
      setShowMiniModal(true);
      return;
    }

    setSaving(true);
    try {
      const extracted = await extractSession(messages, slug!, ultimaSessao?.nivel || 1);
      await saveSession(extracted);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar — tente novamente');
      setSaving(false);
    }
  }, [slug, ultimaSessao, saveSession]);

  const handleMiniConfirm = useCallback(async (erros: number, dificuldade: string) => {
    setSaving(true);
    try {
      await saveSession({
        topico: ultimaSessao?.proximo_topico || ultimaSessao?.topico || 'Sessão curta',
        erros,
        dificuldade,
        nivel: ultimaSessao?.nivel || 1,
        proximo_topico: ultimaSessao?.proximo_topico || '',
        decisao_proxima: 'A definir',
        observacoes: 'Sessão curta',
      });
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar — tente novamente');
      setSaving(false);
    }
  }, [ultimaSessao, saveSession]);

  const handleMessagesChange = useCallback((messages: ChatMessage[]) => {
    messagesRef.current = messages;
  }, []);

  if (!materiaConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Matéria não encontrada.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button
          onClick={() => navigate('/')}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-lg">{materiaConfig.emoji}</span>
          <span className="text-sm font-medium truncate">{materiaConfig.nome}</span>
        </div>
        <button
          onClick={handleEncerrar}
          disabled={saving}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
            'bg-foreground text-background',
            'hover:opacity-90 transition-opacity',
            'disabled:opacity-50'
          )}
        >
          {saving ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Square className="w-3 h-3 fill-current" />
              Encerrar
            </>
          )}
        </button>
      </header>

      <div className="px-4 pt-3">
        <ContextCard ultimaSessao={ultimaSessao} />
      </div>

      <div className="flex-1 min-h-0">
        <ChatWindow
          materia={materiaConfig}
          ultimaSessao={ultimaSessao}
          onMessagesChange={handleMessagesChange}
        />
      </div>

      <MiniEncerramentoModal
        open={showMiniModal}
        onClose={() => setShowMiniModal(false)}
        onConfirm={handleMiniConfirm}
        saving={saving}
      />
    </div>
  );
}
