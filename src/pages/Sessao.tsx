import { useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMateriaBySlug } from '@/lib/materias';
import { useUltimaSessao } from '@/hooks/useSessoes';
import ChatWindow from '@/components/ChatWindow';
import ContextCard from '@/components/ContextCard';
import { ArrowLeft, Square, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { extractSession } from '@/lib/extractSession';
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

  const handleEncerrar = useCallback(async () => {
    const messages = messagesRef.current;
    setSaving(true);

    try {
      let sessionData;
      const hoje = new Date().toISOString().split('T')[0];

      if (messages.length < 4) {
        // Very short session — use defaults, no modal, no API call
        sessionData = {
          topico: ultimaSessao?.proximo_topico || ultimaSessao?.topico || 'Sessão curta',
          erros: 0,
          dificuldade: 'media',
          nivel: ultimaSessao?.nivel || 1,
          proximo_topico: ultimaSessao?.proximo_topico || '',
          decisao_proxima: 'A definir',
          observacoes: 'Sessão curta — dados insuficientes para extração automática',
        };
      } else {
        // Extract via AI
        sessionData = await extractSession(messages, slug!, ultimaSessao?.nivel || 1);
      }

      // Sanitize dificuldade — API sometimes returns "medio" but DB requires "media"
      const validDificuldades = ['baixa', 'media', 'alta'];
      let dif = (sessionData.dificuldade || 'media').toLowerCase();
      if (dif === 'medio' || dif === 'média' || dif === 'médio') dif = 'media';
      if (!validDificuldades.includes(dif)) dif = 'media';

      const { error } = await supabase.from('sessoes').insert({
        materia: slug!,
        topico: sessionData.topico,
        data: hoje,
        erros: sessionData.erros,
        dificuldade: dif,
        nivel: sessionData.nivel,
        proximo_topico: sessionData.proximo_topico || null,
        decisao_proxima: sessionData.decisao_proxima,
        observacoes: sessionData.observacoes || null,
      });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['sessoes'] });
      toast.success('Sessão salva ✓');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar — tente novamente');
      setSaving(false);
    }
  }, [slug, ultimaSessao, queryClient, navigate]);

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
    </div>
  );
}
