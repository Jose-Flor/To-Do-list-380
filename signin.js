import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { FBConfig } from "./FirebaseConfig.js"

const firebaseConfig = FBConfig();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Generate stars
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  document.body.appendChild(star);
}

// Add event listener to the sign-in button on clicking signin button
document.getElementById('signin-btn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Perform the sign-in process using Firebase Authentication
  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Check if email is verified
        if (!user.emailVerified) {
            // Send a message to the user
            alert("Email not verified");
        } 
        // Redirect to main.html upon successful sign-in
        window.location.href = './main.html';
      })
      .catch((error) => {
        // Handle sign-in errors
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById('error').textContent = `Error: ${errorCode}. Message: ${errorMessage}`;
      });
});

// Add event listener for signin with enter key
document.getElementById('email').addEventListener('keypress', function (e) {
  if (e.key == 'Enter') {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform the sign-in process using Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Check if email is verified
          if (!user.emailVerified) {
              // Send a message to the user
              alert("Email not verified");
          } 
          // Redirect to main.html upon successful sign-in
          window.location.href = './main.html';
        })
        .catch((error) => {
          // Handle sign-in errors
          const errorCode = error.code;
          const errorMessage = error.message;
          document.getElementById('error').textContent = `Error: ${errorCode}. Message: ${errorMessage}`;
        });
  }
});

// Add event listener for signin with enter key
document.getElementById('password').addEventListener('keypress', function (e) {
  if (e.key == 'Enter') {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform the sign-in process using Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Check if email is verified
          if (!user.emailVerified) {
              // Send a message to the user
              alert("Email not verified");
          } 
          // Redirect to main.html upon successful sign-in
          window.location.href = './main.html';
        })
        .catch((error) => {
          // Handle sign-in errors
          const errorCode = error.code;
          const errorMessage = error.message;
          document.getElementById('error').textContent = `Error: ${errorCode}. Message: ${errorMessage}`;
        });
  }
});

// Add event listener to the forgot-password button
document.getElementById('forgot-password-btn').addEventListener('click', () => {
  // Redirect to forgot-password page
  window.location.href = './forgot-password.html';
});

// Add event listener to the sign-up button
document.getElementById('signup-btn').addEventListener('click', () => {
  // Redirect to registration page
  window.location.href = './registration.html';
});