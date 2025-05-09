function validateContactForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // Reset previous errors
    document.querySelectorAll('.error').forEach(span => {
        span.textContent = "";
        span.style.display = "none";
    });

    let isValid = true;

    if (name.length < 2) {
        showError(nameError, "Name must be at least 2 characters");
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError(emailError, "Enter a valid email address");
        isValid = false;
    }

    if (message.length < 10) {
        showError(messageError, "Message must be at least 10 characters");
        isValid = false;
    }

    return isValid;
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = "block";
    setTimeout(() => {
        element.textContent = "";
        element.style.display = "none";
    }, 4000);
}

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
