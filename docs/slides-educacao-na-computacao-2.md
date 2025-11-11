# Documentação dos Slides - Educação na Computação 2

## Visão Geral
Apresentação interativa sobre probabilidade e estatística aplicada ao jogo de Blackjack, utilizando Reveal.js com tema serif.

**Localização:** `src/app/educacao-na-computacao-2/`

**Tema:** Reveal.js Serif Theme

**Estrutura:** 5 slides principais, sendo 2 com subslides verticais (Slides 3 e 4)

---

## Slide 1 - Problema Inicial de Probabilidade

**Arquivo:** `components/Slide1.tsx`

**Tipo:** Slide horizontal simples

**Conteúdo:**
- **Objetivo:** Introduzir um problema básico de probabilidade com baralho
- **Descrição do problema:**
  - Considerar um baralho padrão com 52 cartas
  - 4 naipes (♠, ♥, ♦, ♣)
  - 13 valores distintos (A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K)
  - Pergunta: "Qual é a probabilidade de obter uma carta com valor 3?"
- **Formato:** Parágrafo justificado com fórmula matemática em LaTeX
- **Fórmula apresentada:** P(carta = 3) = ?

**Características técnicas:**
- Usa react-katex para renderização de fórmulas matemáticas
- Fonte serif (herdada do tema)
- Tamanho de fonte: 1.4em para o texto
- Line-height: 1.8
- Hyphens: auto para quebra de palavras

---

## Slide 2 - Convite para Jogar

**Arquivo:** `components/Slide2.tsx`

**Tipo:** Slide horizontal simples

**Conteúdo:**
- **Objetivo:** Direcionar os alunos para jogar o Blackjack
- **Título:** "Vamos jogar!"
- **Elemento interativo:** Botão "Jogar Blackjack"
- **Link:** `/simple-blackjack` (abre em nova aba)

**Características técnicas:**
- Botão com hover effect (escala 1.05 e mudança de cor)
- Background preto (#000) que muda para cinza escuro (#333) no hover
- Fonte serif
- Tamanho de fonte: 1.5em
- Border-radius: 8px

---

## Slide 3 - Probabilidade de Blackjack (Stack Vertical)

### Slide 3a - Pergunta Introdutória

**Arquivo:** `components/Slide3a.tsx`

**Tipo:** Slide vertical (primeiro da stack)

**Conteúdo:**
- **Título:** "Qual é a probabilidade de Blackjack?"
- Slide centralizador que introduz a próxima seção

**Características técnicas:**
- Layout: flex centrado vertical e horizontalmente
- Fonte serif
- Cor: #333

---

### Slide 3b - Cálculo da Probabilidade de Blackjack Natural

**Arquivo:** `components/Slide3b.tsx`

**Tipo:** Slide vertical (segundo da stack)

**Conteúdo:**
- **Título:** "Probabilidade de Blackjack Natural"

**Seção 1 - Conceitos e Ferramentas:**
- **Probabilidade Conjunta**
  - Exemplo: Lançar dois dados e ambos serem pares
  - Fórmula: P(A ∩ B) = P(A) × P(B | A)
  - Diagrama de Venn mostrando interseção

- **Eventos Mutuamente Exclusivos**
  - Exemplo: A soma dos dados ser 7 ou 11
  - Fórmula: P(A ∪ B) = P(A) + P(B)
  - Diagrama de Venn mostrando união sem interseção

**Seção 2 - Cálculos:**
- **Caso 1: Ás → 10**
  - P(Ás ∩ 10) = P(Ás) × P(10 | Ás)
  - P = 4/52 × 16/51 = 64/2652

- **Caso 2: 10 → Ás**
  - P(10 ∩ Ás) = P(10) × P(Ás | 10)
  - P = 16/52 × 4/51 = 64/2652

**Seção 3 - Probabilidade Total:**
- União de eventos mutuamente exclusivos
- P(Blackjack) = P(Ás ∩ 10) + P(10 ∩ Ás)
- P(Blackjack) = 64/2652 + 64/2652 = 128/2652 = 32/663

**Resultado Final:**
- **P(Blackjack Natural) ≈ 4.83%** (em caixa destacada)

**Características técnicas:**
- Layout em grid (2 colunas para conceitos)
- Usa react-katex (BlockMath) para fórmulas matemáticas
- SVG inline para diagramas de Venn
- Border-bottom para separar seções

---

### Slide 3c - Pergunta sobre Lucro

**Arquivo:** `components/Slide3c.tsx`

**Tipo:** Slide vertical (terceiro da stack)

**Conteúdo:**
- **Título:** "Qual é o lucro esperado?"
- Slide centralizador que introduz o conceito de valor esperado

**Características técnicas:**
- Layout: flex centrado vertical e horizontalmente
- Fonte serif
- Cor: #333

---

### Slide 3d - Valor Esperado no Blackjack

**Arquivo:** `components/Slide3d.tsx`

**Tipo:** Slide vertical (quarto da stack)

**Conteúdo:**
- **Título:** "Valor Esperado no Blackjack (Flat Betting)"

**Seção 1 - Definição de Valor Esperado:**
- X ∈ {-V, 0, +V}
- E[X] = Σ x · P(X = x)

**Seção 2 - Possíveis Resultados:**
Grid com 3 colunas mostrando:

1. **Vitória**
   - Ganho: +V
   - Probabilidade: pᵥ = 42.22%

2. **Derrota**
   - Perda: -V
   - Probabilidade: pₐ = 49.10%

3. **Empate**
   - Resultado: 0
   - Probabilidade: pₑ = 8.48%

**Fontes citadas:**
- Wizard of Odds: https://wizardofodds.com/ask-the-wizard/blackjack/probability/
- Casino.us: https://www.casino.us/blackjack/odds/

**Seção 3 - Fórmula Geral:**
- E[X] = pᵥ · V + pₐ · (-V) + pₑ · 0
- **E[X] = V(pᵥ - pₐ)** (em caixa)

**Seção 4 - Probabilidades Reais com Estratégia Básica:**
- E[X] = V(0.4222 - 0.4910) = V(-0.0688)
- **E[X] = -6.88% · V ≈ -6.9% · V** (em caixa com fundo vermelho claro)
- **Conclusão:** Perda média de 6.9% por aposta no longo prazo

**Características técnicas:**
- Layout em grid (3 colunas para resultados)
- Background #fff5f5 para destacar resultado negativo
- Usa react-katex (BlockMath) para todas as fórmulas
- Cor vermelha (#dc3545) para destacar perda
- Sub tags HTML para subscritos

---

## Slide 4 - Contagem de Cartas (Stack Vertical)

### Slide 4 - Vídeo Introdutório

**Arquivo:** `components/Slide4.tsx`

**Tipo:** Slide vertical (primeiro da stack)

**Conteúdo:**
- **Título:** "O que está acontecendo aqui?"
- **Elemento:** Iframe do YouTube
- **Vídeo:** https://www.youtube.com/embed/MlCYBrLOP3A
- **Dimensões:** 960x540

**Características técnicas:**
- Iframe responsivo (max-width: 100%, max-height: 70%)
- Permite autoplay, clipboard-write, encrypted-media, gyroscope, picture-in-picture
- Layout flex centrado

---

### Slide 4b - Referências Acadêmicas

**Arquivo:** `components/Slide4b.tsx`

**Tipo:** Slide vertical (segundo da stack)

**Conteúdo:**
- **Título:** "Contagem de Cartas"
- **Layout:** Duas colunas com papers acadêmicos

**Paper 1 (Esquerda):**
- **Imagem:** `/img-01-cover.png` (clicável)
- **Título:** A Favorable Strategy for Twenty-One
- **Autor:** Edward Thorp (1961)
- **Revista:** PNAS
- **Referência:** Vol. 47, No. 1, pp. 110-112
- **DOI:** 10.1073/pnas.47.1.110
- **Link:** Google Drive compartilhado

**Paper 2 (Direita):**
- **Imagem:** `/img-00-cover.png` (clicável)
- **Título:** Mathematics of The Big Four Casino Table Games
- **Autor:** Mark Bollman (2021)
- **Revista:** Technometrics
- **Referência:** Vol. 65, No. 4, 2023
- **Publisher:** Taylor & Francis
- **Link:** Google Drive compartilhado

**Características técnicas:**
- Grid layout (2 colunas)
- Imagens com altura fixa (50vh)
- Hover effect nas imagens (escala 1.02)
- Links clicáveis nas imagens e nos textos
- Object-fit: contain
- Box-shadow para destacar as capas

---

### Slide 4c - Contexto Histórico do Paper de Thorp

**Arquivo:** `components/Slide4c.tsx`

**Tipo:** Slide vertical (terceiro da stack)

**Conteúdo:**
- **Layout:** Duas colunas (imagem à esquerda, texto à direita)

**Coluna Esquerda:**
- Imagem do paper de Thorp (`/img-01-cover.png`)
- Altura: 66.67vh
- Border e box-shadow

**Coluna Direita - 3 Seções:**

**1. Contexto Histórico (1961)**
- Edward Thorp, matemático do MIT
- Usou computador IBM 704
- Provou matematicamente que blackjack pode ser vencido através da contagem de cartas
- Publicou em 1961 no PNAS (Proceedings of the National Academy of Sciences)

**2. Descoberta Principal**
- Quando certas cartas saem do baralho, o jogador ganha vantagem matemática sobre o cassino:
  - Sem 5s no baralho: **+3.29%** de vantagem
  - Muitas cartas 10: **+3.94%** de vantagem
  - Rastreando cartas "tens": vantagem em **~50%** das situações

**3. Estratégia Hi-Lo Simplificada**
Sistema de contagem mais popular:

Grid com 3 colunas mostrando:
- **2 a 6:** +1
- **7 a 9:** 0
- **10 a A:** -1

**Instruções:**
- Contagem positiva = vantagem do jogador → aposte mais
- Contagem negativa = vantagem da casa → aposte mínimo

**Características técnicas:**
- Grid layout (2 colunas principais)
- Grid interno (3 colunas) para sistema Hi-Lo
- Fonte serif
- Texto justificado
- Tamanhos de fonte variados para hierarquia

---

### Slide 4d - Exemplo Prático de Contagem Hi-Lo

**Arquivo:** `components/Slide4d.tsx`

**Tipo:** Slide vertical (quarto da stack)

**Conteúdo:**
- **Título:** "Exemplo: Sistema Hi-Lo em Ação"
- **Subtítulo:** "Conte TODAS as cartas visíveis na mesa (suas cartas + dealer + outros jogadores)"

**Regras de Referência (no topo):**
- 2-6: +1
- 7-9: 0
- 10-A: -1

**Exemplos de Rodadas:**

**Rodada 1:**
- Cartas: 5♠, K♥, 3♦, 9♣
- Cálculo: +1 - 1 + 1 + 0 = **+1**

**Rodada 2:**
- Cartas: A♠, 2♥, Q♦, 4♣
- Cálculo: -1 + 1 - 1 + 1 = **0**

**Rodada 3:**
- Cartas: 6♥, 2♠, 5♣, 3♦
- Cálculo: +1 + 1 + 1 + 1 = **+4**

**Contagem Acumulada Total:**
- Resultado final: **+5** (em destaque verde)
- Interpretação: "Contagem positiva → Vantagem do jogador → Aumente a aposta"

**Características técnicas:**
- Layout flexbox vertical
- Cartas renderizadas com símbolos Unicode (♠, ♥, ♦, ♣)
- Cores diferenciadas: preto (#000) para espadas/paus, vermelho (#e53935) para copas/ouros
- Background #f9f9f9 para destacar resultado final
- Cor verde (#2e7d32) para contagem positiva final
- Border-bottom para separar rodadas
- Tamanho de fonte 2em para as cartas

---

## Slide 5 - Convite Final para Jogar

**Arquivo:** `components/Slide5.tsx`

**Tipo:** Slide horizontal simples

**Conteúdo:**
- **Título:** "Agora que você sabe contar, vamos jogar!"
- **Elemento interativo:** Botão "Jogar Blackjack"
- **Link:** `/simple-blackjack` (abre em nova aba)

**Características técnicas:**
- Idêntico ao Slide 2, mas com título diferente
- Botão com hover effect (escala 1.05 e mudança de cor)
- Background preto (#000) que muda para cinza escuro (#333) no hover
- Fonte serif
- Tamanho de fonte: 1.5em
- Border-radius: 8px

---

## Navegação da Apresentação

### Estrutura de Navegação:
```
Slide 1 (Horizontal) → Slide 2 (Horizontal) → Slide 3 (Vertical Stack) → Slide 4 (Vertical Stack) → Slide 5 (Horizontal)
                                                      ↓                           ↓
                                                   Slide 3a                     Slide 4
                                                      ↓                           ↓
                                                   Slide 3b                    Slide 4b
                                                      ↓                           ↓
                                                   Slide 3c                    Slide 4c
                                                      ↓                           ↓
                                                   Slide 3d                    Slide 4d
```

**Navegação horizontal:** Slides 1 → 2 → 3 → 4 → 5
**Navegação vertical:**
- Slide 3: 3a → 3b → 3c → 3d
- Slide 4: 4 → 4b → 4c → 4d

---

## Configuração Técnica

**Arquivo de configuração:** `src/app/educacao-na-computacao-2/page.tsx`

**Reveal.js Settings:**
- hash: true
- transition: 'fade'
- transitionSpeed: 'slow'
- controls: true
- progress: false
- slideNumber: false
- center: true
- width: '100%'
- height: '100%'
- backgroundTransition: 'slide'

**Dependências:**
- React 19.1.0
- reveal.js
- react-katex (para fórmulas matemáticas)
- katex/dist/katex.min.css

**Temas:**
- reveal.js/dist/reveal.css
- reveal.js/dist/theme/serif.css

---

## Observações Pedagógicas

### Fluxo da Apresentação:
1. **Introdução:** Problema simples de probabilidade com baralho (Slide 1)
2. **Prática:** Jogar Blackjack sem estratégia (Slide 2)
3. **Teoria:** Cálculo de probabilidades e valor esperado (Slides 3a-3d)
4. **Aplicação:** Contagem de cartas e estratégia Hi-Lo (Slides 4-4d)
5. **Prática Avançada:** Jogar com conhecimento de contagem (Slide 5)

### Conceitos Abordados:
- Probabilidade básica com baralhos
- Probabilidade conjunta
- Eventos mutuamente exclusivos
- Valor esperado
- Estratégia ótima no Blackjack
- Contagem de cartas (Sistema Hi-Lo)
- Vantagem matemática sobre a casa

### Recursos Interativos:
- 2 botões para jogar Blackjack
- 1 vídeo do YouTube
- 2 links para papers acadêmicos
- Diagramas de Venn em SVG
- Múltiplas fórmulas matemáticas renderizadas com LaTeX

---

## Arquivos de Mídia Necessários

**Imagens:**
- `/img-01-cover.png` - Capa do paper de Edward Thorp (1961)
- `/img-00-cover.png` - Capa do livro Mathematics of Big Four

**Links Externos:**
- YouTube: https://www.youtube.com/embed/MlCYBrLOP3A
- Google Drive (Papers): Dois links compartilhados

---

## Total de Slides
- **5 slides horizontais principais**
- **8 subslides verticais** (4 no Slide 3 + 4 no Slide 4)
- **13 slides no total**
