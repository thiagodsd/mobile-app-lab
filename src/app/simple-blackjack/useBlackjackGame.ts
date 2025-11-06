'use client';

import { useState, useCallback } from 'react';
import { Card, Suit, Rank, GameState } from './types';

const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      let value: number;
      if (rank === 'A') value = 11;
      else if (['J', 'Q', 'K'].includes(rank)) value = 10;
      else value = parseInt(rank);

      deck.push({ suit, rank, value });
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Creating new deck with 52 cards');
  }

  return shuffleDeck(deck);
}

function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];

  // Fisher-Yates shuffle algorithm - proven to be uniformly random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Deck shuffled. First card:', `${shuffled[shuffled.length - 1].rank}${shuffled[shuffled.length - 1].suit}`);
  }

  return shuffled;
}

function calculateScore(hand: Card[]): number {
  let score = hand.reduce((sum, card) => sum + card.value, 0);
  let aces = hand.filter(card => card.rank === 'A').length;

  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
}

// Utility function to validate deck integrity (no duplicate cards)
function validateDeckIntegrity(gameState: GameState): { isValid: boolean; message: string } {
  const allCards = [
    ...gameState.deck,
    ...gameState.playerHand,
    ...gameState.dealerHand,
    ...(gameState.discardPile || []),
  ];

  const cardStrings = allCards.map(card => `${card.suit}${card.rank}`);
  const uniqueCards = new Set(cardStrings);

  if (cardStrings.length !== uniqueCards.size) {
    return {
      isValid: false,
      message: `Duplicate cards detected! Total: ${cardStrings.length}, Unique: ${uniqueCards.size}`,
    };
  }

  // A full deck should have 52 cards
  if (allCards.length > 52) {
    return {
      isValid: false,
      message: `Too many cards! Total: ${allCards.length}, Expected: ≤52`,
    };
  }

  return { isValid: true, message: 'Deck integrity is valid' };
}

export function useBlackjackGame(initialBalance: number = 100, savedState?: GameState | null) {
  const initialState: GameState = savedState ? {
    ...savedState,
    discardPile: savedState.discardPile || [],
  } : {
    deck: createDeck(),
    discardPile: [],
    playerHand: [],
    dealerHand: [],
    playerScore: 0,
    dealerScore: 0,
    bet: 0,
    balance: initialBalance,
    gamesPlayed: 0,
    gameStatus: 'betting' as const,
    message: 'Faça sua aposta para começar',
  };

  // Validate initial state in development
  if (process.env.NODE_ENV === 'development') {
    const validation = validateDeckIntegrity(initialState);
    if (!validation.isValid) {
      console.error('Deck integrity validation failed:', validation.message);
    } else {
      console.log('Deck integrity validated:', validation.message);
      console.log(`Deck stats - Total cards: ${initialState.deck.length + initialState.playerHand.length + initialState.dealerHand.length + (initialState.discardPile?.length || 0)}`);
      console.log(`First 5 cards in deck:`, initialState.deck.slice(-5).map(c => `${c.rank}${c.suit}`));
    }
  }

  const [gameState, setGameState] = useState<GameState>(initialState);

  const placeBet = useCallback((amount: number) => {
    if (amount > gameState.balance) {
      return;
    }

    // Validate that there are at least 4 cards in the deck
    if (gameState.deck.length < 4) {
      setGameState({
        ...gameState,
        gameStatus: 'betting',
        message: 'Não há cartas suficientes no baralho. Fim do jogo!',
      });
      return;
    }

    const newDeck = [...gameState.deck];
    const playerHand: Card[] = [newDeck.pop()!, newDeck.pop()!];
    const dealerHand: Card[] = [newDeck.pop()!, newDeck.pop()!];

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    let status: GameState['gameStatus'] = 'playing';
    let message = 'Pedir carta ou parar?';

    if (playerScore === 21) {
      status = 'playerWin';
      message = 'Blackjack! Você ganhou!';
    }

    setGameState({
      ...gameState,
      deck: newDeck,
      playerHand,
      dealerHand,
      playerScore,
      dealerScore,
      bet: amount,
      balance: gameState.balance - amount,
      gameStatus: status,
      message,
    });
  }, [gameState]);

  const hit = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;

    // Validate that there is at least one card in the deck
    if (gameState.deck.length < 1) {
      setGameState({
        ...gameState,
        gameStatus: 'betting',
        message: 'Não há cartas suficientes no baralho. Fim do jogo!',
        gamesPlayed: gameState.gamesPlayed + 1,
      });
      return;
    }

    const newDeck = [...gameState.deck];
    const newCard = newDeck.pop()!;
    const newPlayerHand = [...gameState.playerHand, newCard];
    const newPlayerScore = calculateScore(newPlayerHand);

    if (newPlayerScore > 21) {
      setGameState({
        ...gameState,
        deck: newDeck,
        playerHand: newPlayerHand,
        playerScore: newPlayerScore,
        gameStatus: 'playerBust',
        message: 'Estourou! Você perdeu.',
        gamesPlayed: gameState.gamesPlayed + 1,
      });
    } else if (newPlayerScore === 21) {
      stand();
    } else {
      setGameState({
        ...gameState,
        deck: newDeck,
        playerHand: newPlayerHand,
        playerScore: newPlayerScore,
      });
    }
  }, [gameState]);

  const stand = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;

    const newDeck = [...gameState.deck];
    const newDealerHand = [...gameState.dealerHand];
    let newDealerScore = calculateScore(newDealerHand);

    while (newDealerScore < 17) {
      // Check if there are cards available
      if (newDeck.length < 1) {
        // If no cards available, dealer must stand with current score
        break;
      }
      const newCard = newDeck.pop()!;
      newDealerHand.push(newCard);
      newDealerScore = calculateScore(newDealerHand);
    }

    let status: GameState['gameStatus'];
    let message: string;
    let newBalance = gameState.balance;

    if (newDealerScore > 21) {
      status = 'dealerBust';
      message = 'Dealer estourou! Você ganhou!';
      newBalance += gameState.bet * 2;
    } else if (newDealerScore > gameState.playerScore) {
      status = 'dealerWin';
      message = 'Dealer ganhou.';
    } else if (newDealerScore < gameState.playerScore) {
      status = 'playerWin';
      message = 'Você ganhou!';
      newBalance += gameState.bet * 2;
    } else {
      status = 'push';
      message = 'Empate!';
      newBalance += gameState.bet;
    }

    setGameState({
      ...gameState,
      deck: newDeck,
      dealerHand: newDealerHand,
      dealerScore: newDealerScore,
      balance: newBalance,
      gameStatus: status,
      message,
      gamesPlayed: gameState.gamesPlayed + 1,
    });
  }, [gameState]);

  const newGame = useCallback(() => {
    if (gameState.gamesPlayed >= 6) {
      setGameState({
        ...gameState,
        gameStatus: 'betting',
        message: 'Fim de jogo! Você jogou todas as 6 rodadas.',
      });
      return;
    }

    // Move current hands to discard pile
    const newDiscardPile = [
      ...(gameState.discardPile || []),
      ...gameState.playerHand,
      ...gameState.dealerHand,
    ];

    // Check if there are enough cards in the deck (minimum 4 cards needed to start)
    if (gameState.deck.length < 4) {
      setGameState({
        ...gameState,
        gameStatus: 'betting',
        message: 'Não há cartas suficientes no baralho. Fim do jogo!',
      });
      return;
    }

    setGameState({
      ...gameState,
      discardPile: newDiscardPile,
      playerHand: [],
      dealerHand: [],
      playerScore: 0,
      dealerScore: 0,
      bet: 0,
      gameStatus: 'betting',
      message: 'Faça sua aposta para começar',
    });
  }, [gameState]);

  return {
    gameState,
    placeBet,
    hit,
    stand,
    newGame,
    setGameState,
  };
}
