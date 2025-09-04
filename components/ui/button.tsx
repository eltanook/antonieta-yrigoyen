import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-pink-300 text-white shadow-lg hover:shadow-xl hover:bg-pink-400 hover:scale-105 border-0 rounded-full",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 border-0 rounded-full",
        outline:
          "border-2 border-pink-300 bg-white/95 backdrop-blur-sm text-pink-600 hover:bg-pink-50 hover:border-pink-400 hover:shadow-lg hover:scale-105 rounded-full shadow-md dark:text-pink-400 dark:hover:bg-pink-950/20 dark:bg-gray-900/95",
        "outline-white":
          "border-2 border-white/60 bg-pink-300/20 backdrop-blur-md text-white hover:bg-pink-300/40 hover:border-white/80 hover:shadow-lg hover:scale-105 rounded-full shadow-lg",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-white shadow-md hover:shadow-lg hover:from-gray-200 hover:to-gray-300 border-0 rounded-full",
        ghost: "text-white hover:bg-pink-50 hover:text-white rounded-full backdrop-blur-sm",
        navbar: "!bg-gray-200 dark:!bg-slate-500 !text-gray-900 dark:!text-white !border-2 !border-gray-400 dark:!border-slate-400 !shadow-lg !rounded-full !transition-all !duration-300 hover:!bg-gray-300 dark:hover:!bg-slate-400 hover:!scale-105 hover:!shadow-xl",
        link: "text-white underline-offset-4 hover:underline hover:text-white rounded-none",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 border-0 rounded-full",
        warning: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-700 border-0 rounded-full",
        elegant: "bg-pink-300 text-white shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-pink-400 border-0 rounded-full backdrop-blur-sm",
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
