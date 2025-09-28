import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const checkTableStructure = async () => {
  const db = await open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });

  try {
    console.log('=== ESTRUTURA DA TABELA form_submissions ===');
    
    // Verificar a estrutura da tabela
    const tableInfo = await db.all("PRAGMA table_info(form_submissions)");
    console.log('\nColunas da tabela:');
    tableInfo.forEach(column => {
      console.log(`- ${column.name}: ${column.type} ${column.notnull ? '(NOT NULL)' : '(NULLABLE)'} ${column.dflt_value ? `DEFAULT ${column.dflt_value}` : ''}`);
    });

    // Verificar se existe campo email
    const emailColumn = tableInfo.find(col => col.name === 'email');
    if (emailColumn) {
      console.log('\n⚠️  PROBLEMA ENCONTRADO: Campo "email" existe na tabela com restrição NOT NULL!');
      console.log('Detalhes do campo email:', emailColumn);
    } else {
      console.log('\n✅ Campo "email" não existe na tabela (como esperado)');
    }

    // Verificar alguns registros para entender melhor
    console.log('\n=== AMOSTRA DE DADOS ===');
    const sampleData = await db.all("SELECT * FROM form_submissions LIMIT 3");
    console.log('Primeiros 3 registros:', JSON.stringify(sampleData, null, 2));

  } catch (error) {
    console.error('Erro ao verificar estrutura:', error);
  } finally {
    await db.close();
  }
};

checkTableStructure();