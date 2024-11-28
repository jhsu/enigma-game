import { Card } from "@/types/game";
import { cn } from "@/lib/utils";

interface PlayAreaProps {
  playedCards: Card[];
  lastPlayedCard?: Card;
}

export function PlayArea({ playedCards, lastPlayedCard }: PlayAreaProps) {
  return (
    <div className="flex items-center justify-center gap-4 p-4 min-h-[200px] bg-muted/10 rounded-lg">
      {playedCards.length === 0 ? (
        <div className="text-muted-foreground text-sm">No cards played yet</div>
      ) : (
        <div className="flex items-center gap-4 overflow-x-auto p-2">
          {playedCards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg border min-w-[150px] transition-all",
                card.id === lastPlayedCard?.id
                  ? "border-primary bg-primary/10 shadow-lg scale-110"
                  : "border-muted-foreground/20 bg-background"
              )}
            >
              <h3 className="font-semibold">{card.title}</h3>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                {card.metrics.map((metric, index) => (
                  <div key={index}>
                    {metric.type}: {metric.value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
