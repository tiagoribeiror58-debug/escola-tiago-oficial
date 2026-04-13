import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMateriaBySlug } from '@/lib/materias';
import { useUltimaSessao } from '@/hooks/useSessoes';
import ChatWindow from '@/components/ChatWindow';
import ContextCard from '@/components/ContextCard';
import EncerramentoModal from '@/components/EncerramentoModal';
import { ArrowLeft, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sessao() {
  const { materia: slug } = useParams<{ materia: string }>();
  const navigate = useNavigate();
  const materiaConfig = getMateriaBySlug(slug || '');
  const { data: ultimaSessao, isLoading } = useUltimaSessao(slug || '');
  const [showEncerramento, setShowEncerramento] = useState(false);

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
      {/* Header */}
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
          onClick={() => setShowEncerramento(true)}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
            'bg-foreground text-background',
            'hover:opacity-90 transition-opacity'
          )}
        >
          <Square className="w-3 h-3 fill-current" />
          Encerrar
        </button>
      </header>

      {/* Context */}
      <div className="px-4 pt-3">
        <ContextCard ultimaSessao={ultimaSessao} />
      </div>

      {/* Chat */}
      <div className="flex-1 min-h-0">
        <ChatWindow materia={materiaConfig} ultimaSessao={ultimaSessao} />
      </div>

      {/* Modal */}
      <EncerramentoModal
        materia={materiaConfig}
        nivelAtual={ultimaSessao?.nivel || 1}
        open={showEncerramento}
        onClose={() => setShowEncerramento(false)}
      />
    </div>
  );
}
