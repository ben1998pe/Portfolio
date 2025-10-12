import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const AnimatedParticles = ({ isDark = true }) => {
  const [particles, setParticles] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  // Crear partículas
  const createParticle = (x, y) => {
    const colors = isDark 
      ? ['#5534FE', '#00E0B8', '#8B5CF6', '#06B6D4', '#10B981']
      : ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B']
    
    return {
      id: Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      decay: Math.random() * 0.02 + 0.01
    }
  }

  // Actualizar partículas
  const updateParticles = () => {
    setParticles(prev => 
      prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - particle.decay,
          vx: particle.vx * 0.99,
          vy: particle.vy * 0.99
        }))
        .filter(particle => particle.life > 0)
    )
  }

  // Crear partículas en posición del mouse
  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({ x, y })

    // Crear partículas ocasionales
    if (Math.random() < 0.3) {
      const newParticles = Array.from({ length: 2 }, () => createParticle(x, y))
      setParticles(prev => [...prev, ...newParticles])
    }
  }

  // Crear partículas en clics
  const handleClick = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Crear burst de partículas
    const newParticles = Array.from({ length: 8 }, () => createParticle(x, y))
    setParticles(prev => [...prev, ...newParticles])
  }

  // Crear partículas aleatorias
  const createRandomParticles = () => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.random() * rect.width
    const y = Math.random() * rect.height

    if (Math.random() < 0.1) {
      const newParticles = Array.from({ length: 1 }, () => createParticle(x, y))
      setParticles(prev => [...prev, ...newParticles])
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Event listeners
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('click', handleClick)

    // Animation loop
    const animate = () => {
      updateParticles()
      createRandomParticles()
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('click', handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDark])

  // Limpiar partículas cuando cambie el tema
  useEffect(() => {
    setParticles([])
  }, [isDark])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-10"
      style={{ 
        background: isDark 
          ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(85, 52, 254, 0.1) 0%, transparent 50%)'
          : 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
      }}
    >
      {/* Cursor glow effect */}
      <motion.div
        className={`
          absolute w-32 h-32 rounded-full pointer-events-none
          ${isDark 
            ? 'bg-gradient-to-r from-brand-primary/20 to-brand-accent/20' 
            : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
          }
        `}
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          filter: 'blur(20px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Partículas */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
          initial={{ opacity: 1, scale: 0 }}
          animate={{
            opacity: particle.life,
            scale: particle.life,
            rotate: 360
          }}
          transition={{ duration: 0.1 }}
        />
      ))}

      {/* Mouse position indicator (debug) */}
      {process.env.NODE_ENV === 'development' && (
        <div
          className="absolute w-2 h-2 bg-red-500 rounded-full pointer-events-none"
          style={{
            left: mousePosition.x - 4,
            top: mousePosition.y - 4
          }}
        />
      )}
    </div>
  )
}

export default AnimatedParticles
