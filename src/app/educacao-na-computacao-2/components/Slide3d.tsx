import { BlockMath } from 'react-katex';

export default function Slide3d() {
  return (
    <section>
      <h3>Valor Esperado no Blackjack (Flat Betting)</h3>

      <h4>Definição de Valor Esperado</h4>
      <BlockMath math="X \in \{-V, 0, +V\}" />
      <BlockMath math="E[X] = \sum_{x \in X} x \cdot P(X = x)" />

      <h4>Possíveis Resultados (V = valor apostado)</h4>

      <dl>
        <dt><strong>Vitória</strong></dt>
        <dd><BlockMath math="+V" /></dd>
        <dd>p<sub>v</sub> = 42.22%</dd>
      </dl>

      <dl>
        <dt><strong>Derrota</strong></dt>
        <dd><BlockMath math="-V" /></dd>
        <dd>p<sub>d</sub> = 49.10%</dd>
      </dl>

      <dl>
        <dt><strong>Empate</strong></dt>
        <dd><BlockMath math="0" /></dd>
        <dd>p<sub>e</sub> = 8.48%</dd>
      </dl>

      <p><strong>Fontes:</strong></p>
      <ul>
        <li>
          Wizard of Odds:{' '}
          <a href="https://wizardofodds.com/ask-the-wizard/blackjack/probability/" target="_blank" rel="noopener noreferrer">
            wizardofodds.com/ask-the-wizard/blackjack/probability/
          </a>
        </li>
        <li>
          Casino.us:{' '}
          <a href="https://www.casino.us/blackjack/odds/" target="_blank" rel="noopener noreferrer">
            casino.us/blackjack/odds/
          </a>
        </li>
      </ul>

      <h4>Fórmula Geral</h4>
      <BlockMath math="E[X] = p_v \cdot V + p_d \cdot (-V) + p_e \cdot 0" />
      <BlockMath math="\boxed{E[X] = V(p_v - p_d)}" />

      <h4>Probabilidades Reais com Estratégia Básica</h4>
      <BlockMath math="E[X] = V(0.4222 - 0.4910) = V(-0.0688)" />
      <BlockMath math="\boxed{E[X] = -6.88\% \cdot V \approx -6.9\% \cdot V}" />
      <p>Perda média de 6.9% por aposta no longo prazo</p>
    </section>
  );
}
