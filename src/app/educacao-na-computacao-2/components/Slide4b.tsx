export default function Slide4b() {
  return (
    <section>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '1em',
        gap: '0.5em'
      }}>
        <h2 style={{
          fontFamily: 'Latin Modern Roman, Computer Modern, serif',
          color: '#333',
          textAlign: 'center'
        }}>
          Contagem de Cartas
        </h2>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: '2em',
          flex: 1
        }}>
        {/* Imagem da Esquerda - Paper do Thorp */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3em'
        }}>
          <a
            href="https://drive.google.com/file/d/1aDa8SPbw9WhAtJ2q0a32POQXuAIDilwn/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block' }}
          >
            <img
              src="/img-01-cover.png"
              alt="A Favorable Strategy for Twenty-One by Edward Thorp"
              style={{
                maxWidth: '100%',
                height: '50vh',
                objectFit: 'contain',
                border: '1px solid #ddd',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>
          <div style={{
            textAlign: 'left',
            fontFamily: 'Latin Modern Roman, Computer Modern, serif',
            fontSize: '0.85em',
            maxWidth: '90%',
            lineHeight: '1.1'
          }}>
            <p style={{
              fontWeight: 'bold',
              marginBottom: '0.1em',
              color: '#333',
              fontSize: '1em'
            }}>
              A Favorable Strategy for Twenty-One
            </p>
            <p style={{ marginBottom: '0.05em', color: '#555' }}>
              <strong>Autor:</strong> Edward Thorp (1961)
            </p>
            <p style={{ marginBottom: '0.05em', color: '#555' }}>
              <strong>Revista:</strong> PNAS
            </p>
            <p style={{ marginBottom: '0.05em', color: '#555' }}>
              <strong>Referência:</strong> Vol. 47, No. 1, pp. 110-112
            </p>
            <p style={{ marginBottom: '0.1em', color: '#555' }}>
              <strong>DOI:</strong> 10.1073/pnas.47.1.110
            </p>
            <p style={{ marginBottom: '0' }}>
              <strong>Link:</strong>{' '}
              <a
                href="https://drive.google.com/file/d/1aDa8SPbw9WhAtJ2q0a32POQXuAIDilwn/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0066cc',
                  textDecoration: 'none',
                  wordBreak: 'break-all'
                }}
              >
                drive.google.com/file/d/1aDa8SPbw9WhAtJ2q0a32POQXuAIDilwn
              </a>
            </p>
          </div>
        </div>

        {/* Imagem da Direita - Mathematics of Big Four */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3em'
        }}>
          <a
            href="https://drive.google.com/file/d/1qDfbnwQFV2zLpMAqyY0NilPej4OewYa4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block' }}
          >
            <img
              src="/img-00-cover.png"
              alt="Mathematics of Big Four"
              style={{
                maxWidth: '100%',
                height: '50vh',
                objectFit: 'contain',
                border: '1px solid #ddd',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>
          <div style={{
            textAlign: 'left',
            fontFamily: 'Latin Modern Roman, Computer Modern, serif',
            fontSize: '0.85em',
            maxWidth: '90%',
            lineHeight: '1.1'
          }}>
            <p style={{
              fontWeight: 'bold',
              marginBottom: '0.1em',
              color: '#333',
              fontSize: '1em'
            }}>
              Mathematics of The Big Four Casino Table Games
            </p>
            <p style={{ marginBottom: '0.05em', color: '#555' }}>
              <strong>Autor:</strong> Mark Bollman (2021)
            </p>
            <p style={{ marginBottom: '0.05em', color: '#555' }}>
              <strong>Revista:</strong> Technometrics
            </p>
            <p style={{ marginBottom: '0.05em', color: '#555' }}>
              <strong>Referência:</strong> Vol. 65, No. 4, 2023
            </p>
            <p style={{ marginBottom: '0.1em', color: '#555' }}>
              <strong>Publisher:</strong> Taylor & Francis
            </p>
            <p style={{ marginBottom: '0' }}>
              <strong>Link:</strong>{' '}
              <a
                href="https://drive.google.com/file/d/1qDfbnwQFV2zLpMAqyY0NilPej4OewYa4/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0066cc',
                  textDecoration: 'none',
                  wordBreak: 'break-all'
                }}
              >
                drive.google.com/file/d/1qDfbnwQFV2zLpMAqyY0NilPej4OewYa4
              </a>
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
