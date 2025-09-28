import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { updateAnalysisStatus, getFormSubmissionsByAnalysisStatus } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('admin-token')?.value;
    const user = requireAuth(token);
    
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id, analysisStatus } = await request.json();

    if (!id || !analysisStatus || !['selected', 'discarded'].includes(analysisStatus)) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    await updateAnalysisStatus(id, analysisStatus);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar status de análise:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('admin-token')?.value;
    const user = requireAuth(token);
    
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'pending' | 'selected' | 'discarded';

    if (!status || !['pending', 'selected', 'discarded'].includes(status)) {
      return NextResponse.json({ error: 'Status inválido' }, { status: 400 });
    }

    const submissions = await getFormSubmissionsByAnalysisStatus(status);

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Erro ao buscar formulários por status:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}