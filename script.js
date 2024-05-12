function showPassword(){
    var x = document.getElementById('password');

    if(x.type == "password"){
        x.type = 'text';
    } else {x.type = "password"}
}

function passwordStrength() {
    var password = document.getElementById('password').value;
    var strengthMeter = document.getElementById('strength-meter');
    var meterMove = document.getElementById('meter-move');
    var feedbackDiv = document.getElementById('feedback-div');
    var score = 0;
    feedbackDiv.innerHTML = ''; 

    if (password === ''){
        meterMove.style.width=0;
        meterMove.style.backgroundColor='transparent';
        meterMove.innerText ='';
        return;
    }

    // Case check
        // lowecase
    if (/[a-z]/.test(password)) {
        score += 10;
    } else {
        var para2 = document.createElement('p');
        para2.innerHTML = 'Password must contain a lowercase character';
        feedbackDiv.appendChild(para2);
    }
        // uppercase
    if (/[A-Z]/.test(password)) {
        score += 10;
    } else {
        var para3 = document.createElement('p');
        para3.innerHTML = 'Password must contain an uppercase character';
        feedbackDiv.appendChild(para3);
    }

    // Numeric Check
    if (/\d/.test(password)) {
        score += 10;
    } else {
        var para4 = document.createElement('p');
        para4.innerHTML = 'Password must contain a numeric character';
        feedbackDiv.appendChild(para4);
    }

    // Symbol Check
    if (/\W/.test(password)) {
        score += 10;
    } else {
        var para5 = document.createElement('p');
        para5.innerHTML = 'Password must contain a symbol';
        feedbackDiv.appendChild(para5);
    }

    // Length Check
    if (password.length >= 14) {
        score += 45;
    } else {
        var para1 = document.createElement('p');
        para1.innerHTML = 'Password length must be at least 14 characters';
        feedbackDiv.appendChild(para1);
    }

    // Update meter
    meterMove.style.width = '100%';
    updateMeterColor(score);
}

function updateMeterColor(score) {
    var meterMove = document.getElementById('meter-move');

    meterMove.innerHTML = '';

    if (score == 100) {
        meterMove.style.backgroundColor = 'green';
        var strong = document.createElement('p');
        strong.innerHTML = 'Strong';
        meterMove.appendChild(strong);

    } else if (score >= 70 && score < 100) {
        meterMove.style.backgroundColor = 'orange';
        var medium = document.createElement('p');
        medium.innerHTML = 'Medium';
        meterMove.appendChild(medium);

    } else {
        meterMove.style.backgroundColor = 'red';
        var weak = document.createElement('p');
        weak.innerHTML = 'Weak';
        meterMove.appendChild(weak);
    }
}

