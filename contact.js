var errorEL = document.getElementById('error');
var form = document.getElementById('form');
var name = document.getElementById('name');
var email = document.getElementById('email');
var tel = document.getElementById('tel');
var text = document.getElementById('text');

// عند إرسال النموذج
form.addEventListener('submit', function(event) {
    let errors = [];

    // التحقق من الحقول
    if (name.value.trim() === '') {
        errors.push('Name is required.');
    }

    if (email.value.trim() === '') {
        errors.push('Email is required.');
    } else if (!validateEmail(email.value.trim())) {
        errors.push('Please enter a valid email address.');
    }

    if (tel.value.trim() === '') {
        errors.push('Telephone number is required.');
    }

    if (text.value.trim() === '') {
        errors.push('Message text is required.');
    }

    // إذا وُجدت أخطاء، لا يتم الإرسال ويتم عرضها
    if (errors.length > 0) {
        event.preventDefault();
        errorEL.innerHTML = error.join('<br>');
        errorEL.style.color = 'red';
    }
});

// دالة بسيطة للتحقق من صيغة الإيميل
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
