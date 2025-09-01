import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, User, MapPin, CheckCircle, Phone } from "lucide-react"
import { useCart } from "@/hooks/cart-context"
import { toast } from "sonner"
import emailjs from "@emailjs/browser"

interface CheckoutFormProps {
  onBack: () => void
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { items, getTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const total = getTotal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      toast.error("Por favor completa todos los campos")
      return
    }

    setIsSubmitting(true)

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        items: items.map(i => `${i.name} x${i.quantity}`).join(", "),
        total: total.toFixed(2)
      }

      await emailjs.send(
        "service_5h2z6ks",     
        "template_ol579jk",      
        templateParams,
        "1nlg1_Tl512ckwhI3"  
      )

      setIsSuccess(true)
      clearCart()
      toast.success("¡Pedido enviado exitosamente!")

    } catch (error) {
      console.error("Error al enviar correo:", error)
      toast.error("Error al enviar el pedido. Intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4 text-brown-900">¡Gracias por tu pedido!</h1>
            <p className="text-lg mb-6 text-brown-700">
              Tu pedido ha sido recibido y será procesado pronto.
            </p>
            <div className="bg-brown-50 border border-brown-200 rounded-lg p-6">
              <p className="text-brown-800">
                <strong>Próximos pasos:</strong>
                <br />
                El seguimiento de tu pedido y la coordinación del pago se realizará por correo electrónico.
                Revisa tu bandeja de entrada en los próximos minutos.
              </p>
            </div>
          </div>

          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-brown-500 to-sand-500 hover:from-brown-600 hover:to-sand-600 text-white"
          >
            Volver a la Tienda
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white/80 backdrop-blur-sm text-brown-900">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 cursor-pointer text-brown-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Carrito
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <Card className="pt-4.5 border border-brown-200 shadow-xl bg-white/80 text-brown-900">
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre */}
                <div>
                  <Label htmlFor="name" className="text-brown-900">Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-brown-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      className="pl-10 text-brown-900"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-brown-900">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-brown-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10 text-brown-900"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <Label htmlFor="phone" className="text-brown-900">Número de Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-brown-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+34 600 123 456"
                      className="pl-10 text-brown-900"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Dirección */}
                <div>
                  <Label htmlFor="address" className="text-brown-900">Dirección de Entrega</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-brown-400" />
                    <Input
                      id="address"
                      type="text"
                      placeholder="Calle, número, ciudad"
                      className="pl-10 text-brown-900"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Botón */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brown-500 to-sand-500 hover:from-brown-600 hover:to-sand-600 text-white cursor-pointer mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando Pedido...
                    </div>
                  ) : (
                    "Confirmar Pedido"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Resumen */}
          <Card className="pt-4.5 border border-brown-200 shadow-xl bg-white/80 text-brown-900">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-brown-500">
                        {item.quantity} x ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Total:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
