# Documentacao dos Slides - Educacao na Computacao 2

## Visao Geral
Apresentacao interativa sobre probabilidade e estatistica aplicada ao jogo de Blackjack, utilizando Reveal.js com tema serif.

**Localizacao:** `src/app/educacao-na-computacao-2/`

**Tema:** Reveal.js Serif Theme

**Estrutura:** 5 slides principais, sendo 2 com subslides verticais (Slides 3 e 4)

---

## Slide 1 - Problema Inicial de Probabilidade

**Arquivo:** `components/Slide1.tsx`

**Tipo:** Slide horizontal simples

**Conteudo:**
- Problema basico de probabilidade com baralho padrao de 52 cartas
- Menciona 4 naipes (♠, ♥, ♦, ♣) e 13 valores (A, 2-10, J, Q, K)
- Pergunta: "Qual e a probabilidade de obter uma carta com valor 3?"
- Formula matematica: P(carta = 3) = ?

---

## Slide 2 - Convite para Jogar

**Arquivo:** `components/Slide2.tsx`

**Tipo:** Slide horizontal simples

**Conteudo:**
- Titulo: "Vamos jogar!"
- Link para `/simple-blackjack` (abre em nova aba)
- Convida o usuario a jogar Blackjack antes de aprender a teoria

---

## Slide 3 - Probabilidade de Blackjack (Stack Vertical)

### Slide 3a - Pergunta Introdutoria

**Arquivo:** `components/Slide3a.tsx`

**Tipo:** Slide vertical (primeiro da stack)

**Conteudo:**
- Titulo: "Qual e a probabilidade de Blackjack?"
- Slide introdutorio simples

---

### Slide 3b - Pre-Requisitos: Conceitos e Ferramentas

**Arquivo:** `components/Slide3b.tsx`

**Tipo:** Slide vertical (segundo da stack)

**Conteudo:**
- Titulo: "Pre-Requisitos: Conceitos e Ferramentas"
- Layout: Duas colunas

**Coluna 1 - Probabilidade Conjunta:**
- Formula: P(A ∩ B) = P(A) × P(B | A)
- Diagrama de Venn com intersecao (SVG inline)
- Exemplo: Lancar dois dados e ambos serem pares
- P(D₁ par ∩ D₂ par) = P(D₁ par) × P(D₂ par)

**Coluna 2 - Eventos Mutuamente Exclusivos:**
- Formula: P(A ∪ B) = P(A) + P(B)
- Diagrama de Venn com circulos separados (SVG inline)
- Exemplo: A soma dos dados ser 7 ou 11
- P(soma = 7 ∪ soma = 11) = P(soma = 7) + P(soma = 11)

**Layout ASCII:**
```
+------------------------+------------------------+
|  Probabilidade         |  Eventos Mutuamente   |
|  Conjunta              |  Exclusivos           |
|                        |                       |
|  P(A ∩ B) = ...        |  P(A ∪ B) = ...       |
|  [Diagrama Venn]       |  [Diagrama Venn]      |
|  Exemplo: dados        |  Exemplo: soma        |
+------------------------+------------------------+
```

---

### Slide 3b2 - Calculos

**Arquivo:** `components/Slide3b2.tsx`

**Tipo:** Slide vertical (terceiro da stack)

**Conteudo:**
- Titulo: "Calculos"
- Layout: Duas colunas no topo, resultado centralizado embaixo

**Coluna 1 - Caso 1: As → 10:**
- Primeiro tiramos um As, depois uma carta de valor 10
- P(As ∩ 10) = P(As) × P(10 | As)
- P = 4/52 × 16/51 = 64/2652

**Coluna 2 - Caso 2: 10 → As:**
- Primeiro tiramos uma carta de valor 10, depois um As
- P(10 ∩ As) = P(10) × P(As | 10)
- P = 16/52 × 4/51 = 64/2652

**Resultado Final (centralizado):**
- P(Blackjack) = P(As ∩ 10) + P(10 ∩ As)
- P(Blackjack) = 64/2652 + 64/2652 = 128/2652 = 32/663
- **P(Blackjack Natural) ≈ 4.83%** (em caixa)

**Layout ASCII:**
```
+--------------------+--------------------+
|  Caso 1: As → 10   |  Caso 2: 10 → As  |
|  P = 4/52 × 16/51  |  P = 16/52 × 4/51 |
|  = 64/2652         |  = 64/2652        |
+--------------------+--------------------+
           |
           v
    +------------------+
    | P(Blackjack)     |
    | = 128/2652       |
    | ≈ 4.83%          |
    +------------------+
```

---

### Slide 3c - Pergunta sobre Lucro

**Arquivo:** `components/Slide3c.tsx`

**Tipo:** Slide vertical (quarto da stack)

**Conteudo:**
- Titulo: "Qual e o lucro esperado?"
- Slide introdutorio simples

---

### Slide 3d - Valor Esperado no Blackjack "Flat Betting"

**Arquivo:** `components/Slide3d.tsx`

**Tipo:** Slide vertical (quinto da stack)

**Conteudo:**
- Titulo: "Valor Esperado no Blackjack 'Flat Betting'"
- Layout: Tres colunas no topo, calculo centralizado abaixo, fontes no rodape

**Coluna 1 - Definicao:**
- X ∈ {-V, 0, +V}
- E[X] = Σ x · P(X = x)

**Coluna 2 - Nosso Problema:**
- E[X] = pᵥ · V + pᵈ · (-V) + pᵉ · 0
- E[X] = V(pᵥ - pᵈ)

**Coluna 3 - Probabilidades Reais com Estrategia Basica:**
- Vitoria: +V (pᵥ = 42.22%)
- Derrota: -V (pᵈ = 49.10%)
- Empate: 0 (pᵉ = 8.48%)

**Calculo Final (centralizado):**
- E[X] = V(pᵥ - pᵈ)
- E[X] = V(0.4222 - 0.4910)
- E[X] = V(-0.0688)
- E[X] ≈ **-6.9% · V**
- Conclusao: Perda media de 6.9% por aposta no longo prazo

**Fontes:**
- Wizard of Odds: wizardofodds.com/ask-the-wizard/blackjack/probability/
- Casino.us: casino.us/blackjack/odds/

**Layout ASCII:**
```
+--------------+--------------+------------------+
| Definicao    | Nosso        | Probabilidades   |
| E[X] = ...   | Problema     | Reais            |
|              | E[X] = ...   | pv = 42.22%      |
|              |              | pd = 49.10%      |
|              |              | pe = 8.48%       |
+--------------+--------------+------------------+
                    |
                    v
            +----------------+
            | E[X] ≈ -6.9%·V |
            | (Perda media)  |
            +----------------+
```

---

## Slide 4 - Contagem de Cartas (Stack Vertical)

### Slide 4 - Video Introdutorio

**Arquivo:** `components/Slide4.tsx`

**Tipo:** Slide vertical (primeiro da stack)

**Conteudo:**
- Titulo: "O que esta acontecendo aqui?"
- Iframe do YouTube incorporado
- Video: https://www.youtube.com/embed/MlCYBrLOP3A
- Dimensoes: 960x540

---

### Slide 4b - Referencias Academicas

**Arquivo:** `components/Slide4b.tsx`

**Tipo:** Slide vertical (segundo da stack)

**Conteudo:**
- Titulo: "Contagem de Cartas"
- Layout: Duas obras lado a lado, cada uma com layout horizontal (imagem + texto)
- Separador vertical entre as duas obras (border-right)

**Obra 1 (Esquerda):**
- Imagem: /img-01-cover.png (300x390)
- Titulo: A Favorable Strategy for Twenty-One
- Autor: Edward Thorp (1961)
- Revista: PNAS
- Referencia: Vol. 47, No. 1, pp. 110-112
- DOI: 10.1073/pnas.47.1.110
- Link: drive.google.com

**Obra 2 (Direita):**
- Imagem: /img-00-cover.png (300x390)
- Titulo: Mathematics of The Big Four Casino Table Games
- Autor: Mark Bollman (2021)
- Revista: Technometrics
- Referencia: Vol. 65, No. 4, 2023
- Publisher: Taylor & Francis
- Link: drive.google.com

**Layout ASCII:**
```
+-------------------+|+-------------------+
| [Imagem]  Titulo  || [Imagem]  Titulo  |
|           Autor   ||           Autor   |
|           Revista ||           Revista |
|           Ref     ||           Ref     |
|           DOI     ||           Publisher|
|           Link    ||           Link    |
+-------------------+|+-------------------+
     Obra 1          |      Obra 2
                     ^
              (separador vertical)
```

---

### Slide 4c - A Favorable Strategy for Twenty-One

**Arquivo:** `components/Slide4c.tsx`

**Tipo:** Slide vertical (terceiro da stack)

**Conteudo:**
- Titulo: "A Favorable Strategy for Twenty-One"
- Layout: Imagem a esquerda, texto a direita

**Imagem (Esquerda):**
- /img-01-cover.png (450x450)

**Texto (Direita) - Duas secoes:**

**Secao 1 - Contexto Historico (1961):**
- Edward Thorp, matematico do MIT
- Usou computador IBM 704
- Provou matematicamente que blackjack pode ser vencido atraves da contagem de cartas
- Publicou resultados em 1961 no PNAS

**Secao 2 - Descoberta Principal:**
- Thorp descobriu que quando certas cartas saem do baralho, o jogador ganha vantagem matematica:
  - Sem 5s no baralho: +3.29% de vantagem
  - Muitas cartas 10: +3.94% de vantagem
  - Rastreando cartas "tens": vantagem em ~50% das situacoes

**Layout ASCII:**
```
+-------------+---------------------------+
|             | Contexto Historico (1961) |
|             | - Edward Thorp, MIT       |
|   [Imagem]  | - IBM 704                 |
|   Paper     | - Provou matematicamente  |
|   Thorp     |                           |
|             | Descoberta Principal:     |
|             | - Sem 5s: +3.29%          |
|             | - Muitas 10s: +3.94%      |
|             | - Tracking tens: ~50%     |
+-------------+---------------------------+
```

---

### Slide 4d - Estrategia Hi-Lo Simplificada

**Arquivo:** `components/Slide4d.tsx`

**Tipo:** Slide vertical (quarto da stack)

**Conteudo:**
- Titulo: "Estrategia Hi-Lo Simplificada"
- Layout: Duas colunas (teoria e exemplo pratico)

**Coluna 1 (Esquerda) - Sistema de Contagem Hi-Lo:**

*Secao 1 - Sistema de Contagem Hi-Lo:*
- Sistema de contagem mais popular:
  - 2 a 6: +1
  - 7 a 9: 0
  - 10 a A: -1

*Secao 2 - Como Usar:*
- Contagem positiva = vantagem do jogador → aposte mais
- Contagem negativa = vantagem da casa → aposte minimo

**Coluna 2 (Direita) - Exemplo em Acao:**

*Secao 1 - Exemplo em Acao:*
- Conte todas as cartas visiveis na mesa
- Rodada 1: 5♠ K♥ 3♦ 9♣ → +1 - 1 + 1 + 0 = +1
- Rodada 2: A♠ 2♥ Q♦ 4♣ → -1 + 1 - 1 + 1 = 0
- Rodada 3: 6♥ 2♠ 5♣ 3♦ → +1 + 1 + 1 + 1 = +4

*Secao 2 - Resultado:*
- Contagem Total: +5
- Contagem positiva → vantagem do jogador → aumente a aposta

**Layout ASCII:**
```
+-------------------------+-------------------------+
| Sistema de Contagem     | Exemplo em Acao         |
| Hi-Lo                   |                         |
| - 2 a 6: +1             | Rodada 1:               |
| - 7 a 9: 0              | 5♠ K♥ 3♦ 9♣ = +1        |
| - 10 a A: -1            |                         |
|                         | Rodada 2:               |
| Como Usar:              | A♠ 2♥ Q♦ 4♣ = 0         |
| - Contagem positiva     |                         |
|   → aposte mais         | Rodada 3:               |
| - Contagem negativa     | 6♥ 2♠ 5♣ 3♦ = +4        |
|   → aposte minimo       |                         |
|                         | Resultado: +5           |
|                         | → aumente a aposta      |
+-------------------------+-------------------------+
```

---

## Slide 5 - Convite Final para Jogar

**Arquivo:** `components/Slide5.tsx`

**Tipo:** Slide horizontal simples

**Conteudo:**
- Titulo: "Agora que voce sabe contar, vamos jogar!"
- Link para `/simple-blackjack` (abre em nova aba)
- Convida o usuario a jogar Blackjack aplicando a estrategia de contagem aprendida

---

## Navegacao da Apresentacao

### Estrutura de Navegacao:
```
Slide 1 → Slide 2 → Slide 3 (Stack) → Slide 4 (Stack) → Slide 5
                         |                  |
                         v                  v
                      Slide 3a           Slide 4
                         |                  |
                         v                  v
                      Slide 3b           Slide 4b
                         |                  |
                         v                  v
                      Slide 3b2          Slide 4c
                         |                  |
                         v                  v
                      Slide 3c           Slide 4d
                         |
                         v
                      Slide 3d
```

**Navegacao horizontal:** Slides 1 → 2 → 3 → 4 → 5

**Navegacao vertical:**
- Slide 3: 3a → 3b → 3b2 → 3c → 3d (5 subslides)
- Slide 4: 4 → 4b → 4c → 4d (4 subslides)

---

## Total de Slides
- **5 slides horizontais principais**
- **9 subslides verticais** (5 no Slide 3 + 4 no Slide 4)
- **14 slides no total**

---

## Arquivos de Midia Necessarios

**Imagens:**
- `/img-01-cover.png` - Capa do paper de Edward Thorp (1961)
- `/img-00-cover.png` - Capa do livro Mathematics of Big Four

**Links Externos:**
- YouTube: https://www.youtube.com/embed/MlCYBrLOP3A
- Google Drive (Papers): Dois links compartilhados para os papers academicos
