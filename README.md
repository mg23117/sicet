# SICET - Sistema de Control de Equipos Tecnológicos

[![Despliegue en Netlify](https://img.shields.io/badge/Deploy-Netlify-00ADBB?style=for-the-badge&logo=netlify)](https://glowing-puffpuff-12c651.netlify.app)

**Link del proyecto:** [glowing-puffpuff-12c651.netlify.app](https://glowing-puffpuff-12c651.netlify.app)

<img src="src/assets/Logo.png" alt="Logo SICET" width="100">

SICET es una solución integral diseñada para la gestión, geolocalización y monitoreo de inventario tecnológico. La plataforma permite a las organizaciones mantener un control preciso sobre sus activos, visualizarlos en tiempo real mediante mapas interactivos y gestionar flujos de trabajo administrativos de manera eficiente.

---

## Información del Grupo
**Grupo:** #2
**Tema:** Sistema de Control de Equipos Tecnológicos

| Integrante | Carnet |
| :--- | :--- |
| **Kevin Martínez** | **MG23117** |
| **Mirna Rivas** | **RL22021** |
| **Héctor Montano** | **EM15008** |
| **Jennifer Pleitez** | **RP23005** |

---

## Características Principales

- **Geolocalización Avanzada:** Visualización de equipos en un mapa interactivo con clustering y filtros espaciales.
- **Gestión de Inventario (CRUD):** Creación, lectura, actualización y eliminación de equipos con validaciones y manejo de errores (Try/Catch).
- **Dashboard de Estadísticas:** Visualización de métricas en tiempo real (totales, estados, porcentajes).
- **Autenticación Segura:** Integración con Firebase Auth (incluyendo Google Login).
- **Soporte Multi-idioma:** Interfaz disponible en Español e Inglés (i18next).
- **Diseño Responsivo:** Interfaz moderna optimizada para diferentes tamaños de pantalla.
- **Alto Rendimiento:** Procesamiento de datos en segundo plano mediante **Web Workers**.

---

## Tecnologías Utilizadas

### Core
- **React 19** - Librería principal para la interfaz de usuario.
- **TypeScript** - Tipado estático para un código más robusto.
- **Vite 8** - Herramienta de construcción ultra rápida.
- **Tailwind CSS** - Framework de estilos basado en utilidades.

### Funcionalidades Específicas
- **Firebase** - Autenticación y backend services.
- **Leaflet & React Leaflet** - Mapas interactivos para geolocalización.
- **Turf.js & Supercluster** - Análisis geoespacial y agrupación de puntos.
- **React Router 7** - Manejo de rutas y navegación dinámica.
- **i18next** - Internacionalización (i18n).
- **LocalStorage & Cookies** - Persistencia de datos de inventario y preferencias de usuario (Tema/Idioma).
- **Web Workers** - Procesamiento de datos en segundo plano para el Dashboard.
- **React Hot Toast** - Notificaciones en tiempo real.
- **Lucide React & React Icons** - Sets de iconos modernos.

---

## Estructura del Proyecto

```text
src/
 ┣ assets/             # Recursos estáticos (imágenes, logos)
 ┣ components/         # Componentes UI reutilizables
 ┣ constants/          # Configuraciones y estilos constantes (Map, Status)
 ┣ context/            # Contextos de React (AuthContext)
 ┣ hooks/              # Custom Hooks personalizados
 ┣ layouts/            # Estructuras de página (GlobalLayout)
 ┣ locales/            # Archivos de traducción (ES/EN)
 ┣ pages/              # Vistas: Dashboard, Inventory, GeoPanel, Config
 ┣ services/           # Servicios: EquipmentStorage
 ┣ types/              # Definiciones de tipos (Branch, Equipment)
 ┣ workers/            # Web Workers (statsWorker.ts)
 ┣ App.tsx             # Enrutador principal
 ┣ firebase.ts         # Configuración de Firebase
 ┗ main.tsx            # Punto de entrada
public/
 ┗ data/               # Archivos JSON de configuración (branches, status, etc.)
```

---

## Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone [url-del-repositorio]
   cd sicet
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con las siguientes claves de Firebase:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIRE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

4. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

