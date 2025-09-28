"use client"

import { motion } from "framer-motion"

export function ProblemSolution() {
  return (
    <section className="relative py-20" style={{ backgroundColor: "#cbcbcb" }}>
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-[#e1bb26]/5 opacity-30"></div>
      
      <div className="container mx-auto px-6 max-w-5xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
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
              
              <span className="relative z-10 tracking-wide uppercase font-semibold">PROBLEMA × SOLUÇÃO</span>
            </div>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-black mt-6 leading-tight">
            Da Frustração à{" "}
            <span className="bg-gradient-to-r from-[#b18933] to-[#b18933] bg-clip-text text-transparent">
              Transformação
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Problema */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-full"
          >
            <div className="bg-gradient-to-br from-red-500/8 via-red-500/5 to-red-500/3 border border-red-500/15 rounded-2xl p-8 backdrop-blur-sm h-full flex flex-col">
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-500/10 rounded-lg flex items-center justify-center border border-red-500/20">
                    <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                    O PROBLEMA
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-black leading-tight">
                  Sua Prótese Está Perdendo a{" "}
                  <span className="text-red-600">Beleza Natural?</span>
                </h3>
              </div>
              
              <div className="space-y-5 flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-500/20">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-black font-medium mb-1">Fios Ásperos e Ressecados</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Produtos convencionais agridem as fibras, deixando os fios sem vida.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-500/20">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-black font-medium mb-1">Perda de Brilho e Maciez</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Químicos agressivos removem a proteção natural das fibras.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-500/20">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-black font-medium mb-1">Redução da Vida Útil</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Cuidados inadequados diminuem a durabilidade do investimento.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solução */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-full"
          >
            <div className="bg-gradient-to-br from-[#b18933]/8 via-[#b18933]/5 to-[#b18933]/3 border border-[#b18933]/15 rounded-2xl p-8 backdrop-blur-sm h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-[#b18933]/3 to-transparent rounded-2xl"></div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#b18933]/10 rounded-lg flex items-center justify-center border border-[#b18933]/20">
                    <svg className="w-3 h-3 text-[#8b6914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#8b6914] font-semibold text-sm uppercase tracking-wider">
                    A SOLUÇÃO
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-black leading-tight">
                  Source Hair: A{" "}
                  <span className="text-[#8b6914]">Revolução Definitiva</span>
                </h3>
              </div>
              
              <div className="space-y-5 flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#b18933]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#b18933]/20">
                    <svg className="w-4 h-4 text-[#8b6914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-black font-medium mb-1">Fórmula Livre de Agressores</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">0% sulfatos, petrolatos, parabenos, sal, corantes, parafinas, óleo mineral e qualquer agente de limpeza agressivo. 
Limpeza suave e eficaz.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#b18933]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#b18933]/20">
                    <svg className="w-4 h-4 text-[#8b6914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-black font-medium mb-1">Hidratação e Proteção Profunda</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Ativos especializados que restauram maciez e brilho natural.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#b18933]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#b18933]/20">
                    <svg className="w-4 h-4 text-[#8b6914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-black font-medium mb-1">Máxima Durabilidade</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Cuidado especializado que prolonga a vida útil da prótese.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}