import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const ParallaxTransition = ({ children }) => {
  const location = useLocation()

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      filter: "blur(10px)",
      rotateX: 15,
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      rotateX: 0,
    },
    out: {
      opacity: 0,
      scale: 1.1,
      y: -100,
      filter: "blur(10px)",
      rotateX: -15,
    }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8
  }

  const backgroundVariants = {
    initial: {
      opacity: 0,
      scale: 1.2,
      rotate: 0,
    },
    in: {
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    out: {
      opacity: 0,
      scale: 0.8,
      rotate: 5,
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="relative w-full h-full"
      >
        {/* Fondo parallax animado */}
        <motion.div
          variants={backgroundVariants}
          transition={pageTransition}
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        >
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.3, 0.15],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.25, 0.1],
              x: [0, 30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>

        {/* Partículas flotantes */}
        <motion.div
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand-accent/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Contenido de la página */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {children}
        </motion.div>

        {/* Overlay de transición */}
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-brand-ink/50 via-transparent to-brand-ink/30 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default ParallaxTransition
