import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useInView } from 'framer-motion'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
import EnhancedParticles from '../components/EnhancedParticles'
import EnhancedCursor from '../components/EnhancedCursor'
import FloatingActionButton from '../components/FloatingActionButton'
import TypingAnimation from '../components/TypingAnimation'
import ToastContainer from '../components/ToastContainer'
import useToast from '../hooks/useToast'
import { projectsData } from '../data/projects'

// Componente de contador animado
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true })

  useEffect(() => {
    if (!isInView) return

    const numericValue = parseInt(value.replace(/\D/g, ''))
    const increment = numericValue / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, value, duration])

  const suffix = value.replace(/[0-9]/g, '')
  return <span ref={nodeRef}>{count}{suffix}</span>
}

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showWelcome, setShowWelcome] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState('día')
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)
  const { toasts, removeToast, showSuccess, showInfo } = useToast()

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

  // Detectar hora del día para personalizar saludo
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setTimeOfDay('mañana')
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay('tarde')
    } else {
      setTimeOfDay('noche')
    }
  }, [])

  // Mouse parallax effect (optimizado con useCallback)
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e
    const x = (clientX / window.innerWidth - 0.5) * 20
    const y = (clientY / window.innerHeight - 0.5) * 20
    setMousePosition({ x, y })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Welcome notification personalizada por hora del día
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true)
      const greetings = {
        'mañana': '¡Buenos días! ☀️ Bienvenido a mi portafolio',
        'tarde': '¡Buenas tardes! 🌤️ Bienvenido a mi portafolio',
        'noche': '¡Buenas noches! 🌙 Bienvenido a mi portafolio'
      }
      showSuccess(greetings[timeOfDay], 4000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [showSuccess, timeOfDay])

  // Info notification when scrolling
  useEffect(() => {
    let hasShownScrollInfo = false
    
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasShownScrollInfo) {
        hasShownScrollInfo = true
        showInfo('¡Explora las diferentes secciones! 👆', 3000)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showInfo])

  // Smooth scroll to section (optimizado con useCallback)
  const scrollToSection = useCallback((ref) => {
    if (ref.current) {
      const offsetTop = ref.current.offsetTop - 100 // Offset para el header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }, [])

  // Memoizar datos de proyectos filtrados
  const featuredProjects = useMemo(() => projectsData.slice(0, 6), [])

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Componentes mejorados */}
      <ScrollProgress />
      <EnhancedParticles count={80} />
      <EnhancedCursor />
      <FloatingActionButton />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
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
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center px-4 relative w-full" aria-label="Sección de inicio">
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
              <span className="relative text-sm font-subtitle bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent" role="status" aria-live="polite">
                ✨ DISPONIBLE PARA PROYECTOS • {timeOfDay === 'mañana' ? '☀️' : timeOfDay === 'tarde' ? '🌤️' : '🌙'}
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

          {/* Descripción con typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl text-brand-soft font-body max-w-4xl mx-auto leading-relaxed"
          >
            <TypingAnimation
              text="Transformo ideas complejas en "
              speed={50}
              delay={1000}
              className="text-brand-soft"
            />
            <TypingAnimation
              text="soluciones digitales elegantes"
              speed={30}
              delay={3000}
              className="text-gradient font-body-semibold"
            />
            <TypingAnimation
              text=". Especializado en desarrollo web, automatización de procesos y arquitecturas cloud."
              speed={40}
              delay={6000}
              className="text-brand-soft"
            />
          </motion.div>

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
              onClick={() => {
                scrollToSection(contactRef)
                showInfo('¡Perfecto! Te llevo a la sección de contacto 💬', 3000)
              }}
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
      <section id="services" ref={servicesRef} className="min-h-screen flex items-center justify-center px-4 py-20 w-full" aria-label="Servicios ofrecidos">
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
      <section id="projects" ref={projectsRef} className="min-h-screen flex items-center justify-center px-4 py-20 w-full" aria-label="Proyectos destacados">
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
            {featuredProjects.map((project, index) => (
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

      {/* SKILLS SECTION */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20 w-full" aria-label="Tecnologías y habilidades">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto w-full"
        >
          <motion.div
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-title text-gradient mb-6">
              TECNOLOGÍAS
            </h2>
            <p className="text-xl text-brand-soft max-w-3xl mx-auto">
              Herramientas y lenguajes con los que trabajo día a día
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'React', icon: '⚛️', color: 'from-cyan-500 to-blue-500', level: 95 },
              { name: 'JavaScript', icon: '🟨', color: 'from-yellow-500 to-orange-500', level: 90 },
              { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-500', level: 85 },
              { name: 'Python', icon: '🐍', color: 'from-blue-500 to-indigo-500', level: 88 },
              { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-blue-600', level: 80 },
              { name: 'AWS', icon: '☁️', color: 'from-orange-500 to-yellow-500', level: 75 },
              { name: 'Git', icon: '📦', color: 'from-orange-600 to-red-600', level: 92 },
              { name: 'TypeScript', icon: '📘', color: 'from-blue-600 to-blue-800', level: 87 },
              { name: 'Tailwind', icon: '💨', color: 'from-cyan-400 to-blue-500', level: 93 },
              { name: 'MongoDB', icon: '🍃', color: 'from-green-600 to-green-800', level: 82 },
              { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-500 to-indigo-600', level: 78 },
              { name: 'N8N', icon: '⚡', color: 'from-purple-500 to-pink-500', level: 90 }
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity`} />
                <div className="relative flex flex-col items-center gap-3">
                  <motion.div 
                    className="text-5xl"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="text-lg font-title text-white">{skill.name}</h3>
                  
                  {/* Barra de progreso */}
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>
                  <span className="text-xs text-brand-soft font-ui">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certificaciones destacadas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-3xl font-title text-gradient mb-8">Certificaciones & Logros</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                '🏆 AWS Certified',
                '🎓 Full Stack Developer',
                '⚡ DevOps Engineer',
                '🚀 Scrum Master'
              ].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 border border-brand-primary/30 backdrop-blur-sm text-white font-ui"
                >
                  {cert}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" ref={aboutRef} className="min-h-screen flex items-center justify-center px-4 py-20 w-full" aria-label="Sobre mí">
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
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/50 transition-all"
                  >
                    <div className={`text-4xl font-bold ${stat.color} font-ui`}>
                      <AnimatedCounter value={stat.value} duration={2000} />
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

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="min-h-screen flex items-center justify-center px-4 py-20 w-full" aria-label="Testimonios de clientes">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto w-full"
        >
          <motion.div
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-title text-gradient mb-6">
              TESTIMONIOS
            </h2>
            <p className="text-xl text-brand-soft max-w-3xl mx-auto">
              Lo que dicen mis clientes sobre mi trabajo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "CEO, TechStart",
                avatar: "👩‍💼",
                text: "Benjamin transformó completamente nuestra plataforma web. Su atención al detalle y conocimiento técnico son excepcionales. El proyecto se entregó a tiempo y superó nuestras expectativas.",
                rating: 5,
                color: "from-pink-500 to-purple-500"
              },
              {
                name: "Carlos Mendoza",
                role: "Director, InnovateCorp",
                avatar: "👨‍💻",
                text: "Excelente trabajo en la automatización de nuestros procesos con N8N. Ahora ahorramos 20 horas semanales en tareas repetitivas. Benjamin es un profesional de primera clase.",
                rating: 5,
                color: "from-blue-500 to-cyan-500"
              },
              {
                name: "Ana Rodríguez",
                role: "Marketing Manager, DigitalPro",
                avatar: "👩‍🎨",
                text: "La implementación de SEO y las mejoras de rendimiento aumentaron nuestro tráfico web en un 300%. Benjamin entiende perfectamente las necesidades del negocio.",
                rating: 5,
                color: "from-green-500 to-emerald-500"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`} />
                <div className="relative">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="text-yellow-400 text-xl"
                      >
                        ⭐
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-brand-soft leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <h4 className="text-white font-title text-lg">{testimonial.name}</h4>
                      <p className="text-brand-accent text-sm font-ui">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats adicionales */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Clientes Satisfechos', value: '25+', icon: '😊' },
              { label: 'Proyectos Completados', value: '50+', icon: '🚀' },
              { label: 'Tiempo de Entrega', value: '99%', icon: '⏰' },
              { label: 'Satisfacción', value: '100%', icon: '⭐' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/50 transition-all"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white font-ui mb-1">
                  <AnimatedCounter value={stat.value} duration={1500} />
                </div>
                <div className="text-sm text-brand-soft font-ui">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" ref={contactRef} className="min-h-screen flex items-center justify-center px-4 py-20 w-full" aria-label="Información de contacto">
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
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Información de contacto */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <h3 className="text-xl font-title text-white">Email</h3>
                    <p className="text-brand-soft">benjamin@bosccoa.com</p>
                  </div>
                </div>
                <a
                  href="mailto:benjamin@bosccoa.com"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Enviar Email
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">💬</div>
                  <div>
                    <h3 className="text-xl font-title text-white">LinkedIn</h3>
                    <p className="text-brand-soft">Conectemos profesionalmente</p>
                  </div>
                </div>
                <a
                  href="https://linkedin.com/in/benjaminoscco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Ver Perfil
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">⏰</div>
                  <div>
                    <h3 className="text-xl font-title text-white">Tiempo de Respuesta</h3>
                    <p className="text-brand-soft">Menos de 24 horas</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Formulario de contacto */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-2xl font-title text-white mb-6">Envíame un mensaje</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-brand-soft text-sm font-ui mb-2">Nombre</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-primary focus:outline-none text-white placeholder-brand-soft"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-brand-soft text-sm font-ui mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-primary focus:outline-none text-white placeholder-brand-soft"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-brand-soft text-sm font-ui mb-2">Proyecto</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-primary focus:outline-none text-white">
                    <option value="">Selecciona el tipo de proyecto</option>
                    <option value="web">Desarrollo Web</option>
                    <option value="automation">Automatización</option>
                    <option value="seo">SEO & Marketing</option>
                    <option value="consulting">Consultoría</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-brand-soft text-sm font-ui mb-2">Mensaje</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-primary focus:outline-none text-white placeholder-brand-soft resize-none"
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-primary py-4 text-lg font-title"
                  onClick={(e) => {
                    e.preventDefault()
                    showSuccess('¡Mensaje enviado! Te contactaré pronto 📧', 4000)
                  }}
                >
                  ENVIAR MENSAJE
                </motion.button>
              </form>
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