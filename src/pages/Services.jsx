import { motion } from 'framer-motion'
import PageFrame from '../components/PageFrame'

const Services = () => {
  const services = [
    {
      title: "WordPress a Medida",
      description: "Desarrollo de sitios web personalizados con WordPress, plugins custom y temas únicos.",
      icon: "🌐",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "SEO & Analytics",
      description: "Optimización para motores de búsqueda y análisis de datos para maximizar conversiones.",
      icon: "📈",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Automatización n8n",
      description: "Flujos de trabajo automatizados que conectan sistemas y optimizan procesos empresariales.",
      icon: "⚡",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Scraping & Data",
      description: "Extracción inteligente de datos web y análisis para insights empresariales.",
      icon: "🔍",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Cloud & DevOps",
      description: "Arquitecturas cloud escalables y pipelines de CI/CD para despliegues eficientes.",
      icon: "☁️",
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "Experimentos Creativos",
      description: "Proyectos innovadores que combinan tecnología y creatividad para experiencias únicas.",
      icon: "🎨",
      color: "from-pink-500 to-purple-500"
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
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
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
        className="space-y-12"
      >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold">
              <span className="text-gradient">Servicios</span>
            </h1>
            <p className="text-xl text-brand-soft max-w-3xl mx-auto">
              Soluciones digitales completas que impulsan el crecimiento de tu negocio
            </p>
          </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer"
              >
                <div className="glass rounded-2xl p-6 h-full hover-lift border border-white/10 group-hover:border-brand-primary/30 transition-all duration-300">
                <div className="space-y-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-brand-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-brand-soft/80 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="flex items-center text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Saber más</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  </div>
                </div>
                </motion.div>
            ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          variants={itemVariants}
          className="text-center pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-accent text-lg px-8 py-4"
          >
            ¿Necesitas algo específico?
            <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </PageFrame>
  )
}

export default Services

