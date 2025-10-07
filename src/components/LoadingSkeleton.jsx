import React from 'react'
import { motion } from 'framer-motion'

const LoadingSkeleton = ({ 
  type = 'card', 
  count = 1, 
  className = '' 
}) => {
  const shimmerVariants = {
    initial: { opacity: 0.3 },
    animate: { 
      opacity: 0.6,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }

  const renderCardSkeleton = () => (
    <div className="glass rounded-2xl p-4 border border-white/10">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse" />
          <div className="w-16 h-6 bg-white/10 rounded-full animate-pulse" />
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded animate-pulse" />
          <div className="h-3 bg-white/10 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse" />
        </div>
        
        {/* Tech Stack */}
        <div className="flex gap-1">
          <div className="w-12 h-6 bg-white/10 rounded animate-pulse" />
          <div className="w-16 h-6 bg-white/10 rounded animate-pulse" />
          <div className="w-14 h-6 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )

  const renderTextSkeleton = () => (
    <div className="space-y-2">
      <div className="h-4 bg-white/10 rounded animate-pulse" />
      <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse" />
      <div className="h-4 bg-white/10 rounded w-4/6 animate-pulse" />
    </div>
  )

  const renderButtonSkeleton = () => (
    <div className="w-32 h-10 bg-white/10 rounded-2xl animate-pulse" />
  )

  const renderContent = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton()
      case 'text':
        return renderTextSkeleton()
      case 'button':
        return renderButtonSkeleton()
      default:
        return renderCardSkeleton()
    }
  }

  if (count === 1) {
    return (
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className={className}
      >
        {renderContent()}
      </motion.div>
    )
  }

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: index * 0.1 }}
        >
          {renderContent()}
        </motion.div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
