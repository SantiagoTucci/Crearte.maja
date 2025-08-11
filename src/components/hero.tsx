import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Flame, Sparkles, Heart } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToProducts = () => {
    const productsSection = document.querySelector("main")
    productsSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 dark:from-rose-950 dark:via-pink-950 dark:to-rose-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/placeholder-90phn.png')] bg-cover bg-center opacity-10" />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <Sparkles className="h-6 w-6 text-rose-400 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <Flame className="h-8 w-8 text-pink-400 opacity-60" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float">
          <Heart className="h-6 w-6 text-rose-300 opacity-60" />
        </div>
      </div>

      <div
        className={`relative z-10 text-center px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-6">
          <Flame className="h-16 w-16 text-rose-500 mx-auto mb-4 animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent">
          Lumina Artesanal
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Ilumina tu hogar con la calidez de nuestras velas artesanales. Cada una creada con amor, ingredientes
          naturales y fragancias únicas que despiertan tus sentidos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={scrollToProducts}
          >
            Explorar Colección
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-rose-300 text-rose-700 hover:bg-rose-50 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-rose-950 px-8 py-3 text-lg font-semibold transition-all duration-300 bg-transparent"
          >
            Nuestra Historia
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Flame className="h-8 w-8 text-rose-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">100% Naturales</h3>
            <p className="text-muted-foreground">Cera de soja y aceites esenciales puros</p>
          </div>

          <div className="text-center">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Hechas con Amor</h3>
            <p className="text-muted-foreground">Cada vela es única y artesanal</p>
          </div>

          <div className="text-center">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="h-8 w-8 text-rose-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fragancias Únicas</h3>
            <p className="text-muted-foreground">Aromas exclusivos que transforman espacios</p>
          </div>
        </div>
      </div>
    </section>
  )
}
