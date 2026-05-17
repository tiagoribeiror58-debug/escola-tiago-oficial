import { useState, useEffect } from 'react';
import { useFolhasEstado, useSessoes, calcularOfensiva, useEmentaConcluida } from '@/hooks/useSessoes';
import { useMateriasFoco } from '@/hooks/useMateriasFoco';
import { useMateriasFixadas } from '@/hooks/useMateriasFixadas';
import MateriaCard from '@/components/MateriaCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Library, Flame, Play } from 'lucide-react';
import { MateriaEstado } from '@/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import MateriaDetailModal from '@/components/MateriaDetailModal';
import { Search, History } from 'lucide-react';
import { HistoricoGlobalDrawer } from '@/components/HistoricoGlobalDrawer';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia, Tiago';
  if (h < 18) return 'Boa tarde, Tiago';
  return 'Boa noite, Tiago';
}

export default function Index() {
  const { estados, isLoading } = useFolhasEstado();
  const { foco } = useMateriasFoco();
  const { data: sessoes } = useSessoes();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const ofensiva = sessoes ? calcularOfensiva(sessoes) : 0;
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<MateriaEstado | null>(null);
  const [isHistoricoOpen, setIsHistoricoOpen] = useState(false);

  const { fixadas, toggleFixada, isFixada } = useMateriasFixadas();
  
  const [expandedMesa, setExpandedMesa] = useState(false);

  const estadosFocados = foco.length > 0 
    ? estados.filter(e => foco.includes(e.config.slug))
    : [];

  // Ordenação: 1º Fixadas, 2º Mais acessadas (totalSessoes), 3º Recência
  const displayedEstados = [...estadosFocados].sort((a, b) => {
    const aFix = isFixada(a.config.slug);
    const bFix = isFixada(b.config.slug);
    if (aFix && !bFix) return -1;
    if (!aFix && bFix) return 1;

    if (b.totalSessoes !== a.totalSessoes) {
      return b.totalSessoes - a.totalSessoes;
    }

    const dataA = a.ultimaSessao ? new Date(a.ultimaSessao.data).getTime() : 0;
    const dataB = b.ultimaSessao ? new Date(b.ultimaSessao.data).getTime() : 0;
    return dataB - dataA;
  });

  const limit = 4;
  const visibleEstados = expandedMesa ? displayedEstados : displayedEstados.slice(0, limit);

  const handleCardClick = (estado: MateriaEstado) => {
    if (estado.config.isCategory) {
      navigate(`/categoria/${estado.config.slug}`);
      return;
    }
    setSelectedEstado(estado);
    setModalOpen(true);
  };

  // Reabre o modal automaticamente se vier do redirecionamento de sessão encerrada/pausada
  const openMateriaParam = searchParams.get('materia');

  useEffect(() => {
    if (openMateriaParam && !isLoading && estados.length > 0) {
      const estadoParaAbrir = estados.find(e => e.config.slug === openMateriaParam);
      if (estadoParaAbrir) {
        setSelectedEstado(estadoParaAbrir);
        setModalOpen(true);
      }
      // Limpa a URL para não reabrir se recarregar a página
      searchParams.delete('materia');
      setSearchParams(searchParams, { replace: true });
    }
  }, [openMateriaParam, isLoading, estados, searchParams, setSearchParams]);



  const [searchQuery, setSearchQuery] = useState('');

  const normalizeString = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const searchResults = searchQuery.trim().length > 0
    ? estados.map(e => {
        const query = normalizeString(searchQuery);
        const matchesNome = normalizeString(e.config.nome).includes(query);
        const matchesDescricao = e.config.descricao ? normalizeString(e.config.descricao).includes(query) : false;
        
        let matchedTopics: string[] = [];
        if (e.config.ementa) {
          matchedTopics = [...matchedTopics, ...e.config.ementa.filter(t => normalizeString(t).includes(query))];
        }
        if (e.config.fases) {
          e.config.fases.forEach(f => {
            if (f.topicos) {
              matchedTopics = [...matchedTopics, ...f.topicos.filter(t => normalizeString(t).includes(query))];
            }
          });
        }
        
        const isMatch = matchesNome || matchesDescricao || matchedTopics.length > 0;
        return isMatch ? { estado: e, matchedTopics } : null;
      }).filter(Boolean) as { estado: MateriaEstado, matchedTopics: string[] }[]
    : [];

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header com Saudação e Ofensiva */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{getGreeting()}</h1>
            <p className="text-sm text-muted-foreground mt-0.5 capitalize">{hoje}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Botão do Histórico */}
            <button
              onClick={() => setIsHistoricoOpen(true)}
              className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border bg-card hover:bg-muted border-border text-muted-foreground hover:text-foreground text-xs font-medium transition-all shadow-sm"
            >
              <History className="w-3.5 h-3.5" />
              Histórico
            </button>

            {/* Atalho Ofensiva */}
            <div className={cn(
              "flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all shadow-sm",
              ofensiva > 0 
                ? "bg-[hsl(var(--warning)/0.1)] border-[hsl(var(--warning)/0.3)] text-[hsl(var(--warning))]" 
                : "bg-card border-border text-muted-foreground"
            )}>
              <Flame className={cn("w-3.5 h-3.5", ofensiva > 0 && "animate-pulse")} />
              {ofensiva} {ofensiva === 1 ? 'dia' : 'dias'}
            </div>

          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="O que você quer estudar agora?..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-card border border-border/50 rounded-2xl text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all shadow-sm"
          />
        </div>

        {searchQuery.trim().length > 0 ? (
          <div className="space-y-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">
              Resultados da busca ({searchResults.length})
            </h3>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {searchResults.map(result => (
                  <div key={result.estado.config.slug} className="flex flex-col gap-1">
                    <MateriaCard
                      estado={result.estado}
                      onClick={() => handleCardClick(result.estado)}
                    />
                    {result.matchedTopics.length > 0 && (
                      <div className="ml-2 pl-2 border-l-2 border-border text-[11px] text-muted-foreground mt-1 space-y-1">
                        {result.matchedTopics.slice(0, 3).map((topic, i) => (
                          <div key={i} className="line-clamp-1 flex items-center gap-1.5 opacity-80">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/50 shrink-0" />
                            {topic}
                          </div>
                        ))}
                        {result.matchedTopics.length > 3 && (
                          <div className="text-[10px] text-muted-foreground/50 italic pl-2.5">
                            +{result.matchedTopics.length - 3} tópicos
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground bg-muted/30 rounded-2xl border border-dashed border-border/50">
                Nenhuma matéria encontrada com esse nome.
              </div>
            )}
          </div>
        ) : !isLoading && foco.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 mt-12 border border-dashed rounded-[2rem] bg-card">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
              <Library className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Mesa de estudos vazia</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-8">
              Sua tela inicial é restrita para evitar paralisia por análise. Vá até a biblioteca e escolha no que focar agora.
            </p>
            <button
              onClick={() => navigate('/biblioteca')}
              className="bg-foreground text-background px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-foreground/10 flex items-center gap-2"
            >
              <Library className="w-4 h-4" />
              Explorar Biblioteca
            </button>
          </div>
        ) : (
          <>
        {/* Separador de Outras Disciplinas (se necessário, agora pode ser o título principal do grid) */}
        {!isLoading && displayedEstados.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Sua Mesa de Estudos
            </h3>
          </div>
        )}

        {/* Grid Residual */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {visibleEstados.map(estado => (
              <MateriaCard
                key={estado.config.slug}
                estado={estado}
                onClick={() => handleCardClick(estado)}
                isPinned={isFixada(estado.config.slug)}
                onTogglePin={(e) => {
                  e.stopPropagation();
                  toggleFixada(estado.config.slug);
                }}
              />
            ))}
          </div>
        )}

        {!isLoading && displayedEstados.length > limit && (
          <button
            onClick={() => setExpandedMesa(!expandedMesa)}
            className="w-full mb-8 py-3 rounded-xl text-[12px] font-medium text-muted-foreground bg-muted/20 hover:bg-muted/50 transition-colors"
          >
            {expandedMesa ? 'Ver menos' : `Ver todas as ${displayedEstados.length} matérias do foco`}
          </button>
        )}

        {!isLoading && (
          <button
            onClick={() => navigate('/biblioteca')}
            className="w-full mb-12 py-4 px-4 rounded-xl text-[13px] font-medium text-muted-foreground border border-dashed hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <Library className="w-4 h-4" />
            Gerenciar Foco na Biblioteca
          </button>
        )}


        </>
        )}
      </div>

      <MateriaDetailModal 
        estado={selectedEstado} 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />

      <HistoricoGlobalDrawer
        open={isHistoricoOpen}
        onOpenChange={setIsHistoricoOpen}
      />
    </div>
  );
}
