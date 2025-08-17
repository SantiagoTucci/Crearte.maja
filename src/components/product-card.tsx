import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/types/product"
import { useCart } from "@/hooks/cart-context"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    addItem(product)
    toast.success(`${product.name} agregado al carrito`)
    setIsLoading(false)
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

  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={product.image || "/placeholder.svg?height=400&width=350&query=elegant candle"}
          alt={product.name}
          className="w-full h-64 sm:h-72 md:h-80 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Badge
          className={`absolute top-3 left-3 ${getTypeColor(product.type)} rounded-full px-3 py-1 text-xs font-medium shadow-lg backdrop-blur-sm`}
        >
          {product.type}
        </Badge>
      </div>

      <CardContent className="px-4 py-0.5 flex-grow">
        <h3 className="font-semibold text-lg sm:text-xl mb-1.5 line-clamp-2 text-black leading-tight">
          {product.name}
        </h3>
        <p className="text-sm mb-1.5 line-clamp-3 leading-relaxed text-black">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl sm:text-3xl font-bold gradient-text">${product.price.toLocaleString()}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 px-4 pb-1">
        <Button
          className="w-full bg-gradient-to-r from-blush-400 to-dusty-rose-400 hover:from-blush-500 hover:to-dusty-rose-500 text-white cursor-pointer font-medium py-3 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 border-0 text-sm sm:text-base touch-manipulation"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              <span>Agregando...</span>
            </div>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>Agregar</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
