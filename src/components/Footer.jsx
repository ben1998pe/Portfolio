import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import SocialLinks from './SocialLinks'

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative mt-20 border-t border-white/10"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-primary/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <h3 className="text-xl font-bold text-gradient font-title">BOSCCOA</h3>
            </div>
            <p className="text-brand-soft/80 text-sm leading-relaxed">
              Desarrollador Full Stack especializado en React, Node.js y automatización. 
              Creando soluciones digitales innovadoras y experiencias de usuario excepcionales.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Enlaces Rápidos
            </h4>
            <nav className="space-y-2">
              {[
                { name: 'Inicio', href: '/' },
                { name: 'Sobre Mí', href: '/about' },
                { name: 'Proyectos', href: '/projects' },
                { name: 'Servicios', href: '/services' },
                { name: 'Contacto', href: '/contact' }
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-brand-soft/70 hover:text-brand-accent transition-colors text-sm"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Conecta Conmigo
            </h4>
            <div className="space-y-3">
              <div className="text-brand-soft/70 text-sm">
                <p className="font-medium text-white mb-1">Benjamin Oscco Arias</p>
                <p>benjamin@bosccoa.com</p>
                <p className="text-xs text-brand-soft/60 mt-1">
                  Disponible para proyectos freelance
                </p>
              </div>
              
              {/* Social Links */}
              <div>
                <p className="text-brand-soft/70 text-xs mb-2">Sígueme en:</p>
                <SocialLinks variant="horizontal" size="sm" showLabels={false} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-brand-soft/60 text-sm">
            © {currentYear} Benjamin Oscco Arias. Todos los derechos reservados.
          </div>
          
          <div className="flex items-center gap-6 text-xs text-brand-soft/60">
            <span>Hecho con ❤️ usando React + Vite</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Disponible para trabajar</span>
            </div>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-4 right-4 opacity-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg className="w-8 h-8 text-brand-accent" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
