"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { SectionTag } from "@/components/section-tag"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Users, Award, Globe, Heart, Zap, Sparkles, Flower2, ArrowRight, Star, Calendar, MapPin, Clock, Quote, Target, TrendingUp, Smile, Camera, Play, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/components/product-card"

const values = [
  {
    icon: Heart,
    title: "Flores con Amor",
    description: "Cada ramo está hecho con mucho amor y dedicación, como si fuera único y especial.",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20"
  },
  {
    icon: Users,
    title: "Servicio Personalizado",
    description: "Atención personalizada y cercana para entender exactamente lo que necesitas.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20"
  },
  {
    icon: Award,
    title: "Pasión por las Flores",
    description: "Emprendedora, mamá y amante de las flores y su energía transformadora.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20"
  },
  {
    icon: Globe,
    title: "Servicios Integrales",
    description: "Desde ambientaciones hasta servicios semanales, cubrimos todas tus necesidades florales.",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20"
  },
  {
    icon: Sparkles,
    title: "Un Sueño Hecho Realidad",
    description: "Todo comenzó con un sueño que me señaló el camino hacia este hermoso proyecto.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20"
  },
  {
    icon: Zap,
    title: "Creatividad Natural",
    description: "Siempre buscamos nuevas formas de crear ambientaciones únicas y memorables.",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/20"
  },
]

const milestones = [
  {
    year: "2021",
    title: "El Sueño Revelador",
    description: "Todo comenzó con un sueño que me dio la señal de iniciar este proyecto floral",
    icon: Star,
    details: "Una visión nocturna cambió mi vida para siempre"
  },
  {
    year: "2022",
    title: "Primeros Pasos",
    description: "Comencé creando mis primeros arreglos florales con amor y dedicación",
    icon: Flower2,
    details: "10 clientes confiaron en mi visión desde el inicio"
  },
  {
    year: "2023",
    title: "Crecimiento del Negocio",
    description: "Expandí los servicios incluyendo ambientaciones y servicios semanales",
    icon: Globe,
    details: "Más de 200 proyectos completados exitosamente"
  },
  {
    year: "2024",
    title: "Reconocimiento",
    description: "500+ clientes satisfechos y una reputación sólida en el mercado",
    icon: Award,
    details: "Empresa destacada del año en el sector floral local"
  }
]

const gallery = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=300&text=Boda+Romantica",
    title: "Boda Romántica",
    category: "Eventos",
    description: "Ambientación completa con rosas y peonías"
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=400&text=Oficina+Moderna",
    title: "Oficina Moderna",
    category: "Corporativo",
    description: "Plantas y flores para espacios de trabajo"
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=300&text=Hogar+Acogedor",
    title: "Hogar Acogedor",
    category: "Residencial",
    description: "Servicio semanal de flores frescas"
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=400&text=Restaurante+Elegante",
    title: "Restaurante Elegante",
    category: "Comercial",
    description: "Ambientación permanente y mantenimiento"
  },
  {
    id: 5,
    image: "/placeholder.svg?height=400&width=300&text=Cumpleanos+Especial",
    title: "Cumpleaños Especial",
    category: "Celebraciones",
    description: "Decoración floral temática personalizada"
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=400&text=Jardin+Privado",
    title: "Jardín Privado",
    category: "Paisajismo",
    description: "Diseño y mantenimiento de espacios verdes"
  }
]

const personalQuotes = [
  {
    quote: "Las flores me enseñaron que la belleza puede nacer incluso en los momentos más difíciles.",
    context: "Reflexión personal"
  },
  {
    quote: "Cada cliente no es solo un trabajo, es una oportunidad de crear felicidad.",
    context: "Filosofía de servicio"
  },
  {
    quote: "Ser mamá y emprendedora me ha dado la fuerza para perseguir mis sueños sin límites.",
    context: "Equilibrio vida-trabajo"
  }
]

// Achievement metrics for progress bars
const achievements = [
  {
    metric: "Clientes Felices",
    value: 500,
    suffix: "+",
    icon: Heart,
    color: "bg-red-500"
  },
  {
    metric: "Arreglos Creados",
    value: 1000,
    suffix: "+",
    icon: Flower2,
    color: "bg-pink-500"
  },
  {
    metric: "Años de Experiencia",
    value: 3,
    suffix: "+",
    icon: Calendar,
    color: "bg-blue-500"
  },
  {
    metric: "Calificación Promedio",
    value: 5,
    suffix: ".0",
    icon: Star,
    color: "bg-yellow-500"
  }
]

export default function AboutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [activeQuote, setActiveQuote] = useState(0)
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<number | null>(null)
  const [progressValues, setProgressValues] = useState<{[key: string]: number}>({})
  const progressRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    setIsVisible(true)
    
    // Rotate quotes every 4 seconds
    const quoteInterval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % personalQuotes.length)
    }, 4000)

    // Animate progress bars when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            achievements.forEach((achievement, index) => {
              setTimeout(() => {
                setProgressValues(prev => ({
                  ...prev,
                  [achievement.metric]: achievement.value
                }))
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => {
      clearInterval(quoteInterval)
      observer.disconnect()
    }
  }, [])

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 left-20 w-16 h-16 bg-primary/8 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-80 right-16 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-60 left-32 w-12 h-12 bg-primary/6 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main className="relative z-10">
        {/* Hero Section with Video Background Effect */}
        <section className={`relative container mx-auto px-4 py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-bounce delay-1000"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-bounce delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <SectionTag className="mx-auto">
                <Sparkles className="w-4 h-4 mr-2" />
                Sobre Nadia
              </SectionTag>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
                Conoce Mi Historia
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                De un sueño revelador a una <span className="text-primary font-semibold">empresa floreciente</span> que transforma espacios con amor
              </p>
            </div>
            
            {/* Enhanced stats with animations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: "3+", label: "Años de Experiencia", icon: Calendar, color: "text-blue-500" },
                { number: "500+", label: "Clientes Felices", icon: Heart, color: "text-red-500" },
                { number: "1000+", label: "Arreglos Creados", icon: Flower2, color: "text-pink-500" },
                { number: "5.0", label: "Calificación Promedio", icon: Star, color: "text-yellow-500" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`group text-center p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-500 hover:scale-110 delay-${index * 200}`}
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping"></div>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center pt-8">
              <div className="animate-bounce">
                <ChevronDown className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground mt-2">Descubre mi historia</span>
            </div>
          </div>
        </section>

        {/* Enhanced Main Story Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-2 h-24 bg-gradient-to-b from-primary via-accent to-primary rounded-full"></div>
                  <SectionTag className="ml-8">
                    <Heart className="w-4 h-4 mr-2" />
                    Mi Historia
                  </SectionTag>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent leading-tight">
                  Un Sueño Convertido en 
                  <span className="relative">
                    <span className="relative z-10"> Realidad</span>
                    <div className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -z-10"></div>
                  </span>
                </h2>
                
                <div className="space-y-8">
                  {/* Rotating personal quotes */}
                  <div className="relative min-h-[120px] p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                    <Quote className="w-10 h-10 text-primary/40 absolute top-4 right-4" />
                    
                    <div className="relative z-10">
                      {personalQuotes.map((item, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 p-8 transition-all duration-1000 ${
                            index === activeQuote 
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-0 translate-y-4'
                          }`}
                        >
                          <p className="text-lg font-medium italic text-foreground/90 leading-relaxed mb-3">
                            "{item.quote}"
                          </p>
                          <p className="text-sm text-muted-foreground">— {item.context}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Quote indicators */}
                    <div className="absolute bottom-4 left-8 flex space-x-2">
                      {personalQuotes.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeQuote ? 'bg-primary w-6' : 'bg-primary/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Mi servicio abarca ambientaciones para eventos, servicios semanales de flores frescas, 
                      exhibidores y estética de jardines. Cada proyecto es una nueva oportunidad de 
                      <span className="text-primary font-semibold"> crear belleza y transmitir emociones.</span>
                    </p>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      La florería de Nadia ofrece abonos semanales o quincenales, servicios de ambientación 
                      en casas y locales, y ambientación de eventos con flores naturales. 
                      <span className="text-primary font-semibold"> Cada proyecto es especial y está hecho con el corazón.</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" asChild className="rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl transform hover:scale-105 transition-all duration-300 group">
                    <Link href="/productos">
                      <Flower2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Ver Mis Servicios
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
                    <Link href="/contacto">
                      <Heart className="w-5 h-5 mr-2" />
                      Contactar
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Enhanced image gallery */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl animate-pulse"></div>
                <div className="relative">
                  {/* Main image */}
                  <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-700">
                    <Image
                      src="/placeholder.svg?height=500&width=600&text=Nadia+Profesional"
                      alt="Nadia en su estudio"
                      width={600}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    
                    {/* Floating badges */}
                    <Badge className="absolute top-6 left-6 bg-white/95 text-primary border-0 shadow-lg">
                      <Award className="w-4 h-4 mr-2" />
                      Emprendedora 2024
                    </Badge>
                    
                    <div className="absolute bottom-6 right-6 flex space-x-2">
                      <Badge className="bg-black/50 text-white border-0 backdrop-blur-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        Local
                      </Badge>
                      <Badge className="bg-black/50 text-white border-0 backdrop-blur-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        24/7 Disponible
                      </Badge>
                    </div>

                    {/* Play button overlay for video effect */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <Button size="lg" className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                        <Play className="w-6 h-6 ml-1" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Floating secondary images */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-2xl overflow-hidden shadow-xl transform rotate-12 hover:rotate-6 transition-transform duration-500">
                    <Image
                      src="/placeholder.svg?height=128&width=128&text=Flores+1"
                      alt="Trabajo floral"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <div className="absolute -bottom-8 -left-8 w-40 h-32 rounded-2xl overflow-hidden shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="/placeholder.svg?height=128&width=160&text=Taller"
                      alt="Taller de flores"
                      width={160}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Enhanced Timeline Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-6 mb-20">
              <SectionTag className="mx-auto">
                <Calendar className="w-4 h-4 mr-2" />
                Mi Trayectoria
              </SectionTag>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                El Camino Hacia el Éxito
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Cada paso de mi viaje emprendedor ha sido guiado por la pasión y el amor por las flores
              </p>
            </div>

            <div className="relative">
              {/* Enhanced timeline line with gradient */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full hidden md:block">
                <div className="absolute top-0 w-full h-full bg-gradient-to-b from-primary/50 to-accent/50 blur-sm"></div>
              </div>
              
              <div className="space-y-20">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-12 gap-8`}>
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-center`}>
                      <div className="group p-8 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                        <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                          <Badge className="bg-gradient-to-r from-primary to-accent text-white text-lg px-4 py-2 font-bold">
                            {milestone.year}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{milestone.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4 text-lg">{milestone.description}</p>
                        <p className="text-sm text-primary font-medium italic">{milestone.details}</p>
                      </div>
                    </div>
                    
                    {/* Enhanced timeline dot with animation */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl group hover:scale-110 transition-transform duration-300">
                          <milestone.icon className="w-10 h-10 text-white group-hover:rotate-12 transition-transform" />
                        </div>
                        <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full animate-ping opacity-20"></div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Values Section */}
        <section className="bg-gradient-to-br from-muted/20 to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-6 mb-20">
                <SectionTag className="mx-auto">
                  <Heart className="w-4 h-4 mr-2" />
                  Mis Valores
                </SectionTag>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Lo que me Define
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Los valores fundamentales que guían cada aspecto de mi trabajo y mi pasión por las flores
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => {
                  const Icon = value.icon
                  return (
                    <div
                      key={index}
                      className={`group relative p-8 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl delay-${index * 100} overflow-hidden`}
                    >
                      {/* Background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className={`w-16 h-16 ${value.bgColor} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <Icon className={`h-8 w-8 ${value.color} group-hover:scale-110 transition-transform`} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">{value.description}</p>
                      </div>
                      
                      {/* Decorative corner element */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 -translate-y-10 translate-x-10 rotate-45 group-hover:scale-150 transition-transform duration-500"></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Portfolio Gallery */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-20">
              <SectionTag className="mx-auto">
                <Camera className="w-4 h-4 mr-2" />
                Mi Portafolio
              </SectionTag>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Proyectos que Inspiran
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Cada proyecto cuenta una historia única de transformación y belleza floral
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer delay-${index * 100} transform hover:-translate-y-2`}
                  onClick={() => setSelectedGalleryItem(selectedGalleryItem === item.id ? null : item.id)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                      <Badge className="bg-white/20 border-white/30 text-white w-fit mb-4 backdrop-blur-sm">
                        {item.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-white/90 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Zoom overlay */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-5 h-5 text-white" />
                  </div>

                  {/* Expanded view */}
                  {selectedGalleryItem === item.id && (
                    <div className="absolute inset-0 z-20 bg-black/95 flex items-center justify-center p-8 backdrop-blur-sm">
                      <div className="text-center text-white space-y-6 max-w-sm">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                          <Camera className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold">{item.title}</h3>
                        <Badge className="bg-gradient-to-r from-primary to-accent text-white text-lg px-4 py-2">
                          {item.category}
                        </Badge>
                        <p className="text-white/90 leading-relaxed text-lg">{item.description}</p>
                        <Button 
                          size="lg" 
                          className="rounded-full bg-white text-foreground hover:bg-white/90 transform hover:scale-105 transition-all duration-200"
                          onClick={(e) => {
                            e.stopPropagation()
                            toast({
                              title: "¡Proyecto inspirador!",
                              description: "Contacta para crear algo similar en tu espacio",
                            })
                          }}
                        >
                          <Heart className="w-5 h-5 mr-2" />
                          Crear algo similar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievement Metrics with Progress Bars */}
        <section className="bg-gradient-to-br from-muted/30 to-primary/5 py-20" ref={progressRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-6 mb-20">
                <SectionTag className="mx-auto">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Mis Logros
                </SectionTag>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Resultados que Hablan
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Métricas reales que reflejan mi compromiso absoluto con la excelencia y satisfacción del cliente
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.metric}
                    className={`group p-10 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-700 hover:scale-105 hover:shadow-2xl delay-${index * 200}`}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-6">
                        <div className={`w-16 h-16 ${achievement.color} rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <achievement.icon className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{achievement.metric}</h3>
                          <p className="text-sm text-muted-foreground">Indicador de rendimiento clave</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {progressValues[achievement.metric] || 0}{achievement.suffix}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Progreso actual</span>
                        <span className="font-bold">{progressValues[achievement.metric] || 0}{achievement.suffix}</span>
                      </div>
                      <Progress 
                        value={progressValues[achievement.metric] || 0} 
                        className="h-4 bg-muted/50"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Basado en métricas reales de los últimos 12 meses
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Quote Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative p-12 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-border/50">
              <Quote className="w-16 h-16 text-primary/30 absolute top-6 left-6" />
              <Quote className="w-16 h-16 text-primary/30 absolute bottom-6 right-6 rotate-180" />
              
              <div className="relative z-10 space-y-6">
                <p className="text-2xl md:text-3xl font-light italic text-foreground leading-relaxed">
                  "Cada flor que trabajo lleva un pedacito de mi corazón. No es solo un negocio, 
                  es mi forma de compartir amor y belleza con el mundo."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                    <Image
                      src="/placeholder.svg?height=64&width=64&text=Nadia"
                      alt="Nadia"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Nadia</div>
                    <div className="text-muted-foreground">Fundadora & Diseñadora Floral</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-accent p-12 text-center text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-white/20 border-white/30 text-white">
                    <Sparkles className="w-4 h-4 mr-2" />
                    ¡Trabajemos Juntos!
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    ¿Listo para Crear Algo Hermoso?
                  </h2>
                  <p className="text-xl text-white/90 max-w-2xl mx-auto">
                    Permíteme ayudarte a transformar tus espacios con la magia de las flores naturales
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="rounded-full bg-white text-foreground hover:bg-white/90 shadow-xl transform hover:scale-105 transition-all duration-200">
                    <Link href="/productos">
                      <Flower2 className="w-5 h-5 mr-2" />
                      Ver Mis Servicios
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-full border-white/50 text-white hover:bg-white/10 backdrop-blur-sm">
                    <Link href="/contacto">
                      <Heart className="w-5 h-5 mr-2" />
                      Contactar Ahora
                      <ArrowRight className="w-5 h-5 ml-2" />
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
