"use client"

import { motion } from "framer-motion"
import { MessageCircle, Users, Shield, Clock } from "lucide-react"

export function WhatsAppCTA() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de falar com um especialista Source Hair sobre os produtos para prótese capilar. Podem me ajudar?"
    )
    const whatsappUrl = `https://wa.me/5519995885173?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#cbcbcb" }}>
      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge CONSULTORIA ESPECIALIZADA */}
          <div className="relative inline-block mb-8">
            {/* Subtle glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#daa520]/20 to-[#f4d03f]/15 rounded-lg blur-sm opacity-30 animate-pulse"></div>
            
            {/* Premium badge container */}
            <div className="relative bg-gradient-to-r from-white/80 via-[#fef9e7]/70 to-white/80 text-[#b8860b] px-5 py-2.5 text-xs font-semibold inline-block border border-[#daa520]/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm shadow-[#daa520]/20">
              
              {/* Subtle shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full animate-[shine_4s_ease-in-out_infinite]"></div>
              
              {/* Gentle shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f4d03f]/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite]"></div>
              
              {/* Top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#daa520]/40 to-transparent"></div>
              
              <span className="relative z-10 tracking-wide uppercase font-semibold">CONSULTORIA ESPECIALIZADA</span>
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
            Transforme o Cuidado com a{" "}
            <span className="bg-gradient-to-r from-[#b18933] to-[#b18933] bg-clip-text text-transparent">
              Sua Prótese Agora Mesmo!
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nossa equipe de especialistas está disponível no WhatsApp para oferecer consultoria personalizada, 
            esclarecer todas as suas dúvidas e anotar seu pedido com total segurança e comodidade.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: Users,
              title: "Especialistas Dedicados",
              description: "Equipe treinada especificamente em cuidados com próteses capilares"
            },
            {
              icon: MessageCircle,
              title: "Atendimento Personalizado",
              description: "Consultoria individual baseada nas suas necessidades específicas"
            },
            {
              icon: Shield,
              title: "Compra Segura",
              description: "Processo de pedido seguro e confiável direto pelo WhatsApp"
            },
            {
              icon: Clock,
              title: "Resposta Rápida",
              description: "Atendimento ágil para esclarecer dúvidas e processar pedidos"
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#b18933]/20 to-[#b18933]/20 border border-[#b18933]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-[#b18933]" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-black mb-6 leading-tight">
                Pronto para Revolucionar o Cuidado da Sua Prótese?
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Não perca mais tempo com produtos que danificam. Fale agora com nossos especialistas 
                e descubra como a Source Hair pode transformar a aparência e durabilidade da sua prótese capilar.
              </p>
            </div>

            {/* WhatsApp Button */}
            <div className="flex items-center justify-center">
              <div className="relative group">
                {/* Enhanced glow effects with lighter golden tones */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#b8860b]/50 to-[#daa520]/50 rounded-xl blur-lg opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#b8860b]/30 to-[#cd853f]/30 rounded-xl blur-2xl opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
                
                <button 
                onClick={handleWhatsAppClick}
                className="relative bg-gradient-to-r from-[#b8860b] via-[#daa520] to-[#cd853f] hover:from-[#a0750a] hover:via-[#c19208] hover:to-[#b8732d] text-white font-black py-3 px-6 rounded-xl transition-all duration-500 flex items-center gap-2 shadow-2xl border border-[#b8860b]/70 backdrop-blur-sm transform hover:scale-105 hover:shadow-[0_0_50px_rgba(184,134,11,0.9)] overflow-hidden group"
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
                <span className="text-sm tracking-wide uppercase font-black relative z-10 text-white">Falar no WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#b18933] rounded-full mr-3"></div>
                Atendimento Imediato
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#b18933] rounded-full mr-3"></div>
                Sem Compromisso
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#b18933] rounded-full mr-3"></div>
                Consultoria Gratuita
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Ao clicar no botão acima, você será direcionado para o WhatsApp onde nossa equipe especializada 
            estará pronta para atendê-lo com total profissionalismo e discrição.
          </p>
        </motion.div>
      </div>
    </section>
  )
}