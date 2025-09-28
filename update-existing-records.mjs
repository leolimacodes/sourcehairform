import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const updateExistingRecords = async () => {
  const db = await open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });

  try {
    console.log('=== ATUALIZANDO REGISTROS EXISTENTES ===');
    
    // Primeiro, vamos ver quantos registros precisam ser atualizados
    const recordsNeedingUpdate = await db.all(`
      SELECT id, nomeCompleto, telefone 
      FROM form_submissions 
      WHERE (idade IS NULL OR idade = '') 
         OR (cidadeEstado IS NULL OR cidadeEstado = '') 
         OR (seguidores IS NULL OR seguidores = '')
    `);

    console.log(`\nEncontrados ${recordsNeedingUpdate.length} registros que precisam de atualização:`);
    recordsNeedingUpdate.forEach(record => {
      console.log(`- ID ${record.id}: ${record.nomeCompleto} (${record.telefone})`);
    });

    if (recordsNeedingUpdate.length === 0) {
      console.log('\n✅ Todos os registros já estão atualizados!');
      return;
    }

    // Para registros antigos, vamos definir valores padrão baseados no contexto
    console.log('\n=== APLICANDO VALORES PADRÃO ===');
    
    // Atualizar idade para registros sem idade
    const idadeUpdated = await db.run(`
      UPDATE form_submissions 
      SET idade = 'Não informado'
      WHERE idade IS NULL OR idade = ''
    `);
    console.log(`✅ Idade atualizada em ${idadeUpdated.changes} registros`);

    // Atualizar cidadeEstado para registros sem cidade/estado
    const cidadeUpdated = await db.run(`
      UPDATE form_submissions 
      SET cidadeEstado = 'Não informado'
      WHERE cidadeEstado IS NULL OR cidadeEstado = ''
    `);
    console.log(`✅ Cidade/Estado atualizada em ${cidadeUpdated.changes} registros`);

    // Atualizar seguidores para registros sem seguidores
    const seguidoresUpdated = await db.run(`
      UPDATE form_submissions 
      SET seguidores = 'Não informado'
      WHERE seguidores IS NULL OR seguidores = ''
    `);
    console.log(`✅ Seguidores atualizado em ${seguidoresUpdated.changes} registros`);

    // Verificar alguns registros após a atualização
    console.log('\n=== VERIFICAÇÃO PÓS-ATUALIZAÇÃO ===');
    const sampleUpdated = await db.all(`
      SELECT id, nomeCompleto, idade, cidadeEstado, seguidores 
      FROM form_submissions 
      WHERE id IN (1, 2, 3)
    `);
    
    sampleUpdated.forEach(record => {
      console.log(`ID ${record.id} - ${record.nomeCompleto}:`);
      console.log(`  Idade: ${record.idade}`);
      console.log(`  Cidade/Estado: ${record.cidadeEstado}`);
      console.log(`  Seguidores: ${record.seguidores}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Erro ao atualizar registros:', error);
  } finally {
    await db.close();
  }
};

updateExistingRecords();