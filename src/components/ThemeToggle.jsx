import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const isDark = theme === 'dark'

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = async () => {
    setIsAnimating(true)
    
    // Pequeño delay para la animación
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Usar la función del contexto
    toggleTheme()
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300)
  }

  // No renderizar hasta que esté montado
  if (!mounted) {
    return (
      <div className="w-12 h-6 bg-gray-300 rounded-full animate-pulse" />
    )
  }

  return (
    <div className="flex items-center gap-3">
      {/* Iconos de tema */}
      <div className="flex items-center gap-2 text-sm">
        <motion.div
          animate={{ 
            opacity: !isDark ? 1 : 0.4,
            scale: !isDark ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium">CLARO</span>
        </motion.div>

        <motion.div
          animate={{ 
            opacity: isDark ? 1 : 0.4,
            scale: isDark ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <span className="text-xs font-medium">OSCURO</span>
        </motion.div>
      </div>

      {/* Toggle Switch */}
      <motion.button
        onClick={handleToggle}
        disabled={isAnimating}
        className={`
          relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
          ${isDark 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
            : 'bg-gradient-to-r from-yellow-400 to-orange-500'
          }
          ${isAnimating ? 'scale-105' : 'hover:scale-105'}
        `}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Track background effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isDark 
              ? '0 0 20px rgba(147, 51, 234, 0.3)' 
              : '0 0 20px rgba(251, 191, 36, 0.3)'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Toggle ball */}
        <motion.div
          className={`
            absolute top-0.5 w-5 h-5 rounded-full shadow-lg
            ${isDark ? 'bg-white' : 'bg-white'}
          `}
          animate={{
            x: isDark ? 24 : 2,
            rotate: isAnimating ? 360 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            rotate: { duration: 0.3 }
          }}
        >
          {/* Icon inside ball */}
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full h-full"
              >
                <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full h-full"
              >
                <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Ripple effect */}
        {isAnimating && (
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>
    </div>
  )
}

export default ThemeToggle
