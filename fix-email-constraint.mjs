import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const fixEmailConstraint = async () => {
  const db = await open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });

  try {
    console.log('=== CORRIGINDO RESTRIÇÃO NOT NULL DO CAMPO EMAIL ===');
    
    // SQLite não permite ALTER COLUMN diretamente, então precisamos recriar a tabela
    console.log('1. Criando tabela temporária...');
    
    await db.exec(`
      CREATE TABLE form_submissions_temp (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeCompleto TEXT NOT NULL,
        telefone TEXT NOT NULL,
        email TEXT,
        instagram TEXT,
        linkedin TEXT,
        whatsapp TEXT,
        experiencia TEXT,
        disponibilidade TEXT,
        motivacao TEXT,
        expectativas TEXT,
        status TEXT NOT NULL DEFAULT 'abandoned',
        currentStep INTEGER NOT NULL DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        analysisStatus TEXT DEFAULT 'pending',
        idade TEXT,
        cidadeEstado TEXT,
        experienciaProtese TEXT,
        seguidores TEXT,
        facilidadeVideos TEXT,
        autorizacaoImagem TEXT
      )
    `);

    console.log('2. Copiando dados da tabela original...');
    
    await db.exec(`
      INSERT INTO form_submissions_temp 
      SELECT * FROM form_submissions
    `);

    console.log('3. Removendo tabela original...');
    await db.exec('DROP TABLE form_submissions');

    console.log('4. Renomeando tabela temporária...');
    await db.exec('ALTER TABLE form_submissions_temp RENAME TO form_submissions');

    console.log('✅ SUCESSO! Restrição NOT NULL removida do campo email');
    
    // Verificar a nova estrutura
    console.log('\n=== NOVA ESTRUTURA DA TABELA ===');
    const tableInfo = await db.all("PRAGMA table_info(form_submissions)");
    const emailColumn = tableInfo.find(col => col.name === 'email');
    console.log('Campo email agora:', emailColumn);

  } catch (error) {
    console.error('❌ Erro ao corrigir restrição:', error);
  } finally {
    await db.close();
  }
};

fixEmailConstraint();