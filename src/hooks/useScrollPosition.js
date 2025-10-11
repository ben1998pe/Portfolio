import { useState, useEffect } from 'react'

/**
 * Hook personalizado para rastrear la posición del scroll
 * @param {number} threshold - Umbral en pixels para considerar que se hizo scroll (default: 100)
 * @returns {Object} - Objeto con información del scroll
 */
const useScrollPosition = (threshold = 100) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('up')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollPosition = () => {
      const scrollY = window.scrollY

      // Determinar dirección del scroll
      if (scrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (scrollY < lastScrollY) {
        setScrollDirection('up')
      }

      // Actualizar posición
      setScrollPosition(scrollY)
      
      // Verificar si se pasó el threshold
      setIsScrolled(scrollY > threshold)

      lastScrollY = scrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Llamar una vez al montar para obtener posición inicial
    updateScrollPosition()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return {
    scrollPosition,
    scrollDirection,
    isScrolled,
    isScrollingDown: scrollDirection === 'down',
    isScrollingUp: scrollDirection === 'up',
    isAtTop: scrollPosition === 0
  }
}

export default useScrollPosition

