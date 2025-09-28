import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');

console.log('=== Verificando dados no banco ===');

db.all(`SELECT id, nomeCompleto, analysisStatus, updatedAt FROM form_submissions 
        WHERE analysisStatus IN ('selected', 'discarded') 
        ORDER BY updatedAt DESC`, (err, rows) => {
  if (err) {
    console.error('Erro:', err);
    return;
  }
  
  console.log('Registros com analysisStatus:');
  rows.forEach(row => {
    console.log(`ID: ${row.id}, Nome: ${row.nomeCompleto}, Status: ${row.analysisStatus}, Updated: ${row.updatedAt}`);
  });
  
  const selected = rows.filter(r => r.analysisStatus === 'selected');
  const discarded = rows.filter(r => r.analysisStatus === 'discarded');
  
  console.log(`\nTotal selecionados no banco: ${selected.length}`);
  console.log(`Total descartados no banco: ${discarded.length}`);
  
  // Verificar especificamente o ID 5
  const id5 = rows.find(r => r.id === 5);
  if (id5) {
    console.log(`\nID 5 (Fernanda): ${id5.analysisStatus} - ${id5.updatedAt}`);
  } else {
    console.log('\nID 5 não encontrado nos registros com analysisStatus');
  }
  
  db.close();
});