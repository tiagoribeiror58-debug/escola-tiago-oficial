import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { getMateriaBySlug, MATERIAS } from '@/lib/materias';
import { useUltimaSessao, useEmentaConcluida, useRecentSessoes, useGlobalAssistantSessoes } from '@/hooks/useSessoes';
import ChatWindow from '@/components/ChatWindow';
import { X, Minus, MessageCircle, Maximize2, Loader2, Square, Plus, History } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { playSuccessSound } from '@/lib/audioUtils';
import { ChatMessage } from '@/types';
import { resolverTopicoAtual } from '@/lib/buildPrompt';

export function FloatingChatWidget() {
  const { state, closeChat, minimizeChat, restoreChat, setSessionKey } = useFloatingChat();
  const { isOpen, isMinimized, materiaSlug, topico, sessionKey } = state;
  const location = useLocation();
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
  const [showHistory, setShowHistory] = useState(false);
  const [resumeMessages, setResumeMessages] = useState<ChatMessage[]>([]);
  const { data: globalSessoes } = useGlobalAssistantSessoes();
  const isSavingRef = useRef(false);

  const globalPromptContext = useMemo(() => {
    if (materiaSlug) return "";
    let contextStr = "Matérias da escola e seus tópicos:\n";
    MATERIAS.forEach(m => {
      let topics: string[] = [];
      if (m.fases) {
        topics = m.fases.flatMap(f => f.topicos);
      } else if (m.ementa) {
        topics = m.ementa;
      }
      if (m.children) {
        const childTopics = m.children.flatMap(c => 
          c.fases ? c.fases.flatMap(f => f.topicos) : (c.ementa || [])
        );
        topics = [...topics, ...childTopics];
      }
      if (topics.length > 0) {
        contextStr += `- ${m.nome}: ${topics.slice(0, 15).join(', ')}${topics.length > 15 ? '...' : ''}\n`;
      }
    });
    return contextStr;
  }, [materiaSlug]);

  // Redefine startTime when session opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      startTimeRef.current = Date.now();
      setTopicComplete(false);
    }
  }, [isOpen, isMinimized, sessionKey]);

  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const isAutoSavingRef = useRef(false);
  const pendingSaveRef = useRef(false);

  const performAutoSave = useCallback(async () => {
    if (isAutoSavingRef.current) {
      pendingSaveRef.current = true;
      return;
    }
    isAutoSavingRef.current = true;
    pendingSaveRef.current = false;
    
    try {
      if (!sessionKey || messagesRef.current.length === 0) return;
      const sessionPayload = {
        materia: materiaSlug || 'global-assistant',
        topico: topico || 'Chat Livre',
        data: new Date().toISOString().split('T')[0],
        duracao_min: Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000)),
        messages_json: messagesRef.current.map(({ role, content }) => ({ role, content })),
        session_key: sessionKey,
      };

      const deleteResult = await supabase.from('sessoes').delete().eq('session_key', sessionKey);
      if (deleteResult.error) console.warn('Auto-save delete error:', deleteResult.error.message);
      const insertResult = await supabase.from('sessoes').insert(sessionPayload);
      if (insertResult.error) {
        console.error('Auto-save insert error:', insertResult.error.message);
      } else {
        // Invalida o cache para que o painel de histórico veja a sessão nova
        queryClient.invalidateQueries({ queryKey: ['sessoes-global-assistant'] });
      }
    } catch (err) {
      console.error('Auto-save error', err);
    } finally {
      isAutoSavingRef.current = false;
      if (pendingSaveRef.current) {
        performAutoSave();
      }
    }
  }, [sessionKey, materiaSlug, topico, queryClient]);

  const handleMessagesChange = useCallback((messages: ChatMessage[]) => {
    messagesRef.current = messages;
    
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      performAutoSave();
    }, 2000);
  }, [performAutoSave]);

  const handleTopicComplete = useCallback(() => {
    setTopicComplete(true);
  }, []);

  const handleEncerrar = useCallback(async () => {
    if (!sessionKey || !materiaConfig) return;
    if (messagesRef.current.length === 0) {
      closeChat();
      return;
    }
    const isGlobal = !materiaSlug;

    if (!isGlobal && !topicComplete) {
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

      if (isGlobal) {
        sessionData = {
          topico: 'Chat Livre',
          erros: 0,
          dificuldade: 'media',
          nivel: 1,
          proximo_topico: '',
          decisao_proxima: 'A definir',
          observacoes: 'Assistente Global',
        };
      } else if (messages.length < 4) {
        sessionData = {
          topico: topico!,
          erros: 0,
          dificuldade: 'media',
          nivel: ultimaSessao?.nivel || 1,
          proximo_topico: ultimaSessao?.proximo_topico || '',
          decisao_proxima: 'A definir',
          observacoes: 'Sessão curta no chat flutuante',
        };
      } else {
        // Dados construídos localmente — sem chamada de IA.
        const proximoCalculado = resolverTopicoAtual(
          ementaFlat,
          [...ementaConcluida, topico].filter(Boolean) as string[]
        );

        sessionData = {
          topico: topico!,
          erros: 0,
          dificuldade: 'media',
          nivel: ultimaSessao?.nivel || 1,
          proximo_topico: proximoCalculado?.topico || '',
          decisao_proxima: proximoCalculado ? `Avança para: ${proximoCalculado.topico}` : 'Ementa concluída',
          observacoes: `Sessão de ${duracaoMin}min sobre "${topico}"`,
        };
      }

      let dif = (sessionData.dificuldade || 'media').toLowerCase();
      if (!['baixa', 'media', 'alta'].includes(dif)) dif = 'media';

      const messagesSnapshot = messages.map(({ role, content }) => ({ role, content }));

      // Marca na ementa_concluida se terminou
      if (!isGlobal && topico) {
        const jaConcluido = ementaConcluida.some(d => d.toLowerCase().includes(topico.toLowerCase()) || topico.toLowerCase().includes(d.toLowerCase()));
        if (!jaConcluido) {
          await supabase.from('ementa_concluida').insert({
            materia: materiaSlug,
            topico: topico
          });
        }
      }

      const sessionPayload = {
        materia: materiaSlug || 'global-assistant',
        topico: topico || 'Chat Livre',
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

      // Remove auto-save parcial antes de inserir a versão final completa
      await supabase.from('sessoes').delete().eq('session_key', sessionKey);
      await supabase.from('sessoes').insert(sessionPayload);
      await supabase.from('chat_messages').delete().eq('session_key', sessionKey);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['sessoes'] }),
        queryClient.invalidateQueries({ queryKey: ['sessoes-global-assistant'] }),
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


  const handleNovaConversa = useCallback(async () => {
    if (messagesRef.current.length > 0) {
      toast.info('Salvando conversa atual...');
      // Salva silenciosamente a sessão global chamando a função de encerrar, 
      // que já faz todo o processo de salvar no BD e chamar closeChat()
      await handleEncerrar();
      // Em seguida, abrimos o chat novinho em folha
      setTimeout(() => {
        setShowHistory(false);
        setResumeMessages([]);
        restoreChat();
      }, 100);
    } else {
      setShowHistory(false);
      setResumeMessages([]);
      closeChat(); 
      setTimeout(() => restoreChat(), 50);
    }
  }, [handleEncerrar, closeChat, restoreChat]);

  // Se não estiver na tela inicial, esconde completamente o widget (botão e janela)
  if (location.pathname !== '/') return null;

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <button
        onClick={restoreChat}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all z-50 animate-in zoom-in"
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
    <div className="fixed bottom-4 right-4 w-[calc(100vw-2rem)] md:w-[480px] md:bottom-6 md:right-6 h-[80vh] max-h-[800px] bg-background border border-border/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5">
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
          {!materiaSlug && (
            <>
              <button
                onClick={() => setShowHistory(!showHistory)}
                title="Histórico"
                className={cn(
                  "p-1.5 mr-1 rounded-lg transition-colors flex items-center justify-center",
                  showHistory ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <History className="w-4 h-4" />
              </button>
              <button
                onClick={handleNovaConversa}
                title="Nova Conversa"
                className="p-1.5 mr-1 rounded-lg text-primary hover:bg-primary/10 transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </>
          )}
          {materiaSlug && (
            <button
              onClick={handleEncerrar}
              disabled={saving}
              title="Encerrar Sessão"
              className={cn(
                "p-1.5 mr-1 rounded-lg transition-colors flex items-center justify-center",
                topicComplete ? "text-success hover:bg-success/10" : "text-muted-foreground hover:bg-muted"
              )}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Square className="w-4 h-4" />}
            </button>
          )}
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

      {/* Chat Area / History */}
      <div className="flex-1 overflow-hidden relative bg-card">
        {showHistory ? (
          <div className="absolute inset-0 overflow-y-auto p-5 flex flex-col gap-2">
            <h3 className="text-sm font-semibold mb-2 ml-1">Histórico Global</h3>
            {(globalSessoes || [])
              .map(sessao => (
                <div key={sessao.id} className="p-3 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer group" onClick={() => {
                  if (sessao.session_key) {
                    if (messagesRef.current.length > 0) {
                      if (!window.confirm('Substituir a conversa atual por esta do histórico?')) return;
                    }
                    setShowHistory(false);
                    setResumeMessages((sessao.messages_json as ChatMessage[]) || []);
                    // Usa a função correta do Context para atualizar o sessionKey no state do React
                    setSessionKey(sessao.session_key);
                    restoreChat();
                  }
                }}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold">{sessao.topico}</span>
                    <span className="text-[10px] text-muted-foreground">{format(new Date(sessao.created_at || sessao.data), "d 'de' MMM", { locale: ptBR })}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground/80 font-medium group-hover:text-primary transition-colors">
                    {sessao.duracao_min} min • Clique para retomar
                  </span>
                </div>
              ))}
            {(globalSessoes || []).length === 0 && (
              <p className="text-xs text-muted-foreground text-center mt-8">Nenhuma conversa salva ainda.</p>
            )}
          </div>
        ) : loadingUltima ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ChatWindow
            key={sessionKey!}
            initialMessages={resumeMessages.length > 0 ? resumeMessages : undefined}
            materia={materiaConfig}
            ultimaSessao={ultimaSessao || null}
            onMessagesChange={handleMessagesChange}
            onTopicComplete={handleTopicComplete}
            sessionKey={sessionKey!}
            sub={topico}
            ementaConcluida={ementaConcluida}
            sessoesRecentes={sessoesRecentes || []}
            systemPromptOverride={
              materiaSlug 
              ? undefined 
              : `Você é a IA Assistente Global da Escola Tiago Oficial. Seu aluno se chama Tiago. Ele tem acesso a um currículo com diversas matérias. Se ele perguntar algo que se relacione com as matérias dele, faça a ponte indicando qual tópico ou matéria aborda o assunto e sugira que ele estude esse tópico.\nResponda livremente, seja direto, sem rodeios. Sarcasmo é liberado. O Tiago tem +18 anos.\n\nContexto:\n${globalPromptContext}`
            }
          />
        )}
      </div>
    </div>
  );
}
