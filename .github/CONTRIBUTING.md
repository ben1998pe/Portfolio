# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al Portfolio BOSCCOA! Aquí encontrarás toda la información necesaria para empezar.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Puedo Contribuir](#cómo-puedo-contribuir)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Estilo de Código](#estilo-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código. Por favor reporta comportamiento inaceptable.

### Nuestros Estándares

- Usar lenguaje acogedor e inclusivo
- Respetar diferentes puntos de vista y experiencias
- Aceptar críticas constructivas de manera amable
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros de la comunidad

## 🚀 Cómo Puedo Contribuir

### Reportando Bugs

Antes de crear un reporte de bug, verifica la lista de issues existentes. Si encuentras un bug:

1. **Usa un título claro y descriptivo**
2. **Describe los pasos exactos para reproducir el problema**
3. **Proporciona ejemplos específicos**
4. **Describe el comportamiento que observaste y el comportamiento esperado**
5. **Incluye screenshots si es posible**
6. **Menciona tu entorno** (OS, navegador, versión de Node, etc.)

#### Plantilla de Reporte de Bug

```markdown
**Descripción del Bug**
Una descripción clara y concisa del bug.

**Para Reproducir**
Pasos para reproducir el comportamiento:
1. Ve a '...'
2. Haz click en '...'
3. Scroll hasta '...'
4. Observa el error

**Comportamiento Esperado**
Una descripción clara de lo que esperabas que sucediera.

**Screenshots**
Si aplica, agrega screenshots para ayudar a explicar el problema.

**Entorno:**
 - OS: [e.g. Windows 10]
 - Navegador: [e.g. Chrome 119]
 - Node: [e.g. 18.17.0]
 - npm: [e.g. 9.6.7]
```

### Sugiriendo Mejoras

Las sugerencias de mejoras son bienvenidas. Incluye:

1. **Título descriptivo**
2. **Descripción detallada de la mejora sugerida**
3. **Casos de uso** donde esta mejora sería útil
4. **Ejemplos de cómo funciona en otros proyectos** (si aplica)
5. **Mockups o diagramas** (si es relevante)

### Tu Primera Contribución de Código

¿No sabes por dónde empezar? Busca issues etiquetados con:

- `good first issue` - issues que deberían requerir pocas líneas de código
- `help wanted` - issues que pueden ser más complejos

## 🛠️ Guía de Desarrollo

### Setup Inicial

```bash
# Clona tu fork del repositorio
git clone https://github.com/TU-USUARIO/Portfolio.git

# Navega al directorio
cd Portfolio

# Instala dependencias
npm install

# Crea una rama para tu feature
git checkout -b feature/mi-nueva-feature

# Inicia el servidor de desarrollo
npm run dev
```

### Estructura del Proyecto

```
src/
├── components/     # Componentes React reutilizables
├── contexts/       # React Context providers
├── data/          # Datos y configuración
├── hooks/         # Custom React hooks
├── pages/         # Componentes de página
├── utils/         # Funciones utilitarias
└── index.css      # Estilos globales
```

### Agregando Nuevos Componentes

1. Crea el componente en `src/components/`
2. Usa PropTypes para validación de tipos
3. Agrega comentarios JSDoc si es necesario
4. Exporta el componente como default
5. Actualiza los tests si aplica

Ejemplo:

```jsx
import PropTypes from 'prop-types'

/**
 * Componente de ejemplo
 * @param {Object} props - Props del componente
 * @param {string} props.title - Título a mostrar
 */
const MiComponente = ({ title }) => {
  return <h1>{title}</h1>
}

MiComponente.propTypes = {
  title: PropTypes.string.isRequired
}

export default MiComponente
```

### Agregando Nuevos Proyectos

Para agregar un nuevo proyecto, edita `src/data/projects.js`:

```javascript
{
  id: 7,
  title: "Nombre del Proyecto",
  description: "Descripción corta del proyecto",
  image: "🎨", // Emoji representativo
  tech: ["React", "Node.js", "MongoDB"],
  status: "Completado", // o "En desarrollo"
  color: "from-blue-500 to-cyan-500",
  category: "Full Stack",
  year: 2024,
  github: "https://github.com/usuario/repo",
  demo: "https://demo.ejemplo.com",
  featured: false,
  longDescription: "Descripción detallada del proyecto..."
}
```

## 🎨 Estilo de Código

### JavaScript/React

- Usa ES6+ features
- Componentes funcionales con Hooks
- Nombres descriptivos para variables y funciones
- Comentarios para lógica compleja
- PropTypes para todos los componentes que reciban props

### CSS/Tailwind

- Usa clases de Tailwind cuando sea posible
- Sigue la convención de nomenclatura existente
- Mantén los estilos consistentes con el diseño actual
- Usa las variables CSS definidas en `index.css`

### Commits

Usa mensajes de commit descriptivos siguiendo [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agrega filtro de búsqueda en proyectos
fix: corrige modal que no se cierra con ESC
docs: actualiza README con nuevas instrucciones
style: mejora espaciado en ProjectCard
refactor: extrae lógica de filtrado a hook personalizado
test: agrega tests para ProjectCard
chore: actualiza dependencias
```

## 🔄 Proceso de Pull Request

1. **Fork el repositorio** y crea tu rama desde `main`
2. **Haz tus cambios** siguiendo las guías de estilo
3. **Actualiza la documentación** si es necesario
4. **Asegúrate que el código no tenga errores de lint**:
   ```bash
   npm run lint
   ```
5. **Prueba que el build funcione**:
   ```bash
   npm run build
   ```
6. **Commit tus cambios** con mensajes descriptivos
7. **Push a tu fork**:
   ```bash
   git push origin feature/mi-nueva-feature
   ```
8. **Abre un Pull Request** con:
   - Título descriptivo
   - Descripción detallada de los cambios
   - Referencias a issues relacionados
   - Screenshots si hay cambios visuales

### Plantilla de Pull Request

```markdown
## 📝 Descripción

Describe tus cambios aquí...

## 🔗 Issue Relacionado

Fixes #(issue)

## 📸 Screenshots (si aplica)

Agrega screenshots aquí...

## ✅ Checklist

- [ ] Mi código sigue las guías de estilo del proyecto
- [ ] He revisado mi propio código
- [ ] He comentado mi código en áreas difíciles de entender
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] El build se completa sin errores
```

## ❓ Preguntas

Si tienes preguntas, puedes:

- Abrir un issue con la etiqueta `question`
- Contactar al mantenedor: benjamin@bosccoa.com

## 🙏 Agradecimientos

¡Gracias por contribuir al proyecto! Cada contribución, grande o pequeña, es valiosa.

---

**¡Feliz coding! 🚀**

