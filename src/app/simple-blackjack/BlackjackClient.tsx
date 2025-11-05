'use client';

import { useState } from 'react';
import NicknameInput from './NicknameInput';
import Game from './Game';
import { createPlayer, getPlayer } from './playerService';
import { PlayerData } from './types';

export default function BlackjackClient() {
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNicknameSubmit = async (nickname: string) => {
    setLoading(true);
    setError('');

    try {
      const existingPlayer = await getPlayer(nickname);

      if (existingPlayer) {
        // Player exists, ask if they want to continue or start fresh
        if (existingPlayer.gamesPlayed >= 10 || existingPlayer.balance <= 0) {
          // Reset player for new game
          const newPlayer = await createPlayer(nickname + '-' + Date.now());
          setPlayer(newPlayer);
        } else {
          setPlayer(existingPlayer);
        }
      } else {
        // New player
        const newPlayer = await createPlayer(nickname);
        setPlayer(newPlayer);
      }
    } catch (err) {
      console.error('Error creating/fetching player:', err);
      setError('Falha ao conectar ao banco de dados. Verifique sua configuração do Firebase.');
    } finally {
      setLoading(false);
    }
  };

  const handleGameEnd = () => {
    setPlayer(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => setError('')}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors font-light"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!player) {
    return <NicknameInput onSubmit={handleNicknameSubmit} />;
  }

  return (
    <Game
      player={player}
      onGameEnd={handleGameEnd}
      initialGameState={player.savedGameState}
      initialStats={player.currentStats}
    />
  );
}
