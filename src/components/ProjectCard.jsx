import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { DISPLAY_LIMITS } from '../utils/constants'

const ProjectCard = ({ project, onClick, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
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
              {project.tech.slice(0, DISPLAY_LIMITS.techStackPreview).map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-brand-primary/20 text-brand-accent text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > DISPLAY_LIMITS.techStackPreview && (
                <span className="px-2 py-1 bg-brand-primary/10 text-brand-soft/60 text-xs rounded-md">
                  +{project.tech.length - DISPLAY_LIMITS.techStackPreview}
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
  )
}

ProjectCard.propTypes = {
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
  onClick: PropTypes.func.isRequired,
  variants: PropTypes.object
}

export default ProjectCard

