"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { HeroSlider, type HeroSlide } from "@/components/hero-slider"
import { SectionTag } from "@/components/section-tag"
import { ProductCard, type Product } from "@/components/product-card"
import { CategoryCard, type Category } from "@/components/category-card"
import { TestimonialCard, type Testimonial } from "@/components/testimonial-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Heart, Star, Flower2, Leaf, Gift, Truck, Award, Zap, MessageCircle, Palette, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { imageOverlayVariants, glassVariants } from "@/lib/overlay-variants"
import { useCounter } from "@/hooks/use-counter"

// Mock data
const heroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Amor y Dedicación",
    subtitle: "Soy Nadia, emprendedora, mamá y amante de las flores",
    description: "Mi proyecto surgió a partir de un sueño que me dio la señal de que debía comenzar con esto",
    image: "/1.jpg",
    primaryCTA: { text: "Ver Servicios", href: "/productos" },
    secondaryCTA: { text: "Conocer a Nadia", href: "/nosotros" },
  },
  {
    id: "2",
    title: "Ambientaciones Únicas",
    subtitle: "Para eventos y espacios especiales",
    description: "Cada ramo y ambientación está hecho con mucho amor y dedicación, como si fuera único",
    image: "/2.jpg",
    primaryCTA: { text: "Ver Ambientaciones", href: "/productos?categoria=ambientaciones" },
    secondaryCTA: { text: "Contactar", href: "/contacto" },
  },
  {
    id: "3",
    title: "Servicio Semanal de Flores",
    subtitle: "Abonos semanales o quincenales",
    description: "Mantén tu espacio siempre lleno de vida con nuestros servicios de flores frescas",
    image: "/3.jpg",
    primaryCTA: { text: "Suscribirse", href: "/productos?categoria=semanal" },
    secondaryCTA: { text: "Más Info", href: "/contacto" },
  },
]

const featuredCategories: Category[] = [
  {
    id: "ambientaciones",
    name: "Ambientaciones",
    description: "Eventos y espacios especiales con flores naturales",
    image: "/a.jpg",
    productCount: 15,
  },
  {
    id: "semanal",
    name: "Servicio Semanal",
    description: "Abonos semanales y quincenales de flores frescas",
    image: "/b.jpg",
    productCount: 8,
  },
  {
    id: "jardines",
    name: "Estética de Jardines",
    description: "Diseño y mantenimiento de espacios verdes",
    image: "/c.jpg",
    productCount: 12,
  },
]

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Ramo de Rosas Rojas",
    price: 45.99,
    originalPrice: 55.99,
    image: "/a.jpg",
    category: "Ramos",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Ambientación para Evento",
    price: 199.99,
    image: "/b.jpg",
    category: "Ambientaciones",
    inStock: true,
  },
  {
    id: "3",
    name: "Servicio Semanal Premium",
    price: 89.99,
    originalPrice: 109.99,
    image: "/c.jpg",
    category: "Servicio Semanal",
    inStock: true,
  },
  {
    id: "4",
    name: "Diseño de Jardín",
    price: 299.99,
    image: "/dd.jpg",
    category: "Jardines",
    inStock: true,
  },
]

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ana Martínez",
    role: "Cliente Servicio Semanal",
    content: "Nadia es increíble, cada semana mis flores llegan perfectas y mi casa siempre está llena de vida. Su dedicación se nota en cada detalle.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=AM",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    role: "Evento de Boda",
    content: "La ambientación de nuestra boda fue un sueño hecho realidad. Nadia entendió perfectamente nuestra visión y la superó. ¡Recomendada 100%!",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=CR",
  },
  {
    id: "3",
    name: "Laura García",
    role: "Diseño de Jardín",
    content: "Mi jardín se transformó completamente. Nadia tiene un ojo increíble para el diseño y las plantas. Cada día disfruto más mi espacio exterior.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=LG",
  },
  {
    id: "4",
    name: "María Elena Silva",
    role: "Cumpleaños Especial",
    content: "Para el cumpleaños de mi madre, Nadia creó un arreglo tan hermoso que todos los invitados no paraban de preguntar quién lo había hecho. Superó todas mis expectativas.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=MS",
  },
  {
    id: "5",
    name: "Roberto Fernández",
    role: "Oficina Corporativa",
    content: "Contratamos el servicio semanal para nuestra oficina y ha cambiado completamente el ambiente de trabajo. Los empleados están más motivados y el espacio se ve profesional.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=RF",
  },
  {
    id: "6",
    name: "Carmen López",
    role: "Aniversario de Matrimonio",
    content: "Nadia nos ayudó a recrear las flores de nuestra boda para nuestro 25 aniversario. Fue emotivo y perfecto. Su atención al detalle es extraordinaria.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=CL",
  },
  {
    id: "7",
    name: "Diego Morales",
    role: "Restaurante",
    content: "Como chef, entiendo la importancia de los detalles. Nadia logra que nuestro restaurante tenga siempre flores frescas que complementan perfectamente la experiencia culinaria.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=DM",
  },
  {
    id: "8",
    name: "Patricia Ruiz",
    role: "Baby Shower",
    content: "El baby shower de mi hija fue mágico gracias a Nadia. Cada detalle floral estaba pensado con amor y las fotos quedaron increíbles. ¡Mil gracias!",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=PR",
  }
]

// Elegant Minimal Stat Card Component
function AnimatedStatCard({ stat, index }: { stat: any, index: number }) {
  const numericValue = parseInt(stat.number.replace(/\D/g, '')) || 0
  const hasPlus = stat.number.includes('+')
  const isDecimal = stat.number.includes('.')
  
  const { count, elementRef } = useCounter({ 
    end: numericValue, 
    duration: 1000 + (index * 100),
    decimals: isDecimal ? 1 : 0,
    startOnInView: true 
  })

  const formatCount = (value: number) => {
    if (isDecimal) {
      return value.toFixed(1)
    }
    return hasPlus ? `${value}+` : value.toString()
  }

  return (
    <div 
      ref={elementRef}
      className={cn(
        "text-center space-y-4 minimal-hover",
        "transition-all duration-200 ease-out",
        `animation-delay-${index * 150}`
      )}
      style={{ 
        animationDelay: `${index * 150}ms`
      }}
    >
      {/* Subtle Icon */}
      <div className="flex justify-center">
        <stat.icon className={cn("w-5 h-5", stat.color, "opacity-70 transition-opacity duration-300 group-hover:opacity-100")} />
      </div>

      {/* Clean Number */}
      <div 
        className="text-3xl md:text-4xl font-extralight text-foreground tracking-wide"
        style={{ 
          animation: count > 0 ? 'count-appear 0.3s ease-out' : 'none'
        }}
      >
        {formatCount(count)}
      </div>

      {/* Simple Label */}
      <div className="text-xs md:text-sm text-muted-foreground font-light tracking-wider uppercase">
        {stat.label}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const cartTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product])
  }

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items)
  }

  const handleCartOpen = () => {
    cartTriggerRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 relative overflow-hidden">
      {/* Floating decorative elements - reduced and more subtle */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-12 h-12 bg-primary/8 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-64 right-24 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-64 left-24 w-14 h-14 bg-primary/6 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={handleCartOpen}
      />

      <ShoppingCart 
        items={cartItems} 
        onUpdateCart={handleUpdateCart}
        trigger={
          <button 
            ref={cartTriggerRef}
            style={{ display: 'none' }} 
            aria-hidden="true"
          />
        }
      />

      <main className="relative z-10 pt-16">
        {/* Hero Slider Section */}
        <section className={`container mx-auto px-4 py-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <HeroSlider slides={heroSlides} />
        </section>

        {/* Minimal Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <SectionTag className="mx-auto">
                  <Flower2 className="w-4 h-4 mr-2" />
                  Nuestros Numeros
                </SectionTag>
              <div className="w-12 h-0.5 bg-primary/30 mx-auto mb-6"></div>
              <p className="text-base text-muted-foreground max-w-md mx-auto font-light">
                Momentos especiales creados con dedicación
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
              {[
                { 
                  icon: Heart, 
                  number: "500+", 
                  label: "Clientes Felices",
                  color: "text-pink-400"
                },
                { 
                  icon: Star, 
                  number: "5.0", 
                  label: "Calificación",
                  color: "text-amber-400"
                },
                { 
                  icon: Flower2, 
                  number: "1000+", 
                  label: "Flores Entregadas",
                  color: "text-rose-400"
                },
                { 
                  icon: Leaf, 
                  number: "3+", 
                  label: "Experiencia",
                  color: "text-emerald-400"
                }
              ].map((stat, index) => (
                <AnimatedStatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Minimal */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Content Side */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <SectionTag>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Conoce a Nadia
                    </SectionTag>
                    
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                        Flores con{" "}
                        <span className="text-pink-500">
                          Amor y Dedicación
                        </span>
                      </h2>
                      
                      <div className="w-16 h-1 bg-pink-500 rounded-full"></div>
                    </div>
                    
                    <div className="space-y-6">
                      <p className="text-lg text-foreground/80 leading-relaxed">
                        Soy Nadia, emprendedora, mamá y amante de las flores y su energía. Mi proyecto surgió a partir de{" "}
                        <span className="text-pink-500 font-medium">un sueño</span> que me dio la señal de que debía comenzar con esto.
                      </p>
                      
                      <blockquote className="border-l-4 border-pink-500 pl-6 py-2">
                        <p className="text-lg font-medium text-foreground italic">
                          "Armo cada ramo con mucho amor y dedicación como si fuera único"
                        </p>
                      </blockquote>
                    </div>
                  </div>

                  {/* Simple Feature List */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { 
                        icon: Flower2, 
                        title: "Flores Frescas", 
                        desc: "Seleccionadas cada día", 
                        color: "text-pink-500"
                      },
                      { 
                        icon: Gift, 
                        title: "Hecho con Amor", 
                        desc: "Cada arreglo es único", 
                        color: "text-red-500"
                      },
                      { 
                        icon: Truck, 
                        title: "Entrega Rápida", 
                        desc: "Puntual y cuidadosa", 
                        color: "text-blue-500"
                      },
                      { 
                        icon: Award, 
                        title: "Calidad Premium", 
                        desc: "Solo lo mejor", 
                        color: "text-amber-500"
                      }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <feature.icon className={cn("w-5 h-5", feature.color)} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h4>
                          <p className="text-xs text-muted-foreground">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Simple CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                      asChild
                    >
                      <Link href="/nosotros">
                        <Heart className="w-4 h-4 mr-2" />
                        Conocer Mi Historia
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-2 border-border hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/20 dark:border-slate-600 dark:hover:border-pink-400 transition-all duration-300"
                      asChild
                    >
                      <Link href="/contacto">
                        Conversemos
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Simple Image Side */}
                <div className="relative">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/logoooo.jpg"
                      alt="Nadia trabajando con flores"
                      width={600}
                      height={800}
                      className="object-cover w-full h-full"
                    />
                    
                    {/* Simple Badges */}
                    <Badge className="absolute top-4 right-4 bg-white/90 text-foreground border-0 shadow-md">
                      <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                      Emprendedora
                    </Badge>
                    
                    <Badge className="absolute bottom-4 left-4 bg-white/90 text-foreground border-0 shadow-md">
                      <Heart className="w-3 h-3 mr-1 fill-current text-red-500" />
                      3+ Años
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Featured Products Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Clean Header */}
              <div className="text-center space-y-6 mb-16">
                <SectionTag className="mx-auto">
                  <Star className="w-4 h-4 mr-2" />
                  Servicios Destacados
                </SectionTag>
                
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Nuestros Servicios{" "}
                    <span className="text-pink-500">Más Populares</span>
                  </h2>
                  
                  <div className="w-20 h-0.5 bg-pink-500 mx-auto"></div>
                </div>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Descubre nuestros servicios florales más solicitados, hechos con amor y dedicación
                </p>
              </div>
              
              {/* Simple Product Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                  >
                    <ProductCard product={product} onAddToCart={handleAddToCart} />
                  </div>
                ))}
              </div>
              
              {/* Simple CTA */}
              <div className="text-center mt-16">
                <Button 
                  size="lg" 
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                  asChild
                >
                  <Link href="/productos">
                    <Flower2 className="w-4 h-4 mr-2" />
                    Ver Todos los Servicios
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        
      
        

        {/* Minimal Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              
              {/* Clean Header */}
              <div className="text-center space-y-6 mb-16">
                <SectionTag className="mx-auto">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Nuestro Proceso
                </SectionTag>
                
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Cómo{" "}
                    <span className="text-pink-500">Trabajamos</span>
                  </h2>
                  
                  <div className="w-16 h-0.5 bg-pink-500 mx-auto"></div>
                </div>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Un proceso simple y cuidadoso para brindarte la mejor experiencia floral
                </p>
              </div>
              
              {/* Simple Process Grid */}
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    icon: MessageCircle,
                    title: "Consulta",
                    description: "Conversamos sobre tus necesidades florales"
                  },
                  {
                    step: "02", 
                    icon: Palette,
                    title: "Diseño",
                    description: "Creamos un diseño personalizado"
                  },
                  {
                    step: "03",
                    icon: Flower2,
                    title: "Selección",
                    description: "Seleccionamos las flores más frescas"
                  },
                  {
                    step: "04",
                    icon: Truck,
                    title: "Entrega",
                    description: "Entregamos con amor y puntualidad"
                  }
                ].map((process, index) => (
                  <div 
                    key={index}
                    className="text-center space-y-4 group"
                  >
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-950/30 rounded-full flex items-center justify-center text-pink-500 font-bold text-sm mx-auto">
                      {process.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="flex justify-center">
                      <process.icon className="w-8 h-8 text-pink-500" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{process.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{process.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              
              {/* Clean Header */}
              <div className="text-center space-y-6 mb-16">
                <SectionTag className="mx-auto">
                  <Heart className="w-4 h-4 mr-2" />
                  Testimonios
                </SectionTag>
                
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Lo que Dicen{" "}
                    <span className="text-pink-500">Nuestros Clientes</span>
                  </h2>
                  
                  <div className="w-20 h-0.5 bg-pink-500 mx-auto"></div>
                </div>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Cada testimonio es una flor más en nuestro jardín de experiencias compartidas
                </p>
              </div>
              
              {/* Carousel Testimonials */}
              <div className="mb-20">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {testimonials.map((testimonial) => (
                      <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-2 h-full">
                          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 h-full flex flex-col justify-between min-h-[280px]">
                            {/* Rating */}
                            <div className="flex justify-center mb-4">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                            
                            {/* Quote */}
                            <blockquote className="text-muted-foreground italic mb-6 leading-relaxed text-center flex-grow flex items-center justify-center">
                              "{testimonial.content}"
                            </blockquote>
                            
                            {/* Author */}
                            <div className="text-center space-y-1 mt-auto">
                              <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                              <p className="text-sm text-pink-500">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-colors" />
                  <CarouselNext className="hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-colors" />
                </Carousel>
              </div>

              {/* Enhanced Client Gallery */}
              <div className="space-y-12">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-pink-50 dark:bg-pink-950/20 px-4 py-2 rounded-full">
                    <Flower2 className="w-4 h-4 text-pink-500" />
                    <span className="text-sm text-pink-600 dark:text-pink-400 font-medium">Portfolio</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      Galería de{" "}
                      <span className="text-pink-500">Nuestros Trabajos</span>
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto rounded-full"></div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    Cada imagen cuenta una historia de amor, dedicación y momentos únicos que hemos tenido el honor de crear
                  </p>
                </div>
                
                {/* Enhanced Image Grid with Categories */}
                <div className="space-y-8">
                  {/* Aligned Masonry Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
                    {[
                      { src: "/1.jpg", alt: "Ramo de novia elegante", category: "Bodas" },
                      { src: "/2.jpg", alt: "Ambientación evento corporativo", category: "Eventos" },
                      { src: "/3.jpg", alt: "Decoración mesa romántica", category: "Eventos" },
                      { src: "/a.jpg", alt: "Arreglo floral primaveral", category: "Semanal" },
                      { src: "/b.jpg", alt: "Centro de mesa minimalista", category: "Eventos" },
                      { src: "/c.jpg", alt: "Jardín diseñado con amor", category: "Jardines" },
                      { src: "/11.jpg", alt: "Servicio semanal premium", category: "Semanal" },
                      { src: "/dd.jpg", alt: "Decoración especial única", category: "Bodas" }
                    ].map((image, index) => (
                      <div 
                        key={index} 
                        className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={400}
                          height={400}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Image Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="text-white space-y-1">
                            <Badge className="bg-pink-500/90 text-white text-xs border-0 mb-1">
                              {image.category}
                            </Badge>
                            <h4 className="font-medium text-xs leading-tight">{image.alt}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* View More Button */}
                  <div className="text-center pt-8">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/20 text-pink-600 hover:text-pink-700 dark:border-pink-800 dark:text-pink-400 dark:hover:border-pink-400 transition-all duration-300 group"
                    >
                      <Flower2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Ver Más Trabajos
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
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
