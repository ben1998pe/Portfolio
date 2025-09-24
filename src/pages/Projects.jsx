import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import PageFrame from '../components/PageFrame'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "BugBoard WP Plugin",
      description: "Plugin de WordPress para gestión de bugs y tickets con dashboard avanzado.",
      image: "🐛",
      tech: ["WordPress", "PHP", "JavaScript", "MySQL"],
      status: "Completado",
      color: "from-red-500 to-orange-500"
    },
    {
      id: 2,
      title: "Scrapers Python",
      description: "Suite de herramientas de web scraping para extracción de datos masiva.",
      image: "🐍",
      tech: ["Python", "Selenium", "BeautifulSoup", "PostgreSQL"],
      status: "En desarrollo",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: "Workable Talent Pool",
      description: "Sistema de gestión de talento con automatización de procesos de reclutamiento.",
      image: "👥",
      tech: ["React", "Node.js", "MongoDB", "n8n"],
      status: "Completado",
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 4,
      title: "Cloud Analytics Dashboard",
      description: "Dashboard en tiempo real para monitoreo de infraestructura cloud.",
      image: "📊",
      tech: ["Vue.js", "AWS", "Docker", "Grafana"],
      status: "Completado",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      title: "E-commerce Automation",
      description: "Sistema automatizado de gestión de inventario y pedidos.",
      image: "🛒",
      tech: ["Shopify", "n8n", "Python", "Webhooks"],
      status: "En desarrollo",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 6,
      title: "SEO Optimizer Tool",
      description: "Herramienta de análisis y optimización SEO con reportes automatizados.",
      image: "🔍",
      tech: ["Next.js", "Python", "Google APIs", "Chart.js"],
      status: "Completado",
      color: "from-cyan-500 to-blue-500"
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

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)",
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <>
      <PageFrame>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="h-full flex flex-col"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-2 mb-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Proyectos</span>
            </h1>
            <p className="text-lg text-brand-soft max-w-2xl mx-auto">
              Una selección de mis trabajos más destacados y proyectos en desarrollo
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={containerVariants}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className="glass rounded-2xl p-4 h-full hover-lift border border-white/10 group-hover:border-brand-primary/30 transition-all duration-300 flex flex-col">
                  <div className="flex-1 space-y-3">
                    {/* Project Image & Status */}
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
                        {project.image}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completado' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-brand-accent transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-brand-soft/80 text-xs leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-brand-primary/20 text-brand-accent text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 bg-brand-primary/10 text-brand-soft/60 text-xs rounded-md">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="flex items-center text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                    <span className="text-xs font-medium">Ver detalles</span>
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </PageFrame>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-screen max-w-7xl mx-auto flex"
            >
              {/* Left side - Project Details */}
              <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 pt-24 pb-8">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl space-y-8"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-8 right-8 w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Project Header */}
                  <div className="space-y-4">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedProject.color} flex items-center justify-center text-3xl`}>
                      {selectedProject.image}
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gradient">
                      {selectedProject.title}
                    </h2>
                    <p className="text-xl text-brand-soft">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Tecnologías utilizadas</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-brand-primary/20 text-brand-accent rounded-xl font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-4 pt-4">
                    <span className={`px-4 py-2 rounded-xl text-sm font-medium ${
                      selectedProject.status === 'Completado' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {selectedProject.status}
                    </span>
                    <button className="btn-primary">
                      Ver en GitHub
                    </button>
                    <button className="btn-secondary">
                      Ver Demo
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right side - 3D Placeholder */}
              <div className="hidden lg:flex flex-1 items-center justify-center relative">
                <motion.div
                  initial={{ x: 50, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="w-full h-full relative"
                >
                  <div
                    id="three-project"
                    className="w-full h-full rounded-2xl glass-strong border border-brand-primary/20 flex items-center justify-center"
                  >
                    <div className="text-center text-brand-soft/60">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      </div>
                      <p className="text-lg font-medium">3D Project Visualization</p>
                      <p className="text-sm opacity-60">Ready for Three.js integration</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Projects
