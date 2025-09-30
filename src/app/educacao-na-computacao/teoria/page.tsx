'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import type { PlotParams } from 'react-plotly.js';

const Plot = dynamic<PlotParams>(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
      <div className="text-gray-400 text-sm">Carregando gráfico...</div>
    </div>
  )
});

export default function TeoriaPage() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);

  // Gerar pontos x e calcular y usando a fórmula gaussiana
  const { xValues, yValues } = useMemo(() => {
    const x = [];
    const y = [];

    for (let xi = -20; xi <= 20; xi += 0.05) {
      x.push(xi);
      const exponent = -0.5 * Math.pow((xi - mu) / sigma, 2);
      const yi = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      y.push(yi);
    }

    return { xValues: x, yValues: y };
  }, [mu, sigma]);

  const data = [
    {
      x: xValues,
      y: yValues,
      type: 'scatter' as const,
      mode: 'lines' as const,
      fill: 'tozeroy' as const,
      line: {
        color: '#000',
        width: 2
      },
      fillcolor: 'rgba(0, 0, 0, 0.1)'
    }
  ];

  const layout = {
    xaxis: {
      title: { text: 'x' },
      range: [-20, 20]
    },
    yaxis: {
      title: { text: 'f(x)' }
    },
    font: {
      color: '#000'
    },
    paper_bgcolor: 'white',
    plot_bgcolor: 'white',
    margin: { t: 20 }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light text-black mb-8">
          Distribuições de Probabilidade
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-light text-black mb-4">Função Densidade de Probabilidade</h2>

          <p className="text-black mb-4 leading-relaxed">
            Uma função densidade de probabilidade (FDP) descreve a probabilidade relativa de uma variável aleatória contínua assumir determinado valor. Toda FDP possui três propriedades fundamentais:
          </p>

          <ol className="list-decimal list-inside text-black mb-6 space-y-2">
            <li>
              É sempre não-negativa: <InlineMath math="f(x) \geq 0" /> para todo <InlineMath math="x" />
            </li>
            <li>
              A área total sob a curva é sempre igual a 1: <InlineMath math="\int_{-\infty}^{\infty} f(x) \, dx = 1" />
            </li>
            <li>
              A probabilidade de um valor estar em um intervalo <InlineMath math="[a,b]" /> é dada por: <InlineMath math="P(a \leq X \leq b) = \int_{a}^{b} f(x) \, dx" />
            </li>
          </ol>

          <h2 className="text-2xl font-light text-black mb-4 mt-8">Distribuição Normal</h2>

          <p className="text-black mb-6 leading-relaxed">
            A distribuição normal descreve como muitos fenômenos naturais se comportam.
            A maioria dos valores fica perto da média, e valores extremos são raros.
          </p>

          <div className="my-6">
            <BlockMath math="f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}" />
          </div>

          <p className="text-black">
            Onde <InlineMath math="\mu" /> é a média e <InlineMath math="\sigma" /> é o desvio padrão.
          </p>

          <div className="my-8 space-y-4">
            <div>
              <label className="flex items-center justify-between text-black mb-2">
                <span><InlineMath math={`\\mu = ${mu}`} /></span>
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={mu}
                onChange={(e) => setMu(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-black mb-2">
                <span><InlineMath math={`\\sigma = ${sigma.toFixed(1)}`} /></span>
              </label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={sigma}
                onChange={(e) => setSigma(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="my-8">
            <Plot
              data={data}
              layout={layout}
              config={{ responsive: true }}
              style={{ width: '100%', height: '400px' }}
            />
          </div>

        </section>
      </div>
    </div>
  );
}