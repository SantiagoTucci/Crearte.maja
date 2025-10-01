import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Instagram, Music } from "lucide-react"
import { Header } from "@/components/header"

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/crearte.maja/", label: "Instagram" },
    { icon: Music, href: "#", label: "Tiktok" },
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-sand-600 to-sand-700">
      <Header />
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-4xl font-bold text-white mb-4">{"Ponte en Contacto"}</h2>
            <p className="text-lg text-sand-100 max-w-2xl mx-auto">
              {"Encuentra nuestra ubicación y conéctate con nosotros en redes sociales."}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Map Section */}
            <Card
              className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 bg-white ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <CardContent className="p-0">
                <div className="relative h-96">
                  {/* Google Maps embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.360291147787!2d-58.673695684769486!3d-34.65319798044919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc0f64c6487ab%3A0x1e62b82b070cbd97!2sItuzaing%C3%B3%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1695407252365!5m2!1ses!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Contact Info Overlay */}
                <div className="p-6 bg-sand-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 group">
                      <div className="w-10 h-10 bg-sand-100 rounded-lg flex items-center justify-center group-hover:bg-sand-200 transition-colors">
                        <Phone className="w-5 h-5 text-sand-600" />
                      </div>
                      <div>
                        <p className="text-sm text-sand-500">{"Teléfono"}</p>
                        <p className="font-medium text-sand-700">+54 9 11 6549-3049</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 group">
                      <div className="w-10 h-10 bg-sand-100 rounded-lg flex items-center justify-center group-hover:bg-sand-200 transition-colors">
                        <Mail className="w-5 h-5 text-sand-600" />
                      </div>
                      <div>
                        <p className="text-sm text-sand-500">{"Email"}</p>
                        <p className="font-medium text-sand-700">majainformacion@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media & Contact Form Section */}
            <div
              className={`space-y-8 transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              {/* Social Media Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-sand-700 mb-6 text-center">
                    {"Síguenos en Redes Sociales"}
                  </h3>

                  <div className="flex flex-col items-center space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <Instagram className="w-6 h-6 text-sand-600" />
                      <span className="text-sm font-medium text-sand-700">
                        @crearte.maja
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Music className="w-6 h-6 text-sand-600" />
                      <span className="text-sm font-medium text-sand-700">
                        Tiktok (próximamente)
                      </span>
                    </div>
                  </div>

                  {/* Contact Info Extra - WhatsApp Directo */}
                  <div className="space-y-4 text-center">
                    <a
                      href="https://wa.me/5491165493049"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02]"
                    >
                      Enviar mensaje por WhatsApp
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
