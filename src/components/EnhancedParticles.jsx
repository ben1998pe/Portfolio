import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const EnhancedParticles = ({ count = 50 }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.5 ? 'rgba(85, 52, 254, 0.3)' : 'rgba(0, 224, 184, 0.3)'
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
          animate={{
            y: [0, -100 * particle.direction, 0],
            x: [0, (Math.random() * 60 - 30) * particle.direction, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            scale: [1, 1.5, 1],
            rotate: [0, 360 * particle.direction, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Partículas especiales con trayectorias más complejas */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`special-${i}`}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 720, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default EnhancedParticles
