"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, ShoppingCart, Menu, X } from "lucide-react"
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
        ? "bg-white dark:bg-slate-900 backdrop-blur-2xl border-b border-gray-200 dark:border-slate-700 shadow-2xl shadow-black/20 dark:shadow-slate-900/40" 
        : "bg-white dark:bg-slate-800 backdrop-blur-xl border-b border-gray-200 dark:border-slate-600 shadow-lg shadow-black/10 dark:shadow-slate-800/30"
    )}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <Image
                  src="/antonieta-logo.svg"
                  alt="Antonieta Flowers"
                  width={180}
                  height={60}
                  className="h-14 w-auto dark:brightness-0 dark:invert dark:contrast-200"
                  priority
                />
              </div>
            </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                    "border-2 hover:scale-105 hover:shadow-lg",
                    isActive
                      ? "text-white bg-[#00473E] shadow-lg border-[#00473E]"
                      : "text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-slate-800/80 border-gray-200/60 dark:border-slate-600/60 hover:bg-[#00473E]/10 hover:border-[#00473E] hover:text-[#00473E]"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme} 
                className="h-11 w-11 rounded-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </button>
            )}

            {/* Cart */}
            {cartComponent || (
              <button
                onClick={onCartOpen} 
                className="relative h-11 w-11 rounded-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 shadow-lg transition-all duration-300 hover:bg-[#00473E]/10 hover:border-[#00473E] hover:scale-105 hover:shadow-xl flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 transition-colors" />
                {cartItemsCount > 0 && (
                  <Badge
                    className={cn(
                      "absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold",
                      "bg-[#00473E] text-white border-2 border-white dark:border-slate-700",
                      "shadow-lg shadow-[#00473E]/50"
                    )}
                  >
                    {cartItemsCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "lg:hidden h-11 w-11 rounded-full transition-all duration-300 border-2 flex items-center justify-center shadow-lg hover:scale-105 hover:shadow-xl",
                isMenuOpen 
                  ? "bg-[#00473E] border-[#00473E] text-white hover:bg-[#00473E]/90" 
                  : "bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white hover:bg-[#00473E]/10 hover:border-[#00473E]"
              )}
            >
              {isMenuOpen ? 
                <X className="h-5 w-5" /> : 
                <Menu className="h-5 w-5" />
              }
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className={cn(
              "absolute top-full left-0 right-0 mt-2 mx-6 rounded-2xl",
              "bg-white dark:bg-slate-800 backdrop-blur-xl border-2 border-gray-200 dark:border-slate-600",
              "shadow-2xl shadow-black/20 dark:shadow-slate-900/40 animate-in slide-in-from-top-2 duration-300"
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
                        "hover:scale-105 hover:shadow-lg",
                        isActive
                          ? "bg-[#00473E] text-white border-[#00473E] shadow-lg"
                          : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-slate-600 hover:bg-[#00473E]/10 hover:border-[#00473E] hover:text-[#00473E]"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={cn(
                        "h-4 w-4 rounded-full transition-all duration-300",
                        isActive ? "bg-white shadow-lg" : "bg-[#00473E]"
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
