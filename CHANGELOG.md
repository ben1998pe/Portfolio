# 📝 Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.1.1] - 2024-10-11

### ✨ Agregado
- **`.editorconfig`**: Archivo de configuración para mantener consistencia de código entre diferentes editores
- **`src/utils/helpers.js`**: Utilidades y funciones helper reutilizables:
  - `formatYear()` - Formateo de años
  - `truncateText()` - Truncar texto
  - `capitalizeWords()` - Capitalizar palabras
  - `generateId()` - Generar IDs únicos
  - `isValidUrl()` - Validar URLs
  - `copyToClipboard()` - Copiar al portapapeles
  - `debounce()` - Optimizar llamadas a funciones
  - `formatNumber()` - Formatear números
  - `timeAgo()` - Calcular tiempo transcurrido
  - `getRandomColor()` - Obtener colores aleatorios
  - `isMobile()` - Detectar dispositivos móviles
  - `smoothScrollTo()` - Scroll suave
- **Hooks personalizados adicionales**:
  - `useScrollPosition.js` - Hook para rastrear posición y dirección del scroll
  - `useMediaQuery.js` - Hook para detectar media queries y responsive breakpoints
  - `useLocalStorage.js` - Hook para manejar localStorage con sincronización automática

### 🔄 Modificado
- **`package.json`**: 
  - Actualizada versión a 1.1.0
  - Agregados metadatos del autor
  - Agregados keywords para mejor SEO
  - Nuevos scripts útiles: `lint:fix`, `format`, `clean`

## [1.1.0] - 2024-10-11

### ✨ Agregado
- **Separación de datos**: Creado `src/data/projects.js` para centralizar toda la información de proyectos
- **Archivo de constantes**: Nuevo `src/utils/constants.js` con configuraciones globales de la aplicación
- **Componentes modulares**: 
  - `ProjectCard.jsx` - Tarjeta de proyecto reutilizable con PropTypes
  - `ProjectModal.jsx` - Modal de detalles de proyecto con PropTypes
- **PropTypes**: Validación de tipos en componentes React para mayor robustez
- **Filtro de destacados**: Botón de filtro "featured" para proyectos destacados
- **Documentación mejorada**: 
  - README.md actualizado con badges tecnológicos
  - Tabla de contenidos interactiva
  - Estructura de proyecto visual con emojis
  - Estadísticas del proyecto
  - Sección de características expandida
- **CHANGELOG.md**: Este archivo para documentar cambios del proyecto

### 🔄 Modificado
- **Projects.jsx**: Refactorizado para usar componentes modulares y datos importados
- **README.md**: 
  - Agregados badges tecnológicos (React, Vite, TailwindCSS, Framer Motion)
  - Mejorada estructura visual y organización
  - Actualizada estructura del proyecto con nuevos directorios
  - Agregadas secciones de estadísticas
- **Arquitectura**: Mejor separación de responsabilidades (datos, UI, lógica)

### 🐛 Corregido
- Eliminados números mágicos reemplazándolos con constantes configurables
- Mejor mantenibilidad del código con datos centralizados

### 📚 Documentación
- Agregadas instrucciones de personalización actualizadas
- Documentación de estructura de proyecto más detallada
- Referencias a los nuevos archivos de configuración

## [1.0.0] - 2024-10-XX

### ✨ Lanzamiento Inicial
- Portfolio personal con React 18 y Vite
- Sistema de navegación con React Router v6
- Diseño Glassmorphism con TailwindCSS
- Animaciones fluidas con Framer Motion
- 5 páginas principales: Home, About, Projects, Services, Contact
- Sistema de notificaciones con Toast
- Error Boundary para manejo de errores
- Efectos visuales: Cursor Glow, Pixel Transitions, Floating Particles
- Responsive design para todos los dispositivos

---

## Tipos de cambios
- **✨ Agregado** - para funcionalidades nuevas
- **🔄 Modificado** - para cambios en funcionalidades existentes
- **🗑️ Deprecado** - para funcionalidades que pronto se eliminarán
- **🐛 Corregido** - para corrección de bugs
- **🔒 Seguridad** - en caso de vulnerabilidades
- **📚 Documentación** - para cambios en la documentación

