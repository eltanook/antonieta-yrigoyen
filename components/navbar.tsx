"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, ShoppingCart, Menu, X, Home, User, Phone, Gem } from "lucide-react"
import { cn } from "@/lib/utils"

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
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/nosotros", label: "Sobre Nadia", icon: User },
    { href: "/productos", label: "Servicios", icon: Gem },
    { href: "/contacto", label: "Contacto", icon: Phone },
  ]

  return (
    <>
      {/* Minimal Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        isScrolled 
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800" 
          : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-transparent"
      )}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Minimal */}
            <Link 
              href="/" 
              className="flex items-center transition-all duration-300 hover:opacity-80"
            >
              <Image
                src="/antonieta-logo.svg"
                alt="Antonieta Flowers"
                width={160}
                height={50}
                className="h-10 w-auto dark:brightness-0 dark:invert"
                priority
              />
            </Link>

            {/* Desktop Navigation - Minimal */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const Icon = link.icon
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                      "hover:bg-gray-50 dark:hover:bg-slate-700/50",
                      isActive
                        ? "text-[#00473E] dark:text-[#00C9A7] font-semibold"
                        : "text-gray-600 dark:text-gray-300"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </div>
                    
                    {/* Minimal Active Indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-[#00473E] dark:bg-[#00C9A7] rounded-full -translate-x-1/2" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right side actions - Minimal */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle - Minimal */}
              {mounted && (
                <button
                  onClick={toggleTheme} 
                  className="h-9 w-9 rounded-lg bg-transparent text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </button>
              )}

              {/* Cart - Minimal */}
              {cartComponent || (
                <button
                  onClick={onCartOpen} 
                  className="relative h-9 w-9 rounded-lg bg-transparent text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center"
                >
                  <ShoppingCart className="h-4 w-4" />
                  
                  {cartItemsCount > 0 && (
                    <Badge
                      className={cn(
                        "absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] font-medium",
                        "bg-[#00473E] text-white border border-white dark:border-slate-900"
                      )}
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                  
                  <span className="sr-only">Shopping cart</span>
                </button>
              )}

              {/* Mobile menu toggle - Minimal */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "lg:hidden h-9 w-9 rounded-lg transition-all duration-300 flex items-center justify-center",
                  isMenuOpen 
                    ? "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white" 
                    : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                )}
              >
                {isMenuOpen ? 
                  <X className="h-4 w-4" /> : 
                  <Menu className="h-4 w-4" />
                }
                <span className="sr-only">Toggle menu</span>
              </button>
            </div>
          </div>

          {/* Minimal Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className={cn(
                "fixed top-16 left-4 right-4 rounded-xl",
                "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-gray-200 dark:border-slate-700",
                "shadow-lg animate-in slide-in-from-top-4 duration-300 overflow-hidden"
              )}>
                <div className="py-2">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href
                    const Icon = link.icon
                    
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200",
                          "hover:bg-gray-50 dark:hover:bg-slate-800/50",
                          isActive
                            ? "text-[#00473E] dark:text-[#00C9A7] bg-gray-50 dark:bg-slate-800/50 font-medium"
                            : "text-gray-600 dark:text-gray-300"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <Icon className={cn(
                          "h-4 w-4 transition-colors",
                          isActive ? "text-[#00473E] dark:text-[#00C9A7]" : "text-gray-400"
                        )} />
                        <span className="text-sm">{link.label}</span>
                        
                        {/* Minimal Active Indicator */}
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 bg-[#00473E] dark:bg-[#00C9A7] rounded-full" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}