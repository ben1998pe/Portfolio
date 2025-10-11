import { useState, useEffect } from 'react'

/**
 * Hook personalizado para detectar media queries
 * @param {string} query - Media query a evaluar (ej: '(min-width: 768px)')
 * @returns {boolean} - true si la media query coincide
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Actualizar el estado inicial
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    // Listener para cambios
    const listener = (e) => setMatches(e.matches)
    
    // Agregar listener (compatible con navegadores antiguos)
    if (media.addEventListener) {
      media.addEventListener('change', listener)
    } else {
      media.addListener(listener)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener)
      } else {
        media.removeListener(listener)
      }
    }
  }, [matches, query])

  return matches
}

/**
 * Hooks predefinidos para breakpoints comunes de Tailwind
 */
export const useIsMobile = () => useMediaQuery('(max-width: 639px)')
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsLargeDesktop = () => useMediaQuery('(min-width: 1280px)')

export default useMediaQuery

