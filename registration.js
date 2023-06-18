import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getCountFromServer, query, where} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
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

async function addUserToDB(){
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const dbFormData = collection(db, 'formData');
    
    //Get Form Values
    let form_email = document.getElementById("email").value;
    
    // create data package
    const data = {
    email: form_email,
    };

    // Check if email already exists
    const formQuery = query(
        dbFormData,
        where('email', '==', form_email)
    )

    const snapshot = await getCountFromServer(formQuery);
    const count = snapshot.data().count;
    console.log(count);

    if (count > 0){
        alert("Account associated with that email already exists");
    }// if
    else{
        addDoc(dbFormData, data)
        .then(docRef => {
        console.log(docRef.id); //p4eZcO5QV43IYnigxALJ
        document.getElementById("error").innerHTML = "Registration success";
        })
        .catch(error => {
            console.log(error);
        })
        alert("Account creation success!");
    }// else
}

function createUser(){
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth();
    const dbFormData = collection(db, 'formData');
    
    //Get Form Values
    let form_email = document.getElementById("email").value;
    let form_password = document.getElementById("password").value;
    
    // create data package
    const data = {
    email: form_email,
    password: form_password,
    };

    createUserWithEmailAndPassword(auth, form_email, form_password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        addUserToDB();
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}

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
        // add user to database and create user in authentication
        createUser();
        //document.location.href = "./main.html";
    }// else
});