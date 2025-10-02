
// --- DOM Elements ---
const userContainer = document.getElementById('user-container');
const errorMessage = document.getElementById('error-message');
const reloadBtn = document.getElementById('reload-btn');

// --- Accent Colors ---
const ACCENT_COLORS = [
    '#ff6f61', '#6b5b95', '#88b04b', '#f7cac9', '#92a8d1',
    '#955251', '#b565a7', '#009b77', '#dd4124', '#d65076'
];

// --- Utility: Pick a random accent color ---
function getRandomAccent() {
    return ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
}

// --- Utility: Show loading spinner ---
function showLoading() {
    userContainer.innerHTML = '<div class="loader"></div><p style="text-align:center;">Loading users...</p>';
}

// --- Utility: Show error message ---
function showError(msg) {
    userContainer.innerHTML = '';
    errorMessage.textContent = msg;
}

// --- Render user cards ---
function displayUsers(users) {
    userContainer.innerHTML = '';
    users.forEach((user, i) => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.style.border = `3px solid ${getRandomAccent()}`;
        card.style.animationDelay = `${i * 0.1}s`;
        card.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
        `;
        userContainer.appendChild(card);
    });
}

// --- Fetch users from API (async/await) ---
async function fetchUsers() {
    errorMessage.textContent = '';
    showLoading();
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        displayUsers(users);
    } catch (err) {
        showError('Failed to fetch user data. ' + err.message);
    }
}

// --- Event Listeners ---
reloadBtn.addEventListener('click', fetchUsers);
window.addEventListener('DOMContentLoaded', fetchUsers);

// --- Loader animation CSS injection (for demo, can move to CSS file) ---
if (!document.getElementById('loader-style')) {
    const style = document.createElement('style');
    style.id = 'loader-style';
    style.textContent = `
    .loader {
        border: 6px solid #f3f3f3;
        border-top: 6px solid #43c6ac;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 10px auto;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    `;
    document.head.appendChild(style);
}
