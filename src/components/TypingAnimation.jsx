import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TypingAnimation = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  onComplete = () => {},
  className = "",
  showCursor = true,
  cursorBlinkSpeed = 500
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete()
    }
  }, [currentIndex, text, speed, isComplete, onComplete])

  useEffect(() => {
    if (delay > 0) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0)
      }, delay)
      return () => clearTimeout(timeout)
    } else {
      setCurrentIndex(0)
    }
  }, [delay])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: cursorBlinkSpeed / 1000,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-brand-accent"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

export default TypingAnimation
