function checkPasswordStrength() {
    var password = document.getElementById('password').value;
    var strengthMeter = document.getElementById('strength-meter');
    var strengthText = document.getElementById('strength-text');
    
    // Reset meter and text
    strengthMeter.style.width = '0%';
    strengthText.textContent = '';

    // Check password strength
    var score = 0;

    // Length check
    if (password.length >= 8) {
        score += 25;
    }

    // Character diversity check
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        score += 25;
    }
    if (/\d/.test(password) && /\W|_/.test(password)) {
        score += 25;
    }

    // Common password check (optional)
    var commonPasswords = ["password", "123456", "qwerty", "abc123", "password1"];
    if (!commonPasswords.includes(password.toLowerCase())) {
        score += 25;
    }

    // Update UI based on score
    if (score >= 75) {
        strengthMeter.style.backgroundColor = 'green';
        strengthText.textContent = 'Strong';
    } else if (score >= 50) {
        strengthMeter.style.backgroundColor = 'orange';
        strengthText.textContent = 'Moderate';
    } else {
        strengthMeter.style.backgroundColor = 'red';
        strengthText.textContent = 'Weak';
    }
    strengthMeter.style.width = score + '%';
}