export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}

export interface GameState {
  deck: Card[];
  discardPile: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  playerScore: number;
  dealerScore: number;
  bet: number;
  balance: number;
  gamesPlayed: number;
  gameStatus: 'betting' | 'playing' | 'playerWin' | 'dealerWin' | 'push' | 'playerBust' | 'dealerBust';
  message: string;
}

export interface PlayerData {
  nickname: string;
  balance: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  pushes: number;
  createdAt: Date;
  lastPlayed: Date;
  savedGameState?: GameState | null;
  currentStats?: {
    wins: number;
    losses: number;
    pushes: number;
  };
}
