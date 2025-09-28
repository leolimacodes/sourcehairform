import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const verifySavedData = async () => {
  const db = await open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });

  try {
    console.log('=== VERIFICANDO DADOS SALVOS ===');
    
    // Buscar o último registro (ID 27)
    const lastRecord = await db.get(
      'SELECT * FROM form_submissions WHERE id = 27'
    );

    if (lastRecord) {
      console.log('\n✅ REGISTRO ENCONTRADO (ID 27):');
      console.log('Nome Completo:', lastRecord.nomeCompleto);
      console.log('Idade:', lastRecord.idade);
      console.log('Cidade/Estado:', lastRecord.cidadeEstado);
      console.log('Telefone:', lastRecord.telefone);
      console.log('Instagram:', lastRecord.instagram);
      console.log('Seguidores:', lastRecord.seguidores);
      console.log('Experiência Prótese:', lastRecord.experienciaProtese);
      console.log('Facilidade Vídeos:', lastRecord.facilidadeVideos);
      console.log('Autorização Imagem:', lastRecord.autorizacaoImagem);
      
      // Verificar se os campos específicos foram salvos
      const camposProblematicos = ['idade', 'cidadeEstado', 'seguidores'];
      console.log('\n=== VERIFICAÇÃO DOS CAMPOS PROBLEMÁTICOS ===');
      
      camposProblematicos.forEach(campo => {
        const valor = lastRecord[campo];
        if (valor && valor !== null && valor !== '') {
          console.log(`✅ ${campo}: "${valor}" (SALVO CORRETAMENTE)`);
        } else {
          console.log(`❌ ${campo}: ${valor} (NÃO SALVO)`);
        }
      });
      
    } else {
      console.log('❌ Registro ID 27 não encontrado');
    }

  } catch (error) {
    console.error('❌ Erro ao verificar dados:', error);
  } finally {
    await db.close();
  }
};

verifySavedData();