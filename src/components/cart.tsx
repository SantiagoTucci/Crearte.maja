import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ShoppingCart, Plus, Minus, Trash2, Info } from "lucide-react"
import { useCart } from "@/hooks/cart-context"

interface CartProps {
  onCheckout: () => void
}

export function Cart({ onCheckout }: CartProps) {
  const { items, updateQuantity, removeItem, isOpen, toggleCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    toggleCart()
    onCheckout()
    setIsLoading(false)
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const getItemPrice = (item: any) => {
    if (item.quantity >= 5) {
      return item.price * 0.7 // 30% descuento
    }
    return item.price
  }

  const total = items.reduce((sum, item) => {
    return sum + getItemPrice(item) * item.quantity
  }, 0)

  const ahorro = items.reduce((sum, item) => {
    if (item.quantity >= 5) {
      return sum + (item.price - getItemPrice(item)) * item.quantity
    }
    return sum
  }, 0)

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 }).format(amount)

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
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl bg-white backdrop-blur-sm text-brown-900">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito de Compras
            {totalItems > 0 && <Badge className="bg-brown-200 text-brown-800">{totalItems} productos</Badge>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-3 text-brown-700">
            <ShoppingCart className="h-16 w-16 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
            <p className="mb-4">Agrega algunos productos para comenzar tu pedido</p>
            <Button onClick={toggleCart} variant="outline" className="border-brown-300 text-brown-900 hover:bg-brown-50">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full px-3 py-4">
            <div className="flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 rounded-md p-3 mb-4 text-sm">
              <Info className="h-4 w-4 mt-0.5" />
              <p>
                Llevando <span className="font-semibold">5 o más unidades iguales</span>, obtenés un{" "}
                <span className="font-semibold">30% de descuento mayorista</span>.
              </p>
            </div>

            <div className="flex-1 -mx-6 px-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] max-h-[400px]">
              <div className="space-y-4 py-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg border-brown-200">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <Badge className={`${getTypeColor(item.type)} rounded-full px-2 py-0.5 text-xs`}>{item.type}</Badge>

                      <p className="font-semibold mt-1">
                        {formatPrice(getItemPrice(item))}
                        {item.quantity >= 5 && (
                          <span className="ml-2 text-xs text-green-600 font-medium">(-30%)</span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent text-brown-700 hover:bg-brown-50"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center font-medium">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent text-brown-700 hover:bg-brown-50"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 space-y-4 px-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-brown-900">{formatPrice(total)}</span>
              </div>

              {ahorro > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  Ahorraste {formatPrice(ahorro)} con precios mayoristas 🎉
                </p>
              )}

              <Button
                className="w-full bg-gradient-to-r from-brown-500 to-sand-500 hover:from-brown-600 hover:to-sand-600 text-white cursor-pointer"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </div>
                ) : (
                  "Hacer Pedido"
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full border border-gray-700 text-brown-900 hover:bg-brown-50 cursor-pointer"
                onClick={toggleCart}
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
