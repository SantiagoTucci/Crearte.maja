import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/cart-context"

interface CartProps {
  onCheckout: () => void
}

export function Cart({ onCheckout }: CartProps) {
  const { items, updateQuantity, removeItem, getTotal, isOpen, toggleCart } = useCart()
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
  const total = getTotal()

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl bg-white text-black">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito de Compras
            {totalItems > 0 && <Badge variant="secondary">{totalItems} productos</Badge>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-3">
            <ShoppingCart className="h-16 w-16 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
            <p className="mb-4">Agrega algunos productos para comenzar tu pedido</p>
            <Button onClick={toggleCart} variant="outline">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full px-3 py-4">
            <ScrollArea className="flex-1 -mx-6 px-8">
              <div className="space-y-4 py-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm">{item.type}</p>
                      <p className="font-semibold">${item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center font-medium">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
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
            </ScrollArea>

            <div className="border-t pt-4 space-y-4 px-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold">${total.toLocaleString()}</span>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blush-400 to-dusty-rose-400 hover:from-blush-500 hover:to-dusty-rose-500 text-white"
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

              <Button variant="outline" className="w-full bg-transparent" onClick={toggleCart}>
                Continuar Comprando
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
