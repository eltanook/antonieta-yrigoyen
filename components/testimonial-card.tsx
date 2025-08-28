import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="border-0 shadow-subtle hover:shadow-subtle-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{testimonial.name}</h4>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
      </CardContent>
    </Card>
  )
}
