import { useState, useEffect } from "react"
import { Hero } from "@/components/hero"
import { ProductList } from "@/components/product-list"
import { FilterBar } from "@/components/filter-bar"
import { Cart } from "@/components/cart"
import { CheckoutForm } from "@/components/checkout-form"
import { Header } from "@/components/header"
import { CartProvider } from "@/hooks/cart-context"
import type { Product } from "@/types/product"
import { sampleProducts } from "../../public/productos/productos"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      // Simular delay de carga
      await new Promise((resolve) => setTimeout(resolve, 1000))
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
      setFilteredProducts(products.filter((product) => selectedTypes.includes(product.type)))
    }
  }, [products, selectedTypes])

  // Obtener tipos únicos
  const availableTypes = [...new Set(products.map((product) => product.type))]

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

        <main className="container mx-auto px-4 py-12 sm:py-14 bg-white">
          <div className="mb-3.5">
            <h2 className="text-3xl sm:text-4xl font-semibold text-center sm:mb-7 gradient-text">
              Nuestra Colección
            </h2>
              <div className="relative overflow-hidden bg-gradient-to-r from-sand-600 to-sand-700 rounded-xl px-6 py-2 shadow-md animate-fade-in hover:shadow-lg transition-all duration-300 hover:scale-[1.01] mt-6">
                <div className="absolute inset-0 bg-gradient-to-r from-sand-600/80 to-sand-700/80"></div>

                <div className="relative z-10 flex items-center justify-between text-white">
                  <div className="hidden md:flex items-center gap-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <span className="text-white/90 text-sm font-medium uppercase tracking-wider">
                      Oferta Mayorista
                    </span>
                  </div>

                  <p className="text-center text-sm sm:text-base font-medium flex-1">
                    Llevando <span className="font-bold">5 unidades</span> de la misma pieza tenés un{" "}
                    <span className="font-bold">30% de descuento</span>
                  </p>
                </div>
              </div>
          </div>

          <FilterBar
            types={availableTypes}
            selectedTypes={selectedTypes}
            onTypeChange={setSelectedTypes}
          />

          <ProductList products={filteredProducts} loading={loading} />
        </main>

        <Cart onCheckout={() => setShowCheckout(true)} />

        <section className="bg-gradient-to-br from-sand-100 to-sand-200 py-8 sm:py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-sand-800 mb-6 animate-fade-in">
                Experiencia Premium
              </h2>
              <p className="text-lg text-sand-600 leading-relaxed animate-fade-in-delay-1">
                Descubre la perfecta combinación entre calidad artesanal y diseño contemporáneo. Cada pieza cuenta una
                historia única.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-delay-2">
                <div className="w-12 h-12 bg-sand-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-sand-800 mb-3">Calidad Excepcional</h3>
                <p className="text-sand-600 leading-relaxed">
                  Materiales cuidadosamente seleccionados y procesos artesanales que garantizan durabilidad y belleza.
                </p>
              </div>

              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-delay-3">
                <div className="w-12 h-12 bg-sand-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-sand-800 mb-3">Diseño Atemporal</h3>
                <p className="text-sand-600 leading-relaxed">
                  Creaciones que trascienden las tendencias, diseñadas para acompañarte durante años.
                </p>
              </div>

              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-delay-4">
                <div className="w-12 h-12 bg-sand-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-sand-800 mb-3">Entrega Rápida</h3>
                <p className="text-sand-600 leading-relaxed">
                  Envíos seguros y eficientes para que disfrutes de tus productos lo antes posible.
                </p>
              </div>
            </div>

            <div className="text-center animate-fade-in-delay-5">
              <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-sm">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-sand-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-sand-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-sand-600 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sand-700 font-medium">+30 clientes satisfechos</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CartProvider>
  )
}