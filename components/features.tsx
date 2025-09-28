"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="problema" className="relative py-24 overflow-hidden" style={{ backgroundColor: "#cbcbcb" }}>
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#e1bb26]/5 via-transparent to-[#fdd602]/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#e1bb26]/10 via-transparent to-transparent"></div>
      

      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="container mx-auto flex flex-col items-center gap-6 sm:gap-12 relative z-10"
      >
        {/* Premium Header with Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="relative inline-block mb-6">
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
              
              <span className="relative z-10 tracking-wide uppercase font-semibold">Diferenciais Exclusivos</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 leading-tight">
            Por Que Escolher{" "}
            <span className="bg-gradient-to-r from-[#b18933] via-[#b18933] to-[#b18933] bg-clip-text text-transparent">
              Source Hair?
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra os diferenciais que fazem da Source Hair a escolha número 1 para o cuidado especializado de próteses capilares
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Feature 1 - Fórmula Especializada */}
          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gray-600/15 backdrop-blur-sm border border-gray-500/25 rounded-xl p-4 hover:bg-gray-600/25 hover:border-[#b18933]/30 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#b18933] via-[#b18933] to-[#b18933] flex items-center justify-center shadow-lg shadow-[#b18933]/30 border border-[#b18933]/20">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-black mb-1 group-hover:text-[#b18933] transition-colors duration-300">
                    Fórmula Especializada
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Desenvolvida exclusivamente para próteses capilares, garantindo proteção, durabilidade e estética impecável dos fios.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2 - Resultados Comprovados */}
          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gray-600/15 backdrop-blur-sm border border-gray-500/25 rounded-xl p-4 hover:bg-gray-600/25 hover:border-[#b18933]/30 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#b18933] via-[#b18933] to-[#b18933] flex items-center justify-center shadow-lg shadow-[#b18933]/30 border border-[#b18933]/20">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-black mb-1 group-hover:text-[#b18933] transition-colors duration-300">
                    Resultados Comprovados
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Mais de 10.000 clientes satisfeitos comprovam a eficácia e qualidade dos nossos produtos especializados.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 3 - Linha Completa */}
          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gray-600/15 backdrop-blur-sm border border-gray-500/25 rounded-xl p-4 hover:bg-gray-600/25 hover:border-[#b18933]/30 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#b18933] via-[#b18933] to-[#b18933] flex items-center justify-center shadow-lg shadow-[#b18933]/30 border border-[#b18933]/20">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-black mb-1 group-hover:text-[#b18933] transition-colors duration-300">
                    Linha Completa Premium
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Produtos especializados que mantém os fios sempre saudável e naturais, com qualidade e exclusividade.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 4 - Suporte Especializado */}
          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gray-600/15 backdrop-blur-sm border border-gray-500/25 rounded-xl p-4 hover:bg-gray-600/25 hover:border-[#b18933]/30 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#b18933] via-[#b18933] to-[#b18933] flex items-center justify-center shadow-lg shadow-[#b18933]/30 border border-[#b18933]/20">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-black mb-1 group-hover:text-[#b18933] transition-colors duration-300">
                    Suporte Especializado
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Equipe de especialistas disponível no WhatsApp para consulta personalizada e orientação.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
