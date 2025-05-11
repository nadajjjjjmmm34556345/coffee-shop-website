// إضافة/إزالة المنتجات من المفضلة
function toggleFavorite(icon) {
  let box = icon.parentElement.parentElement;
  let title = box.querySelector("h3").innerText;
  let price = box.querySelector("span").innerText;
  let img = box.querySelector("img").src;

  icon.classList.toggle("active");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (icon.classList.contains("active")) {
    let found = favorites.some(item => item.title === title);
    if (!found) {
      favorites.push({ title, price, img });
      alert("تمت إضافة المنتج للمفضلة: " + title);
    }
  } else {
    favorites = favorites.filter(item => item.title !== title);
    alert("تمت إزالة المنتج من المفضلة: " + title);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}


// إضافة إلى السلة (Add to cart functionality)
function addToCart(element) {
    const productCard = element.closest('.box');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('span').textContent;

    alert(`تم إضافة المنتج إلى السلة: ${productName} (${productPrice})`);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
}


// كتابة متحركة
function typeText() {
  const text = "Chill your day with the sweetest flavors!";
  let i = 0, el = document.getElementById("typing");
  (function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 80);
    }
  })();
}

window.onload = typeText;

// فلترة المنتجات
function filterProducts() {
  const val = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.box').forEach(box =>
    box.style.display = box.querySelector('h3').textContent.toLowerCase().includes(val) ? 'block' : 'none'
  );
}

// الوضع الليلي
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}