import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame, ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/hooks/cart-context"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const { items, toggleCart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Flame className="h-8 w-8 text-rose-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Lumina Artesanal
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#inicio" className="text-sm font-medium hover:text-rose-600 transition-colors">
              Inicio
            </a>
            <a href="#productos" className="text-sm font-medium hover:text-rose-600 transition-colors">
              Productos
            </a>
            <a href="#nosotros" className="text-sm font-medium hover:text-rose-600 transition-colors">
              Nosotros
            </a>
            <a href="#contacto" className="text-sm font-medium hover:text-rose-600 transition-colors">
              Contacto
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            <Button variant="outline" size="sm" className="relative bg-transparent" onClick={toggleCart}>
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-2">
              <a href="#inicio" className="text-sm font-medium hover:text-rose-600 transition-colors py-2">
                Inicio
              </a>
              <a href="#productos" className="text-sm font-medium hover:text-rose-600 transition-colors py-2">
                Productos
              </a>
              <a href="#nosotros" className="text-sm font-medium hover:text-rose-600 transition-colors py-2">
                Nosotros
              </a>
              <a href="#contacto" className="text-sm font-medium hover:text-rose-600 transition-colors py-2">
                Contacto
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
