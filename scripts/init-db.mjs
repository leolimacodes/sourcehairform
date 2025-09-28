import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import path from 'path';

// Configuração do banco de dados SQLite
async function openDB() {
  return open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });
}

// Inicializar banco de dados e criar tabelas
async function initializeDatabase() {
  const db = await openDB();
  
  // Tabela para formulários
  await db.exec(`
    CREATE TABLE IF NOT EXISTS form_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeCompleto TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT NOT NULL,
      instagram TEXT,
      linkedin TEXT,
      whatsapp TEXT,
      experiencia TEXT NOT NULL,
      disponibilidade TEXT NOT NULL,
      motivacao TEXT NOT NULL,
      expectativas TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'abandoned',
      currentStep INTEGER NOT NULL DEFAULT 1,
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

// Hash da senha
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Criar usuário admin (apenas para setup inicial)
async function createAdminUser(username, hashedPassword) {
  const db = await openDB();
  
  try {
    // Verificar se já existe
    const existing = await db.get(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );
    
    if (existing) {
      console.log('Usuário admin já existe!');
      return existing.id;
    }
    
    const result = await db.run(
      'INSERT INTO admin_users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    return result.lastID;
  } finally {
    await db.close();
  }
}

async function initDB() {
  try {
    console.log('Inicializando banco de dados...');
    
    // Inicializar tabelas
    await initializeDatabase();
    console.log('Tabelas criadas com sucesso!');
    
    // Criar usuário admin padrão
    const hashedPassword = await hashPassword('admin123');
    await createAdminUser('admin@sourcehair.com', hashedPassword);
    console.log('Usuário admin criado: admin@sourcehair.com/admin123');
    
    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
  }
}

initDB();