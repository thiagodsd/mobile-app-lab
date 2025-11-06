import { BlockMath } from 'react-katex';

export default function Slide3d() {
  return (
    <section>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '1em'
      }}>
        <h3 style={{
          fontFamily: 'Latin Modern Roman, Computer Modern, serif',
          fontSize: '3em',
          marginBottom: '1em',
          color: '#333',
          textAlign: 'center'
        }}>
          Valor Esperado no Blackjack (Flat Betting)
        </h3>

        {/* CONCEITO DE VALOR ESPERADO */}
        <div style={{
          marginBottom: '1.2em',
          paddingBottom: '1em',
          borderBottom: '1px solid #ddd'
        }}>
          <h4 style={{
            fontFamily: 'Latin Modern Roman, Computer Modern, serif',
            fontSize: '1.1em',
            marginBottom: '0.6em',
            color: '#333',
            textAlign: 'center'
          }}>
            Definição de Valor Esperado
          </h4>

          <div style={{ marginBottom: '0.6em' }}>
            <BlockMath math="X \in \{-V, 0, +V\}" />
          </div>
          <BlockMath math="E[X] = \sum_{x \in X} x \cdot P(X = x)" />
        </div>

        {/* POSSÍVEIS RESULTADOS */}
        <div style={{
          marginBottom: '1.2em',
          paddingBottom: '1em',
          borderBottom: '1px solid #ddd'
        }}>
          <h4 style={{
            fontFamily: 'Latin Modern Roman, Computer Modern, serif',
            fontSize: '1.1em',
            marginBottom: '0.6em',
            color: '#333',
            textAlign: 'center'
          }}>
            Possíveis Resultados (V = valor apostado)
          </h4>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5em',
            marginBottom: '0.8em'
          }}>
            <div style={{ textAlign: 'center', padding: '0.3em' }}>
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.9em',
                fontWeight: 'bold',
                marginBottom: '0.3em',
                color: '#333'
              }}>
                Vitória
              </p>
              <BlockMath math="+V" />
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.8em',
                color: '#666',
                marginTop: '0.3em'
              }}>
                p<sub>v</sub> = 42.22%
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '0.3em' }}>
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.9em',
                fontWeight: 'bold',
                marginBottom: '0.3em',
                color: '#333'
              }}>
                Derrota
              </p>
              <BlockMath math="-V" />
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.8em',
                color: '#666',
                marginTop: '0.3em'
              }}>
                p<sub>d</sub> = 49.10%
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '0.3em' }}>
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.9em',
                fontWeight: 'bold',
                marginBottom: '0.3em',
                color: '#333'
              }}>
                Empate
              </p>
              <BlockMath math="0" />
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.8em',
                color: '#666',
                marginTop: '0.3em'
              }}>
                p<sub>e</sub> = 8.48%
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '1em',
            textAlign: 'left',
            paddingLeft: '2em'
          }}>
            <p style={{
              fontFamily: 'Latin Modern Roman, Computer Modern, serif',
              fontSize: '0.75em',
              color: '#666',
              fontWeight: 'bold',
              marginBottom: '0.3em'
            }}>
              Fontes:
            </p>
            <ul style={{
              fontFamily: 'Latin Modern Roman, Computer Modern, serif',
              fontSize: '0.7em',
              color: '#999',
              listStyleType: 'disc',
              paddingLeft: '1.5em',
              margin: 0
            }}>
              <li>Wizard of Odds: https://wizardofodds.com/ask-the-wizard/blackjack/probability/</li>
              <li>Casino.us: https://www.casino.us/blackjack/odds/</li>
            </ul>
          </div>
        </div>

        {/* FÓRMULA */}
        <div style={{
          marginBottom: '1.2em',
          paddingBottom: '1em',
          borderBottom: '1px solid #ddd',
          textAlign: 'center'
        }}>
          <h4 style={{
            fontFamily: 'Latin Modern Roman, Computer Modern, serif',
            fontSize: '1.1em',
            marginBottom: '0.6em',
            color: '#333'
          }}>
            Fórmula Geral
          </h4>

          <BlockMath math="E[X] = p_v \cdot V + p_d \cdot (-V) + p_e \cdot 0" />
          <div style={{ marginTop: '0.6em' }}>
            <BlockMath math="\boxed{E[X] = V(p_v - p_d)}" />
          </div>
        </div>

        {/* APLICAÇÃO COM PROBABILIDADES REAIS */}
        <div style={{
          marginBottom: '0.5em'
        }}>
          <h4 style={{
            fontFamily: 'Latin Modern Roman, Computer Modern, serif',
            fontSize: '1.1em',
            marginBottom: '0.6em',
            color: '#333',
            textAlign: 'center'
          }}>
            Probabilidades Reais com Estratégia Básica
          </h4>

          <div style={{ textAlign: 'center', marginTop: '0.8em' }}>
            <BlockMath math="E[X] = V(0.4222 - 0.4910) = V(-0.0688)" />

            <div style={{
              marginTop: '1em',
              padding: '0.8em',
              backgroundColor: '#fff5f5',
              borderRadius: '8px'
            }}>
              <BlockMath math="\boxed{E[X] = -6.88\% \cdot V \approx -6.9\% \cdot V}" />
              <p style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '0.85em',
                color: '#dc3545',
                marginTop: '0.6em',
                fontWeight: 'bold'
              }}>
                Perda média de 6.9% por aposta no longo prazo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
