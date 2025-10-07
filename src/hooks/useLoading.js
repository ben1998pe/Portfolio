import { useState, useEffect } from 'react'

const useLoading = (initialState = false, delay = 0) => {
  const [isLoading, setIsLoading] = useState(initialState)
  const [loadingMessage, setLoadingMessage] = useState('')

  const startLoading = (message = 'Cargando...') => {
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const stopLoading = () => {
    setIsLoading(false)
    setLoadingMessage('')
  }

  const withLoading = async (asyncFunction, message = 'Procesando...') => {
    try {
      startLoading(message)
      const result = await asyncFunction()
      return result
    } finally {
      stopLoading()
    }
  }

  // Auto-stop loading after delay
  useEffect(() => {
    if (isLoading && delay > 0) {
      const timer = setTimeout(() => {
        stopLoading()
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isLoading, delay])

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    withLoading
  }
}

export default useLoading
