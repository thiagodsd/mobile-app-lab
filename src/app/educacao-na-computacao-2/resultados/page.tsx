'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import type { PlotParams } from 'react-plotly.js';

const Plot = dynamic<PlotParams>(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
      <div className="text-gray-400 text-sm">Carregando gráfico...</div>
    </div>
  )
});

interface Stats {
  totalPlayers: number;
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  totalPushes: number;
  balances: number[];
  players: {
    nickname: string;
    balance: number;
    gamesPlayed: number;
    wins: number;
    losses: number;
    pushes: number;
  }[];
}

export default function ResultadosPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [minGames, setMinGames] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/blackjack-stats?minGames=${minGames}`);
      if (response.ok) {
        const result = await response.json();
        // console.log('API Response:', result);
        // console.log('Stats:', result.stats);
        setStats(result.stats || null);
      } else {
        console.error('Response not OK:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, [minGames]);

  // Calcular categorias para o gráfico de pizza
  const getPieData = () => {
    if (!stats || stats.totalGames === 0) return { labels: [], values: [] };

    // Calcular quem lucrou, empatou ou perdeu baseado no saldo
    let lucrou = 0;
    let empatou = 0;
    let perdeu = 0;

    stats.players.forEach(player => {
      if (player.balance > 100) lucrou++;
      else if (player.balance === 100) empatou++;
      else perdeu++;
    });

    return {
      labels: ['Lucrou', 'Empatou', 'Perdeu'],
      values: [lucrou, empatou, perdeu],
      colors: ['#10b981', '#fbbf24', '#ef4444']
    };
  };

  const pieData = getPieData();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-light text-gray-800 mb-2">
              Dashboard de Resultados - Blackjack
            </h1>
            <p className="text-gray-600">
              Visualização em tempo real das estatísticas dos jogadores
            </p>
            <div className="w-12 h-px bg-gray-200 mt-4"></div>
          </motion.div>

          {/* Filtro e Contador */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {stats?.totalPlayers || 0} {stats?.totalPlayers === 1 ? 'jogador' : 'jogadores'}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {stats?.totalGames || 0} {stats?.totalGames === 1 ? 'partida' : 'partidas'}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Atualiza a cada 5s
              </span>

              {/* Filtro de mínimo de jogos */}
              <div className="flex items-center gap-2">
                <label htmlFor="minGames" className="text-gray-700 text-sm">
                  Mínimo de partidas:
                </label>
                <select
                  id="minGames"
                  value={minGames}
                  onChange={(e) => setMinGames(parseInt(e.target.value))}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border-none focus:ring-2 focus:ring-gray-300"
                >
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gráfico 1: Pizza - Lucro/Empate/Perda */}
            <motion.div
              className="bg-gray-50 rounded-2xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Distribuição de Resultados
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Jogadores que lucraram, empataram ou perderam (saldo vs. inicial de $100)
              </p>
              {stats && stats.totalPlayers > 0 ? (
                <Plot
                  data={[
                    {
                      labels: pieData.labels,
                      values: pieData.values,
                      type: 'pie',
                      marker: {
                        colors: pieData.colors,
                      },
                      textinfo: 'label+percent',
                      textposition: 'auto',
                      hovertemplate: '<b>%{label}</b><br>%{value} jogadores<br>%{percent}<extra></extra>',
                    },
                  ]}
                  layout={{
                    margin: { t: 20, b: 20, l: 20, r: 20 },
                    paper_bgcolor: 'transparent',
                    height: 350,
                    showlegend: true,
                    legend: {
                      orientation: 'h',
                      y: -0.1,
                      x: 0.5,
                      xanchor: 'center'
                    }
                  }}
                  config={{ displayModeBar: false }}
                  style={{ width: '100%' }}
                />
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Aguardando jogadores...
                </p>
              )}
            </motion.div>

            {/* Gráfico 2: Histograma - Saldo Final */}
            <motion.div
              className="bg-gray-50 rounded-2xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Distribuição de Saldos Finais
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Histograma dos saldos finais dos jogadores
              </p>
              {stats && stats.balances.length > 0 ? (
                <Plot
                  data={[
                    {
                      x: stats.balances,
                      type: 'histogram',
                      marker: {
                        color: '#374151',
                        line: {
                          color: '#1f2937',
                          width: 1
                        }
                      },
                      nbinsx: 15,
                      hovertemplate: 'Saldo: $%{x}<br>Jogadores: %{y}<extra></extra>',
                    },
                  ]}
                  layout={{
                    xaxis: {
                      title: { text: 'Saldo Final ($)' },
                      gridcolor: '#e5e7eb',
                    },
                    yaxis: {
                      title: { text: 'Número de Jogadores' },
                      gridcolor: '#e5e7eb',
                    },
                    margin: { t: 20, b: 50, l: 50, r: 20 },
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    height: 350,
                    bargap: 0.05,
                  }}
                  config={{ displayModeBar: false }}
                  style={{ width: '100%' }}
                />
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Aguardando jogadores...
                </p>
              )}
            </motion.div>
          </div>

          {/* Estatísticas Resumidas */}
          {stats && stats.totalGames > 0 && (
            <motion.div
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-green-50 rounded-xl border border-green-200 p-4">
                <div className="text-sm text-green-600 mb-1">Vitórias Totais</div>
                <div className="text-2xl font-semibold text-green-700">
                  {stats.totalWins}
                  <span className="text-sm font-normal text-green-600 ml-2">
                    ({((stats.totalWins / stats.totalGames) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
                <div className="text-sm text-yellow-600 mb-1">Empates Totais</div>
                <div className="text-2xl font-semibold text-yellow-700">
                  {stats.totalPushes}
                  <span className="text-sm font-normal text-yellow-600 ml-2">
                    ({((stats.totalPushes / stats.totalGames) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl border border-red-200 p-4">
                <div className="text-sm text-red-600 mb-1">Derrotas Totais</div>
                <div className="text-2xl font-semibold text-red-700">
                  {stats.totalLosses}
                  <span className="text-sm font-normal text-red-600 ml-2">
                    ({((stats.totalLosses / stats.totalGames) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
