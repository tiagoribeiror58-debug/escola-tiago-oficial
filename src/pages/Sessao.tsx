import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { getMateriaBySlug } from '@/lib/materias';
import { useUltimaSessao, useSessoes } from '@/hooks/useSessoes';
import { useChatHistory } from '@/hooks/useChatMessages';
import ChatWindow from '@/components/ChatWindow';

import { ArrowLeft, Square, Loader2, Check, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { extractSession } from '@/lib/extractSession';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { playSuccessSound } from '@/lib/audioUtils';

export default function Sessao() {
  const { materia: slug } = useParams<{ materia: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const resumeKey = searchParams.get('resume');
  const sub = searchParams.get('sub');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const materiaConfig = getMateriaBySlug(slug || '');
  const { data: ultimaSessao, isLoading } = useUltimaSessao(slug || '');
  const { data: resumeMessages, isLoading: loadingResume } = useChatHistory(slug || '', resumeKey);
  const { data: todasSessoes } = useSessoes();

  const modo = searchParams.get('modo');

  const sessoesRecentes = useMemo(() => {
    return (todasSessoes || [])
      .filter(s => s.materia === slug)
      .sort((a, b) => new Date(b.created_at || b.data).getTime() - new Date(a.created_at || a.data).getTime())
      .slice(0, 10);
  }, [todasSessoes, slug]);

  const sessionKey = useMemo(() => {
    if (resumeKey) return resumeKey;
    return `${slug}-${Date.now()}`;
  }, [slug, resumeKey, location.key]);

  const messagesRef = useRef<ChatMessage[]>([]);
  const startTimeRef = useRef(Date.now());
  const isSavingRef = useRef(false); // BUG-02: guard contra double-save
  const [saving, setSaving] = useState(false);
  const [topicComplete, setTopicComplete] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (messagesRef.current.length > 1) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  const doEncerrar = useCallback(async () => {
    if (resumeKey) {
      navigate('/');
      return;
    }

    // BUG-02: impede duplo encerramento (ex: usuário clica 2x após erro)
    if (isSavingRef.current) return;
    isSavingRef.current = true;

    const messages = messagesRef.current;
    setSaving(true);

    try {
      let sessionData;
      const hoje = new Date().toISOString().split('T')[0];
      const duracaoMin = Math.round((Date.now() - startTimeRef.current) / 60000);

      if (messages.length < 4) {
        sessionData = {
          topico: ultimaSessao?.proximo_topico || ultimaSessao?.topico || 'Sessão curta',
          erros: 0,
          dificuldade: 'media',
          nivel: ultimaSessao?.nivel || 1,
          proximo_topico: ultimaSessao?.proximo_topico || '',
          decisao_proxima: 'A definir',
          observacoes: 'Sessão curta',
        };
      } else {
        sessionData = await extractSession(messages, slug!, ultimaSessao?.nivel || 1);
      }

      const validDificuldades = ['baixa', 'media', 'alta'];
      let dif = (sessionData.dificuldade || 'media').toLowerCase();
      if (dif === 'medio' || dif === 'média' || dif === 'médio') dif = 'media';
      if (!validDificuldades.includes(dif)) dif = 'media';

      // Snapshot das mensagens para guardar no banco
      const messagesSnapshot = messagesRef.current.map(({ role, content }) => ({ role, content }));

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
        duracao_min: duracaoMin > 0 ? duracaoMin : 1,
        session_key: sessionKey,
        messages_json: messagesSnapshot,
        is_mastery: modo === 'desafio', // marca se foi um Desafio de Maestria
      });

      if (error) throw error;

      // Deletar chat_messages após salvar snapshot
      const { error: delError } = await supabase
        .from('chat_messages')
        .delete()
        .eq('session_key', sessionKey);

      if (delError) {
        console.error('Falha ao deletar chat_messages da sessão', delError);
      }

      queryClient.invalidateQueries({ queryKey: ['sessoes'] });
      queryClient.invalidateQueries({ queryKey: ['chat-sessions', slug] });
      queryClient.invalidateQueries({ queryKey: ['ultima-sessao', slug] });
      toast.success('Sessão salva ✓');
      setSaving(false);
      playSuccessSound();
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar — tente novamente');
      isSavingRef.current = false; // libera o lock para permitir retry
      setSaving(false);
    }
  }, [slug, ultimaSessao, queryClient, sessionKey, resumeKey]);

  const handleEncerrar = useCallback(() => {
    doEncerrar();
  }, [doEncerrar]);

  const handleMessagesChange = useCallback((messages: ChatMessage[]) => {
    messagesRef.current = messages;
  }, []);

  const handleTopicComplete = useCallback(() => {
    setTopicComplete(true);
  }, []);

  if (!materiaConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Matéria não encontrada.</p>
      </div>
    );
  }

  if (isLoading || (resumeKey && loadingResume)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col relative">

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
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all active:scale-95',
            'disabled:opacity-50',
            topicComplete
              ? 'bg-emerald-500 text-white ring-2 ring-emerald-500/40 animate-pulse hover:bg-emerald-600'
              : 'hidden'
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

      <div className="flex-1 min-h-0">
        <ChatWindow
          key={sessionKey}
          materia={materiaConfig}
          ultimaSessao={ultimaSessao}
          onMessagesChange={handleMessagesChange}
          onTopicComplete={handleTopicComplete}
          sessionKey={sessionKey}
          initialMessages={resumeKey ? resumeMessages || undefined : undefined}
          sub={sub}
          modo={modo}
          sessoesRecentes={sessoesRecentes}
        />
      </div>
    </div>
  );
}
