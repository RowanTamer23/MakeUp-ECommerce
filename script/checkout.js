const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderOrderSummary() {
  const container = document.getElementById("order-items");
  if (!container) return;

  container.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    container.innerHTML =
      '<p class="text-center text-gray-500 py-8">Your cart is empty.</p>';
    return;
  }

  cart.forEach((item) => {
    const qty = item.quantity || 1;
    const itemTotal = item.price * qty;
    subtotal += itemTotal;

    container.innerHTML += `
          <div class="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
            <img 
              src="${item.image || "https://images.unsplash.com/photo-1625772299848-361b803ffa25?w=80&h=80&fit=crop"}" 
              alt="${item.name}" 
              class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            >
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-gray-900 truncate">${item.name}</h4>
              <p class="text-sm text-gray-600 mt-1">Qty: ${qty}</p>
              <p class="text-glamour-pink font-medium mt-1">$${itemTotal.toFixed(2)}</p>
            </div>
          </div>
        `;
  });

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("shipping").textContent =
    shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;

  // Free shipping message
  const msgEl = document.getElementById("free-shipping-msg");
  const amountEl = document.getElementById("amount-needed");
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    msgEl.innerHTML =
      '<p class="text-green-600 font-medium"><i class="fas fa-check-circle mr-1"></i> Free shipping unlocked! 🎀</p>';
  } else {
    const needed = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
    amountEl.textContent = needed;
    msgEl.innerHTML = `Add <strong>$${needed}</strong> more for free shipping!`;
  }
}

// Payment method toggle
document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    document
      .getElementById("card-fields")
      .classList.toggle("hidden", e.target.value !== "card");
  });
});

// Place order
document.getElementById("place-order").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderBtn = document.getElementById("place-order");
  const btnText = document.getElementById("place-order-text");

  orderBtn.disabled = true;
  btnText.textContent = "Processing...";
  orderBtn.classList.add("bg-glamour-pink-dark");

  setTimeout(() => {
    alert(
      "Thank you for your order! Glamour team will prepare your beauty essentials ♡",
    );
    localStorage.removeItem("cart");
    cart = [];
    renderOrderSummary();
    updateCartBadge();
    updateFavoriteBadge();
    window.location.href = "index.html";
  }, 1200);
});

function updateCartBadge() {
  const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = currentCart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";
  }
}

function updateFavoriteBadge() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const badge = document.getElementById("fav-badge");
  if (badge) {
    badge.textContent = favorites.length;
    badge.style.display = favorites.length > 0 ? "flex" : "none";
  }
}

renderOrderSummary();
updateCartBadge();
updateFavoriteBadge();
