"use client"

import { motion } from "framer-motion"

interface SuccessScreenProps {
  formData: {
    nomeCompleto: string
    idade: string
    cidadeEstado: string
    telefone: string
    instagram: string
    seguidores: string
    experienciaProtese: string
    facilidadeVideos: string
    autorizacaoImagem: string
  }
}

export function SuccessScreen({ formData }: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-gray-200 text-center">
          {/* Ícone de Sucesso */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-[#b18933] to-[#daa520] rounded-full flex items-center justify-center shadow-lg shadow-[#b18933]/30"
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            🎉 Parabéns, {formData?.nomeCompleto?.split(' ')[0] || 'Candidato'}!
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 leading-relaxed"
          >
            Seu formulário foi enviado com sucesso!
          </motion.p>

          {/* Card de Informações */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-r from-[#b18933]/10 to-[#daa520]/10 rounded-2xl p-8 mb-8 border border-[#b18933]/20"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#b18933] to-[#daa520] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-[#8b6914] mb-3">
              Aguarde nosso contato!
            </h3>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Nossa equipe especializada entrará em contato com você pelo WhatsApp <strong>({formData.telefone})</strong> em até <strong>24 horas</strong> para dar continuidade ao seu processo de parceria.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#b18933] rounded-full mr-2"></div>
                Resposta Rápida
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#b18933] rounded-full mr-2"></div>
                Atendimento Personalizado
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#b18933] rounded-full mr-2"></div>
                Suporte Completo
              </div>
            </div>
          </motion.div>

          {/* Informações Adicionais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-500 text-sm leading-relaxed"
          >
            <p className="mb-2">
              <strong>Próximos passos:</strong> Nossa equipe analisará seu perfil e entrará em contato para apresentar as oportunidades de parceria disponíveis.
            </p>
            <p>
              Enquanto isso, você pode nos seguir no Instagram{' '}
              <a 
                href="https://instagram.com/sourcehair.protesecapilar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#b18933] hover:text-[#8b6914] font-semibold transition-colors duration-200"
              >
                @sourcehair.protesecapilar
              </a>{' '}
              para acompanhar novidades e dicas exclusivas!
            </p>
          </motion.div>

          {/* Botão de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8"
          >
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-[#b18933] via-[#daa520] to-[#b18933] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-[#8b6914] hover:via-[#b8860b] hover:to-[#8b6914] hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.02] shadow-lg shadow-[#b18933]/40"
            >
              Voltar ao Início
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}