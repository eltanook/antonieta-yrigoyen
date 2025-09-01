"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, ShoppingCart, Menu, X, Flower2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { glassVariants } from "@/lib/overlay-variants"

interface NavbarProps {
  cartItemsCount?: number
  onCartOpen?: () => void
  cartComponent?: React.ReactNode
}

export function Navbar({ cartItemsCount = 0, onCartOpen, cartComponent }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Sobre Nadia" },
    { href: "/productos", label: "Servicios" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
      isScrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-b border-gray-200/80 dark:border-gray-800/80 shadow-2xl shadow-black/20" 
        : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60 shadow-lg shadow-black/10"
    )}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
            {/* Logo Mejorado */}
            <Link 
              href="/" 
              className="flex items-center space-x-4 transition-all duration-300"
            >
              <div className="relative">
                
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-pink-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-pink-500 rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Nadia Flores
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 -mt-1">
                  Arreglos florales
                </span>
              </div>
            </Link>

          {/* Desktop Navigation Mejorada */}
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                    "border-2",
                    isActive
                      ? "text-white bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30 border-rose-400"
                      : "text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-800/80 border-gray-200/60 dark:border-gray-700/60"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 opacity-90"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></div>
                    </>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right side actions Mejoradas */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Mejorado */}
            {mounted && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme} 
                className={cn(
                  "h-11 w-11 rounded-full transition-all duration-300 border-2",
                  "bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300",
                  "border-gray-200/60 dark:border-gray-700/60 shadow-lg"
                )}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-700 dark:text-gray-300" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-700 dark:text-gray-300" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            {/* Cart Mejorado */}
            {cartComponent || (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onCartOpen} 
                className={cn(
                  "relative h-11 w-11 rounded-full transition-all duration-300 border-2",
                  "bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300",
                  "border-gray-200/60 dark:border-gray-700/60 shadow-lg"
                )}
              >
                <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                {cartItemsCount > 0 && (
                  <Badge
                    className={cn(
                      "absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold",
                      "bg-rose-500 text-white border-2 border-white dark:border-gray-900",
                      "shadow-lg shadow-rose-500/50"
                    )}
                  >
                    {cartItemsCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            )}

            {/* Mobile menu toggle Mejorado */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden h-11 w-11 rounded-full transition-all duration-300 border-2",
                isMenuOpen 
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 border-rose-400 text-white shadow-lg shadow-rose-500/30" 
                  : "bg-gray-100/80 dark:bg-gray-800/80 border-gray-200/60 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 shadow-lg"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 
                <X className="h-5 w-5" /> : 
                <Menu className="h-5 w-5" />
              }
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Mejorada */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className={cn(
              "absolute top-full left-0 right-0 mt-2 mx-6 rounded-2xl",
              "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-2 border-gray-200/80 dark:border-gray-800/80",
              "shadow-2xl shadow-black/20 animate-in slide-in-from-top-2 duration-300"
            )}>
              <div className="p-8 space-y-4">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center space-x-4 p-5 rounded-xl transition-all duration-300 border-2",
                        isActive
                          ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30 border-rose-400"
                          : "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200/60 dark:border-gray-700/60"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={cn(
                        "h-4 w-4 rounded-full transition-all duration-300",
                        isActive ? "bg-white shadow-lg" : "bg-rose-500/70"
                      )}></div>
                      <span className="font-medium text-lg">{link.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
