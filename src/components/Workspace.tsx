import { MateriaConfig } from '@/types';

interface Props {
  materia: MateriaConfig;
  children: React.ReactNode; // O ChatWindow
}

export default function Workspace({ materia, children }: Props) {
  const layout = materia.layout || 'chat';

  // Layout Narrative: Chat centralizado e focado (estilo storytelling)
  if (layout === 'narrative') {
    return (
      <div className="h-full w-full bg-gradient-to-b from-background to-muted/20 overflow-hidden">
        <div className="h-full w-full max-w-2xl mx-auto px-4 md:px-0">
          {children}
        </div>
      </div>
    );
  }

  // Todos os outros layouts (split, canvas, chat) → Chat fullscreen.
  // Os widgets laterais foram desativados para simplificar a experiência.
  // Para reativar: restaurar os blocos 'split' e 'canvas' abaixo.
  return (
    <div className="h-full w-full overflow-hidden bg-background">
      {children}
    </div>
  );
}
