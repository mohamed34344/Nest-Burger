let selectedMethod = "";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* PAYMENT SELECT */
function selectMethod(method) {
  selectedMethod = method;

  document.querySelectorAll(".method-card").forEach((card) => {
    card.classList.remove("active");
  });

  let selected = document
    .querySelector(`input[value="${method}"]`)
    .closest(".method-card");
  selected.classList.add("active");
}

/* RENDER ORDER */
function renderOrder() {
  let container = document.getElementById("summaryItems");
  container.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item) => {
    let total = item.price * item.qty;
    subtotal += total;

    container.innerHTML += `
      <div class="order-item">

        <div style="display:flex; align-items:center; gap:10px;">
          
          <img src="${item.img}" 
               style="width:50px; height:50px; border-radius:8px; object-fit:cover;" />

          <div>
            <div>${item.name}</div>
            <small>Qty: ${item.qty}</small>
          </div>

        </div>

        <span>${total} LE</span>

      </div>
    `;
  });

  let delivery = subtotal > 0 ? 80 : 0;
  let final = subtotal + delivery;

  document.getElementById("subtotal").innerText = subtotal;
  document.getElementById("delivery").innerText = delivery;
  document.getElementById("total").innerText = final;
}

/* SUBMIT ORDER */
document
  .getElementById("checkoutForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (!selectedMethod) {
      alert("اختار طريقة الدفع ❌");
      return;
    }

    alert("Order placed using: " + selectedMethod);

    localStorage.removeItem("cart");

    window.location.href = "index.html";
  });

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let count = 0;
  cart.forEach((item) => (count += item.qty));

  let el = document.getElementById("cartCount");
  if (el) {
    el.innerText = count;
  }
}
function goToCart() {
  window.location.href = "cart.html";
}
updateCartCount();
renderOrder();
