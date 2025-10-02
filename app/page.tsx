"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ShoppingCart } from "@/components/shopping-cart";
import { HeroSlider, type HeroSlide } from "@/components/hero-slider";
import { SectionTag } from "@/components/section-tag";
import { ProductCard, type Product } from "@/components/product-card";
import { CategoryCard, type Category } from "@/components/category-card";
import {
  TestimonialCard,
  type Testimonial,
} from "@/components/testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Star,
  Flower2,
  Leaf,
  Gift,
  Truck,
  Award,
  Zap,
  MessageCircle,
  Palette,
  ShoppingBag,
  Eye,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { imageOverlayVariants, glassVariants } from "@/lib/overlay-variants";
import { useCounter } from "@/hooks/use-counter";
import { Play } from "next/font/google";

// Mock data
const heroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Amor y Dedicación",
    subtitle: "Soy Nadia, emprendedora, mamá y amante de las flores",
    description:
      "Mi proyecto surgió a partir de un sueño que me dio la señal de que debía comenzar con esto",
    image: "/fotos-hero/1.jpg",
    primaryCTA: { text: "Ver Servicios", href: "/productos" },
    secondaryCTA: { text: "Conocer a Nadia", href: "/nosotros" },
  },
  {
    id: "2",
    title: "Ambientaciones Únicas",
    subtitle: "Para eventos y espacios especiales",
    description:
      "Cada ramo y ambientación está hecho con mucho amor y dedicación, como si fuera único",
    image: "/fotos-hero/2.jpg",
    primaryCTA: {
      text: "Ver Ambientaciones",
      href: "/productos?categoria=ambientaciones",
    },
    secondaryCTA: { text: "Contactar", href: "/contacto" },
  },
  {
    id: "3",
    title: "Servicio Semanal de Flores",
    subtitle: "Abonos semanales o quincenales",
    description:
      "Mantén tu espacio siempre lleno de vida con nuestros servicios de flores frescas",
    image: "/fotos-hero/4.jpg",
    primaryCTA: { text: "Suscribirse", href: "/productos?categoria=semanal" },
    secondaryCTA: { text: "Más Info", href: "/contacto" },
  },
];

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
];

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
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ana Martínez",
    role: "Cliente Servicio Semanal",
    content:
      "Nadia es increíble, cada semana mis flores llegan perfectas y mi casa siempre está llena de vida. Su dedicación se nota en cada detalle.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=AM",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    role: "Evento de Boda",
    content:
      "La ambientación de nuestra boda fue un sueño hecho realidad. Nadia entendió perfectamente nuestra visión y la superó. ¡Recomendada 100%!",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=CR",
  },
  {
    id: "3",
    name: "Laura García",
    role: "Diseño de Jardín",
    content:
      "Mi jardín se transformó completamente. Nadia tiene un ojo increíble para el diseño y las plantas. Cada día disfruto más mi espacio exterior.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=LG",
  },
  {
    id: "4",
    name: "María Elena Silva",
    role: "Cumpleaños Especial",
    content:
      "Para el cumpleaños de mi madre, Nadia creó un arreglo tan hermoso que todos los invitados no paraban de preguntar quién lo había hecho. Superó todas mis expectativas.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=MS",
  },
  {
    id: "5",
    name: "Roberto Fernández",
    role: "Oficina Corporativa",
    content:
      "Contratamos el servicio semanal para nuestra oficina y ha cambiado completamente el ambiente de trabajo. Los empleados están más motivados y el espacio se ve profesional.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=RF",
  },
  {
    id: "6",
    name: "Carmen López",
    role: "Aniversario de Matrimonio",
    content:
      "Nadia nos ayudó a recrear las flores de nuestra boda para nuestro 25 aniversario. Fue emotivo y perfecto. Su atención al detalle es extraordinaria.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=CL",
  },
  {
    id: "7",
    name: "Diego Morales",
    role: "Restaurante",
    content:
      "Como chef, entiendo la importancia de los detalles. Nadia logra que nuestro restaurante tenga siempre flores frescas que complementan perfectamente la experiencia culinaria.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=DM",
  },
  {
    id: "8",
    name: "Patricia Ruiz",
    role: "Baby Shower",
    content:
      "El baby shower de mi hija fue mágico gracias a Nadia. Cada detalle floral estaba pensado con amor y las fotos quedaron increíbles. ¡Mil gracias!",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80&text=PR",
  },
];

// Elegant Minimal Stat Card Component
function AnimatedStatCard({ stat, index }: { stat: any; index: number }) {
  const numericValue = parseInt(stat.number.replace(/\D/g, "")) || 0;
  const hasPlus = stat.number.includes("+");
  const isDecimal = stat.number.includes(".");

  const { count, elementRef } = useCounter({
    end: numericValue,
    duration: 1000 + index * 100,
    decimals: isDecimal ? 1 : 0,
    startOnInView: true,
  });

  const formatCount = (value: number) => {
    if (isDecimal) {
      return value.toFixed(1);
    }
    return hasPlus ? `${value}+` : value.toString();
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "text-center space-y-4 minimal-hover",
        "transition-all duration-200 ease-out",
        `animation-delay-${index * 150}`
      )}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Subtle Icon */}
      <div className="flex justify-center">
        <stat.icon
          className={cn(
            "w-5 h-5",
            stat.color,
            "opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          )}
        />
      </div>

      {/* Clean Number */}
      <div
        className="text-3xl md:text-4xl font-extralight text-foreground tracking-wide"
        style={{
          animation: count > 0 ? "count-appear 0.3s ease-out" : "none",
        }}
      >
        {formatCount(count)}
      </div>

      {/* Simple Label */}
      <div className="text-xs md:text-sm text-muted-foreground font-light tracking-wider uppercase">
        {stat.label}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const cartTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items);
  };

  const handleCartOpen = () => {
    cartTriggerRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 relative overflow-hidden">
      {/* Floating decorative elements - reduced and more subtle */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-12 h-12 bg-primary/8 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-64 right-24 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-64 left-24 w-14 h-14 bg-primary/6 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      <Navbar cartItemsCount={cartItems.length} onCartOpen={handleCartOpen} />

      <ShoppingCart
        items={cartItems}
        onUpdateCart={handleUpdateCart}
        trigger={
          <button
            ref={cartTriggerRef}
            style={{ display: "none" }}
            aria-hidden="true"
          />
        }
      />

      <main className="relative z-10 pt-16">
  {/* Hero Slider Section - Refinado */}
  <section
    className={`container mx-auto px-4 py-8 transition-all duration-1000 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
  >
    <HeroSlider slides={heroSlides} />
  </section>

  {/* Minimal Stats Section - Con paleta consistente */}
  <section className="container mx-auto px-4 py-20 bg-white dark:bg-slate-950">
    <div className="max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-20">
        <SectionTag className="mx-auto mb-4">
          <Flower2 className="w-4 h-4 mr-2 text-[#00473E] dark:text-[#21c1ab]" />
          Nuestro Impacto
        </SectionTag>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Momentos que <span className="text-[#00473E] dark:text-[#21c1ab]">inspiran confianza</span>
        </h2>
        <div className="w-16 h-1 bg-[#00473E] dark:bg-[#21c1ab] mx-auto mb-6"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
          Cifras que reflejan nuestra dedicación y el amor que ponemos en cada creación
        </p>
      </div>

      {/* Stats Grid - Colores dentro de la paleta */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: Heart,
            number: "500+",
            label: "Clientes Felices",
            color: "text-[#00473E] dark:text-[#21c1ab]",
            bgColor: "bg-[#E8F5F5] dark:bg-[#001512]"
          },
          {
            icon: Star,
            number: "5.0",
            label: "Calificación",
            color: "text-[#00473E] dark:text-[#21c1ab]",
            bgColor: "bg-[#E8F5F5] dark:bg-[#001512]"
          },
          {
            icon: Flower2,
            number: "1000+",
            label: "Flores Entregadas",
            color: "text-[#00473E] dark:text-[#21c1ab]",
            bgColor: "bg-[#E8F5F5] dark:bg-[#001512]"
          },
          {
            icon: Leaf,
            number: "3+",
            label: "Años de Experiencia",
            color: "text-[#00473E] dark:text-[#21c1ab]",
            bgColor: "bg-[#E8F5F5] dark:bg-[#001512]"
          },
        ].map((stat, index) => (
          <div 
            key={index} 
            className="text-center group p-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-lg border border-[#E8F5F5] dark:border-[#002D27]"
          >
            <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
            <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* About Section - Paleta consistente */}
  <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
    {/* Elementos decorativos sutiles */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-[#00473E]/5 dark:bg-[#21c1ab]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    
    <div className="container mx-auto px-4 relative z-10">
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Content Side - Enriquecida */}
      <div className="space-y-8">
        <div className="space-y-6">
          <SectionTag>
            <Sparkles className="w-4 h-4 mr-2 text-[#00473E] dark:text-[#21c1ab]" />
            Nuestra Esencia
          </SectionTag>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Flores con{" "}
              <span className="text-[#00473E] dark:text-[#21c1ab]">
                Propósito y Pasión
              </span>
            </h2>
            <div className="w-20 h-1 bg-[#00473E] dark:bg-[#21c1ab] rounded-full"></div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Soy Nadia, emprendedora, mamá y canalizadora de energía a través de las flores. 
              Este proyecto nació de <span className="text-[#00473E] dark:text-[#21c1ab] font-semibold">un sueño revelador</span> 
              que me guió hacia mi verdadero propósito.
            </p>

            {/* Mini Galería de Procesos */}
            <div className="grid grid-cols-3 gap-3 py-4">
              <div className="aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <Image
                  src="/galeria/8.jpg"
                  alt="Selección cuidadosa de flores frescas"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <Image
                  src="/galeria/1.jpg"
                  alt="Trabajo artesanal en cada arreglo"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <Image
                  src="/galeria/3.jpg"
                  alt="Momento especial de entrega"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            <blockquote className="border-l-4 border-[#00473E] dark:border-[#21c1ab] pl-6 py-2 bg-[#00473E]/5 dark:bg-[#21c1ab]/5 rounded-r-2xl -ml-6">
              <p className="text-lg font-medium text-foreground italic">
                "Cada ramo es una meditación, creado con la intención de ser único y especial"
              </p>
            </blockquote>
          </div>
        </div>

        {/* Feature Grid Mejorada */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: Flower2,
              title: "Frescura Garantizada",
              desc: "Selección diaria de proveedores locales",
              color: "text-[#00473E] dark:text-[#21c1ab]",
              image: "/features/frescura.jpg"
            },
            {
              icon: Gift,
              title: "Arte Personalizado",
              desc: "Diseños únicos para cada ocasión",
              color: "text-[#00473E] dark:text-[#21c1ab]",
              image: "/galeria/3.jpg"
            },
            {
              icon: Truck,
              title: "Entrega Experiencia",
              desc: "Cuidadosa y puntual en toda la ciudad",
              color: "text-[#00473E] dark:text-[#21c1ab]",
              image: "/galeria/2.jpg"
            },
            {
              icon: Award,
              title: "Calidad Consciente",
              desc: "Prácticas sostenibles y éticas",
              color: "text-[#00473E] dark:text-[#21c1ab]",
              image: "/galeria/8.jpg"
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group border border-slate-100 dark:border-slate-700 hover:border-[#00473E]/20 dark:hover:border-[#21c1ab]/20"
            >
              <div className="flex-shrink-0">
                <div className="p-3 rounded-lg bg-[#E8F5F5] dark:bg-[#001512] group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-foreground text-base mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div> */}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            size="lg"
            className="bg-[#00473E] hover:bg-[#00352A] dark:bg-[#21c1ab] dark:hover:bg-[#1ba897] text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            asChild
          >
            <Link href="/nosotros">
              <Heart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Conectar con Mi Historia
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-2 border-[#00473E] dark:border-[#21c1ab] hover:bg-[#E8F5F5] dark:hover:bg-[#001512] text-foreground transition-all duration-300 group"
            asChild
          >
            <Link href="/contacto">
              Iniciar Proyecto
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Image Side - Mejorada con Video y Más Imágenes */}
      <div className="relative">
        {/* Imagen Principal con Video Embed */}
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group">
          <Image
            src="/logoooo.jpg"
            alt="Nadia - Artista floral y emprendedora"
            width={600}
            height={750}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            priority
          />
          
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

          {/* Video Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full w-16 h-16 hover:scale-110 transition-transform duration-300 shadow-lg"
              onClick={() => {
                const modal = document.getElementById('video-modal') as HTMLDialogElement | null;
                if (modal) {
                  modal.showModal();
                }
              }}
            >
              <PlayCircle className="w-6 h-6 text-[#00473E] dark:text-[#21c1ab] ml-1" />
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-6 right-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center space-x-2 border border-slate-200 dark:border-slate-700">
            <Star className="w-4 h-4 text-[#00473E] dark:text-[#21c1ab]" />
            <span className="text-sm font-medium text-foreground">+500 Proyectos</span>
          </div>

          <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center space-x-2 border border-slate-200 dark:border-slate-700">
            <Heart className="w-4 h-4 text-[#00473E] dark:text-[#21c1ab]" />
            <span className="text-sm font-medium text-foreground">3+ Años Creando</span>
          </div>
        </div>

        {/* Mini Galería Lateral */}
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-20 hidden xl:block">
          <div className="space-y-4">
            {[
              {
                src: "/galeria/1.jpg",
                alt: "Detalle de flores frescas"
              },
              {
                src: "/galeria/2.jpg", 
                alt: "Proceso de creación"
              },
              {
                src: "/galeria/3.jpg",
                alt: "Momento de entrega especial"
              }
            ].map((image, index) => (
              <div 
                key={index}
                className="w-20 h-20 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Grid de Imágenes Inferior */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Image
              src="/galeria/1.jpg"
              alt="Taller de Nadia trabajando"
              width={200}
              height={200}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Image
              src="/galeria/2.jpg"
              alt="Herramientas y materiales de trabajo"
              width={200}
              height={200}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Elemento decorativo */}
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#00473E]/10 dark:bg-[#21c1ab]/10 rounded-2xl -z-10"></div>
      </div>
    </div>
  </div>

  {/* Modal de Video */}
  <dialog id="video-modal" className="modal">
    <div className="modal-box max-w-4xl p-0 bg-transparent shadow-none">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 text-white">
          ✕
        </button>
      </form>
      <div className="aspect-video rounded-2xl overflow-hidden">
        <video 
          className="w-full h-full object-cover"
          controls
          autoPlay
          poster="/video-poster.jpg"
        >
          <source src="/videos/nuestra-historia.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento video.
        </video>
      </div>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</div>
  </section>

  {/* Featured Products Section */}
  <section className="py-24 bg-white dark:bg-slate-950">
    <div className="container mx-auto px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <SectionTag className="mx-auto">
            <Star className="w-4 h-4 mr-2 text-[#00473E] dark:text-[#21c1ab]" />
            Servicios Signature
          </SectionTag>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Experiencias Florales{" "}
              <span className="text-[#00473E] dark:text-[#21c1ab]">
                Más Populares
              </span>
            </h2>
            <div className="w-24 h-1 bg-[#00473E] dark:bg-[#21c1ab] mx-auto rounded-full"></div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Servicios cuidadosamente diseñados que han tocado corazones y creado momentos inolvidables
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group transform hover:scale-105 transition-all duration-500 hover:shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-[#00473E] hover:bg-[#00352A] dark:bg-[#21c1ab] dark:hover:bg-[#1ba897] text-white shadow-lg hover:shadow-xl transition-all duration-300 group px-8"
            asChild
          >
            <Link href="/productos">
              <Flower2 className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
              Explorar Catálogo Completo
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>

  {/* Process Section */}
  <section className="py-24 bg-slate-50 dark:bg-slate-900">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <SectionTag className="mx-auto">
            <Sparkles className="w-4 h-4 mr-2 text-[#00473E] dark:text-[#21c1ab]" />
            Nuestra Metodología
          </SectionTag>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              El Arte del{" "}
              <span className="text-[#00473E] dark:text-[#21c1ab]">
                Proceso Creativo
              </span>
            </h2>
            <div className="w-20 h-1 bg-[#00473E] dark:bg-[#21c1ab] mx-auto rounded-full"></div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Un journey cuidadosamente diseñado para transformar tu visión en una experiencia floral memorable
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Línea conectadora */}
          <div className="hidden lg:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-[#00473E] dark:bg-[#21c1ab] -translate-y-1/2"></div>
          
          {[
            {
              step: "01",
              icon: MessageCircle,
              title: "Conexión Inicial",
              description: "Escuchamos tu historia y entendemos la energía que quieres transmitir",
            },
            {
              step: "02",
              icon: Palette,
              title: "Diseño Energético",
              description: "Creamos un concepto que armoniza colores, formas y significados",
            },
            {
              step: "03",
              icon: Flower2,
              title: "Selección Consciente",
              description: "Elegimos cada flor considerando frescura, temporada y simbolismo",
            },
            {
              step: "04",
              icon: Truck,
              title: "Entrega con Alma",
              description: "Cada entrega es una experiencia cuidadosa y memorable",
            },
          ].map((process, index) => (
            <div key={index} className="text-center space-y-6 group relative">
              {/* Step Circle */}
              <div className="relative mx-auto">
                <div className="w-20 h-20 bg-[#00473E] dark:bg-[#21c1ab] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto">
                  {process.step}
                </div>
              </div>

              {/* Icono */}
              <div className="flex justify-center">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm group-hover:shadow-md transition-all duration-300 border border-slate-200 dark:border-slate-700">
                  <process.icon className="w-8 h-8 text-[#00473E] dark:text-[#21c1ab]" />
                </div>
              </div>

              {/* Contenido */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-[#00473E] dark:group-hover:text-[#21c1ab] transition-colors duration-300">
                  {process.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {process.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* Testimonials Section */}
  <section className="py-24 bg-white dark:bg-slate-950">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <SectionTag className="mx-auto">
            <Heart className="w-4 h-4 mr-2 text-[#00473E] dark:text-[#21c1ab]" />
            Voces de Confianza
          </SectionTag>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Historias que{" "}
              <span className="text-[#00473E] dark:text-[#21c1ab]">
                Inspiran
              </span>
            </h2>
            <div className="w-24 h-1 bg-[#00473E] dark:bg-[#21c1ab] mx-auto rounded-full"></div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experiencias reales de clientes que han vivido la magia de nuestras creaciones
          </p>
        </div>

        {/* Testimonials Carousel */}
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
                <CarouselItem
                  key={testimonial.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-4 h-full">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 h-full flex flex-col justify-between min-h-[320px] hover:shadow-xl transition-all duration-500 group">
                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-[#00473E] dark:text-[#21c1ab] fill-current transform group-hover:scale-110 transition-transform duration-300"
                            style={{ transitionDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-foreground/80 italic mb-8 leading-relaxed text-center flex-grow flex items-center justify-center text-lg">
                        "{testimonial.content}"
                      </blockquote>

                      {/* Author */}
                      <div className="text-center space-y-2 mt-auto">
                        <div className="w-12 h-12 bg-[#00473E] dark:bg-[#21c1ab] rounded-full mx-auto mb-2 flex items-center justify-center text-white font-semibold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h4 className="font-bold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-[#00473E] dark:text-[#21c1ab] font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hover:bg-[#00473E] hover:text-white border-2 hover:border-[#00473E] transition-all duration-300 -left-12 dark:hover:bg-[#21c1ab] dark:hover:border-[#21c1ab]" />
            <CarouselNext className="hover:bg-[#00473E] hover:text-white border-2 hover:border-[#00473E] transition-all duration-300 -right-12 dark:hover:bg-[#21c1ab] dark:hover:border-[#21c1ab]" />
          </Carousel>
        </div>

        {/* Portfolio Gallery - PERFECCIONADA */}
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <SectionTag className="mx-auto">
              <Sparkles className="w-4 h-4 mr-2 text-[#00473E] dark:text-[#21c1ab]" />
              Galería Viviente
            </SectionTag>

            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Momentos Capturados en{" "}
                <span className="text-[#00473E] dark:text-[#21c1ab]">
                  Flores
                </span>
              </h3>
              <div className="w-32 h-1 bg-[#00473E] dark:bg-[#21c1ab] mx-auto rounded-full"></div>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Cada imagen es un testimonio visual del amor, la dedicación y los momentos únicos que hemos tenido el honor de crear
            </p>
          </div>

          {/* Enhanced Masonry Grid - PERFECCIONADA */}
          <div className="space-y-8">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {[
                {
                  src: "/galeria/1.jpg",
                  alt: "Ramo de novia con flores de estación",
                  category: "Bodas",
                  featured: true,
                  aspect: "aspect-[3/4]"
                },
                {
                  src: "/galeria/2.jpg",
                  alt: "Ambientación floral para evento corporativo",
                  category: "Eventos",
                  featured: false,
                  aspect: "aspect-square"
                },
                {
                  src: "/galeria/3.jpg",
                  alt: "Mesa romántica con centro floral",
                  category: "Eventos",
                  featured: true,
                  aspect: "aspect-[4/3]"
                },
                {
                  src: "/galeria/4.jpg",
                  alt: "Arreglo primaveral con flores locales",
                  category: "Entregas Semanales",
                  featured: false,
                  aspect: "aspect-square"
                },
                {
                  src: "/galeria/5.jpg",
                  alt: "Composición minimalista para mesa",
                  category: "Eventos",
                  featured: false,
                  aspect: "aspect-[3/2]"
                },
                {
                  src: "/galeria/6.jpg",
                  alt: "Jardín diseñado con especies nativas",
                  category: "Proyectos Especiales",
                  featured: true,
                  aspect: "aspect-[4/5]"
                },
                {
                  src: "/galeria/7.jpg",
                  alt: "Servicio de flores premium semanal",
                  category: "Suscripciones",
                  featured: false,
                  aspect: "aspect-square"
                },
                {
                  src: "/galeria/8.jpg",
                  alt: "Decoración única para boda íntima",
                  category: "Bodas",
                  featured: true,
                  aspect: "aspect-[3/4]"
                },
              ].map((image, index) => (
                <div
                  key={index}
                  className={`relative break-inside-avoid rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${image.aspect}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={500}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay Mejorado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content Overlay Mejorado */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-white space-y-2">
                      <Badge className="bg-[#00473E] dark:bg-[#21c1ab] text-white border-0 text-xs font-medium">
                        {image.category}
                      </Badge>
                      <h4 className="font-semibold text-sm leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-2">
                        {image.alt}
                      </h4>
                    </div>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                  
                  {/* Quick View Button */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                    <Button 
                      size="sm" 
                      className="bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30 h-8 w-8 p-0"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Mejorado */}
            <div className="text-center pt-12">
              <Button
                size="lg"
                className="bg-[#00473E] hover:bg-[#00352A] dark:bg-[#21c1ab] dark:hover:bg-[#1ba897] text-white shadow-lg hover:shadow-xl transition-all duration-300 group px-8 py-6 border-0"
                asChild
              >
                <Link href="/galeria">
                  <Eye className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Explorar Galería Completa
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
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
  );
}
