import { useMateriasEstado, useSessoes } from '@/hooks/useSessoes';
import MateriaCard from '@/components/MateriaCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Flame, Target } from 'lucide-react';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia, Tiago';
  if (h < 18) return 'Boa tarde, Tiago';
  return 'Boa noite, Tiago';
}

function calcStreak(sessoes: { data: string }[]): number {
  if (!sessoes.length) return 0;
  const uniqueDays = [...new Set(sessoes.map(s => s.data))].sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (uniqueDays[0] !== today && uniqueDays[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = new Date(uniqueDays[i - 1]);
    const curr = new Date(uniqueDays[i]);
    const diff = (prev.getTime() - curr.getTime()) / 86400000;
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export default function Index() {
  const { estados, isLoading } = useMateriasEstado();
  const { data: sessoes } = useSessoes();

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const totalSessoes = sessoes?.length || 0;
  const streak = calcStreak(sessoes || []);
  const materiasAtivas = estados.filter(e => e.totalSessoes > 0).length;

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight">{getGreeting()}</h1>
          <p className="text-sm text-muted-foreground mt-0.5 capitalize">{hoje}</p>
        </div>

        {/* Stats */}
        {totalSessoes > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="flex items-center gap-2.5 rounded-xl bg-muted/50 px-4 py-3">
              <Flame className="w-4 h-4 text-orange-500" />
              <div>
                <p className="text-lg font-semibold leading-none">{streak}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">dias seguidos</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-muted/50 px-4 py-3">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-lg font-semibold leading-none">{totalSessoes}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">sessões</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-muted/50 px-4 py-3">
              <Target className="w-4 h-4 text-emerald-500" />
              <div>
                <p className="text-lg font-semibold leading-none">{materiasAtivas}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">matérias</p>
              </div>
            </div>
          </div>
        )}

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
