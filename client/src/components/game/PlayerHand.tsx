import { Card } from './Card';
import { Player } from '@/types/game';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PlayerHandProps {
  player: Player;
  isActive: boolean;
  onCardPlay?: (cardId: string) => void;
}

export function PlayerHand({ player, isActive, onCardPlay }: PlayerHandProps) {
  return (
    <div className="w-full p-4">
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
