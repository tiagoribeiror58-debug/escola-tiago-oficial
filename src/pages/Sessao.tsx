import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { getMateriaBySlug } from '@/lib/materias';
import { useUltimaSessao } from '@/hooks/useSessoes';
import { useChatHistory } from '@/hooks/useChatMessages';
import ChatWindow from '@/components/ChatWindow';


import { ArrowLeft, Square, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { extractSession } from '@/lib/extractSession';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function Sessao() {
  const { materia: slug } = useParams<{ materia: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const resumeKey = searchParams.get('resume');
  const mode = searchParams.get('mode') as 'estudar' | 'revisar' | null;
  const sub = searchParams.get('sub');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const materiaConfig = getMateriaBySlug(slug || '');
  const { data: ultimaSessao, isLoading } = useUltimaSessao(slug || '');
  const { data: resumeMessages, isLoading: loadingResume } = useChatHistory(slug || '', resumeKey);

  const sessionKey = useMemo(() => {
    if (resumeKey) return resumeKey;
    return `${slug}-${Date.now()}`;
  }, [slug, resumeKey, location.key]);

  const messagesRef = useRef<ChatMessage[]>([]);
  const startTimeRef = useRef(Date.now());
  const [saving, setSaving] = useState(false);
  const [showSuccessMenu, setShowSuccessMenu] = useState(false);

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

  const handleEncerrar = useCallback(async () => {
    if (resumeKey) {
      setShowSuccessMenu(true);
      return;
    }

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
          observacoes: 'Sessão curta — dados insuficientes para extração automática',
        };
      } else {
        sessionData = await extractSession(messages, slug!, ultimaSessao?.nivel || 1);
      }

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
        duracao_min: duracaoMin > 0 ? duracaoMin : 1,
        session_key: sessionKey,
      });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['sessoes'] });
      queryClient.invalidateQueries({ queryKey: ['chat-sessions', slug] });
      toast.success('Sessão salva ✓');
      setSaving(false);
      setShowSuccessMenu(true);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar — tente novamente');
      setSaving(false);
    }
  }, [slug, ultimaSessao, queryClient, navigate, sessionKey]);

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

  if (isLoading || (resumeKey && loadingResume)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col relative">
      {/* Success Modal Overlay */}
      {showSuccessMenu && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xl max-w-[320px] w-full space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Sessão Encerrada!</h3>
              <p className="text-sm text-muted-foreground">O que você deseja fazer agora?</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowSuccessMenu(false);
                  navigate(`/sessao/${slug}`);
                }}
                className="w-full bg-foreground text-background py-2.5 rounded-lg font-medium hover:opacity-90 active:scale-95 transition-all text-sm"
              >
                Começar Nova Sessão
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-muted text-muted-foreground py-2.5 rounded-lg font-medium hover:bg-muted/80 active:scale-95 transition-all text-sm"
              >
                Voltar ao Menu Principal
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button
          onClick={() => {
            if (messagesRef.current.length > 2 && !saving) {
              // Messages are already persisted, just go back
              navigate('/');
              return;
            }
            navigate('/');
          }}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-lg">{materiaConfig.emoji}</span>
          <span className="text-sm font-medium truncate">{materiaConfig.nome}</span>
          {resumeKey && (
            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              continuando
            </span>
          )}
        </div>
        <button
          onClick={handleEncerrar}
          disabled={saving}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
            'bg-foreground text-background',
            'hover:opacity-90 transition-all active:scale-95',
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




      <div className="flex-1 min-h-0">
        <ChatWindow
          key={sessionKey}
          materia={materiaConfig}
          ultimaSessao={ultimaSessao}
          onMessagesChange={handleMessagesChange}
          sessionKey={sessionKey}
          initialMessages={resumeKey ? resumeMessages || undefined : undefined}
          mode={mode}
          sub={sub}
        />
      </div>
    </div>
  );
}
