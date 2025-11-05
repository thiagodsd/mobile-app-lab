'use client';

import { useState, useEffect } from 'react';
import { useBlackjackGame } from './useBlackjackGame';
import { updatePlayer, saveGameState, clearGameState } from './playerService';
import Card from './Card';
import { PlayerData } from './types';

interface GameProps {
  player: PlayerData;
  onGameEnd: () => void;
  initialGameState?: any;
  initialStats?: { wins: number; losses: number; pushes: number };
}

export default function Game({ player, onGameEnd, initialGameState, initialStats }: GameProps) {
  const { gameState, placeBet, hit, stand, newGame, setGameState } = useBlackjackGame(
    player.balance,
    initialGameState
  );
  const [betAmount, setBetAmount] = useState(10);
  const [stats, setStats] = useState(initialStats || { wins: 0, losses: 0, pushes: 0 });

  const canPlay = gameState.gamesPlayed < 10 && gameState.balance > 0;

  useEffect(() => {
    if (gameState.gameStatus === 'playerWin' || gameState.gameStatus === 'dealerBust') {
      setStats(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else if (gameState.gameStatus === 'dealerWin' || gameState.gameStatus === 'playerBust') {
      setStats(prev => ({ ...prev, losses: prev.losses + 1 }));
    } else if (gameState.gameStatus === 'push') {
      setStats(prev => ({ ...prev, pushes: prev.pushes + 1 }));
    }
  }, [gameState.gameStatus]);

  // Auto-save game state after each action
  useEffect(() => {
    if (gameState.gamesPlayed > 0 || gameState.bet > 0) {
      saveGameState(player.nickname, gameState, stats);
    }
  }, [gameState, stats, player.nickname]);

  const handleGameEnd = async () => {
    await updatePlayer(player.nickname, {
      balance: gameState.balance,
      gamesPlayed: player.gamesPlayed + gameState.gamesPlayed,
      wins: player.wins + stats.wins,
      losses: player.losses + stats.losses,
      pushes: player.pushes + stats.pushes,
    });
    await clearGameState(player.nickname);
    onGameEnd();
  };

  const handleBetChange = (amount: number) => {
    const newBet = Math.max(5, Math.min(gameState.balance, betAmount + amount));
    setBetAmount(newBet);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-6xl font-light text-black">21</h1>
          <div className="text-right">
            <p className="text-sm text-gray-600 font-light">Jogador: {player.nickname}</p>
            <p className="text-sm text-gray-600 font-light">Rodada: {gameState.gamesPlayed}/10</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="border-2 border-gray-800 rounded p-4 text-center">
            <p className="text-2xl font-light text-black">${gameState.balance}</p>
            <p className="text-xs text-gray-600 font-light">Saldo</p>
          </div>
          <div className="border border-gray-300 rounded p-4 text-center">
            <p className="text-2xl font-light text-green-600">{stats.wins}</p>
            <p className="text-xs text-gray-600 font-light">Vitórias</p>
          </div>
          <div className="border border-gray-300 rounded p-4 text-center">
            <p className="text-2xl font-light text-red-600">{stats.losses}</p>
            <p className="text-xs text-gray-600 font-light">Derrotas</p>
          </div>
          <div className="border border-gray-300 rounded p-4 text-center">
            <p className="text-2xl font-light text-gray-600">{stats.pushes}</p>
            <p className="text-xs text-gray-600 font-light">Empates</p>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="max-w-4xl mx-auto">
        {/* Dealer Hand */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-light text-black">Dealer</h2>
            {gameState.dealerHand.length > 0 && (
              <p className="text-lg font-light text-gray-600">
                {gameState.gameStatus === 'playing' ? '?' : gameState.dealerScore}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {gameState.dealerHand.map((card, index) => (
              <Card
                key={`${card.suit}-${card.rank}-${index}`}
                card={card}
                hidden={gameState.gameStatus === 'playing' && index === 1}
              />
            ))}
          </div>
        </div>

        {/* Player Hand */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-light text-black">Você</h2>
            {gameState.playerHand.length > 0 && (
              <p className="text-lg font-light text-gray-600">{gameState.playerScore}</p>
            )}
          </div>
          <div className="flex gap-2">
            {gameState.playerHand.map((card, index) => (
              <Card key={`${card.suit}-${card.rank}-${index}`} card={card} />
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 p-4 bg-gray-100 rounded text-center">
          <p className="text-lg font-light text-black">{gameState.message}</p>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {gameState.gameStatus === 'betting' && canPlay && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handleBetChange(-5)}
                  className="px-4 py-2 border-2 border-gray-800 rounded hover:bg-gray-100 font-light"
                  disabled={betAmount <= 5}
                >
                  -$5
                </button>
                <div className="text-center">
                  <p className="text-3xl font-light text-black">${betAmount}</p>
                  <p className="text-xs text-gray-600 font-light">Valor da Aposta</p>
                </div>
                <button
                  onClick={() => handleBetChange(5)}
                  className="px-4 py-2 border-2 border-gray-800 rounded hover:bg-gray-100 font-light"
                  disabled={betAmount >= gameState.balance}
                >
                  +$5
                </button>
              </div>
              <button
                onClick={() => placeBet(betAmount)}
                className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors font-light"
              >
                Fazer Aposta
              </button>
            </div>
          )}

          {gameState.gameStatus === 'playing' && (
            <div className="flex gap-4">
              <button
                onClick={hit}
                className="flex-1 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors font-light"
              >
                Pedir Carta
              </button>
              <button
                onClick={stand}
                className="flex-1 py-3 border-2 border-gray-800 rounded hover:bg-gray-100 transition-colors font-light text-black"
              >
                Parar
              </button>
            </div>
          )}

          {(gameState.gameStatus === 'playerWin' ||
            gameState.gameStatus === 'dealerWin' ||
            gameState.gameStatus === 'push' ||
            gameState.gameStatus === 'playerBust' ||
            gameState.gameStatus === 'dealerBust') && canPlay && (
            <button
              onClick={newGame}
              className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors font-light"
            >
              Próxima Rodada
            </button>
          )}

          {(!canPlay || gameState.gamesPlayed >= 10) && (
            <div className="space-y-4">
              <div className="p-6 border-2 border-gray-800 rounded text-center">
                <h3 className="text-2xl font-light text-black mb-4">Fim do Jogo</h3>
                <p className="text-gray-600 font-light mb-2">
                  Saldo Final: <span className="text-black font-medium">${gameState.balance}</span>
                </p>
                <p className="text-gray-600 font-light mb-2">
                  Total de Vitórias: <span className="text-green-600 font-medium">{stats.wins}</span>
                </p>
                <p className="text-gray-600 font-light mb-2">
                  Total de Derrotas: <span className="text-red-600 font-medium">{stats.losses}</span>
                </p>
              </div>
              <button
                onClick={handleGameEnd}
                className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors font-light"
              >
                Salvar e Sair
              </button>
            </div>
          )}
        </div>

        {/* Regras Simplificadas */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <h3 className="text-6xl font-light text-black mb-6">Regras do Jogo</h3>
          <div className="space-y-3 text-base text-gray-600 font-light">
            <p><span className="font-medium text-black">Objetivo:</span> Chegar o mais próximo possível de 21 pontos sem estourar.</p>
            <p><span className="font-medium text-black">Valores:</span> Cartas 2-10 valem seu número, J/Q/K valem 10.</p>
            <p><span className="font-medium text-black">Ás (A):</span> Vale 11 ou 1, o que for melhor para sua mão. O jogo ajusta automaticamente.</p>
            <p><span className="font-medium text-black">Pedir Carta:</span> Recebe mais uma carta do baralho.</p>
            <p><span className="font-medium text-black">Parar:</span> Mantém suas cartas atuais e passa a vez para o dealer.</p>
            <p><span className="font-medium text-black">Dealer:</span> Obrigado a comprar até atingir 17 ou mais, então deve parar.</p>
            <p><span className="font-medium text-black">Estourar:</span> Passar de 21 é derrota automática.</p>
            <p><span className="font-medium text-black">Vitória:</span> Ter pontuação maior que o dealer (sem estourar), ou o dealer estourar.</p>
            <p><span className="font-medium text-black">Empate:</span> Se você e o dealer tiverem a mesma pontuação, é empate (ninguém ganha).</p>
            <p><span className="font-medium text-black">Blackjack Natural:</span> 21 com duas cartas (Ás + carta de valor 10).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
