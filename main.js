import { initializeApp, getApps, deleteApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, updateDoc, arrayUnion, arrayRemove, doc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { FBConfig } from "./FirebaseConfig.js"

const firebaseConfig = FBConfig();

// Get HTML elements
const todoButton = document.getElementById('show-todo-button');
const todoSection = document.getElementById('todo-section');
const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const signoutButton = document.getElementById('signout-button'); // Added sign out button

// Make the todoSection visible right away
todoSection.style.display = 'block';

// initialize firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}
const auth = getAuth();
const db = getFirestore(app);

// Add item to the list
addButton.addEventListener('click', () => {
  // If input field is empty, then show an alert and stop execution
  if (!todoInput.value.trim()) {
    alert("Please enter a task before pressing the 'Add' button.");
    return;
  }
  
  const listItem = document.createElement('li');
  const deleteButton = document.createElement('button');

  // Add delete functionality to the button
  deleteButton.textContent = 'X';
  deleteButton.classList.add('deleteButton'); // assign a class to the button for styling

  // when delete button is pressed
  deleteButton.addEventListener('click', () => {
    onAuthStateChanged(auth, (user) => {
      // if user is signed in, remove task from their document
      if (user) {
        const email = user.email; // get current user's email
        const dbFormData = collection(db, 'formData'); // collection reference
        const docReference = doc(db, "formData", email); // document refernce; database, collection, document id
        
        // remove the task from the user's firebase document
        updateDoc(docReference, {
          task: arrayRemove(listItem.innerText.substring(0,listItem.innerText.length-1))
        }); 
      }
    });

    // graphically remove the item from the to-do list
    todoList.removeChild(listItem);
  });

  // Add text to the list item
  listItem.textContent = todoInput.value;
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);
  
  // Clear the input field
  todoInput.value = '';

  onAuthStateChanged(auth, (user) => {
    // if user is signed in, add task to their document
    if (user) {
      const email = user.email; // get current user's email
      const dbFormData = collection(db, 'formData'); // collection reference
      const docReference = doc(db, "formData", email); // document refernce; database, collection, document id
      
      // add the task to the user's firebase document
      updateDoc(docReference, {
        task: arrayUnion(listItem.textContent.substring(0,listItem.textContent.length-1))        
      }); 
    }
  });
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
