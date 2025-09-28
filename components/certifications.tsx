"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Certifications() {
  return (
    <section className="relative py-16" style={{ backgroundColor: "#cbcbcb" }}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Vegan Certification */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6 group"
          >
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 relative">
                <Image
                  src="/novasimagens/vegan.png"
                  alt="Certificação Vegan"
                  fill
                  className="object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-green-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black mb-2 group-hover:text-green-700 transition-colors duration-300">
                100% Vegano
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Nossos produtos são 100% veganos e desenvolvidos especialmente para cuidar da prótese capilar sem agredir os fios. A fórmula à base de extratos vegetais e óleos nobres garante nutrição profunda, hidratação equilibrada e brilho saudável, sem o uso de ingredientes de origem animal.
              </p>
            </div>
          </motion.div>

          {/* ANVISA Certification */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6 group"
          >
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 relative">
                <Image
                  src="/novasimagens/anvisa.png"
                  alt="Certificação ANVISA"
                  fill
                  className="object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black mb-2 group-hover:text-blue-700 transition-colors duration-300">
                Aprovado pela ANVISA
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Nossos produtos são registrados e liberados pela ANVISA, seguindo todas as normas de segurança e qualidade exigidas. Essa aprovação garante que cada fórmula é desenvolvida com rigor técnico, oferecendo eficácia comprovada e total confiança para o cuidado com a sua prótese capilar.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}