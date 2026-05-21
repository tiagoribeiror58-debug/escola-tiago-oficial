import { useState, useCallback, useRef, useEffect } from 'react';
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { getMateriaBySlug } from '@/lib/materias';
import { useUltimaSessao, useEmentaConcluida, useRecentSessoes } from '@/hooks/useSessoes';
import ChatWindow from '@/components/ChatWindow';
import { X, Minus, MessageCircle, Maximize2, Loader2, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { extractSession } from '@/lib/extractSession';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { playSuccessSound } from '@/lib/audioUtils';
import { ChatMessage } from '@/types';
import { resolverTopicoAtual } from '@/lib/buildPrompt';

export function FloatingChatWidget() {
  const { state, closeChat, minimizeChat, restoreChat } = useFloatingChat();
  const { isOpen, isMinimized, materiaSlug, topico, sessionKey } = state;
  const queryClient = useQueryClient();

  const materiaConfig = materiaSlug ? getMateriaBySlug(materiaSlug) : {
    id: 'global-assistant',
    slug: 'global-assistant',
    nome: 'Assistente Global',
    emoji: '🤖',
    cor: '#3b82f6',
    ementa: [],
  } as any;
  const { data: ultimaSessao, isLoading: loadingUltima } = useUltimaSessao(materiaSlug || '');
  const { data: ementaConcluidaData } = useEmentaConcluida(materiaSlug || '');
  const ementaConcluida = ementaConcluidaData || [];
  const { data: sessoesRecentes } = useRecentSessoes(materiaSlug || '', 3);

  const messagesRef = useRef<ChatMessage[]>([]);
  const startTimeRef = useRef(Date.now());
  const [saving, setSaving] = useState(false);
  const [topicComplete, setTopicComplete] = useState(false);
  const isSavingRef = useRef(false);

  // Redefine startTime when session opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      startTimeRef.current = Date.now();
      setTopicComplete(false);
    }
  }, [isOpen, isMinimized, sessionKey]);

  const handleMessagesChange = useCallback((messages: ChatMessage[]) => {
    messagesRef.current = messages;
  }, []);

  const handleTopicComplete = useCallback(() => {
    setTopicComplete(true);
  }, []);

  const handleEncerrar = useCallback(async () => {
    if (!materiaSlug || !topico || !sessionKey || !materiaConfig) return;
    if (messagesRef.current.length === 0) {
      closeChat();
      return;
    }
    if (!topicComplete) {
      const ok = window.confirm('A sessão ainda não foi concluída pela IA. Encerrar e marcar como concluída mesmo assim?');
      if (!ok) return;
    }

    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setSaving(true);

    try {
      const messages = messagesRef.current;
      const hoje = new Date().toISOString().split('T')[0];
      const duracaoMin = Math.round((Date.now() - startTimeRef.current) / 60000);

      const ementaFlat = materiaConfig.fases
        ? materiaConfig.fases.flatMap(f => f.topicos)
        : (materiaConfig.ementa || []);

      let sessionData;

      if (messages.length < 4) {
        sessionData = {
          topico: topico,
          erros: 0,
          dificuldade: 'media',
          nivel: ultimaSessao?.nivel || 1,
          proximo_topico: ultimaSessao?.proximo_topico || '',
          decisao_proxima: 'A definir',
          observacoes: 'Sessão curta no chat flutuante',
        };
      } else {
        sessionData = await extractSession(
          messages,
          materiaSlug,
          ultimaSessao?.nivel || 1,
          ementaFlat,
          topico
        );
        sessionData.topico = topico;
      }

      let dif = (sessionData.dificuldade || 'media').toLowerCase();
      if (!['baixa', 'media', 'alta'].includes(dif)) dif = 'media';

      const messagesSnapshot = messages.map(({ role, content }) => ({ role, content }));

      // Marca na ementa_concluida se terminou
      const jaConcluido = ementaConcluida.some(d => d.toLowerCase().includes(topico.toLowerCase()) || topico.toLowerCase().includes(d.toLowerCase()));
      if (!jaConcluido) {
        await supabase.from('ementa_concluida').insert({
          materia: materiaSlug,
          topico: topico
        });
      }

      const sessionPayload = {
        materia: materiaSlug,
        topico: topico,
        data: hoje,
        erros: sessionData.erros,
        dificuldade: dif,
        nivel: sessionData.nivel,
        proximo_topico: sessionData.proximo_topico || null,
        decisao_proxima: sessionData.decisao_proxima,
        observacoes: sessionData.observacoes || null,
        duracao_min: duracaoMin > 0 ? duracaoMin : 1,
        messages_json: messagesSnapshot,
        session_key: sessionKey,
      };

      await supabase.from('sessoes').insert(sessionPayload);
      await supabase.from('chat_messages').delete().eq('session_key', sessionKey);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['sessoes'] }),
        queryClient.invalidateQueries({ queryKey: ['chat-sessions', materiaSlug] }),
        queryClient.invalidateQueries({ queryKey: ['ultima-sessao', materiaSlug] }),
        queryClient.invalidateQueries({ queryKey: ['ementa-concluida', materiaSlug] }),
      ]);
      
      toast.success('Sessão flutuante salva ✓');
      playSuccessSound();
      closeChat();
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar chat flutuante');
    } finally {
      isSavingRef.current = false;
      setSaving(false);
    }
  }, [materiaSlug, topico, sessionKey, materiaConfig, ultimaSessao, topicComplete, ementaConcluida, queryClient, closeChat]);


  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <button
        onClick={restoreChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all z-50 animate-in zoom-in"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
      </button>
    );
  }

  if (!materiaConfig) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[380px] h-[600px] max-h-[80vh] bg-background border border-border/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border/50">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl">{materiaConfig.emoji}</span>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate leading-tight">{materiaConfig.nome}</span>
            <span className="text-[10px] text-muted-foreground truncate">{topico}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={handleEncerrar}
            disabled={saving}
            title="Encerrar Sessão"
            className={cn(
              "p-1.5 rounded-lg transition-colors flex items-center justify-center",
              topicComplete ? "text-success hover:bg-success/10" : "text-muted-foreground hover:bg-muted"
            )}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Square className="w-4 h-4" />}
          </button>
          <button
            onClick={minimizeChat}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={closeChat}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden relative bg-card">
        {loadingUltima ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ChatWindow
            materia={materiaConfig}
            ultimaSessao={ultimaSessao || null}
            onMessagesChange={handleMessagesChange}
            onTopicComplete={handleTopicComplete}
            sessionKey={sessionKey!}
            sub={topico}
            ementaConcluida={ementaConcluida}
            sessoesRecentes={sessoesRecentes || []}
            systemPromptOverride={`Responda livremente qualquer coisa que o Tiago perguntar. Seja direto, sem rodeios. Sarcasmo é liberado. O Tiago tem +18 anos.`}
          />
        )}
      </div>
    </div>
  );
}
