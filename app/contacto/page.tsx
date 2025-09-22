"use client"

import type React from "react"
import type { Product } from "@/components/product-card"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { SectionTag } from "@/components/section-tag"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: MapPin,
    title: "Dirección",
    details: ["Av. Principal 123", "Ciudad, País 12345"],
  },
  {
    icon: Phone,
    title: "Teléfono",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@ecomtemplate.com", "soporte@ecomtemplate.com"],
  },
  {
    icon: Clock,
    title: "Horarios",
    details: ["Lun - Vie: 9:00 - 18:00", "Sáb: 10:00 - 14:00"],
  },
]

export default function ContactPage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    })
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800">
      <div className="relative z-10">
        <Navbar
          cartItemsCount={cartItems.length}
          onCartOpen={() => {}}
          cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
        />

      <main className="pt-16">
        {/* Page Header */}
        <section className="container mx-auto px-4 py-8 pt-16">
          <div className="text-center space-y-6 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00473E]/10 dark:bg-[#00473E]/30 rounded-full">
              <Mail className="h-4 w-4 text-[#00473E] dark:text-[#21c1ab]" />
              <SectionTag>Contacto</SectionTag>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#00473E] dark:text-[#21c1ab]">
              Ponte en Contacto
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible
            </p>
          </div>
        </section>

        {/* Contact Info Cards (solo datos básicos) */}
        <section className="container mx-auto px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-[#00473E] dark:text-[#21c1ab]">
                Información de Contacto
              </h3>
              <p className="text-muted-foreground text-sm">
                Puedes comunicarte con nosotros a través de los siguientes medios:
              </p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <Card key={index} className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#00473E] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">{info.title}</h4>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-muted-foreground leading-relaxed">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        
        {/* Map Section */}
        <section className="container mx-auto py-8 px-4 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl max-w-7xl md:text-3xl font-bold text-[#00473E] mb-4 dark:text-[#21c1ab]">
              Nuestra Ubicación
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Visítanos en nuestra tienda física o agenda una cita para consultas personalizadas
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629794729807!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nuestra ubicación"
            />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
      </div>
    </div>
  )
}