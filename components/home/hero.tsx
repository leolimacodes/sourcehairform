"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de falar com um especialista Source Hair sobre os produtos para prótese capilar. Podem me ajudar?"
    )
    const whatsappUrl = `https://wa.me/5519995885173?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <section className="relative overflow-hidden min-h-screen flex flex-col">

        
        <div className="container mx-auto px-2 py-2 sm:py-8 relative z-10 flex-1 flex flex-col">
          <div className="mx-auto max-w-4xl text-center flex-1 flex flex-col justify-start pt-2">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex justify-center"
            >
              <div className="relative w-[50vw] h-[25vw] max-w-[25rem] max-h-[12.5rem] sm:w-[20rem] sm:h-40 md:w-[24rem] md:h-48 lg:w-[28rem] lg:h-56">
                <Image
                  src="/novasimagens/logosource2.png"
                  alt="Source Hair Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                {/* Minimal badge */}
                <div className="bg-white/90 text-gray-700 px-4 py-2 text-sm font-medium inline-block border border-gray-200 rounded-full shadow-sm">
                  <span className="tracking-wide">
                    Preencha o formulário, leva menos de 2 minutos
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h1 id="main-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Seja um parceiro Source Hair
              </h1>
              <h2 className="text-xl font-semibold tracking-tight text-foreground/80 sm:text-2xl lg:text-3xl mt-4">
                Aplicação de Prótese Capilar e Produtos Exclusivos
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto mb-12 max-w-4xl text-center"
            >
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Buscamos pessoas interessadas em se tornar parceiros da Source Hair, divulgando o resultado da sua prótese capilar e da linha exclusiva de produtos Source Hair.
                </p>
                <p>
                  Queremos parceiros que tenham facilidade em gravar vídeos, postar nas redes sociais e divulgar resultados reais.
                </p>
                <p>
                  Se você tem interesse em receber uma aplicação de prótese capilar, kits de produtos para transformar sua autoestima e compartilhar sua experiência, clique em INICIAR e preencha o formulário.
                </p>
                
                {/* Botão INICIAR */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => {
                      router.push('/formulario')
                    }}
                    className="bg-gradient-to-r from-[#b18933] to-[#daa520] hover:from-[#8b6914] hover:to-[#b8860b] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#b18933]/30 shadow-lg"
                  >
                    INICIAR
                  </button>
                </div>
              </div>
            </motion.div>


          </div>
        </div>
      </section>
    </>
  )
}
