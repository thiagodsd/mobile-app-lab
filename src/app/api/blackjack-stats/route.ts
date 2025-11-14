import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

/**
 * API para buscar estatísticas dos jogadores de Blackjack
 * Padrão similar ao conhecimento-previo
 */

interface PlayerStats {
  wins?: number;
  losses?: number;
  pushes?: number;
}

interface SavedGameState {
  balance?: number;
}

interface PlayerData {
  nickname: string;
  balance?: number;
  wins?: number;
  losses?: number;
  pushes?: number;
  currentStats?: PlayerStats | null;
  savedGameState?: SavedGameState;
}

interface ProcessedPlayer {
  nickname: string;
  balance: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  pushes: number;
}

export const dynamic = 'force-dynamic';

/**
 * GET - Buscar estatísticas dos jogadores do Firestore
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const minGames = parseInt(searchParams.get('minGames') || '0');

    // console.log('Buscando jogadores com mínimo de', minGames, 'partidas');

    // Query Firestore
    const playersRef = collection(db, 'blackjack-players');
    const q = query(playersRef);
    const snapshot = await getDocs(q);

    // console.log('Total de documentos no Firestore:', snapshot.size);

    const allPlayers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as unknown as PlayerData[];

    // console.log('Exemplo de jogador:', allPlayers[0]);

    // Processar jogadores com dados corretos
    const processedPlayers: ProcessedPlayer[] = allPlayers.map((player: PlayerData) => {
      // Se currentStats existir, usar seus valores (mesmo que sejam 0)
      // Se não existir (null/undefined), usar valores raiz (histórico total)
      const hasCurrentStats = player.currentStats !== null && player.currentStats !== undefined;

      const wins = hasCurrentStats
        ? (player.currentStats?.wins ?? 0)
        : (player.wins ?? 0);

      const losses = hasCurrentStats
        ? (player.currentStats?.losses ?? 0)
        : (player.losses ?? 0);

      const pushes = hasCurrentStats
        ? (player.currentStats?.pushes ?? 0)
        : (player.pushes ?? 0);

      const gamesPlayed = wins + losses + pushes;

      // Usar savedGameState.balance se existir (jogo em andamento), senão usar balance raiz
      const balance = player.savedGameState?.balance ?? player.balance ?? 100;

      return {
        nickname: player.nickname,
        balance,
        gamesPlayed,
        wins,
        losses,
        pushes,
      };
    });

    const players = processedPlayers.filter((player: ProcessedPlayer) => {
      return player.gamesPlayed >= minGames;
    });

    // console.log('Jogadores após filtro:', players.length);

    // Processar estatísticas agregadas
    const stats = {
      totalPlayers: players.length,
      totalGames: players.reduce((sum: number, p: ProcessedPlayer) => sum + p.gamesPlayed, 0),
      totalWins: players.reduce((sum: number, p: ProcessedPlayer) => sum + p.wins, 0),
      totalLosses: players.reduce((sum: number, p: ProcessedPlayer) => sum + p.losses, 0),
      totalPushes: players.reduce((sum: number, p: ProcessedPlayer) => sum + p.pushes, 0),
      balances: players.map((p: ProcessedPlayer) => p.balance),
      players: players
    };

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro ao buscar dados'
    }, { status: 500 });
  }
}
