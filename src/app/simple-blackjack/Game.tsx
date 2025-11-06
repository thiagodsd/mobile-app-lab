'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlackjackGame } from './useBlackjackGame';
import { updatePlayer, saveGameState, clearGameState } from './playerService';
import Card from './Card';
import AnimatedMessage, { MessageType } from './AnimatedMessage';
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

  // Map game status to message type
  const getMessageType = (): MessageType => {
    if (gameState.gameStatus === 'playerWin' || gameState.gameStatus === 'dealerBust') {
      return 'success';
    }
    if (gameState.gameStatus === 'dealerWin' || gameState.gameStatus === 'playerBust') {
      return 'error';
    }
    if (gameState.gameStatus === 'push') {
      return 'warning';
    }
    return 'info';
  };

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
          <div className="flex items-center gap-8">
            <div className="flex gap-4">
              <div className="text-center">
                <div className="relative w-16 h-24 bg-gray-800 rounded border-2 border-gray-900 flex items-center justify-center mb-1">
                  <span className="text-xs text-white font-light">Baralho</span>
                </div>
                <p className="text-sm text-gray-600 font-light">{gameState.deck.length} cartas</p>
              </div>
              <div className="text-center">
                <div className="relative w-16 h-24 bg-gray-200 rounded border-2 border-gray-400 flex items-center justify-center mb-1">
                  <span className="text-xs text-gray-500 font-light">Descarte</span>
                </div>
                <p className="text-sm text-gray-600 font-light">{gameState.discardPile?.length || 0} cartas</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 font-light">Jogador: {player.nickname}</p>
              <p className="text-sm text-gray-600 font-light">Rodada: {gameState.gamesPlayed}/10</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <motion.div
            className="rounded p-4 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={gameState.balance}
                className="text-2xl font-light text-black"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                ${gameState.balance}
              </motion.p>
            </AnimatePresence>
            <p className="text-xs text-gray-600 font-light">Saldo</p>
          </motion.div>
          <motion.div
            className="rounded p-4 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={stats.wins}
                className="text-2xl font-light text-green-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', bounce: 0.6 }}
              >
                {stats.wins}
              </motion.p>
            </AnimatePresence>
            <p className="text-xs text-gray-600 font-light">Vitórias</p>
          </motion.div>
          <motion.div
            className="rounded p-4 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={stats.losses}
                className="text-2xl font-light text-red-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', bounce: 0.6 }}
              >
                {stats.losses}
              </motion.p>
            </AnimatePresence>
            <p className="text-xs text-gray-600 font-light">Derrotas</p>
          </motion.div>
          <motion.div
            className="rounded p-4 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={stats.pushes}
                className="text-2xl font-light text-gray-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', bounce: 0.6 }}
              >
                {stats.pushes}
              </motion.p>
            </AnimatePresence>
            <p className="text-xs text-gray-600 font-light">Empates</p>
          </motion.div>
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
                index={index}
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
              <Card
                key={`${card.suit}-${card.rank}-${index}`}
                card={card}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <AnimatedMessage
            message={gameState.message}
            type={getMessageType()}
          />
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {gameState.gameStatus === 'betting' && canPlay && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={() => handleBetChange(-5)}
                  className="px-4 py-2 border-2 border-gray-800 rounded font-light text-black disabled:opacity-50"
                  disabled={betAmount <= 5}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  -$5
                </motion.button>
                <div className="text-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={betAmount}
                      className="text-3xl font-light text-black"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      ${betAmount}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-xs text-gray-600 font-light">Valor da Aposta</p>
                </div>
                <motion.button
                  onClick={() => handleBetChange(5)}
                  className="px-4 py-2 border-2 border-gray-800 rounded font-light text-black disabled:opacity-50"
                  disabled={betAmount >= gameState.balance}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  +$5
                </motion.button>
              </div>
              <motion.button
                onClick={() => placeBet(betAmount)}
                className="w-full py-3 bg-black text-white rounded font-light"
                whileHover={{ scale: 1.02, backgroundColor: '#374151' }}
                whileTap={{ scale: 0.98 }}
              >
                Fazer Aposta
              </motion.button>
            </motion.div>
          )}

          {gameState.gameStatus === 'playing' && (
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.button
                onClick={hit}
                className="flex-1 py-3 bg-black text-white rounded font-light"
                whileHover={{ scale: 1.02, backgroundColor: '#374151' }}
                whileTap={{ scale: 0.98 }}
              >
                Pedir Carta
              </motion.button>
              <motion.button
                onClick={stand}
                className="flex-1 py-3 border-2 border-gray-800 rounded font-light text-black"
                whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.98 }}
              >
                Parar
              </motion.button>
            </motion.div>
          )}

          {(gameState.gameStatus === 'playerWin' ||
            gameState.gameStatus === 'dealerWin' ||
            gameState.gameStatus === 'push' ||
            gameState.gameStatus === 'playerBust' ||
            gameState.gameStatus === 'dealerBust') && canPlay && (
            <motion.button
              onClick={newGame}
              className="w-full py-3 bg-black text-white rounded font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={{ scale: 1.02, backgroundColor: '#374151' }}
              whileTap={{ scale: 0.98 }}
            >
              Próxima Rodada
            </motion.button>
          )}

          {(!canPlay || gameState.gamesPlayed >= 10) && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="p-6 border-2 border-gray-800 rounded text-center"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
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
              </motion.div>
              <motion.button
                onClick={handleGameEnd}
                className="w-full py-3 bg-black text-white rounded font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02, backgroundColor: '#374151' }}
                whileTap={{ scale: 0.98 }}
              >
                Salvar e Sair
              </motion.button>
            </motion.div>
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
