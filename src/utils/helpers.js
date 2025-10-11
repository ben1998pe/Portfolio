/**
 * Utilidades y funciones helper para el proyecto
 */

/**
 * Formatea un año para mostrar de manera amigable
 * @param {number} year - Año a formatear
 * @returns {string} - Año formateado
 */
export const formatYear = (year) => {
  const currentYear = new Date().getFullYear()
  if (year === currentYear) {
    return `${year} (Este año)`
  }
  return year.toString()
}

/**
 * Trunca un texto a un número específico de palabras
 * @param {string} text - Texto a truncar
 * @param {number} maxWords - Número máximo de palabras
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxWords = 20) => {
  const words = text.split(' ')
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} str - String a capitalizar
 * @returns {string} - String capitalizado
 */
export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase())
}

/**
 * Genera un ID único simple
 * @returns {string} - ID único
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Valida si una URL es válida
 * @param {string} url - URL a validar
 * @returns {boolean} - true si es válida, false si no
 */
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} - true si se copió exitosamente
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error)
    return false
  }
}

/**
 * Debounce para optimizar llamadas a funciones
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función debounced
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Formatea un número con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} - Número formateado
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Calcula el tiempo transcurrido desde una fecha
 * @param {Date|string|number} date - Fecha desde la cual calcular
 * @returns {string} - Tiempo transcurrido en formato amigable
 */
export const timeAgo = (date) => {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now - past) / 1000)

  const intervals = {
    año: 31536000,
    mes: 2592000,
    semana: 604800,
    día: 86400,
    hora: 3600,
    minuto: 60,
    segundo: 1
  }

  for (const [name, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      return interval === 1 
        ? `Hace 1 ${name}` 
        : `Hace ${interval} ${name}${name !== 'mes' ? 's' : 'es'}`
    }
  }

  return 'Justo ahora'
}

/**
 * Obtiene un color aleatorio de una paleta predefinida
 * @returns {string} - Clase de Tailwind con gradiente
 */
export const getRandomColor = () => {
  const colors = [
    'from-red-500 to-orange-500',
    'from-green-500 to-teal-500',
    'from-blue-500 to-indigo-500',
    'from-purple-500 to-pink-500',
    'from-yellow-500 to-orange-500',
    'from-cyan-500 to-blue-500'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * Detecta si el usuario está en un dispositivo móvil
 * @returns {boolean} - true si es móvil
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Scroll suave a un elemento
 * @param {string} elementId - ID del elemento al que hacer scroll
 * @param {number} offset - Offset adicional en pixels
 */
export const smoothScrollTo = (elementId, offset = 0) => {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.offsetTop - offset
    window.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
}

