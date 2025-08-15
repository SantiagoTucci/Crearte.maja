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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blush-50 via-dusty-rose-50 to-blush-100 dark:from-blush-950 dark:via-dusty-rose-950 dark:to-blush-900">
      <div className="absolute inset-0 bg-[url('/soft-candle-background.png')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10" />

      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-3 gradient-text leading-tight">Conoce nuestros productos</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-4xl mx-auto leading-relaxed font-light">
          Ilumina tu hogar con la calidez de nuestras velas artesanales.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 mt-4">
        <FeaturedCarousel products={products} />
      </div>
    </section>
  )
}
