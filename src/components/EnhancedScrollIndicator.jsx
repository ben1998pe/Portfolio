import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import useScrollPosition from '../hooks/useScrollPosition'

const EnhancedScrollIndicator = () => {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollPercentage, setScrollPercentage] = useState(0)
  
  const { scrollPosition } = useScrollPosition()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Calcular porcentaje de scroll
  useEffect(() => {
    const updateScrollPercentage = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollPercentage(Math.round(scrollPercent))
      
      // Mostrar indicador después de cierto scroll
      setIsVisible(scrollTop > 100)
    }

    window.addEventListener('scroll', updateScrollPercentage)
    updateScrollPercentage()

    return () => window.removeEventListener('scroll', updateScrollPercentage)
  }, [])

  // No mostrar si está en la parte superior
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent"
    >
      {/* Barra de progreso principal */}
      <motion.div
        className="h-full bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary"
        style={{ scaleX }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scaleX }}
      />

      {/* Indicador de porcentaje flotante */}
      <motion.div
        className="absolute top-2 right-4 glass-strong rounded-full px-3 py-1 text-xs font-medium"
        animate={{
          scale: scrollPercentage > 90 ? [1, 1.1, 1] : 1,
        }}
        transition={{
          scale: {
            duration: 0.5,
            repeat: scrollPercentage > 90 ? Infinity : 0,
            repeatType: "reverse"
          }
        }}
      >
        <div className="flex items-center gap-2">
          {/* Icono de scroll */}
          <motion.div
            animate={{ rotate: scrollPercentage * 3.6 }}
            transition={{ duration: 0.1 }}
          >
            <svg className="w-3 h-3 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0-8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </motion.div>
          
          {/* Porcentaje */}
          <span className="text-brand-accent font-bold">
            {scrollPercentage}%
          </span>
          
          {/* Barrita animada */}
          <div className="w-8 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${scrollPercentage}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Puntos de progreso en los laterales */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {[25, 50, 75, 100].map((threshold) => (
          <motion.div
            key={threshold}
            className={`
              w-2 h-2 rounded-full border transition-all duration-300
              ${scrollPercentage >= threshold 
                ? 'bg-brand-accent border-brand-accent shadow-lg shadow-brand-accent/50' 
                : 'bg-white/20 border-white/40'
              }
            `}
            animate={{
              scale: scrollPercentage >= threshold ? [1, 1.3, 1] : 1,
              opacity: scrollPercentage >= threshold ? 1 : 0.4
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Efecto de brillo que se mueve */}
      <motion.div
        className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: scrollPercentage > 10 ? [`-100%`, `${scrollPercentage * 4}%`] : '-100%'
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ 
          left: `${scrollPercentage}%`,
          transform: 'translateX(-50%)'
        }}
      />

      {/* Indicador de sección actual (opcional) */}
      {scrollPercentage > 20 && (
        <motion.div
          className="absolute top-6 left-1/2 transform -translate-x-1/2 glass-strong rounded-full px-3 py-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-xs text-brand-accent font-medium">
            {scrollPercentage < 30 ? 'INICIO' : 
             scrollPercentage < 60 ? 'CONTENIDO' : 
             scrollPercentage < 90 ? 'PROYECTOS' : 'FIN'}
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default EnhancedScrollIndicator
