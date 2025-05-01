
function toggleFavorite(icon) {
  icon.classList.toggle('active');
  // يمكن تخزين الحالة باستخدام localStorage أو إرسالها للسيرفر هنا
}

const text = "Chill your day with the sweetest flavors!";
const typingElement = document.getElementById("typing");
let index = 0;

function typeText() {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 80);
  }
}

window.onload = typeText;

