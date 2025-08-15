import { Header } from "@/components/header"
import { ThemeProvider } from "next-themes"

export default function About() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background bg-gradient-to-b from-blush-50 to-dusty-rose-50">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-rose-400">Sobre Nosotros</h1>
            <p className="text-lg text-muted-foreground mb-6">
              En Maja creamos velas artesanales únicas, hechas a mano con ingredientes naturales y fragancias
              especiales para llenar tu hogar de calidez y armonía. Nuestra pasión por lo artesanal se refleja
              en cada detalle de nuestros productos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-2">Calidad Premium</h2>
                <p className="text-muted-foreground">
                  Cada vela se fabrica con cera de alta calidad y fragancias naturales que duran más.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-2">Hecho a Mano</h2>
                <p className="text-muted-foreground">
                  Nuestros productos son totalmente artesanales, cuidando cada detalle y proceso de elaboración.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}
