import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';



function isValidPassword(password){
    return /([A-Z].*[a-z]|[a-z].*[A-Z])/gm.test(password);
}

function isValidEmail(email){
    return /([a-zA-Z]).*\@([a-zA-Z]).*/gm.test(email);
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('submit').addEventListener('click', (e) => {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var passwordConfirmation = document.getElementById("password_confirmation").value;

        if (!isValidEmail(email)){
            document.getElementById("error").innerHTML = "Invalid email";
        }// if
        else if (password === "" || passwordConfirmation === "") {
            document.getElementById("error").innerHTML = "Must enter password.";
        }// else if
        else if (password !== passwordConfirmation){
            document.getElementById("error").innerHTML = "Passwords do not match.";
        }// else if
        else if (!isValidPassword(password)){
            document.getElementById("error").innerHTML = "Password must contain upper and lower case characters.";
        }// else if 
        else {
            document.getElementById("error").innerHTML = "Registration success";
        }// else

        const firebaseConfig = {
            apiKey: "AIzaSyDbI8T-JIXsDn7ty7uSUoF27gzhHxrg4Vo",
            authDomain: "comp380-2227b.firebaseapp.com",
            projectId: "comp380-2227b",
            storageBucket: "comp380-2227b.appspot.com",
            messagingSenderId: "373668540147",
            appId: "1:373668540147:web:043bff9b5e81d65b9e9186",
            measurementId: "G-NB7RQTTWE1"
        };
        
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        
        //Variable to access database collection
        const db = getFirestore(app);
        const dbFormData = collection(db, 'formData');
        
        //Get Submit Form
        let submitButton = document.getElementById("submit");
        
        //Create Event Listener To Allow Form Submission
        submitButton.addEventListener("click", (e) => {
          //Prevent Default Form Submission Behavior
          e.preventDefault();
        
          //Get Form Values
          let form_email = document.getElementById("email").value;
          let form_password = document.getElementById("password").value;
        
          const data = {
            email: form_email,
            password: form_password,
          };
          
          //Save Form Data To Firebase
          addDoc(dbFormData, data)
          .then(docRef => {
            console.log(docRef.id); //p4eZcO5QV43IYnigxALJ
            })
            .catch(error => {
                console.log(error);
            })
        });
    });
});





