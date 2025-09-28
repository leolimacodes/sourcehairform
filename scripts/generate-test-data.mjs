import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Dados de exemplo para gerar formulários de teste
const nomes = [
  'Ana Silva Santos', 'Maria Oliveira Costa', 'Juliana Ferreira Lima', 
  'Carla Rodrigues Alves', 'Fernanda Souza Pereira', 'Beatriz Martins Rocha',
  'Camila Santos Barbosa', 'Larissa Costa Mendes', 'Gabriela Lima Cardoso',
  'Rafaela Alves Nascimento', 'Isabela Pereira Dias', 'Letícia Rocha Silva',
  'Mariana Barbosa Oliveira', 'Natália Mendes Ferreira', 'Priscila Cardoso Santos'
];

const cidades = [
  'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 
  'Salvador, BA', 'Fortaleza, CE', 'Brasília, DF',
  'Curitiba, PR', 'Recife, PE', 'Porto Alegre, RS',
  'Manaus, AM', 'Belém, PA', 'Goiânia, GO',
  'Guarulhos, SP', 'Campinas, SP', 'São Luís, MA'
];

const instagrams = [
  '@ana_beauty', '@maria_hair', '@ju_cabelos', '@carla_style',
  '@fer_beleza', '@bia_hair', '@cami_beauty', '@lari_cabelos',
  '@gabi_style', '@rafa_beleza', '@isa_hair', '@leti_beauty',
  '@mari_cabelos', '@nat_style', '@pri_beleza'
];

const experiencias = [
  'Nunca usei, mas tenho muito interesse',
  'Já usei algumas vezes e gostei muito',
  'Uso frequentemente, sou experiente',
  'Tenho pouca experiência, mas quero aprender',
  'Já testei algumas marcas diferentes'
];

const facilidades = [
  'Tenho muita facilidade, amo gravar',
  'Tenho facilidade média, posso aprender',
  'Tenho pouca experiência, mas estou disposta',
  'Sou muito tímida, mas quero tentar',
  'Já gravo conteúdo regularmente'
];

const autorizacoes = [
  'Sim, autorizo completamente',
  'Sim, mas com algumas restrições',
  'Preciso conversar melhor sobre isso'
];

// Função para gerar número de telefone aleatório
function gerarTelefone() {
  const ddd = Math.floor(Math.random() * 89) + 11; // DDDs de 11 a 99
  const numero = Math.floor(Math.random() * 900000000) + 100000000; // 9 dígitos
  return `(${ddd}) 9${numero.toString().substring(0, 4)}-${numero.toString().substring(4, 8)}`;
}

// Função para gerar idade aleatória
function gerarIdade() {
  return Math.floor(Math.random() * 25) + 18; // Idades de 18 a 42
}

// Função para gerar número de seguidores
function gerarSeguidores() {
  const opcoes = [
    'Menos de 1.000',
    'Entre 1.000 e 5.000',
    'Entre 5.000 e 10.000',
    'Entre 10.000 e 50.000',
    'Mais de 50.000'
  ];
  return opcoes[Math.floor(Math.random() * opcoes.length)];
}

// Função para gerar data aleatória nos últimos 30 dias
function gerarDataAleatoria() {
  const agora = new Date();
  const diasAtras = Math.floor(Math.random() * 30);
  const horasAtras = Math.floor(Math.random() * 24);
  const minutosAtras = Math.floor(Math.random() * 60);
  
  const data = new Date(agora);
  data.setDate(data.getDate() - diasAtras);
  data.setHours(data.getHours() - horasAtras);
  data.setMinutes(data.getMinutes() - minutosAtras);
  
  return data.toISOString();
}

// Função para abrir conexão com o banco
async function openDB() {
  return open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });
}

// Função principal para gerar dados de teste
async function generateTestData() {
  const db = await openDB();
  
  try {
    console.log('🚀 Gerando dados de teste para o painel admin...\n');
    
    // Limpar dados existentes (opcional)
    console.log('🧹 Limpando dados existentes...');
    await db.run('DELETE FROM form_submissions');
    
    let totalInseridos = 0;
    
    // Gerar formulários completos (completed)
    console.log('✅ Gerando formulários completos...');
    for (let i = 0; i < 8; i++) {
      const nome = nomes[i];
      const dataBase = gerarDataAleatoria();
      
      const formData = {
        nomeCompleto: nome,
        telefone: gerarTelefone(),
        email: `${nome.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '')}@email.com`,
        instagram: instagrams[i],
        linkedin: '',
        whatsapp: '',
        experiencia: experiencias[Math.floor(Math.random() * experiencias.length)],
        disponibilidade: facilidades[Math.floor(Math.random() * facilidades.length)],
        motivacao: '',
        expectativas: '',
        status: 'completed',
        currentStep: 9,
        analysisStatus: i < 3 ? 'selected' : i < 6 ? 'pending' : 'discarded',
        createdAt: dataBase,
        updatedAt: dataBase
      };
      
      await db.run(`
        INSERT INTO form_submissions 
        (nomeCompleto, telefone, email, instagram, linkedin, whatsapp, 
         experiencia, disponibilidade, motivacao, expectativas, status, 
         currentStep, analysisStatus, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        formData.nomeCompleto, formData.telefone, formData.email,
        formData.instagram, formData.linkedin, formData.whatsapp,
        formData.experiencia, formData.disponibilidade, formData.motivacao,
        formData.expectativas, formData.status, formData.currentStep,
        formData.analysisStatus, formData.createdAt, formData.updatedAt
      ]);
      
      totalInseridos++;
      console.log(`   ✓ ${nome} - Status: ${formData.analysisStatus}`);
    }
    
    // Gerar formulários abandonados (abandoned)
    console.log('\n🚫 Gerando formulários abandonados...');
    for (let i = 8; i < 15; i++) {
      const nome = nomes[i];
      const stepAbandonado = Math.floor(Math.random() * 8) + 1; // Etapas 1-8
      const dataBase = gerarDataAleatoria();
      
      const formData = {
        nomeCompleto: nome,
        telefone: stepAbandonado >= 4 ? gerarTelefone() : '',
        email: `${nome.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '')}@email.com`,
        instagram: stepAbandonado >= 5 ? instagrams[i] : '',
        linkedin: '',
        whatsapp: '',
        experiencia: stepAbandonado >= 7 ? experiencias[Math.floor(Math.random() * experiencias.length)] : '',
        disponibilidade: stepAbandonado >= 8 ? facilidades[Math.floor(Math.random() * facilidades.length)] : '',
        motivacao: '',
        expectativas: '',
        status: 'abandoned',
        currentStep: stepAbandonado,
        analysisStatus: 'pending',
        createdAt: dataBase,
        updatedAt: dataBase
      };
      
      await db.run(`
        INSERT INTO form_submissions 
        (nomeCompleto, telefone, email, instagram, linkedin, whatsapp, 
         experiencia, disponibilidade, motivacao, expectativas, status, 
         currentStep, analysisStatus, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        formData.nomeCompleto, formData.telefone, formData.email,
        formData.instagram, formData.linkedin, formData.whatsapp,
        formData.experiencia, formData.disponibilidade, formData.motivacao,
        formData.expectativas, formData.status, formData.currentStep,
        formData.analysisStatus, formData.createdAt, formData.updatedAt
      ]);
      
      totalInseridos++;
      console.log(`   ✓ ${nome} - Abandonado na etapa ${stepAbandonado}`);
    }
    
    console.log(`\n🎉 Dados de teste gerados com sucesso!`);
    console.log(`📊 Total de registros inseridos: ${totalInseridos}`);
    console.log(`   • Formulários completos: 8`);
    console.log(`   • Formulários abandonados: 7`);
    console.log(`   • Selecionados: 3`);
    console.log(`   • Pendentes: 10`);
    console.log(`   • Descartados: 2`);
    
  } catch (error) {
    console.error('❌ Erro ao gerar dados de teste:', error);
  } finally {
    await db.close();
  }
}

// Executar o script
generateTestData().catch(console.error);