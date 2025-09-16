import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
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
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, products.length])

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast.success(`${product.name} added to cart`)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1))
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1))
    setIsAutoPlaying(false)
  }

  if (products.length === 0) return null

  return (
    <div className="relative max-w-6xl mx-auto">
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/3 md:top-1/2 cursor-pointer -translate-y-1/2 z-20 bg-white border border-sand-300 rounded-full p-3 hover:bg-gray-200 transition-all duration-200 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-sand-600" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/3 md:top-1/2 cursor-pointer -translate-y-1/2 z-20 bg-white border border-sand-300 rounded-full p-3 hover:bg-gray-200 transition-all duration-200 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-sand-600" />
      </button>

      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product, index) => (
            <div key={product.id} className="w-full flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Card className="mx-4 md:mx-8 overflow-hidden bg-white border border-sand-300 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden bg-muted/30">
                      <img
                        src={product.image || "/placeholder.svg?height=400&width=400&query=elegant minimalist candle"}
                        alt={product.name}
                        className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <CardContent className="p-3 md:px-8 md:p-5 flex flex-col justify-center space-y-3 md:space-y-5">
                      <div className="space-y-2 md:space-y-5">
                        <h3 className="text-2xl md:text-3xl font-semibold text-sand-800 leading-tight text-balance">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-pretty">{product.description}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-3xl md:text-4xl font-bold text-primary">
                          ${product.price.toLocaleString()}
                        </span>
                        <Badge
                          variant="secondary"
                          className="rounded-full px-3 py-1 text-xs font-medium shadow-lg backdrop-blur-sm"
                        >
                          {product.type}
                        </Badge>
                      </div>

                      <Button
                        className="w-full mt-3 bg-gradient-to-r from-brown-500 to-sand-500 hover:from-brown-600 hover:to-sand-600 text-white cursor-pointer bg-primary hover:bg-primary/90 font-medium py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                        Agregar
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-3 space-x-3">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? "bg-primary scale-125 w-8" : "bg-border hover:bg-muted-foreground/50"
            }`}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}