"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Creme de limpeza",
    image: "/novasimagens/cremedelimpeza.png",
    description: "Chegou o momento de repensar a forma como você lava sua prótese capilar. O Creme de Limpeza Source Hair vai além do shampoo tradicional: ele revoluciona sua rotina capilar com uma limpeza inteligente, suave e profundamente tratante. Combinando carvão ativado e argila preta, sua fórmula purifica suavemente os fios e o couro cabeludo, removendo impurezas, poluição e resíduos acumulados — tudo isso sem espumar e sem agredir. Mais do que limpar, ele nutre, mantendo a hidratação e o equilíbrio que sua prótese capilar ou cabelos precisam.",
    usage: "Com os fios da prótese capilar ou dos cabelos úmidos, aplique a quantidade necessária do produto e espalhe suavemente com um pente de dentes largos, em todas as direções, até o total desembaraço dos fios. Em seguida, enxágue e aplique a máscara hidratante Source Hair para um tratamento completo."
  },
  {
    id: 2,
    name: "Máscara hidratante",
    image: "/novasimagens/mascaracapilar.png",
    description: "Mais que hidratação, um tratamento completo em uma única etapa. Sua fórmula concentrada, com queratina hidrolisada, aminoácidos e proteínas vegetais, age profundamente na fibra capilar, restaurando a maciez, o brilho e auxiliando no fortalecimento dos fios desde a primeira aplicação. Tão potente que dispensa o uso de condicionador.",
    usage: "Após o uso do Creme de Limpeza Source Hair, aplique a quantidade necessária da máscara e espalhe suavemente com um pente de dentes largos, em todas as direções. Deixe agir por 5 a 10 minutos. Em seguida, finalize com o Sérum Capilar Bifásico Source Hair para potencializar os resultados."
  },
  {
    id: 3,
    name: "Sérum bifásico",
    image: "/novasimagens/serumcapilar.png",
    description: "O Sérum Capilar Bifásico da Source Hair é um finalizador leve que combina fase aquosa e oleosa para oferecer brilho, maciez, redução do frizz e proteção térmica. Sua fórmula bifásica nutre, sela as cutículas e protege os fios contra agressões externas como calor, sol e poluição, sem deixar o cabelo pesado.",
    usage: "Agite bem antes de usar para misturar as fases. Aplique nos cabelos úmidos ou secos, do comprimento às pontas. Não enxágue. Finalize como desejar."
  },
  {
    id: 4,
    name: "Emulsão acidificante",
    image: "/novasimagens/emulsaocapilar.png",
    description: "Desenvolvido para reequilibrar o pH dos fios após a coloração ou sempre que sentir que os cabelos estão porosos, opacos ou ásperos, o Acidificante Source Hair promove o selamento das cutículas, reduz a porosidade e auxilia na restauração da integridade da fibra capilar. O resultado são fios mais alinhados, com brilho intenso, toque sedoso e maior resistência.",
    usage: "Com o cabelo limpo, retire o excesso de água, aplique a quantidade necessária do acidificante e espalhe suavemente com um pente de dentes largos, em todas as direções. Deixe agir por 5 a 10 minutos. Em seguida, enxágue e finalize com a máscara hidratante."
  },
  {
    id: 5,
    name: "Gel líquido fixador",
    image: "/novasimagens/gelfixadorliquido.png",
    description: "O Gel Fixador Líquido Source Hair foi desenvolvido para proporcionar modelagem, definição e controle com aparência natural, sem deixar resíduos ou rigidez excessiva. Sua fórmula versátil é ideal tanto para os cabelos naturais quanto para próteses capilares, oferecendo fixação leve a média, brilho controlado e toque limpo. Enriquecido com extrato de aloe vera, glicerina vegetal e agentes umectantes, o produto hidrata suavemente enquanto estiliza, ajudando a manter a saúde da fibra capilar.",
    usage: "Com os cabelos limpos e úmidos, borrife o Gel Líquido Source Hair diretamente sobre os fios, do comprimento às pontas, mantendo uma distância adequada para uma aplicação uniforme. Em seguida, distribua o produto delicadamente com o auxílio de um pente ou com os dedos, modelando conforme o efeito desejado. Ideal para finalizações que exigem definição, controle de frizz e leve fixação."
  },
  {
    id: 6,
    name: "Cera modeladora",
    image: "/novasimagens/ceramodeladora.png",
    description: "A Cera Modeladora Capilar Source Hair foi especialmente desenvolvida para proporcionar modelagem eficaz com tratamento, aliando fixação flexível ao cuidado intenso dos fios de próteses capilares. Sua fórmula inovadora combina agentes emolientes e modeladores com um complexo nutritivo à base de óleo de coco, manteiga de karité, óleo de milho e queratina hidrolisada, promovendo maleabilidade sem ressecar. Com textura leve, toque seco e fácil aplicação, a cera oferece definição, brilho e proteção, além de ajudar a disciplinar o frizz e manter o penteado por mais tempo. Ideal para quem busca estilo e saúde capilar em qualquer tipo de fio, principalmente de próteses capilares.",
    usage: "Com os fios limpos e secos ou levemente úmidos, aplique uma pequena quantidade da cera modeladora nas mãos, esfregando para aquecer o produto. Distribua uniformemente sobre os cabelos ou prótese, modelando conforme o estilo desejado. Reaplique se necessário."
  },
  {
    id: 7,
    name: "Perfume capilar",
    image: "/novasimagens/perfumecapilar.png",
    description: "O Perfume Capilar Source Hair possui notas olfativas refinadas que neutralizam odores indesejados e proporcionam sensação de bem-estar com um toque de sofisticação. Ideal para uso diário em próteses e cabelos.",
    usage: "Borrifar o Perfume Capilar Source Hair sobre os fios secos ou molhados a uma distância de 15 cm dos cabelos ou da prótese. Reaplicar quando desejar. Evite aplicar diretamente na raiz ou no couro cabeludo."
  }
]

export function ProductsSection() {
  return (
    <section className="relative py-24" style={{ backgroundColor: "#cbcbcb" }}>

      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-6">
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
              
              <span className="relative z-10 tracking-wide uppercase font-semibold">LINHA COMPLETA</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            Produtos Específicos Para <span className="bg-gradient-to-r from-[#b18933] to-[#b18933] bg-clip-text text-transparent">Prótese Capilar</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Desenvolvidos exclusivamente para o cuidado completo da sua prótese capilar
          </p>
        </motion.div>

        {/* Products List */}
        <div className="space-y-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Premium Glass Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gray-600/15 backdrop-blur-xl border border-gray-500/25 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(177,137,51,0.25)] transition-all duration-700 hover:border-[#b18933]/30 hover:bg-gray-600/25">
                
                {/* Ambient Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#b18933]/5 via-transparent to-[#b18933]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                <div className="relative p-8 md:p-12">
                  <div className="grid md:grid-cols-4 gap-8 items-start">
                    {/* Product Image */}
                     <div className="md:col-span-1">
                       <div className="relative w-full h-56 md:h-64">
                         <Image
                           src={product.image}
                           alt={product.name}
                           fill
                           className="object-contain group-hover:scale-105 transition-transform duration-500"
                         />
                       </div>
                     </div>

                    {/* Product Content */}
                    <div className="md:col-span-3 space-y-8">
                      {/* Product Name */}
                      <div className="relative">
                        <div className="pl-6">
                          <h3 className="text-3xl md:text-4xl font-bold text-black mb-3 capitalize leading-tight">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      {/* Description with Enhanced Typography */}
                      <div className="relative">
                        <div className="absolute -left-2 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#b18933]/30 to-transparent"></div>
                        <div className="pl-6">
                          <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light tracking-wide">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      {/* Usage Instructions */}
                       <div className="pl-6">
                         <div className="mb-3">
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
                               
                               <span className="relative z-10 tracking-wide uppercase font-semibold">MODO DE USAR</span>
                             </div>
                           </div>
                         </div>
                         <p className="text-gray-600 leading-relaxed">
                           {product.usage}
                         </p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator */}
               {index < products.length - 1 && (
                 <div className="mt-12 w-full h-px bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"></div>
               )}
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}