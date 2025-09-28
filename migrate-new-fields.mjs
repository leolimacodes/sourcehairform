import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.sqlite');

console.log('Iniciando migração da estrutura do banco...');

// Primeiro, vamos verificar a estrutura atual
db.all("PRAGMA table_info(form_submissions)", (err, columns) => {
  if (err) {
    console.error('Erro ao verificar estrutura:', err);
    return;
  }
  
  console.log('Estrutura atual da tabela:');
  columns.forEach(col => {
    console.log(`- ${col.name}: ${col.type}`);
  });
  
  // Adicionar novas colunas se não existirem
  const newColumns = [
    { name: 'idade', type: 'TEXT' },
    { name: 'cidadeEstado', type: 'TEXT' },
    { name: 'seguidores', type: 'TEXT' },
    { name: 'experienciaProtese', type: 'TEXT' },
    { name: 'facilidadeVideos', type: 'TEXT' },
    { name: 'autorizacaoImagem', type: 'TEXT' }
  ];
  
  const existingColumns = columns.map(col => col.name);
  
  newColumns.forEach(newCol => {
    if (!existingColumns.includes(newCol.name)) {
      console.log(`Adicionando coluna: ${newCol.name}`);
      db.run(`ALTER TABLE form_submissions ADD COLUMN ${newCol.name} ${newCol.type}`, (err) => {
        if (err) {
          console.error(`Erro ao adicionar coluna ${newCol.name}:`, err);
        } else {
          console.log(`Coluna ${newCol.name} adicionada com sucesso`);
        }
      });
    } else {
      console.log(`Coluna ${newCol.name} já existe`);
    }
  });
  
  // Verificar estrutura final após 2 segundos
  setTimeout(() => {
    db.all("PRAGMA table_info(form_submissions)", (err, finalColumns) => {
      if (err) {
        console.error('Erro ao verificar estrutura final:', err);
        return;
      }
      
      console.log('\nEstrutura final da tabela:');
      finalColumns.forEach(col => {
        console.log(`- ${col.name}: ${col.type}`);
      });
      
      db.close();
      console.log('\nMigração concluída!');
    });
  }, 2000);
});