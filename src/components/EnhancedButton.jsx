import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const EnhancedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = `
    relative overflow-hidden rounded-xl font-medium transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `

  const variants = {
    primary: `
      bg-gradient-to-r from-brand-primary to-brand-accent
      text-white shadow-lg shadow-brand-primary/25
      hover:shadow-xl hover:shadow-brand-primary/40
      focus:ring-brand-primary
      active:scale-95
    `,
    secondary: `
      bg-white/10 text-brand-accent border border-brand-primary/30
      hover:bg-white/20 hover:border-brand-primary/50
      focus:ring-brand-primary
      backdrop-blur-sm
    `,
    ghost: `
      text-brand-accent hover:bg-brand-primary/10
      focus:ring-brand-primary
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-pink-500
      text-white shadow-lg shadow-red-500/25
      hover:shadow-xl hover:shadow-red-500/40
      focus:ring-red-500
      active:scale-95
    `
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
  `

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ 
        scale: disabled || loading ? 1 : 1.05,
        y: disabled || loading ? 0 : -2
      }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      {...props}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{
          scale: 2,
          opacity: [0, 0.3, 0],
          transition: { duration: 0.4 }
        }}
      />

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        className={`relative flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
      />
    </motion.button>
  )
}

EnhancedButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default EnhancedButton
