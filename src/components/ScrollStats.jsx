import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import useScrollPosition from '../hooks/useScrollPosition'

const ScrollStats = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const { scrollPosition, isScrolled } = useScrollPosition()

  // Mostrar después de cierto scroll
  useEffect(() => {
    setIsVisible(isScrolled && scrollPosition > 500)
  }, [isScrolled, scrollPosition])

  // Calcular estadísticas
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercentage = Math.round((scrollPosition / docHeight) * 100)
  const timeToRead = Math.max(1, Math.round(docHeight / 1000)) // Estimación de minutos

  const toggleStats = () => {
    setShowStats(!showStats)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Botón para mostrar estadísticas */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        onClick={toggleStats}
        className="fixed bottom-24 right-6 z-40 glass-strong rounded-full p-3 hover:bg-white/20 transition-colors group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Ver estadísticas de scroll"
      >
        <svg className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </motion.button>

      {/* Panel de estadísticas */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="fixed bottom-32 right-6 z-40 glass-strong rounded-2xl p-4 min-w-[200px]"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-brand-accent">Scroll Stats</h3>
                <button
                  onClick={toggleStats}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Estadísticas */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/80">Progreso:</span>
                  <span className="text-brand-accent font-bold">{scrollPercentage}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80">Posición:</span>
                  <span className="text-brand-accent font-bold">{Math.round(scrollPosition)}px</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80">Altura total:</span>
                  <span className="text-brand-accent font-bold">{Math.round(docHeight)}px</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80">Tiempo lectura:</span>
                  <span className="text-brand-accent font-bold">~{timeToRead}min</span>
                </div>
              </div>

              {/* Barra de progreso mini */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${scrollPercentage}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Mensaje motivacional */}
              <motion.div
                className="text-xs text-center text-white/60 italic"
                animate={{
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {scrollPercentage < 25 ? "¡Sigue explorando!" :
                 scrollPercentage < 50 ? "¡Vas bien!" :
                 scrollPercentage < 75 ? "¡Casi terminas!" :
                 scrollPercentage < 95 ? "¡Última recta!" :
                 "¡Felicidades! 🎉"}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ScrollStats
