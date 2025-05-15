// Funciones para la página de resultados de búsqueda

import { searchRestaurants } from "./restaurants.js"
import { isFavorite } from "./favorites.js"
import { formatDate } from "./utils.js"

document.addEventListener("DOMContentLoaded", () => {
  // Obtener parámetro de búsqueda
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get("q")

  if (query) {
    // Actualizar título
    document.getElementById("search-results-title").textContent = `Resultados para: "${query}"`

    // Realizar búsqueda
    performSearch(query)

    // Configurar campo de búsqueda
    const searchInput = document.getElementById("search-input")
    searchInput.value = query

    // Configurar búsqueda
    setupSearch()
  } else {
    // Redirigir a la página principal si no hay consulta
    window.location.href = "index.html"
  }
})

// Función para realizar la búsqueda
function performSearch(query) {
  const resultsContainer = document.getElementById("search-results-list")
  const noResultsElement = document.getElementById("no-results")

  // Buscar restaurantes
  const results = searchRestaurants(query)

  // Limpiar contenedor
  resultsContainer.innerHTML = ""

  if (results.length === 0) {
    // Mostrar mensaje de no resultados
    resultsContainer.style.display = "none"
    noResultsElement.classList.remove("hidden")
  } else {
    // Mostrar resultados
    resultsContainer.style.display = "flex"
    noResultsElement.classList.add("hidden")

    // Renderizar resultados
    results.forEach((restaurant) => {
      const resultItem = document.createElement("div")
      resultItem.className = "search-result-item"
      resultItem.onclick = () => {
        window.location.href = `detalle_restaurante.html?id=${restaurant.id}`
      }

      const imageUrl = restaurant.image || "img/placeholder-restaurant.jpg"
      const isFav = isFavorite(restaurant.id)

      resultItem.innerHTML = `
                <div class="search-result-image">
                    <img src="${imageUrl}" alt="${restaurant.name}">
                </div>
                <div class="search-result-content">
                    <div class="search-result-header">
                        <div class="search-result-title">
                            <h3>${restaurant.name}</h3>
                            <p>${restaurant.type}</p>
                        </div>
                        <div class="search-result-favorite">
                            <i class="${isFav ? "fas" : "far"} fa-heart"></i>
                        </div>
                    </div>
                    <div class="search-result-info">
                        <p><i class="fas fa-calendar-alt"></i> ${formatDate(restaurant.createdAt)}</p>
                        <p><i class="fas fa-shopping-bag"></i> ${restaurant.orderCount} pedidos</p>
                    </div>
                </div>
            `

      resultsContainer.appendChild(resultItem)
    })
  }
}

// Función para configurar la búsqueda
function setupSearch() {
  const searchInput = document.getElementById("search-input")
  const searchButton = document.getElementById("search-button")

  // Buscar al hacer clic en el botón
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim()
    if (query) {
      window.location.href = `resultados_busqueda.html?q=${encodeURIComponent(query)}`
    }
  })

  // Buscar al presionar Enter
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim()
      if (query) {
        window.location.href = `resultados_busqueda.html?q=${encodeURIComponent(query)}`
      }
    }
  })
}
