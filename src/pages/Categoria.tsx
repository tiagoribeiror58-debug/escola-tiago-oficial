import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MATERIAS, calcularDiasParada, getAllLeafSlugs } from '@/lib/materias';
import { useSessoes, buildMateriaEstado } from '@/hooks/useSessoes';
import { MateriaConfig, MateriaEstado } from '@/types';
import MateriaCard from '@/components/MateriaCard';
import MateriaDetailModal from '@/components/MateriaDetailModal';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Categoria() {
  const { slug, sub } = useParams<{ slug: string; sub?: string }>();
  const navigate = useNavigate();
  const { data: sessoes = [], isLoading } = useSessoes();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<MateriaEstado | null>(null);

  const categoriaRaiz = MATERIAS.find(m => m.slug === slug);

  let filhos: MateriaConfig[] = [];
  const breadcrumbs: { nome: string; slug: string }[] = [];
  let categoriaAtual: MateriaConfig | null = null;

  if (categoriaRaiz) {
    breadcrumbs.push({ nome: categoriaRaiz.nome, slug: categoriaRaiz.slug });

    if (sub) {
      const subArea = categoriaRaiz.children?.find(c => c.slug === sub);
      if (subArea) {
        categoriaAtual = subArea;
        breadcrumbs.push({ nome: subArea.nome, slug: subArea.slug });
        filhos = subArea.children || [];
      }
    } else {
      categoriaAtual = categoriaRaiz;
      filhos = categoriaRaiz.children || [];
    }
  }

  const handleCardClick = (config: MateriaConfig) => {
    if (config.isCategory) {
      navigate(`/categoria/${slug}/${config.slug}`);
      return;
    }
    setSelectedEstado(buildMateriaEstado(config, sessoes));
    setModalOpen(true);
  };

  const handleBack = () => {
    if (sub) navigate(`/categoria/${slug}`);
    else navigate('/');
  };

  if (!categoriaRaiz || !categoriaAtual) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Categoria não encontrada.</p>
      </div>
    );
  }

  const contarFolhas = (configs: MateriaConfig[]): number =>
    configs.reduce((acc, c) => acc + (c.isCategory ? contarFolhas(c.children || []) : 1), 0);

  const totalMaterias = contarFolhas(filhos);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">

        {/* Navegação */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            {breadcrumbs.map((b, i) => (
              <span key={b.slug} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                <span
                  className={cn(
                    i === breadcrumbs.length - 1
                      ? 'text-foreground font-medium'
                      : 'hover:text-foreground cursor-pointer transition-colors'
                  )}
                  onClick={() => i < breadcrumbs.length - 1 && navigate(`/categoria/${b.slug}`)}
                >
                  {b.nome}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Hero do Hub */}
        <div className="mb-10 relative overflow-hidden rounded-[2rem] border border-border/50 bg-gradient-to-b from-card to-background p-7 sm:p-10 shadow-xl">
          <div className="absolute inset-0 bg-foreground/[0.03] blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Título */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-foreground/[0.06] border border-border/40 flex items-center justify-center text-2xl shrink-0">
                {categoriaAtual.emoji}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                  {categoriaAtual.nome}
                </h1>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {totalMaterias} {totalMaterias === 1 ? 'matéria' : 'matérias'}
                  </span>
                  <span>·</span>
                  <span>{filhos.length} {filhos.length === 1 ? 'área' : 'áreas'}</span>
                </div>
              </div>
            </div>

            {/* Descrição */}
            {categoriaAtual.descricao && (
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6">
                {categoriaAtual.descricao}
              </p>
            )}

            {/* Por que estudar (whyStart) */}
            {categoriaAtual.whyStart && (
              <div className="rounded-xl bg-foreground/[0.04] border border-border/40 p-4 mb-6">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Por que estudar isso
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {categoriaAtual.whyStart}
                </p>
              </div>
            )}


          </div>
        </div>

        {/* Grid de cards clicáveis */}
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Escolha uma área para começar
        </h3>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filhos.map((config, index) => (
              <MateriaCard
                key={config.slug}
                estado={buildMateriaEstado(config, sessoes)}
                onClick={() => handleCardClick(config)}
                ordem={index + 1}
              />
            ))}
          </div>
        )}
      </div>

      <MateriaDetailModal
        estado={selectedEstado}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
