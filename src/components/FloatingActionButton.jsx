import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <motion.div
      style={{ opacity, scale }}
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        {/* Efecto de brillo */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        />
        
        {/* Icono */}
        <motion.svg
          className="w-6 h-6 text-white relative z-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </motion.svg>

        {/* Efecto de pulso */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-brand-accent"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Tooltip */}
        <motion.div
          className="absolute -top-12 right-0 bg-black/90 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          Volver arriba
          <div className="absolute top-full right-4 w-2 h-2 bg-black/90 rotate-45" />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

export default FloatingActionButton
