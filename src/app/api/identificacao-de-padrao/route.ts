import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { altura, previsaoAltura, previsaoTempo, previsaoAcertos, acertouReconhecimento } = body;

    // Validação
    if (!altura || typeof altura !== 'number' || altura < 100 || altura > 250) {
      return NextResponse.json({ error: 'Altura inválida (deve estar entre 100 e 250 cm)' }, { status: 400 });
    }

    if (!previsaoAltura || !previsaoTempo || !previsaoAcertos) {
      return NextResponse.json({ error: 'Todas as previsões devem ser preenchidas' }, { status: 400 });
    }

    // Salvar no Firestore
    const docRef = await db.collection('identificacao-de-padrao').add({
      altura: Number(altura),
      previsaoAltura: String(previsaoAltura),
      previsaoTempo: String(previsaoTempo),
      previsaoAcertos: String(previsaoAcertos),
      acertouReconhecimento: Boolean(acertouReconhecimento),
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Erro ao salvar identificação de padrão:', error);
    return NextResponse.json({ error: 'Erro ao salvar dados' }, { status: 500 });
  }
}