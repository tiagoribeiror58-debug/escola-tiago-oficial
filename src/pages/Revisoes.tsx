import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFolhasEstado, useSessoes, useTodasEmentasConcluidas } from '@/hooks/useSessoes';
import { MateriaEstado } from '@/types';
import { BookOpen, CalendarCheck, Clock, ChevronDown, ChevronUp, Zap, ArrowLeft, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playPopSound } from '@/lib/audioUtils';
import { useFloatingChat } from '@/contexts/FloatingChatContext';

// Curva de esquecimento (dias)
const REVISION_INTERVALS = [1, 7, 14, 30, 60];

function calcularStatusRevisao(dataUltimaSessao: string) {
  const ultima = new Date(dataUltimaSessao);
  ultima.setHours(0, 0, 0, 0);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  const diffDays = Math.floor((hoje.getTime() - ultima.getTime()) / (1000 * 60 * 60 * 24));
  
  // Verifica se o diffDays é maior ou igual ao próximo intervalo que ainda não foi revisado
  // Simplificação: vamos apenas destacar se bate exatamente com um dos intervalos (ou passou dele um pouco)
  // Para ser mais preciso: se diffDays estiver em um dos intervalos, é hora de revisar.
  const isDue = REVISION_INTERVALS.some(interval => diffDays >= interval && diffDays <= interval + 2);
  
  return {
    diffDays,
    isDue,
  };
}

function RevisaoMateriaCard({ 
  estado, 
  topicosConcluidos, 
  sessoesMateria 
}: { 
  estado: MateriaEstado; 
  topicosConcluidos: string[];
  sessoesMateria: any[];
}) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { openChat } = useFloatingChat();

  // Mapeia tópicos concluídos para seus status de revisão
  const topicosComStatus = topicosConcluidos.map(topico => {
    // Acha a sessão mais recente deste tópico
    const sessoesDesteTopico = sessoesMateria.filter(s => {
      const t1 = s.topico.toLowerCase().trim();
      const t2 = topico.toLowerCase().trim();
      return t1.includes(t2) || t2.includes(t1);
    });
    
    let isDue = false;
    let diffDays = 0;
    
    if (sessoesDesteTopico.length > 0) {
      // Ordena por data mais recente
      sessoesDesteTopico.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      const ultimaSessao = sessoesDesteTopico[0];
      const status = calcularStatusRevisao(ultimaSessao.data);
      isDue = status.isDue;
      diffDays = status.diffDays;
    }

    return { topico, isDue, diffDays };
  });

  const dueCount = topicosComStatus.filter(t => t.isDue).length;

  return (
    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-border">
      <div 
        onClick={() => { playPopSound(); setExpanded(!expanded); }}
        className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center text-2xl shrink-0">
            {estado.config.emoji}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-[15px]">{estado.config.nome}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {topicosConcluidos.length} {topicosConcluidos.length === 1 ? 'tópico concluído' : 'tópicos concluídos'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {dueCount > 0 && (
            <div className="px-2 py-1 bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.3)] text-primary rounded-full text-[10px] font-bold tracking-wide uppercase flex items-center gap-1 animate-pulse">
              <Zap className="w-3 h-3" />
              {dueCount} {dueCount === 1 ? 'Revisão' : 'Revisões'}
            </div>
          )}
          {expanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border/50 bg-muted/5 p-4 space-y-2 animate-in fade-in slide-in-from-top-2">
          {topicosComStatus.map((t, i) => (
            <div 
              key={i}
              className={cn(
                "flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border transition-all",
                t.isDue ? "bg-blue-500/10 border-blue-500/30" : "bg-card border-border/50"
              )}
            >
              <div className="flex-1 min-w-0 pr-4 mb-3 sm:mb-0">
                <p className={cn(
                  "text-sm font-semibold leading-snug line-clamp-2",
                  t.isDue ? "text-blue-500" : "text-foreground"
                )}>
                  {t.topico}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                    {t.diffDays === 0 ? 'Estudado Hoje' : `Visto há ${t.diffDays} dias`}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    playPopSound();
                    openChat(estado.config.slug, t.topico);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95",
                    t.isDue 
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600" 
                      : "bg-foreground text-background hover:opacity-90 border border-border"
                  )}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {t.isDue ? 'Revisar no Widget' : 'Estudar no Widget'}
                </button>
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    playPopSound();
                    navigate(`/sessao/${estado.config.slug}?sub=${encodeURIComponent(t.topico)}&modo=revisao`);
                  }}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-2 transition-all active:scale-95",
                    t.isDue 
                      ? "text-blue-500 hover:bg-blue-500/10" 
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  Tela Cheia
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RevisoesPage() {
  const navigate = useNavigate();
  const { estados, isLoading: loadingEstados } = useFolhasEstado();
  const { data: todasEmentas, isLoading: loadingEmentas } = useTodasEmentasConcluidas();
  const { data: sessoes, isLoading: loadingSessoes } = useSessoes();

  const isLoading = loadingEstados || loadingEmentas || loadingSessoes;

  const [searchQuery, setSearchQuery] = useState('');

  // Filtra os estados para manter apenas os que possuem ao menos 1 tópico concluído
  const estadosComConcluidos = (estados || []).filter(estado => {
    return (todasEmentas || []).some(e => e.materia === estado.config.slug);
  });

  const normalizeString = (str: string) =>
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const query = normalizeString(searchQuery);

  const filteredData = estadosComConcluidos.map(estado => {
    const topicosMateria = (todasEmentas || [])
      .filter(e => e.materia === estado.config.slug)
      .map(e => e.topico);
    
    const sessoesMateria = (sessoes || []).filter(s => s.materia === estado.config.slug);

    const matchesSubject = normalizeString(estado.config.nome).includes(query);
    const matchedTopics = topicosMateria.filter(t => normalizeString(t).includes(query));

    if (!matchesSubject && matchedTopics.length === 0 && query.length > 0) {
      return null;
    }

    return {
      estado,
      topicosConcluidos: query.length > 0 && !matchesSubject ? matchedTopics : topicosMateria,
      sessoesMateria
    };
  }).filter(Boolean) as { estado: MateriaEstado, topicosConcluidos: string[], sessoesMateria: any[] }[];

  return (
    <div className="min-h-screen pb-24">
      {/* Header Fixo */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 text-primary shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Centro de Revisões</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Spaced Repetition & Active Recall</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        
        <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 mb-8">
          <h2 className="text-[13px] font-bold text-foreground mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Como funciona a Revisão?
          </h2>
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            Aqui estão apenas os tópicos que você já estudou. Em vez de reexplicar a matéria do zero, a Inteligência Artificial iniciará a sessão em <strong>Modo Revisão (Active Recall)</strong>: ela fará uma pergunta direta para testar a sua memória antes de te dar qualquer resposta.
          </p>
        </div>

        {/* Barra de Pesquisa */}
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar matéria ou tópico para revisar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-card border border-border/50 rounded-2xl text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all shadow-sm"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-sm text-muted-foreground animate-pulse">
            Carregando sua matriz de repetição espaçada...
          </div>
        ) : estadosComConcluidos.length === 0 ? (
          <div className="text-center py-20 border border-dashed rounded-3xl bg-muted/10">
            <CalendarCheck className="w-12 h-12 text-muted-foreground opacity-30 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Sua memória está limpa</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
              Você ainda não concluiu nenhum tópico nas matérias. As revisões aparecerão aqui automaticamente após o seu primeiro estudo.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-foreground text-background rounded-xl text-sm font-medium transition-all hover:opacity-90 active:scale-95"
            >
              Voltar para a Mesa
            </button>
          </div>
        ) : filteredData.length === 0 && searchQuery.length > 0 ? (
          <div className="text-center py-20 border border-dashed rounded-3xl bg-muted/10">
            <p className="text-sm text-muted-foreground">
              Nenhuma revisão encontrada para "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData.map(({ estado, topicosConcluidos, sessoesMateria }) => (
              <RevisaoMateriaCard
                key={estado.config.slug}
                estado={estado}
                topicosConcluidos={topicosConcluidos}
                sessoesMateria={sessoesMateria}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
