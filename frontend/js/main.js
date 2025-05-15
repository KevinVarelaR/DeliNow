// Importar funciones de data.js
import { getRestaurants, getFavorites, getMostOrderedRestaurants } from "./data.js"

// Funciones para la página principal

document.addEventListener("DOMContentLoaded", () => {
  // Cargar restaurantes
  loadAllRestaurants()
  loadFavoriteRestaurants()
  loadMostOrderedRestaurants()

  // Configurar búsqueda
  setupSearch()
})

// Función para cargar todos los restaurantes
function loadAllRestaurants() {
  const container = document.getElementById("all-restaurants")
  const restaurants = getRestaurants()

  // Ordenar por fecha de creación (más recientes primero)
  const sortedRestaurants = [...restaurants].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  renderRestaurantCards(container, sortedRestaurants)
}

// Función para cargar restaurantes favoritos
function loadFavoriteRestaurants() {
  const container = document.getElementById("favorite-restaurants")
  const favorites = getFavorites()

  // Ordenar por fecha de creación (más recientes primero)
  const sortedFavorites = [...favorites].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Limitar a 10 restaurantes
  const limitedFavorites = sortedFavorites.slice(0, 10)

  renderRestaurantCards(container, limitedFavorites)
}

// Función para cargar restaurantes más pedidos
function loadMostOrderedRestaurants() {
  const container = document.getElementById("most-ordered-restaurants")
  const mostOrdered = getMostOrderedRestaurants()

  // Limitar a 10 restaurantes
  const limitedMostOrdered = mostOrdered.slice(0, 10)

  renderRestaurantCards(container, limitedMostOrdered)
}

// Función para renderizar tarjetas de restaurantes
function renderRestaurantCards(container, restaurants) {
  // Limpiar el contenedor
  container.innerHTML = ""

  if (restaurants.length === 0) {
    container.innerHTML = '<p class="no-results">No hay restaurantes disponibles</p>'
    return
  }

  // Crear tarjetas para cada restaurante
  restaurants.forEach((restaurant) => {
    const card = document.createElement("div")
    card.className = "restaurant-card"
    card.onclick = () => {
      window.location.href = `detalle_restaurante.html?id=${restaurant.id}`
    }

    const imageUrl = restaurant.image || "https://via.placeholder.com/300x200?text=Restaurante"

    card.innerHTML = `
      <div class="restaurant-card-image">
        <img src="${imageUrl}" alt="${restaurant.name}">
      </div>
      <div class="restaurant-card-content">
        <h3>${restaurant.name}</h3>
        <p>${restaurant.type}</p>
      </div>
    `

    container.appendChild(card)
  })
}

// Función para configurar la búsqueda
function setupSearch() {
  const searchInput = document.getElementById("search-input")
  const searchButton = document.getElementById("search-button")

  // Buscar al hacer clic en el botón
  searchButton.addEventListener("click", () => {
    performSearch()
  })

  // Buscar al presionar Enter
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })
}

// Función para realizar la búsqueda
function performSearch() {
  const searchInput = document.getElementById("search-input")
  const query = searchInput.value.trim()

  if (query) {
    window.location.href = `resultados_busqueda.html?q=${encodeURIComponent(query)}`
  }
}
