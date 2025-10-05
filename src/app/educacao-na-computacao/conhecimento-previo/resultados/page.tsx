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

interface Response {
  id: string;
  estudouEstatistica: string;
  onde: string[];
  timestamp: { seconds: number; nanoseconds: number };
}

interface ProcessedData {
  estudouStats: { [key: string]: number };
  ondeStats: { [key: string]: number };
  totalRespostas: number;
}

export default function ResultadosPage() {
  const [data, setData] = useState<Response[]>([]);
  const [processedData, setProcessedData] = useState<ProcessedData>({
    estudouStats: {},
    ondeStats: {},
    totalRespostas: 0
  });

  const fetchData = async () => {
    try {
      const response = await fetch('/api/conhecimento-previo?full=true');
      if (response.ok) {
        const result = await response.json();
        setData(result.data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Processar dados quando mudam
    const estudouStats: { [key: string]: number } = {};
    const ondeStats: { [key: string]: number } = {};

    data.forEach(response => {
      // Contar "Estudou Estatística?"
      estudouStats[response.estudouEstatistica] = (estudouStats[response.estudouEstatistica] || 0) + 1;

      // Contar "Onde?" - pode ter múltiplas respostas
      if (response.onde && Array.isArray(response.onde)) {
        response.onde.forEach(local => {
          if (local !== 'N/A') {
            ondeStats[local] = (ondeStats[local] || 0) + 1;
          }
        });
      }
    });

    setProcessedData({
      estudouStats,
      ondeStats,
      totalRespostas: data.length
    });
  }, [data]);

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
              Resultados - Conhecimento Prévio
            </h1>
            <p className="text-gray-600">
              Visualização em tempo real das respostas do questionário
            </p>
            <div className="w-12 h-px bg-gray-200 mt-4"></div>
          </motion.div>

          {/* Contador de Respostas */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {processedData.totalRespostas} {processedData.totalRespostas === 1 ? 'resposta' : 'respostas'}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Atualiza a cada 5s
              </span>
            </div>
          </motion.div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gráfico 1: Estudou Estatística? */}
            <motion.div
              className="bg-gray-50 rounded-2xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Você já estudou estatística antes?
              </h3>
              {processedData.totalRespostas > 0 ? (
                <Plot
                  data={[
                    {
                      x: Object.keys(processedData.estudouStats),
                      y: Object.values(processedData.estudouStats),
                      type: 'bar',
                      marker: { color: '#374151' },
                    },
                  ]}
                  layout={{
                    xaxis: { title: { text: '' } },
                    yaxis: { title: { text: 'Quantidade' } },
                    margin: { t: 20, b: 50, l: 50, r: 20 },
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    height: 300,
                  }}
                  config={{ displayModeBar: false }}
                  style={{ width: '100%' }}
                />
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Aguardando respostas...
                </p>
              )}
            </motion.div>

            {/* Gráfico 2: Onde? */}
            <motion.div
              className="bg-gray-50 rounded-2xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Onde você estudou? (múltipla escolha)
              </h3>
              {Object.keys(processedData.ondeStats).length > 0 ? (
                <Plot
                  data={[
                    {
                      x: Object.keys(processedData.ondeStats),
                      y: Object.values(processedData.ondeStats),
                      type: 'bar',
                      marker: { color: '#374151' },
                    },
                  ]}
                  layout={{
                    xaxis: { title: { text: '' } },
                    yaxis: { title: { text: 'Quantidade' } },
                    margin: { t: 20, b: 50, l: 50, r: 20 },
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    height: 300,
                  }}
                  config={{ displayModeBar: false }}
                  style={{ width: '100%' }}
                />
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Aguardando respostas...
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
