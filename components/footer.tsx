import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin, Clock, Heart, Star } from "lucide-react"
import { FaTiktok } from "react-icons/fa"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/productos", label: "Productos" },
    { href: "/contacto", label: "Contacto" },
  ]

  const services = [
    { label: "Ambientaciones" },
    { label: "Servicio Semanal" },
    { label: "Eventos y Bodas" },
    { label: "Diseño de Jardines" },
  ]

  const socialLinks = [
    { href: "https://facebook.com/antonietairigoyen", icon: Facebook, label: "Facebook" },
    { href: "https://instagram.com/antonietairigoyen", icon: Instagram, label: "Instagram" },
    { href: "https://tiktok.com/@antonietairigoyen", icon: FaTiktok, label: "TikTok" },
  ]

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo and description */}
          <div className="space-y-6 lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-auto">
                  <Image
                    src="/antonieta-logo.svg"
                    alt="Antonieta Flowers"
                    width={120}
                    height={48}
                    className="h-12 w-auto"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs text-muted-foreground ml-1">5.0</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Flores naturales con{" "}
                <span className="text-[#00473E] dark:text-white font-medium">
                  amor y dedicación
                </span>
                . Creando momentos únicos a través de ambientaciones, eventos y servicios florales.
              </p>
              <div className="inline-flex items-center space-x-2 bg-[#00473E]/10 dark:bg-[#00473E]/20 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 text-[#00473E] dark:text-white" />
                <span className="text-sm text-[#00473E] dark:text-white font-medium">
                  Hecho con amor
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-[#00473E] dark:hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#00473E]/30 dark:bg-white rounded-full mr-3 group-hover:bg-[#00473E] dark:group-hover:bg-white transition-colors duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground">Nuestros Servicios</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-muted-foreground flex items-center">
                  <Heart className="w-4 h-4 text-[#00473E] dark:text-white mr-3" />
                  {service.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground">Contacto</h3>
            <div className="space-y-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-[#00473E]/10 dark:bg-[#00473E]/30 rounded-lg flex items-center justify-center group-hover:bg-[#00473E]/20 dark:group-hover:bg-[#00473E]/50 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-[#00473E] dark:text-white" />
                  </div>
                  <span>antonietairigoyen74@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-[#00473E]/10 dark:bg-[#00473E]/30 rounded-lg flex items-center justify-center group-hover:bg-[#00473E]/20 dark:group-hover:bg-[#00473E]/50 transition-colors duration-300">
                    <Phone className="h-4 w-4 text-[#00473E] dark:text-white" />
                  </div>
                  <span>+34 911 685 249</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-[#00473E]/10 dark:bg-[#00473E]/30 rounded-lg flex items-center justify-center group-hover:bg-[#00473E]/20 dark:group-hover:bg-[#00473E]/50 transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-[#00473E] dark:text-white" />
                  </div>
                  <span>Madrid, España</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-[#00473E]/10 dark:bg-[#00473E]/30 rounded-lg flex items-center justify-center group-hover:bg-[#00473E]/20 dark:group-hover:bg-[#00473E]/50 transition-colors duration-300">
                    <Clock className="h-4 w-4 text-[#00473E] dark:text-white" />
                  </div>
                  <span>Consulta horarios por WhatsApp</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Síguenos</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <Link
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 bg-[#00473E]/10 dark:bg-[#00473E]/30 rounded-lg flex items-center justify-center text-[#00473E] dark:text-white hover:bg-[#00473E] dark:hover:bg-white hover:text-white dark:hover:text-[#00473E] transition-all duration-300 transform hover:scale-110"
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <p>&copy; {currentYear} Nadia Flores. Todos los derechos reservados.</p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacidad" className="text-muted-foreground hover:text-[#00473E] dark:hover:text-white transition-colors duration-300">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-muted-foreground hover:text-[#00473E] dark:hover:text-white transition-colors duration-300">
                Términos de Servicio
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Desarrollado con <Heart className="w-3 h-3 text-[#00473E] dark:text-white inline mx-1" /> por Nexium Solutions y Ditiero
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
