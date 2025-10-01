"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
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

export function HeroSlider({ slides, autoPlay = true, autoPlayInterval = 5000 }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, slides.length])

  const goToSlide = (index: number) => setCurrentSlide(index)
  const goToPrevious = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length)

  if (slides.length === 0) return null
  const currentSlideData = slides[currentSlide]

  return (
    <div className="relative h-[60vh] sm:h-[75vh] min-h-[400px] sm:min-h-[520px] overflow-hidden rounded-3xl group shadow-2xl">
      {/* Imagen con overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentSlideData.image || "/1.jpg"}
          alt={currentSlideData.title}
          fill
          className="object-cover object-center transition-transform duration-[2500ms] ease-in-out group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Contenido */}
      <div className="relative h-full flex items-center justify-center text-center px-6 sm:px-10">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-snug tracking-wide drop-shadow-xl">
            {currentSlideData.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
            {currentSlideData.subtitle}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-snug font-light drop-shadow">
            {currentSlideData.description}
          </p>

          {/* Botones con verde #00473E */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
            <Button
              size="sm"
              className="h-9 px-6 text-sm font-semibold bg-[#00473E] text-white shadow-lg hover:bg-[#03695B] hover:scale-105 hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href={currentSlideData.primaryCTA.href}>
                {currentSlideData.primaryCTA.text}
              </a>
            </Button>
            <Button
              size="sm"
              className="h-9 px-6 text-sm font-medium border border-white/50 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/70 transition-all duration-300"
              asChild
            >
              <a href={currentSlideData.secondaryCTA.href}>
                {currentSlideData.secondaryCTA.text}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Flechas más separadas */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white",
          "w-6 h-6 sm:w-7 sm:h-7 backdrop-blur-md border border-white/20 rounded-full",
          "hover:bg-white/20 hover:scale-110 transition-all duration-300",
          "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        )}
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white",
          "w-6 h-6 sm:w-7 sm:h-7 backdrop-blur-md border border-white/20 rounded-full",
          "hover:bg-white/20 hover:scale-110 transition-all duration-300",
          "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        )}
        onClick={goToNext}
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </Button>

      {/* Indicadores con verde activo */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className="group transition-all duration-300 ease-out"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={cn(
                "rounded-full transition-all duration-500 ease-out",
                index === currentSlide
                  ? "w-8 h-1.5 bg-[#00473E] shadow-md"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
