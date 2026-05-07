import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MATERIAS, getMateriaBySlug, calcularDiasParada, getAllLeafSlugs } from '@/lib/materias';
import { useSessoes, buildMateriaEstado } from '@/hooks/useSessoes';
import { MateriaConfig, MateriaEstado, Sessao } from '@/types';
import MateriaCard from '@/components/MateriaCard';
import MateriaDetailModal from '@/components/MateriaDetailModal';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

export default function Categoria() {
  const { slug, sub } = useParams<{ slug: string; sub?: string }>();
  const navigate = useNavigate();
  const { data: sessoes = [], isLoading } = useSessoes();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<MateriaEstado | null>(null);

  // Categoria raiz (nível 1)
  const categoriaRaiz = MATERIAS.find(m => m.slug === slug);

  // Determina filhos e breadcrumbs pelo nível atual
  let filhos: MateriaConfig[] = [];
  const breadcrumbs: { nome: string; slug: string }[] = [];

  if (categoriaRaiz) {
    breadcrumbs.push({ nome: categoriaRaiz.nome, slug: categoriaRaiz.slug });

    if (sub) {
      const subArea = categoriaRaiz.children?.find(c => c.slug === sub);
      if (subArea) {
        breadcrumbs.push({ nome: subArea.nome, slug: subArea.slug });
        filhos = subArea.children || [];
      }
    } else {
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

  if (!categoriaRaiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Categoria não encontrada.</p>
      </div>
    );
  }

  const tituloAtual = sub
    ? categoriaRaiz.children?.find(c => c.slug === sub)?.nome
    : categoriaRaiz.nome;

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            {breadcrumbs.map((b, i) => (
              <span key={b.slug} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <span className={i === breadcrumbs.length - 1 ? 'text-foreground font-semibold' : ''}>
                  {b.nome}
                </span>
              </span>
            ))}
          </div>

          <h1 className="text-xl font-semibold tracking-tight">{tituloAtual}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filhos.length} {filhos.length === 1 ? 'área disponível' : 'áreas disponíveis'}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filhos.map(config => (
              <MateriaCard
                key={config.slug}
                estado={buildMateriaEstado(config, sessoes)}
                onClick={() => handleCardClick(config)}
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
