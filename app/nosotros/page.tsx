"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { SectionTag } from "@/components/section-tag"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Sparkles, Flower2, ArrowRight, Star, Calendar, Quote, Users, Award, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/components/product-card"
import { cn } from "@/lib/utils"

const values = [
  {
    icon: Heart,
    title: "Amor en Cada Detalle",
    description: "Cada arreglo está hecho con dedicación y cariño genuino."
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Servicio cercano que entiende tus necesidades específicas."
  },
  {
    icon: Award,
    title: "Calidad Premium",
    description: "Utilizamos solo las flores más frescas y de mejor calidad."
  },
  {
    icon: Globe,
    title: "Servicios Integrales",
    description: "Desde ramos hasta ambientaciones completas para eventos."
  }
]

const timeline = [
  {
    year: "2021",
    title: "El Comienzo",
    description: "Todo comenzó con un sueño que me inspiró a iniciar este hermoso proyecto."
  },
  {
    year: "2022",
    title: "Primeros Pasos",
    description: "Comencé con mis primeros arreglos florales, construyendo una base sólida."
  },
  {
    year: "2023",
    title: "Expansión",
    description: "Amplié los servicios incluyendo ambientaciones y servicios semanales."
  },
  {
    year: "2024",
    title: "Reconocimiento",
    description: "Más de 500 clientes satisfechos y una reputación consolidada."
  }
]

const stats = [
  { number: "3+", label: "Años de Experiencia", icon: Calendar },
  { number: "500+", label: "Clientes Felices", icon: Heart },
  { number: "1000+", label: "Arreglos Creados", icon: Flower2 },
  { number: "5.0", label: "Calificación Promedio", icon: Star }
]

export default function AboutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className={cn(
            "max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <SectionTag className="mx-auto">
              <Sparkles className="w-4 h-4 mr-2" />
              Sobre Nadia
            </SectionTag>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Conoce Mi <span className="text-[#00473E] dark:text-[#21c1ab]">Historia</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              De un sueño revelador a una empresa floreciente que transforma espacios con 
              <span className="text-[#00473E] font-medium dark:text-[#21c1ab]"> amor y dedicación</span>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-3 group">
                  <div className="w-16 h-16 mx-auto bg-[#00473E]/10 dark:bg-[#00473E]/20 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-[#00473E] dark:text-[#21c1ab]" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Story Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <SectionTag>
                  <Heart className="w-4 h-4 mr-2" />
                  Mi Historia
                </SectionTag>
                
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Un Sueño Convertido en 
                  <span className="text-[#00473E] dark:text-[#21c1ab]"> Realidad</span>
                </h2>
                
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Todo comenzó con un sueño que me dio la señal de que debía iniciar este proyecto. 
                    Soy Nadia, emprendedora, mamá y amante de las flores y su energía transformadora.
                  </p>
                  
                <div className="p-6 bg-[#00473E]/10 dark:bg-[#00473E]/20 rounded-2xl border-l-4 border-[#00473E]">
                  <Quote className="w-8 h-8 text-[#00473E]/60 mb-4 dark:text-[#21c1ab]" />
                  <p className="text-lg font-medium italic text-foreground mb-2">
                    "Cada flor que trabajo lleva un pedacito de mi corazón. No es solo un negocio, 
                    es mi forma de compartir amor y belleza con el mundo."
                  </p>
                  <p className="text-sm text-muted-foreground">— Nadia, Fundadora</p>
                </div>                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Mi servicio abarca ambientaciones para eventos, servicios semanales de flores frescas, 
                    y estética de jardines. Cada proyecto es una nueva oportunidad de crear belleza 
                    y transmitir emociones auténticas.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="bg-[#00473E] hover:bg-[#00392F] text-white group shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="/productos">
                      <Flower2 className="w-5 h-5 mr-2 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                      Ver Mis Servicios
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-2 dark:text-white border-[#00473E]/30 hover:border-[#00473E] hover:bg-[#00473E]/10 dark:hover:bg-[#00473E]/20 text-[#00473E] hover:text-[#00473E] dark:border-[#00473E]/80  dark:hover:border-[#00473E]/40 transition-all duration-300">
                    <Link href="/contacto">
                      Contactar
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/ee.jpg"
                    alt="Nadia en su estudio"
                    width={600}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                  
                  
                </div>
              </div>
            </div>
          </div>
        </section>

      

        {/* Values Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <SectionTag className="mx-auto">
                <Heart className="w-4 h-4 mr-2" />
                Mis Valores
              </SectionTag>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Lo que me <span className="text-[#00473E] dark:text-[#21c1ab]">Define</span>
              </h2>
              <div className="w-20 h-0.5 bg-[#00473E] mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#00473E]/10 dark:bg-[#00473E]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#00473E] dark:text-[#21c1ab]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#00473E] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge className="bg-white/20 text-white border-0">
                <Sparkles className="w-4 h-4 mr-2" />
                ¡Trabajemos Juntos!
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                ¿Listo para Crear Algo Hermoso?
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Permíteme ayudarte a transformar tus espacios con la magia de las flores naturales
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-white text-[#00473E] hover:bg-[#E6F3F2] hover:text-[#00473E] font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/productos">
                    <Flower2 className="w-5 h-5 mr-2" />
                    Ver Mis Servicios
                  </Link>
                </Button>
                
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}