import { useState, useEffect } from "react"
import { FeaturedCarousel } from "@/components/featured-carousel"
import type { Product } from "@/types/product"

interface HeroProps {
  products: Product[]
}

export function Hero({ products }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-sand-50 via-brown-50 to-sand-100 dark:from-brown-900 dark:via-brown-950 dark:to-sand-900">
      {/* Textura de fondo */}
      <div className="absolute inset-0 bg-[url('/soft-candle-background.png')] bg-cover bg-center opacity-5" />
      {/* Capa de luz */}
      <div className="absolute inset-0 bg-brown-500" />

      {/* Texto principal */}
      <div
        className={`relative z-10 text-center px-8 pt-4 md:pt-0 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-3xl md:text-5xl font-semibold mb-3 text-white leading-tight">
          Conoce nuestros productos
        </h1>
        <p className="text-xl md:text-2xl mb-2 md:mb-6 max-w-4xl mx-auto leading-relaxed font-light text-brown-200 dark:text-sand-200">
          Ilumina tu hogar con la calidez de nuestras velas artesanales.
        </p>
      </div>

      {/* Carrusel */}
      <div className="relative z-10 w-full max-w-6xl px-4 mt-4">
        <FeaturedCarousel products={products} />
      </div>
    </section>
  )
}
