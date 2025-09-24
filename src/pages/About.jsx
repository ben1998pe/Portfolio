import { motion } from 'framer-motion'
import PageFrame from '../components/PageFrame'

const About = () => {
  const skills = [
    { name: "Desarrollo Web", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "WordPress", level: 90, color: "from-indigo-500 to-purple-500" },
    { name: "SEO & Analytics", level: 85, color: "from-green-500 to-emerald-500" },
    { name: "Automatización n8n", level: 88, color: "from-purple-500 to-pink-500" },
    { name: "Cloud & DevOps", level: 80, color: "from-orange-500 to-red-500" },
    { name: "Python", level: 85, color: "from-yellow-500 to-orange-500" }
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
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">
            <span className="text-gradient">Sobre Mí</span>
          </h1>
          <p className="text-lg text-brand-soft max-w-2xl">
            Ingeniero de Sistemas apasionado por crear soluciones digitales que marcan la diferencia
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Mi Historia</h2>
            <div className="space-y-3 text-brand-soft leading-relaxed">
              <p>
                Con más de 3 años de experiencia en el desarrollo web y la automatización de procesos, 
                me especializo en crear soluciones que no solo funcionan, sino que superan las expectativas.
              </p>
              <p>
                Mi enfoque combina la precisión técnica con una comprensión profunda de las necesidades 
                del negocio, resultando en productos que son tanto funcionales como elegantes.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Habilidades Técnicas</h2>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-brand-accent font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageFrame>
  )
}

export default About
