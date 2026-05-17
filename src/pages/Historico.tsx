import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSessoes } from '@/hooks/useSessoes';
import { getMateriaBySlug } from '@/lib/materias';
import { ChatMessage } from '@/types';
import { ArrowLeft, Clock, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';



export default function Historico() {
  const { materia: slug } = useParams<{ materia: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { data: sessoes, isLoading } = useSessoes();
  const materiaConfig = getMateriaBySlug(slug || '');

  if (!materiaConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Matéria não encontrada.</p>
      </div>
    );
  }

  const normalizeString = (str: string) =>
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const sessoesMateria = (sessoes || [])
    .filter(s => s.materia === slug)
    .filter(s => {
      if (!searchQuery.trim()) return true;
      const query = normalizeString(searchQuery);
      return normalizeString(s.topico).includes(query);
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at ? (a.created_at.endsWith('Z') || a.created_at.includes('+') ? a.created_at : a.created_at + 'Z') : a.data);
      const dateB = new Date(b.created_at ? (b.created_at.endsWith('Z') || b.created_at.includes('+') ? b.created_at : b.created_at + 'Z') : b.data);
      return dateB.getTime() - dateA.getTime();
    });

  const parseDateUTCtoLocal = (dateStr: string) => {
    if (!dateStr) return new Date();
    // Se a data do supabase não tiver Z, forçamos o Z para que o JS entenda como UTC.
    const isoStr = dateStr.endsWith('Z') || dateStr.includes('+') ? dateStr : dateStr + 'Z';
    return new Date(isoStr);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center gap-3 px-4 py-4 border-b border-border bg-card sticky top-0 z-10">
        <button
          onClick={() => navigate('/')}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-semibold flex items-center gap-2">
            <span className="text-xl leading-none">{materiaConfig.emoji}</span>
            {materiaConfig.nome}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {sessoesMateria.length} {sessoesMateria.length === 1 ? 'sessão' : 'sessões'}
          </p>
        </div>
      </header>

      <div className="flex-1 p-4 max-w-2xl mx-auto w-full flex flex-col gap-4">
        {/* Barra de Pesquisa do Histórico */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar tópico no histórico..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all shadow-sm"
          />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          </div>
        ) : sessoesMateria.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
            <Clock className="w-8 h-8 mb-3 opacity-20" />
            <p>Nenhuma sessão salva ainda.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessoesMateria.map((sessao) => {
              const hasChat = !!sessao.session_key;
              return (
                <div
                  key={sessao.id}
                  className="bg-card border border-border rounded-xl overflow-hidden transition-colors hover:border-foreground/20"
                >
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-foreground">{sessao.topico}</h3>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">
                          {format(parseDateUTCtoLocal(sessao.created_at || sessao.data), "eeee, d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                      {hasChat && sessao.session_key && (
                        <button
                          onClick={() => navigate(`/sessao/${slug}?resume=${sessao.session_key}`)}
                          className="flex items-center gap-1.5 text-xs font-medium text-foreground hover:bg-foreground hover:text-background border border-foreground bg-transparent px-3 py-1.5 rounded-lg transition-colors shrink-0"
                        >
                          Retomar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
