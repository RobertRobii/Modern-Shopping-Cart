"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.getElementsByClassName("buy-button");
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  const removeCartItemButtons =
    document.getElementsByClassName("cart-remove-button");
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    console.log(button);
    button.addEventListener("click", removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  document
    .getElementsByClassName("checkout-button")[0]
    .addEventListener("click", checkoutCLicked);

  updateCartFromLocalStorage();
  updateCartTotal();
});

function checkoutCLicked(event) {
  event.preventDefault();
  let cartItems = document.getElementsByClassName("items-left")[0];
  if (cartItems.childElementCount === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your shopping cart is empty!",
    });
    return;
  }
  let child = cartItems.lastElementChild;
  for (let i = cartItems.childElementCount - 1; i >= 0; i--) {
    cartItems.removeChild(child);
    child = cartItems.lastElementChild;
  }
  localStorage.removeItem("cart");
  updateCartTotal();
  Swal.fire("Awesome!", "Thank you for your purchase!", "success");
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  let cartItem = buttonClicked.closest(".cart");
  let title = cartItem.querySelector(".product-name").innerText;
  let imageSrc = cartItem.querySelector(".cart-product-image").src;
  let price = cartItem.querySelector(".cart-product-price").innerText;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let updatedCart = cart.filter((item) => {
    return (
      item.title !== title || item.imageSrc !== imageSrc || item.price !== price
    );
  });
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  cartItem.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("item-title")[0].innerText;
  let price = shopItem.getElementsByClassName("price")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("item-image")[0].src;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let newItem = { title: title, price: price, imageSrc: imageSrc };
  cart.push(newItem);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartTotal();
}

function updateCartFromLocalStorage() {
  const cartItems = document.querySelector(".items-left");
  if (cartItems) {
    cartItems.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((item) => {
      addItemToCart(item.title, item.price, item.imageSrc);
    });
    updateCartTotal();
  } else {
    console.error("Element not found: items-left");
  }
}

function addItemToCart(title, price, imageSrc) {
  let cartItems = document.getElementsByClassName("items-left")[0];
  let cartItemsNames = cartItems.getElementsByClassName("product-name");
  let cartItemsImages = cartItems.getElementsByClassName("cart-product-image");
  let cartItemsPrices = cartItems.getElementsByClassName("cart-product-price");

  for (let i = 0; i < cartItemsNames.length; i++) {
    if (
      cartItemsImages[i].src === imageSrc &&
      cartItemsPrices[i].innerText === price
    ) {
      alert("This item is already added to cart");
      return;
    }
  }

  let cartRow = document.createElement("div");
  cartRow.classList.add("cart");
  cartRow.innerHTML = `
    <div class="delivery">
      <p class="delivery-text">Delivery</p>
      <p class="delivery-date">19.10 - 21.10</p>
    </div>
    <div class="cart-product">
      <div class="cart-info">
        <img
          class="cart-product-image"
          src="${imageSrc}"
          alt=""
          width="100"
          height="100"
        />
        <div>
          <p class="cart-product-collection">New collection</p>
          <p class="product-name">${title}</p>
        </div>
      </div>
      <button class="cart-remove-button">Remove</button>
    </div>
    <div class="input-and-price-div">
      <p>
        quantity:
        <input class="cart-quantity-input" type="number" value="1" />
      </p>
      <p class="cart-product-price">${price}</p>
    </div>`;

  cartItems.appendChild(cartRow);
  cartRow
    .getElementsByClassName("cart-remove-button")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("items-left")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart");
  let subtotal = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-product-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace("Lei", ""));
    let quantity = quantityElement.value;
    subtotal += price * quantity;
  }
  subtotal = subtotal.toFixed(2);
  document.getElementsByClassName("subtotal")[0].innerText = subtotal + " Lei";
  document.getElementsByClassName("final-total")[0].innerText =
    (29.99 + +subtotal).toFixed(2) + " Lei";
}
