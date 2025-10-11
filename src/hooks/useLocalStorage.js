import { useState, useEffect } from 'react'

/**
 * Hook personalizado para manejar localStorage con sincronización automática
 * @param {string} key - Clave en localStorage
 * @param {*} initialValue - Valor inicial si no existe en localStorage
 * @returns {Array} - [value, setValue, removeValue]
 */
const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar el valor
  // Pasa una función de inicialización a useState para que solo se ejecute una vez
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error al leer localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Función para actualizar el valor
  const setValue = (value) => {
    try {
      // Permite que value sea una función como en useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Guardar estado
      setStoredValue(valueToStore)
      
      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        
        // Disparar evento personalizado para sincronizar entre tabs
        window.dispatchEvent(new Event('local-storage'))
      }
    } catch (error) {
      console.error(`Error al guardar en localStorage key "${key}":`, error)
    }
  }

  // Función para remover el valor
  const removeValue = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
        setStoredValue(initialValue)
        window.dispatchEvent(new Event('local-storage'))
      }
    } catch (error) {
      console.error(`Error al remover localStorage key "${key}":`, error)
    }
  }

  // Sincronizar entre tabs/ventanas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error('Error al parsear valor de storage:', error)
        }
      }
    }

    const handleLocalStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key)
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      } catch (error) {
        console.error('Error al sincronizar localStorage:', error)
      }
    }

    // Escuchar cambios de storage entre tabs
    window.addEventListener('storage', handleStorageChange)
    
    // Escuchar cambios locales
    window.addEventListener('local-storage', handleLocalStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleLocalStorageChange)
    }
  }, [key])

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage

