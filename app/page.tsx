"use client"
import Hero from "@/components/home/hero"
import { StickyFooter } from "@/components/sticky-footer"

export default function Home() {

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: "#cbcbcb" }}>
      {/* Pearl Mist Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #cbcbcb",
        }}
      />

      {/* Hero Section */}
      <Hero />

      {/* Sticky Footer */}
      <div id="contato">
        <StickyFooter />
      </div>
    </div>
  )
}
