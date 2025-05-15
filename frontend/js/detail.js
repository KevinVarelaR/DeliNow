// Importa las funciones necesarias desde otros archivos
import {
  getRestaurantById,
  formatDate,
  formatPrice,
  toggleFavorite,
  isFavorite,
  getRestaurantOrders,
  addToCart,
  processOrder,
  cart,
  updateCartDisplay,
} from "./utils.js"

// Funciones para la página de detalle de restaurante

document.addEventListener("DOMContentLoaded", () => {
  // Obtener ID del restaurante
  const urlParams = new URLSearchParams(window.location.search)
  const restaurantId = urlParams.get("id")

  if (restaurantId) {
    // Cargar detalles del restaurante
    loadRestaurantDetails(restaurantId)

    // Configurar botón de favoritos
    setupFavoriteButton(restaurantId)

    // Configurar historial de pedidos
    setupOrderHistory(restaurantId)

    // Configurar modal de confirmación de pedido
    setupOrderConfirmationModal(restaurantId)
  } else {
    // Redirigir a la página principal si no hay ID
    window.location.href = "index.html"
  }
})

// Función para cargar detalles del restaurante
function loadRestaurantDetails(restaurantId) {
  const restaurant = getRestaurantById(restaurantId)

  if (!restaurant) {
    alert("Restaurante no encontrado")
    window.location.href = "index.html"
    return
  }

  // Actualizar información del restaurante
  document.title = `${restaurant.name} - FoodExpress`
  document.getElementById("restaurant-name").textContent = restaurant.name
  document.getElementById("restaurant-type").querySelector("span").textContent = restaurant.type
  document.getElementById("restaurant-date").querySelector("span").textContent = formatDate(restaurant.createdAt)
  document.getElementById("restaurant-orders").querySelector("span").textContent = restaurant.orderCount

  // Actualizar imagen
  if (restaurant.image) {
    document.getElementById("restaurant-image").src = restaurant.image
  }

  // Cargar elementos del menú
  loadFoodItems(restaurant)
}

// Función para cargar elementos del menú
function loadFoodItems(restaurant) {
  const container = document.getElementById("food-items")

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

    const imageUrl = foodItem.image || "img/placeholder-food.jpg"

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

// Función para configurar botón de favoritos
function setupFavoriteButton(restaurantId) {
  const favoriteBtn = document.getElementById("favorite-btn")
  updateFavoriteButton(favoriteBtn, restaurantId)

  favoriteBtn.addEventListener("click", () => {
    const isNowFavorite = toggleFavorite(restaurantId)
    updateFavoriteButton(favoriteBtn, restaurantId, isNowFavorite)
  })
}

// Función para actualizar botón de favoritos
function updateFavoriteButton(button, restaurantId, forcedState = null) {
  const isFav = forcedState !== null ? forcedState : isFavorite(restaurantId)

  if (isFav) {
    button.innerHTML = '<i class="fas fa-heart"></i> Quitar de favoritos'
    button.classList.add("active")
  } else {
    button.innerHTML = '<i class="far fa-heart"></i> Agregar a favoritos'
    button.classList.remove("active")
  }
}

// Función para incrementar cantidad
function incrementQuantity(event, foodIndex) {
  event.stopPropagation()
  const quantityElement = document.getElementById(`quantity-${foodIndex}`)
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
  let quantity = Number.parseInt(quantityElement.textContent)

  if (quantity > 1) {
    quantity--
    quantityElement.textContent = quantity
  }
}

// Función para configurar arrastrar y soltar
function setupDragAndDrop(foodCard) {
  const cartDropArea = document.getElementById("cart-drop-area")

  // Eventos de arrastrar
  foodCard.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", foodCard.dataset.id)
    foodCard.classList.add("dragging")
  })

  foodCard.addEventListener("dragend", () => {
    foodCard.classList.remove("dragging")
    cartDropArea.classList.remove("active")
  })

  // Eventos del área de soltar
  cartDropArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    cartDropArea.classList.add("active")
  })

  cartDropArea.addEventListener("dragleave", () => {
    cartDropArea.classList.remove("active")
  })

  cartDropArea.addEventListener("drop", (e) => {
    e.preventDefault()
    const foodIndex = e.dataTransfer.getData("text/plain")
    const quantity = Number.parseInt(document.getElementById(`quantity-${foodIndex}`).textContent)

    addToCart(null, foodIndex, quantity)
    cartDropArea.classList.remove("active")
  })
}

// Función para configurar historial de pedidos
function setupOrderHistory(restaurantId) {
  const historyBtn = document.getElementById("history-btn")
  const modal = document.getElementById("order-history-modal")
  const closeBtn = modal.querySelector(".close-modal")

  // Abrir modal
  historyBtn.addEventListener("click", () => {
    loadOrderHistory(restaurantId)
    modal.classList.add("active")
  })

  // Cerrar modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active")
  })

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
    order.items.forEach((item) => {
      const itemElement = document.createElement("div")
      itemElement.className = "order-history-item-entry"

      const imageUrl = item.image || "img/placeholder-food.jpg"

      itemElement.innerHTML = `
                <img src="${imageUrl}" alt="${item.name}">
                <p>${item.name} x${item.quantity}</p>
                <span>${formatPrice(item.price * item.quantity)}</span>
            `

      itemsContainer.appendChild(itemElement)
    })
  })
}

// Función para alternar detalles del pedido
function toggleOrderDetails(index) {
  const detailsElement = document.getElementById(`order-details-${index}`)
  const iconElement = document.getElementById(`toggle-icon-${index}`)

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
  const modal = document.getElementById("order-confirmation-modal")
  const successBtn = document.getElementById("close-success-btn")
  const retryBtn = document.getElementById("retry-order-btn")

  // Cerrar modal después del éxito
  successBtn.addEventListener("click", () => {
    modal.classList.remove("active")
    // Limpiar carrito
    cart = []
    updateCartDisplay()
  })

  // Reintentar pedido
  retryBtn.addEventListener("click", () => {
    // Ocultar mensajes
    document.getElementById("order-error").classList.add("hidden")
    document.getElementById("order-processing").classList.remove("hidden")

    // Reintentar
    processOrder(restaurantId)
  })
}
