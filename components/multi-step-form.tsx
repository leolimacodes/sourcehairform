"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SuccessScreen } from "./success-screen"

interface FormData {
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

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionId, setSubmissionId] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: "",
    idade: "",
    cidadeEstado: "",
    telefone: "",
    instagram: "",
    seguidores: "",
    experienciaProtese: "",
    facilidadeVideos: "",
    autorizacaoImagem: ""
  })

  const totalSteps = 9

  // Função para salvar progresso no banco de dados
  const saveProgress = async (status: 'abandoned' | 'completed' = 'abandoned') => {
    try {
      const response = await fetch('/api/form/save-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          currentStep,
          status
        }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.submissionId && !submissionId) {
          setSubmissionId(result.submissionId)
        }
      }
    } catch (error) {
      console.error('Erro ao salvar progresso:', error)
    }
  }

  // Salvar progresso automaticamente quando os dados mudarem
  useEffect(() => {
    if (formData.nomeCompleto.trim() !== '') {
      const timeoutId = setTimeout(() => {
        saveProgress('abandoned')
      }, 2000) // Salva após 2 segundos de inatividade

      return () => clearTimeout(timeoutId)
    }
  }, [formData, currentStep])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    console.log("handleNext called, currentStep:", currentStep, "isValid:", isStepValid())
    console.log("formData:", formData)
    
    // Salvar progresso antes de avançar
    saveProgress('abandoned')
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Salvar como formulário concluído no banco de dados
      await saveProgress('completed')
      
      // Mostrar tela de sucesso
      setShowSuccess(true)
      
    } catch (error) {
      console.error('Erro ao processar formulário:', error)
      // Mesmo com erro, salvar como concluído e mostrar tela de sucesso
      await saveProgress('completed')
      setShowSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = () => {
    const valid = (() => {
      switch (currentStep) {
        case 1: return formData.nomeCompleto.trim() !== ""
        case 2: return formData.idade.trim() !== ""
        case 3: return formData.cidadeEstado.trim() !== ""
        case 4: return formData.telefone.trim() !== ""
        case 5: return formData.instagram.trim() !== ""
        case 6: return formData.seguidores !== ""
        case 7: return formData.experienciaProtese !== ""
        case 8: return formData.facilidadeVideos !== ""
        case 9: return formData.autorizacaoImagem !== ""
        default: return false
      }
    })()
    
    console.log("isStepValid - currentStep:", currentStep, "valid:", valid, "formData:", formData)
    return valid
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Nome Completo</h2>
            <input
              type="text"
              value={formData.nomeCompleto}
              onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
              placeholder="Digite seu nome completo"
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-yellow-500 focus:outline-none"
              autoFocus
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Idade</h2>
            <input
              type="number"
              value={formData.idade}
              onChange={(e) => handleInputChange("idade", e.target.value)}
              placeholder="Digite sua idade"
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-yellow-500 focus:outline-none"
              autoFocus
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Cidade e Estado</h2>
            <input
              type="text"
              value={formData.cidadeEstado}
              onChange={(e) => handleInputChange("cidadeEstado", e.target.value)}
              placeholder="Ex: São Paulo, SP"
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-yellow-500 focus:outline-none"
              autoFocus
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Telefone/WhatsApp</h2>
            <input
              type="tel"
              value={formData.telefone}
              onChange={(e) => handleInputChange("telefone", e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-yellow-500 focus:outline-none"
              autoFocus
            />
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">@ Instagram/TikTok</h2>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => handleInputChange("instagram", e.target.value)}
              placeholder="@seuusuario"
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-yellow-500 focus:outline-none"
              autoFocus
            />
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Quantos seguidores você tem atualmente?</h2>
            <div className="space-y-4">
              {[
                "Menos de 1.000",
                "Entre 1.000 e 5.000",
                "Entre 5.000 e 20.000",
                "Mais de 20.000"
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange("seguidores", option)}
                  className={`group w-full p-5 border-2 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                    formData.seguidores === option
                      ? "border-[#b18933] bg-gradient-to-r from-[#b18933]/10 to-[#daa520]/10 text-[#8b6914] shadow-lg shadow-[#b18933]/20"
                      : "border-gray-200 hover:border-[#b18933]/50 hover:bg-[#b18933]/5 text-gray-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.seguidores === option
                        ? "border-[#b18933] bg-[#b18933]"
                        : "border-gray-300 group-hover:border-[#b18933]/50"
                    }`}>
                      {formData.seguidores === option && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Você já utiliza prótese capilar ou seria sua primeira experiência?</h2>
            <div className="space-y-4">
              {[
                "Já utilizo",
                "Nunca usei, mas tenho interesse"
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange("experienciaProtese", option)}
                  className={`group w-full p-5 border-2 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                    formData.experienciaProtese === option
                      ? "border-[#b18933] bg-gradient-to-r from-[#b18933]/10 to-[#daa520]/10 text-[#8b6914] shadow-lg shadow-[#b18933]/20"
                      : "border-gray-200 hover:border-[#b18933]/50 hover:bg-[#b18933]/5 text-gray-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.experienciaProtese === option
                        ? "border-[#b18933] bg-[#b18933]"
                        : "border-gray-300 group-hover:border-[#b18933]/50"
                    }`}>
                      {formData.experienciaProtese === option && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Você tem facilidade em gravar vídeos e aparecer nas câmeras?</h2>
            <div className="space-y-4">
              {[
                "Muita Facilidade",
                "Nenhuma Facilidade"
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange("facilidadeVideos", option)}
                  className={`group w-full p-5 border-2 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                    formData.facilidadeVideos === option
                      ? "border-[#b18933] bg-gradient-to-r from-[#b18933]/10 to-[#daa520]/10 text-[#8b6914] shadow-lg shadow-[#b18933]/20"
                      : "border-gray-200 hover:border-[#b18933]/50 hover:bg-[#b18933]/5 text-gray-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.facilidadeVideos === option
                        ? "border-[#b18933] bg-[#b18933]"
                        : "border-gray-300 group-hover:border-[#b18933]/50"
                    }`}>
                      {formData.facilidadeVideos === option && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Você autoriza o uso da sua imagem em campanhas de marketing da marca?</h2>
            <div className="space-y-4">
              {[
                "Sim",
                "Não"
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange("autorizacaoImagem", option)}
                  className={`group w-full p-5 border-2 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                    formData.autorizacaoImagem === option
                      ? "border-[#b18933] bg-gradient-to-r from-[#b18933]/10 to-[#daa520]/10 text-[#8b6914] shadow-lg shadow-[#b18933]/20"
                      : "border-gray-200 hover:border-[#b18933]/50 hover:bg-[#b18933]/5 text-gray-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.autorizacaoImagem === option
                        ? "border-[#b18933] bg-[#b18933]"
                        : "border-gray-300 group-hover:border-[#b18933]/50"
                    }`}>
                      {formData.autorizacaoImagem === option && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Se showSuccess for true, renderizar a tela de sucesso
  if (showSuccess) {
    return <SuccessScreen formData={formData} />
  }

  // Renderizar o formulário normalmente
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Passo {currentStep} de {totalSteps}</span>
            <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#b18933] to-[#daa520] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 gap-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-white text-[#8b6914] hover:bg-[#b18933]/5 hover:shadow-xl border-2 border-[#b18933]/20 hover:border-[#b18933]/40 transform hover:-translate-y-0.5 hover:scale-[1.02]"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid() || isSubmitting}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg ${
                isStepValid() && !isSubmitting
                  ? "bg-gradient-to-r from-[#b18933] via-[#daa520] to-[#b18933] text-white hover:from-[#8b6914] hover:via-[#b8860b] hover:to-[#8b6914] hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.02] shadow-[#b18933]/40 border border-[#daa520]/30"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                  Enviando...
                </>
              ) : (
                <>
                  {currentStep === totalSteps ? "Finalizar" : "Avançar"}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}