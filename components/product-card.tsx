"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
  featured?: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product)
    }
    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    })
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card
      className="group overflow-hidden border-0 shadow-subtle hover:shadow-subtle-lg transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-muted isolate">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground z-10">
              -{discount}%
            </Badge>
          )}

          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground z-10">
              Destacado
            </Badge>
          )}

          <div
            className={`absolute top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 z-20 h-full gap-2 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              size="default"
              variant="elegant"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="btn-shine"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Agregar
            </Button>
            <Button 
              size="default" 
              variant="outline-white" 
              asChild 
              className="btn-float"
            >
              <Link href={`/productos/${product.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Ver
              </Link>
            </Button>
          </div>

          {!product.inStock && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60 flex items-center justify-center z-30">
              <Badge className="bg-destructive text-destructive-foreground">
                Agotado
              </Badge>
            </div>
          )}
        </div>

        <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</div>
            <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
