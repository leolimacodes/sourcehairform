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

    // Buscar formulários abandonados
    const submissions = await getFormSubmissionsByStatus('abandoned');
    
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Erro ao buscar formulários abandonados:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}