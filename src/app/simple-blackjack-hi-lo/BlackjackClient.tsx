'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NicknameInput from './NicknameInput';
import Game from './Game';
import { createPlayer, getPlayer, clearGameState } from './playerService';
import { PlayerData } from './types';

export default function BlackjackClient() {
  const router = useRouter();
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pendingPlayer, setPendingPlayer] = useState<PlayerData | null>(null);

  const handleNicknameSubmit = async (nickname: string) => {
    setLoading(true);
    setError('');

    try {
      const existingPlayer = await getPlayer(nickname);

      if (existingPlayer) {
        console.log('Existing player found:', nickname);
        console.log('Stats:', {
          gamesPlayed: existingPlayer.gamesPlayed,
          balance: existingPlayer.balance,
          hasSavedState: !!existingPlayer.savedGameState
        });

        // Player exists, ask if they want to continue or start fresh
        if (existingPlayer.gamesPlayed >= 10) {
          console.log('Player already completed 10 games');
          setError('Você já completou as 10 partidas. Use outro nickname para jogar novamente.');
          return;
        } else if (existingPlayer.balance <= 0) {
          console.log('Player has no balance');
          setError('Seu saldo acabou. Use outro nickname para jogar novamente.');
          return;
        } else if (existingPlayer.savedGameState) {
          console.log('Saved game found, asking user...');
          setPendingPlayer(existingPlayer);
        } else {
          console.log('Continuing existing game session');
          setPlayer(existingPlayer);
        }
      } else {
        console.log('New player created:', nickname);
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

  const handleGameEnd = (gamesPlayed: number) => {
    if (gamesPlayed >= 10) {
      // Redirect to leaderboard after completing 10 games
      router.push('/simple-blackjack-hi-lo/resultados');
    } else {
      setPlayer(null);
    }
  };

  const handleContinueGame = () => {
    if (pendingPlayer) {
      console.log('Continuing saved game');
      setPlayer(pendingPlayer);
      setPendingPlayer(null);
    }
  };

  const handleStartFresh = async () => {
    if (pendingPlayer) {
      console.log('Starting fresh game, clearing saved state');
      await clearGameState(pendingPlayer.nickname);
      const freshPlayer = await getPlayer(pendingPlayer.nickname);
      if (freshPlayer) {
        setPlayer(freshPlayer);
      }
      setPendingPlayer(null);
    }
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

  if (pendingPlayer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-serif">
        <div className="w-full max-w-md p-8">
          <div className="mb-8">
            <h1 className="text-9xl text-black mb-3 text-center font-[family-name:var(--font-croissant-one)]">21</h1>
            <div className="flex justify-center gap-3 mb-6">
              <span className="text-4xl text-black">♠</span>
              <span className="text-4xl text-red-600">♥</span>
              <span className="text-4xl text-black">♣</span>
              <span className="text-4xl text-red-600">♦</span>
            </div>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-xl text-black mb-2 font-[family-name:var(--font-croissant-one)]">Bem-vindo de volta, {pendingPlayer.nickname}!</h2>
            <p className="text-gray-600 font-light">Você tem um jogo em progresso.</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleContinueGame}
              className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors font-light"
            >
              Continuar Jogo Salvo
            </button>
            <button
              onClick={handleStartFresh}
              className="w-full py-3 border-2 border-gray-800 rounded hover:bg-gray-100 transition-colors text-black font-light"
            >
              Começar Novo Jogo
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded">
            <p className="text-sm text-gray-600 font-light mb-1">
              <span className="font-medium text-black">Saldo:</span> ${pendingPlayer.balance}
            </p>
            <p className="text-sm text-gray-600 font-light mb-1">
              <span className="font-medium text-black">Rodada:</span> {pendingPlayer.savedGameState?.gamesPlayed || 0}/10
            </p>
          </div>
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
