import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getAdminUser } from './database';

// Chave secreta para JWT (em produção, usar variável de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Interface para payload do JWT
export interface JWTPayload {
  userId: number;
  username: string;
}

// Verificar credenciais do admin
export async function verifyAdminCredentials(username: string, password: string) {
  try {
    const user = await getAdminUser(username);
    
    if (!user) {
      return null;
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return null;
    }
    
    return {
      id: user.id,
      username: user.username
    };
  } catch (error) {
    console.error('Erro ao verificar credenciais:', error);
    return null;
  }
}

// Gerar token JWT
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

// Verificar token JWT
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

// Hash da senha
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Middleware para verificar autenticação
export function requireAuth(token?: string): JWTPayload | null {
  if (!token) {
    return null;
  }
  
  // Garantir que token é uma string
  const tokenString = typeof token === 'string' ? token : String(token);
  
  // Remove 'Bearer ' se presente
  const cleanToken = tokenString.startsWith('Bearer ') ? tokenString.slice(7) : tokenString;
  
  return verifyToken(cleanToken);
}