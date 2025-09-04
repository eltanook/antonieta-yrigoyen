"use client"

import { useState, useEffect, useRef } from 'react'

interface UseCounterProps {
  end: number
  duration?: number
  startOnInView?: boolean
  decimals?: number
}

export function useCounter({ 
  end, 
  duration = 2000, 
  startOnInView = true,
  decimals = 0 
}: UseCounterProps) {
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!startOnInView) {
      animateCount()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
          animateCount()
        }
      },
      { threshold: 0.3 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [startOnInView, isInView])

  const animateCount = () => {
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (end - startValue) * easeOutQuart

      setCount(Number(currentValue.toFixed(decimals)))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  return { count, elementRef }
}
