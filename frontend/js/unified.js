// Archivo JavaScript unificado para todas las funcionalidades
// Este archivo reemplaza todos los archivos JS individuales

// ===== VARIABLES GLOBALES =====
let cart = []

// ===== FUNCIONES DE DATOS =====

// Función para inicializar datos si no existen
function initializeData(forceReset = false) {
  // Solo borrar datos si se fuerza el reinicio o no existen datos
  if (forceReset || !localStorage.getItem("restaurants")) {
    localStorage.removeItem("restaurants")
    localStorage.removeItem("favorites")
    localStorage.removeItem("orders")

    // Crear algunos restaurantes de ejemplo
    const exampleRestaurants = [
      {
        id: "rest1",
        name: "Burger Deluxe",
        type: "Comida Rápida",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        orderCount: 42,
        foodItems: [
          {
            name: "Hamburguesa Clásica",
            price: 5500,
            image:
              "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
          },
          {
            name: "Papas Fritas",
            price: 2500,
            image:
              "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
          },
          {
            name: "Refresco",
            price: 1500,
            image:
              "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
          },
        ],
      },
      {
        id: "rest2",
        name: "Pizza Napoli",
        type: "Comida Italiana",
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        orderCount: 38,
        foodItems: [
          {
            name: "Pizza Margarita",
            price: 8500,
            image:
              "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
          },
          {
            name: "Pizza Pepperoni",
            price: 9500,
            image:
              "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
          },
          {
            name: "Pasta Carbonara",
            price: 7500,
            image:
              "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
          },
        ],
      },
      {
        id: "rest3",
        name: "Sushi Master",
        type: "Comida Japonesa",
        image:
          "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        orderCount: 27,
        foodItems: [
          {
            name: "Sushi Variado",
            price: 12500,
            image:
              "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
          },
          {
            name: "Ramen",
            price: 8500,
            image:
              "https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
          },
          {
            name: "Tempura",
            price: 7500,
            image:
              "https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
          },
        ],
      },
    ]

    localStorage.setItem("restaurants", JSON.stringify(exampleRestaurants))
    localStorage.setItem("favorites", JSON.stringify(["rest2"]))

    const exampleOrders = {
      rest1: [
        {
          id: "order1",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              name: "Hamburguesa Clásica",
              price: 5500,
              quantity: 2,
              image:
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
            },
            {
              name: "Papas Fritas",
              price: 2500,
              quantity: 1,
              image:
                "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
            },
          ],
          subtotal: 13500,
          tax: 1755,
          shipping: 1350,
          service: 1485,
          total: 18090,
        },
      ],
    }

    localStorage.setItem("orders", JSON.stringify(exampleOrders))

    console.log("Datos de ejemplo cargados correctamente")
  }
}

// Función para obtener todos los restaurantes
function getRestaurants() {
  return JSON.parse(localStorage.getItem("restaurants") || "[]")
}

// Función para obtener un restaurante por ID
function getRestaurantById(id) {
  const restaurants = getRestaurants()
  return restaurants.find((restaurant) => restaurant.id === id) || null
}

// Función para agregar un nuevo restaurante
function addRestaurant(restaurant) {
  const restaurants = getRestaurants()
  const newRestaurant = {
    ...restaurant,
    id: generateId(),
    createdAt: new Date().toISOString(),
    orderCount: 0,
  }
  restaurants.push(newRestaurant)
  localStorage.setItem("restaurants", JSON.stringify(restaurants))
  return newRestaurant
}

// Función para obtener restaurantes favoritos
function getFavorites() {
  const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]")
  const restaurants = getRestaurants()
  return restaurants.filter((restaurant) => favoriteIds.includes(restaurant.id))
}

// Función para verificar si un restaurante es favorito
function isFavorite(restaurantId) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
  return favorites.includes(restaurantId)
}

// Función para agregar o quitar un restaurante de favoritos
function toggleFavorite(restaurantId) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
  const index = favorites.indexOf(restaurantId)

  if (index === -1) {
    favorites.push(restaurantId)
  } else {
    favorites.splice(index, 1)
  }

  localStorage.setItem("favorites", JSON.stringify(favorites))
  return index === -1 // Retorna true si se agregó, false si se quitó
}

// Función para obtener restaurantes más pedidos
function getMostOrderedRestaurants() {
  const restaurants = getRestaurants()
  return [...restaurants].sort((a, b) => b.orderCount - a.orderCount)
}

// Función para buscar restaurantes
function searchRestaurants(query) {
  const restaurants = getRestaurants()
  const searchTerm = query.toLowerCase().trim()

  return restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm) || restaurant.type.toLowerCase().includes(searchTerm),
  )
}

// Función para obtener órdenes de un restaurante
function getRestaurantOrders(restaurantId) {
  const allOrders = JSON.parse(localStorage.getItem("orders") || "{}")
  return allOrders[restaurantId] || []
}

// Función para agregar una orden a un restaurante
function addOrder(restaurantId, order) {
  const allOrders = JSON.parse(localStorage.getItem("orders") || "{}")

  if (!allOrders[restaurantId]) {
    allOrders[restaurantId] = []
  }

  const newOrder = {
    ...order,
    id: generateId(),
    date: new Date().toISOString(),
  }

  allOrders[restaurantId].unshift(newOrder)
  localStorage.setItem("orders", JSON.stringify(allOrders))

  // Incrementar el contador de pedidos del restaurante
  const restaurants = getRestaurants()
  const restaurantIndex = restaurants.findIndex((r) => r.id === restaurantId)

  if (restaurantIndex !== -1) {
    restaurants[restaurantIndex].orderCount = (restaurants[restaurantIndex].orderCount || 0) + 1
    localStorage.setItem("restaurants", JSON.stringify(restaurants))
  }

  return newOrder
}

// Función para generar un ID único
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

// Función para convertir una imagen a base64
function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

// Función para formatear precio
function formatPrice(price) {
  return "₡" + price.toLocaleString("es-CR")
}

// Función para formatear fecha
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Función para obtener todas las categorías únicas de restaurantes
function getAllCategories() {
  const restaurants = getRestaurants()
  const categories = new Set()

  restaurants.forEach((restaurant) => {
    if (restaurant.type) {
      categories.add(restaurant.type)
    }
  })

  return Array.from(categories).sort()
}

// Función para renderizar los filtros de categoría
function renderCategoryFilters(container, activeCategories = []) {
  if (!container) return

  // Limpiar contenedor
  container.innerHTML = ""

  // Obtener todas las categorías
  const categories = getAllCategories()

  // Crear botón para "Todas"
  const allButton = document.createElement("button")
  allButton.className = `category-filter ${activeCategories.length === 0 ? "active" : ""}`
  allButton.textContent = "Todas"
  allButton.dataset.category = "all"
  container.appendChild(allButton)

  // Crear botones para cada categoría
  categories.forEach((category) => {
    const button = document.createElement("button")
    button.className = `category-filter ${activeCategories.includes(category) ? "active" : ""}`
    button.textContent = category
    button.dataset.category = category
    container.appendChild(button)
  })

  // Configurar eventos de clic
  const filterButtons = container.querySelectorAll(".category-filter")
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category

      // Si es "Todas", desactivar todos los demás filtros
      if (category === "all") {
        filterButtons.forEach((btn) => {
          btn.classList.remove("active")
          if (btn.dataset.category === "all") {
            btn.classList.add("active")
          }
        })

        // Recargar todos los restaurantes sin filtro
        loadAllRestaurants()
        loadFavoriteRestaurants()
        loadMostOrderedRestaurants()
      } else {
        // Desactivar el botón "Todas"
        filterButtons.forEach((btn) => {
          if (btn.dataset.category === "all") {
            btn.classList.remove("active")
          }
        })

        // Activar o desactivar el botón de categoría
        button.classList.toggle("active")

        // Obtener categorías activas
        const activeFilters = Array.from(container.querySelectorAll(".category-filter.active"))
          .map((btn) => btn.dataset.category)
          .filter((cat) => cat !== "all")

        // Si no hay filtros activos, activar "Todas"
        if (activeFilters.length === 0) {
          filterButtons.forEach((btn) => {
            if (btn.dataset.category === "all") {
              btn.classList.add("active")
            }
          })

          // Recargar todos los restaurantes sin filtro
          loadAllRestaurants()
          loadFavoriteRestaurants()
          loadMostOrderedRestaurants()
        } else {
          // Filtrar restaurantes por categorías seleccionadas
          loadFilteredRestaurants(activeFilters)
        }
      }
    })
  })
}

// Función para cargar restaurantes filtrados por categoría
function loadFilteredRestaurants(categories) {
  const allContainer = document.getElementById("all-restaurants")
  const favoritesContainer = document.getElementById("favorite-restaurants")
  const mostOrderedContainer = document.getElementById("most-ordered-restaurants")

  if (!allContainer || !favoritesContainer || !mostOrderedContainer) return

  const restaurants = getRestaurants()

  // Filtrar por categorías seleccionadas
  const filteredRestaurants = restaurants.filter((restaurant) => categories.includes(restaurant.type))

  // Ordenar por fecha de creación (más recientes primero)
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Renderizar en "Todos los Restaurantes"
  renderRestaurantCards(allContainer, sortedRestaurants)

  // Filtrar favoritos
  const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]")
  const filteredFavorites = filteredRestaurants.filter((restaurant) => favoriteIds.includes(restaurant.id))
  const sortedFavorites = [...filteredFavorites].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Renderizar en "Restaurantes Favoritos"
  renderRestaurantCards(favoritesContainer, sortedFavorites)

  // Ordenar por número de pedidos
  const sortedMostOrdered = [...filteredRestaurants].sort((a, b) => b.orderCount - a.orderCount)

  // Renderizar en "Restaurantes Más Pedidos"
  renderRestaurantCards(mostOrderedContainer, sortedMostOrdered)
}

// ===== FUNCIONES DE PÁGINA PRINCIPAL =====

// Función para cargar todos los restaurantes
function loadAllRestaurants() {
  const container = document.getElementById("all-restaurants")
  if (!container) return

  const restaurants = getRestaurants()

  // Ordenar por fecha de creación (más recientes primero)
  const sortedRestaurants = [...restaurants].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  renderRestaurantCards(container, sortedRestaurants)
}

// Función para cargar restaurantes favoritos
function loadFavoriteRestaurants() {
  const container = document.getElementById("favorite-restaurants")
  if (!container) return

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
  if (!container) return

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
      window.location.href = `
detalle_restaurante.html?id=${restaurant.id}`
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

  if (!searchInput || !searchButton) return

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
  if (!searchInput) return

  const query = searchInput.value.trim()

  if (query) {
    window.location.href = `resultados_busqueda.html?q=${encodeURIComponent(query)}`
  }
}

// ===== FUNCIONES DE PÁGINA DE BÚSQUEDA =====

// Función para cargar resultados de búsqueda
function loadSearchResults() {
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get("q")

  if (query) {
    // Actualizar título
    const titleElement = document.getElementById("search-results-title")
    if (titleElement) {
      titleElement.textContent = `Resultados para: "${query}"`
    }

    // Realizar búsqueda
    performSearchQuery(query)

    // Configurar campo de búsqueda
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.value = query
    }

    // Configurar búsqueda
    setupSearch()
  } else {
    // Redirigir a la página principal si no hay consulta
    window.location.href = "index.html"
  }
}

// Modificar la función de búsqueda para incluir filtros de categoría
function performSearchQuery(query, categories = []) {
  const resultsContainer = document.getElementById("search-results-list")
  const noResultsElement = document.getElementById("no-results")

  if (!resultsContainer || !noResultsElement) return

  // Buscar restaurantes
  let results = searchRestaurants(query)

  // Aplicar filtro de categorías si hay alguna seleccionada
  if (categories && categories.length > 0) {
    results = results.filter((restaurant) => categories.includes(restaurant.type))
  }

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

      const imageUrl = restaurant.image || "https://via.placeholder.com/300x200?text=Restaurante"
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

// ===== FUNCIONES DE PÁGINA DE DETALLE =====

// Función para cargar detalles del restaurante
function loadRestaurantDetails() {
  const urlParams = new URLSearchParams(window.location.search)
  const restaurantId = urlParams.get("id")

  if (restaurantId) {
    const restaurant = getRestaurantById(restaurantId)

    if (!restaurant) {
      alert("Restaurante no encontrado")
      window.location.href = "index.html"
      return
    }

    // Actualizar información del restaurante
    document.title = `${restaurant.name} - FoodExpress`

    const nameElement = document.getElementById("restaurant-name")
    if (nameElement) nameElement.textContent = restaurant.name

    const typeElement = document.getElementById("restaurant-type")
    if (typeElement && typeElement.querySelector("span"))
      typeElement.querySelector("span").textContent = restaurant.type

    const dateElement = document.getElementById("restaurant-date")
    if (dateElement && dateElement.querySelector("span"))
      dateElement.querySelector("span").textContent = formatDate(restaurant.createdAt)

    const ordersElement = document.getElementById("restaurant-orders")
    if (ordersElement && ordersElement.querySelector("span"))
      ordersElement.querySelector("span").textContent = restaurant.orderCount

    // Actualizar imagen
    const imageElement = document.getElementById("restaurant-image")
    if (imageElement && restaurant.image) {
      imageElement.src = restaurant.image
    }

    // Cargar elementos del menú
    loadFoodItems(restaurant)

    // Configurar botón de favoritos
    setupFavoriteButton(restaurantId)

    // Configurar historial de pedidos
    setupOrderHistory(restaurantId)

    // Configurar modal de confirmación de pedido
    setupOrderConfirmationModal(restaurantId)

    // Configurar modal de agregar comida
    setupAddFoodModal(restaurantId)
  } else {
    // Redirigir a la página principal si no hay ID
    window.location.href = "index.html"
  }
}

// Función para cargar elementos del menú
function loadFoodItems(restaurant) {
  const container = document.getElementById("food-items")
  if (!container) return

  // Limpiar contenedor
  container.innerHTML = ""

  if (!restaurant.foodItems || restaurant.foodItems.length === 0) {
    container.innerHTML = '<p class="no-results">No hay elementos en el menú</p>'
    return
  }

  // Crear tarjetas para cada elemento del menú
  restaurant.foodItems.forEach((foodItem, index) => {
    const foodCard = document.createElement("div")
    foodCard.className = "food-item-card"
    foodCard.dataset.id = index
    foodCard.draggable = true

    const imageUrl = foodItem.image || "https://via.placeholder.com/300x200?text=Comida"

    foodCard.innerHTML = `
      <div class="food-item-image">
        <img src="${imageUrl}" alt="${foodItem.name}">
      </div>
      <div class="food-item-content">
        <h4>${foodItem.name}</h4>
        <p class="food-item-price">${formatPrice(foodItem.price)}</p>
        <div class="food-item-quantity">
          <span>Cantidad:</span>
          <div class="quantity-selector">
            <button class="quantity-btn" onclick="decrementQuantity(event, ${index})">-</button>
            <span class="quantity-value" id="quantity-${index}">1</span>
            <button class="quantity-btn" onclick="incrementQuantity(event, ${index})">+</button>
          </div>
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(event, ${index})">
          <i class="fas fa-cart-plus"></i> Agregar al Carrito
        </button>
      </div>
    `

    container.appendChild(foodCard)

    // Configurar eventos de arrastrar y soltar
    setupDragAndDrop(foodCard)
  })
}

// Modificar la función updateFavoriteButton para que actualice la interfaz correctamente
function updateFavoriteButton(button, restaurantId, forcedState = null) {
  const isFav = forcedState !== null ? forcedState : isFavorite(restaurantId)

  if (isFav) {
    button.innerHTML = '<i class="fas fa-heart"></i> Quitar de favoritos'
    button.classList.add("active")
  } else {
    button.innerHTML = '<i class="far fa-heart"></i> Agregar a favoritos'
    button.classList.remove("active")
  }

  // Si estamos en la página de detalle y se cambia el estado de favorito,
  // actualizar la página principal cuando el usuario regrese
  localStorage.setItem("favoritesUpdated", "true")
}

// Modificar la función setupFavoriteButton para que maneje mejor el evento de clic
function setupFavoriteButton(restaurantId) {
  const favoriteBtn = document.getElementById("favorite-btn")
  if (!favoriteBtn) return

  updateFavoriteButton(favoriteBtn, restaurantId)

  favoriteBtn.addEventListener("click", () => {
    const isNowFavorite = toggleFavorite(restaurantId)
    updateFavoriteButton(favoriteBtn, restaurantId, isNowFavorite)

    // Mostrar mensaje de confirmación
    const message = isNowFavorite ? "¡Restaurante agregado a favoritos!" : "Restaurante eliminado de favoritos"

    showToast(message)
  })
}

// Agregar una función para mostrar mensajes toast
function showToast(message) {
  // Crear elemento toast si no existe
  let toast = document.getElementById("toast-message")
  if (!toast) {
    toast = document.createElement("div")
    toast.id = "toast-message"
    toast.className = "toast-message"
    document.body.appendChild(toast)

    // Agregar estilos para el toast si no existen
    if (!document.getElementById("toast-styles")) {
      const style = document.createElement("style")
      style.id = "toast-styles"
      style.textContent = `
        .toast-message {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--dark-color);
          color: white;
          padding: 12px 24px;
          border-radius: 4px;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .toast-message.show {
          opacity: 1;
        }
      `
      document.head.appendChild(style)
    }
  }

  // Mostrar mensaje
  toast.textContent = message
  toast.classList.add("show")

  // Ocultar después de 3 segundos
  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Función para actualizar botón de favoritos
/*function updateFavoriteButton(button, restaurantId, forcedState = null) {
  const isFav = forcedState !== null ? forcedState : isFavorite(restaurantId)

  if (isFav) {
    button.innerHTML = '<i class="fas fa-heart"></i> Quitar de favoritos'
    button.classList.add("active")
  } else {
    button.innerHTML = '<i class="far fa-heart"></i> Agregar a favoritos'
    button.classList.remove("active")
  }
}

// Función para configurar botón de favoritos
function setupFavoriteButton(restaurantId) {
  const favoriteBtn = document.getElementById("favorite-btn")
  if (!favoriteBtn) return

  updateFavoriteButton(favoriteBtn, restaurantId)

  favoriteBtn.addEventListener("click", () => {
    const isNowFavorite = toggleFavorite(restaurantId)
    updateFavoriteButton(favoriteBtn, restaurantId, isNowFavorite)
  })
}*/

// Función para incrementar cantidad
function incrementQuantity(event, foodIndex) {
  event.stopPropagation()
  const quantityElement = document.getElementById(`quantity-${foodIndex}`)
  if (!quantityElement) return

  let quantity = Number.parseInt(quantityElement.textContent)

  if (quantity < 10) {
    quantity++
    quantityElement.textContent = quantity
  }
}

// Función para decrementar cantidad
function decrementQuantity(event, foodIndex) {
  event.stopPropagation()
  const quantityElement = document.getElementById(`quantity-${foodIndex}`)
  if (!quantityElement) return

  let quantity = Number.parseInt(quantityElement.textContent)

  if (quantity > 1) {
    quantity--
    quantityElement.textContent = quantity
  }
}

// Corregir el problema del drag and drop que multiplica por 3 los elementos
// Modificar la función setupDragAndDrop para evitar múltiples eventos
function setupDragAndDrop(foodCard) {
  const cartDropArea = document.getElementById("cart-drop-area")
  if (!cartDropArea) return

  // Eliminar eventos previos para evitar duplicación
  foodCard.removeEventListener("dragstart", handleDragStart)
  foodCard.removeEventListener("dragend", handleDragEnd)
  cartDropArea.removeEventListener("dragover", handleDragOver)
  cartDropArea.removeEventListener("dragleave", handleDragLeave)
  cartDropArea.removeEventListener("drop", handleDrop)

  // Definir funciones de manejo de eventos
  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", foodCard.dataset.id)
    foodCard.classList.add("dragging")
  }

  function handleDragEnd() {
    foodCard.classList.remove("dragging")
    cartDropArea.classList.remove("active")
  }

  function handleDragOver(e) {
    e.preventDefault()
    cartDropArea.classList.add("active")
  }

  function handleDragLeave() {
    cartDropArea.classList.remove("active")
  }

  function handleDrop(e) {
    e.preventDefault()
    const foodIndex = e.dataTransfer.getData("text/plain")
    const quantity = Number.parseInt(document.getElementById(`quantity-${foodIndex}`).textContent)

    addToCart(null, foodIndex, quantity)

    cartDropArea.classList.remove("active")
  }

  // Agregar eventos
  foodCard.addEventListener("dragstart", handleDragStart)
  foodCard.addEventListener("dragend", handleDragEnd)
  cartDropArea.addEventListener("dragover", handleDragOver)
  cartDropArea.addEventListener("dragleave", handleDragLeave)
  cartDropArea.addEventListener("drop", handleDrop)
}

// ===== FUNCIONES DE CARRITO =====

// Función para agregar al carrito
function addToCart(event, foodIndex, quantity = null) {
  if (event) {
    event.stopPropagation()
  }

  const urlParams = new URLSearchParams(window.location.search)
  const restaurantId = urlParams.get("id")
  const restaurant = getRestaurantById(restaurantId)

  if (!restaurant || !restaurant.foodItems) {
    return
  }

  const foodItem = restaurant.foodItems[foodIndex]

  if (!foodItem) {
    return
  }

  // Obtener cantidad
  if (!quantity) {
    const quantityElement = document.getElementById(`quantity-${foodIndex}`)
    if (quantityElement) {
      quantity = Number.parseInt(quantityElement.textContent)
    } else {
      quantity = 1
    }
  }

  // Verificar si el elemento ya está en el carrito
  const existingItemIndex = cart.findIndex((item) => item.index === Number.parseInt(foodIndex))

  if (existingItemIndex !== -1) {
    // Actualizar cantidad
    cart[existingItemIndex].quantity += quantity
  } else {
    // Agregar nuevo elemento
    cart.push({
      index: Number.parseInt(foodIndex),
      name: foodItem.name,
      price: foodItem.price,
      image: foodItem.image,
      quantity: quantity,
    })
  }

  // Actualizar carrito
  updateCartDisplay()
}

// Función para eliminar del carrito
function removeFromCart(index) {
  cart.splice(index, 1)
  updateCartDisplay()
}

// Función para actualizar visualización del carrito
function updateCartDisplay() {
  const cartContainer = document.getElementById("cart-items")
  const orderBtn = document.getElementById("order-btn")

  if (!cartContainer || !orderBtn) return

  // Limpiar contenedor
  cartContainer.innerHTML = ""

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="empty-cart-message">El carrito está vacío</p>'
    orderBtn.disabled = true
  } else {
    orderBtn.disabled = false

    // Crear elementos para cada item del carrito
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"

      const imageUrl = item.image || "https://via.placeholder.com/300x200?text=Comida"
      const totalPrice = item.price * item.quantity

      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${imageUrl}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Cantidad: ${item.quantity}</p>
        </div>
        <div class="cart-item-price">${formatPrice(totalPrice)}</div>
        <button class="remove-cart-item" onclick="removeFromCart(${index})">
          <i class="fas fa-trash"></i>
        </button>
      `

      cartContainer.appendChild(cartItem)
    })
  }

  // Actualizar resumen
  updateCartSummary()
}

// Función para actualizar resumen del carrito
function updateCartSummary() {
  const subtotalElement = document.getElementById("subtotal")
  const taxElement = document.getElementById("tax")
  const shippingElement = document.getElementById("shipping")
  const serviceElement = document.getElementById("service")
  const totalElement = document.getElementById("total")

  if (!subtotalElement || !taxElement || !shippingElement || !serviceElement || !totalElement) return

  // Calcular subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calcular impuesto (13%)
  const tax = subtotal * 0.13

  // Calcular costo de envío (10%)
  const shipping = subtotal * 0.1

  // Calcular costo de servicio (10% del subtotal + envío)
  const service = (subtotal + shipping) * 0.1

  // Calcular total
  const total = subtotal + tax + shipping + service

  // Actualizar elementos
  subtotalElement.textContent = formatPrice(subtotal)
  taxElement.textContent = formatPrice(tax)
  shippingElement.textContent = formatPrice(shipping)
  serviceElement.textContent = formatPrice(service)
  totalElement.textContent = formatPrice(total)
}

// Función para configurar historial de pedidos
function setupOrderHistory(restaurantId) {
  const historyBtn = document.getElementById("history-btn")
  const modal = document.getElementById("order-history-modal")

  if (!historyBtn || !modal) return

  const closeBtn = modal.querySelector(".close-modal")

  // Abrir modal
  historyBtn.addEventListener("click", () => {
    loadOrderHistory(restaurantId)
    modal.classList.add("active")
  })

  // Cerrar modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active")
    })
  }

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })
}

// Función para cargar historial de pedidos
function loadOrderHistory(restaurantId) {
  const container = document.getElementById("order-history-list")
  if (!container) return

  const orders = getRestaurantOrders(restaurantId)

  // Limpiar contenedor
  container.innerHTML = ""

  if (orders.length === 0) {
    container.innerHTML = '<p class="no-orders-message">No hay pedidos realizados</p>'
    return
  }

  // Crear elementos para cada pedido
  orders.forEach((order, index) => {
    const orderElement = document.createElement("div")
    orderElement.className = "order-history-item"

    const orderDate = new Date(order.date)
    const formattedDate = orderDate.toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    orderElement.innerHTML = `
      <div class="order-history-header" onclick="toggleOrderDetails(${index})">
        <h4>Pedido del ${formattedDate}</h4>
        <button type="button" class="toggle-btn">
          <i class="fas fa-chevron-down" id="toggle-icon-${index}"></i>
        </button>
      </div>
      <div class="order-history-details" id="order-details-${index}">
        <div class="order-history-summary">
          <p>Subtotal: <span>${formatPrice(order.subtotal)}</span></p>
          <p>Impuesto (13%): <span>${formatPrice(order.tax)}</span></p>
          <p>Costo de envío (10%): <span>${formatPrice(order.shipping)}</span></p>
          <p>Costo de servicio (10%): <span>${formatPrice(order.service)}</span></p>
          <p>Total: <span>${formatPrice(order.total)}</span></p>
        </div>
        <div class="order-history-items">
          <h5>Elementos del pedido:</h5>
          <div id="order-items-${index}"></div>
        </div>
      </div>
    `

    container.appendChild(orderElement)

    // Agregar elementos del pedido
    const itemsContainer = document.getElementById(`order-items-${index}`)
    if (itemsContainer && order.items) {
      order.items.forEach((item) => {
        const itemElement = document.createElement("div")
        itemElement.className = "order-history-item-entry"

        const imageUrl = item.image || "https://via.placeholder.com/300x200?text=Comida"

        itemElement.innerHTML = `
          <img src="${imageUrl}" alt="${item.name}">
          <p>${item.name} x${item.quantity}</p>
          <span>${formatPrice(item.price * item.quantity)}</span>
        `

        itemsContainer.appendChild(itemElement)
      })
    }
  })
}

// Función para alternar detalles del pedido
function toggleOrderDetails(index) {
  const detailsElement = document.getElementById(`order-details-${index}`)
  const iconElement = document.getElementById(`toggle-icon-${index}`)

  if (!detailsElement || !iconElement) return

  detailsElement.classList.toggle("active")

  if (detailsElement.classList.contains("active")) {
    iconElement.classList.remove("fa-chevron-down")
    iconElement.classList.add("fa-chevron-up")
  } else {
    iconElement.classList.remove("fa-chevron-up")
    iconElement.classList.add("fa-chevron-down")
  }
}

// Función para configurar modal de confirmación de pedido
function setupOrderConfirmationModal(restaurantId) {
  const orderBtn = document.getElementById("order-btn")
  const modal = document.getElementById("order-confirmation-modal")

  if (!orderBtn || !modal) return

  const successBtn = document.getElementById("close-success-btn")
  const retryBtn = document.getElementById("retry-order-btn")

  // Configurar botón de pedido
  orderBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      showOrderConfirmation(restaurantId)
    }
  })

  // Cerrar modal después del éxito
  if (successBtn) {
    successBtn.addEventListener("click", () => {
      modal.classList.remove("active")
      // Limpiar carrito
      cart = []
      updateCartDisplay()
    })
  }

  // Reintentar pedido
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      // Ocultar mensajes
      const errorElement = document.getElementById("order-error")
      const processingElement = document.getElementById("order-processing")

      if (errorElement) errorElement.classList.add("hidden")
      if (processingElement) processingElement.classList.remove("hidden")

      // Reintentar
      processOrder(restaurantId)
    })
  }
}

// Función para mostrar confirmación de pedido
function showOrderConfirmation(restaurantId) {
  const modal = document.getElementById("order-confirmation-modal")
  if (!modal) return

  // Mostrar modal
  modal.classList.add("active")

  // Ocultar mensajes anteriores
  const successElement = document.getElementById("order-success")
  const errorElement = document.getElementById("order-error")
  const processingElement = document.getElementById("order-processing")

  if (successElement) successElement.classList.add("hidden")
  if (errorElement) errorElement.classList.add("hidden")
  if (processingElement) processingElement.classList.remove("hidden")

  // Procesar pedido
  processOrder(restaurantId)
}

// Función para procesar pedido
function processOrder(restaurantId) {
  // Calcular valores
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.13
  const shipping = subtotal * 0.1
  const service = (subtotal + shipping) * 0.1
  const total = subtotal + tax + shipping + service

  // Crear objeto de pedido
  const order = {
    items: [...cart],
    subtotal,
    tax,
    shipping,
    service,
    total,
  }

  // Simular proceso de pedido
  setTimeout(() => {
    try {
      // Probabilidad de éxito (90%)
      if (Math.random() < 0.9) {
        // Guardar pedido
        addOrder(restaurantId, order)

        // Mostrar éxito
        const processingElement = document.getElementById("order-processing")
        const successElement = document.getElementById("order-success")

        if (processingElement) processingElement.classList.add("hidden")
        if (successElement) successElement.classList.remove("hidden")
      } else {
        // Mostrar error
        throw new Error("Error simulado")
      }
    } catch (error) {
      console.error("Error al procesar pedido:", error)

      // Mostrar error
      const processingElement = document.getElementById("order-processing")
      const errorElement = document.getElementById("order-error")

      if (processingElement) processingElement.classList.add("hidden")
      if (errorElement) errorElement.classList.remove("hidden")
    }
  }, 2000)
}

// ===== FUNCIONES DE FORMULARIO =====

// Función para mostrar error
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.style.display = "block"
  }
}

// Función para ocultar error
function hideError(elementId) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.style.display = "none"
  }
}

// Función para configurar el formulario de restaurante
function setupRestaurantForm() {
  const form = document.getElementById("restaurant-form")
  if (!form) return

  const restaurantImage = document.getElementById("restaurant-image")
  const restaurantImagePreview = document.getElementById("restaurant-image-preview")
  const uploadButton = document.getElementById("upload-restaurant-image")
  const addFoodButton = document.getElementById("add-food-item")

  // Configurar carga de imagen
  if (uploadButton && restaurantImage) {
    uploadButton.addEventListener("click", () => {
      restaurantImage.click()
    })
  }

  // Mostrar vista previa de la imagen
  if (restaurantImage && restaurantImagePreview) {
    restaurantImage.addEventListener("change", async (e) => {
      const file = e.target.files[0]
      if (file) {
        // Validar tipo de archivo
        if (!file.type.match("image/jpeg")) {
          showError("restaurant-image-error", "Solo se permiten imágenes JPG/JPEG")
          restaurantImage.value = ""
          return
        }

        // Validar tamaño (5MB máximo)
        if (file.size > 5 * 1024 * 1024) {
          showError("restaurant-image-error", "La imagen no debe superar los 5MB")
          restaurantImage.value = ""
          return
        }

        try {
          const base64Image = await imageToBase64(file)
          restaurantImagePreview.innerHTML = `<img src="${base64Image}" alt="Vista previa">`
          hideError("restaurant-image-error")
        } catch (error) {
          showError("restaurant-image-error", "Error al cargar la imagen")
        }
      }
    })
  }

  // Agregar elemento de comida
  if (addFoodButton) {
    addFoodButton.addEventListener("click", () => {
      addFoodItemField()
    })
  }

  // Agregar un elemento de comida inicial
  addFoodItemField()

  // Manejar envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (validateRestaurantForm()) {
      await submitRestaurantForm()
    }
  })
}

// Función para validar formulario de restaurante
function validateRestaurantForm() {
  let isValid = true

  // Validar nombre del restaurante
  const restaurantName = document.getElementById("restaurant-name")
  if (restaurantName && !restaurantName.value.trim()) {
    showError("restaurant-name-error", "El nombre del restaurante es obligatorio")
    isValid = false
  } else if (restaurantName) {
    hideError("restaurant-name-error")
  }

  // Validar tipo de restaurante
  const restaurantType = document.getElementById("restaurant-type")
  if (restaurantType && restaurantType.value === "") {
    showError("restaurant-type-error", "Debe seleccionar un tipo de restaurante")
    isValid = false
  } else if (restaurantType) {
    hideError("restaurant-type-error")
  }

  // Validar elementos de comida
  const foodItems = document.querySelectorAll(".food-item")
  foodItems.forEach((item) => {
    const itemId = item.dataset.id

    // Validar nombre de comida
    const foodName = document.getElementById(`food-name-${itemId}`)
    if (foodName && !foodName.value.trim()) {
      showError(`food-name-error-${itemId}`, "El nombre de la comida es obligatorio")
      isValid = false
    } else if (foodName) {
      hideError(`food-name-error-${itemId}`)
    }

    // Validar precio de comida
    const foodPrice = document.getElementById(`food-price-${itemId}`)
    if (foodPrice && (!foodPrice.value || foodPrice.value <= 0)) {
      showError(`food-price-error-${itemId}`, "El precio debe ser mayor a 0")
      isValid = false
    } else if (foodPrice) {
      hideError(`food-price-error-${itemId}`)
    }
  })

  return isValid
}

// Función para enviar formulario de restaurante
async function submitRestaurantForm() {
  // Mostrar estado de envío
  const form = document.getElementById("restaurant-form")
  const submissionStatus = document.getElementById("submission-status")
  const submissionResult = document.getElementById("submission-result")

  if (!form || !submissionStatus || !submissionResult) return

  form.style.display = "none"
  submissionStatus.classList.remove("hidden")

  try {
    // Recopilar datos del restaurante
    const restaurantName = document.getElementById("restaurant-name").value
    const restaurantType = document.getElementById("restaurant-type").value

    // Procesar imagen del restaurante
    let restaurantImage = null
    const restaurantImageInput = document.getElementById("restaurant-image")
    if (restaurantImageInput && restaurantImageInput.files.length > 0) {
      restaurantImage = await imageToBase64(restaurantImageInput.files[0])
    }

    // Recopilar datos de comidas
    const foodItems = []
    const foodItemElements = document.querySelectorAll(".food-item")

    for (const item of foodItemElements) {
      const itemId = item.dataset.id

      // Procesar imagen de comida
      let foodImage = null
      const foodImageInput = document.getElementById(`food-image-${itemId}`)
      if (foodImageInput && foodImageInput.files.length > 0) {
        foodImage = await imageToBase64(foodImageInput.files[0])
      }

      const foodNameElement = document.getElementById(`food-name-${itemId}`)
      const foodPriceElement = document.getElementById(`food-price-${itemId}`)

      if (foodNameElement && foodPriceElement) {
        foodItems.push({
          name: foodNameElement.value,
          price: Number.parseFloat(foodPriceElement.value),
          image: foodImage,
        })
      }
    }

    // Crear objeto de restaurante
    const restaurant = {
      name: restaurantName,
      type: restaurantType,
      image: restaurantImage,
      foodItems: foodItems,
    }

    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Guardar restaurante
    addRestaurant(restaurant)

    // Mostrar resultado exitoso
    submissionStatus.classList.add("hidden")
    submissionResult.classList.remove("hidden")

    // Ocultar todos los mensajes primero
    const successElement = submissionResult.querySelector(".result-message.success")
    const errorElement = submissionResult.querySelector(".result-message.error")
    if (successElement) successElement.classList.add("hidden")
    if (errorElement) errorElement.classList.add("hidden")

    // Mostrar solo el mensaje de éxito
    if (successElement) successElement.classList.remove("hidden")
  } catch (error) {
    console.error("Error al crear restaurante:", error)

    // Mostrar resultado de error
    submissionStatus.classList.add("hidden")
    submissionResult.classList.remove("hidden")

    // Ocultar todos los mensajes primero
    const successElement = submissionResult.querySelector(".result-message.success")
    const errorElement = submissionResult.querySelector(".result-message.error")
    if (successElement) successElement.classList.add("hidden")
    if (errorElement) errorElement.classList.add("hidden")

    // Mostrar solo el mensaje de error
    if (errorElement) errorElement.classList.remove("hidden")
  }
}

// Función para agregar campo de comida
function addFoodItemField() {
  const container = document.getElementById("food-items-container")
  if (!container) return

  const foodItemId = Date.now() // ID único para este elemento

  const foodItemElement = document.createElement("div")
  foodItemElement.className = "food-item"
  foodItemElement.dataset.id = foodItemId

  foodItemElement.innerHTML = `
    <div class="food-item-header">
      <h4>Comida #${container.children.length + 1}</h4>
      <button type="button" class="remove-food-btn" onclick="removeFoodItem(${foodItemId})">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="food-item-content">
      <div class="form-group">
        <label for="food-name-${foodItemId}">Nombre *</label>
        <input type="text" id="food-name-${foodItemId}" maxlength="150" required>
        <span class="error-message" id="food-name-error-${foodItemId}"></span>
      </div>
      <div class="form-group">
        <label for="food-price-${foodItemId}">Precio *</label>
        <input type="number" id="food-price-${foodItemId}" min="1" required>
        <span class="error-message" id="food-price-error-${foodItemId}"></span>
      </div>
      <div class="form-group">
        <label for="food-image-${foodItemId}">Imagen (opcional, .jpg, máx. 2MB)</label>
        <div class="image-upload-container">
          <div class="image-preview" id="food-image-preview-${foodItemId}">
            <i class="fas fa-image"></i>
            <span>Vista previa</span>
          </div>
          <input type="file" id="food-image-${foodItemId}" accept=".jpg,.jpeg" class="file-input">
          <button type="button" class="upload-btn" onclick="document.getElementById('food-image-${foodItemId}').click()">
            Seleccionar Imagen
          </button>
        </div>
        <span class="error-message" id="food-image-error-${foodItemId}"></span>
      </div>
    </div>
  `

  container.appendChild(foodItemElement)

  // Configurar vista previa de imagen
  const foodImage = document.getElementById(`food-image-${foodItemId}`)
  const foodImagePreview = document.getElementById(`food-image-preview-${foodItemId}`)

  if (foodImage && foodImagePreview) {
    foodImage.addEventListener("change", async (e) => {
      const file = e.target.files[0]
      if (file) {
        // Validar tipo de archivo
        if (!file.type.match("image/jpeg")) {
          showError(`food-image-error-${foodItemId}`, "Solo se permiten imágenes JPG/JPEG")
          foodImage.value = ""
          return
        }

        // Validar tamaño (2MB máximo)
        if (file.size > 2 * 1024 * 1024) {
          showError(`food-image-error-${foodItemId}`, "La imagen no debe superar los 2MB")
          foodImage.value = ""
          return
        }

        try {
          const base64Image = await imageToBase64(file)
          foodImagePreview.innerHTML = `<img src="${base64Image}" alt="Vista previa">`
          hideError(`food-image-error-${foodItemId}`)
        } catch (error) {
          showError(`food-image-error-${foodItemId}`, "Error al cargar la imagen")
        }
      }
    })
  }
}

// Función para eliminar campo de comida
function removeFoodItem(id) {
  const container = document.getElementById("food-items-container")
  if (!container) return

  const item = document.querySelector(`.food-item[data-id="${id}"]`)

  if (item && container.children.length > 1) {
    container.removeChild(item)

    // Actualizar numeración
    const items = container.querySelectorAll(".food-item")
    items.forEach((item, index) => {
      const header = item.querySelector(".food-item-header h4")
      if (header) header.textContent = `Comida #${index + 1}`
    })
  } else if (container.children.length <= 1) {
    // Mostrar mensaje si se intenta eliminar el único elemento
    alert("Debe haber al menos un elemento de comida")
  }
}

// Función para resetear el formulario
function resetForm() {
  const form = document.getElementById("restaurant-form")
  const submissionResult = document.getElementById("submission-result")

  if (!form || !submissionResult) return

  form.reset()
  form.style.display = "block"
  submissionResult.classList.add("hidden")

  // Resetear vista previa de imagen
  const restaurantImagePreview = document.getElementById("restaurant-image-preview")
  if (restaurantImagePreview) {
    restaurantImagePreview.innerHTML = `
      <i class="fas fa-image"></i>
      <span>Vista previa</span>
    `
  }

  // Limpiar elementos de comida
  const foodItemsContainer = document.getElementById("food-items-container")
  if (foodItemsContainer) {
    foodItemsContainer.innerHTML = ""
  }

  // Agregar un elemento de comida inicial
  addFoodItemField()
}

// Función para agregar comida a un restaurante existente
function addFoodToRestaurant(restaurantId, foodItem) {
  const restaurants = getRestaurants()
  const restaurantIndex = restaurants.findIndex((r) => r.id === restaurantId)

  if (restaurantIndex === -1) {
    return false
  }

  // Asegurarse de que el restaurante tenga un array de comidas
  if (!restaurants[restaurantIndex].foodItems) {
    restaurants[restaurantIndex].foodItems = []
  }

  // Agregar la nueva comida
  restaurants[restaurantIndex].foodItems.push(foodItem)

  // Guardar los cambios
  localStorage.setItem("restaurants", JSON.stringify(restaurants))
  return true
}

// Función para configurar el modal de agregar comida
function setupAddFoodModal(restaurantId) {
  const addFoodBtn = document.getElementById("add-food-btn")
  const modal = document.getElementById("add-food-modal")
  const closeBtn = document.getElementById("close-food-modal")
  const form = document.getElementById("add-food-form")
  const foodImage = document.getElementById("new-food-image")
  const foodImagePreview = document.getElementById("new-food-image-preview")
  const uploadButton = document.getElementById("upload-food-image")
  const closeSuccessBtn = document.getElementById("close-food-success-btn")
  const retryBtn = document.getElementById("retry-food-btn")

  if (!addFoodBtn || !modal || !closeBtn || !form) return

  // Abrir modal
  addFoodBtn.addEventListener("click", () => {
    // Resetear el formulario
    form.reset()
    if (foodImagePreview) {
      foodImagePreview.innerHTML = `
        <i class="fas fa-image"></i>
        <span>Vista previa</span>
      `
    }

    // Mostrar formulario, ocultar mensajes
    form.style.display = "block"
    const statusElement = document.getElementById("food-submission-status")
    const resultElement = document.getElementById("food-submission-result")
    if (statusElement) statusElement.classList.add("hidden")
    if (resultElement) resultElement.classList.add("hidden")

    // Mostrar modal
    modal.classList.add("active")
  })

  // Cerrar modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active")
    })
  }

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })

  // Configurar carga de imagen
  if (uploadButton && foodImage) {
    uploadButton.addEventListener("click", () => {
      foodImage.click()
    })
  }

  // Mostrar vista previa de la imagen
  if (foodImage && foodImagePreview) {
    foodImage.addEventListener("change", async (e) => {
      const file = e.target.files[0]
      if (file) {
        // Validar tipo de archivo
        if (!file.type.match("image/jpeg")) {
          showError("new-food-image-error", "Solo se permiten imágenes JPG/JPEG")
          foodImage.value = ""
          return
        }

        // Validar tamaño (2MB máximo)
        if (file.size > 2 * 1024 * 1024) {
          showError("new-food-image-error", "La imagen no debe superar los 2MB")
          foodImage.value = ""
          return
        }

        try {
          const base64Image = await imageToBase64(file)
          foodImagePreview.innerHTML = `<img src="${base64Image}" alt="Vista previa">`
          hideError("new-food-image-error")
        } catch (error) {
          showError("new-food-image-error", "Error al cargar la imagen")
        }
      }
    })
  }

  // Manejar envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (validateAddFoodForm()) {
      await submitAddFoodForm(restaurantId)
    }
  })

  // Configurar botones de resultado
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener("click", () => {
      modal.classList.remove("active")
      // Recargar la página para mostrar la nueva comida
      window.location.reload()
    })
  }

  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      // Mostrar formulario, ocultar mensajes
      form.style.display = "block"
      const resultElement = document.getElementById("food-submission-result")
      if (resultElement) resultElement.classList.add("hidden")
    })
  }
}

// Función para validar el formulario de agregar comida
function validateAddFoodForm() {
  let isValid = true

  // Validar nombre de la comida
  const foodName = document.getElementById("new-food-name")
  if (foodName && !foodName.value.trim()) {
    showError("new-food-name-error", "El nombre de la comida es obligatorio")
    isValid = false
  } else if (foodName) {
    hideError("new-food-name-error")
  }

  // Validar precio de la comida
  const foodPrice = document.getElementById("new-food-price")
  if (foodPrice && (!foodPrice.value || foodPrice.value <= 0)) {
    showError("new-food-price-error", "El precio debe ser mayor a 0")
    isValid = false
  } else if (foodPrice) {
    hideError("new-food-price-error")
  }

  return isValid
}

// Función para enviar el formulario de agregar comida
async function submitAddFoodForm(restaurantId) {
  // Mostrar estado de envío
  const form = document.getElementById("add-food-form")
  const submissionStatus = document.getElementById("food-submission-status")
  const submissionResult = document.getElementById("food-submission-result")

  if (!form || !submissionStatus || !submissionResult) return

  form.style.display = "none"
  submissionStatus.classList.remove("hidden")

  try {
    // Recopilar datos de la comida
    const foodName = document.getElementById("new-food-name").value
    const foodPrice = Number.parseFloat(document.getElementById("new-food-price").value)

    // Procesar imagen de la comida
    let foodImage = null
    const foodImageInput = document.getElementById("new-food-image")
    if (foodImageInput && foodImageInput.files.length > 0) {
      foodImage = await imageToBase64(foodImageInput.files[0])
    }

    // Crear objeto de comida
    const foodItem = {
      name: foodName,
      price: foodPrice,
      image: foodImage,
    }

    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Guardar comida
    const success = addFoodToRestaurant(restaurantId, foodItem)

    // Mostrar resultado
    submissionStatus.classList.add("hidden")
    submissionResult.classList.remove("hidden")

    // Ocultar todos los mensajes primero
    const successElement = submissionResult.querySelector(".result-message.success")
    const errorElement = submissionResult.querySelector(".result-message.error")
    if (successElement) successElement.classList.add("hidden")
    if (errorElement) errorElement.classList.add("hidden")

    if (success) {
      // Mostrar mensaje de éxito
      if (successElement) successElement.classList.remove("hidden")
    } else {
      throw new Error("No se pudo agregar la comida")
    }
  } catch (error) {
    console.error("Error al agregar comida:", error)

    // Mostrar resultado de error
    submissionStatus.classList.add("hidden")
    submissionResult.classList.remove("hidden")

    // Ocultar todos los mensajes primero
    const successElement = submissionResult.querySelector(".result-message.success")
    const errorElement = submissionResult.querySelector(".result-message.error")
    if (successElement) successElement.classList.add("hidden")
    if (errorElement) errorElement.classList.remove("hidden")
  }
}

// Modificar la función loadRestaurantDetails para configurar el modal de agregar comida
/*function loadRestaurantDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = urlParams.get("id");

  if (restaurantId) {
    const restaurant = getRestaurantById(restaurantId);

    if (!restaurant) {
      alert("Restaurante no encontrado");
      window.location.href = "index.html";
      return;
    }

    // Actualizar información del restaurante
    document.title = `${restaurant.name} - FoodExpress`;

    const nameElement = document.getElementById("restaurant-name");
    if (nameElement) nameElement.textContent = restaurant.name;

    const typeElement = document.getElementById("restaurant-type");
    if (typeElement && typeElement.querySelector("span"))
      typeElement.querySelector("span").textContent = restaurant.type;

    const dateElement = document.getElementById("restaurant-date");
    if (dateElement && dateElement.querySelector("span"))
      dateElement.querySelector("span").textContent = formatDate(restaurant.createdAt);

    const ordersElement = document.getElementById("restaurant-orders");
    if (ordersElement && ordersElement.querySelector("span"))
      ordersElement.querySelector("span").textContent = restaurant.orderCount;

    // Actualizar imagen
    const imageElement = document.getElementById("restaurant-image");
    if (imageElement && restaurant.image) {
      imageElement.src = restaurant.image;
    }

    // Cargar elementos del menú
    loadFoodItems(restaurant);

    // Configurar botón de favoritos
    setupFavoriteButton(restaurantId);

    // Configurar historial de pedidos
    setupOrderHistory(restaurantId);

    // Configurar modal de confirmación de pedido
    setupOrderConfirmationModal(restaurantId);
    
    // Configurar modal de agregar comida
    setupAddFoodModal(restaurantId);
  } else {
    // Redirigir a la página principal si no hay ID
    window.location.href = "index.html";
  }
}*/

// ===== INICIALIZACIÓN =====

// Inicializar datos al cargar
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar datos
  console.log("Inicializando datos de ejemplo...")

  // Solo inicializar datos si no existen
  if (!localStorage.getItem("restaurants")) {
    initializeData()
  }

  // Detectar qué página estamos viendo
  const currentPath = window.location.pathname
  console.log("Página actual:", currentPath)

  if (currentPath.includes("index.html") || currentPath.endsWith("/") || currentPath === "") {
    // Página principal
    console.log("Cargando página principal...")

    // Renderizar filtros de categoría
    const filterContainer = document.getElementById("category-filters")
    if (filterContainer) {
      renderCategoryFilters(filterContainer)
    }

    loadAllRestaurants()
    loadFavoriteRestaurants()
    loadMostOrderedRestaurants()
    setupSearch()

    // Limpiar flag de actualización de favoritos
    localStorage.removeItem("favoritesUpdated")
  } else if (currentPath.includes("agregar_restaurante.html")) {
    // Página de agregar restaurante
    console.log("Cargando página de agregar restaurante...")
    setupRestaurantForm()
  } else if (currentPath.includes("resultados_busqueda.html")) {
    // Página de resultados de búsqueda
    console.log("Cargando página de resultados de búsqueda...")

    // Renderizar filtros de categoría
    const filterContainer = document.getElementById("search-category-filters")
    if (filterContainer) {
      renderCategoryFilters(filterContainer)

      // Configurar eventos para los filtros en la página de búsqueda
      filterContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("category-filter")) {
          const urlParams = new URLSearchParams(window.location.search)
          const query = urlParams.get("q") || ""

          // Obtener categorías activas
          const activeFilters = Array.from(filterContainer.querySelectorAll(".category-filter.active"))
            .map((btn) => btn.dataset.category)
            .filter((cat) => cat !== "all")

          // Realizar búsqueda con filtros
          performSearchQuery(query, activeFilters.length > 0 ? activeFilters : [])
        }
      })
    }

    loadSearchResults()
    setupSearch()
  } else if (currentPath.includes("detalle_restaurante.html")) {
    // Página de detalle de restaurante
    console.log("Cargando página de detalle de restaurante...")
    loadRestaurantDetails()
  } else {
    console.log("Página no reconocida, cargando funcionalidades básicas...")
    setupSearch()
  }
})
