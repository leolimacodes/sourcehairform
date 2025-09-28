import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Simular envio de email (para demonstração)
    console.log('📧 SIMULAÇÃO DE ENVIO DE EMAIL:')
    console.log('===============================')
    console.log(`Para: formulariosourcehair@gmail.com`)
    console.log(`Assunto: 🎯 Novo Formulário de Parceria - ${formData.nomeCompleto}`)
    console.log('Dados do formulário:')
    console.log('- Nome:', formData.nomeCompleto)
    console.log('- Idade:', formData.idade)
    console.log('- Cidade/Estado:', formData.cidadeEstado)
    console.log('- Telefone:', formData.telefone)
    console.log('- Instagram:', formData.instagram)
    console.log('- Seguidores:', formData.seguidores)
    console.log('- Experiência com Prótese:', formData.experienciaProtese)
    console.log('- Facilidade com Vídeos:', formData.facilidadeVideos)
    console.log('- Autorização de Imagem:', formData.autorizacaoImagem)
    console.log('===============================')
    console.log('✅ Email simulado enviado com sucesso!')

    // Simular um pequeno delay como se fosse um envio real
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({ 
      success: true, 
      message: 'Email enviado com sucesso!' 
    })

  } catch (error) {
    console.error('Erro ao processar formulário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}