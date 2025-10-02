"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA: {
    text: string
    href: string
  }
}

interface HeroSliderProps {
  slides: HeroSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function HeroSlider({ slides, autoPlay = true, autoPlayInterval = 6000 }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const [progress, setProgress] = useState(0)

  // Autoplay con barra de progreso
  useEffect(() => {
    if (!autoPlay) return
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + (100 / (autoPlayInterval / 50))
      })
    }, 50)

    const slideInterval = setInterval(() => {
      setIsChanging(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setProgress(0)
        setIsChanging(false)
      }, 300)
    }, autoPlayInterval)

    return () => {
      clearInterval(progressInterval)
      clearInterval(slideInterval)
    }
  }, [autoPlay, autoPlayInterval, slides.length])

  const goToSlide = (index: number) => {
    if (index === currentSlide) return
    setIsChanging(true)
    setProgress(0)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsChanging(false)
    }, 300)
  }

  const goToPrevious = () => {
    setIsChanging(true)
    setProgress(0)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setIsChanging(false)
    }, 300)
  }

  const goToNext = () => {
    setIsChanging(true)
    setProgress(0)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setIsChanging(false)
    }, 300)
  }

  if (slides.length === 0) return null
  const currentSlideData = slides[currentSlide]

  return (
    <div className="relative h-[85vh] min-h-[600px] lg:min-h-[700px] overflow-hidden rounded-3xl group shadow-2xl">
      {/* Capas de fondo con crossfade */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.image || "/1.jpg"}
              alt={slide.title}
              fill
              className={cn(
                "object-cover object-center transition-transform duration-[6000ms] ease-out",
                index === currentSlide && !isChanging ? "scale-105" : "scale-100"
              )}
              priority={index === 0}
            />
          </div>
        ))}
        
        {/* Overlays orgánicos */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00473E]/30 via-transparent to-[#00473E]/20 dark:from-[#21c1ab]/20 dark:via-transparent dark:to-[#21c1ab]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        
        {/* Destellos decorativos */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-32 right-32 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-[#00473E]/20 dark:bg-[#21c1ab]/30 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative h-full flex items-center justify-center text-center px-6 sm:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Título con animación */}
          <div 
            className={cn(
              "transition-all duration-700 ease-out",
              isChanging ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
            )}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white leading-[0.95] tracking-tight">
              <span className="inline-block transform transition-transform duration-700 hover:scale-105">
                {currentSlideData.title}
              </span>
            </h1>
            
            {/* Línea decorativa */}
            <div className="flex justify-center mt-4 mb-6">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
          </div>

          {/* Subtítulo */}
          <div 
            className={cn(
              "transition-all duration-700 ease-out delay-200",
              isChanging ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
            )}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
              {currentSlideData.subtitle}
            </p>
          </div>

          {/* Descripción */}
          <div 
            className={cn(
              "transition-all duration-700 ease-out delay-300",
              isChanging ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
            )}
          >
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              {currentSlideData.description}
            </p>
          </div>

          {/* Botones CTA con efectos avanzados */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8 sm:pt-10 transition-all duration-700 ease-out delay-500",
              isChanging ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
            )}
          >
            {/* Botón Principal */}
            <Button
              size="lg"
              className="group relative overflow-hidden h-14 px-8 sm:px-10 text-base sm:text-lg font-semibold bg-[#00473E] dark:bg-[#21c1ab] text-white border-2 border-[#00473E] dark:border-[#21c1ab] rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-[#00473E]/25 dark:hover:shadow-[#21c1ab]/25 hover:scale-105 transition-all duration-500"
              asChild
            >
              <a href={currentSlideData.primaryCTA.href}>
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Glow border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00473E] to-[#21c1ab] opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500"></div>
                
                <span className="relative z-10 flex items-center">
                  {currentSlideData.primaryCTA.text}
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
            </Button>

            {/* Botón Secundario - Glassmorphism */}
            <Button
              size="lg"
              className="group relative overflow-hidden h-14 px-8 sm:px-10 text-base sm:text-lg font-medium border-2 border-white/30 bg-white/10 text-white backdrop-blur-md rounded-2xl shadow-xl hover:bg-white/20 hover:border-white/50 hover:shadow-2xl hover:shadow-white/10 hover:scale-105 transition-all duration-500"
              asChild
            >
              <a href={currentSlideData.secondaryCTA.href}>
                {/* Efecto de brillo sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
                
                <span className="relative z-10 flex items-center">
                  <Sparkles className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  {currentSlideData.secondaryCTA.text}
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Navegación - Flechas con glassmorphism avanzado
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute left-6 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 text-white",
          "w-12 h-12 sm:w-14 sm:h-14 backdrop-blur-xl bg-white/5 border-2 border-white/20 rounded-full",
          "hover:bg-[#00473E]/20 dark:hover:bg-[#21c1ab]/20 hover:border-[#00473E]/40 dark:hover:border-[#21c1ab]/40",
          "hover:scale-110 hover:shadow-lg hover:shadow-[#00473E]/25 dark:hover:shadow-[#21c1ab]/25",
          "transition-all duration-500 ease-out",
          "opacity-60 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        )}
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-6 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 text-white",
          "w-12 h-12 sm:w-14 sm:h-14 backdrop-blur-xl bg-white/5 border-2 border-white/20 rounded-full",
          "hover:bg-[#00473E]/20 dark:hover:bg-[#21c1ab]/20 hover:border-[#00473E]/40 dark:hover:border-[#21c1ab]/40",
          "hover:scale-110 hover:shadow-lg hover:shadow-[#00473E]/25 dark:hover:shadow-[#21c1ab]/25",
          "transition-all duration-500 ease-out",
          "opacity-60 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        )}
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button> */}

      {/* Indicadores avanzados con progreso */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className="group relative transition-all duration-500 ease-out"
            onClick={() => goToSlide(index)}
            aria-label={`Ir al slide ${index + 1}`}
          >
            {/* Fondo del indicador */}
            <div
              className={cn(
                "rounded-full backdrop-blur-sm transition-all duration-500 ease-out relative overflow-hidden",
                index === currentSlide
                  ? "w-12 sm:w-16 h-2 bg-white/20 border border-white/30"
                  : "w-3 h-3 bg-white/30 hover:bg-white/50 hover:scale-125"
              )}
            >
              {/* Barra de progreso animada */}
              {index === currentSlide && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-[#00473E] to-[#21c1ab] dark:from-[#21c1ab] dark:to-[#00473E] rounded-full transition-all duration-100 ease-linear shadow-sm"
                  style={{ 
                    width: `${progress}%`,
                    boxShadow: '0 0 8px rgba(0, 71, 62, 0.5)'
                  }}
                />
              )}
            </div>
            
            {/* Glow effect en hover */}
            {index !== currentSlide && (
              <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 group-hover:scale-150 transition-all duration-300"></div>
            )}
          </button>
        ))}
      </div>
      
      
    </div>
  )
}
