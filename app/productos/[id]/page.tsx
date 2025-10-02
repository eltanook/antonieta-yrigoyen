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

const productData: Record<
  string,
  Product & { gallery: string[]; description: string; specifications: Record<string, string>; colors?: string[] }
> = {
  "1": {
    id: "1",
    name: "Ramo de Rosas Rojas Premium",
    price: 45.99,
    originalPrice: 55.99,
    image: "/a.jpg",
    category: "Ramos",
    inStock: true,
    featured: true,
    gallery: [
      "/a.jpg",
      "/placeholder.svg?height=600&width=600&text=Rosas+Detail",
      "/placeholder.svg?height=600&width=600&text=Ramo+Envoltorio",
      "/placeholder.svg?height=600&width=600&text=Rosas+Colores",
    ],
    description:
      "Hermoso ramo de rosas rojas premium, símbolo de amor y pasión. Cada rosa es cuidadosamente seleccionada por su frescura y belleza. Perfecto para declaraciones de amor, aniversarios y momentos especiales que merecen ser recordados para siempre.",
    specifications: {
      "Cantidad de rosas": "12 unidades",
      "Tipo de rosa": "Rosa roja premium",
      "Envoltorio": "Papel de seda elegante",
      "Duración": "7-10 días",
      "Cuidados": "Agua fresca diaria",
      "Ocasión": "Amor, aniversarios",
    },
    colors: ["Rojo", "Rosa", "Blanco", "Amarillo"],
  },
  "2": {
    id: "2",
    name: "Ambientación Completa para Bodas",
    price: 299.99,
    originalPrice: 349.99,
    image: "/b.jpg",
    category: "Ambientaciones",
    inStock: true,
    featured: true,
    gallery: [
      "/b.jpg",
      "/placeholder.svg?height=600&width=600&text=Decoracion+Altar",
      "/placeholder.svg?height=600&width=600&text=Centros+Mesa",
      "/placeholder.svg?height=600&width=600&text=Arco+Flores",
    ],
    description:
      "Servicio completo de ambientación floral para bodas. Incluye decoración del altar, centros de mesa, arco floral y decoración del pasillo. Creamos la atmósfera perfecta para el día más importante de tu vida con flores frescas y diseños únicos.",
    specifications: {
      "Decoración altar": "Arreglos laterales",
      "Centros de mesa": "8-10 mesas",
      "Arco floral": "2m x 2.5m",
      "Pasillo": "Pétalos y arreglos",
      "Duración evento": "8-12 horas",
      "Montaje": "3 horas antes",
    },
  },
  "3": {
    id: "3",
    name: "Servicio Semanal Flores Frescas",
    price: 89.99,
    originalPrice: 109.99,
    image: "/c.jpg",
    category: "Servicio Semanal",
    inStock: true,
    featured: true,
    gallery: [
      "/c.jpg",
      "/placeholder.svg?height=600&width=600&text=Entrega+Semanal",
      "/placeholder.svg?height=600&width=600&text=Variedad+Flores",
      "/placeholder.svg?height=600&width=600&text=Arreglos+Hogar",
    ],
    description:
      "Disfruta de flores frescas en tu hogar cada semana. Nuestro servicio de suscripción te permite tener siempre flores hermosas y variadas. Cada entrega incluye un arreglo único con flores de temporada seleccionadas especialmente para ti.",
    specifications: {
      "Frecuencia": "Semanal",
      "Duración servicio": "Mensual renovable",
      "Variedad": "Flores de temporada",
      "Entrega": "Día fijo semanal",
      "Arreglo": "Único cada semana",
      "Florero": "Incluido primera entrega",
    },
  },
  "4": {
    id: "4",
    name: "Diseño y Estética de Jardín",
    price: 199.99,
    image: "/dd.jpg",
    category: "Jardines",
    inStock: true,
    gallery: [
      "/dd.jpg",
      "/placeholder.svg?height=600&width=600&text=Diseño+Jardin",
      "/placeholder.svg?height=600&width=600&text=Plantas+Seleccion",
      "/placeholder.svg?height=600&width=600&text=Jardin+Completo",
    ],
    description:
      "Servicio completo de diseño y creación de jardines. Desde la planificación hasta la implementación, creamos espacios verdes únicos adaptados a tu estilo y necesidades. Incluye selección de plantas, diseño paisajístico y mantenimiento inicial.",
    specifications: {
      "Área mínima": "10m²",
      "Diseño": "Plano personalizado",
      "Plantas": "Selección experta",
      "Instalación": "Completa",
      "Mantenimiento": "3 meses incluido",
      "Garantía": "6 meses plantas",
    },
  },
  "5": {
    id: "5",
    name: "Ramo de Flores de Temporada",
    price: 35.99,
    image: "/d.jpg",
    category: "Ramos",
    inStock: true,
    gallery: [
      "/d.jpg",
      "/placeholder.svg?height=600&width=600&text=Flores+Temporada",
      "/placeholder.svg?height=600&width=600&text=Colores+Variados",
      "/placeholder.svg?height=600&width=600&text=Ramo+Envuelto",
    ],
    description: "Hermoso ramo con una selección de las mejores flores de temporada. Cada ramo es único y refleja la belleza natural de la estación actual, combinando colores y texturas para crear una composición armoniosa y fresca.",
    specifications: {
      "Flores": "Variedad de temporada",
      "Cantidad": "8-10 tallos",
      "Envoltorio": "Papel kraft natural",
      "Duración": "5-7 días",
      "Tamaño": "Mediano",
      "Estilo": "Natural y fresco",
    },
  },
  "6": {
    id: "6",
    name: "Exhibidores Florales Corporativos",
    price: 129.99,
    image: "/1.jpg",
    category: "Exhibidores",
    inStock: true,
    gallery: [
      "/1.jpg",
      "/placeholder.svg?height=600&width=600&text=Oficina+Flores",
      "/placeholder.svg?height=600&width=600&text=Recepcion+Arreglo",
      "/placeholder.svg?height=600&width=600&text=Empresa+Decoracion",
    ],
    description: "Servicio de exhibidores florales para empresas y oficinas. Creamos ambientes profesionales y acogedores que impresionan a clientes y motivan a empleados. Mantenimiento incluido para asegurar siempre la mejor presentación.",
    specifications: {
      "Ubicaciones": "Recepción, oficinas",
      "Mantenimiento": "Semanal",
      "Cambio flores": "Cada 10 días",
      "Diseño": "Corporativo elegante",
      "Contenedores": "Profesionales",
      "Servicio": "Mensual renovable",
    },
  },
  "7": {
    id: "7",
    name: "Decoración Floral para Hogar",
    price: 79.99,
    image: "/2.jpg",
    category: "Ambientaciones",
    inStock: true,
    gallery: [
      "/2.jpg",
      "/placeholder.svg?height=600&width=600&text=Sala+Decorada",
      "/placeholder.svg?height=600&width=600&text=Comedor+Flores",
      "/placeholder.svg?height=600&width=600&text=Dormitorio+Arreglo",
    ],
    description: "Transforma tu hogar con nuestro servicio de decoración floral. Diseñamos arreglos que complementan tu estilo de vida y decoración, creando espacios más acogedores y llenos de vida natural.",
    specifications: {
      "Espacios": "Sala, comedor, dormitorio",
      "Arreglos": "3-4 puntos focales",
      "Estilo": "Personalizado",
      "Duración": "Evento o temporal",
      "Consulta": "Previa en el hogar",
      "Instalación": "Profesional",
    },
  },
  "8": {
    id: "8",
    name: "Arreglo Floral Personalizado",
    price: 65.99,
    image: "/3.jpg",
    category: "Ramos",
    inStock: true,
    gallery: [
      "/3.jpg",
      "/placeholder.svg?height=600&width=600&text=Diseño+Personal",
      "/placeholder.svg?height=600&width=600&text=Consulta+Cliente",
      "/placeholder.svg?height=600&width=600&text=Arreglo+Unico",
    ],
    description: "Arreglo floral completamente personalizado según tus gustos y necesidades. Trabajamos contigo para crear una pieza única que refleje tu personalidad y el mensaje que quieres transmitir.",
    specifications: {
      "Consulta": "Personal 30 min",
      "Diseño": "100% personalizado",
      "Flores": "Según preferencia",
      "Colores": "A elección",
      "Tamaño": "Variable",
      "Entrega": "Fecha específica",
    },
  },
  "9": {
    id: "9",
    name: "Servicio Quincenal Premium",
    price: 149.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=300&width=300&text=Servicio+Quincenal+VIP",
    category: "Servicio Semanal",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Quincenal+Premium",
      "/placeholder.svg?height=600&width=600&text=Flores+Lujo",
      "/placeholder.svg?height=600&width=600&text=Entrega+VIP",
    ],
    description: "Servicio premium quincenal con las flores más exclusivas y arreglos de lujo. Incluye flores importadas, diseños únicos y atención personalizada para clientes que buscan lo mejor en decoración floral.",
    specifications: {
      "Frecuencia": "Quincenal",
      "Flores": "Premium e importadas",
      "Diseño": "Exclusivo cada entrega",
      "Consulta": "Personalizada",
      "Florero": "De lujo incluido",
      "Servicio": "VIP personalizado",
    },
  },
  "10": {
    id: "10",
    name: "Ambientación Eventos Corporativos",
    price: 399.99,
    image: "/11.jpg",
    category: "Ambientaciones",
    inStock: true,
    gallery: [
      "/11.jpg",
      "/placeholder.svg?height=600&width=600&text=Evento+Corporate",
      "/placeholder.svg?height=600&width=600&text=Salon+Decorado",
      "/placeholder.svg?height=600&width=600&text=Mesa+Ejecutiva",
    ],
    description: "Ambientación floral completa para eventos corporativos. Creamos atmósferas profesionales y elegantes que impresionan a invitados y refuerzan la imagen de tu empresa en conferencias, lanzamientos y celebraciones corporativas.",
    specifications: {
      "Capacidad": "50-200 personas",
      "Área": "Salón completo",
      "Elementos": "Centros, pedestales, entradas",
      "Montaje": "4 horas antes",
      "Duración": "Todo el evento",
      "Equipo": "3-4 especialistas",
    },
  },
  "11": {
    id: "11",
    name: "Ramo de Novia Exclusivo",
    price: 120.99,
    originalPrice: 150.99,
    image: "/f.jpg",
    category: "Ramos",
    inStock: true,
    featured: true,
    gallery: [
      "/f.jpg",
      "/placeholder.svg?height=600&width=600&text=Ramo+Novia",
      "/placeholder.svg?height=600&width=600&text=Diseño+Bodas",
      "/placeholder.svg?height=600&width=600&text=Flores+Blancas",
    ],
    description: "Ramo de novia exclusivo diseñado especialmente para el día más importante. Utilizamos las flores más finas y técnicas especiales de conservación para que se mantenga perfecto durante toda la celebración.",
    specifications: {
      "Flores": "Premium seleccionadas",
      "Diseño": "Exclusivo personalizado",
      "Conservación": "Técnica especial",
      "Consultas": "3 previas incluidas",
      "Prueba": "Ramo de ensayo",
      "Entrega": "Día de la boda",
    },
  },
  "12": {
    id: "12",
    name: "Jardín Vertical Interior",
    price: 249.99,
    image: "/h.jpg",
    category: "Jardines",
    inStock: true,
    gallery: [
      "/h.jpg",
      "/placeholder.svg?height=600&width=600&text=Pared+Verde",
      "/placeholder.svg?height=600&width=600&text=Plantas+Verticales",
      "/placeholder.svg?height=600&width=600&text=Jardin+Interior",
    ],
    description: "Instalación de jardín vertical interior que transforma cualquier pared en un oasis verde. Sistema de riego automático incluido, perfecto para oficinas y hogares modernos que buscan conexión con la naturaleza.",
    specifications: {
      "Dimensiones": "2m x 1.5m",
      "Plantas": "15-20 variedades",
      "Sistema": "Riego automático",
      "Instalación": "Profesional completa",
      "Mantenimiento": "6 meses incluido",
      "Garantía": "1 año sistema",
    },
  },
}

// Mock recommended products
const recommendedProducts: Product[] = [
  {
    id: "2",
    name: "Ambientación Completa para Bodas",
    price: 299.99,
    originalPrice: 349.99,
    image: "/b.jpg",
    category: "Ambientaciones",
    inStock: true,
  },
  {
    id: "3",
    name: "Servicio Semanal Flores Frescas",
    price: 89.99,
    originalPrice: 109.99,
    image: "/c.jpg",
    category: "Servicio Semanal",
    inStock: true,
  },
  {
    id: "11",
    name: "Ramo de Novia Exclusivo",
    price: 120.99,
    originalPrice: 150.99,
    image: "/f.jpg",
    category: "Ramos",
    inStock: true,
  },
]

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = React.use(params)
  const router = useRouter()
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const product = productData[id]

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

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

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
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-gray-200/50 dark:border-slate-700/50">
              <Image
                src={product.gallery[selectedImage] || product.image}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedImage === index 
                      ? "ring-2 ring-[#00473E] ring-offset-2 dark:ring-offset-slate-900" 
                      : "hover:opacity-75"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={120}
                    height={120}
                    className="object-cover w-full h-full bg-gray-100 dark:bg-slate-700"
                  />
                </button>
              ))}
            </div>
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

            {/* Price */}
            <div className="flex items-center gap-3 py-3 border-y border-gray-200 dark:border-slate-700">
              <span className="text-3xl font-bold text-[#00473E] dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    -{discount}%
                  </span>
                </>
              )}
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
                    {product.colors.map((color) => (
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
            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full h-12 bg-[#00473E] hover:bg-[#00473E]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {product.inStock ? "Agregar al Carrito" : "Agotado"}
              </button>
            </div>

            {/* Specifications */}
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl border border-gray-200/50 dark:border-slate-700/50 p-5">
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Especificaciones</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
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
            {recommendedProducts.map((product) => (
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
