products = new XMLHttpRequest();
products.open("GET", "products.json", false);
products.send();
products = JSON.parse(products.responseText);

function renderProducts(category = "all") {
  const grid = document.getElementById("product-grid");
  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  grid.innerHTML = filtered
    .map(
      (product) => `
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition">
                    <div class="relative h-64 overflow-hidden">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition transform group-hover:scale-105">
                        ${product.badge ? `<span class="absolute top-3 left-3 px-3 py-1 bg-glamour-pink text-white text-xs font-semibold rounded-full">${product.badge}</span>` : ""}
                    </div>
                    <div class="p-5">
                        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">${product.category}</p>
                        <h3 class="font-serif font-bold text-gray-900 mb-2">${product.name}</h3>
                        <div class="flex justify-between items-center">
                            <span class="text-glamour-pink font-bold text-lg">$${product.price.toFixed(2)}</span>
                            <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')" class="px-4 py-2 bg-glamour-pink hover:bg-glamour-pink-dark text-white text-sm font-medium rounded-full transition flex items-center gap-2">
                                <i class="far fa-plus-square"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            `,
    )
    .join("");
}

function filterProducts(category) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    if (btn.dataset.category === category) {
      btn.classList.remove("bg-gray-100", "text-gray-600");
      btn.classList.add("bg-glamour-pink", "text-white");
    } else {
      btn.classList.remove("bg-glamour-pink", "text-white");
      btn.classList.add("bg-gray-100", "text-gray-600");
    }
  });
  renderProducts(category);
}

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1, image });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();

  const btn = event.target.closest("button");
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Added';
  btn.classList.add("bg-green-500");
  btn.classList.remove("bg-glamour-pink");
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.classList.remove("bg-green-500");
    btn.classList.add("bg-glamour-pink");
  }, 1500);
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-badge").textContent = totalItems;
}

renderProducts();
updateCartBadge();
