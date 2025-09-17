import { useState, useEffect, useRef } from "react"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame, Star, Heart, ShoppingBag, ArrowDown } from "lucide-react"
import type { Product } from "@/types/product"

interface HeroProps {
  products: Product[]
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <Flame className="w-4 h-4 text-sand-300" />
        </div>
      ))}
    </div>
  )
}

export function Hero({ products }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        setMousePosition({ x, y })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove)
      return () => heroElement.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden 
                 bg-gradient-to-br from-brown-600 via-brown-700 to-brown-900 
                 dark:from-brown-700 dark:via-brown-800 dark:to-brown-950"
    >
      <div
        className="absolute inset-0 bg-[url('/soft-candle-background.png')] bg-cover bg-center opacity-10 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px) scale(1.1)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      <FloatingParticles />

      <div
        className={`relative z-10 text-center px-8 pt-4 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight bg-gradient-to-r from-sand-300 to-sand-400 bg-clip-text text-transparent animate-fade-in">
          Conoce nuestros productos
        </h1>

        <p className="text-lg md:text-2xl lg:text-3xl mb-6 max-w-4xl mx-auto leading-relaxed font-light text-sand-200 dark:text-sand-300 animate-fade-in-up">
          Ilumina tu hogar con la calidez de nuestras velas y adornos artesanales.
        </p>
      </div>

      <div
        className={`relative z-10 w-full max-w-7xl px-4 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <FeaturedCarousel products={products} />
      </div>

    </section>
  )
}
