import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import PageFrame from '../components/PageFrame'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const projects = [
    {
      id: 1,
      title: "BugBoard WP Plugin",
      description: "Plugin de WordPress para gestión de bugs y tickets con dashboard avanzado.",
      image: "🐛",
      tech: ["WordPress", "PHP", "JavaScript", "MySQL"],
      status: "Completado",
      color: "from-red-500 to-orange-500",
      category: "WordPress",
      year: 2024,
      github: "https://github.com/benjaminoscco/bugboard-wp",
      demo: "https://bugboard-demo.bosccoa.com",
      featured: true,
      longDescription: "Desarrollé un plugin completo de WordPress que permite a los equipos de desarrollo gestionar bugs y tickets de manera eficiente. Incluye dashboard personalizable, sistema de notificaciones, reportes automáticos y integración con APIs externas."
    },
    {
      id: 2,
      title: "Scrapers Python",
      description: "Suite de herramientas de web scraping para extracción de datos masiva.",
      image: "🐍",
      tech: ["Python", "Selenium", "BeautifulSoup", "PostgreSQL"],
      status: "En desarrollo",
      color: "from-green-500 to-teal-500",
      category: "Python",
      year: 2024,
      github: "https://github.com/benjaminoscco/python-scrapers",
      demo: null,
      featured: false,
      longDescription: "Colección de scripts de Python para web scraping que automatizan la extracción de datos de múltiples fuentes. Incluye manejo de proxies, rotación de user agents, y almacenamiento en base de datos."
    },
    {
      id: 3,
      title: "Workable Talent Pool",
      description: "Sistema de gestión de talento con automatización de procesos de reclutamiento.",
      image: "👥",
      tech: ["React", "Node.js", "MongoDB", "n8n"],
      status: "Completado",
      color: "from-blue-500 to-indigo-500",
      category: "Full Stack",
      year: 2023,
      github: "https://github.com/benjaminoscco/workable-talent",
      demo: "https://talent-pool.bosccoa.com",
      featured: true,
      longDescription: "Aplicación web completa para gestión de talento que automatiza el proceso de reclutamiento. Integra con APIs de LinkedIn, envía emails automáticos, y genera reportes de candidatos."
    },
    {
      id: 4,
      title: "Cloud Analytics Dashboard",
      description: "Dashboard en tiempo real para monitoreo de infraestructura cloud.",
      image: "📊",
      tech: ["Vue.js", "AWS", "Docker", "Grafana"],
      status: "Completado",
      color: "from-purple-500 to-pink-500",
      category: "DevOps",
      year: 2023,
      github: "https://github.com/benjaminoscco/cloud-dashboard",
      demo: "https://cloud-analytics.bosccoa.com",
      featured: false,
      longDescription: "Dashboard interactivo para monitoreo de infraestructura cloud con métricas en tiempo real, alertas automáticas y visualizaciones personalizables."
    },
    {
      id: 5,
      title: "E-commerce Automation",
      description: "Sistema automatizado de gestión de inventario y pedidos.",
      image: "🛒",
      tech: ["Shopify", "n8n", "Python", "Webhooks"],
      status: "En desarrollo",
      color: "from-yellow-500 to-orange-500",
      category: "Automation",
      year: 2024,
      github: "https://github.com/benjaminoscco/ecommerce-automation",
      demo: null,
      featured: false,
      longDescription: "Sistema de automatización para e-commerce que sincroniza inventario, procesa pedidos automáticamente y envía notificaciones a clientes."
    },
    {
      id: 6,
      title: "SEO Optimizer Tool",
      description: "Herramienta de análisis y optimización SEO con reportes automatizados.",
      image: "🔍",
      tech: ["Next.js", "Python", "Google APIs", "Chart.js"],
      status: "Completado",
      color: "from-cyan-500 to-blue-500",
      category: "SEO",
      year: 2024,
      github: "https://github.com/benjaminoscco/seo-optimizer",
      demo: "https://seo-tool.bosccoa.com",
      featured: true,
      longDescription: "Herramienta completa de análisis SEO que genera reportes automáticos, sugiere mejoras y monitorea el rendimiento de sitios web."
    }
  ]

  // Filtros y categorías
  const categories = ['all', 'WordPress', 'Python', 'Full Stack', 'DevOps', 'Automation', 'SEO']
  
  // Función para filtrar proyectos
  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    if (filter === 'featured') return project.featured
    return project.category === filter
  })

  // Función para ordenar proyectos
  const sortedProjects = filteredProjects.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.year - a.year
      case 'name':
        return a.title.localeCompare(b.title)
      case 'status':
        return a.status.localeCompare(b.status)
      default:
        return 0
    }
  })

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
            <motion.div variants={itemVariants} className="text-center space-y-4 mb-8">
              <h1 className="text-3xl lg:text-4xl font-title">
                <span className="text-gradient">PROYECTOS</span>
              </h1>
              <p className="text-base text-brand-soft max-w-2xl mx-auto font-body">
                Una selección de mis trabajos más destacados y proyectos en desarrollo
              </p>
              <div className="text-sm text-brand-accent font-ui">
                {sortedProjects.length} {sortedProjects.length === 1 ? 'proyecto' : 'proyectos'} 
                {filter !== 'all' && ` en ${filter === 'featured' ? 'destacados' : filter}`}
              </div>
              
              {/* Filtros y Ordenamiento */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                {/* Filtros por categoría */}
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos por categoría">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilter(category)}
                      className={`px-4 py-2 rounded-xl text-sm font-ui transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-ink ${
                        filter === category
                          ? 'bg-brand-primary text-white'
                          : 'bg-white/10 text-brand-soft hover:bg-white/20'
                      }`}
                      aria-pressed={filter === category}
                      aria-label={`Filtrar por ${category === 'all' ? 'todos los proyectos' : category}`}
                    >
                      {category === 'all' ? 'TODOS' : category.toUpperCase()}
                    </button>
                  ))}
                </div>
                
                {/* Ordenamiento */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-sm text-brand-soft font-ui">ORDENAR:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm font-ui focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-accent"
                    aria-label="Ordenar proyectos"
                  >
                    <option value="recent">MÁS RECIENTES</option>
                    <option value="name">NOMBRE</option>
                    <option value="status">ESTADO</option>
                  </select>
                </div>
              </div>
            </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={containerVariants}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden"
          >
            {sortedProjects.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-brand-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white font-ui mb-2">
                  NO HAY PROYECTOS
                </h3>
                <p className="text-brand-soft font-body mb-4">
                  No se encontraron proyectos que coincidan con el filtro seleccionado.
                </p>
                <button
                  onClick={() => setFilter('all')}
                  className="btn-primary text-sm px-4 py-2"
                >
                  VER TODOS LOS PROYECTOS
                </button>
              </div>
            ) : (
              sortedProjects.map((project) => (
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedProject(project)
                  }
                }}
                className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-ink rounded-2xl"
                tabIndex={0}
                role="button"
                aria-label={`Ver detalles del proyecto ${project.title}`}
              >
                    <div className="glass rounded-2xl p-4 h-full hover-lift border border-white/10 group-hover:border-brand-primary/30 transition-all duration-300 flex flex-col">
                      <div className="flex-1 space-y-3">
                        {/* Project Image & Status */}
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
                            {project.image}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              project.status === 'Completado' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {project.status}
                            </span>
                            {project.featured && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-brand-primary/20 text-brand-accent">
                                DESTACADO
                              </span>
                            )}
                          </div>
                        </div>
                    
                        {/* Content */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-white group-hover:text-brand-accent transition-colors line-clamp-2 font-ui">
                              {project.title.toUpperCase()}
                            </h3>
                            <span className="text-xs text-brand-soft/60 font-ui">
                              {project.year}
                            </span>
                          </div>
                          <p className="text-brand-soft/80 text-xs leading-relaxed line-clamp-3 font-body">
                            {project.description}
                          </p>
                          
                          {/* Category */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-brand-soft/60 font-ui">CATEGORÍA:</span>
                            <span className="text-xs text-brand-accent font-ui">{project.category}</span>
                          </div>
                          
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
              ))
            )}
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
                        <div className="flex items-start justify-between">
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedProject.color} flex items-center justify-center text-3xl`}>
                            {selectedProject.image}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-brand-accent font-ui">{selectedProject.year}</div>
                            <div className="text-sm text-brand-soft font-ui">{selectedProject.category}</div>
                          </div>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gradient font-title">
                          {selectedProject.title}
                        </h2>
                        <p className="text-xl text-brand-soft font-body">
                          {selectedProject.description}
                        </p>
                        <p className="text-base text-brand-soft/80 font-body leading-relaxed">
                          {selectedProject.longDescription}
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
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-4">
                          <span className={`px-4 py-2 rounded-xl text-sm font-medium ${
                            selectedProject.status === 'Completado' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {selectedProject.status}
                          </span>
                          {selectedProject.featured && (
                            <span className="px-4 py-2 rounded-xl text-sm font-medium bg-brand-primary/20 text-brand-accent">
                              PROYECTO DESTACADO
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4">
                          {selectedProject.github && (
                            <a
                              href={selectedProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              VER EN GITHUB
                            </a>
                          )}
                          {selectedProject.demo && (
                            <a
                              href={selectedProject.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              VER DEMO
                            </a>
                          )}
                        </div>
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
