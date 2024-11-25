import { GameState, Card, GameContext, Player } from '@/types/game';

const STARTING_LIFE = 20;
const MAX_HAND_SIZE = 5;

const contexts: GameContext[] = [
  {
    name: "Neutral Arena",
    description: "Balanced effects, no special modifications",
    effects: { damageModifier: 1, healingModifier: 1 }
  },
  {
    name: "Elemental Chaos",
    description: "Enhanced damage effects, unstable card effects",
    effects: { damageModifier: 1.5, healingModifier: 0.8 }
  },
  {
    name: "Sacred Ground",
    description: "Enhanced healing, reduced damage",
    effects: { damageModifier: 0.7, healingModifier: 1.3 }
  }
];

const generateCard = (id: string): Card => {
  const metrics = [
    { type: 'damage', value: ['Harmful', 'Destructive', 'Peaceful'][Math.floor(Math.random() * 3)] },
    { type: 'risk', value: ['Safe', 'Risky', 'Volatile'][Math.floor(Math.random() * 3)] }
  ];
  
  return {
    id,
    title: `Card ${id}`,
    metrics: metrics as [typeof metrics[0], typeof metrics[1]],
    revealed: false
  };
};

export const initializeGame = (): GameState => {
  const createInitialDeck = () => Array.from({ length: 20 }, (_, i) => generateCard(`${i}`));
  
  const player1: Player = {
    id: 1,
    hand: createInitialDeck().slice(0, 5),
    lifePoints: STARTING_LIFE
  };

  const player2: Player = {
    id: 2,
    hand: createInitialDeck().slice(0, 5),
    lifePoints: STARTING_LIFE
  };

  return {
    players: [player1, player2],
    activePlayer: 0,
    currentPhase: 'draw',
    context: contexts[0],
    gameOver: false
  };
};

export const drawCard = (state: GameState): GameState => {
  const newState = { ...state };
  const activePlayer = newState.players[newState.activePlayer];
  
  if (activePlayer.hand.length < MAX_HAND_SIZE) {
    activePlayer.hand.push(generateCard(`${Math.random()}`));
  }
  
  newState.currentPhase = 'main';
  return newState;
};

export const playCard = (state: GameState, cardId: string): GameState => {
  const newState = { ...state };
  const activePlayer = newState.players[newState.activePlayer];
  const cardIndex = activePlayer.hand.findIndex(c => c.id === cardId);
  
  if (cardIndex === -1) return state;
  
  const card = activePlayer.hand[cardIndex];
  activePlayer.hand.splice(cardIndex, 1);
  card.revealed = true;
  
  newState.currentPhase = 'resolution';
  return newState;
};

export const endTurn = (state: GameState): GameState => {
  const newState = { ...state };
  newState.activePlayer = (newState.activePlayer + 1) % 2;
  newState.currentPhase = 'draw';
  return newState;
};

export const checkWinCondition = (state: GameState): boolean => {
  return state.players.some(player => player.lifePoints <= 0);
};
