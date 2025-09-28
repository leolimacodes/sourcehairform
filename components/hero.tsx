"use client"

import { PixelCard } from "../ui/pixelcards"
import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { CloudLightning, MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Beam } from "../ui/gridbeam"
import { Sparkles } from "lucide-react"
import { CardHoverEffect } from "../ui/pulse-card"
import { motion } from "framer-motion"
import { SimpleWhatsAppButton } from "./simple-whatsapp-button"

export default function Hero() {

  const cards = [
    {
      title: "V0 Compatible",
      description: "Edit and customize visually, instantly.",
      icon: <CloudLightning className="h-full w-full" />,
      variant: "rose",
      showGridLines: true,
    },
    {
      title: "Animated Out of Box",
      description: "No setup and  smooth UI interactions.",
      icon: <Sparkles className="h-full w-full" />,
      variant: "rose",
      showGridLines: true,
    },
  ] as const

  const cardConfigurations = [
    {
      color: "rose",
      icon: "Blocks",
      label: "Command",
      canvasProps: { gap: 3, speed: 80, colors: "#fff, #fda4af, #e11d48" },
      number: 100,
      desc: "Components available",
    },
    {
      color: "rose",
      icon: "f",
      label: "Dropper",
      canvasProps: { gap: 3, speed: 80, colors: "#fff, #fda4af, #e11d48" },
      number: 15,
      desc: "Categories available",
    },
  ]

  return (
    <div id="hero-section" className="bg-background relative min-h-screen w-full overflow-x-hidden py-32 md:px-6">
      
        {/* BOTÃO DE TESTE SUPER SIMPLES */}
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 999999,
            backgroundColor: 'red',
            color: 'white',
            padding: '20px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            border: '3px solid yellow',
            borderRadius: '10px'
          }}
          onClick={() => {
            console.log("🔥 CLIQUE DETECTADO!")
            alert("FUNCIONOU! O clique foi detectado!")
            window.location.href = "https://wa.me/5519995885173?text=Teste"
          }}
        >
          CLIQUE AQUI
        </div>
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <div className="bg-gradient-to-r from-[#e1bb26] to-[#fdd602] text-black px-4 py-2 rounded-full text-sm font-semibold">
            Produtos Exclusivos
          </div>
        </motion.div>
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <Beam />
          <motion.h1
            className={cn(
              "from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 max-w-5xl bg-gradient-to-r bg-clip-text text-center text-2xl font-semibold tracking-tighter text-transparent sm:text-3xl xl:text-4xl/none",
              geist.className,
            )}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            Prebuilt UI blocks to ship beautiful MVPs fast.
          </motion.h1>
        </div>
        <motion.div
          className="mx-auto mt-5 max-w-3xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-base">
            Linha especializada em cuidados para próteses capilares. Fórmulas exclusivas que garantem durabilidade, 
            brilho natural e proteção superior para seus fios.
          </p>
        </motion.div>
        <motion.div
          className="mt-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.75 }}
        >
          <a
            href="https://wa.me/5519995885173?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20para%20pr%C3%B3teses%20capilares."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              border: '2px solid #25D366',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
            </svg>
            Falar no WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  )
}
