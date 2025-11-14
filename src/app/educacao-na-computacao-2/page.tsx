'use client';

import { useEffect, useState } from 'react';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/serif.css';

// Import slide components
import Slide0 from './components/Slide0';
import Slide1a from './components/Slide1a';
import Slide1b from './components/Slide1b';
import Slide1c from './components/Slide1c';
import Slide2a from './components/Slide2a';
import Slide2 from './components/Slide2';
import Slide3a from './components/Slide3a';
import Slide3b from './components/Slide3b';
import Slide3b2 from './components/Slide3b2';
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

    // Importar Reveal.js e plugin Math apenas no cliente
    Promise.all([
      import('reveal.js'),
      import('reveal.js/plugin/math/math.esm.js')
    ]).then(([RevealModule, MathModule]) => {
      const Reveal = RevealModule.default;
      const RevealMath = MathModule.default;

      const deck = new Reveal({
        hash: true,
        transition: 'fade',
        transitionSpeed: 'slow',
        controls: true,
        progress: true,
        slideNumber: true,
        center: true,
        width: '100%',
        height: '100%',
        backgroundTransition: 'slide',
        plugins: [RevealMath.KaTeX],
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
      <div className="reveal">
        <div className="slides">
          {/* Slide 0 - Introdução */}
          <Slide0 />

          {/* Slide 1 - Probabilidade de tirar carta 3 (vertical stack) */}
          <section>
            <Slide1a />
            <Slide1b />
            <Slide1c />
          </section>

          {/* Slide 2 - Conexão com Blackjack e Link para o jogo (vertical stack) */}
          <section>
            <Slide2a />
            <Slide2 />
          </section>

          {/* Slide 3 - Probabilidade de lucro (vertical stack) */}
          <section>
            <Slide3a />
            <Slide3b />
            <Slide3b2 />
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
