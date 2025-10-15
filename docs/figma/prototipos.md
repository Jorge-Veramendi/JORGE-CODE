# Prototipos del Proyecto

## Información del Documento

**Última actualización:** [14/10/2025]  
**Versión del prototipo:** [v1.0]  
**Herramienta:** Figma  

---

## Propósito del Prototipo

Este documento centraliza toda la información sobre los **diseños y prototipos** creados en Figma para el proyecto. Sirve como **puente entre el diseño UX/UI y el desarrollo técnico**, facilitando la implementación durante los sprints.

**Objetivos del prototipo:**
- Validar la **experiencia de usuario** antes de desarrollar
- Alinear la **visión del producto** entre todos los miembros del equipo
- Servir como **referencia visual** durante el desarrollo backend y frontend
- Documentar las **decisiones de diseño** tomadas en cada sprint

---

## Enlaces Principales

### Proyecto Principal
**URL:** [https://www.figma.com/design/noGCeQJT8zEg2zKiybOVxZ/Peliculas?node-id=29-124&p=f&t=52aNZFfIzY4NVPG7-0]

---

## Estructura del Prototipo

### Sistema de Diseño

**Paleta de colores:**
- **Color primario:** #000000 - Acciones principales
- **Color secundario:** #52009F - Elementos complementarios
- **Color de acento:** #BBBBBB - Llamadas a la acción
- **Colores de estado:**
  - Éxito: #11FF00
  - Error: #FF0000
  - Advertencia: #FFE32D
  - Info: #BBBBBB

**Tipografía:**
- **Principal:** [Poppins] - Textos y contenido
- **Títulos:** [Poppins] - Encabezados


**Espaciado:**
- Sistema de **8px grid**
- Espaciado base: 8px, 16px, 24px, 32px

---

## Pantallas incluidas:**
### Flujo Principal
1. **Página de bienvenida**

-Introduce al usuario al servicio de "Cineverse".

-Incluye un botón principal "Suscribete ahora".

-Fondo con collage de películas y series.

-Botón de login en la esquina superior derecha.
   

2. **Formulario de registro**

-Título: "Crea tu cuenta"

-Campos: Nombre completo, correo electrónico, contraseña, confirmación de correo.

-Botón de acción: "Siguiente"

-Espaciado consistente de 24px entre campos y 32px de márgenes laterales.
   
   
3. **Login**

-Título: "Iniciar sesión"

-Campos: Correo electrónico y contraseña.

-Acciones: "Iniciar sesión", "¿Olvidaste tu contraseña?"

-Botón con estados: default y loading.

-Navegación directa al registro si no se tiene cuenta.
   

**Interacciones prototipadas:**
- Navegación entre pantallas
- Validación de formularios
- Mensajes de error/éxito
- Estados de carga (loading)


## 🧩 Componentes Reutilizables


**Componentes diseñados:**

#### Botones
- **Primario:** Acciones principales (guardar, enviar)
- **Secundario:** Acciones secundarias (cancelar, volver)
- **Terciario:** Acciones terciarias (enlaces, texto)
- **Estados:** Default, hover, active, disabled, loading

#### Formularios
- **Input text:** Entrada de texto estándar
- **Input password:** Con toggle de visibilidad
- **Select dropdown:** Con búsqueda
- **Checkbox:** Individual y grupos
- **Radio buttons:** Opciones excluyentes
- **Date picker:** Selección de fechas
- **File upload:** Carga de archivos

#### Navegación
- **Navbar:** Barra superior de navegación
- **Sidebar:** Menú lateral colapsable
- **Tabs:** Pestañas para contenido
- **Pagination:** Paginación de listas

#### Feedback
- **Toast notifications:** Mensajes temporales
- **Modals:** Ventanas emergentes
- **Alerts:** Avisos en contexto
- **Loading spinners:** Indicadores de carga
- **Progress bars:** Barras de progreso

#### Visualización de datos
- **Cards:** Tarjetas de información
- **Tables:** Tablas de datos
- **Charts:** Gráficos (si aplica)
- **Stats cards:** Tarjetas de estadísticas

---

### Responsive Design

**Breakpoints definidos:**
- **Mobile:** 320px - 767px
- **Desktop:** 1024px+

### Accesibilidad

**Criterios implementados:**
- Contraste de colores según WCAG 2.1 AA
- Textos alternativos para imágenes
- Navegación por teclado
- Estados de foco visibles
- Jerarquía semántica de encabezados



## 📋 Checklist de Implementación

### Para el Equipo de Desarrollo

**Antes de comenzar un sprint:**
- [x] Revisar el prototipo de Figma correspondiente al sprint
- [x] Identificar todos los componentes necesarios
- [x] Validar los endpoints de backend requeridos
- [x] Confirmar las historias de usuario vinculadas

**Durante el desarrollo:**
- [x] Consultar especificaciones de diseño (colores, tipografía, espaciado)
- [x] Implementar estados de los componentes (hover, active, disabled)
- [x] Validar responsive design en todos los breakpoints
- [x] Solicitar feedback del diseñador si hay dudas

**Al finalizar:**
- [x] Comparar implementación con el prototipo
- [x] Actualizar este documento con notas de implementación
- [x] Marcar las pantallas como completadas

---

## 🎨 Assets y Recursos

### Imágenes y Gráficos

**Ubicación:** `src/frontend/assets/images/`

**Assets exportados de Figma:**
- Logotipo (SVG, PNG)
- Iconos personalizados (SVG)
- Imágenes de placeholder (PNG, WebP)
- Ilustraciones (SVG)

**Convención de nombres:**
```
[tipo]-[descripcion]-[tamaño].[extension]

Ejemplos:
icon-user-24px.svg
logo-primary-full.svg
img-hero-1920x1080.webp
illus-empty-state.svg
```


### Preguntas Frecuentes

**P: ¿Dónde encuentro las medidas exactas de espaciado?**  
R: En Figma, selecciona cualquier elemento y revisa el panel de propiedades. Todos los espaciados siguen el sistema de 8px grid.

**P: ¿Puedo modificar un componente para un caso específico?**  
R: Consulta primero con el equipo. Si es un caso único, crea una variante. Si es recurrente, actualiza el componente base en Figma.

**P: ¿Cómo exporto assets de Figma?**  
R: Selecciona el elemento → Export → Configura formato y resolución → Export [CINEVERSE].

---

## Contacto y Soporte

**Responsable de diseño:** [Jorge Luis Veramendi Mozombite]  
**Canal de comunicación:** [Discord]  
**Horario de disponibilidad:** [4H]

**Para dudas sobre el prototipo:**
1. Revisar este documento primero
2. Consultar directamente en Figma (comentarios)
3. Preguntar en el canal del equipo
4. Agendar sesión de revisión de diseño

---

## 🔗 Referencias Útiles

**Documentación relacionada:**
- `README.md` - Información general del proyecto
- `docs/sprint-planning/` - Planificación de sprints
- `CONTRIBUTING.md` - Guía de contribución
- `docs/retrospectivas/` - Aprendizajes de los sprints

**Recursos externos:**
- [Guía de Figma](https://help.figma.com)
- [Material Design Guidelines](https://m3.material.io)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)

---

**Última actualización:** [Fecha]  
**Mantenido por:** [Equipo de diseño/Product Owner]  
**Versión del documento:** 1.0