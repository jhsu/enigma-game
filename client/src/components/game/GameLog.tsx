import { ScrollArea } from "@/components/ui/scroll-area";

interface GameLogProps {
  logs: string[];
}

export function GameLog({ logs }: GameLogProps) {
  return (
    <ScrollArea className="h-full w-full bg-muted/20 rounded-lg p-4">
      <div className="space-y-2">
        {logs.map((log, index) => (
          <div key={index} className="text-sm text-muted-foreground">
            {log}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
