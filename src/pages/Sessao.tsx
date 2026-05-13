import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { getMateriaBySlug } from '@/lib/materias';
import { useUltimaSessao, useEmentaConcluida, useRecentSessoes } from '@/hooks/useSessoes';
import { useChatHistory, useSessionMessages } from '@/hooks/useChatMessages';
import ChatWindow from '@/components/ChatWindow';
import Workspace from '@/components/Workspace';

import { ArrowLeft, Square, Loader2 } from 'lucide-react';
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
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const resumeKey = searchParams.get('resume');
  const sub = searchParams.get('sub');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const materiaConfig = getMateriaBySlug(slug || '');
  const { data: ultimaSessao, isLoading } = useUltimaSessao(slug || '');
  const { data: ementaConcluidaData } = useEmentaConcluida(slug || '');
  const ementaConcluida = ementaConcluidaData || [];
  const { data: sessoesRecentes } = useRecentSessoes(slug || '', 6);
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

  const messagesRef = useRef<ChatMessage[]>([]);
  const startTimeRef = useRef(Date.now());
  const isSavingRef = useRef(false); // BUG-02: guard contra double-save
  const [saving, setSaving] = useState(false);
  const [topicComplete, setTopicComplete] = useState(false);
  const [continuandoAposConclusion, setContinuandoAposConclusion] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  // Timer em tempo real — incrementa a cada segundo desde o mount da sessão
  useEffect(() => {
    const id = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

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
        // BUGFIX: sessão curta NÃO copia proximo_topico para topico.
        // Antes: topico = proximo_topico, proximo_topico = proximo_topico → loop!
        // Agora: preserva o estado anterior intacto — nada mudou de fato.
        sessionData = {
          topico: ultimaSessao?.topico || 'Sessão curta',
          erros: 0,
          dificuldade: 'media',
          nivel: ultimaSessao?.nivel || 1,
          proximo_topico: ultimaSessao?.proximo_topico || '',
          decisao_proxima: 'A definir',
          observacoes: 'Sessão curta',
        };
      } else {
        // Passa a ementa e o tópico atual para que a edge function calcule
        // o proximo_topico de forma determinística (sem o Haiku ter que adivinhar)
        const ementaFlat = materiaConfig.fases
          ? materiaConfig.fases.flatMap(f => f.topicos)
          : (materiaConfig.ementa || []);
          
        let topicoAtualParaExtrair = ultimaSessao?.proximo_topico || ultimaSessao?.topico || '';
        
        // Usa a mesma lógica determinística do buildPrompt para saber qual foi o tópico DESTA sessão
        const resultadoDeterministico = resolverTopicoAtual(ementaFlat, ementaConcluida);
        const topicoDestaSessao = sub || (resultadoDeterministico ? resultadoDeterministico.topico : topicoAtualParaExtrair);

        sessionData = await extractSession(
          messages,
          slug!,
          ultimaSessao?.nivel || 1,
          ementaFlat,
          topicoDestaSessao
        );

        // GARANTIA: O tópico salvo no banco é estritamente o da ementa (evita que a IA modifique a string)
        sessionData.topico = topicoDestaSessao;
      }

      const validDificuldades = ['baixa', 'media', 'alta'];
      let dif = (sessionData.dificuldade || 'media').toLowerCase();
      if (dif === 'medio' || dif === 'média' || dif === 'médio') dif = 'media';
      if (!validDificuldades.includes(dif)) dif = 'media';

      // Snapshot das mensagens para guardar no banco
      const messagesSnapshot = messagesRef.current.map(({ role, content }) => ({ role, content }));

      // NOVO: Se a sessão foi concluída com sucesso (topicComplete), marca na ementa_concluida automaticamente!
      if (topicComplete && sessionData.topico) {
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
        is_mastery: modo === 'avaliacao' || modo === 'desafio', // marca se foi um Exame de Proficiência (ambos os caminhos: Avaliações e Hero Card)
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
      queryClient.invalidateQueries({ queryKey: ['ementa-concluida', slug] }); // garante que o progresso aparece imediatamente
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
  }, [slug, ultimaSessao, queryClient, sessionKey, resumeKey, modo, navigate]);

  const handleEncerrar = useCallback(() => {
    // Regra 5: botão sempre acessível. Se sessão não concluiu, pede confirmação.
    if (!topicComplete) {
      const ok = window.confirm('A sessão ainda não foi concluída pela IA. Encerrar mesmo assim?');
      if (!ok) return;
    }
    doEncerrar();
  }, [doEncerrar, topicComplete]);

  const handleMessagesChange = useCallback((messages: ChatMessage[]) => {
    messagesRef.current = messages;
    // Conta apenas mensagens de usuário e assistente (ignora system)
    setMessageCount(messages.filter(m => m.role !== 'system').length);
  }, []);

  const handleTopicComplete = useCallback(() => {
    setTopicComplete(true);
    setContinuandoAposConclusion(false);
  }, []);

  // Permite continuar conversando mesmo após a IA emitir session_done
  const handleContinuarConversando = useCallback(() => {
    setContinuandoAposConclusion(true);
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

        {/* Timer — visível após primeira mensagem */}
        {messageCount > 0 && (
          <span className="text-[11px] font-mono text-muted-foreground tabular-nums shrink-0">
            {formatTimer(elapsedSeconds)}
          </span>
        )}

        {/* Botão "Continuar conversando" — aparece após session_done, antes de encerrar */}
        {topicComplete && !continuandoAposConclusion && (
          <button
            onClick={handleContinuarConversando}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all active:scale-95 shrink-0 bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
          >
            Continuar
          </button>
        )}

        {/* Botão Encerrar — SEMPRE visível (Regra 5 do principal.md) */}
        <button
          onClick={handleEncerrar}
          disabled={saving}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all active:scale-95 shrink-0',
            'disabled:opacity-50',
            topicComplete && !continuandoAposConclusion
              ? 'bg-[hsl(var(--success))] text-white ring-2 ring-[hsl(var(--success)/0.4)] animate-pulse hover:brightness-110'
              : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
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
