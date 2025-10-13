import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageFrame from '../components/PageFrame'
import Footer from '../components/Footer'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
    <PageFrame threeId="three-hero">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="space-y-2">
          <p className="text-brand-accent font-subtitle text-xl">
            ¡HOLA! SOY
          </p>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl lg:text-6xl font-title leading-tight"
        >
          <span className="text-gradient">Benjamin</span>
          <br />
          <span className="text-white">Oscco Arias</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.div variants={itemVariants} className="space-y-4">
          <p className="text-lg lg:text-xl text-brand-soft font-ui leading-relaxed">
            INGENIERO DE SISTEMAS • DEV WEB • SEO • AUTOMATIZACIÓN N8N • CLOUD/DEVOPS
          </p>
          <p className="text-base text-brand-soft/80 max-w-2xl font-body">
            Transformo ideas complejas en soluciones digitales elegantes. Especializado en desarrollo web, automatización de procesos y arquitecturas cloud.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-base px-8 py-4 font-ui"
            >
              VER PROYECTOS
              <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </Link>
          
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-base px-8 py-4 font-ui"
            >
              HABLEMOS
              <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-accent font-ui">50+</div>
            <div className="text-sm text-brand-soft/80 font-ui">PROYECTOS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-accent font-ui">3+</div>
            <div className="text-sm text-brand-soft/80 font-ui">AÑOS EXP.</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-accent font-ui">100%</div>
            <div className="text-sm text-brand-soft/80 font-ui">SATISFACCIÓN</div>
          </div>
        </motion.div>
      </motion.div>
      
      <Footer />
    </PageFrame>
  )
}

export default Home

