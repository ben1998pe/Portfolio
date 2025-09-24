import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const ElementDuster = ({ children, delay = 0, className = "" }) => {
  const [isExiting, setIsExiting] = useState(false)
  const elementRef = useRef(null)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate random particles for this element
    const elementParticles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 0.2
    }))
    setParticles(elementParticles)
  }, [])

  const elementVariants = {
    initial: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      rotate: 0,
      filter: "blur(0px)"
    },
    exit: {
      opacity: 0,
      scale: 0,
      y: [0, -20, -60, -120],
      x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100, Math.random() * 300 - 150],
      rotate: [0, 45, 90, 180],
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        delay: delay,
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1]
      }
    },
    enter: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: delay + 0.3,
        ease: "easeOut"
      }
    }
  }

  const particleVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    exit: {
      opacity: [0, 1, 0.8, 0],
      scale: [0, 1, 0.8, 0],
      y: [0, -10, -30, -60],
      x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50, Math.random() * 150 - 75],
      transition: {
        duration: 0.8,
        delay: delay + 0.1,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      ref={elementRef}
      variants={elementVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`relative inline-block ${className}`}
      style={{ transformOrigin: 'center' }}
    >
      {children}
      
      {/* Dust particles that appear during exit */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.1, delay: delay + 0.1 }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            variants={particleVariants}
            className="absolute bg-gradient-to-br from-brand-accent to-brand-primary rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ElementDuster
