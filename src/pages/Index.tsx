import { useMateriasEstado } from '@/hooks/useSessoes';
import MateriaCard from '@/components/MateriaCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Index() {
  const { estados, isLoading } = useMateriasEstado();

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight">Escola do Tiago</h1>
          <p className="text-sm text-muted-foreground mt-0.5 capitalize">{hoje}</p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {estados.map(estado => (
              <MateriaCard key={estado.config.slug} estado={estado} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
