import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { FBConfig } from "./FirebaseConfig.js"

const firebaseConfig = FBConfig();

// Get HTML elements
const signoutButton = document.getElementById('signout-button'); // Added sign out button

// initialize firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}
const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  // if user is signed in, remove task from their document
  if (!user) {
    alert("User is signed out");
    document.location.href = "./signin.html";
  }
});

// Sign Out functionality
signoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    document.location.href = "./signin.html";
  }).catch((error) => {
    // An error happened.
    console.error("Error signing out: ", error);
  });
});

// Generate stars
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  document.body.appendChild(star);
}
