# User Management App - Challenge Técnico

Este proyecto es una aplicación web de administración de usuarios desarrollada como parte de un challenge técnico. 
Utiliza tecnologías modernas del ecosistema de React y una API mockeada con JSON Server para simular operaciones de backend.

---

## 🧱 Tecnologías Utilizadas

- **React**
- **Next.js** (App Router)
- **TypeScript**
- **PrimeReact + PrimeFlex**
- **JSON Server** 
- **Context API** para manejo global del sector
- **Suspense y SSR** para mejorar rendimiento y experiencia

---

## 🎯 Funcionalidades Principales

### 📋 ABM de Usuarios
- Crear, editar y eliminar usuarios.
- Validación de campos obligatorios.
- Restricciones por sector: solo el sector 1000 (Marketing) tiene permisos de edición.

### 🔍 Filtros Avanzados
- Búsqueda por nombre de usuario.
- Filtro por estado (Activo/Inactivo).
- Filtro y selección dinámica por sector.
- Modo toggle: ver todos los sectores o solo uno.

### 🧠 Gestión de Estado
- Uso de **Context API** para manejar:
  - Sector actual.
  - Modo de visualización (todos/un sector).
  - Lista dinámica de sectores cargados desde la API.

### 🧩 Componentes Reutilizables
- `UserTable`, `UserModal`, `DeleteConfirmDialog`, `UserFilters` y subcomponentes de filtros.
- Separación clara de lógica de UI y datos.

### 💨 SSR + Suspense
- Carga inicial con **Server-Side Rendering**.
- Suspense para mejorar UX durante el fetch de datos.
