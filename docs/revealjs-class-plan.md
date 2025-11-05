# Plano de Implementação: Aula Interativa com Reveal.js

## 1. Visão Geral

### 1.1 Objetivo
Criar uma apresentação interativa de 25 minutos usando Reveal.js integrada ao Next.js, onde os alunos transitam entre slides e experiências práticas (jogo de blackjack).

### 1.2 Tecnologias
- **Reveal.js 5.x**: Framework de apresentação HTML
- **Next.js 15.5.4**: Framework React (App Router)
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Estilização consistente com o projeto

---

## 2. Arquitetura de Integração

### 2.1 Abordagem: Reveal.js dentro do Next.js

#### Opção A: Client Component com Reveal.js (RECOMENDADA)
```typescript
// src/app/educacao-na-computacao/aula-blackjack/page.tsx
'use client';

import { useEffect } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';

export default function AulaBlackjack() {
  useEffect(() => {
    const deck = new Reveal({
      hash: true,
      transition: 'slide',
      // ... configurações
    });
    deck.initialize();

    return () => deck.destroy();
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        {/* Slides aqui */}
      </div>
    </div>
  );
}
```

#### Opção B: Componentes React como Slides (ALTERNATIVA)
```typescript
// Usar react-reveal-js ou criar wrapper customizado
import { Deck, Slide } from '@/components/reveal/';

export default function AulaBlackjack() {
  return (
    <Deck>
      <Slide>Conteúdo 1</Slide>
      <Slide>Conteúdo 2</Slide>
    </Deck>
  );
}
```

**Decisão**: Usar **Opção A** por:
- Controle total sobre configurações do Reveal.js
- Acesso a plugins nativos (notes, highlight, math)
- Melhor documentação e comunidade

### 2.2 Estrutura de Arquivos

```
src/app/educacao-na-computacao/aula-blackjack/
├── page.tsx                    # Página principal da aula
├── slides/
│   ├── Slide01_Intro.tsx       # Slide de introdução
│   ├── Slide02_Baralho.tsx     # Demonstração baralho
│   ├── Slide03_Jogo.tsx        # Embed do jogo Momento 1
│   ├── Slide04_Expected.tsx    # Demonstração E[X]
│   ├── Slide05_MIT.tsx         # História MIT vs Vegas
│   ├── Slide06_Exercicio.tsx   # Exercício de probabilidade
│   ├── Slide07_Filme.tsx       # Clip do filme 21
│   ├── Slide08_Paper.tsx       # Paper do Thorp
│   ├── Slide09_HiLo.tsx        # Explicação Hi-Lo
│   ├── Slide10_Exemplo.tsx     # Caso prático
│   ├── Slide11_Limitacoes.tsx  # Limitações
│   ├── Slide12_Jogo2.tsx       # Embed do jogo Momento 2
│   └── Slide13_Leaderboard.tsx # Leaderboard final
├── components/
│   ├── SlideLayout.tsx         # Layout padrão de slide
│   ├── EmbeddedGame.tsx        # Iframe ou embed do jogo
│   └── VideoPlayer.tsx         # Player para clipe do filme
└── assets/
    ├── filme-21-clip.mp4       # Vídeo do filme
    └── images/                 # Imagens dos slides
```

---

## 3. Estrutura dos Slides (Roteiro Pedagógico)

### 3.1 Mapeamento Slide-a-Slide

| # | Título | Conteúdo | Tipo | Tempo |
|---|--------|----------|------|-------|
| **1** | **Bem-vindos!** | Título da aula + contexto | Estático | 30s |
| **2** | **Teste de Intuição** | Demonstração baralho físico (vídeo/imagem) | Interativo (pergunta) | 2min |
| **3** | **Você apostaria?** | Pergunta provocativa + link para jogo | Transição | 1min |
| **4** | **MOMENTO 1: Jogo Livre** | Embed do jogo (iframe ou nova aba) | Prático | 4min |
| **5** | **Compartilhar Estratégias** | Espaço para discussão (timer) | Discussão | 2min |
| **6** | **A Matemática da Casa** | Demonstração E[X] passo a passo | Conceitual | 2min |
| **7** | **MIT vs Las Vegas** | História + imagens MIT/Vegas | Narrativo | 1min |
| **8** | **Exercício Rápido** | Problema de prob + E[X] com link MacKay | Prático | 2min |
| **9** | **O Filme** | Clip de 45s do filme 21 + pergunta | Multimídia | 2min |
| **10** | **O Paper Seminal** | Nome do paper + desafio de busca | Pesquisa | 3min |
| **11** | **Hi-Lo Simplificado** | Explicação visual do sistema | Conceitual | 2min |
| **12** | **Caso Prático** | Exemplo guiado passo a passo | Prático | 2min |
| **13** | **Limitações & Aplicações** | Quando funciona/não funciona | Crítico | 1min |
| **14** | **MOMENTO 2: Jogo Avançado** | Embed do jogo com dica/trapaça | Prático | 4min |
| **15** | **Leaderboard & Reflexão** | Rankings + discussão de aprendizagem | Metacognitivo | 2min |

**TOTAL: ~28 minutos** (buffer de 3min para discussões)

### 3.2 Configurações de Navegação

```typescript
const revealConfig = {
  // Navegação
  controls: true,
  progress: true,
  slideNumber: 'c/t',  // "3/15"
  hash: true,

  // Transições
  transition: 'slide',  // slide | fade | convex | concave | zoom
  transitionSpeed: 'default',

  // Comportamento
  autoSlide: 0,  // Desabilitar auto-advance
  loop: false,

  // Plugins
  plugins: [
    RevealMarkdown,
    RevealHighlight,
    RevealNotes,
    RevealMath.KaTeX
  ],

  // Responsividade
  width: 1920,
  height: 1080,
  margin: 0.04,
  minScale: 0.2,
  maxScale: 2.0,
};
```

---

## 4. Designs dos Slides Principais

### 4.1 Slide 2: Teste de Intuição (Baralho)

```html
<section data-auto-animate>
  <h2>🎴 Teste sua Intuição</h2>

  <div class="fragment">
    <p>Qual a probabilidade de tirar um <strong style="font-size: 2em;">6</strong>?</p>
    <p class="fragment">1/13 ≈ 7.7%</p>
  </div>

  <div class="fragment" style="margin-top: 2em;">
    <img src="/assets/baralho-carta-revelada.jpg" alt="Carta revelada" style="max-width: 400px;" />
    <p>Tirei um <strong>9♣</strong></p>
  </div>

  <div class="fragment">
    <p style="font-size: 1.5em;">E agora? Qual a probabilidade de tirar um 6?</p>
    <p class="fragment" style="color: #42A5F5;">1/51 ≈ 2.0%</p>
    <p class="fragment" style="color: #66BB6A;">💡 Probabilidades <em>mudam</em> com novas informações!</p>
  </div>

  <aside class="notes">
    - Perguntar para a turma antes de revelar cada resposta
    - Enfatizar que SEM reposição, as probabilidades mudam
    - Conectar com Teorema de Bayes (atualização de crenças)
  </aside>
</section>
```

### 4.2 Slide 4: MOMENTO 1 (Jogo Embeded)

```typescript
// Slide04_Jogo.tsx
'use client';

import { EmbeddedGame } from '@/components/aula/EmbeddedGame';

export function Slide04_Jogo() {
  return (
    <section>
      <h2>🎰 MOMENTO 1: Jogo Livre</h2>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h3>Instruções:</h3>
          <ul>
            <li>Digite seu nickname</li>
            <li>Você tem <strong>$100</strong></li>
            <li>Jogue <strong>10 partidas</strong></li>
            <li>Tente lucrar o máximo!</li>
          </ul>

          <div style={{ marginTop: '2rem', padding: '1rem', background: '#FFF3CD', color: '#856404', borderRadius: '8px' }}>
            ⏱️ Tempo: <strong>4 minutos</strong>
          </div>
        </div>

        <div style={{ flex: 2 }}>
          <EmbeddedGame
            momento={1}
            fullscreen={false}
            style={{ border: '4px solid #42A5F5', borderRadius: '12px' }}
          />
        </div>
      </div>

      <aside class="notes">
        - Deixar 4 minutos exatos
        - Circular pela sala observando estratégias
        - Anotar quem teve prejuízo vs lucro
      </aside>
    </section>
  );
}
```

### 4.3 Slide 6: Demonstração Expected Value

```html
<section>
  <h2>🧮 A Matemática da Casa</h2>

  <div class="r-stack">
    <div class="fragment fade-out" data-fragment-index="0">
      <h3>Por que a maioria perdeu dinheiro?</h3>
      <p style="font-size: 1.5em;">Vamos calcular o <strong>Valor Esperado</strong></p>
    </div>

    <div class="fragment fade-in" data-fragment-index="0">
      <h3>Expected Value (E[X])</h3>

      <div class="fragment">
        <p>Probabilidades no Blackjack:</p>
        <table style="font-size: 0.8em; margin: auto;">
          <tr>
            <td>P(Player ganha)</td>
            <td>≈ 49.1%</td>
            <td>+$10</td>
          </tr>
          <tr>
            <td>P(Dealer ganha)</td>
            <td>≈ 48.0%</td>
            <td>-$10</td>
          </tr>
          <tr>
            <td>P(Empate)</td>
            <td>≈ 8.5%</td>
            <td>$0</td>
          </tr>
        </table>
      </div>

      <div class="fragment" style="margin-top: 2rem;">
        <p style="font-size: 1.2em;">E[X] = (0.491 × $10) + (0.480 × -$10) + (0.085 × $0)</p>
        <p class="fragment" style="font-size: 2em; color: #EF5350;">E[X] = <strong>-$0.11</strong></p>
      </div>

      <div class="fragment">
        <p style="color: #FFA726;">A cada $10 apostados, você perde em média <strong>$0.11</strong></p>
        <p style="color: #66BB6A;">Em 10 partidas: <strong>-$1.10</strong> esperado</p>
      </div>
    </div>
  </div>

  <aside class="notes">
    - Mostrar que mesmo sem "trapaça", a casa tem vantagem matemática
    - Conectar com resultados da turma (comparar média real vs esperado)
  </aside>
</section>
```

### 4.4 Slide 9: Clip do Filme 21

```typescript
// Slide09_Filme.tsx
'use client';

import { VideoPlayer } from '@/components/aula/VideoPlayer';

export function Slide09_Filme() {
  return (
    <section>
      <h2>🎬 O Filme: 21 (2008)</h2>

      <VideoPlayer
        src="/assets/filme-21-card-counting-scene.mp4"
        poster="/assets/filme-21-thumbnail.jpg"
        startTime={0}
        endTime={45}  // 45 segundos
        autoplay={true}
        controls={true}
      />

      <div style={{ marginTop: '1rem' }}>
        <h3 className="fragment">O que aconteceu matematicamente?</h3>

        <ul className="fragment">
          <li>Ben aumentou aposta quando o deck estava "quente"</li>
          <li>Cartas altas (10, J, Q, K, A) favorecem o jogador</li>
          <li>Cartas baixas (2-6) favorecem o dealer</li>
        </ul>

        <p className="fragment" style={{ color: '#42A5F5', fontSize: '1.3em', marginTop: '1rem' }}>
          💡 Eles estavam <strong>contando cartas</strong>
        </p>
      </div>

      <aside class="notes">
        - Pausar após o vídeo para discussão
        - Perguntar: "Vocês perceberam algum padrão no comportamento dele?"
        - Revelar: contagem de cartas não é ilegal, mas cassinos podem expulsar
      </aside>
    </section>
  );
}
```

### 4.5 Slide 11: Explicação Hi-Lo

```html
<section data-auto-animate>
  <h2>🔢 Sistema Hi-Lo Simplificado</h2>

  <div class="r-hstack" style="justify-content: space-around; margin-top: 2rem;">
    <!-- Cartas Baixas -->
    <div class="fragment" data-fragment-index="0">
      <h3 style="color: #66BB6A;">Cartas Baixas</h3>
      <div style="font-size: 3em;">2 3 4 5 6</div>
      <p style="font-size: 2em; color: #66BB6A;">+1</p>
      <p style="font-size: 0.8em;">Favorecem o <strong>dealer</strong></p>
    </div>

    <!-- Cartas Médias -->
    <div class="fragment" data-fragment-index="1">
      <h3 style="color: #FFA726;">Cartas Médias</h3>
      <div style="font-size: 3em;">7 8 9</div>
      <p style="font-size: 2em; color: #FFA726;">0</p>
      <p style="font-size: 0.8em;">Neutras</p>
    </div>

    <!-- Cartas Altas -->
    <div class="fragment" data-fragment-index="2">
      <h3 style="color: #EF5350;">Cartas Altas</h3>
      <div style="font-size: 3em;">10 J Q K A</div>
      <p style="font-size: 2em; color: #EF5350;">-1</p>
      <p style="font-size: 0.8em;">Favorecem o <strong>jogador</strong></p>
    </div>
  </div>

  <div class="fragment" style="margin-top: 3rem; padding: 1.5rem; background: rgba(66, 165, 245, 0.2); border-radius: 12px;">
    <h3>Running Count (Contagem Corrida)</h3>
    <p style="font-size: 1.2em;">Some os valores conforme as cartas saem</p>
    <p style="font-size: 1.5em; margin-top: 1rem;">
      Count <strong style="color: #66BB6A;">positivo</strong> = Deck favorável ao jogador<br/>
      Count <strong style="color: #EF5350;">negativo</strong> = Deck favorável ao dealer
    </p>
  </div>

  <aside class="notes">
    - Explicar que Thorp provou matematicamente esse sistema em 1962
    - Sistema Hi-Lo é o mais popular por ser simples e eficaz
    - True Count = Running Count / Decks Remaining (explicar se houver tempo)
  </aside>
</section>
```

### 4.6 Slide 14: MOMENTO 2 (Jogo com Dica/Trapaça)

```typescript
// Slide14_Jogo2.tsx
'use client';

import { EmbeddedGame } from '@/components/aula/EmbeddedGame';

export function Slide14_Jogo2() {
  return (
    <section>
      <h2>🚀 MOMENTO 2: Aplique o Conhecimento</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div>
          <h3>Você aprendeu:</h3>
          <ul style={{ fontSize: '0.9em' }}>
            <li>✅ Expected Value</li>
            <li>✅ Sistema Hi-Lo</li>
            <li>✅ Quando apostar mais</li>
          </ul>

          <div style={{ marginTop: '2rem', padding: '1rem', background: '#E3F2FD', color: '#1565C0', borderRadius: '8px' }}>
            <h4>💡 Ferramentas:</h4>
            <p><strong>Dica</strong>: Resumo Hi-Lo</p>
            <p><strong>Trapaça</strong>: Probabilidades em tempo real</p>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#FFF3CD', color: '#856404', borderRadius: '8px' }}>
            ⏱️ Tempo: <strong>4 minutos</strong>
          </div>
        </div>

        <div>
          <EmbeddedGame
            momento={2}
            fullscreen={false}
            showHint={true}
            showCheat={true}
            style={{ border: '4px solid #66BB6A', borderRadius: '12px' }}
          />
        </div>
      </div>

      <aside class="notes">
        - Encorajar uso da "Dica" primeiro
        - "Trapaça" só se estiverem com dificuldade
        - Observar quem usa cada ferramenta
      </aside>
    </section>
  );
}
```

---

## 5. Componentes Auxiliares

### 5.1 EmbeddedGame Component

```typescript
// src/components/aula/EmbeddedGame.tsx
'use client';

interface EmbeddedGameProps {
  momento: 1 | 2;
  fullscreen?: boolean;
  showHint?: boolean;
  showCheat?: boolean;
  style?: React.CSSProperties;
}

export function EmbeddedGame({ momento, fullscreen = false, ...props }: EmbeddedGameProps) {
  const gameUrl = `/educacao-na-computacao/blackjack/momento-${momento}${
    fullscreen ? '?embedded=false' : '?embedded=true'
  }`;

  if (fullscreen) {
    return (
      <div style={{ textAlign: 'center' }}>
        <a
          href={gameUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '2em',
            padding: '1rem 2rem',
            background: '#42A5F5',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block'
          }}
        >
          🎮 Abrir Jogo (Nova Aba)
        </a>
      </div>
    );
  }

  return (
    <iframe
      src={gameUrl}
      style={{
        width: '100%',
        height: '600px',
        border: 'none',
        borderRadius: '8px',
        ...props.style
      }}
      title={`Blackjack - Momento ${momento}`}
    />
  );
}
```

### 5.2 VideoPlayer Component

```typescript
// src/components/aula/VideoPlayer.tsx
'use client';

import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  startTime?: number;
  endTime?: number;
  autoplay?: boolean;
  controls?: boolean;
}

export function VideoPlayer({
  src,
  poster,
  startTime = 0,
  endTime,
  autoplay = false,
  controls = true
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Definir tempo inicial
    video.currentTime = startTime;

    // Pausar no tempo final
    if (endTime) {
      const handleTimeUpdate = () => {
        if (video.currentTime >= endTime) {
          video.pause();
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [startTime, endTime]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={autoplay}
      controls={controls}
      style={{ width: '100%', maxWidth: '800px', borderRadius: '8px' }}
    />
  );
}
```

### 5.3 Timer Component (Para discussões)

```typescript
// src/components/aula/Timer.tsx
'use client';

import { useState, useEffect } from 'react';

interface TimerProps {
  duration: number; // em segundos
  onComplete?: () => void;
}

export function Timer({ duration, onComplete }: TimerProps) {
  const [remaining, setRemaining] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, remaining, onComplete]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div style={{
      fontSize: '4em',
      fontWeight: 'bold',
      color: remaining <= 10 ? '#EF5350' : '#42A5F5',
      fontFamily: 'monospace'
    }}>
      {minutes}:{seconds.toString().padStart(2, '0')}

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => setIsActive(!isActive)}
          style={{
            fontSize: '0.3em',
            padding: '0.5rem 1rem',
            marginRight: '0.5rem'
          }}
        >
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>

        <button
          onClick={() => { setRemaining(duration); setIsActive(false); }}
          style={{ fontSize: '0.3em', padding: '0.5rem 1rem' }}
        >
          Resetar
        </button>
      </div>
    </div>
  );
}
```

---

## 6. Configuração Reveal.js com Next.js

### 6.1 Instalação

```bash
npm install reveal.js
npm install -D @types/reveal.js
```

### 6.2 Página Principal

```typescript
// src/app/educacao-na-computacao/aula-blackjack/page.tsx
'use client';

import { useEffect } from 'react';
import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import 'reveal.js/plugin/highlight/monokai.css';

// Import slides
import { Slide01_Intro } from './slides/Slide01_Intro';
import { Slide02_Baralho } from './slides/Slide02_Baralho';
// ... outros imports

export default function AulaBlackjack() {
  useEffect(() => {
    const deck = new Reveal({
      hash: true,
      slideNumber: 'c/t',
      transition: 'slide',
      transitionSpeed: 'default',
      plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
    });

    deck.initialize();

    return () => deck.destroy();
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        <Slide01_Intro />
        <Slide02_Baralho />
        <Slide03_Apostar />
        <Slide04_Jogo />
        {/* ... outros slides */}
      </div>
    </div>
  );
}
```

### 6.3 Tema Customizado (Opcional)

```css
/* src/app/educacao-na-computacao/aula-blackjack/custom-theme.css */

:root {
  --r-background-color: #0a0e27;
  --r-main-font: 'Geist Sans', sans-serif;
  --r-heading-font: 'Geist Sans', sans-serif;
  --r-main-color: #e0e0e0;
  --r-heading-color: #42A5F5;
  --r-link-color: #66BB6A;
  --r-selection-background-color: #42A5F5;
}

.reveal h1, .reveal h2, .reveal h3 {
  text-transform: none;
  font-weight: 600;
}

.reveal section img {
  border: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.reveal .fragment.highlight-current-blue {
  opacity: 0.5;
}

.reveal .fragment.highlight-current-blue.current-fragment {
  opacity: 1;
  color: #42A5F5;
}
```

---

## 7. Recursos Multimídia Necessários

### 7.1 Vídeo
- **Filme 21 (clip)**:
  - Duração: 45 segundos
  - Cena: Ben aumentando apostas no blackjack
  - Formato: MP4 (H.264)
  - Resolução: 1080p
  - Path: `public/assets/filme-21-card-counting-scene.mp4`

### 7.2 Imagens
- **Baralho de cartas**:
  - Carta virada
  - Carta revelada (exemplo: 9♣)
  - Path: `public/assets/baralho-*.jpg`

- **MIT/Las Vegas**:
  - Logo MIT
  - Cassino de Las Vegas
  - Mapa: Massachusetts → Nevada
  - Path: `public/assets/mit-vegas-*.jpg`

- **Paper do Thorp**:
  - Capa do paper "Beat the Dealer"
  - Foto de Edward O. Thorp
  - Path: `public/assets/thorp-*.jpg`

### 7.3 Documentos Externos
- Link para livro MacKay: https://www.inference.org.uk/mackay/itila/book.html
- Link para paper Thorp: [Adicionar DOI ou arXiv]

---

## 8. Interatividade com a Turma

### 8.1 Perguntas Interativas (Reveal.js + Polling)

**Opção A: Mentimeter Embed**
```html
<section>
  <h2>Você apostaria na sua intuição?</h2>
  <iframe
    src="https://www.menti.com/al..."
    style="width: 100%; height: 600px;"
  ></iframe>
</section>
```

**Opção B: Sistema Interno (localStorage + agregação)**
```typescript
// Poll simples com mostrar de mãos
<section>
  <h2>Quem teve lucro?</h2>
  <div style={{ fontSize: '3em', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
    <button onClick={() => vote('lucro')}>
      👍 Lucro
    </button>
    <button onClick={() => vote('prejuizo')}>
      👎 Prejuízo
    </button>
  </div>
</section>
```

### 8.2 Speaker Notes (Para o Apresentador)

Reveal.js tem plugin `Notes` que mostra em janela separada:
- Slide atual
- Próximo slide
- Timer
- Notas do apresentador

```html
<aside class="notes">
  - Perguntar para 3-4 alunos suas estratégias
  - Anotar média de lucro/prejuízo da turma
  - Tempo: máximo 2 minutos
</aside>
```

Abrir: pressionar `S` durante apresentação.

---

## 9. Cronometragem e Controle de Ritmo

### 9.1 Plugin de Timer

```typescript
// Plugin customizado para cronometrar slides
const TimerPlugin = {
  id: 'timer',
  init: (deck) => {
    let startTime = Date.now();

    deck.on('slidechanged', (event) => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      console.log(`Slide ${event.indexh}: ${elapsed}s desde início`);

      // Mostrar warning se passar de 25min
      if (elapsed > 1500) {  // 25min
        alert('⚠️ Tempo da aula excedido!');
      }
    });
  }
};

const deck = new Reveal({
  plugins: [..., TimerPlugin]
});
```

### 9.2 Marcadores de Tempo nos Slides

```typescript
// Adicionar badge de tempo estimado em cada slide
<div style={{
  position: 'absolute',
  top: '20px',
  right: '20px',
  background: '#FFA726',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  fontSize: '0.8em'
}}>
  ⏱️ 2min
</div>
```

---

## 10. Checklist de Implementação

### Fase 1: Setup Básico
- [ ] Instalar Reveal.js e dependências
- [ ] Criar estrutura de arquivos (page.tsx, slides/)
- [ ] Configurar Reveal.js no Next.js
- [ ] Testar navegação básica entre slides

### Fase 2: Conteúdo dos Slides
- [ ] Criar Slide 01 (Intro)
- [ ] Criar Slide 02 (Baralho)
- [ ] Criar Slide 03 (Apostar)
- [ ] Criar Slide 04 (Jogo Momento 1)
- [ ] Criar Slide 05 (Compartilhar)
- [ ] Criar Slide 06 (Expected Value)
- [ ] Criar Slide 07 (MIT vs Vegas)
- [ ] Criar Slide 08 (Exercício)
- [ ] Criar Slide 09 (Filme)
- [ ] Criar Slide 10 (Paper)
- [ ] Criar Slide 11 (Hi-Lo)
- [ ] Criar Slide 12 (Caso Prático)
- [ ] Criar Slide 13 (Limitações)
- [ ] Criar Slide 14 (Jogo Momento 2)
- [ ] Criar Slide 15 (Leaderboard)

### Fase 3: Componentes Interativos
- [ ] Componente EmbeddedGame
- [ ] Componente VideoPlayer
- [ ] Componente Timer
- [ ] Speaker Notes em cada slide

### Fase 4: Recursos Multimídia
- [ ] Obter/criar clip do filme 21
- [ ] Imagens de baralho
- [ ] Imagens MIT/Vegas
- [ ] Imagem paper Thorp
- [ ] Links externos (MacKay, paper)

### Fase 5: Polimento
- [ ] Tema customizado (cores, fontes)
- [ ] Transições suaves
- [ ] Animações (fragments)
- [ ] Responsividade
- [ ] Testar cronometragem completa

### Fase 6: Rehearsal
- [ ] Ensaio completo (com timer)
- [ ] Ajustar ritmo (adicionar/remover conteúdo)
- [ ] Testar em projetor real
- [ ] Preparar plano B (se jogo cair)

---

## 11. Plano B (Contingência)

### 11.1 Se o jogo não funcionar
- **Backup**: Screenshots do jogo funcionando
- **Alternativa**: Demonstração ao vivo pelo professor
- **Manual**: Deixar alunos jogarem fora da aula e trazer resultados depois

### 11.2 Se passar do tempo
**Slides opcionais para cortar (em ordem de prioridade):**
1. Slide 08 (Exercício) - pode virar tarefa de casa
2. Slide 07 (MIT vs Vegas) - pode ser só menção rápida
3. Slide 12 (Caso Prático) - simplificar ou pular

**Núcleo inegociável:**
- Slide 04 (Jogo Momento 1)
- Slide 06 (Expected Value)
- Slide 11 (Hi-Lo)
- Slide 14 (Jogo Momento 2)
- Slide 15 (Leaderboard)

---

## 12. Extensões Futuras

### 12.1 Gravação da Aula
- Usar Reveal.js plugin `RevealRecorder` para gravar apresentação
- Publicar como material assíncrono

### 12.2 Modo Assíncrono
- Adicionar narração em áudio
- Auto-advance em slides teóricos
- Pausar em slides práticos (jogos)

### 12.3 Analytics
- Tracking de quais slides os alunos passam mais tempo
- Quais recursos (dica/trapaça) são mais usados
- Correlação entre uso de ferramentas e delta de aprendizagem

---

## 13. Referências

- **Reveal.js Docs**: https://revealjs.com/
- **Next.js + Reveal.js**: https://github.com/hakimel/reveal.js/issues/3162
- **Plugin System**: https://revealjs.com/plugins/
- **Speaker Notes**: https://revealjs.com/speaker-view/
- **Markdown Support**: https://revealjs.com/markdown/
