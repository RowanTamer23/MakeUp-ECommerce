var slider = [
  {
    url: "https://st5.depositphotos.com/1558912/61938/i/450/depositphotos_619384464-stock-photo-makeup-cosmetic-products-pink-background.jpg",
    align: "right",
  },
  {
    url: "https://t4.ftcdn.net/jpg/03/15/28/07/360_F_315280771_yPwTXeNSbjyqRUx7un2Z9pEMGzp3c3qQ.jpg",
    align: "left",
  },
  {
    url: "https://egyptianstreets.com/wp-content/uploads/2020/09/cosmetics-on-pink-table.jpg",
    align: "center",
  },
];

function showSlider() {
  const hero = document.getElementsByClassName("hero")[0];

  hero.className =
    "hero relative min-h-screen flex items-center transition-opacity duration-1000 ease-in-out";

  hero.innerHTML = `
    <div class="absolute inset-0 bg-black/40"></div>

    <div id="heroContent"
      class="relative z-10 w-full px-6 sm:px-10 lg:px-20 transition-all duration-700">
    </div>
  `;

  let currentIndex = 0;
  const content = document.getElementById("heroContent");

  function updateSlide() {
    const currentSlide = slider[currentIndex];

    // Background image
    hero.style.background = `
      linear-gradient(to right, rgba(0,0,0,0.45), rgba(0,0,0,0.2)),
      url(${currentSlide.url}) center/cover no-repeat
    `;

    // Alignment responsive
    let alignmentClass = "";

    if (currentSlide.align === "left") {
      alignmentClass = "text-center md:text-left md:max-w-2xl md:mr-auto";
    } else if (currentSlide.align === "right") {
      alignmentClass = "text-center md:text-right md:max-w-2xl md:ml-auto";
    } else {
      alignmentClass = "text-center md:max-w-2xl md:mx-auto";
    }

    content.className =
      "relative z-10 transition-all duration-700 p-20  " + alignmentClass;

    content.innerHTML = `
      <span class="inline-block px-4 py-2 bg-white/20 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6">
        New Collection 2026
      </span>

      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
        Discover Your <span class="text-pink-300">Natural Beauty</span>
      </h1>

      <p class="text-sm sm:text-base md:text-lg mb-8 text-gray-200 max-w-xl mx-auto md:mx-0">
        Premium makeup & skincare crafted with love. Enhance your glow with our curated essentials.
      </p>

      <a href="products.html"
        class="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-pink-500 hover:bg-pink-600 text-white text-sm sm:text-base font-semibold rounded-full transition transform hover:scale-105 duration-300 shadow-lg">
        Shop Now
      </a>
    `;
  }

  updateSlide();

  setInterval(() => {
    hero.style.opacity = "0";

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % slider.length;
      updateSlide();
      hero.style.opacity = "1";
    }, 500);
  }, 4000);
}

showSlider();

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
