import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

function isValidPassword(password){
    return /([A-Z].*[a-z]|[a-z].*[A-Z])/gm.test(password);
}

function isValidEmail(email){
    return /([a-zA-Z]).*\@([a-zA-Z]).*/gm.test(email);
}

const firebaseConfig = {
    apiKey: "AIzaSyDbI8T-JIXsDn7ty7uSUoF27gzhHxrg4Vo",
    authDomain: "comp380-2227b.firebaseapp.com",
    projectId: "comp380-2227b",
    storageBucket: "comp380-2227b.appspot.com",
    messagingSenderId: "373668540147",
    appId: "1:373668540147:web:043bff9b5e81d65b9e9186",
    measurementId: "G-NB7RQTTWE1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const dbFormData = collection(db, 'formData');

async function createUser(form_email, form_password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form_email,
        form_password
      );
      // Signed in
      const user = userCredential.user;
      // Redirect to signin.html
      window.location.href = "./signin.html";
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Show error message in console or on screen
      console.log(errorCode, errorMessage);
      document.getElementById("error").innerHTML = "Error during account creation.";
    }
}

async function addUserToDB() {
    //Get Form Values
    let form_email = document.getElementById("email").value;
    let form_password = document.getElementById("password").value;

    // Check if email already exists
    const formQuery = query(
        dbFormData,
        where('email', '==', form_email)
    );

    const snapshot = await getDocs(formQuery);
    const count = snapshot.size;
    console.log(count);

    if (count > 0){
        document.getElementById("error").innerHTML = "Account associated with that email already exists.";
    } else {
        // Create user and add it to firebase auth
        createUser(form_email, form_password);

        // Add to firestore database
        addDoc(dbFormData, {email: form_email})
        .then(docRef => {
            console.log(docRef.id); //p4eZcO5QV43IYnigxALJ
            document.getElementById("error").innerHTML = "Registration success";
            alert("Account creation success!");
        })
        .catch(error => {
            console.log(error);
        });
    }
}

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var passwordConfirmation = document.getElementById("password_confirmation").value;

    if (!isValidEmail(email)){
        document.getElementById("error").innerHTML = "Invalid email";
    } else if (password === "" || passwordConfirmation === "") {
        document.getElementById("error").innerHTML = "Must enter password.";
    } else if (password !== passwordConfirmation){
        document.getElementById("error").innerHTML = "Passwords do not match.";
    } else if (!isValidPassword(password)){
        document.getElementById("error").innerHTML = "Password must contain upper and lower case characters.";
    } else {
        addUserToDB();
    }
});