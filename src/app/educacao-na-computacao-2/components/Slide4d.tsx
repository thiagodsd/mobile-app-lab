export default function Slide4d() {
  return (
    <section>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2em',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <h3 style={{
          fontFamily: 'Latin Modern Roman, Computer Modern, serif',
          color: '#333',
          textAlign: 'center'
        }}>
          Exemplo: Sistema Hi-Lo em Ação
        </h3>

        <p style={{
          fontFamily: 'Latin Modern Roman, Computer Modern, serif',
          fontSize: '1em',
          color: '#666',
          textAlign: 'center',
          marginBottom: '1.5em',
          fontStyle: 'italic'
        }}>
          Conte TODAS as cartas visíveis na mesa (suas cartas + dealer + outros jogadores)
        </p>

        {/* Regras de Referência */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2em',
          marginBottom: '1.5em',
          fontSize: '0.9em',
          color: '#666'
        }}>
          <span><strong>2-6:</strong> +1</span>
          <span><strong>7-9:</strong> 0</span>
          <span><strong>10-A:</strong> -1</span>
        </div>

        {/* Exemplo de Contagem */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5em'
        }}>
          {/* Rodada 1 */}
          <div style={{
            padding: '1em',
            borderBottom: '1px solid #ddd'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'Latin Modern Roman, Computer Modern, serif'
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ marginBottom: '0.5em', fontWeight: 'bold', color: '#333', textAlign: 'left' }}>
                  Rodada 1: <span style={{ fontSize: '0.85em', fontWeight: 'normal', color: '#999' }}>(cartas visíveis na mesa)</span>
                </p>
                <div style={{
                  display: 'flex',
                  gap: '0.8em',
                  fontSize: '2em',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#000' }}>5♠</span>
                  <span style={{ color: '#e53935' }}>K♥</span>
                  <span style={{ color: '#e53935' }}>3♦</span>
                  <span style={{ color: '#000' }}>9♣</span>
                </div>
              </div>
              <div style={{
                fontSize: '1.2em',
                color: '#666',
                minWidth: '200px',
                textAlign: 'right'
              }}>
                <span style={{ color: '#999' }}>+1 - 1 + 1 + 0 = </span>
                <strong style={{ fontSize: '1.4em', color: '#333' }}>+1</strong>
              </div>
            </div>
          </div>

          {/* Rodada 2 */}
          <div style={{
            padding: '1em',
            borderBottom: '1px solid #ddd'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'Latin Modern Roman, Computer Modern, serif'
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ marginBottom: '0.5em', fontWeight: 'bold', color: '#333', textAlign: 'left' }}>
                  Rodada 2:
                </p>
                <div style={{
                  display: 'flex',
                  gap: '0.8em',
                  fontSize: '2em',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#000' }}>A♠</span>
                  <span style={{ color: '#e53935' }}>2♥</span>
                  <span style={{ color: '#e53935' }}>Q♦</span>
                  <span style={{ color: '#000' }}>4♣</span>
                </div>
              </div>
              <div style={{
                fontSize: '1.2em',
                color: '#666',
                minWidth: '200px',
                textAlign: 'right'
              }}>
                <span style={{ color: '#999' }}>-1 + 1 - 1 + 1 = </span>
                <strong style={{ fontSize: '1.4em', color: '#333' }}>0</strong>
              </div>
            </div>
          </div>

          {/* Rodada 3 */}
          <div style={{
            padding: '1em',
            borderBottom: '1px solid #ddd'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'Latin Modern Roman, Computer Modern, serif'
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ marginBottom: '0.5em', fontWeight: 'bold', color: '#333', textAlign: 'left' }}>
                  Rodada 3:
                </p>
                <div style={{
                  display: 'flex',
                  gap: '0.8em',
                  fontSize: '2em',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#e53935' }}>6♥</span>
                  <span style={{ color: '#000' }}>2♠</span>
                  <span style={{ color: '#000' }}>5♣</span>
                  <span style={{ color: '#e53935' }}>3♦</span>
                </div>
              </div>
              <div style={{
                fontSize: '1.2em',
                color: '#666',
                minWidth: '200px',
                textAlign: 'right'
              }}>
                <span style={{ color: '#999' }}>+1 + 1 + 1 + 1 = </span>
                <strong style={{ fontSize: '1.4em', color: '#333' }}>+4</strong>
              </div>
            </div>
          </div>

          {/* Contagem Total */}
          <div style={{
            padding: '1.5em',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{
              fontFamily: 'Latin Modern Roman, Computer Modern, serif',
              fontSize: '1.2em',
              color: '#333',
              marginBottom: '0.5em'
            }}>
              <strong>Contagem Acumulada Total:</strong>
            </p>
            <p style={{
              fontFamily: 'Latin Modern Roman, Computer Modern, serif',
              fontSize: '2.5em',
              fontWeight: 'bold',
              color: '#2e7d32',
              margin: 0
            }}>
              +5
            </p>
            <p style={{
              fontFamily: 'Latin Modern Roman, Computer Modern, serif',
              fontSize: '0.95em',
              color: '#666',
              marginTop: '0.8em',
              fontStyle: 'italic'
            }}>
              Contagem positiva → Vantagem do jogador → Aumente a aposta
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
