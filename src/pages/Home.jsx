import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
import EnhancedParticles from '../components/EnhancedParticles'
import EnhancedCursor from '../components/EnhancedCursor'
import FloatingActionButton from '../components/FloatingActionButton'
import { projectsData } from '../data/projects'

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  // Scroll progress para cada sección
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  })

  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"]
  })

  // Parallax transforms
  const heroY = useSpring(useTransform(heroProgress, [0, 1], [0, -100]), {
    stiffness: 100,
    damping: 30
  })

  const servicesY = useSpring(useTransform(servicesProgress, [0, 1], [50, -50]), {
    stiffness: 100,
    damping: 30
  })

  const projectsY = useSpring(useTransform(projectsProgress, [0, 1], [50, -50]), {
    stiffness: 100,
    damping: 30
  })

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

  // Smooth scroll to section
  const scrollToSection = (ref) => {
    if (ref.current) {
      const offsetTop = ref.current.offsetTop - 100 // Offset para el header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Componentes mejorados */}
      <ScrollProgress />
      <EnhancedParticles count={60} />
      <EnhancedCursor />
      <FloatingActionButton />
      
      {/* Fondos animados globales */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: heroY }}
          className="absolute top-0 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: servicesY }}
          className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: projectsY }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-orange-500/15 to-yellow-500/15 rounded-full blur-3xl"
        />
      </div>

      {/* HERO SECTION */}
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center px-4 relative w-full">
        <motion.div
          style={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
          }}
          className="max-w-6xl mx-auto text-center space-y-8 w-full"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
            className="inline-block"
          >
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 border border-brand-primary/30 backdrop-blur-sm relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative text-sm font-subtitle bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                ✨ DISPONIBLE PARA PROYECTOS
              </span>
            </div>
          </motion.div>

          {/* Nombre */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-title leading-tight">
              <motion.span
                className="block text-gradient"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Benjamin
              </motion.span>
              <span className="block text-white mt-4">Oscco Arias</span>
            </h1>
          </motion.div>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl text-brand-soft font-body max-w-4xl mx-auto leading-relaxed"
          >
            Transformo ideas complejas en{' '}
            <span className="text-gradient font-body-semibold">
              soluciones digitales elegantes
            </span>
            . Especializado en desarrollo web, automatización de procesos y arquitecturas cloud.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <motion.button
              onClick={() => scrollToSection(projectsRef)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-10 py-5 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <span className="relative flex items-center gap-3">
                VER PROYECTOS
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection(contactRef)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-10 py-5"
            >
              HABLEMOS
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-brand-soft"
            >
              <span className="text-sm font-ui">Scroll para explorar</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" ref={servicesRef} className="min-h-screen flex items-center justify-center px-4 py-20 w-full">
        <motion.div
          style={{ y: servicesY }}
          className="max-w-6xl mx-auto w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-title text-gradient mb-6">
              SERVICIOS
            </h2>
            <p className="text-xl text-brand-soft max-w-3xl mx-auto">
              Soluciones tecnológicas completas para impulsar tu negocio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Desarrollo Web",
                description: "Aplicaciones web modernas con React, Vue.js y tecnologías de vanguardia",
                icon: "💻",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Automatización N8N",
                description: "Automatización de procesos empresariales para aumentar la eficiencia",
                icon: "⚡",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "SEO & Marketing",
                description: "Optimización para motores de búsqueda y estrategias de marketing digital",
                icon: "📈",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Cloud & DevOps",
                description: "Infraestructura en la nube y automatización de despliegues",
                icon: "☁️",
                color: "from-orange-500 to-yellow-500"
              },
              {
                title: "Consultoría IT",
                description: "Asesoramiento estratégico para transformación digital",
                icon: "🎯",
                color: "from-red-500 to-pink-500"
              },
              {
                title: "Mantenimiento",
                description: "Soporte continuo y actualizaciones para mantener tu sistema optimizado",
                icon: "🔧",
                color: "from-gray-500 to-blue-500"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`} />
                <div className="relative">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-title text-white mb-4">{service.title}</h3>
                  <p className="text-brand-soft leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" ref={projectsRef} className="min-h-screen flex items-center justify-center px-4 py-20 w-full">
        <motion.div
          style={{ y: projectsY }}
          className="max-w-7xl mx-auto w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-title text-gradient mb-6">
              PROYECTOS
            </h2>
            <p className="text-xl text-brand-soft max-w-3xl mx-auto">
              Una selección de mis trabajos más destacados
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`} />
                <div className="relative">
                  <div className="text-4xl mb-4">{project.image}</div>
                  <h3 className="text-2xl font-title text-white mb-3">{project.title}</h3>
                  <p className="text-brand-soft mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-lg bg-white/10 text-xs font-ui text-brand-soft">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-ui"
                      >
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary/80 transition-colors text-sm font-ui text-white"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" ref={aboutRef} className="min-h-screen flex items-center justify-center px-4 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center w-full"
        >
          <h2 className="text-5xl lg:text-6xl font-title text-gradient mb-8">
            SOBRE MÍ
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl text-brand-soft leading-relaxed">
                Soy un <span className="text-gradient font-semibold">Ingeniero de Sistemas</span> apasionado por crear 
                soluciones tecnológicas que transformen ideas en realidad. Con más de 3 años de experiencia, 
                me especializo en desarrollo web moderno, automatización de procesos y arquitecturas cloud.
              </p>
              <p className="text-lg text-brand-soft leading-relaxed">
                Mi enfoque combina <span className="text-brand-accent font-semibold">creatividad técnica</span> con 
                <span className="text-brand-primary font-semibold"> soluciones prácticas</span>, siempre buscando 
                la excelencia en cada proyecto que desarrollo.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { label: 'PROYECTOS', value: '50+', color: 'text-brand-primary' },
                  { label: 'AÑOS EXP.', value: '3+', color: 'text-brand-accent' },
                  { label: 'SATISFACCIÓN', value: '100%', color: 'text-purple-400' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/50 transition-all"
                  >
                    <div className={`text-4xl font-bold ${stat.color} font-ui`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-brand-soft font-ui mt-2">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-3xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="text-8xl">👨‍💻</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" ref={contactRef} className="min-h-screen flex items-center justify-center px-4 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center w-full"
        >
          <h2 className="text-5xl lg:text-6xl font-title text-gradient mb-8">
            CONTACTO
          </h2>
          <p className="text-xl text-brand-soft mb-12 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? ¡Hablemos y hagámoslo realidad!
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all"
            >
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-2xl font-title text-white mb-4">Email</h3>
              <p className="text-brand-soft mb-4">benjamin@bosccoa.com</p>
              <a
                href="mailto:benjamin@bosccoa.com"
                className="btn-primary text-sm px-6 py-3"
              >
                Enviar Email
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl font-title text-white mb-4">LinkedIn</h3>
              <p className="text-brand-soft mb-4">Conectemos profesionalmente</p>
              <a
                href="https://linkedin.com/in/benjaminoscco"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm px-6 py-3"
              >
                Ver Perfil
              </a>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-3xl bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 backdrop-blur-sm border border-brand-primary/30"
          >
            <h3 className="text-2xl font-title text-white mb-4">¿Listo para empezar?</h3>
            <p className="text-brand-soft mb-6">
              Cuéntame sobre tu proyecto y trabajemos juntos para hacerlo realidad
            </p>
            <a
              href="mailto:benjamin@bosccoa.com"
              className="btn-primary text-lg px-10 py-4"
            >
              COMENZAR PROYECTO
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

export default Home