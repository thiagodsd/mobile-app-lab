import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const snapshot = await db
      .collection('identificacao-de-padrao')
      .orderBy('timestamp', 'asc')
      .get();

    if (snapshot.empty) {
      return NextResponse.json({
        alturas: [],
        intervalos: [],
        acertos: 0,
        erros: 0,
        total: 0
      });
    }

    const respostas = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        altura: data.altura as number,
        acertouReconhecimento: data.acertouReconhecimento as boolean,
        timestamp: data.timestamp?.toDate?.() || new Date(data.timestamp)
      };
    });

    // Processar alturas
    const alturas = respostas.map(r => r.altura);

    // Calcular intervalos de tempo entre respostas (em segundos)
    const intervalos: number[] = [];
    for (let i = 1; i < respostas.length; i++) {
      const diff = (respostas[i].timestamp.getTime() - respostas[i - 1].timestamp.getTime()) / 1000;
      intervalos.push(Math.round(diff));
    }

    // Contar acertos e erros
    const acertos = respostas.filter(r => r.acertouReconhecimento === true).length;
    const erros = respostas.length - acertos;

    return NextResponse.json({
      alturas,
      intervalos,
      acertos,
      erros,
      total: respostas.length
    });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }
}