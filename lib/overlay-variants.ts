import { cva, type VariantProps } from "class-variance-authority"

// Configuración centralizada para todos los overlays
export const overlayVariants = cva(
  // Base styles para todos los overlays
  "fixed inset-0 z-50",
  {
    variants: {
      // Tipo de overlay
      variant: {
        // Overlay oscuro semi-transparente (por defecto para modals)
        modal: "bg-black/80",
        // Overlay más suave para elementos menos importantes
        soft: "bg-black/50",
        // Overlay muy ligero para elementos sutiles
        light: "bg-black/30",
        // Overlay con blur para efecto glass
        glass: "bg-white/10 backdrop-blur-md",
        // Overlay con gradiente
        gradient: "bg-gradient-to-t from-black/60 via-black/30 to-transparent",
      },
      // Animaciones de entrada/salida
      animation: {
        // Animaciones estándar para modals
        modal: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        // Animaciones más suaves
        soft: "transition-opacity duration-300",
        // Sin animaciones
        none: "",
      },
      // Posición del overlay
      position: {
        // Fixed full screen (por defecto)
        fixed: "fixed inset-0",
        // Absolute dentro del contenedor padre
        absolute: "absolute inset-0",
      }
    },
    defaultVariants: {
      variant: "modal",
      animation: "modal",
      position: "fixed",
    },
  }
)

// Configuración para overlays de imagen/card
export const imageOverlayVariants = cva(
  "absolute inset-0",
  {
    variants: {
      variant: {
        // Gradiente de abajo hacia arriba (para cards)
        bottom: "bg-gradient-to-t from-black/60 via-black/30 to-transparent",
        // Gradiente completo
        full: "bg-gradient-to-t from-black/80 via-black/40 to-black/20",
        // Overlay simple semi-transparente
        simple: "bg-black/40",
        // Overlay muy sutil
        subtle: "bg-black/20",
        // Overlay con efecto hover
        hover: "bg-black/0 hover:bg-black/30 transition-colors duration-300",
      },
    },
    defaultVariants: {
      variant: "bottom",
    },
  }
)

// Configuración para elementos con backdrop
export const backdropVariants = cva(
  "",
  {
    variants: {
      blur: {
        none: "",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
      },
      opacity: {
        10: "bg-white/10",
        15: "bg-white/15",
        20: "bg-white/20",
        25: "bg-white/25",
        30: "bg-white/30",
        40: "bg-white/40",
        50: "bg-white/50",
        60: "bg-white/60",
        70: "bg-white/70",
        80: "bg-white/80",
        90: "bg-white/90",
      },
    },
    defaultVariants: {
      blur: "md",
      opacity: 20,
    },
  }
)

// Configuración para elementos glass/acrylic
export const glassVariants = cva(
  "backdrop-blur-md border",
  {
    variants: {
      variant: {
        // Glass claro
        light: "bg-white/20 border-white/30",
        // Glass medio
        medium: "bg-white/15 border-white/25",
        // Glass oscuro
        dark: "bg-black/20 border-white/20",
        // Glass con color primario
        primary: "bg-primary/10 border-primary/30",
        // Glass tipo card
        card: "bg-card/80 border-border/50",
      },
      hover: {
        none: "",
        subtle: "hover:bg-white/25 hover:border-white/40",
        medium: "hover:bg-white/30 hover:border-white/50",
        strong: "hover:bg-white/40 hover:border-white/60",
      },
    },
    defaultVariants: {
      variant: "medium",
      hover: "subtle",
    },
  }
)

export type OverlayVariants = VariantProps<typeof overlayVariants>
export type ImageOverlayVariants = VariantProps<typeof imageOverlayVariants>
export type BackdropVariants = VariantProps<typeof backdropVariants>
export type GlassVariants = VariantProps<typeof glassVariants>
