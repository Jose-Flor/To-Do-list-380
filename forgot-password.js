import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { FBConfig } from "./FirebaseConfig.js"

const firebaseConfig = FBConfig();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Add event listener to the reset-password button
document.getElementById('reset-password-btn').addEventListener('click', () => {
const email = document.getElementById('email').value;

// Perform the password reset process using Firebase Authentication
sendPasswordResetEmail(auth, email)
    .then(() => {
        // Password reset email sent!
        document.getElementById('error').textContent = `Password reset email sent to ${email}`;
    })
    .catch((error) => {
        // An error happened
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById('error').textContent = `Error: ${errorCode}. Message: ${errorMessage}`;
    });
});

// Add event listener to the Back button
document.getElementById('Back-btn').addEventListener('click', () => {
// Redirect to signin.html
window.location.href = './signin.html';
});