"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "Por que a Source Hair é diferente de outros produtos capilares?",
      answer:
        "A Source Hair é a única linha desenvolvida especificamente para próteses capilares. Nossa fórmula é livre de Sulfatos, Petrolatos, Parabenos, Sal, Corantes, Parafinas, Óleo Mineral e qualquer agente de limpeza agressivo, que resseca e quebra os fios. Cada produto foi testado e aprovado para uso exclusivo na prótese.",
    },
    {
      question: "Com que frequência devo usar os produtos?",
      answer:
        "Recomendamos o uso do Creme de Limpeza 2-3 vezes por semana, a Máscara Hidratante 1-2 vezes por semana, e o Sérum Reparador diariamente. O Gel Fixador e a Cera Modeladora podem ser usados conforme necessário para estilização.",
    },
    {
      question: "Os produtos são seguros para todos os tipos de prótese?",
      answer:
        "Sim! Nossos produtos foram desenvolvidos especialmente para próteses capilares e são 100% seguros para todos os tipos de base e de fios (naturais ou sintéticos). A fórmula é livre de sulfatos, parabenos, petrolatos e outros agentes agressivos que costumam ressecar, desbotar ou diminuir a durabilidade da prótese. Além disso, eles tratam, protegem e prolongam a vida útil da prótese, mantendo sempre um aspecto natural e saudável.",
    },
    {
      question: "Como posso ter certeza de que estou usando os produtos corretos?",
      answer:
        "Nossa equipe de especialistas está disponível no WhatsApp para consultoria personalizada. Analisamos seu tipo de prótese e necessidades específicas para recomendar os produtos ideais e o modo de uso correto.",
    },
    {
      question: "Qual é o prazo de entrega e como faço o pedido?",
      answer:
        "Entre em contato conosco pelo WhatsApp para fazer seu pedido. Nossos especialistas irão orientá-lo sobre produtos, quantidades e formas de pagamento. O prazo de entrega varia conforme sua região, mas trabalhamos para entregar o mais rápido possível.",
    },
  ]

  return (
    <section id="faq" className="relative overflow-hidden pb-8 pt-24">
      {/* Background blur effects */}
      <div className="bg-primary/20 absolute top-1/2 -right-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>
      <div className="bg-primary/20 absolute top-1/2 -left-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>

      <div className="z-10 container mx-auto px-4">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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
              
              <span className="relative z-10 tracking-wide uppercase font-semibold">FAQS</span>
            </div>
          </div>
        </motion.div>

        <motion.h2
          className="mx-auto mt-6 max-w-xl text-center text-4xl font-medium md:text-[54px] md:leading-[60px] text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Perguntas Frequentes
        </motion.h2>

        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-600/15 rounded-2xl border border-gray-500/25 p-6 shadow-[0px_2px_0px_0px_rgba(177,137,51,0.1)_inset] transition-all duration-300 hover:border-[#b18933]/40 hover:bg-gray-600/25 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleItem(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleItem(index)
                }
              }}
              {...(index === faqs.length - 1 && { "data-faq": faq.question })}
            >
              <div className="flex items-start justify-between">
                <h3 className="m-0 font-medium pr-4 text-black">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className=""
                >
                  {openItems.includes(index) ? (
                    <Minus className="flex-shrink-0 transition duration-300 text-[#b18933]" size={24} />
                  ) : (
                    <Plus className="flex-shrink-0 transition duration-300 text-[#b18933]" size={24} />
                  )}
                </motion.div>
              </div>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    className="mt-4 leading-relaxed overflow-hidden text-gray-600"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                      opacity: { duration: 0.2 },
                    }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
