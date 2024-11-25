import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function Start() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Enigma Duel</h1>
        <p className="text-muted-foreground">A two-player card game of mystery and strategy</p>
        
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-48"
            onClick={() => setLocation('/game')}
          >
            New Game
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-48"
            onClick={() => setLocation('/settings')}
          >
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
