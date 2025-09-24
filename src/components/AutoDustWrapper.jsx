import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const AutoDustWrapper = ({ children }) => {
  const containerRef = useRef(null)
  const [elements, setElements] = useState([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    
    // Find all elements that should turn to dust
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span', 'div', 'button', 'a',
      '.glass', '.btn-primary', '.btn-secondary', '.btn-accent'
    ]
    
    const foundElements = container.querySelectorAll(selectors.join(', '))
    
    // Filter out nested elements to avoid double wrapping
    const topLevelElements = Array.from(foundElements).filter(element => {
      return !Array.from(foundElements).some(other => 
        other !== element && other.contains(element)
      )
    })
    
    // Add dust effect classes to elements
    topLevelElements.forEach((element, index) => {
      element.classList.add('dust-element')
      
      // Calculate delay based on distance from center
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceFromCenter = Math.sqrt(
        Math.pow(centerX - window.innerWidth / 2, 2) + 
        Math.pow(centerY - window.innerHeight / 2, 2)
      )
      
      const maxDistance = Math.sqrt(
        Math.pow(window.innerWidth / 2, 2) + 
        Math.pow(window.innerHeight / 2, 2)
      )
      
      const delay = (distanceFromCenter / maxDistance) * 0.3
      element.style.setProperty('--dust-delay', `${delay}s`)
    })
    
    setElements(topLevelElements)
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
        ease: "easeOut"
      }
    }
  }

  const containerVariants = {
    initial: {
      opacity: 1,
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01,
        staggerDirection: -1,
        when: "beforeChildren"
      }
    },
    enter: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.3
      }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="h-full w-full"
    >
      {children}
    </motion.div>
  )
}

export default AutoDustWrapper
