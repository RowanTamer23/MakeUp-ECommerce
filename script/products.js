// Load products (keeping your original synchronous method)
const productsReq = new XMLHttpRequest();
productsReq.open("GET", "products.json", false);
productsReq.send();
const products = JSON.parse(productsReq.responseText);

const params = new URLSearchParams(window.location.search);
const categoryFromUrl = params.get("category");

function renderProducts(category = "all") {
  const grid = document.getElementById("product-grid");

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  grid.innerHTML = filtered
    .map((product) => {
      const isFavorite = isInFavorites(product.name);

      return `
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition relative">
          <!-- Favorite Heart Button -->
          <button 
            onclick="toggleFavorite('${product.name}', ${product.price}, '${product.image}', '${product.category}')"
            class="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
            title="${isFavorite ? "Remove from Favorites" : "Add to Favorites"}"
          >
            <i class="${isFavorite ? "fas" : "far"} fa-heart text-xl ${isFavorite ? "text-glamour-pink" : "text-gray-400 hover:text-glamour-pink"} transition-colors"></i>
          </button>

          <div class="relative h-64 overflow-hidden">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="w-full h-full object-cover transition transform group-hover:scale-105"
            >
            ${
              product.badge
                ? `
              <span class="absolute top-3 left-3 px-3 py-1 bg-glamour-pink text-white text-xs font-semibold rounded-full">
                ${product.badge}
              </span>
            `
                : ""
            }
          </div>

          <div class="p-5">
            <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">${product.category}</p>
            <h3 class="font-serif font-bold text-gray-900 mb-2 line-clamp-2">${product.name}</h3>
            
            <div class="flex justify-between items-center">
              <span class="text-glamour-pink font-bold text-lg">$${product.price.toFixed(2)}</span>
              <button 
                onclick="addToCart('${product.name}', ${product.price}, '${product.image}')"
                class="px-4 py-2 bg-glamour-pink hover:bg-glamour-pink-dark text-white text-sm font-medium rounded-full transition flex items-center gap-2"
              >
                <i class="far fa-plus-square"></i> Add
              </button>
            </div>
          </div>
        </div>
      `;
    })
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

function isInFavorites(name) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.some((item) => item.name === name);
}

function toggleFavorite(name, price, image, category) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const existingIndex = favorites.findIndex((item) => item.name === name);

  if (existingIndex !== -1) {
    favorites.splice(existingIndex, 1);
  } else {
    favorites.push({ name, price, image, category });
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  renderProducts(
    document.querySelector(".filter-btn.bg-glamour-pink")?.dataset.category ||
      "all",
  );
  favoriteBadge();
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
  if (!btn) return;

  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Added';
  btn.classList.add("bg-glamour-pink-dark");
  btn.classList.remove("bg-glamour-pink");

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.classList.remove("bg-glamour-pink-dark");
    btn.classList.add("bg-glamour-pink");
  }, 1500);
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById("cart-badge");
  if (badge) badge.textContent = totalItems;
}

if (categoryFromUrl) {
  filterProducts(categoryFromUrl);
} else {
  renderProducts("all");
}

function favoriteBadge() {
  const cart = JSON.parse(localStorage.getItem("favorites")) || [];
  const totalItems = cart.length;
  const badge = document.getElementById("fav-badge");
  if (badge) badge.textContent = totalItems;
}

favoriteBadge();
updateCartBadge();
