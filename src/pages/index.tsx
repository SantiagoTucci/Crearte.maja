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
import { sampleProducts } from "../../public/productos/productos"
import { FeaturedCarousel } from "@/components/featured-carousel"
import React from "react"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [loading, setLoading] = useState(true)

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
        <CartProvider>
          <div className="min-h-screen">
            <Header />
            <CheckoutForm onBack={() => setShowCheckout(false)} />
          </div>
        </CartProvider>
    )
  }

  return (
      <CartProvider>
        <div className="min-h-screen">
          <Header />

          <Hero products={products} />

          <main className="container mx-auto px-4 py-12 sm:py-16 bg-white">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold text-center sm:mb-4 gradient-text">Nuestra Colección</h2>
            </div>

            <FilterBar types={availableTypes} selectedTypes={selectedTypes} onTypeChange={setSelectedTypes} />

            <ProductList products={filteredProducts} loading={loading} />
          </main>

          <Cart onCheckout={() => setShowCheckout(true)} />
        </div>
      </CartProvider>
  )
}
