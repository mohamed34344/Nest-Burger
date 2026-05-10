function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let count = 0;
  cart.forEach((item) => (count += item.qty));

  let el = document.getElementById("cartCount");
  if (el) {
    el.innerText = count;
  }
}

updateCartCount();
function goToCart() {
  window.location.href = "cart.html";
}
function addToCart(btn) {
  let card = btn.closest(".card");

  let name = card.querySelector("h3").innerText;
  let priceText = card.querySelector(".price").innerText;
  let price = parseFloat(priceText.replace("LE", ""));
  let img = card.querySelector("img").src;
  let desc = card.querySelector("p")?.innerText || "";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: 1,
      img: img,
      desc: desc,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount(); // مهم جداً
  alert("Added to cart ✅");
}
