<div align="center">

# 🚀 BOSCCOA - Portfolio Personal

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3.5-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.16-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

Un portafolio moderno y elegante construido con React, Vite y Framer Motion, diseñado para mostrar proyectos de desarrollo web, automatización y DevOps.

[Demo en vivo](#) · [Reportar Bug](https://github.com/ben1998pe/Portfolio/issues) · [Solicitar Feature](https://github.com/ben1998pe/Portfolio/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Instalación y Uso](#-instalación-y-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Sistema de Diseño](#-sistema-de-diseño)
- [Configuración](#-configuración)
- [Despliegue](#-despliegue)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## ✨ Características

### 🎨 Diseño y UX
- **Glassmorphism Design**: Efectos de vidrio y transparencias modernas
- **Transiciones de Píxeles**: Animaciones únicas entre páginas
- **Jerarquía de Fuentes Tech**: Press Start 2P, VT323, Share Tech Mono, Exo 2
- **Responsive Design**: Optimizado para todos los dispositivos
- **Cursor Glow**: Efecto de resplandor que sigue el cursor

### 🛠️ Tecnologías
- **React 18** con Hooks modernos
- **Vite** para desarrollo rápido
- **Framer Motion** para animaciones fluidas
- **TailwindCSS** para estilos
- **React Router v6** para navegación
- **Context API** para manejo de estado global

#### 🎯 Funcionalidades
- **Sistema de Filtros**: Filtra proyectos por categoría, destacados y estado
- **Ordenamiento Inteligente**: Ordena por fecha, nombre o estado
- **Modal de Detalles**: Vista expandida de proyectos con animaciones
- **Sistema de Notificaciones**: Toast notifications elegantes y no intrusivas
- **Error Boundary**: Manejo robusto de errores en toda la aplicación
- **Loading States**: Estados de carga con skeleton loaders suaves
- **Validación de Formularios**: Validación en tiempo real del formulario de contacto
- **Separación de Datos**: Arquitectura modular con datos separados de la lógica
- **Constantes Centralizadas**: Configuración en un solo lugar para fácil mantenimiento
- **Accesibilidad**: Navegación por teclado, ARIA labels y roles semánticos

### 📊 Estadísticas del Proyecto
- **🔧 Componentes**: 20+ componentes reutilizables
- **📄 Páginas**: 5 páginas principales (Home, About, Projects, Services, Contact)
- **🎨 Animaciones**: Powered by Framer Motion
- **♿ Accesibilidad**: WCAG 2.1 compliance
- **📱 Responsive**: Mobile-first design
- **⚡ Performance**: Optimizado con Vite

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/ben1998pe/Portfolio.git

# Navegar al directorio
cd Portfolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter
```

## 📁 Estructura del Proyecto

```
📦 portafolio/
├── 📂 src/
│   ├── 📂 components/       # 🧩 Componentes reutilizables
│   │   ├── AutoDustWrapper.jsx
│   │   ├── BackToTop.jsx
│   │   ├── CursorGlow.jsx
│   │   ├── DustElement.jsx
│   │   ├── ElementDuster.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── FloatingParticles.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── Navigation.jsx
│   │   ├── PageFrame.jsx
│   │   ├── PageTransition.jsx
│   │   ├── PixelTransition.jsx
│   │   ├── ScrollIndicator.jsx
│   │   ├── SettingsPanel.jsx
│   │   ├── Shuffle.jsx
│   │   └── Toast.jsx
│   ├── 📂 contexts/        # 🔄 Contextos de React
│   │   ├── NotificationContext.jsx
│   │   └── ThemeContext.jsx
│   ├── 📂 data/            # 📊 Datos y configuración
│   │   └── projects.js
│   ├── 📂 hooks/           # 🎣 Hooks personalizados
│   │   ├── useDustEffect.js
│   │   └── useLoading.js
│   ├── 📂 pages/           # 📄 Páginas principales
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   └── Services.jsx
│   ├── 📂 utils/           # 🛠️ Utilidades
│   │   └── constants.js
│   ├── App.jsx             # 🎯 Componente principal
│   ├── index.css           # 🎨 Estilos globales
│   └── main.jsx            # 🚀 Punto de entrada
├── 📂 public/              # 🌐 Recursos públicos
├── 📄 index.html           # 📝 HTML principal
├── 📄 package.json         # 📦 Dependencias
├── 📄 vite.config.js       # ⚡ Configuración Vite
├── 📄 tailwind.config.js   # 🎨 Configuración Tailwind
└── 📄 README.md            # 📖 Documentación
```

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Primary**: #5534FE (Púrpura tech)
- **Accent**: #00E0B8 (Cian brillante)
- **Ink**: #0f0f23 (Azul oscuro)
- **Soft**: #a0a0a0 (Gris suave)

### Tipografía
- **Títulos**: Press Start 2P (Retro gaming)
- **Subtítulos/UI**: VT323, Share Tech Mono (Consola)
- **Texto**: Exo 2 (Legible y moderna)

### Componentes
- **Glass**: Efectos de vidrio con backdrop-filter
- **Buttons**: Botones con hover effects y transiciones
- **Cards**: Tarjetas con glassmorphism y hover lift
- **Modals**: Modales con animaciones de entrada/salida

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env.local`:
```env
VITE_APP_TITLE=BOSCCOA Portfolio
VITE_APP_DESCRIPTION=Portfolio personal de Benjamin Oscco Arias
```

### Personalización
1. **Colores**: Modifica la paleta en `tailwind.config.js`
2. **Fuentes**: Cambia las fuentes en `src/index.css`
3. **Contenido**: Actualiza los datos en cada página
4. **Proyectos**: Modifica el array de proyectos en `src/data/projects.js`
5. **Constantes**: Actualiza configuraciones en `src/utils/constants.js`

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: CSS Grid y Flexbox para layouts flexibles
- **Touch Friendly**: Botones y elementos táctiles optimizados

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
# Subir la carpeta dist/ a Vercel
```

### Netlify
```bash
npm run build
# Arrastrar la carpeta dist/ a Netlify
```

### GitHub Pages
```bash
npm run build
# Configurar GitHub Actions para deploy automático
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Benjamin Oscco Arias**
- GitHub: [@benjaminoscco](https://github.com/benjaminoscco)
- LinkedIn: [benjaminoscco](https://linkedin.com/in/benjaminoscco)
- Email: benjamin@bosccoa.com

## 🙏 Agradecimientos

- [Framer Motion](https://www.framer.com/motion/) por las animaciones
- [TailwindCSS](https://tailwindcss.com/) por el sistema de estilos
- [React](https://reactjs.org/) por el framework
- [Vite](https://vitejs.dev/) por la herramienta de build

---

⭐ Si te gusta este proyecto, ¡dale una estrella!