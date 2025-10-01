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

  const handleAddToCart = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    addItem(product)
    toast.success(`${product.name} agregado al carrito`)
    setIsLoading(false)
  }

  const getTypeColor = (type: string) => {
    const colors = {
      aromática: "bg-brown-100 text-brown-700 dark:bg-brown-900/30 dark:text-brown-300",
      decorativa: "bg-sand-100 text-sand-700 dark:bg-sand-900/30 dark:text-sand-300",
      personalizada: "bg-brown-200 text-brown-800 dark:bg-brown-800/30 dark:text-brown-200",
      relajante: "bg-sand-200 text-sand-800 dark:bg-sand-800/30 dark:text-sand-200",
      energizante: "bg-brown-300 text-brown-900 dark:bg-brown-700/30 dark:text-brown-100",
    }
    return colors[type as keyof typeof colors] || "bg-sand-100 text-sand-700 dark:bg-sand-900/30 dark:text-sand-300"
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
          className={`absolute top-3 left-3 ${getTypeColor(product.type)} rounded-full px-3 py-1 text-xs text-sand-700 font-medium shadow-lg backdrop-blur-sm`}
        >
          {product.type}
        </Badge>
      </div>

      <CardContent className="px-4 py-0.5 flex-grow">
        <h3 className="font-semibold text-lg sm:text-xl mb-1.5 line-clamp-2 text-brown-800 leading-tight">
          {product.name}
        </h3>
        <p className="text-sm mb-1.5 line-clamp-3 leading-relaxed text-brown-700">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl sm:text-3xl font-bold">  {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(product.price)}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 px-4 pb-3.5">
        <Button
          className="w-full bg-gradient-to-r from-brown-500 to-sand-500 hover:from-brown-600 hover:to-sand-600 text-white cursor-pointer font-medium py-3 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 border-0 text-sm sm:text-base touch-manipulation"
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
