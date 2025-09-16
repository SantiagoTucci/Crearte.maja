import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/cart-context";

export function Header() {
  const { items, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-black/95 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold gradient-text">Crearte.Maja</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="inicio" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
            Inicio
          </a>
          <a href="nosotros" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
            Nosotros
          </a>
          {/* <a href="contacto" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
            Contacto
          </a> */}
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
            <ShoppingCart className="h-5 w-5 text-brown-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-black text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white text-black/95">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <a href="inicio" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="nosotros" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Sobre Nosotros
            </a>
            {/* <a href="contacto" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Contacto
            </a> */}
          </nav>
        </div>
      )}
    </header>
  );
}
