import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database.sqlite'));

console.log('=== CORRIGINDO REGISTRO ESPECÍFICO ===');

// Corrigir o registro específico com os dados que sabemos que foram preenchidos
const updateRecord = db.prepare(`
  UPDATE form_submissions 
  SET 
    experienciaProtese = 'Já utilizo',
    facilidadeVideos = 'Muita Facilidade',
    autorizacaoImagem = 'Sim'
  WHERE telefone = '19993327883'
`);

const result = updateRecord.run();
console.log(`Atualizado ${result.changes} registro(s)`);

// Verificar o registro após correção
const record = db.prepare(`
  SELECT * FROM form_submissions 
  WHERE telefone = '19993327883'
`).get();

console.log('\n=== REGISTRO APÓS CORREÇÃO ===');
console.log(JSON.stringify(record, null, 2));

db.close();
console.log('\n✅ Correção concluída!');