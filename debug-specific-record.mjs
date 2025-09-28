import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database.sqlite'));

// Buscar o registro específico pelo telefone que aparece na imagem
const record = db.prepare(`
  SELECT * FROM form_submissions 
  WHERE telefone = ? 
  ORDER BY createdAt DESC 
  LIMIT 1
`).get('19993327883');

console.log('=== REGISTRO ENCONTRADO ===');
console.log(JSON.stringify(record, null, 2));

// Verificar a estrutura da tabela
console.log('\n=== ESTRUTURA DA TABELA ===');
const tableInfo = db.prepare("PRAGMA table_info(form_submissions)").all();
tableInfo.forEach(column => {
  console.log(`${column.name}: ${column.type}`);
});

db.close();