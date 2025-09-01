"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ShoppingCart } from "@/components/shopping-cart"
import { SectionTag } from "@/components/section-tag"
import { ProductCard, type Product } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock products data - Servicios florales de Nadia
const allProducts: Product[] = [
  {
    id: "1",
    name: "Ramo de Rosas Rojas Premium",
    price: 45.99,
    originalPrice: 55.99,
    image: "/placeholder.svg?height=300&width=300&text=Rosas+Rojas",
    category: "Ramos",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Ambientación Completa para Evento",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300&text=Ambientacion",
    category: "Ambientaciones",
    inStock: true,
  },
  {
    id: "3",
    name: "Servicio Semanal de Flores Frescas",
    price: 89.99,
    originalPrice: 109.99,
    image: "/placeholder.svg?height=300&width=300&text=Servicio+Semanal",
    category: "Servicio Semanal",
    inStock: true,
  },
  {
    id: "4",
    name: "Diseño y Estética de Jardín",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300&text=Diseño+Jardin",
    category: "Jardines",
    inStock: true,
  },
  {
    id: "5",
    name: "Ramo de Flores de Temporada",
    price: 35.99,
    image: "/placeholder.svg?height=300&width=300&text=Flores+Temporada",
    category: "Ramos",
    inStock: true,
  },
  {
    id: "6",
    name: "Exhibidores Florales",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300&text=Exhibidores",
    category: "Exhibidores",
    inStock: true,
  },
  {
    id: "7",
    name: "Decoración Floral para Casa",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300&text=Decoracion+Casa",
    category: "Ambientaciones",
    inStock: true,
  },
  {
    id: "8",
    name: "Arreglo Floral Personalizado",
    price: 65.99,
    image: "/placeholder.svg?height=300&width=300&text=Arreglo+Personal",
    category: "Ramos",
    inStock: true,
  },
  {
    id: "9",
    name: "Servicio Quincenal Premium",
    price: 149.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=300&width=300&text=Servicio+Quincenal",
    category: "Servicio Semanal",
    inStock: true,
  },
  {
    id: "10",
    name: "Decoración para Bodas",
    price: 399.99,
    image: "/placeholder.svg?height=300&width=300&text=Boda+Flores",
    category: "Ambientaciones",
    inStock: true,
  },
]

const categories = ["Todos", "Ramos", "Ambientaciones", "Servicio Semanal", "Jardines", "Exhibidores"]
const PRODUCTS_PER_PAGE = 9

export default function ProductsPage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product])
  }

  const handleUpdateCart = (items: Product[]) => {
    setCartItems(items)
  }

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => {}}
        cartComponent={<ShoppingCart items={cartItems} onUpdateCart={handleUpdateCart} />}
      />

      <main className="pt-16">
        {/* Header Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4 mb-8">
            <SectionTag>Servicios Florales</SectionTag>
            <h1 className="text-4xl md:text-5xl font-bold">Nuestros Servicios</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre todos nuestros servicios florales hechos con amor y dedicación. Cada flor cuenta una historia única.
            </p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="container mx-auto px-4 pb-8">
          <Card className="shadow-subtle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros y Búsqueda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar servicios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nombre</SelectItem>
                    <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.slice(1).map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 pb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {selectedCategory === "Todos" ? "Todos los servicios" : selectedCategory}
            </h2>
            <span className="text-muted-foreground">
              {filteredAndSortedProducts.length} servicios disponibles
            </span>
          </div>

          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No se encontraron servicios que coincidan con tu búsqueda
              </p>
              <Button
                variant="elegant"
                size="lg"
                className="btn-shine"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Todos")
                  setCurrentPage(1)
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
