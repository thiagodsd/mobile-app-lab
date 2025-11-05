'use client';

import { db } from '@/lib/firebase';
import { collection, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { PlayerData, GameState } from './types';

const PLAYERS_COLLECTION = 'blackjack-players';

export async function createPlayer(nickname: string): Promise<PlayerData> {
  const playerRef = doc(db, PLAYERS_COLLECTION, nickname.toLowerCase());

  const existingPlayer = await getDoc(playerRef);
  if (existingPlayer.exists()) {
    return existingPlayer.data() as PlayerData;
  }

  const playerData: PlayerData = {
    nickname,
    balance: 100,
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    pushes: 0,
    createdAt: new Date(),
    lastPlayed: new Date(),
  };

  await setDoc(playerRef, {
    ...playerData,
    createdAt: serverTimestamp(),
    lastPlayed: serverTimestamp(),
  });

  return playerData;
}

export async function getPlayer(nickname: string): Promise<PlayerData | null> {
  const playerRef = doc(db, PLAYERS_COLLECTION, nickname.toLowerCase());
  const playerDoc = await getDoc(playerRef);

  if (!playerDoc.exists()) {
    return null;
  }

  return playerDoc.data() as PlayerData;
}

export async function updatePlayer(
  nickname: string,
  updates: Partial<Omit<PlayerData, 'nickname' | 'createdAt'>>
): Promise<void> {
  const playerRef = doc(db, PLAYERS_COLLECTION, nickname.toLowerCase());

  await updateDoc(playerRef, {
    ...updates,
    lastPlayed: serverTimestamp(),
  });
}

export async function saveGameState(
  nickname: string,
  gameState: GameState,
  currentStats: { wins: number; losses: number; pushes: number }
): Promise<void> {
  const playerRef = doc(db, PLAYERS_COLLECTION, nickname.toLowerCase());

  await updateDoc(playerRef, {
    savedGameState: gameState,
    currentStats,
    lastPlayed: serverTimestamp(),
  });
}

export async function clearGameState(nickname: string): Promise<void> {
  const playerRef = doc(db, PLAYERS_COLLECTION, nickname.toLowerCase());

  await updateDoc(playerRef, {
    savedGameState: null,
    currentStats: null,
    lastPlayed: serverTimestamp(),
  });
}
