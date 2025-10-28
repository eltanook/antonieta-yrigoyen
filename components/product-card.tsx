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
    if (product.price > 0) {
      if (onAddToCart) {
        onAddToCart(product)
      }
      toast({
        title: "Producto agregado",
        description: `${product.name} se agregó al carrito`,
      })
    }
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
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          {product.image.endsWith('.mp4') ? (
            <video
              src={product.image}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              muted
              loop
              preload="metadata"
            />
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}

          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
              -{discount}%
            </Badge>
          )}

          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              size="sm"
              onClick={product.price > 0 ? handleAddToCart : () => window.open(`https://wa.me/1234567890?text=Hola%2C%20me%20interesa%20el%20${encodeURIComponent(product.name)}`, '_blank')}
              disabled={!product.inStock}
            >
              {product.price > 0 ? (
                <>
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Agregar
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087"/>
                  </svg>
                  Consultar
                </>
              )}
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href={`/productos/${product.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Ver
              </Link>
            </Button>
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge className="bg-destructive text-destructive-foreground">
                Agotado
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</div>
          <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            {product.price > 0 ? (
              <>
                <span className="font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </>
            ) : (
              <span className="text-sm text-green-600 font-medium">Consultar precio</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
