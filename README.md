# 🌌 Mundo Rick and Morty

![Rick and Morty API](https://rickandmortyapi.com/api/character/avatar/1.jpeg)

## 📝 Descripción del Proyecto

**Mundo Rick and Morty** es una aplicación web interactiva que consume la [Rick and Morty API](https://rickandmortyapi.com/) para mostrar información detallada sobre los personajes de la popular serie animada. Esta aplicación fue desarrollada como parte del Taller 1.

La aplicación permite a los usuarios:
- Buscar personajes por nombre
- Filtrar por estado (vivo, muerto, desconocido)
- Filtrar por especie (humano, alien, robot, etc.)
- Filtrar por género
- Ver estadísticas de los resultados de búsqueda
- Navegar a través de páginas de resultados

## 🚀 Tecnologías Utilizadas

- HTML5
- CSS3 con animaciones y diseño responsivo
- JavaScript vanilla (sin frameworks)
- Fetch API para consumir datos de la API REST
- Font Awesome para iconos

## 🔧 Instalación y Ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/20251-Ingenieria-WEB/taller-html-johansebastian-henaoca-as.git
   cd taller1
   ```

2. **Abrir la aplicación**
   - Simplemente abre el archivo `index.html` en tu navegador preferido
   - O utiliza un servidor local como Live Server de VS Code

## 📋 Estructura del Proyecto

```
taller1/
│
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y animaciones
├── app.js              # Lógica de la aplicación y consumo de API
```

## 🔍 Características Principales

### 1. Interfaz Temática
- Diseño inspirado en la estética espacial de Rick and Morty
- Animaciones de portal y fondo espacial
- Diseño completamente responsivo

### 2. Búsqueda y Filtrado
- Búsqueda por nombre de personaje
- Filtros para estado, especie y género
- Combinación de múltiples filtros

### 3. Tarjetas de Personajes
- Imagen del personaje
- Información detallada: nombre, especie, estado, género, origen, ubicación
- Indicador visual de estado (vivo, muerto, desconocido)
- Información sobre apariciones en episodios

### 4. Estadísticas de Resultados
- Contador total de personajes encontrados
- Distribución por especies

### 5. Paginación
- Navegación entre páginas de resultados
- Indicador de página actual y total de páginas

### 6. Manejo de Estados
- Indicador de carga durante las peticiones
- Mensaje cuando no se encuentran resultados
- Manejo de errores en las peticiones

## 🔄 Consumo de API

La aplicación consume la [Rick and Morty API](https://rickandmortyapi.com/), específicamente el endpoint de personajes:
- URL Base: `https://rickandmortyapi.com/api/character`
- Parámetros utilizados:
  - `name`: Búsqueda por nombre
  - `status`: Filtro por estado (alive, dead, unknown)
  - `species`: Filtro por especie
  - `gender`: Filtro por género
  - `page`: Paginación

## 📱 Diseño Responsivo

La aplicación está optimizada para diferentes tamaños de pantalla:
- Escritorio: Vista en cuadrícula de múltiples columnas
- Tablet: Vista en cuadrícula de menos columnas
- Móvil: Vista en columna única

## 🧩 Funcionalidades JavaScript

- Consumo asíncrono de API mediante Fetch
- Manejo dinámico del DOM
- Eventos de usuario (clicks, teclas, cambios en selectores)
- Navegación entre páginas
- Manejo de estados de carga y error
- Caché de resultados
- Traducción automática de términos (inglés → español)

Desarrollado con 💚 por [Johan Henao](https://github.com/JohanSH7) | 2025
