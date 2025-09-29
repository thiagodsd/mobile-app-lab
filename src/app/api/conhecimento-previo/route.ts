import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

/**
 * API simplificada - padrão aprendido do compartilar
 * Sem autenticação, apenas validação básica e uso direto do Firestore
 */

export const dynamic = 'force-dynamic';

/**
 * GET - Buscar respostas do Firestore
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeFull = searchParams.get('full') === 'true';

    // Query Firestore
    const responsesRef = collection(db, 'conhecimento_previo');
    const q = query(responsesRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);

    const responses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (includeFull) {
      return NextResponse.json({
        success: true,
        count: responses.length,
        data: responses
      });
    }

    return NextResponse.json({
      success: true,
      count: responses.length
    });

  } catch (error) {
    console.error('Erro ao buscar respostas:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro ao buscar dados'
    }, { status: 500 });
  }
}

/**
 * POST - Salvar resposta no Firestore
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validação simples
    if (!body.estudouEstatistica || !body.onde) {
      return NextResponse.json({
        success: false,
        error: 'Campos obrigatórios faltando'
      }, { status: 400 });
    }

    // Validar que 'onde' é um array
    if (!Array.isArray(body.onde)) {
      return NextResponse.json({
        success: false,
        error: 'Campo "onde" deve ser um array'
      }, { status: 400 });
    }

    // Criar documento
    const docData = {
      estudouEstatistica: body.estudouEstatistica,
      onde: body.onde, // Agora é um array de strings
      timestamp: Timestamp.now(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') || 'unknown'
    };

    const docRef = await addDoc(collection(db, 'conhecimento_previo'), docData);

    // Get updated count
    const responsesRef = collection(db, 'conhecimento_previo');
    const snapshot = await getDocs(responsesRef);

    return NextResponse.json({
      success: true,
      id: docRef.id,
      newCount: snapshot.size,
      message: 'Resposta salva com sucesso'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao salvar resposta:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro ao salvar dados'
    }, { status: 500 });
  }
}