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
    <div className="min-h-screen bg-gray-50/30 dark:bg-slate-900 relative">
      {/* Minimal geometric background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-8 w-2 h-2 bg-[#00473E]/10 rounded-full"></div>
        <div className="absolute top-40 right-12 w-1 h-1 bg-[#00473E]/15 rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-[#00473E]/8 rounded-full"></div>
        <div className="absolute bottom-64 right-8 w-2 h-2 bg-[#00473E]/12 rounded-full"></div>
      </div>

      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main className="pt-16 relative z-10">
        {/* Hero Minimalista */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <div className={cn(
            "max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#00473E]/5 border border-[#00473E]/10">
              <Sparkles className="w-4 h-4 mr-2 text-[#00473E]" />
              <span className="text-sm font-medium text-[#00473E]">Sobre Nadia</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Conoce Mi <span className="text-[#00473E] dark:text-[#00473E]">Historia</span>
              </h1>
              <div className="w-16 h-0.5 bg-[#00473E] mx-auto"></div>
            </div>
            
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              De un sueño revelador a una empresa floreciente que transforma espacios con amor y dedicación.
            </p>

            {/* Stats Minimalistas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-[#00473E]/5 rounded-full flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-[#00473E]" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Historia Principal */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00473E]/5 border border-[#00473E]/10">
                  <Heart className="w-4 h-4 mr-2 text-[#00473E]" />
                  <span className="text-sm font-medium text-[#00473E]">Mi Historia</span>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Un Sueño Convertido en <span className="text-[#00473E]">Realidad</span>
                  </h2>
                  <div className="w-12 h-0.5 bg-[#00473E]"></div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Todo comenzó con un sueño que me dio la señal de que debía iniciar este proyecto. 
                    Soy Nadia, emprendedora, mamá y amante de las flores y su energía transformadora.
                  </p>
                  
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-slate-700/50 p-6">
                  <Quote className="w-6 h-6 text-[#00473E]/60 mb-3" />
                  <p className="text-gray-900 dark:text-white font-medium italic mb-3">
                    "Cada flor que trabajo lleva un pedacito de mi corazón. No es solo un negocio, 
                    es mi forma de compartir amor y belleza con el mundo."
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">— Nadia, Fundadora</p>
                </div>                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Mi servicio abarca ambientaciones para eventos, servicios semanales de flores frescas, 
                    y estética de jardines. Cada proyecto es una nueva oportunidad de crear belleza 
                    y transmitir emociones auténticas.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/productos"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#00473E] hover:bg-[#00473E]/90 text-white font-medium rounded-lg transition-colors"
                  >
                    <Flower2 className="w-4 h-4 mr-2" />
                    Ver Mis Servicios
                  </Link>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
                  >
                    Contactar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative lg:order-first">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-gray-200/50 dark:border-slate-700/50">
                  <Image
                    src="/ee.jpg"
                    alt="Nadia en su estudio"
                    width={500}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      

        {/* Valores */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00473E]/5 border border-[#00473E]/10">
                <Heart className="w-4 h-4 mr-2 text-[#00473E]" />
                <span className="text-sm font-medium text-[#00473E]">Mis Valores</span>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Lo que me <span className="text-[#00473E]">Define</span>
                </h2>
                <div className="w-16 h-0.5 bg-[#00473E] mx-auto"></div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-slate-700/50 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#00473E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#00473E]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{value.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Minimalista */}
        <section className="bg-[#00473E] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">¡Trabajemos Juntos!</span>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  ¿Listo para Crear Algo Hermoso?
                </h2>
                <div className="w-16 h-0.5 bg-white/30 mx-auto"></div>
              </div>
              
              <p className="text-white/90 max-w-2xl mx-auto">
                Permíteme ayudarte a transformar tus espacios con la magia de las flores naturales
              </p>
              
              <div className="pt-2">
                <Link
                  href="/productos"
                  className="inline-flex items-center px-6 py-3 bg-white text-[#00473E] hover:bg-gray-100 font-medium rounded-lg transition-colors"
                >
                  <Flower2 className="w-4 h-4 mr-2" />
                  Ver Mis Servicios
                </Link>
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