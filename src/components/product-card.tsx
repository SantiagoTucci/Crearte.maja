import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Flame } from "lucide-react"
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

    // Simular delay para mejor UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    addItem(product)
    toast.success(`${product.name} agregado al carrito`)
    setIsLoading(false)
  }

  const getTypeColor = (type: string) => {
    const colors = {
      aromática: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
      decorativa: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      personalizada: "bg-rose-200 text-rose-900 dark:bg-rose-800 dark:text-rose-200",
      relajante: "bg-pink-200 text-pink-900 dark:bg-pink-800 dark:text-pink-200",
      energizante: "bg-rose-300 text-rose-900 dark:bg-rose-700 dark:text-rose-100",
    }
    return colors[type as keyof typeof colors] || "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300"
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        width={60}
        height={60}
        className="rounded-md object-cover"
        />

        {/* Overlay con acciones */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="secondary" size="sm" className="mr-2" onClick={() => setIsFavorite(!isFavorite)}>
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>

        {/* Badge de tipo */}
        <Badge className={`absolute top-2 left-2 ${getTypeColor(product.type)}`}>
          <Flame className="h-3 w-3 mr-1" />
          {product.type}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-rose-600">${product.price.toLocaleString()}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Agregando...
            </div>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agregar al Carrito
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
