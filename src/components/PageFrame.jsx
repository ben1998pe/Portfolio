import { motion } from 'framer-motion'
import { children } from 'react'

const PageFrame = ({ children, threeId = null }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ 
        duration: 0.7, 
        ease: [0.25, 0.46, 0.45, 0.94], // anticipate ease
        staggerChildren: 0.1
      }}
      className="h-screen w-screen overflow-hidden flex"
    >
      {/* Content - Full width when no 3D, half width when 3D */}
      <div className={`${threeId ? 'flex-1' : 'w-full'} flex flex-col justify-center px-8 lg:px-16 xl:px-24 pt-24 pb-8`}>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`${threeId ? 'max-w-2xl' : 'max-w-6xl mx-auto'} h-full flex flex-col`}
        >
          {children}
        </motion.div>
      </div>

      {/* Right side - 3D Placeholder (only when threeId is provided) */}
      {threeId && (
        <div className="hidden lg:flex flex-1 items-center justify-center relative">
          <motion.div
            initial={{ x: 50, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full h-full relative"
          >
            <div
              id={threeId}
              className="w-full h-full rounded-2xl glass-strong border border-brand-primary/20 flex items-center justify-center"
            >
              <div className="text-center text-brand-soft/60">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">3D Scene Placeholder</p>
                <p className="text-xs opacity-60">Ready for Three.js integration</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default PageFrame
