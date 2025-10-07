import React, { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../components/Toast'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      message: notification.message,
      type: notification.type || 'info',
      duration: notification.duration || 3000,
      position: notification.position || 'top-right'
    }
    
    setNotifications(prev => [...prev, newNotification])
    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const showSuccess = useCallback((message, options = {}) => {
    return addNotification({ message, type: 'success', ...options })
  }, [addNotification])

  const showError = useCallback((message, options = {}) => {
    return addNotification({ message, type: 'error', ...options })
  }, [addNotification])

  const showWarning = useCallback((message, options = {}) => {
    return addNotification({ message, type: 'warning', ...options })
  }, [addNotification])

  const showInfo = useCallback((message, options = {}) => {
    return addNotification({ message, type: 'info', ...options })
  }, [addNotification])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const value = {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearAll
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Render all notifications */}
      {notifications.map(notification => (
        <Toast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          position={notification.position}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  )
}
