// Global state
let currentUser = null;

// Tab switching functionality
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginBtn = document.querySelector('.tab-btn:first-child');
    const signupBtn = document.querySelector('.tab-btn:last-child');

    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    } else {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
    }
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simulate login (in real app, this would validate against backend)
        if (email && password) {
            currentUser = { email: email };
            localStorage.setItem('pured1_user', JSON.stringify(currentUser));
            showNotification('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
        } else {
            showNotification('Please fill in all fields', 'error');
        }
    });

    // Signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const playingNow = document.getElementById('playingNow').checked;
        const courseName = document.getElementById('courseName').value;

        if (firstName && lastName && username && email) {
            const userData = {
                firstName,
                lastName,
                username,
                email,
                playingNow,
                courseName,
                createdAt: new Date().toISOString()
            };

            // Store user data
            localStorage.setItem('pured1_user', JSON.stringify(userData));
            currentUser = userData;

            // Send email notification
            sendEmailNotification(userData);

            showNotification('Account created successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
        } else {
            showNotification('Please fill in all required fields', 'error');
        }
    });
});

// Email notification function
function sendEmailNotification(userData) {
    const emailData = {
        to: 'Dixonwelborn@pured1.com',
        subject: 'New Pured1 Account Created',
        body: `
            New user account created:
            
            Name: ${userData.firstName} ${userData.lastName}
            Username: ${userData.username}
            Email: ${userData.email}
            Time Created: ${new Date(userData.createdAt).toLocaleString()}
            Course: ${userData.courseName || 'Not specified'}
            Playing Now: ${userData.playingNow ? 'Yes' : 'No'}
        `
    };

    // In a real application, this would send to your backend
    // For now, we'll log it to console and store it
    console.log('Email notification:', emailData);
    
    // Store email notifications in localStorage for demo
    const notifications = JSON.parse(localStorage.getItem('pured1_notifications') || '[]');
    notifications.push({
        ...emailData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('pured1_notifications', JSON.stringify(notifications));
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #488548, #ffff94)' : 
                     type === 'error' ? 'linear-gradient(135deg, #ff4444, #cc3333)' : 
                     'linear-gradient(135deg, #4444ff, #3333cc)'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Navigation functions
function navigateTo(page) {
    window.location.href = page;
}

function logout() {
    localStorage.removeItem('pured1_user');
    currentUser = null;
    window.location.href = 'index.html';
}

// Check authentication
function checkAuth() {
    const user = localStorage.getItem('pured1_user');
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return JSON.parse(user);
}

// Initialize pages
function initPage() {
    const currentUser = checkAuth();
    if (currentUser) {
        // Update UI with user info if needed
        const userElements = document.querySelectorAll('[data-user-field]');
        userElements.forEach(element => {
            const field = element.getAttribute('data-user-field');
            if (currentUser[field]) {
                element.textContent = currentUser[field];
            }
        });
    }
}

// Social media links
function openSocialMedia(platform) {
    const urls = {
        instagram: 'https://instagram.com/pured1golf',
        tiktok: 'https://tiktok.com/@pured1_golf',
        youtube: 'https://youtube.com/@Pured1golf'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

// Add notification styles to head
const notificationStyles = `
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        line-height: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
