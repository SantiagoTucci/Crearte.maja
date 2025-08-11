import { useState, useEffect } from "react"
import { Hero } from "@/components/hero"
import { ProductList } from "@/components/product-list"
import { FilterBar } from "@/components/filter-bar"
import { Cart } from "@/components/cart"
import { CheckoutForm } from "@/components/checkout-form"
import { Header } from "@/components/header"
import { CartProvider } from "@/hooks/cart-context"
import { ThemeProvider } from "next-themes"
import { Product } from "@/types/product"
import { sampleProducts } from "@/data/sample-products"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [loading, setLoading] = useState(true)

  // Simular carga de productos (aquí integrarías SheetJS)
  useEffect(() => {
    const loadProducts = async () => {
      // Simular delay de carga
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProducts(sampleProducts)
      setFilteredProducts(sampleProducts)
      setLoading(false)
    }
    
    loadProducts()
  }, [])

  // Filtrar productos por tipo
  useEffect(() => {
    if (selectedTypes.length === 0) {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(product => 
        selectedTypes.includes(product.type)
      ))
    }
  }, [products, selectedTypes])

  // Obtener tipos únicos
  const availableTypes = [...new Set(products.map(product => product.type))]

  if (showCheckout) {
    return (
      <ThemeProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <CheckoutForm onBack={() => setShowCheckout(false)} />
          </div>
        </CartProvider>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <Hero />
          
          <main className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestras Velas Artesanales</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Descubre nuestra colección de velas hechas a mano con ingredientes naturales 
                y fragancias únicas que transformarán tu hogar en un oasis de tranquilidad.
              </p>
            </div>

            <FilterBar 
              types={availableTypes}
              selectedTypes={selectedTypes}
              onTypeChange={setSelectedTypes}
            />
            
            <ProductList 
              products={filteredProducts} 
              loading={loading}
            />
          </main>

          <Cart onCheckout={() => setShowCheckout(true)} />
        </div>
      </CartProvider>
    </ThemeProvider>
  )
}
