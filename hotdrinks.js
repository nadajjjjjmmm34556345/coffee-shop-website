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
const addToCartButtons = document.querySelectorAll('.content a');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // منع التصرف الافتراضي للرابط
        
        const productCard = this.closest('.box'); // العثور على أقرب بطاقة منتج
        const productName = productCard.querySelector('h3').textContent; // الحصول على اسم المنتج
        const productPrice = productCard.querySelector('span').textContent; // الحصول على سعر المنتج
        
        // تنبيه المستخدم عند إضافة المنتج للسلة
        alert(`تم إضافة المنتج إلى السلة: ${productName} (${productPrice})`);
        
        // إضافة المنتج إلى السلة في localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name: productName, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

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

// تغيير الصفحات
function changePage(pageNumber) {
  const itemsPerPage = 7;
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



