import { useEffect, useRef } from 'react'

export const useDustEffect = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    
    // Find all interactive elements and text nodes
    const elements = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button, a, img, .glass, .btn-primary, .btn-secondary, .btn-accent')
    
    elements.forEach((element, index) => {
      // Skip if already has dust effect
      if (element.classList.contains('dust-element')) return
      
      // Add dust effect class
      element.classList.add('dust-element')
      
      // Add stagger delay based on position
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceFromCenter = Math.sqrt(
        Math.pow(centerX - window.innerWidth / 2, 2) + 
        Math.pow(centerY - window.innerHeight / 2, 2)
      )
      
      const maxDistance = Math.sqrt(
        Math.pow(window.innerWidth / 2, 2) + 
        Math.pow(window.innerHeight / 2, 2)
      )
      
      const delay = (distanceFromCenter / maxDistance) * 0.5
      
      element.style.setProperty('--dust-delay', `${delay}s`)
    })
  }, [])

  return containerRef
}
