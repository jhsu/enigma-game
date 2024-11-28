import { useState } from 'react';
import { GameState } from '@/types/game';
import { PlayerHand } from './PlayerHand';
import { ContextDisplay } from './ContextDisplay';
import { PhaseIndicator } from './PhaseIndicator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { GameLog } from './GameLog';
import { PlayArea } from './PlayArea';

interface GameBoardProps {
  gameState: GameState;
  onPlayCard: (cardId: string) => void;
  onEndTurn: () => void;
  logs: string[];
}

export function GameBoard({ gameState, onPlayCard, onEndTurn, logs }: GameBoardProps) {
  const { toast } = useToast();
  const [player1, player2] = gameState.players;

  const handleCardPlay = (cardId: string) => {
    if (gameState.currentPhase !== 'main') {
      toast({
        title: "Invalid Action",
        description: "You can only play cards during the main phase",
        variant: "destructive"
      });
      return;
    }
    onPlayCard(cardId);
  };

  return (
    <div className="h-screen flex">
      {/* Game log sidebar */}
      <div className="w-80 border-r p-4 bg-background">
        <h3 className="font-semibold mb-4">Game Log</h3>
        <GameLog logs={logs} />
      </div>

      {/* Main game area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-background border-b">
          <ContextDisplay context={gameState.context} />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Player 2</h2>
              <div className="flex items-center gap-4">
                <span className="text-2xl">❤️ {player2.lifePoints}</span>
              </div>
            </div>
            <PlayerHand
              player={player2}
              isActive={gameState.activePlayer === 1}
              onCardPlay={handleCardPlay}
            />
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex flex-col items-center gap-2">
                <PhaseIndicator phase={gameState.currentPhase} />
                <p className="text-sm text-muted-foreground">
                  Player {gameState.activePlayer + 1}'s Turn
                </p>
              </div>

              <PlayArea 
                playedCards={gameState.playedCards}
                lastPlayedCard={gameState.lastPlayedCard}
              />

              {(gameState.currentPhase === 'main' || gameState.currentPhase === 'end') && (
                <Button 
                  onClick={onEndTurn}
                  className="animate-pulse"
                >
                  End Turn
                </Button>
              )}
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Player 1</h2>
              <div className="flex items-center gap-4">
                <span className="text-2xl">❤️ {player1.lifePoints}</span>
              </div>
            </div>
            <PlayerHand
              player={player1}
              isActive={gameState.activePlayer === 0}
              onCardPlay={handleCardPlay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
