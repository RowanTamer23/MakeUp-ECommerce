function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1, image: "" });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  alert("Added to cart!");
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-badge");
  if (badge) badge.textContent = totalItems;
}

function ShopByCategory(category) {
  window.location.href = `products.html?category=${category}`;
}

function favoriteBadge() {
  const cart = JSON.parse(localStorage.getItem("favorites")) || [];
  const totalItems = cart.length;
  const badge = document.getElementById("fav-badge");
  if (badge) badge.textContent = totalItems;
}
favoriteBadge();
updateCartBadge();
