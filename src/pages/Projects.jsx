import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import PageFrame from '../components/PageFrame'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { projectsData, categories, sortOptions } from '../data/projects'
import { MESSAGES } from '../utils/constants'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Parallax transforms con spring para suavidad
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  const projects = projectsData
  
  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    if (filter === 'featured') return project.featured
    return project.category === filter
  })

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
        <div ref={containerRef} className="relative min-h-screen overflow-hidden">
          {/* Fondo animado con gradientes múltiples */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
              style={{ y: y1 }}
              className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
            />
            <motion.div
              style={{ y: y2 }}
              className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
            />
            <motion.div
              style={{ y: y3 }}
              className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"
            />
          </div>

          {/* Partículas flotantes decorativas */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Hero Section con Parallax */}
          <motion.div
            style={{ 
              opacity,
              scale,
              y: y1
            }}
            className="relative pt-20 pb-16 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center space-y-6 max-w-5xl mx-auto"
            >
              {/* Badge decorativo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                className="inline-block"
              >
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
                  <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ✨ PORTAFOLIO 2024
                  </span>
                </div>
              </motion.div>

              {/* Título principal con efecto 3D */}
              <motion.h1
                style={{
                  x: mousePosition.x * 0.5,
                  y: mousePosition.y * 0.5,
                }}
                className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 80px rgba(168, 85, 247, 0.4)',
                  }}
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  MIS PROYECTOS
                </motion.span>
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Una colección curada de proyectos que combinan{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">
                  diseño excepcional
                </span>
                {' '}con{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                  código de calidad
                </span>
              </motion.p>

              {/* Stats con glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-6 pt-8"
              >
                {[
                  { label: 'Proyectos', value: projectsData.length },
                  { label: 'Tecnologías', value: '15+' },
                  { label: 'Destacados', value: projectsData.filter(p => p.featured).length }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                    style={{
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Filtros con efecto glassmorphism mejorado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="sticky top-20 z-30 px-4 pb-8"
          >
            <div className="max-w-7xl mx-auto">
              <div className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 blur-xl opacity-50" />
                
                <div className="relative flex flex-col lg:flex-row gap-6 items-center justify-between">
                  {/* Filtros por categoría */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        onClick={() => setFilter(category)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden ${
                          filter === category
                            ? 'text-white'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {/* Background animado */}
                        <div className={`absolute inset-0 transition-all duration-300 ${
                          filter === category
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 opacity-100'
                            : 'bg-white/5 group-hover:bg-white/10 opacity-100'
                        }`} />
                        
                        {/* Efecto de brillo en hover */}
                        {filter === category && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                          />
                        )}
                        
                        <span className="relative z-10 font-semibold tracking-wide">
                          {category === 'all' ? 'TODOS' : category.toUpperCase()}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Ordenamiento mejorado */}
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-400">
                      Ordenar por:
                    </label>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none px-6 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium cursor-pointer hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-gray-900">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Contador de resultados */}
                  <motion.div
                    key={sortedProjects.length}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                  >
                    <span className="text-sm font-semibold text-purple-300">
                      {sortedProjects.length} {sortedProjects.length === 1 ? 'Proyecto' : 'Proyectos'}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid de proyectos con parallax individual */}
          <div className="px-4 pb-20">
            <div className="max-w-7xl mx-auto">
              {sortedProjects.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 border border-white/10">
                    <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    No hay proyectos
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    {MESSAGES.noProjects}
                  </p>
                  <motion.button
                    onClick={() => setFilter('all')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                  >
                    Ver todos los proyectos
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {sortedProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.1,
                        layout: { duration: 0.3 }
                      }}
                      style={{
                        y: useTransform(scrollYProgress, [0, 1], [0, -50 * (index % 3)])
                      }}
                    >
                      <ProjectCard
                        project={project}
                        onClick={() => setSelectedProject(project)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
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
