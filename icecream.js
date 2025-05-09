// مفضلة المنتجات
function toggleFavorite(icon) {
  const title = icon.closest(".box").querySelector("h3").textContent;
  const price = icon.closest(".box").querySelector(".content span").textContent;
  const img = icon.closest(".box").querySelector("img").src;

  icon.classList.toggle("active");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (icon.classList.contains("active")) {
    // تحقق من عدم وجوده مسبقًا
    if (!favorites.some(item => item.title === title)) {
      favorites.push({ title, price, img });
      alert(`Added to favorites: ${title}`);
    }
  } else {
    favorites = favorites.filter(item => item.title !== title);
    alert(`Removed from favorites: ${title}`);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}
// إضافة للسلة
// إضافة للسلة مع اختيار الحجم
// إضافة للسلة مع اختيار الحجم
function addToCart(el) {
  const box = el.closest(".box");
  const title = box.querySelector("h3").textContent;
  const price = box.querySelector(".content span").textContent;

  // إنشاء نافذة منبثقة لاختيار الحجم
  const sizeSelection = document.createElement('div');
  sizeSelection.classList.add('size-selection-popup');
  sizeSelection.innerHTML = `
    <div class="size-popup-content">
      <h3>Select Size for ${title}</h3>
      <button class="size-btn" data-size="small">Small</button>
      <button class="size-btn" data-size="medium">Medium</button>
      <button class="size-btn" data-size="large">Large</button>
      <button class="close-btn">Cancel</button>
    </div>
  `;
  document.body.appendChild(sizeSelection);

  // إغلاق النافذة
  sizeSelection.querySelector('.close-btn').addEventListener('click', () => {
    sizeSelection.remove();
  });

  // إضافة الحجم إلى السلة
  const sizeButtons = sizeSelection.querySelectorAll('.size-btn');
  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedSize = button.getAttribute('data-size');

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const item = { title, price, size: selectedSize };

      // تحقق إذا كان المنتج موجودًا في السلة
      if (!cart.some(cartItem => cartItem.title === title && cartItem.size === selectedSize)) {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`Added to cart: ${title} (${selectedSize}) for ${price}`);
      } else {
        alert(`${title} (${selectedSize}) is already in your cart.`);
      }

      // إغلاق النافذة بعد اختيار الحجم
      sizeSelection.remove();
    });
  });
}

// CSS لنمط النافذة المنبثقة
const style = document.createElement('style');
style.innerHTML = `
  .size-selection-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .size-popup-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  .size-btn {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  .close-btn {
    margin-top: 15px;
    background: red;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
`;
document.head.appendChild(style);

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
