// Archivo principal para inicializar la aplicación y cargar datos de ejemplo

// Declarar las variables que faltan
let initializeData
let getRestaurants
let addRestaurant
let toggleFavorite
let addOrder

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar datos
  initializeData = () => {
    console.log("Inicializando datos...")
    // Aquí iría la lógica real de inicialización, por ahora un placeholder
  }

  getRestaurants = () => {
    console.log("Obteniendo restaurantes...")
    // Aquí iría la lógica real para obtener los restaurantes, por ahora un placeholder
    return [] // Devuelve un array vacío para simular que no hay restaurantes al inicio
  }

  addRestaurant = (restaurant) => {
    console.log("Agregando restaurante:", restaurant.name)
    // Aquí iría la lógica real para agregar un restaurante, por ahora un placeholder
    restaurant.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) // Simula la creación de un ID
    return restaurant
  }

  toggleFavorite = (restaurantId) => {
    console.log("Cambiando favorito para restaurante con ID:", restaurantId)
    // Aquí iría la lógica real para cambiar el estado de favorito, por ahora un placeholder
  }

  addOrder = (restaurantId, order) => {
    console.log("Agregando orden para restaurante con ID:", restaurantId, "Orden:", order)
    // Aquí iría la lógica real para agregar una orden, por ahora un placeholder
  }

  initializeData()

  // Cargar datos de ejemplo si no hay restaurantes
  const restaurants = getRestaurants()
  if (restaurants.length === 0) {
    loadSampleData()
  }
})

// Función para cargar datos de ejemplo
function loadSampleData() {
  console.log("Cargando datos de ejemplo...")

  // Restaurante 1: Pizzería Napoli
  const pizzeria = {
    name: "Pizzería Napoli",
    type: "Comida Italiana",
    image: "img/placeholder-restaurant.jpg",
    foodItems: [
      {
        name: "Pizza Margarita",
        price: 8500,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Pizza Pepperoni",
        price: 9500,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Pizza Vegetariana",
        price: 9000,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Lasaña de Carne",
        price: 7500,
        image: "img/placeholder-food.jpg",
      },
    ],
  }

  // Restaurante 2: Burger House
  const burgerHouse = {
    name: "Burger House",
    type: "Comida Rápida",
    image: "img/placeholder-restaurant.jpg",
    foodItems: [
      {
        name: "Hamburguesa Clásica",
        price: 5500,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Hamburguesa con Queso",
        price: 6000,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Hamburguesa Doble",
        price: 7500,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Papas Fritas",
        price: 2500,
        image: "img/placeholder-food.jpg",
      },
    ],
  }

  // Restaurante 3: Sushi Zen
  const sushiZen = {
    name: "Sushi Zen",
    type: "Comida Japonesa",
    image: "img/placeholder-restaurant.jpg",
    foodItems: [
      {
        name: "Roll California",
        price: 6500,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Nigiri Salmón",
        price: 5500,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Tempura Mixta",
        price: 7000,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Ramen",
        price: 6000,
        image: "img/placeholder-food.jpg",
      },
    ],
  }

  // Restaurante 4: Taquería El Mariachi
  const taqueria = {
    name: "Taquería El Mariachi",
    type: "Comida Mexicana",
    image: "img/placeholder-restaurant.jpg",
    foodItems: [
      {
        name: "Tacos al Pastor (3)",
        price: 4500,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Quesadilla",
        price: 3500,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Burrito de Carne",
        price: 5500,
        image: "img/placeholder-food.jpg",
      },
      {
        name: "Nachos con Guacamole",
        price: 4000,
        image: "img/placeholder-food.jpg",
      },
    ],
  }

  // Agregar restaurantes
  const restaurant1 = addRestaurant(pizzeria)
  const restaurant2 = addRestaurant(burgerHouse)
  const restaurant3 = addRestaurant(sushiZen)
  const restaurant4 = addRestaurant(taqueria)

  // Agregar algunos a favoritos
  toggleFavorite(restaurant1.id)
  toggleFavorite(restaurant3.id)

  // Simular algunos pedidos
  const order1 = {
    items: [
      {
        name: "Pizza Margarita",
        price: 8500,
        image: "img/placeholder-food.jpg",
        quantity: 2,
      },
      {
        name: "Lasaña de Carne",
        price: 7500,
        image: "img/placeholder-food.jpg",
        quantity: 1,
      },
    ],
    subtotal: 24500,
    tax: 24500 * 0.13,
    shipping: 24500 * 0.1,
    service: 24500 * 0.1 * 1.1,
    total: 24500 * 1.33 + 24500 * 0.1 * 1.1,
  }

  const order2 = {
    items: [
      {
        name: "Hamburguesa Doble",
        price: 7500,
        image: "img/placeholder-food.jpg",
        quantity: 1,
      },
      {
        name: "Papas Fritas",
        price: 2500,
        image: "img/placeholder-food.jpg",
        quantity: 2,
      },
    ],
    subtotal: 12500,
    tax: 12500 * 0.13,
    shipping: 12500 * 0.1,
    service: 12500 * 0.1 * 1.1,
    total: 12500 * 1.33 + 12500 * 0.1 * 1.1,
  }

  // Agregar pedidos
  addOrder(restaurant1.id, order1)
  addOrder(restaurant1.id, order1) // Agregar dos veces para incrementar contador
  addOrder(restaurant2.id, order2)

  console.log("Datos de ejemplo cargados correctamente")
}
