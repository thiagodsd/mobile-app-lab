'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import type { PlotParams } from 'react-plotly.js';

const Plot = dynamic<PlotParams>(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
      <div className="text-gray-400 text-sm">Carregando gráfico...</div>
    </div>
  )
});

const DISTRIBUICOES = ['Normal', 'Uniforme', 'Exponencial', 'Binomial', 'Poisson', 'Bernoulli'];

interface DadosGraficos {
  alturas: number[];
  intervalos: number[];
  acertos: number;
  erros: number;
  total: number;
}

export default function IdentificacaoDePadraoPage() {
  const [altura, setAltura] = useState('');
  const [previsaoAltura, setPrevisaoAltura] = useState('');
  const [previsaoTempo, setPrevisaoTempo] = useState('');
  const [previsaoAcertos, setPrevisaoAcertos] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dadosGraficos, setDadosGraficos] = useState<DadosGraficos | null>(null);

  const allFilled = altura && previsaoAltura && previsaoTempo && previsaoAcertos;

  // Gerar curvas para o catálogo
  const distributions = useMemo(() => {
    return [
      {
        name: 'Normal',
        data: generateNormal(),
      },
      {
        name: 'Uniforme',
        data: generateUniform(),
      },
      {
        name: 'Exponencial',
        data: generateExponential(),
      },
      {
        name: 'Binomial',
        data: generateBinomial(),
      },
      {
        name: 'Poisson',
        data: generatePoisson(),
      },
      {
        name: 'Bernoulli',
        data: generateBernoulli(),
      },
    ];
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allFilled || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const acertouReconhecimento = localStorage.getItem('acertouReconhecimento') === 'true';

      const response = await fetch('/api/identificacao-de-padrao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          altura: parseFloat(altura),
          previsaoAltura,
          previsaoTempo,
          previsaoAcertos,
          acertouReconhecimento,
        }),
      });

      if (!response.ok) throw new Error('Erro ao enviar');

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar respostas. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Polling dos dados após submeter
  useEffect(() => {
    if (!submitted) return;

    const fetchDados = async () => {
      try {
        const response = await fetch('/api/identificacao-de-padrao/dados');
        const data = await response.json();
        setDadosGraficos(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchDados(); // Imediato
    const interval = setInterval(fetchDados, 5000); // A cada 5 segundos

    return () => clearInterval(interval);
  }, [submitted]);

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
              Identificação de Padrões
            </h1>
            <p className="text-gray-600">
              Preveja as distribuições que descrevem os dados da turma
            </p>
            <div className="w-12 h-px bg-gray-200 mt-4"></div>
          </motion.div>

          {/* Catálogo de Distribuições */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-light text-gray-800 mb-4">Distribuições Conhecidas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {distributions.map((dist, index) => (
                <motion.div
                  key={dist.name}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">
                    {dist.name}
                  </h3>
                  <Plot
                    data={[
                      {
                        ...dist.data,
                        type: 'scatter',
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        mode: (('mode' in dist.data && dist.data.mode) || 'lines') as any,
                        line: { color: '#374151', width: 2 },
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      } as any,
                    ]}
                    layout={{
                      showlegend: false,
                      xaxis: {
                        visible: true,
                        showticklabels: true,
                        showgrid: false,
                        zeroline: false,
                        color: '#6B7280',
                        tickformat: ['Binomial', 'Poisson', 'Bernoulli'].includes(dist.name) ? 'd' : '.1f',
                        ...(dist.name === 'Bernoulli' ? {
                          tickmode: 'array',
                          tickvals: [0, 1],
                          range: [-0.5, 1.5]
                        } : ['Binomial', 'Poisson'].includes(dist.name) ? {
                          range: [
                            (dist.data.x[0] as number) - 1,
                            (dist.data.x[dist.data.x.length - 1] as number) + 1
                          ]
                        } : {})
                      },
                      yaxis: { visible: false },
                      margin: { t: 10, b: 30, l: 10, r: 10 },
                      paper_bgcolor: 'transparent',
                      plot_bgcolor: 'transparent',
                      width: 150,
                      height: 150,
                    }}
                    config={{ displayModeBar: false }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Formulário */}
          {!submitted && (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <label className="block text-gray-700 mb-2">
                  Qual sua altura em centímetros?
                  <span className="block text-sm text-gray-500 mt-1">
                    (Se você mede 1,70 metros, digite 170)
                  </span>
                </label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-gray-800"
                  placeholder="170"
                  disabled={submitted}
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  1. Qual distribuição você suspeita que melhor representa as alturas da turma?
                </label>
                <select
                  value={previsaoAltura}
                  onChange={(e) => setPrevisaoAltura(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-gray-800"
                  disabled={submitted}
                  suppressHydrationWarning
                >
                  <option value="">Selecione...</option>
                  {DISTRIBUICOES.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  2. Qual distribuição você suspeita que descreve os intervalos de tempo entre respostas?
                  <span className="block text-sm text-gray-500 mt-1">
                    (Intervalo = tempo em segundos entre cada pessoa que responde)
                  </span>
                </label>
                <select
                  value={previsaoTempo}
                  onChange={(e) => setPrevisaoTempo(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-gray-800"
                  disabled={submitted}
                  suppressHydrationWarning
                >
                  <option value="">Selecione...</option>
                  {DISTRIBUICOES.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  3. Qual distribuição você suspeita que representa acertos vs erros no exercício anterior?
                </label>
                <select
                  value={previsaoAcertos}
                  onChange={(e) => setPrevisaoAcertos(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-gray-800"
                  disabled={submitted}
                  suppressHydrationWarning
                >
                  <option value="">Selecione...</option>
                  {DISTRIBUICOES.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={!allFilled || isSubmitting || submitted}
                className={`w-full py-4 rounded-2xl font-semibold transition-all duration-200 ${
                  !allFilled || isSubmitting || submitted
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-gray-900 hover:shadow-lg'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Previsões'}
              </button>
            </motion.form>
          )}

          {/* Resultados */}
          <AnimatePresence>
            {submitted && dadosGraficos && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-light text-gray-800 mb-3">
                    Distribuições Reais da Turma
                  </h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {dadosGraficos.total} {dadosGraficos.total === 1 ? 'resposta' : 'respostas'}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Atualiza a cada 5s
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Gráfico 1: Alturas */}
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Distribuição das Alturas
                    </h3>
                    {dadosGraficos.alturas.length > 0 ? (
                      <>
                        <Plot
                          data={[
                            {
                              x: dadosGraficos.alturas,
                              type: 'histogram',
                              marker: { color: '#374151' },
                              autobinx: false,
                              xbins: {
                                start: Math.min(...dadosGraficos.alturas) - 5,
                                end: Math.max(...dadosGraficos.alturas) + 5,
                                size: 5
                              },
                            },
                          ]}
                          layout={{
                            xaxis: { title: { text: 'Altura (cm)' } },
                            yaxis: { title: { text: 'Frequência' } },
                            margin: { t: 20, b: 50, l: 50, r: 20 },
                            paper_bgcolor: 'transparent',
                            plot_bgcolor: 'transparent',
                            height: 300,
                          }}
                          config={{ displayModeBar: false }}
                          style={{ width: '100%' }}
                        />
                        <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                          A distribuição de alturas humanas tende a ser aproximadamente Normal
                          (Gaussiana). Isso ocorre devido ao Teorema Central do Limite: muitos fatores
                          genéticos e ambientais independentes contribuem para a altura, resultando em
                          uma curva em forma de sino.
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        Aguardando mais respostas...
                      </p>
                    )}
                  </div>

                  {/* Gráfico 2: Intervalos */}
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Distribuição dos Intervalos de Tempo
                    </h3>
                    {dadosGraficos.intervalos.length > 0 ? (
                      <>
                        <Plot
                          data={[
                            {
                              x: dadosGraficos.intervalos,
                              type: 'histogram',
                              marker: { color: '#374151' },
                            },
                          ]}
                          layout={{
                            xaxis: { title: { text: 'Intervalo (segundos)' } },
                            yaxis: { title: { text: 'Frequência' } },
                            margin: { t: 20, b: 50, l: 50, r: 20 },
                            paper_bgcolor: 'transparent',
                            plot_bgcolor: 'transparent',
                            height: 300,
                          }}
                          config={{ displayModeBar: false }}
                          style={{ width: '100%' }}
                        />
                        <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                          Os intervalos de tempo entre eventos aleatórios independentes (como pessoas
                          respondendo) seguem tipicamente uma distribuição Exponencial. Isso é
                          característico de processos de Poisson, onde eventos ocorrem de forma
                          contínua e independente no tempo.
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        Aguardando mais respostas...
                      </p>
                    )}
                  </div>

                  {/* Gráfico 3: Acertos */}
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Distribuição de Acertos vs Erros
                    </h3>
                    <Plot
                      data={[
                        {
                          x: ['Acertou Tudo', 'Não Acertou Tudo'],
                          y: [dadosGraficos.acertos, dadosGraficos.erros],
                          type: 'bar',
                          marker: { color: '#374151' },
                        },
                      ]}
                      layout={{
                        yaxis: { title: { text: 'Quantidade' } },
                        margin: { t: 20, b: 50, l: 50, r: 20 },
                        paper_bgcolor: 'transparent',
                        plot_bgcolor: 'transparent',
                        height: 300,
                      }}
                      config={{ displayModeBar: false }}
                      style={{ width: '100%' }}
                    />
                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                      A distribuição de acertos e erros em um teste com resultado binário (acertou
                      tudo ou não acertou tudo) segue uma distribuição de Bernoulli. Com múltiplos
                      participantes, isso se torna uma distribuição Binomial, mostrando quantos
                      sucessos ocorreram em n tentativas.
                    </p>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// Funções para gerar as curvas do catálogo
function generateNormal() {
  const x = [], y = [];
  for (let xi = -4; xi <= 4; xi += 0.1) {
    x.push(xi);
    y.push((1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * xi * xi));
  }
  return { x, y };
}

function generateUniform() {
  const x = [], y = [];
  for (let xi = -3; xi <= 3; xi += 0.1) {
    x.push(xi);
    y.push(xi >= -2 && xi <= 2 ? 0.25 : 0);
  }
  return { x, y };
}

function generateExponential() {
  const x = [], y = [];
  const lambda = 1;
  for (let xi = 0; xi <= 5; xi += 0.1) {
    x.push(xi);
    y.push(lambda * Math.exp(-lambda * xi));
  }
  return { x, y };
}

function generateBinomial() {
  const x = [], y = [];
  const n = 10, p = 0.5;
  for (let k = 0; k <= n; k++) {
    const prob = binomialPMF(n, k, p);
    x.push(k, k, k);
    y.push(0, prob, 0);
  }
  return { x, y, mode: 'lines' };
}

function generatePoisson() {
  const x = [], y = [];
  const lambda = 3;
  for (let k = 0; k <= 10; k++) {
    const prob = poissonPMF(k, lambda);
    x.push(k, k, k);
    y.push(0, prob, 0);
  }
  return { x, y, mode: 'lines' };
}

function generateBernoulli() {
  const x: number[] = [], y: number[] = [];
  const values = [0, 1];
  const probs = [0.3, 0.7]; // p = 0.7 de sucesso
  values.forEach((val, i) => {
    x.push(val, val, val);
    y.push(0, probs[i], 0);
  });
  return { x, y, mode: 'lines' };
}

// Funções auxiliares
function binomialPMF(n: number, k: number, p: number) {
  return combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function combination(n: number, k: number) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function poissonPMF(k: number, lambda: number) {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

