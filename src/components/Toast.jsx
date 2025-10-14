import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(), 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
          icon: '✅',
          border: 'border-green-400'
        }
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-pink-600',
          icon: '❌',
          border: 'border-red-400'
        }
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-yellow-500 to-orange-600',
          icon: '⚠️',
          border: 'border-yellow-400'
        }
      case 'info':
      default:
        return {
          bg: 'bg-gradient-to-r from-brand-primary to-brand-accent',
          icon: 'ℹ️',
          border: 'border-brand-primary'
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`relative p-4 rounded-2xl ${styles.bg} border ${styles.border} shadow-lg backdrop-blur-sm max-w-sm`}
        >
          {/* Efecto de brillo */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          
          <div className="relative flex items-center gap-3">
            <span className="text-2xl">{styles.icon}</span>
            <p className="text-white font-medium text-sm flex-1">{message}</p>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Barra de progreso */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-2xl"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast