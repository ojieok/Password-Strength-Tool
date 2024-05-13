function showPassword(){
    var x = document.getElementById('password');

    if(x.type == "password"){
        x.type = 'text';
    } else {x.type = "password"}
}

// Load the dictionary file and store words in an array
var dictionary = [];
fetch('words.txt')
    .then(response => response.text())
    .then(data => {
        dictionary = data.split('\n').map(word => word.trim().toLowerCase());
    })
    .catch(error => {
        console.error('Error fetching dictionary file:' , error);
    });

 var dictionary2 = [];
 fetch('list.txt')
    .then(response => response.text())
    .then(data => {
        dictionary2 = data.split('\n').map(word => word.trim().toLowerCase());
    })   
    .catch(error => {
        console.error('Error fetching dictionary2(list) file:' , error)
    });


function passwordStrength() {
    var password = document.getElementById('password').value;
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
        var para1 = document.createElement('p');
        para1.innerHTML = 'Password must contain a lowercase character';
        feedbackDiv.appendChild(para1);
    }
        // uppercase
    if (/[A-Z]/.test(password)) {
        score += 10;
    } else {
        var para2 = document.createElement('p');
        para2.innerHTML = 'Password must contain an uppercase character';
        feedbackDiv.appendChild(para2);
    }

    // Numeric Check
    if (/\d/.test(password)) {
        score += 10;
    } else {
        var para3 = document.createElement('p');
        para3.innerHTML = 'Password must contain a numeric character';
        feedbackDiv.appendChild(para3);
    }

    // Symbol Check
    if (/\W/.test(password)) {
        score += 10;
    } else {
        var para4 = document.createElement('p');
        para4.innerHTML = 'Password must contain a symbol';
        feedbackDiv.appendChild(para4);
    }

    // Length Check
    if (password.length >= 14) {
        score += 30;
    } else {
        var para5 = document.createElement('p');
        para5.innerHTML = 'Password length must be at least 14 characters';
        feedbackDiv.appendChild(para5);
    }

    // Check for dictionary words
    if(containsDictWord(password, dictionary)){
        var para6 = document.createElement('p');
        para6.innerHTML = 'Password must not contain dictionary words';
        feedbackDiv.appendChild(para6);
    } else {
        score += 30;
    }

    // Check for common password
    if(commonPassword(password, dictionary2)){
        score -=30;
        var para7 = document.createElement('p');
        para7.innerHTML = 'Password must not be a common password';
        feedbackDiv.appendChild(para7);
    }

    // Update meter
    meterMove.style.width = '100%';
    updateMeterColor(score);
}


function containsDictWord(password){
    password = password.toLowerCase();
    return dictionary.includes(password);
}

function commonPassword(password){
    password = password.toLowerCase();
    return dictionary2.some(word => word === password);
}

function updateMeterColor(score) {
    var meterMove = document.getElementById('meter-move');

    meterMove.innerHTML = '';

    if (score == 100) {
        meterMove.style.backgroundColor = 'green';
        var strong = document.createElement('p');
        strong.innerHTML = 'Strong';
        meterMove.appendChild(strong);

    } else if (score >= 70 && score <= 100) {
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
