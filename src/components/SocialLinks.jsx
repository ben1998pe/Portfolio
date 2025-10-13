import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const SocialLinks = ({ variant = 'default', size = 'md', showLabels = false }) => {
  const socialData = [
    {
      name: 'GitHub',
      url: 'https://github.com/benjaminoscco',
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:text-gray-800 dark:hover:text-gray-200',
      bgColor: 'hover:bg-gray-100 dark:hover:bg-gray-800'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/benjaminoscco',
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    {
      name: 'Email',
      url: 'mailto:benjamin@bosccoa.com',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'hover:text-green-600 dark:hover:text-green-400',
      bgColor: 'hover:bg-green-50 dark:hover:bg-green-900/20'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/benjaminoscco',
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: 'hover:text-blue-400 dark:hover:text-blue-300',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    }
  ]

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const variants = {
    default: 'flex flex-wrap gap-3',
    vertical: 'flex flex-col gap-3',
    horizontal: 'flex flex-row gap-3',
    grid: 'grid grid-cols-2 gap-3'
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={variants[variant]}
    >
      {socialData.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative group ${sizes[size]} rounded-xl
            glass-strong border border-white/10
            flex items-center justify-center
            text-white/70 transition-all duration-300
            ${social.color} ${social.bgColor}
            hover:border-brand-primary/50
            hover:shadow-lg hover:shadow-brand-primary/20
            focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
          `}
          title={`Visitar mi ${social.name}`}
        >
          {/* Icono principal */}
          <div className="relative z-10">
            {social.icon}
          </div>

          {/* Efecto de brillo */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{
              x: '100%',
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
          />

          {/* Tooltip/Label */}
          {showLabels && (
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
                         bg-gray-900 text-white text-xs px-2 py-1 rounded
                         opacity-0 group-hover:opacity-100 transition-opacity
                         pointer-events-none whitespace-nowrap"
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              {social.name}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2
                              w-2 h-2 bg-gray-900 rotate-45" />
            </motion.div>
          )}

          {/* Efecto de pulso en hover */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-brand-primary"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{
              scale: [0, 1.2, 1],
              opacity: [0, 0.5, 0],
              transition: { duration: 0.6 }
            }}
          />
        </motion.a>
      ))}
    </motion.div>
  )
}

SocialLinks.propTypes = {
  variant: PropTypes.oneOf(['default', 'vertical', 'horizontal', 'grid']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showLabels: PropTypes.bool
}

export default SocialLinks
