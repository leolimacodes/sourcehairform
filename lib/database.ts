import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Configuração do banco de dados SQLite
export async function openDB() {
  const dbPath = path.join(process.cwd(), 'database.sqlite');
  
  // Garantir que o diretório existe
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

// Interface para dados do formulário
export interface FormData {
  id?: number;
  nomeCompleto: string;
  idade?: string;
  cidadeEstado?: string;
  telefone: string;
  instagram?: string;
  seguidores?: string;
  experienciaProtese?: string;
  facilidadeVideos?: string;
  autorizacaoImagem?: string;
  status: 'abandoned' | 'completed';
  currentStep: number;
  analysisStatus?: 'pending' | 'selected' | 'discarded';
  createdAt: string;
  updatedAt: string;
}

// Interface para usuário admin
export interface AdminUser {
  id?: number;
  username: string;
  password: string;
  createdAt: string;
}

// Inicializar banco de dados e criar tabelas
export async function initializeDatabase() {
  const db = await openDB();
  
  // Tabela para formulários
  await db.exec(`
    CREATE TABLE IF NOT EXISTS form_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeCompleto TEXT NOT NULL,
      idade TEXT,
      cidadeEstado TEXT,
      telefone TEXT NOT NULL,
      instagram TEXT,
      seguidores TEXT,
      experienciaProtese TEXT,
      facilidadeVideos TEXT,
      autorizacaoImagem TEXT,
      status TEXT NOT NULL DEFAULT 'abandoned',
      currentStep INTEGER NOT NULL DEFAULT 1,
      analysisStatus TEXT DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela para usuários admin
  await db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.close();
}

// Salvar ou atualizar progresso do formulário
export async function saveFormProgress(formData: Partial<FormData>, sessionId?: string) {
  const db = await openDB();
  
  try {
    // Se temos um sessionId, tentamos atualizar o registro existente
    if (sessionId) {
      const existing = await db.get(
        'SELECT id FROM form_submissions WHERE id = ?',
        [sessionId]
      );
      
      if (existing) {
        await db.run(`
          UPDATE form_submissions 
          SET nomeCompleto = ?, idade = ?, cidadeEstado = ?, telefone = ?, instagram = ?, 
              seguidores = ?, experienciaProtese = ?, facilidadeVideos = ?, 
              autorizacaoImagem = ?, status = ?, currentStep = ?, 
              updatedAt = CURRENT_TIMESTAMP
          WHERE id = ?
        `, [
          formData.nomeCompleto || '',
          formData.idade || '',
          formData.cidadeEstado || '',
          formData.telefone || '',
          formData.instagram || '',
          formData.seguidores || '',
          formData.experienciaProtese || '',
          formData.facilidadeVideos || '',
          formData.autorizacaoImagem || '',
          formData.status || 'abandoned',
          formData.currentStep || 1,
          sessionId
        ]);
        
        return sessionId;
      }
    }
    
    // Criar novo registro
    const result = await db.run(`
      INSERT INTO form_submissions 
      (nomeCompleto, idade, cidadeEstado, telefone, instagram, seguidores, 
       experienciaProtese, facilidadeVideos, autorizacaoImagem, status, currentStep)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      formData.nomeCompleto || '',
      formData.idade || '',
      formData.cidadeEstado || '',
      formData.telefone || '',
      formData.instagram || '',
      formData.seguidores || '',
      formData.experienciaProtese || '',
      formData.facilidadeVideos || '',
      formData.autorizacaoImagem || '',
      formData.status || 'abandoned',
      formData.currentStep || 1
    ]);
    
    return result.lastID;
  } finally {
    await db.close();
  }
}

// Buscar todos os formulários
export async function getAllFormSubmissions() {
  const db = await openDB();
  
  try {
    const submissions = await db.all(`
      SELECT * FROM form_submissions 
      ORDER BY updatedAt DESC
    `);
    
    return submissions;
  } finally {
    await db.close();
  }
}

// Buscar formulários por status
export async function getFormSubmissionsByStatus(status: 'abandoned' | 'completed') {
  const db = await openDB();
  
  try {
    const submissions = await db.all(`
      SELECT * FROM form_submissions 
      WHERE status = ? 
      ORDER BY updatedAt DESC
    `, [status]);
    
    return submissions;
  } finally {
    await db.close();
  }
}

// Buscar estatísticas do dashboard
export async function getDashboardStats() {
  const db = await openDB();
  
  try {
    const totalSubmissions = await db.get('SELECT COUNT(*) as count FROM form_submissions');
    const completedSubmissions = await db.get('SELECT COUNT(*) as count FROM form_submissions WHERE status = "completed"');
    const abandonedSubmissions = await db.get('SELECT COUNT(*) as count FROM form_submissions WHERE status = "abandoned"');
    
    // Estatísticas por etapa de abandono
    const abandonedByStep = await db.all(`
      SELECT currentStep as step, COUNT(*) as count 
      FROM form_submissions 
      WHERE status = "abandoned" 
      GROUP BY currentStep 
      ORDER BY currentStep
    `);
    
    // Calcular taxa de conversão
    const conversionRate = totalSubmissions.count > 0 
      ? (completedSubmissions.count / totalSubmissions.count) * 100 
      : 0;

    return {
      total: totalSubmissions.count,
      completed: completedSubmissions.count,
      abandoned: abandonedSubmissions.count,
      conversionRate: conversionRate,
      abandonedByStep
    };
  } finally {
    await db.close();
  }
}

// Buscar usuário admin por username
export async function getAdminUser(username: string) {
  const db = await openDB();
  
  try {
    const user = await db.get(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );
    
    return user;
  } finally {
    await db.close();
  }
}

// Criar usuário admin (apenas para setup inicial)
export async function createAdminUser(username: string, hashedPassword: string) {
  const db = await openDB();
  
  try {
    const result = await db.run(
      'INSERT INTO admin_users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    return result.lastID;
  } finally {
    await db.close();
  }
}

// Atualizar status de análise de um formulário
export async function updateAnalysisStatus(id: number, analysisStatus: 'selected' | 'discarded') {
  const db = await openDB();
  
  try {
    await db.run(
      'UPDATE form_submissions SET analysisStatus = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [analysisStatus, id]
    );
  } finally {
    await db.close();
  }
}

// Excluir formulário
export async function deleteFormSubmission(id: number) {
  const db = await openDB();
  
  try {
    await db.run('DELETE FROM form_submissions WHERE id = ?', [id]);
  } finally {
    await db.close();
  }
}

// Obter formulários por status de análise
export async function getFormSubmissionsByAnalysisStatus(analysisStatus: 'pending' | 'selected' | 'discarded') {
  const db = await openDB();
  
  try {
    const submissions = await db.all(
      'SELECT * FROM form_submissions WHERE analysisStatus = ? ORDER BY updatedAt DESC',
      [analysisStatus]
    );
    return submissions;
  } finally {
    await db.close();
  }
}