import { useState, useEffect } from 'react';
import { GameBoard } from '@/components/game/GameBoard';
import { initializeGame, drawCard, playCard, endTurn, checkWinCondition } from '@/lib/gameLogic';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function Game() {
  const [gameState, setGameState] = useState(initializeGame());
  const [logs, setLogs] = useState<string[]>([]);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (checkWinCondition(gameState)) {
      const winner = gameState.players.findIndex(p => p.lifePoints > 0) + 1;
      toast({
        title: "Game Over!",
        description: `Player ${winner} wins!`,
      });
      setLogs(prev => [...prev, `Game Over! Player ${winner} wins!`]);
    }
  }, [gameState]);

  // Handle draw phase
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (gameState.currentPhase === 'draw') {
      timeout = setTimeout(() => {
        setGameState(prevState => {
          const newState = drawCard(prevState);
          toast({
            title: "Card Drawn",
            description: `Player ${newState.activePlayer + 1} drew a card`,
          });
          setLogs(prev => [...prev, `Player ${newState.activePlayer + 1} drew a card`]);
          return newState;
        });
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [gameState.activePlayer]);

  const handlePlayCard = (cardId: string) => {
    setGameState(prevState => {
      const card = prevState.players[prevState.activePlayer].hand.find(c => c.id === cardId);
      const newState = playCard(prevState, cardId);
      setLogs(prev => [...prev, `Player ${prevState.activePlayer + 1} played ${card?.title}`]);
      
      // Log the effect of the card
      const damageMetric = card?.metrics.find(m => m.type === 'damage');
      const riskMetric = card?.metrics.find(m => m.type === 'risk');
      setLogs(prev => [...prev, `Card Effect: ${damageMetric?.value} and ${riskMetric?.value}`]);
      
      if (newState.currentPhase === 'end') {
        toast({
          title: "Card Effect Resolved",
          description: `Moving to end phase`,
        });
        setLogs(prev => [...prev, 'Moving to end phase']);
      }
      return newState;
    });
  };

  const handleEndTurn = () => {
    setGameState(prevState => {
      setLogs(prev => [...prev, `Player ${prevState.activePlayer + 1} ended their turn`]);
      return endTurn(prevState);
    });
  };

  const handleExit = () => {
    setLocation('/');
  };

  return (
    <div className="h-screen">
      <div className="absolute top-4 right-4">
        <Button variant="outline" onClick={handleExit}>Exit Game</Button>
      </div>
      <GameBoard
        gameState={gameState}
        onPlayCard={handlePlayCard}
        onEndTurn={handleEndTurn}
        logs={logs}
      />
    </div>
  );
}
