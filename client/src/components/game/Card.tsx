import { Card as CardType } from '@/types/game';
import { Card as ShadcnCard } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  disabled?: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
  return (
    <ShadcnCard
      className={cn(
        "w-[200px] h-[280px] p-4 cursor-pointer transition-all hover:scale-105",
        disabled && "opacity-50 cursor-not-allowed",
        "bg-card border-2 border-primary/20"
      )}
      onClick={() => !disabled && onClick?.()}
    >
      <div className="text-center border-b border-primary/20 pb-2 mb-4">
        <h3 className="text-lg font-bold">{card.title}</h3>
      </div>
      
      <div className="space-y-4">
        {card.metrics.map((metric, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{metric.type}</span>
            <span className="font-medium">{metric.value}</span>
          </div>
        ))}
      </div>
    </ShadcnCard>
  );
}
