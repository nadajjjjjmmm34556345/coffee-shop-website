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
}

// دالة لإضافة المنتج للسلة مع اختيار الحجم
function addToCart(el) {
  const box = el.closest(".box"); // تحديد العنصر الأقرب للزر
  const title = box.querySelector("h3").textContent; // عنوان المنتج
  const price = box.querySelector(".content span").textContent; // سعر المنتج
  const img = box.querySelector("img").src; // مصدر صورة المنتج

  // إنشاء نافذة منبثقة لاختيار الحجم
  const sizeSelection = document.createElement('div');
  sizeSelection.classList.add('size-selection-popup');
  sizeSelection.innerHTML = `
    <div class="size-popup-content">
      <h3>اختر الحجم لـ ${title}</h3>
      <button class="size-btn" data-size="Small">Small</button>
      <button class="size-btn" data-size="Medium">Medium</button>
      <button class="size-btn" data-size="Large">Large</button>
      <button class="close-btn">إلغاء</button>
    </div>
  `;
  document.body.appendChild(sizeSelection);

  // إغلاق النافذة عند الضغط على "إلغاء"
  sizeSelection.querySelector('.close-btn').addEventListener('click', () => {
    sizeSelection.remove();
  });

  // عند اختيار حجم، يتم إضافة المنتج للسلة
  const sizeButtons = sizeSelection.querySelectorAll('.size-btn');
  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedSize = button.getAttribute('data-size');

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const item = { title, price, size: selectedSize, img }; // هنا قمت بإضافة الصورة في الكائن

      // تحقق إذا كان المنتج موجودًا بالفعل في السلة
      if (!cart.some(cartItem => cartItem.title === title && cartItem.size === selectedSize)) {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`تمت إضافة ${title} (${selectedSize}) إلى السلة بسعر ${price}`);
      } else {
        alert(`${title} (${selectedSize}) موجود بالفعل في السلة`);
      }

      sizeSelection.remove(); // إغلاق النافذة بعد الإضافة
    });
  });
}
// CSS للنافذة المنبثقة (يُضاف تلقائيًا في <head>)
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
    z-index: 9999;
  }
  .size-popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    max-width: 300px;
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
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
`;
document.head.appendChild(style);

// دوال تغيير عرض المنتجات
function setGridView(sectionId) {
  const container = document.querySelector(`#${sectionId} .products-container`);
  container.classList.add('grid-view');
  container.classList.remove('list-view');
}

function setListView(sectionId) {
  const container = document.querySelector(`#${sectionId} .products-container`);
  container.classList.add('list-view');
  container.classList.remove('grid-view');
}




function changePage(pageNumber) {
  const itemsPerPage =7;
  const products = document.querySelectorAll('.products-container .box');

  products.forEach((product, index) => {
    const start = (pageNumber - 1) * itemsPerPage;
    const end = pageNumber * itemsPerPage;
    if (index >= start && index < end) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// اجعل الصفحة الأولى تظهر أولاً عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  changePage(1);
});

// استمع لحدث الضغط على زر تبديل الثيم
document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.getElementById("toggle-theme");

  themeToggleBtn.addEventListener("click", function () {
    // التبديل بين الثيمات عند الضغط على الزر
    document.body.classList.toggle("dark-theme");

    // حفظ الحالة في localStorage
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("darkTheme", isDark);
  });

  // عند تحميل الصفحة، تطبيق الثيم المحفوظ من localStorage
  const savedTheme = localStorage.getItem("darkTheme");
  if (savedTheme === "true") {
    document.body.classList.add("dark-theme");
  }
});


// إخفاء المنتجات
document.getElementById('hideProducts').addEventListener('click', function () {
  document.querySelector('.products-container').style.display = 'none';
});
// إظهار المنتجات
document.getElementById('showProducts').addEventListener('click', function () {
  document.querySelector('.products-container').style.display = 'flex'; // أو grid لو في وضع grid
});
// إضافة منتج جديد
document.getElementById('addProduct').addEventListener('click', function () {
  const newBox = document.createElement('div');
  newBox.className = 'box';
  newBox.innerHTML = `
    <img src="coffee.jpg" alt="منتج جديد">
    <h3>منتج جديد</h3>
    <div class="content">
      <span>20$</span>
      <span class="favorite-icon">&#9829;</span>
    </div>
  `;
  document.querySelector('.products-container').appendChild(newBox);
});


