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
  return shuffleDeck(deck);
}

function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
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

export function useBlackjackGame(initialBalance: number = 100, savedState?: GameState | null) {
  const [gameState, setGameState] = useState<GameState>(
    savedState || {
      deck: createDeck(),
      playerHand: [],
      dealerHand: [],
      playerScore: 0,
      dealerScore: 0,
      bet: 0,
      balance: initialBalance,
      gamesPlayed: 0,
      gameStatus: 'betting',
      message: 'Faça sua aposta para começar',
    }
  );

  const placeBet = useCallback((amount: number) => {
    if (amount > gameState.balance) {
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

    let newDeck = [...gameState.deck];
    let newDealerHand = [...gameState.dealerHand];
    let newDealerScore = calculateScore(newDealerHand);

    while (newDealerScore < 17) {
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
    if (gameState.gamesPlayed >= 10) {
      setGameState({
        ...gameState,
        gameStatus: 'betting',
        message: 'Fim de jogo! Você jogou todas as 10 rodadas.',
      });
      return;
    }

    setGameState({
      ...gameState,
      deck: gameState.deck.length < 20 ? createDeck() : gameState.deck,
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
