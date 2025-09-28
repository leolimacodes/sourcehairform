import { NextRequest, NextResponse } from 'next/server';
import { saveFormProgress } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, currentStep, status = 'abandoned' } = body;

    // Validar dados obrigatórios
    if (!formData || typeof currentStep !== 'number') {
      return NextResponse.json(
        { error: 'Dados do formulário e etapa atual são obrigatórios' },
        { status: 400 }
      );
    }

    // Salvar progresso no banco de dados
    const submissionId = await saveFormProgress({
      nomeCompleto: formData.nomeCompleto || '',
      idade: formData.idade || '',
      cidadeEstado: formData.cidadeEstado || '',
      telefone: formData.telefone || '',
      instagram: formData.instagram || '',
      seguidores: formData.seguidores || '',
      experienciaProtese: formData.experienciaProtese || '',
      facilidadeVideos: formData.facilidadeVideos || '',
      autorizacaoImagem: formData.autorizacaoImagem || '',
      status: status as 'abandoned' | 'completed',
      currentStep
    });

    return NextResponse.json({ 
      success: true, 
      submissionId,
      message: 'Progresso salvo com sucesso' 
    });

  } catch (error) {
    console.error('Erro ao salvar progresso do formulário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}