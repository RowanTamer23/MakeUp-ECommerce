let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function renderFavorites() {
  const container = document.getElementById("favorites-container");
  const empty = document.getElementById("empty-favorites");
  const count = document.getElementById("fav-count");

  container.innerHTML = "";
  count.textContent = `(${favorites.length} items)`;

  if (favorites.length === 0) {
    empty.classList.remove("hidden");
    container.classList.add("hidden");
    return;
  }

  empty.classList.add("hidden");
  container.classList.remove("hidden");

  favorites.forEach((product, idx) => {
    const card = `
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div class="relative">
              <img src="${product.image || "https://via.placeholder.com/400"}" alt="${product.name}" class="w-full h-64 object-cover">
              <button data-remove="${idx}" class="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:text-glamour-pink transition">
                <i class="fas fa-heart text-glamour-pink"></i>
              </button>
            </div>
            <div class="p-5">
              <h3 class="font-serif font-semibold text-gray-900 mb-1 line-clamp-2">${product.name}</h3>
              <p class="text-glamour-pink font-bold text-lg mb-4">$${product.price.toFixed(2)}</p>
              <div class="flex gap-3">
                <button data-add-cart="${idx}" class="flex-1 bg-glamour-pink hover:bg-glamour-pink-dark text-white py-3 rounded-xl transition font-medium">
                  Add to Cart
                </button>
                <button data-remove="${idx}" class="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                  <i class="fas fa-trash-alt text-gray-500"></i>
                </button>
              </div>
            </div>
          </div>
        `;
    container.innerHTML += card;
  });
}

function favoriteBadge() {
  const cart = JSON.parse(localStorage.getItem("favorites")) || [];
  const totalItems = cart.length;
  const badge = document.getElementById("fav-badge");
  if (badge) badge.textContent = totalItems;
}
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById("cart-badge");
  if (badge) badge.textContent = totalItems;
}

document.addEventListener("click", (e) => {
  const removeBtn = e.target.closest("[data-remove]");
  if (removeBtn) {
    const idx = parseInt(removeBtn.dataset.remove);
    favorites.splice(idx, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
    favoriteBadge();
  }

  const addBtn = e.target.closest("[data-add-cart]");
  if (addBtn) {
    const idx = parseInt(addBtn.dataset.addCart);
    const prod = favorites[idx];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((p) => p.id === prod.id);
    if (exists) {
      exists.quantity = (exists.quantity || 1) + 1;
      renderFavorites();
      favoriteBadge();
    } else {
      cart.push({ ...prod, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${prod.name} added to cart!`);
    renderFavorites();
    favoriteBadge();
  }
});

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById("cart-badge");
  if (badge) badge.textContent = totalItems;
}

updateCartBadge();
favoriteBadge();
renderFavorites();
