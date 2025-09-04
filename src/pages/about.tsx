"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Feather, Leaf, Star } from "lucide-react"

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: Feather,
      title: "Artesanía",
      description: "100% hecha a mano con amor y dedicación",
      color: "bg-brown-300",
      delay: "delay-100",
    },
    {
      icon: Leaf,
      title: "Sostenibilidad",
      description: "Materiales naturales y eco-responsables",
      color: "bg-sand-400",
      delay: "delay-200",
    },
    {
      icon: Star,
      title: "Exclusividad",
      description: "Aromas únicos y diseños irrepetibles",
      color: "bg-brown-500",
      delay: "delay-300",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <Header />

      {/* Cursor Glow */}
      <div
        className="absolute w-96 h-96 bg-brown-100/20 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <section ref={sectionRef} className="relative max-w-7xl mx-auto px-6 py-16 z-10">
        <div className="text-center mb-12">
          <h2
            className={`text-5xl font-semibold text-brown-600 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Sobre Nosotros
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Texto principal */}
          <div
            className={`lg:w-1/2 space-y-6 transform transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
            }`}
          >
            <p className="text-lg text-brown-700 leading-relaxed">
              En{" "}
              <span className="font-bold text-brown-500">
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
                    className={`flex items-center gap-3 text-brown-600 transform transition-all duration-700 ${
                      isVisible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className={`p-2 rounded-full ${item.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span>{item.description}</span>
                  </div>
                )
              })}
            </div>

            <button
              className={`mt-6 px-6 py-3 cursor-pointer bg-brown-500 text-white font-semibold rounded-lg shadow hover:bg-brown-600 transition-all duration-300`}
              onClick={() => (window.location.href = "/inicio")}
            >
              Descubre nuestros productos
            </button>
          </div>

          {/* Features Cards */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className={`relative p-6 bg-white border border-brown-200 rounded-xl shadow-sm transform transition-all duration-700 hover:shadow-md cursor-pointer`}
                >
                  <div className={`w-16 h-16 mx-auto flex items-center justify-center rounded-lg ${feature.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-brown-600">{feature.title}</h3>
                    <p className="text-brown-700 text-sm mt-1">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
