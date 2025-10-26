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

// Componente Carrusel de Imágenes Hero
interface HeroImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

function HeroImageCarousel({ images }: { images: HeroImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-avanzar el carrusel
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isPlaying]);

  // Funciones de navegación
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 2000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 2000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 2000);
  };

  return (
    <div className="relative w-full h-full group/carousel">
      {/* Imágenes del carrusel - Estilo minimalista */}
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex 
                ? 'opacity-100' 
                : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={750}
              className="object-cover w-full h-full"
              priority={index === 0}
            />
            
            {/* Overlay mínimo */}
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
        ))}
      </div>

      {/* Controles minimalistas */}
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-20">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
        >
          <ArrowRight className="w-4 h-4 rotate-180 text-slate-600 dark:text-slate-300" />
        </button>
        
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
        >
          <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </button>
      </div>

      {/* Indicadores minimalistas */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? 'w-6 h-1.5 bg-white rounded-full'
                : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/80 rounded-full'
            }`}
          />
        ))}
      </div>

      {/* Información de imagen minimalista */}
      <div className="absolute bottom-12 left-4 right-4 z-20">
        <div 
          className="transition-all duration-500"
          style={{
            transform: 'translateY(0)',
            opacity: 1
          }}
        >
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {images[currentIndex]?.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              {images[currentIndex]?.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Contador minimalista */}
      <div className="absolute top-4 right-4 z-30">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Botón de pausa minimalista */}
      <div className="absolute top-4 left-4 z-30">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center shadow-sm opacity-0 group-hover/carousel:opacity-100"
        >
          {isPlaying ? (
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-2 bg-slate-600 dark:bg-slate-300"></div>
              <div className="w-0.5 h-2 bg-slate-600 dark:bg-slate-300"></div>
            </div>
          ) : (
            <div className="w-0 h-0 border-l-[4px] border-l-slate-600 dark:border-l-slate-300 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5"></div>
          )}
        </button>
      </div>

      {/* Progress bar minimalista */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 dark:bg-slate-700/20 z-30">
        <div 
          className="h-full bg-[#00473E] dark:bg-[#21c1ab] transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / images.length) * 100}%`
          }}
        ></div>
      </div>

      {/* Estilo para mostrar el botón video solo en primera imagen */}
      <style jsx>{`
        .hero-video-button {
          opacity: ${currentIndex === 0 ? '1' : '0'} !important;
          pointer-events: ${currentIndex === 0 ? 'auto' : 'none'};
          transition: opacity 0.3s ease !important;
        }
      `}</style>
    </div>
  );
}

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

// Importar productos reales
import { getFeaturedProducts } from "@/lib/products-data";

const featuredProducts = getFeaturedProducts();

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

// Minimal Animated Counter Component
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
    return hasPlus ? `${Math.floor(value)}+` : Math.floor(value).toString();
  };

  return (
    <span
      ref={elementRef}
      className="inline-block"
    >
      {formatCount(count)}
    </span>
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

        {/* Minimal Stats Section - Limpio y elegante */}
        <section className="py-20 sm:py-24 bg-white dark:bg-slate-950">

          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              {/* Encabezado Minimalista */}
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Nuestro{" "}
                  <span className="text-[#00473E] dark:text-[#21c1ab]">
                    Impacto
                  </span>
                </h2>
                <div className="w-12 h-0.5 bg-[#00473E] dark:bg-[#21c1ab] mx-auto"></div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                  Cifras que reflejan nuestra dedicación
                </p>
              </div>

              {/* Grid de métricas minimalista */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Heart,
                    number: "500+",
                    label: "Clientes Felices",
                  },
                  {
                    icon: Star,
                    number: "5.0",
                    label: "Calificación",
                  },
                  {
                    icon: Flower2,
                    number: "1000+",
                    label: "Arreglos Entregados",
                  },
                  {
                    icon: Leaf,
                    number: "3+",
                    label: "Años de Experiencia",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center group p-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300"
                  >
                    {/* Ícono simple */}
                    <div className="w-12 h-12 bg-[#00473E]/10 dark:bg-[#21c1ab]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00473E]/20 dark:group-hover:bg-[#21c1ab]/20 transition-colors duration-300">
                      <stat.icon className="w-6 h-6 text-[#00473E] dark:text-[#21c1ab]" />
                    </div>

                    {/* Número */}
                    <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                      <span className="text-[#00473E] dark:text-[#21c1ab]">
                        {stat.number}
                      </span>
                    </div>

                    {/* Label */}
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Diseño Artístico y Elegante */}
        <section className="relative py-32 bg-gradient-to-br from-stone-50 via-cream-25 to-amber-25/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
          {/* Elementos decorativos orgánicos flotantes */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Formas orgánicas principales */}
            <div className="absolute top-12 left-16 w-96 h-96 bg-gradient-to-br from-[#00473E]/8 to-[#00473E]/3 dark:from-[#21c1ab]/8 dark:to-[#21c1ab]/3 rounded-full blur-3xl animate-pulse opacity-60"></div>
            <div className="absolute bottom-24 right-20 w-72 h-72 bg-gradient-to-tl from-amber-200/20 to-stone-200/30 dark:from-teal-400/10 dark:to-slate-700/20 rounded-full blur-2xl animate-pulse delay-1000 opacity-40"></div>
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-[#00473E]/5 to-transparent rounded-full blur-xl animate-pulse delay-2000"></div>
            
            {/* Manchas orgánicas adicionales */}
            <div className="absolute top-48 right-1/4 w-32 h-32 bg-amber-100/30 dark:bg-teal-900/20 rounded-full blur-lg opacity-50 animate-pulse delay-3000"></div>
            <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-[#00473E]/10 dark:bg-[#21c1ab]/10 rounded-full blur-md opacity-60 animate-pulse delay-4000"></div>
          </div>

          {/* Overlay de textura sutil */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent dark:via-slate-800/20 pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-20 items-start">
                
                {/* Contenido - Lado Izquierdo */}
                <div className="space-y-12 lg:pt-8">
                  {/* Tag de sección elegante */}
                  <div className="inline-flex items-center px-6 py-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-full border border-[#00473E]/20 dark:border-[#21c1ab]/20 shadow-sm">
                    <Sparkles className="w-4 h-4 mr-3 text-[#00473E] dark:text-[#21c1ab]" />
                    <span className="text-sm font-medium text-[#00473E] dark:text-[#21c1ab] tracking-wide">Nuestra Esencia</span>
                  </div>

                  {/* Título con tipografía serif elegante */}
                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 leading-[1.1] tracking-tight">
                      <span className="font-serif">Flores con</span>{" "}
                      <span className="text-[#00473E] dark:text-[#21c1ab] font-serif italic relative">
                        Propósito
                        {/* Subrayado orgánico curvo */}
                        <svg 
                          className="absolute -bottom-2 left-0 w-full h-4 text-[#00473E] dark:text-[#21c1ab] opacity-40" 
                          viewBox="0 0 200 20" 
                          fill="none"
                        >
                          <path
                            d="M5 15C30 5, 60 18, 90 12C120 6, 150 15, 195 8"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      </span>{" "}
                      <span className="font-serif">y Pasión</span>
                    </h2>
                  </div>

                  {/* Párrafo principal con mejor tipografía */}
                  <div className="space-y-8">
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      Soy <span className="font-semibold text-[#00473E] dark:text-[#21c1ab]">Nadia</span>, emprendedora, mamá y canalizadora de energía
                      a través de las flores. Este proyecto nació de{" "}
                      <span className="text-[#00473E] dark:text-[#21c1ab] font-semibold relative">
                        un sueño revelador
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00473E] to-amber-400 dark:from-[#21c1ab] dark:to-teal-300 opacity-60"></span>
                      </span>
                      {" "}que me guió hacia mi verdadero propósito.
                    </p>

                    {/* Mini Galería de Procesos - Rediseñada */}
                    <div className="grid grid-cols-3 gap-4 py-6">
                      {[
                        { src: "/bbbb.jpg", alt: "Selección cuidadosa de flores frescas" },
                        { src: "/aaaa.jpg", alt: "Trabajo artesanal en cada arreglo" },
                        { src: "/galeria/3.jpg", alt: "Momento especial de entrega" },
                      ].map((image, index) => (
                        <div
                          key={index}
                          className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-white/50 dark:border-slate-700/50"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={120}
                            height={120}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#00473E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 ring-2 ring-[#00473E]/0 dark:ring-[#21c1ab]/0 group-hover:ring-[#00473E]/30 dark:group-hover:ring-[#21c1ab]/30 rounded-2xl transition-all duration-300"></div>
                        </div>
                      ))}
                    </div>

                    {/* Cita destacada rediseñada */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#00473E]/5 via-amber-50/50 to-[#00473E]/5 dark:from-[#21c1ab]/5 dark:via-slate-800/50 dark:to-[#21c1ab]/5 rounded-3xl blur-sm"></div>
                      <blockquote className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-l-8 border-[#00473E] dark:border-[#21c1ab] rounded-2xl p-8 shadow-lg">
                        <div className="absolute top-4 left-4 text-[#00473E] dark:text-[#21c1ab] opacity-20">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z"/>
                          </svg>
                        </div>
                        <p className="text-xl font-medium text-slate-700 dark:text-slate-200 italic leading-relaxed pl-8">
                          Cada ramo es una meditación, creado con la intención
                          de ser único y especial
                        </p>
                        <div className="absolute bottom-4 right-6 w-8 h-8 rounded-full bg-[#00473E] dark:bg-[#21c1ab] flex items-center justify-center">
                          <Heart className="w-4 h-4 text-white" />
                        </div>
                      </blockquote>
                    </div>
                  </div>

                  {/* Botones CTA rediseñados */}
                  <div className="flex flex-col sm:flex-row gap-5 pt-6">
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-[#00473E] hover:bg-[#00352A] dark:bg-[#21c1ab] dark:hover:bg-[#1ba897] text-white border-0 rounded-2xl px-8 py-6 text-lg font-medium shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                      asChild
                    >
                      <Link href="/nosotros">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Heart className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                        <span className="relative z-10">Conectar con Mi Historia</span>
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="group relative overflow-hidden border-2 border-[#00473E] dark:border-[#21c1ab] hover:bg-[#00473E] dark:hover:bg-[#21c1ab] text-[#00473E] dark:text-[#21c1ab] hover:text-white rounded-2xl px-8 py-6 text-lg font-medium shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                      asChild
                    >
                      <Link href="/contacto">
                        <span className="relative z-10">Iniciar Proyecto</span>
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Hero Visual - Carrusel Minimalista */}
                <div className="relative lg:pl-8">
                  {/* Carrusel Principal */}
                  <div className="relative group">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                      {/* Carrusel de Imágenes */}
                      <HeroImageCarousel 
                        images={[
                          { src: "/loggo.jpg", alt: "Nadia - Artista floral y emprendedora", title: "Nadia", subtitle: "Creadora y Fundadora" },
                          { src: "/galeria/1.jpg", alt: "Proceso creativo de arreglos florales", title: "Proceso", subtitle: "Artesanía con Amor" },
                          { src: "/aa.jpg", alt: "Selección cuidadosa de flores frescas", title: "Selección", subtitle: "Flores de Temporada" },
                          { src: "/aaa.jpg", alt: "Momentos especiales de entrega", title: "Entrega", subtitle: "Experiencias Únicas" },
                          { src: "/bbb.jpg", alt: "Taller de creación floral", title: "Taller", subtitle: "Espacio de Creación" }
                        ]}
                      />
                    </div>

                    {/* Grid Inferior Minimalista */}
                    <div className="grid grid-cols-3 gap-3 mt-8">
                      <div className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                        <Image
                          src="/galeria/7.jpg"
                          alt="Espacio de trabajo creativo"
                          width={160}
                          height={160}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                        <Image
                          src="/galeria/8.jpg"
                          alt="Detalles florales únicos"
                          width={160}
                          height={160}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                        <Image
                          src="/galeria/1.jpg"
                          alt="Proceso artesanal detallado"
                          width={160}
                          height={160}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal de Video Elegante */}
            <dialog id="video-modal" className="modal backdrop-blur-lg">
              <div className="modal-box max-w-5xl p-0 bg-transparent shadow-none border-0">
                <form method="dialog">
                  <button className="absolute -top-4 -right-4 z-50 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:text-[#00473E] dark:hover:text-[#21c1ab] rounded-full border-2 border-white/50 dark:border-slate-700/50 hover:scale-110 transition-all duration-300 flex items-center justify-center font-bold text-lg shadow-xl">
                    ✕
                  </button>
                </form>
                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 dark:border-slate-700/20">
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
              <form method="dialog" className="modal-backdrop bg-black/60 backdrop-blur-sm">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </section>

        {/* Featured Products Section - Minimalista y Elegante */}
        <section className="py-20 sm:py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* Header Minimalista */}
              <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-[#00473E]/5 dark:bg-[#21c1ab]/5 backdrop-blur-sm rounded-full">
                  <Star className="w-4 h-4 mr-2 text-[#00473E] dark:text-[#21c1ab]" />
                  <span className="text-sm font-medium text-[#00473E] dark:text-[#21c1ab]">
                    Servicios Signature
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Experiencias Florales{" "}
                  <span className="text-[#00473E] dark:text-[#21c1ab]">
                    Más Populares
                  </span>
                </h2>
                <div className="w-12 h-0.5 bg-[#00473E] dark:bg-[#21c1ab] mx-auto"></div>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                  Servicios cuidadosamente diseñados que han tocado corazones
                </p>
              </div>

              {/* Product Grid Minimalista */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </div>

              {/* CTA Minimalista */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-[#00473E] hover:bg-[#00352A] dark:bg-[#21c1ab] dark:hover:bg-[#1ba897] text-white border-0 rounded-xl px-8 py-4 font-medium shadow-sm hover:shadow-md transition-all duration-300 group"
                  asChild
                >
                  <Link href="/productos">
                    <Flower2 className="w-5 h-5 mr-3 group-hover:rotate-6 text-white transition-transform duration-300" />
                    Explorar Catálogo Completo
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Ultra Minimalista y Refinado */}
        <section className="py-16 sm:py-20 bg-slate-50/30 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Header Ultra Minimalista */}
              <div className="text-center mb-12 space-y-3">
                <div className="inline-flex items-center px-3 py-1.5 bg-[#00473E]/8 dark:bg-[#21c1ab]/8 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 mr-2 text-[#00473E] dark:text-[#21c1ab]" />
                  <span className="text-xs font-medium text-[#00473E] dark:text-[#21c1ab] tracking-wide">
                    Proceso
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Nuestro{" "}
                  <span className="text-[#00473E] dark:text-[#21c1ab]">
                    Journey Creativo
                  </span>
                </h2>
                <div className="w-8 h-px bg-[#00473E] dark:bg-[#21c1ab] mx-auto"></div>
              </div>

              {/* Process Flow Ultra Refinado */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {/* Línea conectadora sutil */}
                <div className="hidden lg:block absolute top-8 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#00473E]/20 dark:via-[#21c1ab]/20 to-transparent"></div>

                {[
                  {
                    step: "1",
                    icon: MessageCircle,
                    title: "Escuchar",
                    description: "Tu historia, tu energía",
                  },
                  {
                    step: "2",
                    icon: Palette,
                    title: "Diseñar",
                    description: "Concepto personalizado",
                  },
                  {
                    step: "3",
                    icon: Flower2,
                    title: "Seleccionar",
                    description: "Flores perfectas",
                  },
                  {
                    step: "4",
                    icon: Truck,
                    title: "Entregar",
                    description: "Momento especial",
                  },
                ].map((process, index) => (
                  <div
                    key={index}
                    className="text-center space-y-3 group relative"
                  >
                    {/* Step Number Minimalista */}
                    <div className="relative mx-auto">
                      <div className="w-12 h-12 bg-[#00473E] dark:bg-[#21c1ab] rounded-lg flex items-center justify-center text-white font-semibold text-xs shadow-sm group-hover:scale-105 transition-all duration-300 mx-auto">
                        {process.step}
                      </div>
                    </div>

                    {/* Icono Ultra Minimalista */}
                    <div className="flex justify-center">
                      <div className="p-2 rounded-md bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:border-[#00473E]/20 dark:group-hover:border-[#21c1ab]/20 transition-all duration-300">
                        <process.icon className="w-4 h-4 text-[#00473E] dark:text-[#21c1ab]" />
                      </div>
                    </div>

                    {/* Contenido Ultra Condensado */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-foreground">
                        {process.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {process.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Descripción adicional minimalista */}
              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground font-light max-w-lg mx-auto">
                  Cada paso pensado para transformar tu visión en una experiencia floral única
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Ultra Minimalista */}
        <section className="py-16 sm:py-20 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              {/* Header Minimalista */}
              <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00473E]/5 border border-[#00473E]/10">
                  <Heart className="w-3.5 h-3.5 mr-2 text-[#00473E] dark:text-[#21c1ab]" />
                  <span className="text-xs font-medium text-[#00473E] dark:text-[#21c1ab]">
                    Testimonios
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Historias que <span className="text-[#00473E] dark:text-[#21c1ab]">Inspiran</span>
                  </h2>
                  <div className="w-12 h-0.5 bg-[#00473E] dark:bg-[#21c1ab] mx-auto"></div>
                </div>
              </div>

              {/* Testimonials Carousel Full Responsive */}
              <div className="mb-12">
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {testimonials.map((testimonial) => (
                      <CarouselItem
                        key={testimonial.id}
                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                      >
                        <div className="h-full flex items-center justify-center">
                          <div className="w-full max-w-sm mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-200/50 dark:border-slate-700/50 flex flex-col justify-between min-h-[240px] hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
                            {/* Quote Minimalista */}
                            <blockquote className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed text-center flex-grow flex items-center justify-center text-sm px-1">
                              "{testimonial.content}"
                            </blockquote>

                            {/* Author Minimalista */}
                            <div className="text-center space-y-2 mt-auto pt-4 border-t border-gray-200/50 dark:border-slate-700/50">
                              <div className="w-8 h-8 bg-[#00473E]/10 dark:bg-[#21c1ab]/10 rounded-full mx-auto flex items-center justify-center text-[#00473E] dark:text-[#21c1ab] font-semibold text-xs">
                                {testimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                  {testimonial.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {testimonial.role}
                                </p>
                              </div>
                              
                              {/* Rating Minimalista */}
                              <div className="flex justify-center gap-0.5 pt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-3 h-3 text-[#00473E] dark:text-[#21c1ab] fill-current"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hover:bg-[#00473E]/10 dark:hover:bg-[#21c1ab]/10 border border-gray-200 dark:border-slate-600 hover:border-[#00473E]/30 dark:hover:border-[#21c1ab]/30 transition-all duration-200 -left-4 sm:-left-6 w-8 h-8 shadow-sm" />
                  <CarouselNext className="hover:bg-[#00473E]/10 dark:hover:bg-[#21c1ab]/10 border border-gray-200 dark:border-slate-600 hover:border-[#00473E]/30 dark:hover:border-[#21c1ab]/30 transition-all duration-200 -right-4 sm:-right-6 w-8 h-8 shadow-sm" />
                </Carousel>
              </div>

              {/* Portfolio Gallery Ultra Minimalista */}
              <div className="space-y-10">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00473E]/5 border border-[#00473E]/10">
                    <Eye className="w-3.5 h-3.5 mr-2 text-[#00473E] dark:text-[#21c1ab]" />
                    <span className="text-xs font-medium text-[#00473E] dark:text-[#21c1ab]">
                      Galería
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Momentos en <span className="text-[#00473E] dark:text-[#21c1ab]">Flores</span>
                    </h3>
                    <div className="w-12 h-0.5 bg-[#00473E] dark:bg-[#21c1ab] mx-auto"></div>
                  </div>
                </div>

                {/* Grid Bento Style Minimalista */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                  {[
                    {
                      src: "/galeria/1.jpg",
                      alt: "Ramo de novia",
                      category: "Bodas",
                      span: "lg:col-span-2 lg:row-span-2",
                    },
                    {
                      src: "/galeria/2.jpg",
                      alt: "Evento corporativo", 
                      category: "Eventos",
                      span: "lg:col-span-2",
                    },
                    {
                      src: "/galeria/3.jpg",
                      alt: "Mesa romántica",
                      category: "Eventos", 
                      span: "lg:col-span-2",
                    },
                    {
                      src: "/galeria/4.jpg",
                      alt: "Arreglo primaveral",
                      category: "Semanal",
                      span: "",
                    },
                    {
                      src: "/galeria/5.jpg",
                      alt: "Composición minimalista",
                      category: "Eventos",
                      span: "",
                    },
                    {
                      src: "/galeria/6.jpg",
                      alt: "Jardín nativo",
                      category: "Jardines",
                      span: "lg:col-span-2",
                    },
                    
                  ].map((image, index) => (
                    <div
                      key={index}
                      className={`relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800 hover:scale-[1.02] transition-all duration-300 ${
                        image.span || ""
                      } ${index === 0 ? "aspect-square" : "aspect-[4/3]"}`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={index === 0 ? 400 : 300}
                        height={index === 0 ? 400 : 225}
                        className="object-cover w-full h-full"
                      />

                      {/* Overlay Minimalista */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                      {/* Badge Flotante */}
                      <div className="absolute top-2 left-2 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <span className="text-xs bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 px-2 py-1 rounded font-medium">
                          {image.category}
                        </span>
                      </div>

                      {/* Icono de Vista */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <div className="w-8 h-8 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
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
