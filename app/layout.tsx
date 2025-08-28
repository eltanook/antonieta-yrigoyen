import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ecommerce Template - Productos de Calidad Premium",
  description:
    "Descubre nuestra colección exclusiva de productos de calidad premium. Electrónicos, moda, hogar y más con envío gratuito y garantía de satisfacción.",
  keywords: "ecommerce, productos premium, electrónicos, moda, hogar, compras online, envío gratuito",
  authors: [{ name: "Ecommerce Template" }],
  creator: "v0.app",
  publisher: "Ecommerce Template",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ecommerce-template.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ecommerce Template - Productos de Calidad Premium",
    description:
      "Descubre nuestra colección exclusiva de productos de calidad premium. Electrónicos, moda, hogar y más.",
    url: "https://ecommerce-template.vercel.app",
    siteName: "Ecommerce Template",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecommerce Template - Productos de Calidad Premium",
    description: "Descubre nuestra colección exclusiva de productos de calidad premium.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`font-sans ${montserrat.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
