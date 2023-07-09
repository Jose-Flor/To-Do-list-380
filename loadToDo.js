import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDoc, doc, updateDoc, arrayRemove } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { FBConfig } from "./FirebaseConfig.js"

const firebaseConfig = FBConfig();

// initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Get HTML elements
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
                    deleteButton.textContent = 'X';
                    deleteButton.classList.add('deleteButton'); // assign a class to the button for styling

                    // Add text to the list item
                    listItem.textContent = docSnap.data()["task"][i];
                    listItem.appendChild(deleteButton);
                    todoList.appendChild(listItem);

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

window.onload = loadList();
