import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { getMateriaBySlug } from '@/lib/materias';
import { useUltimaSessao, useEmentaConcluida, useRecentSessoes, useSessionByKey } from '@/hooks/useSessoes';
import { useChatHistory, useSessionMessages } from '@/hooks/useChatMessages';
import ChatWindow from '@/components/ChatWindow';
import Workspace from '@/components/Workspace';

import { ArrowLeft, Square, Loader2, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { extractSession } from '@/lib/extractSession';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { playSuccessSound } from '@/lib/audioUtils';
import { resolverTopicoAtual } from '@/lib/buildPrompt';

// Formata segundos em mm:ss
function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}


export default function Sessao() {
  const { materia: slug } = useParams<{ materia: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const resumeKey = searchParams.get('resume');
  const sub = searchParams.get('sub');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const materiaConfig = getMateriaBySlug(slug || '');
  const { data: ultimaSessao, isLoading } = useUltimaSessao(slug || '');
  const { data: ementaConcluidaData } = useEmentaConcluida(slug || '');
  const ementaConcluida = ementaConcluidaData || [];
  const { data: sessoesRecentes } = useRecentSessoes(slug || '', 3);
  const { data: resumedSessionData } = useSessionByKey(resumeKey);
  const { data: resumeMessages, isLoading: loadingResume } = useChatHistory(slug || '', resumeKey);
  // Histórico visual da última sessão — exibido no chat, mas NÃO enviado à IA
  const { data: historyMessages, isLoading: loadingHistory } = useSessionMessages(
    !resumeKey && ultimaSessao?.id ? ultimaSessao.id : null
  );

  const modo = searchParams.get('modo');


  const sessionKey = useMemo(() => {
    if (resumeKey) return resumeKey;
    return `${slug}-${Date.now()}`;
  }, [slug, resumeKey]);

  // Preserva a sessão na URL: se o navegador suspender a aba ou a página for recarregada,
  // a sessão não será perdida pois o resumeKey estará na URL.
  useEffect(() => {
    if (!resumeKey) {
      setSearchParams(prev => {
        prev.set('resume', sessionKey);
        if (sub) prev.set('sub', sub);
        if (modo) prev.set('modo', modo);
        return prev;
      }, { replace: true });
    }
  }, [resumeKey, sessionKey, setSearchParams, sub, modo]);

  const ementaFlat = materiaConfig?.fases
    ? materiaConfig.fases.flatMap(f => f.topicos)
    : (materiaConfig?.ementa || []);
    
  const topicoAtualParaExtrair = ultimaSessao?.proximo_topico || ultimaSessao?.topico || '';
  const resultadoDeterministico = resolverTopicoAtual(ementaFlat, ementaConcluida);
  
  const topicoDestaSessao = sub || (resumeKey && resumedSessionData ? resumedSessionData.topico : (resultadoDeterministico ? resultadoDeterministico.topico : topicoAtualParaExtrair));

  const isAlreadyCompleted = useMemo(() => {
    if (!topicoDestaSessao) return false;
    return ementaConcluida.some(
      d => d.toLowerCase().includes(topicoDestaSessao.toLowerCase()) || topicoDestaSessao.toLowerCase().includes(d.toLowerCase())
    );
  }, [topicoDestaSessao, ementaConcluida]);

  const messagesRef = useRef<ChatMessage[]>([]);
  const startTimeRef = useRef(Date.now());
  const isSavingRef = useRef(false); // BUG-02: guard contra double-save
  const draftSavedRef = useRef(false); // Rastreia se um rascunho automático já foi salvo
  const [saving, setSaving] = useState(false);
  const [topicComplete, setTopicComplete] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  // Timer em tempo real — incrementa a cada segundo desde o mount da sessão
  useEffect(() => {
    const id = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Auto-save de rascunho: se o usuário fechar a aba inesperadamente, a sessão não é perdida.
  // Isso cria uma entrada em "sessoes" logo na primeira mensagem, para que a tela da matéria veja como "Pausada".
  useEffect(() => {
    if (messageCount > 0 && !resumeKey && !draftSavedRef.current && materiaConfig) {
      draftSavedRef.current = true;
      
      const ementaFlat = materiaConfig.fases
        ? materiaConfig.fases.flatMap(f => f.topicos)
        : (materiaConfig.ementa || []);
        
      const topicoAtualParaExtrair = ultimaSessao?.proximo_topico || ultimaSessao?.topico || '';
      const resultadoDeterministico = resolverTopicoAtual(ementaFlat, ementaConcluida);
      const topicoDestaSessaoRascunho = sub || (resultadoDeterministico ? resultadoDeterministico.topico : topicoAtualParaExtrair);

      supabase.from('sessoes').insert({
        session_key: sessionKey,
        materia: slug,
        topico: topicoDestaSessaoRascunho || 'Sessão iniciada',
        data: new Date().toISOString().split('T')[0],
        erros: 0,
        dificuldade: 'media',
        nivel: ultimaSessao?.nivel || 1,
        duracao_min: 1,
        messages_json: [], // As mensagens reais ficam na tabela chat_messages enquando a sessão está ativa
      }).then(({ error }) => {
        if (error) {
          console.error("Erro ao salvar rascunho automático da sessão:", error);
          draftSavedRef.current = false; // tenta de novo se falhar
        }
      });
    }
  }, [messageCount, resumeKey, materiaConfig, ultimaSessao, slug, sessionKey, sub, ementaConcluida]);

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

  const doEncerrar = useCallback(async (forceComplete: boolean = false) => {
    // BUG-02: impede duplo encerramento (ex: usuário clica 2x após erro)
    if (isSavingRef.current) return;
    isSavingRef.current = true;

    const messages = messagesRef.current;
    setSaving(true);

    try {
      let sessionData;
      const hoje = new Date().toISOString().split('T')[0];
      const duracaoMin = Math.round((Date.now() - startTimeRef.current) / 60000);

      // Passa a ementa e o tópico atual para que a edge function calcule
      // o proximo_topico de forma determinística (sem o Haiku ter que adivinhar)
      const ementaFlat = materiaConfig.fases
        ? materiaConfig.fases.flatMap(f => f.topicos)
        : (materiaConfig.ementa || []);
        
      let topicoAtualParaExtrair = ultimaSessao?.proximo_topico || ultimaSessao?.topico || '';
      
      // Usa a mesma lógica determinística do buildPrompt para saber qual foi o tópico DESTA sessão
      const resultadoDeterministico = resolverTopicoAtual(ementaFlat, ementaConcluida);
      
      // FIX: Se estivermos retomando uma sessão (resumeKey), preserva o tópico original dela!
      const topicoDestaSessaoSalvar = sub || (resumeKey && resumedSessionData ? resumedSessionData.topico : (resultadoDeterministico ? resultadoDeterministico.topico : topicoAtualParaExtrair));

      if (messages.length < 4) {
        // BUGFIX: sessão curta NÃO copia proximo_topico para topico.
        // Antes: topico = proximo_topico, proximo_topico = proximo_topico → loop!
        // Agora: preserva o estado anterior intacto — nada mudou de fato.
        sessionData = {
          topico: topicoDestaSessaoSalvar || 'Sessão curta',
          erros: 0,
          dificuldade: 'media',
          nivel: ultimaSessao?.nivel || 1,
          proximo_topico: ultimaSessao?.proximo_topico || '',
          decisao_proxima: 'A definir',
          observacoes: 'Sessão curta',
        };
      } else {
        sessionData = await extractSession(
          messages,
          slug!,
          ultimaSessao?.nivel || 1,
          ementaFlat,
          topicoDestaSessaoSalvar
        );

        // GARANTIA: O tópico salvo no banco é estritamente o da ementa (evita que a IA modifique a string)
        sessionData.topico = topicoDestaSessaoSalvar;
      }

      const validDificuldades = ['baixa', 'media', 'alta'];
      let dif = (sessionData.dificuldade || 'media').toLowerCase();
      if (dif === 'medio' || dif === 'média' || dif === 'médio') dif = 'media';
      if (!validDificuldades.includes(dif)) dif = 'media';

      // Snapshot das mensagens para guardar no banco
      const messagesSnapshot = messagesRef.current.map(({ role, content }) => ({ role, content }));

      // NOVO: Se a sessão foi concluída com sucesso (topicComplete) ou o usuário forçou, marca na ementa_concluida automaticamente!
      if ((topicComplete || forceComplete) && sessionData.topico) {
        const jaConcluido = ementaConcluida.some(d => d.toLowerCase().includes(sessionData.topico.toLowerCase()) || sessionData.topico.toLowerCase().includes(d.toLowerCase()));
        if (!jaConcluido) {
          const { error: ementaError } = await supabase.from('ementa_concluida').insert({
            materia: slug!,
            topico: sessionData.topico
          });
          if (ementaError) {
            console.error('Falha ao marcar ementa_concluida:', ementaError);
          }
        }
      }

      const sessionPayload = {
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
        messages_json: messagesSnapshot,
      };

      const keyToUpdate = resumeKey || sessionKey;
      const { data: existingSession } = await supabase
        .from('sessoes')
        .select('id')
        .eq('session_key', keyToUpdate)
        .maybeSingle();

      if (existingSession) {
        // Atualiza a sessão existente
        const { error } = await supabase
          .from('sessoes')
          .update(sessionPayload)
          .eq('session_key', keyToUpdate);
        if (error) throw error;
      } else {
        // Insere nova sessão
        const { error } = await supabase.from('sessoes').insert({
          ...sessionPayload,
          session_key: sessionKey,
        });
        if (error) throw error;
      }

      // Deletar chat_messages após salvar snapshot
      const { error: delError } = await supabase
        .from('chat_messages')
        .delete()
        .eq('session_key', sessionKey);

      if (delError) {
        console.error('Falha ao deletar chat_messages da sessão', delError);
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['sessoes'] }),
        queryClient.invalidateQueries({ queryKey: ['chat-sessions', slug] }),
        queryClient.invalidateQueries({ queryKey: ['ultima-sessao', slug] }),
        queryClient.invalidateQueries({ queryKey: ['ementa-concluida', slug] })
      ]);
      toast.success('Sessão salva ✓');
      setSaving(false);
      playSuccessSound();
      navigate(`/?materia=${slug}`);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar — tente novamente');
      isSavingRef.current = false; // libera o lock para permitir retry
      setSaving(false);
    }
  }, [slug, ultimaSessao, queryClient, sessionKey, resumeKey, modo, navigate, resumedSessionData, ementaConcluida, materiaConfig, sub]);

  // doPausar: salva snapshot parcial no banco com decisao_proxima='Pausada'
  // DIFERENTE do doEncerrar: NÃO deleta as chat_messages, preservando o histórico para retomada.
  const doPausar = useCallback(async () => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setSaving(true);

    try {
      const hoje = new Date().toISOString().split('T')[0];
      const duracaoMin = Math.round((Date.now() - startTimeRef.current) / 60000);

      const ementaFlat = materiaConfig.fases
        ? materiaConfig.fases.flatMap(f => f.topicos)
        : (materiaConfig.ementa || []);

      const resultadoDeterministico = resolverTopicoAtual(ementaFlat, ementaConcluida);
      const topicoAtualParaExtrair = ultimaSessao?.proximo_topico || ultimaSessao?.topico || '';
      const topicoDestaSessaoPausar = sub || (resumeKey && resumedSessionData
        ? resumedSessionData.topico
        : (resultadoDeterministico ? resultadoDeterministico.topico : topicoAtualParaExtrair));

      const pausePayload = {
        materia: slug!,
        topico: topicoDestaSessaoPausar || 'Sessão pausada',
        data: hoje,
        erros: 0,
        dificuldade: 'media',
        nivel: ultimaSessao?.nivel || 1,
        duracao_min: duracaoMin > 0 ? duracaoMin : 1,
        messages_json: [], // mensagens reais ficam em chat_messages
        decisao_proxima: 'Pausada',
        observacoes: 'Sessão pausada pelo usuário',
      };

      const keyToUpdate = resumeKey || sessionKey;
      const { data: existingSession } = await supabase
        .from('sessoes')
        .select('id')
        .eq('session_key', keyToUpdate)
        .maybeSingle();

      if (existingSession) {
        const { error } = await supabase
          .from('sessoes')
          .update(pausePayload)
          .eq('session_key', keyToUpdate);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('sessoes').insert({
          ...pausePayload,
          session_key: sessionKey,
        });
        if (error) throw error;
      }

      // NÃO deleta chat_messages — elas ficam intactas para retomada
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['sessoes'] }),
        queryClient.invalidateQueries({ queryKey: ['ultima-sessao', slug] }),
      ]);

      toast.success('Sessão pausada');
      setSaving(false);
      navigate(`/?materia=${slug}`);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao pausar — tente novamente');
      isSavingRef.current = false;
      setSaving(false);
    }
  }, [slug, ultimaSessao, queryClient, sessionKey, resumeKey, resumedSessionData, ementaConcluida, materiaConfig, sub, navigate]);

  const handlePausar = useCallback(() => {
    doPausar();
  }, [doPausar]);

  const handleEncerrar = useCallback(() => {
    // Regra 5: botão sempre acessível. Se sessão não concluiu, pede confirmação.
    if (!topicComplete) {
      const ok = window.confirm('A sessão ainda não foi concluída pela IA. Encerrar e marcar como concluída mesmo assim?');
      if (!ok) return;
    }
    doEncerrar(true);
  }, [doEncerrar, topicComplete]);

  const handleMessagesChange = useCallback((messages: ChatMessage[]) => {
    messagesRef.current = messages;
    // Conta apenas mensagens de usuário e assistente (ignora system)
    setMessageCount(messages.filter(m => m.role !== 'system').length);
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

  if (isLoading || loadingHistory || (resumeKey && loadingResume)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col relative">

      <header className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
        <button
          onClick={() => {
            if (!topicComplete && !isAlreadyCompleted && messageCount > 0) {
              handlePausar();
            } else {
              navigate(`/?materia=${slug}`);
            }
          }}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-base sm:text-lg shrink-0">{materiaConfig.emoji}</span>
          <span className="text-sm font-medium truncate">{materiaConfig.nome}</span>
        </div>

        {/* Timer — visível após primeira mensagem */}
        {messageCount > 0 && (
          <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground tabular-nums shrink-0">
            {formatTimer(elapsedSeconds)}
          </span>
        )}

        {/* Botão Pausar — apenas se o tópico não foi concluído e tem mensagens para salvar */}
        {!topicComplete && !isAlreadyCompleted && messageCount > 0 && (
          <button
            onClick={handlePausar}
            disabled={saving}
            title="Pausar Sessão"
            className="flex items-center justify-center gap-1.5 w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-lg text-sm font-medium transition-all active:scale-95 shrink-0 bg-[hsl(var(--warning)/0.15)] text-[hsl(var(--warning))] hover:bg-[hsl(var(--warning)/0.25)] border border-[hsl(var(--warning)/0.3)]"
          >
            <Pause className="w-3.5 h-3.5 sm:w-3 sm:h-3 fill-current shrink-0" />
            <span className="hidden sm:inline">Pausar</span>
          </button>
        )}

        {/* Botão Encerrar — SEMPRE visível (Regra 5 do principal.md) */}
        <button
          onClick={handleEncerrar}
          disabled={saving}
          title="Encerrar Sessão"
          className={cn(
            'flex items-center justify-center gap-1.5 w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-lg text-sm font-medium transition-all active:scale-95 shrink-0',
            'disabled:opacity-50',
            topicComplete
              ? 'bg-[hsl(var(--success))] text-white ring-2 ring-[hsl(var(--success)/0.4)] animate-pulse hover:brightness-110'
              : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
          )}
        >
          {saving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 sm:w-3 sm:h-3 animate-spin shrink-0" />
              <span className="hidden sm:inline">Salvando...</span>
            </>
          ) : (
            <>
              <Square className="w-3.5 h-3.5 sm:w-3 sm:h-3 fill-current shrink-0" />
              <span className="hidden sm:inline">Encerrar</span>
            </>
          )}
        </button>
      </header>

      <div className="flex-1 min-h-0">
        <Workspace materia={materiaConfig}>
          <ChatWindow
            key={sessionKey}
            materia={materiaConfig}
            ultimaSessao={ultimaSessao}
            onMessagesChange={handleMessagesChange}
            onTopicComplete={handleTopicComplete}
            sessionKey={sessionKey}
            initialMessages={resumeKey ? resumeMessages || undefined : undefined}
            historyMessages={!resumeKey && historyMessages && historyMessages.length > 0 ? historyMessages : undefined}
            sub={sub}
            modo={modo}
            ementaConcluida={ementaConcluida}
            sessoesRecentes={sessoesRecentes || []}
          />
        </Workspace>
      </div>
    </div>
  );
}
