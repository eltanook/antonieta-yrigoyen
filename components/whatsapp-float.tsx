"use client"

import { FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"

interface WhatsAppFloatProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppFloat({
  phoneNumber = "34911685249",
  message = "Hola Nadia! Me interesa obtener más información sobre tus servicios de flores y ambientaciones.",
}: WhatsAppFloatProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="icon"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 size-16"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="size-8" />
    </Button>
  )
}
