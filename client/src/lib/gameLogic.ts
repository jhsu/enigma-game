import { GameState, Card, GameContext, Player, CardMetric } from '@/types/game';

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
  const metrics: [CardMetric, CardMetric] = [
    { type: 'damage', value: ['Harmful', 'Destructive', 'Peaceful'][Math.floor(Math.random() * 3)] },
    { type: 'risk', value: ['Safe', 'Risky', 'Volatile'][Math.floor(Math.random() * 3)] }
  ];
  
  return {
    id,
    title: `Card ${id}`,
    metrics,
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
    gameOver: false,
    playedCards: [],
    lastPlayedCard: undefined
  };
};

export const drawCard = (state: GameState): GameState => {
  const newState = { ...state };
  const activePlayer = newState.players[newState.activePlayer];
  
  if (activePlayer.hand.length < MAX_HAND_SIZE) {
    const newCard = generateCard(`${Math.random()}`);
    activePlayer.hand.push(newCard);
  }
  
  // Always advance to main phase after drawing
  newState.currentPhase = 'main';
  return newState;
};

const resolveCardEffect = (state: GameState, card: Card): GameState => {
  const newState = { ...state };
  const activePlayer = newState.players[newState.activePlayer];
  const opponent = newState.players[(newState.activePlayer + 1) % 2];
  
  // Determine effect based on metrics
  const damageMetric = card.metrics.find(m => m.type === 'damage');
  const riskMetric = card.metrics.find(m => m.type === 'risk');
  
  let damage = 0;
  let healing = 0;
  
  // Calculate damage based on metrics
  if (damageMetric?.value === 'Destructive') {
    damage = 5 * newState.context.effects.damageModifier;
  } else if (damageMetric?.value === 'Harmful') {
    damage = 3 * newState.context.effects.damageModifier;
  }
  
  // Apply risk modifier
  if (riskMetric?.value === 'Volatile') {
    damage *= 1.5;
    healing *= 0.5;
  } else if (riskMetric?.value === 'Safe') {
    damage *= 0.7;
    healing *= 1.3;
  }
  
  // Apply effects
  opponent.lifePoints = Math.max(0, opponent.lifePoints - Math.floor(damage));
  activePlayer.lifePoints = Math.min(20, activePlayer.lifePoints + Math.floor(healing));
  
  // Move to end phase
  newState.currentPhase = 'end';
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
  
  // Add card to played cards
  newState.playedCards = [...newState.playedCards, card];
  newState.lastPlayedCard = card;
  
  // Enter resolution phase and resolve effect
  newState.currentPhase = 'resolution';
  const resolvedState = resolveCardEffect(newState, card);
  
  // Move to end phase after resolution
  resolvedState.currentPhase = 'end';
  return resolvedState;
};

export const endTurn = (state: GameState): GameState => {
  const newState = { ...state };
  // Switch to next player and start their draw phase
  newState.activePlayer = (newState.activePlayer + 1) % 2;
  newState.currentPhase = 'draw';
  return newState;
};

export const checkWinCondition = (state: GameState): boolean => {
  return state.players.some(player => player.lifePoints <= 0);
};
