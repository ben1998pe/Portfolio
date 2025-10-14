import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-900/20">
      <motion.div
        className="h-full bg-gradient-to-r from-brand-primary via-brand-accent to-purple-500 origin-left"
        style={{ scaleX }}
      />
      
      {/* Efecto de brillo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default ScrollProgress
