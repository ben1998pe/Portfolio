import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const SettingsPanel = ({ isOpen, onClose }) => {
  const {
    theme,
    animationsEnabled,
    soundEnabled,
    particlesEnabled,
    toggleTheme,
    toggleAnimations,
    toggleSound,
    toggleParticles,
    resetSettings
  } = useTheme()

  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleReset = () => {
    resetSettings()
    setShowResetConfirm(false)
  }

  const settings = [
    {
      id: 'theme',
      title: 'Tema',
      description: 'Cambiar entre modo oscuro y claro',
      type: 'toggle',
      value: theme,
      options: [
        { label: 'Oscuro', value: 'dark', icon: '🌙' },
        { label: 'Claro', value: 'light', icon: '☀️' }
      ],
      action: toggleTheme
    },
    {
      id: 'animations',
      title: 'Animaciones',
      description: 'Habilitar o deshabilitar animaciones',
      type: 'switch',
      value: animationsEnabled,
      action: toggleAnimations
    },
    {
      id: 'particles',
      title: 'Partículas',
      description: 'Mostrar partículas flotantes en el fondo',
      type: 'switch',
      value: particlesEnabled,
      action: toggleParticles
    },
    {
      id: 'sound',
      title: 'Efectos de Sonido',
      description: 'Reproducir sonidos al interactuar',
      type: 'switch',
      value: soundEnabled,
      action: toggleSound
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-full bg-brand-ink/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white font-title">
                  CONFIGURACIÓN
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Cerrar configuración"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                {settings.map((setting) => (
                  <div key={setting.id} className="space-y-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white font-ui">
                        {setting.title}
                      </h3>
                      <p className="text-xs text-brand-soft font-body">
                        {setting.description}
                      </p>
                    </div>

                    {setting.type === 'toggle' ? (
                      <div className="flex gap-2">
                        {setting.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setting.action()}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-ui transition-all duration-300 ${
                              setting.value === option.value
                                ? 'bg-brand-primary text-white'
                                : 'bg-white/10 text-brand-soft hover:bg-white/20'
                            }`}
                          >
                            <span>{option.icon}</span>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-brand-soft font-body">
                          {setting.value ? 'Habilitado' : 'Deshabilitado'}
                        </span>
                        <button
                          onClick={setting.action}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            setting.value ? 'bg-brand-primary' : 'bg-white/20'
                          }`}
                          aria-label={`${setting.value ? 'Deshabilitar' : 'Habilitar'} ${setting.title}`}
                        >
                          <motion.div
                            className="absolute top-1 w-4 h-4 bg-white rounded-full"
                            animate={{ x: setting.value ? 28 : 4 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Reset Button */}
              <div className="pt-6 border-t border-white/10">
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl text-sm font-ui transition-colors duration-300"
                >
                  RESTAURAR CONFIGURACIÓN
                </button>
              </div>
            </div>

            {/* Reset Confirmation Modal */}
            <AnimatePresence>
              {showResetConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-brand-ink rounded-2xl p-6 max-w-sm w-full border border-white/10"
                  >
                    <h3 className="text-lg font-bold text-white font-ui mb-2">
                      ¿RESTAURAR CONFIGURACIÓN?
                    </h3>
                    <p className="text-sm text-brand-soft font-body mb-4">
                      Esta acción restablecerá todas las configuraciones a sus valores predeterminados.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleReset}
                        className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-ui transition-colors"
                      >
                        RESTAURAR
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-ui transition-colors"
                      >
                        CANCELAR
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SettingsPanel
