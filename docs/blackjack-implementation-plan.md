# Plano de Implementação: Blackjack Simplificado (21)

## 1. Especificação do Jogo

### 1.1 Regras do Blackjack Simplificado

#### Configuração Base
- **Baralho**: 1 deck padrão de 52 cartas
- **Reshuffle**: A cada nova partida (para simplicidade e consistência pedagógica)
- **Saldo inicial**: $100 (Momento 1 e Momento 2)
- **Número de partidas**: 10 partidas fixas por momento
- **Aposta**: Fixa de $10 por partida (para simplificar cálculos de E[X])

#### Valores das Cartas
- **Números 2-10**: Valor facial
- **Figuras (J, Q, K)**: 10 pontos
- **Ás**: 11 ou 1 (automático - sempre usa 11 a menos que cause bust)

#### Mecânica do Jogo
1. **Início da partida**:
   - Player recebe 2 cartas (visíveis)
   - Dealer recebe 2 cartas (1 visível, 1 oculta)

2. **Turno do Player**:
   - Pode **HIT** (pedir carta) ou **STAND** (parar)
   - Se > 21: **BUST** (perde $10)
   - Se = 21: **Blackjack** automaticamente vai para turno do dealer

3. **Turno do Dealer** (após player STAND ou fazer 21):
   - Revela carta oculta
   - **Regra automática**: HIT até ter ≥ 17
   - Se > 21: Dealer BUST (player ganha $10)

4. **Resultado**:
   - Player > Dealer (sem bust): Player ganha $10
   - Player < Dealer: Player perde $10
   - Player = Dealer: **PUSH** (empate, $0)
   - Player Blackjack natural (21 com 2 cartas): Ganha $15 (1.5x payout)

#### Simplificações (diferente do blackjack real)
- ❌ Sem DOUBLE DOWN
- ❌ Sem SPLIT
- ❌ Sem INSURANCE
- ❌ Sem apostas variáveis (sempre $10)
- ✅ Reshuffle a cada partida (no Momento 1 e 2)

---

## 2. Arquitetura Técnica

### 2.1 Estrutura de Rotas (Next.js App Router)

```
src/app/educacao-na-computacao/blackjack/
├── momento-1/
│   └── page.tsx              # Jogo básico
├── momento-2/
│   └── page.tsx              # Jogo com dica/trapaça
├── leaderboard/
│   └── page.tsx              # Rankings
└── layout.tsx                # Layout comum (opcional)
```

### 2.2 Estrutura de Componentes

```
src/components/blackjack/
├── BlackjackGame.tsx         # Container principal do jogo
├── Card.tsx                  # Componente visual de carta
├── Hand.tsx                  # Grupo de cartas (player/dealer)
├── GameControls.tsx          # Botões Hit/Stand
├── GameStats.tsx             # Saldo, partida atual, histórico
├── CheatPanel.tsx            # Seção "trapaça" com probabilidades
├── HintPanel.tsx             # Seção "dica" com resumo Hi-Lo
├── Leaderboard.tsx           # Tabela de rankings
└── NicknameInput.tsx         # Modal para capturar nickname
```

### 2.3 Estrutura de Dados

#### 2.3.1 Tipos TypeScript

```typescript
// types/blackjack.ts

export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;  // Valor numérico (2-11)
}

export interface Deck {
  cards: Card[];
  dealtCards: Card[];  // Cartas já distribuídas (para contagem)
}

export interface Hand {
  cards: Card[];
  value: number;      // Soma atual (considerando Ás dinâmico)
  isBust: boolean;
  isBlackjack: boolean;
}

export interface GameState {
  deck: Deck;
  playerHand: Hand;
  dealerHand: Hand;
  gameStatus: 'betting' | 'player-turn' | 'dealer-turn' | 'finished';
  result: null | 'win' | 'lose' | 'push' | 'blackjack';
  currentBet: number;
  balance: number;
  currentGame: number;  // 1-10
  gamesHistory: GameResult[];
}

export interface GameResult {
  gameNumber: number;
  result: 'win' | 'lose' | 'push' | 'blackjack';
  profit: number;  // +10, -10, 0, +15
  balanceAfter: number;
}

export interface PlayerSession {
  nickname: string;
  momento1: {
    finalBalance: number;
    gamesHistory: GameResult[];
    timestamp: number;
  } | null;
  momento2: {
    finalBalance: number;
    gamesHistory: GameResult[];
    timestamp: number;
  } | null;
}

export interface LeaderboardEntry {
  nickname: string;
  momento1Score: number;
  momento2Score: number;
  delta: number;  // momento2 - momento1
  timestamp: number;
}
```

#### 2.3.2 LocalStorage Schema

```typescript
// Chave: 'blackjack-sessions'
{
  [nickname: string]: PlayerSession
}

// Exemplo:
{
  "João Silva": {
    nickname: "João Silva",
    momento1: {
      finalBalance: 85,
      gamesHistory: [...],
      timestamp: 1699123456789
    },
    momento2: {
      finalBalance: 130,
      gamesHistory: [...],
      timestamp: 1699124567890
    }
  }
}
```

---

## 3. Lógica Core do Jogo

### 3.1 Funções Essenciais

```typescript
// utils/blackjack/deck.ts

export function createDeck(): Deck {
  // Cria deck de 52 cartas
}

export function shuffleDeck(deck: Deck): Deck {
  // Fisher-Yates shuffle
}

export function dealCard(deck: Deck): { card: Card; deck: Deck } {
  // Remove e retorna primeira carta
}

// utils/blackjack/hand.ts

export function calculateHandValue(cards: Card[]): number {
  // Calcula valor ótimo (trata Ás como 11 ou 1)
}

export function isBlackjack(hand: Hand): boolean {
  // 21 com exatamente 2 cartas
}

export function isBust(hand: Hand): boolean {
  // Valor > 21
}

// utils/blackjack/game.ts

export function initializeGame(): GameState {
  // Estado inicial: deck shuffled, saldo $100, partida 1
}

export function startRound(state: GameState): GameState {
  // Distribui 2 cartas para player e dealer
}

export function playerHit(state: GameState): GameState {
  // Player pede carta
}

export function playerStand(state: GameState): GameState {
  // Dealer joga automaticamente
}

export function dealerPlay(state: GameState): GameState {
  // Dealer HIT até >= 17
}

export function determineWinner(state: GameState): GameState {
  // Calcula resultado e atualiza saldo
}
```

### 3.2 Fluxo de Estado (State Machine)

```
betting
  ↓ startRound()
player-turn
  ↓ playerHit() (se não bust/blackjack)
  ↓ playerStand()
dealer-turn
  ↓ dealerPlay()
finished
  ↓ startRound() (se currentGame < 10)
  ↓ Salvar sessão no localStorage (se currentGame = 10)
```

---

## 4. Interface do Usuário

### 4.1 Momento 1: Jogo Básico

#### Layout
```
┌─────────────────────────────────────────┐
│  MOMENTO 1: Jogo Livre                  │
│  Partida: 3/10 | Saldo: $85             │
├─────────────────────────────────────────┤
│         DEALER (Score: 18)              │
│         [🂡] [🃇] [🃅]                    │
│                                         │
│         YOU (Score: 19)                 │
│         [🂮] [🃉]                         │
├─────────────────────────────────────────┤
│      [HIT]  [STAND]                     │
├─────────────────────────────────────────┤
│  Histórico:                             │
│  Partida 1: Ganhou +$10                 │
│  Partida 2: Perdeu -$10                 │
└─────────────────────────────────────────┘
```

#### Comportamento
- Modal inicial para capturar nickname
- Após 10 partidas: mostrar resultado final e botão "Ver Leaderboard"
- Armazenar resultado no localStorage

### 4.2 Momento 2: Jogo com Suporte

#### Layout
```
┌───────────────────────────────────────────────────────┐
│  MOMENTO 2: Após a Aula                               │
│  Partida: 5/10 | Saldo: $115                          │
├───────────────────────────────────────────────────────┤
│              DEALER (Score: ??)                       │
│              [🂡] [🂠]  (1 oculta)                      │
│                                                       │
│              YOU (Score: 14)                          │
│              [🂮] [🃄]                                  │
├───────────────────────────────────────────────────────┤
│          [HIT]  [STAND]                               │
├───────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────────────────┐  │
│  │ 💡 DICA        │  │ 🎯 TRAPAÇA (probabilidades)│  │
│  │ [Expandir]     │  │ [Expandir]                 │  │
│  └────────────────┘  └────────────────────────────┘  │
│                                                       │
│  [Dica expandida: Resumo Hi-Lo]                       │
│  - Cartas baixas (2-6): +1                            │
│  - Cartas médias (7-9): 0                             │
│  - Cartas altas (10-A): -1                            │
│  - Running Count atual: +3                            │
│  - Deck favorável ao jogador!                         │
│                                                       │
│  [Trapaça expandida: Probabilidades em Tempo Real]    │
│  - Probabilidade de BUST se HIT: 38%                  │
│  - Probabilidade de ganhar: 52%                       │
│  - Probabilidade de perder: 31%                       │
│  - Probabilidade de empate: 17%                       │
│  - Recomendação: STAND                                │
└───────────────────────────────────────────────────────┘
```

#### Funcionalidades Adicionais
- **Seção "Dica"** (colapsável):
  - Mostra resumo da estratégia Hi-Lo
  - Running Count em tempo real
  - Indicador visual: "Deck favorável" vs "Deck desfavorável"

- **Seção "Trapaça"** (colapsável):
  - Probabilidade de BUST se pedir carta
  - Probabilidades de resultado (win/lose/push)
  - Recomendação de ação (HIT/STAND)

---

## 5. Cálculos de Probabilidade (Para "Trapaça")

### 5.1 Algoritmo Simplificado

```typescript
// utils/blackjack/probability.ts

export interface ProbabilityAnalysis {
  bustProbability: number;      // Se HIT
  winProbability: number;       // Se STAND
  loseProbability: number;
  pushProbability: number;
  recommendation: 'HIT' | 'STAND';
}

export function calculateProbabilities(
  playerHand: Hand,
  dealerUpcard: Card,
  dealtCards: Card[]
): ProbabilityAnalysis {

  // 1. Calcular cartas restantes no deck
  const remainingCards = getRemainingCards(dealtCards);

  // 2. Probabilidade de BUST se HIT
  const bustProb = calculateBustProbability(playerHand.value, remainingCards);

  // 3. Simular dealer play (Monte Carlo simples)
  const dealerOutcomes = simulateDealerPlay(dealerUpcard, remainingCards, 1000);

  // 4. Calcular probabilidades de resultado
  const winProb = calculateWinProbability(playerHand.value, dealerOutcomes);
  const loseProb = calculateLoseProbability(playerHand.value, dealerOutcomes);
  const pushProb = 1 - winProb - loseProb;

  // 5. Recomendar ação
  const expectedValueHit = calculateEV(playerHand, remainingCards, 'HIT');
  const expectedValueStand = calculateEV(playerHand, remainingCards, 'STAND');

  return {
    bustProbability: bustProb,
    winProbability: winProb,
    loseProbability: loseProb,
    pushProbability: pushProb,
    recommendation: expectedValueHit > expectedValueStand ? 'HIT' : 'STAND'
  };
}
```

### 5.2 Contagem Hi-Lo

```typescript
// utils/blackjack/counting.ts

export function getCardCount(card: Card): number {
  const rank = card.rank;

  // Low cards (2-6): +1
  if (['2', '3', '4', '5', '6'].includes(rank)) return 1;

  // Neutral (7-9): 0
  if (['7', '8', '9'].includes(rank)) return 0;

  // High cards (10-A): -1
  return -1;
}

export function calculateRunningCount(dealtCards: Card[]): number {
  return dealtCards.reduce((count, card) => count + getCardCount(card), 0);
}

export function getTrueCount(runningCount: number, decksRemaining: number): number {
  return runningCount / decksRemaining;
}

export function getDeckAdvantage(runningCount: number): 'favorable' | 'neutral' | 'unfavorable' {
  if (runningCount >= 3) return 'favorable';
  if (runningCount <= -3) return 'unfavorable';
  return 'neutral';
}
```

---

## 6. Leaderboard

### 6.1 Métricas

```typescript
// Leaderboard de LUCRO (Momento 2)
// Ordenar por: momento2Score (descending)

// Leaderboard de APRENDIZAGEM (Delta)
// Ordenar por: (momento2Score - momento1Score) (descending)
```

### 6.2 Interface

```
┌────────────────────────────────────────────────────┐
│  LEADERBOARD                                       │
├────────────────────────────────────────────────────┤
│  [LUCRO] [APRENDIZAGEM]                            │
├────────────────────────────────────────────────────┤
│  🏆 TOP 10 - LUCRO (Momento 2)                     │
│                                                    │
│  1. Maria Santos      $145  (+45)                  │
│  2. João Silva        $130  (+30)                  │
│  3. Ana Costa         $115  (+15)                  │
│  ...                                               │
├────────────────────────────────────────────────────┤
│  🚀 TOP 10 - APRENDIZAGEM (Delta)                  │
│                                                    │
│  1. Pedro Alves       +$60  ($70 → $130)           │
│  2. Maria Santos      +$45  ($100 → $145)          │
│  3. João Silva        +$30  ($100 → $130)          │
│  ...                                               │
└────────────────────────────────────────────────────┘
```

### 6.3 Persistência

```typescript
// utils/blackjack/storage.ts

export function saveSession(session: PlayerSession): void {
  const sessions = loadAllSessions();
  sessions[session.nickname] = session;
  localStorage.setItem('blackjack-sessions', JSON.stringify(sessions));
}

export function loadSession(nickname: string): PlayerSession | null {
  const sessions = loadAllSessions();
  return sessions[nickname] || null;
}

export function loadAllSessions(): Record<string, PlayerSession> {
  const data = localStorage.getItem('blackjack-sessions');
  return data ? JSON.parse(data) : {};
}

export function getLeaderboard(): LeaderboardEntry[] {
  const sessions = loadAllSessions();

  return Object.values(sessions)
    .filter(s => s.momento1 && s.momento2)  // Só quem completou os 2 momentos
    .map(s => ({
      nickname: s.nickname,
      momento1Score: s.momento1!.finalBalance,
      momento2Score: s.momento2!.finalBalance,
      delta: s.momento2!.finalBalance - s.momento1!.finalBalance,
      timestamp: s.momento2!.timestamp
    }));
}

export function getTopLucro(limit: number = 10): LeaderboardEntry[] {
  return getLeaderboard()
    .sort((a, b) => b.momento2Score - a.momento2Score)
    .slice(0, limit);
}

export function getTopAprendizagem(limit: number = 10): LeaderboardEntry[] {
  return getLeaderboard()
    .sort((a, b) => b.delta - a.delta)
    .slice(0, limit);
}
```

---

## 7. Checklist de Implementação

### Fase 1: Core Logic
- [ ] Criar tipos TypeScript (`types/blackjack.ts`)
- [ ] Implementar funções de deck (`utils/blackjack/deck.ts`)
- [ ] Implementar cálculos de mão (`utils/blackjack/hand.ts`)
- [ ] Implementar state machine do jogo (`utils/blackjack/game.ts`)
- [ ] Testar lógica core com testes unitários

### Fase 2: UI Básica (Momento 1)
- [ ] Criar componente `Card.tsx`
- [ ] Criar componente `Hand.tsx`
- [ ] Criar componente `GameControls.tsx`
- [ ] Criar componente `GameStats.tsx`
- [ ] Criar componente `NicknameInput.tsx`
- [ ] Criar página `momento-1/page.tsx`
- [ ] Integrar lógica com UI

### Fase 3: Storage & Leaderboard
- [ ] Implementar funções de storage (`utils/blackjack/storage.ts`)
- [ ] Criar componente `Leaderboard.tsx`
- [ ] Criar página `leaderboard/page.tsx`
- [ ] Testar fluxo completo Momento 1 → Leaderboard

### Fase 4: Momento 2 (Dica & Trapaça)
- [ ] Implementar cálculos de probabilidade (`utils/blackjack/probability.ts`)
- [ ] Implementar contagem Hi-Lo (`utils/blackjack/counting.ts`)
- [ ] Criar componente `HintPanel.tsx`
- [ ] Criar componente `CheatPanel.tsx`
- [ ] Criar página `momento-2/page.tsx`
- [ ] Testar cálculos de probabilidade

### Fase 5: Polish & Testing
- [ ] Animações de cartas (Framer Motion?)
- [ ] Feedback visual (vitória/derrota)
- [ ] Responsividade mobile
- [ ] Testes end-to-end
- [ ] Performance optimization

---

## 8. Considerações Técnicas

### 8.1 Performance
- Deck shuffle usando `crypto.getRandomValues()` para verdadeiro random
- Memoização de cálculos de probabilidade com `useMemo`
- Lazy loading de componentes pesados (CheatPanel)

### 8.2 Acessibilidade
- Cartas com alt text descritivo
- Navegação por teclado (Tab, Enter)
- ARIA labels para state do jogo
- Modo high contrast para símbolos de naipe

### 8.3 Mobile First
- Design responsivo (grid → stack em mobile)
- Touch-friendly buttons (min 44px)
- Scroll suave para histórico de partidas

### 8.4 Segurança
- Sanitização de nickname (max 20 chars, sem HTML)
- Validação de estado do jogo (anti-cheat client-side básico)
- Rate limiting para salvar sessões (prevenir spam de localStorage)

---

## 9. Extensões Futuras (Pós-Aula)

### Possíveis Melhorias
1. **Backend real** (Firebase/Supabase) para leaderboard global persistente
2. **Multiplayer** (WebSockets para jogar contra colegas)
3. **Análise avançada** (gráficos de performance ao longo das partidas)
4. **Achievements** (badges por marcos de aprendizagem)
5. **Modo treinamento** (praticar contagem sem pressão de tempo)
6. **Exportar dados** (CSV com histórico completo para análise em Python/R)

---

## 10. Referências

- Regras oficiais de Blackjack: https://bicyclecards.com/how-to-play/blackjack/
- Hi-Lo Card Counting: Thorp, E. O. (1966). *Beat the Dealer*
- Probability calculations: Griffin, P. (1999). *The Theory of Blackjack*
