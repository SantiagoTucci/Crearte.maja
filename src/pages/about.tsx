import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Feather, Leaf, Star } from "lucide-react"
import SobreNosotrosImage from "../../public/SobreNosotrosImage.png"

function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: Feather,
      title: "Artesanía",
      description: "100% hecha a mano con amor y dedicación",
      color: "bg-brown-100",
    },
    {
      icon: Leaf,
      title: "Sostenibilidad",
      description: "Materiales naturales y eco-responsables",
      color: "bg-brown-100",
    },
    {
      icon: Star,
      title: "Exclusividad",
      description: "Aromas únicos y diseños irrepetibles",
      color: "bg-brown-100",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-sand-600 to-sand-700">
      <Header />

      {/* Glow del cursor */}
      <div
        className="absolute w-80 h-80 bg-brown-200/10 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 160,
          top: mousePosition.y - 160,
        }}
      />

      <section ref={sectionRef} className="relative max-w-6xl mx-auto py-8 px-4 z-10">
        {/* Header */}
          <div
            className={`text-center mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-4xl font-bold text-white mb-4">{"Sobre Nosotros"}</h2>
          </div>

        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
          {/* Texto principal */}
          <div
            className={`lg:w-1/2 space-y-6 transform transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
            }`}
          >
            <p
              className={`text-lg text-brown-100 leading-relaxed transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              En{" "}
              <span className="font-bold text-brown-200">
                Crearte.Maja
              </span>{" "}
              nos apasiona crear velas y decoraciones que transforman cualquier espacio en un santuario de paz y
              belleza. Cada pieza es una obra de arte elaborada con materiales premium y un cuidado artesanal
              excepcional.
            </p>

            <div className="space-y-4">
              {features.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 text-brown-100 transform transition-all duration-700 ${
                      isVisible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                    }`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className={`p-2 rounded-full ${item.color}`}>
                      <Icon className="w-5 h-5 text-brown-600" />
                    </div>
                    <span>{item.description}</span>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-center lg:justify-start">
              <button
                className="mt-2 sm:mt-6 px-6 py-3 cursor-pointer bg-brown-700 text-white font-semibold rounded-lg shadow hover:bg-brown-800 hover:scale-[1.03] transition-all duration-300"
                onClick={() => (window.location.href = "/inicio")}
              >
                Descubre nuestros productos
              </button>
            </div>
          </div>

          <ProductImageAnimated isVisible={isVisible} />
        </div>
      </section>
    </div>
  )
}

function ProductImageAnimated({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`lg:w-1/2 flex justify-center items-center transition-all duration-1000 mb-6 sm:mb-0 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      aria-label="Imagen animada del producto"
    >
      <div
        className="relative group w-70 h-70 sm:w-72 sm:h-72 md:w-96 md:h-96 shadow-xl lg:w-[28rem] lg:h-[28rem] rounded-3xl overflow-hidden"
        style={{
          animation: isVisible
            ? "floatUpDown 8s ease-in-out infinite, glowPulse 8s ease-in-out infinite"
            : "none",
        }}
      >
          <div className="w-full h-full rounded-3xl bg-white relative">
            {/* Imagen fija */}
            <img
              src={SobreNosotrosImage}
              alt="Vela artesanal minimalista"
              className="w-full h-full object-contain rounded-3xl transition-transform duration-700 ease-in-out"
            />

            {/* Glow sutil */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                boxShadow: "0 0 25px 10px rgba(255, 240, 220, 0.25)",
              }}
            />
          </div>
      </div>

      <style jsx>{`
        @keyframes floatUpDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px); /* movimiento más suave */
          }
        }
        @keyframes glowPulse {
          0%, 100% {
            filter: drop-shadow(0 0 6px rgba(255, 230, 200, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 14px rgba(255, 230, 200, 0.4));
          }
        }
      `}</style>
    </div>
  )
}

export default About
