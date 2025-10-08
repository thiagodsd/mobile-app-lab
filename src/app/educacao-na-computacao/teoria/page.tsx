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

        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-screen object-contain"
        >
          <source src="/animations/BernoulliDistribution.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>

        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-screen object-contain"
        >
          <source src="/animations/SimpleNormalDistribution.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>

        {/* <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full my-8"
        >
          <source src="/animations/MeanCalculation.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video> */}

        <section className="mb-12">
          <h2 className="text-2xl font-light text-black mb-4">Processos e Distribuições</h2>

          <p className="text-black mb-4 leading-relaxed">
            Em probabilidade e estatística, uma função densidade de probabilidade é como se fosse uma &ldquo;fabriquinha&rdquo;
            que produz números aleatórios seguindo um padrão específico. Mas o que realmente decide qual será a
            distribuição de uma variável aleatória é o <strong>processo</strong> que a gera.
          </p>

          <p className="text-black mb-4 leading-relaxed">
            Alguns exemplos de processos e suas distribuições:
          </p>

          <ul className="list-disc list-inside text-black mb-6 space-y-2 ml-4">
            <li>
              <strong>Lançar uma moeda:</strong> O processo de jogar uma moeda justa gera uma distribuição de Bernoulli.
              Cada lançamento tem dois resultados possíveis (cara ou coroa) com probabilidade fixa.
            </li>
            <li>
              <strong>Medir altura de pessoas:</strong> O processo de medir alturas em uma população gera aproximadamente
              uma distribuição normal. A maioria das pessoas tem altura próxima à média, com valores extremos sendo raros.
            </li>
            <li>
              <strong>Contar carros em uma rodovia:</strong> O processo de contar quantos carros passam por minuto
              gera uma distribuição de Poisson. Os eventos (carros passando) ocorrem de forma independente ao longo do tempo.
            </li>
            <li>
              <strong>Tempo até uma lâmpada queimar:</strong> O processo de desgaste natural gera uma distribuição exponencial.
              A probabilidade de falha é constante ao longo do tempo.
            </li>
          </ul>

          <p className="text-black mb-6 leading-relaxed">
            Compreender o <em>processo</em> por trás dos dados é fundamental para escolher a distribuição de probabilidade
            adequada e fazer previsões corretas.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-light text-black mb-4">Função Densidade de Probabilidade</h2>

          <p className="text-black mb-4 leading-relaxed">
            Uma função densidade de probabilidade (FDP) descreve a probabilidade relativa de uma variável aleatória
            contínua assumir determinado valor. Pense nela como uma curva que mostra quais valores são mais prováveis
            de ocorrer: quanto maior a altura da curva em um ponto, maior a chance de observar valores próximos a ele.
          </p>

          <p className="text-black mb-4 leading-relaxed">
            Toda FDP precisa satisfazer duas propriedades básicas:
          </p>

          <ol className="list-decimal list-inside text-black mb-6 space-y-3 ml-4">
            <li>
              <strong>Não-negatividade:</strong> A função nunca pode ser negativa, <InlineMath math="f(x) \geq 0" />
              para todo <InlineMath math="x" />. Isso faz sentido porque probabilidade não pode ser negativa.
            </li>
            <li>
              <strong>Normalização:</strong> A área total sob a curva deve ser igual a 1,
              <InlineMath math="\int_{-\infty}^{\infty} f(x) \, dx = 1" />.
              Isso garante que a soma de todas as probabilidades possíveis seja 100%.
            </li>
          </ol>

          <h3 className="text-xl font-light text-black mb-3 mt-8">Calculando Probabilidades com a FDP</h3>

          <p className="text-black mb-4 leading-relaxed">
            A interpretação mais importante de uma FDP é que <strong>a probabilidade de uma variável cair em um
            intervalo é dada pela área sob a curva naquele intervalo</strong>. Matematicamente:
          </p>

          <div className="my-6">
            <BlockMath math="P(a \leq X \leq b) = \int_{a}^{b} f(x) \, dx" />
          </div>

          <p className="text-black mb-6 leading-relaxed">
            Por exemplo, se você quer saber a probabilidade da altura de uma pessoa estar entre 1,60m e 1,80m,
            você calcula a área sob a curva da distribuição de alturas nesse intervalo. Quanto maior a área,
            maior a probabilidade!
          </p>

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
                <span><InlineMath math={`\\mu = ${mu.toFixed(1)}`} /></span>
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={mu}
                onChange={(e) => setMu(parseFloat(e.target.value))}
                className="w-full"
                suppressHydrationWarning
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
                suppressHydrationWarning
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