const sqlite3 = require('sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

// Configuração do admin padrão
const ADMIN_USERNAME = 'admin@sourcehair.com';
const ADMIN_PASSWORD = 'admin123';

async function setupAdmin() {
  const dbPath = path.join(process.cwd(), 'database.sqlite');
  const db = new sqlite3.Database(dbPath);
  
  try {
    console.log('Configurando banco de dados...');
    
    // Criar tabelas se não existirem
    await new Promise((resolve, reject) => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS form_submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nomeCompleto TEXT NOT NULL,
          telefone TEXT NOT NULL,
          email TEXT NOT NULL,
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
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS admin_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    console.log('Tabelas criadas com sucesso!');
    
    // Verificar se já existe um admin
    const existingAdmin = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM admin_users WHERE username = ?', [ADMIN_USERNAME], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (existingAdmin) {
      console.log('Usuário admin já existe!');
      console.log(`Username: ${ADMIN_USERNAME}`);
      console.log('Para alterar a senha, delete o arquivo database.sqlite e execute este script novamente.');
      return;
    }
    
    // Criar hash da senha
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    
    // Inserir admin no banco
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO admin_users (username, password) VALUES (?, ?)',
        [ADMIN_USERNAME, hashedPassword],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
    
    console.log('✅ Usuário admin criado com sucesso!');
    console.log(`Username: ${ADMIN_USERNAME}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log('');
    console.log('⚠️  IMPORTANTE: Altere a senha padrão após o primeiro login!');
    console.log('Acesse: http://localhost:3000/login');
    
  } catch (error) {
    console.error('Erro ao configurar admin:', error);
  } finally {
    db.close();
  }
}

setupAdmin();