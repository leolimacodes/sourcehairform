"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PartnerForm() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    idade: "",
    cidadeEstado: "",
    telefone: "",
    instagram: "",
    seguidores: "",
    experienciaProtese: "",
    facilidadeVideo: "",
    autorizaImagem: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Criar mensagem para WhatsApp
    const message = `*FORMULÁRIO DE PARCERIA SOURCE HAIR*

*Nome completo:* ${formData.nomeCompleto}
*Idade:* ${formData.idade}
*Cidade e estado:* ${formData.cidadeEstado}
*Telefone/WhatsApp:* ${formData.telefone}
*@ Instagram/Tik Tok:* ${formData.instagram}
*Seguidores:* ${formData.seguidores}
*Experiência com prótese:* ${formData.experienciaProtese}
*Facilidade com vídeos:* ${formData.facilidadeVideo}
*Autoriza uso da imagem:* ${formData.autorizaImagem}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/5519995885173?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="relative py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Preencha o formulário:
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome completo */}
            <div>
              <Label htmlFor="nomeCompleto" className="text-sm font-medium text-gray-700">
                Nome completo: *
              </Label>
              <Input
                id="nomeCompleto"
                name="nomeCompleto"
                type="text"
                required
                value={formData.nomeCompleto}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Digite seu nome completo"
              />
            </div>

            {/* Idade */}
            <div>
              <Label htmlFor="idade" className="text-sm font-medium text-gray-700">
                Idade: *
              </Label>
              <Input
                id="idade"
                name="idade"
                type="number"
                required
                value={formData.idade}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Digite sua idade"
              />
            </div>

            {/* Cidade e estado */}
            <div>
              <Label htmlFor="cidadeEstado" className="text-sm font-medium text-gray-700">
                Cidade e estado: *
              </Label>
              <Input
                id="cidadeEstado"
                name="cidadeEstado"
                type="text"
                required
                value={formData.cidadeEstado}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Ex: São Paulo, SP"
              />
            </div>

            {/* Telefone/WhatsApp */}
            <div>
              <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                Telefone/WhatsApp: *
              </Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                required
                value={formData.telefone}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* Instagram/TikTok */}
            <div>
              <Label htmlFor="instagram" className="text-sm font-medium text-gray-700">
                @ Instagram/Tik Tok: *
              </Label>
              <Input
                id="instagram"
                name="instagram"
                type="text"
                required
                value={formData.instagram}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="@seuusuario"
              />
            </div>

            {/* Quantos seguidores */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Quantos seguidores você tem atualmente: *
              </Label>
              <div className="space-y-2">
                {[
                  { value: "Menos de 1.000", label: "Menos de 1.000" },
                  { value: "Entre 1.000 e 5.000", label: "Entre 1.000 e 5.000" },
                  { value: "Entre 5.000 e 20.000", label: "Entre 5.000 e 20.000" },
                  { value: "Mais de 20.000", label: "Mais de 20.000" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="seguidores"
                      value={option.value}
                      checked={formData.seguidores === option.value}
                      onChange={(e) => handleRadioChange("seguidores", e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experiência com prótese */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Você já utiliza prótese capilar ou seria sua primeira experiência? *
              </Label>
              <div className="space-y-2">
                {[
                  { value: "Já utilizo", label: "Já utilizo" },
                  { value: "Nunca usei, mas tenho interesse", label: "Nunca usei, mas tenho interesse" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="experienciaProtese"
                      value={option.value}
                      checked={formData.experienciaProtese === option.value}
                      onChange={(e) => handleRadioChange("experienciaProtese", e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Facilidade com vídeos */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Você tem facilidade em gravar vídeos e aparecer nas câmeras? *
              </Label>
              <div className="space-y-2">
                {[
                  { value: "Muita Facilidade", label: "Muita Facilidade" },
                  { value: "Nenhuma Facilidade", label: "Nenhuma Facilidade" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="facilidadeVideo"
                      value={option.value}
                      checked={formData.facilidadeVideo === option.value}
                      onChange={(e) => handleRadioChange("facilidadeVideo", e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Autorização de imagem */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Você autoriza o uso da sua imagem em campanhas de marketing da marca? *
              </Label>
              <div className="space-y-2">
                {[
                  { value: "Sim", label: "Sim" },
                  { value: "Não", label: "Não" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="autorizaImagem"
                      value={option.value}
                      checked={formData.autorizaImagem === option.value}
                      onChange={(e) => handleRadioChange("autorizaImagem", e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Botão de envio */}
            <div className="pt-6 flex justify-center">
              <div className="relative group">
                {/* Enhanced glow effects with lighter golden tones */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#b8860b]/50 to-[#daa520]/50 rounded-xl blur-lg opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#b8860b]/30 to-[#cd853f]/30 rounded-xl blur-2xl opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
                
                <button 
                  type="submit" 
                  className="relative bg-gradient-to-r from-[#b8860b] via-[#daa520] to-[#cd853f] hover:from-[#a0750a] hover:via-[#c19208] hover:to-[#b8732d] text-white font-black py-3 px-6 rounded-xl transition-all duration-500 flex items-center gap-2 shadow-2xl border border-[#b8860b]/70 backdrop-blur-sm transform hover:scale-105 hover:shadow-[0_0_50px_rgba(184,134,11,0.9)] overflow-hidden group w-full justify-center"
                >
                  
                  {/* Enhanced animated shine effect that passes over the button */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#daa520]/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms] ease-out"></div>
                  
                  {/* Continuous golden shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b8860b]/30 to-transparent animate-shimmer"></div>
                  
                  {/* Enhanced glass reflection effect */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#daa520]/50 to-transparent rounded-t-xl"></div>
                  
                  {/* Bottom golden highlight */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8860b] to-transparent"></div>
                  
                  <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                  </svg>
                  <span className="text-sm tracking-wide uppercase font-black relative z-10 text-white">Enviar Formulário via WhatsApp</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}