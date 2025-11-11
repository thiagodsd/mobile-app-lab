import { BlockMath } from 'react-katex';

export default function Slide1() {
  return (
    <section>
      <p>
        Considere um baralho padrão com 52 cartas, contendo 4 naipes (&spades;, &hearts;, &diams;, &clubs;)
        e 13 valores distintos (A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K).
        Ao retirar uma carta aleatoriamente do baralho, qual é a probabilidade
        de obter uma carta com valor 3?
      </p>
      <BlockMath math="P(\text{carta} = 3) = \, ?" />
    </section>
  );
}
