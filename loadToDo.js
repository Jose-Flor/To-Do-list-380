import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDoc, doc, updateDoc, arrayRemove } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbI8T-JIXsDn7ty7uSUoF27gzhHxrg4Vo",
    authDomain: "comp380-2227b.firebaseapp.com",
    projectId: "comp380-2227b",
    storageBucket: "comp380-2227b.appspot.com",
    messagingSenderId: "373668540147",
    appId: "1:373668540147:web:043bff9b5e81d65b9e9186",
    measurementId: "G-NB7RQTTWE1"
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Get HTML elements
const todoButton = document.getElementById('show-todo-button');
const todoSection = document.getElementById('todo-section');
const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

async function loadList() {
    onAuthStateChanged(auth, async (user) => {
        // if user is signed in, add task to their document
        if (user) {
            const email = user.email; // get current user's email
            const dbFormData = collection(db, 'formData'); // collection reference
            const docReference = doc(db, "formData", email); // document refernce; database, collection, document id
            const docSnap = await getDoc(docReference);

            if (docSnap.exists()) {
                for (let i = 0; i < docSnap.data()["task"].length; i++){
                    const listItem = document.createElement('li');
                    const deleteButton = document.createElement('button');
                    // Clear the input field
                    todoInput.value = '';
                    // Add delete functionality to the button
                    deleteButton.innerHTML = 'X'; 
                    deleteButton.classList.add('deleteButton'); // assign a class to the button for styling
                    // Add text to the list item
                    listItem.textContent = docSnap.data()["task"][i];
                    listItem.appendChild(deleteButton);
                    todoList.appendChild(listItem);
                    console.log(docSnap.data()["task"][i]);

                    // when delete button is pressed
                    deleteButton.addEventListener('click', () => {
                        onAuthStateChanged(auth, (user) => {
                        // if user is signed in, add task to their document
                        if (user) {
                            const email = user.email; // get current user's email
                            const dbFormData = collection(db, 'formData'); // collection reference
                            const docReference = doc(db, "formData", email); // document refernce; database, collection, document id
                            
                            // remove the task from the user's firebase document
                            updateDoc(docReference, {
                            task: arrayRemove(listItem.innerText.substring(0,listItem.innerText.length-1))
                            }); 
                        }
                        else {
                            alert("User is signed out");
                            document.location.href = "./signin.html";
                        }
                        });

                        // graphically remove the item from the to-do list
                        todoList.removeChild(listItem);
                    });
                }
              }
              else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }            
        }

        else {
          alert("User is signed out");
          document.location.href = "./signin.html";
        }
      });
}
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];




window.onload = loadList();
