"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { SectionTag } from "@/components/section-tag"
import { ProductCard, type Product } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ShoppingCartIcon, Star, Minus, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { productsData, getRecommendedProducts, type ProductDetail } from "@/lib/products-data"



interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = React.use(params)
  const router = useRouter()
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [selectedMedia, setSelectedMedia] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const product = productsData[id]
  const recommendedProducts = getRecommendedProducts()

  // Combinar videos y galería de imágenes en un solo array de medios
  const mediaItems = []
  if (product?.videos) {
    product.videos.forEach(video => mediaItems.push({ src: video, type: 'video' }))
  }
  if (product?.gallery) {
    product.gallery.forEach(image => mediaItems.push({ src: image, type: 'image' }))
  }
  // Si no hay medios, usar la imagen principal (excepto si es el marcador "video")
  if (mediaItems.length === 0 && product?.image && product.image !== "video") {
    const isVideo = product.image.endsWith('.mp4')
    mediaItems.push({ src: product.image, type: isVideo ? 'video' : 'image' })
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button onClick={() => router.push("/productos")}>Volver a productos</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      setCartItems((prev) => [...prev, product])
    }
    toast({
      title: "Producto agregado",
      description: `${quantity}x ${product.name} agregado al carrito`,
    })
  }

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items)
  }

  const handleAddToCartFromRecommended = (product: Product) => {
    setCartItems((prev) => [...prev, product])
  }

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-slate-900 relative">
      {/* Minimal geometric background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-8 w-2 h-2 bg-[#00473E]/10 rounded-full"></div>
        <div className="absolute top-40 right-12 w-1 h-1 bg-[#00473E]/15 rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-[#00473E]/8 rounded-full"></div>
        <div className="absolute bottom-64 right-8 w-2 h-2 bg-[#00473E]/12 rounded-full"></div>
      </div>

      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 relative z-10">
        {/* Back Button Minimalista */}
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#00473E] dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Media */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-gray-200/50 dark:border-slate-700/50">
              {mediaItems.length > 0 ? (
                mediaItems[selectedMedia]?.type === 'video' ? (
                  <video
                    src={mediaItems[selectedMedia]?.src}
                    controls
                    className="object-cover w-full h-full"
                    width={600}
                    height={600}
                  />
                ) : (
                  <Image
                    src={mediaItems[selectedMedia]?.src || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No hay medios disponibles
                </div>
              )}
            </div>

            {/* Thumbnail Gallery - Solo mostrar si hay más de un medio */}
            {mediaItems.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {mediaItems.map((media, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedMedia(index)}
                  className={`aspect-square rounded-lg overflow-hidden transition-all duration-200 relative ${
                    selectedMedia === index 
                      ? "ring-2 ring-[#00473E] ring-offset-2 dark:ring-offset-slate-900" 
                      : "hover:opacity-75"
                  }`}
                >
                  {media.type === 'video' ? (
                    <div className="relative w-full h-full">
                      <video
                        src={media.src}
                        className="object-cover w-full h-full bg-gray-100 dark:bg-slate-700"
                        width={120}
                        height={120}
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={media.src || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={120}
                      height={120}
                      className="object-cover w-full h-full bg-gray-100 dark:bg-slate-700"
                    />
                  )}
                </button>
              ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00473E]/5 border border-[#00473E]/10">
                <span className="text-xs font-medium text-[#00473E]">{product.category}</span>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(128 reseñas)</span>
                </div>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="py-3 border-y border-gray-200 dark:border-slate-700">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                ✓ Disponible bajo pedido
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Descripción</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            {product.colors && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-900 dark:text-white">Color:</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="h-10 border-gray-200 dark:border-slate-600 focus:border-[#00473E] dark:focus:border-[#00473E]">
                    <SelectValue placeholder="Selecciona un color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color: string) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            {product.category === "Ambientaciones" ? (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-900 dark:text-white">Cotización:</label>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Las ambientaciones se cotizan según medidas y requerimientos específicos.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-900 dark:text-white">Cantidad:</label>
                <div className="flex items-center gap-3 w-fit bg-gray-50 dark:bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-md bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                  </button>
                  <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                    className="w-8 h-8 rounded-md bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() => window.open('https://wa.me/1234567890?text=Hola%2C%20me%20interesa%20el%20' + encodeURIComponent(product.name), '_blank')}
                className="w-full h-12 bg-[#00473E] hover:bg-[#00473E]/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087"/>
                </svg>
                Consultar por WhatsApp
              </button>
              <p className="text-sm text-gray-500 text-center">
                Contactanos para consultar disponibilidad y precios
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl border border-gray-200/50 dark:border-slate-700/50 p-5">
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Especificaciones</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]: [string, string]) => (
                  <div
                    key={key}
                    className="flex justify-between items-start py-2 border-b border-gray-100 dark:border-slate-700 last:border-0"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{key}:</span>
                    <span className="text-sm text-gray-900 dark:text-white text-right max-w-[180px]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <section className="pt-8 border-t border-gray-200 dark:border-slate-700">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00473E]/5 border border-[#00473E]/10">
              <span className="text-xs font-medium text-[#00473E]">Recomendados</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Servicios Relacionados</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Otros servicios que podrían interesarte</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCartFromRecommended} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
