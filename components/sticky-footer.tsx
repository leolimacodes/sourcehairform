"use client"
import Image from "next/image"

export function StickyFooter() {
  return (
    <div
      className="w-full bg-white py-4 md:py-6 !bg-white"
      style={{ 
        backgroundColor: "#ffffff !important",
        background: "#ffffff !important",
        backgroundImage: "none !important"
      }}
    >
          <div
            className="relative overflow-visible w-full flex flex-col md:flex-row md:items-center md:justify-between items-center px-4 md:px-16 py-2 md:py-4 space-y-2 md:space-y-0 !bg-white"
            style={{ 
              color: "#121113",
              backgroundColor: "#ffffff !important",
              background: "#ffffff !important"
            }}
          >
            {/* Logo - Mobile centralizada, Desktop bem à esquerda */}
            <div
              className="relative mb-2 md:mb-0 w-full md:w-auto flex justify-center md:justify-start md:flex-shrink-0 md:-ml-16"
            >
              <Image
                src="/novasimagens/logosource2.png"
                alt="Source Hair Logo"
                width={225}
                height={112}
                className="object-contain w-[225px] h-[112px] md:w-[337px] md:h-[168px]"
              />
            </div>

            {/* Informações de contato em duas colunas - Desktop à direita, alinhado horizontalmente */}
            <div
              className="flex flex-col md:flex-row gap-4 md:gap-16 w-full md:w-auto max-w-4xl md:max-w-none justify-center md:justify-end md:items-center"
            >
              {/* Primeira coluna - Contato */}
              <div className="flex flex-col space-y-1 md:space-y-4">
                <h3 className="text-black font-bold text-base md:text-lg mb-1">Entre em contato:</h3>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-black font-medium text-sm md:text-base">(19) 9 9805-8059</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-black font-medium text-sm md:text-base">sac@sourcehair.com.br</span>
                </div>
                
                <h4 className="text-black font-bold text-sm md:text-base mt-1 mb-1">Redes Sociais:</h4>
                <a 
                  href="https://www.facebook.com/sourcehair.protesecapilar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:opacity-70 transition-opacity"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-black font-medium text-sm md:text-base">sourcehair.protesecapilar</span>
                </a>
                <a 
                  href="https://www.instagram.com/sourcehair.protesecapilar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:opacity-70 transition-opacity"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-black font-medium text-sm md:text-base">sourcehair.protesecapilar</span>
                </a>
              </div>

              {/* Segunda coluna - Horário e Endereço */}
              <div className="flex flex-col space-y-1 md:space-y-4">
                <div>
                  <h4 className="text-black font-semibold mb-1 text-sm md:text-base">Horário de atendimento:</h4>
                  <div className="text-black text-xs md:text-sm space-y-0">
                    <p>Segunda à Sexta: Das 09h00 às 18h00</p>
                    <p>Sábados: Das 09h00 às 12h00</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-black font-semibold mb-1 text-sm md:text-base">Endereço:</h4>
                  <p className="text-black text-xs md:text-sm">
                    Rua Santana Gomes, 142, Bonfim,<br />
                    Campinas-SP, Cep: 13070-780
                  </p>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}
