import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.sqlite');

db.all('SELECT * FROM form_submissions WHERE status = "completed" LIMIT 1', (err, rows) => {
  if (err) {
    console.error('Erro:', err);
  } else {
    console.log('Dados no banco:');
    if (rows.length > 0) {
      console.log(JSON.stringify(rows[0], null, 2));
    } else {
      console.log('Nenhum registro encontrado');
    }
  }
  db.close();
});