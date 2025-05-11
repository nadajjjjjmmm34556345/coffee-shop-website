document.addEventListener('DOMContentLoaded', function() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            this.textContent = this.classList.contains('active') ? '♥' : '♡';
            
            const cookieName = this.parentElement.querySelector('h3').textContent;
            const favorites = JSON.parselocalStorage.getItem('favorites') || [];
            
            if (this.classList.contains('active')) {
                if (!favorites.includes(cookieName)) {
                    favorites.push(cookieName);
                }
            } else {
                const index = favorites.indexOf(cookieName);
                if (index > -1) {
                    favorites.splice(index, 1);
                }
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteButtons.forEach(button => {
        const cookieName = button.parentElement.querySelector('h3').textContent;
        if (favorites.includes(cookieName)) {
            button.classList.add('active');
            button.textContent = '♥';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
  
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.cookies-box');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('span').textContent;
            
            alert(`Added to cart: ${productName} - ${productPrice}`);
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-item input');
    const cookieBoxes = document.querySelectorAll('.cookies-box');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        cookieBoxes.forEach(box => {
            const cookieName = box.querySelector('h3').textContent.toLowerCase();
            
            if (cookieName.includes(searchTerm)) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });

    searchInput.addEventListener('search', function() {
        if (this.value === '') {
            cookieBoxes.forEach(box => {
                box.style.display = 'block';
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    
    const moonIcon = document.getElementById('moon');
    
    function applyDarkTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
    
    moonIcon.addEventListener('click', function() {
        const isDark = !document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDark);
        applyDarkTheme(isDark);
    });
    
    
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        applyDarkTheme(true);
    }
});
