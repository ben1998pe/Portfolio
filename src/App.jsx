import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import CursorGlow from './components/CursorGlow'
import AnimatedParticles from './components/AnimatedParticles'
import PageTransition from './components/PageTransition'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollIndicator from './components/ScrollIndicator'
import BackToTop from './components/BackToTop'
import FloatingParticles from './components/FloatingParticles'
import { NotificationProvider } from './contexts/NotificationContext'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import useLocalStorage from './hooks/useLocalStorage'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'

const AppContent = () => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const { particlesEnabled } = useTheme()
  const [isDark, setIsDark] = useLocalStorage('theme', true)

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-brand-ink via-brand-primary to-brand-ink flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gradient">BOSCCOA</h1>
          <p className="text-brand-soft mt-2">Cargando experiencia premium...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {particlesEnabled && <FloatingParticles count={15} />}
      <AnimatedParticles isDark={isDark} />
      <ScrollIndicator />
      <CursorGlow />
      <Navigation />
      <BackToTop />
      
      <PageTransition location={location}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </PageTransition>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

