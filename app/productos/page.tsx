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
import { Search, Filter, ArrowUpDown, Flower2, Heart, MessageCircle, Palette, Award, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Servicios florales premium de Nadia - Data mejorada
const allProducts: Product[] = [
  {
    id: "1",
    name: "Ramo de Rosas Rojas Premium",
    price: 45.99,
    originalPrice: 55.99,
    image: "/a.jpg",
    category: "Ramos",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Ambientación Completa para Bodas",
    price: 299.99,
    originalPrice: 349.99,
    image: "/b.jpg",
    category: "Ambientaciones",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Servicio Semanal Flores Frescas",
    price: 89.99,
    originalPrice: 109.99,
    image: "/c.jpg",
    category: "Servicio Semanal",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Diseño y Estética de Jardín",
    price: 199.99,
    image: "/dd.jpg",
    category: "Jardines",
    inStock: true,
  },
  {
    id: "5",
    name: "Ramo de Flores de Temporada",
    price: 35.99,
    image: "/d.jpg",
    category: "Ramos",
    inStock: true,
  },
  {
    id: "6",
    name: "Exhibidores Florales Corporativos",
    price: 129.99,
    image: "/1.jpg",
    category: "Exhibidores",
    inStock: true,
  },
  {
    id: "7",
    name: "Decoración Floral para Hogar",
    price: 79.99,
    image: "/2.jpg",
    category: "Ambientaciones",
    inStock: true,
  },
  {
    id: "8",
    name: "Arreglo Floral Personalizado",
    price: 65.99,
    image: "/3.jpg",
    category: "Ramos",
    inStock: true,
  },
  {
    id: "9",
    name: "Servicio Quincenal Premium",
    price: 149.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=300&width=300&text=Servicio+Quincenal+VIP",
    category: "Servicio Semanal",
    inStock: true,
  },
  {
    id: "10",
    name: "Ambientación Eventos Corporativos",
    price: 399.99,
    image: "/11.jpg",
    category: "Ambientaciones",
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
    featured: true,
  },
  {
    id: "12",
    name: "Jardín Vertical Interior",
    price: 249.99,
    image: "/h.jpg",
    category: "Jardines",
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
  const [isCartOpen, setIsCartOpen] = useState(false)
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

    console.log('Total products:', allProducts.length)
    console.log('Filtered products:', filtered.length)
    console.log('Current products:', filtered.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE))

    return filtered
  }, [searchTerm, selectedCategory, sortBy, currentPage])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 relative overflow-hidden">
      {/* Floating decorative elements - consistent with home */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-12 h-12 bg-pink-500/8 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-64 right-24 w-16 h-16 bg-rose-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-64 left-24 w-14 h-14 bg-pink-500/6 rounded-full blur-xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-32 right-16 w-10 h-10 bg-pink-500/12 rounded-full blur-xl animate-pulse delay-4000"></div>
      </div>

      <Navbar
        cartItemsCount={cartItems.length}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <ShoppingCart 
        items={cartItems} 
        onUpdateCart={handleUpdateCart}
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
      />

      <main className="relative z-10 pt-16">
        {/* Enhanced Header Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-6 mb-12">
            <div className="relative">
              <SectionTag className="mx-auto bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border border-pink-200 dark:border-pink-800">
                <Flower2 className="w-4 h-4 mr-2 text-pink-500" />
                Servicios Florales Premium
              </SectionTag>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-pink-500">
                Nuestros Servicios
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full"></div>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Descubre todos nuestros servicios florales hechos con amor y dedicación. 
              <span className="text-pink-500 font-medium"> Cada flor cuenta una historia única</span> 
              y cada arreglo está diseñado para crear momentos especiales.
            </p>
            
            {/* Quick stats */}
            {/* <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-pink-500">50+</div>
                <div className="text-sm text-muted-foreground">Servicios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-pink-500">100+</div>
                <div className="text-sm text-muted-foreground">Clientes Felices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-pink-500">5★</div>
                <div className="text-sm text-muted-foreground">Calificación</div>
              </div>
            </div> */}
          </div>
        </section>

        {/* Enhanced Filters and Search */}
        <section className="container mx-auto px-4 pb-12">
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-950/20">
                  <Filter className="h-5 w-5 text-pink-500" />
                </div>
                Encuentra tu Servicio Ideal
              </CardTitle>
              <p className="text-muted-foreground">
                Usa los filtros para encontrar exactamente lo que necesitas
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Enhanced Search */}
                <div className="md:col-span-1">
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Buscar Servicios
                  </label>
                  <div className="relative group">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-pink-500 transition-colors" />
                    <Input
                      placeholder="Buscar servicios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2 focus:border-pink-500/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Enhanced Category Filter */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Categoría
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-2 focus:border-pink-500/50 transition-all duration-300">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Enhanced Sort */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Ordenar por
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-2 focus:border-pink-500/50 transition-all duration-300">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nombre A-Z</SelectItem>
                      <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Enhanced Category Badges */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Filtros Rápidos
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(1).map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "secondary"}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedCategory === category 
                          ? "bg-pink-500 hover:bg-pink-600 text-white shadow-lg" 
                          : "hover:bg-pink-50 dark:hover:bg-pink-950/20 hover:text-pink-500 hover:border-pink-500/50"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {filteredAndSortedProducts.length} servicios encontrados
                  {selectedCategory !== "Todos" && ` en "${selectedCategory}"`}
                  {searchTerm && ` para "${searchTerm}"`}
                </span>
                {(searchTerm || selectedCategory !== "Todos") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("Todos")
                      setCurrentPage(1)
                    }}
                    className="text-xs hover:bg-pink-50 dark:hover:bg-pink-950/20 hover:text-pink-500 hover:border-pink-500"
                  >
                    Limpiar Filtros
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Enhanced Products Grid */}
        <section className="container mx-auto px-4 pb-20">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                {selectedCategory === "Todos" ? (
                  <span className="text-pink-500">
                    Todos los Servicios
                  </span>
                ) : (
                  <>
                    <span className="text-pink-500">
                      {selectedCategory}
                    </span>
                  </>
                )}
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-sm">
                  {filteredAndSortedProducts.length} servicios disponibles
                </span>
              </div>
            </div>
            
            {/* View Toggle - could add different view modes in future */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Vista:</span>
              <Badge variant="secondary" className="bg-pink-50 dark:bg-pink-950/20 text-pink-500">
                Tarjetas
              </Badge>
            </div>
          </div>

          {(currentProducts.length > 0 || filteredAndSortedProducts.length > 0) ? (
            <>
              {/* Products Grid with enhanced animations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {(currentProducts.length > 0 ? currentProducts : filteredAndSortedProducts.slice(0, 9)).map((product, index) => (
                  <div
                    key={product.id}
                    className="opacity-100 transition-all duration-300 hover:scale-105"
                    style={{ 
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="hover:bg-pink-50 dark:hover:bg-pink-900/40 hover:border-pink-500/50 dark:hover:border-pink-400 dark:border-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-300 transition-all duration-300"
                    >
                      Anterior
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className={`min-w-[40px] transition-all duration-300 ${
                              currentPage === pageNum 
                                ? "bg-pink-500 hover:bg-pink-600 text-white shadow-lg scale-105 border-pink-500" 
                                : "hover:bg-pink-50 dark:hover:bg-pink-900/40 hover:border-pink-500/50 dark:hover:border-pink-400 dark:border-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-300"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="hover:bg-pink-50 dark:hover:bg-pink-900/40 hover:border-pink-500/50 dark:hover:border-pink-400 dark:border-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-300 transition-all duration-300"
                    >
                      Siguiente
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Página {currentPage} de {totalPages} • Mostrando {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} de {filteredAndSortedProducts.length} servicios
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 space-y-6">
              <div className="mx-auto w-24 h-24 bg-pink-50 dark:bg-pink-950/20 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-pink-500/50" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-muted-foreground">
                  No se encontraron servicios
                </h3>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  No hay servicios que coincidan con tu búsqueda. Intenta con otros términos o categorías.
                </p>
              </div>
              <div className="space-y-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("Todos")
                    setCurrentPage(1)
                  }}
                >
                  Ver Todos los Servicios
                </Button>
                <div className="text-sm text-muted-foreground">
                  o navega por categorías específicas arriba
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Enhanced CTA Section */}
        {/* <section className="container mx-auto px-4 pb-20">
          <Card className="bg-gradient-to-r from-pink-50/50 via-rose-50/50 to-pink-50/50 dark:from-pink-950/10 dark:via-rose-950/10 dark:to-pink-950/10 border-pink-200 dark:border-pink-800 shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="space-y-4">
                  <SectionTag className="mx-auto bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800">
                    <Heart className="w-4 h-4 mr-2 text-pink-500" />
                    Servicios Personalizados
                  </SectionTag>
                  <h2 className="text-3xl md:text-4xl font-bold text-pink-500">
                    ¿No encontraste lo que buscabas?
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Cada proyecto es único y especial. Creamos servicios florales personalizados 
                    para eventos, espacios comerciales y hogares. Desde arreglos íntimos hasta 
                    ambientaciones completas para bodas y eventos corporativos.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="flex flex-col items-center space-y-2 p-4">
                    <div className="w-12 h-12 bg-pink-50 dark:bg-pink-950/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="font-semibold">Consulta Gratuita</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Conversemos sobre tu visión y necesidades
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-4">
                    <div className="w-12 h-12 bg-pink-50 dark:bg-pink-950/20 rounded-full flex items-center justify-center">
                      <Palette className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="font-semibold">Diseño Personalizado</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Creamos propuestas únicas para tu evento
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-4">
                    <div className="w-12 h-12 bg-pink-50 dark:bg-pink-950/20 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="font-semibold">Calidad Garantizada</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Flores frescas y diseños de alta calidad
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                    asChild
                  >
                    <Link href="/contacto" className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Solicitar Cotización
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-950/20 hover:border-pink-500 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-all duration-300"
                    asChild
                  >
                    <Link href="/nosotros">
                      Conocer a Nadia
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section> */}
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
