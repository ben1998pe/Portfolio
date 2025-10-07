import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const FloatingParticles = ({ count = 20 }) => {
  const particlesRef = useRef([])

  useEffect(() => {
    const particles = particlesRef.current
    const animateParticles = () => {
      particles.forEach((particle, index) => {
        if (particle) {
          const speed = 0.5 + Math.random() * 0.5
          const direction = Math.random() * Math.PI * 2
          const x = Math.cos(direction) * speed
          const y = Math.sin(direction) * speed
          
          particle.style.transform = `translate(${x}px, ${y}px)`
        }
      })
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          ref={el => particlesRef.current[index] = el}
          className="absolute w-1 h-1 bg-brand-accent/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}

export default FloatingParticles
