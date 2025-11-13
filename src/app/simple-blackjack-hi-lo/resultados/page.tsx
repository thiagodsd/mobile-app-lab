'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PlayerStats {
  nickname: string;
  balanceBefore: number;
  balance: number;
  delta: number;
}

export default function ResultadosHiLo() {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('/api/blackjack-hi-lo-stats?minGames=10');
      const data = await response.json();

      if (data.success && data.stats.players) {
        const playersWithDelta = data.stats.players.map((p: PlayerStats) => ({
          ...p,
          delta: p.balance - p.balanceBefore,
        }));

        // Sort by delta (descending)
        const sorted = playersWithDelta.sort((a: PlayerStats, b: PlayerStats) => b.delta - a.delta);
        setPlayers(sorted);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }

  const getMedal = (position: number) => {
    if (position === 0) return '🥇';
    if (position === 1) return '🥈';
    if (position === 2) return '🥉';
    return '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl">Carregando resultados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-serif">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4 font-[family-name:var(--font-croissant-one)]">
            🏆 Leaderboard Hi-Lo
          </h1>
          <p className="text-xl text-gray-900">
            Ranking dos jogadores que completaram 10 partidas com contagem Hi-Lo
          </p>
        </div>

        {players.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-900 mb-8">
              Nenhum jogador completou as 10 partidas ainda.
            </p>
            <Link
              href="/simple-blackjack-hi-lo"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Jogar Blackjack Hi-Lo
            </Link>
          </div>
        ) : (
          <>
            {/* Pódio - Top 3 */}
            {players.length >= 3 && (
              <div className="flex items-end justify-center gap-4 mb-16">
                {/* 2º Lugar */}
                <div className="flex flex-col items-center">
                  <div className="text-6xl mb-2">🥈</div>
                  <div className="bg-white rounded-lg shadow-lg p-6 text-center border-4 border-gray-300 w-48">
                    <p className="text-2xl font-semibold mb-2 text-black">{players[1].nickname}</p>
                    <p className="text-3xl font-bold text-green-600 mb-1">
                      {players[1].delta > 0 ? '+' : ''}{players[1].delta}
                    </p>
                    <p className="text-sm text-gray-900">
                      ${players[1].balanceBefore} → ${players[1].balance}
                    </p>
                  </div>
                </div>

                {/* 1º Lugar */}
                <div className="flex flex-col items-center">
                  <div className="text-8xl mb-2">🥇</div>
                  <div className="bg-white rounded-lg shadow-xl p-8 text-center border-4 border-yellow-400 w-56">
                    <p className="text-3xl font-bold mb-2 text-black">{players[0].nickname}</p>
                    <p className="text-4xl font-bold text-green-600 mb-2">
                      {players[0].delta > 0 ? '+' : ''}{players[0].delta}
                    </p>
                    <p className="text-sm text-gray-900">
                      ${players[0].balanceBefore} → ${players[0].balance}
                    </p>
                  </div>
                </div>

                {/* 3º Lugar */}
                <div className="flex flex-col items-center">
                  <div className="text-6xl mb-2">🥉</div>
                  <div className="bg-white rounded-lg shadow-lg p-6 text-center border-4 border-orange-300 w-48">
                    <p className="text-2xl font-semibold mb-2 text-black">{players[2].nickname}</p>
                    <p className="text-3xl font-bold text-green-600 mb-1">
                      {players[2].delta > 0 ? '+' : ''}{players[2].delta}
                    </p>
                    <p className="text-sm text-gray-900">
                      ${players[2].balanceBefore} → ${players[2].balance}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tabela Completa */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Posição</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Jogador</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-black">Antes Hi-Lo</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-black">Depois Hi-Lo</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-black">Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr
                      key={player.nickname}
                      className={`border-b border-gray-200 ${
                        index < 3 ? 'bg-yellow-50' : 'hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <td className="px-6 py-4 text-2xl text-black">
                        {getMedal(index) || `${index + 1}º`}
                      </td>
                      <td className="px-6 py-4 font-semibold text-lg text-black">{player.nickname}</td>
                      <td className="px-6 py-4 text-right text-black">${player.balanceBefore}</td>
                      <td className="px-6 py-4 text-right font-semibold text-black">${player.balance}</td>
                      <td className={`px-6 py-4 text-right text-xl font-bold ${
                        player.delta > 0 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {player.delta > 0 ? '+' : ''}{player.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/simple-blackjack-hi-lo"
                className="inline-block px-8 py-4 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Jogar Blackjack Hi-Lo
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
