"use client"

import { useState, useEffect } from "react"
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
    image: "/placeholder.svg?height=300&width=400&text=Ambientaciones",
    productCount: 15,
  },
  {
    id: "semanal",
    name: "Servicio Semanal",
    description: "Abonos semanales y quincenales de flores frescas",
    image: "/placeholder.svg?height=300&width=400&text=Servicio+Semanal",
    productCount: 8,
  },
  {
    id: "jardines",
    name: "Estética de Jardines",
    description: "Diseño y mantenimiento de espacios verdes",
    image: "/placeholder.svg?height=300&width=400&text=Jardines",
    productCount: 12,
  },
]

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Ramo de Rosas Rojas",
    price: 45.99,
    originalPrice: 55.99,
    image: "/placeholder.svg?height=300&width=300&text=Rosas+Rojas",
    category: "Ramos",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Ambientación para Evento",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300&text=Ambientacion+Evento",
    category: "Ambientaciones",
    inStock: true,
  },
  {
    id: "3",
    name: "Servicio Semanal Premium",
    price: 89.99,
    originalPrice: 109.99,
    image: "/placeholder.svg?height=300&width=300&text=Servicio+Semanal",
    category: "Servicio Semanal",
    inStock: true,
  },
  {
    id: "4",
    name: "Diseño de Jardín",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300&text=Diseño+Jardin",
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
]

export default function HomePage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product])
  }

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Floating decorative elements - reduced and more subtle */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-12 h-12 bg-primary/8 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-64 right-24 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-64 left-24 w-14 h-14 bg-primary/6 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main className="relative z-10 pt-16">
        {/* Hero Slider Section */}
        <section className={`container mx-auto px-4 py-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <HeroSlider slides={heroSlides} />
        </section>

        {/* Floating stats section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Heart, number: "500+", label: "Clientes Felices", color: "text-red-500" },
                { icon: Star, number: "5.0", label: "Calificación", color: "text-yellow-500" },
                { icon: Flower2, number: "1000+", label: "Flores Entregadas", color: "text-pink-500" },
                { icon: Leaf, number: "3+", label: "Años de Experiencia", color: "text-green-500" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "rounded-xl p-4 text-center shadow-subtle-lg hover:scale-105 transition-all duration-300",
                    glassVariants({ variant: "card", hover: "subtle" }),
                    `delay-${index * 100}`
                  )}
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 relative">
                <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <SectionTag className="ml-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sobre Nadia
                </SectionTag>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Flores con Amor y Dedicación
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Soy Nadia, emprendedora, mamá y amante de las flores y su energía. Mi proyecto surgió a partir de un sueño que me dio la señal de que debía comenzar con esto. 
                  <span className="text-primary font-medium"> Armo cada ramo con mucho amor y dedicación como si fuera único.</span>
                </p>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    { icon: Flower2, title: "Flores Frescas", desc: "Seleccionadas diariamente", color: "text-pink-500" },
                    { icon: Gift, title: "Hecho con Amor", desc: "Cada arreglo es único", color: "text-red-500" },
                    { icon: Truck, title: "Entrega Rápida", desc: "En tiempo y forma", color: "text-blue-500" },
                    { icon: Award, title: "Calidad Premium", desc: "Solo las mejores flores", color: "text-yellow-500" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <feature.icon className={`w-5 h-5 ${feature.color} mt-0.5`} />
                      <div>
                        <h4 className="font-medium text-sm">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button size="lg" variant="elegant" asChild className="btn-shine btn-float">
                    <Link href="/nosotros">
                      <Heart className="w-4 h-4 mr-2" />
                      Conocer Más
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="btn-float">
                    <Link href="/contacto">
                      Contactar
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <Image
                    src="/placeholder.svg?height=400&width=500&text=Nadia+con+Flores"
                    alt="Nadia con sus flores"
                    width={500}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                  <div className={imageOverlayVariants({ variant: "subtle" })}></div>
                  <Badge className={cn(
                    "absolute top-3 right-3 border-0 shadow-lg text-xs",
                    glassVariants({ variant: "card" })
                  )}>
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Emprendedora
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <SectionTag className="mx-auto">
                <Flower2 className="w-4 h-4 mr-2" />
                Servicios
              </SectionTag>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Nuestros Servicios
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Descubre todos los servicios florales que ofrecemos con amor y dedicación
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={`transform hover:scale-105 transition-all duration-300 delay-${index * 100}`}
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-[400px] rounded-2xl overflow-hidden group">
              <Image
                src="/placeholder.svg?height=400&width=1200&text=Flores+Naturales+Banner"
                alt="Banner promocional flores"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className={imageOverlayVariants({ variant: "full" })} />
              
              <div className="relative h-full flex items-center justify-center text-center text-white px-6">
                <div className="max-w-3xl space-y-6">
                  <Badge className={cn(
                    "text-white text-sm px-3 py-1",
                    glassVariants({ variant: "light" })
                  )}>
                    <Sparkles className="w-3 h-3 mr-1" />
                    Oferta Especial
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    Cada Flor Cuenta 
                    <span className="text-primary"> una Historia</span>
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto leading-relaxed">
                    Servicio personalizado de flores frescas con 
                    <span className="text-primary font-medium"> entrega gratuita</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                    <Button 
                      size="lg" 
                      variant="elegant"
                      asChild 
                      className="btn-shine"
                    >
                      <Link href="/productos">
                        <Flower2 className="w-4 h-4 mr-2" />
                        Ver Servicios
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline-white" 
                      asChild 
                      className="btn-float"
                    >
                      <Link href="/contacto">
                        Contactar
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <SectionTag className="mx-auto">
                <Star className="w-4 h-4 mr-2" />
                Servicios Destacados
              </SectionTag>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Nuestros Servicios Más Populares
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Descubre nuestros servicios florales más solicitados, hechos con amor y dedicación
              </p>
            </div>
            
            {/* Product grid with staggered animation */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`transform hover:scale-105 transition-all duration-300 delay-${index * 100} hover:shadow-xl`}
                >
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                variant="elegant"
                asChild 
                className="btn-shine btn-float"
              >
                <Link href="/productos">
                  <Flower2 className="w-4 h-4 mr-2" />
                  Ver Todos los Servicios
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Process Section - NEW */}
        <section className="bg-gradient-to-br from-muted/20 to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <SectionTag className="mx-auto">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Nuestro Proceso
                </SectionTag>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Cómo Trabajamos
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Un proceso simple y cuidadoso para brindarte la mejor experiencia floral
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    icon: MessageCircle,
                    title: "Consulta",
                    description: "Conversamos sobre tus necesidades florales",
                    color: "text-blue-500"
                  },
                  {
                    step: "02", 
                    icon: Palette,
                    title: "Diseño",
                    description: "Creamos un diseño personalizado",
                    color: "text-purple-500"
                  },
                  {
                    step: "03",
                    icon: Flower2,
                    title: "Selección",
                    description: "Seleccionamos las flores más frescas",
                    color: "text-pink-500"
                  },
                  {
                    step: "04",
                    icon: Truck,
                    title: "Entrega",
                    description: "Entregamos con amor y puntualidad",
                    color: "text-green-500"
                  }
                ].map((process, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "relative text-center p-6 rounded-xl transition-all duration-300 group hover:scale-105",
                      glassVariants({ variant: "card", hover: "medium" }),
                      `delay-${index * 100}`
                    )}
                  >
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {process.step}
                    </div>
                    <div className="mb-3 group-hover:scale-110 transition-transform duration-200 flex justify-center">
                      <process.icon className={`w-8 h-8 ${process.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{process.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <SectionTag className="mx-auto">
                  <Heart className="w-4 h-4 mr-2" />
                  Testimonios
                </SectionTag>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Lo que Dicen Nuestros Clientes
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Cada testimonio es una flor más en nuestro jardín de experiencias compartidas
                </p>
              </div>
              
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className={`p-2 transform hover:scale-105 transition-all duration-300 delay-${index * 100}`}>
                        <TestimonialCard testimonial={testimonial} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hover:bg-primary hover:text-white transition-colors" />
                <CarouselNext className="hover:bg-primary hover:text-white transition-colors" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* CTA Section - NEW */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-accent p-8 md:p-12 text-center text-white">
              <div className={imageOverlayVariants({ variant: "subtle" })}></div>
              <div className="relative z-10 space-y-6">
                <div className="space-y-3">
                  <Badge className={cn(
                    "text-white text-sm px-3 py-1",
                    glassVariants({ variant: "light" })
                  )}>
                    <Sparkles className="w-3 h-3 mr-1" />
                    ¡Oferta Limitada!
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                    ¿Listo para Transformar tu Espacio?
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto">
                    Obtén un 20% de descuento en tu primer servicio semanal
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Button 
                    size="lg" 
                    variant="elegant"
                    asChild 
                    className="btn-shine"
                  >
                    <Link href="/contacto">
                      <Heart className="w-4 h-4 mr-2" />
                      Comenzar Ahora
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline-white" 
                    asChild 
                    className="btn-float"
                  >
                    <Link href="/productos">
                      Ver Servicios
                    </Link>
                  </Button>
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
