import { BlockMath } from 'react-katex';

export default function Slide3b() {
  return (
    <section>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '1em'
      }}>
        <h3 style={{
          fontFamily: 'Latin Modern Roman, Computer Modern, serif',
          fontSize: '1.5em',
          marginBottom: '0.5em',
          color: '#333',
          textAlign: 'center'
        }}>
          Probabilidade de Blackjack Natural
        </h3>

        {/* CONCEITOS */}
        <div style={{
          marginBottom: '1em',
          paddingBottom: '0.8em',
          borderBottom: '1px solid #ddd'
        }}>
          <h4 style={{
            fontFamily: 'Latin Modern Roman, Computer Modern, serif',
            fontSize: '1.2em',
            marginBottom: '0.5em',
            color: '#333',
            textAlign: 'center'
          }}>
            Conceitos e Ferramentas
          </h4>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5em',
            alignItems: 'center'
          }}>
            {/* Probabilidade Conjunta */}
            <div>
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '1em',
                fontWeight: 'bold',
                marginBottom: '0.3em',
                color: '#333',
                textAlign: 'center'
              }}>
                Probabilidade Conjunta
              </p>
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.85em',
                color: '#999',
                textAlign: 'center',
                marginBottom: '0.3em',
                fontStyle: 'italic'
              }}>
                Ex: Lançar dois dados e ambos serem pares
              </p>
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.75em',
                color: '#999',
                textAlign: 'center',
                marginBottom: '0.5em'
              }}>
                P(D₁ par ∩ D₂ par) = P(D₁ par) × P(D₂ par)
              </p>
              <BlockMath math="P(A \cap B) = P(A) \times P(B \mid A)" />
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '0.5em'
              }}>
                <svg width="120" height="100" viewBox="0 0 120 100">
                  <circle cx="45" cy="50" r="30" fill="none" stroke="#333" strokeWidth="2" />
                  <circle cx="75" cy="50" r="30" fill="none" stroke="#333" strokeWidth="2" />
                  <text x="60" y="55" textAnchor="middle" fontSize="12" fill="#333">A∩B</text>
                </svg>
              </div>
            </div>

            {/* Eventos Mutuamente Exclusivos */}
            <div>
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '1em',
                fontWeight: 'bold',
                marginBottom: '0.3em',
                color: '#333',
                textAlign: 'center'
              }}>
                Eventos Mutuamente Exclusivos
              </p>
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.85em',
                color: '#999',
                textAlign: 'center',
                marginBottom: '0.3em',
                fontStyle: 'italic'
              }}>
                Ex: A soma dos dados ser 7 ou 11
              </p>
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.75em',
                color: '#999',
                textAlign: 'center',
                marginBottom: '0.5em'
              }}>
                P(soma = 7 ∪ soma = 11) = P(soma = 7) + P(soma = 11)
              </p>
              <BlockMath math="P(A \cup B) = P(A) + P(B)" />
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '0.5em'
              }}>
                <svg width="150" height="100" viewBox="0 0 150 100">
                  <circle cx="40" cy="50" r="30" fill="none" stroke="#333" strokeWidth="2" />
                  <circle cx="110" cy="50" r="30" fill="none" stroke="#333" strokeWidth="2" />
                  <text x="40" y="55" textAnchor="middle" fontSize="12" fill="#333">A</text>
                  <text x="110" y="55" textAnchor="middle" fontSize="12" fill="#333">B</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* CÁLCULOS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1em',
          marginBottom: '0.8em'
        }}>
          {/* Caso 1 */}
          <div style={{ padding: '0.5em' }}>
            <p style={{
              fontFamily: 'Latin Modern Roman, Computer Modern, serif',
              fontSize: '1.1em',
              fontWeight: 'bold',
              marginBottom: '0.3em',
              color: '#333'
            }}>
              Caso 1: Ás → 10
            </p>
            <BlockMath math="P(\text{Ás} \cap \text{10}) = P(\text{Ás}) \times P(\text{10} \mid \text{Ás})" />
            <BlockMath math="P = \frac{4}{52} \times \frac{16}{51} = \frac{64}{2652}" />
          </div>

          {/* Caso 2 */}
          <div style={{ padding: '0.5em' }}>
            <p style={{
              fontFamily: 'Latin Modern Roman, Computer Modern, serif',
              fontSize: '1.1em',
              fontWeight: 'bold',
              marginBottom: '0.3em',
              color: '#333'
            }}>
              Caso 2: 10 → Ás
            </p>
            <BlockMath math="P(\text{10} \cap \text{Ás}) = P(\text{10}) \times P(\text{Ás} \mid \text{10})" />
            <BlockMath math="P = \frac{16}{52} \times \frac{4}{51} = \frac{64}{2652}" />
          </div>
        </div>

        {/* Probabilidade Total */}
        <div style={{ marginBottom: '0.5em' }}>
          <p style={{
            fontFamily: 'Latin Modern Roman, Computer Modern, serif',
            fontSize: '0.95em',
            color: '#666',
            marginBottom: '0.3em',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            União de eventos mutuamente exclusivos:
          </p>
          <BlockMath math="P(\text{Blackjack}) = P(\text{Ás} \cap \text{10}) + P(\text{10} \cap \text{Ás})" />
          <BlockMath math="P(\text{Blackjack}) = \frac{64}{2652} + \frac{64}{2652} = \frac{128}{2652} = \frac{32}{663}" />
        </div>

        {/* Resultado */}
        <div style={{
          padding: '0.5em',
          textAlign: 'center'
        }}>
          <BlockMath math="\boxed{P(\text{Blackjack Natural}) \approx 4.83\%}" />
        </div>
      </div>
    </section>
  );
}
