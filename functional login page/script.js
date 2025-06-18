let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

function showPage(pageId) {
    const pages = ['loginPage', 'createPage', 'forgotPage', 'passwordDisplayPage', 'homePage'];
    pages.forEach(page => document.getElementById(page).style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const errorMessage = document.getElementById('loginError');
    errorMessage.style.display = 'none';
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = username;
        document.getElementById('loggedInUser').textContent = username;
        showPage('homePage');
        this.reset();
    } else {
        errorMessage.textContent = 'Invalid credentials!';
        errorMessage.style.display = 'block';
    }
});

// Create account
document.getElementById('createForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const errorMessage = document.getElementById('createError');
    errorMessage.style.display = 'none';
    
    const newUsername = document.getElementById('newUsername').value.trim();
    const newEmail = document.getElementById('newEmail').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();

    if (users.some(u => u.username === newUsername)) {
        errorMessage.textContent = 'Username taken!';
        errorMessage.style.display = 'block';
    } else if (users.some(u => u.email === newEmail)) {
        errorMessage.textContent = 'Email already registered!';
        errorMessage.style.display = 'block';
    } else {
        users.push({
            username: newUsername,
            email: newEmail,
            password: newPassword
        });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account created!');
        this.reset();
        showPage('loginPage');
    }
});

// Forgot password
document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const errorMessage = document.getElementById('forgotError');
    errorMessage.style.display = 'none';
    
    const email = document.getElementById('recoverEmail').value.trim();
    const user = users.find(u => u.email === email);
    
    if (user) {
        document.getElementById('displayedPassword').textContent = user.password;
        showPage('passwordDisplayPage');
    } else {
        errorMessage.textContent = 'Email not found!';
        errorMessage.style.display = 'block';
    }
    this.reset();
});

// Logout
function logout() {
    currentUser = null;
    showPage('loginPage');
}

// Initialize
showPage('loginPage');