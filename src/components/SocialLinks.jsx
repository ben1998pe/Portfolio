import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import PropTypes from 'prop-types'

const SocialLinks = ({ variant = 'default', size = 'md', showLabels = false }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const socialData = [
    {
      name: 'GitHub',
      url: 'https://github.com/benjaminoscco',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      gradient: 'from-gray-700 to-gray-900',
      glowColor: 'shadow-gray-500/50'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/benjaminoscco',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      gradient: 'from-blue-600 to-blue-800',
      glowColor: 'shadow-blue-500/50'
    },
    {
      name: 'Email',
      url: 'mailto:benjamin@bosccoa.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-600',
      glowColor: 'shadow-green-500/50'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/benjaminoscco',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      gradient: 'from-cyan-400 to-blue-500',
      glowColor: 'shadow-cyan-500/50'
    }
  ]

  const sizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  }

  const variants = {
    default: 'flex flex-wrap gap-4',
    vertical: 'flex flex-col gap-4',
    horizontal: 'flex flex-row gap-4',
    grid: 'grid grid-cols-2 gap-4'
  }

  return (
    <div className={variants[variant]}>
      {socialData.map((social, index) => (
        <motion.div
          key={social.name}
          className="relative"
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <motion.a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              relative ${sizes[size]} rounded-2xl
              bg-gradient-to-br ${social.gradient}
              flex items-center justify-center
              text-white cursor-pointer
              overflow-hidden group
              transition-all duration-300 ease-out
              hover:scale-110 hover:rotate-3
              focus:outline-none focus:ring-2 focus:ring-white/50
            `}
            whileHover={{
              scale: 1.1,
              rotate: 3,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            title={`Visitar mi ${social.name}`}
          >
            {/* Icono principal */}
            <motion.div
              className="relative z-20"
              animate={{
                scale: hoveredIndex === index ? 1.1 : 1,
                rotate: hoveredIndex === index ? 360 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {social.icon}
            </motion.div>

            {/* Efecto de ondas concéntricas */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <>
                  {[1, 2, 3].map((wave) => (
                    <motion.div
                      key={wave}
                      className="absolute inset-0 rounded-2xl border-2 border-white/30"
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={{ 
                        scale: [0, 1.5 + wave * 0.3],
                        opacity: [0.8, 0],
                      }}
                      exit={{ scale: 1.5 + wave * 0.3, opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: wave * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Efecto de partículas */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{
                        x: Math.cos(i * 60 * Math.PI / 180) * 30,
                        y: Math.sin(i * 60 * Math.PI / 180) * 30,
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Efecto de brillo deslizante */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: hoveredIndex === index ? '100%' : '-100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Sombra dinámica */}
            <motion.div
              className={`absolute inset-0 rounded-2xl ${social.glowColor} blur-lg`}
              animate={{
                opacity: hoveredIndex === index ? 0.6 : 0,
                scale: hoveredIndex === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Tooltip mejorado */}
          <AnimatePresence>
            {hoveredIndex === index && showLabels && (
              <motion.div
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2
                           bg-black/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg
                           pointer-events-none whitespace-nowrap z-50
                           border border-white/20"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {social.name}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2
                                w-2 h-2 bg-black/90 rotate-45 border-l border-t border-white/20" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

SocialLinks.propTypes = {
  variant: PropTypes.oneOf(['default', 'vertical', 'horizontal', 'grid']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showLabels: PropTypes.bool
}

export default SocialLinks
