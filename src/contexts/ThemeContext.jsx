import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Verificar preferencia guardada o usar preferencia del sistema
    const savedTheme = localStorage.getItem('bosccoa-theme')
    if (savedTheme) {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const saved = localStorage.getItem('bosccoa-animations')
    return saved ? JSON.parse(saved) : true
  })

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('bosccoa-sound')
    return saved ? JSON.parse(saved) : false
  })

  const [particlesEnabled, setParticlesEnabled] = useState(() => {
    const saved = localStorage.getItem('bosccoa-particles')
    return saved ? JSON.parse(saved) : true
  })

  // Aplicar tema al documento
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    
    // Actualizar meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f0f23' : '#ffffff')
    }
  }, [theme])

  // Guardar preferencias en localStorage
  useEffect(() => {
    localStorage.setItem('bosccoa-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('bosccoa-animations', JSON.stringify(animationsEnabled))
  }, [animationsEnabled])

  useEffect(() => {
    localStorage.setItem('bosccoa-sound', JSON.stringify(soundEnabled))
  }, [soundEnabled])

  useEffect(() => {
    localStorage.setItem('bosccoa-particles', JSON.stringify(particlesEnabled))
  }, [particlesEnabled])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev)
  }

  const toggleSound = () => {
    setSoundEnabled(prev => !prev)
  }

  const toggleParticles = () => {
    setParticlesEnabled(prev => !prev)
  }

  const resetSettings = () => {
    setTheme('dark')
    setAnimationsEnabled(true)
    setSoundEnabled(false)
    setParticlesEnabled(true)
  }

  const value = {
    theme,
    animationsEnabled,
    soundEnabled,
    particlesEnabled,
    toggleTheme,
    toggleAnimations,
    toggleSound,
    toggleParticles,
    resetSettings
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
