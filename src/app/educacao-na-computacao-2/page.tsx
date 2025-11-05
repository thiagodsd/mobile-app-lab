'use client';

import { useEffect, useState } from 'react';
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
        transition: 'slide',
        transitionSpeed: 'default',
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
          {/* Slide 1 */}
          <section>
            <h1>Hello World</h1>
          </section>

          {/* Slide 2 */}
          <section>
            <h2>Este é o segundo slide</h2>
            <p>Navegue com as setas do teclado</p>
          </section>

          {/* Slide 3 */}
          <section>
            <h2>Terceiro slide</h2>
            <p>Simples e minimalista</p>
          </section>
        </div>
      </div>
    </>
  );
}
