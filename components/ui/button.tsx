import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-700 border-0 rounded-full",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 border-0 rounded-full",
        outline:
          "border-2 border-rose-400 bg-white/95 backdrop-blur-sm text-rose-600 hover:bg-rose-50 hover:border-rose-500 hover:shadow-lg rounded-full shadow-md dark:text-rose-400 dark:hover:bg-rose-950/20 dark:bg-gray-900/95",
        "outline-white":
          "border-2 border-white/50 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 hover:border-white/70 hover:shadow-lg rounded-full shadow-lg",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-white shadow-md hover:shadow-lg hover:from-gray-200 hover:to-gray-300 border-0 rounded-full",
        ghost: "text-white hover:bg-rose-50 hover:text-white rounded-full backdrop-blur-sm",
        link: "text-white underline-offset-4 hover:underline hover:text-white rounded-none",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 border-0 rounded-full",
        warning: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-700 border-0 rounded-full",
        elegant: "bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 border-0 rounded-full backdrop-blur-sm",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-full px-4 text-xs",
        lg: "h-14 rounded-full px-10 text-base",
        icon: "h-12 w-12 rounded-full",
        xl: "h-16 rounded-full px-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
