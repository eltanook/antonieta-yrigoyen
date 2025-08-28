"use client"

import { useState } from "react"
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
import { ArrowLeft, ShoppingCartIcon, Heart, Share2, Star, Minus, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const productData: Record<
  string,
  Product & { gallery: string[]; description: string; specifications: Record<string, string>; colors?: string[] }
> = {
  "1": {
    id: "1",
    name: "Smartphone Premium",
    price: 699.99,
    originalPrice: 899.99,
    image: "/placeholder.svg?height=300&width=300&text=Smartphone",
    category: "Electrónicos",
    inStock: true,
    featured: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Smartphone+Front",
      "/placeholder.svg?height=600&width=600&text=Smartphone+Back",
      "/placeholder.svg?height=600&width=600&text=Smartphone+Side",
      "/placeholder.svg?height=600&width=600&text=Smartphone+Accessories",
    ],
    description:
      "El smartphone más avanzado con tecnología de última generación. Pantalla OLED de 6.7 pulgadas, cámara triple de 108MP, procesador de 8 núcleos y batería de larga duración. Perfecto para profesionales y entusiastas de la tecnología.",
    specifications: {
      Pantalla: '6.7" OLED 120Hz',
      Procesador: "Snapdragon 8 Gen 2",
      RAM: "12GB",
      Almacenamiento: "256GB",
      Cámara: "108MP + 12MP + 12MP",
      Batería: "5000mAh",
    },
    colors: ["Negro", "Blanco", "Azul", "Dorado"],
  },
  "2": {
    id: "2",
    name: "Auriculares Inalámbricos",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300&text=Headphones",
    category: "Electrónicos",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Headphones+Main",
      "/placeholder.svg?height=600&width=600&text=Headphones+Case",
      "/placeholder.svg?height=600&width=600&text=Headphones+Details",
      "/placeholder.svg?height=600&width=600&text=Headphones+Colors",
    ],
    description:
      "Auriculares inalámbricos con cancelación de ruido activa y sonido de alta fidelidad. Batería de hasta 30 horas, resistentes al agua y compatibles con todos los dispositivos.",
    specifications: {
      "Cancelación de ruido": "Activa",
      Batería: "30 horas",
      Conectividad: "Bluetooth 5.3",
      Resistencia: "IPX4",
      Drivers: "40mm dinámicos",
      Peso: "250g",
    },
    colors: ["Negro", "Blanco", "Azul"],
  },
  "3": {
    id: "3",
    name: "Chaqueta de Cuero",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Jacket",
    category: "Moda",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Leather+Jacket+Front",
      "/placeholder.svg?height=600&width=600&text=Leather+Jacket+Back",
      "/placeholder.svg?height=600&width=600&text=Leather+Jacket+Details",
      "/placeholder.svg?height=600&width=600&text=Leather+Jacket+Sizes",
    ],
    description:
      "Chaqueta de cuero genuino de primera calidad, diseño clásico con detalles modernos. Perfecta para cualquier ocasión, combina estilo y durabilidad en una prenda atemporal.",
    specifications: {
      Material: "Cuero genuino",
      Forro: "Poliéster",
      Cierre: "Cremallera YKK",
      Bolsillos: "4 exteriores, 2 interiores",
      Cuidado: "Limpieza profesional",
      Origen: "Italia",
    },
    colors: ["Negro", "Marrón", "Cognac"],
  },
  "4": {
    id: "4",
    name: "Lámpara Moderna",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300&text=Modern+Lamp",
    category: "Hogar",
    inStock: false,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Modern+Lamp+Main",
      "/placeholder.svg?height=600&width=600&text=Modern+Lamp+Details",
      "/placeholder.svg?height=600&width=600&text=Modern+Lamp+Room",
      "/placeholder.svg?height=600&width=600&text=Modern+Lamp+Colors",
    ],
    description:
      "Lámpara de mesa con diseño minimalista y moderno. Iluminación LED regulable, base de mármol y acabados premium. Ideal para oficinas, salas de estar y dormitorios.",
    specifications: {
      "Tipo de luz": "LED regulable",
      Potencia: "12W",
      Base: "Mármol natural",
      Altura: "45cm",
      Garantía: "2 años",
      Certificación: "CE, RoHS",
    },
  },
  "5": {
    id: "5",
    name: "Laptop Gaming",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "/placeholder.svg?height=300&width=300&text=Gaming+Laptop",
    category: "Electrónicos",
    inStock: true,
    featured: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Gaming+Laptop+Main",
      "/placeholder.svg?height=600&width=600&text=Gaming+Laptop+Keyboard",
      "/placeholder.svg?height=600&width=600&text=Gaming+Laptop+Ports",
      "/placeholder.svg?height=600&width=600&text=Gaming+Laptop+Screen",
    ],
    description:
      "Laptop gaming de alto rendimiento con procesador Intel i7, tarjeta gráfica RTX 4070 y pantalla 144Hz.",
    specifications: {
      Procesador: "Intel Core i7-13700H",
      "Tarjeta Gráfica": "NVIDIA RTX 4070",
      RAM: "16GB DDR5",
      Almacenamiento: "1TB SSD",
      Pantalla: '15.6" 144Hz',
      Batería: "6 horas",
    },
    colors: ["Negro", "Gris"],
  },
  "6": {
    id: "6",
    name: "Zapatillas Deportivas",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300&text=Sport+Sneakers",
    category: "Moda",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Sport+Sneakers+Main",
      "/placeholder.svg?height=600&width=600&text=Sport+Sneakers+Side",
      "/placeholder.svg?height=600&width=600&text=Sport+Sneakers+Sole",
      "/placeholder.svg?height=600&width=600&text=Sport+Sneakers+Colors",
    ],
    description: "Zapatillas deportivas de alta calidad con tecnología de amortiguación avanzada.",
    specifications: {
      Material: "Mesh transpirable",
      Suela: "Goma antideslizante",
      Amortiguación: "Tecnología Air",
      Peso: "280g",
      Tallas: "36-46",
      Uso: "Running, Fitness",
    },
    colors: ["Blanco", "Negro", "Azul", "Rojo"],
  },
  "7": {
    id: "7",
    name: "Sofá Moderno",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/placeholder.svg?height=300&width=300&text=Modern+Sofa",
    category: "Hogar",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Modern+Sofa+Main",
      "/placeholder.svg?height=600&width=600&text=Modern+Sofa+Side",
      "/placeholder.svg?height=600&width=600&text=Modern+Sofa+Details",
      "/placeholder.svg?height=600&width=600&text=Modern+Sofa+Room",
    ],
    description: "Sofá moderno de 3 plazas con tapizado de alta calidad y estructura resistente.",
    specifications: {
      Plazas: "3 personas",
      Material: "Tela premium",
      Estructura: "Madera maciza",
      Dimensiones: "200x90x85 cm",
      Peso: "45kg",
      Garantía: "5 años",
    },
    colors: ["Gris", "Beige", "Azul marino"],
  },
  "8": {
    id: "8",
    name: "Smartwatch",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=300&text=Smartwatch",
    category: "Electrónicos",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Smartwatch+Main",
      "/placeholder.svg?height=600&width=600&text=Smartwatch+Screen",
      "/placeholder.svg?height=600&width=600&text=Smartwatch+Bands",
      "/placeholder.svg?height=600&width=600&text=Smartwatch+Features",
    ],
    description: "Smartwatch con monitoreo de salud, GPS y resistencia al agua.",
    specifications: {
      Pantalla: '1.4" AMOLED',
      Batería: "7 días",
      Resistencia: "5ATM",
      Sensores: "Frecuencia cardíaca, SpO2",
      Conectividad: "Bluetooth 5.0, WiFi",
      Compatibilidad: "iOS, Android",
    },
    colors: ["Negro", "Plata", "Oro rosa"],
  },
  "9": {
    id: "9",
    name: "Vestido Elegante",
    price: 179.99,
    originalPrice: 229.99,
    image: "/placeholder.svg?height=300&width=300&text=Elegant+Dress",
    category: "Moda",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Elegant+Dress+Main",
      "/placeholder.svg?height=600&width=600&text=Elegant+Dress+Back",
      "/placeholder.svg?height=600&width=600&text=Elegant+Dress+Details",
      "/placeholder.svg?height=600&width=600&text=Elegant+Dress+Colors",
    ],
    description: "Vestido elegante perfecto para ocasiones especiales, confeccionado con materiales premium.",
    specifications: {
      Material: "Seda natural",
      Tallas: "XS-XL",
      Largo: "Midi",
      Cuidado: "Lavado en seco",
      Origen: "Italia",
      Estilo: "Clásico elegante",
    },
    colors: ["Negro", "Azul marino", "Burdeos"],
  },
  "10": {
    id: "10",
    name: "Mesa de Centro",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300&text=Coffee+Table",
    category: "Hogar",
    inStock: true,
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Coffee+Table+Main",
      "/placeholder.svg?height=600&width=600&text=Coffee+Table+Details",
      "/placeholder.svg?height=600&width=600&text=Coffee+Table+Room",
      "/placeholder.svg?height=600&width=600&text=Coffee+Table+Assembly",
    ],
    description: "Mesa de centro moderna con diseño minimalista y materiales de alta calidad.",
    specifications: {
      Material: "Madera de roble",
      Dimensiones: "120x60x45 cm",
      Acabado: "Barniz natural",
      Peso: "25kg",
      Montaje: "Requerido",
      Garantía: "3 años",
    },
  },
  "11": {
    id: "11",
    name: "Tablet Pro",
    price: 599.99,
    image: "/placeholder.svg?height=300&width=300&text=Tablet+Pro",
    category: "Electrónicos",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Tablet+Pro"],
    description: "Tablet profesional con pantalla de alta resolución y rendimiento excepcional.",
    specifications: { Pantalla: '11" Retina', Procesador: "M2", RAM: "8GB", Almacenamiento: "256GB" },
  },
  "12": {
    id: "12",
    name: "Abrigo de Invierno",
    price: 199.99,
    originalPrice: 299.99,
    image: "/placeholder.svg?height=300&width=300&text=Winter+Coat",
    category: "Moda",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Winter+Coat"],
    description: "Abrigo de invierno cálido y elegante para los días más fríos.",
    specifications: { Material: "Lana merino", Forro: "Plumón", Tallas: "S-XXL" },
  },
  "13": {
    id: "13",
    name: "Espejo Decorativo",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300&text=Decorative+Mirror",
    category: "Hogar",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Decorative+Mirror"],
    description: "Espejo decorativo con marco elegante para cualquier habitación.",
    specifications: { Dimensiones: "80x60 cm", Marco: "Madera", Montaje: "Pared" },
  },
  "14": {
    id: "14",
    name: "Cámara Digital",
    price: 449.99,
    originalPrice: 549.99,
    image: "/placeholder.svg?height=300&width=300&text=Digital+Camera",
    category: "Electrónicos",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Digital+Camera"],
    description: "Cámara digital profesional con lentes intercambiables.",
    specifications: { Resolución: "24MP", Video: "4K", Pantalla: '3" táctil' },
  },
  "15": {
    id: "15",
    name: "Botas de Cuero",
    price: 159.99,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Boots",
    category: "Moda",
    inStock: false,
    gallery: ["/placeholder.svg?height=600&width=600&text=Leather+Boots"],
    description: "Botas de cuero genuino con diseño clásico y durabilidad excepcional.",
    specifications: { Material: "Cuero genuino", Suela: "Goma", Tallas: "38-46" },
  },
  "16": {
    id: "16",
    name: "Planta Decorativa",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300&text=Decorative+Plant",
    category: "Hogar",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Decorative+Plant"],
    description: "Planta decorativa artificial de alta calidad para interiores.",
    specifications: { Altura: "60 cm", Material: "Sintético", Maceta: "Incluida" },
  },
  "17": {
    id: "17",
    name: "Altavoz Bluetooth",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300&text=Bluetooth+Speaker",
    category: "Electrónicos",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Bluetooth+Speaker"],
    description: "Altavoz Bluetooth portátil con sonido de alta calidad.",
    specifications: { Potencia: "20W", Batería: "12 horas", Resistencia: "IPX7" },
  },
  "18": {
    id: "18",
    name: "Bolso de Mano",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Handbag",
    category: "Moda",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Leather+Handbag"],
    description: "Bolso de mano elegante de cuero genuino.",
    specifications: { Material: "Cuero genuino", Dimensiones: "30x25x15 cm" },
  },
  "19": {
    id: "19",
    name: "Cojines Decorativos",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300&text=Decorative+Pillows",
    category: "Hogar",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Decorative+Pillows"],
    description: "Set de cojines decorativos para sofá y cama.",
    specifications: { Cantidad: "2 unidades", Material: "Algodón", Dimensiones: "45x45 cm" },
  },
  "20": {
    id: "20",
    name: "Monitor 4K",
    price: 349.99,
    originalPrice: 449.99,
    image: "/placeholder.svg?height=300&width=300&text=4K+Monitor",
    category: "Electrónicos",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=4K+Monitor"],
    description: "Monitor 4K de 27 pulgadas para profesionales y gamers.",
    specifications: { Resolución: "3840x2160", Tamaño: '27"', Conectividad: "HDMI, USB-C" },
  },
  "21": {
    id: "21",
    name: "Gafas de Sol",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300&text=Stylish+Sunglasses",
    category: "Moda",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Stylish+Sunglasses"],
    description: "Gafas de sol con protección UV y diseño moderno.",
    specifications: { "Protección UV": "100%", Material: "Acetato", Lentes: "Polarizadas" },
  },
  "22": {
    id: "22",
    name: "Vela Aromática",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300&text=Scented+Candle",
    category: "Hogar",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Scented+Candle"],
    description: "Vela aromática de cera natural con fragancias relajantes.",
    specifications: { Material: "Cera de soja", Duración: "40 horas", Fragancia: "Lavanda" },
  },
  "23": {
    id: "23",
    name: "Teclado Mecánico",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300&text=Mechanical+Keyboard",
    category: "Electrónicos",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Mechanical+Keyboard"],
    description: "Teclado mecánico gaming con switches Cherry MX.",
    specifications: { Switches: "Cherry MX Blue", Iluminación: "RGB", Conectividad: "USB-C" },
  },
  "24": {
    id: "24",
    name: "Bufanda de Lana",
    price: 39.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=300&width=300&text=Wool+Scarf",
    category: "Moda",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Wool+Scarf"],
    description: "Bufanda de lana suave y cálida para el invierno.",
    specifications: { Material: "Lana merino", Dimensiones: "180x30 cm", Cuidado: "Lavado a mano" },
  },
  "25": {
    id: "25",
    name: "Marco de Fotos",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300&text=Photo+Frame",
    category: "Hogar",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Photo+Frame"],
    description: "Marco de fotos elegante para decorar tu hogar.",
    specifications: { Material: "Madera", Tamaño: "20x25 cm", Cristal: "Incluido" },
  },
  "26": {
    id: "26",
    name: "Mouse Gaming",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300&text=Gaming+Mouse",
    category: "Electrónicos",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Gaming+Mouse"],
    description: "Mouse gaming de alta precisión con sensor óptico avanzado.",
    specifications: { DPI: "16000", Botones: "8 programables", Conectividad: "USB" },
  },
  "27": {
    id: "27",
    name: "Cinturón de Cuero",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Belt",
    category: "Moda",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Leather+Belt"],
    description: "Cinturón de cuero genuino con hebilla clásica.",
    specifications: { Material: "Cuero genuino", Tallas: "85-120 cm", Hebilla: "Acero inoxidable" },
  },
  "28": {
    id: "28",
    name: "Florero Moderno",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300&text=Modern+Vase",
    category: "Hogar",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Modern+Vase"],
    description: "Florero moderno de cerámica para decoración del hogar.",
    specifications: { Material: "Cerámica", Altura: "25 cm", Estilo: "Minimalista" },
  },
  "29": {
    id: "29",
    name: "Cargador Inalámbrico",
    price: 29.99,
    originalPrice: 39.99,
    image: "/placeholder.svg?height=300&width=300&text=Wireless+Charger",
    category: "Electrónicos",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Wireless+Charger"],
    description: "Cargador inalámbrico rápido compatible con todos los dispositivos Qi.",
    specifications: { Potencia: "15W", Compatibilidad: "Qi", Indicador: "LED" },
  },
  "30": {
    id: "30",
    name: "Reloj de Pulsera",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300&text=Wrist+Watch",
    category: "Moda",
    inStock: true,
    gallery: ["/placeholder.svg?height=600&width=600&text=Wrist+Watch"],
    description: "Reloj de pulsera clásico con movimiento automático.",
    specifications: { Movimiento: "Automático", Material: "Acero inoxidable", Resistencia: "50m" },
  },
}

// Mock recommended products
const recommendedProducts: Product[] = [
  {
    id: "2",
    name: "Auriculares Inalámbricos",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300&text=Headphones",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "8",
    name: "Smartwatch",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=300&text=Smartwatch",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "29",
    name: "Cargador Inalámbrico",
    price: 29.99,
    originalPrice: 39.99,
    image: "/placeholder.svg?height=300&width=300&text=Wireless+Charger",
    category: "Electrónicos",
    inStock: true,
  },
]

interface ProductDetailPageProps {
  params: { id: string }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params
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
    <div className="min-h-screen bg-background">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-muted rounded-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-subtle-lg">
              <Image
                src={product.gallery[selectedImage] || product.image}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <SectionTag>{product.category}</SectionTag>
              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(128 reseñas)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <Badge className="bg-green-600 text-white">-{discount}%</Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                {product.inStock ? "En stock" : "Agotado"}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            {product.colors && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Color:</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
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
            <div className="space-y-3">
              <label className="text-sm font-medium">Cantidad:</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleAddToCart} disabled={!product.inStock} className="flex-1 rounded-full">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Agregar al Carrito
              </Button>
              <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                <Heart className="h-5 w-5 mr-2" />
                Favoritos
              </Button>
              <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                <Share2 className="h-5 w-5 mr-2" />
                Compartir
              </Button>
            </div>

            {/* Specifications */}
            <Card className="shadow-subtle">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Especificaciones</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        <section>
          <div className="text-center space-y-4 mb-12">
            <SectionTag>Recomendados</SectionTag>
            <h2 className="text-3xl font-bold">Productos Relacionados</h2>
            <p className="text-muted-foreground">Otros productos que podrían interesarte</p>
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
