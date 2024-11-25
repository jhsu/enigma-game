import { Card } from './Card';
import { Player } from '@/types/game';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PlayerHandProps {
  player: Player;
  isActive: boolean;
  onCardPlay?: (cardId: string) => void;
}

export function PlayerHand({ player, isActive, onCardPlay }: PlayerHandProps) {
  return (
    <div className={cn(
      "w-full p-4 transition-all",
      isActive && "bg-primary/5 rounded-lg border border-primary/20"
    )}>
      <ScrollArea className="w-full">
        <div className="flex gap-4 min-h-[300px] items-center">
          {player.hand.map((card) => (
            <Card
              key={card.id}
              card={card}
              disabled={!isActive}
              onClick={() => onCardPlay?.(card.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
