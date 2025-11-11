import { BlockMath } from 'react-katex';

export default function Slide3b() {
  return (
    <section>
      <h3>Probabilidade de Blackjack Natural</h3>

      <h4>Conceitos e Ferramentas</h4>

      <dl>
        <dt><strong>Probabilidade Conjunta</strong></dt>
        <dd><em>Ex: Lançar dois dados e ambos serem pares</em></dd>
        <dd>P(D<sub>1</sub> par &cap; D<sub>2</sub> par) = P(D<sub>1</sub> par) &times; P(D<sub>2</sub> par)</dd>
        <dd><BlockMath math="P(A \cap B) = P(A) \times P(B \mid A)" /></dd>
      </dl>

      <dl>
        <dt><strong>Eventos Mutuamente Exclusivos</strong></dt>
        <dd><em>Ex: A soma dos dados ser 7 ou 11</em></dd>
        <dd>P(soma = 7 &cup; soma = 11) = P(soma = 7) + P(soma = 11)</dd>
        <dd><BlockMath math="P(A \cup B) = P(A) + P(B)" /></dd>
      </dl>

      <h4>Cálculos</h4>

      <article>
        <p><strong>Caso 1: Ás &rarr; 10</strong></p>
        <BlockMath math="P(\text{Ás} \cap \text{10}) = P(\text{Ás}) \times P(\text{10} \mid \text{Ás})" />
        <BlockMath math="P = \frac{4}{52} \times \frac{16}{51} = \frac{64}{2652}" />
      </article>

      <article>
        <p><strong>Caso 2: 10 &rarr; Ás</strong></p>
        <BlockMath math="P(\text{10} \cap \text{Ás}) = P(\text{10}) \times P(\text{Ás} \mid \text{10})" />
        <BlockMath math="P = \frac{16}{52} \times \frac{4}{51} = \frac{64}{2652}" />
      </article>

      <p><em>União de eventos mutuamente exclusivos:</em></p>
      <BlockMath math="P(\text{Blackjack}) = P(\text{Ás} \cap \text{10}) + P(\text{10} \cap \text{Ás})" />
      <BlockMath math="P(\text{Blackjack}) = \frac{64}{2652} + \frac{64}{2652} = \frac{128}{2652} = \frac{32}{663}" />

      <BlockMath math="\boxed{P(\text{Blackjack Natural}) \approx 4.83\%}" />
    </section>
  );
}
