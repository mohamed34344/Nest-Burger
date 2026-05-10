let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =========================
// RENDER CART
// =========================
function renderCart() {
  let container = document.getElementById("cartItems");
  container.innerHTML = "";

  let subtotal = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty 🛒</p>";
    return;
  }

  cart.forEach((item, index) => {
    let itemTotal = Number(item.price) * Number(item.qty);
    subtotal += itemTotal;

    container.innerHTML += `
      <div class="item">

        <img src="${item.img}">

        <div class="info">
          <h4>${item.name}</h4>
          <p>${item.desc || ""}</p>

        
          <span class="price">${item.price}</span>
        </div>

        <!-- التحكم في العدد -->
        <div class="qty">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <!-- الإجمالي -->
        <div>
          <h4>${itemTotal.toFixed(2)} LE</h4>
          <i class="fa fa-trash delete" onclick="removeItem(${index})"></i>
        </div>

      </div>
    `;
  });

  let delivery = cart.length > 0 ? 80 : 0;
  let total = subtotal + delivery;

  document.getElementById("deliveryFee").innerText = delivery + " LE";
  document.getElementById("subtotal").innerText = subtotal.toFixed(2) + " LE";
  document.getElementById("total").innerText = total.toFixed(2) + " LE";
}

// =========================
// CHANGE QTY
// =========================
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
}

// =========================
// REMOVE ITEM
// =========================
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

// =========================
// CLEAR CART
// =========================
function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  renderCart();
  updateCartCount();
}

// =========================
// CHECKOUT (تم إصلاحها)
// =========================
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty ❌");
    return;
  }

  // يروح لصفحة الشيك اوت
  window.location.href = "checkout.html";
}

// =========================
// SAVE CART
// =========================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// =========================
// UPDATE CART COUNT
// =========================
function updateCartCount() {
  let totalQty = 0;

  cart.forEach((item) => {
    totalQty += item.qty;
  });

  document.getElementById("cartCount").innerText = totalQty;
}

// =========================
// INIT
// =========================
renderCart();
updateCartCount();
