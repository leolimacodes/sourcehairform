import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Source Hair - Produtos Profissionais para Cabelo",
  description: "Descubra a linha completa de produtos Source Hair: máscaras, séruns, cremes e tratamentos profissionais para todos os tipos de cabelo.",
  generator: "Source Hair",
  keywords: "source hair, produtos cabelo, máscara capilar, sérum capilar, tratamento cabelo, produtos profissionais",
  authors: [{ name: "Source Hair" }],
  icons: {
    icon: "/imagens/favicon.svg",
    shortcut: "/imagens/favicon.svg",
    apple: "/imagens/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/imagens/favicon.svg" type="image/svg+xml" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
