// Main JavaScript file for the Login Web Application

// Global variables
let currentForm = 'login';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize Materialize components
    M.AutoInit();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check API health on startup
    checkApiHealth();
    
    // Show login form by default
    showLoginForm();
}

function setupEventListeners() {
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Forgot password form submission
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
    
    // Real-time validation
    document.getElementById('username').addEventListener('input', validateUsername);
    document.getElementById('password').addEventListener('input', validatePassword);
    document.getElementById('email').addEventListener('input', validateEmail);
}

// Form handling functions
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validate form
    if (!validateLoginForm(username, password)) {
        return;
    }
    
    // Show loading state
    showLoadingState('login');
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showStatusMessage('Login successful! Welcome back.', 'success');
            // Clear form
            document.getElementById('loginForm').reset();
            M.updateTextFields();
        } else {
            showStatusMessage(result.message || 'Login failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showStatusMessage('Network error. Please check your connection.', 'error');
    } finally {
        hideLoadingState('login');
    }
}

async function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    
    // Validate email
    if (!validateEmailInput(email)) {
        return;
    }
    
    // Show loading state
    showLoadingState('forgot-password');
    
    try {
        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showStatusMessage('Password reset email sent successfully!', 'success');
            // Clear form
            document.getElementById('forgotPasswordForm').reset();
            M.updateTextFields();
        } else {
            showStatusMessage(result.message || 'Password reset failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        showStatusMessage('Network error. Please check your connection.', 'error');
    } finally {
        hideLoadingState('forgot-password');
    }
}

// Validation functions
function validateLoginForm(username, password) {
    let isValid = true;
    
    if (!username) {
        showFieldError('username', 'Username is required');
        isValid = false;
    } else {
        clearFieldError('username');
    }
    
    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else {
        clearFieldError('password');
    }
    
    return isValid;
}

function validateEmailInput(email) {
    if (!email) {
        showFieldError('email', 'Email is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError('email');
    return true;
}

function validateUsername() {
    const username = document.getElementById('username').value.trim();
    if (username) {
        clearFieldError('username');
    }
}

function validatePassword() {
    const password = document.getElementById('password').value.trim();
    if (password) {
        clearFieldError('password');
    }
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            clearFieldError('email');
        }
    }
}

// UI helper functions
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('invalid');
    field.classList.remove('valid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error red-text text-darken-2';
    errorElement.style.fontSize = '0.8em';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('invalid');
    field.classList.add('valid');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showStatusMessage(message, type) {
    const statusElement = document.getElementById('status-message');
    const statusText = document.getElementById('status-text');
    
    statusElement.className = `card-panel ${type}`;
    statusText.textContent = message;
    statusElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000);
}

function showLoadingState(formType) {
    const submitButton = document.querySelector(`#${formType}-form button[type="submit"]`);
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="material-icons left">hourglass_empty</i>Loading...';
}

function hideLoadingState(formType) {
    const submitButton = document.querySelector(`#${formType}-form button[type="submit"]`);
    submitButton.disabled = false;
    
    if (formType === 'login') {
        submitButton.innerHTML = 'Login<i class="material-icons right">send</i>';
    } else {
        submitButton.innerHTML = 'Reset Password<i class="material-icons right">email</i>';
    }
}

// Form navigation functions
function showLoginForm() {
    hideAllForms();
    document.getElementById('login-form').style.display = 'block';
    currentForm = 'login';
    
    // Focus on username field
    setTimeout(() => {
        document.getElementById('username').focus();
    }, 100);
}

function showForgotPasswordForm() {
    hideAllForms();
    document.getElementById('forgot-password-form').style.display = 'block';
    currentForm = 'forgot-password';
    
    // Focus on email field
    setTimeout(() => {
        document.getElementById('email').focus();
    }, 100);
}

function showUserList() {
    hideAllForms();
    document.getElementById('user-list').style.display = 'block';
    loadUserList();
}

function hideAllForms() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('user-list').style.display = 'none';
}

// API functions
async function checkApiHealth() {
    try {
        const response = await fetch('/api/health');
        const result = await response.json();
        
        const statusElement = document.getElementById('api-status');
        if (result.success) {
            statusElement.innerHTML = '<span class="api-status-healthy">✓ API is healthy and responding</span>';
        } else {
            statusElement.innerHTML = '<span class="api-status-unhealthy">✗ API is not responding</span>';
        }
    } catch (error) {
        const statusElement = document.getElementById('api-status');
        statusElement.innerHTML = '<span class="api-status-unhealthy">✗ Cannot connect to API</span>';
    }
}

async function loadUserList() {
    try {
        const response = await fetch('/api/users');
        const result = await response.json();
        
        const container = document.getElementById('users-container');
        
        if (result.success && result.data.length > 0) {
            let html = '';
            result.data.forEach(user => {
                html += `
                    <div class="user-item">
                        <div class="user-username">${user.username}</div>
                        <div class="user-email">${user.email}</div>
                    </div>
                `;
            });
            container.innerHTML = html;
        } else {
            container.innerHTML = '<p class="grey-text">No users available</p>';
        }
    } catch (error) {
        console.error('Error loading users:', error);
        const container = document.getElementById('users-container');
        container.innerHTML = '<p class="red-text">Error loading users</p>';
    }
}

// Utility functions
function clearForms() {
    document.getElementById('loginForm').reset();
    document.getElementById('forgotPasswordForm').reset();
    M.updateTextFields();
}

// Export functions for global access
window.showLoginForm = showLoginForm;
window.showForgotPasswordForm = showForgotPasswordForm;
window.showUserList = showUserList; 