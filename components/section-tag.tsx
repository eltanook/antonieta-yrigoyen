import type React from "react"
import { cn } from "@/lib/utils"

interface SectionTagProps {
  children: React.ReactNode
  className?: string
}

export function SectionTag({ children, className }: SectionTagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  )
}
