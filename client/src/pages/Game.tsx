import { useState, useEffect } from 'react';
import { GameBoard } from '@/components/game/GameBoard';
import { initializeGame, drawCard, playCard, endTurn, checkWinCondition } from '@/lib/gameLogic';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function Game() {
  const [gameState, setGameState] = useState(initializeGame());
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (checkWinCondition(gameState)) {
      const winner = gameState.players.findIndex(p => p.lifePoints > 0) + 1;
      toast({
        title: "Game Over!",
        description: `Player ${winner} wins!`,
      });
    }
  }, [gameState]);

  const handlePlayCard = (cardId: string) => {
    setGameState(prevState => playCard(prevState, cardId));
  };

  const handleEndTurn = () => {
    setGameState(prevState => {
      let newState = endTurn(prevState);
      return drawCard(newState);
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
      />
    </div>
  );
}
