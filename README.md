# Sistema de Control de Equipos Tecnológicos

Aplicación web desarrollada con React, TypeScript y TailwindCSS para la administración visual de equipos tecnológicos. El sistema implementa una interfaz moderna tipo dashboard con autenticación simulada y navegación dinámica.

---

# Tecnologías utilizadas

- React
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- LocalStorage
- Lucide React Icons

---

# Características principales

- Diseño moderno tipo dashboard
- Sidebar responsivo
- Header dinámico
- Navegación entre vistas
- Autenticación simulada
- Persistencia de sesión con LocalStorage
- Menú lateral desplegable
- Arquitectura modular
- Componentes reutilizables

---

# Estructura del proyecto

```txt
src/
 ┣ assets/
 ┃ ┗ Logo.png
 ┣ components/
 ┃ ┣ Header.tsx
 ┃ ┣ Sidebar.tsx
 ┃ ┗ ProtectedRoute.tsx
 ┣ context/
 ┃ ┗ AuthContext.tsx
 ┣ layouts/
 ┃ ┗ GlobalLayout.tsx
 ┣ pages/
 ┃ ┣ Dashboard.tsx
 ┃ ┣ Login.tsx
 ┃ ┣ Inventory.tsx
 ┃ ┗ Settings.tsx
 ┣ App.tsx
 ┣ main.tsx
 ┗ index.css
