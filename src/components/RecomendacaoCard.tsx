import { Target, AlertTriangle, Flame, BrainCircuit, Sparkles, ArrowRight } from 'lucide-react';
import { Recomendacao } from '@/hooks/useRecomendacao';

interface RecomendacaoCardProps {
  recomendacao: Recomendacao;
  onClick: () => void;
}

export function RecomendacaoCard({ recomendacao, onClick }: RecomendacaoCardProps) {
  if (!recomendacao.estado) return null;

  const getEstilo = () => {
    switch (recomendacao.tipo) {
      case 'ATRASADA':
        return {
          bg: 'bg-red-500/5 hover:bg-red-500/10 border-red-500/20',
          iconColor: 'text-red-500',
          buttonColor: 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20',
          Icon: AlertTriangle,
          label: 'Risco de Esquecimento'
        };
      case 'BAIXA_RETENCAO':
        return {
          bg: 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/20',
          iconColor: 'text-amber-500',
          buttonColor: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20',
          Icon: BrainCircuit,
          label: 'Foco na Lacuna'
        };
      case 'ESFRIANDO':
        return {
          bg: 'bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/20',
          iconColor: 'text-blue-500',
          buttonColor: 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20',
          Icon: Flame,
          label: 'Perdendo Inércia'
        };
      case 'FRESCO':
      default:
        return {
          bg: 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20',
          iconColor: 'text-emerald-500',
          buttonColor: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20',
          Icon: Sparkles,
          label: 'Otimizado'
        };
    }
  };

  const estilo = getEstilo();
  const { Icon } = estilo;

  return (
    <div className={`mb-8 p-5 sm:p-6 rounded-3xl border ${estilo.bg} transition-all duration-300 relative overflow-hidden group shadow-sm`}>
      {/* Background decoration */}
      <div className={`absolute -right-8 -top-8 sm:-right-12 sm:-top-12 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 ${estilo.iconColor}`}>
        <Target className="w-40 h-40 sm:w-48 sm:h-48" />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-background/80 border border-border/50 backdrop-blur-sm shrink-0 shadow-sm ${estilo.iconColor}`}>
             <span className="text-2xl sm:text-3xl drop-shadow-sm">{recomendacao.estado.config.emoji}</span>
          </div>
          
          <div className="space-y-1 sm:space-y-1.5 mt-0.5">
            <div className="flex items-center gap-2">
              <Icon className={`w-3.5 h-3.5 ${estilo.iconColor}`} />
              <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${estilo.iconColor}`}>
                {estilo.label} • Diagnóstico Racional
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight tracking-tight">
              {recomendacao.estado.config.nome}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-foreground/70 leading-relaxed max-w-lg">
              {recomendacao.motivo}
            </p>
          </div>
        </div>

        <button
          onClick={onClick}
          className={`flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-lg shrink-0 w-full sm:w-auto mt-2 sm:mt-0 ${estilo.buttonColor}`}
        >
          Resolver Isso Agora
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
