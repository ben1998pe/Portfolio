export const projectsData = [
  {
    id: 1,
    title: "BugBoard WP Plugin",
    description: "Plugin de WordPress para gestión de bugs y tickets con dashboard avanzado.",
    image: "🐛",
    tech: ["WordPress", "PHP", "JavaScript", "MySQL"],
    status: "Completado",
    color: "from-red-500 to-orange-500",
    category: "WordPress",
    year: 2024,
    github: "https://github.com/benjaminoscco/bugboard-wp",
    demo: "https://bugboard-demo.bosccoa.com",
    featured: true,
    longDescription: "Desarrollé un plugin completo de WordPress que permite a los equipos de desarrollo gestionar bugs y tickets de manera eficiente. Incluye dashboard personalizable, sistema de notificaciones, reportes automáticos y integración con APIs externas."
  },
  {
    id: 2,
    title: "Scrapers Python",
    description: "Suite de herramientas de web scraping para extracción de datos masiva.",
    image: "🐍",
    tech: ["Python", "Selenium", "BeautifulSoup", "PostgreSQL"],
    status: "En desarrollo",
    color: "from-green-500 to-teal-500",
    category: "Python",
    year: 2024,
    github: "https://github.com/benjaminoscco/python-scrapers",
    demo: null,
    featured: false,
    longDescription: "Colección de scripts de Python para web scraping que automatizan la extracción de datos de múltiples fuentes. Incluye manejo de proxies, rotación de user agents, y almacenamiento en base de datos."
  },
  {
    id: 3,
    title: "Workable Talent Pool",
    description: "Sistema de gestión de talento con automatización de procesos de reclutamiento.",
    image: "👥",
    tech: ["React", "Node.js", "MongoDB", "n8n"],
    status: "Completado",
    color: "from-blue-500 to-indigo-500",
    category: "Full Stack",
    year: 2023,
    github: "https://github.com/benjaminoscco/workable-talent",
    demo: "https://talent-pool.bosccoa.com",
    featured: true,
    longDescription: "Aplicación web completa para gestión de talento que automatiza el proceso de reclutamiento. Integra con APIs de LinkedIn, envía emails automáticos, y genera reportes de candidatos."
  },
  {
    id: 4,
    title: "Cloud Analytics Dashboard",
    description: "Dashboard en tiempo real para monitoreo de infraestructura cloud.",
    image: "📊",
    tech: ["Vue.js", "AWS", "Docker", "Grafana"],
    status: "Completado",
    color: "from-purple-500 to-pink-500",
    category: "DevOps",
    year: 2023,
    github: "https://github.com/benjaminoscco/cloud-dashboard",
    demo: "https://cloud-analytics.bosccoa.com",
    featured: false,
    longDescription: "Dashboard interactivo para monitoreo de infraestructura cloud con métricas en tiempo real, alertas automáticas y visualizaciones personalizables."
  },
  {
    id: 5,
    title: "E-commerce Automation",
    description: "Sistema automatizado de gestión de inventario y pedidos.",
    image: "🛒",
    tech: ["Shopify", "n8n", "Python", "Webhooks"],
    status: "En desarrollo",
    color: "from-yellow-500 to-orange-500",
    category: "Automation",
    year: 2024,
    github: "https://github.com/benjaminoscco/ecommerce-automation",
    demo: null,
    featured: false,
    longDescription: "Sistema de automatización para e-commerce que sincroniza inventario, procesa pedidos automáticamente y envía notificaciones a clientes."
  },
  {
    id: 6,
    title: "SEO Optimizer Tool",
    description: "Herramienta de análisis y optimización SEO con reportes automatizados.",
    image: "🔍",
    tech: ["Next.js", "Python", "Google APIs", "Chart.js"],
    status: "Completado",
    color: "from-cyan-500 to-blue-500",
    category: "SEO",
    year: 2024,
    github: "https://github.com/benjaminoscco/seo-optimizer",
    demo: "https://seo-tool.bosccoa.com",
    featured: true,
    longDescription: "Herramienta completa de análisis SEO que genera reportes automáticos, sugiere mejoras y monitorea el rendimiento de sitios web."
  }
]

export const categories = ['all', 'featured', 'WordPress', 'Python', 'Full Stack', 'DevOps', 'Automation', 'SEO']

export const sortOptions = [
  { value: 'recent', label: 'MÁS RECIENTES' },
  { value: 'name', label: 'NOMBRE' },
  { value: 'status', label: 'ESTADO' }
]

