// Maneja la apertura y cierre del carrito de compras
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Se asegura de que el código empiece una vez que el documento HTML ha sido completamente cargado
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// Inicia la función start
function start() {
  addEvents();
}

// Actualiza y vuelve a renderizar el carrito
function update() {
  addEvents();
  updateTotal();
}

// Agrega eventos a los elementos del carrito
function addEvents() {
  // Remueve elementos del carrito
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Cambia la cantidad de un artículo en el carrito
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Agrega un artículo al carrito
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Realiza la compra de los artículos en el carrito
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// Funciones para manejar eventos del carrito
let itemsAdded = [];

function handle_addCartItem() {
  // Añade un artículo al carrito
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // Maneja si el artículo ya existe en el carrito
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("¡Este artículo ya existe!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Agrega el producto al carrito
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  // Remueve un artículo del carrito
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

function handle_changeItemQuantity() {
  // Cambia la cantidad de un artículo en el carrito
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // Asegura que el valor sea un número entero

  update();
}

function handle_buyOrder() {
  // Realiza la compra de los artículos en el carrito
  if (itemsAdded.length <= 0) {
    alert("¡Aún no hay ningún pedido para realizar! Por favor, haga un pedido primero.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Su Compra a sido realizada con exito.");
  itemsAdded = [];

  update();
}

// Funciones para actualizar y volver a renderizar el carrito
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // Mantiene 2 dígitos después del punto decimal
  total = total.toFixed(2);
  // o también puedes usar
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "$" + total;
}

// Componente HTML para un artículo en el carrito
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

document.addEventListener("DOMContentLoaded", function () {
  // Se ejecuta cuando el documento HTML ha sido completamente cargado

  // Selecciona los botones de categoría y los productos de cada categoría
  const iphoneButton = document.querySelector('.iphone-button');
  const macButton = document.querySelector('.mac-button');
  const appleWatchButton = document.querySelector('.apple-watch-button');

  const iphoneProducts = document.querySelector('.iphone-products');
  const macProducts = document.querySelector('.mac-products');
  const appleWatchProducts = document.querySelector('.apple-watch-products');

  const shopContent = document.querySelector('.shop-content');

  // Función para ocultar todos los productos
  function hideAllProducts() {
    iphoneProducts.style.display = 'none';
    macProducts.style.display = 'none';
    appleWatchProducts.style.display = 'none';
  }

  // Función para mostrar productos de una categoría y ocultar los demás
  function showProducts(products) {
    hideAllProducts();
    shopContent.style.display = 'none'; // Oculta los productos de shop-content
    products.style.display = 'grid'; // Muestra los productos de la categoría seleccionada
  }

  // Event listeners para los botones de categoría
  iphoneButton.addEventListener('click', function () {
    showProducts(iphoneProducts);
  });

  macButton.addEventListener('click', function () {
    showProducts(macProducts);
  });

  appleWatchButton.addEventListener('click', function () {
    showProducts(appleWatchProducts);
  });
});


// Función para abrir un popup con información de producto
function openPopup(title, price, features ,imageSrc) {
  // Actualiza la información en el popup
  const popup = document.querySelector('.popup');
  popup.querySelector('.product-image').setAttribute('src', imageSrc);
  popup.querySelector('.product-title').textContent = title;
  popup.querySelector('.product-price').textContent = price;
  popup.querySelector('.product-features').textContent = features;

  // Muestra el popup
  popup.style.display = 'flex';
}

// Función para cerrar el popup al hacer clic en el botón de cerrar
var popup = document.getElementById('productPopup');
popup.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
};

// Abrir y cerrar menú lateral
$(document).ready(function () {
  $('.icon_menu').click(function () {
    $('.sidebar').toggleClass('active');
  });
});