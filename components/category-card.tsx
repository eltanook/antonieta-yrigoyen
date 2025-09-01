import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { imageOverlayVariants } from "@/lib/overlay-variants"

export interface Category {
  id: string
  name: string
  description: string
  image: string
  productCount: number
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-subtle hover:shadow-subtle-lg transition-all duration-300 my-[0] py-[0]">
      <CardContent className="p-0">
        <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className={imageOverlayVariants({ variant: "bottom" })} />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="font-bold text-xl mb-2">{category.name}</h3>
            <p className="text-sm text-white/90 mb-3 line-clamp-2">{category.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/80">{category.productCount} productos</span>
              <Button size="default" variant="outline" asChild className="bg-rose-500 border-rose-500 text-white hover:bg-rose-600 btn-float">
                <Link href={`/productos?categoria=${category.id}`}>Ver productos</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
