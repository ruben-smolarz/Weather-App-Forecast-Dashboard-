# 🌱 AgroClima Vega - Monitoreo Inteligente para Huertos y Viveros

> **Solución AgTech Integral** - Plataforma de agricultura de precisión que combina IoT, análisis de datos y alertas inteligentes para optimizar la producción agrícola en La Vega, República Dominicana

## 📚 Documentación Completa

### 📄 Documentos Principales

- **[MODELO_DE_NEGOCIO.md](./MODELO_DE_NEGOCIO.md)** - Plan de negocio completo y estrategia comercial
- **[ANALISIS_RENTABILIDAD.md](./ANALISIS_RENTABILIDAD.md)** - Análisis financiero y justificación de inversión
- **[ESPECIFICACIONES_TECNICAS.md](./ESPECIFICACIONES_TECNICAS.md)** - Guía técnica completa para implementación

### 🎯 Resumen del Proyecto

**AgroClima Vega** es una solución integral de agricultura de precisión que combina:

- **Hardware IoT** (Arduino + sensores)
- **Dashboard web moderno** (React + TypeScript)
- **Servicios cloud** escalables
- **Análisis inteligente** y alertas automáticas

**Mercado objetivo**: Productores agrícolas en La Vega, República Dominicana  
**Propuesta de valor**: Reducción del 40% en pérdidas por clima + optimización de recursos

## 📋 Descripción

Dashboard web interactivo diseñado específicamente para agricultores, jardineros y productores de viveros en La Vega, República Dominicana. Proporciona monitoreo meteorológico en tiempo real optimizado para el cuidado de plantas, cultivos y viveros.

## 🌿 Características Especializadas para Agricultura

### 🏡 Ubicación Específica

- **Estación ubicada en La Vega, República Dominicana**
- **Coordenadas**: 19.2237°N, 70.5287°W
- **Clima tropical adaptado** para cultivos locales
- **Datos relevantes** para agricultura tropical

### 🎨 Paleta de Colores Temática

- **🌱 Verde Natural** - Para vegetación y plantas saludables
- **🏔️ Tierra** - Para suelos y condiciones de cultivo
- **☁️ Cielo** - Para agua, lluvia y condiciones hídricas
- **☀️ Dorado** - Para sol, calor y condiciones de cosecha

## 🚀 Características

### 📊 Dashboard en Tiempo Real

- **KPIs principales**: Temperatura, Humedad, Presión, Índice UV
- **Indicadores de tendencia** con comparación histórica
- **Estado del sistema** Arduino y sensores
- **Actualizaciones automáticas** cada 10 segundos

### 📈 Gráficos Interactivos

- **Chart.js** para visualización de datos
- **Tendencias históricas** de las últimas 24 horas
- **Gráficos múltiples**: líneas, barras y área
- **Zoom y navegación** interactiva

### 🗺️ Geolocalización y Mapas

- **Leaflet** para mapas interactivos
- **Ubicación de la estación** meteorológica
- **Información contextual** en popups
- **Vista satelital y terrestre**

### 🚨 Sistema de Alertas

- **Alertas automáticas** por condiciones extremas
- **Notificaciones visuales** con colores de estado
- **Histórico de alertas** con timestamps
- **Descarte manual** de notificaciones

### 🌤️ Pronóstico del Tiempo

- **Predicciones** para 5 días
- **Datos simulados** de API meteorológica
- **Iconos descriptivos** del clima
- **Temperaturas máximas y mínimas**

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Vite** como bundler y dev server
- **Tailwind CSS** para estilos
- **Chart.js** para gráficos
- **Leaflet** para mapas
- **date-fns** para manejo de fechas

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
