// ELEMENTOS DEL DOM
const entradaBusqueda = document.getElementById('entradaBusqueda');
const botonBuscar = document.getElementById('botonBuscar');
const filtroEstado = document.getElementById('filtroEstado');
const filtroEspecie = document.getElementById('filtroEspecie');
const filtroGenero = document.getElementById('filtroGenero');
const cuadriculaPersonajes = document.getElementById('cuadriculaPersonajes');
const contenedorCargando = document.querySelector('.contenedor-cargando');
const sinResultados = document.getElementById('sinResultados');
const mensajeError = document.getElementById('mensajeError');
const botonPaginaAnterior = document.getElementById('paginaAnterior');
const botonPaginaSiguiente = document.getElementById('paginaSiguiente');
const infoPagina = document.getElementById('infoPagina');
const totalPersonajes = document.getElementById('totalPersonajes');
const distribucionEspecies = document.getElementById('distribucionEspecies');

// VARIABLES DE ESTADO

//Página actual de resultados
let paginaActual = 1;
// Total de páginas disponibles
let totalPaginas = 0;
// Última búsqueda realizada
let ultimaBusqueda = '';
//Último estado de filtro aplicado
let ultimoEstado = '';
// Última especie de filtro aplicada
let ultimaEspecie = '';
// Último género de filtro aplicado
let ultimoGenero = '';
// Caché de los resultados de la búsqueda
let resultadosCache = [];
//Contador de especies encontradas
let contadorEspecies = {};

// CONSTANTES

// URL base de la API de Rick and Morty
const URL_BASE_API = 'https://rickandmortyapi.com/api/character';

// INICIALIZACIÓN
// Inicializa la aplicación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargar personajes iniciales
    obtenerPersonajes();
    
    // Event listeners
    botonBuscar.addEventListener('click', manejarBusqueda);
    entradaBusqueda.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            manejarBusqueda();
        }
    });
    
    filtroEstado.addEventListener('change', manejarBusqueda);
    filtroEspecie.addEventListener('change', manejarBusqueda);
    filtroGenero.addEventListener('change', manejarBusqueda);
    
    botonPaginaAnterior.addEventListener('click', manejarPaginaAnterior);
    botonPaginaSiguiente.addEventListener('click', manejarPaginaSiguiente);
});

// FUNCIONES DE MANEJO DE EVENTOS

// Maneja el evento de búsqueda y aplicación de filtros
function manejarBusqueda() {
    paginaActual = 1;
    ultimaBusqueda = entradaBusqueda.value.trim();
    ultimoEstado = filtroEstado.value;
    ultimaEspecie = filtroEspecie.value;
    ultimoGenero = filtroGenero.value;
    obtenerPersonajes();
}

// Maneja la navegación a la página anterior
function manejarPaginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        obtenerPersonajes();
    }
}

// Maneja la navegación a la página siguiente
function manejarPaginaSiguiente() {
    if (paginaActual < totalPaginas) {
        paginaActual++;
        obtenerPersonajes();
    }
}

/**
 * FUNCIONES DE CONSUMO DE API
 * 
 * Obtiene personajes de la API con los filtros aplicados
 */
function obtenerPersonajes() {
    // Mostrar estado de carga
    mostrarCargando();
    // Construir URL con parámetros de búsqueda
    let url = new URL(URL_BASE_API);
    const parametros = new URLSearchParams();
    
    parametros.append('page', paginaActual);
    
    if (ultimaBusqueda) {
        parametros.append('name', ultimaBusqueda);
    }
    
    if (ultimoEstado) {
        parametros.append('status', ultimoEstado);
    }
    
    if (ultimaEspecie) {
        parametros.append('species', ultimaEspecie);
    }
    
    if (ultimoGenero) {
        parametros.append('gender', ultimoGenero);
    }
    
    url.search = parametros.toString();
    
    // Realizar petición a la API
    fetch(url)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return respuesta.json();
        })
        .then(datos => {
            totalPaginas = datos.info.pages;
            resultadosCache = datos.results;
            mostrarPersonajes(datos.results);
            actualizarEstadisticas(datos.info, datos.results);
            actualizarPaginacion();
        })
        .catch(error => {
            console.error('Error obteniendo datos:', error);
            mostrarError();
        })
        .finally(() => {
            ocultarCargando();
        });
}

/**
 * FUNCIONES DE VISUALIZACIÓN
 * 
 * Muestra los personajes en la interfaz
 */
function mostrarPersonajes(personajes) {
    // Limpiar resultados anteriores
    cuadriculaPersonajes.innerHTML = '';
    
    // Ocultar mensajes de error/no resultados
    mensajeError.style.display = 'none';
    sinResultados.style.display = 'none';
    
    // Verificar si hay resultados
    if (personajes && personajes.length > 0) {
        // Crear tarjeta para cada personaje
        personajes.forEach(personaje => {
            const tarjeta = crearTarjetaPersonaje(personaje);
            cuadriculaPersonajes.appendChild(tarjeta);
        });
    } else {
        // Mostrar mensaje de no resultados
        sinResultados.style.display = 'block';
    }
}

// Actualiza las estadísticas de la búsqueda
function actualizarEstadisticas(info, personajes) {
    // Actualizar contador total de personajes
    totalPersonajes.textContent = info.count || 0;
    
    // Calcular distribución de especies
    contadorEspecies = {};
    
    personajes.forEach(personaje => {
        const especie = personaje.species || 'Desconocida';
        contadorEspecies[especie] = (contadorEspecies[especie] || 0) + 1;
    });
    
    // Mostrar distribución de especies
    distribucionEspecies.innerHTML = '';
    
    Object.entries(contadorEspecies).forEach(([especie, cantidad]) => {
        const etiqueta = document.createElement('span');
        etiqueta.className = 'etiqueta-especie';
        etiqueta.innerHTML = `${especie} <span class="contador-especie">${cantidad}</span>`;
        distribucionEspecies.appendChild(etiqueta);
    });
}

//Crear un elemento de tarjeta para un personaje
function crearTarjetaPersonaje(personaje) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-personaje';
    
    // Determinar clase CSS para el indicador de estado
    let claseEstado = 'estado-desconocido';
    if (personaje.status.toLowerCase() === 'alive') {
        claseEstado = 'estado-vivo';
    } else if (personaje.status.toLowerCase() === 'dead') {
        claseEstado = 'estado-muerto';
    }
    
    // Traducir estados
    let estadoTraducido = 'Desconocido';
    if (personaje.status === 'Alive') estadoTraducido = 'Vivo';
    if (personaje.status === 'Dead') estadoTraducido = 'Muerto';
    
    // Obtener episodio inaugural y último episodio
    const primerEpisodio = personaje.episode[0].split('/').pop();
    const ultimoEpisodio = personaje.episode[personaje.episode.length - 1].split('/').pop();
    
    // Estructura HTML de la tarjeta
    tarjeta.innerHTML = `
        <img src="${personaje.image}" alt="${personaje.name}" class="imagen-personaje">
        <div class="info-personaje">
            <h3 class="nombre-personaje">${personaje.name}</h3>
            <p class="especie-personaje">${personaje.species}</p>
            <div class="indicador-estado">
                <span class="punto-estado ${claseEstado}"></span>
                ${estadoTraducido}
            </div>
            <div class="detalles-personaje">
                <div class="detalle-item">
                    <span class="detalle-etiqueta">Género</span>
                    <span>${traducirGenero(personaje.gender)}</span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-etiqueta">Origen</span>
                    <span>${personaje.origin.name}</span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-etiqueta">Ubicación</span>
                    <span>${personaje.location.name}</span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-etiqueta">Episodios</span>
                    <span>${personaje.episode.length}</span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-etiqueta">Primera Aparición</span>
                    <span>Ep. ${primerEpisodio}</span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-etiqueta">Última Aparición</span>
                    <span>Ep. ${ultimoEpisodio}</span>
                </div>
            </div>
        </div>
    `;
    
    return tarjeta;
}

// Traduce el género del personaje al español
function traducirGenero(genero) {
    const traducciones = {
        'Male': 'Masculino',
        'Female': 'Femenino',
        'Genderless': 'Sin género',
        'unknown': 'Desconocido'
    };
    
    return traducciones[genero] || genero;
}

// Actualiza los controles de paginación
function actualizarPaginacion() {
    infoPagina.textContent = `Página ${paginaActual} de ${totalPaginas || 1}`;
    
    // Habilitar/deshabilitar botones según corresponda
    botonPaginaAnterior.disabled = paginaActual <= 1;
    botonPaginaSiguiente.disabled = paginaActual >= totalPaginas;
    
    // Mostrar/ocultar paginación según si hay resultados
    document.getElementById('paginacion').style.display = 
        totalPaginas > 0 ? 'flex' : 'none';
}

//bMostrar indicador de carga
function mostrarCargando() {
    contenedorCargando.style.display = 'flex';
    cuadriculaPersonajes.innerHTML = '';
    mensajeError.style.display = 'none';
    sinResultados.style.display = 'none';
}

// Ocultar indicador de carga
function ocultarCargando() {
    contenedorCargando.style.display = 'none';
}

// Mostrar mensaje de error
function mostrarError() {
    mensajeError.style.display = 'block';
    cuadriculaPersonajes.innerHTML = '';
    document.getElementById('paginacion').style.display = 'none';
}