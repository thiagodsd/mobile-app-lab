'use client';

import { useEffect, useState } from 'react';
import 'katex/dist/katex.min.css';
import './minimal-theme.css';

// Import slide components
import Slide1 from './components/Slide1';
import Slide2 from './components/Slide2';
import Slide3a from './components/Slide3a';
import Slide3b from './components/Slide3b';
import Slide3c from './components/Slide3c';
import Slide3d from './components/Slide3d';
import Slide4 from './components/Slide4';
import Slide4b from './components/Slide4b';
import Slide4c from './components/Slide4c';
import Slide4d from './components/Slide4d';
import Slide5 from './components/Slide5';

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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/theme/white.css" />
      <div className="reveal">
        <div className="slides">
          {/* Slide 1 - Probabilidade de tirar carta 3 */}
          <Slide1 />

          {/* Slide 2 - Link para o jogo */}
          <Slide2 />

          {/* Slide 3 - Probabilidade de lucro (vertical stack) */}
          <section>
            <Slide3a />
            <Slide3b />
            <Slide3c />
            <Slide3d />
          </section>

          {/* Slide 4 - Video e Contagem de Cartas (vertical stack) */}
          <section>
            <Slide4 />
            <Slide4b />
            <Slide4c />
            <Slide4d />
          </section>

          {/* Slide 5 - Convite para jogar sabendo contar */}
          <Slide5 />
        </div>
      </div>
    </>
  );
}
