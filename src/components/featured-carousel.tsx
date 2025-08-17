import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/types/product"
import { useCart } from "@/hooks/cart-context"
import { toast } from "sonner"

interface FeaturedCarouselProps {
  products: Product[]
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, products.length])

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast.success(`${product.name} agregado al carrito`)
  }

  const getTypeColor = (type: string) => {
    const colors = {
      aromática: "bg-blush-100 text-blush-700 dark:bg-blush-900/30 dark:text-blush-300",
      decorativa: "bg-dusty-rose-100 text-dusty-rose-700 dark:bg-dusty-rose-900/30 dark:text-dusty-rose-300",
      personalizada: "bg-blush-200 text-blush-800 dark:bg-blush-800/30 dark:text-blush-200",
      relajante: "bg-dusty-rose-200 text-dusty-rose-800 dark:bg-dusty-rose-800/30 dark:text-dusty-rose-200",
      energizante: "bg-blush-300 text-blush-900 dark:bg-blush-700/30 dark:text-blush-100",
    }
    return colors[type as keyof typeof colors] || "bg-blush-100 text-blush-700 dark:bg-blush-900/30 dark:text-blush-300"
  }

  if (products.length === 0) return null

  return (
    <div className="container mx-auto px-4 pb-4">
      <div className="relative max-w-6xl mx-auto">
        {/* Carousel Container */}
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {products.map((product, index) => (
              <div key={product.id} className="w-full flex-shrink-0">
                {/* Animación con Framer Motion */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Card className="mx-2 md:mx-4 overflow-hidden bg-white backdrop-blur-sm border-0 shadow-xl">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Imagen */}
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg?height=400&width=400&query=elegant candle"}
                          alt={product.name}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                        <Badge
                          className={`absolute top-4 left-4 ${getTypeColor(product.type)} rounded-full px-3 py-1 font-medium shadow-lg`}
                        >
                          {product.type}
                        </Badge>
                      </div>

                      {/* Contenido */}
                      <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black">{product.name}</h3>
                        <p className="mb-6 leading-relaxed text-black">{product.description}</p>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-3xl md:text-4xl font-bold gradient-text">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-blush-400 to-dusty-rose-400 hover:from-blush-500 hover:to-dusty-rose-500 text-white font-medium py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Agregar al Carrito
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-3 space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blush-400 scale-110" : "bg-gray-100 hover:bg-blush-300"
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
