// Funciones para validación de formularios

// Declaración de funciones auxiliares (asumiendo que están en otro archivo o scope)
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  errorElement.textContent = message
  errorElement.style.display = "block"
}

function hideError(elementId) {
  const errorElement = document.getElementById(elementId)
  errorElement.style.display = "none"
}

async function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

// Assuming addRestaurant is defined elsewhere, possibly in another script
// For demonstration purposes, let's define it here.  In a real application,
// this would likely be imported or defined in a more appropriate location.
function addRestaurant(restaurant) {
  console.log("Restaurant added:", restaurant)
  // In a real application, this function would likely make an API call
  // to save the restaurant data to a server.
}

async function submitRestaurantForm() {
  // Mostrar estado de envío
  const form = document.getElementById("restaurant-form")
  const submissionStatus = document.getElementById("submission-status")
  const submissionResult = document.getElementById("submission-result")

  form.style.display = "none"
  submissionStatus.classList.remove("hidden")

  try {
    // Recopilar datos del restaurante
    const restaurantName = document.getElementById("restaurant-name").value
    const restaurantType = document.getElementById("restaurant-type").value

    // Procesar imagen del restaurante
    let restaurantImage = null
    const restaurantImageInput = document.getElementById("restaurant-image")
    if (restaurantImageInput.files.length > 0) {
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
      if (foodImageInput.files.length > 0) {
        foodImage = await imageToBase64(foodImageInput.files[0])
      }

      foodItems.push({
        name: document.getElementById(`food-name-${itemId}`).value,
        price: Number.parseFloat(document.getElementById(`food-price-${itemId}`).value),
        image: foodImage,
      })
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
    submissionResult.querySelector(".result-message.success").classList.remove("hidden")
  } catch (error) {
    console.error("Error al crear restaurante:", error)

    // Mostrar resultado de error
    submissionStatus.classList.add("hidden")
    submissionResult.classList.remove("hidden")
    submissionResult.querySelector(".result-message.error").classList.remove("hidden")
  }
}

function validateRestaurantForm() {
  let isValid = true

  // Validar nombre del restaurante
  const restaurantName = document.getElementById("restaurant-name")
  if (!restaurantName.value.trim()) {
    showError("restaurant-name-error", "El nombre del restaurante es obligatorio")
    isValid = false
  } else {
    hideError("restaurant-name-error")
  }

  // Validar tipo de restaurante
  const restaurantType = document.getElementById("restaurant-type")
  if (restaurantType.value === "") {
    showError("restaurant-type-error", "Debe seleccionar un tipo de restaurante")
    isValid = false
  } else {
    hideError("restaurant-type-error")
  }

  // Validar elementos de comida
  const foodItems = document.querySelectorAll(".food-item")
  foodItems.forEach((item) => {
    const itemId = item.dataset.id

    // Validar nombre de comida
    const foodName = document.getElementById(`food-name-${itemId}`)
    if (!foodName.value.trim()) {
      showError(`food-name-error-${itemId}`, "El nombre de la comida es obligatorio")
      isValid = false
    } else {
      hideError(`food-name-error-${itemId}`)
    }

    // Validar precio de comida
    const foodPrice = document.getElementById(`food-price-${itemId}`)
    if (!foodPrice.value || foodPrice.value <= 0) {
      showError(`food-price-error-${itemId}`, "El precio debe ser mayor a 0")
      isValid = false
    } else {
      hideError(`food-price-error-${itemId}`)
    }
  })

  return isValid
}

document.addEventListener("DOMContentLoaded", () => {
  // Configurar validación para el formulario de restaurante
  if (document.getElementById("restaurant-form")) {
    setupRestaurantForm()
  }
})

// Función para configurar el formulario de restaurante
function setupRestaurantForm() {
  const form = document.getElementById("restaurant-form")
  const restaurantImage = document.getElementById("restaurant-image")
  const restaurantImagePreview = document.getElementById("restaurant-image-preview")
  const uploadButton = document.getElementById("upload-restaurant-image")
  const addFoodButton = document.getElementById("add-food-item")

  // Configurar carga de imagen
  uploadButton.addEventListener("click", () => {
    restaurantImage.click()
  })

  // Mostrar vista previa de la imagen
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

  // Agregar elemento de comida
  addFoodButton.addEventListener("click", () => {
    addFoodItemField()
  })

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

// Función para agregar campo de comida
function addFoodItemField() {
  const container = document.getElementById("food-items-container")
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

// Función para eliminar campo de comida
function removeFoodItem(id) {
  const container = document.getElementById("food-items-container")
  const item = document.querySelector(`.food-item[data-id="${id}"]`)

  if (item && container.children.length > 1) {
    container.removeChild(item)

    // Actualizar numeración
    const items = container.querySelectorAll(".food-item")
    items.forEach((item, index) => {
      const header = item.querySelector(".food-item-header h4")
      header.textContent = `Comida #${index + 1}`
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

  form.reset()
  form.style.display = "block"
  submissionResult.classList.add("hidden")

  // Resetear vista previa de imagen
  const restaurantImagePreview = document.getElementById("restaurant-image-preview")
  restaurantImagePreview.innerHTML = `
        <i class="fas fa-image"></i>
        <span>Vista previa</span>
    `

  // Limpiar elementos de comida
  const foodItemsContainer = document.getElementById("food-items-container")
  foodItemsContainer.innerHTML = ""

  // Agregar un elemento de comida inicial
  addFoodItemField()
}
