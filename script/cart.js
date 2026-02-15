const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const emptyState = document.getElementById("empty-state");
  const itemCount = document.getElementById("item-count");

  if (cart.length === 0) {
    cartItems.innerHTML = "";
    emptyState.classList.remove("hidden");
    itemCount.textContent = "(0 items)";
    updateSummary(0);
    return;
  }

  emptyState.classList.add("hidden");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  itemCount.textContent = `(${totalItems} item${totalItems !== 1 ? "s" : ""})`;

  cartItems.innerHTML = cart
    .map(
      (item, index) => `
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6">
                    <img src="${item.image || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop"}" alt="${item.name}" class="w-24 h-24 object-cover rounded-xl">
                    
                    <div class="flex-1">
                        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Product</p>
                        <h3 class="font-serif font-bold text-gray-900 mb-1">${item.name}</h3>
                        
                        <div class="flex items-center gap-4 mt-4">
                            <div class="flex items-center border border-gray-200 rounded-lg">
                                <button onclick="updateQuantity(${index}, -1)" class="px-3 py-1 hover:bg-gray-50 transition">
                                    <i class="fas fa-minus text-xs"></i>
                                </button>
                                <span class="px-3 py-1 font-medium">${item.quantity}</span>
                                <button onclick="updateQuantity(${index}, 1)" class="px-3 py-1 hover:bg-gray-50 transition">
                                    <i class="fas fa-plus text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-row sm:flex-col justify-between items-end sm:items-end">
                        <span class="text-glamour-pink font-bold text-xl">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button onclick="removeItem(${index})" class="text-gray-400 hover:text-red-500 transition mt-0 sm:mt-2">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `,
    )
    .join("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  updateSummary(subtotal);
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

function updateSummary(subtotal) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("shipping").textContent =
    shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;

  const freeShippingMsg = document.getElementById("free-shipping-msg");
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    freeShippingMsg.innerHTML =
      '<p class="text-sm text-green-600"><i class="fas fa-check-circle mr-1"></i> You qualify for free shipping!</p>';
  } else {
    const needed = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
    document.getElementById("amount-needed").textContent = needed;
  }
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-badge");
  if (badge) badge.textContent = totalItems;
}

function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order! This is a demo checkout.");
  localStorage.removeItem("cart");
  renderCart();
  updateCartBadge();
}

renderCart();
updateCartBadge();
