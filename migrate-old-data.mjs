import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database.sqlite'));

console.log('=== MIGRANDO DADOS ANTIGOS PARA NOVOS CAMPOS ===');

// Migrar dados de experiencia para experienciaProtese
const updateExperiencia = db.prepare(`
  UPDATE form_submissions 
  SET experienciaProtese = experiencia 
  WHERE experiencia IS NOT NULL 
  AND experiencia != '' 
  AND (experienciaProtese IS NULL OR experienciaProtese = '')
`);

// Migrar dados de disponibilidade para facilidadeVideos
const updateDisponibilidade = db.prepare(`
  UPDATE form_submissions 
  SET facilidadeVideos = disponibilidade 
  WHERE disponibilidade IS NOT NULL 
  AND disponibilidade != '' 
  AND (facilidadeVideos IS NULL OR facilidadeVideos = '')
`);

const experienciaUpdated = updateExperiencia.run();
const disponibilidadeUpdated = updateDisponibilidade.run();

console.log(`Migrados ${experienciaUpdated.changes} registros de experiencia -> experienciaProtese`);
console.log(`Migrados ${disponibilidadeUpdated.changes} registros de disponibilidade -> facilidadeVideos`);

// Verificar o registro específico após migração
const record = db.prepare(`
  SELECT nomeCompleto, experiencia, experienciaProtese, disponibilidade, facilidadeVideos 
  FROM form_submissions 
  WHERE telefone = ?
`).get('19993327883');

console.log('\n=== REGISTRO APÓS MIGRAÇÃO ===');
console.log(JSON.stringify(record, null, 2));

db.close();
console.log('\n✅ Migração concluída!');