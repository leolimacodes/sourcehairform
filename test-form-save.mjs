// Simulando uma chamada para a API save-progress
const testFormData = {
  nomeCompleto: "Teste Completo",
  idade: "25",
  cidadeEstado: "São Paulo, SP", 
  telefone: "11999887766",
  instagram: "@testeteste",
  seguidores: "Entre 1.000 e 5.000",
  experienciaProtese: "Primeira experiência",
  facilidadeVideos: "Muita facilidade",
  autorizacaoImagem: "Sim"
};

const testSave = async () => {
  try {
    console.log('=== TESTANDO SALVAMENTO DO FORMULÁRIO ===');
    console.log('Dados a serem salvos:', JSON.stringify(testFormData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/form/save-progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData: testFormData,
        currentStep: 9,
        status: 'completed'
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('\n✅ SUCESSO! Resposta da API:', result);
    } else {
      const error = await response.text();
      console.log('\n❌ ERRO! Status:', response.status, 'Resposta:', error);
    }
  } catch (error) {
    console.error('\n❌ ERRO na requisição:', error);
  }
};

testSave();