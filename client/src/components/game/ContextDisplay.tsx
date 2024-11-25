import { GameContext } from '@/types/game';
import { Card } from '@/components/ui/card';

interface ContextDisplayProps {
  context: GameContext;
}

export function ContextDisplay({ context }: ContextDisplayProps) {
  return (
    <Card className="p-4 bg-secondary/10">
      <h2 className="text-xl font-bold text-center mb-2">{context.name}</h2>
      <p className="text-sm text-muted-foreground text-center">{context.description}</p>
      <div className="mt-4 flex gap-4 justify-center text-sm">
        <div>
          <span className="text-destructive">Damage: </span>
          <span>x{context.effects.damageModifier}</span>
        </div>
        <div>
          <span className="text-green-500">Healing: </span>
          <span>x{context.effects.healingModifier}</span>
        </div>
      </div>
    </Card>
  );
}
