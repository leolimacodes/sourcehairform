"use client"

import { motion } from "framer-motion"
import { Marquee } from "@/components/magicui/marquee"
import Image from "next/image"

const testimonials = [
  {
    name: "Carlos Oliveira",
    username: "São Paulo, SP",
    body: "Uso há 6 meses e minha prótese parece nova. O atendimento no WhatsApp é excepcional, muito profissional.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Roberto Silva",
    username: "Rio de Janeiro, RJ",
    body: "A diferença é visível desde a primeira aplicação. Recomendo para todos que usam prótese capilar.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "João Mendes",
    username: "Belo Horizonte, MG",
    body: "Excelente custo-benefício. A consultoria personalizada me ajudou a escolher os produtos ideais.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Pedro Alves",
    username: "Brasília, DF",
    body: "A Source Hair transformou o cuidado com minha prótese. Produtos especializados fazem toda diferença.",
    img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Marcos Santos",
    username: "Salvador, BA",
    body: "Minha prótese nunca ficou tão macia e brilhosa! A Source Hair realmente fez a diferença na durabilidade.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "André Costa",
    username: "Curitiba, PR",
    body: "Uso profissionalmente e indico para todos os meus clientes. Resultados incríveis e duradouros.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const TestimonialCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-gray-500/25 bg-gray-600/15 p-10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]">
      <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-[#b18933]/10 to-transparent blur-md"></div>

      <div className="text-gray-600 leading-relaxed">{body}</div>

      <div className="mt-5 flex items-center gap-2">
        <img src={img || "/placeholder.svg"} alt={name} height="40" width="40" className="h-10 w-10 rounded-full" />
        <div className="flex flex-col">
          <div className="leading-5 font-medium tracking-tight text-black">{name}</div>
          <div className="leading-5 tracking-tight text-gray-600">{username}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative mb-24">

      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mx-auto max-w-[540px]">
          <div className="flex justify-center">
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
                
                <span className="relative z-10 tracking-wide uppercase font-semibold">Depoimentos</span>
              </div>
            </div>
          </div>
          <h2 className="from-black/60 via-black to-black/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 mt-5 bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]">
            O que nossos clientes dizem
          </h2>

          <p className="mt-5 relative z-10 text-center text-lg text-gray-600">
            Resultados reais de pessoas que transformaram o cuidado com suas próteses capilares usando Source Hair.
          </p>
        </div>

        <div className="my-16 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <div>
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>

          <div className="hidden md:block">
            <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
              {secondColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>

          <div className="hidden lg:block">
            <Marquee pauseOnHover vertical className="[--duration:30s]">
              {thirdColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>
        </div>

        <div className="-mt-8 flex justify-center">
          <div className="relative group">
            <button className="relative inline-flex items-center gap-2 rounded-full border border-[#b8860b]/30 bg-white/90 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-[#8b6914] transition-all duration-300 hover:bg-white hover:border-[#b8860b]/50 hover:shadow-lg active:scale-95 shadow-sm">
              <span className="relative z-10 tracking-wide">
                Seja você o próximo
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
