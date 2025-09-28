"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PartnerFormSteps() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    cidade: "",
    telefone: "",
    instagram: "",
    seguidores: "",
    experiencia: "",
    video: "",
    imagem: ""
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < 5) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  const sendWhatsApp = () => {
    const message = `*FORMULÁRIO DE PARCERIA - SOURCE HAIR*

*Dados Pessoais:*
Nome: ${formData.nome}
Idade: ${formData.idade}
Cidade/Estado: ${formData.cidade}

*Contato:*
Telefone: ${formData.telefone}
Instagram: ${formData.instagram}
Seguidores: ${formData.seguidores}

*Experiência:*
Experiência com prótese: ${formData.experiencia}
Facilidade com vídeos: ${formData.video}
Autoriza uso de imagem: ${formData.imagem}`

    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const isStepValid = () => {
    switch (step) {
      case 0: return true
      case 1: return formData.nome.trim() !== '' && formData.idade.trim() !== '' && formData.cidade.trim() !== ''
      case 2: return formData.telefone.trim() !== '' && formData.instagram.trim() !== '' && formData.seguidores.trim() !== ''
      case 3: return formData.experiencia.trim() !== ''
      case 4: return formData.video.trim() !== ''
      case 5: return formData.imagem.trim() !== ''
      default: return false
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Progress Bar */}
      {step > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Etapa {step} de 5</span>
            <span>{Math.round((step / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 0 - Introdução */}
      {step === 0 && (
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Seja um Parceiro Source Hair
          </h2>
          <p className="text-lg text-gray-600">
            Preencha o formulário, leva menos de 2 minutos e faça parte da nossa rede de parceiros!
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Produtos exclusivos de alta qualidade</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Suporte técnico especializado</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Treinamentos e capacitações</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 1 - Dados Pessoais */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Dados Pessoais</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="Digite seu nome completo"
              />
            </div>
            
            <div>
              <Label htmlFor="idade">Idade *</Label>
              <Input
                id="idade"
                value={formData.idade}
                onChange={(e) => handleChange('idade', e.target.value)}
                placeholder="Digite sua idade"
              />
            </div>
            
            <div>
              <Label htmlFor="cidade">Cidade/Estado *</Label>
              <Input
                id="cidade"
                value={formData.cidade}
                onChange={(e) => handleChange('cidade', e.target.value)}
                placeholder="Ex: São Paulo/SP"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2 - Contato */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Informações de Contato</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
            
            <div>
              <Label htmlFor="instagram">Instagram *</Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                placeholder="@seuinstagram"
              />
            </div>
            
            <div>
              <Label htmlFor="seguidores">Número de Seguidores *</Label>
              <Input
                id="seguidores"
                value={formData.seguidores}
                onChange={(e) => handleChange('seguidores', e.target.value)}
                placeholder="Ex: 5000"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3 - Experiência */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Experiência Profissional</h2>
          
          <div>
            <Label>Você tem experiência com aplicação de prótese capilar? *</Label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="experiencia"
                  value="Sim, tenho experiência"
                  checked={formData.experiencia === "Sim, tenho experiência"}
                  onChange={(e) => handleChange('experiencia', e.target.value)}
                  className="mr-2"
                />
                Sim, tenho experiência
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="experiencia"
                  value="Não, mas tenho interesse em aprender"
                  checked={formData.experiencia === "Não, mas tenho interesse em aprender"}
                  onChange={(e) => handleChange('experiencia', e.target.value)}
                  className="mr-2"
                />
                Não, mas tenho interesse em aprender
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Step 4 - Vídeos */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Criação de Conteúdo</h2>
          
          <div>
            <Label>Você tem facilidade para gravar vídeos? *</Label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="video"
                  value="Sim, tenho facilidade"
                  checked={formData.video === "Sim, tenho facilidade"}
                  onChange={(e) => handleChange('video', e.target.value)}
                  className="mr-2"
                />
                Sim, tenho facilidade
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="video"
                  value="Não, mas posso aprender"
                  checked={formData.video === "Não, mas posso aprender"}
                  onChange={(e) => handleChange('video', e.target.value)}
                  className="mr-2"
                />
                Não, mas posso aprender
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Step 5 - Autorização */}
      {step === 5 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Autorização de Imagem</h2>
          
          <div>
            <Label>Você autoriza o uso da sua imagem em materiais promocionais? *</Label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="imagem"
                  value="Sim, autorizo"
                  checked={formData.imagem === "Sim, autorizo"}
                  onChange={(e) => handleChange('imagem', e.target.value)}
                  className="mr-2"
                />
                Sim, autorizo
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="imagem"
                  value="Não autorizo"
                  checked={formData.imagem === "Não autorizo"}
                  onChange={(e) => handleChange('imagem', e.target.value)}
                  className="mr-2"
                />
                Não autorizo
              </label>
            </div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              🎉 Parabéns!
            </h3>
            <p className="text-green-700">
              Você está quase finalizando seu cadastro como parceiro Source Hair!
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons - Versão Simplificada */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '32px',
        paddingTop: '24px',
        borderTop: '1px solid #e5e7eb',
        gap: '16px'
      }}>
        {step > 0 && (
          <button
            onClick={prevStep}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ffffff',
              border: '2px solid #d1d5db',
              borderRadius: '8px',
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '120px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb'
              e.currentTarget.style.borderColor = '#9ca3af'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
          >
            ← Anterior
          </button>
        )}
        
        {step === 0 && (
          <button
            onClick={nextStep}
            style={{
              padding: '16px 32px',
              backgroundColor: '#eab308',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              margin: '0 auto',
              minWidth: '200px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#ca8a04'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#eab308'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            🚀 Começar Agora
          </button>
        )}
        
        {step > 0 && step < 5 && (
          <button
            onClick={nextStep}
            disabled={!isStepValid()}
            style={{
              padding: '12px 24px',
              backgroundColor: isStepValid() ? '#eab308' : '#d1d5db',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isStepValid() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              minWidth: '120px',
              opacity: isStepValid() ? 1 : 0.6
            }}
            onMouseOver={(e) => {
              if (isStepValid()) {
                e.currentTarget.style.backgroundColor = '#ca8a04'
              }
            }}
            onMouseOut={(e) => {
              if (isStepValid()) {
                e.currentTarget.style.backgroundColor = '#eab308'
              }
            }}
          >
            Próximo →
          </button>
        )}
        
        {step === 5 && (
          <button
            onClick={sendWhatsApp}
            disabled={!isStepValid()}
            style={{
              padding: '16px 32px',
              backgroundColor: isStepValid() ? '#16a34a' : '#d1d5db',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isStepValid() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              minWidth: '200px',
              opacity: isStepValid() ? 1 : 0.6,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              if (isStepValid()) {
                e.currentTarget.style.backgroundColor = '#15803d'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseOut={(e) => {
              if (isStepValid()) {
                e.currentTarget.style.backgroundColor = '#16a34a'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            📱 Enviar via WhatsApp
          </button>
        )}
      </div>
    </div>
  )
}