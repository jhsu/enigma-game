import { GamePhase } from '@/types/game';
import { Badge } from '@/components/ui/badge';

interface PhaseIndicatorProps {
  phase: GamePhase;
}

export function PhaseIndicator({ phase }: PhaseIndicatorProps) {
  const getPhaseColor = (phase: GamePhase) => {
    switch (phase) {
      case 'draw': return 'bg-blue-500';
      case 'main': return 'bg-green-500';
      case 'resolution': return 'bg-yellow-500';
      case 'end': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Badge className={`${getPhaseColor(phase)} text-white`}>
      {phase.charAt(0).toUpperCase() + phase.slice(1)} Phase
    </Badge>
  );
}
