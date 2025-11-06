'use client';

import { useEffect, useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './minimal-theme.css';

export default function EducacaoNaComputacao2() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Importar Reveal.js apenas no cliente
    import('reveal.js').then((RevealModule) => {
      const Reveal = RevealModule.default;

      const deck = new Reveal({
        hash: true,
        transition: 'fade',
        transitionSpeed: 'slow',
        controls: true,
        progress: false,
        slideNumber: false,
        center: true,
        width: '100%',
        height: '100%',
        backgroundTransition: 'slide',
      });

      deck.initialize();

      return () => deck.destroy();
    });
  }, []);

  if (!isClient) {
    return null; // ou um loading spinner
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css" />
      <div className="reveal">
        <div className="slides">
          {/* Slide 1 - Probabilidade de tirar carta 3 */}
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

          {/* Slide 2 - Link para o jogo */}
          <section>
            <div style={{
              maxWidth: '900px',
              margin: '0 auto',
              textAlign: 'center',
              padding: '2em'
            }}>
              <h2 style={{
                fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                fontSize: '2em',
                marginBottom: '1.5em',
                color: '#333'
              }}>
                Vamos jogar!
              </h2>
              <a
                href="/simple-blackjack"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                  fontSize: '1.5em',
                  padding: '0.8em 2em',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Jogar Blackjack
              </a>
            </div>
          </section>

          {/* Slide 3 - Probabilidade de lucro (vertical stack) */}
          <section>
            {/* Slide 3a - Pergunta */}
            <section>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}>
                <h2 style={{
                  fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                  fontSize: '3em',
                  color: '#333',
                  textAlign: 'center',
                  lineHeight: '1.4'
                }}>
                  Qual é a probabilidade de sair no lucro?
                </h2>
              </div>
            </section>

            {/* Slide 3b - Demonstração Completa */}
            <section>
              <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '1.5em'
              }}>
                <h3 style={{
                  fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                  fontSize: '1.5em',
                  marginBottom: '1.5em',
                  color: '#333',
                  textAlign: 'center'
                }}>
                  Probabilidade de Blackjack Natural
                </h3>

                {/* CONCEITOS */}
                <div style={{
                  marginBottom: '2em',
                  paddingBottom: '1.5em',
                  borderBottom: '1px solid #ddd'
                }}>
                  <h4 style={{
                    fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                    fontSize: '1.2em',
                    marginBottom: '1em',
                    color: '#333',
                    textAlign: 'center'
                  }}>
                    Conceitos e Ferramentas
                  </h4>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2em',
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
                  gap: '1.5em',
                  marginBottom: '1.5em'
                }}>
                  {/* Caso 1 */}
                  <div style={{ padding: '1em' }}>
                    <p style={{
                      fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                      fontSize: '1.1em',
                      fontWeight: 'bold',
                      marginBottom: '0.5em',
                      color: '#333'
                    }}>
                      Caso 1: Ás → 10
                    </p>
                    <BlockMath math="P(\text{Ás} \cap \text{10}) = P(\text{Ás}) \times P(\text{10} \mid \text{Ás})" />
                    <BlockMath math="P = \frac{4}{52} \times \frac{16}{51} = \frac{64}{2652}" />
                  </div>

                  {/* Caso 2 */}
                  <div style={{ padding: '1em' }}>
                    <p style={{
                      fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                      fontSize: '1.1em',
                      fontWeight: 'bold',
                      marginBottom: '0.5em',
                      color: '#333'
                    }}>
                      Caso 2: 10 → Ás
                    </p>
                    <BlockMath math="P(\text{10} \cap \text{Ás}) = P(\text{10}) \times P(\text{Ás} \mid \text{10})" />
                    <BlockMath math="P = \frac{16}{52} \times \frac{4}{51} = \frac{64}{2652}" />
                  </div>
                </div>

                {/* Probabilidade Total */}
                <div style={{ marginBottom: '1em' }}>
                  <p style={{
                    fontFamily: 'Latin Modern Roman, Computer Modern, serif',
                    fontSize: '0.95em',
                    color: '#666',
                    marginBottom: '0.5em',
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
                  padding: '1.5em',
                  textAlign: 'center'
                }}>
                  <BlockMath math="\boxed{P(\text{Blackjack Natural}) \approx 4.83\%}" />
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
