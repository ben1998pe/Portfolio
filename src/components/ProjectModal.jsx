import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const ProjectModal = ({ project, onClose, modalVariants }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
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
              onClick={onClose}
              className="absolute top-8 right-8 w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-brand-accent"
              aria-label="Cerrar modal de proyecto"
              title="Cerrar (ESC)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Project Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-3xl`}>
                  {project.image}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-brand-accent font-ui">{project.year}</div>
                  <div className="text-sm text-brand-soft font-ui">{project.category}</div>
                </div>
              </div>
              <h2 id="modal-title" className="text-4xl lg:text-5xl font-bold text-gradient font-title">
                {project.title}
              </h2>
              <p className="text-xl text-brand-soft font-body">
                {project.description}
              </p>
              <p className="text-base text-brand-soft/80 font-body leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Tecnologías utilizadas</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, index) => (
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
                  project.status === 'Completado' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {project.status}
                </span>
                {project.featured && (
                  <span className="px-4 py-2 rounded-xl text-sm font-medium bg-brand-primary/20 text-brand-accent">
                    PROYECTO DESTACADO
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
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
                {project.demo && (
                  <a
                    href={project.demo}
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
  )
}

ProjectModal.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    github: PropTypes.string,
    demo: PropTypes.string,
    featured: PropTypes.bool.isRequired,
    longDescription: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  modalVariants: PropTypes.object.isRequired
}

export default ProjectModal

