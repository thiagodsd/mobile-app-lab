export default function Slide4c() {
  return (
    <section>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2em',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2em',
          flex: 1
        }}>
          {/* Imagem do Paper à Esquerda */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src="/img-01-cover.png"
              alt="A Favorable Strategy for Twenty-One by Edward Thorp"
              style={{
                maxWidth: '100%',
                height: '66.67vh',
                objectFit: 'contain',
                border: '1px solid #ddd',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Contextualização à Direita */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontFamily: 'Latin Modern Roman, Computer Modern, serif',
            fontSize: '0.95em',
            color: '#333',
            lineHeight: '1.6'
          }}>
            {/* Contextualização Histórica */}
            <div style={{ marginBottom: '1.5em' }}>
              <h3 style={{
                fontSize: '1.3em',
                marginBottom: '0.5em',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left'
              }}>
                Contexto Histórico (1961)
              </h3>
              <p style={{ textAlign: 'justify' }}>
                Edward Thorp, matemático do MIT, usou um computador IBM 704 para provar
                matematicamente que o blackjack pode ser vencido através da contagem de cartas,
                publicando seus resultados em 1961 no prestigiado periódico Proceedings of the
                National Academy of Sciences.
              </p>
            </div>

            {/* Principal Findings */}
            <div style={{ marginBottom: '1.5em' }}>
              <h3 style={{
                fontSize: '1.3em',
                marginBottom: '0.5em',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left'
              }}>
                Descoberta Principal
              </h3>
              <p style={{ marginBottom: '0.8em', textAlign: 'justify' }}>
                Thorp descobriu que quando certas cartas saem do baralho, o jogador
                ganha <strong>vantagem matemática</strong> sobre o cassino:
              </p>
              <ul style={{
                paddingLeft: '1.5em',
                margin: 0,
                textAlign: 'justify'
              }}>
                <li>Sem 5s no baralho: <strong>+3.29%</strong> de vantagem</li>
                <li>Muitas cartas 10: <strong>+3.94%</strong> de vantagem</li>
                <li>Rastreando cartas &quot;tens&quot;: vantagem em <strong>~50%</strong> das situações</li>
              </ul>
            </div>

            {/* Estratégia Hi-Lo */}
            <div>
              <h3 style={{
                fontSize: '1.3em',
                marginBottom: '0.5em',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left'
              }}>
                Estratégia Hi-Lo Simplificada
              </h3>
              <p style={{ marginBottom: '0.5em', textAlign: 'justify' }}>
                Sistema de contagem mais popular:
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.8em',
                fontSize: '1.3em',
                textAlign: 'center',
                marginBottom: '0.8em'
              }}>
                <div style={{ padding: '0.6em' }}>
                  <strong style={{ fontSize: '1.2em' }}>2 a 6:</strong> <span style={{ fontSize: '1.4em', fontWeight: 'bold', color: '#333' }}>+1</span>
                </div>
                <div style={{ padding: '0.6em' }}>
                  <strong style={{ fontSize: '1.2em' }}>7 a 9:</strong> <span style={{ fontSize: '1.4em', fontWeight: 'bold', color: '#333' }}>0</span>
                </div>
                <div style={{ padding: '0.6em' }}>
                  <strong style={{ fontSize: '1.2em' }}>10 a A:</strong> <span style={{ fontSize: '1.4em', fontWeight: 'bold', color: '#333' }}>-1</span>
                </div>
              </div>
              <p style={{ fontSize: '0.9em', fontStyle: 'italic', color: '#666', textAlign: 'left' }}>
                • Contagem positiva = vantagem do jogador → aposte mais<br/>
                • Contagem negativa = vantagem da casa → aposte mínimo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
