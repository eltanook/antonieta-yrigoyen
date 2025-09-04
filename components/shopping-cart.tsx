"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Plus, Minus, ShoppingBag, ShoppingCart as ShoppingCartIcon } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/components/product-card"

interface CartItem extends Product {
  quantity: number
}

interface ShoppingCartProps {
  items: Product[]
  onUpdateCart: (items: Product[]) => void
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ShoppingCart({ items, onUpdateCart, trigger, open, onOpenChange }: ShoppingCartProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const { toast } = useToast()
  
  // Use external open state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalIsOpen
  const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalIsOpen

  // Group items by id and count quantities
  const cartItems: CartItem[] = items.reduce((acc, item) => {
    const existingItem = acc.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      acc.push({ ...item, quantity: 1 })
    }
    return acc
  }, [] as CartItem[])

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      return
    }

    const currentItem = cartItems.find((item) => item.id === productId)
    if (!currentItem) return

    const currentQuantity = currentItem.quantity
    const difference = newQuantity - currentQuantity

    if (difference > 0) {
      // Add items
      const newItems = Array(difference).fill(currentItem)
      onUpdateCart([...items, ...newItems])
    } else {
      // Remove items
      const itemsToRemove = Math.abs(difference)
      let removedCount = 0
      const newItems = items.filter((item) => {
        if (item.id === productId && removedCount < itemsToRemove) {
          removedCount++
          return false
        }
        return true
      })
      onUpdateCart(newItems)
    }
  }

  const removeItem = (productId: string) => {
    const newItems = items.filter((item) => item.id !== productId)
    onUpdateCart(newItems)
    toast({
      title: "✅ Eliminado",
      description: "Producto eliminado del carrito",
      duration: 2000,
    })
  }

  const clearCart = () => {
    onUpdateCart([])
    toast({
      title: "🗑️ Carrito vaciado",
      description: "Todos los productos fueron eliminados",
      duration: 2000,
    })
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 50 ? 0 : 10
  const total = subtotal + shipping

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    const orderDetails = cartItems
      .map((item) => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${orderDetails}\n\nSubtotal: $${subtotal.toFixed(2)}\nEnvío: ${shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}\nTotal: $${total.toFixed(2)}\n\n¡Gracias!`

    const phoneNumber = "+5491234567890"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    
    toast({
      title: "🚀 Redirigiendo a WhatsApp",
      description: "Te estamos conectando para finalizar tu pedido",
      duration: 3000,
    })
    
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <button className="relative h-11 w-11 rounded-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 shadow-lg transition-all duration-300 hover:bg-pink-50 dark:hover:bg-pink-900 hover:border-pink-300 dark:hover:border-pink-600 hover:scale-105 hover:shadow-xl flex items-center justify-center">
            <ShoppingCartIcon className="h-5 w-5 transition-colors" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 dark:bg-pink-400 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold border-2 border-white dark:border-slate-700 shadow-lg shadow-pink-300/50 dark:shadow-pink-400/50">
                {items.length}
              </span>
            )}
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-white dark:bg-slate-900">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <ShoppingBag className="h-5 w-5" />
            Carrito ({items.length})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tu carrito está vacío</h3>
              <p className="text-gray-500 dark:text-gray-400">Agrega algunos productos para comenzar</p>
            </div>
            <Button 
              onClick={() => setIsOpen(false)} 
              variant="outline"
              className="mt-4"
            >
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full max-h-[80vh]">
            {/* Cart Items */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-1">
                <div className="space-y-3 py-4 pr-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm line-clamp-2 text-gray-900 dark:text-white">{item.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">${item.price.toFixed(2)} c/u</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4 pb-6 space-y-4 bg-white dark:bg-slate-900">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Envío</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                    {shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < 50 && shipping > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Envío gratis en compras mayores a $50
                  </p>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Button 
                  onClick={handleCheckout} 
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white" 
                  size="lg"
                >
                  <FaWhatsapp className="h-4 w-4 mr-2" />
                  Finalizar por WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearCart} 
                  className="w-full" 
                  size="default"
                >
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
