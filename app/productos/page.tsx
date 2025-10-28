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

// Importar productos reales
import { getAllProducts } from "@/lib/products-data";

// Obtener productos reales (se ejecuta una vez al cargar)
const allProducts = getAllProducts();

const categories = [
  "Todos", 
  "Arreglos Florales", 
  "Ramos", 
  "Ambientaciones", 
  "Ambientación de Eventos",
  "Ambientación de Cumpleaños", 
  "Ambientación de Iglesias",
  "Servicio Semanal"
]
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
    onCartOpen={() => setIsCartOpen(true)}
  />

  <ShoppingCart 
    items={cartItems} 
    onUpdateCart={handleUpdateCart}
    open={isCartOpen}
    onOpenChange={setIsCartOpen}
  />

      <main className="relative z-10 pt-16">
        {/* Hero Minimalista */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#00473E]/5 border border-[#00473E]/10">
              <Flower2 className="w-4 h-4 mr-2 text-[#00473E]" />
              <span className="text-sm font-medium text-[#00473E]">Servicios Florales</span>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Nuestros Servicios
              </h1>
              <div className="w-16 h-0.5 bg-[#00473E] mx-auto"></div>
            </div>
            
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Servicios florales profesionales diseñados con dedicación para crear momentos únicos.
            </p>
          </div>
        </section>

    {/* Filtros Minimalistas */}
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-slate-700/50 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 border-gray-200 dark:border-slate-600 focus:border-[#00473E] dark:focus:border-[#00473E] transition-colors"
            />
          </div>

          {/* Categoría */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-10 border-gray-200 dark:border-slate-600 focus:border-[#00473E] dark:focus:border-[#00473E]">
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

          {/* Ordenar */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-10 border-gray-200 dark:border-slate-600 focus:border-[#00473E] dark:focus:border-[#00473E]">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nombre A-Z</SelectItem>
              <SelectItem value="price-asc">Precio ↗</SelectItem>
              <SelectItem value="price-desc">Precio ↘</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtros rápidos */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.slice(1).map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer text-xs py-1 px-3 transition-all ${
                selectedCategory === category 
                  ? "bg-[#00473E] text-white border-[#00473E]" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-[#00473E]/5 hover:border-[#00473E]/30"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Resumen de resultados */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-200/50 dark:border-slate-700/50">
          <span>
            {filteredAndSortedProducts.length} servicios
            {selectedCategory !== "Todos" && ` en ${selectedCategory}`}
          </span>
          {(searchTerm || selectedCategory !== "Todos") && (
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("Todos")
                setCurrentPage(1)
              }}
              className="text-[#00473E] hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </section>

    {/* Grid de Productos */}
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {selectedCategory === "Todos" ? "Todos los Servicios" : selectedCategory}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="w-1.5 h-1.5 bg-[#00473E] rounded-full"></div>
          <span>{filteredAndSortedProducts.length} servicios disponibles</span>
        </div>
      </div>

      {(currentProducts.length > 0 || filteredAndSortedProducts.length > 0) ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentProducts.map((product, index) => (
              <div
                key={product.id}
                className="group"
                style={{ 
                  animationDelay: `${index * 50}ms`
                }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-9 px-3 text-sm border-gray-200 dark:border-slate-600 hover:bg-[#00473E]/5 hover:border-[#00473E]/30 disabled:opacity-50"
                >
                  Anterior
                </Button>
                
                <div className="flex gap-1 mx-2">
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
                        className={`h-9 w-9 text-sm ${
                          currentPage === pageNum 
                            ? "bg-[#00473E] text-white border-[#00473E]" 
                            : "border-gray-200 dark:border-slate-600 hover:bg-[#00473E]/5 hover:border-[#00473E]/30"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="h-9 px-3 text-sm border-gray-200 dark:border-slate-600 hover:bg-[#00473E]/5 hover:border-[#00473E]/30 disabled:opacity-50"
                >
                  Siguiente
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Página {currentPage} de {totalPages} • {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} de {filteredAndSortedProducts.length} servicios
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No se encontraron servicios
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              No hay servicios que coincidan con los filtros seleccionados.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("Todos")
              setCurrentPage(1)
            }}
            className="mt-4"
          >
            Ver todos los servicios
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
