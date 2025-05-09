
document.querySelectorAll('.favorite-icon').forEach(icon => {
    icon.addEventListener('click', () => {
         icon.classList.toggle('active'); // تبديل الحالة عند الضغط
     });
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
document.head.appendChild(style)// مفضلة المنتجات
function toggleFavorite(icon) {
  // استخراج بيانات المنتج من العنصر الأب
  const title = icon.closest(".box").querySelector("h3").textContent;
  const price = icon.closest(".box").querySelector(".content span").textContent;
  const img = icon.closest(".box").querySelector("img").src;

  // تغيير مظهر الأيقونة
  icon.classList.toggle("active");

  // جلب المفضلة من localStorage أو إنشاء مصفوفة جديدة
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (icon.classList.contains("active")) {
    // إضافة للمفضلة إذا غير موجود مسبقًا
    if (!favorites.some(item => item.title === title)) {
      favorites.push({ title, price, img });
      alert(`Added to favorites: ${title}`);
    }
  } else {
    // إزالة من المفضلة
    favorites = favorites.filter(item => item.title !== title);
    alert(`Removed from favorites: ${title}`);
  }

  // حفظ المفضلة في localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
