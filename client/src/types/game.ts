export type CardMetric = {
  type: 'damage' | 'risk' | 'timing' | 'target' | 'power';
  value: string;
};

export type Card = {
  id: string;
  title: string;
  metrics: [CardMetric, CardMetric];
  revealed?: boolean;
};

export type Player = {
  id: number;
  hand: Card[];
  lifePoints: number;
};

export type GameContext = {
  name: string;
  description: string;
  effects: {
    damageModifier: number;
    healingModifier: number;
  };
};

export type GamePhase = 'draw' | 'main' | 'resolution' | 'end';

export type GameState = {
  players: [Player, Player];
  activePlayer: number;
  currentPhase: GamePhase;
  context: GameContext;
  gameOver: boolean;
};
