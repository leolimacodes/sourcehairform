import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getFormSubmissionsByAnalysisStatus } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('admin-token')?.value;
    const user = requireAuth(token);
    
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Buscar candidatos selecionados
    const submissions = await getFormSubmissionsByAnalysisStatus('selected');
    
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Erro ao buscar candidatos selecionados:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}