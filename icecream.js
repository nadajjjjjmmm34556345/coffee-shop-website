
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
function filterProducts() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const boxes = document.querySelectorAll('.box');

  boxes.forEach(box => {
    const title = box.querySelector('h3').textContent.toLowerCase();
    if (title.includes(input)) {
      box.style.display = 'block';
    } else {
      box.style.display = 'none';
    }
  });
}

