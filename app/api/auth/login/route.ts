import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username e password são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Verificar credenciais
    const user = await verifyAdminCredentials(username, password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }
    
    // Gerar token JWT
    const token = generateToken({
      userId: user.id,
      username: user.username
    });
    
    // Criar resposta com cookie httpOnly
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username
      }
    });
    
    // Definir cookie com token
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 horas
    });
    
    return response;
    
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}