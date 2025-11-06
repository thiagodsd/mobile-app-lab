import { BlockMath } from 'react-katex';

export default function Slide1() {
  return (
    <section>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'left',
        padding: '2em'
      }}>
        <p style={{
          fontFamily: 'Latin Modern Roman, Computer Modern, serif',
          fontSize: '1.4em',
          lineHeight: '1.8',
          marginBottom: '2em',
          color: '#333',
          textAlign: 'justify',
          hyphens: 'auto'
        }}>
          Considere um baralho padrão com 52 cartas, contendo 4 naipes (♠, ♥, ♦, ♣)
          e 13 valores distintos (A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K).
          Ao retirar uma carta aleatoriamente do baralho, qual é a probabilidade
          de obter uma carta com valor 3?
        </p>
        <div style={{
          fontSize: '2em',
          textAlign: 'center',
          marginTop: '1.5em'
        }}>
          <BlockMath math="P(\text{carta} = 3) = \, ?" />
        </div>
      </div>
    </section>
  );
}
