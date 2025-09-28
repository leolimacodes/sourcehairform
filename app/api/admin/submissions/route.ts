import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getFormSubmissionsByStatus } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('admin-token')?.value;
    const user = requireAuth(token);
    
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Obter parâmetro de status da URL
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    if (!status || (status !== 'completed' && status !== 'abandoned')) {
      return NextResponse.json(
        { error: 'Status inválido. Use "completed" ou "abandoned"' },
        { status: 400 }
      );
    }

    // Buscar formulários por status
    const submissions = await getFormSubmissionsByStatus(status as 'completed' | 'abandoned');
    
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Erro ao buscar formulários:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}