"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function FloatingWhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleWhatsAppClick = () => {
    // Número do WhatsApp da Source Hair (substitua pelo número real)
    const phoneNumber = "5519995885173"
    const message = "Olá! Gostaria de falar com um especialista Source Hair sobre os produtos para prótese capilar. Podem me ajudar?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1
      }}
    >
      <motion.button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#b18933] to-[#daa520] hover:from-[#8b6914] hover:to-[#b8860b] text-white font-semibold px-3 py-3 sm:px-6 sm:py-4 rounded-full shadow-2xl transition-all duration-300 ease-out"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(177, 137, 51, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#b18933] to-[#daa520] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
        
        {/* WhatsApp Logo SVG */}
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>
        </motion.div>
        
        {/* Text - Hidden on mobile, visible on larger screens */}
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: "auto", 
            opacity: 1 
          }}
          transition={{ 
            delay: 1.5,
            duration: 0.8,
            ease: "easeOut"
          }}
          className="relative z-10 text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap overflow-hidden hidden sm:block"
        >
          Compre pelo WhatsApp
        </motion.span>

        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#b18933]/30 opacity-20 animate-ping"></div>
        
        {/* Notification dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
        </motion.div>
      </motion.button>
    </motion.div>
    <motion.div
      className={`fixed z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } ${
        // Responsive positioning
        'bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8'
      }`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#b18933] to-[#daa520] rounded-full blur-lg opacity-30 animate-pulse" />
      
      <motion.button
        onClick={handleWhatsAppClick}
        className={`relative bg-gradient-to-r from-[#b18933] to-[#daa520] hover:from-[#8b6914] hover:to-[#b8860b] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          // Responsive sizing and padding
          'p-3 sm:p-4 lg:p-5'
        } ${
          // Responsive gap and flex properties
          'flex items-center gap-2 sm:gap-3 lg:gap-4'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* WhatsApp Logo */}
        <svg 
          className={`fill-current ${
            // Responsive logo sizing
            'w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8'
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>
        
        {/* Text - hidden on small screens, visible on larger screens */}
        <span className={`font-semibold whitespace-nowrap ${
          // Responsive text sizing and visibility
          'hidden sm:inline text-sm lg:text-base'
        }`}>
          Fale Conosco
        </span>
        
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
        
        {/* Notification dot */}
        <div className={`absolute bg-red-500 rounded-full border-2 border-white animate-bounce ${
          // Responsive notification dot sizing and positioning
          '-top-1 -right-1 w-3 h-3 sm:-top-2 sm:-right-2 sm:w-4 sm:h-4'
        }`} />
      </motion.button>
    </motion.div>
  )
}