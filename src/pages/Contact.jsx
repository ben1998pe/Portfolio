import { motion } from 'framer-motion'
import { useState } from 'react'
import PageFrame from '../components/PageFrame'
import { useNotification } from '../contexts/NotificationContext'
import useLoading from '../hooks/useLoading'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const { showSuccess, showError, showInfo } = useNotification()
  const { isLoading, withLoading } = useLoading()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showError('Por favor, completa todos los campos requeridos')
      return
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showError('Por favor, ingresa un email válido')
      return
    }

    try {
      await withLoading(async () => {
        // Simular envío del formulario
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Aquí iría la lógica real de envío
        console.log('Form submitted:', formData)
        
        showSuccess('¡Mensaje enviado correctamente! Te contactaré pronto.')
        
        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      }, 'Enviando mensaje...')
    } catch (error) {
      showError('Error al enviar el mensaje. Por favor, inténtalo de nuevo.')
    }
  }

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "benjamin@bosccoa.com",
      action: "mailto:benjamin@bosccoa.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "linkedin.com/in/benjaminoscco",
      action: "https://linkedin.com/in/benjaminoscco",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: "🐙",
      title: "GitHub",
      value: "github.com/benjaminoscco",
      action: "https://github.com/benjaminoscco",
      color: "from-gray-500 to-gray-700"
    },
    {
      icon: "📱",
      title: "WhatsApp",
      value: "+51 999 888 777",
      action: "https://wa.me/51999888777",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <PageFrame threeId={null}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-3xl lg:text-4xl font-title">
            <span className="text-gradient">CONTACTO</span>
          </h1>
          <p className="text-base text-brand-soft max-w-2xl mx-auto font-body">
            ¿Tienes un proyecto en mente? ¡Hablemos y hagamos que suceda!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Methods */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white font-ui">CONECTEMOS</h2>
              <p className="text-brand-soft leading-relaxed font-body">
                Elige la forma que prefieras para contactarme. Estoy disponible para proyectos nuevos, consultorías y colaboraciones interesantes.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer"
                >
                  <div className="glass rounded-2xl p-4 hover-lift border border-white/10 group-hover:border-brand-primary/30 transition-all duration-300 h-full">
                    <div className="space-y-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-brand-accent transition-colors font-ui">
                          {method.title.toUpperCase()}
                        </h3>
                        <p className="text-sm text-brand-soft/80 mt-1 font-body">
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 font-ui">ENVÍAME UN MENSAJE</h2>
              <p className="text-brand-soft font-body">
                Completa el formulario y me pondré en contacto contigo lo antes posible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2 font-ui">
                    NOMBRE *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-brand-soft/60 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2 font-ui">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-brand-soft/60 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 font-ui">
                  ASUNTO *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-brand-soft/60 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300"
                  placeholder="¿En qué puedo ayudarte?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 font-ui">
                  MENSAJE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-brand-soft/60 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300 resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    disabled={isLoading}
                    className={`w-full py-3 font-ui transition-all duration-300 ${
                      isLoading 
                        ? 'bg-brand-primary/50 cursor-not-allowed' 
                        : 'btn-primary'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ENVIANDO...
                      </div>
                    ) : (
                      <>
                        ENVIAR MENSAJE
                        <svg className="inline-block ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </PageFrame>
  )
}

export default Contact
