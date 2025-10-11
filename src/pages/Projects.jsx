import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import PageFrame from '../components/PageFrame'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { projectsData, categories, sortOptions } from '../data/projects'
import { MESSAGES } from '../utils/constants'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  // Cerrar modal con ESC y gestionar focus
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape)
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  const projects = projectsData
  
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
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
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
                  {MESSAGES.noProjects}
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
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  variants={itemVariants}
                />
              ))
            )}
          </motion.div>
        </motion.div>
      </PageFrame>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            modalVariants={modalVariants}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Projects
