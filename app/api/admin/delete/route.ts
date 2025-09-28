import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { deleteFormSubmission } from '@/lib/database';

export async function DELETE(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('admin-token')?.value;
    const user = requireAuth(token);
    
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    await deleteFormSubmission(Number(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir formulário:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}