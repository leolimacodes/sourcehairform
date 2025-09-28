// Usar ts-node para executar TypeScript
require('ts-node/register');
const { initializeDatabase, createAdminUser } = require('../lib/database');
const { hashPassword } = require('../lib/auth');

async function initDB() {
  try {
    console.log('Inicializando banco de dados...');
    
    // Inicializar tabelas
    await initializeDatabase();
    console.log('Tabelas criadas com sucesso!');
    
    // Criar usuário admin padrão
    const hashedPassword = await hashPassword('admin123');
    await createAdminUser('admin', hashedPassword);
    console.log('Usuário admin criado: admin/admin123');
    
    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
  }
}

initDB();