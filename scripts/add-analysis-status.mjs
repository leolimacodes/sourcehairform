import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Conectar ao banco de dados
const dbPath = join(__dirname, '..', 'database.sqlite');
const db = new Database(dbPath);

try {
  console.log('Adicionando coluna analysisStatus ao banco de dados...');
  
  // Verificar se a coluna já existe
  const tableInfo = db.prepare("PRAGMA table_info(form_submissions)").all();
  const hasAnalysisStatus = tableInfo.some(column => column.name === 'analysisStatus');
  
  if (!hasAnalysisStatus) {
    // Adicionar a coluna analysisStatus
    db.prepare(`
      ALTER TABLE form_submissions 
      ADD COLUMN analysisStatus TEXT DEFAULT 'pending'
    `).run();
    
    console.log('✅ Coluna analysisStatus adicionada com sucesso!');
  } else {
    console.log('ℹ️ Coluna analysisStatus já existe no banco de dados.');
  }
  
  // Verificar a estrutura da tabela
  console.log('\nEstrutura atual da tabela form_submissions:');
  const updatedTableInfo = db.prepare("PRAGMA table_info(form_submissions)").all();
  updatedTableInfo.forEach(column => {
    console.log(`- ${column.name}: ${column.type} ${column.dflt_value ? `(default: ${column.dflt_value})` : ''}`);
  });
  
} catch (error) {
  console.error('❌ Erro ao atualizar o banco de dados:', error);
} finally {
  db.close();
  console.log('\n🔒 Conexão com o banco de dados fechada.');
}