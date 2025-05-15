// Funciones para el carrito de compras

// Variables globales
const cart = []

// Importar o declarar funciones faltantes
// En un proyecto real, estos deberían importarse de sus respectivos módulos
function getRestaurantById(id) {
  // Implementación simulada
  console.warn("getRestaurantById is a placeholder. Implement the actual function.")
  return {
    foodItems: [
      { name: "Comida 1", price: 10, image: "img/placeholder-food.jpg" },
      { name: "Comida 2", price: 15, image: "img/placeholder-food.jpg" },
    ],
  }
}

function formatPrice(price) {
  // Implementación simulada
  return `$${price.toFixed(2)}`
}

function addOrder(restaurantId, order) {
  // Implementación simulada
  console.warn("addOrder is a placeholder. Implement the actual function.")
  console.log("Pedido agregado:", restaurantId, order)
}

document.addEventListener("DOMContentLoaded", () => {
  // Configurar botón de pedido
  const orderBtn = document.getElementById("order-btn")
  if (orderBtn) {
    orderBtn.addEventListener("click", () => {
      const urlParams = new URLSearchParams(window.location.search)
      const restaurantId = urlParams.get("id")

      if (restaurantId && cart.length > 0) {
        showOrderConfirmation(restaurantId)
      }
    })
  }
})

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
    quantity = Number.parseInt(document.getElementById(`quantity-${foodIndex}`).textContent)
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

      const imageUrl = item.image || "img/placeholder-food.jpg"
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
  document.getElementById("subtotal").textContent = formatPrice(subtotal)
  document.getElementById("tax").textContent = formatPrice(tax)
  document.getElementById("shipping").textContent = formatPrice(shipping)
  document.getElementById("service").textContent = formatPrice(service)
  document.getElementById("total").textContent = formatPrice(total)
}

// Función para mostrar confirmación de pedido
function showOrderConfirmation(restaurantId) {
  const modal = document.getElementById("order-confirmation-modal")

  // Mostrar modal
  modal.classList.add("active")

  // Ocultar mensajes anteriores
  document.getElementById("order-success").classList.add("hidden")
  document.getElementById("order-error").classList.add("hidden")
  document.getElementById("order-processing").classList.remove("hidden")

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
        document.getElementById("order-processing").classList.add("hidden")
        document.getElementById("order-success").classList.remove("hidden")
      } else {
        // Mostrar error
        throw new Error("Error simulado")
      }
    } catch (error) {
      console.error("Error al procesar pedido:", error)

      // Mostrar error
      document.getElementById("order-processing").classList.add("hidden")
      document.getElementById("order-error").classList.remove("hidden")
    }
  }, 2000)
}
