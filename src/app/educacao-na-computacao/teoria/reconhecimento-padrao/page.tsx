'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import type { PlotParams } from 'react-plotly.js';

const Plot = dynamic<PlotParams>(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[250px] bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
      <div className="text-gray-400 text-sm">Carregando gráfico...</div>
    </div>
  )
});

type Answer = 'valid' | 'invalid' | null;

interface Answers {
  distA: Answer;
  distB: Answer;
  distC: Answer;
}

export default function ReconhecimentoPadraoPage() {
  const [answers, setAnswers] = useState<Answers>({
    distA: null,
    distB: null,
    distC: null
  });
  const [checked, setChecked] = useState(false);

  // Distribuição A - Uniforme (Válida)
  const uniformData = useMemo(() => {
    const x = [];
    const y = [];
    const a = -2; // limite inferior
    const b = 3;  // limite superior
    const height = 1 / (b - a); // altura = 1/5 = 0.2

    for (let xi = -3; xi <= 4; xi += 0.05) {
      x.push(xi);
      // f(x) = 1/(b-a) se a <= x <= b, senão 0
      y.push(xi >= a && xi <= b ? height : 0);
    }
    return { x, y };
  }, []);

  // Distribuição B - Exponencial (Válida)
  const exponentialData = useMemo(() => {
    const x = [];
    const y = [];
    const lambda = 1;
    for (let xi = 0; xi <= 5; xi += 0.05) {
      x.push(xi);
      y.push(lambda * Math.exp(-lambda * xi));
    }
    return { x, y };
  }, []);

  // Distribuição C - Seno (Inválida - tem valores negativos)
  const invalidData = useMemo(() => {
    const x = [];
    const y = [];
    for (let xi = 0; xi <= 2 * Math.PI; xi += 0.05) {
      x.push(xi);
      y.push(0.4 * Math.sin(xi));
    }
    return { x, y };
  }, []);

  const allAnswered = answers.distA && answers.distB && answers.distC;

  const handleVerify = () => {
    setChecked(true);
  };

  const handleReset = () => {
    setAnswers({ distA: null, distB: null, distC: null });
    setChecked(false);
    localStorage.removeItem('acertouReconhecimento');
  };

  const getFeedback = (dist: 'distA' | 'distB' | 'distC') => {
    const correct = {
      distA: 'valid',
      distB: 'valid',
      distC: 'invalid'
    };

    const userAnswer = answers[dist];
    const isCorrect = userAnswer === correct[dist];

    const messages = {
      distA: {
        correctValid: (
          <>
            Correto! Esta é uma FDP válida (Distribuição Uniforme). Ela satisfaz <InlineMath math="f(x) \geq 0" /> para todo <InlineMath math="x" /> e a área do retângulo é igual a 1 (largura × altura = 5 × 0.2).
          </>
        ),
        wrongInvalid: (
          <>
            Incorreto. Esta é uma FDP válida (Distribuição Uniforme). Note que <InlineMath math="f(x) \geq 0" /> em todo o domínio e a área total é 1.
          </>
        )
      },
      distB: {
        correctValid: (
          <>
            Correto! Esta é uma FDP válida (Distribuição Exponencial). Ela satisfaz <InlineMath math="f(x) \geq 0" /> para <InlineMath math="x \geq 0" /> e <InlineMath math="\int_{0}^{\infty} \lambda e^{-\lambda x} dx = 1" />.
          </>
        ),
        wrongInvalid: (
          <>
            Incorreto. Esta é uma FDP válida (Distribuição Exponencial). Note que <InlineMath math="f(x) \geq 0" /> para <InlineMath math="x \geq 0" /> e a área total é 1.
          </>
        )
      },
      distC: {
        correctInvalid: (
          <>
            Correto! Esta NÃO é uma FDP válida. A função assume valores negativos em alguns pontos, violando a propriedade <InlineMath math="f(x) \geq 0" />.
          </>
        ),
        wrongValid: (
          <>
            Incorreto. Esta NÃO é uma FDP válida porque <InlineMath math="f(x) < 0" /> em alguns pontos do domínio, violando a primeira propriedade fundamental.
          </>
        )
      }
    };

    if (dist === 'distC') {
      return {
        isCorrect,
        message: isCorrect ? messages[dist].correctInvalid : messages[dist].wrongValid
      };
    } else {
      return {
        isCorrect,
        message: isCorrect ? messages[dist].correctValid : messages[dist].wrongInvalid
      };
    }
  };

  const allCorrect = checked &&
    getFeedback('distA').isCorrect &&
    getFeedback('distB').isCorrect &&
    getFeedback('distC').isCorrect;

  // Salvar no localStorage quando acertar tudo
  useEffect(() => {
    if (allCorrect) {
      localStorage.setItem('acertouReconhecimento', 'true');
    }
  }, [allCorrect]);

  const commonLayout = {
    font: { color: '#4B5563' },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    margin: { t: 10, b: 40, l: 40, r: 10 },
    height: 250
  };

  const distributions = [
    { key: 'distA' as const, title: 'Distribuição A', data: uniformData },
    { key: 'distB' as const, title: 'Distribuição B', data: exponentialData },
    { key: 'distC' as const, title: 'Distribuição C', data: invalidData }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <motion.div
        className="max-w-6xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-light text-gray-800 mb-2">
              Reconhecimento de Padrões
            </h1>
            <h2 className="text-xl font-light text-gray-600 mb-4">
              Funções de Densidade de Probabilidade
            </h2>
            <div className="w-12 h-px bg-gray-200"></div>
          </motion.div>

          <motion.p
            className="text-gray-700 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Analise cada gráfico abaixo e identifique se representa uma função densidade de probabilidade válida ou inválida.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {distributions.map((dist, index) => (
              <motion.div
                key={dist.key}
                className="bg-gray-50 rounded-2xl border border-gray-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <h3 className="text-lg font-light text-gray-800 mb-4">{dist.title}</h3>
                <Plot
                  data={[{
                    x: dist.data.x,
                    y: dist.data.y,
                    type: 'scatter',
                    mode: 'lines',
                    line: { color: '#374151', width: 2 }
                  }]}
                  layout={{
                    ...commonLayout,
                    xaxis: { title: { text: 'x' }, color: '#6B7280' },
                    yaxis: { title: { text: 'f(x)' }, color: '#6B7280' }
                  }}
                  config={{ displayModeBar: false }}
                  style={{ width: '100%' }}
                />
                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => setAnswers({ ...answers, [dist.key]: 'valid' })}
                    disabled={checked}
                    className={`w-full p-3 rounded-2xl border transition-all duration-200 text-left ${
                      answers[dist.key] === 'valid'
                        ? 'border-blue-400 bg-blue-50 text-blue-700 font-semibold shadow-sm'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25 text-gray-600'
                    } ${checked ? 'cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        answers[dist.key] === 'valid'
                          ? 'border-blue-400 bg-blue-400'
                          : 'border-gray-300'
                      }`}>
                        {answers[dist.key] === 'valid' && (
                          <motion.div
                            className="w-full h-full rounded-full bg-white scale-50"
                            initial={{ scale: 0 }}
                            animate={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                        )}
                      </div>
                      Válida
                    </div>
                  </button>
                  <button
                    onClick={() => setAnswers({ ...answers, [dist.key]: 'invalid' })}
                    disabled={checked}
                    className={`w-full p-3 rounded-2xl border transition-all duration-200 text-left ${
                      answers[dist.key] === 'invalid'
                        ? 'border-red-400 bg-red-50 text-red-700 font-semibold shadow-sm'
                        : 'border-gray-200 hover:border-red-300 hover:bg-red-25 text-gray-600'
                    } ${checked ? 'cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        answers[dist.key] === 'invalid'
                          ? 'border-red-400 bg-red-400'
                          : 'border-gray-300'
                      }`}>
                        {answers[dist.key] === 'invalid' && (
                          <motion.div
                            className="w-full h-full rounded-full bg-white scale-50"
                            initial={{ scale: 0 }}
                            animate={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                        )}
                      </div>
                      Inválida
                    </div>
                  </button>
                </div>
                {checked && (
                  <motion.div
                    className={`mt-4 p-4 rounded-2xl ${
                      getFeedback(dist.key).isCorrect
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className={`text-sm ${
                      getFeedback(dist.key).isCorrect ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {getFeedback(dist.key).message}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {allCorrect && (
            <motion.div
              className="mb-8 flex items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <motion.div
                className="ml-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  Parabéns!
                </h3>
                <p className="text-gray-700">
                  Você acertou todas as distribuições! Demonstrou excelente compreensão das propriedades fundamentais das funções de densidade de probabilidade.
                </p>
              </motion.div>
            </motion.div>
          )}

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={handleVerify}
              disabled={!allAnswered || checked}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
                !allAnswered || checked
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-900 hover:shadow-lg'
              }`}
            >
              Verificar Respostas
            </button>
            {checked && (
              <motion.button
                onClick={handleReset}
                className="px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Tentar Novamente
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}