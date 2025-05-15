// Funciones para manejar datos en localStorage

// Función para inicializar datos si no existen
function initializeData() {
  if (!localStorage.getItem("restaurants")) {
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
  }

  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", JSON.stringify(["rest2"]))
  }

  if (!localStorage.getItem("orders")) {
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

// Inicializar datos al cargar
initializeData()
