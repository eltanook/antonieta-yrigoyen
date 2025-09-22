"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { imageOverlayVariants, glassVariants } from "@/lib/overlay-variants"

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

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  if (slides.length === 0) return null

  const currentSlideData = slides[currentSlide]

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden rounded-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentSlideData.image || "/1.jpg"}
          alt={currentSlideData.title}
          fill
          className="object-cover"
          priority
        />
        <div className={imageOverlayVariants({ variant: "simple" })} />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {currentSlideData.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            {currentSlideData.subtitle}
          </p>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            {currentSlideData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button 
              size="lg" 
              variant="elegant"
              asChild 
              className="btn-shine"
            >
              <a href={currentSlideData.primaryCTA.href}>{currentSlideData.primaryCTA.text}</a>
            </Button>
            <Button
              size="lg"
              variant="outline-white"
              asChild
              className="btn-float"
            >
              <a href={currentSlideData.secondaryCTA.href}>{currentSlideData.secondaryCTA.text}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 text-white btn-float w-12 h-12",
          "backdrop-blur-sm border border-white/20 hover:border-white/40 hover:scale-110 hover:bg-white/10 transition-all duration-300"
        )}
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 text-white btn-float w-12 h-12",
          "backdrop-blur-sm border border-white/20 hover:border-white/40 hover:scale-110 hover:bg-white/10 transition-all duration-300"
        )}
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`relative group transition-all duration-500 ease-out ${
              index === currentSlide 
                ? "w-8 h-3" 
                : "w-3 h-3 hover:w-4"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-500 backdrop-blur-sm ${
              index === currentSlide 
                ? "bg-[#00473E] shadow-lg shadow-[#00473E]/50 border-2 border-white/30" 
                : "bg-white/40 hover:bg-[#00473E]/80 border border-white/50 group-hover:border-white/70 group-hover:shadow-md"
            }`} />
            {index === currentSlide && (
              <div className="absolute inset-0 rounded-full bg-[#00473E]/30 animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
