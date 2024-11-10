// auth.js

// Base API URL
import { API_URL } from './config.js';  // Import the global API_URL

// Login function
async function login(email, password) {
    try {
        console.log(username)
        console.log(password)
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data)
        if (data.token) {
            // Save the token in localStorage
            localStorage.setItem('authToken', data.token);

            // Redirect to dashboard or another protected page
            window.location.href = 'dashboard.html'; // Redirect after login
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
}

// Logout function
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('authToken');

    // Redirect to index.html or login page
    window.location.href = '../index.html';
}

// Export functions to be used in other scripts if needed
export { login, logout };
