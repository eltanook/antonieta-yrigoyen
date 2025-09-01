"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
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
}

export function ShoppingCart({ items, onUpdateCart, trigger }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

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

    const updatedItems: Product[] = []
    cartItems.forEach((item) => {
      if (item.id === productId) {
        for (let i = 0; i < newQuantity; i++) {
          updatedItems.push(item)
        }
      } else {
        for (let i = 0; i < item.quantity; i++) {
          updatedItems.push(item)
        }
      }
    })
    onUpdateCart(updatedItems)
  }

  const removeItem = (productId: string) => {
    const updatedItems = items.filter((item) => item.id !== productId)
    onUpdateCart(updatedItems)
    toast({
      title: "Producto eliminado",
      description: "El producto se eliminó del carrito",
    })
  }

  const clearCart = () => {
    onUpdateCart([])
    toast({
      title: "Carrito vaciado",
      description: "Se eliminaron todos los productos del carrito",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  const generateWhatsAppMessage = () => {
    let message = "¡Hola! Me interesa realizar el siguiente pedido:\n\n"

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Precio unitario: $${item.price.toFixed(2)}\n`
      message += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`
    })

    message += `Subtotal: $${subtotal.toFixed(2)}\n`
    message += `Envío: ${shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}\n`
    message += `Total: $${total.toFixed(2)}\n\n`
    message += "¿Podrían confirmar la disponibilidad y el proceso de pago?"

    return encodeURIComponent(message)
  }

  const handleCheckout = () => {
    const whatsappMessage = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMessage}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
    toast({
      title: "Redirigiendo a WhatsApp",
      description: "Te conectaremos con nuestro equipo de ventas",
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <ShoppingBag className="h-4 w-4" />
            {items.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {items.length}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Carrito de Compras ({items.length})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">Tu carrito está vacío</h3>
              <p className="text-muted-foreground">Agrega algunos productos para comenzar</p>
            </div>
            <Button onClick={() => setIsOpen(false)} className="rounded-full">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="shadow-subtle">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="h-6 w-6 rounded-full"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 rounded-full"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 rounded-full"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} c/u</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            {/* Cart Summary */}
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < 50 && shipping > 0 && (
                  <p className="text-xs text-muted-foreground">Envío gratis en compras mayores a $50</p>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="elegant" onClick={handleCheckout} className="w-full btn-shine" size="lg">
                  <FaWhatsapp className="h-4 w-4 mr-2" />
                  Finalizar por WhatsApp
                </Button>
                <Button variant="outline" onClick={clearCart} className="w-full btn-float" size="default">
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
