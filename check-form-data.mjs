import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database.sqlite'));

console.log('=== VERIFICANDO DADOS DO FORMULÁRIO ===');

// Buscar todos os registros para ver quais campos estão preenchidos
const allRecords = db.prepare(`
  SELECT 
    id, nomeCompleto, idade, cidadeEstado, telefone, instagram, seguidores,
    experienciaProtese, facilidadeVideos, autorizacaoImagem, status, currentStep
  FROM form_submissions 
  ORDER BY createdAt DESC 
  LIMIT 5
`).all();

console.log('=== ÚLTIMOS 5 REGISTROS ===');
allRecords.forEach((record, index) => {
  console.log(`\n--- Registro ${index + 1} ---`);
  console.log(`ID: ${record.id}`);
  console.log(`Nome: ${record.nomeCompleto || 'NULL'}`);
  console.log(`Idade: ${record.idade || 'NULL'}`);
  console.log(`Cidade/Estado: ${record.cidadeEstado || 'NULL'}`);
  console.log(`Telefone: ${record.telefone || 'NULL'}`);
  console.log(`Instagram: ${record.instagram || 'NULL'}`);
  console.log(`Seguidores: ${record.seguidores || 'NULL'}`);
  console.log(`Status: ${record.status}`);
  console.log(`Step: ${record.currentStep}`);
});

// Verificar quantos registros têm cada campo preenchido
const stats = db.prepare(`
  SELECT 
    COUNT(*) as total,
    COUNT(CASE WHEN idade IS NOT NULL AND idade != '' THEN 1 END) as com_idade,
    COUNT(CASE WHEN cidadeEstado IS NOT NULL AND cidadeEstado != '' THEN 1 END) as com_cidade,
    COUNT(CASE WHEN seguidores IS NOT NULL AND seguidores != '' THEN 1 END) as com_seguidores
  FROM form_submissions
`).get();

console.log('\n=== ESTATÍSTICAS ===');
console.log(`Total de registros: ${stats.total}`);
console.log(`Com idade: ${stats.com_idade}`);
console.log(`Com cidade/estado: ${stats.com_cidade}`);
console.log(`Com seguidores: ${stats.com_seguidores}`);

db.close();